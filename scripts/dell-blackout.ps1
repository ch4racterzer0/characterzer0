$ErrorActionPreference = "Stop"

# 1) make a 1920x1080 solid black wallpaper file
$bg = "$env:LOCALAPPDATA\chracterzer0-black.png"
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(1920, 1080)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::Black)
$g.Dispose()
$bmp.Save($bg, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "wrote black wallpaper to $bg"

# 2) Define the IDesktopWallpaper interface + a static helper that does everything
#    inside C# so PowerShell doesn't have to manage the typed interface reference
Add-Type -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
[ComImport, Guid("B92B56A9-8B55-4E14-9A89-0199BBB6F93B"),
 InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public interface IDesktopWallpaper {
    void SetWallpaper([MarshalAs(UnmanagedType.LPWStr)] string monitorID, [MarshalAs(UnmanagedType.LPWStr)] string wallpaper);
    [return: MarshalAs(UnmanagedType.LPWStr)] string GetWallpaper([MarshalAs(UnmanagedType.LPWStr)] string monitorID);
    [return: MarshalAs(UnmanagedType.LPWStr)] string GetMonitorDevicePathAt(uint monitorIndex);
    uint GetMonitorDevicePathCount();
    void GetMonitorRECT([MarshalAs(UnmanagedType.LPWStr)] string monitorID, out RECT rect);
    void SetBackgroundColor(uint color);
    uint GetBackgroundColor();
    void SetPosition(int position);
    int GetPosition();
    void SetSlideshow(IntPtr items);
    IntPtr GetSlideshow();
    void SetSlideshowOptions(int options, uint slideshowTick);
    void GetSlideshowOptions(out int options, out uint slideshowTick);
    void AdvanceSlideshow([MarshalAs(UnmanagedType.LPWStr)] string monitorID, int direction);
    int GetStatus();
    void Enable(int enable);
}
[StructLayout(LayoutKind.Sequential)] public struct RECT { public int L, T, R, B; }
public static class WP {
    static IDesktopWallpaper Get() {
        Type t = Type.GetTypeFromCLSID(new Guid("C2CF3110-460E-4fc1-B9D0-8A1C0C9CC4BD"));
        return (IDesktopWallpaper)Activator.CreateInstance(t);
    }
    public static string[] List() {
        var dw = Get();
        uint n = dw.GetMonitorDevicePathCount();
        var ids = new List<string>();
        for (uint i = 0; i < n; i++) ids.Add(dw.GetMonitorDevicePathAt(i));
        return ids.ToArray();
    }
    public static void SetForMatch(string substring, string wallpaperPath) {
        var dw = Get();
        uint n = dw.GetMonitorDevicePathCount();
        for (uint i = 0; i < n; i++) {
            string id = dw.GetMonitorDevicePathAt(i);
            if (id != null && (id.IndexOf(substring, StringComparison.OrdinalIgnoreCase) >= 0)) {
                dw.SetBackgroundColor(0);
                dw.SetPosition(0);
                dw.SetWallpaper(id, wallpaperPath);
                return;
            }
        }
        throw new Exception("no monitor matched: " + substring);
    }
}
"@

"`nmonitor inventory (IDesktopWallpaper):"
[WP]::List() | ForEach-Object { "  $_" }

# Dell SE2425HM has manufacturer code DELF in its EDID device path
"`napplying black wallpaper to the Dell monitor (DELF*)..."
[WP]::SetForMatch("DELF", $bg)
"  done."

# 3) turn OFF "Show my taskbar on all displays" so the taskbar lives only on the primary
$tbKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced"
if (-not (Test-Path $tbKey)) { New-Item -Path $tbKey -Force | Out-Null }
Set-ItemProperty -Path $tbKey -Name "MMTaskbarEnabled" -Type DWord -Value 0
"`nMMTaskbarEnabled=0 (taskbar will only show on the primary monitor)"

# 4) Restart Explorer so the new taskbar setting takes effect
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 800
Start-Process explorer.exe
"restarted explorer.exe"

"`ndone -- Dell should now be black with no taskbar."
