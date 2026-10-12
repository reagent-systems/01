"use client";

import { type FormEvent, useState } from "react";

type Kind = "start" | "contact";
type Status = { state: "idle" | "sending" | "ok" | "err"; msg?: string };

/** Posts to /api/inquiry, which files the submission as a GitHub issue for triage. */
export function InquiryForm({ kind, defaultRole = "" }: { kind: Kind; defaultRole?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        configured?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ state: "ok", msg: "Thank you. We received your message." });
        return;
      }
      if (json.configured === false) {
        setStatus({ state: "err", msg: "Submissions are not open yet. Please check back soon." });
        return;
      }
      setStatus({ state: "err", msg: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "err", msg: "Network error. Please try again." });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Full name *</label>
        <input id="name" name="name" autoComplete="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>

      {kind === "start" ? (
        <>
          <div className="field">
            <label htmlFor="role">I am a</label>
            <select id="role" name="role" defaultValue={defaultRole}>
              <option value="" disabled>
                Select
              </option>
              <option value="designer">Designer</option>
              <option value="buyer">Buyer</option>
              <option value="shop">Shop</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="count">Target count</label>
            <input id="count" name="count" placeholder="e.g. 500 units" maxLength={120} />
          </div>
          <div className="field full">
            <label htmlFor="files">Link to files</label>
            <input
              id="files"
              name="files"
              type="url"
              placeholder="A link to STEP, Gerber, or BOM files"
              maxLength={400}
            />
            <p className="form-note">
              We do not take uploads on this form. Share a link to your files.
            </p>
          </div>
        </>
      ) : (
        <div className="field full">
          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" defaultValue="general">
            <option value="general">General</option>
            <option value="designer">Designing</option>
            <option value="shop">Joining as a shop</option>
            <option value="press">Press</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
      )}

      <div className="field full">
        <label htmlFor="message">{kind === "start" ? "About the design *" : "Message *"}</label>
        <textarea id="message" name="message" required maxLength={5000} />
      </div>

      {/* Honeypot for bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Leave blank</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        className="full"
        style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}
      >
        <button type="submit" className="btn btn-solid" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : kind === "start" ? "Send" : "Send message"}
        </button>
        <p className="form-note" style={{ margin: 0 }}>
          By submitting you agree to our <a href="/privacy">Privacy Statement</a>.
        </p>
      </div>
      {status.msg && (
        <p className={`full form-status ${status.state === "err" ? "err" : "ok"}`} role="status">
          {status.msg}
        </p>
      )}
    </form>
  );
}
