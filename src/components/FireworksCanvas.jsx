import { useEffect, useRef, memo } from "react";

/**
 * Lightweight canvas-based fireworks particle system.
 * Renders behind all content for an immersive pyrotechnic feel.
 * Respects prefers-reduced-motion.
 *
 * Performance notes:
 * - No ctx.shadowBlur (very expensive in Canvas 2D, causes GPU paint per particle)
 * - Swap-and-pop removal instead of splice() to avoid O(n) array reallocation
 * - MAX_PARTICLES cap prevents unbounded accumulation
 * - Resize handler is debounced
 */

const COLORS = [
  "#ff4444", "#ffaa00", "#ff6699", "#44aaff", "#aa44ff",
  "#ffdd44", "#ff8844", "#ff44aa", "#44ffaa", "#ff66ff",
  "#ffd700", "#ff1493", "#00bfff", "#7b68ee", "#ff6347",
  "#00e5ff", "#39ff14", "#ff007f", "#ff6b35", "#00d4aa",
];

const MAX_PARTICLES = 500;
const MAX_ROCKETS = 5;

class Particle {
  constructor(x, y, color, velocity, life, size, gravity, fade) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = velocity.x;
    this.vy = velocity.y;
    this.life = life;
    this.maxLife = life;
    this.size = size;
    this.gravity = gravity;
    this.fade = fade;
    this.alpha = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.life--;
    this.alpha = this.fade ? this.life / this.maxLife : Math.min(1, this.life / (this.maxLife * 0.3));
  }

  draw(ctx) {
    const a = Math.max(0, this.alpha);
    if (a < 0.01) return;
    ctx.globalAlpha = a;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.5, this.size * a), 0, Math.PI * 2);
    ctx.fill();
  }
}

class Rocket {
  constructor(x, targetY, color) {
    this.x = x;
    this.y = window.innerHeight + 10;
    this.targetY = targetY;
    this.color = color;
    this.speed = 3 + Math.random() * 3;
    this.trail = [];
    this.exploded = false;
  }

  update() {
    if (this.exploded) return;
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > 12) this.trail.shift();
    this.trail.forEach((t) => (t.alpha *= 0.88));
    this.y -= this.speed;
    this.x += (Math.random() - 0.5) * 0.5;
    if (this.y <= this.targetY) {
      this.exploded = true;
    }
  }

  draw(ctx) {
    if (this.exploded) return;
    // Trail (no shadowBlur — uses opacity for glow feel)
    for (const t of this.trail) {
      ctx.globalAlpha = t.alpha * 0.6;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    // Head
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createExplosion(x, y, particles, type) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
  const count = 60 + Math.floor(Math.random() * 40);

  switch (type) {
    case "ring": {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 1.5;
        particles.push(
          new Particle(x, y, i % 2 === 0 ? color : color2,
            { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            60 + Math.random() * 40, 1.5 + Math.random(), 0.02, true
          )
        );
      }
      break;
    }
    case "burst": {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particles.push(
          new Particle(x, y, Math.random() > 0.5 ? color : color2,
            { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            50 + Math.random() * 50, 1 + Math.random() * 1.5, 0.025, true
          )
        );
      }
      break;
    }
    case "willow": {
      for (let i = 0; i < count * 1.5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.5;
        particles.push(
          new Particle(x, y, color,
            { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            80 + Math.random() * 60, 1 + Math.random(), 0.045, true
          )
        );
      }
      break;
    }
    case "star": {
      const arms = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const armIndex = i % arms;
        const angle = (Math.PI * 2 * armIndex) / arms + (Math.random() - 0.5) * 0.3;
        const speed = 1 + Math.random() * 3;
        particles.push(
          new Particle(x, y, i % 3 === 0 ? "#ffffff" : color,
            { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            50 + Math.random() * 40, 1.2 + Math.random(), 0.03, true
          )
        );
      }
      break;
    }
    default: {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        particles.push(
          new Particle(x, y, color,
            { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            60 + Math.random() * 40, 1 + Math.random(), 0.03, true
          )
        );
      }
    }
  }
}

const EXPLOSION_TYPES = ["ring", "burst", "willow", "star", "default"];

const FireworksCanvas = () => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const rockets = [];
    let lastLaunch = 0;
    const launchInterval = 2200 + Math.random() * 2500;

    // Debounced resize handler to avoid repeated canvas clears
    let resizeTimer = 0;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    const launchRocket = (now) => {
      if (now - lastLaunch < launchInterval) return;
      if (rockets.length >= MAX_ROCKETS) return;
      if (particles.length >= MAX_PARTICLES * 0.8) return; // Backpressure
      lastLaunch = now;
      const x = width * 0.15 + Math.random() * width * 0.7;
      const targetY = height * 0.1 + Math.random() * height * 0.35;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      rockets.push(new Rocket(x, targetY, color));
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      launchRocket(timestamp);

      // Update rockets (swap-and-pop removal)
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        rocket.update();
        rocket.draw(ctx);
        if (rocket.exploded) {
          const type = EXPLOSION_TYPES[Math.floor(Math.random() * EXPLOSION_TYPES.length)];
          createExplosion(rocket.x, rocket.y, particles, type);
          rockets[i] = rockets[rockets.length - 1];
          rockets.pop();
        }
      }

      // Update particles (swap-and-pop removal, cap enforcement)
      let pLen = particles.length;
      for (let i = pLen - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles[i] = particles[pLen - 1];
          particles.pop();
          pLen--;
        }
      }
      // Hard cap: drop oldest if over limit
      while (particles.length > MAX_PARTICLES) particles.shift();

      ctx.globalAlpha = 1; // Reset for next frame

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.75 }}
    />
  );
};

export default memo(FireworksCanvas);
