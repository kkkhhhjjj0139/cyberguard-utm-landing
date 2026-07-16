"use client";

import { useEffect, useRef } from "react";
import { trackPageView, trackScrollDepth } from "@/lib/analytics";
import { captureUtmFromUrl } from "@/lib/utm";

export default function AnalyticsTracker() {
  const scrolled50 = useRef(false);
  const scrolled90 = useRef(false);

  useEffect(() => {
    captureUtmFromUrl();
    trackPageView();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) return;

      const percent = (scrollTop / height) * 100;

      if (!scrolled50.current && percent >= 50) {
        scrolled50.current = true;
        trackScrollDepth(50);
      }
      if (!scrolled90.current && percent >= 90) {
        scrolled90.current = true;
        trackScrollDepth(90);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
