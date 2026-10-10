$nodeDir = Join-Path $env:USERPROFILE '.tools\nodejs'
$current = [System.Environment]::GetEnvironmentVariable('Path', 'User')
if ($current -notmatch [regex]::Escape($nodeDir)) {
    [System.Environment]::SetEnvironmentVariable('Path', "$nodeDir;$current", 'User')
    Write-Host "Added $nodeDir to User PATH."
} else {
    Write-Host "$nodeDir already in User PATH."
}
