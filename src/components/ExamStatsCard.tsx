import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { GlassPanel, Typography } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { ExamStat } from '../state/appStore'

interface ExamStatsCardProps {
  upcomingExams: number
  averageScore: number
  completionRate: number
  subjects: ExamStat[]
  index?: number
}

export function ExamStatsCard({ 
  upcomingExams, 
  averageScore, 
  completionRate, 
  subjects,
  index = 0 
}: ExamStatsCardProps) {
  const completionData = [
    { name: 'Completed', value: completionRate },
    { name: 'Remaining', value: 100 - completionRate }
  ]
  
  const colors = ['#47648b', '#e2e8f0']

  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      transition={tahoeTransitions.slideUp}
      custom={index}
      whileHover={{ y: -4 }}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <GlassPanel 
        className="p-6 cursor-default group hover:bg-gray-300/20 transition-colors duration-200"
        elevation="overlay"
      >
        <div className="mb-6">
          <Typography variant="overline" weight="medium" color="secondary">
            Exam Statistics
          </Typography>
          <div className="flex items-baseline gap-4 mt-3">
            <div>
              <Typography variant="h2" weight="normal" className="font-mono">
                {upcomingExams}
              </Typography>
              <Typography variant="caption" color="secondary" className="mt-1">
                Upcoming Exams
              </Typography>
            </div>
            <div>
              <Typography variant="h3" weight="normal" className="font-mono text-accent-500">
                {averageScore.toFixed(1)}%
              </Typography>
              <Typography variant="caption" color="secondary" className="mt-1">
                Avg Score
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="h-32 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {completionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <Typography variant="h3" weight="normal" className="font-mono">
                {completionRate}%
              </Typography>
              <Typography variant="caption" color="secondary">
                Completion Rate
              </Typography>
            </div>
            <div className="space-y-2 mt-4">
              {subjects.slice(0, 3).map((subject) => (
                <div key={subject.subject} className="flex justify-between items-center">
                  <Typography variant="caption" color="secondary">
                    {subject.subject}
                  </Typography>
                  <Typography variant="caption" weight="medium" className="font-mono text-accent-600">
                    {subject.averageScore}%
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
