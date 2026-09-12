// src/utils/useMediaQuery.js

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * Replaces the matchMedia + addEventListener block that was copy-pasted into
 * SectionWrapper, Works, Experience and the Computers canvas.
 *
 * useSyncExternalStore keeps the first render correct (no flash of the wrong
 * layout) without calling setState inside an effect.
 */
export const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // never matches when there is no browser (kept for safety, app is client-only)
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
