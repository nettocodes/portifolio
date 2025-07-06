"use client";

import React from "react";
import { motion } from "framer-motion";

type LetterByLetterProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
};

export default function LetterByLetter({ text, as = "h1", className }: LetterByLetterProps) {
  const letters = text.split("");
  
  const renderTag = () => {
    const content = letters.map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.045, duration: 0.7, ease: "easeOut" }}
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));

    switch (as) {
      case "h1":
        return <h1 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h1>;
      case "h2":
        return <h2 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h2>;
      case "h3":
        return <h3 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h3>;
      case "h4":
        return <h4 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h4>;
      case "h5":
        return <h5 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h5>;
      case "h6":
        return <h6 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h6>;
      case "p":
        return <p className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</p>;
      case "span":
        return <span className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</span>;
      default:
        return <h1 className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>{content}</h1>;
    }
  };

  return renderTag();
} 