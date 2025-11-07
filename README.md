# Vite + React + TypeScript + TailwindCSS

A modern React application built with Vite, TypeScript, and TailwindCSS, featuring a macOS Tahoe-inspired aesthetic.

## Tech Stack

- **Build Tool**: Vite 7.x
- **Framework**: React 19
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS v4 with JIT mode
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **Utilities**: classnames

## Features

- ⚡️ Lightning-fast development with Vite HMR
- 🎨 TailwindCSS with custom macOS Tahoe aesthetic
- 🎭 Smooth animations with Framer Motion
- 📦 Lightweight state management with Zustand
- 🔤 SF Pro Text and SF Mono fonts (weights 300-500)
- 📱 Responsive design out of the box
- 🎯 TypeScript for type safety
- 🏗️ Organized project structure

## Project Structure

```
src/
├── components/     # Reusable UI components
├── modules/        # Feature modules and pages
├── state/          # Zustand stores for global state
├── hooks/          # Custom React hooks
├── assets/         # Static assets (fonts, images, etc.)
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles and Tailwind directives
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

## Design Philosophy

This project follows a macOS Tahoe aesthetic with:
- Soft, neutral backgrounds with subtle gradients
- Glass-morphism effects (backdrop blur)
- Subtle shadows and borders
- Clean typography with SF fonts
- Smooth animations and transitions
- Modern, minimal UI components

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Next Steps

1. Add routing with React Router DOM
2. Create reusable component library
3. Set up Zustand stores for state management
4. Build out feature modules
5. Add custom hooks as needed

## License

This project is open source and available under the MIT License.
