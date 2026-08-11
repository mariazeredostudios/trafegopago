"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    setCarregando(false);
    if (error) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    router.push(params.get("next") || "/quadro");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <form
        onSubmit={entrar}
        className="card"
        style={{ width: 340, padding: 28, display: "grid", gap: 14 }}
      >
        <div>
          <div className="eyebrow">Plataforma iEsports</div>
          <h1 style={{ fontSize: 20, margin: "6px 0 0" }}>Entrar</h1>
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            autoComplete="current-password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && (
          <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }} role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={carregando}>
          {carregando ? "Entrando…" : "Entrar"}
        </button>

        <p style={{ fontSize: 12, color: "var(--ink-faint)", margin: 0 }}>
          Sem conta ainda? Peça para a Maria te convidar no Supabase (Authentication → Users → Invite).
        </p>
      </form>
    </div>
  );
}
