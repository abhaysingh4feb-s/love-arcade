"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface PuzzlePiece {
  id: number;
  currentPos: number;
  correctPos: number;
  emoji: string;
}

const heartPieces = ["💗", "💖", "💕", "❤️", "💝", "💘", "💓", "💞", "🩷"];

function shufflePositions(count: number): number[] {
  const positions = Array.from({ length: count }, (_, i) => i);
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  // Ensure at least some are out of position
  if (positions.every((pos, i) => pos === i)) {
    [positions[0], positions[1]] = [positions[1], positions[0]];
  }
  return positions;
}

export default function FixMyHeart({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = shufflePositions(9);
    setPieces(
      heartPieces.map((emoji, i) => ({
        id: i,
        currentPos: shuffled[i],
        correctPos: i,
        emoji,
      }))
    );
  }, []);

  const checkComplete = useCallback(() => {
    if (pieces.length > 0 && pieces.every((p) => p.currentPos === p.correctPos)) {
      setTimeout(onComplete, 600);
    }
  }, [pieces, onComplete]);

  useEffect(() => {
    checkComplete();
  }, [checkComplete]);

  const handleClick = (clickedPos: number) => {
    if (selected === null) {
      setSelected(clickedPos);
    } else {
      // Swap pieces
      setPieces((prev) => {
        const newPieces = prev.map((p) => {
          if (p.currentPos === selected) return { ...p, currentPos: clickedPos };
          if (p.currentPos === clickedPos) return { ...p, currentPos: selected };
          return p;
        });
        return newPieces;
      });
      setMoves((m) => m + 1);
      setSelected(null);
    }
  };

  // Sort by currentPos for grid display
  const grid = Array(9).fill(null);
  pieces.forEach((p) => {
    grid[p.currentPos] = p;
  });

  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm">
          Swap pieces to fix the heart pattern — Moves: {moves}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {grid.map((piece: PuzzlePiece | null, pos: number) => {
          if (!piece) return <div key={pos} />;
          const isCorrect = piece.currentPos === piece.correctPos;
          const isSelected = selected === pos;

          return (
            <motion.button
              key={piece.id}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(pos)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 ${
                isSelected
                  ? "ring-2 ring-blush-pink bg-blush-pink/20 scale-105"
                  : isCorrect
                  ? "bg-blush-pink/10 border border-blush-pink/20"
                  : "glass-card"
              }`}
              style={
                isCorrect
                  ? { boxShadow: "0 0 15px rgba(244, 114, 182, 0.15)" }
                  : {}
              }
            >
              <motion.span
                animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                {piece.emoji}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="progress-track max-w-xs mx-auto">
          <div
            className="progress-fill"
            style={{
              width: `${(pieces.filter((p) => p.currentPos === p.correctPos).length / 9) * 100}%`,
            }}
          />
        </div>
        <p className="text-white/30 text-xs mt-2">
          {pieces.filter((p) => p.currentPos === p.correctPos).length}/9 in
          place
        </p>
      </div>
    </div>
  );
}
