import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header/Header"

import AuthProvider from "@/contexts/AuthContext";
import ContainerLogged from "@/components/ContainerLogged/ContainerLogged";
import Notifier from "@/components/Notifier/Toast";

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
        <main>
          <Notifier/>
          <AuthProvider>
            <ContainerLogged>
              <Header />
              {children}
            </ContainerLogged>
          </AuthProvider>
        </main>  
      </body>
    </html>
  );
}
