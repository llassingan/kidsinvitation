'use client'

import { useEffect, useState } from 'react'
import { eventDate } from '@/lib/invitation'

const units = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
] as const

function remaining(target: number) {
  const gap = Math.max(0, target - Date.now())
  const s = Math.floor(gap / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: gap === 0,
  }
}

export default function Countdown() {
  const target = eventDate().getTime()
  const [value, setValue] = useState(() => remaining(target))

  useEffect(() => {
    const id = window.setInterval(() => setValue(remaining(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (value.done) {
    return (
      <p className="rounded-lg border border-sand bg-cream px-4 py-3 text-center font-bold text-teal">
        Alhamdulillah, acara sudah berlangsung. Terima kasih sudah menjadi bagian cerita si kecil.
      </p>
    )
  }

  return (
    <div>
      <p className="label">Hitung mundur</p>
      <div className="mt-2 grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.key}
            className="rounded-md border border-sand bg-teal px-1 py-3 text-center text-cream"
          >
            <span className="block font-body text-count leading-none font-extrabold tabular-nums">
              {String(value[u.key]).padStart(2, '0')}
            </span>
            <span className="mt-1 block text-xs font-bold text-gold">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
