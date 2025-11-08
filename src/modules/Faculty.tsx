import { motion, AnimatePresence } from 'framer-motion'
import { 
  FacultyTable, 
  FacultyFilters, 
  FacultyFloatingActions, 
  Typography 
} from '../components'
import { useFacultyFilter } from '../hooks'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Faculty() {
  const { filteredFaculty, totalCount, filteredCount } = useFacultyFilter()

  const handleAddGrade = (facultyId?: string) => {
    console.log('Add Grade clicked', facultyId ? `for faculty ${facultyId}` : 'global action')
    // Placeholder callback for adding grades
  }

  const handleSendNotice = (facultyId?: string) => {
    console.log('Send Notice clicked', facultyId ? `for faculty ${facultyId}` : 'global action')
    // Placeholder callback for sending notices
  }

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={tahoeVariants.fadeIn}
        transition={tahoeTransitions.fadeIn}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h2">Faculty</Typography>
          <Typography variant="body" color="secondary">
            Manage faculty members, their assignments, and contact information
          </Typography>
        </motion.div>

        {/* Filters Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Column */}
          <div className="lg:col-span-1">
            <FacultyFilters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Typography variant="body" color="secondary">
                Showing {filteredCount} of {totalCount} faculty members
              </Typography>
            </motion.div>

            {/* Faculty Table */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredFaculty.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredFaculty.length > 0 ? (
                  <FacultyTable
                    faculty={filteredFaculty}
                    onAddGrade={handleAddGrade}
                    onSendNotice={handleSendNotice}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12"
                  >
                    <Typography variant="h3" color="secondary" className="mb-2">
                      No faculty found
                    </Typography>
                    <Typography variant="body" color="secondary">
                      Try adjusting your search or filter criteria
                    </Typography>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Buttons */}
      <FacultyFloatingActions
        onAddGrade={() => handleAddGrade()}
        onSendNotice={() => handleSendNotice()}
      />
    </>
  )
}
