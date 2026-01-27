import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import ServiceCard from "./ServiceCard";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I’m a Software Developer with strong experience in building scalable
        backend systems and cloud-native integrations. I work on event-driven
        architectures using AWS services like Lambda, API Gateway, SQS, SNS, S3,
        DynamoDB, and VPC-based secure networking.
        <br />
        <br />
        I’ve delivered integration solutions using MuleSoft (Newstore ↔ Business
        Central, Salesforce sync), built automated CI/CD workflows with GitHub
        Actions and Terraform, and developed APIs using FastAPI and Node.js. I
        enjoy solving real production problems, improving performance and
        observability (Datadog + CloudWatch), and shipping reliable systems that
        scale.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");

export default AboutSection;
