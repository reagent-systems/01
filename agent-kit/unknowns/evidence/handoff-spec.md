# Claude Code Handoff: One-Button Hardware Platform

Read this whole file and `knowledge-map.md` before you write code. Start in plan mode. Return a plan for my approval. Then build in the phases below.

`knowledge-map.md` defines the register of known and unknown items, and the loop that closes them. It is part of this spec. A phase cannot pass while a critical item in its domain is open.

---

## 0. Placeholders

- `{{PRODUCT_NAME}}`: working name of the platform. Use `Forge` until I give the final name.
- `{{DOMAIN}}`: production domain. Use `forge.example` until I give it.
- `{{AGENT_KIT_PATH}}`: path or repo of my agent kit. Ask me for it in your first message if you cannot find it.
- Owner: Reagent Systems (Reagent Logistics subsidiary). Co-founder on this venture: Colt.

---

## 1. The answer we sell

The question: "I want to design hardware, but I do not have the capital."

The answer: You publish a design. Buyers join a waitlist and commit a payment method. The price drops as more buyers join. At a target count, one button sends the order to every manufacturer in the chain at once. Buyers fund the run. The designer pays only with design time.

The model is Printify for physical products that need more than one manufacturer. Printify works because it has:
1. A fixed catalog of base products.
2. Vetted providers that already make those products.
3. A pipeline where an order goes in and a shipped product comes out with no manual steps.

We go past that structure. Printify only works with premade blanks. This platform must work for **any** design. A fully custom design is the main path, not an exception.

The trick: Printify standardizes the product. We standardize the **process**. Every custom design breaks down into parts. Every part breaks down into processes (CNC milling, sheet metal, injection molding, 3D printing, PCB fabrication, PCB assembly, casting, finishing, assembly, test, packing). Every shop declares which processes it runs, with limits. The platform matches parts to shops by process and limits, not by product.

1. **Process catalog.** A fixed list of manufacturing processes. Each process has a capability schema: materials, size envelope, tolerances, finishes, minimum and maximum quantity, lead time.
2. **Capability graph of shops.** Each shop is a node with one or more processes and its declared limits. Limits are checked against its real results over time (scorecard).
3. **Design decomposition.** Any uploaded design becomes a parts tree. Each part gets a process, a material, and a quantity. The DFM agent proposes this; the designer confirms or edits it.
4. **Instant quoting.** Each part gets a price estimate from its geometry and process (machine time, material, setup, tooling). Estimates start the price curve on the waitlist page. Real shop quotes replace estimates before trigger.
5. **Automatic routing.** The platform builds the chain graph by matching each part to qualified shops, and picks the assembly path (parallel, sequential, or mixed).
6. **The chain.** A directed graph of nodes. Parts flow along the edges. One button starts the whole graph.

Base platforms (standard enclosures, PCB footprints, standoff patterns, modular frames) still exist. They are shortcuts that make quoting faster and cheaper. They are never a requirement.

---

## 2. Agent kit (mandatory)

I run my work through an agent kit of named files. Examples: `AGENTS.md`, `LOOP.md`, `WEEKLY.md`. The rule is "thin loop prompt, thick spec": intelligence lives in the kit files, not in long prompts.

1. Locate the kit at `{{AGENT_KIT_PATH}}`. Read every file in it.
2. Install the kit into the monorepo root. Fill each file with content for this project.
3. Put all instructions, status updates, roadmaps, and changelogs in the kit files. Do not create a parallel system of docs.
4. Every phase in Section 9 ends with an update to the kit files.
5. If a kit file expects a format, follow that format exactly.
6. If the kit does not have a file for something this project needs, propose the new file to me before you create it.

---

## 3. Monorepo

- Package manager: pnpm workspaces.
- Build system: Turborepo.
- Language: TypeScript everywhere, strict mode.
- Lint and format: Biome or ESLint + Prettier. Pick one and keep it.

```
/apps
  /web          Next.js (App Router). Marketing site + designer app + buyer pages. Deploys to Vercel.
  /supplier     Next.js. Supplier portal: node graph, jobs, drawings, scorecard. Deploys to Vercel.
  /floor        Expo (React Native). Mobile app for shop-floor staff: scan, status, photo, report fault.
  /api          Node service (Hono or Fastify). Deploys to Google Cloud Run.
  /orchestrator Worker service. Runs the chain state machine. Deploys to Google Cloud Run.
  /agents       Worker service. Negotiation agent, DFM agent, ECR agent. Deploys to Google Cloud Run.
  /launch       Remotion project for launch reels and product videos.
/packages
  /ui           Design system: tokens, components. Shared by web, supplier, and launch.
  /db           Schema and migrations (Drizzle + Postgres).
  /core         Domain logic: pricing curves, chain graph, serialization, payouts. No I/O.
  /sdk          Typed client for /api.
  /config       Shared tsconfig, lint, env schema (zod).
/infra
  /terraform    All Google Cloud resources.
/kit            Agent kit files (or at root, if the kit expects root).
```

Rules:
- `/packages/core` has no network or database calls. It has full unit tests.
- Every app reads env vars through one zod schema in `/packages/config`.
- No secrets in the repo.

---

## 4. Website design

The visual design must match the live site at https://ferrera-tooling-website.vercel.app.

How to match it:
1. Open the site in a browser. Take screenshots of every section at desktop width and at 390px width.
2. Read its computed CSS. Extract the exact color values, font families, font weights, font sizes, letter spacing, line heights, spacing scale, border radii, and motion timings.
3. Write those values as tokens in `/packages/ui/tokens`.
4. Rebuild these patterns as components:
   - Dark theme. Black background (`#000000` theme color).
   - Full-bleed background video in the hero.
   - Short uppercase eyebrow label above each section heading.
   - Numbered items ("01", "02", "03") for principles and services.
   - Three large video cards that link to the main sections.
   - Service grid where each card has a number, a type label, a title, a short description, and a "Learn more →" link.
   - Checklist section with check marks and a bold lead phrase on each item.
   - FAQ section.
   - Closing call-to-action band with two buttons.
   - Large footer with grouped link columns.
5. Compare your build to the original side by side with screenshots. Fix differences until they match.

Hard limits:
- Copy the design system only. Do not copy the Ferrera Tooling name, logo, wordmark, text, phone number, address, videos, or images.
- Use our own brand name, our own copy, and our own media.
- Do not link to Ferrera Tooling anywhere.

UI rules (my standing preferences):
- No explanatory microcopy. No subtitles or taglines under headings unless the section pattern above needs one.
- No status badges or pills.
- No toasts or helper text that narrates state.
- Keep only the core interactive elements.
- All copy must read as written by a person. No generic AI phrasing.

---

## 5. Product: the system

### 5.1 Roles
- **Designer.** Publishes a design. Sets the target count and the price curve.
- **Buyer.** Joins a waitlist. Saves a payment method. Gets charged only when the run triggers.
- **Manufacturer (node).** Makes one part or does one step. Ships to the next node.
- **Assembler.** A node that joins parts from parallel nodes.
- **Operator.** Reagent staff. Vets suppliers, watches runs, resolves disputes.

### 5.2 Design intake (custom first)
- The default path is a full custom upload. A base platform is an optional starting point.
- Accepted files: STEP, STL, DXF, PDF drawings, KiCad and Gerber files, BOM as CSV, assembly instructions.
- Store files in Google Cloud Storage. Version every file. Never overwrite.
- **Geometry service.** Run a CAD kernel (Open CASCADE via a Python worker on Cloud Run) to read STEP files. Extract per part: bounding box, volume, surface area, features (holes, pockets, threads, thin walls, undercuts), and minimum feature size. For PCBs, read Gerbers and the BOM: layer count, board size, part count, fine-pitch parts.
- **Decomposition.** The DFM agent uses geometry data to build the parts tree. For each part it proposes a process and a material, and lists alternatives with cost and lead-time trade-offs (for example, CNC at 50 units vs. molding at 5,000 units).
- **Process switch points.** The price curve can switch process at a tier. Low tiers use low-setup processes (CNC, 3D printing). High tiers unlock tooled processes (molding, casting, stamping). The waitlist page shows this as a price break.
- **DFM feedback.** The agent flags tolerance problems, missing drawings, features no shop in the network can make, and cheaper design changes. Every flag links to the exact feature.
- **Gaps in the network.** If no qualified shop exists for a part, the platform opens a sourcing request to the supplier network and to the operator. The design can still open a waitlist, marked with an estimated price.
- Each design compiles into a **chain graph**: nodes (parts or steps) and edges (ship-to relations).

### 5.2a Quoting engine
- Estimate cost per part from geometry, process, material, and quantity: setup time, machine time, material cost, tooling cost, finishing.
- Start with simple parametric models per process. Store every real shop quote. Use real quotes to correct the models over time.
- Every estimate carries a confidence range. The waitlist page shows the range until real quotes arrive.
- Request real quotes from matched shops automatically when a waitlist reaches a set share of its trigger count.
- Track quote expiry dates. Re-quote before trigger if a quote has expired.

### 5.2b Shop capabilities
- A shop onboards by selecting processes from the process catalog and filling each capability schema.
- The platform tests declared limits with a paid qualification part before a shop's first real job.
- Scorecard data updates the shop's effective limits (for example, the tolerance it actually holds).
- Support two topologies and any mix of them:
  - Parallel: many nodes feed one assembler.
  - Sequential: node A ships to node B, B adds a part and ships forward.

### 5.3 Waitlist and pricing
- Each design page shows the current price, the next price break, and the count to trigger.
- Price curve: tiered. Each tier has a buyer count and a unit price. Quotes from nodes set the tiers.
- Buyers save a card with a Stripe SetupIntent. Do not use card authorizations to hold funds; they expire in days.
- At trigger, charge every buyer off-session. Handle failed charges with retries and a short grace window. If too many charges fail, the run drops to a lower tier or does not start.
- Show the ship date before a buyer joins. Follow the FTC Mail, Internet, or Telephone Order Merchandise Rule: if a ship date slips, notify buyers and offer a refund.
- A buyer can leave the waitlist at any time before trigger with no charge.

### 5.4 The one button
- The designer (or the operator) presses "Start run."
- The orchestrator:
  1. Confirms each node accepted its quote and capacity.
  2. Charges buyers.
  3. Issues a purchase order to every node at once.
  4. Generates serial codes for every part in the run.
  5. Sends QR (or NFC) label files to each node, mapped to that node's parts.
  6. Starts tracking.
- Model the run as an explicit state machine in `/packages/core`. Every transition writes an event. The event log is the source of truth.
- Use Pub/Sub or Cloud Tasks for steps. Every step must be idempotent and safe to retry.

### 5.5 Serialization and fault routing
- Every part gets a unique serial code. The code maps to one node, one part, one run.
- Floor staff scan a code at each step in the `/floor` app. A scan records status, time, and an optional photo.
- A downstream node or a buyer can report a bad part by scanning its code.
- The report routes to the node that made the part.
- Payment terms to nodes are net-60. A confirmed fault withholds payment for that part. The node at fault pays the reship cost.
- Every dispute has an operator review step before money is withheld.

### 5.6 Payouts
- Use Stripe Connect for node payouts.
- Hold buyer funds until each payout date.
- Payout amounts and fees come from `/packages/core`. Test them with property-based tests.
- Reagent's share comes out of each run as a configured percentage. Make it a setting per run.

### 5.7 Shipping
- Each node quotes with shipping included to the next node.
- The last node ships to buyers. Integrate one shipping API (EasyPost or Shippo) for labels and tracking.
- Buyers see one tracking view for their unit.

### 5.8 Quality control
- Sample QC: inspect one unit per configurable interval (default: every 100th).
- The sampled unit gets an inspection record with photos and measurements.
- A failed sample pauses the node and alerts the operator.

### 5.9 Supplier portal (`/apps/supplier`)
- Node-graph canvas, similar to n8n. Use React Flow.
- Each node shows the shop, the part, and its current status.
- Click a node: see the drawing, the BOM line, the quote, and open a call with that shop.
- **Engineering changes (ECR).** Two nodes open a live call and a shared drawing. They mark up the drawing. The ECR agent checks the change against the design and revises the drawing. The designer approves the change before it takes effect.
- **Cost-reduction requests.** A downstream node can propose a change that removes machine operations upstream. The upstream node can lower its price if the designer accepts the change.
- **Scorecard.** On-time rate, defect rate, response time, quote accuracy. The only reward is a higher chance of selection.
- **Messaging.** In-app chat. Add a WhatsApp Business API bridge, because many overseas shops answer only on WhatsApp.

### 5.10 Agents (`/apps/agents`)
- Use the Anthropic API. Keep prompts short. Put the knowledge in data and in kit-style spec files.
- **Negotiation agent.** Holds comparison prices and machine-time estimates. Rejects a first quote that is far above the estimate and states the reason. A human approves every final price.
- **DFM agent.** Reviews uploads (Section 5.2).
- **ECR agent.** Verifies and revises drawings (Section 5.9).
- Log every agent action. Every agent output that changes money or a drawing needs human approval.

### 5.11 Compliance flags (build these into the product, not as notes)
- Electronics: track FCC status per design. Every digital device needs Part 15 compliance. A device with a radio needs certification; a pre-certified module reduces this work but does not remove all host-device duties. Show the designer what the design needs before publish.
- Batteries: flag lithium cells for shipping rules.
- Product liability and terms: generate placeholders for terms of service, designer agreement, and supplier agreement. Mark them "needs legal review." Do not present them as final.
- Export control: block ITAR-marked uploads entirely. Reagent Defense work does not run on this platform.

---

## 6. Google Cloud deployment

All of it in Terraform under `/infra/terraform`.

- Cloud Run: `api`, `orchestrator`, `agents`.
- Cloud SQL: Postgres 16, private IP.
- Cloud Storage: design files, label files, inspection photos.
- Pub/Sub and Cloud Tasks: run steps.
- Cloud Scheduler: payout runs, QC sampling, waitlist reminders.
- Secret Manager: every key.
- Artifact Registry: container images.
- Cloud Logging and Error Reporting, with alerts to email.
- Two environments: `staging` and `prod`. Separate projects.
- GitHub Actions: test, build, deploy to staging on merge to `main`; deploy to prod on tag.

Vercel:
- `apps/web` and `apps/supplier` deploy to Vercel. Preview deploy on every pull request.
- They call the API through `/packages/sdk`.

---

## 7. Premade use-case pages

Each page answers "I want to design hardware but I don't have the capital" for one type of person. Each page shows the path from idea to shipped unit, the base platforms that fit, an example chain graph, and a live example design with a waitlist.

Build these pages:
1. `/for/inventors`: one person, one idea, no factory contacts.
2. `/for/hobbyists`: maker projects that deserve a real run.
3. `/for/startups`: first production run without a seed round.
4. `/for/creators`: creators with an audience who want a physical product.
5. `/for/open-source`: open hardware projects that need a funded batch.
6. `/for/educators`: kits for classrooms and labs.
7. `/for/manufacturers`: shops that want to join as nodes.
8. `/for/engineers`: engineers with a side project and no capital.

Also build:
- `/how-it-works`: the full flow, with the chain graph shown as an animated diagram.
- `/platforms`: the base platform catalog.
- `/designs/[slug]`: public design page with waitlist.
- `/start`: the designer onboarding flow.

Seed two real launch designs:
1. **Desk AI token counter.** A PCB in a case. Fix the PCB footprint and the standoff pattern so later boards reuse the case. This becomes the first base platform.
2. **Modular housing scale model.** A cat tower, chicken coop, or dog house. Ask me which one.

Do not fill these pages with invented testimonials, invented reviews, or invented user counts. Use real data from the seeded designs, or leave the slot out.

---

## 8. Launch

Build a launch kit in `/apps/launch` and `/kit/launch`.

### 8.1 Reels
- Use Remotion. Make templates that pull live data from a design (price curve, waitlist count, chain graph).
- Templates:
  1. "One button": the chain graph lights up node by node.
  2. "Price drops": the price falls as the waitlist grows.
  3. "Part journey": one serial code traced from raw stock to a buyer's desk.
  4. "From sketch to shipped": the token counter, end to end.
- Export 9:16 for Reels, TikTok, and Shorts. Export 16:9 for X and YouTube.
- Write a shot list for real footage we must film ourselves: shops, machines, the first box opened.

### 8.2 UGC
- Write a creator brief: what the product is, what to show, what to say in their own words, what not to claim.
- Build a creator intake page and a tracker (who, platform, status, post link).
- Every paid or gifted post must carry a clear disclosure (#ad or the platform's paid-partnership label), per FTC rules.
- Do not write scripts that make a creator claim experience they did not have.

### 8.3 Launch plan
- A dated launch calendar in the kit files: teaser, waitlist open, first trigger, first ship, first unboxing.
- Posts for X, LinkedIn, Discord, and the Reagent community. Draft them; I approve before anything posts.
- A launch-day dashboard: waitlist count, conversion, traffic source, trigger progress.

---

## 9. Phases and acceptance tests

Do not start a phase until the previous phase passes its tests. Update the kit files at the end of each phase.

**Phase 1: Foundation**
- Monorepo, tooling, CI, Terraform for staging, empty apps deployed.
- Knowledge register from `knowledge-map.md`: schema, seed items, `unknowns:lint`, `unknowns:report`, and the `/ops/unknowns` page.
- Design tokens extracted and the component set built.
- Pass: every app deploys to staging. Screenshot comparison of the home page against the reference shows matching layout, type, and color.

**Phase 2: Core domain**
- Chain graph, state machine, pricing curves, serialization, payouts in `/packages/core`.
- Pass: unit and property tests cover every state transition and every money calculation. 100% branch coverage in `/packages/core`.

**Phase 3: Designer and buyer flows**
- Upload, geometry service, decomposition, quoting engine, shop capability onboarding, DFM agent, base platforms, design pages, waitlist, Stripe SetupIntent.
- Pass: three fully custom test designs (one machined assembly, one sheet-metal-and-PCB device, one mixed plastic-and-metal product) each decompose into a parts tree, match to mock shops, get a price curve with confidence ranges, and reach trigger with 50 test buyers in Stripe test mode. None of them may use a base platform.

**Phase 4: The one button**
- Orchestrator, purchase orders, labels, charging, failure handling.
- Pass: a simulation with 6 mock nodes in a mixed parallel and sequential chain runs from trigger to delivered. Inject failures: a declined card, a node that does not respond, a bad part. The run must recover or stop cleanly in each case. No double charges. No lost events.

**Phase 5: Supplier side**
- Supplier portal, node graph, scorecard, ECR, messaging, WhatsApp bridge, `/floor` app with scanning.
- Pass: a mock shop completes a full job only through the portal and the floor app.

**Phase 6: Money out**
- Stripe Connect payouts, net-60 schedule, fault withholding, reship billing.
- Pass: the simulation from Phase 4 ends with correct payouts to every node, verified against `/packages/core`.

**Phase 7: Pages and launch**
- All use-case pages, Remotion templates, UGC intake, launch calendar.
- Pass: Lighthouse score 95+ on performance, accessibility, and SEO for every marketing page. Every reel template renders from live staging data.

**Phase 8: Real pilot**
- Run the desk token counter with real nodes and real buyers in a small batch.
- Pass: units ship. Every serial code has a complete trace. Every node is paid correctly.

---

## 10. Working rules

- Ask me before: choosing the final brand name, choosing a payment provider other than Stripe, spending money on any service, or posting anything public.
- Do not ask me about choices with a clear default. Pick the default and note it in the kit files.
- Keep a decision log in the kit files.
- Write tests before or with every feature in `/packages/core` and `/apps/orchestrator`.
- When something is a legal question (securities, payments, product liability, export control), stop and flag it in the kit files. Do not guess.
