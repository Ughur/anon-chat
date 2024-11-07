import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Anonymous Chat - Private & Secure Global Conversations",
    template: "%s | Anonymous Chat",
  },
  description:
    "Connect instantly with people worldwide through our secure, anonymous chat platform. No registration required, complete privacy guaranteed.",
  keywords: [
    "anonymous chat",
    "private chat",
    "secure messaging",
    "global chat",
    "instant chat",
    "random chat",
  ],
  authors: [{ name: "Anonymous Chat" }],
  creator: "Anonymous Chat",
  publisher: "Anonymous Chat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Anonymous Chat - Private & Secure Global Conversations",
    description:
      "Connect instantly with people worldwide through our secure, anonymous chat platform. No registration required, complete privacy guaranteed.",
    siteName: "Anonymous Chat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Chat - Private & Secure Global Conversations",
    description:
      "Connect instantly with people worldwide through our secure, anonymous chat platform. No registration required, complete privacy guaranteed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Anonymous Chat",
              applicationCategory: "CommunicationApplication",
              operatingSystem: "Web",
              description:
                "Connect instantly with people worldwide through our secure, anonymous chat platform. No registration required, complete privacy guaranteed.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Anonymous messaging",
                "Global chat connections",
                "No registration required",
                "Secure and private",
                "Real-time messaging",
                "Country-based matching",
              ],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
