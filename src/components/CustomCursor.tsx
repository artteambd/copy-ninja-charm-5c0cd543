import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      document.documentElement.style.cursor = "auto";
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !trail) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let trailX = 0, trailY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-interactive], input, textarea, select")) {
        dot.style.transform = "translate(-50%, -50%) scale(0.5)";
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "hsl(var(--foreground) / 0.4)";
        ring.style.background = "hsl(var(--foreground) / 0.05)";
      }
    };

    const onMouseOut = () => {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "hsl(var(--foreground) / 0.2)";
      ring.style.background = "transparent";
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    const animate = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      trailX += (mouseX - trailX) * 0.05;
      trailY += (mouseY - trailY) * 0.05;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "hsl(var(--foreground))",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease, width 0.2s, height 0.2s",
          ...(clicking ? { transform: "translate(-50%, -50%) scale(0.6)" } : {}),
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid hsl(var(--foreground) / 0.2)",
          background: "transparent",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
          ...(clicking ? { width: "24px", height: "24px" } : {}),
        }}
      />
      {/* Trailing glow */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--foreground) / 0.03) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
