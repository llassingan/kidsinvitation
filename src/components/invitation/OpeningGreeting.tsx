'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { eventTitleParts, invitation } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'
import HagiaSkyline from '@/components/ui/HagiaSkyline'

export default function OpeningGreeting() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const domeY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })
  const occasion = eventTitleParts().join(" dan ")
  // The cover already cleaned and capped ?to= in the server render; this page
  // is never prerendered (instant = false), so the same value is here.
  const guest = useSearchParams().get('to')

  return (
    <section ref={ref} id="salam" className="relative overflow-hidden px-4 pt-14 pb-20 sm:pt-20" aria-labelledby="salam-title">
      <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-[0.18]" />

      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: domeY }}
        className="pointer-events-none absolute inset-x-0 bottom-1 mx-auto w-[1400px] max-w-none text-sand/25"
      >
        <HagiaSkyline className="w-full" />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-[1.05fr_.95fr] md:gap-12">
        <motion.div
          className="relative order-2 mx-auto w-full max-w-[min(430px,66vw)] md:order-1 md:!max-w-[430px]"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 0.8, 0.3, 1] }}
        >
          <div aria-hidden="true" className="absolute -bottom-3 left-1/2 h-6 w-[86%] -translate-x-1/2 rounded-[50%] bg-teal/20 blur-[6px]" />
          <div aria-hidden="true" className="absolute inset-0 border-[6px] border-sand bg-teal sm:rounded-t-[999px] [clip-path:url(#ottoman-arch)]" />
          <div aria-hidden="true" className="absolute inset-2 border border-gold/50 [clip-path:url(#ottoman-arch)]" />
          <div className="relative aspect-[4/5] [clip-path:url(#ottoman-arch)]">
            <img
              src={invitation.child.illustration}
              alt="Ilustrasi bayi laki-laki berbaju koko putih dan peci, duduk di antara bantal sambil bertepuk tangan"
              width={900}
              height={900}
              loading="eager"
              className="h-full w-full object-cover object-[50%_42%]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-cream/90 via-cream/40 to-transparent" />
          </div>
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <clipPath id="ottoman-arch" clipPathUnits="objectBoundingBox">
                <path d="M0.5 0 C0.34 0.02 0.22 0.09 0.13 0.2 C0.05 0.3 0 0.42 0 0.55 V0.97 Q0 1 0.035 1 H0.965 Q1 1 1 0.97 V0.55 C1 0.42 0.95 0.3 0.87 0.2 C0.78 0.09 0.66 0.02 0.5 0 Z" />
              </clipPath>
            </defs>
          </svg>
        </motion.div>

        <div className="order-1 text-center md:order-2 md:pb-10 md:text-left">
          <Reveal>
            <p className="arabic text-emerald" lang="ar" dir="rtl">بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              Dengan memohon rahmat dan ridha Allah SWT, kami mengundang{' '}
              <span className="font-semibold text-teal">{guest ?? 'Bapak/Ibu/Saudara/i'}</span> untuk
              menghadiri syukuran <span className="font-semibold text-teal">{occasion}</span> putra kami
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 id="salam-title" className="mt-4 text-h2 text-teal">
              {invitation.child.fullName}
            </h2>
            <div className="gold-rule mx-auto mt-3 w-28 md:mx-0" />
            <p className="mt-3 text-sm font-bold tracking-wide text-emerald">Putra dari</p>
            <p className="mt-1 font-display text-2xl text-teal">
              <span className="block sm:inline">{invitation.parents.father}</span>
              <span className="my-1 block text-terracotta sm:my-0 sm:mx-2 sm:inline">&amp;</span>
              <span className="block sm:inline">{invitation.parents.mother}</span>
            </p>
          </Reveal>
        </div>
      </div>

    </section>
  )
}
