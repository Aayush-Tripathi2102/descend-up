"use client";

import { useState } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { demoStats, seedVideos } from "@/lib/demo";

const trend = ["Oct 1", "Oct 5", "Oct 10", "Oct 15", "Oct 20", "Oct 25"].map((date, i) => ({ date, views: [5200, 7400, 6900, 10500, 13200, 15800][i] }));
export default function ChannelReport() {
  const [handle, setHandle] = useState("@AlexCreates");
  const [report, setReport] = useState("@AlexCreates");
  const [busy, setBusy] = useState(false);
  async function analyze(event: React.FormEvent) {
    event.preventDefault();
    if (!handle.trim()) return;
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    setReport(handle.trim());
    setBusy(false);
  }
  return <div className="space-y-6">
    <header className="py-4"><h1 className="text-2xl font-space font-bold">Analyze</h1><p className="mt-2 text-sm text-muted-foreground">Explore channel performance and discover growth opportunities. All results are sample data.</p></header>
    <form onSubmit={analyze} className="flex flex-wrap gap-3">
      <label className="sr-only" htmlFor="channel-handle">Channel handle or ID</label>
      <input id="channel-handle" required value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="Channel ID or @handle" className="min-w-0 flex-1 rounded-md border border-border bg-card px-4 py-2 text-sm" />
      <button disabled={busy} className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Analyzing…" : "Analyze channel"}</button>
    </form>
    <section className="rounded-lg border border-border bg-card p-6 space-y-5" aria-live="polite">
      <div><h2 className="text-lg font-semibold">Channel report: {report}</h2><p className="mt-1 text-xs text-muted-foreground">Fictional Alex Creates dataset · Last 30 days · Not a live lookup</p></div>
      <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {[["Subscribers", "12,840"], ["Total views", "1,842,650"], ["Videos", "100"], ["Channel score", "82 / 100"]].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd></div>)}
      </dl>
      <h3 className="pt-2 text-sm font-semibold">Daily views trend</h3>
      <div className="h-64 min-w-0"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} /><YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={50} /><Tooltip contentStyle={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }} /><Line dataKey="views" stroke="var(--primary)" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div>
    </section>
    <section className="rounded-lg border border-border bg-card p-6"><h2 className="text-lg font-semibold">Top performing videos</h2><div className="divide-y divide-border mt-3">{seedVideos.map((video, i) => <div key={video.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="text-sm font-medium">{video.title}</p><p className="mt-1 text-xs text-muted-foreground">{[68420, 54210, 42780, 36540, 29810][i].toLocaleString()} sample views</p></div><Link href="/optimization/" className="text-sm text-primary hover:underline">Optimize video</Link></div>)}</div></section>
    <section className="rounded-lg border border-border bg-card p-6"><h2 className="text-lg font-semibold">What to focus on next</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Views are up {demoStats.views.change}% in this sample period. Your practical tutorials perform best. Create a follow-up to the desk setup video, put the payoff in the first 30 seconds, and publish twice a week.</p></section>
  </div>;
}
