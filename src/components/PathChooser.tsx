// An animated scene for the hero: a small figure at a fork, three paths drawing
// upward to pastel destination cards, and a glowing dot travelling along the
// chosen path. Pure SVG + CSS, no dependencies. Honours reduced-motion via the
// global guard in index.css.

const PATHS = {
  left: "M200,360 C160,260 120,180 84,118",
  middle: "M200,360 C200,250 200,150 200,86",
  right: "M200,360 C240,260 280,180 316,118",
};

export function PathChooser() {
  return (
    <svg
      viewBox="0 0 400 440"
      className="h-full w-full max-w-md"
      role="img"
      aria-label="A person choosing between three career paths"
    >
      <defs>
        <radialGradient id="ona-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9c9fb" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c9c9fb" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft backdrop blob */}
      <circle cx="200" cy="210" r="170" fill="url(#ona-glow)" className="animate-pulse-soft" />

      {/* Paths drawing upward (stroke draws in, staggered) */}
      <Path d={PATHS.left} color="#bfe0c4" delay={0.1} />
      <Path d={PATHS.right} color="#f3cfe6" delay={0.25} />
      <Path d={PATHS.middle} color="#b9b9f6" delay={0.4} highlighted />

      {/* Glowing dot travelling along the chosen (middle) path */}
      <circle
        r="6"
        fill="#6d6df0"
        style={{
          offsetPath: `path("${PATHS.middle}")`,
          animation: "ona-travel 3.2s ease-in-out 1s infinite",
        }}
      />

      {/* Destination cards */}
      <Destination cx={84} cy={96} fill="#edf4ea" delay={0.6} />
      <Destination cx={200} cy={64} fill="#ffffff" delay={0.8} chosen />
      <Destination cx={316} cy={96} fill="#f7eff7" delay={1.0} />

      {/* Figure at the fork */}
      <g className="animate-bob" style={{ transformOrigin: "200px 360px" }}>
        {/* thought sparkle */}
        <g className="animate-float" style={{ transformOrigin: "200px 300px" }}>
          <path
            d="M200 286l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8z"
            fill="#6d6df0"
            opacity="0.8"
          />
        </g>
        {/* head */}
        <circle cx="200" cy="338" r="13" fill="#0a0a0a" />
        {/* eyes */}
        <g className="animate-blink" style={{ transformOrigin: "200px 336px" }}>
          <circle cx="196" cy="336" r="1.6" fill="#fff" />
          <circle cx="204" cy="336" r="1.6" fill="#fff" />
        </g>
        {/* body */}
        <path
          d="M200 352c-9 0-16 7-16 16v10h32v-10c0-9-7-16-16-16z"
          fill="#0a0a0a"
        />
      </g>
    </svg>
  );
}

function Path({
  d,
  color,
  delay,
  highlighted,
}: {
  d: string;
  color: string;
  delay: number;
  highlighted?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={highlighted ? 6 : 4}
      strokeLinecap="round"
      strokeDasharray={360}
      strokeDashoffset={360}
      style={{
        animation: `ona-dash 1.1s ease-out ${delay}s forwards`,
      }}
    />
  );
}

function Destination({
  cx,
  cy,
  fill,
  delay,
  chosen,
}: {
  cx: number;
  cy: number;
  fill: string;
  delay: number;
  chosen?: boolean;
}) {
  return (
    <g
      className="animate-fade-up"
      style={{ animationDelay: `${delay}s`, transformOrigin: `${cx}px ${cy}px` }}
    >
      <g className={chosen ? "animate-pulse-soft" : undefined} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <rect
          x={cx - 30}
          y={cy - 22}
          width={60}
          height={44}
          rx={12}
          fill={fill}
          stroke={chosen ? "#6d6df0" : "rgba(0,0,0,0.08)"}
          strokeWidth={chosen ? 2 : 1}
        />
        {/* mini card content */}
        <rect x={cx - 18} y={cy - 10} width={36} height={4} rx={2} fill="rgba(0,0,0,0.18)" />
        <rect x={cx - 18} y={cy - 1} width={24} height={4} rx={2} fill="rgba(0,0,0,0.12)" />
        <circle cx={cx + 14} cy={cy + 10} r={4} fill={chosen ? "#6d6df0" : "rgba(0,0,0,0.15)"} />
      </g>
    </g>
  );
}
