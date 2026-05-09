param(
  [int]$Fps = 30,
  [int]$BitrateKbps = 4500
)

$ErrorActionPreference = 'Stop'

$keyPath = Join-Path $env:USERPROFILE '.stream\youtube.key'
$key = (Get-Content -Raw $keyPath).Trim()
if (-not $key) { throw "Empty stream key at $keyPath" }

$dell = Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID |
  Where-Object {
    $name = -join ($_.UserFriendlyName | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ })
    $name -match 'DELL'
  } | Select-Object -First 1
if (-not $dell) { throw "Dell monitor not found via EDID." }

$outputIdx = 1

$videoChain = "ddagrab=output_idx=${outputIdx}:framerate=${Fps},hwdownload,format=bgra,format=yuv420p"
$rtmp = "rtmp://a.rtmp.youtube.com/live2/$key"

Write-Host "Streaming Dell SE2425HM (output_idx=$outputIdx) -> YouTube @ ${BitrateKbps}kbps ${Fps}fps"

& ffmpeg -hide_banner -loglevel info `
  -init_hw_device d3d11va `
  -f lavfi -i $videoChain `
  -f dshow -i 'audio=virtual-audio-capturer' `
  -map 0:v -map 1:a `
  -c:v libx264 -preset veryfast `
  -b:v "${BitrateKbps}k" -maxrate "${BitrateKbps}k" -bufsize "$($BitrateKbps * 2)k" `
  -bf 2 -g 60 -keyint_min 60 -sc_threshold 0 -profile:v high -pix_fmt yuv420p `
  -c:a aac -b:a 160k -ar 44100 `
  -f flv $rtmp
