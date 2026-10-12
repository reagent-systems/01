"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";

type NavLink = { href: string; label: string };

export function Header({
  links,
  drawerLinks = links,
  action,
  drawerFoot,
}: {
  links: NavLink[];
  drawerLinks?: NavLink[];
  action?: NavLink;
  drawerFoot?: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.6);
      setHidden(y > 200 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`header${hidden && !open ? " is-hidden" : ""}${solid ? " is-solid" : ""}`}>
        <Logo />
        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <SmartLink key={l.href} href={l.href}>
              {l.label}
            </SmartLink>
          ))}
        </nav>
        <div className="header-actions">
          {action && (
            <SmartLink href={action.href} className="header-quote">
              {action.label}
            </SmartLink>
          )}
          <button
            type="button"
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </header>
      <div
        className={`drawer-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="site-drawer"
        className={`drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Menu">
          <ul>
            {drawerLinks.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
                <SmartLink href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                  <span aria-hidden="true">→</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        {drawerFoot && (
          <div className="drawer-foot">
            {drawerFoot.map((l) => (
              <SmartLink key={l.href} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
