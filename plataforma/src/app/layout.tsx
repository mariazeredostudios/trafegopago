import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { getPessoaAtual } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Plataforma iEsports — Demandas",
  description: "Quadro de demandas mensais da equipe de marketing.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pessoa = await getPessoaAtual();

  return (
    <html lang="pt-BR">
      <body>
        {pessoa && <Nav pessoa={pessoa} />}
        <div className="shell">{children}</div>
      </body>
    </html>
  );
}
