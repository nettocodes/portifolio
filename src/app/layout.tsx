import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ivo Netto | dev",
  description: "Meu portfólio pessoal",
  icons: {
    icon: "/logo-white.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo-white.ico" type="image/x-icon" />
      </head>
      <body>
        <div className="layout-container">
          {children}
        </div>
      </body>
    </html>
  );
}
