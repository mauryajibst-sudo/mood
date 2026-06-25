import gsap from 'gsap'

/**
 * GSAP animation utilities for romantic website
 */

export const animateFloat = (element: HTMLElement) => {
  gsap.to(element, {
    y: -20,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
}

export const animateSparkles = (container: HTMLElement, count: number = 50) => {
  const sparkles = container.querySelectorAll('[data-sparkle]')
  sparkles.forEach((sparkle, index) => {
    gsap.to(sparkle, {
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      opacity: 0,
      duration: 2 + Math.random() * 1,
      ease: 'power2.out',
      delay: index * 0.03,
    })
  })
}

export const animateHeartBurst = (x: number, y: number, container: HTMLElement) => {
  const heartCount = 12
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div')
    heart.innerHTML = '❤️'
    heart.style.position = 'fixed'
    heart.style.left = x + 'px'
    heart.style.top = y + 'px'
    heart.style.fontSize = '24px'
    heart.style.pointerEvents = 'none'
    heart.style.zIndex = '9999'
    container.appendChild(heart)

    const angle = (i / heartCount) * Math.PI * 2
    const velocity = 5 + Math.random() * 5

    gsap.to(heart, {
      x: Math.cos(angle) * 100 * velocity,
      y: Math.sin(angle) * 100 * velocity,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      onComplete: () => heart.remove(),
    })
  }
}

export const typewriterEffect = (element: HTMLElement, text: string, speed: number = 50) => {
  return new Promise((resolve) => {
    element.textContent = ''
    let index = 0

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index)
        index++
        setTimeout(type, speed)
      } else {
        resolve(true)
      }
    }

    type()
  })
}

export const confettiExplosion = (x: number, y: number, container: HTMLElement) => {
  const colors = ['#ec4899', '#c084fc', '#60a5fa', '#fbbf24', '#fb923c']
  const confettiCount = 50

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    confetti.style.position = 'fixed'
    confetti.style.left = x + 'px'
    confetti.style.top = y + 'px'
    confetti.style.width = '8px'
    confetti.style.height = '8px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.borderRadius = '50%'
    confetti.style.pointerEvents = 'none'
    confetti.style.zIndex = '9999'
    container.appendChild(confetti)

    const angle = Math.random() * Math.PI * 2
    const velocity = 8 + Math.random() * 8

    gsap.to(confetti, {
      x: Math.cos(angle) * velocity * 50,
      y: Math.sin(angle) * velocity * 50 - 100,
      opacity: 0,
      rotation: Math.random() * 360,
      duration: 2 + Math.random() * 0.5,
      ease: 'power2.out',
      onComplete: () => confetti.remove(),
    })
  }
}

export const heartRain = (container: HTMLElement, duration: number = 3) => {
  const rainCount = 30
  for (let i = 0; i < rainCount; i++) {
    const heart = document.createElement('div')
    heart.innerHTML = '❤️'
    heart.style.position = 'fixed'
    heart.style.left = Math.random() * window.innerWidth + 'px'
    heart.style.top = '-50px'
    heart.style.fontSize = '20px'
    heart.style.pointerEvents = 'none'
    heart.style.zIndex = '9998'
    container.appendChild(heart)

    gsap.to(heart, {
      y: window.innerHeight + 100,
      opacity: 0,
      duration: 3 + Math.random() * 2,
      ease: 'linear',
      delay: i * 0.1,
      onComplete: () => heart.remove(),
    })
  }
}
