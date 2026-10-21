"""Build-only verified Qwen/runtime download; no production downloads."""
import importlib.util,json,concurrent.futures,zipfile,shutil
from pathlib import Path
root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('asset_download',root/'scripts/download-transcription.py');download=importlib.util.module_from_spec(spec);spec.loader.exec_module(download)
download.TARGET=root/'.build/assistant';manifest=json.loads((root/'assistant/assets.json').read_text(encoding='utf-8'))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(download.download,manifest['assets']))
runtime=download.TARGET/'runtime';runtime.mkdir(parents=True,exist_ok=True)
archive=next(a for a in manifest['assets'] if a['path'].endswith('.zip'))
with zipfile.ZipFile(download.TARGET/archive['path']) as z:
 for entry in z.infolist():
  relative=Path(entry.filename)
  if entry.is_dir() or (relative.suffix.lower()!='.dll' and relative.name not in ['llama-server.exe','LICENSE']):continue
  destination=(runtime/relative).resolve()
  if not destination.is_relative_to(runtime.resolve()):raise ValueError('Invalid archive path')
  destination.parent.mkdir(parents=True,exist_ok=True)
  with z.open(entry) as src,destination.open('wb') as out:shutil.copyfileobj(src,out)
# App-local MSVC dependencies: no system redistributable installer is needed.
for name in ['msvcp140.dll','MSVCP140_1.dll','vcruntime140.dll','vcruntime140_1.dll']:
 source=root/'.build/transcription/runtime/modulo-parakeet-worker/_internal'/name
 if not source.is_file():raise FileNotFoundError('Build the transcription runtime first: '+str(source))
 shutil.copy2(source,runtime/name)
(download.TARGET/'models/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Offline Qwen assets ready.',flush=True)
