import { motion, AnimatePresence } from 'framer-motion'
import { CoursesToolbar, CourseTile, Typography } from '../components'
import { useCoursesFilter } from '../hooks'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Courses() {
  const { filteredCourses, totalCount, filteredCount } = useCoursesFilter()

  return (
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
        <Typography variant="h2">Courses</Typography>
        <Typography variant="body" color="secondary">
          Browse and manage your course schedule, assignments, and progress
        </Typography>
      </motion.div>

      {/* Toolbar */}
      <CoursesToolbar />

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Typography variant="body" color="secondary">
          Showing {filteredCount} of {totalCount} courses
        </Typography>
      </motion.div>

      {/* Course Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filteredCourses.length}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={tahoeVariants.staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <CourseTile
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <Typography variant="h3" color="secondary" className="mb-2">
            No courses found
          </Typography>
          <Typography variant="body" color="secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </motion.div>
      )}
    </motion.div>
  )
}
