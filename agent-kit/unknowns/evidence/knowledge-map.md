# Knowledge Map: Finding and Closing What We Do Not Know

Companion to `hardware-platform-prompt.md`. Claude Code reads both files. This file defines:
1. A register of every fact, question, and blind spot for the platform.
2. A loop that moves items from "not known" to "solved."
3. A seed collection of items, sorted by domain.

---

## 1. The four fields

| Code | Field | Meaning | How it gets solved |
|---|---|---|---|
| KK | Known known | A fact we hold, with evidence. | Keep the evidence current. Re-check on a schedule. |
| KU | Known unknown | A question we can name but cannot answer yet. | Research, experiment, expert, or decision. |
| UK | Unknown known | Knowledge someone on the team has but has not written down or used. | Extraction: interviews, recordings, past chats, shop-floor walk-throughs. |
| UU | Unknown unknown | A gap we cannot name yet. | Discovery methods (Section 4). A UU becomes a KU the moment someone names it. |

An unknown unknown cannot be listed by definition. So the register does not list UUs as items. It lists **search zones**: places where blind spots are likely. Discovery methods run against each zone until it stops producing surprises.

Lifecycle of an item:

```
UU (search zone) --discovery--> KU --resolution--> KK
UK (tacit)       --extraction--> KK
KK               --re-check fails--> KU
KU               --cannot resolve--> ACCEPTED RISK (with owner and limit)
```

---

## 2. The register

### 2.1 Location
- `/kit/unknowns/register.yaml`: every item.
- `/kit/unknowns/evidence/`: source files, notes, call transcripts, test results.
- `/kit/unknowns/surprises.md`: append-only log of things that surprised us (Section 4.10).
- If the agent kit already defines a location for this kind of file, use the kit's location.

### 2.2 Item schema

```yaml
- id: PAY-07                    # domain code + number. Never reuse an ID.
  field: KU                     # KK | KU | UK | ZONE | ACCEPTED
  domain: payments
  statement: >
    Card chargebacks can arrive after we pay manufacturers on net-60.
    Who absorbs that loss?
  why_it_matters: Direct money loss per run; can wipe out Reagent's share.
  severity: critical            # critical | high | medium | low
  blocks_phase: 6               # phase number from the main prompt, or null
  confidence: 0.2               # 0 to 1. How sure we are of the current answer.
  current_answer: null          # best answer so far, or null
  evidence: []                  # paths in /kit/unknowns/evidence or URLs
  resolve_by: research+expert   # research | experiment | expert | decision | legal | extraction
  owner: kyle                   # kyle | colt | agent | lawyer | <name>
  next_action: Read Stripe Connect liability docs; ask a payments lawyer.
  done_when: A written rule for chargeback loss allocation, tested in simulation.
  recheck_every: 90d            # for KK items only
  opened: 2026-10-12
  updated: 2026-10-12
  history: []                   # list of {date, change, by}
```

### 2.3 Rules
1. Every item has an owner and a `done_when` line. An item without both is invalid.
2. A KK needs evidence. A claim with no evidence is a KU, not a KK.
3. Evidence ranks, best first: our own test result > primary source (law text, vendor docs, signed quote) > expert statement > secondary article > model output. Model output alone never makes a KK.
4. A `critical` KU blocks its phase. The phase cannot pass its acceptance test while it is open.
5. ACCEPTED RISK needs a limit ("we accept up to $X loss per run") and a review date.
6. Never delete an item. Close it, and keep its history.
7. Legal items close only with a lawyer's written answer. Agents may research and draft questions, but they do not close legal items.

### 2.4 Tooling
- `pnpm unknowns:lint`: validates the schema and the rules in 2.3.
- `pnpm unknowns:report`: prints counts by field, domain, and severity; lists blockers per phase; lists stale KKs past their re-check date.
- An internal page at `/ops/unknowns` in `apps/web` (operator login only) that renders the register as a filterable table and a coverage grid (domain × field).
- CI runs `unknowns:lint` on every pull request.

---

## 3. The loop

Wire this into the agent kit (`LOOP.md`, `WEEKLY.md`, or the kit's own files).

**Every work session**
- Before a task: list the register items in that task's domain. Read them.
- During a task: any surprise goes into `surprises.md` at once.
- After a task: convert each surprise into a KU or a KK. Update affected items.

**Every week**
1. Run `unknowns:report`.
2. Pick the top five open items by severity × phase proximity. Assign next actions.
3. Run one discovery method (Section 4) against one search zone. Rotate zones.
4. Run one extraction session (Section 5) with Kyle or Colt.
5. Re-check every KK past its date.
6. Record two metrics in the kit:
   - **Surprise rate:** new items found this week. It should fall over time inside each zone. A zone with a flat or rising rate is not understood yet.
   - **Burn-down:** open critical and high items. It should fall.

**Every phase gate**
- Run a pre-mortem (4.1) and a red-team pass (4.2) on that phase.
- No open critical items in the phase's domains.

---

## 4. Discovery methods (for unknown unknowns)

Each method states how to run it and what it must produce. Every method produces register items, never just notes.

### 4.1 Pre-mortem
Assume the platform failed one year from now. Write ten distinct stories of how it failed. For each story, name the first sign that would have warned us. Each story becomes at least one KU.

### 4.2 Red-team agents
Run separate agents, each with one hostile role. Each agent sees only the spec and the register, not the others' output:
- A buyer who wants a refund after the product ships.
- A manufacturer who wants to cut corners and keep payment.
- A manufacturer who wants to copy the design and sell it directly.
- A designer who uploads a design that is illegal or dangerous.
- A fraudster with stolen cards.
- A competitor's lawyer looking for a lawsuit.
- A state tax auditor.
- A customs officer.
- A journalist writing a "crowdfunded hardware failed" story.
Each agent returns a list of attacks. Each plausible attack becomes a KU.

### 4.3 Analog study
Study companies that did part of this. For each one, answer: what did they build, what broke, what kept them alive. Read primary sources where possible: filings, post-mortems, founder posts, regulator actions.

| Analog | Part it shares with us |
|---|---|
| Printify, Printful | Catalog + provider network + automatic routing |
| Kickstarter, Indiegogo, BackerKit | Buyer-funded production; delivery delays |
| Crowd Supply, Tindie | Crowdfunded electronics; fulfillment |
| Pebble | Crowdfunded hardware at scale; later collapse |
| Coolest Cooler | Crowdfunded hardware that failed to deliver; FTC action |
| Shapeways | On-demand manufacturing marketplace; bankruptcy |
| Xometry, Fictiv, Protolabs | Manufacturing networks; quoting; quality control |
| JLCPCB, PCBWay | PCB and assembly pricing; the price floor we compete with |
| Etsy, Amazon Marketplace | Platform liability, tax collection, counterfeit handling |
| Group-buy communities (mechanical keyboards) | Waitlist group buys; delays; organizer fraud |

Each lesson becomes a KU ("does this failure apply to us?") until we answer it.

### 4.4 Domain sweep
Walk every domain in Section 6. For each, ask these twelve questions:
1. Who can lose money here?
2. Who can get hurt here?
3. Who can sue here?
4. Which law or regulator touches this?
5. What breaks at 10× volume?
6. What breaks at 1 unit?
7. What happens across a border?
8. What happens when a step is late?
9. What happens when a party lies?
10. What do we assume is free that is not?
11. What does an expert in this domain check first?
12. What did the analogs get wrong here?

### 4.5 Expert interviews
Interview at least one person per role below before the phase where that role matters. Ask the twelve questions from 4.4, then: "What would you check that I did not ask about?" That last question is the main yield.

Roles: contract manufacturer owner; PCB assembly house engineer; quality manager; freight forwarder or customs broker; payments lawyer; product liability lawyer; sales tax specialist; insurance broker; a designer who shipped a crowdfunded product; a designer whose crowdfunded product failed; a shop-floor operator; a Printify or Etsy seller with volume.

Use the Boardy network and Reagent's community to find them. Record each interview to `/kit/unknowns/evidence/`.

### 4.6 Probes (small real tests)
A probe is the cheapest real action that can surprise us. Examples:
- Request quotes for the token counter case from five shops in three countries. Compare what each one asks for that we did not send.
- Ship one empty box through a full sequential chain.
- Run one real waitlist with ten friends and real saved cards. Charge one dollar at trigger.
- Ask three shops if they accept net-60 from a new customer.
Every probe ends with a written "what surprised us" list.

### 4.7 Failure mode analysis
For each step of the run state machine, list: failure mode, effect, cause, how we detect it, how often it may happen, how bad it is. Rank by severity × likelihood × how hard it is to detect. Top items become KUs with tests.

### 4.8 Assumption audit
Read the main prompt line by line. Mark every sentence that assumes something about the world ("shops quote with shipping included"). Each marked sentence becomes a KU until a probe or source confirms it.

### 4.9 Edge-of-scope scan
List everything the platform does not do (returns, warranty, international buyers, kids' products, batteries, food contact, wearables, medical claims). For each, ask: what happens when a user does it anyway? Each answer becomes an item.

### 4.10 Surprise log
Anyone, human or agent, writes any surprise to `surprises.md` the moment it happens: date, who, what was expected, what happened. Surprises are the most direct evidence of unknown unknowns. The weekly loop converts each one into items.

### 4.11 Data instrumentation
Every run emits events. Build anomaly checks: a node slower than its quote, a waitlist that stalls, a charge failure rate above normal. Each anomaly with no known cause becomes a KU.

---

## 5. Extraction methods (for unknown knowns)

### 5.1 Sources of tacit knowledge
| Source | What it likely holds | Method |
|---|---|---|
| Kyle | Software, AI agents, CMMC and compliance, supplier-intelligence work, the full product vision | Structured interview; walk-through of each spec section |
| Colt | The original idea; the 44-minute recorded call; any shop-floor or logistics experience | Transcribe the call; interview on each mechanism |
| Past Claude chats | Earlier decisions and open problems on this venture | Search and summarize into register items |
| Boardy contacts | Manufacturer and supplier practice (for example, a PCB design and sourcing contact) | Expert interview (4.5) |
| Reagent community | Builders who already tried to make hardware | Survey and short calls |

Rule: knowledge that belongs to an employer (for example, Ferrera Tooling customer data, pricing, supplier lists, or internal process documents) does not enter this register. General industry knowledge is fine. When unsure, leave it out and flag it.

### 5.2 Interview protocol
1. Pick one domain.
2. Ask the person to describe the last time they did that thing, step by step. Do not ask for opinions first.
3. At each step, ask: "What could go wrong here? What do you check? What do people new to this get wrong?"
4. Ask for one story where it went badly.
5. Write each new fact as a KK with the interview as evidence, and each doubt as a KU.

### 5.3 Shop-floor walk-through
Watch one real job at one real shop from purchase order to shipment. Record every handoff, every document, every wait. Compare it to the run state machine. Every mismatch becomes an item.

---

## 6. Resolution methods (for known unknowns)

| Method | Use when | Done when |
|---|---|---|
| research | A primary source likely exists | Source saved to evidence; answer written in plain words |
| experiment | Only reality can answer | Test run; result saved; surprises logged |
| expert | Judgment from practice matters | Interview recorded; answer and confidence written |
| decision | No fact exists; we must choose | Choice, reason, and review date in the decision log |
| legal | Law or liability is involved | Lawyer's written answer saved |
| accept | Cost to resolve exceeds the risk | Limit, owner, and review date written |

Agents may do research and draft experiments. Kyle or Colt make decisions. Lawyers close legal items.

---

## 7. Seed collection

Load every item below into `register.yaml` in Phase 1. Field codes as in Section 1. "ZONE" marks a search zone for unknown unknowns. Facts marked KK still need their evidence file attached; where an item says "verify," treat it as a KU until checked.

### 7.1 Vision and model (VIS)
| ID | Field | Item |
|---|---|---|
| VIS-01 | KK | Core flow: design → waitlist with group pricing → one button triggers every manufacturer → buyers fund the run. |
| VIS-02 | KK | First test articles: desk AI token counter (PCB in a case); modular housing scale model. |
| VIS-03 | KK | Planned pieces: per-part serialization, supplier scorecard, negotiation agent, node-graph interface, peer-to-peer engineering changes. |
| VIS-04 | KU | Which modular housing model ships first: cat tower, chicken coop, or dog house? (decision) |
| VIS-05 | KU | Who is the first paying designer who is not us? |
| VIS-06 | KU | Is the platform a marketplace (third-party designers) or a brand (our designs) at launch? Liability, tax, and payments differ. |
| VIS-07 | ZONE | Product categories we have not thought about that designers will try first. |

### 7.2 Team and structure (ORG)
| ID | Field | Item |
|---|---|---|
| ORG-01 | KK | Reagent takes equity or profit share in deals, in proportion to the work it does. |
| ORG-02 | KU | Entity: which legal entity runs the platform, and is it separate from Reagent Systems? (legal) |
| ORG-03 | KU | Written agreement with Colt: roles, ownership, decision rights, exit terms. (legal + decision) |
| ORG-04 | KU | Who answers support email at 2 a.m. when a run breaks? |
| ORG-05 | KU | Runway: what does the platform cost to run per month before revenue? |
| ORG-06 | UK | Colt's full idea as recorded in the 44-minute call. (extraction) |

### 7.3 Demand and market (MKT)
| ID | Field | Item |
|---|---|---|
| MKT-01 | KU | What fraction of waitlist signups save a card? What fraction of saved cards charge successfully at trigger? |
| MKT-02 | KU | How long will buyers wait between trigger and delivery before they ask for refunds? |
| MKT-03 | KU | Do designers trust a new platform with their files? |
| MKT-04 | KU | Price gap: can a multi-shop chain beat a single-vendor service such as JLCPCB plus a generic enclosure? |
| MKT-05 | KU | What share of designs reach their trigger count? |
| MKT-06 | ZONE | Who else is building this right now. Re-scan monthly. |

### 7.4 Pricing and unit economics (ECO)
| ID | Field | Item |
|---|---|---|
| ECO-01 | KU | One-time costs (NRE): molds, fixtures, stencils, programming. Who pays them, and how does the price curve amortize them? |
| ECO-02 | KU | Quote validity: shop quotes often expire in weeks. Waitlists may run for months. How do we lock prices, or re-quote at trigger without breaking buyer trust? |
| ECO-03 | KU | Scrap and yield: what overage per node do we order so the run still ships every unit? |
| ECO-04 | KU | Minimum order quantity per node, and how it sets the lowest trigger count. |
| ECO-05 | KU | Full landed cost per unit: parts, labor, shipping between nodes, duties, packaging, payment fees, returns, support, Reagent share. |
| ECO-06 | KU | Payment processor fees on many small charges vs. one large charge. |
| ECO-07 | ZONE | Hidden per-unit costs that appear only in a real run. |

### 7.5 Manufacturing and design for manufacture (MFG)
| ID | Field | Item |
|---|---|---|
| MFG-01 | KU | Tolerance stack-up across shops that never talk to each other. How do we set and check interface tolerances? |
| MFG-02 | KU | First article inspection per node before the full run. Who inspects, and to what standard? |
| MFG-03 | KU | Material substitution: a shop swaps a material or a part without telling us. How do we detect it? |
| MFG-04 | KU | Electronic part shortages and lead times between waitlist open and trigger. |
| MFG-05 | KU | Counterfeit electronic parts in the chain. |
| MFG-06 | KU | Revision control: a drawing changes mid-run. Which units carry which revision? |
| MFG-07 | KU | Base platforms: which enclosures and footprints do we standardize first? (Secondary. Custom designs are the main path.) |
| MFG-09 | KU | Can geometry-based estimates get within a useful range of real quotes for each process? Measure error per process. |
| MFG-10 | KU | Which design types will the decomposition step get wrong? Collect failures. |
| MFG-11 | KU | Which processes have no qualified shop in the network yet? |
| MFG-12 | KU | Process switch points: at what quantity does tooling (molds, dies) beat CNC or printing for typical parts? |
| MFG-13 | ZONE | Custom designs that fit no process in the catalog. |
| MFG-08 | ZONE | Process steps we have not modeled: finishing, coating, cleaning, programming firmware, testing, packaging, kitting. |

### 7.6 Supplier network (SUP)
| ID | Field | Item |
|---|---|---|
| SUP-01 | KU | Do shops accept net-60 from a new platform? Many small shops ask for a deposit. Verify with a probe. |
| SUP-02 | KU | How do we vet a shop before its first job? |
| SUP-03 | KU | Design leakage: a shop copies the design and sells it. What contract and technical controls apply? (legal) |
| SUP-04 | KU | Shops that answer only on WhatsApp: how reliable is a bridge, and what records do we keep? |
| SUP-05 | KU | Shop capacity: what happens when a run triggers and a shop is full? |
| SUP-06 | KU | Floor staff may have no terminal at each station. Is a phone scan workflow enough? |
| SUP-07 | ZONE | Reasons a good shop would refuse to join. |

### 7.7 Logistics and cross-border (LOG)
| ID | Field | Item |
|---|---|---|
| LOG-01 | KU | A sequential chain that crosses borders pays duties and waits at customs each time. Which chains must stay in one country? |
| LOG-02 | KU | Current US tariff rates and de minimis rules for each source country. These change often. Verify at each run. |
| LOG-03 | KU | Who is the importer of record for each shipment? |
| LOG-04 | KU | Lithium batteries: shipping classification and testing (verify UN 38.3 requirements). |
| LOG-05 | KU | Lost or damaged parts in transit between nodes: insurance and reship rules. |
| LOG-06 | KU | Final packaging and fulfillment: which node packs and ships to buyers? |
| LOG-07 | ZONE | Delays we cannot see until a real shipment moves. |

### 7.8 Quality and serialization (QUA)
| ID | Field | Item |
|---|---|---|
| QUA-01 | KU | Is sampling every 100th unit enough to catch a bad batch in time? Depends on run size and failure mode. |
| QUA-02 | KU | Who decides a part is bad when the upstream and downstream shops disagree? |
| QUA-03 | KU | QR stickers: do they survive the process (heat, coating, cleaning)? When do we need laser marking? |
| QUA-04 | KU | Warranty: who pays for a unit that fails after delivery? |
| QUA-05 | ZONE | Defects that only appear after assembly or after use. |

### 7.9 Payments and money flows (PAY)
| ID | Field | Item |
|---|---|---|
| PAY-01 | KK | Card authorizations expire in days, so saved payment methods (Stripe SetupIntent) plus a charge at trigger is the base design. Verify current Stripe docs. |
| PAY-02 | KU | Off-session charges in regions with strong customer authentication may need the buyer to return and confirm. What share of buyers does this affect? |
| PAY-03 | KU | Failed charge rate on cards saved months earlier. |
| PAY-04 | KU | Holding buyer funds and paying many shops: does our structure trigger money transmitter rules? Does Stripe Connect cover it? (legal) |
| PAY-05 | KU | Chargebacks can arrive after we pay shops on net-60. Who absorbs the loss? |
| PAY-06 | KU | Refunds after trigger but before shipment: who pays for parts already made? |
| PAY-07 | KU | Paying shops in other countries: currencies, fees, and tax forms. |
| PAY-08 | KU | Fraud: stolen cards joining waitlists to test cards. |

### 7.10 Legal and regulatory (LEG)
Every LEG item closes only with a lawyer's written answer.

| ID | Field | Item |
|---|---|---|
| LEG-01 | KU | FTC Mail Order Rule: ship-date promises, delay notices, refund options for preorders. |
| LEG-02 | KU | Product liability: courts have held some marketplaces liable as part of the chain of distribution. Does orchestrating manufacture make us the manufacturer or seller? |
| LEG-03 | KU | Designer agreement: who owns the design, who is liable for it, what license we get. |
| LEG-04 | KU | Supplier agreement: quality terms, payment withholding for faults, confidentiality, no-copy terms. |
| LEG-05 | KU | Buyer terms: what a buyer commits to on the waitlist; refund rights; state consumer laws. |
| LEG-06 | KU | Sales tax: marketplace facilitator laws in most US states may require us to collect and remit. |
| LEG-07 | KU | Reagent's profit share per project entity, and any investor money: securities review. Pure preorders are purchases, not investments, but any profit promise to buyers changes that. |
| LEG-08 | KU | FCC: a digital device needs Part 15 compliance; a device with a radio needs certification, and a certified module does not remove all host duties. Who is the responsible party per design? |
| LEG-09 | KU | Other regimes by category: children's products (CPSIA), California Prop 65, EU CE and RoHS if we sell in the EU, battery rules. |
| LEG-10 | KU | Export control beyond ITAR: EAR classification for electronics and encryption. |
| LEG-11 | KU | Banned categories: weapons and weapon parts, medical claims, and others. Write the list. |
| LEG-12 | KU | IP takedown process for designs that copy someone else's product. |
| LEG-13 | KU | Data privacy: buyer data, design files, call recordings between shops. |
| LEG-14 | ZONE | Laws in states and countries we ship to that we have not checked. |

### 7.11 Insurance (INS)
| ID | Field | Item |
|---|---|---|
| INS-01 | KU | Product liability insurance for the platform and per design. |
| INS-02 | KU | Cargo insurance between nodes. |
| INS-03 | KU | Errors and omissions for agent-made decisions (prices, drawing revisions). |
| INS-04 | KU | What insurers require from shops in the network. |

### 7.12 Trust and safety (TNS)
| ID | Field | Item |
|---|---|---|
| TNS-01 | KU | Review flow for every new design before publish. |
| TNS-02 | KU | Fake designs that collect waitlist cards and never intend to ship. |
| TNS-03 | KU | Designers who disappear after trigger. Who finishes the run? |
| TNS-04 | KU | Shops that take a job and go silent. |
| TNS-05 | ZONE | Abuse patterns we have not imagined. Run red-team agents (4.2) each phase. |

### 7.13 Technology and agents (TEC)
| ID | Field | Item |
|---|---|---|
| TEC-01 | KU | Can the DFM agent reliably read STEP files and drawings, or does it need a geometry tool? |
| TEC-02 | KU | ECR agent: how do we verify a drawing revision is correct before a human approves it? |
| TEC-03 | KU | Negotiation agent: what data source gives fair machine-time estimates? |
| TEC-04 | KU | Run state machine under partial failure: network splits, duplicate events, Stripe webhooks out of order. |
| TEC-05 | KU | Cost of agent calls per run at scale. |
| TEC-06 | ZONE | Failure modes of agents acting on money and drawings. |

### 7.14 Launch and brand (LCH)
| ID | Field | Item |
|---|---|---|
| LCH-01 | KU | Final brand name and domain. (decision) |
| LCH-02 | KU | Right to reuse the reference site's visual design. (decision; confirm) |
| LCH-03 | KU | Which creators fit the UGC brief, and what they charge. |
| LCH-04 | KU | FTC endorsement disclosure rules for each platform. |
| LCH-05 | KU | Real footage: which shops let us film? |
| LCH-06 | ZONE | How the "crowdfunded hardware failed" story could be told about us, and what proof prevents it. |

### 7.15 Support and after-sale (SUP-A)
| ID | Field | Item |
|---|---|---|
| SUPA-01 | KU | Returns: where does a returned unit go, and who inspects it? |
| SUPA-02 | KU | Spare parts and repairs after the run closes. |
| SUPA-03 | KU | Support volume per 100 units, and who handles it. |
| SUPA-04 | ZONE | Buyer problems that arrive months after delivery. |

---

## 8. Coverage grid

`/ops/unknowns` shows a grid: one row per domain, one column per field (KK, KU, UK, ZONE, ACCEPTED). Each cell shows a count and the share closed. Rules:
- A domain with zero UK items has not been through extraction yet.
- A domain with zero ZONE items has not been through a discovery sweep yet.
- A domain whose surprise rate has not fallen for four weeks gets a new discovery method, not more of the same one.

---

## 9. Definition of "solved"

The platform is ready for a public launch when:
1. No critical or high KU is open.
2. Every ZONE has had at least three discovery methods run against it, and its surprise rate has fallen for four straight weeks.
3. Every LEG item has a lawyer's written answer.
4. Every KK past its re-check date has been re-checked.
5. The Phase 8 pilot has shipped, and every surprise from it is closed.
