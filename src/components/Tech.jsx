// src/components/Tech.jsx
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Stagger reveal container
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// Each card reveal animation
const cardRevealVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

// Floating idle animation (subtle)
const floatingAnimation = (i) => ({
  y: [0, -6, 0],
  transition: {
    duration: 2.6 + (i % 3) * 0.4,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
    delay: i * 0.05,
  },
});

const Tech = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10"
    >
      {technologies.map((technology, index) => (
        <motion.div
          key={technology.name}
          variants={cardRevealVariants}
          animate={floatingAnimation(index)}
          whileHover={{
            y: -10,
            scale: 1.04,
            transition: { type: "spring", stiffness: 260, damping: 14 },
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="group relative
                     w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                     rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md
                     flex items-center justify-center overflow-hidden
                     shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                     transition-all duration-300"
        >
          {/* Hover glow ring */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(145,94,255,0.35), transparent 60%)",
            }}
          />

          {/* Outer glow border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[#915EFF]/30" />

          {/* Icon */}
          <img
            src={technology.icon}
            alt={technology.name}
            loading="lazy"
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain z-10
                       group-hover:scale-110 transition-transform duration-300"
          />

          {/* Shine sweep */}
          <div className="absolute -left-10 -top-10 w-24 h-24 bg-white/10 rotate-12 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

          {/* Hover shadow boost */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_10px_50px_rgba(145,94,255,0.25)] rounded-2xl" />
        </motion.div>
      ))}
    </motion.div>
  );
};

const WrappedTech = SectionWrapper(Tech, "tech");
export default WrappedTech;
