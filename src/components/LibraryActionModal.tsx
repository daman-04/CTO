import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { LibraryLogEntry as LibraryLogEntryType } from '../state/appStore'
import { GlassPanel, GlassButton, Typography } from './index'

interface LibraryActionModalProps {
  isOpen: boolean
  action?: 'issue' | 'return'
  entry?: LibraryLogEntryType
  onClose: () => void
  onConfirm: (action: 'issue' | 'return', entry?: LibraryLogEntryType) => void
}

export function LibraryActionModal({
  isOpen,
  action,
  entry,
  onClose,
  onConfirm,
}: LibraryActionModalProps) {
  const [studentName, setStudentName] = useState('')

  const handleConfirm = () => {
    if (action === 'issue' && !studentName.trim()) {
      return
    }
    onConfirm(action || 'issue', entry)
    setStudentName('')
  }

  const handleClose = () => {
    setStudentName('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.25,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <GlassPanel
              variant="strong"
              elevation="overlay"
              className="w-full max-w-md p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Typography variant="h4" className="mb-2">
                  {action === 'return' ? 'Return Item' : 'Issue Item'}
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6">
                  {action === 'return'
                    ? `Return "${entry?.item.title}" for ${entry?.studentName}`
                    : 'Issue a library item to a student'}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-4 mb-6"
              >
                {action === 'issue' && (
                  <>
                    <div>
                      <Typography variant="caption" color="secondary" className="mb-2 block">
                        Student Name
                      </Typography>
                      <input
                        type="text"
                        placeholder="Enter student name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-gray-200/30 rounded-tahoe text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                        autoFocus
                      />
                    </div>
                  </>
                )}

                {action === 'return' && entry && (
                  <div className="bg-white/40 rounded-tahoe p-3 space-y-2">
                    <div className="flex justify-between">
                      <Typography variant="caption" color="secondary">
                        Title:
                      </Typography>
                      <Typography variant="caption" weight="medium">
                        {entry.item.title}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography variant="caption" color="secondary">
                        Student:
                      </Typography>
                      <Typography variant="caption" weight="medium">
                        {entry.studentName}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography variant="caption" color="secondary">
                        Due Date:
                      </Typography>
                      <Typography variant="caption" weight="medium">
                        {new Date(entry.dueDate).toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3 justify-end"
              >
                <GlassButton
                  variant="ghost"
                  onClick={handleClose}
                  className="px-6 py-2"
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  variant="primary"
                  onClick={handleConfirm}
                  disabled={action === 'issue' && !studentName.trim()}
                  className="px-6 py-2"
                >
                  {action === 'return' ? 'Confirm Return' : 'Issue Item'}
                </GlassButton>
              </motion.div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
