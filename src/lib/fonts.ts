import { Inter } from 'next/font/google';

// Optimize Google Fonts loading
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

// Font CSS variables
export const fontVariables = `
  :root {
    --font-family-sans: ${inter.style.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-family-mono: "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", monospace;
  }
`;
