import { PageHero } from "@01/ui";
import { InquiryForm } from "../../components/InquiryForm";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact 01 about designing hardware, joining as a shop, press, or feedback.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        baseUrl={site.url}
        eyebrow="Contact"
        title="Talk to Us"
        lead="Questions about a design, a shop, or the platform? Send a message. A person reads every one."
        short
      />
      <section className="section">
        <div
          className="container two-col"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)" }}
        >
          <aside>
            <table className="spec-table">
              <caption className="sr-only">Contact details</caption>
              <tbody>
                <tr>
                  <th scope="row">Company</th>
                  <td>{site.legalName}</td>
                </tr>
                {site.email && (
                  <tr>
                    <th scope="row">Email</th>
                    <td>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </aside>
          <InquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}
