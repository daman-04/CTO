import { motion } from 'framer-motion'
import { Typography, GPATile, AttendanceTile, ActiveCoursesTile, AnnouncementsTile } from '../components'
import { useAppStore } from '../state/appStore'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Dashboard() {
  const dashboardData = useAppStore((state) => state.dashboardData)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-4"
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
        <motion.div variants={tahoeVariants.staggerItem}>
          <GPATile data={dashboardData.gpaData} index={0} />
        </motion.div>

        <motion.div variants={tahoeVariants.staggerItem}>
          <AttendanceTile data={dashboardData.attendanceData} index={1} />
        </motion.div>

        <motion.div variants={tahoeVariants.staggerItem}>
          <ActiveCoursesTile data={dashboardData.activeCoursesData} index={2} />
        </motion.div>

        <motion.div variants={tahoeVariants.staggerItem}>
          <AnnouncementsTile data={dashboardData.announcementsData} index={3} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
