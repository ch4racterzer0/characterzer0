param(
  [string]$ArtDir       = 'D:\chracterzer0-drop',
  [string]$MusicDir     = 'C:\Users\mcfow\.stream\music\edm\starfrosch-mostwanted',
  [int]$Fps             = 30,
  [int]$BitrateKbps     = 6000,
  [double]$DisplaySec   = 30,
  [double]$FadeSec      = 6,
  [int]$MinImageBytes   = 200000
)

$ErrorActionPreference = 'Stop'

$keyPath = Join-Path $env:USERPROFILE '.stream\youtube.key'
$key = (Get-Content -Raw $keyPath).Trim()
if (-not $key) { throw "Empty stream key at $keyPath" }

# ----- Pull drop-artwork PNGs (skip tiny PNGs: screenshots, watermark, etc.) -----
$images = Get-ChildItem -Path $ArtDir -File -Filter *.png |
  Where-Object { $_.Length -gt $MinImageBytes } |
  Sort-Object Name
if ($images.Count -lt 2) { throw "Need at least 2 drop-artwork PNGs in $ArtDir; got $($images.Count)" }
Write-Host "Drop-artwork: cycling $($images.Count) frames (display ${DisplaySec}s, fade ${FadeSec}s)"

# ----- Decide whether to re-render: cache slideshow.mp4 unless drop-artwork is newer -----
$slideshow = Join-Path $env:TEMP 'yt-art-slideshow.mp4'
$newestArtTime = ($images | Sort-Object LastWriteTime -Descending | Select-Object -First 1).LastWriteTime

$needRender = $true
if (Test-Path $slideshow) {
  $slideTime = (Get-Item $slideshow).LastWriteTime
  if ($slideTime -gt $newestArtTime) {
    $needRender = $false
    Write-Host "slideshow.mp4 cache is fresh -- skipping render"
  }
}

if ($needRender) {
  # Normalize each frame to 1920x1080 yuv420p JPG (uniform for xfade)
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

  if (Test-Path $slideshow) { Remove-Item $slideshow -Force }

  $N = $preppedPaths.Count
  $perFrameSec = $DisplaySec + $FadeSec
  $totalSec    = $N * $perFrameSec

  $slideArgs = @('-hide_banner','-loglevel','warning','-y')
  foreach ($p in $preppedPaths) {
    $slideArgs += @('-loop','1','-t',"$perFrameSec",'-i', $p)
  }
  $slideArgs += @('-loop','1','-t',"$perFrameSec",'-i', $preppedPaths[0])

  $xfadeParts = @()
  $prev = '0:v'
  for ($k = 1; $k -le $N; $k++) {
    $offset = ($k * $DisplaySec) + (($k - 1) * $FadeSec)
    $next   = "$($k):v"
    $label  = if ($k -eq $N) { 'v' } else { "x$k" }
    $xfadeParts += "[$prev][$next]xfade=transition=fade:duration=${FadeSec}:offset=${offset}[$label]"
    $prev = $label
  }
  $filter = ($xfadeParts -join ';')

  $slideArgs += @(
    '-filter_complex', $filter,
    '-map','[v]',
    '-r',"$Fps",
    '-t',"$totalSec",
    '-c:v','libx264','-preset','veryfast','-pix_fmt','yuv420p','-profile:v','high','-level','4.2',
    '-bf','2','-g',"$($Fps * 2)",'-keyint_min',"$($Fps * 2)",'-sc_threshold','0',
    '-an',
    $slideshow
  )

  Write-Host "Rendering slideshow.mp4 (${totalSec}s loop)..."
  & ffmpeg @slideArgs
  if (-not (Test-Path $slideshow)) { throw "slideshow render failed" }
  Write-Host "  -> $slideshow"
}

# ----- Music playlist (shuffled, looped forever) -----
$tracks = Get-ChildItem -Path $MusicDir -Recurse -File -Include *.mp3,*.m4a,*.flac,*.wav,*.ogg,*.aac,*.opus | Get-Random -Count ([int]::MaxValue)
if (-not $tracks) { throw "No audio files under $MusicDir" }
$musicList = Join-Path $env:TEMP 'yt-art-music.txt'
$mlines = foreach ($t in $tracks) {
  $p = $t.FullName -replace '\\','/' -replace "'","'\''"
  "file '$p'"
}
Set-Content -Path $musicList -Value $mlines -Encoding ASCII
Write-Host "Music: shuffled loop of $($tracks.Count) tracks"

# ----- Stream slideshow.mp4 (loop) + music (loop) to YouTube -----
$rtmp = "rtmp://a.rtmp.youtube.com/live2/$key"
Write-Host "Pushing 1080p${Fps} @ ${BitrateKbps}kbps -> YouTube"

$ffArgs = @(
  '-hide_banner','-loglevel','info',
  '-re','-stream_loop','-1','-i', $slideshow,
  '-re','-stream_loop','-1','-f','concat','-safe','0','-i', $musicList,
  '-map','0:v:0','-map','1:a:0',
  '-c:v','libx264','-preset','veryfast',
  '-b:v',"${BitrateKbps}k",'-maxrate',"${BitrateKbps}k",'-bufsize',"$($BitrateKbps * 2)k",
  '-bf','2','-g',"$($Fps * 2)",'-keyint_min',"$($Fps * 2)",'-sc_threshold','0','-profile:v','high','-level','4.2','-pix_fmt','yuv420p',
  '-c:a','aac','-b:a','192k','-ar','48000',
  '-f','flv', $rtmp
)

& ffmpeg @ffArgs
