import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/how-it-works" className="hover:underline">
            How It Works
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
        </nav>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Anonymous Chat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
