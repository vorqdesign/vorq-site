import { site } from "../content";
import { LegalPage } from "../legal";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: "What VORQ collects on vorq.agency, in VORQ Lab tools and during client projects, why we collect it, and the choices you have.",
  path: "/privacy",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="20 October 2026"
      summary={[
        "We collect only what we need to reply to you, run a call, deliver a project or run a Lab tool.",
        "No advertising, no cross-site tracking, and we never sell your data.",
        "Google sign-in data is used only to create and secure your account.",
        `Ask us to see, fix or delete your data at any time: ${site.email}.`,
      ]}
    >
      <p>
        This policy explains how VORQ (“we”, “us”), an independent design engineering studio based in India, handles personal
        data on vorq.agency, in the tools we publish under VORQ Lab (such as Gradient Forge), and when we work with you on a
        project. If a Lab tool has its own privacy notice, that notice adds to this one.
      </p>

      <h2>What we collect</h2>
      <h3>When you browse vorq.agency</h3>
      <p>
        Our hosting provider processes standard request data, such as your IP address, browser, the page you asked for and the
        time, to serve the site and keep it secure. The site stores one small value in your browser’s session storage so the
        intro animation plays only once per visit. We don’t use advertising cookies or cross-site trackers.
      </p>
      <h3>When you book a call</h3>
      <p>
        Booking runs on Calendly, embedded on our booking page. Calendly collects your name, email address, the time you pick
        and anything you write in the form, and shares it with us so we can prepare and send the invite. Calendly’s own privacy
        policy applies to the data it processes.
      </p>
      <h3>When you email us or hire us</h3>
      <p>
        We keep the messages you send and the material you share for a project, such as briefs, content, files and access to
        accounts. We use it only to scope, build and support that project.
      </p>
      <h3>When you use a VORQ Lab tool</h3>
      <p>
        If you create an account, we store your email address, your name if you give it, the settings and work you save, and
        your plan. Payments are handled by our payment provider; we never see or store your full card number.
      </p>
      <h3>Sign in with Google</h3>
      <p>
        If a VORQ product lets you sign in with Google, we receive only your name, email address and profile picture. We use
        them only to create your account, sign you in and contact you about that account. We don’t request access to your
        Gmail, Drive, Calendar or contacts, we don’t use Google user data for advertising, we don’t sell it, and people read it
        only when you ask us to, for security, or when the law requires it. Our use of information received from Google APIs
        follows the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to you, schedule and hold calls, and send quotes.</li>
        <li>To deliver, support and invoice the work you hire us for.</li>
        <li>To run, secure and improve our tools, and to manage subscriptions.</li>
        <li>To meet our legal, tax and accounting obligations.</li>
      </ul>
      <p>
        Where data protection laws such as the GDPR apply, we rely on performing a contract with you, our legitimate interest
        in running and securing our services, your consent where we ask for it, and our legal obligations.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Only the services we use to operate: website hosting, scheduling (Calendly), email, payment processing for Lab
        subscriptions, and the infrastructure behind the tools we run. Each processes data for us under its own terms. We share
        data with authorities only when the law requires it. We never sell or rent personal data.
      </p>
      <p>
        We work from India and some of these providers process data in other countries, including the United States. Where the
        law requires it, those transfers rely on appropriate safeguards such as standard contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries and booking details are kept for up to 24 months after our last conversation. Project records are kept for
        the length of the project and afterwards for as long as tax and accounting law requires. Lab account data is kept while
        your account is open and deleted within 30 days of you closing it, except for billing records we must keep.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, including under India’s Digital Personal Data Protection Act, the GDPR, the UK GDPR and
        California law, you can ask to access, correct, delete or export your data, object to or restrict how we use it, and
        withdraw consent. Email {mail} and we’ll reply within 30 days. You can also complain to your local data protection
        authority.
      </p>

      <h2>Security</h2>
      <p>
        We use encrypted connections, access controls and reputable providers, and we give account access only to the people who
        need it for your project. No system is perfectly secure, so if something goes wrong that affects you, we’ll tell you
        promptly.
      </p>

      <h2>Children</h2>
      <p>Our services are for businesses and adults. They are not meant for anyone under 18, and we don’t knowingly collect their data.</p>

      <h2>Changes</h2>
      <p>If this policy changes, we’ll update the date at the top. For significant changes, we’ll tell account holders by email.</p>

      <h2>Contact</h2>
      <p>Questions or requests about your data: {mail}.</p>
    </LegalPage>
  );
}
