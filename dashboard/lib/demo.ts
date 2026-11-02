import type { TDashboardStats, TRecommendationStrategy, TCanOptimizeResponse, TVideoRecommendations, TChannelRecommendationsResponse, TApplyRecommendationsResponse } from "@/hooks/dashboard/types";
import type { TChannelVideo } from "@/hooks/dashboard/videos";

export const DEMO_SESSION = "descendup-demo-session-v1";
const VIDEOS_KEY = "descendup-demo-videos-v1";
export const demoUser = {
  id: "demo-creator", name: "Alex Morgan", email: "alex@example.com",
  image: "/demo-avatar.svg", plan: "pro", youtubeChannelId: "UC_DEMO_STUDIO",
  youtubeChannelTitle: "Alex Creates", youtubeChannelThumbnail: "/demo-avatar.svg",
};

export const demoStats: TDashboardStats = {
  periodDays: 30,
  views: { value: 284650, change: 24.8, trend: [34, 39, 37, 48, 55, 52, 68, 72, 65, 84, 91, 103] },
  subscribers: { value: 12840, change: 12.6, trend: [50, 52, 55, 54, 60, 63, 68, 74, 79, 85, 90, 96] },
  engagement: { value: 7.8, change: 8.4, trend: [4, 5, 4.8, 5.2, 6, 5.8, 6.4, 7.1, 6.8, 7.2, 7.5, 7.8] },
  ctr: { value: 6.4, change: 15.2, trend: [3.8, 4.1, 4.5, 4.2, 4.8, 5.1, 5, 5.5, 5.8, 6.1, 6, 6.4] },
  avgWatchTime: { value: 286, change: 9.7, trend: [201, 208, 220, 214, 232, 240, 238, 250, 263, 270, 279, 286] },
};

export const seedVideos: TChannelVideo[] = [
  { id: "demo-studio", title: "My Minimal Desk Setup for Creative Work", description: "A tour of my workspace and the tools I use every day.", thumbnailUrl: "/demo-studio.svg", publishedAt: "2026-10-24T12:00:00Z" },
  { id: "demo-workflow", title: "How I Plan a Week of Content in One Hour", description: "My practical planning workflow for consistent content.", thumbnailUrl: "/demo-workflow.svg", publishedAt: "2026-10-19T12:00:00Z" },
  { id: "demo-camera", title: "Budget Camera Gear That Actually Matters", description: "The filming essentials I recommend to new creators.", thumbnailUrl: "/demo-camera.svg", publishedAt: "2026-10-14T12:00:00Z" },
  { id: "demo-editing", title: "5 Editing Habits That Changed My Videos", description: "Simple editing improvements for stronger stories.", thumbnailUrl: "/demo-editing.svg", publishedAt: "2026-10-09T12:00:00Z" },
  { id: "demo-growth", title: "What I Learned From 100 YouTube Uploads", description: "An honest look at my first hundred uploads and lessons learned.", thumbnailUrl: "/demo-growth.svg", publishedAt: "2026-10-04T12:00:00Z" },
];

export function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; }
}
export function writeLocal(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The demo still works for this visit without storage. */ }
}
export function getDemoVideos(): TChannelVideo[] {
  const saved = readLocal<TChannelVideo[]>(VIDEOS_KEY, seedVideos);
  return Array.isArray(saved) && saved.length === seedVideos.length ? saved : seedVideos;
}
export function strategiesFor(videoId: string): TRecommendationStrategy[] {
  const video = getDemoVideos().find((v) => v.id === videoId) ?? seedVideos[0];
  return [
    { template_name: "Lead with a clear viewer benefit", category: "SEO", feature: "title", action: `Make the promise of “${video.title}” clear in the opening words.`, implementation_guide: "Use a concise benefit-led title and keep the main keyword near the beginning.", current_value: 62, target_value: 90, estimated_impact: 18, confidence: 0.92, priority: 1 },
    { template_name: "Strengthen your description", category: "Discovery", feature: "description", action: "Add a keyword-rich summary, chapters, and a specific next-video call to action.", estimated_impact: 12, confidence: 0.88, priority: 2 },
    { template_name: "Add focused search tags", category: "SEO", feature: "tags", action: "Use relevant creator, tutorial, and topic tags instead of broad unrelated keywords.", estimated_impact: 8, confidence: 0.85, priority: 3 },
  ];
}
export async function checkDemoVideo(videoId: string): Promise<TCanOptimizeResponse> {
  return { exists: true, can_optimize: true, reason: "Sample analysis found opportunities in the title, description, and search tags. All results are simulated; no YouTube account is connected.", lifecycle_stage: "Growth", era_id: "demo-era", headroom_score: 74, gaps_found: 3, strategies: strategiesFor(videoId), stored: true };
}
export async function generateDemoRecommendations(videoId: string): Promise<TVideoRecommendations> {
  return { video_id: videoId, strategies: strategiesFor(videoId), evidence_strength: "High (sample)", lifecycle_stage: "Growth", recommendations_generated: 3 };
}
export async function getDemoChannelRecommendations(channelId: string, filters?: { lifecycle_stage?: string; status?: string; limit?: number }): Promise<TChannelRecommendationsResponse> {
  let recommendations = getDemoVideos().map((video) => ({ video_id: video.id, video_title: video.title, yt_video_id: video.id, lifecycle_stage: "Growth", strategies: strategiesFor(video.id) }));
  if (filters?.lifecycle_stage) recommendations = recommendations.filter((r) => r.lifecycle_stage === filters.lifecycle_stage);
  if (filters?.limit) recommendations = recommendations.slice(0, filters.limit);
  return { channel_id: channelId, total: recommendations.length, recommendations };
}
export async function applyDemoRecommendations({ videoId, strategies }: { videoId: string; strategies: TRecommendationStrategy[] }): Promise<TApplyRecommendationsResponse> {
  const videos = getDemoVideos();
  const video = videos.find((v) => v.id === videoId);
  if (!video) throw new Error("Choose one of the sample videos to continue.");
  const before = { ...video };
  const title = strategies.some((s) => s.feature === "title") ? (video.title.startsWith("Create Better: ") ? video.title : `Create Better: ${video.title}`) : video.title;
  const extra = "\n\nLearn a practical creator workflow, improve your next upload, and explore more tutorials on Alex Creates.\n\n00:00 Introduction\n00:30 The workflow\n04:00 Practical tips\n\nSubscribe for weekly creator tutorials.";
  const description = strategies.some((s) => s.feature === "description") && !video.description.includes("00:00") ? video.description + extra : video.description;
  const tagsBefore = readLocal<string[]>(`demo-tags-${videoId}`, []);
  const tagsAfter = strategies.some((s) => s.feature === "tags") ? ["content creation", "creator workflow", "YouTube tips", "Alex Creates"] : tagsBefore;
  Object.assign(video, { title, description });
  writeLocal(VIDEOS_KEY, videos);
  writeLocal(`demo-tags-${videoId}`, tagsAfter);
  return {
    success: true, videoId, message: "Demo updates saved in this browser. Nothing was sent to YouTube.",
    applied: [
      ...(title !== before.title ? [{ feature: "title", field: "title" as const, before: before.title, after: title }] : []),
      ...(description !== before.description ? [{ feature: "description", field: "description" as const, before: before.description, after: description }] : []),
      ...(tagsBefore.join() !== tagsAfter.join() ? [{ feature: "tags", field: "tags" as const, before: tagsBefore.join(", ") || "(none)", after: tagsAfter.join(", ") }] : []),
    ], skipped: [], changes: { title: { before: before.title, after: title }, description: { before: before.description, after: description }, tags: { before: tagsBefore, after: tagsAfter } },
  };
}
export function resetDemo() {
  try {
    Object.keys(localStorage).filter((key) => key.startsWith("descendup-demo-") || key.startsWith("demo-tags-")).forEach((key) => localStorage.removeItem(key));
  } catch { /* No persistent state to clear. */ }
}
