import { motion } from 'framer-motion'
import { GlassPanel, Typography, IconBadge } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { AttendanceData } from '../state/appStore'

interface AttendanceTileProps {
  data: AttendanceData
  index?: number
}

export function AttendanceTile({ data, index = 0 }: AttendanceTileProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return '✓'
      case 'good':
        return '✓'
      case 'fair':
        return '⚠'
      case 'warning':
        return '!'
      default:
        return '•'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return 'success'
      case 'fair':
        return 'warning'
      case 'warning':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      transition={tahoeTransitions.slideUp}
      custom={index}
      whileHover={{ y: -4 }}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <GlassPanel className="p-6 cursor-default group hover:bg-gray-300/20 transition-colors duration-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Typography variant="overline" weight="medium" color="secondary">
              Attendance
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.percentage}%
            </Typography>
          </div>
          <IconBadge variant={getStatusVariant(data.status)} size="lg">
            {getStatusIcon(data.status)}
          </IconBadge>
        </div>

        <div className="space-y-3">
          <div className="w-full h-2 rounded-tahoe bg-gray-200/50 overflow-hidden">
            <motion.div
              className="h-full rounded-tahoe bg-gradient-to-r from-emerald-400 to-emerald-600"
              initial={{ width: 0 }}
              animate={{ width: `${data.percentage}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            />
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="caption" color="secondary">
              {data.classesAttended} of {data.totalClasses} classes
            </Typography>
            <Typography
              variant="caption"
              weight="medium"
              color={
                data.status === 'excellent' || data.status === 'good'
                  ? 'accent'
                  : 'primary'
              }
            >
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Typography>
          </div>
        </div>

        <Typography variant="caption" color="secondary" className="mt-4 block">
          {data.percentage >= 90 && 'Excellent attendance record'}
          {data.percentage >= 80 && data.percentage < 90 && 'Good attendance'}
          {data.percentage >= 70 && data.percentage < 80 && 'Fair attendance'}
          {data.percentage < 70 && 'Attendance needs improvement'}
        </Typography>
      </GlassPanel>
    </motion.div>
  )
}
