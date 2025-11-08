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

export interface FacultyData {
  id: string
  name: string
  department: string
  currentCourses: string[]
  email: string
  phone: string
  office: string
  status: 'active' | 'on_leave' | 'emeritus'
}

export interface StudentData {
  id: string
  name: string
  initials: string
  major: string
  year: string
  standing: string
  studentId: string
  advisor: string
  email: string
  phone: string
  location: string
  expectedGraduation: string
  gpa: number
  attendance: number
  creditsCompleted: number
  creditsInProgress: number
  creditsRequired: number
  currentCourses: string[]
  focusArea: string
  extracurriculars: string[]
  avatarGradient: string
  lastLogin: string
}

export interface DepartmentData {
  id: string
  name: string
  studentCount: number
  facultyCount: number
  averageGPA: number
  graduationRate: number
  trend: 'up' | 'down' | 'stable'
}

export interface ExamStatsData {
  totalExams: number
  averageScore: number
  passRate: number
  upcomingExams: number
  recentPerformance: Array<{
    date: string
    score: number
    passRate: number
  }>
}

export interface AttendanceTrendData {
  currentRate: number
  monthlyData: Array<{
    month: string
    rate: number
    totalClasses: number
  }>
  departmentBreakdown: Array<{
    department: string
    rate: number
  }>
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

interface FacultyFilterState {
  searchQuery: string
  selectedDepartment: 'all' | string
  selectedStatus: 'all' | 'active' | 'on_leave' | 'emeritus'
  sortBy: 'name' | 'department' | 'courses'
  sortOrder: 'asc' | 'desc'
}

interface AdminState {
  departmentsData: DepartmentData[]
  examStatsData: ExamStatsData
  attendanceTrendData: AttendanceTrendData
}

interface AppState {
  selectedPage: NavigationPage
  themeMode: ThemeMode
  isNotificationDrawerOpen: boolean
  isSidebarCollapsed: boolean
  dashboardData: DashboardState
  coursesData: CourseData[]
  coursesFilter: CoursesFilterState
  facultyData: FacultyData[]
  studentsData: StudentData[]
  facultyFilter: FacultyFilterState
  adminData: AdminState
  setSelectedPage: (page: NavigationPage) => void
  setThemeMode: (mode: ThemeMode) => void
  toggleNotificationDrawer: () => void
  setNotificationDrawerOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
  setCoursesSearchQuery: (query: string) => void
  setCoursesStatusFilter: (status: CoursesFilterState['selectedStatus']) => void
  setCoursesSort: (sortBy: CoursesFilterState['sortBy'], sortOrder?: CoursesFilterState['sortOrder']) => void
  setFacultySearchQuery: (query: string) => void
  setFacultyDepartmentFilter: (department: FacultyFilterState['selectedDepartment']) => void
  setFacultyStatusFilter: (status: FacultyFilterState['selectedStatus']) => void
  setFacultySort: (sortBy: FacultyFilterState['sortBy'], sortOrder?: FacultyFilterState['sortOrder']) => void
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

const mockFacultyData: FacultyData[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    currentCourses: ['CS401', 'CS420'],
    email: 'sarah.johnson@university.edu',
    phone: '(555) 123-4567',
    office: 'Tech Hall 301',
    status: 'active',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    department: 'Computer Science',
    currentCourses: ['CS350', 'CS310'],
    email: 'michael.chen@university.edu',
    phone: '(555) 234-5678',
    office: 'Science Building 205',
    status: 'active',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    department: 'Computer Science',
    currentCourses: ['CS420', 'CS460'],
    email: 'emily.rodriguez@university.edu',
    phone: '(555) 345-6789',
    office: 'Tech Hall 402',
    status: 'active',
  },
  {
    id: '4',
    name: 'Prof. David Kim',
    department: 'Engineering',
    currentCourses: ['CS380'],
    email: 'david.kim@university.edu',
    phone: '(555) 456-7890',
    office: 'Engineering Lab 150',
    status: 'active',
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    department: 'Computer Science',
    currentCourses: ['CS390', 'CS220'],
    email: 'lisa.wang@university.edu',
    phone: '(555) 567-8901',
    office: 'Tech Hall 201',
    status: 'active',
  },
  {
    id: '6',
    name: 'Prof. James Miller',
    department: 'Mathematics',
    currentCourses: ['CS310'],
    email: 'james.miller@university.edu',
    phone: '(555) 678-9012',
    office: 'Science Building 308',
    status: 'on_leave',
  },
  {
    id: '7',
    name: 'Dr. Robert Taylor',
    department: 'Computer Science',
    currentCourses: ['CS460'],
    email: 'robert.taylor@university.edu',
    phone: '(555) 789-0123',
    office: 'Tech Hall 501',
    status: 'active',
  },
  {
    id: '8',
    name: 'Prof. Jennifer Lee',
    department: 'Mathematics',
    currentCourses: ['CS220'],
    email: 'jennifer.lee@university.edu',
    phone: '(555) 890-1234',
    office: 'Science Building 102',
    status: 'emeritus',
  },
  {
    id: '9',
    name: 'Dr. Marcus Williams',
    department: 'Physics',
    currentCourses: [],
    email: 'marcus.williams@university.edu',
    phone: '(555) 901-2345',
    office: 'Physics Building 201',
    status: 'active',
  },
  {
    id: '10',
    name: 'Dr. Amanda Foster',
    department: 'Engineering',
    currentCourses: ['CS380'],
    email: 'amanda.foster@university.edu',
    phone: '(555) 012-3456',
    office: 'Engineering Lab 250',
    status: 'active',
  },
]

const mockStudentsData: StudentData[] = [
  {
    id: 'sarah-lee',
    name: 'Sarah Lee',
    initials: 'SL',
    major: 'Computer Science',
    year: 'Senior',
    standing: 'Honors Track',
    studentId: 'U-104582',
    advisor: 'Dr. Michael Chen',
    email: 'sarah.lee@university.edu',
    phone: '(555) 210-3345',
    location: 'Tech Hall 312',
    expectedGraduation: 'May 2025',
    gpa: 3.92,
    attendance: 96,
    creditsCompleted: 108,
    creditsInProgress: 12,
    creditsRequired: 120,
    currentCourses: ['Capstone Studio', 'Machine Learning Lab', 'Ethics in AI'],
    focusArea: 'Machine Learning & Ethics',
    extracurriculars: ['ACM President', 'Robotics Lab'],
    avatarGradient: 'from-blue-200/90 via-blue-300/80 to-blue-500/70',
    lastLogin: '12 minutes ago',
  },
  {
    id: 'mateo-alvarez',
    name: 'Mateo Alvarez',
    initials: 'MA',
    major: 'Data Science',
    year: 'Junior',
    standing: "Dean's List",
    studentId: 'U-109276',
    advisor: 'Prof. Emily Rodriguez',
    email: 'mateo.alvarez@university.edu',
    phone: '(555) 278-4610',
    location: 'Innovation Hub 220',
    expectedGraduation: 'May 2026',
    gpa: 3.68,
    attendance: 92,
    creditsCompleted: 84,
    creditsInProgress: 15,
    creditsRequired: 120,
    currentCourses: ['Statistical Learning', 'Data Visualization Studio', 'Cloud Computing'],
    focusArea: 'Applied Analytics',
    extracurriculars: ['Data Science Society', 'Hackathon Team'],
    avatarGradient: 'from-purple-200/90 via-purple-300/80 to-indigo-500/70',
    lastLogin: '28 minutes ago',
  },
  {
    id: 'priya-desai',
    name: 'Priya Desai',
    initials: 'PD',
    major: 'Mechanical Engineering',
    year: 'Sophomore',
    standing: 'On Track',
    studentId: 'U-102845',
    advisor: 'Dr. Marcus Williams',
    email: 'priya.desai@university.edu',
    phone: '(555) 312-8476',
    location: 'Engineering Lab 210',
    expectedGraduation: 'December 2026',
    gpa: 3.45,
    attendance: 88,
    creditsCompleted: 60,
    creditsInProgress: 15,
    creditsRequired: 128,
    currentCourses: ['Thermodynamics II', 'Materials Science', 'Design for Manufacturing'],
    focusArea: 'Sustainable Systems',
    extracurriculars: ['Society of Women Engineers', 'Formula SAE'],
    avatarGradient: 'from-orange-200/90 via-amber-300/80 to-rose-400/70',
    lastLogin: '1 hour ago',
  },
  {
    id: 'ava-thompson',
    name: 'Ava Thompson',
    initials: 'AT',
    major: 'Interaction Design',
    year: 'Senior',
    standing: 'Portfolio Review',
    studentId: 'U-107593',
    advisor: 'Prof. Jennifer Lee',
    email: 'ava.thompson@university.edu',
    phone: '(555) 843-2290',
    location: 'Design Studio 104',
    expectedGraduation: 'May 2025',
    gpa: 3.81,
    attendance: 94,
    creditsCompleted: 110,
    creditsInProgress: 8,
    creditsRequired: 120,
    currentCourses: ['Service Design Lab', 'Inclusive Design Seminar', 'Motion Systems'],
    focusArea: 'Human-Centered Systems',
    extracurriculars: ['Design Guild Lead', 'Campus UX Lab'],
    avatarGradient: 'from-teal-200/90 via-emerald-300/80 to-cyan-400/70',
    lastLogin: '9 minutes ago',
  },
  {
    id: 'noah-anderson',
    name: 'Noah Anderson',
    initials: 'NA',
    major: 'Electrical Engineering',
    year: 'Junior',
    standing: 'Research Fellow',
    studentId: 'U-106412',
    advisor: 'Dr. Amanda Foster',
    email: 'noah.anderson@university.edu',
    phone: '(555) 498-7712',
    location: 'Photonics Lab 3B',
    expectedGraduation: 'December 2025',
    gpa: 3.56,
    attendance: 91,
    creditsCompleted: 86,
    creditsInProgress: 12,
    creditsRequired: 128,
    currentCourses: ['Embedded Systems', 'Advanced Circuits', 'Renewable Energy Systems'],
    focusArea: 'Photonics & Power Systems',
    extracurriculars: ['IEEE Treasurer', 'Solar Car Team'],
    avatarGradient: 'from-slate-200/90 via-slate-300/80 to-blue-400/70',
    lastLogin: '42 minutes ago',
  },
  {
    id: 'hana-sato',
    name: 'Hana Sato',
    initials: 'HS',
    major: 'Cybersecurity',
    year: 'Graduate Year 1',
    standing: 'Accelerated Track',
    studentId: 'G-205184',
    advisor: 'Dr. Robert Taylor',
    email: 'hana.sato@university.edu',
    phone: '(555) 634-1189',
    location: 'Cyber Range 210',
    expectedGraduation: 'August 2025',
    gpa: 3.88,
    attendance: 97,
    creditsCompleted: 32,
    creditsInProgress: 9,
    creditsRequired: 48,
    currentCourses: ['Advanced Network Defense', 'Applied Cryptography', 'Incident Response Studio'],
    focusArea: 'Network Defense & Automation',
    extracurriculars: ['Cyber Defense Club', 'Capture the Flag Team'],
    avatarGradient: 'from-pink-200/90 via-fuchsia-300/80 to-purple-500/70',
    lastLogin: '5 minutes ago',
  },
]

const mockAdminData: AdminState = {
  departmentsData: [
    {
      id: '1',
      name: 'Computer Science',
      studentCount: 1250,
      facultyCount: 45,
      averageGPA: 3.72,
      graduationRate: 94,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Engineering',
      studentCount: 980,
      facultyCount: 38,
      averageGPA: 3.58,
      graduationRate: 91,
      trend: 'stable',
    },
    {
      id: '3',
      name: 'Mathematics',
      studentCount: 420,
      facultyCount: 22,
      averageGPA: 3.65,
      graduationRate: 89,
      trend: 'down',
    },
    {
      id: '4',
      name: 'Physics',
      studentCount: 315,
      facultyCount: 18,
      averageGPA: 3.48,
      graduationRate: 87,
      trend: 'up',
    },
    {
      id: '5',
      name: 'Interaction Design',
      studentCount: 280,
      facultyCount: 15,
      averageGPA: 3.81,
      graduationRate: 96,
      trend: 'up',
    },
  ],
  examStatsData: {
    totalExams: 156,
    averageScore: 78.5,
    passRate: 87.3,
    upcomingExams: 12,
    recentPerformance: [
      { date: 'Oct', score: 76.2, passRate: 85.1 },
      { date: 'Nov', score: 78.5, passRate: 87.3 },
      { date: 'Dec', score: 81.3, passRate: 89.7 },
      { date: 'Jan', score: 79.8, passRate: 88.2 },
      { date: 'Feb', score: 82.4, passRate: 91.5 },
      { date: 'Mar', score: 78.5, passRate: 87.3 },
    ],
  },
  attendanceTrendData: {
    currentRate: 91.2,
    monthlyData: [
      { month: 'Oct', rate: 88.5, totalClasses: 2450 },
      { month: 'Nov', rate: 90.2, totalClasses: 2380 },
      { month: 'Dec', rate: 86.8, totalClasses: 1890 },
      { month: 'Jan', rate: 92.1, totalClasses: 2560 },
      { month: 'Feb', rate: 89.7, totalClasses: 2420 },
      { month: 'Mar', rate: 91.2, totalClasses: 2650 },
    ],
    departmentBreakdown: [
      { department: 'Computer Science', rate: 93.5 },
      { department: 'Engineering', rate: 89.8 },
      { department: 'Mathematics', rate: 91.2 },
      { department: 'Physics', rate: 87.6 },
      { department: 'Interaction Design', rate: 94.1 },
    ],
  },
}

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
  facultyData: mockFacultyData,
  studentsData: mockStudentsData,
  facultyFilter: {
    searchQuery: '',
    selectedDepartment: 'all',
    selectedStatus: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  adminData: mockAdminData,
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
  setFacultySearchQuery: (query) => set((state) => ({
    facultyFilter: { ...state.facultyFilter, searchQuery: query }
  })),
  setFacultyDepartmentFilter: (department) => set((state) => ({
    facultyFilter: { ...state.facultyFilter, selectedDepartment: department }
  })),
  setFacultyStatusFilter: (status) => set((state) => ({
    facultyFilter: { ...state.facultyFilter, selectedStatus: status }
  })),
  setFacultySort: (sortBy, sortOrder) => set((state) => ({
    facultyFilter: { ...state.facultyFilter, sortBy, sortOrder: sortOrder || state.facultyFilter.sortOrder }
  })),
}))
