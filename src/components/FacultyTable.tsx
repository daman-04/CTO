import { motion, AnimatePresence } from 'framer-motion'
import { FacultyData } from '../state/appStore'
import { GlassPanel, Typography } from './index'
import classNames from 'classnames'

interface FacultyTableProps {
  faculty: FacultyData[]
  onAddGrade: (facultyId: string) => void
  onSendNotice: (facultyId: string) => void
}

export function FacultyTable({ faculty, onAddGrade, onSendNotice }: FacultyTableProps) {
  const getStatusColor = (status: FacultyData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'on_leave':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'emeritus':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <GlassPanel variant="light" className="overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200/30 bg-gray-50/30">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-2">Current Courses</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-1">Office</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200/30">
        <AnimatePresence>
          {faculty.map((facultyMember, index) => (
            <motion.div
              key={facultyMember.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                layout: { duration: 0.2 }
              }}
              layout
              whileHover={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                transition: { duration: 0.2 } 
              }}
              className="px-6 py-4 hover:bg-blue-50/30 transition-colors cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Name */}
                <div className="col-span-3">
                  <Typography variant="body" className="font-medium text-gray-900">
                    {facultyMember.name}
                  </Typography>
                  <Typography variant="caption" color="secondary" className="mt-1">
                    {facultyMember.phone}
                  </Typography>
                </div>

                {/* Department */}
                <div className="col-span-2">
                  <Typography variant="body" className="text-gray-700">
                    {facultyMember.department}
                  </Typography>
                </div>

                {/* Current Courses */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {facultyMember.currentCourses.length > 0 ? (
                      facultyMember.currentCourses.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-1 text-xs font-medium bg-gray-100/50 text-gray-600 rounded border border-gray-200/30"
                        >
                          {course}
                        </span>
                      ))
                    ) : (
                      <Typography variant="caption" color="secondary">
                        No courses
                      </Typography>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-span-2">
                  <Typography variant="body" className="text-gray-700 truncate">
                    {facultyMember.email}
                  </Typography>
                </div>

                {/* Office */}
                <div className="col-span-1">
                  <Typography variant="body" className="text-gray-700">
                    {facultyMember.office}
                  </Typography>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={classNames(
                      'px-2 py-1 text-xs font-medium rounded-full border',
                      getStatusColor(facultyMember.status)
                    )}
                  >
                    {facultyMember.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAddGrade(facultyMember.id)}
                      className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Grade
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSendNotice(facultyMember.id)}
                      className="px-3 py-1 text-xs font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Notice
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassPanel>
  )
}