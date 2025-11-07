import React from 'react'
import { motion } from 'framer-motion'
import { GlassPanel, Typography } from '../components'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Dashboard() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <GlassPanel className="p-6">
          <Typography variant="h4">Quick Stats</Typography>
          <Typography variant="body" color="secondary" className="mt-2">
            Overview of key metrics
          </Typography>
        </GlassPanel>

        <GlassPanel className="p-6">
          <Typography variant="h4">Recent Activity</Typography>
          <Typography variant="body" color="secondary" className="mt-2">
            Latest updates and changes
          </Typography>
        </GlassPanel>

        <GlassPanel className="p-6">
          <Typography variant="h4">Notifications</Typography>
          <Typography variant="body" color="secondary" className="mt-2">
            Important alerts and messages
          </Typography>
        </GlassPanel>
      </div>
    </motion.div>
  )
}
