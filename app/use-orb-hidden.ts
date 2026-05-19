"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useOrbHidden(): boolean {
  const pathname = usePathname();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const check = () =>
      setPopupOpen(document.body.style.overflow === "hidden");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => obs.disconnect();
  }, []);

  return pathname !== "/sphere" || popupOpen;
}
