'use client'

import { motion, useReducedMotion } from 'motion/react'
import { calendarUrls, eventDate, eventTitleParts, formatEventDay, invitation, sectionShown } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'
import Countdown from './Countdown'

const OCCASION_TONE = ['bg-terracotta', 'bg-emerald', 'bg-teal']

export default function EventDetails() {
  const reduced = useReducedMotion()
  const start = eventDate()
  const cal = calendarUrls(invitation)
  const occasions = eventTitleParts()

  return (
    <section
      id="acara"
      className="relative overflow-hidden px-4 py-16 sm:py-20"
      aria-labelledby="acara-title"
    >
      <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label">Waktu dan Tempat</p>
            <h2 id="acara-title" className="mt-2 text-h2 text-teal">
              Hari Bahagia Kami
            </h2>
          </Reveal>
          {/* <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {occasions.map((occasion, i) => (
                <span
                  key={occasion}
                  className={`rounded-md px-3 py-1.5 text-sm font-bold text-cream ${OCCASION_TONE[i % OCCASION_TONE.length]}`}
                >
                  {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                </span>
              ))}
            </div>
          </Reveal> */}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border-2 border-teal bg-cream shadow-lift">
              <div className="flex items-center justify-between bg-teal px-5 py-3 text-cream">
                <p className="font-display text-lg leading-tight">{invitation.event.title}</p>
                <span aria-hidden="true" className="h-6 w-6 text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 10h18M8 3v4M16 3v4" />
                  </svg>
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 p-5">
                <motion.div
                  initial={reduced ? false : { scale: 0.86, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                  className="flex h-24 w-24 flex-col items-center justify-center rounded-md border-2 border-sand bg-cream-deep"
                >
                  <span className="text-xs font-bold text-emerald">
                    {start.toLocaleString('id-ID', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="font-display text-5xl leading-none font-semibold text-teal [font-variant-numeric:lining-nums]">
                    {start.getDate()}
                  </span>
                </motion.div>
                <div>
                  <p className="font-bold text-teal">{formatEventDay(start)}</p>
                  <p className="text-sm text-ink/70">untuk {invitation.child.nickname}</p>
                  <p className="text-sm text-ink/80">
                    {invitation.event.startTime.replace(':', '.')}&ndash;
                    {invitation.event.endTime.replace(':', '.')} {invitation.event.timezoneLabel}
                  </p>
                  <p className="mt-1 text-sm text-ink/70">{invitation.venue.name}</p>
                </div>

                <div className="col-span-2 flex flex-wrap items-center gap-3 border-t border-dashed border-sand pt-4">
                  <a href={cal.google} target="_blank" rel="noreferrer" className="btn-ghost">
                    Simpan ke Google Calendar
                  </a>
                  {/* <a href="/api/calendar" download="aqiqah-khitanan.ics" className="btn-ghost">
                    Unduh .ics
                  </a> */}
                </div>
              </div>
            </div>
          </Reveal>

          <div className={`flex flex-col gap-6 ${sectionShown('dresscode') ? '' : 'justify-center'}`}>
            <Reveal delay={0.1}>
              <Countdown />
            </Reveal>
            {sectionShown('dresscode') && (
            <Reveal delay={0.2}>
              <div className="flex items-end gap-3">
                <img
                  src="/img/boy-point.webp"
                  alt="Anak menunjuk ke arah tanggal acara"
                  width={583}
                  height={900}
                  loading="lazy"
                  className="h-44 w-auto flex-none self-end"
                />
                <div className="mb-3 flex-1 rounded-lg rounded-bl-none border border-sand bg-cream px-4 py-3 shadow-note">
                  <p className="text-sm font-bold text-teal">Kode pakaian</p>
                  <p className="mt-1 text-sm text-ink/80">
                    Mohon kenakan <span className="font-bold">{invitation.event.dressCode}</span>
                  </p>
                </div>
              </div>
            </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
