'use client'

import { useCallback, useEffect, useState } from 'react'
import { invitation } from '@/lib/invitation'
import { playOpen } from '@/lib/sound'
import Star from '@/components/ui/Star'
import FloatingStars from '@/components/ui/FloatingStars'

const CONFETTI = Array.from({ length: 14 }, (_, i) => ({
  left: `${6 + ((i * 47) % 88)}%`,
  rotate: (i * 37) % 180,
  round: i % 4 === 0,
  delay: i % 5,
}))

const POLLEN = Array.from({ length: 9 }, (_, i) => ({
  left: `${12 + ((i * 29) % 76)}%`,
  delay: `${(i % 6) * 0.12}s`,
}))

type Phase = 'closed' | 'opening' | 'open'

export default function InvitationCover({ guest, nextAnchor }: { guest: string | null; nextAnchor: string | null }) {
  const [phase, setPhase] = useState<Phase>('closed')
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = phase === 'open' ? '' : 'hidden'
    root.setAttribute('data-cover-state', phase)
    return () => {
      root.style.overflow = ''
      root.removeAttribute('data-cover-state')
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'open') return
    document.getElementById('undangan-isi')?.focus({ preventScroll: true })
  }, [phase])

  const open = useCallback(() => {
    if (phase !== 'closed') return
    playOpen()
    if (reduced) {
      setPhase('open')
      return
    }
    setPhase('opening')
    window.setTimeout(() => setPhase('open'), 2150)
  }, [phase, reduced])

  const opened = phase === 'open'

  return (
    <section
      aria-label="Sampul undangan"
      data-phase={phase}
      className="cover-stage relative min-h-[100svh] overflow-hidden bg-cream"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,#f7e3bf,transparent_70%)]" />
        <div className="geo-bg geo-fade absolute inset-0 opacity-25" />
        <FloatingStars count={14} />
      </div>

      {/* The envelope keeps its place in the layout and fades out; the greeting
          fades in beneath it, so opening never swaps one screen for another. */}
      <div
        inert={opened}
        aria-hidden={opened}
        className="cover-envelope absolute inset-0 z-10 flex items-center justify-center px-4 py-[7vh]"
      >
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[min(430px,58svh)] [perspective:1400px]">
          <div aria-hidden="true" className="peek-boy absolute inset-x-0 -top-[23%] z-0 flex justify-center">
            <img
              src="/img/boy-wave.webp"
              alt=""
              width={525}
              height={900}
              fetchPriority="high"
              className="cover-kids w-[40%] max-w-[180px] drop-shadow-[0_16px_18px_rgba(16,56,58,.22)]"
            />
          </div>

          <div className="absolute inset-0 z-10 rounded-[26px] bg-gradient-to-b from-emerald to-teal shadow-cover" />

          <div className="cover-letter absolute inset-x-[6%] top-[8%] z-20 flex h-[74%] flex-col overflow-hidden rounded-[14px] border-2 border-sand bg-cream px-5 pb-5 pt-[36%] text-center">
            <p className="arabic arabic-tight text-teal" lang="ar" dir="rtl">
              بسم الله الرحمن الرحيم
            </p>
            <p className="label mt-2 text-[0.65rem]">Undangan syukuran</p>
            <p className="mt-1 font-display text-[clamp(1.4rem,1rem+1.6vw,1.8rem)] leading-[1.05] font-semibold text-teal">
              {invitation.event.title}
            </p>
            <div className="gold-rule mx-auto mt-2.5 w-20" />
            <p className="mt-2.5 text-[0.7rem] text-ink/70">Putra kami</p>
            <p className="font-display text-lg leading-tight font-semibold text-emerald">
              {invitation.child.nickname}
            </p>
          </div>

          {/* Folded flap: two paper halves meeting at a centre crease, with the
              fold edges outlined so the shape reads as paper, not a panel. */}
          <div className="cover-flap absolute inset-x-0 top-0 z-30 h-[32%] origin-top overflow-hidden rounded-t-[26px]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="flap-left" x1="0" y1="0" x2="0.55" y2="1">
                  <stop offset="0" stopColor="#1b5a5b" />
                  <stop offset="1" stopColor="#17494a" />
                </linearGradient>
                <linearGradient id="flap-right" x1="1" y1="0" x2="0.45" y2="1">
                  <stop offset="0" stopColor="#22696b" />
                  <stop offset="1" stopColor="#185253" />
                </linearGradient>
                <pattern id="flap-geo" width="9" height="9" patternUnits="userSpaceOnUse">
                  <path
                    d="M4.5 0l4.5 4.5-4.5 4.5L0 4.5z"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth=".35"
                    opacity=".22"
                  />
                </pattern>
              </defs>
              <path d="M0 0H50L50 88Z" fill="url(#flap-left)" />
              <path d="M100 0H50L50 88Z" fill="url(#flap-right)" />
              <path d="M0 0H50L50 88Z" fill="url(#flap-geo)" opacity=".7" />
              <path d="M100 0H50L50 88Z" fill="url(#flap-geo)" opacity=".7" />
              <path d="M0 0L50 88L100 0" fill="none" stroke="#0F3B3C" strokeWidth=".6" strokeOpacity=".55" vectorEffect="non-scaling-stroke" />
              <path d="M50 0V88" stroke="#0F3B3C" strokeWidth=".5" vectorEffect="non-scaling-stroke" opacity=".4" />
              <path d="M0 0H100" stroke="var(--gold)" strokeWidth=".5" vectorEffect="non-scaling-stroke" opacity=".45" />
            </svg>
          </div>

          <div className="cover-pocket absolute inset-x-0 bottom-0 z-40 flex h-[28%] items-end justify-center overflow-hidden rounded-b-[26px] px-4 pb-5">
            <div className="absolute inset-0 bg-gradient-to-b from-teal to-emerald" />
            <div className="pocket-side absolute inset-0" style={{ clipPath: 'polygon(0 0, 50% 38%, 0 100%)' }} />
            <div className="pocket-side absolute inset-0" style={{ clipPath: 'polygon(100% 0, 50% 38%, 100% 100%)' }} />
            <div className="pocket-bottom absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 38%, 100% 100%)' }} />
            <div className="geo-bg absolute inset-x-0 bottom-0 h-1/2 opacity-10" />
            <div className="relative z-10 w-full">
              <p className="text-center text-[0.68rem] font-bold tracking-wide text-gold/90">Kepada</p>
              <p className="mt-0.5 truncate text-center text-base font-bold text-cream">
                {guest ?? 'Bapak/Ibu/Saudara/i'}
              </p>
              <button
                type="button"
                onClick={open}
                className="mt-2.5 w-full rounded-md border-2 border-gold bg-cream px-4 py-2.5 text-base font-bold text-teal shadow-lift transition-colors hover:bg-gold"
              >
                Buka Undangan
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={open}
            tabIndex={-1}
            aria-hidden="true"
            className="cover-seal absolute top-[calc(28.2%-clamp(1.55rem,6vw,2.2rem))] left-[calc(50%-clamp(1.55rem,6vw,2.2rem))] z-40 flex h-[clamp(3.1rem,12vw,4.4rem)] w-[clamp(3.1rem,12vw,4.4rem)] items-center justify-center rounded-full border-[4px] border-gold/80 bg-terracotta text-cream shadow-[0_10px_20px_-12px_rgba(16,56,58,.9)]"
          >
            <span aria-hidden="true" className="absolute inset-1.5 rounded-full border border-gold/40" />
            <span className="block w-[42%]">
              <Star />
            </span>
          </button>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-50">
            {CONFETTI.map((c, i) => (
              <span
                key={i}
                className={`confetti ${c.round ? 'rounded-full' : ''}`}
                style={{
                  left: c.left,
                  top: '30%',
                  transform: `rotate(${c.rotate}deg)`,
                  animationDelay: `${c.delay * 0.1}s`,
                }}
              />
            ))}
            {POLLEN.map((p, i) => (
              <span
                key={`p${i}`}
                className="gold-particle"
                style={{ left: p.left, animationDelay: p.delay }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* One centred column under an arched portrait; the scroll cue sits in the
          footer row of the grid, never beside the greeting. */}
      <div
        id="undangan-isi"
        tabIndex={-1}
        className="cover-welcome absolute inset-0 z-20 flex items-center justify-center overflow-y-auto px-5 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(5rem,env(safe-area-inset-bottom))] outline-none"
      >
        <div className="mx-auto w-full max-w-[30rem] text-center">
          <div className="relative mx-auto w-[clamp(7.5rem,20vh,10rem)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 border-[5px] border-sand bg-teal [clip-path:url(#welcome-arch)]"
            />
            <div className="relative aspect-[4/5] [clip-path:url(#welcome-arch)]">
              <img
                src="/img/boy-wave.webp"
                alt="Ilustrasi anak melambaikan tangan menyambut tamu"
                width={525}
                height={900}
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </div>
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="welcome-arch" clipPathUnits="objectBoundingBox">
                  <path d="M0.5 0 C0.34 0.02 0.22 0.09 0.13 0.2 C0.05 0.3 0 0.42 0 0.55 V0.97 Q0 1 0.035 1 H0.965 Q1 1 1 0.97 V0.55 C1 0.42 0.95 0.3 0.87 0.2 C0.78 0.09 0.66 0.02 0.5 0 Z" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <p className="arabic arabic-compact mt-5 text-emerald" lang="ar" dir="rtl">
            السلام عليكم ورحمة الله وبركاته
          </p>
          <h1 className="mt-1 text-h1 text-teal">Assalamu&apos;alaikum</h1>
          <p className="mx-auto mt-3 max-w-[28rem] text-ink/80">Bapak/Ibu sekalian.</p>
        </div>

        {nextAnchor && (
        <a
          href={nextAnchor}
          aria-label="Gulir ke undangan"
          className="cover-cue absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] mx-auto flex w-24 flex-col items-center gap-1 rounded-full py-2 text-teal/70 transition-colors hover:text-teal focus-visible:text-teal"
        >
          <svg className="cue-arrow" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 9l7 7 7-7" />
          </svg>
          <span aria-hidden="true" className="text-[0.58rem] uppercase tracking-[0.22em]">Gulir</span>
        </a>
        )}
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .cover-stage[data-phase="closed"] .cover-seal { animation: seal 2.6s ease-in-out infinite; }
          .cover-stage[data-phase="closed"] .cover-kids { animation: bob 3.6s ease-in-out infinite; transform-origin: 50% 100%; }
          .cover-stage:is([data-phase="opening"], [data-phase="open"]) .cover-flap {
            transform: rotateX(172deg);
            transition: transform 900ms cubic-bezier(.6,.02,.35,1);
          }
          .cover-stage:is([data-phase="opening"], [data-phase="open"]) .cover-seal {
            opacity: 0;
            transform: scale(.4) rotate(18deg);
            transition: opacity 260ms ease, transform 380ms cubic-bezier(.4,0,.7,.4);
          }
          .cover-stage:is([data-phase="opening"], [data-phase="open"]) .cover-letter {
            z-index: 45;
            transform: translateY(-26%) scale(1.02);
            transition: transform 1150ms cubic-bezier(.34,1.06,.4,1) 600ms;
          }
          .cover-stage:is([data-phase="opening"], [data-phase="open"]) .peek-boy {
            opacity: 0;
            transform: translateY(-12%);
            transition: opacity 520ms ease 820ms, transform 900ms ease 820ms;
          }
          .cover-stage[data-phase="opening"] .confetti { animation: confetti-fall 1900ms cubic-bezier(.2,.6,.3,1) 420ms both; }
          .cover-stage[data-phase="opening"] .gold-particle { animation: gold-rise 1800ms ease-out 620ms both; }
        }
        .cover-envelope { transition: opacity 280ms ease, filter 380ms ease, transform 620ms cubic-bezier(.4,0,.2,1), visibility 0s linear 300ms; }
        .cover-stage[data-phase="open"] .cover-envelope {
          opacity: 0;
          filter: blur(7px);
          transform: scale(1.03) translateY(-1%);
          visibility: hidden;
        }
        .cover-welcome {
          opacity: 0;
          transform: translateY(14px) scale(.985);
          pointer-events: none;
          transition: opacity 520ms ease 300ms, transform 700ms cubic-bezier(.22,.8,.3,1) 300ms;
        }
        .cover-stage[data-phase="open"] .cover-welcome {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover-envelope, .cover-welcome { transition-duration: 1ms; transition-delay: 0ms; }
        }
        .cover-letter { transition: transform 400ms ease; }
        .cover-flap { transition: transform 400ms ease; transform-style: preserve-3d; backface-visibility: hidden; filter: drop-shadow(0 8px 8px rgba(16,56,58,.16)); }
        .cover-flap svg { overflow: visible; }
        .cover-stage[data-phase="open"] .cue-arrow { animation: cue-bob 1.9s ease-in-out 900ms infinite; }
        @keyframes cue-bob {
          0%, 100% { transform: translateY(0); opacity: .6; }
          50% { transform: translateY(7px); opacity: 1; }
        }
        .gold-particle {
          position: absolute; top: 50%; width: 6px; height: 6px; border-radius: 999px;
          background: var(--gold); opacity: 0;
        }
        @keyframes seal {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes confetti-fall {
          0% { opacity: 0; translate: 0 -40px; rotate: 0deg; }
          15% { opacity: 1; }
          100% { opacity: 0; translate: 0 240px; rotate: 340deg; }
        }
        @keyframes gold-rise { 0% { opacity: 0; translate: 0 0; } 25% { opacity: 1; } 100% { opacity: 0; translate: 0 -190px; } }
      `}</style>
    </section>
  )
}