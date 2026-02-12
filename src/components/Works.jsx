// src/components/Works.jsx
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";

/* ----------------------------------------
   Tilt wrapper: desktop only (perf safe)
----------------------------------------- */
const TiltWrapper = ({ isMobile, children }) => {
  if (isMobile) return <>{children}</>;

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.02}
      transitionSpeed={300}
      gyroscope
    >
      {children}
    </Tilt>
  );
};

/* ----------------------------------------
   Desktop-only card animation (no spring)
----------------------------------------- */
const desktopCardVariant = (index) => ({
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  isMobile,
}) => {
  const Wrapper = isMobile ? "div" : motion.div;
  const motionProps = isMobile
    ? {}
    : {
      variants: desktopCardVariant(index),
    };

  return (
    <Wrapper {...motionProps}>
      <TiltWrapper isMobile={isMobile}>
        <div
          className="
            bg-tertiary p-5 rounded-2xl
            w-full sm:w-[360px]
            transition-transform duration-300
            hover:-translate-y-1
          "
        >
          {/* Image */}
          <div className="relative w-full h-[200px] sm:h-[230px] overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="
                w-full h-full object-cover rounded-2xl
              "
              style={{
                imageRendering: "auto",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
                filter: "contrast(1.05) saturate(1.05)",
              }}
            />

            {/* GitHub button */}
            <div className="absolute inset-0 flex justify-end m-3">
              <button
                type="button"
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                aria-label={`Open ${name} source code`}
              >
                <img
                  src={github}
                  alt="GitHub"
                  className="w-1/2 h-1/2 object-contain"
                />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mt-5">
            <h3 className="text-white font-bold text-[20px] sm:text-[24px]">
              {name}
            </h3>

            <p className="mt-2 text-secondary text-[13px] sm:text-[14px] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tech stack tags — white pill + colored text */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`
                  text-[12px] sm:text-[13px]
                  px-2 py-0.5
                  rounded-md
                  bg-white
                  ${tag.color}
                `}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </TiltWrapper>
    </Wrapper>
  );
};

const Works = () => {
  // Fix ESLint warning: no setState inside effect body
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
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="
            mt-3 text-secondary
            text-[16px] sm:text-[17px]
            max-w-3xl
            leading-[28px] sm:leading-[30px]
          "
        >
          These are some of my recent projects that reflect my work in backend
          systems, cloud automation, CI/CD pipelines, and modern web
          applications. Each project includes a short overview and a link to the
          source code.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        className="
          mt-14 sm:mt-20
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 sm:gap-7
          w-full
        "
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            isMobile={isMobile}
            {...project}
          />
        ))}
      </motion.div>
    </>
  );
};

const WrappedWorks = SectionWrapper(Works, "work");
export default WrappedWorks;
