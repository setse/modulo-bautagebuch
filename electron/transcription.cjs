const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {spawn} = require('node:child_process');
const {createInterface} = require('node:readline');
const {randomUUID} = require('node:crypto');
const manifest = require('../transcription/assets.json');

class ParakeetTranscriptionProvider {
  constructor({resources,onProgress=()=>{},threads=4,idleMs=90000,spawnProcess=spawn}={}) {
    this.resources=resources;this.onProgress=onProgress;this.threads=threads;this.idleMs=idleMs;this.spawnProcess=spawnProcess;
    this.worker=null;this.ready=false;this.active=null;this.idleTimer=null;this.startTimer=null;this.disposed=false;
  }
  status() {
    const required=manifest.assets.filter(a=>a.path.startsWith('models/'));
    const available=!!this.resources && required.every(a=>{try{return fs.statSync(path.join(this.resources,a.path)).size===a.size;}catch{return false;}})
      && fs.existsSync(this.workerPath()) && fs.existsSync(this.ffmpegPath());
    return {available,model:'Parakeet Deutsch',source:manifest.source,revision:manifest.revision,device:'CPU · INT8',busy:!!this.active,attachmentId:this.active?.attachmentId||null,
      message:available?'Offline-Spracherkennung ist bereit.':'Spracherkennung fehlt. Bitte die vollständige Windows-Version verwenden.'};
  }
  workerPath(){return path.join(this.resources||'', 'runtime','modulo-parakeet-worker','modulo-parakeet-worker.exe');}
  ffmpegPath(){return path.join(this.resources||'','ffmpeg','bin','ffmpeg.exe');}
  progress(stage,progress,message) {
    if(this.active)this.onProgress({attachmentId:this.active.attachmentId,jobId:this.active.id,stage,progress,message});
  }
  transcribe(audioPath,attachmentId) {
    if(this.disposed)return Promise.reject(new Error('Spracherkennung wird beendet.'));
    if(this.active)return Promise.reject(new Error('Eine andere Sprachnotiz wird gerade transkribiert.'));
    if(!this.status().available)return Promise.reject(new Error(this.status().message));
    clearTimeout(this.idleTimer);
    return new Promise((resolve,reject)=>{
      this.active={id:randomUUID(),attachmentId,audioPath,resolve,reject};
      if(this.worker&&this.ready)this.sendJob();else this.startWorker();
    });
  }
  startWorker() {
    this.ready=false;this.progress('loading',null,'Parakeet wird geladen …');
    let process;
    let temporary;
    try {
      temporary=fs.mkdtempSync(path.join(os.tmpdir(),'modulo-speech-'));
      process=this.spawnProcess(this.workerPath(),['--models',path.join(this.resources,'models'),'--ffmpeg',this.ffmpegPath(),'--threads',String(this.threads),'--temp-root',temporary],
        {windowsHide:true,stdio:['pipe','pipe','pipe'],env:{...global.process.env,HF_HUB_OFFLINE:'1',OMP_NUM_THREADS:String(this.threads)}});
    } catch(error){if(temporary)this.cleanup(temporary);this.finish(null,error);return;}
    this.worker=process;
    const lines=createInterface({input:process.stdout});
    lines.on('line',line=>{
      if(this.worker!==process)return;
      try {this.receive(JSON.parse(line));}catch(error){this.failWorker(new Error('Spracherkennung hat ungültige Daten geliefert.'));}
    });
    // Read stderr to prevent a full pipe blocking the worker. Never retain audio or transcripts in logs.
    process.stderr.on('data',()=>{});
    process.stdin.on('error',()=>{if(this.worker===process)this.failWorker(new Error('Spracherkennung wurde unterbrochen.'));});
    process.on('error',()=>{this.cleanup(temporary);if(this.worker===process)this.failWorker(new Error('Spracherkennung konnte nicht gestartet werden. Bitte die App vollständig neu entpacken.'));});
    process.transcriptionCleanup=new Promise(resolve=>process.on('close',()=>this.cleanup(temporary).then(resolve)));
    process.on('exit',()=>{lines.close();if(this.worker===process){this.worker=null;this.ready=false;clearTimeout(this.startTimer);if(this.active)this.finish(null,new Error('Spracherkennung wurde unerwartet beendet. Sie können erneut starten.'));}});
    this.startTimer=setTimeout(()=>this.failWorker(new Error('Das Sprachmodell konnte nicht rechtzeitig geladen werden. Bitte erneut versuchen.')),120000);
    this.startTimer.unref?.();
  }
  receive(event) {
    if(event.type==='ready'){clearTimeout(this.startTimer);this.ready=true;this.sendJob();return;}
    if(event.type==='loading')return;
    if(event.type==='fatal'){this.failWorker(new Error('Parakeet konnte nicht geladen werden. Bitte die vollständige App-Version erneut entpacken.'));return;}
    if(!this.active || event.jobId!==this.active.id)return;
    if(event.type==='progress'){
      const progress=typeof event.progress==='number'?Math.max(0,Math.min(99,event.progress)):null;
      this.progress(progress===0?'decoding':'recognizing',progress,progress===0?'Audio wird vorbereitet …':'Sprache wird erkannt …');return;
    }
    if(event.type==='error'){this.finish(null,new Error(typeof event.message==='string'?event.message:'Transkription fehlgeschlagen.'));return;}
    if(event.type==='result'){
      if(typeof event.transcript!=='string'||event.transcript.length>100000||!Number.isFinite(event.duration)||!Number.isFinite(event.elapsed))throw new Error('Invalid result');
      const segments=Array.isArray(event.segments)?event.segments.filter(s=>Number.isFinite(s.start)&&Number.isFinite(s.end)&&typeof s.text==='string').map(s=>({start:s.start,end:s.end,text:s.text})):[];
      this.finish({status:event.transcript.trim()?'completed':'empty',transcript:event.transcript.trim(),duration:event.duration,elapsed:event.elapsed,segments,
        model:manifest.source,revision:manifest.revision,message:event.transcript.trim()?'Transkript erstellt. Bitte prüfen.':'Keine Sprache erkannt. Die Aufnahme und bisherige Texte bleiben erhalten.'});
    }
  }
  sendJob(){if(this.active&&this.ready&&this.worker)this.worker.stdin.write(JSON.stringify({jobId:this.active.id,audioPath:this.active.audioPath})+'\n');}
  finish(result,error) {
    const active=this.active;if(!active)return;
    this.progress(error?'error':result?.status==='canceled'?'canceled':'completed',error?null:100,error?.message||result.message);
    this.active=null;
    if(error)active.reject(error);else active.resolve(result);
    clearTimeout(this.idleTimer);
    if(this.worker)this.idleTimer=setTimeout(()=>this.stopWorker(),this.idleMs);
    this.idleTimer?.unref?.();
  }
  cancel(attachmentId) {
    if(!this.active || this.active.attachmentId!==attachmentId)return false;
    this.finish({status:'canceled',message:'Transkription abgebrochen.'});this.stopWorker();return true;
  }
  failWorker(error){this.finish(null,error);this.stopWorker();}
  cleanup(temporary){return fs.promises.rm(temporary,{recursive:true,force:true,maxRetries:5,retryDelay:300}).catch(()=>{});}
  stopWorker() {
    clearTimeout(this.idleTimer);clearTimeout(this.startTimer);
    const worker=this.worker;this.worker=null;this.ready=false;
    if(!worker)return this.stopping||Promise.resolve();
    this.stopping=Promise.all([this.stopping||Promise.resolve(),worker.transcriptionCleanup||Promise.resolve()]);
    // Only terminate the process tree started by this provider, including an active decoder.
    if(global.process.platform==='win32'&&worker.pid){
      const killer=spawn('taskkill.exe',['/PID',String(worker.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'});
      killer.on('error',()=>worker.kill());
    }else worker.kill();
    return this.stopping;
  }
  dispose(){this.disposed=true;if(this.active)this.finish({status:'canceled',message:'Transkription abgebrochen.'});return this.stopWorker();}
}
module.exports={ParakeetTranscriptionProvider};
