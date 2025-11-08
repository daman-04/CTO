import { GlassPanel, GlassButton, Typography, IconBadge } from './index'
import { useThemeStore } from '../state/theme'

export function ThemeDemo() {
  const { theme, accent, motion, setTheme, setAccent, setMotion } = useThemeStore()

  return (
    <GlassPanel elevation="3" interactive className="p-6 space-y-6">
      <Typography variant="h3">Theme Controls</Typography>
      
      {/* Theme Mode */}
      <div className="space-y-3">
        <Typography variant="overline" weight="medium">Theme Mode</Typography>
        <div className="flex gap-2">
          <GlassButton
            variant={theme === 'light' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTheme('light')}
          >
            Light
          </GlassButton>
          <GlassButton
            variant={theme === 'dark' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTheme('dark')}
          >
            Dark
          </GlassButton>
          <GlassButton
            variant={theme === 'system' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTheme('system')}
          >
            System
          </GlassButton>
        </div>
      </div>

      {/* Accent Color */}
      <div className="space-y-3">
        <Typography variant="overline" weight="medium">Accent Color</Typography>
        <div className="flex gap-2">
          <GlassButton
            variant={accent === 'neutral' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setAccent('neutral')}
          >
            Neutral
          </GlassButton>
          <GlassButton
            variant={accent === 'blue' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setAccent('blue')}
          >
            Blue
          </GlassButton>
          <GlassButton
            variant={accent === 'purple' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setAccent('purple')}
          >
            Purple
          </GlassButton>
        </div>
      </div>

      {/* Motion Preference */}
      <div className="space-y-3">
        <Typography variant="overline" weight="medium">Motion</Typography>
        <div className="flex gap-2">
          <GlassButton
            variant={motion === 'full' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setMotion('full')}
          >
            Full
          </GlassButton>
          <GlassButton
            variant={motion === 'reduced' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setMotion('reduced')}
          >
            Reduced
          </GlassButton>
        </div>
      </div>

      {/* Elevation Demo */}
      <div className="space-y-3">
        <Typography variant="overline" weight="medium">Elevation Tiers</Typography>
        <div className="grid grid-cols-3 gap-4">
          <GlassPanel elevation="1" className="p-4 text-center">
            <Typography variant="caption">Elevation 1</Typography>
          </GlassPanel>
          <GlassPanel elevation="2" className="p-4 text-center">
            <Typography variant="caption">Elevation 2</Typography>
          </GlassPanel>
          <GlassPanel elevation="3" className="p-4 text-center glass-edge">
            <Typography variant="caption">Elevation 3</Typography>
          </GlassPanel>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="space-y-3">
        <Typography variant="overline" weight="medium">Interactive Elements</Typography>
        <div className="flex gap-4 items-center">
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="secondary">Secondary</GlassButton>
          <GlassButton variant="ghost">Ghost</GlassButton>
          <GlassButton variant="glass">Glass</GlassButton>
          <IconBadge variant="accent" size="lg" pulseOnMount>
            🎨
          </IconBadge>
        </div>
      </div>
    </GlassPanel>
  )
}