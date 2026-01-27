let interacting = false;
let timeout;

const setInteracting = () => {
  interacting = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    interacting = false;
  }, 120);
};

if (typeof window !== "undefined") {
  ["scroll", "pointerdown", "pointermove", "touchstart", "wheel"].forEach(
    (event) => {
      window.addEventListener(event, setInteracting, { passive: true });
    }
  );
}

export const isInteracting = () => interacting;
