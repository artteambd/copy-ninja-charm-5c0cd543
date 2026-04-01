import { useEffect, useRef } from "react";

interface Orb {
  x: number; y: number; radius: number; vx: number; vy: number; opacity: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const orbs: Orb[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const CONNECTION_DIST = 150;

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x;
          const dy = orbs[i].y - orbs[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(153, 153, 153, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(orbs[i].x, orbs[i].y);
            ctx.lineTo(orbs[j].x, orbs[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

        // Glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 12);
        gradient.addColorStop(0, `rgba(153, 153, 153, ${orb.opacity * 0.6})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.arc(orb.x, orb.y, orb.radius * 12, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 200, 200, ${orb.opacity * 1.5})`;
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ParticleCanvas;
