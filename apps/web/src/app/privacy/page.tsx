import { LegalPage } from "../../components/LegalPage";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "Placeholder privacy statement for 01. Not final. Needs legal review.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      path="/privacy"
      sections={[
        "What we collect from buyers, designers, and shops",
        "How design files and messages are stored",
        "Who receives data, and why",
        "How to ask for a copy or a deletion",
      ]}
    />
  );
}
