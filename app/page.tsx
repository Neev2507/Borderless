import { Button } from "@/components/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <main className="flex-1 px-16 py-12">
        <h1 className="text-headline-lg text-on-surface font-serif mb-4 max-w-3xl">
          You're 10,000 miles from home. Your finances shouldn't feel like it.
        </h1>

        <p className="text-body-md text-on-surface-variant mb-8 max-w-2xl">
          Banking, credit, taxes, and remittances — built for international students.
        </p>

        <div className="flex gap-3">
          <Button variant="primary">Start free</Button>
          <Button variant="secondary">Try the remittance tool</Button>
        </div>
      </main>

      <footer className="px-16 py-8 border-t border-outline-variant">
        <p className="text-label-sm text-on-surface-variant">
          © 2026 Borderless. Built for international students. Not a bank, broker, or advisor.
        </p>
      </footer>
    </div>
  );
}