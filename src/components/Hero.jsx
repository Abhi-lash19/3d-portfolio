// src/components/Hero.jsx

import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";

// lazy import so 3D loads only when needed
const LazyComputersCanvas = lazy(() =>
  import("./canvas").then((m) => ({ default: m.ComputersCanvas }))
);

const Hero = () => {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // scroll progress for scroll-reactive polish (GPU-friendly)
  const { scrollYProgress } = useScroll();
  // Motion automatically stops once user scrolls past hero
  const textY = useTransform(
    scrollYProgress,
    [0, 0.2],
    hasInteracted ? [0, 0] : [0, -40]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    hasInteracted ? [1, 1] : [1, 0]
  );

  //scroll indicator fades away as user scrolls
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.05],
    [1, 0]
  );

  // hide scroll indicator after first interaction
  useEffect(() => {
    const hide = () => {
      setShowScrollHint(false);
      setHasInteracted(true); // freeze decorative motion after intent
    };

    const timeout = setTimeout(hide, 4000); // auto-hide after 4s

    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("touchstart", hide, { passive: true });
    window.addEventListener("wheel", hide, { passive: true });
    window.addEventListener("keydown", hide);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("touchstart", hide);
      window.removeEventListener("wheel", hide);
      window.removeEventListener("keydown", hide);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden">
      {/* TEXT LAYER */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, userSelect: "none" }}
        className={`
          relative z-10
          max-w-7xl mx-auto
          ${styles.paddingX}
          pt-[140px]
          pb-[320px] sm:pb-[200px]
          flex flex-row items-start gap-5
        `}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          {/* Ball tip color changed */}
          <div className="w-5 h-5 rounded-full bg-[#3B82F6]" />
          <div className="w-1 sm:h-80 h-40 sapphire-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m{" "}
            <span className="text-[#3B82F6]">Abhilash</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I build backend systems, cloud <br className="sm:block hidden" />
            infrastructure and CI/CD automation
          </p>
        </div>
      </motion.div>

      {/* 3D VISUAL LAYER */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <LazyComputersCanvas />
        </Suspense>
      </div>

      {/* SCROLL INDICATOR — scroll-reactive (no infinite loop jank) */}
      {showScrollHint && (
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 w-full flex justify-center z-10 pointer-events-none"
        >
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ y: [0, 6, 0] }} // subtle idle motion only before interaction
            transition={{
              duration: 2.2,
              repeat: hasInteracted ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="block w-[1px] h-6 bg-white/40" />
            <span className="text-white/50 text-xs">↓</span>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
