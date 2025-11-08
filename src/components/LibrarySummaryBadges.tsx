import { motion } from 'framer-motion'
import { GlassPanel, Typography } from './index'
import { tahoeVariants } from '../lib/motion'

interface LibrarySummaryBadgesProps {
  activeCount: number
  overdueCount: number
  returnedCount: number
}

export function LibrarySummaryBadges({
  activeCount,
  overdueCount,
  returnedCount,
}: LibrarySummaryBadgesProps) {
  const badges = [
    {
      label: 'Active Issues',
      count: activeCount,
      color: 'from-blue-100 to-blue-50',
      borderColor: 'border-blue-200/30',
      textColor: 'text-blue-600',
      icon: '📤',
    },
    {
      label: 'Overdue',
      count: overdueCount,
      color: 'from-red-100 to-red-50',
      borderColor: 'border-red-200/30',
      textColor: 'text-red-600',
      icon: '⚠️',
    },
    {
      label: 'Returned',
      count: returnedCount,
      color: 'from-green-100 to-green-50',
      borderColor: 'border-green-200/30',
      textColor: 'text-green-600',
      icon: '📥',
    },
  ]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {badges.map((badge) => (
        <motion.div
          key={badge.label}
          variants={tahoeVariants.staggerItem}
          initial="initial"
          animate="animate"
        >
          <GlassPanel
            variant="medium"
            className={`p-4 bg-gradient-to-br ${badge.color} border ${badge.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="caption" color="secondary" className="mb-1 block">
                  {badge.label}
                </Typography>
                <Typography variant="h3" className={badge.textColor}>
                  {badge.count}
                </Typography>
              </div>
              <div className="text-4xl opacity-40">{badge.icon}</div>
            </div>
          </GlassPanel>
        </motion.div>
      ))}
    </motion.div>
  )
}
