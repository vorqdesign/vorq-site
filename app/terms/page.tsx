import Link from "next/link";
import { site } from "../content";
import { LegalPage } from "../legal";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Terms of service",
  description: "The terms for using vorq.agency and VORQ Lab tools, and the default terms for projects with the VORQ studio.",
  path: "/terms",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="20 October 2026"
      summary={[
        "Prices on the site are starting points. Your written quote is what binds us both.",
        "Once the project is paid in full, you own the code and designs we made for you.",
        "Lab subscriptions renew until you cancel, and you keep access until the period ends.",
        "Indian law applies. Questions about anything here go to " + site.email + ".",
      ]}
    >
      <p>
        These terms apply when you use vorq.agency, use a tool published under VORQ Lab (such as Gradient Forge), or hire VORQ
        (“we”, “us”), an independent design engineering studio based in India. By using the site or a tool, or by accepting a
        quote, you agree to them. Our <Link href="/privacy">privacy policy</Link> explains how we handle personal data.
      </p>

      <h2>Using the site</h2>
      <p>
        You’re welcome to read, share and link to anything here. The site’s design, code, text and graphics belong to VORQ
        unless marked otherwise, so please don’t copy them wholesale or pass them off as your own. Don’t try to break, overload
        or scrape the site in ways that harm it. Links to other sites are for convenience; we’re not responsible for their
        content.
      </p>

      <h2>Prices and quotes</h2>
      <p>
        Prices on the site are starting prices, not offers. The final price depends on your requirements and complexity. A
        project begins only when you accept a written quote or proposal from us, and that document sets the scope, price,
        timeline and payment terms. If it says something different from these terms, the quote wins.
      </p>

      <h2>Studio projects</h2>
      <p>Unless your quote says otherwise:</p>
      <ul>
        <li>
          <strong>Payment.</strong> 50% to start and 50% at launch. Prices are in US dollars and exclude any taxes or transfer
          fees that apply.
        </li>
        <li>
          <strong>Revisions and changes.</strong> Two revision rounds are included. Work outside the agreed scope is quoted
          separately before we do it.
        </li>
        <li>
          <strong>Your part.</strong> You provide content, feedback, approvals and account access on time, and you confirm you
          have the rights to anything you give us. Delays on either side move the timeline.
        </li>
        <li>
          <strong>Third-party costs.</strong> Hosting, domains, paid APIs, fonts, app store fees and similar services are billed
          to you directly, in your name.
        </li>
        <li>
          <strong>After launch.</strong> We fix defects in what we built for 30 days after launch at no charge. New features
          and changes after that are separate work or a retainer.
        </li>
        <li>
          <strong>Cancellation.</strong> Either of us can end a project with written notice. You pay for the work done up to
          that point, and the first payment is not refunded once work has started.
        </li>
        <li>
          <strong>Confidentiality.</strong> We keep your business information private and use it only for your project.
        </li>
      </ul>

      <h2>Who owns the work</h2>
      <p>
        When the project is paid in full, you own the code, designs and content we created specifically for you, and we hand
        over the repository, deploy and accounts. We keep our general know-how and any tools or code we made before or outside
        your project, and you get a permanent licence to use them as part of what we delivered. Open-source parts stay under
        their own licences. We’ll show your project publicly only with your written permission.
      </p>

      <h2>VORQ Lab tools</h2>
      <ul>
        <li>
          <strong>Accounts.</strong> Keep your login secure. You’re responsible for what happens under your account.
        </li>
        <li>
          <strong>Plans.</strong> Free plans may carry a watermark or limits. Paid plans are billed in advance, monthly or
          yearly, and renew until you cancel. When you cancel, you keep access until the end of the paid period. We don’t
          refund partial periods unless the law requires it.
        </li>
        <li>
          <strong>Your work.</strong> Things you make with a tool are yours. Commercial use follows the plan you’re on, as
          described on that tool’s page.
        </li>
        <li>
          <strong>Fair use.</strong> Don’t resell the tools themselves, reverse engineer them, or use them for anything illegal
          or harmful.
        </li>
        <li>
          <strong>Changes.</strong> We may add, change or retire features. If we close a paid tool, we’ll give at least 30 days’
          notice and refund any unused prepaid time.
        </li>
      </ul>

      <h2>Warranties and liability</h2>
      <p>
        We do careful, professional work, but the site and the tools are provided “as is”, without guarantees that they will
        always be available or error-free. To the extent the law allows, we’re not liable for indirect or consequential losses
        such as lost profits or data, and our total liability for any claim is limited to the amount you paid us in the 12
        months before it. Nothing here limits liability that can’t be limited by law.
      </p>

      <h2>Law and disputes</h2>
      <p>
        These terms are governed by the laws of India. If something goes wrong, email us first and we’ll try to resolve it in
        good faith. If we can’t, the courts of India have jurisdiction.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms; the date at the top shows the latest version. Changes don’t affect a quote you’ve already
        accepted.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms: {mail}.</p>
    </LegalPage>
  );
}
