$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
$taskPython = Join-Path (Get-Location) '.build/transcription-venv/Scripts/python.exe'
if (-not (Test-Path -LiteralPath $taskPython)) { throw 'Run npm run build:transcription first to prepare the build environment.' }
& $taskPython -X utf8 scripts/build-assistant.py
if ($LASTEXITCODE) { throw 'Assistant asset verification failed.' }
