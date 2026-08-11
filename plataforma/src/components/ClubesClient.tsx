"use client";

import { useState } from "react";
import { ehGestaoTrafego } from "@/lib/permissoes";
import type { Clube, Pessoa } from "@/lib/types";

const COLUNAS: { campo: keyof Clube; rotulo: string }[] = [
  { campo: "sem_organico", rotulo: "Sem orgânico" },
  { campo: "tem_collab_clube", rotulo: "Collab do clube" },
  { campo: "tem_email_marketing", rotulo: "E-mail marketing" },
  { campo: "tem_whatsapp_desconto", rotulo: "WhatsApp desconto" },
  { campo: "tem_app", rotulo: "Tem app" },
];

export default function ClubesClient({ pessoaAtual, clubesIniciais }: { pessoaAtual: Pessoa; clubesIniciais: Clube[] }) {
  const [clubes, setClubes] = useState(clubesIniciais);
  const podeEditar = ehGestaoTrafego(pessoaAtual);

  async function alternar(clube: Clube, campo: keyof Clube) {
    if (!podeEditar) return;
    const novoValor = !clube[campo];
    setClubes((atual) => atual.map((c) => (c.id === clube.id ? { ...c, [campo]: novoValor } : c)));

    await fetch(`/api/clubes/${clube.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [campo]: novoValor }),
    });
  }

  return (
    <div>
      <div className="eyebrow">Personalização</div>
      <h1 style={{ fontSize: 22, margin: "6px 0 4px" }}>Clubes</h1>
      <p style={{ fontSize: 13.5, color: "var(--ink-muted)", margin: "0 0 20px", maxWidth: 640 }}>
        Essas marcações alimentam a rotina de <strong>Virar o mês</strong>: só geram demanda de e-mail marketing,
        arte de WhatsApp ou material de app para o clube que tiver o campo correspondente marcado.
        {!podeEditar && " Somente a gestão de tráfego pago pode editar."}
      </p>

      <div className="tabela-wrap">
        <table>
          <thead>
            <tr>
              <th>Clube</th>
              {COLUNAS.map((c) => (
                <th key={String(c.campo)}>{c.rotulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clubes.map((clube) => (
              <tr key={clube.id}>
                <td style={{ fontWeight: 700 }}>{clube.nome}</td>
                {COLUNAS.map((c) => (
                  <td key={String(c.campo)}>
                    <input
                      type="checkbox"
                      checked={Boolean(clube[c.campo])}
                      disabled={!podeEditar}
                      onChange={() => alternar(clube, c.campo)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
