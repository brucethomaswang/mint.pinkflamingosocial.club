import { useEffect, useMemo, useRef } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from './useLocalStorage'

export default function usePaused() {
  const called = useRef(false)
  const [isPaused, setIsPaused] = useLocalStorage<boolean>('isPaused', false)

  const setPaused = () => setIsPaused(true)
  const setUnpaused = () => setIsPaused(false)

  useEffect(() => {
    if (called.current) return
    ;(async () => {
      setIsPaused(await PinkFlamingoSocialClub.paused())
      called.current = true
    })()
  }, [])

  useEffect(() => {
    listener.on('Paused', setPaused)
    listener.on('Unpaused', setUnpaused)
    return () => {
      listener.off('Paused', setPaused)
      listener.off('Unpaused', setUnpaused)
    }
  }, [])

  return useMemo(() => ({ isPaused }), [isPaused])
}
