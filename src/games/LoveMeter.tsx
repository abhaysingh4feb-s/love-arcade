"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const loveMessages = [
  { level: 10, text: "A little bit" },
  { level: 20, text: "Getting warmer..." },
  { level: 30, text: "Definitely something" },
  { level: 40, text: "More than friends" },
  { level: 50, text: "Really into you" },
  { level: 60, text: "Can't stop thinking about you" },
  { level: 70, text: "Head over heels" },
  { level: 80, text: "Deeply, madly" },
  { level: 90, text: "More than words can say" },
  { level: 100, text: "To infinity and beyond 💎" },
];

export default function LoveMeter({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [level, setLevel] = useState(0);
  const [filling, setFilling] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const target = 20; // taps to fill

  const currentMessage =
    loveMessages.find((m) => m.level >= level) || loveMessages[loveMessages.length - 1];

  const handleTap = () => {
    if (completed) return;

    setTapCount((t) => {
      const newTap = t + 1;
      const newLevel = Math.min(Math.round((newTap / target) * 100), 100);
      setLevel(newLevel);

      if (newLevel >= 100 && !completed) {
        setCompleted(true);
        setFilling(false);
        setTimeout(onComplete, 2000);
      }

      return newTap;
    });

    setFilling(true);
    setTimeout(() => setFilling(false), 200);
  };

  return (
    <div className="max-w-sm mx-auto text-center">
      <div className="mb-6">
        <p className="text-white/40 text-sm">
          Tap the heart to fill the love meter
        </p>
      </div>

      {/* Love meter visual */}
      <div className="relative w-48 mx-auto mb-8">
        {/* Meter background */}
        <div
          className="relative w-full rounded-full overflow-hidden"
          style={{
            height: "280px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Fill */}
          <motion.div
            animate={{ height: `${level}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute bottom-0 left-0 right-0 rounded-b-full"
            style={{
              background: `linear-gradient(to top, #E6A57E, #F472B6 ${Math.min(level + 20, 100)}%, #FB7185)`,
              boxShadow:
                level > 50
                  ? `0 0 ${level * 0.5}px rgba(244, 114, 182, ${level * 0.005})`
                  : "none",
            }}
          />

          {/* Level markers */}
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 border-t border-white/5"
              style={{ bottom: `${mark}%` }}
            />
          ))}

          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{ scale: filling ? 1.2 : 1 }}
              className="text-3xl font-bold text-white drop-shadow-lg"
            >
              {level}%
            </motion.span>
          </div>
        </div>
      </div>

      {/* Current message */}
      <motion.div
        key={currentMessage.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="font-[family-name:var(--font-heading)] text-xl text-white/70 italic">
          &ldquo;{currentMessage.text}&rdquo;
        </p>
      </motion.div>

      {/* Tap button */}
      {!completed ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={handleTap}
          animate={filling ? { rotate: [0, -5, 5, 0] } : {}}
          className="text-6xl md:text-7xl cursor-pointer select-none drop-shadow-lg"
        >
          ❤️
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <p className="text-2xl mb-2">❤️‍🔥</p>
          <p className="text-blush-pink font-semibold">OVERFLOW!</p>
          <p className="text-white/40 text-sm mt-1">
            The meter can&apos;t contain it.
          </p>
        </motion.div>
      )}

      <p className="text-white/20 text-xs mt-6">
        {completed ? "" : `${tapCount}/${target} taps`}
      </p>
    </div>
  );
}
