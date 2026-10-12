import { LegalPage } from "../../components/LegalPage";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Supplier Agreement",
  description: "Placeholder supplier agreement for shops on 01. Not final. Needs legal review.",
  path: "/supplier-agreement",
});

export default function SupplierAgreementPage() {
  return (
    <LegalPage
      title="Supplier Agreement"
      path="/supplier-agreement"
      sections={[
        "Quality terms and inspection",
        "Payment terms and withholding for confirmed faults",
        "Confidentiality and no-copy terms for design files",
        "Capacity and response commitments",
        "How a shop leaves the network",
      ]}
    />
  );
}
