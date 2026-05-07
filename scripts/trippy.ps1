param(
  [int]$OutputIdx = 1,
  [int]$Fps = 30
)

$ErrorActionPreference = 'Stop'

$ffmpegExe = (Get-Command ffmpeg).Source
$ffplayExe = Join-Path (Split-Path $ffmpegExe) 'ffplay.exe'
if (-not (Test-Path $ffplayExe)) { throw "ffplay.exe not found next to ffmpeg." }

# Round 1 — one overlay glyph rising up the frame from the Dell capture.
# ffplay reads the whole chain as a lavfi input; SDL output device isn't shipped in this build.
$chain = "ddagrab=output_idx=${OutputIdx}:framerate=${Fps},hwdownload,format=bgra,drawtext=fontfile=C\:/Windows/Fonts/arial.ttf:text=NOTE:fontsize=160:fontcolor=white@0.85:x=(w-tw)/2:y=h-200-(t*40):borderw=4:bordercolor=black@0.6,format=yuv420p"

& $ffplayExe -hide_banner -loglevel info `
  -fflags nobuffer -flags low_delay -framedrop `
  -window_title 'trippy r1' `
  -init_hw_device d3d11va `
  -f lavfi -i $chain
