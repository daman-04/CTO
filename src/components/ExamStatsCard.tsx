import React from 'react'
import { motion } from 'framer-motion'
import { GlassPanel, Typography } from './index'
import { BarChart } from './BarChart'
import { ExamStatsData } from '../state/appStore'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

interface ExamStatsCardProps {
  data: ExamStatsData
  index?: number
}

export function ExamStatsCard({ data, index = 0 }: ExamStatsCardProps) {
  const chartData = data.recentPerformance.map(perf => ({
    label: perf.date,
    value: Math.round(perf.passRate)
  }))

  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      transition={tahoeTransitions.slideUp}
      custom={index}
      whileHover={{ y: -4 }}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <GlassPanel className="p-6 cursor-default group hover:bg-gray-300/20 transition-colors duration-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Typography variant="overline" weight="medium" color="secondary">
              Exam Performance
            </Typography>
            <Typography variant="h3" weight="normal" className="mt-2">
              {data.passRate.toFixed(1)}%
            </Typography>
          </div>
          <div className="text-right">
            <Typography variant="caption" color="secondary">
              Upcoming
            </Typography>
            <Typography variant="h4" weight="medium" className="font-mono">
              {data.upcomingExams}
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="caption" color="secondary">
                Total Exams
              </Typography>
              <Typography variant="body" weight="medium" className="font-mono">
                {data.totalExams}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" color="secondary">
                Avg Score
              </Typography>
              <Typography variant="body" weight="medium" className="font-mono">
                {data.averageScore.toFixed(1)}
              </Typography>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200/30">
            <Typography variant="caption" color="secondary" className="block mb-3">
              Monthly Pass Rate
            </Typography>
            <BarChart 
              data={chartData}
              height={120}
              barColor="rgb(71, 100, 139)"
              showValues={false}
            />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}