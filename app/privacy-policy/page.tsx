export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-b from-purple-600/10 via-background to-background">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          This Privacy Policy explains how Just DM collects, uses, and protects
          your information when you use our platform.
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

        <Section title="1. Information We Collect">
          <SubSection title="1.1 Personal Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
            </ul>
            <p className="mt-2">
              This information is used only to create and manage your account.
            </p>
          </SubSection>

          <SubSection title="1.2 Instagram Account Information">
            <p>
              When you send a message to the Just DM account on Instagram, we
              receive your Instagram Sender ID. This identifier is used solely
              to link your Instagram messages with your Just DM account.
            </p>

            <p className="mt-2">The Sender ID allows us to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Identify your account securely</li>
              <li>Retrieve and organize only the content you have shared</li>
              <li>Ensure you can view only your own reels</li>
            </ul>

            <p className="mt-2">
              Your Instagram Sender ID is stored securely and is never shared,
              sold, or used for advertising purposes.
            </p>

            <p className="mt-2 font-medium">
              Important: We do not collect or store your Instagram password.
            </p>
          </SubSection>

          <SubSection title="1.3 Automatically Collected Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Usage data</li>
              <li>Cookies and session data</li>
            </ul>
            <p className="mt-2">
              This helps us improve performance and user experience.
            </p>
          </SubSection>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide and operate the Just DM service</li>
            <li>Authenticate users via Google login</li>
            <li>Connect and manage Instagram accounts</li>
            <li>Organize saved Instagram content</li>
            <li>Improve product performance</li>
            <li>Send service updates</li>
            <li>Ensure security and prevent misuse</li>
          </ul>

          <p className="mt-2 font-medium">
            We do not sell your personal information.
          </p>
        </Section>

        <Section title="3. Google User Data">
          <ul className="list-disc pl-6 space-y-1">
            <li>Used only for authentication and account creation</li>
            <li>No access to Gmail, Drive, or other Google data</li>
            <li>Never sold or shared with third parties</li>
          </ul>

          <p className="mt-2">
            Our use complies with the Google API Services User Data Policy.
          </p>
        </Section>

        <Section title="4. Data Sharing and Third Parties">
          <p>We may share data only with trusted providers such as:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Hosting services (Vercel, GCP cloud)</li>
            <li>Database and infrastructure providers</li>
            <li>Analytics or monitoring tools</li>
          </ul>

          <p className="mt-2">
            These providers process data only on our behalf.
          </p>

          <p className="mt-2 font-medium">
            We do not sell or rent your personal data.
          </p>
        </Section>

        <Section title="5. Cookies">
          <ul className="list-disc pl-6 space-y-1">
            <li>Maintain user sessions</li>
            <li>Improve performance</li>
            <li>Understand usage patterns</li>
          </ul>

          <p className="mt-2">
            You may disable cookies in your browser, but some features may not
            work properly.
          </p>
        </Section>

        <Section title="7. Data Security">
          <ul className="list-disc pl-6 space-y-1">
            <li>HTTPS encryption</li>
            <li>Secure cloud infrastructure</li>
            <li>Restricted data access</li>
          </ul>

          <p className="mt-2">
            No method of transmission over the Internet is completely secure.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your information</li>
            <li>Update your details</li>
            <li>Request account deletion</li>
          </ul>

          <p className="mt-2">
            To request deletion, contact:{" "}
            <span className="font-medium">cd1@socialthreesixty.co</span>
          </p>
        </Section>

        <Section title="9. Third-Party Links">
          <ul className="list-disc pl-6 space-y-1">
            <li>Google (authentication)</li>
            <li>Instagram (content retrieval)</li>
            <li>MongoDB (data storage)</li>
          </ul>
        </Section>

        <Section title="10. Children’s Privacy">
          <p>
            Just DM is not intended for users under the age of 13. We do not
            knowingly collect personal information from children.
          </p>
        </Section>

        <Section title="11. Contact Us">
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
      Just DM (“we”, “our”, or “us”) operates the Just DM website and services.
      By using Just DM, you agree to the collection and use of information in
      accordance with this policy.
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

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="text-muted-foreground space-y-2">{children}</div>
    </div>
  );
}
