"use client";

import { formatarDataPtBr } from "@/lib/dates";
import { PRIORIDADE_LABEL, TIPO_LABEL, type Demanda } from "@/lib/types";

const COR_PRIORIDADE: Record<string, string> = {
  alta: "var(--red)",
  media: "var(--gold)",
  baixa: "var(--ink-faint)",
};

export default function DemandaCard({ demanda, onAbrir }: { demanda: Demanda; onAbrir: () => void }) {
  const checklist = demanda.checklist_itens ?? [];
  const feitos = checklist.filter((i) => i.feito).length;

  return (
    <button
      onClick={onAbrir}
      style={{
        textAlign: "left",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        padding: "10px 12px",
        cursor: "pointer",
        display: "grid",
        gap: 6,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{demanda.titulo}</span>
        <span
          className="pill"
          style={{ background: "transparent", color: COR_PRIORIDADE[demanda.prioridade], border: `1px solid ${COR_PRIORIDADE[demanda.prioridade]}` }}
        >
          {PRIORIDADE_LABEL[demanda.prioridade]}
        </span>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>
        {[demanda.clube?.nome, TIPO_LABEL[demanda.tipo]].filter(Boolean).join(" · ")}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-faint)" }}>
        <span>{demanda.responsavel?.nome ?? "Sem responsável"}</span>
        <span>{demanda.prazo ? `prazo ${formatarDataPtBr(demanda.prazo)}` : ""}</span>
      </div>
      {checklist.length > 0 && (
        <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>
          ✅ {feitos}/{checklist.length}
        </div>
      )}
    </button>
  );
}
