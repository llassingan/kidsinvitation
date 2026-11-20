'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

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
 */
export default function AfterCover({ children }: { children: React.ReactNode }) {
  const phase = useSyncExternalStore(subscribe, state, () => 'closed')
  const ref = useRef<HTMLDivElement>(null)
  const locked = phase !== 'open'

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (locked) {
      node.setAttribute('inert', '')
      node.setAttribute('aria-hidden', 'true')
    } else {
      node.removeAttribute('inert')
      node.removeAttribute('aria-hidden')
    }
  }, [locked])

  return (
    <div ref={ref} inert={locked} aria-hidden={locked}>
      {children}
    </div>
  )
}