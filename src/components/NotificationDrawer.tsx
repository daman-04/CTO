import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { GlassPanel } from './GlassPanel'
import { Typography } from './Typography'
import { tahoeVariants, tahoeTransitions, TAHOE_MOTION } from '../lib/motion'
import { NotificationData } from '../state/appStore'

interface NotificationDrawerProps {
  isOpen: boolean
  onClose: () => void
  notifications: NotificationData[]
}

function getNotificationTypeStyles(type: NotificationData['type']) {
  switch (type) {
    case 'success':
      return 'left-1 top-3 w-1 h-1 bg-emerald-500 rounded-full'
    case 'warning':
      return 'left-1 top-3 w-1 h-1 bg-amber-500 rounded-full'
    case 'alert':
      return 'left-1 top-3 w-1 h-1 bg-red-500 rounded-full'
    case 'info':
    default:
      return 'left-1 top-3 w-1 h-1 bg-blue-500 rounded-full'
  }
}

function getNotificationBgStyles(type: NotificationData['type']) {
  switch (type) {
    case 'success':
      return 'hover:bg-emerald-50/30'
    case 'warning':
      return 'hover:bg-amber-50/30'
    case 'alert':
      return 'hover:bg-red-50/30'
    case 'info':
    default:
      return 'hover:bg-blue-50/30'
  }
}

export function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
}: NotificationDrawerProps) {
  // Stagger animation with 200ms spring easing
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: TAHOE_MOTION.SPRING.SMOOTH,
    },
    exit: {
      opacity: 0,
      y: -12,
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.2,
          }}
          className="fixed right-0 top-0 bottom-0 w-80 p-4 flex-shrink-0 z-50"
        >
          <GlassPanel
            variant="medium"
            className="h-full p-6 flex flex-col"
            elevation="overlay"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <Typography variant="h4" weight="medium">
                Notifications
              </Typography>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 transition-colors p-1"
              >
                ✕
              </motion.button>
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <motion.div
                className="flex-1 overflow-y-auto space-y-3 pr-2 scroll-tahoe"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    variants={itemVariants}
                    className={classNames(
                      'relative glass-subtle rounded-tahoe-sm p-4 transition-all duration-200',
                      getNotificationBgStyles(notification.type),
                      !notification.read && 'bg-blue-100/20'
                    )}
                  >
                    {/* Type indicator dot */}
                    <div className={classNames('absolute', getNotificationTypeStyles(notification.type))} />

                    {/* Content */}
                    <div className="pl-3">
                      <Typography
                        variant="body"
                        weight="medium"
                        className="text-sm text-gray-900"
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="secondary"
                        className="mt-1 text-xs leading-relaxed"
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="muted"
                        className="mt-2 text-xs font-mono"
                      >
                        {notification.timestamp}
                      </Typography>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute right-3 top-3 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={tahoeTransitions.fadeIn}
                className="flex-1 flex items-center justify-center"
              >
                <div className="text-center">
                  <Typography variant="body" color="muted" className="text-sm">
                    No notifications yet
                  </Typography>
                </div>
              </motion.div>
            )}
          </GlassPanel>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
