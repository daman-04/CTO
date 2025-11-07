import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GlassPanel, 
  GlassButton, 
  Typography, 
  IconBadge 
} from '../components'
import { tahoeVariants, tahoeTransitions } from '../lib/motion'

export default function TahoeThemeDemo() {
  const [count, setCount] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState('medium')

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={tahoeVariants.slideUp}
        transition={tahoeTransitions.slideUp}
        className="max-w-6xl mx-auto mb-12"
      >
        <Typography variant="h1" className="text-center mb-4">
          Tahoe Theme System
        </Typography>
        <Typography 
          variant="body" 
          color="secondary" 
          className="text-center max-w-2xl mx-auto"
        >
          A macOS Tahoe-inspired design system featuring glass-morphism, 
          subtle animations, and a neutral color palette with desaturated blue accents.
        </Typography>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Glass Panels Demo */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={tahoeVariants.slideUp}
          transition={{ ...tahoeTransitions.slideUp, delay: 0.1 }}
        >
          <Typography variant="h3" className="mb-4">Glass Panels</Typography>
          
          <div className="space-y-4">
            <GlassPanel variant="subtle" className="p-6">
              <Typography variant="h4">Subtle Glass</Typography>
              <Typography variant="body" color="secondary">
                Light translucency with minimal backdrop blur
              </Typography>
            </GlassPanel>
            
            <GlassPanel variant="light" className="p-6">
              <Typography variant="h4">Light Glass</Typography>
              <Typography variant="body" color="secondary">
                Balanced translucency for everyday use
              </Typography>
            </GlassPanel>
            
            <GlassPanel variant="medium" className="p-6">
              <Typography variant="h4">Medium Glass</Typography>
              <Typography variant="body" color="secondary">
                Standard translucency with good contrast
              </Typography>
            </GlassPanel>
            
            <GlassPanel variant="strong" className="p-6">
              <Typography variant="h4">Strong Glass</Typography>
              <Typography variant="body" color="secondary">
                High translucency for maximum contrast
              </Typography>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Buttons Demo */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={tahoeVariants.slideUp}
          transition={{ ...tahoeTransitions.slideUp, delay: 0.2 }}
        >
          <Typography variant="h3" className="mb-4">Glass Buttons</Typography>
          
          <GlassPanel className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <GlassButton variant="primary" onClick={() => setCount(count + 1)}>
                Primary ({count})
              </GlassButton>
              <GlassButton variant="secondary">
                Secondary
              </GlassButton>
              <GlassButton variant="ghost">
                Ghost
              </GlassButton>
              <GlassButton variant="glass">
                Glass
              </GlassButton>
            </div>
            
            <div className="space-y-2">
              <Typography variant="h6">Button Sizes</Typography>
              <div className="flex items-center gap-4">
                <GlassButton size="sm">Small</GlassButton>
                <GlassButton size="md">Medium</GlassButton>
                <GlassButton size="lg">Large</GlassButton>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Typography Demo */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={tahoeVariants.slideUp}
          transition={{ ...tahoeTransitions.slideUp, delay: 0.3 }}
        >
          <Typography variant="h3" className="mb-4">Typography</Typography>
          
          <GlassPanel className="p-6 space-y-4">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            
            <Typography variant="body">
              Regular body text with normal weight. The quick brown fox jumps over the lazy dog.
            </Typography>
            
            <Typography variant="body" weight="light">
              Light body text. The quick brown fox jumps over the lazy dog.
            </Typography>
            
            <Typography variant="body" weight="medium">
              Medium body text. The quick brown fox jumps over the lazy dog.
            </Typography>
            
            <Typography variant="caption">
              Caption text for secondary information and metadata.
            </Typography>
            
            <Typography variant="overline">
              Overline text for labels and categories
            </Typography>
          </GlassPanel>
        </motion.div>

        {/* Icon Badges Demo */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={tahoeVariants.slideUp}
          transition={{ ...tahoeTransitions.slideUp, delay: 0.4 }}
        >
          <Typography variant="h3" className="mb-4">Icon Badges</Typography>
          
          <GlassPanel className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <Typography variant="h6">Variants</Typography>
                <div className="flex items-center gap-4 mt-2">
                  <IconBadge variant="default">•</IconBadge>
                  <IconBadge variant="accent">★</IconBadge>
                  <IconBadge variant="success">✓</IconBadge>
                  <IconBadge variant="warning">!</IconBadge>
                  <IconBadge variant="error">×</IconBadge>
                </div>
              </div>
              
              <div>
                <Typography variant="h6">Sizes</Typography>
                <div className="flex items-center gap-4 mt-2">
                  <IconBadge size="sm">•</IconBadge>
                  <IconBadge size="md">•</IconBadge>
                  <IconBadge size="lg">•</IconBadge>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={tahoeVariants.slideUp}
          transition={{ ...tahoeTransitions.slideUp, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Typography variant="h3" className="mb-4">Interactive Demo</Typography>
          
          <GlassPanel variant="medium" className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Typography variant="h6">Glass Variant</Typography>
                <div className="space-y-2 mt-2">
                  {(['subtle', 'light', 'medium', 'strong'] as const).map((variant) => (
                    <GlassButton
                      key={variant}
                      variant={selectedVariant === variant ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedVariant(variant)}
                      className="w-full"
                    >
                      {variant}
                    </GlassButton>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <Typography variant="h6">Selected Panel</Typography>
                <div className="mt-4">
                  <GlassPanel variant={selectedVariant as any} className="p-4">
                    <Typography variant="body" className="text-center">
                      {selectedVariant} variant
                    </Typography>
                  </GlassPanel>
                </div>
              </div>
              
              <div className="text-center">
                <Typography variant="h6">Motion Demo</Typography>
                <div className="mt-4 space-y-2">
                  <motion.div
                    className="inline-block"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <IconBadge variant="accent" size="lg">✨</IconBadge>
                  </motion.div>
                  <Typography variant="caption" color="muted">
                    Continuous animation
                  </Typography>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={tahoeVariants.fadeIn}
        transition={{ ...tahoeTransitions.fadeIn, delay: 0.6 }}
        className="max-w-6xl mx-auto mt-12 text-center"
      >
        <GlassPanel variant="subtle" className="p-6">
          <Typography variant="body" color="secondary">
            Tahoe Theme System • Built with React, TypeScript, TailwindCSS v4, and Framer Motion
          </Typography>
        </GlassPanel>
      </motion.div>
    </div>
  )
}