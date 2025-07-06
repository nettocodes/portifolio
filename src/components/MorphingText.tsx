"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function MorphingText({ words, interval = 2000, className }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div style={{ display: 'inline-block', position: 'relative', minHeight: '1.2em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            color: 'var(--primary)',
            fontWeight: 600,
          }}
          className={className}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
} 