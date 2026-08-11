import { createClient } from "@supabase/supabase-js";

/**
 * Cliente com a service role key — só pode ser importado em código que
 * roda no servidor (Route Handlers, Server Components, scripts de cron).
 * Ignora RLS por definição, então é o único cliente que de fato lê/escreve
 * nas tabelas da plataforma. NUNCA importar isto em um Client Component
 * ("use client") nem expor SUPABASE_SERVICE_ROLE_KEY como NEXT_PUBLIC_.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Faltam variáveis de ambiente do Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
