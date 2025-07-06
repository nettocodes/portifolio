"use client";

import LetterByLetter from "./LetterByLetter";

type AnimatedTitleProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export default function AnimatedTitle({ text, as = "h1", className }: AnimatedTitleProps) {
  return <LetterByLetter text={text} as={as} className={className} />;
} 