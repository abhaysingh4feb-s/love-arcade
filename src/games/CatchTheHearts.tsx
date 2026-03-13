"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  emoji: string;
}

const heartEmojis = ["❤️", "💕", "💖", "💗", "💝", "💘"];

export default function CatchTheHearts({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [started, setStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [completed, setCompleted] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const target = 10;

  const spawnHeart = useCallback(() => {
    const heart: FallingHeart = {
      id: nextIdRef.current++,
      x: Math.random() * 85 + 5,
      y: -5,
      speed: Math.random() * 1.5 + 1,
      size: Math.random() * 16 + 24,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    };
    setHearts((prev) => [...prev, heart]);
  }, []);

  useEffect(() => {
    if (!started) return;

    const spawnInterval = setInterval(spawnHeart, 600);
    const moveInterval = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed }))
          .filter((h) => h.y < 110)
      );
    }, 50);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(spawnInterval);
          clearInterval(moveInterval);
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
      clearInterval(timer);
    };
  }, [started, spawnHeart, gameKey]);

  useEffect(() => {
    if (completed) return;
    if (score >= target) {
      setCompleted(true);
      setTimeout(() => onCompleteRef.current(), 500);
    }
  }, [score, completed]);

  const catchHeart = (heartId: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== heartId));
    setScore((s) => s + 1);
  };

  if (!started) {
    return (
      <div className="text-center">
        <div className="glass-card p-8 max-w-sm mx-auto">
          <p className="text-5xl mb-4">💕</p>
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-white mb-3">
            Catch {target} Hearts!
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Tap the falling hearts before they disappear. You have 20 seconds!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="btn-primary"
          >
            Start Catching!
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HUD */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="glass-card px-4 py-2 text-sm">
          <span className="text-white/50">Score: </span>
          <span className="text-blush-pink font-semibold">
            {score}/{target}
          </span>
        </div>
        <div className="glass-card px-4 py-2 text-sm">
          <span className="text-white/50">Time: </span>
          <span
            className={`font-semibold ${
              timeLeft <= 5 ? "text-soft-coral" : "text-white"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-track mb-4">
        <div
          className="progress-fill"
          style={{ width: `${Math.min((score / target) * 100, 100)}%` }}
        />
      </div>

      {/* Game area */}
      <div
        ref={gameRef}
        className="relative glass-card overflow-hidden"
        style={{ height: "400px", touchAction: "none" }}
      >
        {hearts.map((heart) => (
          <motion.button
            key={heart.id}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 1.5 }}
            onClick={() => catchHeart(heart.id)}
            className="absolute cursor-pointer select-none"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {heart.emoji}
          </motion.button>
        ))}

        {timeLeft === 0 && score < target && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-main/80">
            <div className="text-center">
              <p className="text-white/60 mb-4">
                You caught {score} hearts! Try again?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setScore(0);
                  setTimeLeft(20);
                  setHearts([]);
                  setCompleted(false);
                  nextIdRef.current = 0;
                  setGameKey((k) => k + 1);
                }}
                className="btn-primary"
              >
                Retry
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
