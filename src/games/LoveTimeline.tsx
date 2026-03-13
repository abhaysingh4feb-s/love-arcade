"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  id: number;
  title: string;
  emoji: string;
  order: number;
}

const timelineEvents: TimelineEvent[] = [
  { id: 1, title: "The day we first met", emoji: "✨", order: 1 },
  { id: 2, title: "Our first conversation", emoji: "💬", order: 2 },
  { id: 3, title: "When I knew I liked you", emoji: "💕", order: 3 },
  { id: 4, title: "Our first date", emoji: "🌹", order: 4 },
  { id: 5, title: "The first 'I love you'", emoji: "❤️", order: 5 },
  { id: 6, title: "The day we became forever", emoji: "💍", order: 6 },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function LoveTimeline({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [shuffled, setShuffled] = useState<TimelineEvent[]>([]);
  const [placed, setPlaced] = useState<TimelineEvent[]>([]);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setShuffled(shuffleArray(timelineEvents));
  }, []);

  useEffect(() => {
    if (placed.length === timelineEvents.length) {
      setTimeout(onComplete, 600);
    }
  }, [placed, onComplete]);

  const handleSelect = (event: TimelineEvent) => {
    const nextOrder = placed.length + 1;
    if (event.order === nextOrder) {
      setPlaced((prev) => [...prev, event]);
      setShuffled((prev) => prev.filter((e) => e.id !== event.id));
      setWrong(false);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 800);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Instructions */}
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm">
          Arrange our story in the right order
        </p>
      </div>

      {/* Placed timeline */}
      <div className="mb-8 space-y-2">
        {placed.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-blush-pink/10 border border-blush-pink/20"
          >
            <div className="w-8 h-8 rounded-full romantic-gradient flex items-center justify-center text-white text-sm font-bold shrink-0">
              {i + 1}
            </div>
            <span className="text-lg mr-2">{event.emoji}</span>
            <span className="text-white/80 text-sm">{event.title}</span>
          </motion.div>
        ))}

        {/* Next slot indicator */}
        {placed.length < timelineEvents.length && (
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-sm font-bold shrink-0">
              {placed.length + 1}
            </div>
            <span className="text-white/20 text-sm">What came next?</span>
          </motion.div>
        )}
      </div>

      {/* Wrong feedback */}
      <AnimatePresence>
        {wrong && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-soft-coral/80 text-sm mb-4"
          >
            Not quite — think about what came next 💭
          </motion.p>
        )}
      </AnimatePresence>

      {/* Available events */}
      <div className="space-y-2">
        {shuffled.map((event) => (
          <motion.button
            key={event.id}
            layout
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(event)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl glass-card hover:border-white/20 text-left transition-all"
          >
            <span className="text-lg">{event.emoji}</span>
            <span className="text-white/70 text-sm">{event.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
