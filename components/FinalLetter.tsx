'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function FinalLetter() {
  const [showLetter, setShowLetter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowLetter(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border-2"
          style={{ borderColor: '#fce7f3' }}
        >
          {/* Decorative top */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-4xl">💌</span>
            <span className="text-3xl">✨</span>
            <span className="text-4xl">💌</span>
          </motion.div>

          {/* Letter content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showLetter ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: '#ec4899' }}>
              A Letter For You
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-foreground mb-8">
              <p>
                No matter how hard today feels, I hope you remember that you are{' '}
                <span className="font-bold" style={{ color: '#ec4899' }}>
                  deeply loved
                </span>
                , incredibly precious, and{' '}
                <span className="font-bold" style={{ color: '#c084fc' }}>
                  never alone
                </span>
                .
              </p>

              <p>
                When the world feels too heavy, when your thoughts won't quiet down, when you feel
                like you&apos;re not enough—I want you to know that{' '}
                <span className="font-bold" style={{ color: '#fbbf24' }}>
                  I am always cheering for you
                </span>
                .
              </p>

              <p>
                Your strength may feel invisible to you, but I see it every day. The way you keep
                going, the way you care, the way you show up—it matters more than you know.
              </p>

              <p>
                I will always{' '}
                <span className="font-bold" style={{ color: '#ec4899' }}>
                  choose you
                </span>
                , on your best days and your hardest days. You are not too much, not too little,
                not too anything. You are exactly right, just as you are.
              </p>

              <p>
                So breathe. Rest. Let yourself be loved. You deserve all the kindness in the world,
                starting with your own.
              </p>

              <p>
                Forever and always,
              </p>
            </div>

            {/* Signature */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showLetter ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p
                className="text-3xl md:text-4xl font-dancing mb-4"
                style={{ color: '#ec4899' }}
              >
                Forever yours
              </p>
              <motion.p
                className="text-5xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                ❤️
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Decorative bottom */}
          <motion.div
            className="flex justify-center gap-4 mt-8"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <span className="text-3xl">✨</span>
            <span className="text-4xl">💕</span>
            <span className="text-3xl">✨</span>
          </motion.div>
        </motion.div>

        {/* Easter egg hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          ✨ Try clicking on the stars throughout the page for secret messages ✨
        </motion.p>
      </div>
    </section>
  )
}
