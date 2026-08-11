"use client";

import { useState } from "react";
import { TIPO_LABEL, type Clube, type Demanda, type Pessoa, type TipoDemanda } from "@/lib/types";

const TIPOS = Object.keys(TIPO_LABEL) as TipoDemanda[];

export default function NovaDemandaModal({
  pessoas,
  clubes,
  mesReferencia,
  onFechar,
  onCriada,
}: {
  pessoas: Pessoa[];
  clubes: Clube[];
  mesReferencia: string;
  onFechar: () => void;
  onCriada: (demanda: Demanda) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<TipoDemanda>("outro");
  const [clubeId, setClubeId] = useState("");
  const [responsavelId, setResponsavelId] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [prazo, setPrazo] = useState("");
  const [checklistTexto, setChecklistTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) return;
    setEnviando(true);
    setErro(null);

    const checklist = checklistTexto
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const resp = await fetch("/api/demandas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        descricao: descricao || null,
        tipo,
        clube_id: clubeId || null,
        responsavel_id: responsavelId || null,
        prioridade,
        prazo: prazo || null,
        mes_referencia: mesReferencia,
        checklist,
      }),
    });

    const dados = await resp.json();
    setEnviando(false);

    if (!resp.ok) {
      setErro(dados?.erro ?? "Não foi possível criar a demanda.");
      return;
    }

    onCriada({ ...dados.demanda, checklist_itens: checklist.map((texto, i) => ({ id: `local-${i}`, demanda_id: dados.demanda.id, texto, feito: false, ordem: i })) });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onFechar}
      style={{ position: "fixed", inset: 0, background: "rgba(15, 20, 16, 0.45)", display: "grid", placeItems: "center", padding: 16, zIndex: 50 }}
    >
      <form onClick={(e) => e.stopPropagation()} onSubmit={salvar} className="card" style={{ width: "100%", maxWidth: 460, maxHeight: "88vh", overflowY: "auto", padding: 24, display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Nova demanda</h2>
          <button type="button" className="btn btn-sm" onClick={onFechar} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label htmlFor="titulo">Título</label>
          <input id="titulo" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label htmlFor="descricao">Descrição (opcional)</label>
          <textarea id="descricao" rows={2} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as TipoDemanda)}>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {TIPO_LABEL[t]}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor="clube">Clube</label>
            <select id="clube" value={clubeId} onChange={(e) => setClubeId(e.target.value)}>
              <option value="">— nenhum —</option>
              {clubes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor="responsavel">Responsável</label>
            <select id="responsavel" value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)}>
              <option value="">Sem responsável</option>
              {pessoas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor="prioridade">Prioridade</label>
            <select id="prioridade" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor="prazo">Prazo</label>
            <input id="prazo" type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
          </div>
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label htmlFor="checklist">Checklist (um item por linha, opcional)</label>
          <textarea id="checklist" rows={3} value={checklistTexto} onChange={(e) => setChecklistTexto(e.target.value)} placeholder={"Ex.:\nArte no Canva\nAprovada pela Maria"} />
        </div>

        {erro && (
          <p role="alert" style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>
            {erro}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? "Criando…" : "Criar demanda"}
        </button>
      </form>
    </div>
  );
}
