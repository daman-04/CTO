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

export interface DashboardState {
  gpaData: GPAData
  attendanceData: AttendanceData
  activeCoursesData: ActiveCoursesData
  announcementsData: AnnouncementData[]
}

interface AppState {
  selectedPage: NavigationPage
  themeMode: ThemeMode
  isNotificationDrawerOpen: boolean
  isSidebarCollapsed: boolean
  dashboardData: DashboardState
  setSelectedPage: (page: NavigationPage) => void
  setThemeMode: (mode: ThemeMode) => void
  toggleNotificationDrawer: () => void
  setNotificationDrawerOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
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

export const useAppStore = create<AppState>((set) => ({
  selectedPage: 'dashboard',
  themeMode: 'light',
  isNotificationDrawerOpen: false,
  isSidebarCollapsed: false,
  dashboardData: mockDashboardData,
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
}))
