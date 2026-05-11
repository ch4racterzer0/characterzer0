$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

function Get-HexagonPoints {
  param([double]$Cx, [double]$Cy, [double]$R, [double]$RotateDeg = 30)
  $pts = New-Object 'System.Drawing.PointF[]' 6
  for ($i = 0; $i -lt 6; $i++) {
    $angle = (($i * 60) + $RotateDeg) * [Math]::PI / 180
    $x = $Cx + $R * [Math]::Cos($angle)
    $y = $Cy + $R * [Math]::Sin($angle)
    $pts[$i] = New-Object System.Drawing.PointF($x, $y)
  }
  return ,$pts
}

function Set-HQContext {
  param($Graphics)
  $Graphics.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $Graphics.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $Graphics.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
}

function New-FuturisticPng {
  param(
    [string]$OutPath,
    [int[]]$NeonRgb,   # bright accent color (3 ints)
    [int[]]$CoreRgb,   # dark core fill (3 ints)
    [ValidateSet("bin","drop")][string]$Glyph
  )
  $size = 256
  $bmp  = New-Object System.Drawing.Bitmap($size, $size)
  $g    = [System.Drawing.Graphics]::FromImage($bmp)
  Set-HQContext -Graphics $g
  $g.Clear([System.Drawing.Color]::Transparent)

  $neon = [System.Drawing.Color]::FromArgb(255, $NeonRgb[0], $NeonRgb[1], $NeonRgb[2])

  # Outer glow rings — soft hex halos
  for ($i = 0; $i -lt 5; $i++) {
    $alpha = 55 - ($i * 10)
    $col   = [System.Drawing.Color]::FromArgb($alpha, $NeonRgb[0], $NeonRgb[1], $NeonRgb[2])
    $pen   = New-Object System.Drawing.Pen($col, 2)
    $r     = 116.0 + ($i * 4)
    $pts   = Get-HexagonPoints -Cx 128 -Cy 128 -R $r
    $g.DrawPolygon($pen, $pts)
    $pen.Dispose()
  }

  # Main hex outline
  $outerPen = New-Object System.Drawing.Pen($neon, 6)
  $outerPts = Get-HexagonPoints -Cx 128 -Cy 128 -R 108
  $g.DrawPolygon($outerPen, $outerPts)
  $outerPen.Dispose()

  # Dark gradient core
  $path  = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddPolygon($outerPts)
  $brush = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
  $brush.CenterColor = [System.Drawing.Color]::FromArgb(255, $CoreRgb[0], $CoreRgb[1], $CoreRgb[2])
  $brush.SurroundColors = @([System.Drawing.Color]::FromArgb(255, 0, 0, 0))
  $g.FillPolygon($brush, $outerPts)
  $brush.Dispose()
  $path.Dispose()

  # Inner hex ring (thin)
  $innerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, $NeonRgb[0], $NeonRgb[1], $NeonRgb[2]), 2)
  $innerPts = Get-HexagonPoints -Cx 128 -Cy 128 -R 82
  $g.DrawPolygon($innerPen, $innerPts)
  $innerPen.Dispose()

  if ($Glyph -eq "bin") {
    # Three vertical capsule ribs + a cap bar — waste-portal mark
    $ribPen = New-Object System.Drawing.Pen($neon, 6)
    $ribPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $ribPen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($ribPen, 102.0, 96.0, 102.0, 162.0)
    $g.DrawLine($ribPen, 128.0, 96.0, 128.0, 162.0)
    $g.DrawLine($ribPen, 154.0, 96.0, 154.0, 162.0)
    $ribPen.Dispose()

    $capPen = New-Object System.Drawing.Pen($neon, 5)
    $capPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $capPen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($capPen, 86.0, 80.0, 170.0, 80.0)
    # Small lift handle above the cap
    $g.DrawLine($capPen, 116.0, 70.0, 140.0, 70.0)
    $capPen.Dispose()
  }
  elseif ($Glyph -eq "drop") {
    # Bold downward chevron arrow
    $arrowBrush = New-Object System.Drawing.SolidBrush($neon)
    $arrowPts = @(
      (New-Object System.Drawing.PointF(72.0, 100.0)),
      (New-Object System.Drawing.PointF(128.0, 174.0)),
      (New-Object System.Drawing.PointF(184.0, 100.0)),
      (New-Object System.Drawing.PointF(158.0, 100.0)),
      (New-Object System.Drawing.PointF(128.0, 138.0)),
      (New-Object System.Drawing.PointF(98.0, 100.0))
    )
    $g.FillPolygon($arrowBrush, $arrowPts)
    $arrowBrush.Dispose()

    # Tiny landing-dot below chevron
    $dotBrush = New-Object System.Drawing.SolidBrush($neon)
    $g.FillEllipse($dotBrush, 122, 186, 12, 12)
    $dotBrush.Dispose()
  }

  $g.Dispose()
  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

function Convert-PngToIco {
  param([string]$Src, [string]$Dst)
  $bmp = [System.Drawing.Image]::FromFile($Src)
  $target = New-Object System.Drawing.Bitmap(256, 256)
  $g = [System.Drawing.Graphics]::FromImage($target)
  Set-HQContext -Graphics $g
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, 256, 256)))
  $g.Dispose()
  $bmp.Dispose()
  $hIcon = $target.GetHicon()
  $icon  = [System.Drawing.Icon]::FromHandle($hIcon)
  $fs    = [IO.File]::Open($Dst, [IO.FileMode]::Create)
  $icon.Save($fs)
  $fs.Close()
  $icon.Dispose()
  $target.Dispose()
}

# ----- Generate the PNG icons in LOCALAPPDATA (never inside the safe folder) -----
$gen = Join-Path $env:LOCALAPPDATA "chracterzer0-icons"
New-Item -ItemType Directory -Force -Path $gen | Out-Null
$binPng  = Join-Path $gen "bin.png"
$dropPng = Join-Path $gen "drop.png"

# Recycle bin = red/amber neon waste-portal
New-FuturisticPng -OutPath $binPng  -NeonRgb 248,113,113 -CoreRgb 28,4,4   -Glyph bin
# Desktop drop = cyan/blue neon drop-portal
New-FuturisticPng -OutPath $dropPng -NeonRgb 147,197,253 -CoreRgb 4,12,30  -Glyph drop
"generated futuristic PNGs"
"  bin:  $binPng"
"  drop: $dropPng"

$dropIco = "$env:LOCALAPPDATA\chracterzer0-drop.ico"
$binIco  = "$env:LOCALAPPDATA\chracterzer0-bin.ico"
Convert-PngToIco -Src $dropPng -Dst $dropIco
Convert-PngToIco -Src $binPng  -Dst $binIco
"converted PNG -> ICO"
"  drop: $dropIco"
"  bin:  $binIco"

# ----- Recycle Bin: per-user icon override -----
$rbCls = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\CLSID\{645FF040-5081-101B-9F08-00AA002F954E}\DefaultIcon"
if (-not (Test-Path $rbCls)) { New-Item -Path $rbCls -Force | Out-Null }
Set-ItemProperty -Path $rbCls -Name "(Default)" -Value $binIco
Set-ItemProperty -Path $rbCls -Name "Empty"     -Value $binIco
Set-ItemProperty -Path $rbCls -Name "Full"      -Value $binIco
"recycle bin icon set"

# ----- Desktop drop: replace junction with a .lnk so we can attach a custom icon -----
$desktop  = [Environment]::GetFolderPath("Desktop")
$dropName = "Chracterzer" + [char]0x96f6 + [char]0x53f7
$dropPath = Join-Path $desktop $dropName

if (Test-Path -LiteralPath $dropPath) {
  $existing = Get-Item -LiteralPath $dropPath -Force
  if ($existing.Attributes -band [IO.FileAttributes]::ReparsePoint) {
    [IO.Directory]::Delete($dropPath)
    "removed old junction at $dropPath"
  }
}

# WScript.Shell can't save .lnk files with Unicode in the filename (it mangles them).
# Trick: save with an ASCII name first, then rename via .NET (which handles UTF-16 paths fine).
$ascTmp = Join-Path $desktop "chracterzer0-drop.lnk"
$shell  = New-Object -ComObject WScript.Shell
$sc     = $shell.CreateShortcut($ascTmp)
$sc.TargetPath   = "D:\chracterzer0-drop"
$sc.IconLocation = "$dropIco,0"
$sc.Description  = "drop here -- moves files into the safe folder"
$sc.Save()

$finalLnk = "$dropPath.lnk"
if (Test-Path -LiteralPath $finalLnk) { Remove-Item -LiteralPath $finalLnk -Force }
[IO.File]::Move($ascTmp, $finalLnk)
"desktop .lnk placed at: $finalLnk"

# ----- Tell Explorer to refresh -----
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class Sh {
  [DllImport("shell32.dll")] public static extern void SHChangeNotify(uint wEventId, uint uFlags, IntPtr dwItem1, IntPtr dwItem2);
}
"@
# SHCNE_ASSOCCHANGED = 0x08000000
[Sh]::SHChangeNotify(0x08000000, 0, [IntPtr]::Zero, [IntPtr]::Zero)
"shell notified"
"done."
