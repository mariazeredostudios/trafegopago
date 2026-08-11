import { NextResponse } from "next/server";
import { getPessoaAtual } from "@/lib/auth";
import { ehGestaoTrafego } from "@/lib/permissoes";
import { createAdminClient } from "@/lib/supabase/admin";

const CAMPOS_PERMITIDOS = [
  "sem_organico",
  "tem_app",
  "tem_email_marketing",
  "tem_whatsapp_desconto",
  "tem_collab_clube",
  "link_bio",
  "link_sympla",
  "observacoes",
] as const;

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  if (!ehGestaoTrafego(pessoa)) {
    return NextResponse.json({ erro: "Só a gestão de tráfego pago pode editar clubes." }, { status: 403 });
  }

  const body = await request.json();
  const atualizacoes: Record<string, unknown> = {};
  for (const campo of CAMPOS_PERMITIDOS) {
    if (campo in body) atualizacoes[campo] = body[campo];
  }
  if (Object.keys(atualizacoes).length === 0) {
    return NextResponse.json({ erro: "Nenhum campo válido para atualizar." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin.from("clubes").update(atualizacoes).eq("id", params.id).select("*").single();
  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });

  return NextResponse.json({ clube: data });
}
