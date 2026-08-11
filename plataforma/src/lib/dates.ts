export const TZ = "America/Sao_Paulo";

/** 'AAAA-MM' do mês atual, no fuso do negócio. */
export function mesAtualRef(base: Date = new Date()): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(base);
  const ano = partes.find((p) => p.type === "year")!.value;
  const mes = partes.find((p) => p.type === "month")!.value;
  return `${ano}-${mes}`;
}

/** 'AAAA-MM' do mês seguinte a uma referência 'AAAA-MM'. */
export function mesSeguinteRef(ref: string): string {
  const [ano, mes] = ref.split("-").map(Number);
  const d = new Date(Date.UTC(ano, mes, 1)); // mes (0-based) + 1 = já é o mês seguinte
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function mesLabel(ref: string): string {
  const [ano, mes] = ref.split("-").map(Number);
  const d = new Date(Date.UTC(ano, mes - 1, 1));
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

/** Soma dias a uma data 'AAAA-MM-DD', retornando 'AAAA-MM-DD'. */
export function addDias(dataIso: string, dias: number): string {
  const [ano, mes, dia] = dataIso.split("-").map(Number);
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

export function formatarDataPtBr(dataIso: string | null): string {
  if (!dataIso) return "—";
  const [ano, mes, dia] = dataIso.slice(0, 10).split("-").map(Number);
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(d);
}

export function formatarDataHoraPtBr(dataIso: string | null): string {
  if (!dataIso) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(dataIso));
}

/** Início (segunda) e fim (domingo) dos últimos 7 dias corridos, no fuso do negócio, como 'AAAA-MM-DD'. */
export function ultimos7DiasRange(base: Date = new Date()): { inicio: string; fim: string } {
  const hojeStr = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(base); // AAAA-MM-DD
  const fim = hojeStr;
  const inicio = addDias(hojeStr, -6);
  return { inicio, fim };
}

/** 'AAAA-MM-DD' de hoje no fuso do negócio. */
export function hojeRef(base: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(base);
}

/**
 * Início/fim (ISO UTC) de um dia 'AAAA-MM-DD' no fuso do negócio.
 * Usa offset fixo -03:00: o Brasil aboliu o horário de verão em 2019, então
 * America/Sao_Paulo é UTC-3 o ano inteiro.
 */
export function diaBoundsUtc(diaIso: string): { inicio: string; fim: string } {
  return {
    inicio: new Date(`${diaIso}T00:00:00-03:00`).toISOString(),
    fim: new Date(`${diaIso}T23:59:59.999-03:00`).toISOString(),
  };
}
