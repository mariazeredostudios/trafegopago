"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para o navegador — usado só na tela de login
 * (signInWithPassword / signOut). A anon key é segura para expor no
 * navegador (é o design do Supabase); RLS "negar por padrão" garante que
 * mesmo com ela ninguém lê/escreve dado de negócio direto do navegador.
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
