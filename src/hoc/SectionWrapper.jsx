// src/hoc/SectionWrapper.jsx

import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import { useEffect, useState } from "react";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    // lazy init (no setState inside effect body)
    const [isMobile, setIsMobile] = useState(() =>
      window.matchMedia("(max-width: 640px)").matches
    );

    useEffect(() => {
      const mq = window.matchMedia("(max-width: 640px)");

      const onChange = (e) => setIsMobile(e.matches);
      mq.addEventListener("change", onChange);

      return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
      <motion.section
        variants={staggerContainer()}
        initial={isMobile ? "show" : "hidden"}
        whileInView={isMobile ? undefined : "show"}
        animate={isMobile ? "show" : undefined}
        viewport={isMobile ? undefined : { once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        style={{ overflow: "visible" }}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
