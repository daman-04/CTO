import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell } from './components'
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
  return (
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
  )
}

export default App
