import React from 'react'
import { motion } from 'framer-motion'
import { GlassPanel, Typography } from '../components'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Faculty() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-4"
    >
      <Typography variant="h2">Faculty</Typography>
      <Typography variant="body" color="secondary">
        Manage faculty members and their information
      </Typography>

      <GlassPanel className="p-6 mt-6">
        <Typography variant="body" color="secondary">
          Faculty management interface coming soon...
        </Typography>
      </GlassPanel>
    </motion.div>
  )
}
