"use client";

import { useState } from "react";
import { formatarDataHoraPtBr, formatarDataPtBr } from "@/lib/dates";
import { STATUS_LABEL, TIPO_LABEL, type ChecklistItem, type Demanda, type Pessoa, type StatusDemanda } from "@/lib/types";

export default function DemandaModal({
  demanda,
  pessoas,
  onFechar,
  onAtualizar,
}: {
  demanda: Demanda;
  pessoas: Pessoa[];
  onFechar: () => void;
  onAtualizar: (d: Partial<Demanda> & { id: string }) => void;
}) {
  const [salvando, setSalvando] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(demanda.checklist_itens ?? []);

  async function salvarCampo(campo: string, valor: unknown) {
    setSalvando(true);
    try {
      const resp = await fetch(`/api/demandas/${demanda.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [campo]: valor }),
      });
      const dados = await resp.json();
      if (resp.ok) {
        onAtualizar({ id: demanda.id, ...dados.demanda });
      }
    } finally {
      setSalvando(false);
    }
  }

  async function alternarChecklist(item: ChecklistItem) {
    const novoValor = !item.feito;
    setChecklist((atual) => atual.map((i) => (i.id === item.id ? { ...i, feito: novoValor } : i)));
    const resp = await fetch(`/api/checklist/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feito: novoValor }),
    });
    if (resp.ok) {
      const atualizados = checklist.map((i) => (i.id === item.id ? { ...i, feito: novoValor } : i));
      onAtualizar({ id: demanda.id, checklist_itens: atualizados });
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onFechar}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 20, 16, 0.45)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{ width: "100%", maxWidth: 480, maxHeight: "88vh", overflowY: "auto", padding: 24 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div className="eyebrow">{[demanda.clube?.nome, TIPO_LABEL[demanda.tipo]].filter(Boolean).join(" · ")}</div>
            <h2 style={{ fontSize: 18, margin: "6px 0 0" }}>{demanda.titulo}</h2>
          </div>
          <button className="btn btn-sm" onClick={onFechar} aria-label="Fechar">
            ✕
          </button>
        </div>

        {demanda.descricao && <p style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 12 }}>{demanda.descricao}</p>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <label>Status</label>
            <select
              defaultValue={demanda.status}
              disabled={salvando}
              onChange={(e) => salvarCampo("status", e.target.value as StatusDemanda)}
            >
              {Object.entries(STATUS_LABEL).map(([valor, rotulo]) => (
                <option key={valor} value={valor}>
                  {rotulo}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label>Responsável</label>
            <select
              defaultValue={demanda.responsavel_id ?? ""}
              disabled={salvando}
              onChange={(e) => salvarCampo("responsavel_id", e.target.value || null)}
            >
              <option value="">Sem responsável</option>
              {pessoas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label>Prioridade</label>
            <select defaultValue={demanda.prioridade} disabled={salvando} onChange={(e) => salvarCampo("prioridade", e.target.value)}>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label>Prazo</label>
            <input
              type="date"
              defaultValue={demanda.prazo ?? ""}
              disabled={salvando}
              onChange={(e) => salvarCampo("prazo", e.target.value || null)}
            />
          </div>
        </div>

        {checklist.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <label>Checklist</label>
            <div style={{ display: "grid", gap: 6, marginTop: 6 }}>
              {checklist
                .slice()
                .sort((a, b) => a.ordem - b.ordem)
                .map((item) => (
                  <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink)", fontWeight: 400, cursor: "pointer" }}>
                    <input type="checkbox" checked={item.feito} onChange={() => alternarChecklist(item)} />
                    <span style={{ textDecoration: item.feito ? "line-through" : "none", color: item.feito ? "var(--ink-faint)" : "var(--ink)" }}>
                      {item.texto}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--line)", fontSize: 11.5, color: "var(--ink-faint)", display: "grid", gap: 2 }}>
          {demanda.prazo && <span>Prazo: {formatarDataPtBr(demanda.prazo)}</span>}
          {demanda.concluido_em && <span>Concluído em: {formatarDataHoraPtBr(demanda.concluido_em)}</span>}
        </div>
      </div>
    </div>
  );
}
