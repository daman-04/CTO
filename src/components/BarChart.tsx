import React from 'react'
import { motion } from 'framer-motion'

interface BarChartProps {
  data: Array<{
    label: string
    value: number
  }>
  height?: number
  barColor?: string
  showValues?: boolean
  className?: string
}

export function BarChart({
  data,
  height = 200,
  barColor = 'rgb(71, 100, 139)', // accent-400
  showValues = true,
  className = '',
}: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = 100 / data.length

  return (
    <div className={`w-full ${className}`}>
      <div 
        className="relative flex items-end justify-between gap-2"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height
          
          return (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
              style={{ maxWidth: `${barWidth}%` }}
            >
              {showValues && (
                <span className="text-xs font-mono text-gray-600 mb-2">
                  {item.value}
                </span>
              )}
              <motion.div
                className="w-full rounded-t-sm"
                style={{ 
                  backgroundColor: barColor,
                  minHeight: '2px'
                }}
                initial={{ height: 0 }}
                animate={{ height: `${barHeight}px` }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
              />
            </div>
          )
        })}
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between gap-2 mt-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 text-center"
            style={{ maxWidth: `${barWidth}%` }}
          >
            <span className="text-xs font-mono text-gray-500 truncate block">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}