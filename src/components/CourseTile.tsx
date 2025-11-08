import { motion } from 'framer-motion'
import { CourseData } from '../state/appStore'
import { GlassPanel, Typography } from './index'
import classNames from 'classnames'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

interface CourseTileProps {
  course: CourseData
  index: number
}

export function CourseTile({ course, index }: CourseTileProps) {
  const getStatusColor = (status: CourseData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'upcoming':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    if (progress >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={tahoeVariants.slideUp}
      transition={{ 
        ...tahoeTransitions.slideUp,
        delay: index * 0.05
      }}
      layout
      whileHover={{ y: -4, transition: tahoeTransitions.hover }}
      className="h-full"
    >
      <GlassPanel 
        variant="medium" 
        elevation="surface"
        className="p-6 h-full cursor-pointer group"
      >
        {/* Header with Code and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Typography variant="h3" className="font-mono">
                {course.code}
              </Typography>
              <span
                className={classNames(
                  'px-2 py-1 text-xs font-medium rounded-full border',
                  getStatusColor(course.status)
                )}
              >
                {course.status}
              </span>
            </div>
            <Typography variant="h4" className="font-medium text-gray-800 group-hover:text-blue-600">
              {course.name}
            </Typography>
          </div>
          <div className="text-right ml-4">
            <Typography variant="body" color="secondary" className="text-sm">
              {course.credits} credits
            </Typography>
          </div>
        </div>

        {/* Faculty */}
        <div className="mb-4">
          <Typography variant="caption" color="secondary" className="block mb-1">
            Faculty
          </Typography>
          <Typography variant="body" className="text-gray-700">
            {course.faculty}
          </Typography>
        </div>

        {/* Schedule and Room */}
        <div className="mb-4 space-y-2">
          <div>
            <Typography variant="caption" color="secondary" className="block mb-1">
              Schedule
            </Typography>
            <Typography variant="body" className="text-gray-700">
              {course.schedule}
            </Typography>
          </div>
          <div>
            <Typography variant="caption" color="secondary" className="block mb-1">
              Room
            </Typography>
            <Typography variant="body" className="text-gray-700">
              {course.room}
            </Typography>
          </div>
        </div>

        {/* Progress Bar (for active courses) */}
        {course.status === 'active' && (
          <div className="mt-4 pt-4 border-t border-gray-200/30">
            <div className="flex items-center justify-between mb-2">
              <Typography variant="caption" color="secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="secondary" className="font-mono">
                {course.progress}%
              </Typography>
            </div>
            <div className="w-full bg-gray-200/30 rounded-full h-2 overflow-hidden">
              <motion.div
                className={classNames('h-full rounded-full', getProgressColor(course.progress))}
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ ...tahoeTransitions.slideUp, delay: 0.2 + index * 0.05 }}
              />
            </div>
          </div>
        )}

        {/* Days Badge */}
        <div className="mt-4 flex flex-wrap gap-1">
          {course.days.map((day) => (
            <span
              key={day}
              className="px-2 py-1 text-xs font-medium bg-gray-100/50 text-gray-600 rounded border border-gray-200/30"
            >
              {day}
            </span>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  )
}