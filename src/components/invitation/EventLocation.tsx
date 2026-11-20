'use client'

import { motion, useReducedMotion } from 'motion/react'
import { invitation, mapsEmbedUrl, mapsLink } from '@/lib/invitation'
import Reveal from '@/components/ui/Reveal'

export default function EventLocation() {
  const reduced = useReducedMotion()
  const embed = mapsEmbedUrl(invitation)

  return (
    <section
      id="lokasi"
      className="relative overflow-hidden bg-cream-deep/60 px-4 py-16 sm:py-20"
      aria-labelledby="lokasi-title"
    >
      <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="label">Temui kami di sini</p>
          <h2 id="lokasi-title" className="mt-2 max-w-xl text-h2 text-teal">
            Jalan Menuju Rumah Bahagia
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          {/* illustrated map */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg border-[6px] border-sand bg-[#e9efd9] shadow-lift"
          >
            <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" role="img" aria-label="Ilustrasi peta menuju lokasi acara">
              <rect width="400" height="500" fill="#eef1dd" />
              <g stroke="#dbe1c6" strokeWidth="1.2" fill="none">
                <path d="M0 90h400M0 190h400M0 300h400M0 400h400" />
                <path d="M80 0v500M250 0v500M340 0v500" />
              </g>

              <path d="M150 500c0-70 40-90 65-120s10-70-10-90" fill="none" stroke="#f9f1de" strokeWidth="26" strokeLinecap="round" />
              <path d="M150 500c0-70 40-90 65-120s10-70-10-90" fill="none" stroke="#d9ae68" strokeWidth="2.5" strokeDasharray="9 10" strokeLinecap="round" />

              <g fill="#a8c99a" opacity=".9">
                <circle cx="70" cy="120" r="30" />
                <circle cx="96" cy="138" r="22" />
                <circle cx="330" cy="330" r="34" />
                <circle cx="302" cy="352" r="22" />
                <circle cx="58" cy="418" r="26" />
              </g>

              <g>
                {[[268, 96], [318, 150], [96, 250], [330, 430], [206, 240]].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x} ${y})`}>
                    <rect x="-3" y="-2" width="6" height="16" rx="1" fill="#8a6a45" />
                    <circle cx="0" cy="-10" r="13" fill="#287b67" />
                    <circle cx="-9" cy="-4" r="8" fill="#2f8a74" />
                    <circle cx="9" cy="-4" r="8" fill="#2f8a74" />
                  </g>
                ))}
              </g>

              {/* destination mosque on a small hill */}
              <ellipse cx="205" cy="268" rx="86" ry="26" fill="#dfe6c8" />
              <g transform="translate(205 262)">
                <rect x="-46" y="-2" width="92" height="46" rx="3" fill="#fdf6e7" stroke="#174f50" strokeWidth="2" />
                <path d="M-56 -2c0-26 22-46 56-46s56 20 56 46Z" fill="#70c6bb" stroke="#174f50" strokeWidth="2" />
                <path d="M0 -66c-8 8-8 18 0 20 8-2 8-12 0-20Z" fill="#f2d59a" />
                <rect x="-56" y="-46" width="7" height="46" rx="2" fill="#fdf6e7" stroke="#174f50" strokeWidth="1.6" />
                <path d="M-56 -46h7l-3.5-11Z" fill="#fdf6e7" stroke="#174f50" strokeWidth="1.6" />
                <rect x="49" y="-46" width="7" height="46" rx="2" fill="#fdf6e7" stroke="#174f50" strokeWidth="1.6" />
                <path d="M49 -46h7l-3.5-11Z" fill="#fdf6e7" stroke="#174f50" strokeWidth="1.6" />
                <path d="M-14 44V20a14 14 0 0 1 28 0v24" fill="#174f50" />
                <path d="M-30 8h12v12h-12zM18 8h12v12h-12z" fill="#174f50" opacity=".55" />
              </g>

              <g fill="#287b67">
                <circle cx="60" cy="330" r="3" />
                <circle cx="300" cy="392" r="3" />
                <circle cx="120" cy="182" r="3" />
              </g>
            </svg>

            <motion.div
              className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-full"
              animate={reduced ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 40 52" width="40" height="52" aria-hidden="true" className="drop-shadow-[0_8px_10px_rgba(16,56,58,.28)]">
                <path d="M20 50S36 31 36 18A16 16 0 0 0 4 18c0 13 16 32 16 32Z" fill="var(--terracotta)" stroke="var(--cream)" strokeWidth="2.5" />
                <circle cx="20" cy="18" r="6.5" fill="var(--cream)" />
                <circle cx="20" cy="18" r="3" fill="var(--teal)" />
              </svg>
            </motion.div>

            <p className="absolute inset-x-0 bottom-0 bg-teal/90 px-4 py-2 text-center text-sm font-bold text-cream">
              {invitation.venue.name}
            </p>
          </motion.div>

          <div>
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-sand bg-cream p-5 shadow-note">
                <h3 className="font-display text-2xl text-teal">{invitation.venue.name}</h3>
                <p className="mt-2 text-ink/85">{invitation.venue.address}</p>
                <p className="mt-2 text-sm text-ink/70">
                  <span className="font-bold text-emerald">Patokan: </span>
                  {invitation.venue.note}
                </p>
                <a
                  href={mapsLink(invitation)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-5 w-full sm:w-auto"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </Reveal>

            {embed && (
              <Reveal delay={0.2}>
                <div className="mt-5 overflow-hidden rounded-lg border border-sand">
                  <iframe
                    src={embed}
                    title={`Peta lokasi ${invitation.venue.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-64 w-full border-0"
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.25}>
              <div className="mt-6 flex items-end gap-3">
                <img
                  src="/img/boy-lantern.webp"
                  alt="Anak memegang lentera sambil menunggu tamu"
                  width={469}
                  height={900}
                  loading="lazy"
                  className="h-40 w-auto flex-none self-end"
                />
                <p className="mb-2 rounded-lg rounded-bl-none border border-sand bg-cream px-4 py-3 text-sm font-semibold text-teal">
                  Sampai jumpa di sana! Kami sudah siapkan tempat duduk untukmu.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
