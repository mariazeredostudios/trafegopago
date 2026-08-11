import { getResumos } from "@/lib/queries";
import { formatarDataHoraPtBr, formatarDataPtBr } from "@/lib/dates";

export const dynamic = "force-dynamic";

const ROTULO_TIPO: Record<string, string> = {
  diario: "Resumo diário (16h)",
  semanal: "Resumo semanal (segunda de manhã)",
};

export default async function RelatoriosPage() {
  const resumos = await getResumos();

  return (
    <div>
      <div className="eyebrow">Histórico</div>
      <h1 style={{ fontSize: 22, margin: "6px 0 4px" }}>Relatórios</h1>
      <p style={{ fontSize: 13.5, color: "var(--ink-muted)", margin: "0 0 20px", maxWidth: 640 }}>
        Cada resumo diário (16h) e semanal (segunda de manhã) enviado por e-mail também fica salvo aqui.
      </p>

      {resumos.length === 0 && (
        <p style={{ fontSize: 13.5, color: "var(--ink-faint)" }}>
          Nenhum resumo gerado ainda — os workflows agendados do GitHub Actions criam o primeiro automaticamente.
        </p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {resumos.map((r) => (
          <details key={r.id} className="card" style={{ padding: "14px 18px" }}>
            <summary style={{ cursor: "pointer", fontSize: 13.5, fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
              <span>
                {ROTULO_TIPO[r.tipo] ?? r.tipo} — {formatarDataPtBr(r.referencia)}
              </span>
              <span style={{ color: "var(--ink-faint)", fontWeight: 400 }}>{formatarDataHoraPtBr(r.criado_em)}</span>
            </summary>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, color: "var(--ink-muted)", marginTop: 12, fontFamily: "inherit" }}>
              {r.conteudo_texto}
            </pre>
            <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 8 }}>
              Enviado para: {r.enviado_para.join(", ") || "—"}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
