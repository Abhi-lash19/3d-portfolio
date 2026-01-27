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
      duration: 1.25,
      delay: delay,
    },
  },
});

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: isInteracting()
      ? { duration: 0 } // yield during interaction
      : {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
  },
});

export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0,
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
          ease: "easeOut",
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
          ease: "easeOut",
        },
  },
});

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: isInteracting()
      ? {}
      : {
          staggerChildren: staggerChildren,
          delayChildren: delayChildren || 0,
        },
  },
});
