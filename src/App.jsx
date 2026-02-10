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

import { lazy, Suspense } from "react";

const StarsCanvas = lazy(() =>
  import("./components/canvas/Stars")
);


const App = () => {
  return (
    <div id="top" className='relative z-0 bg-primary'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <div className='relative z-0'>
        <Contact />
        {/* Lazy-loaded Three.js background */}
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default App;