$ErrorActionPreference = 'Stop'
$nodeVersion = 'v20.18.0'
$nodeZipName = "node-$nodeVersion-win-x64"
$zipUrl = "https://nodejs.org/dist/$nodeVersion/$nodeZipName.zip"
$toolsDir = Join-Path $env:USERPROFILE '.tools'
$destDir = Join-Path $toolsDir 'nodejs'
$zipFile = Join-Path $env:TEMP "$nodeZipName.zip"
$extractTemp = Join-Path $env:TEMP "node_extract_$PID"

if (Test-Path (Join-Path $destDir 'node.exe')) {
    Write-Host "Node.js already present at $destDir"
    & (Join-Path $destDir 'node.exe') -v
    exit 0
}

New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null
Write-Host "Downloading $zipUrl..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile -UseBasicParsing

Write-Host "Extracting Node.js..."
Expand-Archive -Path $zipFile -DestinationPath $extractTemp -Force
Move-Item -Path (Join-Path $extractTemp $nodeZipName) -Destination $destDir -Force

Remove-Item -Force $zipFile -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $extractTemp -ErrorAction SilentlyContinue

Write-Host "Installed Node.js successfully:"
& (Join-Path $destDir 'node.exe') -v
& (Join-Path $destDir 'npm.cmd') -v
