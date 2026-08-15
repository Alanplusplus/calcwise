import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${site.name} team. We welcome feedback, suggestions, and corrections.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-ink-900">Contact Us</h1>

      <div className="prose mt-8">
        <p>
          We value your feedback and are happy to hear from you. Whether you
          have a suggestion for a new calculator, found an error, or have a
          question about how to use our tools, please don&apos;t hesitate to
          reach out.
        </p>

        <h2>Get In Touch</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:hello@calcwise.tools">hello@calcwise.tools</a>
        </p>

        <h2>What We Can Help With</h2>
        <ul>
          <li>Questions about how our calculators work</li>
          <li>Reporting errors or inaccuracies</li>
          <li>Suggestions for new calculators or features</li>
          <li>Feedback on content or user experience</li>
          <li>Press and media inquiries</li>
          <li>Advertising and partnership opportunities</li>
        </ul>

        <h2>Response Time</h2>
        <p>
          We aim to respond to all inquiries within 1-2 business days. For
          urgent corrections (especially regarding financial accuracy), we
          prioritize these and typically respond within 24 hours.
        </p>

        <h2>Disclaimer</h2>
        <p>
          Please note that we cannot provide personalized financial advice. Our
          calculators and content are educational tools designed to help you
          understand financial concepts and run scenarios. For advice specific to
          your situation, please consult a licensed financial advisor, tax
          professional, or relevant expert.
        </p>
      </div>
    </div>
  );
}
