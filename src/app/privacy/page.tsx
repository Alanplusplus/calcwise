import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.name} privacy policy. Learn how we protect your data and respect your privacy.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-ink-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: August 2026</p>

      <div className="prose mt-8">
        <p>
          At CalcWise (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we
          are committed to protecting your privacy. This policy explains what
          information we collect, how we use it, and your rights regarding your
          data.
        </p>

        <h2>Information We Collect</h2>

        <h3>Calculator Data</h3>
        <p>
          All calculations are performed entirely in your web browser using
          JavaScript. <strong>We do not collect, store, transmit, or have access
          to any numbers you enter into our calculators.</strong> Your financial
          data never leaves your device.
        </p>

        <h3>Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>IP address (anonymized)</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referring URL</li>
          <li>Pages visited and time spent</li>
          <li>Device type (mobile, desktop, tablet)</li>
        </ul>
        <p>
          This information is collected through standard web server logs and
          analytics tools to help us understand how people use our site and
          improve the experience.
        </p>

        <h2>Cookies and Tracking</h2>

        <h3>Essential Cookies</h3>
        <p>
          We may use essential cookies required for the website to function
          properly (e.g., remembering your preferences). These do not track you
          across other websites.
        </p>

        <h3>Analytics</h3>
        <p>
          We may use privacy-respecting analytics to understand traffic patterns
          and popular content. This helps us decide which calculators to build
          and which content to improve.
        </p>

        <h3>Advertising</h3>
        <p>
          This site displays advertisements through Google AdSense to support
          our free tools. Google and its advertising partners may use cookies to
          serve ads based on your prior visits to this or other websites. You
          can opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google&apos;s Ad Settings
          </a>{" "}
          or the{" "}
          <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
            Network Advertising Initiative opt-out page
          </a>.
        </p>

        <h2>How We Use Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Maintain and improve website performance</li>
          <li>Understand which calculators and content are most useful</li>
          <li>Display relevant advertisements to support our free service</li>
          <li>Respond to inquiries sent via our contact page</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We may use the following third-party services:</p>
        <ul>
          <li><strong>Google AdSense:</strong> advertising display and revenue</li>
          <li><strong>Vercel:</strong> website hosting and content delivery</li>
        </ul>
        <p>
          Each of these services has its own privacy policy governing the data
          they collect.
        </p>

        <h2>Data Retention</h2>
        <p>
          Server logs are retained for up to 30 days and then deleted.
          Analytics data is retained in aggregate form. We do not maintain
          individual user profiles or long-term personal data stores.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access any personal data we hold about you</li>
          <li>Request deletion of your data</li>
          <li>Opt out of personalized advertising</li>
          <li>Use our calculators without providing any personal information</li>
        </ul>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not directed at children under 13. We do not knowingly
          collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions or requests, please contact us at{" "}
          <a href="mailto:hello@calcwise.tools">hello@calcwise.tools</a>.
        </p>
      </div>
    </div>
  );
}
