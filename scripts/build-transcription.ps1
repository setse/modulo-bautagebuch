$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
if (-not (Get-Command uv -ErrorAction SilentlyContinue)) { throw 'Install uv to build the bundled transcription runtime.' }
$taskPython = Join-Path (Get-Location) '.build/transcription-venv/Scripts/python.exe'
if (-not (Test-Path -LiteralPath $taskPython)) {
  & uv venv .build/transcription-venv --python 3.13
  if ($LASTEXITCODE) { throw 'Could not create the transcription build environment.' }
}
& uv pip install --python $taskPython -r transcription/requirements-build.lock
if ($LASTEXITCODE) { throw 'Transcription dependency installation failed.' }
& $taskPython -X utf8 scripts/download-transcription.py
if ($LASTEXITCODE) { throw 'Transcription asset verification failed.' }
$taskWorker = Join-Path (Get-Location) '.build/transcription/runtime/modulo-parakeet-worker/modulo-parakeet-worker.exe'
if (-not (Test-Path -LiteralPath $taskWorker) -or (Get-Item transcription/worker.py).LastWriteTime -gt (Get-Item -LiteralPath $taskWorker).LastWriteTime) {
  & $taskPython -m PyInstaller --noconfirm --onedir --console --name modulo-parakeet-worker --distpath .build/transcription/runtime --workpath .build/pyinstaller --specpath .build --collect-all onnx_asr --collect-all onnxruntime --copy-metadata numpy --copy-metadata onnx-asr --copy-metadata onnxruntime transcription/worker.py
  if ($LASTEXITCODE) { throw 'Transcription runtime packaging failed.' }
}
& $taskPython scripts/collect-transcription-licenses.py
if ($LASTEXITCODE) { throw 'Could not collect runtime license notices.' }
Write-Output 'Bundled offline Parakeet runtime ready.'
