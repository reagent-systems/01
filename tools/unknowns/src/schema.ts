export const FIELDS = ["KK", "KU", "UK", "ZONE", "ACCEPTED"] as const;
export const SEVERITIES = ["critical", "high", "medium", "low"] as const;
export const METHODS = [
  "research",
  "experiment",
  "expert",
  "decision",
  "legal",
  "extraction",
  "discovery",
  "accept",
] as const;
export const ORIGINS = ["seed", "discovery", "surprise", "extraction", "issue"] as const;

export type Field = (typeof FIELDS)[number];
export type Severity = (typeof SEVERITIES)[number];

export const DOMAINS: Record<string, string> = {
  VIS: "vision",
  ORG: "organization",
  MKT: "market",
  ECO: "economics",
  MFG: "manufacturing",
  SUP: "suppliers",
  LOG: "logistics",
  QUA: "quality",
  PAY: "payments",
  LEG: "legal",
  INS: "insurance",
  TNS: "trust-safety",
  TEC: "technology",
  LCH: "launch",
  SUPA: "support",
};

export interface HistoryEntry {
  date: string;
  change: string;
  by: string;
}

export interface Item {
  id: string;
  field: Field;
  domain: string;
  statement: string;
  why_it_matters?: string;
  severity: Severity;
  blocks_phase: number | null;
  confidence: number;
  current_answer: string | null;
  evidence: string[];
  resolve_by: string;
  owner: string;
  next_action: string;
  done_when: string;
  recheck_every?: string;
  accepted_limit?: string;
  review_by?: string;
  lawyer_answer?: string;
  origin?: string;
  issue?: number;
  opened: string;
  updated: string;
  history: HistoryEntry[];
}

/** An item is open until it is a KK or an ACCEPTED risk. A ZONE is always open. */
export const isOpen = (i: Item): boolean => i.field !== "KK" && i.field !== "ACCEPTED";
