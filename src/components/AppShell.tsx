import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { useAppStore } from '../state/appStore'
import { GlassPanel } from './GlassPanel'
import { Typography } from './Typography'
import { NotificationDrawer } from './NotificationDrawer'
import { tahoeTransitions } from '../lib/motion'

interface NavItem {
  id: string
  label: string
  icon: string
  path: string
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◧', path: '/' },
  { id: 'courses', label: 'Courses', icon: '◉', path: '/courses' },
  { id: 'faculty', label: 'Faculty', icon: '◈', path: '/faculty' },
  { id: 'students', label: 'Students', icon: '◎', path: '/students' },
  { id: 'library', label: 'Library', icon: '◫', path: '/library' },
  { id: 'admin', label: 'Admin', icon: '◧', path: '/admin' },
  { id: 'notifications', label: 'Notifications', icon: '◐', path: '/notifications' },
  { id: 'settings', label: 'Settings', icon: '◑', path: '/settings' },
]

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const { isNotificationDrawerOpen, toggleNotificationDrawer, notificationsData } = useAppStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  const handleNavClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={tahoeTransitions.slideUp}
        className="w-64 p-4 flex-shrink-0"
      >
        <GlassPanel
          variant="medium"
          className="h-full p-4 flex flex-col"
          elevation="overlay"
        >
          {/* App Title */}
          <div className="mb-8">
            <Typography variant="h4" className="text-center">
              University
            </Typography>
            <Typography variant="caption" color="secondary" className="text-center">
              Management System
            </Typography>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.path)
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={classNames(
                      'flex items-center gap-3 px-4 py-3 rounded-tahoe-sm transition-all',
                      isActive
                        ? 'glass-strong text-blue-600 shadow-sm'
                        : 'hover:glass-light text-gray-700'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <Typography
                      variant="body"
                      weight={isActive ? 'medium' : 'normal'}
                      className="text-sm"
                    >
                      {item.label}
                    </Typography>
                  </motion.div>
                </Link>
              )
            })}
          </nav>
        </GlassPanel>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={tahoeTransitions.slideDown}
          className="p-4"
        >
          <GlassPanel
            variant="medium"
            className="px-6 py-4 flex items-center justify-between"
            elevation="overlay"
          >
            {/* Search Field Placeholder */}
            <div className="flex-1 max-w-md">
              <div className="glass-subtle rounded-tahoe-sm px-4 py-2 border border-gray-200/30">
                <Typography variant="body" color="muted" className="text-sm">
                  Search...
                </Typography>
              </div>
            </div>

            {/* Right Side: Clock, Notifications, Avatar */}
            <div className="flex items-center gap-4">
              {/* Clock */}
              <Typography variant="body" weight="medium" className="font-mono text-sm">
                {formatTime(currentTime)}
              </Typography>

              {/* Notifications Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNotificationDrawer}
                className={classNames(
                  'relative p-2 rounded-tahoe-sm transition-all',
                  isNotificationDrawerOpen
                    ? 'glass-strong text-blue-600'
                    : 'hover:glass-light text-gray-700'
                )}
              >
                <span className="text-xl">◐</span>
                {/* Notification Badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

              {/* User Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full glass-medium border border-gray-200/50 flex items-center justify-center cursor-pointer"
              >
                <Typography variant="body" weight="medium" className="text-sm">
                  JD
                </Typography>
              </motion.div>
            </div>
          </GlassPanel>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tahoeTransitions.fadeIn}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={toggleNotificationDrawer}
        notifications={notificationsData}
      />
    </div>
  )
}
