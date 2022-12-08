import { useEffect, useMemo, useRef } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from './useLocalStorage'

export default function usePaused() {
  const called = useRef(false)
  const [isPaused, setIsPaused] = useLocalStorage<boolean>('isPaused', false)

  useEffect(() => {
    if (called.current) return
    ;(async () => {
      console.log('called usePaused')
      setIsPaused(await PinkFlamingoSocialClub.paused())
      called.current = true
    })()
  }, [])

  useEffect(() => {
    listener.on('Paused', () => setIsPaused(true))
    listener.on('Unpaused', () => setIsPaused(false))
    return () => {
      listener.off('Paused', setIsPaused)
      listener.off('Unpaused', setIsPaused)
    }
  }, [])

  return useMemo(() => ({ isPaused }), [isPaused])
}
