'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Floating hearts
  const FloatingHearts = () => {
    const hearts = mounted
      ? [...Array(8)].map((_, i) => ({
          startX: Math.random() * 400 - 200,
          endX: Math.random() * 400 - 200,
          duration: 8 + Math.random() * 6,
        }))
      : []

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const heart = hearts[i] || { startX: 0, endX: 0, duration: 8 }
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-4xl"
              initial={{
                x: heart.startX,
                y: '100vh',
                opacity: 0,
              }}
              animate={{
                x: heart.endX,
                y: '-50px',
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            >
              ❤️
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Twinkling stars
  const TwinklingStars = () => {
    const stars = mounted
      ? [...Array(20)].map((_, i) => ({
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
        }))
      : []

    return (
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const star = stars[i] || { duration: 3, delay: 0 }
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            >
              ⭐
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Drifting clouds
  const DriftingClouds = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute text-6xl opacity-20"
            style={{
              top: `${20 * (i + 1)}%`,
            }}
            initial={{
              x: '-100px',
            }}
            animate={{
              x: 'calc(100vw + 100px)',
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            ☁️
          </motion.div>
        ))}
      </div>
    )
  }

  // Falling flower petals
  const FallingPetals = () => {
    const petals = mounted
      ? [...Array(15)].map((_, i) => ({
          left: Math.random() * 100,
          duration: 6 + Math.random() * 4,
        }))
      : []

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const petal = petals[i] || { left: 0, duration: 6 }
          return (
            <motion.div
              key={`petal-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${petal.left}%`,
              }}
              initial={{
                y: '-50px',
                rotate: 0,
              }}
              animate={{
                y: '100vh',
                rotate: 360,
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'linear',
                repeatType: 'loop',
              }}
            >
              🌸
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Mouse follow sparkles
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
        const sparkle = document.createElement('div')
        sparkle.className = 'absolute pointer-events-none text-xl'
        sparkle.textContent = '✨'
        sparkle.style.left = e.clientX + 'px'
        sparkle.style.top = e.clientY + 'px'
        sparkle.style.position = 'fixed'
        sparkle.style.zIndex = '50'

        containerRef.current.appendChild(sparkle)

        setTimeout(() => sparkle.remove(), 1000)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none">
      <FloatingHearts />
      <TwinklingStars />
      <DriftingClouds />
      <FallingPetals />
    </div>
  )
}
