import { useRef } from "react";

export const useMagnetic = (strength = 0.25) => {
    const ref = useRef(null);

    const onMouseMove = (e) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;

        el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onMouseLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0px, 0px)";
    };

    return { ref, onMouseMove, onMouseLeave };
};
