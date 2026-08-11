import type { Pessoa } from "./types";

/**
 * Sem dependências de servidor (next/headers) de propósito — pode ser
 * importado tanto em Server quanto em Client Components.
 */
export function ehGestaoTrafego(pessoa: Pessoa | null): boolean {
  return pessoa?.funcao === "gestao_trafego";
}
