import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Gestão de Tarefas",
  description: "Criado por Nycollas Kaique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${urbanist.className} antialiased bg-neutral-50`}>
        {children}
      </body>
    </html>
  );
}
