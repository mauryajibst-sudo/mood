'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSafeSound } from '@/hooks/useSafeSound'

const sweetMessages = [
  'You are loved more than you know ❤️',
  'Your smile is my favorite thing in the world 😊',
  'Everything will be okay, and I\'ll be right here 🤗',
  'You make the world brighter just by being you ✨',
  'I\'m so proud of you 💪',
  'You deserve all the happiness in the world 🌈',
  'Thank you for being you 🙏',
  'You are stronger than you think 💖',
  'Today is going to be amazing ⭐',
  'You are my favorite person 💕',
  'Your presence means everything 🌸',
  'Keep being your beautiful self 🦋',
  'The world needs your kindness 💝',
  'You are enough, right now, as you are 👑',
  'I believe in you 🌟',
]

export function DailySmileGenerator() {
  const [message, setMessage] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [playSound] = useSafeSound('/sounds/sparkle.mp3', { volume: 0.5 })

  const generateMessage = () => {
    const randomIndex = Math.floor(Math.random() * sweetMessages.length)
    setMessage(sweetMessages[randomIndex])
    setIsRevealed(true)
    playSound()
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ec4899' }}>
            Daily Smile Generator
          </h2>
          <p className="text-foreground text-lg mb-12 opacity-80">
            Need a little boost? Click the button to receive a sweet message just for you.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateMessage}
            className="relative px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-white text-lg mb-12 group overflow-hidden"
            style={{ backgroundColor: '#c084fc' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(192, 132, 252, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Generate Smile <span className="text-xl">😊</span>
            </span>
          </motion.button>

          {/* Message display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="min-h-24 flex items-center justify-center"
          >
            {isRevealed && (
              <motion.div
                className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border-2"
                style={{ borderColor: '#ec4899' }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                    '0 0 40px rgba(236, 72, 153, 0.5)',
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  {message}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
