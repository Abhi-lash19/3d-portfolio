// src/components/Tech.jsx

import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";


/* Container stagger — calm */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

/* Card reveal */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Tech = () => {
  const canHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(hover: none)").matches;
  }, []);

  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center max-w-3xl"
      >
        <p className={styles.sectionSubText}>My daily toolkit</p>
        <h2 className={styles.sectionHeadText}>
          Technologies I build with
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10"
      >
        {technologies.map((technology) => (
          <motion.div
            key={technology.name}
            variants={cardVariants}
            whileHover={
              canHover && !prefersReducedMotion
                ? {
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.25, ease: "easeOut" },
                }
                : undefined
            }
            className="
              group relative
              w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
              rounded-2xl
              bg-white/10 border border-white/15
              backdrop-blur-md
              flex items-center justify-center
              overflow-hidden
            "
            style={{
              // brighter soft white shadow so cards don’t look too dark
              boxShadow:
                "0 10px 40px rgba(145,94,255,0.18), 0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            {/* one-time shimmer loading sweep */}
            <motion.div
              variants={{
                hidden: { x: "-120%", opacity: 0 },
                show: {
                  x: "120%",
                  opacity: 1,
                  transition: {
                    duration: prefersReducedMotion ? 0 : 0.8,
                    ease: "easeInOut",
                  },
                },
              }}
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent via-white/25 to-transparent
                pointer-events-none
              "
            />

            {/* subtle static glow */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(145,94,255,0.25), transparent 60%)",
              }}
            />

            {/* icon */}
            <img
              src={technology.icon}
              alt={technology.name}
              loading="lazy"
              className="
                w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
                object-contain z-10
                transition-all duration-300
                grayscale opacity-70
                group-hover:grayscale-0 group-hover:opacity-100
                group-hover:scale-110
              "
              style={{
                filter: canHover
                  ? "drop-shadow(0 6px 18px rgba(145,94,255,0.35))"
                  : "none",
              }}
            />


            {/* tooltip */}
            {canHover && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="
                  pointer-events-none
                  absolute -bottom-9
                  px-3 py-1
                  rounded-md
                  bg-black/80 text-white
                  text-[11px] tracking-wide
                  whitespace-nowrap
                "
              >
                {technology.name}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const WrappedTech = SectionWrapper(Tech, "tech");
export default WrappedTech;
