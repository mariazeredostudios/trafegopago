/**
 * Cron jobs (GitHub Actions) chamam essas rotas por HTTP sem sessão de
 * usuário — a autorização é um segredo compartilhado, nunca a sessão do
 * Supabase Auth. Aceita tanto `x-cron-secret: <segredo>` quanto
 * `Authorization: Bearer <segredo>`.
 */
export function segredoCronValido(request: Request): boolean {
  const esperado = process.env.CRON_SECRET;
  if (!esperado) return false;

  const headerDireto = request.headers.get("x-cron-secret");
  const authorization = request.headers.get("authorization");
  const bearer = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;

  return headerDireto === esperado || bearer === esperado;
}
