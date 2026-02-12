# 3D Developer Portfolio 
## Project Overview
This is a modern 3D developer portfolio built using React and Three.js.
The goal of this project was to build a clean, professional, and interactive website that represents my backend engineering, cloud architecture, and DevOps experience.

The website combines 3D visuals, scroll-based animations, and responsive design while maintaining smooth performance across desktop and mobile devices.

Main focus areas:

* Interactive 3D elements using React Three Fiber
* Smooth scroll-triggered animations using Framer Motion
* Clean and scalable component structure
* Optimized performance for 3D rendering
* Responsive design for all screen sizes
* Custom Deep Sapphire theme system
* Structured footer section with clean layout

This portfolio is designed to feel modern, technically strong, and production-ready.

---

## What I Built

### 1. Hero Section

* Scroll-reactive animations using `useScroll` and `useTransform`
* Lazy-loaded 3D canvas to prevent blocking the first render
* Controlled animation freezing after user interaction
* Custom accent styling based on the Deep Sapphire theme

### 2. 3D Canvas Integration

* Implemented using `@react-three/fiber` and `@react-three/drei`
* GLTF model loading with preloading for smoother rendering
* Optimized DPR settings to balance quality and performance
* Controlled OrbitControls behavior
* Handled mobile scroll interaction issues
* Reduced unnecessary GPU usage

### 3. About & Services Section

* Staggered animations for service cards
* Optimized animation timing to avoid glitches
* Desktop tilt effect with controlled performance
* Clean animation variants without heavy spring overload

### 4. Works / Projects Section

* Optimized card animations (desktop only where required)
* Lazy-loaded images
* Smooth hover effects
* Clean grid-based layout using Tailwind
* Performance-safe motion transitions

### 5. Footer

* Structured footer layout
* Clean typography
* Optimized rendering without unnecessary animations
* Maintains consistent theme styling

### 6. Performance Improvements

* Lazy loading for heavy 3D components
* Reduced continuous animations
* Removed unnecessary infinite loops
* Controlled stagger effects to prevent animation conflicts
* Handled mobile scroll + canvas interaction properly
* Optimized image loading with `loading="lazy"`

---

## Tech Stack ⚙️

* React (Vite)
* Tailwind CSS
* Framer Motion
* React Three Fiber
* Drei
* Three.js
* GLTF Models
* Modern CSS utilities

---

## Project Structure 📁

```
src/
 ├── assets/              # Images, icons, 3D assets
 ├── components/
 │   ├── canvas/          # 3D related components (Earth, Stars, etc.)
 │   ├── About.jsx
 │   ├── Contact.jsx
 │   ├── Experience.jsx
 │   ├── Footer.jsx
 │   ├── Hero.jsx
 │   ├── Navbar.jsx
 │   ├── Tech.jsx
 │   ├── Works.jsx
 │   └── index.js
 │
 ├── constants/           # Static data (projects, navLinks, services)
 ├── hoc/                 # Higher Order Components (SectionWrapper)
 ├── utils/               # Animation helpers and interaction utilities
 ├── styles.js            # Shared Tailwind style constants
 ├── App.jsx              # Main layout structure
 ├── main.jsx             # Application entry point
 └── index.css            # Global styles and theme gradients
```

### Structure Highlights

* 3D logic is isolated inside `components/canvas`
* Animation utilities are centralized inside `utils`
* SectionWrapper ensures consistent section layout and animation behavior
* Constants folder separates UI from data
* Global theme styles are controlled in `index.css`

This structure makes the project clean, maintainable, and scalable.

---

## Design Reference

For the main visual design inspiration, I referred to this YouTube video:

[https://www.youtube.com/watch?v=0fYi8SGA20k](https://www.youtube.com/watch?v=0fYi8SGA20k)

The implementation has been customized, optimized, and restructured with performance improvements and theme modifications.
