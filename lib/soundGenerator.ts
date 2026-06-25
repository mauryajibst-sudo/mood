// Generate romantic piano-like sounds using Web Audio API
export function playRomanticTone(frequency: number = 440, duration: number = 0.3) {
  if (typeof window === 'undefined') return

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Create oscillator (piano-like)
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    // Connect nodes
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Set wave type to sine for smooth, romantic sound
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    
    // Create envelope for smooth fade-in and fade-out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    // Play the tone
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  } catch (error) {
    console.log('[v0] Audio playback not supported:', error)
  }
}

// Play a sequence of tones (chord progression)
export function playRomanticChord(notes: number[] = [261.63, 329.63, 392.00]) {
  // C Major chord (C, E, G) - romantic and happy
  notes.forEach((freq, index) => {
    setTimeout(() => {
      playRomanticTone(freq, 0.4)
    }, index * 50)
  })
}

// Play specific romantic chord progressions for each card
export const cardChords = [
  [261.63, 329.63, 392.00], // C Major (Kindness)
  [293.66, 369.99, 440.00], // D Major (Smile)
  [329.63, 392.00, 493.88], // E Major (Strength)
  [349.23, 440.00, 523.25], // F Major (Heart)
  [392.00, 493.88, 587.33], // G Major (Laugh)
  [440.00, 554.37, 659.25], // A Major (Presence)
]

export function playCardFlipSound(cardIndex: number) {
  const chord = cardChords[cardIndex % cardChords.length]
  playRomanticChord(chord)
}
