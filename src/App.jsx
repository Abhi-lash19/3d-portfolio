import { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";
import Footer from "./components/Footer";

// Lazy-loaded so three.js stays out of the initial JS chunk.
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  return (
    // reducedMotion="user" makes every Framer Motion animation in the app
    // honour the OS "reduce motion" setting (CSS is handled in index.css)
    <MotionConfig reducedMotion="user">
      <div id="top" className="relative z-0 bg-background">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
};

export default App;
