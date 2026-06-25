'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const messages = [
  'You don\'t need to carry everything at once.',
  'It\'s okay to rest.',
  'You are safe, loved, and enough.',
  'This feeling will pass.',
  'Be gentle with yourself.',
  'You don\'t have to be perfect.',
  'Your efforts are enough.',
  'Breathe. You\'ve got this.',
]

// Define separate animation sequences for inhale and exhale
const breathingCycleVariants = {
  animate: {
    scale: [1, 1.3, 1.3, 1],
    opacity: [0.5, 0.8, 0.8, 0.5],
    transition: {
      duration: 10,
      repeat: Infinity,
      times: [0, 0.3, 0.7, 1],
      ease: 'easeInOut',
    },
  },
}

export function AntiOverthinkingCorner() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [isBreathing, setIsBreathing] = useState(false)

  const startBreathing = () => {
    setIsBreathing(true)
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ec4899' }}>
            Overthinking Corner
          </h2>
          <p className="text-foreground text-lg mb-12 opacity-80">
            When life feels too much, let&apos;s pause and breathe together.
          </p>

          {/* Breathing Circle */}
          <div className="flex flex-col items-center gap-8 mb-12">
            <motion.button
              onClick={startBreathing}
              className="text-lg font-semibold px-8 py-3 rounded-full"
              style={{
                backgroundColor: '#c084fc',
                color: 'white',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Breathing Exercise
            </motion.button>

            {isBreathing && (
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64"
                variants={breathingCycleVariants}
                animate="animate"
              >
                {/* Outer circle */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4"
                  style={{
                    borderColor: '#ec4899',
                    opacity: 0.3,
                  }}
                  animate={{
                    scale: [1, 1.2, 1.2, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.3, 0.7, 1],
                    ease: 'easeInOut',
                  }}
                />

                {/* Middle circle */}
                <motion.div
                  className="absolute inset-4 rounded-full border-4"
                  style={{
                    borderColor: '#c084fc',
                    opacity: 0.5,
                  }}
                  animate={{
                    scale: [1, 1.1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.3, 0.7, 1],
                    ease: 'easeInOut',
                  }}
                />

                {/* Inner circle with text */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center flex-col">
                  <motion.div
                    className="text-center"
                    animate={{
                      opacity: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      times: [0, 0.3, 0.7, 1],
                    }}
                  >
                    <motion.p
                      className="text-sm font-semibold mb-3"
                      style={{ color: '#ec4899' }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        times: [0, 0.25, 0.75, 1],
                      }}
                    >
                      Breathe In
                    </motion.p>
                    <motion.div
                      className="text-4xl font-bold"
                      animate={{
                        y: [0, -10, -10, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        times: [0, 0.3, 0.7, 1],
                      }}
                    >
                      💜
                    </motion.div>
                  </motion.div>
                </div>

                {/* Dot indicator */}
                <motion.div
                  className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-primary"
                  style={{ marginLeft: '-6px' }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Messages */}
          <div className="bg-card rounded-2xl p-8 border-2" style={{ borderColor: '#fce7f3' }}>
            <div className="flex flex-col items-center gap-6">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-foreground font-medium text-center"
              >
                {messages[messageIndex]}
              </motion.p>

              <motion.div
                className="flex flex-col items-center gap-2"
              >
                <motion.button
                  onClick={() => setMessageIndex((prev) => (prev + 1) % messages.length)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl cursor-pointer hover:drop-shadow-xl transition-all"
                >
                  💖
                </motion.button>
                <motion.p
                  className="text-foreground font-semibold text-sm"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Press this princess
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="mt-12 flex justify-center gap-8 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="text-4xl"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ☁️
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
