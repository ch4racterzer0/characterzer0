param(
  [int]$OutputIdx = 1,
  [int]$Fps = 30
)

$ErrorActionPreference = 'Stop'

# Round 1 — one overlay glyph rising up the frame from the Dell capture.
# Local SDL preview only. Kill with Ctrl+C in this terminal.
$chain = "ddagrab=output_idx=${OutputIdx}:framerate=${Fps},hwdownload,format=bgra,drawtext=fontfile=C\:/Windows/Fonts/arial.ttf:text=NOTE:fontsize=160:fontcolor=white@0.85:x=(w-tw)/2:y=h-200-(t*40):borderw=4:bordercolor=black@0.6,format=yuv420p"

& ffmpeg -hide_banner -loglevel warning `
  -init_hw_device d3d11va `
  -filter_complex $chain `
  -f sdl 'trippy r1'
