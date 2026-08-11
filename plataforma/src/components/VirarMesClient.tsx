"use client";

import { useState } from "react";
import Link from "next/link";

interface LinhaClube {
  id: string;
  nome: string;
  sem_organico: boolean;
  data_seletiva: string;
}

export default function VirarMesClient({
  mes,
  mesRotulo,
  clubes,
}: {
  mes: string;
  mesRotulo: string;
  clubes: LinhaClube[];
}) {
  const [datas, setDatas] = useState<Record<string, string>>(
    Object.fromEntries(clubes.map((c) => [c.id, c.data_seletiva]))
  );
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ criadas: number; puladas: number } | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function gerar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    setResultado(null);

    const seletivas = Object.entries(datas)
      .filter(([, data]) => Boolean(data))
      .map(([clube_id, data_seletiva]) => ({ clube_id, data_seletiva }));

    const resp = await fetch("/api/virar-mes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mes_referencia: mes, seletivas }),
    });
    const dados = await resp.json();
    setEnviando(false);

    if (!resp.ok) {
      setErro(dados?.erro ?? "Não foi possível virar o mês.");
      return;
    }
    setResultado(dados);
  }

  return (
    <div>
      <div className="eyebrow">Virada de mês</div>
      <h1 style={{ fontSize: 22, margin: "6px 0 4px", textTransform: "capitalize" }}>Gerar demandas de {mesRotulo}</h1>
      <p style={{ fontSize: 13.5, color: "var(--ink-muted)", margin: "0 0 20px", maxWidth: 640 }}>
        Preencha o domingo da seletiva de cada clube neste mês. As demandas recorrentes (vídeos, carrossel, arte,
        Sympla, copy, tráfego pago e os extras personalizados por clube em <Link href="/clubes">Clubes</Link>) são
        criadas automaticamente, com prazo já calculado a partir da seletiva. Rodar de novo não duplica o que já
        existe.
      </p>

      <form onSubmit={gerar} className="card" style={{ padding: 20 }}>
        <div className="tabela-wrap" style={{ border: "none", boxShadow: "none" }}>
          <table>
            <thead>
              <tr>
                <th>Clube</th>
                <th>Data da seletiva (domingo)</th>
              </tr>
            </thead>
            <tbody>
              {clubes.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>
                    {c.nome} {c.sem_organico && <span className="pill" style={{ background: "var(--gold-soft)", color: "var(--gold)", marginLeft: 6 }}>sem orgânico</span>}
                  </td>
                  <td>
                    <input
                      type="date"
                      value={datas[c.id] ?? ""}
                      onChange={(e) => setDatas((atual) => ({ ...atual, [c.id]: e.target.value }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {erro && (
          <p role="alert" style={{ color: "var(--red)", fontSize: 13, marginTop: 12 }}>
            {erro}
          </p>
        )}

        {resultado && (
          <p style={{ color: "var(--accent-ink)", fontSize: 13, marginTop: 12 }}>
            {resultado.criadas} demanda(s) criada(s), {resultado.puladas} já existiam.{" "}
            <Link href={`/quadro?mes=${mes}`}>Ver no quadro →</Link>
          </p>
        )}

        <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }} disabled={enviando}>
          {enviando ? "Gerando…" : "Gerar demandas do mês"}
        </button>
      </form>
    </div>
  );
}
