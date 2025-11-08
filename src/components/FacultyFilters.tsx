import { motion } from 'framer-motion'
import { useAppStore } from '../state/appStore'
import { GlassPanel, GlassButton, Typography } from './index'

export function FacultyFilters() {
  const { 
    facultyFilter, 
    setFacultySearchQuery, 
    setFacultyDepartmentFilter,
    setFacultyStatusFilter, 
    setFacultySort 
  } = useAppStore()

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
  ] as const

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'emeritus', label: 'Emeritus' },
  ] as const

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'department', label: 'Department' },
    { value: 'courses', label: 'Course Count' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Search Input */}
      <GlassPanel variant="light" className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search faculty by name, department, email, or courses..."
            value={facultyFilter.searchQuery}
            onChange={(e) => setFacultySearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100/30 backdrop-blur-sm border border-gray-200/30 rounded-tahoe text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
          />
          {facultyFilter.searchQuery && (
            <button
              onClick={() => setFacultySearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </GlassPanel>

      {/* Filter Controls */}
      <GlassPanel variant="light" className="p-4">
        <div className="space-y-4">
          {/* Department Filter */}
          <div>
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Department
            </Typography>
            <div className="flex flex-wrap gap-2">
              {departments.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={facultyFilter.selectedDepartment === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFacultyDepartmentFilter(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Status
            </Typography>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={facultyFilter.selectedStatus === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFacultyStatusFilter(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          {/* Sort Controls */}
          <div>
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Sort By
            </Typography>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={facultyFilter.sortBy === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFacultySort(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          {/* Sort Order Toggle */}
          <div className="flex items-center">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => setFacultySort(facultyFilter.sortBy, facultyFilter.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 flex items-center gap-2"
            >
              <span className="text-lg">
                {facultyFilter.sortOrder === 'asc' ? '↑' : '↓'}
              </span>
              {facultyFilter.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </GlassButton>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}