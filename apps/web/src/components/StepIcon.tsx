import type { CSSProperties, ReactNode } from "react";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

const icons: Record<string, ReactNode> = {
  "pcb fabrication": (
    <>
      <rect className="si-s" x="12" y="22" width="72" height="54" rx="5" />
      <path className="si-s si-tr" pathLength="1" d="M22 34H44V50H60" />
      <path className="si-s si-tr si-tr2" pathLength="1" d="M22 64H40" />
      <path className="si-s si-tr si-tr3" pathLength="1" d="M74 34V46H62" />
      <circle className="si-f si-pad" cx="22" cy="34" r="3.5" />
      <circle className="si-f si-pad" cx="60" cy="50" r="3.5" />
      <circle className="si-f si-pad" cx="22" cy="64" r="3.5" />
      <circle className="si-f si-pad" cx="40" cy="64" r="3.5" />
      <circle className="si-f si-pad" cx="74" cy="34" r="3.5" />
      <circle className="si-w si-hole" cx="68" cy="62" r="5" />
      <g className="si-bit">
        <path className="si-w" d="M68 28V56" />
        <path className="si-f" d="M64 56h8l-4 8z" />
      </g>
    </>
  ),
  case: (
    <>
      <path className="si-s" d="M14 80H82" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          className="si-f si-layer"
          style={v({ "--i": i })}
          x="24"
          y={68 - 6 * i}
          width="48"
          height="6"
          rx="1"
          opacity={i % 2 ? 0.92 : 1}
        />
      ))}
      <g className="si-noz">
        <g className="si-sweep" style={{ transformOrigin: "48px 54px" }}>
          <rect className="si-w" x="42" y="48" width="12" height="12" rx="2" />
          <path className="si-f" d="M43 61h10l-5 6z" />
        </g>
      </g>
    </>
  ),
  "pcb assembly": (
    <>
      <rect className="si-s" x="10" y="58" width="76" height="14" rx="3" />
      <g className="si-part" style={v({ "--i": 0 })}>
        <rect className="si-f" x="18" y="44" width="22" height="14" rx="2" />
        <path className="si-s" d="M22 58v5M29 58v5M36 58v5" style={{ strokeWidth: 2 }} />
      </g>
      <g className="si-part" style={v({ "--i": 1 })}>
        <rect className="si-f" x="48" y="49" width="10" height="9" rx="1.5" />
      </g>
      <g className="si-part" style={v({ "--i": 2 })}>
        <rect className="si-f" x="66" y="49" width="10" height="9" rx="1.5" />
      </g>
      <path className="si-w si-spark" style={v({ "--i": 0 })} d="M29 36v-6M21 40l-4-4M37 40l4-4" />
      <path className="si-w si-spark" style={v({ "--i": 1 })} d="M53 42v-6M47 45l-4-3M59 45l4-3" />
      <path className="si-w si-spark" style={v({ "--i": 2 })} d="M71 42v-6M65 45l-4-3M77 45l4-3" />
    </>
  ),
  "final assembly and test": (
    <>
      <rect className="si-s" x="16" y="20" width="64" height="52" rx="7" />
      <g className="si-slide">
        <rect className="si-w" x="26" y="32" width="44" height="28" rx="3" />
        <rect className="si-screen" x="33" y="38" width="30" height="16" rx="2" />
      </g>
      <g className="si-badge">
        <circle className="si-f" cx="76" cy="70" r="14" />
        <path
          className="si-s si-ck"
          pathLength="1"
          d="M69 70l5 5 9-10"
          style={{ stroke: "#000", strokeWidth: 3.5 }}
        />
      </g>
    </>
  ),
  "pack and ship": (
    <>
      {[
        ["f", -30, -14, 5],
        ["w", 30, -18, 5],
        ["w", -18, -30, 4],
        ["f", 20, -30, 4],
      ].map(([c, dx, dy, size]) => (
        <g
          key={`${dx}${dy}`}
          className="si-conf"
          style={v({ "--dx": `${dx}px`, "--dy": `${dy}px` })}
        >
          <rect
            className={`si-${c}`}
            x="46"
            y="26"
            width={size as number}
            height={size as number}
          />
        </g>
      ))}
      <g className="si-conf" style={v({ "--dx": "-38px", "--dy": "6px" })}>
        <circle className="si-f" cx="48" cy="28" r="2.5" />
      </g>
      <g className="si-conf" style={v({ "--dx": "38px", "--dy": "4px" })}>
        <circle className="si-w" style={{ fill: "#fff", stroke: "none" }} cx="48" cy="28" r="2.5" />
      </g>
      <path className="si-s" d="M14 86H82" opacity=".5" />
      <g className="si-pack">
        <rect className="si-item si-f" x="38" y="38" width="20" height="14" rx="2" />
        <rect className="si-a" x="24" y="48" width="48" height="34" rx="2" />
        <rect className="si-tape" x="43" y="48" width="10" height="34" fill="#fff" opacity=".85" />
        <rect className="si-a si-flapL" x="24" y="44" width="24" height="4" rx="1" />
        <rect className="si-a si-flapR" x="48" y="44" width="24" height="4" rx="1" />
      </g>
    </>
  ),
};

/** Animated line icon for a known chain step; nothing for an unknown one. */
export function StepIcon({ name }: { name: string }) {
  const art = icons[name.toLowerCase()];
  if (!art) return null;
  return (
    <svg className="si" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      {art}
    </svg>
  );
}
