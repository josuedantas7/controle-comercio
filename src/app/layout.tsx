import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"

import Header from "@/components/Header/Header"

export const metadata: Metadata = {
  title: "Controle Comércio",
  description: "Web app para controlar divídas de clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"min-h-screen bg-background font-sans antialiased"}>
        <Toaster />
        <main>
          <Header />
          {children}
        </main>  
      </body>
    </html>
  );
}
