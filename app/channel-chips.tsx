"use client";

import { IframeTilePopup } from "./iframe-tile-popup";
import { useVisualChannel } from "./visual-channel";

export function GratefulDeadChip() {
  const { setChannel } = useVisualChannel();
  return (
    <IframeTilePopup
      ariaLabel="grateful dead — channel file"
      src="/grateful-dead"
      onTriggerClick={() => setChannel("grateful-dead")}
      triggerClassName="group w-32 sm:w-36 backdrop-blur-[2px] bg-red-950/40 hover:bg-red-950/60 border border-red-300/55 hover:border-red-200/85 px-2 py-1.5 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
      triggerStyle={{
        boxShadow:
          "0 0 18px rgba(248,113,113,0.40), 0 0 40px rgba(220,38,38,0.18), 0 6px 16px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(254,202,202,0.25)",
      }}
      trigger={
        <>
          <span className="text-red-200/80 text-[7px] tracking-[0.4em] uppercase">
            ↗ channel
          </span>
          <span
            className="text-red-100 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-light text-center leading-tight"
            style={{
              textShadow:
                "0 0 10px rgba(254,202,202,0.85), 0 0 22px rgba(248,113,113,0.55)",
            }}
          >
            grateful dead
          </span>
        </>
      }
    />
  );
}
