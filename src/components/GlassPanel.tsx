import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import classNames from 'classnames'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

interface GlassPanelProps extends MotionProps {
  children: React.ReactNode
  variant?: 'subtle' | 'light' | 'medium' | 'strong'
  elevation?: 'base' | 'surface' | 'overlay'
  rounded?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  border?: boolean
}

export function GlassPanel({
  children,
  variant = 'medium',
  elevation = 'surface',
  rounded = 'md',
  className,
  border = true,
  ...motionProps
}: GlassPanelProps) {
  const glassClasses = classNames(
    'glass-' + variant,
    'liquid-hover liquid-glow',
    {
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

  return (
    <motion.div
      variants={tahoeVariants.glassReveal}
      transition={tahoeTransitions.fadeIn}
      className={glassClasses}
      whileHover={{ 
        y: -4,
        scale: 1.005,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}