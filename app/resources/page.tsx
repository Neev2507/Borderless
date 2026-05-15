"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import {
  Search,
  Calculator,
  BookOpen,
  Users,
  Bookmark,
  Globe,
  Bell,
  FileText,
  Headphones,
  ArrowRight,
  Repeat,
} from "lucide-react";

type CardData = {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
  section: "free" | "account" | "pro";
  dark?: boolean;
};

const ALL_CARDS: CardData[] = [
  {
    icon: <Calculator className="w-5 h-5" />,
    title: "Remittance Comparison Tool",
    description: "Compare Wise, Remitly, and bank wires side by side. See real fees before you send.",
    cta: "Explore Tool",
    href: "/tools/remittance",
    section: "free",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Bank Finder by Visa Type",
    description: "Answer 8 quick questions and get matched to the right US bank for your visa and situation.",
    cta: "Find a Bank",
    href: "/tools/bank-finder",
    section: "free",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Learn Guides",
    description: "Step-by-step guides on opening accounts, building credit without an SSN, and navigating taxes.",
    cta: "Read Guides",
    href: "#",
    section: "free",
  },
  {
    icon: <Bookmark className="w-5 h-5" />,
    title: "Save Comparisons",
    description: "Bookmark remittance rates and bank results to revisit anytime.",
    cta: "Save a comparison",
    href: "#",
    section: "account",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Up to 2 Corridors",
    description: "Track rates for 2 currency pairs and get notified when they move.",
    cta: "Add a corridor",
    href: "#",
    section: "account",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Personalized Recommendations",
    description: "Get bank and remittance suggestions tailored to your visa and university.",
    cta: "See your picks",
    href: "#",
    section: "account",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Community Access",
    description: "Connect with international students navigating the same financial system.",
    cta: "Join community",
    href: "#",
    section: "account",
  },
  {
    icon: <Repeat className="w-5 h-5" />,
    title: "Unlimited Corridors + Rate Alerts",
    description: "Track as many currency pairs as you need and get real-time alerts when rates hit your target.",
    cta: "Upgrade to Pro",
    href: "#",
    section: "pro",
    dark: true,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Tax Navigator + Visa Alerts",
    description: "Stay ahead of OPT/CPT deadlines, FICA exemptions, and visa-linked financial obligations.",
    cta: "Explore Tax Tools",
    href: "#",
    section: "pro",
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: "Priority Support",
    description: "Direct access to our support team for urgent visa or banking questions, any time.",
    cta: "Contact Support",
    href: "#",
    section: "pro",
  },
];

function matches(card: CardData, query: string) {
  const q = query.toLowerCase();
  return (
    card.title.toLowerCase().includes(q) ||
    card.description.toLowerCase().includes(q) ||
    card.cta.toLowerCase().includes(q)
  );
}

function ResourcesNav({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  return (
    <nav className="w-full border-b border-outline-variant bg-surface-low shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]">
      <div className="max-w-[1200px] mx-auto px-6 h-[65px] flex items-center justify-between">
        <a href="/" className="font-sans text-2xl font-bold leading-8 text-primary">
          Borderless
        </a>
        <div className="flex items-center gap-8">
          <a href="#" className="font-sans text-base font-normal leading-6 text-on-surface-variant hover:text-primary transition-colors">
            Solutions
          </a>
          <a href="/resources" className="font-sans text-base font-normal leading-6 text-primary border-b-2 border-primary pb-0.5 transition-colors">
            Resources
          </a>
          <a href="/pricing" className="font-sans text-base font-normal leading-6 text-on-surface-variant hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#" className="font-sans text-base font-normal leading-6 text-on-surface-variant hover:text-primary transition-colors">
            Support
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-[220px] pl-9 pr-4 py-2 rounded-lg border border-outline-variant bg-surface-lowest font-sans text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <a href="#" className="bg-primary text-white font-sans text-base font-normal leading-6 px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}

function SectionBadge({
  label,
  variant,
}: {
  label: string;
  variant: "free" | "account" | "premium";
}) {
  const styles = {
    free: "bg-surface border border-outline-variant text-outline",
    account: "bg-primary text-white",
    premium: "bg-primary text-white",
  };
  return (
    <span className={`font-sans text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${styles[variant]}`}>
      {label}
    </span>
  );
}

function ResourceCard({ card }: { card: CardData }) {
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-outline">
        {card.icon}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-sans text-base font-semibold text-on-surface">{card.title}</h3>
        <p className="font-sans text-sm text-outline leading-5">{card.description}</p>
      </div>
      <a href={card.href} className="w-full text-center border border-outline-variant text-primary font-sans text-sm font-medium py-2.5 rounded-lg hover:bg-surface transition-colors">
        {card.cta}
      </a>
    </div>
  );
}

function AccountCard({ card }: { card: CardData }) {
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-3">
      <div className="text-outline">{card.icon}</div>
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-sans text-sm font-semibold text-on-surface">{card.title}</h3>
        <p className="font-sans text-xs text-outline leading-4">{card.description}</p>
      </div>
      <a href={card.href} className="flex items-center gap-1 font-sans text-sm font-medium text-primary hover:opacity-70 transition-opacity">
        {card.cta}
        <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  );
}

function ProCard({ card }: { card: CardData }) {
  if (card.dark) {
    return (
      <div className="bg-primary rounded-xl p-6 flex flex-col gap-4">
        <div className="text-white/70">{card.icon}</div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-sans text-base font-semibold text-white">{card.title}</h3>
          <p className="font-sans text-sm leading-5" style={{ color: "rgba(255,255,255,0.7)" }}>{card.description}</p>
        </div>
        <a href={card.href} className="w-full text-center border border-white text-white font-sans text-sm font-medium py-2.5 rounded-lg hover:bg-white/10 transition-colors">
          {card.cta}
        </a>
      </div>
    );
  }
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
      <div className="text-outline">{card.icon}</div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-sans text-base font-semibold text-on-surface">{card.title}</h3>
        <p className="font-sans text-sm text-outline leading-5">{card.description}</p>
      </div>
      <a href={card.href} className="w-full text-center border border-outline-variant text-primary font-sans text-sm font-medium py-2.5 rounded-lg hover:bg-surface transition-colors">
        {card.cta}
      </a>
    </div>
  );
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");

  const filtered = query.trim().length > 0
    ? ALL_CARDS.filter((c) => matches(c, query))
    : ALL_CARDS;

  const freeCards = filtered.filter((c) => c.section === "free");
  const accountCards = filtered.filter((c) => c.section === "account");
  const proCards = filtered.filter((c) => c.section === "pro");
  const noResults = filtered.length === 0;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <ResourcesNav query={query} setQuery={setQuery} />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-16 py-16 flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-[47px] leading-[56px] font-bold text-primary">
              Explore the Borderless Ecosystem
            </h1>
            <p className="font-sans text-base text-outline max-w-[560px]">
              From free calculators to personalized bank matching, find the right tools to power your US journey.
            </p>
          </div>

          {noResults && (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <p className="font-sans text-base font-semibold text-on-surface">No results for "{query}"</p>
              <p className="font-sans text-sm text-outline">Try searching for "remittance", "bank", "tax", or "credit".</p>
            </div>
          )}

          {freeCards.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-primary">Free Tools & Guides</h2>
                <SectionBadge label="Free for Everyone" variant="free" />
              </div>
              <div className="w-full border-t border-outline-variant" />
              <div className="grid grid-cols-3 gap-5">
                {freeCards.map((c) => (
                  <ResourceCard key={c.title} card={c} />
                ))}
              </div>
            </div>
          )}

          {accountCards.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-primary">Account Features</h2>
                <SectionBadge label="Free with Account" variant="account" />
              </div>
              <div className="w-full border-t border-outline-variant" />
              <div className="grid grid-cols-4 gap-4">
                {accountCards.map((c) => (
                  <AccountCard key={c.title} card={c} />
                ))}
              </div>
            </div>
          )}

          {proCards.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-serif text-2xl font-bold text-primary">Borderless Pro</h2>
                  <span className="font-sans text-base text-outline">$10/mo</span>
                </div>
                <SectionBadge label="Premium" variant="premium" />
              </div>
              <div className="w-full border-t border-outline-variant" />
              <div className="grid grid-cols-3 gap-5">
                {proCards.map((c) => (
                  <ProCard key={c.title} card={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}