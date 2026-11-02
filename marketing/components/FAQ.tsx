"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import AnimatedButton from "./Button";
import { toast } from "sonner";

const faqs = [
  {
    q: "What exactly does DescendUp do?",
    a: "DescendUp is an AI-powered SEO and content intelligence platform for YouTube creators. It deep-scans your channel, identifies revenue leaks and viral opportunities, and generates optimized metadata to help your content reach the right audience at the right time.",
  },
  {
    q: "How to setup?",
    a: "Setup takes under 5 minutes. Connect your YouTube channel via OAuth, and DescendUp immediately begins scanning your library. No plugins, no Chrome extensions — everything runs in the cloud.",
  },
  {
    q: "How can you check your potential?",
    a: "Our AI generates a channel potential score based on your existing content, audience engagement patterns, niche competitiveness, and RPM data. You'll see exactly where you're leaving views and money on the table.",
  },
  {
    q: "Do you change or control my content?",
    a: "Never. DescendUp is a read-and-recommend tool. We analyze your data and provide suggestions, but every decision — what to publish, change, or optimize — is entirely yours. You always remain in full control.",
  },
  {
    q: "How do you make money?",
    a: "During the founding creator pilot, the platform is completely free. Post-launch, we operate on a performance-based pricing model — meaning you only pay when our recommendations generate measurable results for your channel.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [copying, setCopying] = useState(false);

  const handleCopyEmail = async () => {
    const email = "descendupmarketing@gmail.com";

    try {
      await navigator.clipboard.writeText(email);

      toast.custom((t) => (
        <div
          className="bg-[#fffcc7] text-black font-extrabold uppercase tracking-widest px-12 py-4 border-4 border-black shadow-[6px_6px_0px_#000] cursor-pointer"
          onClick={() => toast.dismiss(t)}
        >
          EMAIL COPIED
        </div>
      ));
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };
  return (
    <section
      id="faq"
      className="py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-black font-sans"
    >
      <div className="w-full flex flex-col lg:flex-row items-start justify-between mx-auto gap-10 lg:gap-20">
        {/* Left */}
        <div className="w-full lg:w-1/2">
          <div className="inline-block bg-[#F0B100] text-black text-sm sm:text-base font-bold tracking-widest uppercase px-3 py-1 mb-5">
            FAQ
          </div>

          <h2 className="text-white mb-4 text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight">
            Everything you need <br /> to know before you <br /> scale
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A1A1A1] leading-relaxed mb-10 lg:mb-12">
            Growing on YouTube isn&apos;t luck. It&apos;s about understanding intent,
            metadata precision, and algorithm timing. Here are the answers to
            the most common questions about how DescendUp helps creators grow
            smarter, faster, and more predictably.
          </p>

          <AnimatedButton
            text="CONTACT US"
            color="white"
            textStyle="text-sm sm:text-base lg:text-[16px] text-black font-bold tracking-widest uppercase"
            px={8}
            py={3}
            shadowColor="#ff0000"
            onClick={handleCopyEmail}
          />
        </div>

        {/* Right (FAQ) - NOW bottom on mobile */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 border border-[#3A3A3A] cursor-pointer ${
                  open === i ? "bg-[#F0B100]" : "bg-transparent"
                }`}
                style={{ boxShadow: "6px 6px 0 #3a3a3a" }}
              >
                <div className="flex items-center gap-3">
                  <p className="h-6 w-6 flex items-center justify-center bg-black border border-white text-xs font-bold text-white rounded-full">
                    {i + 1}
                  </p>

                  <span
                    className={`text-base lg:text-xl font-bold transition-colors duration-300 ${
                      open === i ? "text-black" : "text-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>

                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{ opacity: open === i ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    <FiPlus size={24} color={open === i ? "#000" : "#fff"} />
                  </motion.div>

                  <motion.div
                    animate={{ opacity: open === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    <FiMinus size={20} color={open === i ? "#000" : "#fff"} />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                    className="mt-4 border border-white"
                  >
                    <p className="p-4 text-sm lg:text-lg text-[#E5E5E5] leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
