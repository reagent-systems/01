"use client";

import { SmartLink, scoreEntry } from "@01/ui";
import { useEffect, useState } from "react";

type Entry = { title: string; description: string; url: string };

/** Reads ?q= and filters the search index in the browser. */
export function SearchResults() {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);

  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  }, []);

  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = (index ?? [])
    .map((e) => ({ e, s: scoreEntry(e, words) }))
    .filter((x) => (words.length ? x.s > 0 : true))
    .sort((a, b) => b.s - a.s)
    .slice(0, 40);

  return (
    <>
      <form
        className="search"
        role="search"
        action="/search"
        method="get"
        style={{ maxWidth: "40rem", marginBottom: "2rem" }}
      >
        <input
          type="search"
          name="q"
          defaultValue={q}
          key={q}
          placeholder="Type to search…"
          aria-label="Search the site"
        />
        <button type="submit" className="search-btn" aria-label="Search">
          →
        </button>
      </form>
      {index === null ? (
        <p className="lead">Loading…</p>
      ) : results.length === 0 ? (
        <p className="lead">No pages match “{q}”.</p>
      ) : (
        <div className="card-grid">
          {results.map(({ e }) => (
            <SmartLink key={e.url} href={e.url} className="card">
              <h2 className="h3">{e.title}</h2>
              <p>{e.description}</p>
              <span className="arrow-link">
                Open <span aria-hidden="true">→</span>
              </span>
            </SmartLink>
          ))}
        </div>
      )}
    </>
  );
}
