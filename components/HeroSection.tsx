'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  const fullText = 'This little corner of the internet was made just for you.'
  
  // Default placeholder photos - user can replace these with their own URLs
  const defaultPhotos = [
    'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516991891681-c8d2f7f60cd9?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530268729831-4b51a4d7021d?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519999482648-a6fb3b3c7205?w=300&h=400&fit=crop',
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-2xl z-10 relative">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-2" style={{ color: '#ec4899' }}>
            Hey Beautiful
          </h1>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl inline-block"
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Typewriter text */}
        <motion.p
          ref={textRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-foreground leading-relaxed min-h-16"
          style={{ color: '#7c3aed' }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex gap-4 justify-center mb-12 text-3xl"
        >
          <span>💕</span>
          <span>✨</span>
          <span>🌸</span>
          <span>✨</span>
          <span>💕</span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            onClick={() => setShowPhotoGallery(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-white text-lg group overflow-hidden"
            style={{ backgroundColor: '#ec4899' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Open My Heart <span className="text-xl">💖</span>
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: '#c084fc' }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className="mt-16"
        >
          <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
          <svg
            className="w-6 h-6 mx-auto text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {showPhotoGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPhotoGallery(false)}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold" style={{ color: '#ec4899' }}>
                  Our Beautiful Memories
                </h2>
                <motion.button
                  onClick={() => setShowPhotoGallery(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl"
                >
                  ✕
                </motion.button>
              </div>

              <p className="text-foreground mb-6 opacity-70">
                Replace the image URLs in the code with your own photos to customize this gallery. Each photo will be beautifully displayed here.
              </p>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {defaultPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer"
                  >
                    <img
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4"
                    >
                      <p className="text-white text-lg font-semibold">Memory {index + 1} 💕</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: '#fce7f3' }}>
                <p className="text-foreground font-semibold mb-2">To add your photos:</p>
                <ol className="text-foreground text-sm space-y-1 list-decimal list-inside">
                  <li>Edit the <code className="bg-white px-2 py-1 rounded">defaultPhotos</code> array in HeroSection.tsx</li>
                  <li>Replace each URL with your own image links</li>
                  <li>You can use image hosting services like Imgur, Cloudinary, or Firebase Storage</li>
                </ol>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
