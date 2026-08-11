import { getPessoaAtual } from "@/lib/auth";
import { getClubes, getDemandasDoMes, getMesesComDemandas, getPessoas } from "@/lib/queries";
import { mesAtualRef, mesSeguinteRef } from "@/lib/dates";
import QuadroClient from "@/components/QuadroClient";

export const dynamic = "force-dynamic";

export default async function QuadroPage({
  searchParams,
}: {
  searchParams: { mes?: string };
}) {
  const pessoa = await getPessoaAtual();
  const mesSelecionado = searchParams.mes || mesAtualRef();

  const [demandas, pessoas, clubes, mesesComDemandas] = await Promise.all([
    getDemandasDoMes(mesSelecionado),
    getPessoas(),
    getClubes(),
    getMesesComDemandas(),
  ]);

  const mesesDisponiveis = Array.from(
    new Set([mesAtualRef(), mesSeguinteRef(mesAtualRef()), mesSelecionado, ...mesesComDemandas])
  ).sort((a, b) => b.localeCompare(a));

  if (!pessoa) return null; // middleware já redireciona pra /login

  return (
    <QuadroClient
      key={mesSelecionado}
      pessoaAtual={pessoa}
      demandasIniciais={demandas}
      pessoas={pessoas}
      clubes={clubes}
      mesSelecionado={mesSelecionado}
      mesesDisponiveis={mesesDisponiveis}
    />
  );
}
