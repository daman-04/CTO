import { motion } from 'framer-motion'
import { useAppStore } from '../state/appStore'
import { GlassPanel, GlassButton, Typography } from './index'

export function LibraryFilters() {
  const {
    libraryFilter,
    setLibrarySearchQuery,
    setLibraryTypeFilter,
    setLibraryStatusFilter,
    setLibrarySort,
  } = useAppStore()

  const typeOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'issue', label: 'Issues' },
    { value: 'return', label: 'Returns' },
  ] as const

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'returned', label: 'Returned' },
  ] as const

  const sortOptions = [
    { value: 'date', label: 'Issue Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'studentName', label: 'Student Name' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <GlassPanel variant="light" className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, author, student, or ISBN..."
            value={libraryFilter.searchQuery}
            onChange={(e) => setLibrarySearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100/30 backdrop-blur-sm border border-gray-200/30 rounded-tahoe text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
          />
          {libraryFilter.searchQuery && (
            <button
              onClick={() => setLibrarySearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </GlassPanel>

      <GlassPanel variant="light" className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Transaction Type
            </Typography>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={libraryFilter.selectedType === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setLibraryTypeFilter(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Status
            </Typography>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={libraryFilter.selectedStatus === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setLibraryStatusFilter(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <Typography variant="caption" color="secondary" className="mb-2 block">
              Sort By
            </Typography>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <GlassButton
                  key={option.value}
                  variant={libraryFilter.sortBy === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setLibrarySort(option.value)}
                  className="px-4 py-2"
                >
                  {option.label}
                </GlassButton>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => setLibrarySort(libraryFilter.sortBy, libraryFilter.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 flex items-center gap-2"
            >
              <span className="text-lg">
                {libraryFilter.sortOrder === 'asc' ? '↑' : '↓'}
              </span>
              {libraryFilter.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </GlassButton>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
