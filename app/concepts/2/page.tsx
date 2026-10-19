import type { Metadata } from "next";
import Desk from "./Desk";

export const metadata: Metadata = {
  title: "Desk",
  description: "A studio-machine prototype of the Vorq site. Open work, prices, and booking as windows.",
  robots: { index: false, follow: false },
};

export default function DeskPage() {
  return <Desk />;
}
