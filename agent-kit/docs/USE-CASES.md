# Use cases

Each case has the same shape.
**Start** names who acts and what begins the case. **Act** states what the
system does. **Result** states what the actor can see when it ends.

## Publish a design

**Start.** A designer uploads STEP, STL, DXF, Gerber, BOM, and drawings.
**Act.** The geometry service reads each part. The DFM agent proposes a parts tree with a process and a material per part. The designer confirms or edits it.
**Result.** The design gets a page with an estimated price curve and a confidence range.

## Join a waitlist

**Start.** A buyer opens a design page and sees the price, the next price break, and the ship date.
**Act.** The buyer saves a card. The system charges nothing.
**Result.** The count rises and the price falls at each tier. The buyer can leave before trigger at no cost.

## Start a run

**Start.** The designer or an operator presses "Start run".
**Act.** The orchestrator confirms every node, charges every buyer, sends a purchase order to every node at once, and issues serial codes and label files.
**Result.** The run shows each node and its status. A declined card, a silent node, or a bad part stops or recovers the run cleanly.

## Join as a node

**Start.** A shop selects processes from the catalog and fills each capability schema.
**Act.** The platform tests the declared limits with a paid qualification part.
**Result.** The shop receives jobs that match its real limits. Its scorecard changes its chance of selection.

## Make and scan parts

**Start.** Floor staff receive a job in the floor app.
**Act.** They scan a serial code at each step and add a photo when needed.
**Result.** Every part has a complete trace from raw stock to the next node.

## Report a bad part

**Start.** A downstream node or a buyer scans a serial code and reports a fault.
**Act.** The report routes to the node that made the part. An operator reviews it before money is withheld.
**Result.** A confirmed fault withholds payment for that part. The node at fault pays the reship cost.

## Change a drawing

**Start.** Two nodes open a live call on a shared drawing and mark it up.
**Act.** The ECR agent checks the change against the design and revises the drawing.
**Result.** The designer approves the change before it takes effect. Every unit carries a known revision.

## Close an unknown

**Start.** An operator or an agent opens the register report.
**Act.** They pick the top open items, run a discovery or extraction method, and update the items with evidence.
**Result.** An item moves from unknown to known, or becomes an accepted risk with a limit. The surprise rate and burn-down fall.

## Turn feedback into a record

**Start.** Anyone files a feedback, surprise, or unknown issue on GitHub.
**Act.** The triage routine reads the issue, links register items, writes a surprise entry or a new item, and replies with the outcome.
**Result.** The issue carries the register ID. The register carries the issue number.
