"use client";

import type { Item } from "@01/unknowns/schema";
import { useMemo, useState } from "react";

const uniq = (xs: string[]) => [...new Set(xs)].sort();

export function RegisterTable({ items }: { items: Item[] }) {
  const [domain, setDomain] = useState("");
  const [field, setField] = useState("");
  const [severity, setSeverity] = useState("");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!domain || i.domain === domain) &&
        (!field || i.field === field) &&
        (!severity || i.severity === severity) &&
        (!q || `${i.id} ${i.statement}`.toLowerCase().includes(q)),
    );
  }, [items, domain, field, severity, query]);

  const select = (label: string, value: string, set: (v: string) => void, options: string[]) => (
    <select aria-label={label} value={value} onChange={(e) => set(e.target.value)}>
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <>
      <div className="filters">
        {select("domain", domain, setDomain, uniq(items.map((i) => i.domain)))}
        {select("field", field, setField, uniq(items.map((i) => i.field)))}
        {select("severity", severity, setSeverity, uniq(items.map((i) => i.severity)))}
        <input
          aria-label="search"
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="scroll">
        <table data-testid="register-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Field</th>
              <th>Severity</th>
              <th>Phase</th>
              <th>Owner</th>
              <th>Statement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.field}</td>
                <td>{i.severity}</td>
                <td>{i.blocks_phase ?? ""}</td>
                <td>{i.owner}</td>
                <td>{i.statement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
