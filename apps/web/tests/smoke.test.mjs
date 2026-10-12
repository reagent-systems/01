// Smoke gate: boots the production build and checks every public route.
// Run after `next build`. Uses only Node built-ins (node:test).
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { after, before, test } from "node:test";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.SMOKE_PORT ?? 3199);
const BASE = `http://127.0.0.1:${PORT}`;
const built = existsSync(new URL("../.next/BUILD_ID", import.meta.url));
let server;
let site = "";

before(async () => {
  if (!built) return;
  server = spawn("npx", ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"], {
    stdio: ["ignore", "ignore", "inherit"],
    detached: true,
    env: { ...process.env, OPS_PASSWORD: "smoke" },
  });
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/robots.txt`);
      if (res.ok) break;
    } catch {}
    await sleep(500);
  }
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  site = /Sitemap: (https?:\/\/[^/\s]+)/.exec(robots)?.[1] ?? "";
});

after(() => {
  try {
    if (server?.pid) process.kill(-server.pid, "SIGTERM");
  } catch {
    // The process group already exited.
  }
});

const get = (path, opts = {}) => fetch(`${BASE}${path}`, { redirect: "manual", ...opts });

async function sitemapPaths() {
  const xml = await (await get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, "") || "/");
}

const skipUnbuilt = (t) => {
  if (built) return false;
  t.skip("no .next build: smoke test NOT run");
  return true;
};

test("sitemap lists every content route", async (t) => {
  if (skipUnbuilt(t)) return;
  const paths = await sitemapPaths();
  assert.ok(paths.length >= 34, `expected 34 or more URLs, got ${paths.length}`);
  for (const p of [
    "/",
    "/how-it-works",
    "/processes",
    "/for",
    "/platforms",
    "/designs",
    "/compliance",
    "/start",
    "/contact",
    "/terms",
    "/privacy",
    "/designer-agreement",
    "/supplier-agreement",
    "/for/manufacturers",
    "/processes/cnc-machining",
  ]) {
    assert.ok(paths.includes(p), `sitemap missing ${p}`);
  }
  assert.equal(
    paths.filter((p) => p.startsWith("/processes/")).length,
    11,
    "expected 11 process pages",
  );
  assert.equal(paths.filter((p) => p.startsWith("/for/")).length, 8, "expected 8 audience pages");
});

test("every sitemap URL returns 200 with title, canonical, description and one h1", async (t) => {
  if (skipUnbuilt(t)) return;
  const failures = [];
  for (const p of await sitemapPaths()) {
    const res = await get(p);
    const html = await res.text();
    if (res.status !== 200) failures.push(`${p}: HTTP ${res.status}`);
    else if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${p}: no <title>`);
    else if (!html.includes(`rel="canonical" href="${site}${p === "/" ? "" : p}`))
      failures.push(`${p}: canonical missing or wrong`);
    else if (!/<meta name="description" content="[^"]{50,}/.test(html))
      failures.push(`${p}: description missing or short`);
    else if ((html.match(/<h1[\s>]/g) ?? []).length !== 1)
      failures.push(`${p}: expected exactly one <h1>`);
  }
  assert.deepEqual(failures, []);
});

test("alias routes redirect permanently", async (t) => {
  if (skipUnbuilt(t)) return;
  for (const [from, to] of [
    ["/capabilities", "/processes"],
    ["/quote", "/start"],
    ["/certifications", "/compliance"],
    ["/contracting", "/for/manufacturers"],
    ["/privacy-policy", "/privacy"],
  ]) {
    const res = await get(from);
    assert.equal(res.status, 308, `${from} status`);
    assert.equal(res.headers.get("location"), to, `${from} target`);
  }
});

test("home: three hero panels, one h1, structured data", async (t) => {
  if (skipUnbuilt(t)) return;
  const html = await (await get("/")).text();
  const hero = html.match(/<section class="hero-split"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.ok(hero, "hero section not found");
  const labels = [...hero.matchAll(/class="hero-link"[^>]*>([^<]+)</g)].map((m) => m[1]);
  assert.deepEqual(labels, ["Publish", "Fund", "Build"]);
  assert.doesNotMatch(hero, /<h[1-6][\s>]/, "hero carries no headline");
  assert.match(html, /<h1 id="mission-title"[^>]*>Hardware Without Capital<\/h1>/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"@type":"WebSite"/);
});

test("footer carries the full link set", async (t) => {
  if (skipUnbuilt(t)) return;
  const html = await (await get("/")).text();
  const footer = html.match(/<footer class="footer"[\s\S]*?<\/footer>/)?.[0] ?? "";
  for (const href of [
    "/processes/cnc-machining",
    "/processes/pcb-assembly",
    "/for/inventors",
    "/for/manufacturers",
    "/terms",
    "/privacy",
    "/designer-agreement",
    "/supplier-agreement",
    "/sitemap.xml",
  ]) {
    assert.ok(footer.includes(`href="${href}"`), `footer missing ${href}`);
  }
  assert.match(footer, /Files we read/);
});

test("no page contains an em-dash (style rule)", async (t) => {
  if (skipUnbuilt(t)) return;
  const hits = [];
  for (const p of await sitemapPaths()) {
    const html = await (await get(p)).text();
    if (/—|&mdash;|&#8212;/.test(html)) hits.push(p);
  }
  assert.deepEqual(hits, []);
});

test("robots.txt points at the sitemap and hides ops and api", async (t) => {
  if (skipUnbuilt(t)) return;
  const txt = await (await get("/robots.txt")).text();
  assert.match(txt, /Sitemap: .+\/sitemap\.xml/);
  assert.match(txt, /Disallow: \/ops\//);
  assert.match(txt, /Disallow: \/api\//);
});

test("security headers are set", async (t) => {
  if (skipUnbuilt(t)) return;
  const res = await get("/");
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(res.headers.get("x-powered-by"), null);
});

test("inquiry API rejects incomplete submissions and honeypot fills succeed silently", async (t) => {
  if (skipUnbuilt(t)) return;
  const post = (body) =>
    get("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  assert.equal((await post({ name: "x" })).status, 422);
  assert.equal((await post({ company_website: "spam" })).status, 200);
  const ok = await post({ name: "A", email: "a@b.co", message: "hello", kind: "contact" });
  assert.ok([200, 503].includes(ok.status), `unexpected status ${ok.status}`);
});

test("ops is gated and hidden from search", async (t) => {
  if (skipUnbuilt(t)) return;
  assert.equal((await get("/ops/unknowns")).status, 401);
});

test("unknown routes return the 404 page", async (t) => {
  if (skipUnbuilt(t)) return;
  const res = await get("/no-such-page");
  assert.equal(res.status, 404);
  assert.match(await res.text(), /didn.t pass inspection/);
});
