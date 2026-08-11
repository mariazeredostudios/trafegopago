import { getPessoaAtual } from "@/lib/auth";
import { ehGestaoTrafego } from "@/lib/permissoes";
import { getClubes, getSeletivas } from "@/lib/queries";
import { mesAtualRef, mesLabel, mesSeguinteRef } from "@/lib/dates";
import VirarMesClient from "@/components/VirarMesClient";

export const dynamic = "force-dynamic";

export default async function VirarMesPage({ searchParams }: { searchParams: { mes?: string } }) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return null;

  const mes = searchParams.mes || mesSeguinteRef(mesAtualRef());

  if (!ehGestaoTrafego(pessoa)) {
    return (
      <div className="card" style={{ padding: 24, maxWidth: 480 }}>
        <h1 style={{ fontSize: 18, marginTop: 0 }}>Acesso restrito</h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-muted)" }}>
          Só a gestão de tráfego pago pode virar o mês (isso gera as demandas recorrentes de todos os clubes de uma vez).
        </p>
      </div>
    );
  }

  const [clubes, seletivas] = await Promise.all([getClubes(), getSeletivas(mes)]);
  const dataPorClube = new Map(seletivas.map((s) => [s.clube_id, s.data_seletiva]));

  return (
    <VirarMesClient
      mes={mes}
      mesRotulo={mesLabel(mes)}
      clubes={clubes.map((c) => ({ id: c.id, nome: c.nome, sem_organico: c.sem_organico, data_seletiva: dataPorClube.get(c.id) ?? "" }))}
    />
  );
}
