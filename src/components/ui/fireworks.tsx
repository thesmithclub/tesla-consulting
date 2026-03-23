import { useEffect, useRef } from 'react';

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let rockets: Rocket[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Rocket {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;

      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.exploded = false;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15; // Gravity
        
        // Explode when falling or high enough
        if (this.vy >= 0 || this.y < canvas.height * 0.2) {
            this.exploded = true;
            explode(this.x, this.y, this.color);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2; // Faster spread
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.015 + 0.005; // Slower decay for longer trails
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95; // Friction
        this.vy *= 0.95;
        this.vy += 0.1; // Gravity
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const explode = (x: number, y: number, color: string) => {
      const particleCount = 150; // More particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    const colors = ['#ffffff', '#FFD700', '#E63946', '#DEDAD8'];

    const launchRocket = () => {
      // Launch from left or right side
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const x = side === 'left' ? 0 : canvas.width;
      // Target somewhere in the upper middle area
      const targetX = side === 'left' 
        ? canvas.width * 0.2 + Math.random() * canvas.width * 0.3 
        : canvas.width * 0.8 - Math.random() * canvas.width * 0.3;
      
      const startY = canvas.height;
      const endY = canvas.height * 0.1 + Math.random() * canvas.height * 0.4; // Higher explosions
      
      // Physics calc
      const h = startY - endY;
      const vy = -Math.sqrt(2 * 0.15 * h); // v = sqrt(2gh)
      const t = Math.abs(vy / 0.15);
      const vx = (targetX - x) / t;

      rockets.push(new Rocket(x, startY, vx, vy, colors[Math.floor(Math.random() * colors.length)]));
    };

    let timer = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.08) { // More frequent
        launchRocket();
      }

      rockets.forEach((r, i) => {
        r.update();
        r.draw(ctx);
        if (r.exploded) rockets.splice(i, 1);
      });

      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) particles.splice(i, 1);
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
