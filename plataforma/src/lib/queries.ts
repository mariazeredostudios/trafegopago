import { createAdminClient } from "./supabase/admin";
import type { Clube, Demanda, Pessoa, Seletiva } from "./types";

export async function getPessoas(): Promise<Pessoa[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("pessoas").select("*").eq("ativo", true).order("nome");
  if (error) throw error;
  return data as Pessoa[];
}

export async function getClubes(): Promise<Clube[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("clubes").select("*").eq("ativo", true).order("nome");
  if (error) throw error;
  return data as Clube[];
}

export async function getEmailsGestaoTrafego(): Promise<string[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("pessoas")
    .select("email")
    .eq("funcao", "gestao_trafego")
    .eq("ativo", true);
  if (error) throw error;
  return (data ?? []).map((p) => p.email as string);
}

export async function getSeletivas(mesReferencia: string): Promise<Seletiva[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("seletivas").select("*").eq("mes_referencia", mesReferencia);
  if (error) throw error;
  return data as Seletiva[];
}

export async function getDemandasDoMes(mesReferencia: string): Promise<Demanda[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("demandas")
    .select("*, clube:clubes(*), responsavel:pessoas(*), checklist_itens(*)")
    .eq("mes_referencia", mesReferencia)
    .order("criado_em", { ascending: true });
  if (error) throw error;

  return (data as unknown as Demanda[]).map((d) => ({
    ...d,
    checklist_itens: (d.checklist_itens ?? []).slice().sort((a, b) => a.ordem - b.ordem),
  }));
}

export interface Resumo {
  id: string;
  tipo: "diario" | "semanal";
  referencia: string;
  conteudo_texto: string;
  enviado_para: string[];
  criado_em: string;
}

export async function getResumos(limite = 30): Promise<Resumo[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("resumos")
    .select("id, tipo, referencia, conteudo_texto, enviado_para, criado_em")
    .order("referencia", { ascending: false })
    .limit(limite);
  if (error) throw error;
  return data as Resumo[];
}

export async function getMesesComDemandas(): Promise<string[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("demandas")
    .select("mes_referencia")
    .order("mes_referencia", { ascending: false });
  if (error) throw error;
  return Array.from(new Set((data ?? []).map((d) => d.mes_referencia as string)));
}
