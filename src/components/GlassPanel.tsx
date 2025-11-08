import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import classNames from 'classnames'
import { tahoeVariants, tahoeTransitions, tahoeMotion } from '../lib/motion'

interface GlassPanelProps extends MotionProps {
  children: React.ReactNode
  variant?: 'subtle' | 'light' | 'medium' | 'strong'
  elevation?: '1' | '2' | '3'
  rounded?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  border?: boolean
  interactive?: boolean
}

export function GlassPanel({
  children,
  variant = 'medium',
  elevation = '2',
  rounded = 'md',
  className,
  border = true,
  interactive = false,
  ...motionProps
}: GlassPanelProps) {
  const glassClasses = classNames(
    'glass-' + variant,
    `elevation-${elevation}`,
    {
      'liquid-hover liquid-glow': interactive,
      'glass-edge': elevation === '3',
      'border-0': !border,
    },
    {
      'rounded-tahoe-sm': rounded === 'sm',
      'rounded-tahoe': rounded === 'md',
      'rounded-tahoe-lg': rounded === 'lg',
      'rounded-tahoe-xl': rounded === 'xl',
    },
    className
  )

  const motionVariants = interactive 
    ? tahoeVariants.hoverLift 
    : tahoeVariants.panelEnter

  const hoverProps = interactive ? {
    whileHover: motionVariants.hover,
    whileTap: { scale: 0.99, transition: tahoeMotion.SPRING.GENTLE },
  } : {}

  return (
    <motion.div
      variants={motionVariants}
      transition={tahoeMotion.SPRING.SMOOTH}
      className={glassClasses}
      {...hoverProps}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}