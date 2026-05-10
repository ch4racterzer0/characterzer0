param(
  [int]$Fps = 30,
  [int]$BitrateKbps = 9000,
  [string]$MusicDir
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

if ($MusicDir) {
  if (-not (Test-Path $MusicDir)) { throw "MusicDir not found: $MusicDir" }
  $tracks = Get-ChildItem -Path $MusicDir -Recurse -File -Include *.mp3,*.m4a,*.flac,*.wav,*.ogg,*.aac,*.opus | Get-Random -Count ([int]::MaxValue)
  if (-not $tracks) { throw "No audio files under $MusicDir" }
  $listPath = Join-Path $env:TEMP "yt-dell-playlist.txt"
  $lines = foreach ($t in $tracks) {
    $p = $t.FullName -replace '\\','/' -replace "'","'\''"
    "file '$p'"
  }
  Set-Content -Path $listPath -Value $lines -Encoding ASCII
  $audioInput = @('-re','-stream_loop','-1','-f','concat','-safe','0','-i', $listPath)
  Write-Host "Audio: shuffled loop of $($tracks.Count) tracks from $MusicDir"
} else {
  $audioInput = @('-f','dshow','-i','audio=virtual-audio-capturer')
  Write-Host "Audio: virtual-audio-capturer (system loopback)"
}

Write-Host "Streaming Dell SE2425HM (output_idx=$outputIdx) -> YouTube @ ${BitrateKbps}kbps ${Fps}fps"

$ffArgs = @(
  '-hide_banner','-loglevel','info',
  '-init_hw_device','d3d11va',
  '-f','lavfi','-i', $videoChain
) + $audioInput + @(
  '-map','0:v','-map','1:a',
  '-c:v','libx264','-preset','veryfast',
  '-b:v',"${BitrateKbps}k",'-maxrate',"${BitrateKbps}k",'-bufsize',"$($BitrateKbps * 2)k",
  '-bf','2','-g',"$($Fps * 2)",'-keyint_min',"$($Fps * 2)",'-sc_threshold','0','-profile:v','high','-level','4.2','-pix_fmt','yuv420p',
  '-c:a','aac','-b:a','192k','-ar','48000',
  '-f','flv', $rtmp
)

& ffmpeg @ffArgs
