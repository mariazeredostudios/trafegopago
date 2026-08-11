import { getPessoaAtual } from "@/lib/auth";
import { getClubes } from "@/lib/queries";
import ClubesClient from "@/components/ClubesClient";

export const dynamic = "force-dynamic";

export default async function ClubesPage() {
  const pessoa = await getPessoaAtual();
  const clubes = await getClubes();
  if (!pessoa) return null;

  return <ClubesClient pessoaAtual={pessoa} clubesIniciais={clubes} />;
}
