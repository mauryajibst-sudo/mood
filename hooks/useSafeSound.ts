import { useEffect, useState } from 'react'
import useSound from 'use-sound'

/**
 * Safe wrapper around useSound that handles missing audio files gracefully
 */
export function useSafeSound(soundUrl: string, options?: any) {
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    // Check if audio file exists by attempting to fetch it
    fetch(soundUrl, { method: 'HEAD' })
      .then((res) => setIsAvailable(res.ok))
      .catch(() => setIsAvailable(false))
  }, [soundUrl])

  // Use the actual sound hook only if audio is available
  const [play] = isAvailable ? useSound(soundUrl, options) : [() => {}]

  return [play] as const
}
