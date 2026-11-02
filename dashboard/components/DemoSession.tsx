"use client";

import { useEffect } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useRouter } from "next/navigation";
import { DEMO_SESSION, readLocal } from "@/lib/demo";

// This is intentionally only a demo gate, not real authentication.
export default function DemoSession({ children }: { children: React.ReactNode }) {
  const ready = useHydrated();
  const signedIn = ready && readLocal(DEMO_SESSION, false);
  const router = useRouter();
  useEffect(() => {
    if (ready && !signedIn) router.replace("/login/");
  }, [ready, signedIn, router]);
  return signedIn ? children : <div className="p-6 text-sm text-muted-foreground">Opening your demo workspace…</div>;
}
