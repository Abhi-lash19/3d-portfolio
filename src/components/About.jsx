import { motion } from "framer-motion";
import { useState } from "react";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import ServiceCard from "./ServiceCard";

const About = () => {
  const [gradientDone, setGradientDone] = useState(false);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>

        <motion.h2
          className={styles.sectionHeadText}
          initial={{ backgroundPosition: "0% 50%" }}
          whileInView={{ backgroundPosition: "200% 50%" }}
          viewport={{ once: true }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => setGradientDone(true)}
          style={
            gradientDone
              ? { color: "#ffffff" }
              : {
                backgroundImage:
                  "linear-gradient(90deg, #a855f7, #3b82f6, #22d3ee, #a855f7)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
          }
        >
          Overview
        </motion.h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I’m a Software Developer with strong experience in building scalable backend
        systems and cloud-native integrations. I focus on backend engineering, AWS
        architectures, and DevOps automation to deliver reliable, production-ready
        systems.
        <br />
        <br />
        I’ve worked extensively with AWS services such as Lambda, API Gateway, SQS,
        DynamoDB, and S3, built CI/CD pipelines using GitHub Actions and Terraform, and
        delivered integrations across platforms like Newstore, Business Central, and
        Salesforce.
        <br />
        <br />
        I enjoy understanding how the systems I build work end-to-end — from
        infrastructure and networking to performance and observability — and I’m
        motivated by solving real production problems.
      </motion.p>

      <motion.div
        className='mt-20 flex flex-wrap gap-10'
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.25,
              delayChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </motion.div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");

export default AboutSection;
