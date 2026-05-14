"use client";

import { useState } from "react";
import { Landmark, RefreshCw, Building2, type LucideIcon } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";

const CORRIDORS = [
  { code: "INR", label: "India (INR)", flag: "🇮🇳" },
  { code: "PKR", label: "Pakistan (PKR)", flag: "🇵🇰" },
  { code: "CNY", label: "China (CNY)", flag: "🇨🇳" },
  { code: "KRW", label: "South Korea (KRW)", flag: "🇰🇷" },
  { code: "BDT", label: "Bangladesh (BDT)", flag: "🇧🇩" },
  { code: "NGN", label: "Nigeria (NGN)", flag: "🇳🇬" },
  { code: "BRL", label: "Brazil (BRL)", flag: "🇧🇷" },
  { code: "MXN", label: "Mexico (MXN)", flag: "🇲🇽" },
];

const RATES: Record<string, { wise: number; remitly: number; bankWire: number; wiseFeeForeign: number; remitlyFee: number }> = {
  INR: { wise: 0.01194, remitly: 0.01180, bankWire: 0.01150, wiseFeeForeign: 430, remitlyFee: 0 },
  PKR: { wise: 0.00357, remitly: 0.00351, bankWire: 0.00340, wiseFeeForeign: 150, remitlyFee: 0 },
  CNY: { wise: 0.1374, remitly: 0.1350, bankWire: 0.1310, wiseFeeForeign: 30, remitlyFee: 0 },
  KRW: { wise: 0.000724, remitly: 0.000710, bankWire: 0.000690, wiseFeeForeign: 1200, remitlyFee: 0 },
  BDT: { wise: 0.00836, remitly: 0.00820, bankWire: 0.00800, wiseFeeForeign: 80, remitlyFee: 0 },
  NGN: { wise: 0.000617, remitly: 0.000605, bankWire: 0.000590, wiseFeeForeign: 500, remitlyFee: 0 },
  BRL: { wise: 0.1842, remitly: 0.1810, bankWire: 0.1760, wiseFeeForeign: 15, remitlyFee: 0 },
  MXN: { wise: 0.0487, remitly: 0.0478, bankWire: 0.0462, wiseFeeForeign: 40, remitlyFee: 0 },
};

type Result = {
  provider: string;
  recipientGets: number;
  rate: number;
  fee: number;
  delivery: string;
  isBest: boolean;
  isWarning?: boolean;
  warningText?: string;
  icon: LucideIcon;
};

export default function RemittancePage() {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [amount, setAmount] = useState("100000");
  const [results, setResults] = useState<Result[] | null>(null);

  const fromData = CORRIDORS.find((c) => c.code === fromCurrency)!;
  const rates = RATES[fromCurrency];

  function compareRates() {
    const amt = parseFloat(amount.replace(/,/g, "")) || 0;
    if (!amt || !rates) return;

    const wiseRecipient = amt * rates.wise - (rates.wiseFeeForeign * rates.wise);
    const remitlyRecipient = amt * rates.remitly;
    const bankRecipient = amt * rates.bankWire - 25;

    const allResults: Result[] = [
      {
        provider: "Wise",
        icon: Landmark,
        recipientGets: wiseRecipient,
        rate: rates.wise,
        fee: rates.wiseFeeForeign,
        delivery: "Usually within 24 hrs",
        isBest: false,
      },
      {
        provider: "Remitly",
        icon: RefreshCw,
        recipientGets: remitlyRecipient,
        rate: rates.remitly,
        fee: 0,
        delivery: "Instant delivery available",
        isBest: false,
      },
      {
        provider: "Bank Wire",
        icon: Building2,
        recipientGets: bankRecipient,
        rate: rates.bankWire,
        fee: 25,
        delivery: "3–5 business days",
        isBest: false,
        isWarning: true,
        warningText: "High fees on most bank wires",
      },
    ];

    allResults.sort((a, b) => b.recipientGets - a.recipientGets);
    allResults[0].isBest = true;

    setResults(allResults);
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Nav />

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-16 py-20 flex flex-col gap-20">

          {/* Page header */}
          <div className="text-center max-w-[640px] mx-auto">
            <h1 className="font-serif text-[48px] leading-[56px] font-bold text-primary mb-4">
              How much will it actually cost to send money home today?
            </h1>
            <p className="font-sans text-base font-normal leading-6 text-on-surface-variant">
              Compare real-time exchange rates and transparent fees from top providers to ensure your money reaches its destination efficiently.
            </p>
          </div>

          {/* Tool */}
          <div className="flex gap-8">

            {/* Left — Transfer Details */}
            <div className="w-[348px] shrink-0 bg-white rounded-xl border border-outline-variant p-6 flex flex-col gap-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]">
              <h2 className="font-sans text-base font-semibold text-on-surface border-b border-outline-variant pb-4">
                Transfer Details
              </h2>

              {/* Send from */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-sm font-normal text-on-surface-variant">
                  Send from
                </label>
                <div className="relative">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface cursor-pointer focus:outline-none focus:border-primary"
                  >
                    {CORRIDORS.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">▾</span>
                </div>
              </div>

              {/* Send to — fixed USD */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-sm font-normal text-on-surface-variant">
                  Send to
                </label>
                <div className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface-variant flex items-center gap-2">
                  <span>🇺🇸</span>
                  <span>United States (USD)</span>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-sm font-normal text-on-surface-variant">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-on-surface-variant">
                    {fromData.flag}
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-primary"
                    placeholder="100,000"
                  />
                </div>
              </div>

              <Button variant="primary" onClick={compareRates}>
                Compare Rates
              </Button>
            </div>

            {/* Right — Results */}
            <div className="flex-1 flex flex-col gap-4">
              {!results && (
                <div className="flex-1 flex items-center justify-center text-on-surface-variant font-sans text-sm">
                  Enter an amount and click Compare Rates to see results.
                </div>
              )}

              {results && results.map((r) => (
                <div
                  key={r.provider}
                  className={`
                    relative rounded-xl p-5 flex flex-col gap-3
                    ${r.isBest
                      ? "bg-white border border-primary shadow-[0_4px_4px_0_rgba(0,0,0,0.15)]"
                      : r.isWarning
                      ? "bg-surface border border-outline-variant opacity-75"
                      : "bg-white border border-outline-variant"
                    }
                  `}
                >
                  {r.isBest && (
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-primary text-on-primary font-sans text-xs font-medium px-3 py-1 rounded-full">
                      Best value today
                    </div>
                  )}

                  {r.isWarning && (
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-error text-white font-sans text-xs font-medium px-3 py-1 rounded-full">
                      Not recommended
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-low border border-outline-variant flex items-center justify-center shrink-0">
                        <r.icon size={20} className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-sans text-base font-semibold text-on-surface">
                          {r.provider}
                        </p>
                        <p className="font-sans text-xs text-on-surface-variant">
                          ⏱ {r.delivery}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-sans text-xs text-on-surface-variant mb-1">
                        Rate: 1 {fromCurrency} = {r.rate.toFixed(4)} USD &nbsp;·&nbsp; Fee: {r.fee === 0 ? "Free" : r.provider === "Bank Wire" ? `$${r.fee}` : `${r.fee} ${fromCurrency}`}
                      </p>
                      <p className={`font-sans text-2xl font-bold ${r.isWarning ? "text-on-surface-variant" : "text-primary"}`}>
                        ${r.recipientGets.toFixed(2)}
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant">
                        Recipient gets
                      </p>
                    </div>
                  </div>

                  {r.isBest && (
                    <div className="border-t border-outline-variant pt-3 flex items-center gap-2">
                      <span className="text-on-surface-variant text-sm">ℹ</span>
                      <p className="font-sans text-xs text-on-surface-variant">
                        Why this option: Lowest total cost including mid-market exchange rate.
                      </p>
                    </div>
                  )}

                  {r.isWarning && (
                    <div className="flex items-center gap-2">
                      <span className="text-error text-sm">⚠</span>
                      <p className="font-sans text-xs text-error">
                        {r.warningText}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="font-sans text-xs text-on-surface-variant text-center max-w-[640px] mx-auto">
            Rates shown are estimates based on recent data. Actual rates may vary. Borderless is not a money transfer service — we help you compare your options. Always verify the current rate on the provider's website before sending.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}