# Execução — Públicos, Copy e Verba · TetraPREP 2026-2027

> Pixel único confirmado no ar em 21/09: **`1100395945778742`**
> (dispara só `PageView` — falta `ViewContent` e `InitiateCheckout`)
> Destino: `https://www.tetrabrazil.com/novoprep` · Ticket R$ 1.350
> Conta em **dólar** · Verba total: **US$ 773,90** · 21/set a 14/dez/2026
> **Sem fase de aquecimento — venda direta desde o dia 1.**

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
| 9 | ~~`CA \| Video 50%+`~~ | Descartado — sem campanha de vídeo não há público de vídeo |

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

## PARTE 2 — ESTRUTURA E VERBA (conta em **USD** · total **US$ 775**)

> **Revisado: fase de aquecimento eliminada.** Venda direta desde o dia 1.
> Câmbio implícito R$ 5,16/US$.
> ⚠️ Fatura paga com cartão brasileiro leva **IOF + spread** por cima —
> US$ 775 pode sair por R$ 4.200–4.400. O teto é o que o Meta gasta, não
> o custo final.

### 2.1 O que muda sem aquecimento

| | Custo | Ganho |
|---|---|---|
| Sem teste de criativo prévio | Descobrimos o anúncio vencedor **gastando**, não antes | 100% da verba vai para venda |
| Sem público de vídeo | Perde-se uma fonte barata de remarketing | **O tráfego de venda constrói público de site, que é mais quente que espectador de vídeo** |

Substituto do teste: subir **4 anúncios no mesmo conjunto** desde o início
e deixar o Meta escolher. Pausar os perdedores na segunda semana.

### 2.2 ⚠️ O gargalo: `InitiateCheckout` ainda não existe

O pixel `1100395945778742` só dispara `PageView`. Sem evento de fundo de
funil, o objetivo **Vendas não tem por que otimizar** — ele exige um
evento de conversão.

Por isso a operação tem **dois blocos**, e a virada entre eles é
disparada pelo evento entrar no ar, não por data fixa.

### 2.3 BLOCO A — 21/set até o `InitiateCheckout` subir · **US$ 7,50/dia**

**`PREP2627 | A | Trafego Venda`** — Objetivo **Tráfego** · Otimização
**Visualizações da página de destino** · CBO **US$ 7,50/dia**

| Conjunto | Público | Idade |
|---|---|---|
| A.1 | `LAL \| 1% BR` (semente: 518 ex-alunos + 47 compradores) | 21–50, sem interesses |
| A.2 | Interesses *Coaching · Work abroad · Football* | 22–45 |

Geo **Brasil** · Advantage+ audience desligado · 4 anúncios por conjunto.

**Isto não é aquecimento.** É venda com a melhor otimização disponível
hoje: leva gente com intenção até a landing page, de onde ela clica para
o Sympla. E semeia o pixel para o Bloco B.

⚠️ Otimização por LPV **não mede venda**. Enquanto o Bloco A rodar, a
única leitura real de vendas é o painel do Sympla.

### 2.4 BLOCO B — do evento no ar até 14/dez · **US$ 10,60/dia**

| Campanha | Tipo | US$/dia | Conjuntos |
|---|---|---|---|
| `PREP2627 \| B \| Vendas` | **CBO** | **7,60** | **B.1** `LAL \| 1% BR` · 21–50<br>**B.2** Interesses *Coaching/Work abroad/Football* · 22–45 · **inclui o criativo feminino** |
| `PREP2627 \| B \| Remarketing` | ABO | **3,00** | **B.3** conjunto único: `CA \| InitiateCheckout` + `CA \| Site todos 30d` + `CA \| IG engajamento` + `CA \| FB engajamento` |

Objetivo **Vendas** · Otimização **`InitiateCheckout`** · Atribuição
7d clique / 1d visualização · Geo **Brasil**.

> Se após 10 dias o volume de `InitiateCheckout` ficar abaixo de
> 15/semana, descer a otimização para `ViewContent`.

### 2.5 Verba

| Bloco | Período previsto | Dias | **US$/dia** | **Total** |
|---|---|---|---|---|
| A — Tráfego/venda | 21/set – 31/out | 41 | **7,50** | **307,50** |
| B — Vendas + remarketing | 01/nov – 14/dez | 44 | **10,60** | **466,40** |
| | | 85 | | **773,90** |

A data de virada (01/nov) é **estimativa**. A virada real acontece assim
que o `InitiateCheckout` subir:

- **Evento no ar antes de 01/nov** → migra para o Bloco B na hora e roda
  a US$ 7,50/dia até 31/out, subindo para US$ 10,60 em 01/nov
- **Evento atrasa para depois de 01/nov** → o Bloco A continua, mas já a
  US$ 10,60/dia. Cada semana de atraso é uma semana otimizando por
  clique em vez de por compra

O degrau de US$ 7,50 → US$ 10,60 em 01/nov também protege a conta nova:
gasto crescente e regular, sem salto brusco.

### 2.6 Calendário

| Data | Ação |
|---|---|
| **21/set** | Subir Bloco A · US$ 7,50/dia |
| ~28/set | Pausar os 2 anúncios de pior CTR, manter os 2 melhores |
| **Assim que o IC subir** | Criar Bloco B, desligar o Bloco A |
| **01/nov** | Verba para US$ 10,60/dia · ligar remarketing |
| ~29/nov | Última chamada para a data de São Paulo |
| **~05/dez** | 🔴 Tirar a data de SP dos criativos (núcleo 10–13/dez) |
| 05/dez – 14/dez | Criativo só com a data do Rio + urgência |
| **~14/dez** | 🔴 Encerrar (núcleo do Rio começa 17/dez) |

Geo segue **nacional** o tempo todo. O que muda no fim é a data
destacada no criativo, nunca a segmentação.

### 2.7 Metas em dólar

| Métrica | Alvo R$ | **Alvo US$** |
|---|---|---|
| CPM | 25 – 50 | **4,84 – 9,69** |
| Custo por visualização da LP *(métrica-chave do Bloco A)* | 0,60 – 1,50 | **0,12 – 0,29** |
| Custo por `InitiateCheckout` | 15 – 35 | **2,91 – 6,78** |
| **CPA final** | **130 – 220** | **25,19 – 42,62** |
| Ticket | 1.350 | **261,56** |
| ROAS | 6x – 10x | igual |

**Projeção:** ~22 vendas · R$ 30.000 · ROAS 7,4x.

> **No pixel, manter `currency: 'BRL'` e `value: 1350.00`.** A venda
> acontece em reais no Sympla; o Meta converte sozinho para exibir o ROAS
> na moeda da conta.

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
| 1 | **`InitiateCheckout` no site** (pixel `1100395945778742` só dispara `PageView`) | 🔴 **Agora é o item mais caro da lista.** Cada semana de atraso é uma semana otimizando por clique em vez de por compra. O Bloco A sobe hoje sem ele, mas paga esse preço |
| 2 | `Purchase` via pixel no painel do Sympla | Sem ROAS real |
| 3 | Redirect `tetrabrazil.com.br/novoprep` → `.com/novoprep` | Clique que cai no `.com.br` morre num 404 |
| 4 | Preço oficial: R$ 1.350 ou R$ 1.300 | Copy e checkout precisam bater |
| 5 | Data-limite real de matrícula por núcleo | Define quando tirar cada data do criativo |
| 6 | Limite de gasto da conta nova | Pode barrar os US$ 10,60/dia do Bloco B |
