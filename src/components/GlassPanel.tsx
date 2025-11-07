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
    {
      'border border-gray-200/50': border,
      'shadow-sm': elevation === 'surface',
      'shadow-md': elevation === 'overlay',
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
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}