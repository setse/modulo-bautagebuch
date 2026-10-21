from pathlib import Path
import importlib.metadata,sys,shutil,subprocess
root=Path.cwd();target=root/'.build/transcription/licenses';target.mkdir(exist_ok=True)
for name in ['onnx-asr','onnxruntime','numpy','flatbuffers','packaging','protobuf','psutil','pyinstaller','pyinstaller-hooks-contrib','setuptools','altgraph','pefile','pywin32-ctypes']:
 distribution=importlib.metadata.distribution(name)
 for file in distribution.files or []:
  if 'license' in str(file).lower() or Path(file).name.lower() in ['copying.txt','copying','copyright','notice']:
   source=Path(distribution.locate_file(file))
   if source.is_file():
    relative=Path(name)/str(file).replace('..','_');dest=target/relative;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,dest)
python_license=Path(sys.base_prefix)/'LICENSE.txt'
if python_license.is_file():shutil.copy2(python_license,target/'Python-LICENSE.txt')
print('Copied runtime dependency notices.')

result=subprocess.run([str(root/'.build/transcription/ffmpeg/bin/ffmpeg.exe'),'-buildconf'],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,check=True,creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))
(root/'.build/transcription/ffmpeg/build-configuration.txt').write_bytes(result.stdout)
