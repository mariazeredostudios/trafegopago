# Plano de Campanha — TetraPREP 2026-2027 (Meta Ads)

> Montado em 21/09/2026 · Verba: R$ 4.000 · Janela: 21/set a 14/dez/2026
> Praças-alvo do tráfego pago: **São Paulo (Itu)** e **Rio de Janeiro (Xerém)**
> Pré-requisito: ver `2026-09-21-auditoria-tecnica.md`

---

## 1. Leitura honesta do cenário (antes da estratégia)

### A conta não fecha — e isso precisa estar dito antes de gastar o primeiro real

| Item | Número |
|---|---|
| Meta | 100 SP + 100 RJ = 200 |
| Já inscritos | 18 SP + 29 RJ = 47 |
| **Faltam** | **153 vendas** |
| Verba | R$ 4.000 |
| **CPA implícito necessário** | **R$ 26,14** |
| ROAS implícito (ticket R$ 1.350) | **~51x** |

CPA de R$ 26 num produto de R$ 1.350 não existe em nenhum mercado. Para
calibrar: num ticket dessa faixa, vendido direto no checkout e sem time
comercial, o CPA realista é:

| Tipo de público | CPA esperado |
|---|---|
| Remarketing quente (visitou / iniciou checkout) | R$ 80 – 150 |
| Lookalike de ex-alunos | R$ 120 – 200 |
| Interesses (frio) | R$ 250 – 500 |
| **Blended realista** | **R$ 130 – 220** |

**Projeção do que R$ 4.000 compra:**

| Cenário | CPA | Vendas | Faturamento | ROAS |
|---|---|---|---|---|
| Pessimista (rastreamento não corrigido) | R$ 330 | ~12 | R$ 16.200 | 4,0x |
| **Realista** | **R$ 180** | **~22** | **R$ 29.700** | **7,4x** |
| Otimista (criativo forte + lista boa) | R$ 135 | ~30 | R$ 40.500 | 10,1x |

Ou seja: **o tráfego pago entrega ~15% da meta.** Para as 153 vendas ao
CPA blended de R$ 180 seriam necessários **~R$ 27.500**.

### Onde estão os outros 85% (e por que isso é mais importante que o anúncio)

Você tem um ativo que vale mais que os R$ 4.000: **a planilha com 1.000+
ex-participantes do TetraPREP**. Antes de escalar mídia:

1. **E-mail + WhatsApp para a base inteira** — custo zero. Uma base de
   1.000 pessoas que já pagaram por esse produto, com oferta de indicação,
   costuma converter mais que R$ 4.000 de mídia fria.
2. **Programa de indicação com os 47 já inscritos** — eles conhecem outros
   treinadores. Desconto/bônus por indicação convertida.
3. **Parcerias institucionais** — federações estaduais (o modelo de
   Rondônia já prova que funciona), faculdades de Educação Física,
   clubes, ligas amadoras de SP e RJ.
4. **Orgânico no Instagram** — os vídeos de depoimento já existem.

O tráfego pago acelera o que já tem tração. Ele não substitui os canais
acima com R$ 46/dia.

---

## 2. Bloqueadores — resolver ANTES de subir verba

Nenhuma campanha de conversão funciona sem os itens 🔴. Subir hoje sem
eles significa otimizar às cegas.

| # | Ação | Prioridade | Responsável |
|---|---|---|---|
| 0 | **Compartilhar um pixel existente com a conta de anúncio nova** (ver 2.0) | 🔴🔴 | Você / TetraBrazil |
| 1 | Redirecionar `tetrabrazil.com.br/novoprep` → `tetrabrazil.com/novoprep` (301) | 🔴 | Dev/site |
| 2 | Escolher **um** pixel oficial e remover o segundo `fbq('init')` | 🔴 | Dev |
| 3 | Implementar `ViewContent` + `InitiateCheckout` no site | 🔴 | Dev |
| 4 | Ativar pixel do Meta no painel do organizador do Sympla (para `Purchase`) | 🔴 | Você |
| 5 | Subir a lista CSV como Público Personalizado + criar Lookalike 1% | 🔴 | Você |
| 6 | Padronizar UTMs por praça/público/criativo | 🟡 | Você |
| 6b | Verificar o limite de gasto da conta nova antes da Fase 2 | 🟡 | Você |
| 7 | Alinhar preço (R$ 1.350 vs R$ 1.300) entre criativo, site e Sympla | 🟡 | Você |
| 8 | Definir a data-limite real de matrícula de cada núcleo (há 16h de aula online obrigatória antes do presencial) | 🟡 | Você |
| 9 | Criar Públicos de Engajamento IG/FB 365d (não depende do pixel — dá para fazer hoje) | 🟢 | Você |

### 2.0 Conta nova e evento único no Sympla (atualizado 21/09)

> ✅ **Pixel resolvido em 21/09:** o site agora dispara **um único pixel,
> `1100395945778742`**, da conta nova. Os dois antigos foram removidos.
> Confirmado por leitura direta da página. Falta apenas ele disparar os
> eventos de fundo de funil.

#### A conta de anúncio é NOVA — e o pixel do site não é dela

A conta foi criada agora para este trabalho. Consequências práticas:

1. 🔴 **Os pixels do site provavelmente não pertencem a esta conta.** O
   site dispara `1092407173145058` e `2044408082864046` — ativos do
   ecossistema antigo da TetraBrazil. Uma conta nova nasce sem pixel
   vinculado. **Se nenhum desses dois estiver compartilhado com a conta
   nova, a campanha roda completamente cega**, mesmo depois de implementar
   os eventos.

   **Solução correta:** no Gerenciador de Negócios, compartilhar **um** dos
   pixels existentes com a conta nova (Configurações do Negócio → Origens
   de dados → Pixels → Atribuir parceiros/contas). Isso preserva o
   histórico de `PageView` que já existe.

   **Solução errada:** criar um terceiro pixel e somar ao site. Já são dois
   disparando em duplicidade — um terceiro piora.

2. **Conta nova tem limite de gasto inicial.** O Meta impõe um teto diário
   até criar histórico de pagamento. Verificar em Faturamento → Limite de
   gasto da conta antes da Fase 2, quando o diário sobe para R$ 70.

3. **Conta nova tem CPM mais alto e aprendizagem mais lenta** nas primeiras
   semanas — sem histórico, o leilão a trata com desconfiança.

➡️ **Isso valida o ritmo híbrido que você escolheu.** Começar a R$ 15/dia e
subir gradualmente é exatamente o que uma conta nova precisa: gasto
crescente e regular, fatura paga em dia, sem saltos bruscos. Uma conta nova
que começa em R$ 70/dia tem risco real de análise e bloqueio.

#### Existe UM único evento no Sympla — a divisão por praça é pós-compra

Os 47 inscritos estão num evento único; SP e RJ são separados
internamente depois da compra. Isso significa:

- ❌ Não existe link nem ingresso por praça
- ❌ O parâmetro `content_category` por cidade **não funciona** como eu
  havia proposto — não há o que diferenciar no clique
- ✅ **Mas a separação continua possível pela geolocalização da campanha:**
  uma compra vinda de campanha segmentada no estado de São Paulo é, na
  prática, uma inscrição do núcleo de SP

**Decisão:** manter o evento único (não vale desorganizar a operação a 80
dias do curso) e **ler a praça pela geo da campanha**. Por isso as
campanhas da Fase 2 são separadas por praça — é a única forma de saber o
CPA de cada núcleo.

**Melhoria opcional, custo zero:** adicionar um campo obrigatório
"Qual núcleo você vai cursar?" no checkout do Sympla. Dá o dado limpo, sem
inferência, e ainda organiza a operação interna deles.

### 2.1 Eventos de pixel a implementar

```js
// Ao rolar até a seção de Investimento/Núcleos (ou 50% da página)
fbq('track', 'ViewContent', {
  content_name: 'TetraPREP 2026-2027',
  content_type: 'product',
  value: 1350.00,
  currency: 'BRL'
});

// No clique de QUALQUER botão que leva ao Sympla
// Sem content_category por cidade: o Sympla tem um evento único e a
// divisão por praça acontece depois da compra (ver 2.0). A praça é lida
// pela geolocalização da campanha.
fbq('track', 'InitiateCheckout', {
  content_name: 'TetraPREP 2026-2027',
  value: 1350.00,
  currency: 'BRL'
});

// Clique no WhatsApp
fbq('track', 'Contact');
```

`Purchase` vem pela integração do Sympla. Se o Sympla não permitir pixel
no plano atual, o plano B é exportar as vendas do painel semanalmente e
subir como conversão offline — menos preciso, mas melhor que nada.

### 2.2 Padrão de UTM

```
?utm_source=meta
&utm_medium=paid
&utm_campaign=prep2627_{fase}_{praca}
&utm_content={publico}_{criativo}
&utm_term={{adset.id}}
```

Exemplo: `...&utm_campaign=prep2627_conversao_rj&utm_content=lal1_dep-video01`

---

## 3. Ritmo de verba — modelo híbrido

Correção importante sobre o que eu mesmo estimei antes de fechar a conta:
com R$ 4.000 no total, a fase pesada fica em **~R$ 70/dia**, não R$ 120
(R$ 120/dia por 52 dias exigiria R$ 6.240).

| Fase | Período | Dias | R$/dia | Total | Função |
|---|---|---|---|---|---|
| **1 — Construção** | 21/set – 25/out | 35 | R$ 15 | R$ 525 | Construir públicos e descobrir o criativo vencedor barato |
| **2 — Conversão** | 26/out – 29/nov | 35 | R$ 70 | R$ 2.450 | Vender SP + RJ |
| **3 — Fechamento** | 30/nov – 14/dez | 15 | R$ 68 | R$ 1.020 | Urgência, foco em RJ + remarketing |
| | | **85** | | **R$ 3.995** | |

**Por que não diluir R$ 46/dia nos 87 dias:** a R$ 46/dia um conjunto gera
~2 compras/semana. O Meta precisa de ~50 eventos de otimização por semana
por conjunto para sair da fase de aprendizagem. A campanha ficaria presa
em aprendizagem do primeiro ao último dia, com CPA instável e entrega
errática. Concentrar resolve isso.

### Calendário crítico

| Data | Evento |
|---|---|
| 21/set | Início Fase 1 + correções técnicas |
| ~19/out | Decisão: qual criativo e qual público vão para a Fase 2 |
| 26/out | Início Fase 2 (verba pesada) |
| ~29/nov | **Última chamada para a data de São Paulo** |
| ~05/dez | 🔴 **Tirar a data de SP dos criativos** (núcleo 10–13/dez). Geo segue nacional |
| 30/nov – 14/dez | Fase 3 — criativo migra para a data do Rio |
| ~14/dez | 🔴 **Encerrar** (núcleo do Rio começa 17–20/dez) |

---

## 4. Públicos

### 4.1 A base de ex-alunos — analisada (518 registros)

Análise completa em `2026-09-21-analise-base-ex-alunos.md`. Resumo:

- **Qualidade excelente:** 517 e-mails válidos e únicos, 518 telefones
  (511 celulares), zero duplicatas. Correspondência esperada no Meta:
  60–75%.
- ⚠️ **São 518 registros, não 1.000+.** Passa do mínimo para Lookalike,
  mas fica abaixo do ideal (1.000–5.000). **Somar os 47 inscritos de
  2026-2027 e qualquer outra base à mesma semente.**
- **Geo, gênero e clusters institucionais:** ver 4.5, 4.6 e seção 10.
- **Idade não existe na planilha** — ver 4.7.

> ⚠️ **Privacidade:** o CSV bruto **não foi versionado** neste
> repositório — são dados pessoais de 518 pessoas e o histórico do git é
> permanente. Só o agregado está aqui. Para o Meta, o upload do Público
> Personalizado faz o hash dos dados localmente no navegador.

### 4.2 Mapa de públicos

**Disponíveis hoje (não dependem do pixel):**

| Público | Uso |
|---|---|
| CSV ex-alunos (Público Personalizado) | Semente de Lookalike + campanha de reativação |
| Lookalike 1% BR da lista ⭐ | Principal público frio da Fase 2 |
| Lookalike 2–3% BR | Escala, só se o 1% saturar |
| Engajamento Instagram 365d | Remarketing morno |
| Visitantes do perfil IG 365d | Remarketing morno |
| Engajamento Página Facebook 365d | Remarketing morno |

**Disponíveis após corrigir o pixel:**

| Público | Uso |
|---|---|
| Visitantes do site 180d | Remarketing |
| `ViewContent` 180d | Remarketing qualificado |
| **`InitiateCheckout` 30d SEM `Purchase`** ⭐ | **O "quase comprou" que você queria — público mais quente da conta** |
| Top 25% tempo no site 180d | Remarketing por intenção |
| Vídeo 50%+ assistido (a partir da Fase 1) | Remarketing de baixo custo |

**Interesses (frio, só no conjunto de teste):**
- Futebol/carreira: Treinador de futebol · CBF · Educação física · Ciências do esporte · Futsal · Arbitragem
- Intercâmbio/EUA: Intercâmbio estudantil · Visto J-1 · Work and Travel · Estudar no exterior · Morar fora
- Comportamento: Viajantes frequentes · Ensino superior/Pós-graduação

### 4.3 Sobre o filtro de poder aquisitivo — você está certo em se preocupar

A Meta **removeu a segmentação por renda no Brasil**. Não dá para filtrar
por classe social diretamente. As três formas que funcionam:

1. **Colocar o preço no criativo.** Contraintuitivo, mas é o filtro mais
   eficiente que existe: quem não pode pagar R$ 1.350 não clica, e você
   não paga pelo clique. Recomendo preço explícito em pelo menos metade
   dos anúncios da Fase 2.
2. **Escolaridade** (Ensino superior / Pós) — proxy legítimo que ainda
   existe na plataforma.
3. **Deixar o Lookalike trabalhar.** A base de ex-alunos já é composta por
   gente que pagou esse valor. O algoritmo aprende o padrão econômico
   sozinho — melhor que qualquer filtro manual.

### 4.4 Erro a evitar: não sufoque o Lookalike

Não empilhe idade + interesse + comportamento em cima de um Lookalike 1%.
Isso reduz o público, sobe o CPM e piora exatamente o que torna o LAL bom.
**No conjunto de Lookalike: só geolocalização e idade ampla (21–50).**
Deixe a faixa 21–42 apenas nos conjuntos de interesse.

### 4.5 Geolocalização — **nacional**. O produto não é local.

> **Correção de 21/09.** A primeira versão deste plano restringia a
> segmentação a SP + RJ + MG. Estava errado, e a própria base prova.

O TetraPREP não vende um curso em São Paulo ou no Rio. Vende **a
oportunidade de trabalhar nos Estados Unidos**. São Paulo e Rio são
locais de prova prática, não mercados. Quem está disposto a mudar de país
não é impedido por uma viagem interestadual.

**O que os 518 registros mostram:**

| | Qtd | % |
|---|---|---|
| **Vieram de fora de SP e RJ** | **261** | **50,4%** |
| Vieram de estados que **nunca tiveram núcleo local** | 204 | 39,4% |
| Viajaram **mais de 600 km** | 112 | 21,6% |
| Viajaram mais de 1.200 km | 34 | 6,6% |

**Distância até o núcleo mais próximo:**

| Distância | Pessoas | % |
|---|---|---|
| Mesmo estado do núcleo | 257 | 49,6% |
| Até ~600 km | 149 | 28,8% |
| 600 a 1.200 km | 78 | 15,1% |
| 1.200 a 2.200 km | 27 | 5,2% |
| Mais de 2.200 km | 7 | 1,4% |

Havia alunos do Amapá, Pará, Maranhão, Ceará e Pernambuco — estados sem
núcleo, a mais de 2.000 km. Eles viajaram porque o prêmio é emprego no
exterior, não um curso de fim de semana.

**Segmentação definida:**

| Item | Decisão |
|---|---|
| Geolocalização | **Brasil inteiro**, sem exclusões |
| Quem faz a ponderação regional | **O Lookalike.** A semente são os 518 ex-alunos reais — ela já carrega a distribuição geográfica verdadeira, incluindo o peso maior de SP/RJ/MG. Não é preciso forçar à mão |
| Raio em torno das sedes | **Nunca.** A Baixada Fluminense, sede do núcleo do RJ, é 4,6% do público carioca |

**Três motivos técnicos que reforçam ir nacional:**

1. **Geo estreita encarece.** Menos gente no leilão para o mesmo orçamento
   = CPM maior. Brasil inteiro é mais barato que SP+RJ, não mais caro.
2. **Restringir geo em cima de Lookalike é o erro descrito em 4.4.** O LAL
   já sabe onde estão as pessoas certas.
3. **Público maior = sai mais rápido da aprendizagem**, que é exatamente o
   gargalo desta conta a R$ 70/dia.

**Sobre Minas Gerais:** continua sendo o terceiro maior mercado (111
alunos, 21,4%, com 26 só em Juiz de Fora). Mas o motivo que eu tinha dado
— "fica perto de Xerém" — era a lógica errada. MG importa por **volume**,
não por proximidade. Com segmentação nacional, o ponto fica resolvido
sozinho.

**Porto Velho vira uma vantagem:** com público nacional, o núcleo de
Rondônia (05–08/dez) passa a ser uma terceira opção de data e local para
quem está no Norte e Centro-Oeste. Vale aparecer no criativo.

### 4.6 Gênero — corrigindo a premissa do briefing

A base real é **86,1% masculina / 13,9% feminina** (estimativa por nome).
O briefing dizia "homens e mulheres" — é verdade, mas não meio a meio.

- Verba principal: público masculino
- **Um conjunto dedicado ao público feminino** com criativo próprio. CPM
  de mulheres nesse nicho costuma ser menor e a TetraBrazil tem lastro
  para o ângulo (instrutoras do Red Bull Bragantino e do Vasco Feminino).
  14% de 200 vagas são ~28 mulheres — mercado real, mensagem separada.

### 4.7 Idade — segue sendo palpite, e isso tem solução

A planilha **não tem idade nem data de nascimento**. A faixa 21–42 não
pôde ser validada. Portanto:

- Fase 1 roda com **21–50**, aberto
- O relatório demográfico do Meta mostra em ~3 semanas onde a conversão
  realmente acontece — aí sim estreita, com dado
- Alternativa rápida: exportar data de nascimento do painel do Sympla e
  cruzar por e-mail

### 4.8 Públicos que já existem na conta — o que aproveitar e o que corrigir

Públicos salvos enviados pelo cliente (telas do app, 21/09):

**`Prep 2627 1`**
- Advantage+ audience: **On**
- Geo: **Minas Gerais, Rio de Janeiro e Paraná**
- Idade: 20+ · Sugestão: homens e mulheres, 20–45
- Interesses: *Coaching, Work abroad, Football*

**`Brazil 2025`**
- Geo: **Minas Gerais, Rio de Janeiro e Paraná**
- Idade: homens e mulheres, **22–38**
- Interesses: *Sports, Physical education*

Outros salvos: `Rio Grande do Sul`, `Brasil Sudeste`, `Brasil 2024`, `Brasil 2`.

#### ✅ O que esses públicos acertaram

**Minas Gerais está nos dois.** Isso confirma, por experiência de conta, o
que a base de 518 ex-alunos mostrou de forma independente: MG é o terceiro
maior mercado (21,4%). Duas fontes distintas apontando para o mesmo lugar —
MG entra no plano com confiança alta.

O conjunto de interesses do `Prep 2627 1` (*Coaching / Work abroad /
Football*) é preciso e alinhado à oferta. **É o melhor ponto de partida da
conta.**

A faixa **22–38** do `Brazil 2025` é o dado mais próximo de uma validação
etária que existe hoje (a planilha não tem idade). É mais estreita que os
21–42 do briefing. Serve como hipótese a testar, não como verdade — ver 4.7.

#### 🔴 O erro grave: nenhum dos dois inclui São Paulo

Os dois públicos cobrem **MG + RJ + Paraná**. Paraná fazia todo sentido na
edição **2025-2026**, que tinha **núcleo em Curitiba**. A edição 2026-2027
**não tem núcleo no Paraná** — tem em **São Paulo (Itu)**, **Rio (Xerém)** e
**Porto Velho**.

Ou seja: esses públicos estão calibrados para a geografia do ano passado.
Reaproveitá-los como estão significa:

- **Gastar em Paraná**, onde o núcleo mais próximo agora fica a ~400 km
  (Curitiba → Itu). PR é 6% da base histórica, mas sem núcleo local o
  custo de deslocamento derruba a conversão.
- **Não anunciar em São Paulo**, que é uma das duas praças a encher — e
  justamente a de maior gap (**82 vagas**), menor base histórica (126) e
  prazo mais curto (10/dez).

**Correção obrigatória antes de subir verba:**

| Público | Ação |
|---|---|
| `Prep 2627 1` | Manter os interesses. **Trocar a geo:** remover Paraná, adicionar São Paulo. Desmembrar em duas versões, uma por praça |
| `Brazil 2025` | Interesses amplos demais (*Sports, Physical education*) para um ticket de R$ 1.350. Usar só como conjunto de teste, nunca como principal |
| `Rio Grande do Sul` | Arquivar. RS perdeu o núcleo de Porto Alegre nesta edição (ver 10.2) |
| `Brasil Sudeste` | Verificar se inclui SP. Se incluir, é o mais próximo do alvo correto |

⚠️ **`Advantage+ audience: On` no `Prep 2627 1`:** com essa opção ligada, a
geolocalização e os interesses viram *sugestão* — o Meta entrega fora deles.
Isso ameniza a ausência de SP, mas não resolve: não há controle nem garantia
de entrega na praça certa, e é impossível separar o CPA de SP do de RJ.
**Nas campanhas por praça, Advantage+ audience deve ficar desligado.**

#### ⚠️ "Funcionou" medido com o quê?

A conta **não tem evento de `Purchase`** (ver auditoria). Então esses
públicos não podem ter sido avaliados por venda — no máximo por custo de
clique, alcance ou engajamento. **Clique barato em público amplo é
exatamente o que se espera de `Sports / Physical education`, e não tem
relação com vender um curso de R$ 1.350.**

Tratar esses públicos como "validados para venda" seria um erro. Eles são
uma boa hipótese de partida — a validação real só começa quando o
`InitiateCheckout` e o `Purchase` estiverem no ar.

#### 🔴 Impedimento: as telas são do impulsionamento, não do Gerenciador

A interface mostrada é a de **impulsionar publicação** pelo app. Esse fluxo
**não suporta** o que este plano exige:

- Otimização por `InitiateCheckout` ou `Purchase`
- CBO e campanhas separadas por praça com verba controlada
- Lookalike a partir de público personalizado
- Exclusão de compradores e de quem já iniciou o checkout
- Janela de atribuição e relatório por conjunto

**Toda a Fase 2 precisa rodar no Gerenciador de Anúncios.** Impulsionamento
serve para a Fase 1 (aquecimento e vídeo), não para a fase de conversão.

## 5. Estrutura de campanhas

### FASE 1 — Construção (21/set – 25/out) · R$ 15/dia

**Campanha 1 — `PREP2627 | F1 | Aquecimento Vídeo`**
- Objetivo: **Engajamento → ThruPlay**
- Orçamento: ABO R$ 15/dia · 1 conjunto
- Público: SP + RJ · 21–45 · interesses futebol/intercâmbio (amplo)
- Criativo: 3–4 vídeos rodando em paralelo (ver seção 6)
- Posicionamentos: Automáticos (Reels + Stories dominam)

**Função:** visualização de vídeo é a forma mais barata de construir
público de remarketing. R$ 525 rendem milhares de espectadores que viram
público quente em novembro — e o Hook Rate/Hold Rate diz qual criativo
levar para a Fase 2 **antes** de gastar os R$ 2.450.

**Não espere venda nesta fase.** Se vier alguma, é bônus.

### FASE 2 — Conversão (26/out – 29/nov) · R$ 70/dia

> **Revisado em 21/09.** A versão anterior separava campanhas por praça.
> Com público nacional e **evento único no Sympla** (a praça é escolhida
> depois da compra), SP e RJ não são dois mercados geográficos — são
> **duas datas do mesmo produto**. As 153 vagas em aberto são um só
> objetivo, não dois.

Consolidar também resolve o gargalo do orçamento: a R$ 70/dia, quanto
menos conjuntos, mais rápido cada um sai da fase de aprendizagem.

**Campanha 2 — `PREP2627 | F2 | Vendas` · CBO R$ 55/dia**
- Objetivo: Vendas · Otimização: `InitiateCheckout` · Atribuição 7d/1d
- **Geo: Brasil** · Advantage+ audience desligado nos conjuntos 2.1 e 2.2

| Conjunto | Público | Idade |
|---|---|---|
| 2.1 | **Lookalike 1% da base + 47 inscritos** | 21–50, **sem interesses empilhados** |
| 2.2 | Interesses *Coaching · Work abroad · Football* (herdados da conta antiga, ver 4.8) | 22–45 |
| 2.3 (teste, 2ª semana) | Público feminino com criativo próprio (ver 4.6) | 22–45 |

**Campanha 3 — `PREP2627 | F2 | Remarketing` · ABO R$ 15/dia**

| Conjunto | Público | R$/dia |
|---|---|---|
| 3.1 | `InitiateCheckout` 30d SEM compra + visitantes 30d | R$ 9 |
| 3.2 | Engajamento IG/FB 365d + Vídeo 50%+ (excluindo 3.1) | R$ 6 |

Excluir compradores e a base de ex-alunos das campanhas frias.

**Como ler a praça sem separar campanha:** pelo detalhamento por região do
Meta cruzado com o campo de núcleo no Sympla (ver 2.0). Se um dos núcleos
encher antes, a correção é **de criativo** — passar a destacar a outra
data — não de segmentação.

> **Por que otimizar por `InitiateCheckout` e não por `Purchase`:** a
> R$ 70/dia com CPA de R$ 180 saem ~2,7 compras/semana. O Meta precisa de
> ~50 eventos/semana por conjunto para sair da aprendizagem — otimizar por
> compra travaria a campanha. `InitiateCheckout` a ~R$ 25 gera ~20/semana,
> volume suficiente para o algoritmo aprender, e é o evento mais próximo
> da venda. **Se após 10 dias o volume de IC ficar abaixo de 15/semana,
> descer para `ViewContent`.** A compra continua sendo medida — só não é
> o alvo da otimização.

### FASE 3 — Fechamento (30/nov – 14/dez) · R$ 68/dia

Geo continua **nacional**. O que muda é a **data em destaque no criativo**,
não a segmentação.

| Campanha | R$/dia | Foco |
|---|---|---|
| Vendas (CBO) | R$ 38 | Criativo passa a destacar a data do **Rio (17–20/dez)**, com contagem regressiva |
| Remarketing urgência (ABO) | R$ 30 | "Últimas vagas", "encerra dia X" |

🔴 **~05/dez: tirar a data de São Paulo (10–13/dez) de todos os criativos.**
Não é pausar campanha — é parar de anunciar uma data que não dá mais para
vender. A campanha segue vendendo a data do Rio.
🔴 **~14/dez: encerrar.** O núcleo do Rio começa em 17/dez.

Nesta fase o remarketing recebe 44% da verba — é onde o CPA é mais barato
e onde a urgência converte.

## 6. Criativos

### Ângulos a testar (4 na Fase 1, escalar o vencedor)

| # | Ângulo | Gancho (primeiros 3s) |
|---|---|---|
| 1 | **Prova de resultado** ⭐ | "Em 2025, 220 treinadores fizeram esse curso. 90 receberam proposta para trabalhar nos Estados Unidos." |
| 2 | **Quebra de objeção** ⭐ | "Você não precisa de faculdade de Educação Física para trabalhar com futebol nos EUA." |
| 3 | **Concretude da oferta** | "USD 250 por semana, hospedagem, transporte, seguro e passagem paga. Visto J-1." |
| 4 | **Autoridade/lugar** | "4 dias dentro do CT do Fluminense em Xerém." |
| 5 | **Depoimento** | Ex-aluno que hoje trabalha nos EUA, falando em primeira pessoa |
| 6 | **Feminino** (conjunto dedicado) | Treinadora falando com treinadoras — o futebol feminino nos EUA e as instrutoras da própria TetraBrazil |

Os ângulos 1 e 2 são os mais fortes: o 1 usa número real e verificável, o
2 ataca exatamente a crença que trava o público ("isso não é pra mim").

### Especificações

- **Formato principal:** 9:16 vertical (Reels/Stories) — é onde o público
  de 21–45 está e onde o CPM é mais barato
- **Secundário:** 4:5 para feed · carrossel para quebra de objeções
- **Legenda queimada no vídeo** — a maioria assiste sem som
- **Preço explícito** em pelo menos metade dos anúncios da Fase 2 (filtro
  de qualificação, ver 4.3)
- **Logos dos clubes** (Fluminense, Cruzeiro, Santos, Grêmio, Red Bull
  Bragantino, CBF) — transferência de autoridade imediata
- Os 2 vídeos do YouTube já embedados na página servem de matéria-prima

### Regra de rotação

Trocar criativo quando a frequência passar de **2,5** na Fase 2 ou o CTR
(link) cair 30% em relação aos 3 primeiros dias. Ter sempre 2 criativos
novos prontos antes de precisar.

---

## 7. Métricas e limites de decisão

| Métrica | Alvo | 🔴 Alerta |
|---|---|---|
| CPM | R$ 25 – 50 | > R$ 70 |
| CTR (link) | > 1,2% | < 0,7% |
| Hook Rate (VV3s / Impressões) | > 25% | < 15% |
| Hold Rate (ThruPlay / VV3s) | > 20% | < 10% |
| Conectividade (LPV / cliques) | > 80% | < 60% |
| Custo por visualização da LP | R$ 0,60 – 1,50 | > R$ 2,50 |
| Custo por `InitiateCheckout` | R$ 15 – 35 | > R$ 60 |
| Conversão Sympla (`Purchase`/`IC`) | > 8% | < 3% |
| **CPA final** | **R$ 130 – 220** | **> R$ 300** |
| ROAS | 6x – 10x | < 4x |
| Frequência | < 2,5 | > 3,5 |

### Regras de corte (aplicar sem hesitar)

- Conjunto com gasto > 2× o CPA-alvo e **zero** compras → **pausar**
- Anúncio com frequência > 3,5 e CTR em queda → **pausar**
- Conectividade < 60% → problema de velocidade da página, não de anúncio
- Conversão Sympla < 3% → o vazamento está no checkout, não na mídia:
  **parar de escalar e consertar o Sympla primeiro**
- Conjunto com CPA 30% abaixo da meta por 3 dias → **+20% de verba**
  (nunca mais que +20% a cada 48h — aumento maior reinicia a aprendizagem)

---

## 8. Checklist de execução

**Hoje (21/09)**
- [ ] Redirecionar `.com.br/novoprep` → `.com/novoprep`
- [ ] Definir o pixel oficial e remover o segundo `fbq('init')`
- [ ] Enviar o CSV para análise de geo/idade e upload como Público Personalizado
- [ ] Criar Públicos de Engajamento IG/FB 365d (não depende de nada)
- [ ] Confirmar o preço oficial: R$ 1.350 ou R$ 1.300
- [ ] Subir a Campanha 1 (Fase 1) com 3–4 vídeos

**Esta semana**
- [ ] Implementar `ViewContent` e `InitiateCheckout` com `content_category` por cidade
- [ ] Ativar o pixel no painel do organizador do Sympla
- [ ] Criar Lookalike 1% e 2–3% da lista
- [ ] Definir a data-limite de matrícula de cada núcleo
- [ ] Disparar e-mail/WhatsApp para a base de ex-alunos (custo zero, maior ROI)
- [ ] Montar o programa de indicação com os 47 já inscritos

**Até 19/10**
- [ ] Analisar Fase 1: eleger criativo e público vencedores
- [ ] Confirmar que `Purchase` está chegando no Gerenciador de Eventos
- [ ] Montar as campanhas da Fase 2 (deixar prontas e pausadas)

**26/10**
- [ ] Ligar a Fase 2

---

## 9. Pendências com o cliente

1. **Data-limite real de matrícula** de cada núcleo — há 16h de aula online
   obrigatória antes do presencial. Se o aluno precisa de 3 semanas para
   concluir, a venda de SP fecha em ~20/nov, não em 05/dez. Isso muda o
   calendário inteiro.
2. **Preço oficial** — R$ 1.350 (site) ou R$ 1.300 (seu briefing)?
3. **Porto Velho (05–08/dez)** entra no tráfego pago ou fica só com a
   parceria da Federação de Rondônia?
4. **O Sympla permite pixel do Meta** no plano atual da conta?
5. **CSV** — colunas disponíveis, principalmente se há registro de quem
   foi efetivamente contratado nos EUA.
6. **Conta de anúncio** — qual será usada e qual dos dois pixels está
   vinculado a ela?

---

## 10. Canais de custo zero identificados na base

A análise da planilha revelou dois canais que provavelmente rendem mais
que os R$ 4.000 de mídia — e custam zero.

### 10.1 Clusters institucionais

Cidades pequenas com concentração anômala de alunos:

| Cidade | Alunos |
|---|---|
| **Rio das Flores / RJ** | **11** (município de ~9 mil habitantes) |
| Ouro Preto / MG | 5 |
| Valença / RJ | 5 |
| Cláudio / MG · Maricá / RJ · Petrópolis / RJ | 4 cada |
| Rio das Ostras / RJ · Cachoeira do Campo / MG | 3 cada |

Onze alunos de uma cidade de 9 mil habitantes não é demanda orgânica — é
um clube, uma escola ou um professor multiplicador. **Identificar quem
levou cada grupo e reativar a ponte para 2026-2027** é a ação de maior
retorno por real gasto neste plano. É a mesma lógica do núcleo de Porto
Velho com a Federação de Rondônia, só que aplicada de propósito.

### 10.2 O Sul perdeu o núcleo local

PR (31) + RS (26) + SC (16) = **73 pessoas, 14,1% da base**. A edição
2025-2026 tinha núcleos em Curitiba e Porto Alegre; a 2026-2027 não tem.

Não é alvo de mídia paga (o deslocamento inviabiliza), mas "seu núcleo
mudou — o mais próximo agora é São Paulo" é uma mensagem legítima de
e-mail/WhatsApp para 73 pessoas que já compraram esse produto.
