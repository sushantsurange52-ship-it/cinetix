import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [mouseActive, setMouseActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates relative to viewport
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 170,
      targetX: -1000,
      targetY: -1000,
    };

    // Expanding shockwaves on click
    const ripples = [];

    // Particle nodes definition
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 20 + 10;
        this.color = Math.random() > 0.25 ? '#C8FF00' : '#ffffff';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        // Natural drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction: physics repulsion and magnetic rebound
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * this.density * 0.4;
          const directionY = forceDirectionY * force * this.density * 0.4;

          this.x -= directionX;
          this.y -= directionY;
        }

        // Ripple / shockwave reaction
        for (let i = 0; i < ripples.length; i++) {
          const ripple = ripples[i];
          const rdx = this.x - ripple.x;
          const rdy = this.y - ripple.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          if (Math.abs(rdist - ripple.radius) < 25) {
            const push = (1 - ripple.radius / ripple.maxRadius) * 4;
            this.x += (rdx / rdist) * push;
            this.y += (rdy / rdist) * push;
          }
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Handle mouse move
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
      setMouseActive(true);
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      setMouseActive(false);
    };

    // Handle click shockwaves
    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.35,
        speed: 8,
        alpha: 0.6,
      });
    };

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.02;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle interactive perspective grid
      const gridSize = 64;
      ctx.lineWidth = 0.5;

      // Draw digital horizontal & vertical pulse lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render ripples on click
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.alpha = (1 - ripple.radius / ripple.maxRadius) * 0.5;

        if (ripple.radius >= ripple.maxRadius || ripple.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 255, 0, ${ripple.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 8]);
        ctx.stroke();
        ctx.restore();
      }

      // Draw particle connections & mouse connections
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 255, 0, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Connect particle to mouse if near
        const mdx = particles[a].x - mouse.x;
        const mdy = particles[a].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mOpacity = (1 - mdist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(200, 255, 0, ${mOpacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        particles[a].update();
        particles[a].draw();
      }

      // Draw subtle mouse cursor spotlight & crosshair
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        gradient.addColorStop(0, 'rgba(200, 255, 0, 0.07)');
        gradient.addColorStop(0.5, 'rgba(200, 255, 0, 0.02)');
        gradient.addColorStop(1, 'rgba(200, 255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Crosshairs around cursor
        ctx.strokeStyle = 'rgba(200, 255, 0, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(mouse.x - 30, mouse.y);
        ctx.lineTo(mouse.x - 24, mouse.y);
        ctx.moveTo(mouse.x + 24, mouse.y);
        ctx.lineTo(mouse.x + 30, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 30);
        ctx.lineTo(mouse.x, mouse.y - 24);
        ctx.moveTo(mouse.x, mouse.y + 24);
        ctx.lineTo(mouse.x, mouse.y + 30);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Interactive Fullscreen Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 select-none"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Real-time Interactive HUD Telemetry Tag in Bottom-Right Corner */}
      {mouseActive && (
        <div className="fixed bottom-3 right-4 z-40 pointer-events-none hidden md:flex items-center gap-2 px-2 py-1 bg-[#11121a]/90 border border-[#C8FF00]/30 text-[10px] font-mono text-[#C8FF00] tracking-wider shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-ping" />
          <span>CURSOR // X: {Math.round(mousePos.x)} Y: {Math.round(mousePos.y)}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">INTERACTIVE MESH ACTIVE</span>
        </div>
      )}
    </>
  );
}
