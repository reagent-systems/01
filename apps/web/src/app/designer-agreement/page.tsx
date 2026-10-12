import { LegalPage } from "../../components/LegalPage";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Designer Agreement",
  description: "Placeholder designer agreement for 01. Not final. Needs legal review.",
  path: "/designer-agreement",
});

export default function DesignerAgreementPage() {
  return (
    <LegalPage
      title="Designer Agreement"
      path="/designer-agreement"
      sections={[
        "Who owns the design",
        "The license 01 receives to quote, route, and make it",
        "Who is liable for the design",
        "Designs that are not allowed",
        "How a design is taken down",
      ]}
    />
  );
}
