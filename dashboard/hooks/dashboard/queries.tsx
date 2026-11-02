import { useQuery } from "@tanstack/react-query";
import { demoStats } from "@/lib/demo";

export const dashboardQueryKeys = { all: ["dashboard"] as const, stats: () => ["dashboard", "stats"] as const };
export function useGetDashboardStats() {
  return useQuery({ queryKey: dashboardQueryKeys.stats(), queryFn: async () => demoStats });
}
