# Relatório Executivo — TetraPREP 2026-2027 — Semana 1

> Janela: **22/09 a 29/09/2026** (7 dias) · Conta `TETRA + MARIA` (`2635791740185506`)
> Campanha `TETRA PREP` · Pixel `1100395945778742`
> Dias até os núcleos: **SP (Itu) 10/12 → 72** · **RJ (Xerém) 17/12 → 79**

---

## 1. Visão geral dos 2 agentes

- **Tráfego pago:** o topo de funil está acima da meta em todos os
  indicadores — CPM 22% abaixo do teto projetado, CTR de link 77% acima da
  meta e custo por visualização da página dentro da faixa — mas **o dinheiro
  para no checkout, não no anúncio**.
- **Conversão do ecossistema:** 7 pessoas chegaram a preencher dados de
  pagamento no Sympla nesta semana e **nenhuma concluiu a compra**; o
  Instagram tem alcance saudável (62% de não-seguidores) e converte quase
  nada em tráfego para o site (44 toques no link em 8.307 viewers).

---

## 2. Análise de Tráfego Pago (Agente 1 — Mídia)

### Números da semana

| Métrica | Valor | Meta | Status |
|---|---|---|---|
| Investido | US$ 65,27 (~R$ 337) | — | US$ 9,32/dia |
| Impressões | 17.297 | — | |
| Alcance | 10.432 | — | |
| CPM | **US$ 3,77** | 4,84 – 9,69 | ✅ abaixo do piso |
| CTR (link) | **2,12%** | > 1,20% | ✅ +77% |
| Custo por visualização da LP | **US$ 0,25** | 0,12 – 0,29 | ✅ na faixa |
| Visualizações da LP | 264 | — | |
| Conectividade (LPV ÷ cliques) | **71,9%** | > 80% | 🟡 abaixo |
| Frequência | 1,60 – 1,71 | < 2,5 | ✅ |
| **Vendas** | **0** | — | 🔴 |

**Leitura:** a mídia está comprando atenção barata e de qualidade. Nada aqui
justifica trocar criativo ou público. O problema está adiante.

### Por conjunto

| Conjunto | Gasto | LPV | Custo/LPV | CTR |
|---|---|---|---|---|
| BRASIL + INTERCAMBIO | US$ 28,18 | 116 | US$ 0,24 | 3,89% |
| BRASIL + ED FISICA | US$ 37,09 | 148 | US$ 0,25 | 3,46% |
| BRASIL + INTERAÇÃO | **US$ 0** | — | — | — |

Empate técnico entre os dois conjuntos ativos. **Nenhuma evidência de que
Ed. Física seja pior que Intercâmbio** — a hipótese que eu levantei não se
confirmou nos dados.

🔴 **O conjunto `BRASIL + INTERAÇÃO` nunca rodou.** É o que carrega o
lookalike dos compradores — o melhor público da conta segue parado há uma
semana.

### Vídeo ganha de arte, com folga

| Criativo | Gasto | CTR | Custo/LPV |
|---|---|---|---|
| VÍDEO (ED FISICA) | US$ 23,33 | 3,68% | US$ 0,24 |
| VÍDEO (INTERCAMBIO) | US$ 22,73 | **4,11%** | **US$ 0,22** |
| ARTE (ED FISICA) | US$ 7,59 | 2,45% | US$ 0,32 |
| ARTE (INTERCAMBIO) | US$ 2,18 | 2,87% | **US$ 0,73** |

O Meta concentrou 70% da verba nos dois vídeos sozinho. Artes custam **1,3x
a 3x mais** por visualização da página.

⭐ **Um vídeo subaproveitado:** o anúncio `120252149998780365` tem **CTR de
6,80%** e custo por LPV de **US$ 0,13** — o melhor da conta — mas recebeu só
US$ 1,19. Vale forçar verba nele.

### Pausar / escalar / testar

**Pausar hoje:** as 4 artes estáticas (US$ 13,01 gastos, custo por LPV entre
US$ 0,32 e 0,73 contra US$ 0,22–0,24 dos vídeos).

**Escalar hoje:** os dois vídeos principais + destravar o
`120252149998780365`.

**Testar:** ligar o conjunto do lookalike de compradores, isolado — sem os
outros 9 públicos misturados e com `COMPRADORES TETRAPREP` como **exclusão**,
não inclusão.

---

## 3. Análise de Estratégia e CRO (Agente 2 — Growth/Funil)

### 🔴 O achado da semana: o vazamento está no pagamento

Eventos do pixel, 21 a 28/09, **todas as origens** (pago + orgânico + direto):

| Etapa | Volume | Conversão da etapa anterior |
|---|---|---|
| PageView | 4.427 | — |
| AddToCart | 43 | 1,0% |
| InitiateCheckout | 43 | 100% |
| **AddPaymentInfo** | **7** | 16,3% |
| **Purchase** | **0** | **0,0%** 🔴 |

**Sete pessoas preencheram dados de pagamento e nenhuma concluiu.** O normal
nessa etapa é 50% a 80% — deveriam ter saído de 4 a 6 vendas.

Isso não é problema de tráfego. Tráfego que chega ao AddPaymentInfo já está
decidido.

### Três hipóteses, em ordem de probabilidade

1. **Boleto ou Pix gerado e não pago** ⭐ — num ticket de R$ 1.350 o
   brasileiro parcela ou usa boleto, e o Sympla só dispara `Purchase`
   quando o pagamento compensa. Boleto leva 1 a 3 dias úteis. **Pode haver
   venda que ainda não apareceu.**
2. **Cartão recusado por limite** — R$ 1.350 à vista estoura o limite de
   muita gente. Verificar se o parcelamento está visível **antes** do
   checkout, não dentro dele.
3. **O evento `Purchase` parou de disparar** — menos provável: ele
   funcionou em 21/09.

🔵 **Ação decisiva:** abrir o painel do organizador no Sympla e conferir as
vendas reais desta semana. É o único jeito de separar "não vendeu" de "não
registrou". **Tudo mais depende disso.**

### Instagram orgânico (20 a 27/09)

| Métrica | Valor |
|---|---|
| Views | 24.424 (62,1% **não-seguidores**) |
| Viewers | 8.307 |
| Interações | 533 |
| Seguidores líquidos | +76 (+118 / −42) |
| Visitas ao perfil | 575 |
| **Toques no link da bio** | **44** |

**O alcance está ótimo e o link não é clicado.** 62% de não-seguidores
significa que o conteúdo sai da bolha — o Instagram está entregando. Mas:

- **7,7%** de quem visita o perfil toca no link
- **0,53%** de quem vê o conteúdo toca no link

### O cruzamento que importa

| Canal | Alcance | Gente levada ao site |
|---|---|---|
| Pago | 17.297 impressões | **264** |
| Orgânico | 24.424 views | **44** |

**O pago levou 6x mais gente ao site com alcance parecido.** O orgânico hoje
funciona como branding, não como aquisição.

### Ajustes de Instagram

- **Reels está subaproveitado:** 1.200 viewers contra 5.900 de Stories, e só
  27 interações. Reels é o motor de descoberta da plataforma — é o formato
  que mais traria não-seguidor qualificado.
- **Parceria entrega alcance:** o post com a Ciência da Bola fez **6.100
  views**, quase 3x o segundo colocado. Replicar o modelo de collab.
- **Stories sem CTA:** 5.900 viewers e 44 toques no link na semana inteira.
  Faltam figurinha de link e chamada explícita.
- **Conteúdo de 2023 no topo:** o segundo maior alcance é um post do
  TetraPREP de janeiro de 2023. Prova social antiga funciona — vale produzir
  mais material de turmas anteriores.

### Ajustes de site / LP

- **Conectividade de 71,9%** — 103 dos 367 cliques não viraram visualização
  da página. Parte é abandono normal, parte pode ser velocidade de
  carregamento da SPA no 4G. Vale medir.
- 🔴 **`tetrabrazil.com.br/novoprep` continua no ar** (HTTP 200) com link de
  checkout quebrado (HTTP 404). Todo clique orgânico ou de material antigo
  que cair lá morre. O 301 ainda não foi feito.

---

## 4. Checklist prático (por impacto no faturamento)

- [ ] 🔴 **Conferir as vendas reais no painel do Sympla.** 7 AddPaymentInfo e
      0 Purchase — descobrir se é boleto pendente ou falha de registro
- [ ] 🔴 **Verificar se o parcelamento aparece antes do checkout**
- [ ] 🔴 **Ligar o conjunto do lookalike de compradores**, isolado e com
      compradores como exclusão
- [ ] 🟡 Pausar as 4 artes estáticas, manter só vídeo
- [ ] 🟡 Forçar verba no vídeo `120252149998780365` (CTR 6,80%)
- [ ] 🟡 Fazer o 301 de `.com.br/novoprep` → `.com/novoprep`
- [ ] 🟡 Trocar o evento de otimização de `Purchase` para `InitiateCheckout`
      — agora há **43 IC/semana** contra 0 Purchase, dado que não existia na
      semana passada
- [ ] 🟢 Figurinha de link em todo Story; subir frequência de Reels
- [ ] 🟢 Disparo para a base de 518 ex-alunos (ainda não feito)

---

## Métricas-chave do período

| Métrica | Valor | Meta | |
|---|---|---|---|
| CPM | US$ 3,77 | 4,84 – 9,69 | ✅ |
| CTR (todos) | 3,46 – 3,89% | — | ✅ |
| CTR (link) | 2,12% | > 1,20% | ✅ |
| Custo por visualização da LP | US$ 0,25 | 0,12 – 0,29 | ✅ |
| Conectividade | 71,9% | > 80% | 🟡 |
| Frequência | 1,65 | < 2,5 | ✅ |
| InitiateCheckout (todas as origens) | 43 | — | |
| Custo por Finalização de Compra | — | 2,91 – 6,78 | sem venda |
| CPA final | — | 25 – 43 | sem venda |
| ROAS | — | 6x – 10x | sem venda |
| **Inscritos no período (via anúncio)** | **0** | — | 🔴 |

## Situação da verba

| | |
|---|---|
| Investido até aqui | US$ 65,27 de 775 (8,4%) |
| Restante | US$ 709,73 |
| Ritmo atual | US$ 10,20/dia |
| **Acaba em** | **~07/12** |
| Núcleo RJ | **17/12** — 10 dias sem anúncio na reta final |

Reduzir para **US$ 9,30/dia** faz a verba alcançar 14/12.
