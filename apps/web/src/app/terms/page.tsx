import { LegalPage } from "../../components/LegalPage";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Placeholder terms of service for 01. Not final. Needs legal review.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      path="/terms"
      sections={[
        "What a buyer commits to by joining a waitlist",
        "When a saved card is charged, and how failed charges are handled",
        "Ship dates, delay notices, and refunds",
        "Returns, faults, and warranty",
        "Disputes and governing law",
      ]}
    />
  );
}
