"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function TestPage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-surface p-16">
      <div className="max-w-3xl">
        <h1 className="text-headline-lg text-on-surface font-serif mb-2">
          Component Kitchen Sink
        </h1>
        <p className="text-body-md text-on-surface-variant mb-12">
          Internal page for testing components in isolation. Not linked from anywhere public.
        </p>

        <section className="mb-12">
          <h2 className="text-headline-md text-on-surface font-serif mb-6">
            Buttons
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" disabled>Primary disabled</Button>
              <Button variant="secondary" disabled>Secondary disabled</Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-headline-md text-on-surface font-serif mb-6">
            Inputs
          </h2>

          <div className="flex flex-col gap-6 max-w-md">
            <Input
              label="Amount"
              placeholder="₹ 100,000"
              value={amount}
              onChange={setAmount}
            />

            <Input
              label="Email address"
              placeholder="you@university.edu"
              type="email"
              value={email}
              onChange={setEmail}
            />

            <Input
              label="With error"
              placeholder="something@example.com"
              value=""
              onChange={() => {}}
              error="Please enter a valid email"
            />

            <Input
              label="Disabled"
              placeholder="Can't type here"
              value=""
              onChange={() => {}}
              disabled
            />
          </div>
        </section>
      </div>
      <Button variant="ghost">Sign In</Button>
    </div>
  );
}