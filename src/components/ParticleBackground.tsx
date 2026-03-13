"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "heart" | "circle";
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = Math.min(30, Math.floor(window.innerWidth / 50));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.3 + 0.05,
      type: Math.random() > 0.7 ? "heart" : "circle",
    }));

    function drawHeart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // left curve
      ctx.bezierCurveTo(x, y, x - size, y, x - size, y + topCurveHeight);
      ctx.bezierCurveTo(
        x - size,
        y + (size + topCurveHeight) / 2,
        x,
        y + (size + topCurveHeight) / 1.2,
        x,
        y + size
      );
      // right curve
      ctx.bezierCurveTo(
        x,
        y + (size + topCurveHeight) / 1.2,
        x + size,
        y + (size + topCurveHeight) / 2,
        x + size,
        y + topCurveHeight
      );
      ctx.bezierCurveTo(x + size, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        if (p.type === "heart") {
          ctx.fillStyle = `rgba(244, 114, 182, ${p.opacity})`;
          drawHeart(ctx, p.x, p.y, p.size * 3);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 165, 126, ${p.opacity})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
