import { motion } from 'framer-motion'
import { GlassPanel, Typography, IconBadge } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { AnnouncementData } from '../state/appStore'

interface AnnouncementsTileProps {
  data: AnnouncementData[]
  index?: number
}

export function AnnouncementsTile({ data, index = 0 }: AnnouncementsTileProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return '📖'
      case 'administrative':
        return '📋'
      case 'event':
        return '🎓'
      default:
        return '📢'
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
              Announcements
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.length}
            </Typography>
          </div>
          <IconBadge variant="accent" size="lg">
            📢
          </IconBadge>
        </div>

        <div className="space-y-3">
          {data.slice(0, 2).map((announcement, idx) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 + idx * 0.05 }}
              className="pb-3 border-b border-gray-200/30 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <Typography variant="body" weight="normal">
                    {getTypeIcon(announcement.type)}
                  </Typography>
                </div>
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="caption"
                    weight="medium"
                    className="line-clamp-2"
                  >
                    {announcement.title}
                  </Typography>
                  <Typography variant="caption" color="secondary" className="mt-1">
                    {announcement.date}
                  </Typography>
                </div>
              </div>
            </motion.div>
          ))}
          {data.length > 2 && (
            <Typography
              variant="caption"
              color="muted"
              className="pt-2 block text-center"
            >
              +{data.length - 2} more announcements
            </Typography>
          )}
        </div>
      </GlassPanel>
    </motion.div>
  )
}
