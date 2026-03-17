$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$port = if ($env:PORT) { $env:PORT } else { 4173 }
Write-Host "Serving Spartamax at http://127.0.0.1:$port"
node .\server.js
