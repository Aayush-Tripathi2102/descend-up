export type TStat = {
  value: number;
  change: number;
  trend: number[];
};

export type TDashboardStats = {
  periodDays?: number;
  views: TStat;
  subscribers: TStat;
  engagement: TStat;
  ctr: TStat;
  avgWatchTime: TStat;
};

export type TRecommendationStrategy = {
  template_name: string;
  category: string;
  feature: string;
  action: string;
  implementation_guide?: string;
  current_value?: number;
  target_value?: number;
  evidence_strength?: number;
  estimated_impact_indicative?: number;
  estimated_impact?: number | null;
  confidence?: number;
  priority?: number;
};

export type TCanOptimizeResponse = {
  exists: boolean;
  can_optimize: boolean;
  reason: string;
  lifecycle_stage?: string;
  era_id?: string;
  headroom_score: number;
  gaps_found: number;
  strategies: TRecommendationStrategy[];
  stored: boolean;
};

export type TVideoRecommendations = {
  video_id: string;
  strategies: TRecommendationStrategy[];
  evidence_strength: string;
  lifecycle_stage: string;
  recommendations_generated: number;
};

export type TChannelRecommendation = {
  video_id: string;
  video_title: string;
  yt_video_id: string;
  lifecycle_stage: string;
  strategies: TRecommendationStrategy[];
};

export type TChannelRecommendationsResponse = {
  channel_id: string;
  total: number;
  recommendations: TChannelRecommendation[];
};

export type TAppliedChange = {
  feature: string;
  field: "title" | "description" | "tags";
  before: string | number;
  after: string | number;
};

export type TSkippedStrategy = {
  feature: string;
  template_name: string;
  reason: string;
};

export type TApplyRecommendationsResponse = {
  success: boolean;
  videoId: string;
  message: string;
  applied: TAppliedChange[];
  skipped: TSkippedStrategy[];
  changes: {
    title: { before: string; after: string };
    description: { before: string; after: string };
    tags: { before: string[]; after: string[] };
  };
};
