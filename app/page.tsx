import { Button } from "@/components/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface p-16">
      <h1 className="text-headline-lg text-on-surface font-serif mb-4">
        Borderless
      </h1>
      <p className="text-body-md text-on-surface-variant mb-8">
        Built for international students.
      </p>

      <div className="flex gap-3">
        <Button variant="primary">Start free</Button>
        <Button variant="secondary">Try the remittance tool</Button>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="primary" disabled>Disabled primary</Button>
        <Button variant="secondary" disabled>Disabled secondary</Button>
      </div>
    </div>
  );
}