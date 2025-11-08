import { motion } from 'framer-motion'
import { useAppStore } from '../state/appStore'
import { GlassPanel, GlassButton, Typography } from './index'

export function CoursesToolbar() {
  const { 
    coursesFilter, 
    setCoursesSearchQuery, 
    setCoursesStatusFilter, 
    setCoursesSort 
  } = useAppStore()

  const statusOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'upcoming', label: 'Upcoming' },
  ] as const

  const sortOptions = [
    { value: 'code', label: 'Code' },
    { value: 'name', label: 'Name' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'schedule', label: 'Schedule' },
    { value: 'progress', label: 'Progress' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Search Input */}
      <GlassPanel variant="light" className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses by code, name, faculty, or schedule..."
            value={coursesFilter.searchQuery}
            onChange={(e) => setCoursesSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100/30 backdrop-blur-sm border border-gray-200/30 rounded-tahoe text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
          />
          {coursesFilter.searchQuery && (
            <button
              onClick={() => setCoursesSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </GlassPanel>

      {/* Filter and Sort Controls */}
      <GlassPanel variant="light" className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Status
            </Typography>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={coursesFilter.selectedStatus === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCoursesStatusFilter(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex-1">
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Sort By
            </Typography>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={coursesFilter.sortBy === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCoursesSort(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          {/* Sort Order Toggle */}
          <div className="flex items-end">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => setCoursesSort(coursesFilter.sortBy, coursesFilter.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 flex items-center gap-2"
            >
              <span className="text-lg">
                {coursesFilter.sortOrder === 'asc' ? '↑' : '↓'}
              </span>
              {coursesFilter.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </GlassButton>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}