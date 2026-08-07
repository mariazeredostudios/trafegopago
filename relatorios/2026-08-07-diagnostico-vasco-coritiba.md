# Diagnóstico Profundo — Vasco e Coritiba (nível de público/anúncio)

> Análise a pedido da cliente após ela apontar que eu tinha ficado só no
> nome da campanha, sem checar conjuntos de anúncio (públicos) e
> criativos de verdade. Corrigido abaixo com histórico completo por
> público (adset), últimos 12 meses (Coritiba) e histórico completo
> desde o início rastreável (Vasco, ~24 meses).

## VASCO — o problema é qualificação, não volume (confirmado pela cliente)

A cliente confirmou: Vasco encheu seletiva, mas não formou time — ou
seja, gente com R$100 pro treino, sem R$20k pra viagem. **Correção
importante do meu diagnóstico anterior:** a cliente já testou sim um
público voltado a viajantes (`MELHOR PUBLICO - 1% DOS VIAJANTES`,
lookalike de compradores de viagem) — eu tinha ignorado isso ao olhar
só o nome da campanha.

### Todos os públicos já testados no Vasco (histórico completo)

| Público (adset) | Gasto | Compras | CPA | ROAS |
|---|---|---|---|---|
| p1_cidade_advantage | R$3.823 | 58 | R$65,92 | 2,48 |
| p4-RmktGeral-EstadoRJ | R$3.055 | 22 | R$138,86 | 0,78 |
| **p1-cidade-homens-interaçãoinsta** | **R$2.836** | **7** | **R$405,12** | **0,14** |
| abertofutebol — brasil | R$2.702 | 26 | R$103,93 | 1,14 |
| p2_estado_advantage | R$2.573 | 41 | R$62,75 | 1,88 |
| aberto | R$2.139 | 15 | R$142,58 | 0,62 |
| rmktinteração | R$1.898 | 20 | R$94,91 | 1,12 |
| **MELHOR PUBLICO - 1% DOS VIAJANTES** | **R$227** | **3** | **R$75,75** | **1,45** |
| *(+ 20 públicos menores, vários com R$0 de retorno)* | | | | |

### Leitura profissional
1. **"MELHOR PUBLICO - 1% DOS VIAJANTES" nunca recebeu orçamento de
   verdade** — R$227 no total, em ~24 meses de conta. É pouco demais pra
   provar ou descartar a hipótese. Com CPA R$75,75 e ROAS 1,45, ele já
   está *dentro* dos públicos saudáveis da conta, só que com amostra
   pequena (3 compras) — não dá pra confirmar ainda se são compradores
   de qualidade melhor, só que o tráfego não ficou caro.
2. **"p1-cidade-homens-interaçãoinsta" é o pior investimento de todo o
   histórico do Vasco:** R$2.836 gastos, CPA R$405 — 15x o teto de
   referência. Nunca mais usar esse público.
3. **"p4-RmktGeral-EstadoRJ" e "aberto" estão no vermelho** (ROAS < 1) —
   pausar.
4. **Os dois públicos "advantage" por cidade/estado
   (`p1_cidade_advantage`, `p2_estado_advantage`) são os melhores com
   volume real** (CPA ~R$63-66, ROAS 1,9-2,5) — não são exatamente
   "qualificados" (são targeting amplo com IA do próprio Meta), mas são
   eficientes em custo por ingresso.

### O que eu NÃO consigo te dizer sozinha (limite real dos dados do Meta)
O pixel do Meta só enxerga "comprou o ingresso de R$100" — ele não sabe
quem, depois, pagou os R$20k da viagem. Pra provar de vez a hipótese
"Vasco atrai gente sem dinheiro pra viagem", preciso cruzar **quem
comprou o ingresso (por público/campanha) com quem fechou viagem
depois** — isso só existe na sua planilha/CRM de vendas de viagem, não
no Meta Ads. Se você tiver essa lista (nem que seja manual), me manda
que eu cruzo.

### Recomendação prática para o Vasco
- [ ] Dar orçamento de verdade ao "MELHOR PUBLICO - 1% DOS VIAJANTES"
      (sugestão: R$50-100/dia dedicado, por 2-3 semanas, orçamento
      isolado do resto pra não ser afogado pelos públicos amplos).
- [ ] Pausar definitivamente "p1-cidade-homens-interaçãoinsta" e
      "p4-RmktGeral-EstadoRJ".
- [ ] Manter/escalar `p1_cidade_advantage` e `p2_estado_advantage` como
      motor de volume, mas cientes de que não resolvem o problema de
      qualificação sozinhos.
- [ ] Se possível, adicionar uma pergunta de qualificação financeira
      antes do Sympla (no bot/WhatsApp) pra pelo menos sinalizar o
      potencial de compra da viagem antes da inscrição — reduz o
      problema de "encher com público errado" na raiz do funil, não só
      na mídia.

---

## CORITIBA — achei a causa provável da campanha não converter

Cliente confirmou que Coritiba já teve bons públicos no passado (time
chegou a viajar). Comparando o histórico completo de públicos:

| Público (adset) | Gasto | Compras | CPA | ROAS |
|---|---|---|---|---|
| **abertofutebol — brasil** | **R$2.733** | **15** | **R$182,18** | **0,67** |
| p4_estado_advantage | R$1.318 | 8 | R$164,81 | 0,83 |
| Estado_homens_18mais_advantage | R$1.274 | 12 | R$106,19 | 1,01 |
| aberto | R$1.119 | 11 | R$101,76 | 1,15 |
| **p2_estado_homens_25mais_pais&futebol** | **R$571** | **12** | **R$47,62** | **3,30** |
| **p3_cidade80km_homens_18a44_aberto** | **R$343** | **6** | **R$57,20** | **2,60** |
| p3_estado_homens_18a44_aberto | R$300 | 4 | R$74,99 | 1,99 |
| MELHOR PUBLICO - 1% DOS VIAJANTES | R$37 | 0 | — | 0,00 |

### Achado principal
**O maior gasto atual está indo pro pior público** —
`abertofutebol — brasil` (segmentação nacional, aberta) é o que mais
recebeu orçamento (R$2.733, incluindo os anúncios `CORITIBA10` e
`CORITIBA12 — Cópia`, que são o grosso da campanha ativa hoje) e tem o
**pior CPA de todos** (R$182,18). Enquanto isso, **`p2_estado_homens_
25mais_pais&futebol`** (pais 25+, dentro do estado, interesse em
futebol) tem o **melhor CPA (R$47,62) e melhor ROAS (3,30) de toda a
conta do Coritiba** — e recebeu 5x menos orçamento.

Isso explica tecnicamente por que "a campanha que eu fiz primeiro não
está convertendo": o orçamento está sendo puxado pelo público errado
(o Meta tende a gastar mais no público mais barato de alcançar, que
nem sempre é o que mais converte — "abertofutebol — brasil" tem CPM
mais barato só porque é público enorme e menos qualificado).

### Recomendação prática para o Coritiba
- [ ] **Reduzir/pausar orçamento de `abertofutebol — brasil`** — está
      queimando dinheiro (ROAS 0,67).
- [ ] **Realocar esse orçamento pra `p2_estado_homens_25mais_pais&
      futebol` e `p3_cidade80km_homens_18a44_aberto`** — os dois
      melhores públicos históricos do clube, hoje sub-financiados.
- [ ] Também pausar `p4_estado_advantage` (CPA R$164, ROAS 0,83).
- [ ] **Fadiga de criativo confirmada:** os anúncios `iu01/iu02_
      avaliativocoritibaAgo` (agosto) tiveram CPA R$46-57 — os melhores
      já rodados. Os mesmos criativos, rodados de novo em outubro
      (`...Out`), pioraram pra CPA R$149-163. Refrescar o criativo (novo
      vídeo/imagem, mesmo ângulo) em vez de reciclar o mesmo asset.
- [ ] **Pausar os anúncios "— Cópia" da campanha atual**
      (`CORITIBA3/9/11 — Cópia` = zero compras; `CORITIBA12 — Cópia` =
      R$1.065 gastos por só 4 compras) — parecem duplicações acidentais
      que nunca performaram.

---

## Nota sobre as "CAMPANHA TESTE" do Vasco/Coritiba
Confirmado pela cliente: são testes propositais porque a campanha
original não estava convertendo — **não é lixo pra limpar**, como eu
tinha sugerido antes. Correção registrada.
