'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { playCardFlipSound } from '@/lib/soundGenerator'

const reasons = [
  {
    title: 'Your Kindness',
    message: 'The way you care for others shows the depth of your beautiful heart.',
    emoji: '💚',
  },
  {
    title: 'Your Smile',
    message: 'It lights up every room and makes everything better. Never stop smiling.',
    emoji: '😊',
  },
  {
    title: 'Your Strength',
    message: 'You\'ve overcome so much and keep getting back up. You\'re a warrior.',
    emoji: '💪',
  },
  {
    title: 'Your Heart',
    message: 'So pure, so genuine, and so full of love. You inspire me daily.',
    emoji: '❤️',
  },
  {
    title: 'Your Laugh',
    message: 'The most beautiful sound in the world. Keep laughing freely.',
    emoji: '😄',
  },
  {
    title: 'Your Presence',
    message: 'Simply being near you makes everything feel right and safe.',
    emoji: '✨',
  },
]

interface CardState {
  [key: number]: boolean
}

export function ReasonsWhyAmazing() {
  const [flipped, setFlipped] = useState<CardState>({})

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
    // Play romantic chord sound when card flips
    playCardFlipSound(index)
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ec4899' }}>
            Reasons Why You&apos;re Amazing
          </h2>
          <p className="text-foreground text-lg opacity-80">
            Click each card to reveal why you&apos;re absolutely incredible.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => toggleFlip(index)}
              className="h-64 cursor-pointer"
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped[index] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ perspective: '1000px' }}
              >
                {/* Front of card */}
                <motion.div
                  className="absolute w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: '#fff5f9',
                    border: '2px solid #fce7f3',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-6xl mb-4">{reason.emoji}</div>
                  <h3
                    className="text-2xl font-bold text-center"
                    style={{ color: '#ec4899' }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-sm text-foreground text-center mt-4 opacity-60">
                    Click to reveal
                  </p>
                </motion.div>

                {/* Back of card */}
                <motion.div
                  className="absolute w-full h-full rounded-2xl p-8 flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: '#fce7f3',
                    border: '2px solid #ec4899',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="text-lg text-foreground text-center font-medium">
                    {reason.message}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
