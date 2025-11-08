import React from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { Typography } from './Typography'
import { NotificationData } from '../state/appStore'
import { tahoeVariants } from '../lib/motion'

interface NotificationItemProps {
  notification: NotificationData
  onRead?: (id: string) => void
}

const notificationIcons = {
  academic: '◉',
  administrative: '◧',
  event: '◫',
  system: '◈',
  reminder: '◎',
}

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-yellow-600',
  high: 'text-red-500',
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const handleClick = () => {
    if (!notification.read && onRead) {
      onRead(notification.id)
    }
  }

  return (
    <motion.div
      variants={tahoeVariants.staggerItem}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleClick}
      className={classNames(
        'glass-subtle rounded-tahoe-sm p-4 cursor-pointer transition-all',
        'hover:glass-light hover:bg-gray-300/20',
        !notification.read && 'border-l-4 border-blue-400'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={classNames(
          'text-lg mt-1',
          priorityColors[notification.priority]
        )}>
          {notificationIcons[notification.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <Typography
            variant="body"
            weight={notification.read ? 'normal' : 'medium'}
            className="text-sm leading-tight mb-1"
          >
            {notification.title}
          </Typography>

          {/* Message */}
          <Typography
            variant="caption"
            color="secondary"
            className="text-xs leading-relaxed line-clamp-2"
          >
            {notification.message}
          </Typography>

          {/* Timestamp */}
          <Typography
            variant="caption"
            color="muted"
            className="font-mono text-xs mt-2 block"
          >
            {notification.timestamp}
          </Typography>
        </div>

        {/* Unread indicator */}
        {!notification.read && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"
          />
        )}
      </div>
    </motion.div>
  )
}