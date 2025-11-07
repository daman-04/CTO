import { useState } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/50">
          <motion.h1
            className="text-5xl font-medium text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Vite + React + TypeScript
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Modern stack with TailwindCSS, Framer Motion, and macOS Tahoe aesthetic
          </motion.p>

          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Stack Verification</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">React 18</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">TailwindCSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Framer Motion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Zustand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">React Router</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h2 className="text-xl font-medium text-gray-800 mb-3">Font Test</h2>
              <p className="text-gray-700 mb-3 font-light">
                SF Pro Text Light (300) - The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-gray-700 mb-3 font-normal">
                SF Pro Text Regular (400) - The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-gray-700 mb-4 font-medium">
                SF Pro Text Medium (500) - The quick brown fox jumps over the lazy dog
              </p>
              <code className="font-mono text-sm text-gray-800 bg-white px-3 py-2 rounded border border-gray-300 block">
                SF Mono - console.log('Hello, World!')
              </code>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCount((count) => count + 1)}
                className={classNames(
                  'px-6 py-3 rounded-lg font-medium transition-colors',
                  'bg-blue-500 hover:bg-blue-600 text-white',
                  'shadow-lg shadow-blue-500/30'
                )}
              >
                Count: {count}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCount(0)}
                className={classNames(
                  'px-6 py-3 rounded-lg font-medium transition-colors',
                  'bg-gray-200 hover:bg-gray-300 text-gray-700'
                )}
              >
                Reset
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          <p>Edit <code className="font-mono bg-white/60 px-2 py-1 rounded">src/App.tsx</code> to get started</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
