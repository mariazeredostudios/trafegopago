import { cache } from "react";
import { createServerSupabaseClient } from "./supabase/server";
import { createAdminClient } from "./supabase/admin";
import type { Pessoa } from "./types";

export { ehGestaoTrafego } from "./permissoes";

/**
 * Retorna a pessoa da equipe correspondente ao usuário logado no momento
 * (casando pelo e-mail), ou null se não houver sessão ou o e-mail não
 * estiver cadastrado em `pessoas`. Usar em Server Components/Route
 * Handlers para checar quem está pedindo a ação — nunca confiar em nada
 * vindo do corpo da requisição para decidir permissão.
 *
 * `cache()` faz o React deduplicar chamadas dentro do mesmo request (ex.:
 * layout.tsx e a page.tsx da rota chamam isso sem duplicar a consulta).
 */
export const getPessoaAtual = cache(async (): Promise<Pessoa | null> => {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const admin = createAdminClient();
  const { data } = await admin
    .from("pessoas")
    .select("*")
    .eq("email", user.email)
    .eq("ativo", true)
    .maybeSingle();

  return (data as Pessoa) ?? null;
});
