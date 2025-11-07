import { Variants, Transition } from 'framer-motion'

// Tahoe motion timing constants (180-250ms spring easing)
export const TAHOE_MOTION = {
  DURATION: {
    FAST: 180,
    NORMAL: 215,
    SLOW: 250,
  },
  SPRING: {
    GENTLE: { type: 'spring', stiffness: 200, damping: 25 },
    SMOOTH: { type: 'spring', stiffness: 300, damping: 30 },
    SNAPPY: { type: 'spring', stiffness: 400, damping: 35 },
    BOUNCY: { type: 'spring', stiffness: 500, damping: 28 },
  },
} as const

// Shared spring transitions
export const tahoeTransitions: Record<string, Transition> = {
  fadeIn: TAHOE_MOTION.SPRING.GENTLE,
  slideUp: TAHOE_MOTION.SPRING.SMOOTH,
  slideDown: TAHOE_MOTION.SPRING.SMOOTH,
  scaleIn: TAHOE_MOTION.SPRING.SNAPPY,
  bounce: TAHOE_MOTION.SPRING.BOUNCY,
}

// Common animation variants
export const tahoeVariants: Record<string, Variants> = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  // Button interactions
  buttonPress: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
  
  // Glass panel reveal
  glassReveal: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { 
      opacity: 1, 
      backdropFilter: 'blur(12px)',
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      backdropFilter: 'blur(0px)',
      transition: { duration: 0.2 }
    },
  },
  
  // Staggered list animations
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
}

// Helper function to create custom transitions
export const createTahoeTransition = (
  type: keyof typeof TAHOE_MOTION.SPRING = 'SMOOTH',
  duration?: number
): Transition => {
  const spring = TAHOE_MOTION.SPRING[type]
  return duration ? { ...spring, duration: duration / 1000 } : spring
}

// Default motion props for common use cases
export const defaultMotionProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  transition: tahoeTransitions.fadeIn,
}