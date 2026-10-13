"use client";

import { useEffect, useRef, useState } from "react";
import { HeaderSearch } from "./HeaderSearch";
import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";

type NavLink = { href: string; label: string; desc?: string };
export type NavMenu = {
  label: string;
  href?: string;
  /** Columns of links for a dropdown. Without groups the item is a plain link. */
  groups?: { title?: string; items: NavLink[] }[];
};

const Caret = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export function Header({
  menus,
  utility = [],
  secondary,
  primary,
}: {
  menus: NavMenu[];
  /** Quiet links on the right of the second row. */
  utility?: NavLink[];
  secondary?: NavLink;
  primary?: NavLink;
}) {
  const [open, setOpen] = useState(false); // mobile drawer
  const [menu, setMenu] = useState<string | null>(null); // desktop dropdown
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setMenu(null);
  };

  return (
    <>
      <header
        ref={bar}
        className={`header${scrolled ? " is-solid is-compact" : ""}${menu ? " is-open-menu" : ""}`}
        onMouseLeave={() => setMenu(null)}
      >
        <div className="header-inner header-top">
          <Logo />
          <HeaderSearch />
          <div className="header-actions">
            {secondary && (
              <SmartLink href={secondary.href} className="header-quote">
                {secondary.label}
              </SmartLink>
            )}
            {primary && (
              <SmartLink href={primary.href} className="header-cta">
                {primary.label}
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
        </div>

        <div className="header-inner header-nav">
          <nav className="nav" aria-label="Primary">
            {menus.map((m) =>
              m.groups ? (
                <div className="nav-item" key={m.label} onMouseEnter={() => setMenu(m.label)}>
                  <button
                    type="button"
                    className="nav-trigger"
                    aria-expanded={menu === m.label}
                    aria-controls={`mega-${m.label}`}
                    onClick={() => setMenu((c) => (c === m.label ? null : m.label))}
                  >
                    {m.label} <Caret />
                  </button>
                  <div
                    id={`mega-${m.label}`}
                    className={`mega${menu === m.label ? " is-open" : ""}`}
                    hidden={menu !== m.label}
                  >
                    <div className="mega-inner">
                      {m.groups.map((g) => (
                        <div className="mega-col" key={g.title ?? g.items[0]?.href}>
                          {g.title && <p className="mega-title">{g.title}</p>}
                          <ul>
                            {g.items.map((l) => (
                              <li key={l.href}>
                                <SmartLink href={l.href} onClick={close}>
                                  <b>{l.label}</b>
                                  {l.desc && <span>{l.desc}</span>}
                                </SmartLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <SmartLink key={m.label} href={m.href ?? "/"} className="nav-link">
                  {m.label}
                </SmartLink>
              ),
            )}
          </nav>
          <nav className="header-links" aria-label="Company">
            {utility.map((l) => (
              <SmartLink key={l.href} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </nav>
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
        <HeaderSearch />
        <nav aria-label="Menu">
          {menus.map((m) => (
            <div className="drawer-group" key={m.label}>
              {m.groups ? (
                <>
                  <p className="drawer-title">{m.label}</p>
                  <ul>
                    {m.groups
                      .flatMap((g) => g.items)
                      .map((l) => (
                        <li key={l.href}>
                          <SmartLink href={l.href} onClick={close}>
                            {l.label}
                            <span aria-hidden="true">→</span>
                          </SmartLink>
                        </li>
                      ))}
                  </ul>
                </>
              ) : (
                <ul>
                  <li>
                    <SmartLink href={m.href ?? "/"} onClick={close}>
                      {m.label}
                      <span aria-hidden="true">→</span>
                    </SmartLink>
                  </li>
                </ul>
              )}
            </div>
          ))}
          <div className="drawer-group">
            <p className="drawer-title">Company</p>
            <ul>
              {utility.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} onClick={close}>
                    {l.label}
                    <span aria-hidden="true">→</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="drawer-foot">
          {secondary && (
            <SmartLink href={secondary.href} className="btn" onClick={close}>
              {secondary.label}
            </SmartLink>
          )}
          {primary && (
            <SmartLink href={primary.href} className="btn btn-yellow" onClick={close}>
              {primary.label}
            </SmartLink>
          )}
        </div>
      </aside>
    </>
  );
}
