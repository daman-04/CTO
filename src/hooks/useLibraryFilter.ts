import { useMemo } from 'react'
import { useAppStore } from '../state/appStore'

export function useLibraryFilter() {
  const { libraryData, libraryFilter } = useAppStore()

  const { filteredAndSortedEntries, totalCount, activeCount, overdueCount, returnedCount } = useMemo(() => {
    let filtered = libraryData

    if (libraryFilter.searchQuery.trim()) {
      const query = libraryFilter.searchQuery.toLowerCase()
      filtered = filtered.filter(entry =>
        entry.item.title.toLowerCase().includes(query) ||
        entry.item.author.toLowerCase().includes(query) ||
        entry.studentName.toLowerCase().includes(query) ||
        entry.item.isbn.toLowerCase().includes(query)
      )
    }

    if (libraryFilter.selectedType !== 'all') {
      filtered = filtered.filter(entry => entry.type === libraryFilter.selectedType)
    }

    if (libraryFilter.selectedStatus !== 'all') {
      filtered = filtered.filter(entry => entry.status === libraryFilter.selectedStatus)
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (libraryFilter.sortBy) {
        case 'date':
          aValue = a.issuedDate
          bValue = b.issuedDate
          break
        case 'dueDate':
          aValue = a.dueDate
          bValue = b.dueDate
          break
        case 'studentName':
          aValue = a.studentName
          bValue = b.studentName
          break
        default:
          aValue = a.issuedDate
          bValue = b.issuedDate
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return libraryFilter.sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      } else {
        const comparison = String(aValue).localeCompare(String(bValue))
        return libraryFilter.sortOrder === 'asc' ? comparison : -comparison
      }
    })

    const activeCount = libraryData.filter(e => e.status === 'active').length
    const overdueCount = libraryData.filter(e => e.status === 'overdue').length
    const returnedCount = libraryData.filter(e => e.status === 'returned').length

    return {
      filteredAndSortedEntries: sorted,
      totalCount: libraryData.length,
      activeCount,
      overdueCount,
      returnedCount,
    }
  }, [libraryData, libraryFilter])

  return {
    filteredEntries: filteredAndSortedEntries,
    totalCount,
    filteredCount: filteredAndSortedEntries.length,
    activeCount,
    overdueCount,
    returnedCount,
  }
}
