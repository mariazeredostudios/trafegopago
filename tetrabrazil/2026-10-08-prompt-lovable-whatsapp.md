# Prompt para o Lovable — redirecionar o lead para o WhatsApp

**Site:** `www.tetrabrazil.com`
**Página:** `www.tetrabrazil.com/novoprep/faleconoscotra`
**Objetivo:** depois que o formulário salvar, levar a pessoa para o WhatsApp da
Tetra com uma mensagem já escrita, para que a saudação automática responda na
hora com a qualificação.

Vai junto a correção do evento `Lead`, que hoje dispara duas vezes — o Lovable
vai mexer nesse mesmo trecho de código, então é melhor resolver de uma vez.

---

## Por que não é um redirect seco

Um `window.location` imediato depois do envio **cancela a requisição do pixel**
antes de ela sair. O resultado seria parar de medir lead no Meta — que é
exatamente o que a campanha otimiza hoje.

A solução abaixo mostra uma tela de confirmação com botão, dispara o pixel, e só
então redireciona sozinha depois de 1,5 segundo. Se o redirect automático for
bloqueado (navegador dentro do Instagram, bloqueador de pop-up), o botão continua
lá e a pessoa clica.

---

## O prompt (copiar e colar no Lovable)

```
Na página /novoprep/faleconoscotra, preciso de três ajustes no fluxo de
envio do formulário.

1. CORRIGIR O EVENTO DO PIXEL QUE DISPARA DUAS VEZES

Hoje o fbq('track', 'Lead', ...) está sendo disparado duas vezes por
envio — confirmei isso pelos dados do pixel. Provavelmente ele está
sendo chamado no handler de submit e de novo em um useEffect ou no
re-render da tela de sucesso.

Garanta que ele dispare EXATAMENTE UMA VEZ por envio. Use uma ref
(useRef) como trava, não um estado, para que um re-render não dispare
de novo. Mantenha os mesmos parâmetros que já existem hoje
(content_name, content_category, value, currency) — não altere os
valores.

2. TELA DE CONFIRMAÇÃO COM BOTÃO DO WHATSAPP

Depois que o formulário salvar com sucesso (e somente em caso de
sucesso — se a requisição falhar, mostre o erro e NÃO redirecione),
substitua o formulário por uma tela de confirmação com:

- Título: "Recebemos seu contato!"
- Texto: "Estamos te levando para o WhatsApp para enviar todas as
  informações do TetraPREP 2026-2027."
- Um botão verde grande, bem visível: "Abrir o WhatsApp"
- Abaixo do botão, em texto menor: "Se não abrir automaticamente,
  toque no botão acima."

O botão aponta para a URL do item 3, com target="_blank" e
rel="noopener noreferrer".

3. REDIRECT AUTOMÁTICO APÓS 1,5 SEGUNDO

Na mesma tela, depois de 1500ms, redirecionar automaticamente para a
mesma URL do botão. Esse atraso é necessário para o pixel conseguir
enviar o evento antes da navegação — não reduza.

A URL é:

https://wa.me/5511941488736?text=<TEXTO>

onde <TEXTO> é esta frase, codificada com encodeURIComponent:

"Olá! Acabei de preencher o formulário do TetraPREP 2026-2027 no site
e quero mais informações."

Se o formulário tiver o campo de nome preenchido, monte a frase assim,
usando só o primeiro nome:

"Olá! Aqui é o(a) {primeiroNome}. Acabei de preencher o formulário do
TetraPREP 2026-2027 no site e quero mais informações."

Monte a URL com encodeURIComponent no texto inteiro, nunca
concatenando string crua, para não quebrar com acentos.

IMPORTANTE, NÃO ALTERAR:
- A captura dos parâmetros de UTM na URL (utm_source, utm_medium,
  utm_campaign, utm_content, utm_term) e o envio deles junto do lead.
- O endpoint para onde o formulário é enviado hoje.
- Os campos do formulário.
- Os parâmetros do evento Lead.

O lead precisa continuar sendo salvo normalmente antes de qualquer
redirecionamento. Se o salvamento falhar, não redirecione.
```

---

## Depois que o Lovable publicar — como testar

1. Abrir `www.tetrabrazil.com/novoprep/faleconoscotra` **com os UTMs**, igual ao
   anúncio:
   `?utm_source=meta&utm_medium=paid&utm_campaign=prep2627_leads`
2. Preencher e enviar com dados de teste.
3. Confirmar os quatro pontos:
   - a linha apareceu na planilha, **com os UTMs preenchidos**;
   - a tela de confirmação apareceu com o botão;
   - o WhatsApp abriu com a mensagem escrita;
   - no **Gerenciador de Eventos** da Meta, o evento `Lead` apareceu
     **uma vez só** (hoje aparecem dois).
4. No app do WhatsApp Business, conferir se a **mensagem de saudação**
   respondeu automaticamente.

> O teste do item 3 é o mais importante: é ele que confirma que a correção do
> disparo duplo funcionou.

---

## Lembrete: a saudação automática precisa estar configurada

O redirect só entrega valor se a mensagem automática estiver no ar. No app
**WhatsApp Business**, no número **(11) 94148-8736**:

Configurações → Ferramentas comerciais → **Mensagem de saudação** → ativar →
colar o texto da seção 3.1 de
`2026-10-08-mensagem-automatica-qualificacao.md` → enviar para **todos**.

⚠️ A saudação do WhatsApp Business só dispara para quem está há **14 dias sem
conversar** com o número, ou nunca conversou. Quem já falou com a Tetra
recentemente não recebe — esses caem direto para o comercial, que é o
comportamento certo.
