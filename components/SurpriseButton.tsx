'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { confettiExplosion, heartRain } from '@/lib/animations'
import { useSafeSound } from '@/hooks/useSafeSound'

const surprises = [
  'You deserve all the happiness in the world!',
  'Never stop believing in yourself!',
  'You are a force of nature!',
  'The world is better because you exist!',
  'You inspire me every single day!',
  'Thank you for being you!',
  'You are my greatest blessing!',
  'Forever grateful for you!',
]

export function SurpriseButton() {
  const [displayMessage, setDisplayMessage] = useState('')
  const [isTriggered, setIsTriggered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playSurprise] = useSafeSound('/sounds/celebration.mp3', { volume: 0.5 })

  const triggerSurprise = () => {
    if (isTriggered) return

    setIsTriggered(true)
    playSurprise()

    const message = surprises[Math.floor(Math.random() * surprises.length)]
    setDisplayMessage(message)

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      confettiExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, document.body)
      heartRain(document.body, 3)
    }

    setTimeout(() => {
      setIsTriggered(false)
      setDisplayMessage('')
    }, 3000)
  }

  return (
    <section className="py-20 px-4 relative" ref={containerRef}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ec4899' }}>
            Feeling Lucky?
          </h2>
          <p className="text-foreground text-lg mb-12 opacity-80">
            Click the button below when you need a burst of joy and celebration!
          </p>

          {/* Surprise Button */}
          <div className="flex justify-center mb-12">
            <motion.button
              onClick={triggerSurprise}
              disabled={isTriggered}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: isTriggered
                  ? '0 0 0px rgba(236, 72, 153, 0)'
                  : [
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                      '0 0 40px rgba(236, 72, 153, 0.5)',
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                    ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
              }}
              className="relative px-12 py-6 md:px-16 md:py-8 rounded-full font-bold text-white text-xl md:text-2xl group overflow-hidden disabled:opacity-50"
              style={{ backgroundColor: '#ec4899' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Click When You Need a Smile</span>
                <span className="text-3xl">🎉</span>
              </span>
            </motion.button>
          </div>

          {/* Message display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={displayMessage ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="min-h-20 flex items-center justify-center"
          >
            {displayMessage && (
              <motion.div
                className="bg-card rounded-2xl p-8 shadow-lg border-2"
                style={{ borderColor: '#fbbf24' }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.5, 1],
                }}
              >
                <p className="text-2xl font-bold text-foreground">
                  {displayMessage}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
