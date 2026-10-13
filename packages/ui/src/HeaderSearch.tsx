"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

type Entry = { title: string; description: string; url: string };

const Icon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/** Scores an entry against the query words. Title hits count more than description hits. */
export function scoreEntry(e: Entry, words: string[]): number {
  const title = e.title.toLowerCase();
  const desc = e.description.toLowerCase();
  let score = 0;
  for (const w of words) {
    if (title.includes(w)) score += 3;
    else if (desc.includes(w)) score += 1;
    else return 0;
  }
  return score;
}

/** A pill search field. It reads /search-index.json once, on first focus, and filters in the browser. */
export function HeaderSearch({ indexUrl = "/search-index.json" }: { indexUrl?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLFormElement>(null);

  const load = () => {
    if (index) return;
    fetch(indexUrl)
      .then((r) => r.json())
      .then((d: Entry[]) => setIndex(d))
      .catch(() => setIndex([]));
  };

  useEffect(() => {
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", away);
    return () => window.removeEventListener("mousedown", away);
  }, []);

  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results =
    index && words.length
      ? index
          .map((e) => ({ e, s: scoreEntry(e, words) }))
          .filter((x) => x.s > 0)
          .sort((a, b) => b.s - a.s)
          .slice(0, 8)
          .map((x) => x.e)
      : [];

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const first = results[0];
    setOpen(false);
    router.push(first && results.length === 1 ? first.url : `/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      ref={box}
      className="search"
      role="search"
      action="/search"
      method="get"
      onSubmit={submit}
    >
      <input
        type="search"
        name="q"
        value={q}
        placeholder="Type to search…"
        aria-label="Search the site"
        autoComplete="off"
        onFocus={() => {
          load();
          setOpen(true);
        }}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      <button type="submit" className="search-btn" aria-label="Search">
        <Icon />
      </button>
      {open && words.length > 0 && (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="search-empty">{index ? "No matches." : "Loading…"}</p>
          ) : (
            results.map((r) => (
              <a key={r.url} href={r.url} onClick={() => setOpen(false)}>
                <b>{r.title}</b>
                <span>{r.description}</span>
              </a>
            ))
          )}
        </div>
      )}
    </form>
  );
}
