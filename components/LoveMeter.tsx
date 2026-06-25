'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoveMeter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ec4899' }}>
            Love Meter
          </h2>
          <p className="text-foreground text-lg mb-12 opacity-80">
            Measuring my love for you...
          </p>

          {/* Heart shape meter */}
          <div className="flex flex-col items-center gap-8">
            {/* Heart SVG */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="text-8xl"
            >
              ❤️
            </motion.div>

            {/* Percentage circle */}
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#fce7f3"
                strokeWidth="8"
              />

              {/* Progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#ec4899"
                strokeWidth="8"
                strokeDasharray="565"
                strokeDashoffset="0"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 565 }}
                animate={isVisible ? { strokeDashoffset: 0 } : {}}
                transition={{
                  duration: 2,
                  ease: 'easeOut',
                  repeatType: 'loop',
                }}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '100px 100px',
                }}
              />

              {/* Center text */}
              <text
                x="100"
                y="100"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold"
                fill="#ec4899"
                fontFamily="sans-serif"
                fontSize="28"
                fontWeight="700"
              >
                100%
              </text>
            </svg>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="text-2xl font-bold"
              style={{ color: '#ec4899' }}
            >
              My love for you: Infinite ❤️
            </motion.p>

            {/* Additional message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              className="text-lg text-foreground opacity-80"
            >
              And it keeps growing every single day.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
