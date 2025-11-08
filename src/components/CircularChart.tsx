import React from 'react'
import { motion } from 'framer-motion'

interface CircularChartProps {
  value: number
  maxValue?: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showPercentage?: boolean
  className?: string
}

export function CircularChart({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = 'rgb(71, 100, 139)', // accent-400
  backgroundColor = 'rgb(226, 232, 240)', // tahoe-200
  showPercentage = true,
  className = '',
}: CircularChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = Math.min((value / maxValue) * 100, 100)
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-mono font-medium text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}