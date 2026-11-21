"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Lightweight Intersection Observer Hook
 * Triggers once when the element enters viewport.
 * Automatically checks for prefers-reduced-motion.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.15,
      ...options,
    });

    observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return { ref, isInView };
}

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  delayMs = 0,
  className = "",
  style = {},
}: RevealProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
