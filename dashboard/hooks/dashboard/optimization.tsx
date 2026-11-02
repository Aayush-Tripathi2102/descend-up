import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyDemoRecommendations, checkDemoVideo, generateDemoRecommendations, getDemoChannelRecommendations, getDemoVideos } from "@/lib/demo";

export const optimizationQueryKeys = {
  all: ["optimization"] as const,
  canOptimize: (videoId: string) => ["optimization", "can-optimize", videoId] as const,
  videoRecommendations: (videoId: string) => ["optimization", "recommendations", videoId] as const,
  channelRecommendations: (channelId: string) => ["optimization", "channel-recommendations", channelId] as const,
};
export function useCanOptimize(videoId: string) {
  return useQuery({ queryKey: optimizationQueryKeys.canOptimize(videoId), queryFn: () => checkDemoVideo(videoId), enabled: !!videoId });
}
export function useGenerateVideoRecommendations() {
  return useMutation({ mutationFn: generateDemoRecommendations });
}
export function useGenerateChannelRecommendations() {
  return useMutation({ mutationFn: async (_channelId: string) => ({ recommendations_generated: getDemoVideos().length * 3 }) });
}
export function useChannelRecommendations(channelId: string, filters?: { lifecycle_stage?: string; status?: string; limit?: number }) {
  return useQuery({ queryKey: [...optimizationQueryKeys.channelRecommendations(channelId), filters], queryFn: () => getDemoChannelRecommendations(channelId, filters), enabled: !!channelId });
}
export function useApplyRecommendations() {
  const client = useQueryClient();
  return useMutation({ mutationFn: applyDemoRecommendations, onSuccess: () => {
    client.invalidateQueries({ queryKey: ["dashboard", "videos"] });
    client.invalidateQueries({ queryKey: optimizationQueryKeys.all });
  } });
}
