import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index, isMobile }) => {
  const isLeft = index % 2 !== 0;

  return (
    <motion.div
      className="mb-12"
      initial={{
        opacity: 0,
        x: isMobile ? 0 : isLeft ? -40 : 40,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <VerticalTimelineElement
        position={isMobile ? "right" : isLeft ? "left" : "right"}
        contentStyle={{
          background: "#1d1836",
          color: "#fff",
        }}
        contentArrowStyle={{
          borderRight:
            !isMobile && isLeft ? "7px solid #232631" : "none",
          borderLeft:
            !isMobile && !isLeft ? "7px solid #232631" : "none",
        }}
        date={experience.date}
        iconStyle={{ background: experience.iconBg }}
        icon={
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={experience.icon}
              alt={experience.company_name}
              loading="lazy"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        }
      >
        <div>
          <h3 className="text-white text-[24px] font-bold">
            {experience.title}
          </h3>
          <p
            className="text-secondary text-[16px] font-semibold"
            style={{ margin: 0 }}
          >
            {experience.company_name}
          </p>
        </div>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {(experience.points || []).map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </motion.div>
  );
};

const Experience = () => {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline animate={false}>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

const WrappedExperience = SectionWrapper(Experience, "work");
export default WrappedExperience;
