"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";
import Button from "./Button";
import { consoleUrl } from "@/lib/demo";

export default function FoundingCreator() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="early-access-program"
      className="bg-[#FFE768] border-t-6 border-black font-sans pb-10"
    >
      <div ref={ref}>
        {/* HEADER */}
        <div className="px-5 md:px-10 pt-8 md:pt-10">
          <div className="inline-block bg-black text-white text-[10px] md:text-xs font-extrabold tracking-widest uppercase px-3 py-1 mb-2">
            Limited Early Access
          </div>

          <h1 className="font-title font-extrabold text-black text-[35px] md:text-[96px] leading-[1.1] mb-4 md:mb-6">
            BECOME A<br />
            FOUNDING
            <br />
            CREATOR
          </h1>

          <p className="text-[16px] md:text-[24px] font-medium text-[#444546]">
            Skip the waitlist. Get priority access to DescendUp&apos;s{" "}
            <br className="hidden md:block" />
            AI engine before the public launch
          </p>
        </div>

        {/* MAIN CARD */}
        <div
          className="bg-white border-4 border-black m-4 md:m-6 p-5 md:p-8 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12"
          style={{ boxShadow: "6px 6px 0 #000" }}
        >
          {/* PERKS */}
          <div className="w-full md:w-2/5">
            <ul className="mb-5 space-y-3">
              {[
                "Zero commissions on revenue",
                "No setup or hidden fees",
                "Priority feature access",
              ].map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-[16px] md:text-[20px] font-bold"
                >
                  <Image
                    src="/tick.svg"
                    alt="Checkmark"
                    width={24}
                    height={24}
                  />
                  {perk}
                </li>
              ))}
            </ul>

            <p className="text-[14px] md:text-[18px] text-[#444546] border-l-4 border-black pl-4 leading-relaxed font-medium">
              We are opening our doors to a select group of creators to
              stress-test our infrastructure. In exchange for your feedback, you
              get full access to the suite for free.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
            <div className="bg-[#FFEA004D] text-[#713F12] text-[12px] md:text-[14px] font-bold tracking-widest uppercase px-3 py-1 border border-[#EAB308] rounded-xs">
              FREE DURING PILOT
            </div>
            <div className="hidden md:block">
              <Button
                text="CLAIM EARLY ACCESS"
                color="red"
                px={30}
                py={5}
                onClick={() => {
                  window.open(
                    consoleUrl(),
                    "_blank",
                  );
                }}
                textStyle="text-[14px] sm:text-[18px] md:text-[30px] text-white font-bold"
              />
            </div>
            <div className="md:hidden block">
              <Button
                text={`CLAIM EARLY ACCESS`}
                color="#ff0000"
                textStyle="text-white text-xl"
                px={8}
                py={4}
                onClick={() => {
                  window.open(
                    consoleUrl(),
                    "_blank",
                  );
                }}
              />
            </div>

            <div className="w-full flex flex-col items-start md:items-center justify-center py-4 md:py-8 gap-3">
              <p className="text-[12px] md:text-[14px] text-[#6B7280] font-bold uppercase text-left md:text-center">
                Selection based on channel eligibility
              </p>

              <div className="text-[11px] md:text-xs bg-[#DCFCE7] flex items-center justify-center gap-1 border border-[#86EFAC] px-2 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <p className="font-bold text-[#166534]">
                  Eligibility: 5K+ Subs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
