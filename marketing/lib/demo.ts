export function consoleUrl() {
  return `${(process.env.NEXT_PUBLIC_PRO_URL || "http://localhost:3001").replace(/\/$/, "")}/login/`;
}

// Fixed, fictional data. Any channel handle opens the same sample report.
export const demoChannel = {
  stats: { subscriberCount: "12840", viewCount: "1842650", videoCount: "100" },
  analytics: {
    avgViews: 18427,
    trend: [
      { date: "Oct 1", views: 5200 }, { date: "Oct 5", views: 7400 },
      { date: "Oct 10", views: 6900 }, { date: "Oct 15", views: 10500 },
      { date: "Oct 20", views: 13200 }, { date: "Oct 25", views: 15800 },
    ],
    uploads: [ { date: "Week 1", count: 2 }, { date: "Week 2", count: 3 }, { date: "Week 3", count: 2 }, { date: "Week 4", count: 3 } ],
    topVideos: [
      { title: "My Minimal Desk Setup for Creative Work", views: 68420, date: "2026-10-24" },
      { title: "How I Plan a Week of Content in One Hour", views: 54210, date: "2026-10-19" },
      { title: "Budget Camera Gear That Actually Matters", views: 42780, date: "2026-10-14" },
      { title: "5 Editing Habits That Changed My Videos", views: 36540, date: "2026-10-09" },
      { title: "What I Learned From 100 YouTube Uploads", views: 29810, date: "2026-10-04" },
    ],
  },
  insights: [
    "Sample channel: Alex Creates. This report uses fictional data, not live YouTube results.",
    "Views grew 24.8% over the previous 30 days, led by practical creator tutorials.",
    "Your strongest sample video has 68,420 views. Consider a follow-up desk setup walkthrough.",
    "Clearer title promises and focused search tags could help viewers discover older uploads.",
    "Keep a consistent twice-weekly publishing schedule and put the key benefit in the first 30 seconds.",
  ],
};
