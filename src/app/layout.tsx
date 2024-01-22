import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Controle Comércio",
  description: "Web app para controlar dívidas de clientes",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout: React.FC = ({ children }) => (
  <html lang="en">
    <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <Toaster />
      <main>
        <Header />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
