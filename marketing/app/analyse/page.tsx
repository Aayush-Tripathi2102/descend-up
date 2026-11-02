"use client";

import { useState } from "react";
import { demoChannel } from "@/lib/demo";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Button from "@/components/Button";

type Video = {
  title: string;
  views: number;
  date: string;
};

type Analytics = {
  avgViews: number;
  trend: { date: string; views: number }[];
  uploads: { date: string; count: number }[];
  topVideos: Video[];
};

type Stats = {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
};

type ChannelData = {
  stats: Stats;
  analytics: Analytics;
  insights: string[];
};

const formatNumber = (value: string | number) =>
  Number(value).toLocaleString("en-US");

export default function AnalysePage() {
  const [channelId, setChannelId] = useState("");
  const [data, setData] = useState<ChannelData | null>(null);
  const [analysing, setAnalysing] = useState(false);

  const fetchChannelData = async () => {
    if (!channelId.trim()) return;

    try {
      setAnalysing(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData(demoChannel);
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-6">
      {/* Loader */}
      {analysing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 animate-spin rounded-full border-8 border-white border-t-[#DE0000]" />
            <div className="text-xl sm:text-3xl font-black uppercase text-white tracking-widest">
              Analysing Channel...
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#DE0000] p-6 sm:p-10 border-4 border-black">
          <h1 className="text-3xl sm:text-5xl font-title font-bold uppercase text-white leading-tight">
            YouTube <br />
            Intelligence Dashboard
          </h1>
          <p className="mt-3 text-sm text-white">Demo mode — enter any handle to explore a fictional sample channel. No live data is accessed.</p>

          {/* Input row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 border-4 border-black bg-[#E5EEFF] p-4">
            <div className="flex-1 bg-white border-4 border-black p-3">
              <Input
                placeholder="Enter Channel ID or @handle"
                value={channelId}
                className="bg-white border-0 shadow-none focus-visible:ring-0"
                onChange={(e) => setChannelId(e.target.value)}
              />
            </div>

            <div className="sm:w-1/5 w-full hidden sm:block">
              <Button
                text={analysing ? "ANALYSING..." : "ANALYSE MY CHANNEL"}
                color="black"
                onClick={fetchChannelData}
                disabled={analysing}
                textStyle="text-xs sm:text-sm text-white"
              />
            </div>
            <div className="md:hidden block">
              <Button
                text={analysing ? "ANALYSING..." : "ANALYSE MY CHANNEL"}
                color="#000000"
                textStyle="text-white text-lg"
                px={6}
                py={4}
                onClick={fetchChannelData}
              />
            </div>
          </div>
        </div>

        {data && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat
                title="SUBSCRIBERS"
                value={formatNumber(data.stats.subscriberCount)}
                bg="bg-[#F7D400]"
              />
              <Stat
                title="TOTAL VIEWS"
                value={formatNumber(data.stats.viewCount)}
                bg="bg-[#DE0000] text-white"
              />
              <Stat
                title="VIDEOS"
                value={formatNumber(data.stats.videoCount)}
                bg="bg-white"
              />
              <Stat
                title="AVG VIEWS"
                value={formatNumber(data.analytics.avgViews)}
                bg="bg-[#00FF66]"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Chart
                title="VIEWS TREND"
                data={data.analytics.trend}
                dataKey="views"
                bg="bg-white"
              />

              <Chart
                title="UPLOADS"
                data={data.analytics.uploads}
                dataKey="count"
                bg="bg-white"
                bar
              />
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Top videos */}
              <div className="border-4 border-black bg-black text-white p-6">
                <h2 className="text-xl sm:text-2xl font-black uppercase mb-4">
                  TOP VIDEOS
                </h2>

                {data.analytics.topVideos.slice(0, 5).map((v, i) => (
                  <div key={i} className="border-b border-white/20 py-2">
                    <div className="font-bold line-clamp-1">{v.title}</div>
                    <div className="text-sm">
                      {Number(v.views).toLocaleString()} views
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div className="lg:col-span-2 border-4 border-black bg-[#F3E06B] p-6">
                <h2 className="text-2xl sm:text-4xl font-black uppercase mb-4">
                  CHANNEL INSIGHTS
                </h2>

                <ul className="space-y-3">
                  {data.insights.map((insight, i) => (
                    <li key={i} className="font-semibold">
                      • {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- STAT ---------- */

function Stat({
  title,
  value,
  bg,
}: {
  title: string;
  value: string | number;
  bg: string;
}) {
  return (
    <div
      className={`${bg} border-4 border-black p-5 sm:p-6 min-h-[140px] flex flex-col justify-between`}
    >
      <div className="text-xs sm:text-sm font-bold uppercase tracking-widest">
        {title}
      </div>
      <div className="text-xl sm:text-2xl font-black break-words">{value}</div>
    </div>
  );
}

/* ---------- CHART ---------- */

function Chart({ title, data, dataKey, bar, bg }: { title: string; data: { date: string; views?: number; count?: number }[]; dataKey: string; bar?: boolean; bg: string }) {
  return (
    <div className={`${bg} border-4 border-black p-4`}>
      <h2 className="font-black text-xl sm:text-2xl uppercase mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={240}>
        {bar ? (
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#DE0000" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey={dataKey} stroke="#DE0000" strokeWidth={3} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
