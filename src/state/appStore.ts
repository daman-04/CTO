import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'

export type NavigationPage = 
  | 'dashboard' 
  | 'courses' 
  | 'faculty' 
  | 'students' 
  | 'library' 
  | 'admin' 
  | 'notifications' 
  | 'settings'

export interface GPAData {
  currentGPA: number
  targetGPA: number
  trend: 'up' | 'down' | 'stable'
}

export interface AttendanceData {
  percentage: number
  classesAttended: number
  totalClasses: number
  status: 'excellent' | 'good' | 'fair' | 'warning'
}

export interface ActiveCoursesData {
  count: number
  courses: Array<{
    id: string
    name: string
    progress: number
  }>
}

export interface AnnouncementData {
  id: string
  title: string
  date: string
  type: 'academic' | 'administrative' | 'event'
}

export interface CourseData {
  id: string
  code: string
  name: string
  faculty: string
  schedule: string
  credits: number
  progress: number
  status: 'active' | 'completed' | 'upcoming'
  room: string
  days: string[]
}

export interface DashboardState {
  gpaData: GPAData
  attendanceData: AttendanceData
  activeCoursesData: ActiveCoursesData
  announcementsData: AnnouncementData[]
}

interface CoursesFilterState {
  searchQuery: string
  selectedStatus: 'all' | 'active' | 'completed' | 'upcoming'
  sortBy: 'code' | 'name' | 'faculty' | 'schedule' | 'progress'
  sortOrder: 'asc' | 'desc'
}

interface AppState {
  selectedPage: NavigationPage
  themeMode: ThemeMode
  isNotificationDrawerOpen: boolean
  isSidebarCollapsed: boolean
  dashboardData: DashboardState
  coursesData: CourseData[]
  coursesFilter: CoursesFilterState
  setSelectedPage: (page: NavigationPage) => void
  setThemeMode: (mode: ThemeMode) => void
  toggleNotificationDrawer: () => void
  setNotificationDrawerOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
  setCoursesSearchQuery: (query: string) => void
  setCoursesStatusFilter: (status: CoursesFilterState['selectedStatus']) => void
  setCoursesSort: (sortBy: CoursesFilterState['sortBy'], sortOrder?: CoursesFilterState['sortOrder']) => void
}

const mockDashboardData: DashboardState = {
  gpaData: {
    currentGPA: 3.72,
    targetGPA: 3.8,
    trend: 'up',
  },
  attendanceData: {
    percentage: 94,
    classesAttended: 47,
    totalClasses: 50,
    status: 'excellent',
  },
  activeCoursesData: {
    count: 5,
    courses: [
      { id: '1', name: 'Advanced Algorithms', progress: 85 },
      { id: '2', name: 'Database Systems', progress: 78 },
      { id: '3', name: 'Web Development', progress: 92 },
      { id: '4', name: 'Machine Learning', progress: 68 },
      { id: '5', name: 'Software Engineering', progress: 88 },
    ],
  },
  announcementsData: [
    {
      id: '1',
      title: 'Final Exams Schedule Released',
      date: '2 hours ago',
      type: 'academic',
    },
    {
      id: '2',
      title: 'Campus Closure Notice',
      date: '1 day ago',
      type: 'administrative',
    },
    {
      id: '3',
      title: 'Tech Conference Registration Open',
      date: '2 days ago',
      type: 'event',
    },
  ],
}

const mockCoursesData: CourseData[] = [
  {
    id: '1',
    code: 'CS401',
    name: 'Advanced Algorithms',
    faculty: 'Dr. Sarah Johnson',
    schedule: 'Mon/Wed 10:00-11:30',
    credits: 4,
    progress: 85,
    status: 'active',
    room: 'Tech Hall 301',
    days: ['Mon', 'Wed'],
  },
  {
    id: '2',
    code: 'CS350',
    name: 'Database Systems',
    faculty: 'Prof. Michael Chen',
    schedule: 'Tue/Thu 14:00-15:30',
    credits: 3,
    progress: 78,
    status: 'active',
    room: 'Science Building 205',
    days: ['Tue', 'Thu'],
  },
  {
    id: '3',
    code: 'CS420',
    name: 'Machine Learning',
    faculty: 'Dr. Emily Rodriguez',
    schedule: 'Mon/Wed/Fri 13:00-14:00',
    credits: 4,
    progress: 68,
    status: 'active',
    room: 'Tech Hall 402',
    days: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: '4',
    code: 'CS380',
    name: 'Software Engineering',
    faculty: 'Prof. David Kim',
    schedule: 'Tue/Thu 09:00-10:30',
    credits: 3,
    progress: 88,
    status: 'active',
    room: 'Engineering Lab 150',
    days: ['Tue', 'Thu'],
  },
  {
    id: '5',
    code: 'CS390',
    name: 'Web Development',
    faculty: 'Dr. Lisa Wang',
    schedule: 'Mon/Wed 15:00-16:30',
    credits: 3,
    progress: 92,
    status: 'active',
    room: 'Tech Hall 201',
    days: ['Mon', 'Wed'],
  },
  {
    id: '6',
    code: 'CS310',
    name: 'Computer Networks',
    faculty: 'Prof. James Miller',
    schedule: 'Tue/Thu 11:00-12:30',
    credits: 3,
    progress: 45,
    status: 'active',
    room: 'Science Building 308',
    days: ['Tue', 'Thu'],
  },
  {
    id: '7',
    code: 'CS460',
    name: 'Artificial Intelligence',
    faculty: 'Dr. Robert Taylor',
    schedule: 'Mon/Wed/Fri 10:00-11:00',
    credits: 4,
    progress: 0,
    status: 'upcoming',
    room: 'Tech Hall 501',
    days: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: '8',
    code: 'CS220',
    name: 'Data Structures',
    faculty: 'Prof. Jennifer Lee',
    schedule: 'Tue/Thu 14:00-15:30',
    credits: 3,
    progress: 100,
    status: 'completed',
    room: 'Science Building 102',
    days: ['Tue', 'Thu'],
  },
]

export const useAppStore = create<AppState>((set) => ({
  selectedPage: 'dashboard',
  themeMode: 'light',
  isNotificationDrawerOpen: false,
  isSidebarCollapsed: false,
  dashboardData: mockDashboardData,
  coursesData: mockCoursesData,
  coursesFilter: {
    searchQuery: '',
    selectedStatus: 'all',
    sortBy: 'code',
    sortOrder: 'asc',
  },
  setSelectedPage: (page) => set({ selectedPage: page }),
  setThemeMode: (mode) => set({ themeMode: mode }),
  toggleNotificationDrawer: () => set((state) => ({ 
    isNotificationDrawerOpen: !state.isNotificationDrawerOpen 
  })),
  setNotificationDrawerOpen: (isOpen) => set({ 
    isNotificationDrawerOpen: isOpen 
  }),
  toggleSidebar: () => set((state) => ({ 
    isSidebarCollapsed: !state.isSidebarCollapsed 
  })),
  setCoursesSearchQuery: (query) => set((state) => ({
    coursesFilter: { ...state.coursesFilter, searchQuery: query }
  })),
  setCoursesStatusFilter: (status) => set((state) => ({
    coursesFilter: { ...state.coursesFilter, selectedStatus: status }
  })),
  setCoursesSort: (sortBy, sortOrder) => set((state) => ({
    coursesFilter: { ...state.coursesFilter, sortBy, sortOrder: sortOrder || state.coursesFilter.sortOrder }
  })),
}))
