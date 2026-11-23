'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { eventTitleParts, invitation } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'
import HagiaSkyline from '@/components/ui/HagiaSkyline'

export default function OpeningGreeting() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const domeY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })
  const occasion = eventTitleParts().join(" dan ")

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

      <div className="relative mx-auto max-w-[40rem] text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 0.8, 0.3, 1] }}
          className="mx-auto w-[clamp(8rem,26vw,11rem)]"
        >
          <img
            src={invitation.child.illustration}
            alt="Ilustrasi bayi laki-laki berbaju koko putih dan peci, duduk di antara bantal"
            width={900}
            height={900}
            loading="lazy"
            className="mx-auto h-auto w-full"
          />
        </motion.div>

        <Reveal delay={0.08}>
          <p className="arabic mt-2 text-emerald" lang="ar" dir="rtl">بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-4 text-lg leading-relaxed text-ink/85">
            Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri syukuran{' '}
            <span className="font-semibold text-teal">
              {occasion}
            </span>{' '}
            putra kami
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <h2 id="salam-title" className="mt-4 text-h2 text-teal">
            {invitation.child.nickname}
          </h2>
          <div className="gold-rule mx-auto mt-4 w-28" />
          <p className="mt-4 text-sm font-bold tracking-wide text-emerald">Putra dari</p>
          <p className="mt-1 font-display text-2xl text-teal">
            {invitation.parents.father}
            <span className="mx-2 text-terracotta">&amp;</span>
            {invitation.parents.mother}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
