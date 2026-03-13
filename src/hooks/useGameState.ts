"use client";

import { useState, useEffect, useCallback } from "react";
import { levels } from "@/data/levels";

const STORAGE_KEY = "love-arcade-progress";
const TOTAL_LEVELS = levels.length;

interface GameState {
  completedLevels: number[];
  currentLevel: number;
  hasSeenIntro: boolean;
  soundEnabled: boolean;
  dateChoice: string | null;
}

const defaultState: GameState = {
  completedLevels: [],
  currentLevel: 1,
  hasSeenIntro: false,
  soundEnabled: true,
  dateChoice: null,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState({ ...defaultState, ...JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const save = useCallback((newState: GameState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // ignore
    }
  }, []);

  const completeLevel = useCallback(
    (levelId: number) => {
      const newCompleted = state.completedLevels.includes(levelId)
        ? state.completedLevels
        : [...state.completedLevels, levelId];
      const nextLevel = Math.max(state.currentLevel, levelId + 1);
      save({ ...state, completedLevels: newCompleted, currentLevel: nextLevel });
    },
    [state, save]
  );

  const isLevelUnlocked = useCallback(
    (levelId: number) => {
      if (levelId === 1) return true;
      return state.completedLevels.includes(levelId - 1);
    },
    [state.completedLevels]
  );

  const isLevelCompleted = useCallback(
    (levelId: number) => state.completedLevels.includes(levelId),
    [state.completedLevels]
  );

  const markIntroSeen = useCallback(() => {
    save({ ...state, hasSeenIntro: true });
  }, [state, save]);

  const toggleSound = useCallback(() => {
    save({ ...state, soundEnabled: !state.soundEnabled });
  }, [state, save]);

  const setDateChoice = useCallback(
    (choice: string) => {
      save({ ...state, dateChoice: choice });
    },
    [state, save]
  );

  const resetProgress = useCallback(() => {
    save(defaultState);
  }, [save]);

  const progress = loaded
    ? Math.round((state.completedLevels.length / TOTAL_LEVELS) * 100)
    : 0;

  return {
    ...state,
    loaded,
    progress,
    completeLevel,
    isLevelUnlocked,
    isLevelCompleted,
    markIntroSeen,
    toggleSound,
    setDateChoice,
    resetProgress,
  };
}
