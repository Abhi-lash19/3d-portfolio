// src/components/index.js

import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Tech from "./Tech";
import Experience from "./Experience";
import Works from "./Works";
import Contact from "./Contact";
import Footer from "./Footer";

// NOTE: the 3D canvases are deliberately NOT re-exported here.
// A static import of them from this barrel pulls three.js into the initial
// chunk and cancels out the lazy() calls in Hero/Contact/App.
// Import them directly via lazy(() => import("./canvas/<Name>")) instead.

export { Hero, Navbar, About, Tech, Experience, Works, Contact, Footer };
