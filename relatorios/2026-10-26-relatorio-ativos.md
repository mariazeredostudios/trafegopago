# Relatório 26/10: campanhas ativas

Fonte: Meta Ads via Windsor.ai. 26/10 está parcial (início do dia). Teto de R$2.500 por campanha.

## Resumo

| Campanha | Seletiva | Gasto | Vendas | CPA | Saldo | Situação |
|---|---|---|---|---|---|---|
| Cruzeiro (desde 03/10) | 25/10 ✅ passou | R$2.894 | 22 | R$132 | **−R$394** | ❌ ainda ativa; sem limite de gastos |
| Flu OUT | 25/10 ✅ passou | R$2.610 | 15 | R$174 | **−R$110** | ❌ ainda ativa |
| Botafogo (BOTA OUT) | 25/10 ✅ passou | R$2.293 | 25 | R$92 | — | ficou pausada de 19/10 até a seletiva |
| Santos OUT | 01/11 | R$1.985 | **25** | R$79 | R$515 | ⚠️ gastando ~R$170/dia; máximo R$90 |
| Flamengo (FLA OUT) | 08/11 | R$1.166 | **17** | R$69 | R$1.334 | ✅ voltou a vender: 5 vendas de 22 a 25/10 |
| Sport OUT | 08/11 | R$1.442 | 6 | R$240 | R$1.058 | ⚠️ melhorou: 3 vendas em R$337 de 22 a 26/10 |
| Coritiba NOV | 15/11 | R$462 | 5 | **R$92** | R$2.038 | ✅ |
| Grêmio NOV | 15/11 | R$460 | **0** | — | R$2.040 | ❌ 14 checkouts, 0 vendas |

Palmeiras Ribeirão (08/11) e Grêmio Sinope (22/11) não aparecem nos dados.

## Conjuntos (22–26/10) e ações

**Santos (R$90/dia até 31/10):** PAIS + VIAJANTES INT. R$180 / 4 (R$45) → R$30 · FUTEBOL + PAIS
R$105 / 2, CTR 10% → R$20 · 1% R$222 / 3 → R$20 · BAIRROS + LOCAIS R$226 / 3 → R$20. A partir de
29/10: RMKT R$15, com 1% e BAIRROS baixando para R$12.

**Flamengo (R$105/dia):** RJ ABERTO R$57 / 1 → R$25 · BAIRROS + LOCAIS R$149 / 2 → R$30 · PAIS + ALTO
VALOR R$83 / 1 → R$20 · 1% R$91 / 1 → R$20. RMKT R$15 a partir de 01/11.

**Sport (R$80/dia):** RMKT R$68 / 1 (10 checkouts) → R$15, e R$25 a partir de 02/11 · CIDADE COM
FUTEBOL R$100 / 1 → R$20 · Estado R$152 / 0 → R$30 · religar MELHORES BAIRROS (1 venda em R$18) → R$15.

**Coritiba NOV (R$105/dia):** PAIS + VIAJANTES INT. R$84 / 2 → R$30 · MELHORES BAIRROS R$83 / 2 → R$30 ·
1% R$60 / 1 → R$20 · Estado R$174 / 0 → R$25.

**Grêmio NOV (R$105/dia):**
- 1% R$149 / 1 checkout / 0 vendas → pausar;
- criar HOMENS_ESTADO_FUTEBOL_18+ R$30;
- manter CIDADE+25MAIS+PAISEFUT R$25, CIDADE+HOMENS+18A44 R$25 e COMPRADORES SYMPLA R$20;
- conferir no Sympla se o evento de 15/11 tem vendas. Com 14 checkouts e 0 compras, é preciso
  descartar falha do pixel de Purchase.

## Grêmio: diagnóstico revisado (26/10, à tarde)

A usuária confirmou que o pixel está certo. GRÊMIO NOV (21–26/10): R$480, ~415 visitas, 14
checkouts e 0 vendas. Só **3,4% das visitas viram checkout**, contra 14% em set–out/25. O CTR
está normal (2–3%).

Conclusão: o vazamento está depois do clique (página do Sympla, oferta e saturação de Porto
Alegre, com seletivas quase mensais desde set/25). Trocar público mexe só no que acontece antes
do clique, por isso todos os testes de público dão o mesmo resultado.

Plano:
- **Parar de testar público.** Ficam 3 conjuntos: HOMENS_ESTADO_FUTEBOL_18+ R$40 (otimizando
  Iniciar finalização de compra), CIDADE+25MAIS+PAISEFUT R$30, INTERIOR RS (sem POA +40 km) R$30.
- **Mexer no que é comum a todos:**
  - página do Sympla: o que o aprovado ganha, destino da viagem, FAQ, vídeo;
  - criativo com imagens reais da seletiva de 18/10;
  - anúncio de parceria com o perfil do Grêmio ou com um treinador da base;
  - oferta, por decisão do gestor: "traga um amigo" / irmão.
- **Fora do Meta:** escolinhas de POA e os 30 inscritos de 18/10 indicando amigos.
- **Gatilho:** se em 02/11 POA tiver menos de 5 vendas, propor ao gestor mover ~R$500 para Sinope
  (mercado novo).
- **Para o negócio:** espaçar as seletivas de POA (a cada 2–3 meses).
