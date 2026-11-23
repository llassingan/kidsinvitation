'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { invitation } from '@/lib/invitation'

const FADE_IN_MS = 3000

export default function BackgroundMusic({ src, playing }: { src: string; playing: boolean }) {
  const [live, setLive] = useState(false)
  const [muted, setMuted] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)
  // Kept outside the effect so a remount resumes the same track where it stopped.
  const position = useRef(0)
  const frame = useRef(0)
  const armed = useRef(playing)

  useEffect(() => {
    armed.current = playing
  }, [playing])

  const fade = useCallback((node: HTMLAudioElement) => {
    cancelAnimationFrame(frame.current)
    const t0 = performance.now()
    const tick = () => {
      const done = Math.min((performance.now() - t0) / FADE_IN_MS, 1)
      node.volume = invitation.audio.volume * done
      if (done < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (!src) return
    // No src in the markup and preload "none": the track never downloads until
    // the guest opens the envelope. play() then fetches the head only and starts
    // as soon as it can, instead of waiting for the whole file.
    const el = new Audio()
    el.src = src
    el.loop = true
    el.preload = 'none'
    el.volume = 0
    el.setAttribute('playsinline', '')
    el.addEventListener('playing', () => {
      setLive(true)
      fade(el)
    })
    el.addEventListener('pause', () => setLive(false))
    audio.current = el

    // Hidden tabs cannot start audio, so the request waits for the guest to come back.
    const attempt = () => {
      const resumeAt = position.current
      if (resumeAt > 0 && (!el.seekable.length || resumeAt < el.duration)) el.currentTime = resumeAt
      void el.play().then(() => {
        // A buffered resume can skip the 'playing' event, so re-ramp here too.
        if (el.volume === 0) fade(el)
      }).catch(() => {})
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        position.current = el.currentTime
        el.pause()
      } else if (armed.current) {
        attempt()
      }
    }
    const onPageHide = () => {
      position.current = el.currentTime
      el.pause()
    }
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && armed.current) attempt()
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      cancelAnimationFrame(frame.current)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      window.removeEventListener('pageshow', onPageShow)
      el.pause()
      // Dropping src would make the element fetch the page itself; detaching is enough.
      el.removeAttribute('src')
      audio.current = null
    }
  }, [src, fade])

  // The opening tap is the user gesture autoplay needs, so playback starts here.
  // Setup commits the element first, which re-runs this once `audio` is set.
  useEffect(() => {
    if (!playing || muted) return
    const el = audio.current
    if (!el || !el.paused) return
    const resumeAt = position.current
    if (resumeAt > 0 && (!el.seekable.length || resumeAt < el.duration)) el.currentTime = resumeAt
    void el.play().catch(() => {})
  }, [playing, muted, src])

  const toggle = useCallback(() => {
    const el = audio.current
    if (!el) return
    if (muted) {
      setMuted(false)
      return
    }
    // Pausing on purpose must survive the guest hiding and returning.
    if (el.paused) {
      position.current = el.currentTime
      void el.play().catch(() => {})
    } else {
      setMuted(true)
      el.pause()
    }
  }, [muted])

  // Nothing to toggle until a track is configured.
  if (!src || !invitation.audio.enabled) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={live ? 'Matikan musik latar' : 'Putar musik latar'}
      aria-pressed={live}
      title={live ? 'Musik latar menyala' : 'Musik latar mati'}
      className="fixed right-3 bottom-16 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-night/85 text-cream shadow-lift transition-colors hover:bg-teal"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        {live ? <path d="M9 6v12M15 6v12" /> : <path d="M8 5.5v13l10-6.5z" fill="currentColor" />}
      </svg>
    </button>
  )
}
