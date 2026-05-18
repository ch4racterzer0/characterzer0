"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function HideOnHome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
