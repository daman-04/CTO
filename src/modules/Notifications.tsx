import { motion } from 'framer-motion'
import { GlassPanel, Typography } from '../components'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export function Notifications() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-4"
    >
      <Typography variant="h2">Notifications</Typography>
      <Typography variant="body" color="secondary">
        View and manage all system notifications
      </Typography>

      <GlassPanel className="p-6 mt-6">
        <Typography variant="body" color="secondary">
          Notifications interface coming soon...
        </Typography>
      </GlassPanel>
    </motion.div>
  )
}
