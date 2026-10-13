import { PageHero, SmartLink } from "@01/ui";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 · Out of tolerance"
      title="Page not found."
      lead="That address has moved or does not exist."
    >
      <div className="btn-row">
        <SmartLink href="/" className="btn btn-solid">
          Back home
        </SmartLink>
        <SmartLink href="/how-it-works" className="btn">
          How it works
        </SmartLink>
      </div>
    </PageHero>
  );
}
