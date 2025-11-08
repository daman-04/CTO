import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import classNames from 'classnames'
import { tahoeVariants, tahoeTransitions, tahoeMotion } from '../lib/motion'
import { useThemeStore } from '../state/theme'

interface GlassButtonProps extends MotionProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className,
  ...motionProps
}: GlassButtonProps) {
  const { accent } = useThemeStore()
  const baseClasses = classNames(
    'font-medium focus:outline-none focus:ring-2',
    `accent-${accent}`
  )
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const variantClasses = {
    primary: classNames(
      'bg-blue-600 text-white focus:ring-accent/50'
    ),
    secondary: classNames(
      'bg-gray-200 text-gray-800 focus:ring-accent/30'
    ),
    ghost: classNames(
      'bg-transparent text-gray-700 focus:ring-accent/20'
    ),
    glass: classNames(
      'glass-medium text-gray-800 focus:ring-accent/40',
      'border border-gray-200/50'
    ),
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  const buttonClasses = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabledClasses,
    'rounded-tahoe',
    className
  )

  return (
    <motion.button
      variants={tahoeVariants.hoverLift}
      initial="rest"
      whileHover="hover"
      whileTap={{ 
        scale: 0.98, 
        transition: tahoeMotion.SPRING.SNAPPY 
      }}
      whileFocus={{ 
        scale: 1.01, 
        transition: tahoeMotion.SPRING.GENTLE 
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}