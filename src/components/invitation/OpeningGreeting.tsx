'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { invitation } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'
import HagiaSkyline from '@/components/ui/HagiaSkyline'

export default function OpeningGreeting() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const domeY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })

  return (
    <section ref={ref} id="salam" className="relative overflow-hidden px-4 pt-12 pb-16 sm:pt-16" aria-labelledby="salam-title">
      <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-[0.18]" />

      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: domeY }}
        className="pointer-events-none absolute inset-x-0 bottom-1 mx-auto w-[1400px] max-w-none text-sand/25"
      >
        <HagiaSkyline className="w-full" />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-[1.05fr_.95fr] md:gap-12">
        <div className="relative order-2 md:order-1">
          <motion.div
            className="relative mx-auto w-full max-w-[430px]"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 0.8, 0.3, 1] }}
          >
            <div className="relative mx-auto w-full max-w-[430px]">
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
            </div>
          </motion.div>
        </div>

        <div className="order-1 md:order-2 md:pb-10">
          <Reveal>
            <p className="arabic text-emerald" lang="ar" dir="rtl">السلام عليكم ورحمة الله وبركاته</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="salam-title" className="mt-4 text-h2 text-teal">
              Assalamu&apos;alaikum,<br />
              <span className="italic text-emerald">Bapak/Ibu sekalian</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-prose text-ink/85">{invitation.gk.greeting}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-sand/70 bg-cream px-4 py-3 text-sm font-semibold text-teal shadow-note">
              <span>{invitation.parents.father}</span>
              <span className="text-terracotta">&amp;</span>
              <span>{invitation.parents.mother}</span>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}
