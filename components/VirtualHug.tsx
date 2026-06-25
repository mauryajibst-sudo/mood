'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { animateHeartBurst } from '@/lib/animations'
import { useSafeSound } from '@/hooks/useSafeSound'

export function VirtualHug() {
  const [isHugging, setIsHugging] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playSound] = useSafeSound('/sounds/hug.mp3', { volume: 0.5 })

  const handleHug = () => {
    if (isHugging) return

    setIsHugging(true)
    playSound()

    // Create heart burst
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      animateHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, document.body)
    }

    setTimeout(() => {
      setIsHugging(false)
    }, 1500)
  }

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
            Virtual Hug
          </h2>

          {/* Clickable Pink Heart with Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-center gap-4"
          >
            <motion.button
              onClick={() => setShowMessage(true)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl md:text-9xl cursor-pointer hover:drop-shadow-2xl transition-all"
            >
              💖
            </motion.button>
            <motion.p
              className="text-foreground text-lg font-semibold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Press this princess
            </motion.p>
          </motion.div>

          {/* Couple GIF */}
          <div ref={containerRef} className="flex justify-center mb-8 h-64 md:h-80">
            <motion.button
              onClick={handleHug}
              disabled={isHugging}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={isHugging ? { x: [-5, 5, -5, 5, 0], rotateZ: [-2, 2, -2, 0] } : {}}
              transition={isHugging ? { duration: 1.5, times: [0, 0.2, 0.4, 0.6, 1] } : {}}
              className="bg-none border-none cursor-pointer hover:opacity-90 transition-all w-full h-full rounded-2xl overflow-hidden"
            >
              <iframe
                title="Cosytales Couple Hug"
                src="https://tenor.com/embed/4036686048835834298"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </motion.button>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showMessage ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="min-h-20 flex items-center justify-center"
          >
            {showMessage && (
              <motion.div
                className="bg-gradient-to-r rounded-2xl p-8 shadow-lg"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(192, 132, 252, 0.1))',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                    '0 0 40px rgba(192, 132, 252, 0.5)',
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-2xl font-bold text-foreground">
                  Sending you the biggest hug imaginable 🤗
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Info text */}
          <p className="text-sm text-muted-foreground mt-8">
            ✨ You can hug as many times as you need ✨
          </p>
        </motion.div>
      </div>
    </section>
  )
}
