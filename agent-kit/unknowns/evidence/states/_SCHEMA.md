# State research schema

One file per state: `<slug>.json` (lowercase, hyphenated, for example `new-york.json`).

```json
{
  "state": "Ohio",
  "slug": "ohio",
  "abbr": "OH",
  "researched": "2026-10-12",
  "hardwareHubs": [
    { "city": "Columbus", "note": "One sentence, source-backed.", "source": "https://..." }
  ],
  "makerspaces": [
    { "name": "Exact name", "city": "City", "note": "What it offers (CNC, laser, 3D printing, electronics lab), only if the source says so.", "url": "https://..." }
  ],
  "events": [
    { "name": "Exact event name", "city": "City", "cadence": "annual | monthly | quarterly", "month": "Month if the source states it, else omit", "note": "One sentence.", "url": "https://..." }
  ],
  "programs": [
    { "name": "University lab, incubator, or accelerator", "city": "City", "note": "What it offers hardware inventors.", "url": "https://..." }
  ],
  "specialties": [
    { "name": "Manufacturing specialty or industry cluster", "note": "One sentence, source-backed.", "source": "https://..." }
  ],
  "support": [
    { "name": "State or federal-state support program, for example the NIST MEP center for the state", "note": "What it offers small manufacturers and inventors.", "url": "https://..." }
  ]
}
```

Rules: every entry needs a real URL you actually opened or saw in a search result. Omit anything you cannot source.
Never invent a name, date, or URL. Prefer official pages. Keep each note to one plain sentence.
