"use client";

import { useState } from "react";
import { Bell, CalendarIcon, Dot } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { demoStats, demoUser } from "@/lib/demo";
import { dashboardQueryKeys } from "@/hooks/dashboard/queries";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [period, setPeriod] = useState("30");
  const [notifications, setNotifications] = useState(false);
  const client = useQueryClient();
  function changePeriod(days: string) {
    setPeriod(days);
    const factor = Number(days) / 30;
    client.setQueryData(dashboardQueryKeys.stats(), {
      ...demoStats,
      periodDays: Number(days),
      views: { ...demoStats.views, value: Math.round(demoStats.views.value * factor), change: days === "7" ? 14.2 : days === "90" ? 38.6 : demoStats.views.change },
      subscribers: { ...demoStats.subscribers, change: days === "7" ? 4.1 : days === "90" ? 28.4 : demoStats.subscribers.change },
    });
  }
  return <nav aria-label="Workspace toolbar" className="bg-card min-h-18 w-full border-b border-border flex flex-wrap items-center gap-4 justify-end px-4 py-2">
    <p className="text-xs flex items-center justify-center text-muted-foreground"><Dot className="size-6 text-[#D4D4D8]" /> Demo workspace</p>
    <div className="flex gap-2 p-2 items-center justify-center border border-border rounded-md"><CalendarIcon className="size-4 text-muted-foreground" /><label htmlFor="reporting-period" className="sr-only">Reporting period</label><select id="reporting-period" value={period} onChange={(event) => changePeriod(event.target.value)} className="bg-card text-sm"><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></div>
    <div className="relative"><button aria-label="Notifications" aria-expanded={notifications} onClick={() => setNotifications(!notifications)} className="relative p-2 rounded-md border border-border"><Bell className="size-4 text-muted-foreground" /><span className="absolute top-1 right-1.5 size-2 rounded-full bg-primary" /></button>{notifications && <div className="absolute right-0 top-12 z-30 w-64 rounded-lg border border-border bg-card p-4 text-sm shadow-sm"><p className="font-semibold">Demo notifications</p><p className="mt-2 text-muted-foreground">Your sample channel report is ready. Five videos have optimization opportunities.</p><button onClick={() => setNotifications(false)} className="mt-3 text-primary">Dismiss</button></div>}</div>
    <Image src={demoUser.youtubeChannelThumbnail} alt="Demo user avatar" width={32} height={32} className="rounded-full border border-border object-cover" />
    <LogoutButton />
  </nav>;
}
