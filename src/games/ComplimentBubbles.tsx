"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Bubble {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  popped: boolean;
}

const compliments = [
  "You make everything better",
  "Your smile is my favorite view",
  "You're the kindest person I know",
  "I admire your strength",
  "You make me want to be better",
  "Your laugh heals everything",
  "You're my safe place",
  "I love how you love",
  "You're beautiful inside and out",
  "My world is brighter because of you",
  "You are enough, always",
  "I'm proud of who you are",
];

export default function ComplimentBubbles({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [popped, setPopped] = useState(0);
  const [revealed, setRevealed] = useState<string | null>(null);
  const target = 8;

  useEffect(() => {
    const selected = compliments
      .sort(() => Math.random() - 0.5)
      .slice(0, target);

    const newBubbles: Bubble[] = selected.map((text, i) => ({
      id: i,
      text,
      x: 10 + (i % 4) * 22 + Math.random() * 8,
      y: 10 + Math.floor(i / 4) * 35 + Math.random() * 10,
      size: 70 + Math.random() * 20,
      popped: false,
    }));
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    if (popped === target && target > 0) {
      setTimeout(onComplete, 1500);
    }
  }, [popped, onComplete]);

  const popBubble = (id: number) => {
    const bubble = bubbles.find((b) => b.id === id);
    if (!bubble || bubble.popped) return;

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setRevealed(bubble.text);
    setPopped((p) => p + 1);

    setTimeout(() => setRevealed(null), 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-4">
        <p className="text-white/40 text-sm">
          Pop the bubbles to reveal what I think of you — {popped}/{target}
        </p>
        <div className="progress-track mt-3 max-w-xs mx-auto">
          <div
            className="progress-fill"
            style={{ width: `${(popped / target) * 100}%` }}
          />
        </div>
      </div>

      {/* Revealed compliment */}
      <div className="h-16 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          {revealed && (
            <motion.p
              key={revealed}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-[family-name:var(--font-heading)] text-lg text-blush-pink text-center"
            >
              &ldquo;{revealed}&rdquo;
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bubbles area */}
      <div
        className="relative glass-card overflow-hidden"
        style={{ height: "320px" }}
      >
        {bubbles.map((bubble) => (
          <AnimatePresence key={bubble.id}>
            {!bubble.popped && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  y: [0, -6, 0, 6, 0],
                }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{
                  scale: { type: "spring", stiffness: 200 },
                  y: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => popBubble(bubble.id)}
                className="absolute rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(244,114,182,0.3), rgba(230,165,126,0.15))",
                  border: "1px solid rgba(244,114,182,0.2)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span className="text-2xl">✨</span>
              </motion.button>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
