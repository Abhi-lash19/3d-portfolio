// src/components/Tech.jsx

import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

// Stagger reveal container
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

// Floating idle animation (subtle + continuous)
const floatingAnimation = (i) => ({
  y: [0, -12, 0], // more floating than before (-7)
  transition: {
    duration: 2.4 + (i % 3) * 0.35, // slightly faster + dynamic
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay: i * 0.05,
  },
});

// Glow animation: starts bright, dims slightly but NEVER disappears
const glowAnimation = (i) => ({
  opacity: [1, 0.65, 1], // stays visible always
  transition: {
    duration: 2.6 + (i % 3) * 0.25,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay: i * 0.08,
  },
});

// Each card reveal animation (includes floating)
const cardRevealVariants = (i) => ({
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 },
    ...floatingAnimation(i),
  },
});

const Tech = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Heading + Subheading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="text-center max-w-3xl"
      >
        <p className={styles.sectionSubText}>My daily toolkit</p>
        <h2 className={styles.sectionHeadText}>
          Technologies I build with.
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10"
      >
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            variants={cardRevealVariants(index)}
            whileHover={{
              y: -16, // hover feels more floaty
              scale: 1.06,
              transition: { type: "spring", stiffness: 260, damping: 14 },
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              group relative
              w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
              rounded-2xl
              bg-white/10 border border-white/15
              backdrop-blur-md
              flex items-center justify-center
              overflow-hidden
              transition-all duration-300
            "
            style={{
              // brighter soft white shadow so cards don’t look too dark
              boxShadow:
                "0 18px 60px rgba(145,94,255,0.18), 0 14px 45px rgba(255,255,255,0.06), 0 10px 35px rgba(0,0,0,0.25)",
            }}
          >
            {/* brighter base light (always visible) */}
            <motion.div
              className="absolute inset-0 bg-white/5"
              animate={glowAnimation(index)} // glow starts ON and keeps pulsing
            />

            {/* glow ring - NOW visible by default (not only hover) */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(145,94,255,0.45), transparent 60%)",
              }}
              animate={glowAnimation(index)} // pulsing glow
            />

            {/* glow border - visible on load, dims slightly */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-[#915EFF]/35"
              animate={glowAnimation(index)}
            />

            {/* icon */}
            <img
              src={technology.icon}
              alt={technology.name}
              loading="lazy"
              className="
                w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
                object-contain z-10
                group-hover:scale-110 transition-transform duration-300
                drop-shadow-[0_10px_30px_rgba(255,255,255,0.14)]
              "
            />

            {/* shine */}
            <motion.div
              className="absolute -left-10 -top-10 w-28 h-28 bg-white/15 rotate-12 blur-2xl opacity-50"
              animate={{
                opacity: [0.55, 0.25, 0.55], // ✅ never disappears
                transition: {
                  duration: 3.2 + (index % 3) * 0.35,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.07,
                },
              }}
            />

            {/* shadow boost glow (visible always, slightly pulsing) */}
            <motion.div
              className="absolute inset-0 rounded-2xl shadow-[0_14px_70px_rgba(145,94,255,0.28)]"
              animate={{
                opacity: [0.75, 0.35, 0.75], // ✅ stays visible
                transition: {
                  duration: 2.8 + (index % 3) * 0.25,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.06,
                },
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const WrappedTech = SectionWrapper(Tech, "tech");
export default WrappedTech;
