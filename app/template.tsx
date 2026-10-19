"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/concepts")) return children;
  return <div className="page-in">{children}</div>;
}
