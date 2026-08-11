import { NextResponse } from "next/server";
import { segredoCronValido } from "@/lib/cron-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getEmailsGestaoTrafego } from "@/lib/queries";
import { sendEmail } from "@/lib/email/resend";
import { buildResumoSemanalEmail, type ItemSemanal } from "@/lib/email/templates";
import { diaBoundsUtc, formatarDataHoraPtBr, formatarDataPtBr, ultimos7DiasRange } from "@/lib/dates";

export async function POST(request: Request) {
  if (!segredoCronValido(request)) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }

  const { inicio, fim } = ultimos7DiasRange();
  const inicioUtc = diaBoundsUtc(inicio).inicio;
  const fimUtc = diaBoundsUtc(fim).fim;

  const admin = createAdminClient();
  const { data: demandas, error } = await admin
    .from("demandas")
    .select("titulo, tipo, concluido_em, clube:clubes(nome), responsavel:pessoas(nome)")
    .eq("status", "concluido")
    .gte("concluido_em", inicioUtc)
    .lte("concluido_em", fimUtc)
    .order("concluido_em", { ascending: true });

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });

  const itens: ItemSemanal[] = (demandas ?? []).map((d: any) => ({
    titulo: d.titulo,
    clubeNome: d.clube?.nome ?? null,
    tipo: d.tipo,
    pessoaNome: d.responsavel?.nome ?? "Sem responsável definido",
    concluidoEmLabel: formatarDataHoraPtBr(d.concluido_em),
  }));

  const { subject, html, text } = buildResumoSemanalEmail({
    inicioLabel: formatarDataPtBr(inicio),
    fimLabel: formatarDataPtBr(fim),
    itens,
  });
  const destinatarios = await getEmailsGestaoTrafego();

  await sendEmail({ to: destinatarios, subject, html, text });

  await admin.from("resumos").insert({
    tipo: "semanal",
    referencia: fim,
    conteudo_html: html,
    conteudo_texto: text,
    enviado_para: destinatarios,
  });

  return NextResponse.json({ enviado: true, totalItens: itens.length });
}
