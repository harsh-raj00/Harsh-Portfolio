import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Custom hook for mouse-driven parallax/tilt effects.
 * Tracks mouse position relative to a container and returns
 * normalized coordinates (-1 to 1) for transform calculations.
 *
 * @param {Object} options
 * @param {number} options.intensity - Movement multiplier (default 1)
 * @param {number} options.smoothing - Lerp factor for smooth interpolation (default 0.1)
 * @returns {{ ref: React.RefObject, x: number, y: number, isHovering: boolean }}
 */
export function useMouseParallax({ intensity = 1, smoothing = 0.1 } = {}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const animate = useCallback(() => {
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, smoothing);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, smoothing);

    setPosition({
      x: currentRef.current.x * intensity,
      y: currentRef.current.y * intensity,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [intensity, smoothing]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1 to 1
      targetRef.current = {
        x: ((e.clientX - centerX) / (rect.width / 2)),
        y: ((e.clientY - centerY) / (rect.height / 2)),
      };
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      targetRef.current = { x: 0, y: 0 };
      // Let the animation continue to smoothly return to center
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return { ref, x: position.x, y: position.y, isHovering };
}

export default useMouseParallax;
