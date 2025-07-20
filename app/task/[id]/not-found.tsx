"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

export default function GlobalError() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-3xl">Erro!</h1>
      <p>Um erro inesperado aconteceu, por favor retorne para a home.</p>
      <Button variant={"outline"} className="mb-4">
        <Link href="/" className="flex items-center gap-2 text-sm">
          <House />
          Voltar à Home
        </Link>
      </Button>
    </div>
  );
}
