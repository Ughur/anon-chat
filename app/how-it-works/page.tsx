import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How Anonymous Chat Works - Secure & Private Messaging",
  description:
    "Learn how our anonymous chat platform ensures your privacy and security. No registration, no data storage, just instant private conversations.",
  keywords: [
    "how anonymous chat works",
    "private messaging guide",
    "secure chat explanation",
    "anonymous messaging tutorial",
  ],
};

export default function HowItWorks() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">How Anonymous Chat Works</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Instant Connection</CardTitle>
            <CardDescription>
              Connect with people worldwide in seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-6 space-y-4">
              <li>Select your preferred region or choose global chat</li>
              <li>
                Click &quot;Start Chat&quot; to connect with a random person
              </li>
              <li>Begin your anonymous conversation instantly</li>
              <li>Click &quot;Next Chat&quot; anytime to meet someone new</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Your safety is our top priority</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-4">
              <li>No registration or personal information required</li>
              <li>Messages are not stored on our servers</li>
              <li>End-to-end encryption for all conversations</li>
              <li>Automatic connection termination for added privacy</li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/">
            <Button size="lg">Start Chatting Now</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
