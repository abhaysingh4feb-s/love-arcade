"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useCallback, useRef, use } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import LevelComplete from "@/components/LevelComplete";
import { useGameState } from "@/hooks/useGameState";
import { levels } from "@/data/levels";

// Game imports
import MemoryMatch from "@/games/MemoryMatch";
import LoveQuiz from "@/games/LoveQuiz";
import CatchTheHearts from "@/games/CatchTheHearts";
import LoveTimeline from "@/games/LoveTimeline";
import FixMyHeart from "@/games/FixMyHeart";
import ChooseOurDate from "@/games/ChooseOurDate";
import ComplimentBubbles from "@/games/ComplimentBubbles";
import LoveMeter from "@/games/LoveMeter";
import FinalConfession from "@/games/FinalConfession";

const gameComponents: Record<number, React.FC<{ onComplete: () => void }>> = {
  1: MemoryMatch,
  2: LoveQuiz,
  3: CatchTheHearts,
  4: LoveTimeline,
  5: FixMyHeart,
  6: ChooseOurDate,
  7: ComplimentBubbles,
  8: LoveMeter,
  9: FinalConfession,
};

export default function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const game = useGameState();
  const [showComplete, setShowComplete] = useState(false);
  const completedRef = useRef(false);

  const levelId = parseInt(id);
  const level = levels.find((l) => l.id === levelId);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    game.completeLevel(levelId);
    setShowComplete(true);
  }, [game, levelId]);

  const handleContinue = () => {
    if (levelId >= 9) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  if (!game.loaded || !level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          💎
        </motion.div>
      </div>
    );
  }

  if (!game.isLevelUnlocked(levelId)) {
    router.push("/dashboard");
    return null;
  }

  const GameComponent = gameComponents[levelId];

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      {/* Level Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center justify-between px-6 py-5"
      >
        <button
          onClick={() => router.push("/dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          ←
        </button>
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-wider">
            Level {level.id}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-lg text-white">
            {level.title}
          </h1>
        </div>
        {!showComplete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="px-4 py-2 rounded-full text-xs font-medium text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 transition-all"
          >
            Skip →
          </motion.button>
        )}
        {showComplete && <div className="w-16" />}
      </motion.header>

      {/* Intro text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center px-6 mb-8"
      >
        <p className="text-white/50 italic text-base">
          &ldquo;{level.intro}&rdquo;
        </p>
      </motion.div>

      {/* Game Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 px-4 md:px-6 pb-10 max-w-2xl mx-auto"
      >
        {GameComponent && <GameComponent onComplete={handleComplete} />}
      </motion.div>

      {/* Level Complete Overlay */}
      <LevelComplete
        show={showComplete}
        message={level.completion}
        onContinue={handleContinue}
      />
    </div>
  );
}
