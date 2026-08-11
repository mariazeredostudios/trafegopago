import { NextResponse } from "next/server";
import { segredoCronValido } from "@/lib/cron-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getEmailsGestaoTrafego } from "@/lib/queries";
import { sendEmail } from "@/lib/email/resend";
import { buildResumoDiarioEmail, type GrupoResumo } from "@/lib/email/templates";
import { diaBoundsUtc, formatarDataPtBr, hojeRef } from "@/lib/dates";

export async function POST(request: Request) {
  if (!segredoCronValido(request)) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }

  const hoje = hojeRef();
  const { inicio, fim } = diaBoundsUtc(hoje);

  const admin = createAdminClient();
  const { data: demandas, error } = await admin
    .from("demandas")
    .select("titulo, tipo, clube:clubes(nome), responsavel:pessoas(nome)")
    .eq("status", "concluido")
    .gte("concluido_em", inicio)
    .lte("concluido_em", fim);

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });

  const porPessoa = new Map<string, GrupoResumo>();
  for (const d of demandas ?? []) {
    const nome = (d as any).responsavel?.nome ?? "Sem responsável definido";
    if (!porPessoa.has(nome)) porPessoa.set(nome, { pessoaNome: nome, itens: [] });
    porPessoa.get(nome)!.itens.push({
      titulo: (d as any).titulo,
      clubeNome: (d as any).clube?.nome ?? null,
      tipo: (d as any).tipo,
    });
  }
  const grupos = Array.from(porPessoa.values()).sort((a, b) => b.itens.length - a.itens.length);

  const { subject, html, text } = buildResumoDiarioEmail({ dataRefLabel: formatarDataPtBr(hoje), grupos });
  const destinatarios = await getEmailsGestaoTrafego();

  await sendEmail({ to: destinatarios, subject, html, text });

  await admin.from("resumos").insert({
    tipo: "diario",
    referencia: hoje,
    conteudo_html: html,
    conteudo_texto: text,
    enviado_para: destinatarios,
  });

  return NextResponse.json({ enviado: true, totalItens: demandas?.length ?? 0 });
}
