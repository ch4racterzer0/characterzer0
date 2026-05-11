#Requires AutoHotkey v2.0
#SingleInstance Force

; Chracterzer零号 hotkeys
;   Ctrl+Alt+Z  ->  零号
;   Ctrl+Alt+C  ->  Chracterzer零号  (full brand)
;   Ctrl+Alt+S  ->  signature block
;   Ctrl+Alt+R  ->  reload this script after edits

^!z::Send("{Text}零号")

^!c::Send("{Text}Chracterzer零号")

^!s::Send("{Text}— roger woolfe`nChracterzer零号")

^!r::Reload
