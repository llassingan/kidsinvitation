'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { invitation } from '@/lib/invitation'

export default function BackgroundMusic({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!src) return
    const el = new Audio(src)
    el.loop = true
    el.preload = 'auto'
    el.volume = invitation.audio.volume
    el.setAttribute('playsinline', '')
    el.addEventListener('pause', () => setPlaying(false))
    el.addEventListener('play', () => setPlaying(true))
    audio.current = el
    return () => {
      el.pause()
      el.src = ''
      audio.current = null
    }
  }, [src])

  useEffect(() => {
    const el = audio.current
    if (!el) return
    // Mounts on the opening tap, which carries the gesture that allows autoplay.
    void el.play().catch(() => {})
    // Pause on hide so music never plays behind another app or tab. It stays
    // paused when the guest returns; the button is how they bring it back.
    const onHide = () => {
      if (document.visibilityState === 'hidden') el.pause()
    }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', onHide)
    }
  }, [src])

  const toggle = useCallback(() => {
    const el = audio.current
    if (!el) return
    if (!el.paused) {
      el.pause()
      return
    }
    void el.play().catch(() => {})
  }, [])

  // Nothing to toggle until a track is configured.
  if (!src || !invitation.audio.enabled) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Matikan musik latar' : 'Putar musik latar'}
      aria-pressed={playing}
      title={playing ? 'Musik latar menyala' : 'Musik latar mati'}
      className="fixed right-3 bottom-16 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-night/85 text-cream shadow-lift transition-colors hover:bg-teal"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        {playing ? <path d="M9 6v12M15 6v12" /> : <path d="M8 5.5v13l10-6.5z" fill="currentColor" />}
      </svg>
    </button>
  )
}
