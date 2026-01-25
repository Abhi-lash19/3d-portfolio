// src/components/Tech.jsx
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          key={technology.name}
          className="group relative w-28 h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md
                     flex items-center justify-center overflow-hidden
                     transition-transform duration-300 hover:-translate-y-2"
        >
          {/* glow ring */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 60%)",
            }}
          />

          {/* icon */}
          <img
            src={technology.icon}
            alt={technology.name}
            loading="lazy"
            className="w-12 h-12 object-contain z-10 group-hover:scale-110 transition-transform duration-300"
          />

          {/* subtle shine */}
          <div className="absolute -left-10 -top-10 w-24 h-24 bg-white/10 rotate-12 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};

const WrappedTech = SectionWrapper(Tech, "tech");
export default WrappedTech;
