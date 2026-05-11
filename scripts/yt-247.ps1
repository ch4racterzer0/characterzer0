# 24/7 broadcaster watchdog — keeps the drop-artwork + starfrosch stream alive across
# ffmpeg crashes, network blips, and YouTube ingest resets. Disables system sleep on
# AC power for the duration of the run so the box stays awake without a monitor.

param(
  [string]$ArtDir       = 'D:\chracterzer0-drop',
  [string]$MusicDir     = 'C:\Users\mcfow\.stream\music\edm\starfrosch-mostwanted',
  [int]$Fps             = 30,
  [int]$BitrateKbps     = 6000,
  [double]$DisplaySec   = 30,
  [double]$FadeSec      = 6
)

$ErrorActionPreference = 'Continue'

# ----- Disable system sleep while we're streaming -----
"[watchdog] disabling sleep on AC power..."
& powercfg /change standby-timeout-ac 0 | Out-Null
& powercfg /change hibernate-timeout-ac 0 | Out-Null
& powercfg /change monitor-timeout-ac 0 | Out-Null

# Layer 2: SetThreadExecutionState pins the system-required + away-mode flags
# until this process exits — survives even if powercfg gets overridden.
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class SleepGuard {
  [DllImport("kernel32.dll")]
  public static extern uint SetThreadExecutionState(uint esFlags);
}
"@ -ErrorAction SilentlyContinue
# ES_CONTINUOUS (0x80000000) | ES_SYSTEM_REQUIRED (0x00000001) | ES_AWAYMODE_REQUIRED (0x00000040)
[void][SleepGuard]::SetThreadExecutionState(0x80000041)
"[watchdog] sleep guards armed"

$logDir = Join-Path $env:LOCALAPPDATA 'chracterzer0-stream'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$attempts = 0
while ($true) {
  $attempts++
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $log = Join-Path $logDir ("stream-$stamp.log")
  "[watchdog] attempt #$attempts -> $log"

  $start = Get-Date
  try {
    & "$PSScriptRoot\yt-art.ps1" `
      -ArtDir $ArtDir -MusicDir $MusicDir -Fps $Fps -BitrateKbps $BitrateKbps `
      -DisplaySec $DisplaySec -FadeSec $FadeSec `
      *>&1 | Tee-Object -FilePath $log
  } catch {
    "[watchdog] yt-art.ps1 threw: $_" | Tee-Object -FilePath $log -Append
  }
  $end = Get-Date
  $elapsed = [int]($end - $start).TotalSeconds
  "[watchdog] yt-art.ps1 exited after ${elapsed}s"

  # Backoff: fast failures (under 30s) usually mean a persistent issue
  $waitSec = if ($elapsed -lt 30) { 30 } else { 5 }
  "[watchdog] waiting ${waitSec}s before relaunch..."
  Start-Sleep -Seconds $waitSec
}
