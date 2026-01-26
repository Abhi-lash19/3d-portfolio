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
  y: [0, -7, 0],
  transition: {
    duration: 2.8 + (i % 3) * 0.35,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay: i * 0.06,
  },
});

// Each card reveal animation (with floating included in "show")
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
        <p className={styles.sectionSubText}>Tools & Technologies</p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>

        <p className="mt-4 text-secondary text-[16px] leading-[28px]">
          These are the technologies I’ve used to build backend systems, AWS
          pipelines, CI/CD automation, and scalable cloud integrations.
        </p>
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
              y: -12,
              scale: 1.05,
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
    </div>
  );
};

const WrappedTech = SectionWrapper(Tech, "tech");
export default WrappedTech;
