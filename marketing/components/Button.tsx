"use client";

import { motion } from "framer-motion";
import React from "react";

type AnimatedButtonProps = {
  text: string;
  color?: string;
  textStyle?: string;
  disabled?: boolean;
  px?: number;
  py?: number;
  shadowColor?: string;
  onClick?: () => void;
};

export default function AnimatedButton({
  text,
  color = "#FF1F1F",
  textStyle = "",
  px = 4,
  py = 2,
  shadowColor = "black",
  onClick,
  disabled = false,
}: AnimatedButtonProps) {
  return (
    <div className="relative inline-block">
      {/* Shadow (Fixed) */}
      {text === "CONTACT US" ? (
        <div
          className="absolute inset-0 translate-x-2 translate-y-2"
          style={{ border: "3px solid black", background: "grey" }}
        />
      ) : (
        <div
          className="absolute inset-0 translate-x-1 translate-y-1"
          style={{ border: "3px solid black", background: "black" }}
        />
      )}

      {/* Animated Button */}
      <motion.button
        whileHover={{
          x: -2,
          y: -2,
        }}
        whileTap={{
          x: 2,
          y: 2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
        }}
        onClick={onClick}
        disabled={disabled}
        className={`relative font-extrabold uppercase tracking-wide border-[3px] border-black ${textStyle}`}
        style={{
          backgroundColor: color,
          paddingLeft: `${px * 0.25}rem`,
          paddingRight: `${px * 0.25}rem`,
          paddingTop: `${py * 0.25}rem`,
          paddingBottom: `${py * 0.25}rem`,
        }}
      >
        {text.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.button>
    </div>
  );
}
