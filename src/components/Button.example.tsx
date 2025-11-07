import { motion } from 'framer-motion'
import classNames from 'classnames'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={classNames(
        'px-6 py-3 rounded-lg font-medium transition-colors',
        {
          'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30':
            variant === 'primary',
          'bg-gray-200 hover:bg-gray-300 text-gray-700': variant === 'secondary',
          'bg-transparent hover:bg-gray-100 text-gray-700': variant === 'ghost',
        }
      )}
    >
      {children}
    </motion.button>
  )
}
