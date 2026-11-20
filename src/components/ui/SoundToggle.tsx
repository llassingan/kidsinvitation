'use client'

import { useSyncExternalStore } from 'react'
import { setSoundEnabled, soundEnabled } from '@/lib/sound'

const CHANGE = 'undangan:sound'

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export default function SoundToggle() {
  // localStorage is the source of truth, and the server renders the default.
  const on = useSyncExternalStore(subscribe, soundEnabled, () => true)

  const toggle = () => {
    setSoundEnabled(!on)
    window.dispatchEvent(new Event(CHANGE))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Matikan bunyi' : 'Nyalakan bunyi'}
      title={on ? 'Suara nyala' : 'Suara mati'}
      className="fixed right-3 bottom-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-night/85 text-cream shadow-lift backdrop-blur-[2px] transition-colors hover:bg-teal"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
        {on ? (
          <path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a8.5 8.5 0 0 1 0 13" />
        ) : (
          <path d="M16 9l5 6M21 9l-5 6" />
        )}
      </svg>
    </button>
  )
}