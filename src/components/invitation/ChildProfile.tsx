'use client'

import { motion, useReducedMotion } from 'motion/react'
import { invitation, fullDateText, ageInMonths } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'
import FloatingStars from '@/components/ui/FloatingStars'
import ChildPhoto from './ChildPhoto'

export default function ChildProfile() {
  const reduced = useReducedMotion()
  const { child } = invitation
  const age = ageInMonths(child.birthDate)
  // Real age appears only when a birth date is configured.
  const ageBadge = Number.isFinite(age) ? String(age) : '1'

  return (
    <section
      id="profil"
      className="relative overflow-hidden bg-cream-deep/60 px-4 py-16 sm:py-20"
      aria-labelledby="profil-title"
    >
      <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-25" />
      <FloatingStars count={10} />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="label">Perkenalan</p>
          <h2 id="profil-title" className="mt-2 text-h2 text-teal">
            Kenalan dengan {child.nickname}
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.9, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[380px]"
          >
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-t-[999px] rounded-b-xl border border-emerald/25" />
            <div className="absolute left-0 top-2 z-10 flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-full border-[3px] border-cream bg-terracotta text-cream shadow-lift">
              <span className="font-body text-xl leading-none font-extrabold">{ageBadge}</span>
              <span className="text-[0.6rem] font-bold tracking-wide">bulan</span>
            </div>
            <ChildPhoto
              src={child.photo}
              fallback={child.profileIllustration || child.illustration}
              alt={`Ilustrasi ${child.fullName}`}
              name={child.nickname}
            />
          </motion.div>

          <div>
            <Reveal delay={0.18}>
              <dl className="mt-6 space-y-4 rounded-lg border border-sand bg-cream p-5 shadow-note">
                <div>
                  <dt className="label">Nama lengkap</dt>
                  <dd className="mt-0.5 font-bold text-teal">{child.fullName}</dd>
                </div>
                <div>
                  <dt className="label">Tempat, tanggal lahir</dt>
                  <dd className="mt-0.5 font-bold text-teal">{fullDateText(invitation)}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="mt-6 max-w-prose text-sm text-ink/75">
                Saat ini {child.nickname} berusia{' '}
                <span className="font-bold text-teal">{ageBadge} bulan</span> dan masih belajar
                tersenyum setiap hari. Doamu untuknya kami simpan baik-baik.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-5 text-sm font-bold tracking-wide text-emerald">Putra dari</p>
              <p className="mt-1 font-display text-xl text-teal">
                {invitation.parents.father}
                <span className="mx-2 text-terracotta">&amp;</span>
                {invitation.parents.mother}
              </p>
            </Reveal>

            <Reveal delay={0.38}>
              <blockquote className="mt-5 max-w-prose rounded-md border-l-4 border-gold bg-cream/80 px-4 py-3 text-sm text-ink/85 italic">
                &ldquo;{invitation.gk.blessing}&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
