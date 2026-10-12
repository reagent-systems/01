import { NextResponse } from "next/server";
import { site } from "../../../lib/site";

const FIELDS = ["name", "email", "role", "count", "files", "topic", "message"] as const;

/**
 * Receives form submissions and files each one as a GitHub issue labeled `feedback`,
 * `lead`, and `needs-triage`. The triage routine (agent-kit/ROUTINES.md) picks it up.
 * Set GITHUB_ISSUES_TOKEN (a fine-grained token with Issues: write on the repo) in Vercel.
 * Without it the route answers `configured: false` and the form says submissions are not open.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: accept and drop bot submissions.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = body[f];
    if (typeof v === "string" && v.trim()) data[f] = v.trim().slice(0, 5000);
  }
  if (
    !data.name ||
    !data.email ||
    !data.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, a valid email, and a message." },
      { status: 422 },
    );
  }

  const token = process.env.GITHUB_ISSUES_TOKEN;
  if (!token) return NextResponse.json({ ok: false, configured: false }, { status: 503 });

  const kind = body.kind === "start" ? "start" : "contact";
  const rows = Object.entries(data)
    .map(([k, v]) => `**${k}:** ${v.replace(/\r?\n/g, "\n> ")}`)
    .join("\n\n");
  const res = await fetch(`https://api.github.com/repos/${site.repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `[${kind}] ${data.name}${data.role ? `, ${data.role}` : ""}`,
      body: `Submitted through the website form (${kind}).\n\n${rows}`,
      labels: ["feedback", "lead", "needs-triage"],
    }),
  });

  if (!res.ok) {
    console.error("Issue creation failed", res.status);
    return NextResponse.json(
      { ok: false, error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
