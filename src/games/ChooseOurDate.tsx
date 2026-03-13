"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DateOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  vibe: string;
}

const dateOptions: DateOption[] = [
  {
    id: "rooftop",
    emoji: "🌃",
    title: "Rooftop Dinner",
    description: "Under the stars, just us. Candlelight and city lights.",
    vibe: "Romantic & Intimate",
  },
  {
    id: "picnic",
    emoji: "🧺",
    title: "Sunset Picnic",
    description: "A cozy blanket, your favorite snacks, and the golden hour.",
    vibe: "Warm & Dreamy",
  },
  {
    id: "adventure",
    emoji: "🎡",
    title: "Adventure Day",
    description: "Let's explore something new together. Anywhere, everywhere.",
    vibe: "Fun & Spontaneous",
  },
  {
    id: "stayin",
    emoji: "🎬",
    title: "Cozy Night In",
    description: "Movies, blankets, your head on my shoulder. Simple perfection.",
    vibe: "Comfy & Sweet",
  },
];

export default function ChooseOurDate({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(onComplete, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm">
          Pick our next date — every choice is perfect
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {dateOptions.map((option, i) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option.id)}
            className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
              selected === option.id
                ? "glass-card border-blush-pink/40 glow-rose"
                : "glass-card hover:border-white/20"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{option.emoji}</span>
              <div>
                <h4 className="text-white font-semibold mb-1">
                  {option.title}
                </h4>
                <p className="text-white/50 text-sm mb-2">
                  {option.description}
                </p>
                <span className="text-xs text-blush-pink/70 bg-blush-pink/10 px-3 py-1 rounded-full">
                  {option.vibe}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && !confirmed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              className="btn-primary text-lg px-10"
            >
              It&apos;s a Date! 🌹
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 italic text-lg"
            >
              Perfect choice. I can&apos;t wait. 💕
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
