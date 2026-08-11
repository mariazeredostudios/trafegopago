import { NextResponse } from "next/server";
import { getPessoaAtual } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const pessoa = await getPessoaAtual();
  if (!pessoa) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

  const { feito } = await request.json();
  if (typeof feito !== "boolean") {
    return NextResponse.json({ erro: "'feito' precisa ser boolean." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("checklist_itens")
    .update({ feito })
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
