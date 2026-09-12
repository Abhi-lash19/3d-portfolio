// src/hoc/SectionWrapper.jsx

import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import { useMediaQuery } from "../utils/useMediaQuery";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    const isMobile = useMediaQuery("(max-width: 640px)");

    return (
      <motion.section
        // 0.9s between children left sections blank for over a second
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: isMobile ? 0.2 : 0.3 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        style={{ overflow: "visible" }}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
