import React from 'react'
import { motion } from 'framer-motion'

interface LineChartProps {
  data: Array<{
    label: string
    value: number
  }>
  height?: number
  lineColor?: string
  pointColor?: string
  showPoints?: boolean
  className?: string
}

export function LineChart({
  data,
  height = 200,
  lineColor = 'rgb(71, 100, 139)', // accent-400
  pointColor = 'rgb(47, 80, 122)', // accent-500
  showPoints = true,
  className = '',
}: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1
  const padding = 20

  // Calculate points for the path
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = ((maxValue - item.value) / range) * (height - 2 * padding) + padding
    return { x, y, value: item.value, label: item.label }
  })

  // Create SVG path string
  const pathString = points
    .map((point, index) => {
      const x = (point.x / 100) * (height * 2) // Scale to match viewBox
      const y = point.y
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <div className={`w-full ${className}`}>
      <svg 
        viewBox={`0 0 ${height * 2} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = (percent / 100) * (height - 2 * padding) + padding
          return (
            <line
              key={percent}
              x1={0}
              y1={y}
              x2={height * 2}
              y2={y}
              stroke="rgb(226, 232, 240)"
              strokeWidth="1"
              opacity="0.5"
            />
          )
        })}

        {/* Line path */}
        <motion.path
          d={pathString}
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {/* Data points */}
        {showPoints && points.map((point, index) => (
          <motion.g
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.8 + index * 0.1,
              ease: 'easeOut'
            }}
          >
            <circle
              cx={(point.x / 100) * (height * 2)}
              cy={point.y}
              r="4"
              fill={pointColor}
              className="drop-shadow-sm"
            />
            <circle
              cx={(point.x / 100) * (height * 2)}
              cy={point.y}
              r="2"
              fill="white"
            />
          </motion.g>
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-3">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <span className="text-xs font-mono text-gray-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}