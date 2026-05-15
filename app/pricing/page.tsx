"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  cta: string;
  ctaVariant: "primary" | "secondary";
  highlighted?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

const TIERS: Tier[] = [
  {
    name: "Free Tools",
    price: "$0",
    priceSuffix: "no login",
    description: "Essential calculators and guides to plan your move.",
    features: [
      "Remittance comparison tool",
      "Bank finder by visa type",
      "SPT calculator",
      "Learn guides",
    ],
    cta: "Explore Tools",
    ctaVariant: "secondary",
  },
  {
    name: "Free Account",
    price: "$0",
    priceSuffix: "signup",
    description: "Save your comparisons and get personalized recommendations.",
    features: [
      "Save comparisons",
      "Up to 2 corridors",
      "Personalized recommendations",
      "Community access",
    ],
    cta: "Create Free Account",
    ctaVariant: "primary",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$10",
    priceSuffix: "/month",
    description: "Advanced features for navigating life on a visa.",
    features: [
      "Everything in Free Account",
      "Unlimited corridors + rate alerts",
      "Tax navigator + visa alerts",
      "OPT/CPT income guidance",
    ],
    cta: "Upgrade to Pro",
    ctaVariant: "secondary",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "Do I need an SSN to sign up?",
    answer:
      "No. Borderless doesn't require a Social Security Number to use any of our tools or create a free account. Everything is designed for international students who are new to the US financial system.",
  },
  {
    question: "Are there really no hidden fees?",
    answer:
      "Yes. Every rate, fee, and cost shown on Borderless is exactly what you'll pay. We don't earn commissions on comparisons — we just show you the real numbers.",
  },
  {
    question: "Can I cancel Pro at any time?",
    answer:
      "Yes. Pro is month-to-month with no contracts. You can cancel anytime from your account settings and you'll keep access until the end of your billing period.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Nav />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-16 py-20 flex flex-col gap-16">
          <div className="text-center max-w-[768px] mx-auto flex flex-col gap-4 pb-16">
            <h1 className="font-serif text-[47px] leading-[56px] font-bold text-primary">
              Honest pricing for international students.
            </h1>
            <p className="font-sans text-lg leading-7 font-normal text-outline">
              Simple, transparent plans designed to support your academic
              journey across borders. No hidden fees, ever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
          <FaqSection />
          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="w-full border-t border-outline-variant" />
            <div className="flex items-center gap-8">
              <span className="font-sans text-sm text-outline-variant font-medium">
                Trusted By
              </span>
              <span className="font-sans text-base font-semibold text-outline-variant">
                UC Berkeley
              </span>
              <span className="font-sans text-base font-semibold text-outline-variant">
                UC San Diego
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  const borderClass = tier.highlighted
    ? "border-2 border-primary"
    : "border border-outline-variant";

  return (
    <div className="relative flex">
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-block bg-primary text-white font-sans text-sm font-medium px-4 py-1.5 rounded-full">
            Most popular
          </span>
        </div>
      )}
      <div
        className={`bg-surface-lowest rounded-xl p-8 flex flex-col w-full ${borderClass}`}
      >
        <h3 className="font-serif text-2xl font-bold text-primary">
          {tier.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-5xl font-bold text-primary">
            {tier.price}
          </span>
          <span className="font-sans text-base text-outline">
            {tier.priceSuffix}
          </span>
        </div>
        <p className="mt-4 font-sans text-sm leading-5 text-outline">
          {tier.description}
        </p>
        <ul className="mt-6 flex flex-col gap-3 flex-1">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 font-sans text-sm text-on-surface"
            >
              <BadgeCheck
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button variant={tier.ctaVariant} className="w-full">
            {tier.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8 max-w-[768px] mx-auto w-full">
      <h2 className="font-serif text-[36px] leading-[44px] font-bold text-primary text-center">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="bg-surface-lowest border border-outline-variant rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-sans text-[15px] font-medium text-on-surface">
                {faq.question}
              </span>
              {openIndex === i ? (
                <ChevronUp className="w-5 h-5 text-outline flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-outline flex-shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-6 pb-5">
                <p className="font-sans text-sm leading-6 text-outline">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}