param(
  [int]$OutputIdx = 1,
  [int]$Fps = 30,
  [int]$GuyX = 720,
  [int]$GuyY = 280,
  [int]$GuyW = 480,
  [int]$GuyH = 600,
  [int]$DriftX = 220,
  [int]$DriftY = 90,
  [double]$OmegaX = 0.4,
  [double]$OmegaY = 0.55
)

$ErrorActionPreference = 'Stop'

$ffmpegExe = (Get-Command ffmpeg).Source
$ffplayExe = Join-Path (Split-Path $ffmpegExe) 'ffplay.exe'
if (-not (Test-Path $ffplayExe)) { throw "ffplay.exe not found next to ffmpeg." }

# Round 2 — split the Dell capture, crop a rectangular slice ("the guy"), and overlay
# the slice back onto the original frame with a slow sine drift. He appears twice: anchored
# in his real spot plus a floating clone. Edges are still hard; round 3 softens + dims source.
$chain = "ddagrab=output_idx=${OutputIdx}:framerate=${Fps},hwdownload,format=bgra,split=2[bg][src];[src]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY}[guy];[bg][guy]overlay=x='${GuyX}+${DriftX}*sin(t*${OmegaX})':y='${GuyY}+${DriftY}*sin(t*${OmegaY})':eval=frame,format=yuv420p"

& $ffplayExe -hide_banner -loglevel info `
  -fflags nobuffer -flags low_delay -framedrop `
  -window_title 'trippy r2' `
  -init_hw_device d3d11va `
  -f lavfi -i $chain
