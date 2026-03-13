"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackground";
import SettingsPanel from "@/components/SettingsPanel";
import { useGameState } from "@/hooks/useGameState";
import { levels } from "@/data/levels";

export default function Dashboard() {
  const router = useRouter();
  const game = useGameState();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!game.loaded) {
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

  const handleLevelClick = (levelId: number) => {
    if (game.isLevelUnlocked(levelId)) {
      router.push(`/level/${levelId}`);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10"
      >
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-white">
            9 Levels of Us
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {game.completedLevels.length}/{levels.length} completed
          </p>
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          ⚙
        </button>
      </motion.header>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 px-6 md:px-10 mb-4"
      >
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${game.progress}%`,
              boxShadow:
                game.progress > 0
                  ? `0 0 ${8 + game.progress * 0.3}px rgba(244, 114, 182, ${0.3 + game.progress * 0.005})`
                  : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Dashboard quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 text-center px-6 mb-10"
      >
        <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white/60 italic">
          &ldquo;At every stage of life… I still choose you.&rdquo;
        </p>
      </motion.div>

      {/* Level Grid */}
      <div className="relative z-10 px-6 md:px-10 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {levels.map((level, i) => {
          const unlocked = game.isLevelUnlocked(level.id);
          const completed = game.isLevelCompleted(level.id);

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * i,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.button
                whileHover={unlocked ? { scale: 1.04, y: -4 } : {}}
                whileTap={unlocked ? { scale: 0.97 } : {}}
                onClick={() => handleLevelClick(level.id)}
                disabled={!unlocked}
                className={`w-full aspect-square rounded-3xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden ${
                  completed
                    ? "glass-card border-blush-pink/30"
                    : unlocked
                    ? "glass-card hover:border-white/20 cursor-pointer"
                    : "bg-white/[0.02] border border-white/[0.04] cursor-not-allowed"
                }`}
                style={
                  completed
                    ? {
                        boxShadow: `0 0 20px ${level.color}20, 0 0 60px ${level.color}10`,
                      }
                    : {}
                }
              >
                {/* Completion glow */}
                {completed && (
                  <div
                    className="absolute inset-0 opacity-10 rounded-3xl"
                    style={{
                      background: `radial-gradient(circle at center, ${level.color}, transparent 70%)`,
                    }}
                  />
                )}

                {/* Level number */}
                <span
                  className={`text-xs font-semibold mb-2 ${
                    completed
                      ? "text-blush-pink"
                      : unlocked
                      ? "text-white/40"
                      : "text-white/15"
                  }`}
                >
                  {completed ? "✓" : `${level.id}`}
                </span>

                {/* Icon */}
                <span
                  className={`text-3xl md:text-4xl mb-2 transition-all ${
                    !unlocked ? "grayscale opacity-30" : ""
                  }`}
                >
                  {unlocked ? level.icon : "🔒"}
                </span>

                {/* Title */}
                <span
                  className={`text-sm font-medium leading-tight ${
                    completed
                      ? "text-white"
                      : unlocked
                      ? "text-white/70"
                      : "text-white/20"
                  }`}
                >
                  {level.title}
                </span>

                {/* Subtitle */}
                {unlocked && (
                  <span className="text-[11px] text-white/30 mt-1 leading-tight">
                    {level.subtitle}
                  </span>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundEnabled={game.soundEnabled}
        onToggleSound={game.toggleSound}
        onResetProgress={game.resetProgress}
        onReplayIntro={() => router.push("/")}
      />
    </div>
  );
}
