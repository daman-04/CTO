import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock framer-motion for testing
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    motion: {
      div: 'div',
      button: 'button',
      span: 'span',
      aside: 'aside',
      header: 'header',
      main: 'main',
      section: 'section',
      article: 'article',
      nav: 'nav',
      footer: 'footer',
      form: 'form',
      input: 'input',
      textarea: 'textarea',
      select: 'select',
      option: 'option',
      label: 'label',
      ul: 'ul',
      ol: 'ol',
      li: 'li',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      p: 'p',
      a: 'a',
      img: 'img',
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    MotionConfig: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
  }
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})