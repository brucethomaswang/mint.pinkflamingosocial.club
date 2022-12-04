import { useEffect, useMemo, useRef } from 'react'

import { PinkFlamingoSocialClub } from 'services'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from './useLocalStorage'

export default function usePaused() {
  const called = useRef(false)
  const [isPaused, setIsPaused] = useLocalStorage<boolean>('isPaused', false)

  useEffect(() => {
    async function getPaused() {
      setIsPaused(await PinkFlamingoSocialClub.paused())
      called.current = true
    }
    listener.on('Paused', () => setIsPaused(true))
    listener.on('Unpaused', () => setIsPaused(false))
    getPaused()
  }, [setIsPaused])

  return useMemo(() => ({ isPaused }), [isPaused])
}
