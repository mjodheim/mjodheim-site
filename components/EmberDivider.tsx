"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
}

const COLORS = [
  "rgba(224,90,0,",
  "rgba(201,168,76,",
  "rgba(245,166,35,",
  "rgba(255,122,32,",
  "rgba(180,60,0,",
];

export default function EmberDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const embersRef = useRef<Ember[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 10,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -(Math.random() * 1.5 + 0.5),
      opacity: Math.random() * 0.6 + 0.4,
      fadeSpeed: Math.random() * 0.008 + 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    // Spawn initial embers
    for (let i = 0; i < 60; i++) {
      const e = spawnEmber();
      e.y = Math.random() * canvas.height;
      embersRef.current.push(e);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new embers
      if (Math.random() < 0.4) embersRef.current.push(spawnEmber());

      embersRef.current = embersRef.current.filter((ember) => ember.opacity > 0);

      for (const ember of embersRef.current) {
        ember.x += ember.speedX;
        ember.y += ember.speedY;
        ember.opacity -= ember.fadeSpeed;
        ember.speedX += (Math.random() - 0.5) * 0.05;

        const gradient = ctx.createRadialGradient(
          ember.x, ember.y, 0,
          ember.x, ember.y, ember.size * 2
        );
        gradient.addColorStop(0, `${ember.color}${ember.opacity})`);
        gradient.addColorStop(1, `${ember.color}0)`);

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,100,${ember.opacity * 0.8})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "80px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Gradient de fond : transition entre sections */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,6,4,0.3) 40%, rgba(10,6,4,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Ligne lumineuse centrale */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), rgba(224,90,0,0.4), rgba(201,168,76,0.15), transparent)",
          boxShadow: "0 0 8px rgba(224,90,0,0.3)",
        }}
      />
      {/* Canvas braises */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
