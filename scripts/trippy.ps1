param(
  [int]$OutputIdx = 1,
  [int]$Fps = 30,
  [int]$GuyX = 850,
  [int]$GuyY = 600,
  [int]$GuyW = 250,
  [int]$GuyH = 320
)

$ErrorActionPreference = 'Stop'

$ffmpegExe = (Get-Command ffmpeg).Source
$ffplayExe = Join-Path (Split-Path $ffmpegExe) 'ffplay.exe'
if (-not (Test-Path $ffplayExe)) { throw "ffplay.exe not found next to ffmpeg." }

# Round 5 — full color wheel: 5 hue-shifted clones at 72-degree spacing on widened
# Lissajous orbits, the global hue cycle is halved (16s), sphere fov widens with roll
# added so the whole comp tumbles, and trails linger longer.
$chain = @(
  "ddagrab=output_idx=${OutputIdx}:framerate=${Fps},hwdownload,format=bgra,split=6[bg][a][b][c][d][e]"
  "[a]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=0:s=1.45[A]"
  "[b]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=72:s=1.45[B]"
  "[c]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=144:s=1.45[C]"
  "[d]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=216:s=1.45[D]"
  "[e]crop=${GuyW}:${GuyH}:${GuyX}:${GuyY},hue=h=288:s=1.45[E]"
  "[bg][A]overlay=x='${GuyX}+450*sin(t*0.25)':y='${GuyY}+150*cos(t*0.35)':eval=frame[s1]"
  "[s1][B]overlay=x='${GuyX}+200*sin(t*0.50+1.25)':y='${GuyY}+220*cos(t*0.40+1.25)':eval=frame[s2]"
  "[s2][C]overlay=x='${GuyX}+520*sin(t*0.30+2.51)':y='${GuyY}+120*cos(t*0.32+2.51)':eval=frame[s3]"
  "[s3][D]overlay=x='${GuyX}+250*sin(t*0.65+3.77)':y='${GuyY}+180*cos(t*0.70+3.77)':eval=frame[s4]"
  "[s4][E]overlay=x='${GuyX}+400*sin(t*0.20+5.03)':y='${GuyY}+90*cos(t*0.25+5.03)':eval=frame[s5]"
  "[s5]hue=H=2*PI*t/16:s=1.4,lagfun=decay=0.78,v360=input=flat:output=fisheye:ih_fov=150:iv_fov=100,rotate=angle=PI*sin(t*0.08)/10:c=black,vignette,format=yuv420p"
) -join ';'

& $ffplayExe -hide_banner -loglevel info `
  -fflags nobuffer -flags low_delay -framedrop `
  -window_title 'trippy r5' `
  -init_hw_device d3d11va `
  -f lavfi -i $chain
