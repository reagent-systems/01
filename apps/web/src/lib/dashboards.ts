export type Role = "buyer" | "designer" | "shop";
export const roles: Role[] = ["buyer", "designer", "shop"];

/** Money is whole cents; dates are ISO days. */
export type Cents = number;

export type BuyerOrder = {
  id: string;
  product: string;
  price: Cents;
  state: "waiting" | "production" | "shipped" | "delivered";
  /** Buyers still needed to reach the trigger, while the state is "waiting". */
  needed: number;
  shipDate: string;
};

export type DesignerDesign = {
  id: string;
  name: string;
  state: "draft" | "needs-fixes" | "waitlist" | "production" | "shipped";
  waitlist: number;
  trigger: number;
  unitPrice: Cents;
  marginPerUnit: Cents;
};

export type ShopJob = {
  id: string;
  part: string;
  state: "offered" | "accepted" | "in-progress" | "shipped";
  quantity: number;
  due: string;
  shipTo: string;
  pay: Cents;
  payDate: string;
};

export const buyerStateText = (o: BuyerOrder) =>
  ({
    waiting: `Waiting for ${o.needed} more ${o.needed === 1 ? "buyer" : "buyers"}`,
    production: "In production",
    shipped: "Shipped",
    delivered: "Delivered",
  })[o.state];

/** Leave before the run starts, Track after shipping, nothing in between. */
export const buyerAction = (o: BuyerOrder) =>
  ({ waiting: "Leave", production: null, shipped: "Track", delivered: "Track" })[o.state];

export const designerStateText = (d: DesignerDesign) =>
  ({
    draft: "Draft",
    "needs-fixes": "Needs fixes",
    waitlist: "Waitlist open",
    production: "In production",
    shipped: "Shipped",
  })[d.state];

export const triggerReached = (d: DesignerDesign) =>
  d.state === "waitlist" && d.waitlist >= d.trigger;

/** "Start run" replaces "Share" only when the waitlist has reached the trigger. */
export const designerAction = (d: DesignerDesign) => {
  if (triggerReached(d)) return "Start run";
  return {
    draft: "Fix",
    "needs-fixes": "Fix",
    waitlist: "Share",
    production: "View run",
    shipped: "View run",
  }[d.state];
};

export const shopAction = (j: ShopJob) =>
  ({
    offered: "Accept",
    accepted: "Start",
    "in-progress": "Ship",
    shipped: "Report a problem",
  })[j.state];

export const byDue = (jobs: ShopJob[]) => [...jobs].sort((a, b) => a.due.localeCompare(b.due));

export const money = (c: Cents) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(c / 100);

export const day = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

/** Sample data for the preview. Replace with account data when the backend exists. */
export const sample = {
  buyer: {
    orders: [
      {
        id: "o1",
        product: "Desk AI Token Counter",
        price: 9900,
        state: "waiting",
        needed: 38,
        shipDate: "2026-12-15",
      },
      {
        id: "o2",
        product: "Desk AI Token Counter, black case",
        price: 10900,
        state: "shipped",
        needed: 0,
        shipDate: "2026-10-02",
      },
    ] satisfies BuyerOrder[],
    payment: "Card ending 4242",
    address: "12 Example Street, Springfield",
  },
  designer: {
    designs: [
      {
        id: "d1",
        name: "Desk AI Token Counter",
        state: "waitlist",
        waitlist: 62,
        trigger: 100,
        unitPrice: 9900,
        marginPerUnit: 1800,
      },
      {
        id: "d2",
        name: "Cable Comb",
        state: "waitlist",
        waitlist: 40,
        trigger: 40,
        unitPrice: 2400,
        marginPerUnit: 500,
      },
      {
        id: "d3",
        name: "Soldering Stand",
        state: "needs-fixes",
        waitlist: 0,
        trigger: 60,
        unitPrice: 4900,
        marginPerUnit: 900,
      },
    ] satisfies DesignerDesign[],
    earnings: { paid: 120000, nextDate: "2026-11-01", nextAmount: 36000 },
  },
  shop: {
    jobs: [
      {
        id: "j1",
        part: "Case shell, 3D printed",
        state: "offered",
        quantity: 100,
        due: "2026-11-20",
        shipTo: "Assembly shop, Springfield",
        pay: 180000,
        payDate: "2026-12-05",
      },
      {
        id: "j2",
        part: "Mounting bracket",
        state: "in-progress",
        quantity: 100,
        due: "2026-11-05",
        shipTo: "Assembly shop, Springfield",
        pay: 90000,
        payDate: "2026-11-25",
      },
    ] satisfies ShopJob[],
    scorecard: { onTime: "96%", defects: "1.2%", response: "3 h" },
    requests: { quotes: 2, changes: 1 },
  },
};
