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

$size = 150
$bmp  = New-Object System.Drawing.Bitmap($size, $size)
$g    = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint  = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)

$cx = 75.0
$cy = 75.0

# Outer halo hexes (very faint)
for ($i = 0; $i -lt 3; $i++) {
  $alpha = 35 - ($i * 9)
  $col   = [System.Drawing.Color]::FromArgb($alpha, 147, 197, 253)
  $pen   = New-Object System.Drawing.Pen($col, 1.5)
  $r     = 64.0 + ($i * 3)
  $pts   = Get-HexagonPoints -Cx $cx -Cy $cy -R $r
  $g.DrawPolygon($pen, $pts)
  $pen.Dispose()
}

# Main hex outline
$neon = [System.Drawing.Color]::FromArgb(255, 147, 197, 253)
$outerPen = New-Object System.Drawing.Pen($neon, 2.5)
$outerPts = Get-HexagonPoints -Cx $cx -Cy $cy -R 60.0
$g.DrawPolygon($outerPen, $outerPts)
$outerPen.Dispose()

# Inner hex outline (thin)
$inner = [System.Drawing.Color]::FromArgb(180, 96, 165, 250)
$innerPen = New-Object System.Drawing.Pen($inner, 1)
$innerPts = Get-HexagonPoints -Cx $cx -Cy $cy -R 50.0
$g.DrawPolygon($innerPen, $innerPts)
$innerPen.Dispose()

# Tiny corner mark — top-left "0:0"
$cornerFont = New-Object System.Drawing.Font("Consolas", 6.5, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Point)
$cornerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 191, 219, 254))
$g.DrawString("0:0", $cornerFont, $cornerBrush, [single]6.0, [single]4.0)
$cornerBrush.Dispose()
$cornerFont.Dispose()

# 零号 in the center — glow pass then main
$glyphFont = New-Object System.Drawing.Font("Microsoft YaHei", 30, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment     = [System.Drawing.StringAlignment]::Center
$fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
$centerRect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)

# soft outer glow (low alpha, larger font passes)
foreach ($a in 30, 60, 95) {
  $gBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($a, 147, 197, 253))
  $g.DrawString([string][char]0x96f6 + [char]0x53f7, $glyphFont, $gBrush, $centerRect, $fmt)
  $gBrush.Dispose()
}

# main glyphs (bright)
$mainBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 219, 234, 254))
$g.DrawString([string][char]0x96f6 + [char]0x53f7, $glyphFont, $mainBrush, $centerRect, $fmt)
$mainBrush.Dispose()
$glyphFont.Dispose()
$fmt.Dispose()

$out = Join-Path $env:LOCALAPPDATA "chracterzer0-watermark.png"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

"wrote watermark: $out"
