'use client'

import { useEffect, useRef, useState } from 'react'
import { invitation } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'
import Star from '@/components/ui/Star'

/**
 * Clipboard access fails on plain-http origins, which is exactly how these
 * invitations get opened at a family gathering, so keep a synchronous fallback.
 */
function writeClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value).catch(() => legacyCopy(value))
  }
  return Promise.resolve(legacyCopy(value))
}

function legacyCopy(value: string) {
  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.top = '-1000px'
  document.body.appendChild(field)
  field.select()
  document.execCommand('copy')
  field.remove()
}

function GiftParcel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={className}
      role="img"
      aria-label="Ilustrasi kotak hadiah dengan pita emas"
    >
      <defs>
        <linearGradient id="gift-body" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#2a7476" />
          <stop offset="1" stopColor="#174f50" />
        </linearGradient>
        <linearGradient id="gift-lid" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#3f9179" />
          <stop offset="1" stopColor="#21686a" />
        </linearGradient>
        <linearGradient id="gift-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f7e2b4" />
          <stop offset="0.55" stopColor="#f2d59a" />
          <stop offset="1" stopColor="#d9ae68" />
        </linearGradient>
        <linearGradient id="gift-bow" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#e3a184" />
          <stop offset="1" stopColor="#c97a5b" />
        </linearGradient>
      </defs>
      <ellipse cx="90" cy="158" rx="52" ry="8" fill="#174f50" opacity=".12" />
      <rect x="38" y="74" width="104" height="76" rx="7" fill="url(#gift-body)" />
      <rect x="38" y="74" width="104" height="10" rx="5" fill="#2f8074" opacity=".55" />
      <rect x="81" y="74" width="18" height="76" fill="url(#gift-ribbon)" />
      <rect x="31" y="58" width="118" height="20" rx="5" fill="url(#gift-lid)" />
      <rect x="31" y="58" width="118" height="5" rx="2.5" fill="#57a48c" opacity=".8" />
      <rect x="81" y="58" width="18" height="20" fill="url(#gift-ribbon)" />
      <path d="M90 60C74 60 62 51 62 41c0-8 7-13 14-13 10 0 14 9 14 20z" fill="url(#gift-bow)" />
      <path d="M90 60c16 0 28-9 28-19 0-8-7-13-14-13-10 0-14 9-14 20z" fill="url(#gift-bow)" />
      <circle cx="90" cy="52" r="9" fill="#e8b096" />
      <circle cx="90" cy="52" r="4" fill="#f7e2b4" />
      <path
        d="M90 92l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3-9.3-4.9-9.3 4.9 1.8-10.3-7.5-7.3 10.4-1.5z"
        fill="#f2d59a"
        opacity=".92"
      />
    </svg>
  )
}

export default function GiftSection() {
  const [copied, setCopied] = useState<number | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const copy = async (index: number, number: string) => {
    await writeClipboard(number)
    setCopied(index)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(null), 2200)
  }

  return (
    <section
      id="hadiah"
      className="relative overflow-hidden bg-cream px-4 py-16 sm:py-20"
      aria-labelledby="hadiah-title"
    >
      <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,#f7e3bf,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_.95fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <p className="label">Titip hadiah</p>
              <h2 id="hadiah-title" className="mt-2 max-w-md text-h2 text-teal">
                Bila Ingin Menitipkan Hadiah
              </h2>
              <p className="mt-4 max-w-[46ch] text-ink/80">{invitation.gift.intro}</p>
            </Reveal>
          </div>

          <div className="grid gap-4">
            <Reveal>
              <div className="flex justify-center lg:justify-start">
                <GiftParcel className="h-24 w-24 drop-shadow-[0_18px_18px_rgba(16,56,58,.16)] lg:h-28 lg:w-28" />
              </div>
            </Reveal>

            {invitation.gift.accounts.map((account, index) => (
              <Reveal key={`${account.bank}-${index}`} delay={0.08 * index}>
                <article className="gift-card relative overflow-hidden rounded-lg border border-sand bg-gradient-to-br from-teal to-emerald p-5 text-cream shadow-lift">
                  <div aria-hidden="true" className="geo-bg absolute inset-0 opacity-[0.12]" />
                  <div aria-hidden="true" className="gift-sheen" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.68rem] font-bold tracking-[0.18em] text-gold uppercase">
                        {account.bank}
                      </p>
                      <span aria-hidden="true" className="h-5 w-5 flex-none text-gold">
                        <Star />
                      </span>
                    </div>

                    <p className="mt-3 font-display text-[clamp(1.3rem,1rem+2vw,1.75rem)] leading-none tracking-[0.04em] break-words text-cream select-all [font-variant-numeric:tabular-nums]">
                      {account.number}
                    </p>
                    <p className="mt-2 text-sm text-cream">a.n. {account.holder}</p>

                    <button
                      type="button"
                      onClick={() => copy(index, account.number)}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-gold/70 px-4 text-sm font-bold text-cream transition-colors hover:bg-gold hover:text-teal"
                    >
                      {copied === index ? (
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M4 12.5l5 5L20 6.5" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="9" y="9" width="11" height="11" rx="2" />
                          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                        </svg>
                      )}
                      {copied === index ? 'Tersalin' : 'Salin nomor'}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}

            {invitation.gift.note && (
              <Reveal delay={0.12}>
                <p className="max-w-[52ch] text-sm text-ink/70">{invitation.gift.note}</p>
              </Reveal>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            {copied !== null ? 'Nomor rekening disalin ke papan klip.' : ''}
          </p>
        </div>
      </div>
    </section>
  )
}