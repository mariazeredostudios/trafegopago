import { TIPO_LABEL, type Demanda } from "../types";

const COR_ACCENT = "#1F6E4A";
const COR_ACCENT_SOFT = "#E3EEE6";
const COR_INK = "#1B241E";
const COR_INK_MUTED = "#5B665E";
const COR_LINE = "#DCDFD6";
const COR_BG = "#F5F4EF";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "";
}

function wrapEmail(preheader: string, title: string, bodyHtml: string): string {
  const url = siteUrl();
  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:${COR_BG};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${COR_INK};">
    <span style="display:none;font-size:1px;color:${COR_BG};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COR_BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid ${COR_LINE};border-radius:10px;overflow:hidden;">
            <tr>
              <td style="background:${COR_ACCENT};padding:20px 28px;">
                <span style="color:#ffffff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;">Plataforma iEsports</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:${COR_INK};">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
            ${
              url
                ? `<tr><td style="padding:0 28px 28px;"><a href="${url}" style="display:inline-block;background:${COR_ACCENT};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:6px;">Abrir a plataforma</a></td></tr>`
                : ""
            }
            <tr>
              <td style="padding:16px 28px;border-top:1px solid ${COR_LINE};color:${COR_INK_MUTED};font-size:12px;">
                Enviado automaticamente pela plataforma de demandas. Dúvidas? fale com a Maria.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function itemLinha(titulo: string, meta: string): string {
  return `<tr>
    <td style="padding:10px 12px;border-bottom:1px solid ${COR_LINE};">
      <div style="font-size:14px;color:${COR_INK};font-weight:600;">${titulo}</div>
      <div style="font-size:12.5px;color:${COR_INK_MUTED};margin-top:2px;">${meta}</div>
    </td>
  </tr>`;
}

function tabela(rows: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COR_ACCENT_SOFT};border-radius:8px;overflow:hidden;margin-top:4px;">${rows}</table>`;
}

// ---------------------------------------------------------------------------
// Notificação de demanda concluída
// ---------------------------------------------------------------------------
export function buildConclusaoEmail(opts: {
  demanda: Pick<Demanda, "titulo" | "tipo">;
  responsavelNome: string;
  clubeNome: string | null;
}) {
  const { demanda, responsavelNome, clubeNome } = opts;
  const meta = [clubeNome, TIPO_LABEL[demanda.tipo]].filter(Boolean).join(" · ");
  const subject = `✅ ${responsavelNome} concluiu: ${demanda.titulo}`;
  const html = wrapEmail(
    subject,
    "Demanda concluída",
    `<p style="margin:0 0 14px;color:${COR_INK_MUTED};font-size:14px;">${responsavelNome} marcou uma demanda como concluída.</p>
     ${tabela(itemLinha(demanda.titulo, meta))}`
  );
  const text = `${responsavelNome} concluiu: ${demanda.titulo} (${meta})`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------
// Resumo diário (16h)
// ---------------------------------------------------------------------------
export interface GrupoResumo {
  pessoaNome: string;
  itens: { titulo: string; clubeNome: string | null; tipo: Demanda["tipo"] }[];
}

export function buildResumoDiarioEmail(opts: { dataRefLabel: string; grupos: GrupoResumo[] }) {
  const { dataRefLabel, grupos } = opts;
  const totalItens = grupos.reduce((acc, g) => acc + g.itens.length, 0);
  const subject = `📋 Resumo do dia ${dataRefLabel} — ${totalItens} demanda${totalItens === 1 ? "" : "s"} concluída${totalItens === 1 ? "" : "s"}`;

  const corpo =
    totalItens === 0
      ? `<p style="color:${COR_INK_MUTED};font-size:14px;">Ninguém marcou demandas como concluídas hoje.</p>`
      : grupos
          .filter((g) => g.itens.length > 0)
          .map(
            (g) => `
        <h2 style="font-size:14px;margin:20px 0 6px;color:${COR_INK};">${g.pessoaNome} <span style="color:${COR_INK_MUTED};font-weight:400;">(${g.itens.length})</span></h2>
        ${tabela(
          g.itens
            .map((it) => itemLinha(it.titulo, [it.clubeNome, TIPO_LABEL[it.tipo]].filter(Boolean).join(" · ")))
            .join("")
        )}`
          )
          .join("");

  const html = wrapEmail(
    subject,
    `Resumo do dia — ${dataRefLabel}`,
    `<p style="margin:0 0 4px;color:${COR_INK_MUTED};font-size:14px;">Tudo que a equipe concluiu hoje até às 16h.</p>${corpo}`
  );

  const text = [
    `Resumo do dia ${dataRefLabel}`,
    ...grupos
      .filter((g) => g.itens.length > 0)
      .flatMap((g) => [`\n${g.pessoaNome}:`, ...g.itens.map((it) => `  - ${it.titulo} (${it.clubeNome ?? "—"})`)]),
  ].join("\n");

  return { subject, html, text };
}

// ---------------------------------------------------------------------------
// Resumo semanal (segunda de manhã)
// ---------------------------------------------------------------------------
export interface ItemSemanal {
  titulo: string;
  clubeNome: string | null;
  tipo: Demanda["tipo"];
  pessoaNome: string;
  concluidoEmLabel: string;
}

export function buildResumoSemanalEmail(opts: { inicioLabel: string; fimLabel: string; itens: ItemSemanal[] }) {
  const { inicioLabel, fimLabel, itens } = opts;
  const subject = `🗓️ Resumo da semana (${inicioLabel} a ${fimLabel}) — ${itens.length} demanda${itens.length === 1 ? "" : "s"} concluída${itens.length === 1 ? "" : "s"}`;

  const corpo =
    itens.length === 0
      ? `<p style="color:${COR_INK_MUTED};font-size:14px;">Nenhuma demanda foi concluída nos últimos 7 dias.</p>`
      : tabela(
          itens
            .map((it) =>
              itemLinha(
                it.titulo,
                `${it.pessoaNome} · ${[it.clubeNome, TIPO_LABEL[it.tipo]].filter(Boolean).join(" · ")} · concluído em ${it.concluidoEmLabel}`
              )
            )
            .join("")
        );

  const html = wrapEmail(
    subject,
    `Resumo da semana — insumo para a reunião de segunda`,
    `<p style="margin:0 0 4px;color:${COR_INK_MUTED};font-size:14px;">Período: ${inicioLabel} a ${fimLabel}.</p>${corpo}`
  );

  const text = [
    `Resumo da semana (${inicioLabel} a ${fimLabel})`,
    ...itens.map((it) => `- ${it.titulo} · ${it.pessoaNome} · ${it.clubeNome ?? "—"} · concluído em ${it.concluidoEmLabel}`),
  ].join("\n");

  return { subject, html, text };
}
