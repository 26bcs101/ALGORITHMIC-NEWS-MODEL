$nodeDir = Join-Path $env:USERPROFILE '.tools\nodejs'
$env:Path = "$nodeDir;" + $env:Path

Set-Location (Join-Path $PSScriptRoot "..\frontend")

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..."
    & (Join-Path $nodeDir "npm.cmd") install
}

Write-Host "Starting Next.js frontend on http://127.0.0.1:3000..."
& (Join-Path $nodeDir "npm.cmd") run dev
