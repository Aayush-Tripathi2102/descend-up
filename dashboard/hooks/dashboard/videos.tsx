import { useQuery } from "@tanstack/react-query";
import { getDemoVideos } from "@/lib/demo";

export type TChannelVideo = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  publishedAt: string;
};

const getChannelVideos = async (): Promise<TChannelVideo[]> => {
  return getDemoVideos();
};

export function useGetChannelVideos() {
  return useQuery<TChannelVideo[]>({
    queryKey: ["dashboard", "videos"],
    queryFn: getChannelVideos,
  });
}
