import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Anonymous Chat Security & Data Protection",
  description:
    "Learn about our commitment to your privacy and how we protect your data. No personal information collected, no chat logs stored, complete anonymity guaranteed.",
  keywords: [
    "chat privacy policy",
    "anonymous messaging privacy",
    "chat data protection",
    "secure messaging policy",
  ],
};

export default function Privacy() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>Privacy Policy</h1>

        <h2>Our Commitment to Privacy</h2>
        <p>
          Anonymous Chat is designed with privacy at its core. We believe in
          providing a truly anonymous communication platform where users can
          chat freely without concerns about data collection or surveillance.
        </p>

        <h2>Information We Don&apos;t Collect</h2>
        <ul>
          <li>Personal identification information</li>
          <li>Chat histories or messages</li>
          <li>IP addresses (only temporary for connection purposes)</li>
          <li>User location (beyond selected country for matching)</li>
          <li>Device information</li>
        </ul>

        <h2>How We Protect Your Privacy</h2>
        <ul>
          <li>No registration or account creation required</li>
          <li>End-to-end encryption for all messages</li>
          <li>No message storage - all data is temporary</li>
          <li>No cookies or tracking mechanisms</li>
          <li>Regular security audits and updates</li>
        </ul>

        <h2>Usage Information</h2>
        <p>
          We only maintain anonymous statistics about the number of active users
          and chat sessions to improve our service. This information cannot be
          linked to any individual user.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our privacy practices, please contact
          our privacy team at privacy@anonymous-chat.com
        </p>
      </div>
    </main>
  );
}
