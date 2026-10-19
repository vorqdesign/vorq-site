"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const concept = path.startsWith("/concepts");
  return (
    <>
      {concept ? null : <SiteNav />}
      {children}
      {concept ? null : <SiteFooter />}
    </>
  );
}
