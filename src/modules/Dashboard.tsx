import { motion } from 'framer-motion'
import { Typography, GPATile, AttendanceTile, ActiveCoursesTile, AnnouncementsTile, ThemeDemo } from '../components'
import { useAppStore } from '../state/appStore'
import { tahoeVariants, tahoeMotion } from '../lib/motion'

export function Dashboard() {
  const dashboardData = useAppStore((state) => state.dashboardData)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeMotion.SPRING.SMOOTH}
      className="space-y-4 baseline-grid"
    >
      <Typography variant="h2">Dashboard</Typography>
      <Typography variant="body" color="secondary">
        Welcome to your university management dashboard
      </Typography>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
        variants={tahoeVariants.staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={tahoeVariants.tileStagger}>
          <GPATile data={dashboardData.gpaData} index={0} elevation="3" interactive />
        </motion.div>

        <motion.div variants={tahoeVariants.tileStagger}>
          <AttendanceTile data={dashboardData.attendanceData} index={1} elevation="2" interactive />
        </motion.div>

        <motion.div variants={tahoeVariants.tileStagger}>
          <ActiveCoursesTile data={dashboardData.activeCoursesData} index={2} elevation="2" interactive />
        </motion.div>

        <motion.div variants={tahoeVariants.tileStagger}>
          <AnnouncementsTile data={dashboardData.announcementsData} index={3} elevation="1" interactive />
        </motion.div>
      </motion.div>

      {/* Theme Demo Section */}
      <motion.div
        variants={tahoeVariants.panelEnter}
        initial="initial"
        animate="animate"
        className="mt-8"
      >
        <ThemeDemo />
      </motion.div>
    </motion.div>
  )
}
