import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses IntersectionObserver to detect when elements enter the viewport.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.15
 * @param {string} options.rootMargin - Root margin, default "0px 0px -60px 0px"
 * @param {boolean} options.triggerOnce - Only trigger once, default true
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Utility component wrapper that applies scroll-reveal animations to children.
 * Supports staggered delays via the `delay` prop.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.animation - CSS class for the animation type (default: "reveal-fade-up")
 * @param {number} props.delay - Delay in ms before animation starts
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
export function ScrollReveal({
  children,
  animation = "reveal-fade-up",
  delay = 0,
  className = "",
  style = {},
  ...rest
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default useScrollReveal;
