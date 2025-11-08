import { useAppStore } from '../state/appStore'

export function useAppState() {
  const selectedPage = useAppStore((state) => state.selectedPage)
  const themeMode = useAppStore((state) => state.themeMode)
  const preferences = useAppStore((state) => state.preferences)
  const isNotificationDrawerOpen = useAppStore((state) => state.isNotificationDrawerOpen)
  const isSidebarCollapsed = useAppStore((state) => state.isSidebarCollapsed)
  const setSelectedPage = useAppStore((state) => state.setSelectedPage)
  const setThemeMode = useAppStore((state) => state.setThemeMode)
  const setReducedMotion = useAppStore((state) => state.setReducedMotion)
  const setDashboardRefreshInterval = useAppStore((state) => state.setDashboardRefreshInterval)
  const setNotificationsRefreshInterval = useAppStore((state) => state.setNotificationsRefreshInterval)
  const toggleNotificationDrawer = useAppStore((state) => state.toggleNotificationDrawer)
  const setNotificationDrawerOpen = useAppStore((state) => state.setNotificationDrawerOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)

  return {
    selectedPage,
    themeMode,
    preferences,
    isNotificationDrawerOpen,
    isSidebarCollapsed,
    setSelectedPage,
    setThemeMode,
    setReducedMotion,
    setDashboardRefreshInterval,
    setNotificationsRefreshInterval,
    toggleNotificationDrawer,
    setNotificationDrawerOpen,
    toggleSidebar,
  }
}
