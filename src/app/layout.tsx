import type { Metadata } from "next";
import { inter } from '../lib/fonts';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://ivonetto.vercel.app'),
  title: "Ivo Netto | Full-Stack Developer",
  description: "Desenvolvedor Full-Stack especializado em React, Next.js, Node.js e tecnologias modernas. Criando soluções digitais inovadoras e de alta performance.",
  keywords: ["desenvolvedor", "full-stack", "react", "nextjs", "nodejs", "typescript", "javascript", "portfolio", "ivo netto"],
  authors: [{ name: "Ivo Netto", url: "https://ivonetto.vercel.app" }],
  creator: "Ivo Netto",
  openGraph: {
    title: "Ivo Netto | Full-Stack Developer",
    description: "Desenvolvedor Full-Stack especializado em React, Next.js, Node.js e tecnologias modernas.",
    url: "https://ivonetto.vercel.app",
    siteName: "Ivo Netto - Portfolio",
    images: [
      {
        url: "https://ivonetto.vercel.app/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Ivo Netto - Full-Stack Developer",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivo Netto | Full-Stack Developer",
    description: "Desenvolvedor Full-Stack especializado em React, Next.js, Node.js e tecnologias modernas.",
    images: ["https://ivonetto.vercel.app/images/og-image.webp"],
    creator: "@ivo.braatz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo-white.ico",
    apple: "/images/logo-dark.svg",
  },
  verification: {
    google: "google-site-verification-code", // Adicione seu código aqui
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={inter.className}>
        <div className="layout-container">
          {children}
        </div>
      </body>
    </html>
  );
}
