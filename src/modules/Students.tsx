import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import classNames from 'classnames'
import { GlassPanel, Typography } from '../components'
import { useAppStore } from '../state/appStore'
import { tahoeTransitions, tahoeVariants } from '../lib/motion'

export function Students() {
  const students = useAppStore((state) => state.studentsData)
  const [selectedStudentId, setSelectedStudentId] = useState(() => students[0]?.id ?? '')

  useEffect(() => {
    if (!students.length) {
      setSelectedStudentId('')
      return
    }

    if (!selectedStudentId || !students.some((student) => student.id === selectedStudentId)) {
      setSelectedStudentId(students[0].id)
    }
  }, [students, selectedStudentId])

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) ?? students[0] ?? null,
    [students, selectedStudentId]
  )

  if (!students.length || !selectedStudent) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={tahoeVariants.fadeIn}
        transition={tahoeTransitions.fadeIn}
        className="space-y-6"
      >
        <Typography variant="h2">Students</Typography>
        <Typography variant="body" color="secondary">
          Manage student records, academic progress, and attendance insights
        </Typography>

        <GlassPanel className="p-6">
          <Typography variant="body" color="secondary">
            No students available yet.
          </Typography>
        </GlassPanel>
      </motion.div>
    )
  }

  const quickStats = [
    {
      id: 'gpa',
      label: 'Current GPA',
      value: selectedStudent.gpa.toFixed(2),
      hint: selectedStudent.standing,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      value: `${selectedStudent.attendance}%`,
      hint: `Last sync ${selectedStudent.lastLogin}`,
    },
    {
      id: 'credits',
      label: 'Credits',
      value: `${selectedStudent.creditsCompleted}/${selectedStudent.creditsRequired}`,
      hint: `${selectedStudent.creditsInProgress} in progress`,
    },
  ]

  const creditsRemaining = Math.max(
    selectedStudent.creditsRequired - selectedStudent.creditsCompleted,
    0
  )
  const creditProgress = selectedStudent.creditsRequired
    ? Math.min(
        100,
        Math.round((selectedStudent.creditsCompleted / selectedStudent.creditsRequired) * 100)
      )
    : 0

  return (
    <LayoutGroup>
      <motion.div
        initial="initial"
        animate="animate"
        variants={tahoeVariants.fadeIn}
        transition={tahoeTransitions.fadeIn}
        className="space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h2">Students</Typography>
          <Typography variant="body" color="secondary">
            Track academic progress, attendance, and student activity with animated profiles
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <GlassPanel
            layout
            variant="light"
            elevation="surface"
            className="p-4 space-y-4 xl:col-span-2"
          >
            <div className="flex items-center justify-between">
              <Typography
                variant="caption"
                color="secondary"
                className="font-mono uppercase tracking-[0.28em]"
              >
                Student Roster
              </Typography>
              <Typography variant="caption" color="secondary" className="font-mono">
                {students.length.toString().padStart(2, '0')} total
              </Typography>
            </div>

            <div className="space-y-2">
              {students.map((student) => {
                const isActive = student.id === selectedStudent.id
                return (
                  <motion.button
                    key={student.id}
                    type="button"
                    layout
                    whileHover={{ y: -1 }}
                    onClick={() => setSelectedStudentId(student.id)}
                    className="relative block w-full focus:outline-none"
                    transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  >
                    <div className="relative rounded-tahoe-sm overflow-hidden">
                      <div className="absolute inset-0 glass-subtle border border-gray-200/40" />
                      {isActive && (
                        <motion.div
                          layoutId="student-active-highlight"
                          className="absolute inset-0 glass-medium border border-blue-500/40 shadow-sm"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                        <div
                          className={classNames(
                            'w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center border border-white/50 shadow-sm text-sm font-mono text-gray-700',
                            student.avatarGradient
                          )}
                        >
                          {student.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {student.name}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono uppercase tracking-wide text-gray-500">
                            <span>{student.year}</span>
                            <span className="opacity-40">•</span>
                            <span className="truncate">{student.major}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono uppercase tracking-wide text-gray-500">
                            GPA
                          </p>
                          <p className="text-sm font-mono text-gray-800">
                            {student.gpa.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </GlassPanel>

          <div className="xl:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStudent.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <GlassPanel
                  layoutId="student-profile-card"
                  layout
                  variant="medium"
                  elevation="overlay"
                  className="relative overflow-hidden p-6 md:p-8"
                >
                  <div className="flex flex-wrap gap-4 md:absolute md:-top-12 md:right-6 md:justify-end md:pointer-events-none">
                    {quickStats.map((stat, index) => (
                      <motion.div
                        key={`${selectedStudent.id}-${stat.id}`}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className="md:pointer-events-auto"
                      >
                        <GlassPanel
                          layout
                          variant="strong"
                          elevation="overlay"
                          rounded="sm"
                          className="px-4 py-3 min-w-[140px]"
                        >
                          <p className="text-xs font-mono uppercase tracking-[0.28em] text-gray-500">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-lg font-mono text-gray-900">{stat.value}</p>
                          <p className="mt-1 text-xs font-mono text-gray-500">{stat.hint}</p>
                        </GlassPanel>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200/40">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div
                        className={classNames(
                          'w-20 h-20 md:w-24 md:h-24 rounded-tahoe-lg bg-gradient-to-br flex items-center justify-center border border-white/50 shadow-inner text-2xl font-mono text-gray-800',
                          selectedStudent.avatarGradient
                        )}
                      >
                        {selectedStudent.initials}
                      </div>
                      <div className="space-y-2">
                        <Typography variant="h2" className="mb-0">
                          {selectedStudent.name}
                        </Typography>
                        <div className="flex flex-wrap items-center gap-2 text-sm font-mono uppercase tracking-wide text-gray-600">
                          <span>{selectedStudent.year}</span>
                          <span className="opacity-40">•</span>
                          <span>{selectedStudent.major}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-xs font-mono uppercase tracking-wide rounded-full border border-blue-300/60 bg-blue-50/60 text-blue-600">
                            {selectedStudent.standing}
                          </span>
                          <span className="px-3 py-1 text-xs font-mono uppercase tracking-wide rounded-full border border-gray-300/60 bg-white/50 text-gray-600">
                            ID {selectedStudent.studentId}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm font-mono text-gray-600">
                      <p className="uppercase tracking-wide text-xs text-gray-500">Advisor</p>
                      <p className="text-gray-800">{selectedStudent.advisor}</p>
                      <p className="text-gray-500 text-xs">Last login {selectedStudent.lastLogin}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-subtle rounded-tahoe-sm border border-gray-200/40 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
                        Academic Overview
                      </p>
                      <div className="mt-3 space-y-3 text-sm text-gray-700">
                        <div>
                          <p className="text-xs font-mono uppercase text-gray-500">Graduation</p>
                          <p className="font-mono text-gray-700">
                            {selectedStudent.expectedGraduation}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase text-gray-500">Focus Area</p>
                          <p className="font-mono text-gray-700">{selectedStudent.focusArea}</p>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase text-gray-500">
                            Credits Remaining
                          </p>
                          <p className="font-mono text-gray-700">{creditsRemaining}</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-subtle rounded-tahoe-sm border border-gray-200/40 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
                        Contact & Location
                      </p>
                      <div className="mt-3 space-y-3 text-sm text-gray-700">
                        <div>
                          <p className="text-xs font-mono uppercase text-gray-500">Email</p>
                          <p className="font-mono text-gray-700 break-all">
                            {selectedStudent.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase text-gray-500">Phone</p>
                          <p className="font-mono text-gray-700">{selectedStudent.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase text-gray-500">Location</p>
                          <p className="font-mono text-gray-700">{selectedStudent.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-subtle rounded-tahoe-sm border border-gray-200/40 p-4 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
                          Credit Completion
                        </p>
                        <p className="text-xs font-mono text-gray-500">
                          {selectedStudent.creditsCompleted} completed · {selectedStudent.creditsInProgress} in progress
                        </p>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-gray-200/40 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${creditProgress}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs font-mono text-gray-500">
                        <span>{creditProgress}% complete</span>
                        <span>{creditsRemaining} credits remaining</span>
                      </div>
                    </div>

                    <div className="glass-subtle rounded-tahoe-sm border border-gray-200/40 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
                        Current Courses
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedStudent.currentCourses.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wide rounded-full border border-gray-200/50 glass-light text-gray-700"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="glass-subtle rounded-tahoe-sm border border-gray-200/40 p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
                        Extracurriculars
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedStudent.extracurriculars.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wide rounded-full border border-gray-200/50 bg-white/40 text-gray-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  )
}
