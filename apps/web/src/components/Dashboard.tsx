import Link from "next/link";
import {
  buyerAction,
  buyerStateText,
  byDue,
  day,
  designerAction,
  designerStateText,
  money,
  type Role,
  sample,
  shopAction,
  triggerReached,
} from "../lib/dashboards";

const Thumb = ({ name }: { name: string }) => (
  <span className="dash-thumb" aria-hidden="true">
    {name.slice(0, 1)}
  </span>
);

const Act = ({ label, primary }: { label: string | null; primary?: boolean }) =>
  label ? (
    <button type="button" className={primary ? "btn btn-yellow" : "btn"}>
      {label}
    </button>
  ) : (
    <span />
  );

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);

function Buyer() {
  const { orders, payment, address } = sample.buyer;
  return (
    <>
      <ul className="dash-list">
        {orders.map((o) => (
          <li key={o.id} className="dash-row dash-row--buyer">
            <Thumb name={o.product} />
            <span className="dash-name">{o.product}</span>
            <span>{money(o.price)}</span>
            <span>{buyerStateText(o)}</span>
            <span>Ships {day(o.shipDate)}</span>
            <Act label={buyerAction(o)} />
          </li>
        ))}
      </ul>
      <dl className="dash-side">
        <Stat label="Payment" value={payment} />
        <Stat label="Ship to" value={address} />
      </dl>
    </>
  );
}

function Designer() {
  const { designs, earnings } = sample.designer;
  return (
    <>
      <ul className="dash-list">
        {designs.map((d) => (
          <li key={d.id} className="dash-row dash-row--designer">
            <Thumb name={d.name} />
            <span className="dash-name">{d.name}</span>
            <span className="dash-count">
              {d.waitlist} of {d.trigger}
              <span
                className="dash-bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={d.trigger}
                aria-valuenow={Math.min(d.waitlist, d.trigger)}
                aria-label={`${d.name} waitlist`}
              >
                <span style={{ width: `${Math.min(100, (d.waitlist / d.trigger) * 100)}%` }} />
              </span>
            </span>
            <span>
              {money(d.unitPrice)} each, {money(d.marginPerUnit)} margin
            </span>
            <span>{designerStateText(d)}</span>
            <Act label={designerAction(d)} primary={triggerReached(d)} />
          </li>
        ))}
      </ul>
      <dl className="dash-side">
        <Stat label="Paid to date" value={money(earnings.paid)} />
        <Stat
          label="Next payout"
          value={`${money(earnings.nextAmount)} on ${day(earnings.nextDate)}`}
        />
      </dl>
      <Link href="/start" className="btn btn-solid dash-new">
        New design
      </Link>
    </>
  );
}

function Shop() {
  const { jobs, scorecard, requests } = sample.shop;
  const open = [
    requests.quotes > 0 && `${requests.quotes} new ${requests.quotes === 1 ? "quote" : "quotes"}`,
    requests.changes > 0 &&
      `${requests.changes} engineering ${requests.changes === 1 ? "change" : "changes"}`,
  ].filter(Boolean);
  return (
    <>
      <ul className="dash-list">
        {byDue(jobs).map((j) => (
          <li key={j.id} className="dash-row dash-row--shop">
            <Thumb name={j.part} />
            <span className="dash-name">{j.part}</span>
            <span>Qty {j.quantity}</span>
            <span>Due {day(j.due)}</span>
            <span>Ship to {j.shipTo}</span>
            <span>
              {money(j.pay)} on {day(j.payDate)}
            </span>
            <Act label={shopAction(j)} />
          </li>
        ))}
      </ul>
      <dl className="dash-side">
        <Stat label="On time" value={scorecard.onTime} />
        <Stat label="Defects" value={scorecard.defects} />
        <Stat label="Response" value={scorecard.response} />
        {open.length > 0 && <Stat label="Open requests" value={open.join(", ")} />}
      </dl>
    </>
  );
}

export const dashboardTitle: Record<Role, string> = {
  buyer: "Your orders",
  designer: "Your designs",
  shop: "Your jobs",
};

export function Dashboard({ role }: { role: Role }) {
  return (
    <section className="dash">
      <div className="container">
        <h1 className="h2">{dashboardTitle[role]}</h1>
        <p className="dash-sample">Sample data</p>
        {role === "buyer" ? <Buyer /> : role === "designer" ? <Designer /> : <Shop />}
      </div>
    </section>
  );
}
