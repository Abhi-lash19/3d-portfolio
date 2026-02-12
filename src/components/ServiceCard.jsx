import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ServiceCard = ({ _index, title, icon }) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            duration: 0.45,
          },
        },
      }}
      className="xs:w-[250px] w-full"
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        scale={1.015}
        transitionSpeed={600}
        gyroscope={true}
        className="w-full"
      >
        <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
          <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <img src={icon} alt={title} className="w-16 h-16 object-contain" />
            <h3 className="text-white text-[20px] font-bold text-center">
              {title}
            </h3>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

ServiceCard.propTypes = {
  _index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ServiceCard;
