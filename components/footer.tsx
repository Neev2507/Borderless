export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-lowest">

      <div className="max-w-[1200px] mx-auto px-16 py-20">
        <div className="flex items-center justify-between mb-6">
          <a href="/" className="font-sans text-base font-bold text-primary">
            Borderless
          </a>
          <div className="flex items-center gap-8">
            <a href="#" className="font-sans text-base font-normal leading-6 text-outline underline hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-base font-normal leading-6 text-outline underline hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-sans text-base font-normal leading-6 text-outline underline hover:text-primary transition-colors">
              Compliance
            </a>
            <a href="#" className="font-sans text-base font-normal leading-6 text-outline underline hover:text-primary transition-colors">
              Security
            </a>
          </div>
        </div>
        <p className="font-sans text-sm font-normal text-outline">
          © 2026 Borderless. Built for international students. Not a bank, broker, or advisor.
        </p>
      </div>
    </footer>
  );
}