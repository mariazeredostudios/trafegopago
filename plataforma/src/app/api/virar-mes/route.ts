import { NextResponse } from "next/server";
import { getPessoaAtual, ehGestaoTrafego } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { addDias, mesAtualRef, mesSeguinteRef } from "@/lib/dates";
import type { Clube, DemandaTemplate, Pessoa } from "@/lib/types";

export async function GET(request: Request) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const mes = searchParams.get("mes") || mesSeguinteRef(mesAtualRef());

  const admin = createAdminClient();
  const [{ data: clubes, error: e1 }, { data: seletivas, error: e2 }] = await Promise.all([
    admin.from("clubes").select("*").eq("ativo", true).order("nome"),
    admin.from("seletivas").select("*").eq("mes_referencia", mes),
  ]);
  if (e1) return NextResponse.json({ erro: e1.message }, { status: 500 });
  if (e2) return NextResponse.json({ erro: e2.message }, { status: 500 });

  const porClube = new Map((seletivas ?? []).map((s) => [s.clube_id, s.data_seletiva as string]));
  const resultado = (clubes ?? []).map((c) => ({
    clube_id: c.id,
    nome: c.nome,
    data_seletiva: porClube.get(c.id) ?? null,
  }));

  return NextResponse.json({ mes, clubes: resultado });
}

export async function POST(request: Request) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  if (!ehGestaoTrafego(pessoa)) {
    return NextResponse.json({ erro: "Só a gestão de tráfego pago pode virar o mês." }, { status: 403 });
  }

  const body = await request.json();
  const mesReferencia: string = body?.mes_referencia || mesSeguinteRef(mesAtualRef());
  const seletivasInput: { clube_id: string; data_seletiva: string }[] = Array.isArray(body?.seletivas)
    ? body.seletivas.filter((s: any) => s?.clube_id && s?.data_seletiva)
    : [];

  if (seletivasInput.length === 0) {
    return NextResponse.json({ erro: "Informe ao menos uma data de seletiva." }, { status: 400 });
  }

  const admin = createAdminClient();

  const { error: upsertErro } = await admin
    .from("seletivas")
    .upsert(
      seletivasInput.map((s) => ({ clube_id: s.clube_id, mes_referencia: mesReferencia, data_seletiva: s.data_seletiva })),
      { onConflict: "clube_id,mes_referencia" }
    );
  if (upsertErro) return NextResponse.json({ erro: upsertErro.message }, { status: 500 });

  const [{ data: clubes, error: e1 }, { data: templates, error: e2 }, { data: pessoas, error: e3 }] = await Promise.all([
    admin.from("clubes").select("*"),
    admin.from("demanda_templates").select("*").eq("ativo", true).order("ordem"),
    admin.from("pessoas").select("*").eq("ativo", true),
  ]);
  if (e1) return NextResponse.json({ erro: e1.message }, { status: 500 });
  if (e2) return NextResponse.json({ erro: e2.message }, { status: 500 });
  if (e3) return NextResponse.json({ erro: e3.message }, { status: 500 });

  const clubesPorId = new Map<string, Clube>((clubes as Clube[]).map((c) => [c.id, c]));
  const pessoasPorFuncao = new Map<string, Pessoa[]>();
  for (const p of pessoas as Pessoa[]) {
    const lista = pessoasPorFuncao.get(p.funcao) ?? [];
    lista.push(p);
    pessoasPorFuncao.set(p.funcao, lista);
  }

  let criadas = 0;
  let puladas = 0;

  for (const entrada of seletivasInput) {
    const clube = clubesPorId.get(entrada.clube_id);
    if (!clube) continue;

    for (const template of templates as DemandaTemplate[]) {
      if (template.aplica_se && !(clube as any)[template.aplica_se]) continue;
      if (template.requer_organico && clube.sem_organico) continue;

      const titulo = template.titulo_padrao.replace("{clube}", clube.nome);

      const { data: existente } = await admin
        .from("demandas")
        .select("id")
        .eq("mes_referencia", mesReferencia)
        .eq("clube_id", clube.id)
        .eq("titulo", titulo)
        .maybeSingle();

      if (existente) {
        puladas++;
        continue;
      }

      const responsaveis = template.responsavel_funcao ? pessoasPorFuncao.get(template.responsavel_funcao) ?? [] : [];
      const responsavel_id = responsaveis.length === 1 ? responsaveis[0].id : null;

      const { data: demanda, error: erroInsercao } = await admin
        .from("demandas")
        .insert({
          titulo,
          descricao: template.descricao_padrao,
          tipo: template.tipo,
          clube_id: clube.id,
          responsavel_id,
          prioridade: template.prioridade,
          canal: template.canal,
          prazo: addDias(entrada.data_seletiva, template.dias_prazo_apos_seletiva),
          mes_referencia: mesReferencia,
        })
        .select("id")
        .single();

      if (erroInsercao || !demanda) {
        console.error("Erro ao criar demanda a partir de template:", erroInsercao);
        continue;
      }

      if (template.checklist_padrao?.length) {
        await admin.from("checklist_itens").insert(
          template.checklist_padrao.map((texto, i) => ({ demanda_id: demanda.id, texto, ordem: i }))
        );
      }

      criadas++;
    }
  }

  return NextResponse.json({ mes_referencia: mesReferencia, criadas, puladas });
}
