"use client";

import { usePathname } from "next/navigation";
import { Button } from "./button";

export function Nav() {
  const pathname = usePathname();

  function linkClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `font-sans text-base font-normal leading-6 transition-colors ${
      active
        ? "text-primary border-b-2 border-primary pb-0.5"
        : "text-on-surface-variant hover:text-primary"
    }`;
  }

  return (
    <nav className="w-full border-b border-outline-variant bg-surface-low shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]">
      <div className="max-w-[1200px] mx-auto px-6 h-[65px] flex items-center justify-between">
        <a href="/" className="font-sans text-2xl font-bold leading-8 text-primary">
          Borderless
        </a>
        <div className="flex items-center gap-8">
          <a href="#" className={linkClass("/solutions")}>Solutions</a>
          <a href="/resources" className={linkClass("/resources")}>Resources</a>
          <a href="/pricing" className={linkClass("/pricing")}>Pricing</a>
          <a href="#" className={linkClass("/support")}>Support</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Sign In</Button>
          <Button variant="primary">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}