import { useEffect, useRef } from 'react';

export default function Background({ theme }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const rgb = theme === 'dark' ? '167,139,250' : '99,102,241';
    const mouse = { x: 0, y: 0 };
    let w = 0, h = 0, raf;

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMove = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const pos = pts.map((p) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        return { x: p.x * w + mouse.x * p.z * 50, y: p.y * h + mouse.y * p.z * 50, z: p.z };
      });
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / 130) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.stroke();
          }
        }
      }
      pos.forEach((p) => {
        ctx.fillStyle = `rgba(${rgb},${0.35 + p.z * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + p.z * 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [theme]);

  return (
    <>
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <canvas ref={ref} className="bg-canvas" />
    </>
  );
}
