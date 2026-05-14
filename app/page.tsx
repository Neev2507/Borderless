import Image from "next/image";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";

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
                <Link href="/tools/remittance">
  <Button variant="secondary">Try the remittance tool</Button>
</Link>
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

        <section className="max-w-[1200px] mx-auto bg-surface-lowest">
          <div className="px-16 py-16 flex flex-col gap-12">
            <div className="max-w-[672px]">
              <h2 className="font-serif text-headline-md font-bold text-primary mb-3">
                Your journey, mapped.
              </h2>
              <p className="font-sans text-base font-normal leading-6 text-on-surface-variant">
                We understand the critical timeline of setting up life in a new country. Our tools are designed to anticipate what you need, exactly when you need it.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <Card
  pill="Day 1 - 30"
  title="Arrival & Setup"
  body="We walk you through picking the right US bank for your visa, what documents to bring, and how to avoid the fees most students don't see coming."
  features={["Bank picker by visa type", "Account opening checklist"]}
/>

<Card
  pill="Month 1 - 6"
  title="Tuition & Transfers"
  body="Compare every way to send money and pay tuition — see the real cost of Wise, Remitly, and bank wires side by side. Start building US credit without an SSN."
  features={["Live remittance rate comparison", "Credit building without an SSN"]}
  highlighted
/>

<Card
  pill="Year 1 - 2+"
  title="Growth & Credit"
  body="Navigate OPT and CPT income, understand your tax obligations as a non-resident, and stay ahead of the financial deadlines tied to your visa status."
  features={["OPT/CPT income guidance", "Visa-linked financial alerts"]}
/>
            </div>
          </div>
        </section>
      </main>

     <Footer />
    </div>
  );
}