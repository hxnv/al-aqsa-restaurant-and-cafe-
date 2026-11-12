import type { ArtKind } from '../data/types';

/**
 * Hand-built editorial illustrations. Every plate is pure SVG and inherits
 * colours from CSS custom properties so it adapts to any section theme:
 *   --plate-fg     primary line colour
 *   --plate-accent accent / highlight colour
 *   --plate-soft   secondary fill
 */
interface PlateProps {
  art: ArtKind;
  className?: string;
}

const S = { fg: 'var(--plate-fg, currentColor)', ac: 'var(--plate-accent, #ff6b4a)', soft: 'var(--plate-soft, rgba(0,0,0,0.08))' };

function MeadHall() {
  return (
    <g>
      <circle cx="200" cy="120" r="62" fill={S.ac} opacity="0.9" />
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1="40" x2="360" y1={60 + i * 7} y2={60 + i * 7} stroke={S.fg} strokeOpacity={0.06} />
      ))}
      <path d="M60 300 L200 150 L340 300 Z" fill={S.soft} stroke={S.fg} strokeWidth="1.5" />
      <path d="M90 300 L200 182 L310 300" fill="none" stroke={S.fg} strokeWidth="1" strokeOpacity="0.6" />
      <path d="M190 150 L200 128 L210 150" fill="none" stroke={S.fg} strokeWidth="1.5" />
      <path d="M185 140 Q178 122 168 126 M215 140 Q222 122 232 126" fill="none" stroke={S.fg} strokeWidth="1.5" />
      <rect x="182" y="250" width="36" height="50" fill={S.ac} />
      <path d="M182 250 Q200 232 218 250" fill={S.ac} />
      {[120, 150, 250, 280].map((x) => (
        <rect key={x} x={x - 4} y={268 - Math.abs(200 - x) * 0.25} width="8" height="12" fill={S.ac} opacity="0.75" />
      ))}
      <line x1="30" x2="370" y1="300" y2="300" stroke={S.fg} strokeWidth="1.5" />
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={30 + ((i * 53) % 340)} cy={30 + ((i * 37) % 90)} r={i % 4 === 0 ? 1.4 : 0.8} fill={S.fg} opacity="0.6" />
      ))}
      <path d="M30 330 Q120 315 200 330 T370 330" fill="none" stroke={S.fg} strokeOpacity="0.4" />
      <path d="M30 350 Q120 335 200 350 T370 350" fill="none" stroke={S.fg} strokeOpacity="0.25" />
    </g>
  );
}

function Dragon() {
  return (
    <g fill="none" stroke={S.fg} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="200" cy="200" r="130" stroke={S.fg} strokeOpacity="0.15" />
      <circle cx="200" cy="200" r="150" strokeDasharray="2 8" strokeOpacity="0.35" />
      <path
        d="M200 70 C290 70 330 140 330 200 C330 280 270 330 200 330 C120 330 70 270 70 200 C70 130 120 90 170 80"
        stroke={S.ac}
        strokeWidth="14"
        strokeOpacity="0.9"
      />
      <path
        d="M200 70 C290 70 330 140 330 200 C330 280 270 330 200 330 C120 330 70 270 70 200 C70 130 120 90 170 80"
        strokeDasharray="1 11"
        strokeWidth="6"
        stroke={S.fg}
      />
      <path d="M170 80 L150 62 L176 66 L168 48 L190 70" fill={S.ac} stroke={S.fg} />
      <circle cx="168" cy="70" r="2.4" fill={S.fg} />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return <path key={i} d={`M${200 + Math.cos(a) * 112} ${200 + Math.sin(a) * 112} l${Math.cos(a) * 14} ${Math.sin(a) * 14}`} strokeOpacity="0.6" />;
      })}
      <path d="M200 150 L215 200 L200 250 L185 200 Z" fill={S.ac} fillOpacity="0.85" />
      <circle cx="200" cy="200" r="6" fill={S.fg} />
    </g>
  );
}

function Manuscript() {
  const runes = 'ᚠᚢᚦᚩᚱᚳᚷᚹᚻᚾᛁᛄᛇᛈᛉᛋᛏᛒᛖᛗᛚᛝᛟᛞ';
  return (
    <g>
      <rect x="70" y="40" width="260" height="320" fill={S.soft} stroke={S.fg} strokeOpacity="0.5" />
      <path d="M70 40 Q60 200 70 360" fill="none" stroke={S.fg} strokeOpacity="0.3" />
      <rect x="95" y="65" width="64" height="64" fill={S.ac} />
      <text x="127" y="117" textAnchor="middle" fontFamily="var(--font-medieval)" fontSize="56" fill={S.fg}>
        H
      </text>
      {Array.from({ length: 14 }).map((_, i) => (
        <text
          key={i}
          x={i < 4 ? 170 : 95}
          y={80 + i * 19}
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="3"
          fill={S.fg}
          opacity={0.75 - (i % 3) * 0.12}
        >
          {Array.from({ length: i < 4 ? 11 : 17 })
            .map((_, j) => runes[(i * 7 + j * 3) % runes.length])
            .join('')}
        </text>
      ))}
      <path d="M260 330 q20 -30 50 -10 q-30 0 -36 30 z" fill={S.ac} opacity="0.85" />
      <circle cx="300" cy="70" r="14" fill="none" stroke={S.ac} strokeWidth="2" />
    </g>
  );
}

function Eye() {
  return (
    <g fill="none" stroke={S.fg} strokeWidth="1.5">
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return <line key={i} x1={200 + Math.cos(a) * 120} y1={200 + Math.sin(a) * 120} x2={200 + Math.cos(a) * 170} y2={200 + Math.sin(a) * 170} strokeOpacity={i % 2 ? 0.25 : 0.6} />;
      })}
      <path d="M50 200 Q200 60 350 200 Q200 340 50 200 Z" fill={S.soft} />
      <circle cx="200" cy="200" r="70" fill={S.ac} stroke="none" />
      <circle cx="200" cy="200" r="70" />
      <circle cx="200" cy="200" r="30" fill={S.fg} stroke="none" />
      <circle cx="214" cy="186" r="9" fill={S.soft} stroke="none" />
      <circle cx="200" cy="200" r="100" strokeDasharray="3 6" strokeOpacity="0.5" />
    </g>
  );
}

function Mask() {
  return (
    <g strokeWidth="1.6" stroke={S.fg}>
      <path d="M90 110 Q90 70 150 70 Q200 70 200 110 L200 230 Q200 300 145 300 Q90 300 90 230 Z" fill={S.ac} />
      <path d="M200 110 Q200 70 250 70 Q310 70 310 110 L310 230 Q310 300 255 300 Q200 300 200 230 Z" fill={S.soft} />
      <path d="M118 150 q16 -14 32 0" fill="none" />
      <path d="M118 154 q16 12 32 0" fill={S.fg} />
      <path d="M250 150 q16 14 32 0" fill="none" />
      <path d="M250 146 q16 -12 32 0" fill={S.fg} />
      <path d="M120 240 q25 22 50 0" fill="none" strokeWidth="2.4" />
      <path d="M230 255 q25 -22 50 0" fill="none" strokeWidth="2.4" />
      <line x1="200" y1="40" x2="200" y2="360" strokeDasharray="2 6" strokeOpacity="0.5" />
      <circle cx="200" cy="200" r="175" fill="none" strokeOpacity="0.15" />
    </g>
  );
}

function Arc() {
  return (
    <g fill="none" stroke={S.fg} strokeWidth="1.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1="40" x2="360" y1={80 + i * 30} y2={80 + i * 30} strokeOpacity="0.08" />
      ))}
      <path d="M40 300 L110 300 L220 100 L290 250 L360 260" strokeWidth="2.5" />
      <path d="M40 300 L110 300 L220 100 L290 250 L360 260 L360 320 L40 320 Z" fill={S.soft} stroke="none" />
      {[
        [75, 300, 'I'],
        [165, 200, 'II'],
        [220, 100, 'III'],
        [255, 175, 'IV'],
        [325, 255, 'V'],
      ].map(([x, y, n]) => (
        <g key={n as string}>
          <circle cx={x as number} cy={y as number} r={n === 'III' ? 12 : 6} fill={n === 'III' ? S.ac : S.fg} stroke="none" />
          <text x={x as number} y={(y as number) - 20} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={S.fg} stroke="none">
            {n}
          </text>
        </g>
      ))}
      <text x="220" y="62" textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill={S.ac} stroke="none">
        climax
      </text>
    </g>
  );
}

function Quill() {
  return (
    <g strokeWidth="1.5" stroke={S.fg} fill="none">
      <path d="M300 50 C220 80 150 170 120 300 C190 240 270 160 300 50 Z" fill={S.ac} />
      <path d="M300 50 C240 130 180 210 120 300" />
      {Array.from({ length: 10 }).map((_, i) => {
        const t = 0.1 + i * 0.08;
        const x = 300 - 180 * t;
        const y = 50 + 250 * t;
        return <path key={i} d={`M${x} ${y} l${-22 + i} ${-6 - i}`} strokeOpacity="0.55" />;
      })}
      <path d="M120 300 L105 335" strokeWidth="2.5" />
      <path d="M60 350 C110 330 150 365 200 345 S290 335 340 350" strokeWidth="2" />
      <circle cx="104" cy="338" r="4" fill={S.fg} />
    </g>
  );
}

function Quotes() {
  return (
    <g>
      <text x="40" y="300" fontFamily="var(--font-display)" fontSize="380" fill={S.ac} opacity="0.95">
        “
      </text>
      <text x="200" y="400" fontFamily="var(--font-display)" fontSize="380" fill={S.fg} opacity="0.85">
        ”
      </text>
      <line x1="60" x2="340" y1="330" y2="330" stroke={S.fg} strokeOpacity="0.3" />
    </g>
  );
}

function Lens() {
  return (
    <g stroke={S.fg} strokeWidth="1.5" fill="none">
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1="40" x2="360" y1={70 + i * 24} y2={70 + i * 24} strokeOpacity="0.18" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
      ))}
      <circle cx="175" cy="175" r="95" fill={S.soft} />
      <circle cx="175" cy="175" r="95" strokeWidth="6" stroke={S.ac} />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="110" x2={240 - (i % 2) * 40} y1={135 + i * 20} y2={135 + i * 20} strokeWidth="4" strokeOpacity="0.8" />
      ))}
      <path d="M243 243 L330 330" strokeWidth="16" stroke={S.ac} strokeLinecap="round" />
    </g>
  );
}

function Venn() {
  return (
    <g strokeWidth="1.5" stroke={S.fg}>
      <circle cx="150" cy="200" r="110" fill={S.ac} fillOpacity="0.85" />
      <circle cx="250" cy="200" r="110" fill={S.soft} fillOpacity="0.9" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="150" cy="200" r="110" fill="none" />
      <text x="105" y="205" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill={S.fg} stroke="none" textAnchor="middle">
        glory
      </text>
      <text x="295" y="205" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill={S.fg} stroke="none" textAnchor="middle">
        truth
      </text>
      <text x="200" y="205" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill={S.fg} stroke="none" textAnchor="middle">
        COURAGE
      </text>
    </g>
  );
}

function Tree() {
  const node = (x: number, y: number, label: string, hi = false) => (
    <g key={label + x}>
      <rect x={x - 38} y={y - 14} width="76" height="28" fill={hi ? S.ac : S.soft} stroke={S.fg} strokeWidth="1.2" />
      <text x={x} y={y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={S.fg}>
        {label}
      </text>
    </g>
  );
  return (
    <g>
      <g stroke={S.fg} strokeWidth="1.2" fill="none">
        <path d="M200 74 L110 150 M200 74 L290 150 M110 164 L65 240 M110 164 L155 240 M290 164 L245 240 M290 164 L335 240 M245 254 L215 320 M245 254 L280 320" />
      </g>
      {node(200, 60, 'SENTENCE', true)}
      {node(110, 150, 'MAIN')}
      {node(290, 150, 'SUBORD.')}
      {node(65, 240, 'subject')}
      {node(155, 240, 'verb')}
      {node(245, 240, 'because')}
      {node(335, 240, 'clause')}
      {node(215, 330, 'subj.')}
      {node(290, 330, 'pred.')}
    </g>
  );
}

function Compass() {
  return (
    <g stroke={S.fg} strokeWidth="1.5" fill="none">
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="120" strokeDasharray="1 5" />
      {Array.from({ length: 72 }).map((_, i) => {
        const a = (i / 72) * Math.PI * 2;
        const r2 = i % 9 === 0 ? 135 : 143;
        return <line key={i} x1={200 + Math.cos(a) * 150} y1={200 + Math.sin(a) * 150} x2={200 + Math.cos(a) * r2} y2={200 + Math.sin(a) * r2} strokeOpacity="0.6" />;
      })}
      <path d="M200 70 L222 200 L200 330 L178 200 Z" fill={S.soft} />
      <path d="M200 70 L222 200 L178 200 Z" fill={S.ac} />
      <path d="M70 200 L200 182 L330 200 L200 218 Z" fill={S.soft} strokeOpacity="0.6" />
      <circle cx="200" cy="200" r="8" fill={S.fg} />
      {['THESIS', 'EVIDENCE', 'ANALYSIS', 'LINK'].map((t, i) => {
        const pos = [
          [200, 40],
          [372, 204],
          [200, 374],
          [28, 204],
        ][i];
        return (
          <text key={t} x={pos[0]} y={pos[1]} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill={S.fg} stroke="none">
            {t}
          </text>
        );
      })}
    </g>
  );
}

function Book() {
  return (
    <g stroke={S.fg} strokeWidth="1.5">
      <path d="M200 120 Q140 90 60 100 L60 300 Q140 290 200 320 Z" fill={S.soft} />
      <path d="M200 120 Q260 90 340 100 L340 300 Q260 290 200 320 Z" fill={S.ac} />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M80 ${130 + i * 20} Q140 ${122 + i * 20} 185 ${142 + i * 20}`} fill="none" strokeOpacity="0.45" />
      ))}
      <path d="M200 120 L200 320" />
      <path d="M200 120 Q240 40 300 60" fill="none" strokeDasharray="3 5" />
      <circle cx="300" cy="60" r="6" fill={S.fg} />
      <path d="M60 300 Q140 290 200 320 Q260 290 340 300 L340 312 Q260 302 200 332 Q140 302 60 312 Z" fill={S.fg} fillOpacity="0.85" />
    </g>
  );
}

function Wave() {
  return (
    <g fill="none" strokeWidth="1.6">
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={i}
          d={`M20 ${110 + i * 18} C 90 ${60 + i * 18 + (i % 2) * 30}, 150 ${170 + i * 18}, 200 ${110 + i * 18} S 310 ${60 + i * 18}, 380 ${110 + i * 18}`}
          stroke={i === 5 ? S.ac : S.fg}
          strokeWidth={i === 5 ? 5 : 1.4}
          strokeOpacity={i === 5 ? 1 : 0.25 + (i % 4) * 0.12}
        />
      ))}
      <circle cx="300" cy="90" r="32" fill={S.ac} stroke="none" />
    </g>
  );
}

function Sun() {
  return (
    <g>
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2;
        return <line key={i} x1={200 + Math.cos(a) * 90} y1={200 + Math.sin(a) * 90} x2={200 + Math.cos(a) * (i % 2 ? 150 : 175)} y2={200 + Math.sin(a) * (i % 2 ? 150 : 175)} stroke={S.fg} strokeWidth="1.5" strokeOpacity="0.7" />;
      })}
      <circle cx="200" cy="200" r="80" fill={S.ac} />
      <circle cx="200" cy="200" r="80" fill="none" stroke={S.fg} strokeWidth="1.5" />
      <circle cx="200" cy="200" r="52" fill="none" stroke={S.fg} strokeDasharray="2 5" />
    </g>
  );
}

function Grid() {
  return (
    <g>
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => {
          const k = (r * 7 + c * 3) % 5;
          const x = 50 + c * 50;
          const y = 50 + r * 50;
          return k === 0 ? (
            <circle key={`${r}${c}`} cx={x + 25} cy={y + 25} r="20" fill={S.ac} />
          ) : k === 1 ? (
            <rect key={`${r}${c}`} x={x + 5} y={y + 5} width="40" height="40" fill={S.fg} opacity="0.85" />
          ) : k === 2 ? (
            <path key={`${r}${c}`} d={`M${x + 5} ${y + 45} L${x + 45} ${y + 5} L${x + 45} ${y + 45} Z`} fill={S.soft} stroke={S.fg} strokeWidth="1" />
          ) : (
            <rect key={`${r}${c}`} x={x + 5} y={y + 5} width="40" height="40" fill="none" stroke={S.fg} strokeOpacity="0.35" />
          );
        })
      )}
    </g>
  );
}

const map: Record<ArtKind, () => React.JSX.Element> = {
  'mead-hall': MeadHall,
  dragon: Dragon,
  manuscript: Manuscript,
  eye: Eye,
  mask: Mask,
  arc: Arc,
  quill: Quill,
  quotes: Quotes,
  lens: Lens,
  venn: Venn,
  tree: Tree,
  compass: Compass,
  book: Book,
  wave: Wave,
  sun: Sun,
  grid: Grid,
};

export function Plate({ art, className }: PlateProps) {
  const Art = map[art];
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <Art />
    </svg>
  );
}
