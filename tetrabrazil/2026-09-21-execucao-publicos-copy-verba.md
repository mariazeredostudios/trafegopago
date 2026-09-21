# Execução — Públicos, Copy e Verba · TetraPREP 2026-2027

> Pixel único confirmado no ar em 21/09: **`1100395945778742`**
> (dispara só `PageView` — falta `ViewContent` e `InitiateCheckout`)
> Destino: `https://www.tetrabrazil.com/novoprep` · Ticket R$ 1.350
> Verba total: **R$ 3.995** · 21/set a 14/dez/2026

---

## PARTE 1 — PÚBLICOS

### 1.1 Criar agora (Gerenciador → Públicos)

**Personalizados — origem própria**

| # | Nome | Como criar |
|---|---|---|
| 1 | `CA \| Base ex-alunos 518` | Upload do CSV no formato Meta (arquivo já entregue) |
| 2 | `CA \| Compradores 2026-27` | Upload dos 47 inscritos (exportar do Sympla) |

**Personalizados — pixel `1100395945778742`**

| # | Nome | Regra | Retenção |
|---|---|---|---|
| 3 | `CA \| Site todos` | Todos os visitantes | 180 d |
| 4 | `CA \| ViewContent` | Evento `ViewContent` | 180 d |
| 5 | `CA \| InitiateCheckout` | Evento `InitiateCheckout` | 30 d |
| 6 | `CA \| Top 25% tempo` | 25% do tempo no site | 180 d |

**Personalizados — engajamento (não dependem do pixel, criar hoje)**

| # | Nome | Origem |
|---|---|---|
| 7 | `CA \| IG engajamento` | Conta do Instagram · qualquer interação · 365 d |
| 8 | `CA \| FB engajamento` | Página do Facebook · qualquer interação · 365 d |
| 9 | `CA \| Video 50%+` | Vídeo · assistiu 50% · 365 d *(criar após a Fase 1)* |

**Semelhantes**

| # | Nome | Semente | Local |
|---|---|---|---|
| 10 | `LAL \| 1% BR` ⭐ | #1 **+** #2 combinados | Brasil |
| 11 | `LAL \| 2-3% BR` | mesma | Brasil — reserva, só se o 1% saturar |

> Juntar #1 e #2 na mesma semente: 518 + 47 = 565. Quanto maior, melhor o modelo.

### 1.2 Exclusões obrigatórias

Em **toda campanha fria**, excluir: `CA | Base ex-alunos 518`,
`CA | Compradores 2026-27` e `CA | InitiateCheckout`.
No remarketing 3.2, excluir também o público do 3.1 (evita sobreposição).

### 1.3 Configuração comum

| Parâmetro | Valor |
|---|---|
| **Geolocalização** | **Brasil** — sem exclusões (50,4% da base veio de fora de SP/RJ) |
| Idade | 21–50 nos conjuntos de Lookalike · 22–45 nos de interesse |
| Gênero | Todos (exceto no conjunto feminino dedicado) |
| Advantage+ audience | **Desligado** nos conjuntos de Lookalike e interesse |
| Posicionamentos | Automáticos (Advantage+ posicionamentos) |
| Atribuição | 7 dias clique / 1 dia visualização |
| Destino | `tetrabrazil.com/novoprep` + UTM |

---

## PARTE 2 — ESTRUTURA E VERBA

### FASE 1 · 21/set – 25/out · 35 dias · R$ 15/dia · **R$ 525**

**`PREP2627 | F1 | Aquecimento Video`** — ABO R$ 15/dia
- Objetivo: **Engajamento → ThruPlay**
- Público: Brasil · 21–50 · todos os gêneros
- Interesses: *Coaching · Work abroad · Football*
- Criativos: 4 vídeos rodando juntos (ângulos 1, 2, 3 e 5)

Função: construir `CA | Video 50%+` barato e descobrir qual criativo tem
Hook Rate e Hold Rate melhores **antes** de gastar os R$ 2.450.
**Não espere venda aqui.**

### FASE 2 · 26/out – 29/nov · 35 dias · R$ 70/dia · **R$ 2.450**

**`PREP2627 | F2 | Vendas`** — **CBO R$ 55/dia**
Objetivo: Vendas · Otimização: **`InitiateCheckout`**

| Conjunto | Público | Idade | Entra em |
|---|---|---|---|
| 2.1 | `LAL \| 1% BR` (sem interesses empilhados) | 21–50 | 26/out |
| 2.2 | Interesses *Coaching · Work abroad · Football* | 22–45 | 26/out |
| 2.3 | Mesmos interesses, **só mulheres**, criativo próprio | 22–45 | 2ª semana |

**`PREP2627 | F2 | Remarketing`** — **ABO R$ 15/dia**

| Conjunto | Público | R$/dia |
|---|---|---|
| 3.1 | `CA \| InitiateCheckout` + `CA \| Site todos` (30 d) | R$ 9 |
| 3.2 | `CA \| IG engajamento` + `CA \| FB engajamento` + `CA \| Video 50%+` | R$ 6 |

### FASE 3 · 30/nov – 14/dez · 15 dias · R$ 68/dia · **R$ 1.020**

| Campanha | R$/dia | O que muda |
|---|---|---|
| `PREP2627 \| F3 \| Vendas` (CBO) | R$ 38 | Criativo passa a destacar **só a data do Rio** |
| `PREP2627 \| F3 \| RMKT Urgencia` (ABO) | R$ 30 | Escassez e prazo |

🔴 **~05/dez:** tirar a data de São Paulo dos criativos (núcleo 10–13/dez).
🔴 **~14/dez:** encerrar. O núcleo do Rio começa em 17/dez.
**A geolocalização segue nacional o tempo todo.**

### Resumo da verba

| Fase | Período | R$/dia | Total | % |
|---|---|---|---|---|
| 1 — Aquecimento | 21/set – 25/out | 15 | 525 | 13% |
| 2 — Conversão | 26/out – 29/nov | 70 | 2.450 | 61% |
| 3 — Fechamento | 30/nov – 14/dez | 68 | 1.020 | 26% |
| | | | **3.995** | |

Projeção realista: **~22 vendas · R$ 29.700 · ROAS 7,4x**

---

## PARTE 3 — COPY

> Preço a confirmar: o site diz **R$ 1.350**. Onde aparecer `R$ 1.350`,
> trocar se o valor oficial for outro.
> As datas dos três núcleos: Porto Velho 05–08/dez · São Paulo (Itu)
> 10–13/dez · Rio (Xerém) 17–20/dez.

### Anúncio 1 — Prova de resultado ⭐ *(principal)*

**Gancho (3s):** "No ano passado, 220 treinadores fizeram esse curso. 90 receberam proposta para trabalhar nos Estados Unidos."

**Texto principal:**
```
Em 2025, 220 pessoas fizeram o TetraPREP.
90 receberam proposta de trabalho nos Estados Unidos.

Não é sorteio, não é promessa. É um processo que a TetraBrazil
roda há 25 anos: mais de 1.000 treinadores contratados e mais de
95% de aprovação de visto desde 2009.

O que você recebe lá fora:
• USD 210 a 250 por semana
• Hospedagem, transporte e seguro saúde inclusos
• Passagem aérea paga
• Visto J-1

40 horas de capacitação: 16h online ao vivo + 24h de imersão
presencial em Porto Velho (5–8/dez), São Paulo (10–13/dez) ou
Rio de Janeiro, no CT da base do Fluminense (17–20/dez).

Investimento: R$ 1.350.
Vagas limitadas por núcleo.
```
**Título:** `90 dos 220 alunos de 2025 receberam proposta nos EUA`
**Descrição:** `TetraPREP 2026-2027 · 40h · a partir de R$ 1.350`
**CTA:** Saiba mais

### Anúncio 2 — Quebra de objeção ⭐ *(principal)*

**Gancho (3s):** "Você não precisa de faculdade de Educação Física para trabalhar com futebol nos Estados Unidos."

**Texto principal:**
```
Você não precisa de faculdade de Educação Física.
Não precisa ser inglês fluente.
Não precisa já ter trabalhado em clube grande.

O TetraPREP recebe estudantes, treinadores e profissionais de
qualquer área que queiram trabalhar com futebol no exterior.

Em 25 anos, a TetraBrazil já contratou mais de 1.000 treinadores
brasileiros para os Estados Unidos. Mais de 100 ex-alunos hoje
atuam em bases e times profissionais de clubes grandes.

O que trava a maioria não é currículo. É não saber que existe
um caminho estruturado.

40 horas de capacitação — 16h online + 24h presenciais.
Núcleos: Porto Velho, São Paulo (Itu) e Rio (CT do Fluminense).
R$ 1.350.
```
**Título:** `Sem faculdade de Educação Física. Com proposta nos EUA.`
**CTA:** Saiba mais

### Anúncio 3 — Concretude da oferta

**Gancho (3s):** "USD 250 por semana, com casa, transporte e passagem pagas."

**Texto principal:**
```
O que um treinador brasileiro recebe trabalhando nos EUA pela
TetraBrazil:

USD 210 a 250 por semana
Hospedagem inclusa
Transporte incluso
Seguro saúde de até USD 50 mil
Passagem aérea paga
Visto J-1 (mais de 95% de aprovação desde 2009)

Dois programas: Summer Camps (junho a agosto) e Academy
(abril a setembro).

O caminho até lá é o TetraPREP: 40 horas de capacitação com
treinadores de Fluminense, Cruzeiro, Santos, Vasco e Red Bull
Bragantino. Avaliação enviada direto para os clubes parceiros
nos Estados Unidos.

R$ 1.350 · Núcleos em dezembro
```
**Título:** `USD 250/semana + casa + passagem. Visto J-1.`
**CTA:** Saiba mais

### Anúncio 4 — Autoridade e lugar

**Gancho (3s):** "Quatro dias treinando dentro do CT da base do Fluminense."

**Texto principal:**
```
A parte prática do TetraPREP acontece dentro de centros de
treinamento de verdade.

No Rio: CT da Base do Fluminense, em Xerém — o mesmo lugar
onde a base tricolor é formada. 17 a 20 de dezembro.
Em São Paulo: Teal Rising Academy, em Itu. 10 a 13 de dezembro.
Em Porto Velho: Centro de Desenvolvimento do Futebol de
Rondônia. 5 a 8 de dezembro.

24 horas de campo simulando uma semana de camp no padrão
norte-americano, com instrutores de Fluminense, Cruzeiro,
Santos, Vasco e Red Bull Bragantino.

Você é avaliado em campo, em inglês, em liderança e em
profissionalismo — e essa avaliação vai para os clubes
parceiros nos EUA.

R$ 1.350 · Vagas limitadas
```
**Título:** `4 dias dentro do CT da base do Fluminense`
**CTA:** Saiba mais

### Anúncio 5 — Depoimento *(vídeo de ex-aluno)*

**Gancho (3s):** ex-aluno em campo nos EUA — "Há dois anos eu dava aula em escolinha. Hoje eu trabalho aqui."

**Texto principal:**
```
Mais de 500 profissionais já foram contratados para trabalhar
com futebol nos Estados Unidos através da TetraBrazil.

Todos começaram do mesmo jeito: fazendo o TetraPREP.

16h de aula online ao vivo + 24h de imersão presencial.
Avaliação enviada aos clubes parceiros nos EUA.
Entrevistas e seleção entre fevereiro e março.
Contratações entre fevereiro e abril.

Núcleos de dezembro: Porto Velho, São Paulo (Itu) e
Rio de Janeiro (CT do Fluminense).

R$ 1.350
```
**Título:** `+500 brasileiros contratados para trabalhar nos EUA`
**CTA:** Saiba mais

### Anúncio 6 — Feminino *(conjunto 2.3)*

**Gancho (3s):** "O futebol feminino nos Estados Unidos está contratando — e não é só jogadora."

**Texto principal:**
```
O futebol feminino é o que mais cresce nos Estados Unidos — e
falta gente qualificada na comissão técnica.

O TetraPREP forma treinadoras para esse mercado. Entre as
instrutoras do curso estão profissionais do Red Bull Bragantino
Feminino e a coordenação do Vasco Feminino.

Você não precisa de faculdade de Educação Física.
Você precisa de capacitação e de uma porta de entrada.

USD 210 a 250 por semana, hospedagem, transporte, seguro e
passagem inclusos. Visto J-1, com mais de 95% de aprovação.

40 horas · Núcleos em dezembro · R$ 1.350
```
**Título:** `Treinadoras brasileiras trabalhando nos EUA`
**CTA:** Saiba mais

### Especificações de criativo

| Item | Regra |
|---|---|
| Formato principal | 9:16 vertical (Reels/Stories) |
| Secundário | 4:5 feed · carrossel para o anúncio 2 |
| Legenda | Queimada no vídeo — a maioria assiste sem som |
| Preço | Explícito em pelo menos 3 dos 6 anúncios (filtra quem não pode pagar antes do clique) |
| Logos | Fluminense, Cruzeiro, Santos, Vasco, Grêmio, Red Bull Bragantino, CBF |
| Rotação | Trocar quando frequência > 2,5 ou CTR cair 30% vs. os 3 primeiros dias |

### UTM padrão

```
https://www.tetrabrazil.com/novoprep?utm_source=meta&utm_medium=paid&utm_campaign=prep2627_{fase}&utm_content={publico}_{anuncio}&utm_term={{adset.id}}
```

---

## PARTE 4 — O QUE AINDA TRAVA

| # | Pendência | Impacto |
|---|---|---|
| 1 | `ViewContent` e `InitiateCheckout` no site (pixel `1100395945778742` só dispara `PageView`) | **Sem isso a Fase 2 não tem por que otimizar.** A Fase 1 pode subir hoje mesmo assim |
| 2 | `Purchase` via pixel no painel do Sympla | Sem ROAS real |
| 3 | Redirect `tetrabrazil.com.br/novoprep` → `.com/novoprep` | Clique que cai no `.com.br` morre num 404 |
| 4 | Preço oficial: R$ 1.350 ou R$ 1.300 | Copy e checkout precisam bater |
| 5 | Data-limite real de matrícula por núcleo | Define quando tirar cada data do criativo |
| 6 | Limite de gasto da conta nova | Pode barrar os R$ 70/dia da Fase 2 |
