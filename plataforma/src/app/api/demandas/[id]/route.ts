import { NextResponse } from "next/server";
import { getPessoaAtual } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getEmailsGestaoTrafego } from "@/lib/queries";
import { sendEmail } from "@/lib/email/resend";
import { buildConclusaoEmail } from "@/lib/email/templates";
import type { StatusDemanda } from "@/lib/types";

const CAMPOS_PERMITIDOS = [
  "titulo",
  "descricao",
  "tipo",
  "clube_id",
  "responsavel_id",
  "status",
  "prioridade",
  "canal",
  "prazo",
] as const;

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

  const body = await request.json();
  const atualizacoes: Record<string, unknown> = {};
  for (const campo of CAMPOS_PERMITIDOS) {
    if (campo in body) atualizacoes[campo] = body[campo];
  }

  if (Object.keys(atualizacoes).length === 0) {
    return NextResponse.json({ erro: "Nenhum campo válido para atualizar." }, { status: 400 });
  }

  const admin = createAdminClient();

  const novoStatus = atualizacoes.status as StatusDemanda | undefined;
  if (novoStatus) {
    atualizacoes.concluido_em = novoStatus === "concluido" ? new Date().toISOString() : null;
  }

  const { data: demanda, error } = await admin
    .from("demandas")
    .update(atualizacoes)
    .eq("id", params.id)
    .select("*, clube:clubes(nome), responsavel:pessoas(nome)")
    .single();

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });

  if (novoStatus === "concluido") {
    try {
      const destinatarios = await getEmailsGestaoTrafego();
      const { subject, html, text } = buildConclusaoEmail({
        demanda,
        responsavelNome: demanda.responsavel?.nome ?? pessoa.nome,
        clubeNome: demanda.clube?.nome ?? null,
      });
      await sendEmail({ to: destinatarios, subject, html, text });
    } catch (e) {
      // Não falha a atualização por causa do e-mail — só loga.
      console.error("Falha ao enviar e-mail de conclusão:", e);
    }
  }

  return NextResponse.json({ demanda });
}
