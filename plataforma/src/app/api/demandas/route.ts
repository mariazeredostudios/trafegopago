import { NextResponse } from "next/server";
import { getPessoaAtual } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDemandasDoMes } from "@/lib/queries";
import { mesAtualRef } from "@/lib/dates";

export async function GET(request: Request) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const mes = searchParams.get("mes") || mesAtualRef();

  const demandas = await getDemandasDoMes(mes);
  return NextResponse.json({ demandas, mes });
}

export async function POST(request: Request) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

  const body = await request.json();
  const {
    titulo,
    descricao,
    tipo,
    clube_id,
    responsavel_id,
    prioridade,
    canal,
    prazo,
    mes_referencia,
    checklist,
  } = body ?? {};

  if (!titulo || !tipo || !mes_referencia) {
    return NextResponse.json({ erro: "titulo, tipo e mes_referencia são obrigatórios." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: demanda, error } = await admin
    .from("demandas")
    .insert({
      titulo,
      descricao: descricao ?? null,
      tipo,
      clube_id: clube_id ?? null,
      responsavel_id: responsavel_id ?? null,
      prioridade: prioridade ?? "media",
      canal: canal ?? null,
      prazo: prazo ?? null,
      mes_referencia,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });

  const itensChecklist: string[] = Array.isArray(checklist) ? checklist : [];
  if (itensChecklist.length > 0) {
    await admin.from("checklist_itens").insert(
      itensChecklist.map((texto, i) => ({ demanda_id: demanda.id, texto, ordem: i }))
    );
  }

  return NextResponse.json({ demanda }, { status: 201 });
}
