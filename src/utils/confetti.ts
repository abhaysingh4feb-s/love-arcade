import confetti from "canvas-confetti";

export function fireCelebration() {
  const duration = 2500;
  const end = Date.now() + duration;

  const colors = ["#E6A57E", "#F472B6", "#FB7185", "#FACC15", "#A78BFA"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireHearts() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 20,
    shapes: ["circle" as const],
    colors: ["#F472B6", "#E6A57E", "#FB7185", "#ff6b81"],
  };

  confetti({ ...defaults, particleCount: 40 });
  setTimeout(() => confetti({ ...defaults, particleCount: 30 }), 200);
  setTimeout(() => confetti({ ...defaults, particleCount: 20 }), 400);
}

export function fireGrandFinale() {
  const duration = 5000;
  const end = Date.now() + duration;
  const colors = ["#E6A57E", "#F472B6", "#FB7185", "#FACC15", "#A78BFA", "#34D399"];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 120,
      origin: { x: 0.5, y: 0.3 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
