"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DEMO_SESSION, readLocal, writeLocal } from "@/lib/demo";

export default function LoginPage() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  useEffect(() => { if (readLocal(DEMO_SESSION, false)) router.replace("/dashboard/"); }, [router]);
  function login() {
    setOpening(true);
    writeLocal(DEMO_SESSION, true);
    router.replace("/dashboard/");
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <section className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 space-y-6">
        <Image src="/logo.svg" width={163} height={56} alt="DescendUp" />
        <div><h1 className="text-2xl font-space font-bold">Welcome to DescendUp</h1><p className="mt-2 text-sm text-muted-foreground">Explore your creator workspace with a fully populated sample channel.</p></div>
        <button onClick={login} disabled={opening} className="w-full rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-background disabled:opacity-50">{opening ? "Opening workspace…" : "Continue with demo account"}</button>
        <p className="text-xs text-muted-foreground">Demo only. No Google login, password, or real channel access. All data is fictional and changes stay in this browser.</p>
        <a className="block text-sm text-primary hover:underline" href={process.env.NEXT_PUBLIC_MARKETING_URL || "http://localhost:3000"}>Back to DescendUp</a>
      </section>
    </main>
  );
}
