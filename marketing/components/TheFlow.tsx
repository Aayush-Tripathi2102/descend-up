"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "ANALYZE",
    desc: "We deep-scan your entire library using our proprietary LLMs to identify revenue leaks and dormant viral potential.",
    bg: "bg-white",
    titleColor: "text-black",
    textColor: "text-[#E5EEFF]",
    label: "STEP 1",
    icon: "/flow1.svg",
    padding: "pt-0",
  },
  {
    num: "02",
    title: "OPTIMIZE",
    desc: "Apply AI-engineered titles, thumbnails, and SEO tags designed to trigger the algorithm’s  recommendation engine.",
    bg: "bg-[#FFD700]",
    titleColor: "text-black",
    textColor: "text-[#E5C100]",
    label: "STEP 2",
    icon: "/flow2.svg",
    padding: "pt-10 md:pt-20",
  },
  {
    num: "03",
    title: "SCALE",
    desc: "Watch your views and RPM climb. We provide real-time updates to keep the momentum going forever.",
    bg: "bg-[#FF0000]",
    titleColor: "text-white",
    textColor: "text-[#DE0000]",
    label: "STEP 3",
    iconBg: "bg-white",
    icon: "/flow3.svg",
    padding: "pt-10 md:pt-40",
  },
];

export default function TheFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="the-flow"
      style={{ background: "#0040FF" }}
      className="py-8 px-4 lg:py-16 lg:px-10 font-sans relative"
    >
      <h1 className="text-center font-title tracking-wider text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-10 md:mb-16">
        THE FLOW
      </h1>

      <div className="hidden md:block absolute h-2 bg-black w-full top-136.75 left-0" />

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 mx-auto"
      >
        {steps.map((step) => (
          <div key={step.num} className={`px-2 md:px-5 ${step.padding}`}>
            <div
              className={`${step.bg} border-4 md:border-5 border-black p-5 md:p-7 relative w-full md:w-98 h-auto md:h-90 flex flex-col overflow-hidden`}
              style={{ boxShadow: "6px 6px 0 rgba(0,0,0)" }}
            >
              <div
                className={`absolute top-0 -right-1 text-[48px] md:text-[78.54px] ${step.textColor} font-extrabold`}
              >
                {step.num}
              </div>

              <Image src={step.icon} alt={step.title} width={36} height={36} />

              <h3
                className={`${step.titleColor} my-2 text-[32px] md:text-[61.33px] font-bold`}
              >
                {step.title}
              </h3>

              <p
                className={`${step.titleColor} text-[14px] md:text-[19.7px] leading-relaxed font-bold`}
              >
                {step.desc}
              </p>
            </div>

            <div className="text-white text-[40px] md:text-[78.54px] font-bold tracking-wide mt-2 md:mt-0">
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
