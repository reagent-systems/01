import { SmartLink } from "./SmartLink";

/**
 * The 01 mark. A stencil 0 (an arch over a cup, split by a gap) beside a blocky italic 1.
 * The 0 takes the text color; the 1 takes the accent.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 88 64"
      role="img"
      aria-label="01"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>01</title>
      <path fill="currentColor" fillRule="evenodd" d="M0 0h44v30H32V12H12v18H0z" />
      <path fill="currentColor" fillRule="evenodd" d="M0 34h12v18h20V34h12v30H0z" />
      <path
        fill="var(--accent, #ffd100)"
        transform="skewX(-10)"
        d="M50 20 L66 0 H88 V64 H72 V22 H50 Z"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <SmartLink href="/" className="logo" aria-label="01 home">
      <LogoMark className="logo-svg" />
    </SmartLink>
  );
}
