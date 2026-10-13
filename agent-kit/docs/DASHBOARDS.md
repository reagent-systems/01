# DASHBOARDS.md — one dashboard per user type

Each user type gets one dashboard. Each dashboard has one main element and a
few secondary ones. Nothing else appears until it is needed.

**The test for every element:** does the user act on this today? If not, it
goes on a detail screen, not the dashboard.

## Buyer

Main element: a list of orders. Each row shows the product photo and name,
the price they pay, one state in plain words, and the ship date.

| State | Words | Action |
|---|---|---|
| Before the run starts | Waiting for N more buyers | Leave |
| Run started | In production | none |
| Shipped | Shipped | Track |
| Delivered | Delivered | Track |

Secondary: the saved payment method with a link to change it; the shipping address.

## Designer

Main element: a list of designs. Each row shows the design name and image,
waitlist count against trigger count (a number and one progress bar), the
current unit price and the margin per unit, and one state in plain words.

| State | Action |
|---|---|
| Draft, Needs fixes | Fix |
| Waitlist open | Share |
| Waitlist open and count has reached the trigger | Start run |
| In production, Shipped | View run |

"Start run" appears only when the waitlist reaches the trigger count. It is the one button.

Secondary: earnings (paid to date, next payout date and amount); a "New design" button.

## Shop

Main element: a list of jobs, sorted by due date. Each row shows the part name
and drawing thumbnail, the quantity, the due date, where to ship it, and the
pay amount and pay date.

| State | Action |
|---|---|
| Offered | Accept |
| Accepted | Start |
| In progress | Ship |
| Shipped | Report a problem |

Secondary: scorecard as three numbers (on-time rate, defect rate, response
time); open requests (new quotes, engineering changes), shown only when there are some.

## Off every dashboard

- Charts that do not change a decision.
- Activity feeds.
- Status badges and pills. The state is one line of plain text.
- Help text that explains the screen.
- Other users' data.

## Status of the build

The routes `/dashboard/buyer`, `/dashboard/designer`, `/dashboard/shop` render
sample data from `apps/web/src/lib/dashboards.ts`. They are noindex and absent
from the sitemap. There is no sign-in, no database, and the row actions are not
wired. Real data waits on the backend (ROADMAP).
