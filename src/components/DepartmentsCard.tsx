import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { GlassPanel, Typography } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { DepartmentMetric } from '../state/appStore'

interface DepartmentsCardProps {
  departments: DepartmentMetric[]
  totalDepartments: number
  totalFaculty: number
  index?: number
}

export function DepartmentsCard({ 
  departments, 
  totalDepartments, 
  totalFaculty, 
  index = 0 
}: DepartmentsCardProps) {
  const colors = ['#a5badb', '#7691b4', '#47648b', '#2f507a', '#1d3e69']

  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      transition={tahoeTransitions.slideUp}
      custom={index}
      whileHover={{ y: -4 }}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <GlassPanel 
        className="p-6 cursor-default group hover:bg-gray-300/20 transition-colors duration-200"
        elevation="overlay"
      >
        <div className="mb-6">
          <Typography variant="overline" weight="medium" color="secondary">
            Departments Overview
          </Typography>
          <div className="flex items-baseline gap-4 mt-3">
            <div>
              <Typography variant="h2" weight="normal" className="font-mono">
                {totalDepartments}
              </Typography>
              <Typography variant="caption" color="secondary" className="mt-1">
                Active Departments
              </Typography>
            </div>
            <div>
              <Typography variant="h3" weight="normal" className="font-mono text-accent-500">
                {totalFaculty}
              </Typography>
              <Typography variant="caption" color="secondary" className="mt-1">
                Total Faculty
              </Typography>
            </div>
          </div>
        </div>

        <div className="h-48 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departments} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'SF Pro Text' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.split(' ')[0]}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'SF Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="facultyCount" radius={[8, 8, 0, 0]}>
                {departments.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {departments.slice(0, 2).map((dept) => (
            <div key={dept.name} className="flex justify-between items-center">
              <Typography variant="caption" color="secondary">
                {dept.name.length > 12 ? dept.name.split(' ')[0] : dept.name}
              </Typography>
              <Typography variant="caption" weight="medium" className="font-mono">
                {dept.activeCoursesCount} courses
              </Typography>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  )
}
