import { Button } from "./button";

export function Nav() {
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
          <a href="#" className="font-sans text-base font-normal leading-6 text-on-surface-variant hover:text-primary transition-colors">
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
          <Button variant="ghost">Sign In</Button>
          <Button variant="primary">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}