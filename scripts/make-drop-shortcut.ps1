$ErrorActionPreference = "Stop"

$target = "D:\vercel\characterzer0\public\Chracterzer" + [char]0x96f6 + [char]0x53f7
if (-not (Test-Path -LiteralPath $target)) {
  New-Item -ItemType Directory -Path $target -Force | Out-Null
}

# A black 256x256 icon so the shortcut renders as a near-invisible "hole" on the desktop
Add-Type -AssemblyName System.Drawing
$icoPath = "$env:LOCALAPPDATA\chracterzer0-hole.ico"
$bmp = New-Object System.Drawing.Bitmap(256, 256)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::Black)
# faint blue ring
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 96, 165, 250)), 2
$g.SmoothingMode = "AntiAlias"
$g.DrawEllipse($pen, 16, 16, 224, 224)
$pen.Dispose()
$g.Dispose()
$hIcon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = [IO.File]::OpenWrite($icoPath)
$icon.Save($fs)
$fs.Close()
$icon.Dispose()
$bmp.Dispose()
"wrote hole icon to $icoPath"

# Put a junction (folder symlink) directly on the desktop. Junctions accept drag-drop into them
# exactly like a normal folder, and PowerShell's New-Item handles Unicode names cleanly --
# no WScript.Shell .lnk encoding issues.
$desktop = [Environment]::GetFolderPath("Desktop")
$dropName = "Chracterzer" + [char]0x96f6 + [char]0x53f7
$dropPath = Join-Path $desktop $dropName

if (Test-Path -LiteralPath $dropPath) {
  $existing = Get-Item -LiteralPath $dropPath -Force
  if ($existing.Attributes -band [IO.FileAttributes]::ReparsePoint) {
    # Already a junction/symlink -- remove and recreate to refresh target
    [IO.Directory]::Delete($dropPath)
  } else {
    throw "$dropPath already exists and is not a junction; refusing to touch it"
  }
}

# PowerShell 5.1's New-Item -ItemType Junction requires the Value parameter for the target
$junction = New-Item -ItemType Junction -Path $dropPath -Value $target -Force
"junction placed on desktop: $dropPath"
"  -> $target"
