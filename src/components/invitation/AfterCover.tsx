'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const ATTRIBUTE = 'data-cover-state'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [ATTRIBUTE] })
  return () => observer.disconnect()
}

function state() {
  return document.documentElement.getAttribute(ATTRIBUTE) ?? 'closed'
}

/**
 * Everything below the cover stays out of the tab order and the accessibility
 * tree until the envelope is opened, so keyboard and screen-reader users start
 * at the cover instead of landing in content they cannot see.
 *
 * The lock is applied after mount, never in the server HTML: when the bundle
 * cannot run (old browser, scripts blocked), the only way into the invitation
 * is the cover's plain link, so the content behind it has to stay usable.
 */
export default function AfterCover({ children, gated }: { children: React.ReactNode; gated: boolean }) {
  const phase = useSyncExternalStore(subscribe, state, () => 'closed')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Tells the layout's ES5 watchdog that the bundle is alive, so it leaves the
    // reveal animations alone.
    document.documentElement.setAttribute('data-boot', 'ready')
    setMounted(true)
  }, [])

  const locked = mounted && gated && phase !== 'open'

  return (
    <div inert={locked} aria-hidden={locked}>
      {children}
    </div>
  )
}