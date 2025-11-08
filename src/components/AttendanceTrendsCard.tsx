import { motion } from 'framer-motion'
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { GlassPanel, Typography, IconBadge } from './index'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { AttendanceTrend } from '../state/appStore'

interface AttendanceTrendsCardProps {
  overall: number
  trend: 'up' | 'down' | 'stable'
  monthlyData: AttendanceTrend[]
  index?: number
}

export function AttendanceTrendsCard({ 
  overall, 
  trend, 
  monthlyData,
  index = 0 
}: AttendanceTrendsCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

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
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="overline" weight="medium" color="secondary">
                Attendance Trends
              </Typography>
              <div className="flex items-baseline gap-2 mt-3">
                <Typography variant="h2" weight="normal" className="font-mono">
                  {overall}%
                </Typography>
                <Typography variant="caption" color="secondary">
                  Overall
                </Typography>
              </div>
            </div>
            <IconBadge variant="accent" size="lg">
              <span className={getTrendColor(trend)}>{getTrendIcon(trend)}</span>
            </IconBadge>
          </div>
        </div>

        <div className="h-40 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#47648b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#47648b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'SF Pro Text' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'SF Mono' }}
                axisLine={false}
                tickLine={false}
                domain={[80, 95]}
              />
              <Area 
                type="monotone" 
                dataKey="percentage" 
                stroke="#47648b" 
                strokeWidth={2}
                fill="url(#attendanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Typography variant="caption" color="secondary" className="mt-4 block">
          {trend === 'up' && 'Attendance trending upward this semester'}
          {trend === 'down' && 'Attendance declining, review needed'}
          {trend === 'stable' && 'Attendance maintaining steady levels'}
        </Typography>
      </GlassPanel>
    </motion.div>
  )
}
