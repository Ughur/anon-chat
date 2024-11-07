import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - Anonymous Chat Questions & Answers",
  description:
    "Find answers to frequently asked questions about our anonymous chat platform. Learn about privacy, security, features, and how to use the service.",
  keywords: [
    "anonymous chat FAQ",
    "chat privacy questions",
    "anonymous messaging help",
    "chat security FAQ",
  ],
};

export default function FAQ() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Is Anonymous Chat really anonymous?
            </AccordionTrigger>
            <AccordionContent>
              Yes, Anonymous Chat is completely anonymous. We don&apos;t require
              any registration, personal information, or login. Your
              conversations are not stored, and we don&apos;t track your
              identity.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How does the matching system work?
            </AccordionTrigger>
            <AccordionContent>
              You can choose to chat globally or select a specific country. Our
              system then randomly matches you with another online user based on
              your preference. You can start a new chat anytime by clicking
              &quot;Next Chat&quot;.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Are my messages secure?</AccordionTrigger>
            <AccordionContent>
              Yes, all messages are encrypted and transmitted securely. We
              don&apos;t store any chat history, and messages are immediately
              deleted once delivered.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I report inappropriate behavior?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can report inappropriate users during a chat session. We
              take all reports seriously and have systems in place to prevent
              abuse.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Is Anonymous Chat free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, Anonymous Chat is completely free to use. There are no hidden
              fees or premium features - everyone gets the same secure,
              anonymous chat experience.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
