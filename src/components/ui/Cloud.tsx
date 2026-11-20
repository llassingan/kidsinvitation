export default function Cloud({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 60" className={`animate-[float_9s_ease-in-out_infinite] ${className}`} style={style} aria-hidden="true">
      <path
        d="M18 52c-9 0-16-6-16-14S9 24 18 24c1-11 10-19 22-19 10 0 18 6 21 15 2-1 4-1 6-1 9 0 16 7 16 16s-7 16-16 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
