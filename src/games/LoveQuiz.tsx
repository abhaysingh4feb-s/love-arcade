"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "What's the first thing I noticed about you?",
    options: ["Your smile", "Your eyes", "Your laugh", "Your energy"],
    correct: 2,
  },
  {
    question: "What's our go-to comfort food together?",
    options: ["Pizza", "Biryani", "Ice cream", "Pasta"],
    correct: 0,
  },
  {
    question: "What song reminds me of you?",
    options: ["Perfect", "Khaab", "Tum Hi Ho", "Haseen "],
    correct: 1,
  },
  {
    question: "What do I love most about your laugh?",
    options: [
      "It's contagious",
      "It lights up the room",
      "It makes me forget everything",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question: "What would I choose — a world trip or a lazy Sunday with you?",
    options: ["World trip, obviously!", "Lazy Sunday, always"],
    correct: 1,
  },
];

export default function LoveQuiz({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const question = questions[current];

  const handleAnswer = (idx: number) => {
    if (feedback) return;
    setSelectedIdx(idx);

    if (idx === question.correct) {
      setFeedback("correct");
      setScore((s) => s + 1);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        onComplete();
      } else {
        setCurrent((c) => c + 1);
        setFeedback(null);
        setSelectedIdx(null);
      }
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8 justify-center">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i < current
                ? "romantic-gradient"
                : i === current
                ? "bg-white/30"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          {/* Question */}
          <div className="glass-card p-6 mb-6 text-center">
            <p className="text-white/30 text-xs mb-3 uppercase tracking-wider">
              Question {current + 1} of {questions.length}
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={!feedback ? { scale: 1.02, x: 4 } : {}}
                whileTap={!feedback ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer(idx)}
                disabled={feedback !== null}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                  feedback && idx === question.correct
                    ? "bg-green-500/20 border border-green-500/30"
                    : feedback && idx === selectedIdx
                    ? "bg-red-400/20 border border-red-400/30"
                    : "glass-card hover:border-white/20"
                }`}
              >
                <span className="text-white/80">{option}</span>
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <p className="text-white/60 italic">
                  {feedback === "correct"
                    ? "You always notice the little things. 💕"
                    : "Close… but I love that you tried 😉"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
