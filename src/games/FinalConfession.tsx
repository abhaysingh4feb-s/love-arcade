"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fireGrandFinale } from "@/utils/confetti";

const confessionLines = [
  "There are thousands of people in the world…",
  "But somehow…",
  "I got you.",
  "And I still feel lucky.",
];

export default function FinalConfession({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0);
  // 0: cinematic text reveal
  // 1: the question
  // 2: answered yes
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (phase !== 0) return;

    const timer = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev + 1 >= confessionLines.length) {
          clearInterval(timer);
          setTimeout(() => setPhase(1), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [phase]);

  const handleYes = () => {
    setPhase(2);
    fireGrandFinale();
    setTimeout(onComplete, 4000);
  };

  return (
    <div className="max-w-md mx-auto text-center min-h-[400px] flex flex-col items-center justify-center">
      {/* Phase 0: Cinematic text */}
      {phase === 0 && (
        <div className="space-y-4">
          {confessionLines.map((line, i) => (
            <AnimatePresence key={i}>
              {i <= currentLine && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`font-[family-name:var(--font-heading)] ${
                    i === confessionLines.length - 1
                      ? "text-2xl md:text-3xl text-white mt-4"
                      : "text-xl md:text-2xl text-white/60"
                  }`}
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>
      )}

      {/* Phase 1: The question */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-7xl mb-8"
            >
              💍
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white mb-10"
            >
              Will you go on a date
              <br />
              <span className="romantic-gradient-text">with me again?</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="btn-primary text-xl px-12 py-5"
              >
                Yes! 💕
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, x: [0, -5, 5, -5, 5, 0] }}
                className="btn-secondary text-lg px-8 py-4 opacity-40 hover:opacity-60"
                onClick={handleYes}
              >
                Also yes 😉
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: After yes */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              💖
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white mb-4"
            >
              You never stopped being
              <br />
              <span className="romantic-gradient-text">
                my favorite person.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-white/40 text-sm mt-6"
            >
              I love you. Always and forever.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
