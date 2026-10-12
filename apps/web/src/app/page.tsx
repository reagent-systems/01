import {
  CardGrid,
  Checklist,
  CtaBand,
  Eyebrow,
  Faq,
  Footer,
  Header,
  Heading,
  Hero,
  Section,
} from "@01/ui";

const steps = [
  {
    id: "step-1",
    type: "Step",
    title: "Publish a design",
    body: "Upload STEP, STL, DXF, Gerber, and BOM files. The geometry service reads every part. The DFM agent proposes a parts tree.",
  },
  {
    id: "step-2",
    type: "Step",
    title: "Get a price",
    body: "Each part gets an estimate from its geometry, process, and quantity. Real shop quotes replace the estimates before trigger.",
  },
  {
    id: "step-3",
    type: "Step",
    title: "Join the waitlist",
    body: "Buyers save a card and pay nothing. The unit price falls at each tier as the count rises.",
  },
  {
    id: "step-4",
    type: "Step",
    title: "Press start",
    body: "One button confirms every shop, charges every buyer, and sends a purchase order to the whole chain at once.",
  },
  {
    id: "step-5",
    type: "Step",
    title: "Track every part",
    body: "Each part carries a serial code. Floor staff scan it at every step. A bad part routes to the shop that made it.",
  },
  {
    id: "step-6",
    type: "Step",
    title: "Ship to buyers",
    body: "The last shop ships the unit. Buyers see one tracking view from raw stock to their desk.",
  },
];

const checks = [
  { lead: "No capital.", text: "Buyers fund the run. The designer pays with design time." },
  {
    lead: "No factory contacts.",
    text: "Every part matches to qualified shops by process and limits.",
  },
  {
    lead: "No early charges.",
    text: "A card is charged only at trigger. Leave the waitlist before then at no cost.",
  },
  { lead: "No lost parts.", text: "Every part has a serial code and a full trace." },
  {
    lead: "No unpaid faults.",
    text: "A confirmed fault withholds payment for that part. The shop at fault pays the reship.",
  },
];

const faq = [
  {
    q: "When is my card charged?",
    a: "At trigger. A saved card holds no funds, and nothing is authorized before then.",
  },
  { q: "Can I leave the waitlist?", a: "Yes. Leave at any time before trigger and pay nothing." },
  {
    q: "What if the ship date slips?",
    a: "You get a notice and the option of a refund.",
  },
  {
    q: "What can I design?",
    a: "Any design. A custom upload is the main path. Standard enclosures and footprints are shortcuts, never requirements.",
  },
];

export default function Home() {
  return (
    <>
      <Header
        links={[
          { href: "#how", label: "How it works" },
          { href: "#why", label: "Why 01" },
          { href: "#faq", label: "FAQ" },
        ]}
        action={{ href: "#how", label: "How it works" }}
      />
      <main>
        <Hero
          panels={[
            { href: "#step-1", label: "Publish" },
            { href: "#step-3", label: "Fund" },
            { href: "#step-4", label: "Build" },
          ]}
        />

        <Section id="how" first>
          <Eyebrow>How it works</Eyebrow>
          <Heading>
            One button
            <br />
            starts every shop
          </Heading>
          <CardGrid cards={steps} />
        </Section>

        <Section id="why">
          <div className="split">
            <div>
              <Eyebrow>Why 01</Eyebrow>
              <Heading>
                Built for people
                <br />
                without a factory
              </Heading>
              <p className="lede">
                Printify standardizes the product. 01 standardizes the process, so any design works.
              </p>
            </div>
            <Checklist items={checks} />
          </div>
        </Section>

        <Section id="faq">
          <div className="split">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <Heading>
                Questions
                <br />
                people ask
              </Heading>
            </div>
            <Faq items={faq} />
          </div>
        </Section>

        <CtaBand
          title={
            <>
              Ready to build
              <br />
              without capital?
            </>
          }
          body="Publish a design. Let the waitlist fund the run."
          primary={{ href: "#how", label: "How it works" }}
          secondary={{ href: "#faq", label: "FAQ" }}
        />
      </main>
      <Footer
        blurb="Design hardware without capital."
        columns={[
          {
            title: "Product",
            links: [
              { href: "#how", label: "How it works" },
              { href: "#why", label: "Why 01" },
              { href: "#faq", label: "FAQ" },
            ],
          },
          {
            title: "Steps",
            links: [
              { href: "#step-1", label: "Publish a design" },
              { href: "#step-3", label: "Join the waitlist" },
              { href: "#step-4", label: "Press start" },
            ],
          },
        ]}
        legal="© 2026 Reagent Systems. All rights reserved."
      />
    </>
  );
}
