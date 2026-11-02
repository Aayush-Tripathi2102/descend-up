"use client";

import { useState } from "react";
import { demoUser } from "@/lib/demo";
import { useGetChannelVideos } from "@/hooks/dashboard/videos";
import {
  useCanOptimize,
  useGenerateVideoRecommendations,
  useChannelRecommendations,
  useApplyRecommendations,
} from "@/hooks/dashboard/optimization";
import type {
  TChannelRecommendation,
  TApplyRecommendationsResponse,
  TRecommendationStrategy,
} from "@/hooks/dashboard/types";

export default function OptimizationPage() {
  const { data: videos, isLoading, error } = useGetChannelVideos();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [applyResult, setApplyResult] =
    useState<TApplyRecommendationsResponse | null>(null);

  // Get can-optimize status for selected video
  const {
    data: optimizeStatus,
    isLoading: isCheckingOptimize,
    error: optimizeError,
  } = useCanOptimize(selectedVideo || "");

  // Generate video recommendations mutation
  const {
    mutate: generateVideoRecs,
    mutateAsync: generateVideoRecsAsync,
    isPending: isGeneratingVideoRecs,
    error: videoRecsError,
    data: videoRecsData,
  } = useGenerateVideoRecommendations();

  // Get channel recommendations query
  const channelId = demoUser.youtubeChannelId;
  const { data: channelRecommendations, isLoading: isLoadingChannelRecs } =
    useChannelRecommendations(channelId);

  const {
    mutate: applyRecommendations,
    mutateAsync: applyRecommendationsAsync,
    isPending: isApplying,
    error: applyError,
  } = useApplyRecommendations();

  const activeStrategies: TRecommendationStrategy[] =
    videoRecsData?.video_id === selectedVideo && videoRecsData?.strategies?.length
      ? videoRecsData.strategies
      : (optimizeStatus?.strategies ?? []);

  const handleApplyAll = () => {
    if (!selectedVideo || !activeStrategies.length) return;

    const confirmed = window.confirm(
      `Simulate applying ${activeStrategies.length} recommendations?\n\nOnly the sample video in this browser will change. Nothing is sent to YouTube.`,
    );

    if (!confirmed) return;

    setApplyResult(null);
    applyRecommendations(
      { videoId: selectedVideo, strategies: activeStrategies },
      {
        onSuccess: (data) => setApplyResult(data),
      },
    );
  };

  if (isLoading) {
    return <div>Loading videos…</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Unable to load videos. Please refresh the page.
      </div>
    );
  }

  const handleOptimizeClick = (videoId: string) => {
    setSelectedVideo(videoId);
    setShowRecommendations(false);
    setApplyResult(null);
  };

  const handleGenerateRecommendations = (videoId: string) => {
    generateVideoRecs(videoId, {
      onSuccess: (data) => {
        setShowRecommendations(Boolean(data?.strategies?.length));
      },
    });
  };

  const handleGenerateAndApply = async (videoId: string) => {
    const confirmed = window.confirm(
      "Generate and apply demo recommendations?\n\nThis only updates fictional sample data in your browser. No YouTube account is connected.",
    );

    if (!confirmed) return;

    setSelectedVideo(videoId);
    setShowRecommendations(false);
    setApplyResult(null);

    const recommendations = await generateVideoRecsAsync(videoId);
    const strategies = recommendations.strategies ?? [];
    setShowRecommendations(Boolean(strategies.length));

    if (!strategies.length) {
      setApplyResult({
        success: true,
        videoId,
        message: "No generated recommendations were returned for this video.",
        applied: [],
        skipped: [],
        changes: {
          title: { before: "", after: "" },
          description: { before: "", after: "" },
          tags: { before: [], after: [] },
        },
      });
      return;
    }

    const result = await applyRecommendationsAsync({ videoId, strategies });
    setApplyResult(result);
  };

  return (
    <div className="space-y-6">
      <section className="py-4">
        <h1 className="text-2xl font-bold">Optimization</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Analyze and optimize your videos for better performance. Select any
          video to check optimization potential and generate recommendations. Demo mode: all results and updates are simulated locally.
        </p>
      </section>

      {/* Selected video details and recommendations */}
      {selectedVideo && (
        <section className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Video Analysis</h2>

          {isCheckingOptimize ? (
            <div>Checking optimization potential…</div>
          ) : optimizeError ? (
            <div className="text-red-600">Error: {optimizeError.message}</div>
          ) : optimizeStatus ? (
            <div className="space-y-4">
              {/* Optimization Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Can Optimize</p>
                  <p className="text-lg font-semibold">
                    {optimizeStatus.can_optimize ? "Yes" : "No"}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">
                    Headroom Score
                  </p>
                  <p className="text-lg font-semibold">
                    {optimizeStatus.headroom_score}%
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">
                    Analysis Exists
                  </p>
                  <p className="text-lg font-semibold">
                    {optimizeStatus.exists ? "Yes" : "No"}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Stored</p>
                  <p className="text-lg font-semibold">
                    {optimizeStatus.stored ? "Yes" : "No"}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Gaps Found</p>
                  <p className="text-lg font-semibold">
                    {optimizeStatus.gaps_found}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Lifecycle</p>
                  <p className="text-lg font-semibold">
                    {optimizeStatus.lifecycle_stage ?? "—"}
                  </p>
                </div>
              </div>

              {/* Reason */}
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground mb-1">Details</p>
                <p className="text-sm">{optimizeStatus.reason}</p>
              </div>

              {optimizeStatus.strategies?.length ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">
                    Suggested Strategies
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {optimizeStatus.strategies.map((strategy, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-green-200 bg-green-50 p-3"
                      >
                        <p className="font-semibold text-green-900">
                          {strategy.template_name}
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          {strategy.action}
                        </p>
                        <p className="text-xs text-green-600 mt-2">
                          Est. Impact:{" "}
                          {strategy.estimated_impact ??
                            strategy.estimated_impact_indicative ??
                            0}
                          %
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Generate Recommendations Button */}
              {optimizeStatus.can_optimize && (
                <button
                  onClick={() => handleGenerateRecommendations(selectedVideo)}
                  disabled={isGeneratingVideoRecs}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  {isGeneratingVideoRecs
                    ? "Generating Recommendations..."
                    : "Generate Recommendations"}
                </button>
              )}
            </div>
          ) : null}

          {/* Video Recommendations */}
          {(showRecommendations && videoRecsData) ||
          activeStrategies.length > 0 ? (
            <div className="mt-6 border-t pt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold">Recommendations</h3>
                {activeStrategies.length > 0 && (
                  <button
                    onClick={handleApplyAll}
                    disabled={isApplying || !selectedVideo}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    {isApplying ? "Applying demo updates…" : "Apply All (Demo)"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeStrategies.map((strategy, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-green-200 bg-green-50 p-3"
                  >
                    <p className="font-semibold text-green-900">
                      {strategy.template_name}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {strategy.action}
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      Est. Impact:{" "}
                      {strategy.estimated_impact ??
                        strategy.estimated_impact_indicative ??
                        0}
                      %
                    </p>
                  </div>
                ))}
              </div>

              {videoRecsError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {videoRecsError.message}
                </div>
              )}

              {applyError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {applyError.message}
                </div>
              )}

              {applyResult && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-3 text-sm">
                  <p className="font-semibold text-blue-900">
                    {applyResult.message}
                  </p>

                  {applyResult.applied.length > 0 && (
                    <div>
                      <p className="font-medium text-blue-800 mb-2">Applied:</p>
                      <ul className="space-y-1 text-blue-700">
                        {applyResult.applied.map((change, idx) => (
                          <li key={idx}>
                            {change.feature}: {String(change.before)} →{" "}
                            {String(change.after)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {applyResult.skipped.length > 0 && (
                    <div>
                      <p className="font-medium text-blue-800 mb-2">Skipped:</p>
                      <ul className="space-y-1 text-blue-700">
                        {applyResult.skipped.map((item, idx) => (
                          <li key={idx}>
                            {item.template_name}: {item.reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(applyResult.changes.title.before !==
                    applyResult.changes.title.after ||
                    applyResult.changes.description.before !==
                      applyResult.changes.description.after ||
                    applyResult.changes.tags.before.join(",") !==
                      applyResult.changes.tags.after.join(",")) && (
                    <div className="space-y-2 pt-2 border-t border-blue-200">
                      {applyResult.changes.title.before !==
                        applyResult.changes.title.after && (
                        <div>
                          <p className="font-medium text-blue-800">Title</p>
                          <p className="text-xs text-blue-600 line-through">
                            {applyResult.changes.title.before}
                          </p>
                          <p className="text-xs text-blue-900">
                            {applyResult.changes.title.after}
                          </p>
                        </div>
                      )}
                      {applyResult.changes.description.before !==
                        applyResult.changes.description.after && (
                        <div>
                          <p className="font-medium text-blue-800">
                            Description
                          </p>
                          <p className="text-xs text-blue-600 line-through whitespace-pre-wrap max-h-24 overflow-y-auto">
                            {applyResult.changes.description.before}
                          </p>
                          <p className="text-xs text-blue-900 whitespace-pre-wrap max-h-24 overflow-y-auto">
                            {applyResult.changes.description.after}
                          </p>
                        </div>
                      )}
                      {applyResult.changes.tags.before.join(",") !==
                        applyResult.changes.tags.after.join(",") && (
                        <div>
                          <p className="font-medium text-blue-800">Tags</p>
                          <p className="text-xs text-blue-600 line-through">
                            {applyResult.changes.tags.before.join(", ") ||
                              "(none)"}
                          </p>
                          <p className="text-xs text-blue-900">
                            {applyResult.changes.tags.after.join(", ") ||
                              "(none)"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </section>
      )}

      {/* Videos List */}
      <section>
        {videos?.length ? (
          <div className="space-y-3">
            {videos.map((video) => (
              <article
                key={video.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex min-w-0 w-full items-center gap-4 flex-1">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-16 w-28 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-28 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                      No thumbnail
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => handleOptimizeClick(video.id)}
                      className="block w-full text-left text-sm font-semibold text-foreground hover:text-primary truncate"
                    >
                      {video.title}
                    </button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => handleOptimizeClick(video.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                      selectedVideo === video.id
                        ? "bg-primary text-white"
                        : "border border-border bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {selectedVideo === video.id ? "Selected" : "Analyze"}
                  </button>

                  <button
                    onClick={() => handleGenerateAndApply(video.id)}
                    disabled={isGeneratingVideoRecs || isApplying}
                    className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {selectedVideo === video.id &&
                    (isGeneratingVideoRecs || isApplying)
                      ? isApplying
                        ? "Applying…"
                        : "Generating…"
                      : "Generate & Apply"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
            No videos found for your channel yet.
          </div>
        )}
      </section>

      {/* Channel Recommendations List */}
      {channelRecommendations && channelRecommendations.total > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Channel Recommendations ({channelRecommendations.total})
          </h2>

          <div className="space-y-3">
            {channelRecommendations.recommendations.map(
              (rec: TChannelRecommendation, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div
                    className="cursor-pointer flex items-center justify-between"
                    onClick={() =>
                      setExpandedVideo(
                        expandedVideo === rec.yt_video_id
                          ? null
                          : rec.yt_video_id,
                      )
                    }
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{rec.video_title}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-2 py-1">
                          {rec.lifecycle_stage}
                        </span>
                        <span>{rec.strategies.length} strategies</span>
                      </div>
                    </div>
                    <div>{expandedVideo === rec.yt_video_id ? "▼" : "▶"}</div>
                  </div>

                  {expandedVideo === rec.yt_video_id && (
                    <div className="mt-4 space-y-2 border-t pt-4">
                      {rec.strategies.map((strategy, sidx) => (
                        <div key={sidx} className="text-xs">
                          <p className="font-semibold">
                            {strategy.template_name}
                          </p>
                          <p className="text-muted-foreground">
                            {strategy.action}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {isLoadingChannelRecs && <div>Loading channel recommendations…</div>}
    </div>
  );
}
