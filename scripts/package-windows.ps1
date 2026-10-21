$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
$taskPreviousCompression = [Environment]::GetEnvironmentVariable('ELECTRON_BUILDER_COMPRESSION_LEVEL')
try {
  # INT8 model weights gain little from ultra compression; avoid very slow builds.
  $env:ELECTRON_BUILDER_COMPRESSION_LEVEL = '1'
  & npx electron-builder --win portable --x64
  if ($LASTEXITCODE) { throw 'Windows packaging failed.' }
} finally {
  [Environment]::SetEnvironmentVariable('ELECTRON_BUILDER_COMPRESSION_LEVEL', $taskPreviousCompression, 'Process')
}
