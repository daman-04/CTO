# Tahoe Theme System

A macOS Tahoe-inspired design system featuring glass-morphism effects, subtle animations, and a neutral color palette with desaturated blue accents.

## Overview

The Tahoe theme system provides a cohesive set of UI primitives and utilities that embody the macOS aesthetic with:

- **Glass-morphism**: Translucent panels with backdrop blur effects
- **Neutral Color Palette**: Grayscale tones with desaturated blue/graphite accents
- **Smooth Animations**: Spring-based motion with 180-250ms timing
- **Typography**: SF Pro font family with careful weight hierarchy
- **Spacing**: 16px base scale for consistent layouts

## Design Tokens

### Colors

#### Neutral Grayscale (Tahoe)
- `--color-tahoe-50` to `--color-tahoe-900`: Light to dark grayscale values
- Used for text, backgrounds, and neutral UI elements

#### Accent Colors
- `--color-accent-50` to `--color-accent-900`: Desaturated blue/graphite palette
- Used for primary actions, highlights, and interactive elements

### Spacing

Based on a 16px scale:
- `--spacing-scale: 16px` (base unit)
- Utility classes: `.space-tahoe-1` (4px), `.space-tahoe-2` (8px), `.space-tahoe-3` (12px), `.space-tahoe-4` (16px), etc.

### Border Radius

Custom radii following the Tahoe aesthetic:
- `--radius-tahoe-sm`: 8px
- `--radius-tahoe`: 12px (default)
- `--radius-tahoe-lg`: 16px
- `--radius-tahoe-xl`: 24px

### Glass Effects

Four levels of translucency:
- `glass-subtle`: 30% opacity
- `glass-light`: 50% opacity
- `glass-medium`: 70% opacity (default)
- `glass-strong`: 90% opacity

All glass effects include `backdrop-filter: blur(12px)` for the characteristic macOS blur.

## Components

### GlassPanel

A translucent container with glass-morphism effects.

```tsx
<GlassPanel 
  variant="medium" 
  elevation="surface" 
  rounded="md"
  border={true}
>
  Content here
</GlassPanel>
```

**Props:**
- `variant`: `'subtle' | 'light' | 'medium' | 'strong'` (default: `'medium'`)
- `elevation`: `'base' | 'surface' | 'overlay'` (default: `'surface'`)
- `rounded`: `'sm' | 'md' | 'lg' | 'xl'` (default: `'md'`)
- `border`: `boolean` (default: `true`)

### GlassButton

Interactive button with glass-morphism and smooth animations.

```tsx
<GlassButton 
  variant="primary" 
  size="md"
  onClick={handleClick}
  disabled={false}
>
  Button Text
</GlassButton>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost' | 'glass'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `disabled`: `boolean` (default: `false`)
- `onClick`: `() => void`

### Typography

Consistent text styling with SF Pro font family.

```tsx
<Typography 
  variant="h1" 
  weight="light"
  color="primary"
>
  Heading Text
</Typography>
```

**Props:**
- `variant`: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline'`
- `weight`: `'light' | 'normal' | 'medium'` (default: `'normal'`)
- `color`: `'primary' | 'secondary' | 'accent' | 'muted'` (default: `'primary'`)

### IconBadge

Small circular badges for status indicators and icons.

```tsx
<IconBadge 
  variant="accent" 
  size="md"
>
  ★
</IconBadge>
```

**Props:**
- `variant`: `'default' | 'accent' | 'success' | 'warning' | 'error'` (default: `'default'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)

## Motion System

The Tahoe theme includes a comprehensive motion system built on Framer Motion with spring-based animations.

### Timing Constants

- **FAST**: 180ms
- **NORMAL**: 215ms  
- **SLOW**: 250ms

### Spring Presets

- **GENTLE**: `{ stiffness: 200, damping: 25 }`
- **SMOOTH**: `{ stiffness: 300, damping: 30 }`
- **SNAPPY**: `{ stiffness: 400, damping: 35 }`
- **BOUNCY**: `{ stiffness: 500, damping: 28 }`

### Animation Variants

Pre-built animation variants for common use cases:

```tsx
// Fade animations
tahoeVariants.fadeIn

// Slide animations  
tahoeVariants.slideUp
tahoeVariants.slideDown
tahoeVariants.slideLeft
tahoeVariants.slideRight

// Scale animations
tahoeVariants.scaleIn

// Button interactions
tahoeVariants.buttonPress

// Glass panel reveal
tahoeVariants.glassReveal

// Staggered list animations
tahoeVariants.staggerContainer
tahoeVariants.staggerItem
```

### Usage Example

```tsx
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

<motion.div
  variants={tahoeVariants.slideUp}
  transition={tahoeTransitions.slideUp}
  initial="initial"
  animate="animate"
  exit="exit"
>
  Content
</motion.div>
```

## Utility Classes

### Glass Effects
- `.glass-subtle`, `.glass-light`, `.glass-medium`, `.glass-strong`

### Spacing
- `.space-tahoe-1` through `.space-tahoe-8`

### Border Radius
- `.rounded-tahoe-sm`, `.rounded-tahoe`, `.rounded-tahoe-lg`, `.rounded-tahoe-xl`

## Guidelines

### When to Use Glass Effects

- **DO**: Use for secondary content, overlays, and decorative panels
- **DON'T**: Use for primary content that requires maximum readability
- **CONSIDER**: Content density - glass effects work best with sufficient spacing

### Animation Best Practices

- Use spring animations for natural movement
- Keep animations between 180-250ms for optimal feel
- Use staggered animations for lists and groups of elements
- Provide subtle feedback for interactions (hover, press states)

### Color Usage

- Use `tahoe` colors for neutral elements and text
- Reserve `accent` colors for primary actions and highlights
- Maintain sufficient contrast ratios for accessibility
- Use opacity variations rather than different hues for secondary states

### Typography

- Stick to the established hierarchy (h1-h6, body, caption, overline)
- Use `light` weight for large headings to reduce visual weight
- Use `medium` weight sparingly for emphasis
- Ensure line height is generous for readability

## Browser Support

The Tahoe theme uses modern CSS features:
- `backdrop-filter` for blur effects (Safari, Chrome, Edge, Firefox)
- `color-mix()` for dynamic color blending (modern browsers)
- CSS custom properties for theming (all modern browsers)

For older browsers, provide fallback styles using `@supports` queries.

## Contributing

When adding new components or features to the Tahoe theme:

1. Follow the established naming conventions
2. Use the motion system for all animations
3. Include proper TypeScript types
4. Add examples to the demo page
5. Update this documentation

## Demo

Run the development server to see the Tahoe theme in action:

```bash
npm run dev
```

The demo page showcases all components, variants, and interactions with proper spacing, typography, and motion behavior.