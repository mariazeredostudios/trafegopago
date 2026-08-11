"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ehGestaoTrafego } from "@/lib/permissoes";
import { STATUS_LABEL, type Clube, type Demanda, type Pessoa, type StatusDemanda } from "@/lib/types";
import { mesLabel } from "@/lib/dates";
import DemandaCard from "./DemandaCard";
import DemandaModal from "./DemandaModal";
import NovaDemandaModal from "./NovaDemandaModal";

const COLUNAS: StatusDemanda[] = ["a_fazer", "em_andamento", "em_revisao", "concluido"];

const COR_COLUNA: Record<StatusDemanda, string> = {
  a_fazer: "var(--red)",
  em_andamento: "var(--gold)",
  em_revisao: "var(--purple)",
  concluido: "var(--accent)",
};

const FUNDO_COLUNA: Record<StatusDemanda, string> = {
  a_fazer: "var(--red-soft)",
  em_andamento: "var(--gold-soft)",
  em_revisao: "var(--purple-soft)",
  concluido: "var(--accent-soft)",
};

export default function QuadroClient({
  pessoaAtual,
  demandasIniciais,
  pessoas,
  clubes,
  mesSelecionado,
  mesesDisponiveis,
}: {
  pessoaAtual: Pessoa;
  demandasIniciais: Demanda[];
  pessoas: Pessoa[];
  clubes: Clube[];
  mesSelecionado: string;
  mesesDisponiveis: string[];
}) {
  const router = useRouter();
  const [demandas, setDemandas] = useState<Demanda[]>(demandasIniciais);
  const [demandaAbertaId, setDemandaAbertaId] = useState<string | null>(null);
  const [novaAberta, setNovaAberta] = useState(false);
  const [filtroClube, setFiltroClube] = useState("");
  const [filtroResponsavel, setFiltroResponsavel] = useState("");

  const isGestao = ehGestaoTrafego(pessoaAtual);

  const demandasFiltradas = useMemo(
    () =>
      demandas.filter(
        (d) =>
          (!filtroClube || d.clube_id === filtroClube) &&
          (!filtroResponsavel || d.responsavel_id === filtroResponsavel)
      ),
    [demandas, filtroClube, filtroResponsavel]
  );

  const porColuna = useMemo(() => {
    const mapa: Record<StatusDemanda, Demanda[]> = { a_fazer: [], em_andamento: [], em_revisao: [], concluido: [] };
    for (const d of demandasFiltradas) mapa[d.status].push(d);
    return mapa;
  }, [demandasFiltradas]);

  function atualizarDemandaLocal(demandaAtualizada: Partial<Demanda> & { id: string }) {
    setDemandas((atual) =>
      atual.map((d) => (d.id === demandaAtualizada.id ? { ...d, ...demandaAtualizada } : d))
    );
  }

  function adicionarDemandaLocal(demanda: Demanda) {
    setDemandas((atual) => [...atual, demanda]);
  }

  const demandaAberta = demandas.find((d) => d.id === demandaAbertaId) ?? null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <div className="eyebrow">Quadro de demandas</div>
          <h1 style={{ fontSize: 22, margin: "6px 0 0", textTransform: "capitalize" }}>{mesLabel(mesSelecionado)}</h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <select value={mesSelecionado} onChange={(e) => router.push(`/quadro?mes=${e.target.value}`)}>
            {mesesDisponiveis.map((m) => (
              <option key={m} value={m}>
                {mesLabel(m)}
              </option>
            ))}
          </select>
          <select value={filtroClube} onChange={(e) => setFiltroClube(e.target.value)}>
            <option value="">Todos os clubes</option>
            {clubes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
          <select value={filtroResponsavel} onChange={(e) => setFiltroResponsavel(e.target.value)}>
            <option value="">Toda a equipe</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
          {isGestao && (
            <Link href="/virar-mes" className="btn">
              🔁 Virar o mês
            </Link>
          )}
          <button className="btn btn-primary" onClick={() => setNovaAberta(true)}>
            + Nova demanda
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 14,
          alignItems: "start",
        }}
      >
        {COLUNAS.map((status) => (
          <div key={status} className="card" style={{ overflow: "hidden" }}>
            <div
              style={{
                padding: "10px 14px",
                background: FUNDO_COLUNA[status],
                color: COR_COLUNA[status],
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{STATUS_LABEL[status]}</span>
              <span>{porColuna[status].length}</span>
            </div>
            <div style={{ padding: 10, display: "grid", gap: 8, minHeight: 60 }}>
              {porColuna[status].length === 0 && (
                <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "8px 4px" }}>Nada por aqui.</p>
              )}
              {porColuna[status].map((d) => (
                <DemandaCard key={d.id} demanda={d} onAbrir={() => setDemandaAbertaId(d.id)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {demandaAberta && (
        <DemandaModal
          demanda={demandaAberta}
          pessoas={pessoas}
          onFechar={() => setDemandaAbertaId(null)}
          onAtualizar={atualizarDemandaLocal}
        />
      )}

      {novaAberta && (
        <NovaDemandaModal
          pessoas={pessoas}
          clubes={clubes}
          mesReferencia={mesSelecionado}
          onFechar={() => setNovaAberta(false)}
          onCriada={(d) => {
            adicionarDemandaLocal(d);
            setNovaAberta(false);
          }}
        />
      )}
    </div>
  );
}
