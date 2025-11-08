import { Routes, Route } from 'react-router-dom'
import { AppShell, AmbientCursor } from './components'
import { useThemeStore } from './state/theme'
import {
  Dashboard,
  Courses,
  Faculty,
  Students,
  Library,
  Admin,
  Notifications,
  Settings,
} from './modules'

function App() {
  const { theme, accent } = useThemeStore()

  return (
    <div className={`accent-${accent} ${theme === 'dark' ? 'dark' : ''}`}>
      <AmbientCursor />
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="students" element={<Students />} />
          <Route path="library" element={<Library />} />
          <Route path="admin" element={<Admin />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
