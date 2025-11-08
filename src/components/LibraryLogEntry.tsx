import { motion } from 'framer-motion'
import { LibraryLogEntry as LibraryLogEntryType } from '../state/appStore'
import { GlassPanel, Typography, GlassButton } from './index'
import { tahoeVariants } from '../lib/motion'

interface LibraryLogEntryProps {
  entry: LibraryLogEntryType
  index: number
  onAction?: (action: 'issue' | 'return', entry: LibraryLogEntryType) => void
}

export function LibraryLogEntry({ entry, index, onAction }: LibraryLogEntryProps) {
  const statusColor = {
    active: 'text-blue-600',
    overdue: 'text-red-600',
    returned: 'text-green-600',
  }

  const statusBgColor = {
    active: 'bg-blue-50 border border-blue-200/30',
    overdue: 'bg-red-50 border border-red-200/30',
    returned: 'bg-green-50 border border-green-200/30',
  }

  const typeLabel = entry.type === 'issue' ? '📤 Issue' : '📥 Return'
  const isOverdue = entry.status === 'overdue'

  const dueDate = new Date(entry.dueDate)
  const now = new Date()
  const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      variants={tahoeVariants.staggerItem}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.05 }}
    >
      <GlassPanel
        variant="light"
        className={`p-4 cursor-pointer transition-all duration-300 liquid-hover ${statusBgColor[entry.status]}`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Typography variant="h6" className="truncate">
                {entry.item.title}
              </Typography>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.1 }}
                className={`px-3 py-1 rounded-tahoe text-xs font-medium flex-shrink-0 ml-2 ${statusColor[entry.status]}`}
              >
                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
              </motion.span>
            </div>

            <Typography variant="body" color="secondary" className="mb-3">
              {entry.item.author} • {entry.item.category}
            </Typography>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-200/20">
              <div>
                <Typography variant="caption" color="muted" className="mb-1 block">
                  Student
                </Typography>
                <Typography variant="body" weight="medium">
                  {entry.studentName}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" color="muted" className="mb-1 block">
                  Type
                </Typography>
                <Typography variant="body" weight="medium">
                  {typeLabel}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" color="muted" className="mb-1 block">
                  Issued Date
                </Typography>
                <Typography variant="body" weight="medium">
                  {new Date(entry.issuedDate).toLocaleDateString()}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" color="muted" className="mb-1 block">
                  {entry.status === 'returned' ? 'Returned' : 'Due Date'}
                </Typography>
                <Typography
                  variant="body"
                  weight="medium"
                  className={isOverdue ? 'text-red-600' : ''}
                >
                  {entry.returnedDate
                    ? new Date(entry.returnedDate).toLocaleDateString()
                    : new Date(entry.dueDate).toLocaleDateString()}
                  {!entry.returnedDate && (
                    <span className="ml-2 text-xs font-medium">
                      {daysUntilDue < 0 
                        ? `(${Math.abs(daysUntilDue)} days overdue)`
                        : daysUntilDue === 0
                        ? '(Due today)'
                        : daysUntilDue <= 7
                        ? `(${daysUntilDue} days left)`
                        : ''
                      }
                    </span>
                  )}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {entry.status !== 'returned' && (
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={() => onAction?.('return', entry)}
                className="px-4 py-2 hover:bg-white/40"
              >
                Mark Return
              </GlassButton>
            )}
            {entry.status === 'returned' && (
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={() => onAction?.('issue', entry)}
                className="px-4 py-2 hover:bg-white/40"
              >
                Issue Again
              </GlassButton>
            )}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
