param(
  [string]$ArtDir       = 'D:\chracterzer0-drop',
  [string]$MusicDir     = 'C:\Users\mcfow\.stream\music\edm\starfrosch-mostwanted',
  [int]$Fps             = 30,
  [int]$BitrateKbps     = 6000,
  [double]$ImageHoldSec = 14,
  [int]$MinImageBytes   = 200000
)

$ErrorActionPreference = 'Stop'

$keyPath = Join-Path $env:USERPROFILE '.stream\youtube.key'
$key = (Get-Content -Raw $keyPath).Trim()
if (-not $key) { throw "Empty stream key at $keyPath" }

# ----- Art playlist (drop tiny PNGs: screenshots, watermark, etc.) -----
$images = Get-ChildItem -Path $ArtDir -File -Filter *.png |
  Where-Object { $_.Length -gt $MinImageBytes } |
  Sort-Object Name
if ($images.Count -lt 1) { throw "No art images >${MinImageBytes}B found in $ArtDir" }

# Pre-scale each image to 1920x1080 PNG so the filter graph never reconfigures mid-stream
$prepDir = Join-Path $env:TEMP 'yt-art-prepped'
New-Item -ItemType Directory -Force -Path $prepDir | Out-Null
Get-ChildItem $prepDir -File | Remove-Item -Force
$preppedPaths = @()
$i = 0
foreach ($img in $images) {
  $i++
  $dst = Join-Path $prepDir ("art_{0:D3}.jpg" -f $i)
  & ffmpeg -hide_banner -loglevel error -y -i $img.FullName `
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,format=yuv420p" `
    -q:v 2 $dst | Out-Null
  if (-not (Test-Path $dst)) { throw "Pre-scale failed for $($img.FullName)" }
  $preppedPaths += $dst
}
Write-Host "pre-scaled $($preppedPaths.Count) art frames -> $prepDir"

$artList = Join-Path $env:TEMP 'yt-art-images.txt'
$lines = New-Object System.Collections.ArrayList
[void]$lines.Add('ffconcat version 1.0')
foreach ($p in $preppedPaths) {
  $f = $p -replace '\\','/'
  [void]$lines.Add("file '$f'")
  [void]$lines.Add("duration $ImageHoldSec")
}
$lastF = $preppedPaths[-1] -replace '\\','/'
[void]$lines.Add("file '$lastF'")
Set-Content -Path $artList -Value $lines -Encoding ASCII

# ----- Music playlist (shuffled, looped forever) -----
$tracks = Get-ChildItem -Path $MusicDir -Recurse -File -Include *.mp3,*.m4a,*.flac,*.wav,*.ogg,*.aac,*.opus | Get-Random -Count ([int]::MaxValue)
if (-not $tracks) { throw "No audio files under $MusicDir" }
$musicList = Join-Path $env:TEMP 'yt-art-music.txt'
$mlines = foreach ($t in $tracks) {
  $p = $t.FullName -replace '\\','/' -replace "'","'\''"
  "file '$p'"
}
Set-Content -Path $musicList -Value $mlines -Encoding ASCII

Write-Host "Art    : $($images.Count) images cycling every ${ImageHoldSec}s"
Write-Host "Music  : shuffled loop of $($tracks.Count) tracks from $MusicDir"
Write-Host "Output : 1080p${Fps} @ ${BitrateKbps}kbps -> YouTube"

$rtmp = "rtmp://a.rtmp.youtube.com/live2/$key"

$ffArgs = @(
  '-hide_banner','-loglevel','info',
  '-stream_loop','-1','-r',"$Fps",'-f','concat','-safe','0','-i', $artList,
  '-re','-stream_loop','-1','-f','concat','-safe','0','-i', $musicList,
  '-filter_complex',"[0:v]setsar=1,fps=$Fps,format=yuv420p[v]",
  '-map','[v]','-map','1:a',
  '-c:v','libx264','-preset','veryfast',
  '-b:v',"${BitrateKbps}k",'-maxrate',"${BitrateKbps}k",'-bufsize',"$($BitrateKbps * 2)k",
  '-bf','2','-g',"$($Fps * 2)",'-keyint_min',"$($Fps * 2)",'-sc_threshold','0','-profile:v','high','-level','4.2','-pix_fmt','yuv420p',
  '-c:a','aac','-b:a','192k','-ar','48000',
  '-f','flv', $rtmp
)

& ffmpeg @ffArgs
