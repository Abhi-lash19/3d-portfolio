// src/components/canvas/useVisibleFrameloop.js

import { useEffect, useRef, useState } from "react";
import { invalidate } from "@react-three/fiber";

/**
 * Watches a <Canvas> element and reports whether it is on screen, so a canvas
 * can be dropped out of the "always" frameloop while the user cannot see it.
 *
 * Returns [ref, isVisible] — attach the ref to <Canvas> (R3F forwards it to the
 * underlying <canvas> element, so no extra wrapper markup is needed).
 */
export const useVisibleFrameloop = (rootMargin = "200px") => {
  const ref = useRef(null);
  // Assume visible until the observer says otherwise. If the browser has no
  // IntersectionObserver we simply never pause, which is the current behaviour.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  // R3F's render loop is shared by every canvas on the page and shuts itself
  // down once they are all idle, so coming back into view needs an explicit
  // nudge. requestAnimationFrame guarantees this runs after React has applied
  // the restored frameloop prop.
  useEffect(() => {
    if (!isVisible) return;
    const id = requestAnimationFrame(() => invalidate());
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  return [ref, isVisible];
};
