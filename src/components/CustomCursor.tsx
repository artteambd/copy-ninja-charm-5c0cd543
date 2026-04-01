import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-interactive]")) {
        cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
        glow.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursor.style.background = "rgba(255,255,255,0.15)";
      }
    };

    const onMouseOut = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      glow.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "rgba(255,255,255,0.9)";
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      glow.style.left = `${cursorX}px`;
      glow.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "rgba(255,255,255,0.9)",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.2s ease, background 0.2s ease",
        }}
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.3s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
