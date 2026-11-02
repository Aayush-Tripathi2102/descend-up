"use client";

import React from "react";
import Button from "@/components/Button";
import { consoleUrl } from "@/lib/demo";
import { IoStar } from "react-icons/io5";
import { BsGraphUpArrow, BsLightningChargeFill } from "react-icons/bs";
import { ChartNoAxesColumnIncreasing, Crosshair } from "lucide-react";
import { FaCheck, FaLock, FaSearch } from "react-icons/fa";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Main Hero Section */}
      <div className="border-4 border-black p-8 md:p-12 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <div>
            {/* Pro Access Badge */}
            <div className="inline-block bg-black text-white px-6 py-2 border-4 border-black mb-8">
              <div className="flex items-center gap-2">
                <IoStar size={18} />

                <span className="font-semibold uppercase text-sm font-sans">
                  Pro Access
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-6xl font-bold uppercase font-title mb-2">
              Unlock Your
              <br />
              Next Level<span className="text-[#DE0000]">.</span>
            </h1>

            {/* Description */}
            <p className="text-lg font-semibold mb-12 max-w-md">
              Get advanced tools, AI-powered insights, and data that helps you
              grow faster and smarter.
            </p>

            {/* Feature Pills */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BsLightningChargeFill size={20} />
                <div>
                  <div className="font-black text-sm">Built for Creators</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ChartNoAxesColumnIncreasing size={20} />
                <div>
                  <div className="font-black text-sm">
                    Data that Drives Growth
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaLock size={20} />
                <div>
                  <div className="font-black text-sm">
                    Cancel Anytime, No Commitment
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Pricing Card */}
          <div className="border-4 border-black">
            {/* Yellow Header */}
            <div className="bg-[#F7D400] border-b-4 border-black p-4">
              <div className="font-black uppercase text-lg">Pro Plan</div>
            </div>

            {/* White Content */}
            <div className="bg-white p-8">
              {/* Price */}
              <div className="mb-8">
                <div className="text-6xl font-black">$20</div>
                <div className="text-lg font-semibold text-gray-700">
                  / MONTH
                </div>
              </div>

              {/* Divider */}
              <div className="border-b-2 border-gray-300 mb-6"></div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <FeatureItem text="Unlimited Channel Analysis" />
                <FeatureItem text="AI SEO Intelligence" />
                <FeatureItem text="Viral Potential Scoring" />
                <FeatureItem text="Growth Opportunity Detection" />
                <FeatureItem text="Priority Feature Access" />
              </div>

              {/* Button */}
              <Button
                text="UPGRADE TO PRO"
                color="black"
                textStyle="text-white w-full justify-center"
                onClick={() => {
                  window.location.href = consoleUrl();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Section */}
      <div className="p-8 md:p-12 border-t-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI SEO Insights */}
          <div className="border-4 border-black flex overflow-hidden">
            <div className="bg-[#0052FF] w-20 flex items-center justify-center shrink-0">
              <BsGraphUpArrow size={28} color="#fff" />
            </div>
            <div className="p-6 flex-1">
              <h3 className="font-black text-xl uppercase mb-3">
                AI SEO Insights
              </h3>
              <p className="text-sm font-semibold">
                Get AI-powered SEO insights to rank higher and grow faster.
              </p>
            </div>
          </div>

          {/* Channel Audits */}
          <div className="border-4 border-black flex overflow-hidden">
            <div className="bg-[#00FF00] w-20 flex items-center justify-center shrink-0">
              <FaSearch size={28} color="#000" />
            </div>
            <div className="p-6 flex-1">
              <h3 className="font-black text-xl uppercase mb-3">
                Channel Audits
              </h3>
              <p className="text-sm font-semibold">
                Deep-dive audits that uncover what&apos;s holding your channel back.
              </p>
            </div>
          </div>

          {/* Virality Prediction */}
          <div className="border-4 border-black flex overflow-hidden">
            <div className="bg-[#F7D400] w-20 flex items-center justify-center shrink-0">
              <Crosshair size={28} color="#000" />
            </div>
            <div className="p-6 flex-1">
              <h3 className="font-black text-xl uppercase mb-3">
                Virality Prediction
              </h3>
              <p className="text-sm font-semibold">
                Predict viral potential and create content that performs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-5 h-5 border-2 border-black bg-black flex items-center justify-center">
        <FaCheck size={10} color="#fff" />
      </div>
      <span className="font-semibold text-sm">{text}</span>
    </div>
  );
}
