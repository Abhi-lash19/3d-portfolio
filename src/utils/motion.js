import { isInteracting } from "./interaction";

export const textVariant = (delay) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.1,
      delay: delay,
    },
  },
});

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: isInteracting()
      ? { duration: 0 }
      : {
        type: "tween",
        delay: delay,
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
  },
});

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: isInteracting()
      ? { duration: 0 }
      : {
        type: type,
        delay: delay,
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
  },
});

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});
