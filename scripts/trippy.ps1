param(
  [int]$OutputIdx = 1,
  [int]$Fps = 30,
  [int]$GuyX = 800,
  [int]$GuyY = 700,
  [int]$GuyW = 300,
  [int]$GuyH = 280
)

$ErrorActionPreference = 'Stop'

$ffmpegExe = (Get-Command ffmpeg).Source
$ffplayExe = Join-Path (Split-Path $ffmpegExe) 'ffplay.exe'
if (-not (Test-Path $ffplayExe)) { throw "ffplay.exe not found next to ffmpeg." }

# Round 3 — three hue-shifted clones of the figure on desynced Lissajous paths,
# laid over the live capture, with a slow rainbow hue sweep, lagfun trails, and a vignette.
# Defaults aim at the hooded figure on the home grid; pass -GuyX/-GuyY/-GuyW/-GuyH if off.
$chain = @(
  "ddagrab=output_idx=${OutputIdx}:framerate=${Fps},hwdownload,format=bgra,split=4[bg][a][b][c]"
  "[a]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=0:s=1.3[A]"
  "[b]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=120:s=1.3[B]"
  "[c]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=240:s=1.3[C]"
  "[bg][A]overlay=x='${GuyX}+340*sin(t*0.30)':y='${GuyY}+100*cos(t*0.40)':eval=frame[s1]"
  "[s1][B]overlay=x='${GuyX}+280*sin(t*0.45+1.5)':y='${GuyY}+130*cos(t*0.55+1.5)':eval=frame[s2]"
  "[s2][C]overlay=x='${GuyX}+380*sin(t*0.60+3.0)':y='${GuyY}+90*cos(t*0.50+3.0)':eval=frame[s3]"
  "[s3]hue=H=2*PI*t/30:s=1.15,lagfun=decay=0.82,vignette,format=yuv420p"
) -join ';'

& $ffplayExe -hide_banner -loglevel info `
  -fflags nobuffer -flags low_delay -framedrop `
  -window_title 'trippy r3' `
  -init_hw_device d3d11va `
  -f lavfi -i $chain
