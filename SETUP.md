# Quick Setup Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit: http://localhost:5173

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── modules/        # Feature modules and pages
├── state/          # Zustand stores for global state
├── hooks/          # Custom React hooks
├── assets/         # Static assets (fonts, images, etc.)
│   └── fonts/      # Local font files
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
├── index.css       # Global styles, Tailwind config, and fonts
└── vite-env.d.ts   # Vite type definitions
```

## Key Technologies

- **Vite 7.x** - Build tool
- **React 19** - UI framework
- **TypeScript 5.x** - Type safety
- **TailwindCSS v4** - Styling (CSS-first configuration)
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router v7** - Routing

## TailwindCSS v4 Notes

This project uses TailwindCSS v4 with CSS-based configuration:
- Configuration is done in `src/index.css` using `@import "tailwindcss"` and `@theme`
- No `tailwind.config.js` file needed
- PostCSS uses `@tailwindcss/postcss` plugin

## Fonts

SF Pro Text and SF Mono fonts are loaded via CDN in `src/index.css`:
- Weights: 300 (Light), 400 (Regular), 500 (Medium)
- Available via Tailwind classes: `font-sans` and `font-mono`
