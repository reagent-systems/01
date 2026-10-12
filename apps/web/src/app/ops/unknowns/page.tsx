import { FIELDS } from "@01/unknowns/schema";
import { items, registerReport } from "../../../lib/register-view";
import { RegisterTable } from "./table";

export const dynamic = "force-dynamic";

export default function UnknownsPage() {
  const report = registerReport(new Date().toISOString().slice(0, 10));
  return (
    <main className="ops">
      <div className="stats">
        <div>
          <span>{report.total}</span>items
        </div>
        <div>
          <span>{report.openCritical}</span>open critical
        </div>
        <div>
          <span>{report.openHigh}</span>open high
        </div>
        <div>
          <span>{report.stale.length}</span>stale
        </div>
        <div>
          <span>{report.surprises7d}</span>surprises, 7 days
        </div>
      </div>

      <h2>Coverage</h2>
      <div className="scroll">
        <table data-testid="coverage-grid">
          <thead>
            <tr>
              <th>Domain</th>
              {FIELDS.map((f) => (
                <th key={f} className="num">
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(report.grid).map(([domain, row]) => (
              <tr key={domain}>
                <td>{domain}</td>
                {FIELDS.map((f) => (
                  <td key={f} className="num">
                    {row[f] ?? 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Open critical by phase</h2>
      <table>
        <tbody>
          {Object.entries(report.blockers).map(([phase, ids]) => (
            <tr key={phase}>
              <td>Phase {phase}</td>
              <td>{ids.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Register</h2>
      <RegisterTable items={items} />
    </main>
  );
}
