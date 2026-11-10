/* Декоративные детские элементы: облака, солнце, звёзды, радуга, волны. */

type D = { className?: string; style?: React.CSSProperties };

export const Cloud = ({ className, style }: D) => (
  <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden>
    <path
      d="M30 60a22 22 0 0 1-2-44A28 28 0 0 1 81 12a20 20 0 0 1 21 15 17 17 0 0 1-2 33Z"
      fill="currentColor"
    />
  </svg>
);

export const Sun = ({ className, style }: D) => (
  <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
    <g className="origin-center animate-[spin_40s_linear_infinite]" style={{ transformBox: "fill-box" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="47"
          y="2"
          width="6"
          height="15"
          rx="3"
          fill="#FFC94D"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </g>
    <circle cx="50" cy="50" r="27" fill="#FFDB85" />
    <circle cx="50" cy="50" r="27" fill="url(#sunGlow)" />
    <circle cx="41" cy="46" r="2.6" fill="#7A4B0F" />
    <circle cx="59" cy="46" r="2.6" fill="#7A4B0F" />
    <path d="M41 56c5 5 13 5 18 0" stroke="#7A4B0F" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <circle cx="36" cy="54" r="3.5" fill="#FFAE8A" opacity=".7" />
    <circle cx="64" cy="54" r="3.5" fill="#FFAE8A" opacity=".7" />
    <defs>
      <radialGradient id="sunGlow" cx=".35" cy=".3" r=".8">
        <stop offset="0" stopColor="#fff" stopOpacity=".55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const Star = ({ className, style }: D) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
    <path
      d="M12 1.8l2.9 6.2 6.8.8-5 4.6 1.3 6.8L12 16.9 6 20.2l1.3-6.8-5-4.6 6.8-.8Z"
      fill="currentColor"
      strokeLinejoin="round"
    />
  </svg>
);

export const Rainbow = ({ className, style }: D) => (
  <svg viewBox="0 0 200 110" className={className} style={style} aria-hidden fill="none" strokeLinecap="round">
    <path d="M14 104a86 86 0 0 1 172 0" stroke="#FF9AA2" strokeWidth="13" />
    <path d="M30 104a70 70 0 0 1 140 0" stroke="#FFDB85" strokeWidth="13" />
    <path d="M46 104a54 54 0 0 1 108 0" stroke="#9BE3B5" strokeWidth="13" />
    <path d="M62 104a38 38 0 0 1 76 0" stroke="#77C9F4" strokeWidth="13" />
  </svg>
);

/** Волнистый переход между секциями. `fill` — цвет следующей секции. */
export const Wave = ({ fill = "#fff", flip = false, className = "" }: { fill?: string; flip?: boolean; className?: string }) => (
  <svg
    viewBox="0 0 1440 90"
    preserveAspectRatio="none"
    className={`block w-full h-10 md:h-16 ${flip ? "rotate-180" : ""} ${className}`}
    aria-hidden
  >
    <path
      d="M0 48c120-30 240-40 360-22s240 50 360 46 240-44 360-52 240 18 360 30v40H0Z"
      fill={fill}
    />
  </svg>
);

/* ---------- Иллюстрации продуктов для раздела «Питание» ---------- */

export const Apple = ({ className }: D) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M32 18c-6-5-20-4-21 11-1 13 9 28 15 28 3 0 4-2 6-2s3 2 6 2c6 0 16-15 15-28-1-15-15-16-21-11Z" fill="#FF7A7A" />
    <path d="M20 28c0-5 3-8 7-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" fill="none" />
    <path d="M32 18c0-5 1-9 4-12" stroke="#8A5A2B" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M35 12c4-5 11-5 13-3-2 5-9 6-13 3Z" fill="#5CC98A" />
  </svg>
);

export const Carrot = ({ className }: D) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M44 20 12 54c-2 2 0 4 2 2l34-32Z" fill="#FF9F43" />
    <path d="M44 20c-6-6-14-5-17 0l-13 33c10-6 30-25 30-33Z" fill="#FFAE5C" />
    <path d="M24 34l4 3M19 43l4 3M30 27l4 3" stroke="#E07B1E" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 20c2-6 6-10 12-11-1 6-5 10-12 11Zm0 0c-1-6 1-12 6-15 1 5-1 11-6 15Zm0 0c6-1 11 1 14 5-5 2-10 0-14-5Z" fill="#5CC98A" />
  </svg>
);

export const Milk = ({ className }: D) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M22 6h20v8l6 10v32a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V24l6-10Z" fill="#fff" stroke="#77C9F4" strokeWidth="3" strokeLinejoin="round" />
    <path d="M16 34h32v14H16Z" fill="#DDF3FF" />
    <path d="M22 6h20v8H22Z" fill="#77C9F4" />
    <circle cx="32" cy="41" r="4" fill="#2378B8" />
  </svg>
);

export const Bread = ({ className }: D) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M10 30c0-10 10-16 22-16s22 6 22 16c0 4-3 5-5 6v16a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V36c-2-1-5-2-5-6Z" fill="#F7C67A" />
    <path d="M15 36c-2-1-5-2-5-6 0-10 10-16 22-16s22 6 22 16c0 4-3 5-5 6" stroke="#D99A45" strokeWidth="3" fill="none" />
    <path d="M24 26l4 4M32 24l4 4M40 26l4 4" stroke="#D99A45" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Bowl = ({ className }: D) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M24 16c0-4 4-4 4-8M32 16c0-4 4-4 4-8M40 16c0-4 4-4 4-8" stroke="#77C9F4" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M6 28h52c0 14-11 26-26 26S6 42 6 28Z" fill="#2378B8" />
    <path d="M6 28h52" stroke="#1B5F93" strokeWidth="3" strokeLinecap="round" />
    <path d="M14 34c2 6 6 10 12 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".5" fill="none" />
  </svg>
);

export const Pear = ({ className }: D) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M32 14c-6 0-8 6-8 12 0 4-10 9-10 19 0 8 8 13 18 13s18-5 18-13c0-10-10-15-10-19 0-6-2-12-8-12Z" fill="#B9E37A" />
    <path d="M32 14c0-4 1-7 3-9" stroke="#8A5A2B" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M22 44c0-4 2-7 5-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".55" fill="none" />
  </svg>
);
