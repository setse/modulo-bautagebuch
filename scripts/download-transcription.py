"""Fetch pinned build-time assets. The shipped app performs no downloads."""
import concurrent.futures, hashlib, json, shutil, time, urllib.request, zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
TARGET=ROOT/'.build/transcription'
MANIFEST=json.loads((ROOT/'transcription/assets.json').read_text(encoding='utf-8-sig'))
def digest(path):
 h=hashlib.sha256()
 with path.open('rb') as f:
  for block in iter(lambda:f.read(1024*1024),b''):h.update(block)
 return h.hexdigest()
def download(asset):
 path=TARGET/asset['path'];path.parent.mkdir(parents=True,exist_ok=True)
 if path.exists() and path.stat().st_size==asset['size'] and digest(path)==asset['sha256']:
  print('Verified cached '+asset['path'],flush=True);return
 part=path.with_suffix(path.suffix+'.part')
 for attempt in range(3):
  try:
   h=hashlib.sha256();count=0;last=time.monotonic()
   with urllib.request.urlopen(asset['url'],timeout=60) as response,part.open('wb') as f:
    for block in iter(lambda:response.read(1024*1024),b''):
     count+=len(block);h.update(block);f.write(block)
     if time.monotonic()-last>20:
      print(f"{asset['path']}: {count/asset['size']:.0%}",flush=True);last=time.monotonic()
   if count!=asset['size'] or h.hexdigest()!=asset['sha256']:raise ValueError('Checksum mismatch: '+asset['path'])
   part.replace(path);print('Downloaded and verified '+asset['path'],flush=True);return
  except Exception:
   part.unlink(missing_ok=True)
   if attempt==2:raise
   time.sleep(2)
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(download,MANIFEST['assets']))
 archive=next(a for a in MANIFEST['assets'] if a['path'].endswith('.zip'))
 ffmpeg=TARGET/'ffmpeg';ffmpeg.mkdir(exist_ok=True)
 with zipfile.ZipFile(TARGET/archive['path']) as z:
  for entry in z.infolist():
   relative=Path(*Path(entry.filename).parts[1:])
   if not relative.parts or entry.is_dir():continue
   if relative.parts[0]=='bin' and relative.name not in ['ffmpeg.exe'] and relative.suffix!='.dll':continue
   if relative.parts[0] not in ['bin','licenses'] and relative.name not in ['LICENSE.txt','README.txt']:continue
   destination=(ffmpeg/relative).resolve()
   if not destination.is_relative_to(ffmpeg.resolve()):raise ValueError('Invalid archive path')
   destination.parent.mkdir(parents=True,exist_ok=True)
   with z.open(entry) as src,destination.open('wb') as out:shutil.copyfileobj(src,out)
 (TARGET/'models/manifest.json').write_text(json.dumps(MANIFEST,indent=2)+'\n')
 print('All offline transcription assets ready.',flush=True)
