"use client";

import { useGetDashboardStats } from "@/hooks/dashboard";
import { StatCard } from "./StatCard";

function compact(value: number): string {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function secondsToDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}m ${secs}s`;
}

export function DashboardStats() {
  const { data, isLoading } = useGetDashboardStats();

  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-5">
      <StatCard
        title="Views"
        value={compact(data.views.value)}
        change={data.views.change}
        trend={data.views.trend}
      />

      <StatCard
        title="Subscribers"
        value={compact(data.subscribers.value)}
        change={data.subscribers.change}
        trend={data.subscribers.trend}
      />

      <StatCard
        title="Engagement Rate"
        value={`${data.engagement.value}%`}
        change={data.engagement.change}
        trend={data.engagement.trend}
      />

      <StatCard
        title="CTR"
        value={`${data.ctr.value}%`}
        change={data.ctr.change}
        trend={data.ctr.trend}
      />

      <StatCard
        title="Avg Watch Time"
        value={secondsToDuration(data.avgWatchTime.value)}
        change={data.avgWatchTime.change}
        trend={data.avgWatchTime.trend}
      />
    </div>
  );
}
