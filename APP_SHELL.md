# App Shell Documentation

## Overview

The app shell provides a consistent layout and navigation structure for the university management system, featuring a macOS Tahoe-inspired design with frosted glass effects and smooth animations.

## Structure

### Components

#### AppShell (`src/components/AppShell.tsx`)

The main layout component that wraps all pages. It consists of:

- **Sidebar**: Frosted glass navigation panel with links to all modules
- **Top Bar**: Floating header with search, clock, notifications, and user avatar
- **Main Content Area**: React Router outlet for page content
- **Notification Drawer**: Slide-in panel for notifications (togglable)

### State Management

#### App Store (`src/state/appStore.ts`)

Global UI state managed with Zustand:

```typescript
{
  selectedPage: NavigationPage       // Current active page
  themeMode: 'light' | 'dark'       // Theme mode (ready for implementation)
  isNotificationDrawerOpen: boolean  // Notification drawer visibility
  isSidebarCollapsed: boolean       // Sidebar collapse state
}
```

**Actions:**
- `setSelectedPage(page)` - Update active page
- `setThemeMode(mode)` - Toggle theme
- `toggleNotificationDrawer()` - Open/close notifications
- `setNotificationDrawerOpen(isOpen)` - Set drawer state
- `toggleSidebar()` - Collapse/expand sidebar

#### Custom Hook (`src/hooks/useAppState.ts`)

Convenience hook for accessing app state in any component:

```typescript
import { useAppState } from '../hooks'

const {
  selectedPage,
  themeMode,
  toggleNotificationDrawer,
  // ... other state and actions
} = useAppState()
```

### Routing

React Router v7 setup in `src/App.tsx`:

```
/ (AppShell)
├── / (Dashboard)
├── /courses (Courses)
├── /faculty (Faculty)
├── /students (Students)
├── /library (Library)
├── /admin (Admin)
├── /notifications (Notifications)
└── /settings (Settings)
```

All routes are wrapped in the AppShell component, which provides the consistent layout.

### Modules/Pages

Each page is a separate component in `src/modules/`:

- `Dashboard.tsx` - Overview and quick stats
- `Courses.tsx` - Course management
- `Faculty.tsx` - Faculty records
- `Students.tsx` - Student records
- `Library.tsx` - Library resources
- `Admin.tsx` - System administration
- `Notifications.tsx` - Notification center
- `Settings.tsx` - App preferences

## Design System

### Spacing

Uses 16px grid spacing (Tailwind's default spacing scale):
- `gap-4` = 16px
- `p-4` = 16px padding
- `m-4` = 16px margin

### Border Radius

Custom Tahoe radii (12px base):
- `rounded-tahoe-sm` = 8px
- `rounded-tahoe` = 12px (default)
- `rounded-tahoe-lg` = 16px
- `rounded-tahoe-xl` = 24px

### Glass Effects

Frosted glass morphism variants:
- `glass-subtle` - rgba(255, 255, 255, 0.3)
- `glass-light` - rgba(255, 255, 255, 0.5)
- `glass-medium` - rgba(255, 255, 255, 0.7) ⭐ Most common
- `glass-strong` - rgba(255, 255, 255, 0.9)

All include `backdrop-filter: blur(12px)` for the frosted effect.

### Dark Mode

Dark mode support is ready via CSS variables:
- Body class `.dark` triggers dark mode styles
- Glass variants automatically adapt
- Background gradients switch to dark tones

To implement:
```typescript
// In a settings component
const { setThemeMode } = useAppState()

<button onClick={() => {
  document.body.classList.toggle('dark')
  setThemeMode(document.body.classList.contains('dark') ? 'dark' : 'light')
}}>
  Toggle Theme
</button>
```

## Key Features

### ✅ Navigation
- Sidebar links update route without page reloads (SPA navigation)
- Active page is highlighted in sidebar
- Smooth transitions between pages

### ✅ Top Bar
- **Clock**: Live-updating time display (12-hour format)
- **Search**: Placeholder for future search functionality
- **Notifications**: Toggle button with unread indicator badge
- **Avatar**: User initials display (JD placeholder)

### ✅ Responsive Layout
- Sidebar: Fixed 256px width (w-64)
- Main content: Flexible flex-1 container
- Drawer: 320px width (w-80) slides in from right
- All elements respect 16px spacing grid

### ✅ Animations
- Page transitions: Fade in effect
- Sidebar items: Scale on hover/tap
- Notification drawer: Slide in/out from right
- All use Framer Motion with Tahoe timing (180-250ms spring)

### ✅ Theme Support
- CSS variables for colors ready for dynamic theming
- Dark mode classes prepared
- Glass effects adapt to theme

## Usage Examples

### Accessing App State in a Module

```typescript
import { useAppState } from '../hooks'

export function MyModule() {
  const { toggleNotificationDrawer, themeMode } = useAppState()
  
  return (
    <button onClick={toggleNotificationDrawer}>
      Open Notifications
    </button>
  )
}
```

### Programmatic Navigation

```typescript
import { useNavigate } from 'react-router-dom'

export function MyComponent() {
  const navigate = useNavigate()
  
  return (
    <button onClick={() => navigate('/courses')}>
      Go to Courses
    </button>
  )
}
```

### Using Design System Components

```typescript
import { GlassPanel, Typography, GlassButton } from '../components'

<GlassPanel variant="medium" className="p-6">
  <Typography variant="h3">My Section</Typography>
  <Typography variant="body" color="secondary">
    Description text
  </Typography>
  <GlassButton variant="primary">
    Action
  </GlassButton>
</GlassPanel>
```

## Future Enhancements

- Theme toggle in Settings page
- Real search functionality in top bar
- User profile menu on avatar click
- Sidebar collapse/expand
- Breadcrumb navigation
- Toast notifications
- Keyboard shortcuts for navigation
