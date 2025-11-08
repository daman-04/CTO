import { motion } from 'framer-motion'
import { GlassButton } from './index'

interface FacultyFloatingActionsProps {
  onAddGrade: () => void
  onSendNotice: () => void
}

export function FacultyFloatingActions({ onAddGrade, onSendNotice }: FacultyFloatingActionsProps) {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      {/* Send Notice Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <GlassButton
          variant="primary"
          size="lg"
          onClick={onSendNotice}
          className="shadow-lg hover:shadow-xl transition-all duration-200 bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-full flex items-center gap-3"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Send Notice
        </GlassButton>
      </motion.div>

      {/* Add Grade Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <GlassButton
          variant="primary"
          size="lg"
          onClick={onAddGrade}
          className="shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-full flex items-center gap-3"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Add Grade
        </GlassButton>
      </motion.div>
    </div>
  )
}