import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${urbanist.className} antialiased bg-neutral-50`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
