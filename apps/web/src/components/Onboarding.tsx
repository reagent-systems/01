"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import {
  type Answers,
  nextHref,
  type Question,
  questionsFor,
  type Role,
  summarize,
  TOTAL_STEPS,
} from "../lib/onboarding";

type Sent = { state: "idle" | "sending" | "done" | "err"; msg?: string };

/** One question per screen. Answers go to /api/inquiry as a `welcome` lead for triage. */
export function Onboarding() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<Sent>({ state: "idle" });

  const role = (answers.role as Role | undefined) ?? null;
  const questions = questionsFor(role);
  const q: Question | undefined = questions[step];
  const onContact = step >= questions.length && role !== null;

  const pick = (value: string) => {
    if (!q) return;
    if (q.multi) {
      const now = (answers[q.id] as string[] | undefined) ?? [];
      const next = now.includes(value) ? now.filter((v) => v !== value) : [...now, value];
      setAnswers({ ...answers, [q.id]: next });
      return;
    }
    setAnswers({ ...answers, [q.id]: value });
    setStep(step + 1);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSent({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "welcome",
          name: form.get("name"),
          email: form.get("email"),
          role,
          message: summarize(answers),
          company_website: form.get("company_website"),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        configured?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) return setSent({ state: "done" });
      if (json.configured === false)
        return setSent({ state: "err", msg: "Sign-ups are not open yet. Please check back soon." });
      setSent({ state: "err", msg: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setSent({ state: "err", msg: "Network error. Please try again." });
    }
  }

  if (sent.state === "done" && role) {
    const next = nextHref[role];
    return (
      <section className="onb">
        <div className="container onb-body">
          <h1 className="h2">You are on the list</h1>
          <p className="lead">A person reads every sign-up and will write to you.</p>
          <Link href={next.href} className="btn btn-yellow">
            {next.label}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="onb">
      <div className="container onb-body">
        <button
          type="button"
          className="onb-back"
          onClick={() => setStep(step - 1)}
          style={step === 0 ? { visibility: "hidden" } : undefined}
          tabIndex={step === 0 ? -1 : 0}
        >
          <span aria-hidden="true">←</span> Previous question
        </button>
        <p className="onb-step">
          Step {Math.min(step + 1, TOTAL_STEPS)} of {TOTAL_STEPS}
        </p>

        {q && !onContact && (
          <>
            <h1 className="h2">{q.title}</h1>
            <p className="onb-help">{q.help}</p>
            <div
              className="onb-options"
              role={q.multi ? "group" : "radiogroup"}
              aria-label={q.title}
            >
              {q.options.map((o) => {
                const a = answers[q.id];
                const on = Array.isArray(a) ? a.includes(o.value) : a === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role={q.multi ? "checkbox" : "radio"}
                    aria-checked={on}
                    className={`onb-card${on ? " is-on" : ""}`}
                    onClick={() => pick(o.value)}
                  >
                    <strong>{o.label}</strong>
                    <span>{o.desc}</span>
                  </button>
                );
              })}
            </div>
            {q.multi && (
              <button
                type="button"
                className="btn btn-yellow onb-next"
                disabled={!((answers[q.id] as string[] | undefined)?.length ?? 0)}
                onClick={() => setStep(step + 1)}
              >
                Continue
              </button>
            )}
          </>
        )}

        {onContact && (
          <>
            <h1 className="h2">Where should we write to you?</h1>
            <p className="onb-help">
              We use this to set up your account. A person reads every sign-up.
            </p>
            <form className="form onb-form" onSubmit={submit}>
              <div className="field">
                <label htmlFor="onb-name">Full name *</label>
                <input id="onb-name" name="name" autoComplete="name" required maxLength={120} />
              </div>
              <div className="field">
                <label htmlFor="onb-email">Email *</label>
                <input
                  id="onb-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="onb-hp">Leave blank</label>
                <input id="onb-hp" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="full">
                <button
                  type="submit"
                  className="btn btn-yellow"
                  disabled={sent.state === "sending"}
                >
                  {sent.state === "sending" ? "Sending…" : "Finish"}
                </button>
                <p className="form-note">
                  By submitting you agree to our <Link href="/privacy">Privacy Statement</Link>.
                </p>
              </div>
              {sent.msg && (
                <p className="full form-status err" role="status">
                  {sent.msg}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
}
