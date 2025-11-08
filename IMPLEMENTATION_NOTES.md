# Enhanced Tahoe UI Implementation Notes

## New Tokens and Props

### Motion System (src/lib/motion.ts)

**Global Motion Tokens:**
- `tahoeMotion.DURATION`: FAST (180ms), BASE (220ms), SLOW (260ms)
- `tahoeMotion.SPRING`: GENTLE (stiffness: 240, damping: 22), SMOOTH (300, 25), SNAPPY (380, 30)
- `tahoeMotion.HOVER`: LIFT_SMALL (-2px), LIFT_MEDIUM (-4px), SCALE_SUBTLE (1.01)

**New Variants:**
- `panelEnter`: Enhanced panel entrance with backdrop blur animation
- `tileStagger`: Staggered tile animation for dashboard
- `hoverLift`: Micro-motion hover with subtle lift and scale
- `fadeScaleIn`: Mount animation with fade and scale

### 3-Tier Elevation System

**GlassPanel Props:**
```tsx
interface GlassPanelProps {
  elevation?: '1' | '2' | '3'  // New elevation tiers
  interactive?: boolean           // Enable hover lift/refraction
  // ... existing props
}
```

**Elevation Tiers:**
- **Elevation 1**: 6px blur, subtle opacity, light shadow
- **Elevation 2**: 12px blur, medium opacity, moderate shadow  
- **Elevation 3**: 16px blur, strong opacity, deep shadow + glass edge effect

### Theme Store (src/state/theme.ts)

**State Interface:**
```typescript
interface ThemeState {
  theme: 'system' | 'light' | 'dark'
  accent: 'neutral' | 'blue' | 'purple'
  motion: 'full' | 'reduced'
}
```

**Hooks:**
- `useThemeStore()`: Access theme state and actions
- `useEffectiveTheme()`: Get effective theme considering system preference
- `useReducedMotion()`: Check if reduced motion is preferred

### CSS Enhancements (src/index.css)

**New CSS Custom Properties:**
- `--shadow-1/2/3`: Progressive shadow intensities
- `--blur-1/2/3`: Backdrop blur tiers (6px, 12px, 16px)
- `--glass-alpha-1/2/3`: Glass opacity levels
- `--border-alpha-1/2/3`: Border opacity levels
- `--accent-*`: Dynamic accent color variables

**New Utility Classes:**
- `.elevation-1/2/3`: Apply elevation tier styles
- `.glass-edge`: Inner edge glow for elevation-3
- `.ambient-cursor`: Cursor reactive background layer
- `.accent-*`: Apply accent color theme
- `.focus-accent`: Accent-colored focus rings
- `.baseline-grid`: 8px baseline grid alignment

## Component Updates

### GlassPanel
- Supports `elevation` prop for 3-tier depth system
- `interactive` prop enables hover lift and edge glow
- Uses new motion variants for smoother animations

### GlassButton
- Enhanced hover micro-motion with spring physics
- Accent-tinted focus rings based on theme store
- Improved tap feedback with snappy springs

### IconBadge
- `pulseOnMount` prop for fade-scale entrance animation
- Spring-based hover and tap interactions

### Dashboard Tiles
- All tiles support `elevation` and `interactive` props
- Staggered entrance animation on first mount
- Applied elevation hierarchy: GPA (3), Attendance/Courses (2), Announcements (1)

## Usage Examples

### GlassPanel with Elevation
```tsx
<GlassPanel elevation="3" interactive className="p-6">
  <Typography>Elevation 3 with glass edge effect</Typography>
</GlassPanel>

<GlassPanel elevation="1">
  <Typography>Subtle elevation panel</Typography>
</GlassPanel>
```

### Theme Store Usage
```tsx
import { useThemeStore } from '../state/theme'

const { accent, motion } = useThemeStore()
const { setAccent, setMotion } = useThemeStore.getState()
```

### Motion Variants
```tsx
<motion.div
  variants={tahoeVariants.tileStagger}
  initial="initial"
  animate="animate"
>
  <YourComponent />
</motion.div>
```

## Ambient Effects

### Cursor Reactive Layer
- GPU-optimized radial gradient follows cursor
- Automatically disabled when motion='reduced'
- Subtle opacity (0.6) for performance

### Glass Edge Effect
- Applied only to elevation-3 panels
- CSS mask-based inner border gradient
- No performance impact

## Accessibility

- Respects `prefers-reduced-motion` system setting
- AA contrast maintained on all glass surfaces
- Focus rings use accent colors for visibility
- All animations have reduced-motion fallbacks

## Performance

- Single stagger animation on dashboard first mount
- Ambient cursor effect disabled for reduced motion
- Hardware-accelerated transforms for hover effects
- Optimized backdrop blur values

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Webkit prefix support for Safari
- CSS mask properties for edge effects