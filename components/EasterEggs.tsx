'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heartRain } from '@/lib/animations'
import { useSafeSound } from '@/hooks/useSafeSound'

const secretMessages = [
  'You are loved beyond measure ❤️',
  'Your presence is a gift to the world 🎁',
  'I chose you, every single time 💕',
  'You make my heart skip a beat ✨',
  'Forever isn\'t long enough with you 🌹',
]

export function EasterEggs() {
  const [secretIndex, setSecretIndex] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [heartStorm, setHeartStorm] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playSecret] = useSafeSound('/sounds/secret.mp3', { volume: 0.5 })
  const [playStorm] = useSafeSound('/sounds/storm.mp3', { volume: 0.3 })

  // Konami code: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a
  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key === 'b' || e.key === 'a' ? e.key : e.code

      setKonamiSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length)

        if (newSequence.length === KONAMI_CODE.length && newSequence.every((k, i) => k === KONAMI_CODE[i])) {
          triggerHeartStorm()
          return []
        }

        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerHeartStorm = () => {
    setHeartStorm(true)
    playStorm()

    if (containerRef.current) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          if (containerRef.current) {
            heartRain(document.body, 2)
          }
        }, i * 800)
      }
    }

    setTimeout(() => setHeartStorm(false), 5000)
  }

  const handleStarClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const randomIndex = Math.floor(Math.random() * secretMessages.length)
    setSecretIndex(randomIndex)
    setShowSecret(true)
    playSecret()

    setTimeout(() => setShowSecret(false), 3000)
  }

  return (
    <div ref={containerRef}>
      {/* Hidden stars throughout the page - positioned via CSS classes */}
      <motion.button
        className="fixed top-20 right-10 text-2xl cursor-pointer hover:scale-125 transition-transform z-50"
        onClick={handleStarClick}
        whileHover={{ rotate: 20 }}
        whileTap={{ scale: 0.8 }}
        title="Secret star - click me!"
      >
        ⭐
      </motion.button>

      <motion.button
        className="fixed bottom-40 left-10 text-2xl cursor-pointer hover:scale-125 transition-transform z-50"
        onClick={handleStarClick}
        whileHover={{ rotate: 20 }}
        whileTap={{ scale: 0.8 }}
        title="Secret star - click me!"
      >
        ⭐
      </motion.button>

      <motion.button
        className="fixed top-1/2 right-5 text-2xl cursor-pointer hover:scale-125 transition-transform z-50"
        onClick={handleStarClick}
        whileHover={{ rotate: 20 }}
        whileTap={{ scale: 0.8 }}
        title="Secret star - click me!"
      >
        ⭐
      </motion.button>

      {/* Secret message display */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card rounded-2xl p-8 shadow-2xl border-2 z-50"
            style={{ borderColor: '#fbbf24' }}
          >
            <div className="text-center max-w-md">
              <p className="text-lg font-semibold mb-2" style={{ color: '#fbbf24' }}>
                ✨ Secret Message ✨
              </p>
              <p className="text-xl text-foreground font-medium">
                {secretMessages[secretIndex]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart storm indicator */}
      {heartStorm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
        >
          <motion.div
            className="text-6xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ❤️ HEART STORM ❤️
          </motion.div>
        </motion.div>
      )}

      {/* Konami code hint */}
      <motion.p
        className="fixed bottom-4 left-4 text-xs text-muted-foreground pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
      >
        🎮 Try the Konami code...
      </motion.p>
    </div>
  )
}
