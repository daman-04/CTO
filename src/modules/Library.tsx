import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LibraryFilters,
  LibrarySummaryBadges,
  LibraryLogEntry,
  LibraryActionModal,
  Typography,
} from '../components'
import { useLibraryFilter } from '../hooks'
import { useAppStore } from '../state/appStore'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import type { LibraryLogEntry as LibraryLogEntryType } from '../state/appStore'

export function Library() {
  const { filteredEntries, activeCount, overdueCount, returnedCount } = useLibraryFilter()
  const { returnLibraryItem } = useAppStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<'issue' | 'return'>('issue')
  const [selectedEntry, setSelectedEntry] = useState<LibraryLogEntryType | undefined>()

  const handleAction = (action: 'issue' | 'return', entry: LibraryLogEntryType) => {
    setSelectedAction(action)
    setSelectedEntry(entry)
    setIsModalOpen(true)
  }

  const handleConfirmAction = (action: 'issue' | 'return', entry?: LibraryLogEntryType) => {
    if (action === 'return' && entry) {
      returnLibraryItem(entry.id)
    } else if (action === 'issue' && entry) {
      // Issue again creates a new issue log entry for the same item and student
      // This is handled in the modal's student name input - for now we just close
      // In a full implementation, this would create a new issue entry
    }
    setIsModalOpen(false)
    setSelectedEntry(undefined)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h2">Library</Typography>
        <Typography variant="body" color="secondary">
          Manage library resources, track issue/return logs, and monitor overdue items
        </Typography>
      </motion.div>

      <LibrarySummaryBadges
        activeCount={activeCount}
        overdueCount={overdueCount}
        returnedCount={returnedCount}
      />

      <LibraryFilters />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Typography variant="body" color="secondary">
          Showing {filteredEntries.length} log entries
        </Typography>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filteredEntries.length}
          className="space-y-3"
          variants={tahoeVariants.staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {filteredEntries.map((entry, index) => (
            <LibraryLogEntry
              key={entry.id}
              entry={entry}
              index={index}
              onAction={handleAction}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <Typography variant="h3" color="secondary" className="mb-2">
            No library entries found
          </Typography>
          <Typography variant="body" color="secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </motion.div>
      )}

      <LibraryActionModal
        isOpen={isModalOpen}
        action={selectedAction}
        entry={selectedEntry}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEntry(undefined)
        }}
        onConfirm={handleConfirmAction}
      />
    </motion.div>
  )
}
