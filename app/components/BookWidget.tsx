"use client";

import Script from "next/script";
import { calendlyUrl, site } from "@/lib/content";

export default function BookWidget() {
  return (
    <div className="calendar">
      <p className="calendar-fallback">
        Loading the calendar. If it doesn’t appear, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <div
        className="calendly-inline-widget"
        data-url={calendlyUrl}
        style={{ minWidth: "280px", height: "720px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </div>
  );
}
