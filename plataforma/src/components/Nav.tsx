"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { FUNCAO_LABEL, type Pessoa } from "@/lib/types";

const LINKS = [
  { href: "/quadro", label: "Quadro" },
  { href: "/clubes", label: "Clubes" },
  { href: "/relatorios", label: "Relatórios" },
];

export default function Nav({ pessoa }: { pessoa: Pessoa }) {
  const pathname = usePathname();
  const router = useRouter();

  async function sair() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="nav">
      <Link href="/quadro" className="nav-brand">
        ⚽ Plataforma iEsports
      </Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={"nav-link" + (pathname?.startsWith(l.href) ? " active" : "")}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-user">
        <span>
          {pessoa.nome} · {FUNCAO_LABEL[pessoa.funcao]}
        </span>
        <button className="btn btn-sm" onClick={sair}>
          Sair
        </button>
      </div>
    </nav>
  );
}
