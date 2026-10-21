"""Offline Parakeet CPU worker. JSON-lines stdio is the only app interface."""
import argparse, json, os, subprocess, sys, tempfile, time, wave
from pathlib import Path
os.environ['HF_HUB_OFFLINE']='1'
os.environ['OMP_NUM_THREADS']='4'

def emit(kind, **data):
    print(json.dumps({'type':kind,**data},ensure_ascii=False),flush=True)

def decode_audio(ffmpeg, source, target):
    command=[str(ffmpeg),'-hide_banner','-loglevel','error','-nostdin','-y','-protocol_whitelist','file,pipe','-i',str(source),'-map','0:a:0','-vn','-ac','1','-ar','16000','-c:a','pcm_s16le','-t','7201',str(target)]
    result=subprocess.run(command,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,timeout=180,creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))
    if result.returncode:
        raise ValueError('Audiodatei konnte nicht gelesen werden. Bitte eine gültige Audiodatei verwenden.')
    with wave.open(str(target),'rb') as audio:
        seconds=audio.getnframes()/audio.getframerate()
    if seconds>7200:raise ValueError('Bitte Aufnahmen länger als zwei Stunden in kleinere Dateien aufteilen.')
    if seconds<0.05:raise ValueError('Die Audiodatei enthält keine auswertbaren Audiodaten.')
    return seconds

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--models',required=True,type=Path);parser.add_argument('--ffmpeg',required=True,type=Path);parser.add_argument('--threads',type=int,default=4);parser.add_argument('--temp-root',required=True,type=Path)
    args=parser.parse_args();sys.stdout.reconfigure(encoding='utf-8');sys.stdin.reconfigure(encoding='utf-8');sys.stderr.reconfigure(encoding='utf-8')
    emit('loading',message='Parakeet wird geladen …')
    import numpy as np
    import onnxruntime as ort
    import onnx_asr
    options=ort.SessionOptions();options.intra_op_num_threads=max(1,min(6,args.threads));options.inter_op_num_threads=1;options.log_severity_level=3
    # Disable busy-spinning so Office apps retain CPU time between inference calls.
    options.add_session_config_entry('session.intra_op.allow_spinning','0');options.add_session_config_entry('session.inter_op.allow_spinning','0')
    model=onnx_asr.load_model('nemo-conformer-tdt',args.models/'parakeet',quantization='int8',providers=['CPUExecutionProvider'],sess_options=options)
    vad_options=ort.SessionOptions();vad_options.intra_op_num_threads=1;vad_options.inter_op_num_threads=1;vad_options.log_severity_level=3
    vad=onnx_asr.load_vad('silero',args.models/'vad',providers=['CPUExecutionProvider'],sess_options=vad_options)
    recognizer=model.with_vad(vad,batch_size=1,max_speech_duration_s=20,min_silence_duration_ms=400,speech_pad_ms=80,min_speech_duration_ms=160)
    emit('ready')
    for line in sys.stdin:
        job=None
        try:
            request=json.loads(line);job=request['jobId'];source=Path(request['audioPath'])
            if not source.is_file():raise ValueError('Audiodatei wurde nicht gefunden.')
            started=time.monotonic();emit('progress',jobId=job,progress=0,message='Audio wird vorbereitet …')
            with tempfile.TemporaryDirectory(prefix='audio-',dir=args.temp_root) as temporary:
                wav=Path(temporary)/'audio.wav';duration=decode_audio(args.ffmpeg,source,wav)
                emit('progress',jobId=job,progress=5,message='Sprache wird erkannt …')
                segments=[]
                for segment in recognizer.recognize(wav):
                    text=segment.text.strip()
                    if text:segments.append({'start':round(segment.start,3),'end':round(segment.end,3),'text':text})
                    emit('progress',jobId=job,progress=min(99,5+int(94*segment.end/duration)),message='Sprache wird erkannt …')
                    if sum(len(s['text'])+1 for s in segments)>100000:raise ValueError('Das Transkript ist zu lang. Bitte die Aufnahme aufteilen.')
            transcript=' '.join(s['text'] for s in segments).strip()
            emit('result',jobId=job,transcript=transcript,segments=segments,duration=round(duration,3),elapsed=round(time.monotonic()-started,3))
        except Exception as error:
            # Do not expose audio content or unbounded decoder logs on stderr.
            emit('error',jobId=job,message=str(error)[:1000])

if __name__=='__main__':
    try:main()
    except Exception as error:
        emit('fatal',message='Parakeet konnte nicht geladen werden: '+str(error)[:800]);sys.exit(1)
