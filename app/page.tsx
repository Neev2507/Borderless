"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-surface p-16">
      <h1 className="text-headline-lg text-on-surface font-serif mb-4">
        Borderless
      </h1>
      <p className="text-body-md text-on-surface-variant mb-8">
        Built for international students.
      </p>

      <div className="flex gap-3 mb-12">
        <Button variant="primary">Start free</Button>
        <Button variant="secondary">Try the remittance tool</Button>
      </div>

      <div className="max-w-md flex flex-col gap-6">
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
    </div>
  );
}