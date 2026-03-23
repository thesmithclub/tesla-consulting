import { useEffect, useRef } from 'react';

export function FireworksV2() {
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
      targetY: number;
      trail: {x: number, y: number}[];

      constructor(x: number, y: number, vx: number, vy: number, color: string, targetY: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.exploded = false;
        this.targetY = targetY;
        this.trail = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Trail logic
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 5) this.trail.shift();

        if (this.y >= this.targetY) {
            this.exploded = true;
            explode(this.x, this.y, this.color);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw a streak instead of a ball
        if (this.trail.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
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
      size: number;

      constructor(x: number, y: number, color: string, speedMultiplier: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        // Varying speed for depth
        const speed = Math.random() * speedMultiplier + 2; 
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        // Varying decay
        this.decay = Math.random() * 0.015 + 0.005;
        // Varying size
        this.size = Math.random() * 2 + 1; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95; // More friction
        this.vy *= 0.95;
        this.vy += 0.05; // Less gravity for floaty feel
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        // Draw rect for "spark" look instead of circle
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
      }
    }

    const explode = (x: number, y: number, color: string) => {
      // Randomize explosion size
      const isBig = Math.random() > 0.5;
      const particleCount = isBig ? 300 : 150;
      const speedMultiplier = isBig ? 12 : 6; // Bigger explosions spread further

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color, speedMultiplier));
      }
    };

    // Palette: White, Gold, Beige, Cream
    const colors = ['#FFFFFF', '#FFD700', '#DEDAD8', '#F0F0F0', '#FFE4B5'];

    const launchRocket = () => {
      const x = Math.random() * canvas.width;
      const startY = -50; 
      // Target Y: Top 10% to 35% of screen (Higher up)
      const endY = canvas.height * 0.1 + Math.random() * canvas.height * 0.25; 
      
      const h = endY - startY;
      const t = 40; // Faster fall
      const vy = h / t; 
      const vx = 0; 

      rockets.push(new Rocket(x, startY, vx, vy, colors[Math.floor(Math.random() * colors.length)], endY));
    };

    const loop = () => {
      // Use slightly transparent clear for trail effect? No, clean clear.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.02) { // Occasional launch
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
