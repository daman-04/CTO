import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import classNames from 'classnames'
import { tahoeVariants } from '../lib/motion'

interface IconBadgeProps extends MotionProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function IconBadge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...motionProps
}: IconBadgeProps) {
  const baseClasses = 'flex items-center justify-center rounded-full'
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }
  
  const variantClasses = {
    default: classNames(
      'glass-light border border-gray-200/50',
      'text-gray-600'
    ),
    accent: classNames(
      'bg-blue-100 text-blue-700',
      'border border-blue-200/50'
    ),
    success: classNames(
      'bg-green-100 text-green-700',
      'border border-green-200/50'
    ),
    warning: classNames(
      'bg-yellow-100 text-yellow-700',
      'border border-yellow-200/50'
    ),
    error: classNames(
      'bg-red-100 text-red-700',
      'border border-red-200/50'
    ),
  }
  
  const badgeClasses = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  return (
    <motion.div
      variants={tahoeVariants.scaleIn}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={badgeClasses}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}