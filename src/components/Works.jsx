// src/components/Works.jsx

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

//  Small wrapper: Tilt ON for desktop, OFF for mobile (performance fix)
const TiltWrapper = ({ isMobile, children }) => {
  if (isMobile) return <>{children}</>;

  return (
    <Tilt
      tiltMaxAngleX={18}
      tiltMaxAngleY={18}
      scale={1.02}
      transitionSpeed={450}
      gyroscope={true}
    >
      {children}
    </Tilt>
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  isMobile,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.15, 0.6)}>
      <TiltWrapper isMobile={isMobile}>
        <div className="bg-tertiary p-5 rounded-2xl w-full sm:w-[360px]">
          <div className="relative w-full h-[200px] sm:h-[230px] overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl"
            />

            {/* GitHub button stays clickable on mobile */}
            <div className="absolute inset-0 flex justify-end m-3">
              <button
                type="button"
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                aria-label={`Open ${name} source code`}
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </button>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[20px] sm:text-[24px]">
              {name}
            </h3>

            <p className="mt-2 text-secondary text-[13px] sm:text-[14px] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[13px] sm:text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </TiltWrapper>
    </motion.div>
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
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[28px] sm:leading-[30px]"
        >
          These are some of my recent projects that reflect my work in backend
          systems, cloud automation, CI/CD pipelines, and modern web
          applications. Each project includes a short overview and a link to the
          source code.
        </motion.p>
      </div>

      {/* Proper mobile layout */}
      <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:flex sm:flex-wrap gap-6 sm:gap-7">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            isMobile={isMobile}
            {...project}
          />
        ))}
      </div>
    </>
  );
};


const WrappedWorks = SectionWrapper(Works, "work");
export default WrappedWorks;
