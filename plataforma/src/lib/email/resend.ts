import { Resend } from "resend";

let client: Resend | null = null;

function getClient(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("Falta a variável de ambiente RESEND_API_KEY.");
    client = new Resend(key);
  }
  return client;
}

export async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const from = process.env.RESEND_FROM;
  if (!from) throw new Error("Falta a variável de ambiente RESEND_FROM.");
  if (opts.to.length === 0) return { skipped: true as const };

  const resend = getClient();
  const result = await resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });

  if (result.error) {
    throw new Error(`Resend falhou ao enviar "${opts.subject}": ${result.error.message}`);
  }

  return result;
}
