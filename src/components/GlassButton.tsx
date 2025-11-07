import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import classNames from 'classnames'
import { tahoeVariants } from '../lib/motion'

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
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2'
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const variantClasses = {
    primary: classNames(
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50',
      'shadow-lg shadow-blue-500/20'
    ),
    secondary: classNames(
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400/50'
    ),
    ghost: classNames(
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400/50'
    ),
    glass: classNames(
      'glass-medium text-gray-800 hover:glass-strong focus:ring-blue-400/50',
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
      variants={tahoeVariants.buttonPress}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}