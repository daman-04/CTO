# Tahoe Theme System

A comprehensive macOS Tahoe-inspired design system built with React, TypeScript, TailwindCSS v4, and Framer Motion.

## Tech Stack

- **Build Tool**: Vite 7.x
- **Framework**: React 19
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS v4 with custom Tahoe configuration
- **Animation**: Framer Motion with spring-based motion system
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **Utilities**: classnames

## Features

- 🎨 **Complete Design System**: Color tokens, spacing scale, typography system
- 🪟 **Glass-morphism Effects**: Translucent panels with backdrop blur
- 🎭 **Motion System**: Spring-based animations (180-250ms timing)
- 🔤 **SF Pro Typography**: Complete hierarchy with proper font loading
- 📦 **UI Components**: GlassPanel, GlassButton, Typography, IconBadge
- 📱 **Responsive Design**: Mobile-first with proper breakpoints
- 🎯 **TypeScript Support**: Full type safety across all components
- 📚 **Comprehensive Docs**: Usage guidelines and API documentation

## Project Structure

```
src/
├── components/     # Tahoe UI components
│   ├── GlassPanel.tsx      # Translucent container
│   ├── GlassButton.tsx     # Interactive button
│   ├── Typography.tsx      # Typography system
│   ├── IconBadge.tsx       # Status badges
│   └── index.ts            # Component exports
├── lib/
│   └── motion.ts           # Motion configuration
├── modules/
│   └── TahoeThemeDemo.tsx  # Demo page
├── state/          # Zustand stores
├── hooks/          # Custom React hooks
├── assets/         # Static assets
├── App.tsx         # Main application
├── main.tsx        # Entry point
└── index.css       # Global styles & Tailwind config
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository (if applicable)
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Fonts

This project uses SF Pro Text and SF Mono fonts, loaded via CDN with the following weights:

- **SF Pro Text**: 300 (Light), 400 (Regular), 500 (Medium)
- **SF Mono**: 300 (Light), 400 (Regular), 500 (Medium)

Fonts are configured in `src/index.css` and available through Tailwind's font utilities:
- `font-sans` for SF Pro Text
- `font-mono` for SF Mono

## TailwindCSS Configuration

This project uses TailwindCSS v4 with CSS-based configuration:
- JIT mode enabled by default
- Custom font families defined with `@theme` in CSS
- CSS-first configuration approach
- PostCSS with `@tailwindcss/postcss` plugin and Autoprefixer

Configuration:
- `src/index.css` - Tailwind theme configuration using `@theme` directive
- `postcss.config.js` - PostCSS configuration with `@tailwindcss/postcss`

Font families are configured using CSS variables in the `@theme` block:
```css
@theme {
  --font-sans: 'SF Pro Text', system-ui, ...;
  --font-mono: 'SF Mono', Monaco, ...;
}
```

## Available Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM bindings
- `typescript` - Type safety

### Styling & Animation
- `tailwindcss` - Utility-first CSS framework (v4)
- `@tailwindcss/postcss` - PostCSS plugin for Tailwind v4
- `framer-motion` - Animation library
- `classnames` - Conditional class utility

### State & Routing
- `zustand` - Lightweight state management
- `react-router-dom` - Routing library

### Build Tools
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite
- `postcss` - CSS transformations
- `autoprefixer` - Vendor prefix automation

## Tahoe Theme Components

### GlassPanel
Translucent container with glass-morphism effects:
```tsx
<GlassPanel variant="medium" elevation="surface" rounded="md">
  Content here
</GlassPanel>
```

### GlassButton
Interactive button with glass effects:
```tsx
<GlassButton variant="primary" size="md" onClick={handleClick}>
  Click me
</GlassButton>
```

### Typography
Complete typography system:
```tsx
<Typography variant="h1" weight="light" color="primary">
  Title
</Typography>
```

### IconBadge
Status indicator badges:
```tsx
<IconBadge variant="accent" size="md">
  ★
</IconBadge>
```

## Motion System

Spring-based animations with 180-250ms timing:
```tsx
import { tahoeVariants, tahoeTransitions } from './lib/motion'

<motion.div
  variants={tahoeVariants.slideUp}
  transition={tahoeTransitions.slideUp}
>
  Animated content
</motion.div>
```

## Design Tokens

- **Colors**: Neutral grayscale (tahoe-50 to tahoe-900) + desaturated blue accents
- **Spacing**: 16px base scale
- **Radii**: 8px, 12px (default), 16px, 24px
- **Glass Effects**: 4 translucency levels with 12px backdrop blur

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Documentation

- 📖 **[TAHOE_THEME.md](./TAHOE_THEME.md)** - Complete design system documentation
- 📋 **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Implementation details

## License

This project is open source and available under the MIT License.
