import { Onboarding } from "../../components/Onboarding";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Get Started",
  description:
    "Answer a few questions and join 01 as a designer, buyer, or shop. A person reads every sign-up.",
  path: "/welcome",
});

export default function WelcomePage() {
  return (
    <>
      <Onboarding />
      <noscript>
        <p className="container">
          This form needs JavaScript. Use the <a href="/start">start page</a> or{" "}
          <a href="/contact">contact us</a> instead.
        </p>
      </noscript>
    </>
  );
}
