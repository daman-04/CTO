import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassPanel, GlassButton, Typography } from '../components'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'
import { useAppStore } from '../state/appStore'

interface SettingItemProps {
  label: string
  description: string
  children: React.ReactNode
}

function SettingItem({ label, description, children }: SettingItemProps) {
  return (
    <motion.div
      variants={tahoeVariants.slideUp}
      className="py-4 px-6 border-b border-gray-200/20 last:border-b-0 flex items-center justify-between gap-4"
    >
      <div className="flex-1">
        <Typography variant="body" weight="medium" className="mb-1">
          {label}
        </Typography>
        <Typography variant="caption" color="secondary">
          {description}
        </Typography>
      </div>
      <div>{children}</div>
    </motion.div>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 rounded-full transition-all ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <motion.div
        initial={false}
        animate={{ x: checked ? 20 : 2 }}
        transition={tahoeTransitions.slideUp}
        className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
      />
    </motion.button>
  )
}

function NumberInput({
  value,
  onChange,
  min = 5,
  max = 300,
  step = 5,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(min, value - step))}
        className="w-8 h-8 rounded-tahoe-sm glass-light hover:glass-medium transition-all"
      >
        −
      </motion.button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const val = Math.min(max, Math.max(min, Number(e.target.value)))
          onChange(val)
        }}
        min={min}
        max={max}
        step={step}
        className="w-16 px-2 py-1 text-center rounded-tahoe-sm glass-light border border-gray-200/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(max, value + step))}
        className="w-8 h-8 rounded-tahoe-sm glass-light hover:glass-medium transition-all"
      >
        +
      </motion.button>
      <Typography variant="caption" color="secondary">
        {value}s
      </Typography>
    </div>
  )
}

export function Settings() {
  const {
    themeMode,
    setThemeMode,
    preferences,
    setReducedMotion,
    setDashboardRefreshInterval,
    setNotificationsRefreshInterval,
  } = useAppStore()

  const [localDashboardInterval, setLocalDashboardInterval] = useState(
    preferences.dashboardRefreshInterval
  )
  const [localNotificationsInterval, setLocalNotificationsInterval] = useState(
    preferences.notificationsRefreshInterval
  )

  const handleDashboardIntervalChange = (value: number) => {
    setLocalDashboardInterval(value)
    setDashboardRefreshInterval(value)
  }

  const handleNotificationsIntervalChange = (value: number) => {
    setLocalNotificationsInterval(value)
    setNotificationsRefreshInterval(value)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={tahoeVariants.fadeIn}
      transition={tahoeTransitions.fadeIn}
      className="space-y-6 max-w-3xl"
    >
      <div>
        <Typography variant="h2">Settings</Typography>
        <Typography variant="body" color="secondary">
          Configure application preferences and appearance
        </Typography>
      </div>

      {/* Theme Section */}
      <motion.div
        variants={tahoeVariants.slideUp}
        className="space-y-2"
      >
        <Typography variant="h5" className="text-base">Appearance</Typography>
        <GlassPanel variant="medium" elevation="overlay">
          <SettingItem
            label="Theme Mode"
            description="Switch between light and dark theme with smooth opacity transitions"
          >
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setThemeMode('light')}
                className={`px-4 py-2 rounded-tahoe-sm font-medium transition-all ${
                  themeMode === 'light'
                    ? 'glass-strong text-blue-600 shadow-sm'
                    : 'glass-light text-gray-700 hover:glass-medium'
                }`}
              >
                ☀️ Light
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setThemeMode('dark')}
                className={`px-4 py-2 rounded-tahoe-sm font-medium transition-all ${
                  themeMode === 'dark'
                    ? 'glass-strong text-blue-600 shadow-sm'
                    : 'glass-light text-gray-700 hover:glass-medium'
                }`}
              >
                🌙 Dark
              </motion.button>
            </div>
          </SettingItem>
        </GlassPanel>
      </motion.div>

      {/* Accessibility Section */}
      <motion.div
        variants={tahoeVariants.slideUp}
        className="space-y-2"
      >
        <Typography variant="h5" className="text-base">Accessibility</Typography>
        <GlassPanel variant="medium" elevation="overlay">
          <SettingItem
            label="Reduce Motion"
            description="Minimize animations and transitions throughout the app"
          >
            <Toggle
              checked={preferences.reducedMotion}
              onChange={setReducedMotion}
            />
          </SettingItem>
        </GlassPanel>
      </motion.div>

      {/* Data Refresh Section */}
      <motion.div
        variants={tahoeVariants.slideUp}
        className="space-y-2"
      >
        <Typography variant="h5" className="text-base">Data Refresh</Typography>
        <GlassPanel variant="medium" elevation="overlay">
          <SettingItem
            label="Dashboard Refresh Interval"
            description="How frequently dashboard data is refreshed (in seconds)"
          >
            <NumberInput
              value={localDashboardInterval}
              onChange={handleDashboardIntervalChange}
              min={5}
              max={300}
              step={5}
            />
          </SettingItem>
          <SettingItem
            label="Notifications Refresh Interval"
            description="How frequently notifications are checked (in seconds)"
          >
            <NumberInput
              value={localNotificationsInterval}
              onChange={handleNotificationsIntervalChange}
              min={5}
              max={300}
              step={5}
            />
          </SettingItem>
        </GlassPanel>
      </motion.div>

      {/* About Section */}
      <motion.div
        variants={tahoeVariants.slideUp}
        className="space-y-2"
      >
        <Typography variant="h5" className="text-base">About</Typography>
        <GlassPanel variant="medium" elevation="overlay" className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Typography variant="caption" color="secondary">
                Application Version
              </Typography>
              <Typography variant="caption" weight="medium">
                1.0.0
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="caption" color="secondary">
                Build Date
              </Typography>
              <Typography variant="caption" weight="medium">
                {new Date().toLocaleDateString()}
              </Typography>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/20">
              <Typography variant="caption" color="secondary" className="text-xs">
                University Management System powered by Tahoe Design System
              </Typography>
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Reset Button */}
      <motion.div
        variants={tahoeVariants.slideUp}
        className="flex justify-end pt-4"
      >
        <GlassButton
          variant="ghost"
          onClick={() => {
            setThemeMode('light')
            setReducedMotion(false)
            setDashboardRefreshInterval(30)
            setNotificationsRefreshInterval(15)
          }}
        >
          Reset to Defaults
        </GlassButton>
      </motion.div>
    </motion.div>
  )
}
