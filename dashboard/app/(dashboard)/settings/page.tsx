"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { demoUser, readLocal, resetDemo, writeLocal } from "@/lib/demo";

const defaults = { name: demoUser.name, channel: demoUser.youtubeChannelTitle, summaries: true, suggestions: true };
export default function SettingsPage() {
  const [settings, setSettings] = useState(defaults);
  const [message, setMessage] = useState("");
  const client = useQueryClient();
  // Static HTML must hydrate before reading browser-only preferences.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSettings(readLocal("descendup-demo-settings-v1", defaults)); }, []);
  return <div className="max-w-3xl space-y-6"><header className="py-4"><h1 className="text-2xl font-space font-bold">Settings</h1><p className="mt-2 text-sm text-muted-foreground">Manage your demo workspace. Preferences are saved only in this browser.</p></header>
    <form onSubmit={(event) => { event.preventDefault(); writeLocal("descendup-demo-settings-v1", settings); window.dispatchEvent(new Event("demo-settings-updated")); setMessage("Demo preferences saved in this browser."); }} className="rounded-lg border border-border bg-card p-6 space-y-5">
      <h2 className="text-lg font-semibold">Profile & workspace</h2>
      <label className="block text-sm">Display name<input required maxLength={80} value={settings.name} onChange={(event) => setSettings({ ...settings, name: event.target.value })} className="mt-2 block w-full rounded-md border border-border bg-background px-3 py-2" /></label>
      <label className="block text-sm">Channel name<input required maxLength={80} value={settings.channel} onChange={(event) => setSettings({ ...settings, channel: event.target.value })} className="mt-2 block w-full rounded-md border border-border bg-background px-3 py-2" /></label>
      <div className="text-sm"><p className="font-medium">Account</p><p className="mt-1 text-muted-foreground">{demoUser.email} · Fictional demo account</p></div>
      <div className="border-t border-border pt-5 space-y-4"><h2 className="text-lg font-semibold">Preferences</h2><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.summaries} onChange={(event) => setSettings({ ...settings, summaries: event.target.checked })} />Weekly performance summaries (simulated)</label><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.suggestions} onChange={(event) => setSettings({ ...settings, suggestions: event.target.checked })} />Optimization suggestions (simulated)</label></div>
      <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Save preferences</button><p role="status" className="text-sm text-primary">{message}</p>
    </form>
    <section className="rounded-lg border border-border bg-card p-6 space-y-3"><h2 className="text-lg font-semibold">Plan & connection</h2><p className="text-sm text-muted-foreground">Pro Plan · All demo features unlocked · No billing or payments.</p><p className="text-sm text-muted-foreground">Sample YouTube channel: Alex Creates. No Google account is connected and no updates leave your browser.</p></section>
    <section className="rounded-lg border border-border bg-card p-6 space-y-3"><h2 className="text-lg font-semibold">Reset the demo</h2><p className="text-sm text-muted-foreground">Restore sample videos, chat, insights, and preferences. You will return to the demo login.</p><button onClick={() => { if (window.confirm("Reset all local demo data and sign out?")) { resetDemo(); client.clear(); window.location.assign("/login/"); } }} className="rounded-md border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50">Reset demo data</button></section>
  </div>;
}
