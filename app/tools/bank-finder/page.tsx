"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MapPin,
  TrendingUp,
  Users,
  GraduationCap,
  Briefcase,
  Landmark,
  PiggyBank,
  Building2,
  CreditCard,
  FileText,
  SendHorizonal,
  CircleSlash,
} from "lucide-react";

type Answers = {
  name: string;
  country: string;
  university: string;
  visa: string;
  arrivalMonth: string;
  arrivalYear: string;
  funding: string[];
  helpWith: string[];
  ssn: string;
  remittance: string;
  priority: string;
};

const TOTAL_STEPS = 8;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const YEARS = Array.from({ length: 10 }, (_, i) => String(2019 + i));

const UNIVERSITIES = [
  "UC Berkeley", "UC San Diego", "UCLA", "USC", "NYU", "Columbia",
  "MIT", "Stanford", "University of Michigan", "Purdue University",
  "University of Illinois Urbana-Champaign", "Carnegie Mellon University",
  "Georgia Tech", "University of Texas Austin", "Boston University",
  "Northeastern University", "Arizona State University", "Other",
];

const COUNTRIES = [
  "India", "China", "South Korea", "Canada", "Mexico", "Brazil",
  "Germany", "France", "United Kingdom", "Japan", "Nigeria", "Ghana",
  "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Vietnam", "Indonesia",
  "Saudi Arabia", "UAE", "Turkey", "Iran", "Egypt", "Colombia",
  "Argentina", "Peru", "Kenya", "Ethiopia", "Tanzania", "Other",
];

const EMPTY: Answers = {
  name: "", country: "", university: "", visa: "",
  arrivalMonth: "", arrivalYear: "",
  funding: [], helpWith: [],
  ssn: "", remittance: "", priority: "",
};

type SetFn = <K extends keyof Answers>(key: K, value: Answers[K]) => void;

function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 32,
            height: 4,
            borderRadius: 999,
            backgroundColor: i < step ? "var(--color-primary, #003441)" : "var(--color-outline-variant, #C0C8CB)",
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

export default function BankFinderPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMulti(key: "funding" | "helpWith", value: string) {
    setAnswers((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  function canContinue() {
    if (step === 1) return answers.name.trim().length > 0 && answers.country.length > 0;
    if (step === 2) return answers.university.length > 0;
    if (step === 3) return answers.visa.length > 0 && answers.arrivalMonth.length > 0 && answers.arrivalYear.length > 0;
    if (step === 4) return true;
    if (step === 5) return true;
    if (step === 6) return answers.ssn.length > 0;
    if (step === 7) return answers.remittance.length > 0;
    if (step === 8) return answers.priority.length > 0;
    return false;
  }

  function transition(fn: () => void) {
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
    }, 250);
  }

  function next() {
    if (!canContinue()) return;
    transition(() => {
      if (step === TOTAL_STEPS) {
        setDone(true);
      } else {
        setStep((s) => s + 1);
      }
    });
  }

  function skip() {
    transition(() => {
      if (step === TOTAL_STEPS) {
        setDone(true);
      } else {
        setStep((s) => s + 1);
      }
    });
  }

  function back() {
    if (step > 1) {
      transition(() => setStep((s) => s - 1));
    }
  }

  const showSkip = step === 4 || step === 5;

  if (done) {
    return (
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(12px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          minHeight: "100vh",
        }}
      >
        <ResultScreen
          answers={answers}
          onRestart={() =>
            transition(() => {
              setDone(false);
              setStep(1);
              setAnswers(EMPTY);
            })
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full px-10 py-6 flex items-center justify-between">
        <a href="/" className="font-sans text-xl font-bold text-primary">
          Borderless
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(12px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            width: "100%",
            maxWidth: "560px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <ProgressDots step={step} total={TOTAL_STEPS} />

          {step === 1 && <StepOne answers={answers} set={set} />}
          {step === 2 && <StepTwo answers={answers} set={set} />}
          {step === 3 && <StepThree answers={answers} set={set} />}
          {step === 4 && <StepFour answers={answers} toggleMulti={toggleMulti} />}
          {step === 5 && <StepFive answers={answers} toggleMulti={toggleMulti} />}
          {step === 6 && <StepSix answers={answers} set={set} />}
          {step === 7 && <StepSeven answers={answers} set={set} />}
          {step === 8 && <StepEight answers={answers} set={set} />}

          <div className="border-t border-outline-variant pt-6 flex items-center justify-between">
            <button
              onClick={back}
              className="flex items-center gap-2 font-sans text-sm text-outline hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-4">
              {showSkip && (
                <button
                  onClick={skip}
                  className="font-sans text-sm text-outline hover:text-primary transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={next}
                disabled={!canContinue()}
                className="flex items-center gap-2 bg-primary text-white font-sans text-sm font-medium px-6 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {step === TOTAL_STEPS ? "See my recommendations" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border font-sans text-[15px] text-on-surface flex items-center justify-between transition-all ${
        selected
          ? "border-2 border-primary bg-surface-lowest"
          : "border border-outline-variant bg-surface-lowest hover:border-primary/50"
      }`}
    >
      {label}
      {selected && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />}
    </button>
  );
}

function IconCard({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-3 px-4 py-4 rounded-xl border font-sans text-sm text-on-surface transition-all ${
        selected
          ? "border-2 border-primary bg-surface-lowest"
          : "border border-outline-variant bg-surface-lowest hover:border-primary/50"
      }`}
    >
      <div className="text-outline">{icon}</div>
      <span className="font-sans text-sm font-medium text-on-surface">{label}</span>
    </button>
  );
}

function StepLabel({ label }: { label: string }) {
  return (
    <span className="font-sans text-sm font-medium text-outline">{label}</span>
  );
}

function SearchInput({
  value,
  onChange,
  onSelect,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = options
    .filter((o) => o.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 6);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-lowest font-sans text-[15px] text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors"
      />
      {open && value.length > 0 && filtered.length > 0 && (
        <div className="absolute z-20 top-full mt-1 w-full bg-surface-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]">
          {filtered.map((o) => (
            <button
              key={o}
              onMouseDown={() => {
                onSelect(o);
                onChange(o);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 font-sans text-[15px] text-on-surface hover:bg-surface transition-colors border-b border-outline-variant last:border-0"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StepOne({ answers, set }: { answers: Answers; set: SetFn }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
        Let's get to know you.
      </h1>
      <div className="flex flex-col gap-2">
        <StepLabel label="Your name" />
        <input
          type="text"
          value={answers.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Aanya"
          className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-lowest font-sans text-[15px] text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <StepLabel label="Where are you from?" />
        <SearchInput
          value={answers.country}
          onChange={(v) => set("country", v)}
          onSelect={(v) => set("country", v)}
          options={COUNTRIES}
          placeholder="e.g. India"
        />
      </div>
    </div>
  );
}

function StepTwo({ answers, set }: { answers: Answers; set: SetFn }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
        Which university are you attending?
      </h1>
      <div className="flex flex-col gap-2">
        <StepLabel label="Search your university" />
        <SearchInput
          value={answers.university}
          onChange={(v) => set("university", v)}
          onSelect={(v) => set("university", v)}
          options={UNIVERSITIES}
          placeholder="e.g. UC Berkeley"
        />
      </div>
    </div>
  );
}

function StepThree({ answers, set }: { answers: Answers; set: SetFn }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
          What's your visa status?
        </h1>
        <div className="grid grid-cols-2 gap-3">
          {["F-1", "J-1", "H-1B", "Other"].map((v) => (
            <OptionCard
              key={v}
              label={v}
              selected={answers.visa === v}
              onClick={() => set("visa", v)}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-outline-variant" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-2xl font-bold text-primary">
            When did you arrive in the US?
          </h2>
          <p className="font-sans text-sm text-outline">
            This helps us match you with banks based on your residency timeline.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <StepLabel label="Arrival Month" />
            <div className="relative">
              <select
                value={answers.arrivalMonth}
                onChange={(e) => set("arrivalMonth", e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-outline-variant bg-surface-lowest font-sans text-[15px] text-on-surface focus:outline-none focus:border-primary transition-colors"
              >
                <option value="" disabled>Month</option>
                {MONTHS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                ▾
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <StepLabel label="Arrival Year" />
            <div className="relative">
              <select
                value={answers.arrivalYear}
                onChange={(e) => set("arrivalYear", e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-outline-variant bg-surface-lowest font-sans text-[15px] text-on-surface focus:outline-none focus:border-primary transition-colors"
              >
                <option value="" disabled>Year</option>
                {YEARS.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepFour({
  answers,
  toggleMulti,
}: {
  answers: Answers;
  toggleMulti: (key: "funding" | "helpWith", value: string) => void;
}) {
  const options = [
    { label: "Family", icon: <Users className="w-5 h-5" /> },
    { label: "Scholarship", icon: <GraduationCap className="w-5 h-5" /> },
    { label: "On-campus job (TA/RA)", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Loan", icon: <Landmark className="w-5 h-5" /> },
    { label: "Personal savings", icon: <PiggyBank className="w-5 h-5" /> },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
          How are you funding your studies?
        </h1>
        <p className="font-sans text-sm text-outline">
          Select all that apply to help us tailor your financial toolkit.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <IconCard
            key={o.label}
            label={o.label}
            icon={o.icon}
            selected={answers.funding.includes(o.label)}
            onClick={() => toggleMulti("funding", o.label)}
          />
        ))}
      </div>
    </div>
  );
}

function StepFive({
  answers,
  toggleMulti,
}: {
  answers: Answers;
  toggleMulti: (key: "funding" | "helpWith", value: string) => void;
}) {
  const gridOptions = [
    { label: "Banking", icon: <Building2 className="w-5 h-5" /> },
    { label: "Credit card", icon: <CreditCard className="w-5 h-5" /> },
    { label: "Taxes", icon: <FileText className="w-5 h-5" /> },
    { label: "Sending money home", icon: <SendHorizonal className="w-5 h-5" /> },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
          What do you need help with first?
        </h1>
        <p className="font-sans text-sm text-outline">
          Select as many as you need. We'll tailor your experience.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {gridOptions.map((o) => (
            <IconCard
              key={o.label}
              label={o.label}
              icon={o.icon}
              selected={answers.helpWith.includes(o.label)}
              onClick={() => toggleMulti("helpWith", o.label)}
            />
          ))}
        </div>
        <button
          onClick={() => toggleMulti("helpWith", "Just exploring")}
          className={`w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl border font-sans text-sm transition-all ${
            answers.helpWith.includes("Just exploring")
              ? "border-2 border-primary bg-surface-lowest text-primary"
              : "border border-outline-variant bg-surface-lowest text-outline hover:border-primary/50"
          }`}
        >
          <CircleSlash className="w-4 h-4" />
          Just exploring
        </button>
      </div>
    </div>
  );
}

function StepSix({ answers, set }: { answers: Answers; set: SetFn }) {
  const options = ["Yes", "No", "Applied — waiting"];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
          Do you have a Social Security Number?
        </h1>
        <p className="font-sans text-sm text-outline">
          Some banks require an SSN. We'll only show you options you can actually open.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {options.map((o) => (
          <OptionCard
            key={o}
            label={o}
            selected={answers.ssn === o}
            onClick={() => set("ssn", o)}
          />
        ))}
      </div>
    </div>
  );
}

function StepSeven({ answers, set }: { answers: Answers; set: SetFn }) {
  const options = ["Less than $200", "$200 – $500", "$500 – $1,000", "Over $1,000"];
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
        How much do you send home each month?
      </h1>
      <div className="flex flex-col gap-3">
        {options.map((o) => (
          <OptionCard
            key={o}
            label={o}
            selected={answers.remittance === o}
            onClick={() => set("remittance", o)}
          />
        ))}
      </div>
    </div>
  );
}

function StepEight({ answers, set }: { answers: Answers; set: SetFn }) {
  const options = [
    "No minimum balance",
    "No international fees",
    "Strong mobile app",
    "Physical branch nearby",
  ];
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary">
        What matters most in a bank?
      </h1>
      <div className="flex flex-col gap-3">
        {options.map((o) => (
          <OptionCard
            key={o}
            label={o}
            selected={answers.priority === o}
            onClick={() => set("priority", o)}
          />
        ))}
      </div>
    </div>
  );
}

function ResultScreen({
  answers,
  onRestart,
}: {
  answers: Answers;
  onRestart: () => void;
}) {
  const firstName = answers.name.split(" ")[0];

  const bankMap: Record<string, { name: string; branch: string; branchNote: string }> = {
    "UC Berkeley": {
      name: "Bank of America",
      branch: "2143 Shattuck Ave",
      branchNote: "Short walk from the Downtown Berkeley BART.",
    },
    "UC San Diego": {
      name: "Chase Bank",
      branch: "8650 Genesee Ave",
      branchNote: "On-campus area, La Jolla.",
    },
    UCLA: {
      name: "Wells Fargo",
      branch: "10960 Wilshire Blvd",
      branchNote: "Near Westwood Village.",
    },
  };

  const match = bankMap[answers.university] ?? {
    name: "Chase Bank",
    branch: "Your nearest branch",
    branchNote: "Check the Chase app for locations near your campus.",
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full px-10 py-6 flex items-center justify-between">
        <a href="/" className="font-sans text-xl font-bold text-primary">
          Borderless
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10">
        <div className="flex flex-col items-center gap-3 text-center max-w-[560px]">
          <ProgressDots step={TOTAL_STEPS} total={TOTAL_STEPS} />
          <h1 className="font-serif text-[36px] leading-[44px] font-bold text-primary mt-4">
            {firstName}, you're a {answers.country} {answers.visa} student at {answers.university}.
          </h1>
          <p className="font-sans text-sm text-outline max-w-[420px]">
            We've analyzed data from hundreds of peers with your exact profile to give you a head start on campus life.
          </p>
        </div>

        <div
          className="w-full max-w-[520px] rounded-2xl border border-outline-variant overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="bg-surface-lowest p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-outline" />
              <span className="font-sans text-xs font-semibold text-outline tracking-widest uppercase">
                Peer Insight
              </span>
            </div>
            <p className="font-sans text-base font-semibold text-on-surface leading-6">
              {answers.country} students at {answers.university} most commonly open{" "}
              <span className="text-primary underline">{match.name}</span> checking accounts.
            </p>
            <div className="bg-surface rounded-xl px-3 py-3 flex items-start gap-2 mt-auto">
              <MapPin className="w-4 h-4 text-outline mt-0.5 flex-shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-xs font-semibold text-on-surface">
                  Nearest branch
                </span>
                <span className="font-sans text-sm text-on-surface">{match.branch}</span>
                <span className="font-sans text-xs text-outline">{match.branchNote}</span>
              </div>
            </div>
          </div>

          <div
            className="bg-outline-variant flex items-center justify-center"
            style={{ minHeight: 280 }}
          >
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <div className="w-10 h-10 rounded-full bg-surface-lowest flex items-center justify-center">
                <Building2 className="w-5 h-5 text-outline" />
              </div>
              <span className="font-sans text-xs text-outline">
                {answers.university} campus photo
              </span>
              <span className="font-sans text-xs text-outline-variant">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="flex items-center gap-2 bg-primary text-white font-sans text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Take me to my dashboard
          <ArrowRight className="w-4 h-4" />
        </a>
      </main>
    </div>
  );
}