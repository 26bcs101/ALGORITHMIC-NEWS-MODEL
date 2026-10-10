$nodeDir = Join-Path $env:USERPROFILE '.tools\nodejs'
$env:Path = "$nodeDir;" + $env:Path
Set-Location (Join-Path $PSScriptRoot "..\frontend")
& (Join-Path $nodeDir "npm.cmd") install
