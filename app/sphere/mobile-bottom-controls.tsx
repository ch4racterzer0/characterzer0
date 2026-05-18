"use client";

import { MusicPodcastPair } from "../music-podcast-pair";

export function MobileBottomControls() {
  return (
    <div className="sm:hidden fixed bottom-4 left-0 right-0 z-30 flex flex-row items-center justify-center gap-3 px-4 pointer-events-none [&>button]:pointer-events-auto">
      <MusicPodcastPair />
    </div>
  );
}
