import type { Metadata } from "next";
import Brief from "./Brief";

export const metadata: Metadata = {
  title: "Brief",
  description: "A scoping prototype of the Vorq site. Choose the work and the price updates.",
  robots: { index: false, follow: false },
};

export default function BriefPage() {
  return <Brief />;
}
