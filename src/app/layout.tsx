"use client";

import "./globals.css";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import Lenis from "lenis";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    setTheme("dark"); // Dark mode padrão
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="pt-BR">
      <head>
        <title>Portfólio | Seu Nome</title>
        <meta name="description" content="Portfólio moderno de desenvolvedor web full-stack." />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
