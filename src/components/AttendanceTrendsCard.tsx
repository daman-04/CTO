import React from 'react'
import { motion } from 'framer-motion'
import { GlassPanel, Typography } from './index'
import { LineChart } from './LineChart'
import { AttendanceTrendData } from '../state/appStore'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

interface AttendanceTrendsCardProps {
  data: AttendanceTrendData
  index?: number
}

export function AttendanceTrendsCard({ data, index = 0 }: AttendanceTrendsCardProps) {
  const chartData = data.monthlyData.map(month => ({
    label: month.month,
    value: Math.round(month.rate)
  }))

  const totalClasses = data.monthlyData.reduce((sum, month) => sum + month.totalClasses, 0)

  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      transition={tahoeTransitions.slideUp}
      custom={index}
      whileHover={{ y: -4 }}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <GlassPanel className="p-6 cursor-default group hover:bg-gray-300/20 transition-colors duration-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Typography variant="overline" weight="medium" color="secondary">
              Attendance Trends
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.currentRate.toFixed(1)}%
            </Typography>
          </div>
          <div className="text-right">
            <Typography variant="caption" color="secondary">
              Total Classes
            </Typography>
            <Typography variant="h4" weight="medium" className="font-mono">
              {totalClasses.toLocaleString()}
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="pt-3 border-t border-gray-200/30">
            <Typography variant="caption" color="secondary" className="block mb-3">
              6-Month Trend
            </Typography>
            <LineChart 
              data={chartData}
              height={140}
              lineColor="rgb(71, 100, 139)"
              pointColor="rgb(47, 80, 122)"
              showPoints={true}
            />
          </div>

          <div className="pt-3 border-t border-gray-200/30">
            <Typography variant="caption" color="secondary" className="block mb-3">
              Department Breakdown
            </Typography>
            <div className="space-y-2">
              {data.departmentBreakdown.slice(0, 3).map((dept, deptIndex) => (
                <div key={deptIndex} className="flex justify-between items-center">
                  <Typography variant="caption" weight="medium">
                    {dept.department}
                  </Typography>
                  <Typography variant="caption" weight="medium" className="font-mono">
                    {dept.rate.toFixed(1)}%
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}