export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-b from-purple-600/10 via-background to-background">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          These Terms govern your access to and use of the Just DM website and
          services.
        </p>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            <strong>Last Updated:</strong> February 13, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10 leading-relaxed">
        <Intro />

        <Section title="1. Description of Service">
          <p>
            Just DM allows users to organize Instagram content by sending reels
            via Instagram Direct Message and viewing them in a structured
            dashboard.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google-based authentication</li>
            <li>Instagram content organization</li>
            <li>Personal dashboard to access saved content</li>
          </ul>
          <p className="mt-2">
            We may modify, suspend, or discontinue any part of the service at
            any time.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <ul className="list-disc pl-6 space-y-1">
            <li>You must be at least 13 years old</li>
            <li>Provide accurate information during sign-up</li>
            <li>Use the service in compliance with applicable laws</li>
          </ul>
          <p className="mt-2">
            Users under 18 should use the service with parental or guardian
            consent.
          </p>
        </Section>

        <Section title="3. Account Registration">
          <ul className="list-disc pl-6 space-y-1">
            <li>Sign in using your own Google account</li>
            <li>Maintain the security of your account</li>
            <li>Notify us of any unauthorized access</li>
          </ul>
          <p className="mt-2">
            We are not responsible for losses resulting from unauthorized use.
          </p>
        </Section>

        <Section title="4. Instagram Usage">
          <ul className="list-disc pl-6 space-y-1">
            <li>Only share content you have permission to use</li>
            <li>Do not violate Instagram’s terms</li>
            <li>We do not collect or store your Instagram password</li>
            <li>We only use your Instagram Sender ID to link messages</li>
          </ul>
          <p className="mt-2">
            Just DM is not affiliated with, endorsed by, or sponsored by
            Instagram or Meta.
          </p>
        </Section>

        <Section title="5. Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Send illegal, harmful, or abusive content</li>
            <li>Share copyrighted content without permission</li>
            <li>Attempt to hack or disrupt the system</li>
            <li>Use bots, automation, or scraping tools</li>
            <li>Reverse engineer or copy the platform</li>
          </ul>
          <p className="mt-2">
            Accounts violating these rules may be suspended or terminated.
          </p>
        </Section>

        <Section title="6. User Content">
          <p>You retain ownership of content you send via Instagram.</p>
          <p className="mt-2">You grant Just DM a limited license to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Store your content</li>
            <li>Process and organize it</li>
            <li>Display it in your dashboard</li>
          </ul>
          <p className="mt-2">
            We do not sell your content or use it for advertising.
          </p>
        </Section>

        <Section title="7. Data and Privacy">
          <p>
            Your use of Just DM is also governed by our Privacy Policy. By using
            the service, you agree to the collection and use of information
            described there.
          </p>
        </Section>

        <Section title="8. Service Availability">
          <p>We aim for reliable service but do not guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Uninterrupted availability</li>
            <li>Error-free operation</li>
            <li>Permanent storage of content</li>
          </ul>
          <p className="mt-2">
            Maintenance or updates may temporarily affect availability.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>We may suspend or terminate access if:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You violate these Terms</li>
            <li>You misuse the platform</li>
            <li>Required by law</li>
          </ul>
          <p className="mt-2">
            To request account deletion, contact:
            <span className="font-medium"> cd1@socialthreesixty.co</span>
          </p>
        </Section>

        <Section title="10. Intellectual Property">
          <p>
            All platform design, features, branding, and software are owned by
            Just DM and protected by intellectual property laws.
          </p>
          <p className="mt-2">You may not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Copy or reproduce the platform</li>
            <li>Use our branding without permission</li>
            <li>Create derivative services</li>
          </ul>
        </Section>

        <Section title="11. Third-Party Services">
          <ul className="list-disc pl-6 space-y-1">
            <li>Google (authentication)</li>
            <li>Instagram (content sharing)</li>
            <li>Cloud hosting and database providers</li>
          </ul>
          <p className="mt-2">
            We are not responsible for third-party policies or practices.
          </p>
        </Section>

        <Section title="12. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Just DM is not liable for:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Loss of data or content</li>
            <li>Service interruptions</li>
            <li>Indirect or consequential damages</li>
            <li>Issues caused by Instagram or third-party services</li>
          </ul>
        </Section>

        <Section title="13. Disclaimer">
          <p>
            Just DM is provided “as is” without warranties, including
            reliability, availability, or accuracy of Instagram content
            retrieval.
          </p>
        </Section>

        <Section title="14. Changes to These Terms">
          <p>
            We may update these Terms periodically. Continued use of the service
            means you accept the updated Terms.
          </p>
        </Section>

        <Section title="15. Governing Law">
          <p>These Terms are governed by the laws of India.</p>
        </Section>

        <Section title="16. Contact Us">
          <p>Email: cd1@socialthreesixty.co</p>
          <p>Website: https://www.justdm.in/</p>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Just DM. All rights reserved.
      </footer>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Intro() {
  return (
    <p className="text-muted-foreground">
      Welcome to Just DM (“we”, “our”, “us”). By accessing or using our website
      and services, you agree to be bound by these Terms. If you do not agree,
      please do not use the service.
    </p>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-2 text-muted-foreground">{children}</div>
    </section>
  );
}
