"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
  onReplayIntro: () => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  onResetProgress,
  onReplayIntro,
}: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(15, 23, 42, 0.6)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 z-50 glass-card rounded-l-[28px] rounded-r-none p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-[family-name:var(--font-heading)] text-xl text-white">
                Settings
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-white/80">
                  {soundEnabled ? "🔊" : "🔇"} Sound
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    soundEnabled
                      ? "bg-blush-pink/20 text-blush-pink"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {soundEnabled ? "On" : "Off"}
                </span>
              </button>

              {/* Replay Intro */}
              <button
                onClick={() => {
                  onReplayIntro();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-white/80">🎬 Replay Intro</span>
                <span className="text-white/30">→</span>
              </button>

              {/* Reset Progress */}
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure? This will reset all your progress."
                    )
                  ) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-red-500/10 transition-colors group"
              >
                <span className="text-white/80 group-hover:text-red-400 transition-colors">
                  🔄 Reset Progress
                </span>
                <span className="text-white/30">→</span>
              </button>
            </div>

            <p className="text-white/20 text-xs text-center mt-8">
              Built with love 💎
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
