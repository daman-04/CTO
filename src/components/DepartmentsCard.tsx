import React from 'react'
import { motion } from 'framer-motion'
import { GlassPanel, Typography } from './index'
import { CircularChart } from './CircularChart'
import { DepartmentData } from '../state/appStore'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

interface DepartmentsCardProps {
  data: DepartmentData[]
  index?: number
}

export function DepartmentsCard({ data, index = 0 }: DepartmentsCardProps) {
  const totalStudents = data.reduce((sum, dept) => sum + dept.studentCount, 0)
  const avgGraduationRate = data.reduce((sum, dept) => sum + dept.graduationRate, 0) / data.length

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
              Departments
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.length}
            </Typography>
          </div>
          <CircularChart 
            value={avgGraduationRate} 
            size={80}
            strokeWidth={6}
            showPercentage={false}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography variant="caption" color="secondary">
              Total Students
            </Typography>
            <Typography variant="caption" weight="medium" className="font-mono">
              {totalStudents.toLocaleString()}
            </Typography>
          </div>
          
          <div className="flex justify-between items-center">
            <Typography variant="caption" color="secondary">
              Avg. Graduation Rate
            </Typography>
            <Typography variant="caption" weight="medium" className="font-mono">
              {avgGraduationRate.toFixed(1)}%
            </Typography>
          </div>

          <div className="pt-3 border-t border-gray-200/30">
            <Typography variant="caption" color="secondary" className="block mb-3">
              Top Departments
            </Typography>
            <div className="space-y-2">
              {data.slice(0, 3).map((dept, deptIndex) => (
                <div key={dept.id} className="flex justify-between items-center">
                  <Typography variant="caption" weight="medium">
                    {dept.name}
                  </Typography>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-500">
                      {dept.studentCount}
                    </span>
                    <span className={`text-xs ${
                      dept.trend === 'up' ? 'text-green-600' :
                      dept.trend === 'down' ? 'text-red-600' :
                      'text-gray-400'
                    }`}>
                      {dept.trend === 'up' ? '↑' :
                       dept.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}