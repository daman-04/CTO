import { motion } from 'framer-motion'
import { GlassPanel, Typography, IconBadge } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { GPAData } from '../state/appStore'

interface GPATileProps {
  data: GPAData
  index?: number
}

export function GPATile({ data, index = 0 }: GPATileProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  const progressPercentage = (data.currentGPA / 4.0) * 100

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
              Current GPA
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.currentGPA.toFixed(2)}
            </Typography>
          </div>
          <IconBadge variant="accent" size="lg">
            {getTrendIcon(data.trend)}
          </IconBadge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Typography variant="caption" color="secondary">
              Target: {data.targetGPA.toFixed(2)}
            </Typography>
            <Typography variant="caption" weight="medium">
              {progressPercentage.toFixed(0)}%
            </Typography>
          </div>
          <div className="w-full h-2 rounded-tahoe bg-gray-200/50 overflow-hidden">
            <motion.div
              className="h-full rounded-tahoe bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            />
          </div>
        </div>

        <Typography variant="caption" color="secondary" className="mt-4 block">
          {data.trend === 'up' && 'GPA trending upward'}
          {data.trend === 'down' && 'GPA trending downward'}
          {data.trend === 'stable' && 'GPA stable'}
        </Typography>
      </GlassPanel>
    </motion.div>
  )
}
