# TetraPREP — Análise da campanha de Leads (dia 7)

**Data:** 05/10/2026
**Conta:** TETRA + MARIA (`2635791740185506`, USD)
**Campanha:** `TETRA PREP — LEADS` (`120252249613980365`, `OUTCOME_LEADS`, ACTIVE)
**Janela analisada:** 29/09 a 05/10/2026 (05/10 parcial)
**Câmbio usado nas conversões:** R$ 5,16 / US$

---

## 0. Correção de uma previsão minha que estava errada

No relatório da semana 1 eu afirmei que **o CPL ia subir** conforme o público
saturasse. **Errei.** O CPL caiu de forma consistente:

| Data | Gasto | Freq. | CPM | LPV | Leads | CPL US$ | CPL R$ |
|---|---|---|---|---|---|---|---|
| 29/09 | 7,16 | 1,88 | 1,92 | 44 | 3 | 2,39 | 12,32 |
| 30/09 | 11,34 | 2,98 | 1,65 | 76 | 17 | 0,67 | 3,44 |
| 01/10 | 8,64 | 1,42 | 2,78 | 50 | 17 | 0,51 | 2,62 |
| 02/10 | 7,27 | 1,29 | 2,53 | 50 | 13 | 0,56 | 2,89 |
| 03/10 | 5,39 | 1,21 | 2,61 | 48 | 15 | 0,36 | 1,85 |
| 04/10 | 11,80 | 1,31 | 2,37 | 104 | 34 | 0,35 | 1,79 |
| 05/10* | 3,91 | 1,14 | 2,40 | 30 | 12 | 0,33 | 1,68 |
| **Total** | **55,51** | — | — | **402** | **111** | **0,50** | **2,58** |

\* dia parcial

Mas ao investigar **por que** caiu, encontrei o problema real da campanha —
que é justamente o que está descrito na seção 2. A queda do CPL não é só
aprendizado do algoritmo: é também o Meta migrando para um público que não é
o nosso.

---

## 1. Desempenho por conjunto (acumulado)

| Conjunto | Gasto | Impr. | Freq. | CPM | CTR | LPV | Leads | CPL | Conv. do form. |
|---|---|---|---|---|---|---|---|---|---|
| `LOOK A LIKE` | $31,27 | 16.690 | 1,35 | $1,87 | 2,89% | 242 | **71** | **$0,44** | 29,3% |
| `BRASIL + INTERCAMBIO + TRABALHAR FORA` | $24,26 | 8.580 | 1,52 | $2,83 | 4,01% | 160 | **40** | **$0,61** | 25,0% |

Leitura:
- O **lookalike entrega mais barato** (CPL $0,44 vs $0,61; CPM $1,87 vs $2,83).
- O conjunto de **interesses tem CTR melhor** (4,01% vs 2,89%) mas CPL pior —
  gera mais clique e menos preenchimento.
- **Frequência entre 1,14 e 1,52** nos dois: zero fadiga de criativo. Há
  espaço de escala sem desgaste.
- ⚠️ A vantagem do lookalike **não é comparação justa** — ver seção 2.

O conjunto `LOOK A LIKE` combina dois públicos em OR:
`Semelhante (BR, 1%) - COMPRADORES TETRAPREP` (semente boa, 518 compradores
reais) e `Semelhante (BR, 1%) - RMKT SYMPLA` (semente pequena). Como estão no
mesmo conjunto, **não é possível separar o desempenho dos dois.**

---

## 2. O problema: 36% dos leads estão fora da faixa de idade

Público-alvo definido: **21 a 42 anos**. Resultado real:

| Idade | Gasto | CTR | CPM | Leads | CPL US$ | CPL R$ |
|---|---|---|---|---|---|---|
| 18-24 | $8,50 | 2,37% | $2,19 | 16 | 0,53 | 2,74 |
| 25-34 | $14,77 | 3,10% | $2,37 | 19 | **0,78** | 4,01 |
| 35-44 | $15,28 | 4,72% | $3,25 | 33 | 0,46 | 2,39 |
| **45-54** | $8,69 | 6,47% | $3,61 | **26** | 0,33 | 1,72 |
| **55-64** | $3,20 | 6,23% | $4,07 | **10** | 0,32 | 1,65 |
| **65+** | $0,75 | 6,38% | $3,99 | **3** | **0,25** | 1,29 |

- **Até 44 anos: 68 leads (64%)**
- **45 anos ou mais: 39 leads (36%)** — fora do público definido
- Verba consumida em 45+: **$12,64 (R$ 65,22) = 25% do investido**

**O CPL mais barato é o 65+ ($0,25). O mais caro é o 25-34 ($0,78).** O CTR
do público 45+ é o dobro do 18-34 (6,2-6,5% vs 2,4-3,1%).

Ou seja: o Meta fez exatamente o que foi mandado — achar o evento `Lead` mais
barato. Gente mais velha clica mais e preenche formulário mais. A queda do CPL
é, em boa parte, o algoritmo deslizando para o público errado.

### Causa raiz (verificada na BM)

1. O conjunto `LOOK A LIKE` está com **`age_min: 18, age_max: 65`** — não
   21-42. É o conjunto que mais gasta e mais entrega.
2. Os **dois** conjuntos estão com expansão de idade do Advantage+ ligada
   (`targeting_automation.advantage_audience: 1`,
   `individual_setting: {age: 1, gender: 1, geo: 0}`). Com isso ligado, o
   Meta pode entregar fora da faixa mesmo no conjunto configurado 22-42.

Honestidade sobre o que **não** sei: não tenho dado de venda para provar que
lead de 45+ não compra. Pode haver gente de 50 anos querendo mudar de
carreira. O que o dado mostra é que **esse público não foi escolhido** e já
consome um quarto da verba.

Vale registrar que isso é a versão real da preocupação que você levantou
("vai gerar um bando de gente pobre achando que vai mudar de vida"). O
vazamento de qualidade existe — mas o eixo é **idade**, não renda.

---

## 3. O que está certo (verificado, não suposto)

**A Conversão Personalizada está no ar e funcionando.** Os dois conjuntos
ativos estão com:

```json
"promoted_object": {
  "pixel_id": "1100395945778742",
  "custom_event_type": "LEAD",
  "pixel_rule": "{\"and\":[{\"event\":{\"eq\":\"Lead\"}},
                 {\"or\":[{\"URL\":{\"i_contains\":\"faleconoscotra\"}}]}]}"
}
```

O filtro usou `faleconoscotra` (a string específica), não `faleconosco` — então
a armadilha de substring que eu havia sinalizado **foi evitada**. A otimização
está rodando sobre o evento filtrado.

Checagem cruzada dos dois contadores no mesmo período:
- Evento `Lead` cru: **107** leads
- Conversão Personalizada `custom.4045981728869315`: **99** leads

A diferença (~8) são eventos `Lead` disparados de outras URLs — Sympla e/ou a
LP `faleconosco`. Está sendo corretamente excluída da otimização. **Colisão
resolvida.**

**Geografia entregando onde interessa:** SP ($12,67) + RJ ($7,23) + MG ($5,49)
= **46% da verba**, que é exatamente onde ficam os núcleos. O restante
pulverizado por 25 estados, com Santa Catarina (CTR 4,42%) e Paraná (4,14%)
acima da média. Bahia é a pior (CTR 1,34%).

**Conjuntos antigos:** `BRASIL + ED FISICA` e
`BRASIL + INTERCAMBIO + TRABALHAR FORA` da campanha de Vendas estão
`status: ACTIVE` mas `effective_status: CAMPAIGN_PAUSED` — **não estão
gastando**, porque a campanha-mãe está pausada. Corrijo o que falei antes:
pausá-los é higiene, não urgência.

**Gênero:** 94% da verba foi para homens (CPL $0,47) e quase nada para
mulheres ($2,09, CPL $0,70). Esperado num produto de futebol; não trataria
como erro.

---

## 4. Verba e projeção revisada

| | |
|---|---|
| Orçamento total | US$ 775,00 |
| Gasto (Vendas $71,90 + Leads $55,51) | US$ 127,41 |
| **Restante** | **US$ 647,59** |
| Dias até 14/12 | 70 |
| Ritmo real (excluindo dia parcial) | US$ 8,60/dia |
| Verba dura | 75 dias (precisa de 70) ✅ |

Projeção de leads com a verba restante:

| Se o CPL ficar em | Leads até 14/12 |
|---|---|
| US$ 0,44 (ritmo atual do lookalike) | ~1.470 |
| US$ 0,60 | ~1.080 |
| **US$ 0,80 (cenário após corrigir a idade)** | **~810** |
| US$ 1,20 | ~540 |

Minha previsão anterior era 300-500 leads. **Revisando para a faixa de
800 a 1.100 leads**, assumindo que corrigir a idade encarece o CPL para
US$ 0,60-0,80 — o que é o resultado desejado, não um problema.

---

## 5. Recomendações (nenhuma aplicada — aguardando autorização)

**Prioridade 1 — travar a idade**
1. `LOOK A LIKE`: mudar de 18-65 para **21-42**.
2. Nos dois conjuntos, trocar o Advantage+ público pela **"opção de público
   original"**, para que a faixa de idade seja respeitada de fato. Com o
   Advantage+ ligado não é possível travar a idade.
3. Esperar o CPL subir para US$ 0,60-0,80. **Isso é o objetivo.** Lead de
   R$3-4 que não compra é mais caro que lead de R$6 que compra.

**Prioridade 2 — qualificar no formulário**
Incluir a pergunta de capacidade de pagamento (segue pendente desde o plano
de migração). Sem ela, não há como medir qualidade antes do comercial ligar.

**Prioridade 3 — operação (o gargalo virou aqui)**
111 leads em 7 dias = **~16 leads/dia**. Na projeção, 800+ até dezembro. Você
já disse que tem medo do comercial deles não dar conta e que ele é devagar —
nesse volume, lead esfriando é a maior perda da campanha, maior que qualquer
ajuste de mídia. Recomendo o **e-mail/mensagem automática de resposta
imediata** (Apps Script) com datas, valor de R$1.350 e link do Sympla, para o
lead não ficar sem resposta enquanto o comercial não chega.

**Prioridade 4 — higiene**
- Pausar os 2 conjuntos da campanha de Vendas (não urgente, não gastam).
- Renomear os 10 anúncios de `VÍDEO`/`ARTE` para nomes por ângulo, para o
  UTM `{{ad.name}}` virar informação útil.
- Adicionar coluna **"data do primeiro contato"** na planilha, para medir
  tempo de resposta do comercial.

---

## 6. Veredito

A mídia está performando acima do esperado: **CPL de R$2,58 para um produto
de R$1.350** é um número muito bom, e a frequência baixa mostra que há espaço
para escalar.

O risco mudou de lugar. **Não é mais "o tráfego vai gerar lead?" — é "o lead
que o tráfego gera é o lead certo, e alguém está atendendo?"** Um terço dos
leads está fora da faixa de idade e consome 25% da verba, e o volume diário já
está acima do que um comercial lento consegue trabalhar.
