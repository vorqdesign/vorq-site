import type { Metadata } from "next";
import Field from "./Field";

export const metadata: Metadata = {
  title: "Field",
  description: "A spatial prototype of the Vorq site. Drag through the work, the prices, and booking.",
  robots: { index: false, follow: false },
};

export default function FieldPage() {
  return <Field />;
}
