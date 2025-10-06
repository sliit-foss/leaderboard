/**
 * Animation configurations for Framer Motion
 * Provides consistent animations across the application
 */

import { Variants, Transition } from "framer-motion";

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" }
  },
};

// Fade in animation
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

// Slide up animation (for scroll-triggered animations)
export const slideUp: Variants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Staggered container animation
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Staggered item animation
export const staggerItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Scale on hover animation
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

// Pulse animation (for loading states)
export const pulseAnimation: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Shimmer effect (for skeleton loaders)
export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Card hover animation
export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.02,
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Bounce animation
export const bounce: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 10
};

// Smooth transition
export const smooth: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

// Number counter animation
export const counterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Viewport options for scroll animations
export const scrollViewport = {
  once: true,
  margin: "-100px"
};
