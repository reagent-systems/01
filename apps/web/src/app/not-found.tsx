import { PageHero, SmartLink } from "@01/ui";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 · Out of tolerance"
      title="This page didn’t pass inspection."
      lead="The page you’re looking for has moved or doesn’t exist."
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
