import { useEffect, useState } from 'react'
import { useThemeStore } from '../state/theme'

export function AmbientCursor() {
  const { motion } = useThemeStore()
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    if (motion === 'reduced') return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [motion])

  if (!isClient || motion === 'reduced') {
    return null
  }

  return (
    <div
      className="ambient-cursor"
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    />
  )
}