import { useMemo } from 'react'
import { useAppStore } from '../state/appStore'

export function useCoursesFilter() {
  const { coursesData, coursesFilter } = useAppStore()

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData

    // Apply search filter
    if (coursesFilter.searchQuery.trim()) {
      const query = coursesFilter.searchQuery.toLowerCase()
      filtered = filtered.filter(course =>
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query) ||
        course.faculty.toLowerCase().includes(query) ||
        course.schedule.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (coursesFilter.selectedStatus !== 'all') {
      filtered = filtered.filter(course => course.status === coursesFilter.selectedStatus)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (coursesFilter.sortBy) {
        case 'code':
          aValue = a.code
          bValue = b.code
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'faculty':
          aValue = a.faculty
          bValue = b.faculty
          break
        case 'schedule':
          aValue = a.schedule
          bValue = b.schedule
          break
        case 'progress':
          aValue = a.progress
          bValue = b.progress
          break
        default:
          aValue = a.code
          bValue = b.code
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return coursesFilter.sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      } else {
        const comparison = String(aValue).localeCompare(String(bValue))
        return coursesFilter.sortOrder === 'asc' ? comparison : -comparison
      }
    })

    return sorted
  }, [coursesData, coursesFilter])

  return {
    filteredCourses: filteredAndSortedCourses,
    totalCount: coursesData.length,
    filteredCount: filteredAndSortedCourses.length,
  }
}