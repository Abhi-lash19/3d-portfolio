/* eslint-disable react-hooks/refs */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { socials } from "../constants";
import { setStarsDim } from "./canvas/starsState";
import { useMagnetic } from "../utils/useMagnetic";

/* -----------------------------
   Social Icon (hook-safe)
----------------------------- */
const SocialIcon = ({ href, icon, label }) => {
    const magnetic = useMagnetic(0.3);

    return (
        <a
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
        group
        w-12 h-12
        rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/15
        grid place-items-center
        transition-all duration-300
        hover:bg-white/20
        hover:shadow-[0_0_25px_rgba(145,94,255,0.8)]
        active:scale-95
      "
        >
            <img
                src={icon}
                alt={label}
                className="
          w-5 h-5
          opacity-80
          transition-all duration-300
          group-hover:opacity-100
          group-hover:scale-110
        "
            />
        </a>
    );
};

const Footer = () => {
    const year = new Date().getFullYear();
    const ref = useRef(null);

    const [showTop, setShowTop] = useState(false);
    const [activeLink, setActiveLink] = useState(null);

    /* Scroll-based glass */
    const { scrollY } = useScroll();
    const glassOpacity = useTransform(scrollY, [0, 600], [0.4, 0.75]);

    /* Footer → Stars parallax sync */
    const starsParallax = useTransform(scrollY, [0, 800], [1, 0.85]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setStarsDim(entry.isIntersecting),
            { threshold: 0.25 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Push parallax value to stars system */
    useEffect(() => {
        const unsubscribe = starsParallax.on("change", (v) => {
            window.dispatchEvent(
                new CustomEvent("stars-parallax", { detail: v })
            );
        });
        return () => unsubscribe();
    }, [starsParallax]);

    return (
        <motion.footer
            ref={ref}
            style={{ backgroundColor: glassOpacity }}
            className="
        relative w-full
        backdrop-blur-md
        border-t border-white/10
        shadow-[0_-10px_40px_rgba(0,0,0,0.6)]
        overflow-hidden
      "
        >
            {/* Glass highlight layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="noise" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-7xl mx-auto px-6 py-20"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 items-start">
                    {/* LEFT */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-[32px] font-semibold tracking-wide">
                            Abhilash
                        </h3>

                        <p className="text-sm text-white/60 max-w-sm mx-auto sm:mx-0 leading-relaxed">
                            Creative developer crafting immersive, performant web experiences
                            with React & Three.js.
                        </p>

                        {/* Social Icons */}
                        <div className="flex justify-center sm:justify-start gap-5 pt-3">
                            {socials.map((item) => (
                                <SocialIcon key={item.label} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT – NAV */}
                    <nav className="relative flex flex-col items-center sm:items-end gap-8">
                        <motion.span
                            layout
                            className="absolute right-0 w-2 h-2 rounded-full bg-accent"
                            style={{
                                top: activeLink !== null ? `${activeLink * 56}px` : "0px",
                                opacity: activeLink !== null ? 1 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />

                        {["About", "Work", "Contact"].map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onMouseEnter={() => setActiveLink(index)}
                                onMouseLeave={() => setActiveLink(null)}
                                className="
                  caveat-nav
                  text-[26px]
                  text-white/80
                  tracking-widest
                  transition-all duration-300
                  hover:text-white
                "
                                style={{ fontFamily: "'Caveat', cursive" }}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="my-12 h-px bg-white/10" />

                <p className="text-center text-[11px] text-white/45">
                    © {year} Abhilash Kumar Giri · Crafted with React & Three.js
                </p>
            </motion.div>

            {/* Back to top */}
            {showTop && (
                <button
                    onClick={() =>
                        document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="
            fixed bottom-6 right-6
            w-12 h-12
            rounded-full
            bg-black/60 backdrop-blur-md
            border border-white/20
            text-white
            grid place-items-center
            transition-all duration-300
            hover:scale-110
            hover:shadow-[0_0_25px_rgba(145,94,255,0.8)]
            active:scale-95
          "
                >
                    ↑
                </button>
            )}
        </motion.footer>
    );
};

export default Footer;
