"use client";

import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";

const USER = {
  name: "Neev",
  university: "UC Berkeley",
  country: "India",
  visa: "F-1",
  daysInUS: 47,
  initials: "N",
};

const SIDEBAR_LINKS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Documents", icon: FileText, href: "/dashboard/documents", active: false },
  { label: "Campus Life", icon: GraduationCap, href: "/dashboard/campus-life", active: false },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", active: false },
];

const COMMUNITY_POSTS = [
  {
    location: "Moffitt Library",
    time: "2h ago",
    text: "Found a quiet spot on the 4th floor perfect for studying during finals. Don't forget your student ID to get in after hours.",
  },
  {
    location: "International House",
    time: "5h ago",
    text: "The tax workshop for F-1 students next Tuesday is free — really helpful for first-year international students.",
  },
  {
    location: "Haas School of Business",
    time: "1d ago",
    text: "Career fair was packed! Make sure your resume mentions any US-based projects — employers noticed.",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-[210px] min-h-screen bg-surface-lowest border-r border-outline-variant flex flex-col justify-between py-6 px-4 fixed left-0 top-0">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 pb-4 border-b border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="font-sans text-sm font-bold text-white">{USER.initials}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm font-semibold text-on-surface">{USER.name}</span>
                <span className="font-sans text-xs text-outline">{USER.university} • {USER.country}</span>
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {SIDEBAR_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-sm transition-colors ${
                  link.active
                    ? "bg-surface text-primary font-medium"
                    : "text-on-surface-variant hover:bg-surface hover:text-primary"
                }`}
              >
                <link.icon className="w-4 h-4 flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 ml-[210px] px-10 py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill icon={CheckCircle} label="Visa Active" color="green" />
            <StatusPill icon={CheckCircle} label="Bank Finder Complete" color="green" />
            <StatusPill icon={AlertTriangle} label="Taxes due in 73 days" color="orange" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-[32px] leading-[40px] font-bold text-primary">
              {getGreeting()}, {USER.name}.
            </h1>
            <p className="font-sans text-sm text-outline">
              {USER.visa} student at {USER.university}. Day {USER.daysInUS} in the US.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 flex flex-col gap-5">
            <BankCard />
            <RemittanceCard />
          </div>
          <div className="flex flex-col gap-5">
            <DeadlineCard />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-base font-semibold text-on-surface">
              From {USER.university} students this week.
            </h2>
            <a href="#" className="font-sans text-sm text-primary hover:opacity-70 transition-opacity">
              View all
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {COMMUNITY_POSTS.map((post) => (
              <CommunityCard key={post.location} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusPill({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType;
  label: string;
  color: "green" | "orange" | "gray";
}) {
  const styles = {
    green: "border-green-200 text-green-700 bg-green-50",
    orange: "border-orange-200 text-orange-700 bg-orange-50",
    gray: "border-outline-variant text-outline bg-surface",
  };
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-sans text-xs font-medium ${styles[color]}`}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      {label}
    </div>
  );
}

function BankCard() {
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="font-sans text-xs font-semibold text-outline tracking-widest uppercase">
          Your Bank Match
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-lg font-semibold text-on-surface">
          Bank of America is your top match.
        </h3>
        <p className="font-sans text-sm text-outline leading-5">
          Based on your F-1 visa and UC Berkeley location. Nearest branch is 2143 Shattuck Ave — a short walk from Downtown Berkeley BART.
        </p>
      </div>
      <a
        href="/tools/bank-finder"
        className="self-start flex items-center gap-2 bg-primary text-white font-sans text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        View full recommendation
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function RemittanceCard() {
  const rates = [
    { provider: "Wise", rate: "83.42", fee: "$0.54", best: true },
    { provider: "Remitly", rate: "83.18", fee: "$1.99", best: false },
    { provider: "Bank Wire", rate: "81.20", fee: "$25.00", best: false },
  ];
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="font-sans text-xs font-semibold text-outline tracking-widest uppercase">
            USD → INR This Week
          </span>
        </div>
        <a href="/tools/remittance" className="font-sans text-xs text-primary hover:opacity-70 transition-opacity">
          Full comparison →
        </a>
      </div>
      <div className="flex flex-col gap-2">
        {rates.map((r) => (
          <div
            key={r.provider}
            className={`flex items-center justify-between px-4 py-3 rounded-lg ${
              r.best ? "bg-primary/5 border border-primary/20" : "bg-surface"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm font-medium text-on-surface">{r.provider}</span>
              {r.best && (
                <span className="font-sans text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Best value
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-sans text-sm text-outline">{r.fee} fee</span>
              <span className="font-sans text-sm font-semibold text-on-surface">₹{r.rate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeadlineCard() {
  const deadlines = [
    { label: "File federal taxes", date: "Apr 15, 2025", days: 73, urgent: true },
    { label: "OPT application window opens", date: "Feb 1, 2025", days: 0, urgent: false },
    { label: "I-20 renewal", date: "Aug 20, 2025", days: 210, urgent: false },
  ];
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        <span className="font-sans text-xs font-semibold text-outline tracking-widest uppercase">
          Upcoming Deadlines
        </span>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {deadlines.map((d) => (
          <div
            key={d.label}
            className={`flex flex-col gap-0.5 px-3 py-3 rounded-lg border ${
              d.urgent
                ? "border-orange-200 bg-orange-50"
                : "border-outline-variant bg-surface"
            }`}
          >
            <span className={`font-sans text-sm font-medium ${d.urgent ? "text-orange-700" : "text-on-surface"}`}>
              {d.label}
            </span>
            <span className={`font-sans text-xs ${d.urgent ? "text-orange-600" : "text-outline"}`}>
              {d.date}{d.days > 0 ? ` · ${d.days} days away` : " · Completed"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityCard({ post }: { post: typeof COMMUNITY_POSTS[0] }) {
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
      <div className="h-[140px] bg-outline-variant flex items-center justify-center">
        <span className="font-sans text-xs text-outline">Photo placeholder</span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="font-sans text-xs text-outline">{post.location} · {post.time}</span>
        <p className="font-sans text-sm text-on-surface leading-5 line-clamp-2">{post.text}</p>
      </div>
    </div>
  );
}