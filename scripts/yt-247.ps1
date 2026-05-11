# 24/7 broadcaster watchdog -- keeps the drop-artwork + starfrosch stream alive across
# ffmpeg crashes, network blips, and YouTube ingest resets. Disables system sleep on
# AC power for the duration of the run so the box stays awake without a monitor.

param(
  [string]$ArtDir       = 'D:\chracterzer0-drop',
  [string]$MusicDir     = 'C:\Users\mcfow\.stream\music\edm\starfrosch-mostwanted',
  [int]$Fps             = 30,
  [int]$BitrateKbps     = 6000,
  [double]$DisplaySec   = 4,
  [double]$FadeSec      = 2
)

$ErrorActionPreference = 'Continue'

# ----- Disable sleep + display timeouts on AC power -----
"[watchdog] disabling sleep on AC power..."
& powercfg /change standby-timeout-ac 0   | Out-Null
& powercfg /change hibernate-timeout-ac 0 | Out-Null
& powercfg /change monitor-timeout-ac 0   | Out-Null

# Layer 2: pin ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_AWAYMODE_REQUIRED for this process.
if (-not ('SleepGuard' -as [type])) {
  Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class SleepGuard {
  [DllImport("kernel32.dll")]
  public static extern uint SetThreadExecutionState(uint esFlags);
}
'@
}
[void][SleepGuard]::SetThreadExecutionState([uint32]2147483713)  # 0x80000041
"[watchdog] sleep guards armed"

$logDir = Join-Path $env:LOCALAPPDATA 'chracterzer0-stream'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$ytArt = Join-Path $PSScriptRoot 'yt-art.ps1'
$attempts = 0
while ($true) {
  $attempts++
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $log    = Join-Path $logDir "stream-$stamp.out.log"
  $errlog = Join-Path $logDir "stream-$stamp.err.log"
  "[watchdog] attempt #$attempts -> $log"

  # Run yt-art.ps1 in a fresh PowerShell process so we don't inherit ErrorActionPreference
  # quirks and ffmpeg's stderr stays cleanly redirected to its own file.
  $start = Get-Date
  $psArgs = @(
    '-NoProfile','-ExecutionPolicy','Bypass','-File', $ytArt,
    '-ArtDir',     $ArtDir,
    '-MusicDir',   $MusicDir,
    '-Fps',        $Fps,
    '-BitrateKbps',$BitrateKbps,
    '-DisplaySec', $DisplaySec,
    '-FadeSec',    $FadeSec
  )
  $proc = Start-Process -FilePath 'powershell.exe' -ArgumentList $psArgs `
            -NoNewWindow -PassThru -Wait `
            -RedirectStandardOutput $log -RedirectStandardError $errlog
  $end = Get-Date
  $elapsed = [int]($end - $start).TotalSeconds
  "[watchdog] yt-art.ps1 exited (code $($proc.ExitCode)) after ${elapsed}s"

  # Backoff: fast failures (under 30s) usually mean a persistent issue.
  $waitSec = if ($elapsed -lt 30) { 30 } else { 5 }
  "[watchdog] waiting ${waitSec}s before relaunch..."
  Start-Sleep -Seconds $waitSec
}
