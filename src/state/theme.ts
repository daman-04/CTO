import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ThemeMode = 'system' | 'light' | 'dark'
export type AccentColor = 'neutral' | 'blue' | 'purple'
export type MotionPreference = 'full' | 'reduced'

interface ThemeState {
  theme: ThemeMode
  accent: AccentColor
  motion: MotionPreference
  setTheme: (theme: ThemeMode) => void
  setAccent: (accent: AccentColor) => void
  setMotion: (motion: MotionPreference) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      accent: 'neutral',
      motion: 'full',
      
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      setMotion: (motion) => set({ motion }),
    }),
    {
      name: 'tahoe-theme-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Helper hook to get effective theme (considering system preference)
export const useEffectiveTheme = () => {
  const { theme } = useThemeStore()
  
  if (theme === 'system') {
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light' // Default fallback
  }
  
  return theme
}

// Helper hook to check if reduced motion is preferred
export const useReducedMotion = () => {
  const { motion } = useThemeStore()
  
  if (motion === 'reduced') {
    return true
  }
  
  // Check system preference
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  
  return false
}