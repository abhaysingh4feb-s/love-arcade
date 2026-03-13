"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: number;
  pairId: number;
  text: string;
  flipped: boolean;
  matched: boolean;
}

const memoryPairs = [
  { text: "First date ✨", id: 1 },
  { text: "First laugh 😄", id: 2 },
  { text: "First hug 🤗", id: 3 },
  { text: "First trip 🌍", id: 4 },
  { text: "That song 🎵", id: 5 },
  { text: "Late night talk 🌙", id: 6 },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryMatch({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [checking, setChecking] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const allCards: Card[] = shuffleArray(
      memoryPairs.flatMap((pair) => [
        { id: pair.id * 2 - 1, pairId: pair.id, text: pair.text, flipped: false, matched: false },
        { id: pair.id * 2, pairId: pair.id, text: pair.text, flipped: false, matched: false },
      ])
    );
    setCards(allCards);
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setTimeout(onComplete, 600);
    }
  }, [cards, onComplete]);

  const handleFlip = (cardId: number) => {
    if (checking) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;
    if (selected.length >= 2) return;

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newSelected = [...selected, cardId];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setChecking(true);
      setMoves((m) => m + 1);
      const [firstId, secondId] = newSelected;
      const first = newCards.find((c) => c.id === firstId)!;
      const second = newCards.find((c) => c.id === secondId)!;

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, matched: true } : c
            )
          );
          setSelected([]);
          setChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelected([]);
          setChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm">Moves: {moves}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.button
              key={card.id}
              layout
              onClick={() => handleFlip(card.id)}
              whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
              whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
              className={`aspect-square rounded-2xl flex items-center justify-center p-2 text-center transition-all duration-300 ${
                card.matched
                  ? "bg-blush-pink/20 border border-blush-pink/30"
                  : card.flipped
                  ? "glass-card"
                  : "bg-white/[0.04] border border-white/[0.08] hover:border-white/20"
              }`}
              style={
                card.matched
                  ? { boxShadow: "0 0 20px rgba(244, 114, 182, 0.2)" }
                  : {}
              }
            >
              {card.flipped || card.matched ? (
                <motion.span
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  className="text-xs md:text-sm text-white/80 leading-tight"
                >
                  {card.text}
                </motion.span>
              ) : (
                <span className="text-2xl">💖</span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
