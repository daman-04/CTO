import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useAppStore } from '../state/appStore'
import { GlassPanel, NotificationItem } from './index'
import { Typography } from './Typography'
import { tahoeVariants, tahoeTransitions, createTahoeTransition } from '../lib/motion'

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
  const { 
    isNotificationDrawerOpen, 
    toggleNotificationDrawer, 
    notificationsData,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    themeMode,
    preferences
  } = useAppStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeMode])

  useEffect(() => {
    if (preferences.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0ms')
    } else {
      document.documentElement.style.removeProperty('--animation-duration')
    }
  }, [preferences.reducedMotion])

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
                {notificationsData.filter(n => !n.read).length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <Typography variant="caption" className="text-white text-xs font-medium">
                      {notificationsData.filter(n => !n.read).length}
                    </Typography>
                  </motion.div>
                )}
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
      <AnimatePresence>
        {isNotificationDrawerOpen && (
          <motion.aside
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={createTahoeTransition('SMOOTH', 200)}
            className="fixed right-0 top-0 h-full w-80 p-4 z-50 flex-shrink-0"
          >
            <GlassPanel
              variant="medium"
              className="h-full flex flex-col"
              elevation="overlay"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
                <div className="flex items-center gap-3">
                  <Typography variant="h4">Notifications</Typography>
                  {notificationsData.filter(n => !n.read).length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Typography variant="caption" className="text-white text-xs font-medium">
                        {notificationsData.filter(n => !n.read).length}
                      </Typography>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {notificationsData.some(n => !n.read) && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all read
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleNotificationDrawer}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-tahoe">
                {notificationsData.length > 0 ? (
                  <motion.div
                    variants={tahoeVariants.staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-3"
                  >
                    {notificationsData.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onRead={markNotificationAsRead}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-subtle rounded-tahoe-sm p-6 text-center"
                  >
                    <div className="text-4xl mb-4">◐</div>
                    <Typography variant="body" weight="medium" className="text-sm mb-2">
                      All caught up!
                    </Typography>
                    <Typography variant="caption" color="secondary">
                      You have no notifications
                    </Typography>
                  </motion.div>
                )}
              </div>
            </GlassPanel>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
