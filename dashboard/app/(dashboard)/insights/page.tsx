"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { readLocal, writeLocal } from "@/lib/demo";

const insights = [
  { title: "Turn your strongest topic into a series", category: "Content", detail: "The desk setup sample video has 68,420 views, more than twice your channel average. Follow it with a workspace lighting guide and a budget setup breakdown.", impact: "High" },
  { title: "Improve the first 30 seconds", category: "Retention", detail: "Sample retention drops from 100% to 72% during the introduction. Show the finished result first, then explain how viewers can achieve it.", impact: "High" },
  { title: "Refresh older video metadata", category: "SEO", detail: "Five sample videos have room for clearer title promises, richer descriptions, and focused topic tags. Open Optimization to preview and simulate updates.", impact: "Medium" },
  { title: "Keep a consistent publishing rhythm", category: "Content", detail: "Tuesday and Friday uploads have the strongest sample engagement. Plan two practical tutorials each week and publish around 6 PM in your audience's timezone.", impact: "Medium" },
];
export default function InsightsPage() {
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  // Static HTML must hydrate before reading browser-only saved data.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSaved(readLocal<string[]>("descendup-demo-saved-v1", [])); }, []);
  function toggle(title: string) {
    const current = saved;
    const next = current.includes(title) ? current.filter((item) => item !== title) : [...current, title];
    setSaved(next); writeLocal("descendup-demo-saved-v1", next);
  }
  return <div className="space-y-6"><header className="py-4"><h1 className="text-2xl font-space font-bold">Insights</h1><p className="mt-2 text-sm text-muted-foreground">Actionable ideas from your fictional channel&apos;s performance.</p></header>
    <div className="flex flex-wrap gap-2" aria-label="Filter insights">{["All", "Content", "Retention", "SEO"].map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border border-border px-4 py-2 text-sm ${filter === item ? "bg-primary text-white" : "bg-card"}`}>{item}</button>)}</div>
    <div className="divide-y divide-border rounded-lg border border-border bg-card">{insights.filter((insight) => filter === "All" || insight.category === filter).map((insight) => <article key={insight.title} className="space-y-3 p-6"><div className="flex flex-wrap justify-between gap-3"><h2 className="font-semibold">{insight.title}</h2><span className="text-xs text-primary">{insight.impact} opportunity · {insight.category}</span></div><p className="max-w-3xl text-sm leading-6 text-muted-foreground">{insight.detail}</p><div className="flex items-center gap-5"><Link href="/optimization/" className="text-sm text-primary hover:underline">Explore recommendations</Link><button onClick={() => toggle(insight.title)} aria-pressed={saved.includes(insight.title)} className="text-sm text-muted-foreground hover:text-foreground">{saved.includes(insight.title) ? "Saved" : "Save insight"}</button></div></article>)}</div>
  </div>;
}
