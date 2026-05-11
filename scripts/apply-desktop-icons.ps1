param(
  [string]$DropPng = "D:\vercel\characterzer0\public\Chracterzer" + [char]0x96f6 + [char]0x53f7 + "\5b28622c-5b40-448f-a59c-c7e6bd275a0d.png",
  [string]$BinPng  = "D:\vercel\characterzer0\public\Chracterzer" + [char]0x96f6 + [char]0x53f7 + "\cc78a07c-13f9-45c5-8adc-2106f8e0c3e7.png"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

function Convert-PngToIco {
  param([string]$Src, [string]$Dst)
  $bmp = [System.Drawing.Image]::FromFile($Src)
  # Resize to 256x256 if larger; many Windows components prefer this max
  $target = New-Object System.Drawing.Bitmap(256, 256)
  $g = [System.Drawing.Graphics]::FromImage($target)
  $g.InterpolationMode = "HighQualityBicubic"
  $g.SmoothingMode = "AntiAlias"
  $g.PixelOffsetMode = "HighQuality"
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, 256, 256)))
  $g.Dispose()
  $bmp.Dispose()
  $hIcon = $target.GetHicon()
  $icon = [System.Drawing.Icon]::FromHandle($hIcon)
  $fs = [IO.File]::Open($Dst, [IO.FileMode]::Create)
  $icon.Save($fs)
  $fs.Close()
  $icon.Dispose()
  $target.Dispose()
}

$dropIco = "$env:LOCALAPPDATA\chracterzer0-drop.ico"
$binIco  = "$env:LOCALAPPDATA\chracterzer0-bin.ico"
Convert-PngToIco -Src $DropPng -Dst $dropIco
Convert-PngToIco -Src $BinPng  -Dst $binIco
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
$desktop = [Environment]::GetFolderPath("Desktop")
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
$shell = New-Object -ComObject WScript.Shell
$sc = $shell.CreateShortcut($ascTmp)
$sc.TargetPath = "D:\chracterzer0-drop"
$sc.IconLocation = "$dropIco,0"
$sc.Description = "drop here -- moves files into the safe folder"
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
# SHCNE_ASSOCCHANGED = 0x08000000, SHCNF_IDLIST = 0x0000
[Sh]::SHChangeNotify(0x08000000, 0, [IntPtr]::Zero, [IntPtr]::Zero)
"shell notified"
"done."
