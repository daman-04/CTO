import React from 'react'
import { motion } from 'framer-motion'
import { 
  GlassPanel, 
  Typography, 
  DepartmentsCard, 
  ExamStatsCard, 
  AttendanceTrendsCard 
} from '../components'
import { useAppStore } from '../state/appStore'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Admin() {
  const { adminData } = useAppStore()

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <Typography variant="h2">Admin Analytics</Typography>
        <Typography variant="body" color="secondary">
          System-wide metrics and performance indicators
        </Typography>
      </div>

      <motion.div
        variants={tahoeVariants.staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        <DepartmentsCard 
          data={adminData.departmentsData} 
          index={0}
        />
        <ExamStatsCard 
          data={adminData.examStatsData} 
          index={1}
        />
        <AttendanceTrendsCard 
          data={adminData.attendanceTrendData} 
          index={2}
        />
      </motion.div>
    </motion.div>
  )
}
