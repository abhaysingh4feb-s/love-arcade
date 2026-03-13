"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { fireCelebration } from "@/utils/confetti";

interface LevelCompleteProps {
  show: boolean;
  message: string;
  onContinue: () => void;
}

export default function LevelComplete({
  show,
  message,
  onContinue,
}: LevelCompleteProps) {
  useEffect(() => {
    if (show) {
      fireCelebration();
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(15, 23, 42, 0.85)" }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="glass-card p-10 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="text-6xl mb-6"
            >
              💖
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-white mb-4"
            >
              Level Complete!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-white/70 mb-8 italic"
            >
              &ldquo;{message}&rdquo;
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="btn-primary text-lg px-10 py-4"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
