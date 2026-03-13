"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackground";

export default function LandingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0); // 0: black, 1: text reveal, 2: full UI
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleStart = () => {
    setExiting(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(244, 114, 182, 0.15)" }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(230, 165, 126, 0.12)" }}
        />
      </div>

      <AnimatePresence>
        {!exiting && (
          <motion.div
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-6 max-w-2xl mx-auto"
          >
            {/* Diamond icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={phase >= 1 ? { scale: 1, rotate: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="text-5xl md:text-7xl mb-8"
            >
              💎
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
            >
              I built something
              <br />
              <span className="romantic-gradient-text">just for you.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0 }}
              className="text-lg md:text-xl text-white/50 mb-12 max-w-md mx-auto"
            >
              Because loving you deserves more than just words.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="btn-primary text-lg md:text-xl px-12 py-5"
              >
                Begin Our Journey
              </motion.button>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 0.3 } : {}}
              transition={{ delay: 1.5 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/30 text-sm"
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
