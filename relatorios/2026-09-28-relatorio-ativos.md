# Relatório 28/09: campanhas ativas, com teto de R$2.500 por clube

Fonte: Meta Ads via Windsor.ai. 28/09 ainda está parcial (início do dia). Meta: 27 vendas por
seletiva (Bahia 30, Grêmio 35). "Máx./dia" = saldo ÷ dias até a véspera da seletiva, para não
passar de R$2.500.

## Dinheiro por clube

| Clube | Seletiva | Usado no ciclo | Vendas | CPA | Saldo | Máx./dia | Gastou em 27/09 | Situação |
|---|---|---|---|---|---|---|---|---|
| Palmeiras (Curitiba) | 03/10 | R$1.739,08 | 7 | R$248,44 | R$760,92 | **R$150** | R$277 | ❌ Estoura o teto em ~01/10 |
| Vasco | 18/10 | R$1.240,59 | 13 | R$95,43 | R$1.259,41 | **R$63** | R$115 | ⚠️ Acaba em ~08/10 |
| Coritiba | 18/10 | R$1.124,03 | 11 | R$102,18 | R$1.375,97 | **R$69** | R$110 | ⚠️ Acaba em ~10/10 |
| Botafogo | 18/10 | ~R$482 (QUANTITATIVO 22–24 + BOTA OUT) | 1 | — | ~R$2.018 | R$100 | R$113 | ❌ Link errado |
| Bahia OUT | 18/10 | R$404,11 | 1 | — | R$2.095,89 | R$105 | R$118 | ❌ 31 checkouts / 1 venda |
| Grêmio OUT | 18/10 | R$291,24 | 3 | R$97,08 | R$2.208,76 | R$110 | R$113 | ✅ Melhor início do Grêmio no ano |

## Achados críticos

**Botafogo: anúncios apontando para o evento antigo.** A BOTA OUT usa dois eventos do Sympla:
- **3587819**: evento novo, de 18/10.
- **3556781**: ID anterior ao evento do Bahia de setembro (3561294), então muito provavelmente
  é o evento de **20/09**, que já passou.

O PAIS + ALTO VALOR e um dos anúncios do MELHORES BAIRROS mandam para o 3556781, com cerca de
R$141 gastos na BOTA OUT e mais ~R$106 na QUANTITATIVO. Confirmar abrindo o link e corrigir
para o 3587819.

**Bahia OUT: 31 checkouts e 1 venda (3%).** No Bahia de setembro, 13% dos checkouts viravam
venda. O Grêmio OUT, também com evento novo, está em 18%. Comparar as vendas no painel do
Sympla do evento **3591730** com a 1 venda que o Meta registrou:
- se o Sympla tiver mais vendas, o pixel de **Compra** não está configurado nesse evento. É o
  mesmo problema de jan/26: o Meta otimiza às cegas.
- se o Sympla também tiver ~1 venda, o problema está no checkout. Fazer uma compra de teste.

Fazer a mesma checagem no evento 3587819 do Botafogo.

## Ações por clube

**Palmeiras (R$150/dia até 02/10):**

| Público | Gasto | Vendas | CPA | Ação |
|---|---|---|---|---|
| MELHOR PÚBLICO 1% | R$798,46 | 2 | R$399,23 | **Pausar** |
| PAIS + ALTO VALOR | R$430,71 | 1 | R$430,71 | **Pausar** |
| CURITIBA + FUTEBOL | R$400,59 | 3 | R$133,53 | R$100/dia |
| RMKT | R$109,32 | 1 | R$109,32 | R$50/dia, com urgência a partir de 30/09 |

Projeção: fecha em ~12–13 vendas, sem passar dos R$2.500. No ritmo atual, gastaria ~R$600 além
do teto.

**Vasco (R$63/dia):**

| Público | CPA | R$/dia |
|---|---|---|
| RJ PAIS + ALTO VALOR | R$83,68 | R$30. Frequência em 2,01: trocar criativo |
| MELHORES BAIRROS | R$88,45 | R$18 |
| BSB, ES, JF | R$95,99 | R$15. Sem venda desde 25/09 |

Projeção: ~26 vendas, no limite da meta.

**Coritiba (R$69/dia):**

| Público | CPA | R$/dia |
|---|---|---|
| 1% | R$76,17 | R$28 |
| Estado_advantage | ~R$82 desde a volta | R$22 |
| PAIS + VIAJANTES | R$110,86 (2ª venda em 26/09) | R$19 |
| MELHOR BAIRRO | R$190,77, 1 venda (nenhuma desde 19/09) | **Pausar** |

Projeção: ~24–25 vendas.

**Botafogo:**
- Corrigir os links para 3587819.
- Checar o pixel do evento no Sympla.
- Pausar INTERAÇÃO (R$38, 0 vendas) e criar o RMKT de checkout.
- Estado_advantage (R$151, 0 vendas, 3 checkouts): manter a R$40 até a checagem do pixel.
  Sem ela, não dá para saber se é o público ou a medição.
- Máximo de R$100/dia.

**Bahia OUT:**
- Segurar em **R$60/dia** até a checagem Sympla × Meta, para não gastar às cegas.
- Não cortar nenhum público até lá: com a medição em dúvida, o CPA de cada um não é confiável.

**Grêmio OUT:**
- 3 vendas em 4 dias, a R$97. Setembro estava em R$301.
- 18% dos checkouts viram venda, então a medição funciona.
- Não mexer (fase de aprendizado).
- Regra: público com R$150 gastos sem venda é pausado.
- Máximo de R$110/dia.

## Checklist (por impacto no dinheiro)

1. [ ] Palmeiras: pausar 1% e PAIS + ALTO VALOR. Curitiba a R$100 e RMKT a R$50.
2. [ ] Botafogo: corrigir os links 3556781 → 3587819.
3. [ ] Bahia OUT e Botafogo: comparar as vendas do Sympla com as do Meta. Bahia a R$60/dia até lá.
4. [ ] Vasco: baixar para R$63/dia e trocar o criativo do RJ.
5. [ ] Coritiba: pausar MELHOR BAIRRO e baixar para R$69/dia.
6. [ ] Botafogo: trocar INTERAÇÃO por RMKT de checkout.
