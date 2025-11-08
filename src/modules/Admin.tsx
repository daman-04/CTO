import { motion } from 'framer-motion'
import { Typography, DepartmentsCard, ExamStatsCard, AttendanceTrendsCard } from '../components'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { useAppStore } from '../state/appStore'

export function Admin() {
  const adminAnalyticsData = useAppStore((state) => state.adminAnalyticsData)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-6"
    >
      <div className="text-center">
        <Typography variant="h2">Admin Analytics</Typography>
        <Typography variant="body" color="secondary" className="mt-2">
          System-wide metrics and performance indicators
        </Typography>
      </div>

      <motion.div
        variants={tahoeVariants.staggerContainer}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
      >
        <DepartmentsCard
          departments={adminAnalyticsData.departments}
          totalDepartments={adminAnalyticsData.totalDepartments}
          totalFaculty={adminAnalyticsData.totalFaculty}
          index={0}
        />

        <ExamStatsCard
          upcomingExams={adminAnalyticsData.examStats.upcomingExams}
          averageScore={adminAnalyticsData.examStats.averageScore}
          completionRate={adminAnalyticsData.examStats.completionRate}
          subjects={adminAnalyticsData.examStats.subjects}
          index={1}
        />

        <AttendanceTrendsCard
          overall={adminAnalyticsData.attendanceTrends.overall}
          trend={adminAnalyticsData.attendanceTrends.trend}
          monthlyData={adminAnalyticsData.attendanceTrends.monthlyData}
          index={2}
        />
      </motion.div>
    </motion.div>
  )
}
