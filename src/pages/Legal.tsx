import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";

type Section = { h: string; p: string[] };

function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-ink px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="label">Legal</p>
              <h1 className="mt-3 text-[11vw] font-light uppercase leading-none tracking-tight md:text-[4vw]">
                {title}
              </h1>
              <p className="mt-4 text-sm text-fog">Last updated {updated}</p>
            </Reveal>

            <div className="mt-12 space-y-10">
              {sections.map((s, i) => (
                <Reveal key={s.h}>
                  <h2 className="text-xl font-medium">
                    <span className="mr-3 text-fog">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </h2>
                  {s.p.map((t) => (
                    <p key={t} className="mt-3 text-[15px] leading-relaxed text-white/70">
                      {t}
                    </p>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

const UPDATED = "9 October 2026";

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      sections={[
        {
          h: "Who we are",
          p: [
            "KYRO is an online clothing store. When this page says we, us or our, it means KYRO. If you have any question about your data, email privacy@kyro.store.",
          ],
        },
        {
          h: "What we collect",
          p: [
            "Details you give us: your name, email, phone number and delivery address when you place an order, create an account or join our email list.",
            "Order details, such as what you bought and when, and any message you send us.",
            "Device and usage details, such as pages you visit and the browser you use. We only collect these through cookies if you allow them.",
          ],
        },
        {
          h: "How we use it",
          p: [
            "To take your order, deliver it, send order updates and handle returns.",
            "To send you news and offers, but only if you joined our email list. You can unsubscribe at any time using the link in any email.",
            "To improve our site, stop fraud and follow the law.",
          ],
        },
        {
          h: "Who we share it with",
          p: [
            "We share only what is needed with payment providers, delivery companies, and email and analytics tools that help us run the store. We do not sell your personal data.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "Order records are kept for as long as the law requires, usually several years for tax reasons. Email list details are kept until you unsubscribe. Cookie data is kept as described in our Cookie Policy.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "Depending on where you live, you may have the right to see the data we hold about you, correct it, delete it, object to how we use it, take it with you, or withdraw your consent at any time. Email privacy@kyro.store and we will reply as soon as we can.",
            "You can also complain to the data protection authority in your country.",
          ],
        },
        {
          h: "Children",
          p: ["Our store is not meant for children under 16, and we do not knowingly collect their data."],
        },
        {
          h: "Changes",
          p: ["If we change this policy, we will update the date at the top of this page."],
        },
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={UPDATED}
      sections={[
        {
          h: "Using our site",
          p: ["By using this site you agree to these terms. If you do not agree, please do not use it."],
        },
        {
          h: "Orders and payment",
          p: [
            "Prices are shown in US dollars. An order is only accepted when we send you a confirmation email. We may cancel an order if an item is out of stock or a price was shown by mistake, and we will refund you in full.",
          ],
        },
        {
          h: "Delivery",
          p: [
            "Delivery is free on orders over $50. Delivery times shown at checkout are estimates, not promises. Delays can happen and we will keep you updated.",
          ],
        },
        {
          h: "Returns and refunds",
          p: [
            "You can return unworn items with their tags within 14 days of receiving them. We refund the money to your original payment method once we receive and check the items. Faulty items can be returned at any time within a reasonable period.",
          ],
        },
        {
          h: "Discount codes",
          p: ["Codes can be used once per customer and cannot be combined with other offers unless stated."],
        },
        {
          h: "Our content",
          p: ["All text, images and designs on this site belong to KYRO or its partners. Please do not copy them without asking us first."],
        },
        {
          h: "Our responsibility",
          p: [
            "We take care to run this store well, but we cannot promise the site will always be free of errors or interruptions. Nothing in these terms removes rights you have under the law.",
          ],
        },
        {
          h: "Contact",
          p: ["Questions about these terms? Email hello@kyro.store."],
        },
      ]}
    />
  );
}

export function Cookies() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated={UPDATED}
      sections={[
        {
          h: "What cookies are",
          p: ["Cookies are small files saved on your device when you visit a website. They help the site remember things about you."],
        },
        {
          h: "Essential cookies",
          p: ["These keep your bag working and remember your cookie choices. The site cannot work properly without them, so they are always on."],
        },
        {
          h: "Analytics cookies",
          p: ["These show us which pages people visit and how they move around, so we can make the site easier to use. They are off unless you allow them."],
        },
        {
          h: "Marketing cookies",
          p: ["These help us show you offers that suit you on other sites. They are off unless you allow them."],
        },
        {
          h: "Changing your choice",
          p: [
            "You can change your choice at any time using Cookie settings at the bottom of any page. You can also delete or block cookies in your browser settings, but some parts of the site may stop working.",
          ],
        },
        {
          h: "Contact",
          p: ["Questions about cookies? Email privacy@kyro.store."],
        },
      ]}
    />
  );
}
