import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import classNames from 'classnames'

interface TypographyProps extends MotionProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline'
  weight?: 'light' | 'normal' | 'medium'
  color?: 'primary' | 'secondary' | 'accent' | 'muted'
  className?: string
}

export function Typography({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  className,
  ...motionProps
}: TypographyProps) {
  const baseClasses = 'font-sans'
  
  const variantClasses = {
    h1: 'text-4xl md:text-5xl font-light tracking-tight mb-4',
    h2: 'text-3xl md:text-4xl font-light tracking-tight mb-3',
    h3: 'text-2xl md:text-3xl font-normal tracking-tight mb-3',
    h4: 'text-xl md:text-2xl font-normal tracking-tight mb-2',
    h5: 'text-lg md:text-xl font-normal tracking-tight mb-2',
    h6: 'text-base md:text-lg font-medium tracking-tight mb-1',
    body: 'text-base leading-relaxed',
    caption: 'text-sm leading-relaxed',
    overline: 'text-xs font-medium uppercase tracking-wider',
  }
  
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
  }
  
  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    accent: 'text-blue-600',
    muted: 'text-gray-400',
  }
  
  const typographyClasses = classNames(
    baseClasses,
    variantClasses[variant],
    weightClasses[weight],
    colorClasses[color],
    className
  )
  
  const getTag = (variant: string) => {
    switch (variant) {
      case 'h1': return motion.h1
      case 'h2': return motion.h2
      case 'h3': return motion.h3
      case 'h4': return motion.h4
      case 'h5': return motion.h5
      case 'h6': return motion.h6
      case 'body':
      case 'caption':
      case 'overline':
      default: return motion.p
    }
  }
  
  const Tag = getTag(variant)
  
  return (
    <Tag className={typographyClasses} {...motionProps}>
      {children}
    </Tag>
  )
}