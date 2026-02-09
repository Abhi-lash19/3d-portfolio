let interacting = false;

/**
 * Explicitly set interaction state
 * Used by canvas-bound events only
 */
export const setInteracting = (value) => {
  interacting = value;
};

/**
 * Read-only accessor
 */
export const isInteracting = () => interacting;

/**
 * Attach interaction listeners to a specific DOM element
 */
export const bindInteractionEvents = (element) => {
  if (!element) return;

  const onEnter = () => setInteracting(true);
  const onLeave = () => setInteracting(false);

  element.addEventListener("pointerenter", onEnter);
  element.addEventListener("pointerdown", onEnter);
  element.addEventListener("pointermove", onEnter);

  element.addEventListener("pointerleave", onLeave);
  element.addEventListener("pointerup", onLeave);
  element.addEventListener("pointercancel", onLeave);

  // cleanup function
  return () => {
    element.removeEventListener("pointerenter", onEnter);
    element.removeEventListener("pointerdown", onEnter);
    element.removeEventListener("pointermove", onEnter);

    element.removeEventListener("pointerleave", onLeave);
    element.removeEventListener("pointerup", onLeave);
    element.removeEventListener("pointercancel", onLeave);
  };
};
