"use client";

import { useEffect } from "react";

export function FrameBust() {
  useEffect(() => {
    try {
      if (window.top && window.top !== window) {
        window.top.location.replace(window.location.href);
      }
    } catch {
      try {
        window.location.replace(window.location.href);
      } catch {}
    }
  }, []);
  return null;
}
