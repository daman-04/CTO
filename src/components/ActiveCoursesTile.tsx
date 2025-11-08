import { motion } from 'framer-motion'
import { GlassPanel, Typography, IconBadge } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { ActiveCoursesData } from '../state/appStore'

interface ActiveCoursesTileProps {
  data: ActiveCoursesData
  index?: number
}

export function ActiveCoursesTile({ data, index = 0 }: ActiveCoursesTileProps) {
  const avgProgress =
    data.courses.length > 0
      ? Math.round(
          data.courses.reduce((sum, course) => sum + course.progress, 0) /
            data.courses.length
        )
      : 0

  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      transition={{ ...tahoeTransitions.slideUp, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: tahoeTransitions.hover }}
      className=""
    >
      <GlassPanel className="p-6 cursor-default group">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Typography variant="overline" weight="medium" color="secondary">
              Active Courses
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.count}
            </Typography>
          </div>
          <IconBadge variant="accent" size="lg">
            📚
          </IconBadge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Typography variant="caption" color="secondary">
              Average Progress
            </Typography>
            <Typography variant="caption" weight="medium">
              {avgProgress}%
            </Typography>
          </div>
          <div className="w-full h-2 rounded-tahoe bg-gray-200/50 overflow-hidden">
            <motion.div
              className="h-full rounded-tahoe bg-gradient-to-r from-purple-400 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${avgProgress}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {data.courses.slice(0, 2).map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex justify-between items-center"
            >
              <Typography variant="caption" color="secondary" className="truncate">
                {course.name}
              </Typography>
              <Typography variant="caption" weight="medium">
                {course.progress}%
              </Typography>
            </motion.div>
          ))}
          {data.courses.length > 2 && (
            <Typography variant="caption" color="muted" className="pt-2">
              +{data.courses.length - 2} more courses
            </Typography>
          )}
        </div>
      </GlassPanel>
    </motion.div>
  )
}
