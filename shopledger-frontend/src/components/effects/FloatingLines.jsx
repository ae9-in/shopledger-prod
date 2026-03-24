import { useEffect, useMemo, useRef, useState } from "react";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function FloatingLines({
  linesGradient = ["#47f5c1", "#2F4BC0", "#E945F5"],
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2
}) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!interactive && !parallax) {
      return undefined;
    }

    const tick = () => {
      const t = targetRef.current;
      setPointer((prev) => ({
        x: prev.x + (t.x - prev.x) * mouseDamping,
        y: prev.y + (t.y - prev.y) * mouseDamping
      }));
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [interactive, parallax, mouseDamping]);

  const lines = useMemo(() => {
    return Array.from({ length: 18 }, (_, idx) => ({
      id: idx,
      noise: Math.sin(idx * 0.8) * 16,
      opacity: 0.42 + (idx % 4) * 0.1
    }));
  }, []);

  const handlePointerMove = (event) => {
    if (!interactive || !wrapperRef.current) {
      return;
    }

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    targetRef.current = {
      x: clamp((x - 0.5) * 2, -1, 1),
      y: clamp((y - 0.5) * 2, -1, 1)
    };
  };

  const handlePointerLeave = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  const parallaxTransform = parallax
    ? `translate3d(${pointer.x * 28 * parallaxStrength}px, ${pointer.y * 18 * parallaxStrength}px, 0)`
    : "none";

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 overflow-hidden rounded-[inherit]"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <svg
        viewBox="0 0 1080 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{ transform: parallaxTransform, transition: "transform 0.25s ease-out" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="floating-lines-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={linesGradient[0]} />
            <stop offset="50%" stopColor={linesGradient[1]} />
            <stop offset="100%" stopColor={linesGradient[2]} />
          </linearGradient>
        </defs>

        {lines.map((line, idx) => {
          const y = 40 + idx * 58;
          const controlX = 540 + pointer.x * 140 * bendRadius;
          const controlY = y + pointer.y * 88 * bendStrength + line.noise;
          const d = `M -100 ${y} Q ${controlX} ${controlY} 1180 ${y}`;
          const duration = clamp(5.8 / animationSpeed + idx * 0.22, 3.8, 14);

          return (
            <path
              key={line.id}
              d={d}
              stroke="url(#floating-lines-gradient)"
              strokeWidth={2.1 + (idx % 3) * 0.55}
              strokeLinecap="round"
              fill="none"
              opacity={line.opacity}
              className="floating-lines-path"
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${idx * -0.4}s`
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default FloatingLines;

