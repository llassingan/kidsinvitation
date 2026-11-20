'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  /** guest-supplied photo URL from invitation.json; empty means use the illustration */
  src: string
  /** illustrated fallback shown until a real photo is configured */
  fallback: string
  alt: string
  name: string
  priority?: boolean
}

/**
 * Arched portrait niche. The photo keeps its own aspect via object-cover, and a
 * failed or missing URL falls back to the illustration instead of a broken box.
 */
export default function ChildPhoto({ src, fallback, alt, name, priority }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const showPhoto = src.length > 0 && !failed

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-t-[999px] rounded-b-lg border-[7px] border-sand bg-teal shadow-cover">
        {showPhoto ? (
          <>
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`aspect-[4/5] w-full object-cover transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!loaded && (
              <span className="absolute inset-x-0 bottom-6 text-center text-sm font-bold text-cream">
                Memuat foto {name}
              </span>
            )}
          </>
        ) : (
          <img
            src={fallback}
            alt={alt}
            width={900}
            height={900}
            loading={priority ? 'eager' : 'lazy'}
            className="aspect-[4/5] w-full object-cover object-[50%_30%]"
          />
        )}
      </div>
    </figure>
  )
}