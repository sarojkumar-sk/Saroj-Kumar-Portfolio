"use client";

import { useEffect } from "react";

/**
 * Ensures the page always opens at the very top (Hero section) on first load,
 * regardless of any previously stored URL hash or browser scroll-restoration.
 *
 * – Removes any hash from the URL silently (no navigation, no flash).
 * – Calls window.scrollTo(0, 0) before the first paint.
 * – Sets history.scrollRestoration = "manual" so the browser doesn't try
 *   to restore a prior scroll position.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Prevent browser from auto-restoring the last scroll position
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If a hash is present (e.g. /#ai-assistant from a previous session),
    // silently replace the URL with just "/" so no section is pre-targeted.
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Scroll instantly to the very top — no smooth animation on load.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Renders nothing — purely a behaviour hook.
  return null;
}
