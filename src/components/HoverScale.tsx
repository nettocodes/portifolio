"use client";

import { motion } from "framer-motion";

type HoverScaleProps = {
  children: React.ReactNode;
  scale?: number;
  shadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function HoverScale({ children, scale = 1.06, shadow = true, className, style }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale, filter: shadow ? 'brightness(1.15) drop-shadow(0 4px 16px rgba(0,0,0,0.10))' : undefined }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
} 