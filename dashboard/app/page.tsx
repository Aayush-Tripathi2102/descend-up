"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEMO_SESSION, readLocal } from "@/lib/demo";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => { router.replace(readLocal(DEMO_SESSION, false) ? "/dashboard/" : "/login/"); }, [router]);
  return <p className="p-6">Opening DescendUp…</p>;
}
