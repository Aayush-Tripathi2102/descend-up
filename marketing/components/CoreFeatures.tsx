"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function CoreFeatures() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="core-features"
      className="bg-white py-10 md:py-16 px-5 md:px-10 border-b-2 border-black font-sans"
    >
      <div>
        {/* Heading */}
        <h1 className="font-title font-bold text-[34px] md:text-[62.54px] text-black tracking-tight">
          CORE FEATURES
        </h1>

        <p className="text-[16px] md:text-[24px] text-black mb-8 md:mb-10">
          DescendUp provides everything you need to
          <br /> dominate the YouTube algorithm.
        </p>

        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
          {/* LEFT CARD */}
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{
              height: hovered ? 490 : 400,
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-[#FFD700] border-[5px] border-black px-6 md:px-12 pt-10 md:pt-12 cursor-pointer relative overflow-hidden flex-1"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-6 md:top-12 right-4 md:right-6 border-[2px] border-black px-3 md:px-4 py-1 md:py-2 text-[12px] md:text-[15.5px] font-bold bg-[#E5C100]"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              OPTIMIZATION ON
            </motion.div>

            {/* Icon */}
            <div className="w-10 md:w-12 h-10 md:h-12 mb-6 md:mb-8 flex items-center justify-center">
              <Image src="/seo.svg" alt="AI SEO SUITE" width={58} height={58} />
            </div>

            {/* Title */}
            <h3 className="text-black mb-2 text-[26px] md:text-[40.26px] font-bold">
              AI SEO SUITE
            </h3>

            {/* Description */}
            <p className="text-[15px] md:text-[20.29px] font-medium leading-relaxed text-black">
              Advanced metadata generation that bypasses the noise and puts your
              content directly in front of your ideal audience.
            </p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-8 flex flex-wrap gap-3 md:gap-4"
            >
              {[
                "#PASSIVEINCOME",
                "#FASTGROWTH",
                "#AI-AUTOMATION",
                "#SCALING",
              ].map((tag) => (
                <div
                  key={tag}
                  className="border-2 border-black w-24 md:w-28 h-7 text-[10px] md:text-[11px] font-bold"
                >
                  <div className="h-full w-full border-2 border-r-[#E5C100] border-b-[#E5C100] border-t-[#B89B00] border-l-[#B89B00] flex items-center justify-center">
                    {tag}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-6 md:mt-8 flex gap-3 md:gap-4 items-center md:pl-16"
            >
              <div className="border-2 border-black w-24 md:w-28 h-7 flex items-center justify-center text-[10px] md:text-[11px] font-bold">
                <div className="h-full w-full border-2 border-r-[#E5C100] border-b-[#E5C100] border-t-[#B89B00] border-l-[#B89B00] flex items-center justify-center">
                  #ZEROMILLION
                </div>
              </div>
              <p className="text-[14px] md:text-[18px] font-bold">
                Generating tags...
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT CARD */}
          <div
            className="bg-[#FF0000] border-5 border-black px-6 md:px-12 pt-10 md:pt-12 pb-10 md:pb-18 flex-1"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <div className="w-10 md:w-12 h-10 md:h-12 mb-6 md:mb-8 flex items-center justify-center">
              <Image
                src="/audience.svg"
                alt="AUDIENCE IQ"
                width={58}
                height={58}
              />
            </div>

            <h3 className="text-white mb-2 text-[26px] md:text-[40.26px] font-bold">
              AUDIENCE IQ
            </h3>

            <p className="text-[15px] md:text-[20.29px] font-medium leading-relaxed text-white">
              Semantic intelligence that understands the &quot;why&quot; behind every
              click. Identify intent triggers before you film.
            </p>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* CARD 1 */}
          <div
            className="bg-white border-5 border-black px-6 md:px-12 pt-10 md:pt-12 pb-10 md:pb-18"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <Image src="/thumbnail.svg" alt="" width={50} height={50} />
            <h3 className="text-black mb-2 text-[24px] md:text-[30px] font-bold">
              THUMBNAIL AI
            </h3>
            <p className="text-[15px] md:text-[17.55px] text-black font-medium">
              Rapid testing for high-CTR visuals. Predictive scoring based on
              500M+ data points.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="bg-[#00FF66] border-5 border-black px-6 md:px-12 pt-10 md:pt-12 pb-10 md:pb-18"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <Image src="/money.svg" alt="" width={50} height={50} />
            <h3 className="text-white mb-2 text-[24px] md:text-[30px] font-bold">
              REVENUE HUB
            </h3>
            <p className="text-[15px] md:text-[17.55px] text-black font-medium">
              RPM maximizing technology. Focus on high value advertiser segments
              to double your payout per view.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="bg-black border-5 border-black px-6 md:px-12 pt-10 md:pt-12 pb-10 md:pb-18 relative"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <div className="absolute top-3 right-3 bg-[#E5C100] text-black text-[10px] font-bold px-2 py-0.5 border border-black">
              EXCLUSIVE FEATURE
            </div>

            <Image src="/viral.svg" alt="" width={50} height={50} />

            <h3 className="text-white mb-2 text-[24px] md:text-[30px] font-bold">
              PREDICTIVE VIRALITY
            </h3>

            <p className="text-[15px] md:text-[17.55px] text-white font-medium">
              The holy grail. Algorithm forecasting that tells you exactly when
              a topic is about to explode.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
