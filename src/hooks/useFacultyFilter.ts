import { useMemo } from 'react'
import { useAppStore } from '../state/appStore'

export function useFacultyFilter() {
  const { facultyData, facultyFilter } = useAppStore()

  const filteredAndSortedFaculty = useMemo(() => {
    let filtered = facultyData

    // Apply search filter
    if (facultyFilter.searchQuery.trim()) {
      const query = facultyFilter.searchQuery.toLowerCase()
      filtered = filtered.filter(faculty =>
        faculty.name.toLowerCase().includes(query) ||
        faculty.department.toLowerCase().includes(query) ||
        faculty.email.toLowerCase().includes(query) ||
        faculty.currentCourses.some(course => course.toLowerCase().includes(query))
      )
    }

    // Apply department filter
    if (facultyFilter.selectedDepartment !== 'all') {
      filtered = filtered.filter(faculty => faculty.department === facultyFilter.selectedDepartment)
    }

    // Apply status filter
    if (facultyFilter.selectedStatus !== 'all') {
      filtered = filtered.filter(faculty => faculty.status === facultyFilter.selectedStatus)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (facultyFilter.sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'department':
          aValue = a.department
          bValue = b.department
          break
        case 'courses':
          aValue = a.currentCourses.length
          bValue = b.currentCourses.length
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return facultyFilter.sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      } else {
        const comparison = String(aValue).localeCompare(String(bValue))
        return facultyFilter.sortOrder === 'asc' ? comparison : -comparison
      }
    })

    return sorted
  }, [facultyData, facultyFilter])

  // Get unique departments for filter options
  const departments = useMemo(() => {
    const depts = Array.from(new Set(facultyData.map(faculty => faculty.department)))
    return depts.sort()
  }, [facultyData])

  return {
    filteredFaculty: filteredAndSortedFaculty,
    totalCount: facultyData.length,
    filteredCount: filteredAndSortedFaculty.length,
    departments,
  }
}