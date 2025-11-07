import { useAppStore } from '../state/appStore'

export function useAppState() {
  const selectedPage = useAppStore((state) => state.selectedPage)
  const themeMode = useAppStore((state) => state.themeMode)
  const isNotificationDrawerOpen = useAppStore((state) => state.isNotificationDrawerOpen)
  const isSidebarCollapsed = useAppStore((state) => state.isSidebarCollapsed)
  const setSelectedPage = useAppStore((state) => state.setSelectedPage)
  const setThemeMode = useAppStore((state) => state.setThemeMode)
  const toggleNotificationDrawer = useAppStore((state) => state.toggleNotificationDrawer)
  const setNotificationDrawerOpen = useAppStore((state) => state.setNotificationDrawerOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)

  return {
    selectedPage,
    themeMode,
    isNotificationDrawerOpen,
    isSidebarCollapsed,
    setSelectedPage,
    setThemeMode,
    toggleNotificationDrawer,
    setNotificationDrawerOpen,
    toggleSidebar,
  }
}
