type Props = {
  children: React.ReactNode
  className?: string
  /** aria text is not read; this is decoration with a real headline beside it */
  tone?: 'cream' | 'teal'
}

/** Pointed Ottoman arch used as the framing device on every chapter. */
export default function ArchFrame({ children, className = '', tone = 'cream' }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-[999px] ${
        tone === 'cream' ? 'border-[6px] border-sand bg-cream' : 'border-[6px] border-gold/70 bg-teal'
      } ${className}`}
    >
      <div aria-hidden="true" className="geo-bg absolute inset-0 opacity-[0.18]" />
      <div
        aria-hidden="true"
        className={`absolute inset-[10px] rounded-t-[999px] border ${
          tone === 'cream' ? 'border-emerald/30' : 'border-gold/30'
        }`}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
