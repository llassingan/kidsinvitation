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

export default function InvitationCover({ guest }: { guest: string | null }) {
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
    document.getElementById('undangan-isi')?.focus()
  }, [phase])

  const open = useCallback(() => {
    if (phase !== 'closed') return
    playOpen()
    if (reduced) {
      setPhase('open')
      return
    }
    setPhase('opening')
    window.setTimeout(() => setPhase('open'), 2750)
  }, [phase, reduced])

  return (
    <section
      aria-label="Sampul undangan"
      data-phase={phase}
      className={`cover-stage relative flex flex-col items-center justify-center overflow-hidden bg-cream px-4 ${phase === 'open' ? 'pt-8 pb-2' : 'min-h-dvh py-10'}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,#f7e3bf,transparent_70%)]" />
        <div className="geo-bg geo-fade absolute inset-0 opacity-25" />
        <FloatingStars count={14} />
      </div>

      {phase !== 'open' ? (
        <div className="relative z-10 w-full max-w-[430px]">
          <div className="relative mx-auto aspect-[3/4] w-full [perspective:1400px]">
            <div className="absolute inset-0 rounded-[26px] bg-gradient-to-b from-emerald to-teal shadow-cover" />

            <div className="cover-letter absolute inset-x-[6%] top-[7%] z-20 flex h-[76%] flex-col overflow-hidden rounded-[14px] border-2 border-sand bg-cream px-5 pb-5 pt-[31%] text-center">
              <p className="arabic text-teal" lang="ar" dir="rtl">بسم الله الرحمن الرحيم</p>
              <p className="label mt-2 text-[0.65rem]">Undangan syukuran</p>
              <p className="mt-1 font-display text-[clamp(1.4rem,1rem+1.6vw,1.8rem)] leading-[1.05] font-semibold text-teal">
                Aqiqah <span className="font-normal italic text-terracotta">&amp;</span> Khitanan
              </p>
              <div className="gold-rule mx-auto mt-2.5 w-20" />
              <p className="mt-2.5 text-[0.7rem] text-ink/70">untuk putra kami,</p>
              <p className="font-display text-lg leading-tight font-semibold text-emerald">
                {invitation.child.nickname}
              </p>
            </div>

            <div className="cover-flap absolute inset-x-0 top-0 z-30 flex h-[34%] origin-top justify-center">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_14px_14px_rgba(16,56,58,.28)]">
                <defs>
                  <linearGradient id="flap-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--teal)" />
                    <stop offset=".6" stopColor="var(--emerald)" />
                    <stop offset="1" stopColor="var(--teal)" />
                  </linearGradient>
                  <pattern id="flap-geo" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M4 0l4 4-4 4-4-4z" fill="none" stroke="var(--gold)" strokeWidth=".4" vectorEffect="non-scaling-stroke" opacity=".25" />
                  </pattern>
                </defs>
                <path d="M0 0H100L50 46Z" className="flap-fill" />
                <path d="M0 0H100L50 46Z" fill="url(#flap-geo)" />
                <path d="M4 2.5h92" stroke="var(--gold)" strokeWidth=".5" vectorEffect="non-scaling-stroke" opacity=".7" />
              </svg>
            </div>

            <div className="cover-pocket absolute inset-x-0 bottom-0 z-40 flex h-[33%] items-end justify-center overflow-hidden rounded-b-[26px] px-4 pb-5">
              <div className="absolute inset-0 bg-gradient-to-b from-teal to-emerald" />
              <div className="pocket-side absolute inset-0" style={{ clipPath: 'polygon(0 0, 50% 38%, 0 100%)' }} />
              <div className="pocket-side absolute inset-0" style={{ clipPath: 'polygon(100% 0, 50% 38%, 100% 100%)' }} />
              <div className="pocket-bottom absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 38%, 100% 100%)' }} />
              <div className="geo-bg absolute inset-x-0 bottom-0 h-1/2 opacity-10" />
              <div className="relative z-10 w-full">
                <p className="text-center text-[0.68rem] font-bold tracking-wide text-gold/90">
                  Kepada
                </p>
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
              className="cover-seal absolute top-[calc(15.6%-2.2rem)] left-[calc(50%-2.2rem)] z-40 flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full border-[4px] border-gold/80 bg-terracotta text-cream shadow-[0_10px_20px_-12px_rgba(16,56,58,.9)]"
            >
              <span aria-hidden="true" className="absolute inset-1.5 rounded-full border border-gold/40" />
              <span className="block h-7 w-7">
                <Star />
              </span>
            </button>

            <div aria-hidden="true" className="peek-corner absolute -top-[16%] right-[4%] z-10 w-[30%]">
              <img
                src="/img/boy-wave.webp"
                alt=""
                width={525}
                height={900}
                fetchPriority="high"
                className="cover-kids w-full drop-shadow-[0_14px_18px_rgba(16,56,58,.22)]"
              />
            </div>
            <div aria-hidden="true" className="peek-corner absolute -top-[13%] left-[4%] z-10 w-[28%]">
              <img
                src="/img/girl.webp"
                alt=""
                width={593}
                height={900}
                className="cover-kids w-full drop-shadow-[0_14px_18px_rgba(16,56,58,.2)]"
              />
            </div>

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
      ) : (
        <div
          id="undangan-isi"
          tabIndex={-1}
          className="relative z-10 max-w-[32rem] text-center outline-none"
        >
          <img
            src="/img/boy-wave.webp"
            alt="Ilustrasi anak melambaikan tangan menyambut tamu"
            width={525}
            height={900}
            className="mx-auto h-44 w-auto"
          />
          <p className="label mt-2">Undangan terbuka</p>
          <h1 className="mt-1 text-h1 text-teal">Selamat datang!</h1>
          <p className="mt-3 text-ink/80">
            Terima kasih sudah membuka undangan {invitation.child.nickname}. Kisahnya dimulai dari sini.
          </p>
          <a href="#salam" className="btn-primary mt-6">
            Lanjut ke undangan
          </a>
        </div>
      )}

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .cover-stage[data-phase="closed"] .cover-hit,
          .cover-stage[data-phase="closed"] .cover-seal { animation: seal 2.6s ease-in-out infinite; }
          .cover-stage[data-phase="closed"] .cover-kids { animation: bob 3.6s ease-in-out infinite; transform-origin: 50% 100%; }
          .cover-stage[data-phase="opening"] .cover-flap {
            transform: rotateX(-165deg) translateY(-6%);
            transition: transform 950ms cubic-bezier(.55,.05,.3,1), opacity 250ms ease 700ms;
            opacity: 0;
          }
          .cover-stage[data-phase="opening"] .cover-seal {
            opacity: 0;
            transform: scale(.3);
            transition: opacity 240ms ease, transform 360ms cubic-bezier(.4,0,.7,.4);
          }
          .cover-stage[data-phase="opening"] .cover-letter {
            z-index: 45;
            transform: translateY(-6%) scale(1.03);
            transition: transform 1200ms cubic-bezier(.34,1.12,.4,1) 500ms;
          }
          .cover-stage[data-phase="opening"] .cover-pocket {
            opacity: 0;
            transform: translateY(10%);
            transition: opacity 600ms ease 1500ms, transform 700ms ease 1500ms;
          }
          .cover-stage[data-phase="opening"] .peek-corner {
            opacity: 0;
            transform: translateY(-14%);
            transition: opacity 500ms ease 900ms, transform 900ms ease 900ms;
          }
          .cover-stage[data-phase="opening"] .confetti { animation: confetti-fall 1900ms cubic-bezier(.2,.6,.3,1) 500ms both; }
          .cover-stage[data-phase="opening"] .gold-particle { animation: gold-rise 1800ms ease-out 700ms both; }
        }
        .cover-letter { transition: transform 400ms ease; }
        .cover-flap { transition: transform 400ms ease; }
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