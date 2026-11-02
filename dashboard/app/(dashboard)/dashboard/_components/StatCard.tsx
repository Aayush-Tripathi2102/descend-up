"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetDashboardStats } from "@/hooks/dashboard/queries";

type StatCardProps = {
  title: string;
  value: string;
  change: number;
  trend: number[];
};

export function StatCard({ title, value, change, trend }: StatCardProps) {
  const positive = change >= 0;
  const { data: stats } = useGetDashboardStats();

  const data = trend.map((value, i) => ({
    index: i,
    value,
  }));

  const gradientId = `gradient-${title.replaceAll(" ", "-")}`;

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex h-56 flex-col shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            {title}
          </p>

          {/* Value */}
          <div className="mt-1">
            <h2 className="text-2xl font-bold font-space tracking-tight whitespace-nowrap">
              {value}
            </h2>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
            positive
              ? "bg-primary/10 text-primary"
              : "bg-background text-muted-foreground",
          )}
        >
          {positive ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
          {positive ? "+" : ""}
          {change.toFixed(1)}%
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto flex items-end justify-between gap-6">
        <div className="shrink-0">
          <p className="text-xs text-muted-foreground">vs last</p>

          <p className="text-xs text-muted-foreground">{stats?.periodDays ?? 30}d</p>
        </div>

        <div className="h-12 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="currentColor"
                    stopOpacity={0.25}
                  />

                  <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke="currentColor"
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                className={cn(
                  positive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
