# Checkout próprio (Lovable): o que medir para o Meta

Criado em 15/10/2026. O chefe montou um checkout próprio no Lovable para vender os ingressos
das seletivas no lugar do Sympla. Este documento lista o que ele precisa implementar para o
Meta continuar otimizando como faz hoje com o Sympla e passar a enxergar etapas que o Sympla
não mostra.

## 1. O que muda em relação ao Sympla

| | Sympla hoje | Checkout próprio |
|---|---|---|
| Pixel | Configurado **evento por evento**. Em jan/26 faltou em vários clubes e o Meta otimizou às cegas (só no Grêmio, ~R$4.800 sem registro) | Um código só, instalado uma vez para todas as seletivas |
| Eventos | PageView, InitiateCheckout, Purchase | Todas as etapas, incluindo dados do responsável, forma de pagamento, PIX gerado e PIX pago |
| Envio | Só navegador (bloqueador de anúncio e iPhone perdem venda) | Navegador **+ API de Conversões (servidor)** |
| Dados de quem comprou | Ficam no Sympla | Ficam no nosso banco, com a UTM do anúncio que trouxe cada venda |
| Depois da compra | Nada | Compareceu, aprovado, interesse em viagem, viagem fechada |

## 2. Fundação (antes de qualquer evento)

1. **Domínio próprio.** Publicar o checkout em subdomínio do `.com.br` (ex.:
   `ingressos.iesports.com.br`), nunca no endereço `*.lovable.app`. Verificar o domínio no
   Gerenciador de Negócios (Segurança da marca → Domínios).
2. **Mesmo pixel de hoje.** Usar o mesmo pixel (conjunto de dados) configurado nos eventos do
   Sympla. Assim as campanhas continuam aprendendo e os públicos de compradores continuam
   enchendo. Só um pixel no site.
3. **Pixel no navegador + API de Conversões no servidor**, com o mesmo `event_id` nos dois
   para o Meta deduplicar. O token da API de Conversões é gerado no Gerenciador de Eventos
   (Configurações → API de Conversões) e fica em segredo no servidor (Supabase), nunca no
   código do site.
4. **Site de página única (SPA).** O Lovable gera React. O PageView precisa disparar a cada
   troca de tela, e o disparo automático do pixel por histórico precisa ser desligado para
   não contar duas vezes.
5. **Consentimento de cookies (LGPD)** com o pixel respeitando a escolha (`fbq('consent', ...)`).
6. Se o Gerenciador de Eventos ainda pedir priorização de eventos para o domínio, colocar
   **Purchase em primeiro**.

## 3. O funil, etapa por etapa

Navegador = `fbq` no site. Servidor = API de Conversões. "Os dois" = mesmo `event_id`.

| # | O que a pessoa faz | Evento | Envio | Dados extras |
|---|---|---|---|---|
| 0 | Chega por qualquer link | `PageView` | Os dois | Capturar UTMs e `fbclid` (ver seção 5) |
| 1 | Abre a página da seletiva (clube + data) | `ViewContent` | Os dois | `content_ids`, `content_name`, `value: 100`, clube, cidade, data |
| 2 | Escolhe categoria/idade e quantidade | `AddToCart` | Os dois | `num_items`, `value` = 100 × quantidade, categoria |
| 3 | Clica em comprar / abre o formulário | `InitiateCheckout` | Os dois | igual ao anterior |
| 4 | Preenche e-mail e WhatsApp do responsável e avança | `Lead` | Os dois | e-mail, telefone, nome e cidade **do responsável** (com hash) |
| 5 | Escolhe a forma de pagamento | `AddPaymentInfo` | Os dois | `payment_method`: pix / cartao / boleto |
| 6 | Gera o PIX ou boleto | `PixGerado` (personalizado) | Servidor | valor, pedido |
| 7 | **Pagamento confirmado pelo gateway** | `Purchase` | Os dois | `value`, `currency: BRL`, `content_ids`, `num_items`, `order_id` |
| 8 | Cartão recusado / PIX expirou | `PagamentoFalhou` (personalizado) | Servidor | motivo |
| 9 | Na página de obrigado, responde se tem interesse na viagem | `InteresseViagem` (personalizado) | Os dois | sim / talvez / não |

Regras do `Purchase`:
- Só dispara com **pagamento confirmado** (webhook do gateway). PIX gerado não é compra; se o
  Meta aprender com quem gera PIX e não paga, ele vai buscar mais gente assim.
- `event_id` do Purchase = `purchase_<id do pedido>`, no servidor e no navegador. Nunca disparar
  duas vezes para o mesmo pedido (recarregar a página de obrigado não pode contar de novo).
- `value` = valor realmente pago.

A pergunta da viagem fica **depois** do pagamento, na página de obrigado, para não atrapalhar a
venda.

## 4. Dados que vão em todo evento

| Campo | O que é | Observação |
|---|---|---|
| `event_name`, `event_time`, `event_id` | nome, hora (Unix) e id único | o mesmo `event_id` no navegador e no servidor |
| `event_source_url` | URL da página | |
| `action_source` | `website` | |
| `em`, `ph` | e-mail e telefone do responsável | minúsculo, sem espaços; telefone só dígitos com 55. Hash SHA-256 |
| `fn`, `ln`, `ct`, `st`, `zp`, `country` | nome, sobrenome, cidade, UF, CEP, `br` | hash SHA-256 |
| `external_id` | id do cliente no nosso banco | hash SHA-256 |
| `client_ip_address`, `client_user_agent` | IP e navegador | o servidor pega do cabeçalho da requisição |
| `fbp`, `fbc` | cookies `_fbp` e `_fbc` | o `fbc` é o que liga a venda ao clique no anúncio |
| `content_ids` | id da seletiva | padrão `SEL-<CLUBE>-<AAAAMMDD>`, ex.: `SEL-GREMIO-20261018` |
| `content_name` | nome legível | "Seletiva Grêmio 18/10" |
| `content_category` | `seletiva` | |
| `value`, `currency` | valor e `BRL` | |
| personalizados | `clube`, `cidade`, `data_seletiva`, `categoria` | |

**Nunca enviar ao Meta dados do atleta** (nome, data de nascimento, documento). São menores de
idade. Só os dados do responsável que paga. A categoria (ex.: sub-13) pode ir como parâmetro.

Meta de qualidade: no Gerenciador de Eventos, **qualidade de correspondência do Purchase acima
de 6**, idealmente 8+.

## 5. UTMs e origem de cada venda

Na primeira visita, ler da URL e guardar por 30 dias (localStorage + gravar no pedido):
`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `fbclid`.
Se vier `fbclid` e não existir o cookie `_fbc`, criar `_fbc = fb.1.<timestamp em ms>.<fbclid>`.

Parâmetros de URL padrão para colocar em **todos os anúncios** (campo "Parâmetros de URL"):

```
utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}&utm_id={{campaign.id}}
```

Com isso dá para saber, pelo nosso banco, quantas vendas pagas cada campanha, público e
anúncio trouxe, sem depender só do que o Meta atribui.

## 6. Campos que o pedido precisa gravar

`order_id`, data/hora de criação e de pagamento, status (criado, pix_gerado, pago, recusado,
expirado, reembolsado), valor, forma de pagamento, clube, data da seletiva, `content_id`,
categoria, quantidade, nome/e-mail/WhatsApp/cidade/UF do responsável, `utm_*`, `fbclid`,
`_fbc`, `_fbp`, `event_id` do Purchase, página de entrada, referrer, celular ou computador,
interesse na viagem.

E um **painel de vendas** com filtro por clube/data e exportação em CSV, para cruzar com o
Meta toda semana.

## 7. Além do Sympla: depois da compra

Enviados pelo servidor, no dia em que acontecem (o Meta recusa evento com mais de 7 dias),
com e-mail e telefone do responsável e o mesmo `external_id`:

| Evento | Quando | Para que serve |
|---|---|---|
| `Compareceu` | check-in no dia da seletiva | saber qual público compra e aparece |
| `Aprovado` | resultado da seletiva | público de famílias de atletas aprovados |
| `ViagemFechada` (value 20000 por pessoa) | contrato/pagamento da viagem | lookalike de quem paga a viagem, a meta real do negócio |

`ViagemFechada` é evento separado de propósito: o `Purchase` continua sendo só o ingresso de
R$100 e não bagunça o CPA das campanhas de seletiva.

## 8. Públicos que isso libera

| Público | Regra | Uso |
|---|---|---|
| Viu a seletiva e não iniciou | `ViewContent` 14 dias, excluindo `InitiateCheckout` | RMKT topo |
| Deixou contato e não pagou | `Lead` 14 dias, excluindo `Purchase` | RMKT + mensagem de recuperação no WhatsApp/e-mail |
| PIX gerado e não pago | `PixGerado` 3 dias, excluindo `Purchase` | RMKT de urgência; lembrete automático antes de expirar |
| Compradores da seletiva atual | `Purchase` com `content_ids` da seletiva | **excluir** das campanhas de venda |
| Compradores (todos) | `Purchase` 180 dias | base de lookalike |
| Interesse em viagem | `InteresseViagem` = sim | lookalike de público qualificado |
| Aprovados / viagem fechada | `Aprovado`, `ViagemFechada` | lookalike de alto valor |

Conversões personalizadas por clube (`Purchase` com `content_ids` contendo `GREMIO`, etc.)
permitem ler e otimizar por clube mesmo com um pixel só.

## 9. Testes antes de ligar campanha

1. [ ] Meta Pixel Helper (extensão do Chrome) mostra cada evento da tabela da seção 3, uma vez só.
2. [ ] Gerenciador de Eventos → Testar eventos: eventos do servidor chegando com o código de teste.
3. [ ] Eventos aparecem como "Navegador e servidor" e **deduplicados** (não em dobro).
4. [ ] Compra real com PIX: `Purchase` chega com `value 100`, `BRL` e o `content_id` certo.
   Recarregar a página de obrigado não gera segundo `Purchase`.
5. [ ] PIX gerado e não pago **não** gera `Purchase`.
6. [ ] Qualidade de correspondência do `Purchase` acima de 6.
7. [ ] Pedido salvo no banco com UTMs e `_fbc` vindo de um clique real num anúncio.
8. [ ] Primeira semana: vendas pagas no banco × `Purchase` no Meta. Diferença aceitável: até 10%.

## 10. Como migrar as campanhas

- Começar com **um clube** (uma seletiva nova) e manter os outros no Sympla por um ciclo.
  Comparar visita → checkout e checkout → venda com o Sympla.
- Trocar o link com **anúncio novo dentro do mesmo conjunto**, não editando o anúncio que já
  vende (edição de link reinicia a análise e o aprendizado do anúncio).
- Os públicos de remarketing feitos por URL do Sympla não enchem com o checkout novo: criar
  os públicos da seção 8.
- Manter o lookalike de compradores do Sympla e subir a lista de compradores do checkout novo
  todo mês até o público por pixel ter volume.
- Bio do Instagram, `/atendimento` e todos os links sempre no `.com.br`.

## 11. O que pedir ao chefe

- Qual o gateway de pagamento (Mercado Pago, Asaas, Pagar.me, Stripe…)? Ele precisa ter webhook
  de pagamento confirmado.
- Qual domínio final do checkout.
- Acesso ao pixel (conjunto de dados) para gerar o token da API de Conversões.

## Prompt para colar no Lovable

```
Implemente rastreamento completo do Meta (Pixel + API de Conversões) neste checkout de seletivas.

1. Pixel ID: [PIXEL_ID] (o mesmo usado hoje no Sympla). Carregar o código base do Meta Pixel uma
   vez no index.html, com window.fbq.disablePushState = true, e disparar fbq('track','PageView')
   manualmente a cada troca de rota.

2. Criar um helper track(eventName, customData, userData) que:
   - gera um event_id (uuid);
   - dispara fbq('track' ou 'trackCustom', eventName, customData, { eventID: event_id });
   - chama a Edge Function "meta-capi" com o mesmo event_id, event_name, custom_data,
     event_source_url, user_data e os cookies _fbp e _fbc.

3. Edge Function "meta-capi" (Supabase): pega client_ip_address e client_user_agent dos headers,
   normaliza e faz hash SHA-256 de em, ph (só dígitos, com 55), fn, ln, ct, st, zp, country e
   external_id, e faz POST em https://graph.facebook.com/<versão atual>/[PIXEL_ID]/events com
   action_source "website". Token no secret META_CAPI_TOKEN. Se existir o secret META_TEST_CODE,
   enviar test_event_code.

4. Na primeira visita, ler utm_source, utm_medium, utm_campaign, utm_content, utm_term, utm_id e
   fbclid da URL, guardar por 30 dias e gravar no pedido. Se houver fbclid e não houver cookie
   _fbc, criar _fbc = "fb.1." + Date.now() + "." + fbclid (domínio raiz, 90 dias).

5. Eventos (content_ids no padrão SEL-<CLUBE>-<AAAAMMDD>, currency "BRL", value 100 por ingresso,
   mais clube, cidade, data_seletiva e categoria em custom_data):
   - ViewContent ao abrir a página da seletiva;
   - AddToCart ao escolher categoria e quantidade;
   - InitiateCheckout ao abrir o formulário;
   - Lead quando o responsável preencher e-mail e WhatsApp e avançar (enviar esses dados em user_data);
   - AddPaymentInfo ao escolher a forma de pagamento (payment_method);
   - PixGerado (custom, só servidor) ao gerar PIX/boleto;
   - Purchase SOMENTE com pagamento confirmado: o webhook do gateway chama a Edge Function e envia
     Purchase com event_id = "purchase_" + order_id; a página de obrigado, quando o status virar
     pago, dispara fbq Purchase com o mesmo eventID. Nunca enviar dois Purchase do mesmo pedido;
   - PagamentoFalhou (custom, servidor) em recusa ou PIX expirado;
   - InteresseViagem (custom) na página de obrigado: "Se o atleta for selecionado, a família tem
     interesse na viagem internacional?" (sim / talvez / agora não).

6. Nunca enviar ao Meta dados do atleta (nome, nascimento, documento). Só dados do responsável.

7. Banner de cookies (LGPD): sem aceite, fbq('consent','revoke'); com aceite, fbq('consent','grant').

8. Tabela orders com: order_id, created_at, paid_at, status (criado, pix_gerado, pago, recusado,
   expirado, reembolsado), valor, forma de pagamento, clube, data_seletiva, content_id, categoria,
   quantidade, dados do responsável, utm_*, fbclid, fbc, fbp, purchase_event_id, landing_page,
   referrer, device, interesse_viagem.

9. Página /admin/vendas com filtro por clube e data e exportação CSV.
```
