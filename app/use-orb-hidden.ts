"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useOrbHidden(): boolean {
  const pathname = usePathname();
  const [popupOpen, setPopupOpen] = useState(false);
  const [showMode, setShowMode] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const check = () => {
      setPopupOpen(document.body.style.overflow === "hidden");
      setShowMode(document.body.dataset.showMode === "on");
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "data-show-mode"],
    });
    return () => obs.disconnect();
  }, []);

  return pathname !== "/" || popupOpen || showMode;
}
