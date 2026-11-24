'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { invitation } from '@/lib/invitation'
import { playSuccess } from '@/lib/sound'
import Reveal from '@/components/ui/Reveal'
import type { Wish } from '@/lib/wishes'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

const attendanceLabels: Record<Wish['attendance'], string> = {
  hadir: 'InsyaAllah hadir',
  ragu: 'Belum pasti',
  tidak: 'Belum bisa hadir',
}

export default function WishesSection() {
  const reduced = useReducedMotion()
  const [wishes, setWishes] = useState<Wish[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [attendance, setAttendance] = useState<Wish['attendance']>('hadir')
  const [showCards, setShowCards] = useState(false)

  // State changes only after the request settles, so the effect never cascades.
  const loadWishes = async (): Promise<{ list: Wish[]; failed: boolean }> => {
    try {
      const res = await fetch('/api/wishes', { cache: 'no-store' })
      if (!res.ok) throw new Error(String(res.status))
      const data: unknown = await res.json()
      const list =
        data && typeof data === 'object' && 'wishes' in data && Array.isArray(data.wishes)
          ? (data.wishes as Wish[])
          : []
      return { list, failed: false }
    } catch {
      return { list: [], failed: true }
    }
  }

  useEffect(() => {
    let alive = true
    void loadWishes().then(({ list, failed }) => {
      if (!alive) return
      setWishes(list)
      setLoadError(failed)
    })
    return () => {
      alive = false
    }
  }, [])

  const reload = async () => {
    const { list, failed } = await loadWishes()
    setWishes(list)
    setLoadError(failed)
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (name.trim().length < 2) nextErrors.name = 'Tulis nama Bapak/Ibu, minimal 2 huruf.'
    if (message.trim().length < 3) nextErrors.message = 'Tulis doa atau harapan untuk putra kami.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setState('sending')
    setServerError('')
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, attendance, website: (new FormData(event.currentTarget).get('website') as string) || '' }),
      })
      const data: unknown = await res.json().catch(() => null)
      if (!res.ok) {
        const record = data && typeof data === 'object' ? data : {}
        if ('errors' in record && record.errors && typeof record.errors === 'object') {
          const fieldErrors = Object.entries(record.errors).filter(
            (entry): entry is [string, string] => typeof entry[1] === 'string',
          )
          setErrors(Object.fromEntries(fieldErrors))
        }
        setServerError(
          'error' in record && typeof record.error === 'string'
            ? record.error
            : 'Doa belum terkirim. Coba lagi sebentar.',
        )
        setState('error')
        return
      }
      setConfirmation(name.trim())
      setState('sent')
      setName('')
      setMessage('')
      setAttendance('hadir')
      playSuccess()
      void reload()
    } catch {
      setServerError('Koneksi terputus. Coba kirim sekali lagi.')
      setState('error')
    }
  }

  return (
    <section
      id="doa"
      className="relative overflow-hidden bg-night px-4 py-20 text-cream sm:py-24"
      aria-labelledby="doa-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'var(--geo-tile)', backgroundSize: '120px 120px' }}
      />
      <div aria-hidden="true" className="absolute inset-0">
        {Array.from({ length: 14 }, (_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold animate-twinkle"
            style={{
              left: `${6 + ((i * 61) % 88)}%`,
              top: `${4 + ((i * 23) % 80)}%`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label text-gold">Doa dan harapan</p>
          <h2 id="doa-title" className="mt-2 text-h2 text-cream">
            Doa Bapak/Ibu Sangat Berarti bagi Kami
          </h2>
          <p className="mt-4 text-cream/80">
            Doa dan harapan terbaik dari Bapak/Ibu/Saudara/i akan menjadi hadiah yang sangat berarti bagi
            tumbuh kembang putra kami.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          {/* lantern illustration */}
          <Reveal>
            <figure className="relative overflow-hidden rounded-lg border-2 border-gold/40">
              <img
                src="/img/wishes-hero.webp"
                alt="Ilustrasi kakak beradik berbaju koko duduk di atas sajadah sambil mengangkat lentera, dengan masjid berkubah di belakangnya"
                width={1400}
                height={788}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-night/70 px-4 py-2 text-xs font-semibold text-cream">
                Terima Kasih atas semua doa doa baiknya.
              </figcaption>
            </figure>
          </Reveal>

          {/* form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              noValidate
              className="rounded-lg border border-gold/40 bg-cream p-5 text-ink shadow-lift sm:p-6"
            >
              <AnimatePresence mode="wait" initial={false}>
                {state === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 text-center"
                  >
                    <motion.img
                      src="/img/boy-doa.webp"
                      alt=""
                      width={400}
                      height={900}
                      className="mx-auto h-40 w-auto"
                      animate={reduced ? undefined : { rotate: [0, -3, 3, 0] }}
                      transition={{ duration: 1.2, repeat: 2 }}
                    />
                    <p className="mt-3 font-display text-2xl text-teal">Alhamdulillah</p>
                    <p className="mt-2 text-sm text-ink/80">
                      Terima kasih, {confirmation}. Doa Bapak/Ibu sudah kami terima. Semoga Allah membalas
                      kebaikan Bapak/Ibu dengan yang berlipat.
                    </p>
                    <button type="button" onClick={() => setState('idle')} className="btn-ghost mt-5">
                      Tulis doa lagi
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={false} exit={{ opacity: 0 }}>
                    <h3 className="font-display text-2xl text-teal">Titipkan doa</h3>
                    <p className="mt-1 text-sm text-ink/70">Kolom bertanda * wajib diisi.</p>

                    <div className="mt-4">
                      <label htmlFor="wish-name" className="text-sm font-bold text-teal">
                        Nama pengirim <span className="text-terracotta">*</span>
                      </label>
                      <input
                        id="wish-name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={60}
                        autoComplete="name"
                        placeholder="Nama Bapak/Ibu"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'wish-name-error' : undefined}
                        className="mt-1.5 w-full rounded-md border-2 border-sand bg-white px-3 py-2.5 text-ink placeholder:text-ink/60 focus:border-emerald"
                      />
                      {errors.name && (
                        <p id="wish-name-error" className="mt-1 text-sm font-semibold text-terracotta">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label htmlFor="wish-message" className="text-sm font-bold text-teal">
                        Ucapan dan doa <span className="text-terracotta">*</span>
                      </label>
                      <div className="flex items-center justify-between">
                        <span className="sr-only">Ucapan dan doa</span>
                        <span id="wish-message-count" className="ml-auto text-xs text-ink/65">
                          {message.length}/400
                        </span>
                      </div>
                      <textarea
                        id="wish-message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={400}
                        rows={4}
                        placeholder="Tulis doa atau harapan untuk putra kami"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'wish-message-error' : 'wish-message-count'}
                        className="mt-1.5 w-full resize-y rounded-md border-2 border-sand bg-white px-3 py-2.5 text-ink placeholder:text-ink/60 focus:border-emerald"
                      />
                      {errors.message && (
                        <p id="wish-message-error" className="mt-1 text-sm font-semibold text-terracotta">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label htmlFor="wish-website">Website</label>
                      <input id="wish-website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <fieldset className="mt-4">
                      <legend className="text-sm font-bold text-teal">Kehadiran</legend>
                      <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
                        {(Object.keys(attendanceLabels) as Wish['attendance'][]).map((value) => (
                          <label
                            key={value}
                            className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border-2 px-2 py-2 text-center text-sm font-semibold transition-colors ${
                              attendance === value
                                ? 'border-emerald bg-emerald text-cream'
                                : 'border-sand bg-white text-teal hover:border-emerald'
                            }`}
                          >
                            <input
                              type="radio"
                              name="attendance"
                              value={value}
                              checked={attendance === value}
                              onChange={() => setAttendance(value)}
                              className="sr-only"
                            />
                            {attendanceLabels[value]}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {serverError && (
                      <p role="alert" className="mt-4 rounded-md border border-terracotta bg-terracotta/10 px-3 py-2 text-sm font-semibold text-[#8a3b24]">
                        {serverError}
                      </p>
                    )}

                    <button type="submit" disabled={state === 'sending'} className="btn-primary mt-5 w-full disabled:opacity-70">
                      {state === 'sending' ? 'Mengirim doa...' : 'Kirim Doa'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>

        {invitation.wishes.showPublicWishes && (
          <div className="mt-12">
            <Reveal>
              <h3 className="font-display text-2xl text-gold">Doa yang Sudah Sampai</h3>
            </Reveal>

            {wishes === null && (
              <p role="status" className="mt-4 text-sm text-cream/75">
                Memuat doa-doa yang sudah masuk...
              </p>
            )}
            {loadError && wishes !== null && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-gold/40 bg-teal/40 px-4 py-3 text-sm">
                <span>Daftar doa belum bisa dimuat.</span>
                <button type="button" onClick={() => void reload()} className="font-bold text-gold underline underline-offset-2">
                  Coba muat ulang
                </button>
              </div>
            )}
            {wishes !== null && wishes.length === 0 && !loadError && (
              <p className="mt-4 rounded-md border border-dashed border-gold/40 px-4 py-6 text-center text-sm text-cream/80">
                Belum ada doa yang tercatat. Bapak/Ibu dapat menjadi yang pertama menuliskan doa.
              </p>
            )}
            {wishes !== null && wishes.length > 0 && !showCards && (
              <button type="button" onClick={() => setShowCards(true)} className="mt-4 inline-flex min-h-11 items-center rounded-md border-2 border-gold px-5 py-2 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-night">
                Lihat {wishes.length} doa yang sudah masuk
              </button>
            )}
            {wishes !== null && wishes.length > 0 && showCards && (
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishes.slice(0, 12).map((wish, i) => (
                  <Reveal as="li" key={wish.id} delay={Math.min(i, 5) * 0.05}>
                    <article className="h-full rounded-md border border-gold/30 bg-cream/95 p-4 text-ink shadow-note">
                      <p className="text-sm leading-relaxed text-ink/85">{wish.message}</p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-sand pt-2">
                        <span className="text-sm font-bold text-teal">{wish.name}</span>
                        <span className="rounded-sm bg-emerald/10 px-2 py-0.5 text-xs font-semibold text-emerald">
                          {attendanceLabels[wish.attendance]}
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
