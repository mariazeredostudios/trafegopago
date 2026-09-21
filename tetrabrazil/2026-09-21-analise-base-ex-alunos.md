# Análise da base de ex-participantes TetraPREP — 21/09/2026

Fonte: `TetraBrazil_Database_-_TetraPREP_-_Sheet1.csv` · **518 registros**
Colunas disponíveis: Nome, Sobrenome, CEP, Endereço, E-mail, Telefone.

> O arquivo bruto **não está versionado** (dados pessoais de 518 pessoas).
> Este documento contém apenas o agregado.

---

## 1. Qualidade dos dados — a lista está pronta para o Meta

| Verificação | Resultado |
|---|---|
| E-mails preenchidos | 518/518 (100%) |
| E-mails válidos e únicos | **517** (99,8%) |
| Telefones válidos e únicos | **518** (100%) — sendo 511 celulares |
| Registros duplicados | **0** |
| Domínios | gmail 370 · hotmail 94 · outlook 12 · icloud 9 |

É uma lista limpa. Com e-mail **e** telefone nos dois campos, a taxa de
correspondência no Meta tende a ficar em 60–75%, o que dá ~310–390
pessoas correspondidas.

⚠️ **Mas são 518 registros, não os 1.000+ mencionados.** Isso passa do
mínimo do Meta (100 correspondidos) para criar Lookalike, porém fica
abaixo da faixa ideal (1.000–5.000). O Lookalike vai funcionar, com
qualidade moderada. **Para melhorar:** somar os 47 já inscritos em
2026-2027 e qualquer outra base (leads, newsletter, WhatsApp) na mesma
semente. Cada registro adicional melhora o modelo.

---

## 2. Geolocalização — o achado que muda a campanha

### Distribuição por estado

| UF | Qtd | % | |
|---|---|---|---|
| **RJ** | 131 | 25,3% | ███████████████ |
| **SP** | 126 | 24,3% | ██████████████ |
| **MG** | **111** | **21,4%** | ████████████ |
| PR | 31 | 6,0% | ███ |
| RS | 26 | 5,0% | ███ |
| DF | 23 | 4,4% | ██ |
| BA | 17 | 3,3% | █ |
| SC | 16 | 3,1% | █ |
| GO | 12 | 2,3% | █ |
| Outros 10 estados | 25 | 4,8% | |

**Minas Gerais é o terceiro maior mercado — e nunca teve núcleo.** Esses
111 alunos viajaram para fazer o curso.

### O detalhe que importa: onde em Minas

| Região de MG | Qtd |
|---|---|
| **Zona da Mata (Juiz de Fora)** | **40** |
| Leste/Centro-Oeste (Ipatinga, Gov. Valadares, Divinópolis) | 27 |
| Belo Horizonte + RMBH | 29 |
| Sul de Minas, Triângulo, outros | 15 |

**Juiz de Fora sozinha tem 26 pessoas** — a terceira cidade da base
inteira, atrás só de Rio (69) e São Paulo (46). E Juiz de Fora fica a
~180 km de Xerém: mais perto do núcleo do Rio do que boa parte do próprio
estado do Rio.

Confirmado de forma independente pelo DDD do telefone: DDD 32 (Juiz de
Fora) = 34 pessoas (6,6%), DDD 31 (BH) = 43 (8,3%).

### Cobertura por cenário de segmentação

| Cenário | Cobre | % da base histórica |
|---|---|---|
| A — só SP + RJ | 257 | 49,6% |
| **B — SP + RJ + Zona da Mata/Sul de MG** | **300** | **57,9%** |
| **C — SP + RJ + MG inteiro** | **368** | **71,0%** |

Segmentar apenas SP e RJ deixa metade da demanda histórica de fora.

### Raio real de cada núcleo

**Rio de Janeiro — núcleo em Xerém/Duque de Caxias**

| Região | Qtd | % do RJ |
|---|---|---|
| Rio capital | 69 | 52,7% |
| Sul Fluminense (Volta Redonda, Valença, Rio das Flores) | 24 | 18,3% |
| Niterói / São Gonçalo | 11 | 8,4% |
| Norte e Lagos (Campos, Macaé, Cabo Frio) | 9 | 6,9% |
| Região Serrana (Petrópolis, Teresópolis) | 7 | 5,3% |
| **Baixada Fluminense (onde o núcleo fica)** | **6** | **4,6%** |

⚠️ **O público não mora onde o evento acontece.** A Baixada — sede do
núcleo — é 4,6% da base do RJ. O público está no Rio capital e no Sul
Fluminense. Segmentar "Duque de Caxias + raio" seria um erro grave.

**São Paulo — núcleo em Itu**

| Região | Qtd | % do SP |
|---|---|---|
| SP capital | 45 | 35,7% |
| **Campinas / Itu / Jundiaí / Piracicaba** | **27** | **21,4%** |
| Ribeirão Preto / Araraquara | 15 | 11,9% |
| ABC Paulista | 11 | 8,7% |
| São José do Rio Preto | 6 | 4,8% |
| Baixada Santista | 6 | 4,8% |
| Sorocaba / Itapetininga | 5 | 4,0% |
| Demais interior | 11 | 8,7% |

O interior paulista pesa **mais que a capital** (81 vs 45). A região de
Itu/Campinas, onde o núcleo fica, é o segundo maior bloco — aqui a sede
ajuda.

---

## 3. Gênero — a premissa precisa ser corrigida

Estimativa por primeiro nome (heurística, margem de ~5%):

| | Qtd | % |
|---|---|---|
| Masculino | 446 | **86,1%** |
| Feminino | 72 | **13,9%** |

O briefing dizia "homens e mulheres". O mercado real é **6 para 1 em
favor de homens**. Isso não significa cortar mulheres — significa:

1. **Não dividir verba meio a meio por gênero.** O volume está nos homens.
2. **Criar um conjunto dedicado ao público feminino**, com criativo
   próprio. CPM de mulheres nesse nicho costuma ser mais barato (menos
   concorrência) e a TetraBrazil tem instrutoras e vínculos de futebol
   feminino (Flavia Guedes / Red Bull Bragantino, Gabriel Barreiro /
   Vasco Feminino) para sustentar o ângulo. 14% de 200 vagas = ~28
   mulheres: é mercado real, só precisa de mensagem própria.

---

## 4. Idade — não dá para validar, e isso é uma lacuna

A planilha **não tem data de nascimento nem idade**. A faixa 21–42 segue
sendo palpite.

Como resolver sem esperar:
- Exportar a data de nascimento do painel do Sympla (o checkout costuma
  coletar) e cruzar pelo e-mail;
- Rodar a Fase 1 com faixa ampla (**21–50**) e deixar o relatório
  demográfico do Meta mostrar onde a conversão realmente acontece — em
  ~3 semanas isso vira dado real.

Até lá, **não estreitar a idade em cima do Lookalike.**

---

## 5. Clusters institucionais — o canal mais barato que existe aqui

Cidades pequenas com concentração anômala de alunos:

| Cidade | Alunos | Leitura |
|---|---|---|
| **Rio das Flores / RJ** | **11** | Município de ~9 mil habitantes. 11 alunos não é demanda orgânica — é parceria, clube ou professor multiplicador |
| Ouro Preto / MG | 5 | |
| Valença / RJ | 5 | |
| Cláudio / MG | 4 | |
| Maricá / RJ | 4 | |
| Cachoeira do Campo / MG | 3 | |

Esses clusters mostram que **uma parte relevante das matrículas vem de
indicação institucional, não de mídia.** Identificar quem levou esses
grupos e reativar essas pontes para 2026-2027 pode render mais que os
R$ 4.000 de anúncio — e custa zero.

O núcleo de Porto Velho, feito em parceria com a Federação de Rondônia,
é a mesma lógica aplicada de propósito.

---

## 6. PR e RS perderam o núcleo local

PR (31) + RS (26) + SC (16) = **73 pessoas (14,1%)** no Sul. A edição
2025-2026 tinha núcleos em Curitiba e Porto Alegre; a 2026-2027 **não
tem**. Esse público agora precisaria viajar para SP.

Não é alvo de tráfego pago (custo de deslocamento inviabiliza), mas é
alvo de **e-mail/WhatsApp**: "seu núcleo mudou, o mais próximo agora é
São Paulo" é uma mensagem legítima para 73 pessoas que já compraram.

---

## 7. O que muda no plano de campanha

> ⚠️ **Revisado em 21/09.** A leitura inicial (restringir a SP + RJ + MG)
> estava errada. Os mesmos dados mostram que **50,4% da base veio de fora
> de SP e RJ**, **39,4% de estados que nunca tiveram núcleo** e **21,6%
> viajaram mais de 600 km**. O produto é a oportunidade de trabalhar nos
> EUA — SP e RJ são locais de prova, não mercados. **A segmentação é
> nacional.** Ver seção 4.5 do plano.

| # | Decisão | Motivo |
|---|---|---|
| 1 | **Segmentação nacional**, com o Lookalike fazendo a ponderação regional | A semente de 518 ex-alunos já carrega a distribuição real |
| 2 | **Não segmentar por raio em torno das sedes** | A Baixada (sede RJ) é só 4,6% do público do RJ |
| 3 | **MG importa por volume (21,4%), não por proximidade** | Terceiro maior mercado, 26 alunos só em Juiz de Fora |
| 4 | **Verba principal em público masculino**, com 1 conjunto dedicado a mulheres | 86/14 na base real |
| 5 | **Idade 21–50 na Fase 1**, estreitar só com dado do Meta | Sem idade na planilha |
| 6 | **Adiantar a verba de SP** | SP tem base menor (126 vs 131), gap maior (82 vs 71) e prazo mais curto (10/dez vs 17/dez) |
| 7 | **Somar os 47 inscritos de 2026-2027 à semente do Lookalike** | 518 registros está abaixo do ideal para LAL |
| 8 | **Reativar os clusters institucionais e o Sul por e-mail** | Custo zero, histórico comprovado |
