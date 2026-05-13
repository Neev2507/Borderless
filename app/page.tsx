import Image from "next/image";
import { Button } from "@/components/button";
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Nav />

      <main className="flex-1">
        <section className="max-w-[1200px] mx-auto bg-surface-lowest">
          <div className="px-16 pt-24 pb-20 flex gap-6">
            <div className="flex-1 max-w-[524px] flex flex-col">
              <h1 className="font-serif text-[48px] leading-[56px] font-bold text-primary mb-6">
                You're 10,000 miles from home. Your finances shouldn't feel like it.
              </h1>

              <p className="font-sans text-lg leading-7 text-on-surface-variant mb-8">
                Banking, credit, taxes, and remittances — built for international students.
              </p>

              <div className="flex gap-3 mb-12">
                <Button variant="primary">Start free</Button>
                <Button variant="secondary">Try the remittance tool</Button>
              </div>

              <div className="border-t border-outline-variant pt-6">
                <p className="font-sans text-xs font-medium uppercase tracking-wider text-outline mb-2">
                  Built by students at
                </p>
                <p className="font-sans text-2xl font-bold text-on-surface-variant">
                  UC Berkeley <span className="mx-3">·</span> UC San Diego
                </p>
              </div>
            </div>

            <div className="flex-1">
              <Image
                src="/heropic.png"
                alt="Borderless app on a desk"
                width={524}
                height={524}
                className="rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-16 py-8 border-t border-outline-variant">
        <p className="text-label-sm text-on-surface-variant">
          © 2026 Borderless. Built for international students. Not a bank, broker, or advisor.
        </p>
      </footer>
    </div>
  );
}