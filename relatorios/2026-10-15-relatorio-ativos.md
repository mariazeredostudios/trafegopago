# Relatório 15/10: campanhas ativas e auditoria de segmentação

Fonte: Windsor.ai (inclui `adset_targeting`, a configuração real de cada conjunto). 15/10 está
parcial. Seletivas de 18/10: Vasco, Coritiba, Botafogo, Bahia e Grêmio (restam 3 dias: 15–17).
Flu em 24/10, Cruzeiro em 25/10, Santos e Sport em 01/11, Flamengo em 08/11.

## 1. Visão geral
- **Tráfego:** as correções funcionaram. Coritiba, Flu e Bahia gastaram 100% no estado em
  14–15/10. **Exceção nova: FLA OUT está com localização = Brasil e sem público nos 4 conjuntos**
  (~25% do gasto fora do RJ). Mesmo assim, está vendendo a R$35.
- **Conversão:** Santos OUT (R$41/venda) e Flamengo (R$35) começaram muito bem. Coritiba segue
  sem venda desde 03/10. Ainda é cedo para julgar a correção (1,5 dia).

| Campanha | Vendas | Gasto | CPA | Teto | Saldo | Máx./dia |
|---|---|---|---|---|---|---|
| Vasco OUT | 22 | R$2.396 | R$109 | R$2.500 | R$104 | R$35 (3 dias) |
| Botafogo OUT | 21 | R$1.972 | R$94 | R$2.150 | R$178 | R$59 |
| Coritiba OUT | 13 | R$2.504 | R$193 | R$3.000 | R$496 | R$165 |
| Grêmio OUT | 14 | R$2.396 | R$171 | R$3.000 | R$604 | R$201 |
| Bahia OUT | 12 | R$2.046 | R$170 | R$2.850 | R$804 | R$268 (difícil gastar bem) |
| Cruzeiro (desde 03/10) | 13 | R$1.530 | R$118 | R$2.500 | R$970 | R$97 (10 dias) |
| Flu OUT | 8 | R$1.429 | R$179 | R$2.500 | R$1.071 | R$119 (9 dias) |
| **Santos OUT** (desde 13/10) | 6 | R$245 | **R$41** | R$2.500 | — | — |
| **Flamengo** (desde 12/10) | 9 | R$318 | **R$35** | R$2.500 | — | — |
| Sport OUT (desde 14/10) | 0 | R$185 | — (8 checkouts) | R$2.500 | — | — |

## 2. Auditoria de segmentação (configuração atual)

| Campanha | Situação |
|---|---|
| **FLA OUT** | ❌ Os 4 conjuntos estão com **localização Brasil**, sem público e sem interesse |
| **Cruzeiro, PAIS_30A60_** | ⚠️ Perdeu a estrutura: está 18–65 anos, sem "Pais", MG aberto, Advantage+ desligado |
| **Bahia, COMPRADORES SYMPLA** | ⚠️ **Religado** (estava pausado): R$454 gastos, 27 checkouts, 0 vendas |
| Coritiba | ✅ Corrigido: PR / Curitiba + 40 km, lookalikes e interesses aplicados |
| Flu | ✅ Corrigido |
| Vasco, Botafogo, Grêmio, Santos, Sport | ✅ OK |

## 3. Ações
1. **Flamengo:** trocar a localização de Brasil para **estado do RJ, "pessoas que moram"**. Manter
   o resto como está, porque está vendendo a R$35. Testar os públicos reais em conjuntos novos depois.
2. **Bahia:** pausar COMPRADORES SYMPLA. Estado R$100 (R$86/venda) · 1% R$60 · RMKT de urgência
   R$40 (~R$200/dia). Não forçar o saldo inteiro em 3 dias.
3. **Cruzeiro:** PAIS_30A60_ voltar para 30–60 anos + status familiar Pais. Criar INTERAÇÃO +
   VIAJANTES.
4. **Coritiba (R$165/dia):** 1% R$70 · Estado R$50 · PAIS + INTERCÂMBIO R$45. Sem venda até
   16/10 ao meio-dia: baixar para R$60/dia.
5. **Grêmio (R$200/dia):** 1% R$70 · Estado_ambos R$60 · RMKT + INTERAÇÃO R$50 · PAIS + ALTO
   VALOR POA R$20.
6. **Vasco (R$35/dia):** BAIRROS R$20 (R$71/venda) · RJ R$15.
7. **Botafogo (R$59/dia):** BAIRROS R$25 · PAIS + ALTO VALOR R$20 · Estado R$14.
8. **Flu:** PAIS + INTERCÂMBIO R$90 · 1% R$30. RMKT a R$0 até 20/10.
9. **Santos e Sport:** não mexer.
10. **Clubes de 18/10:** anúncio novo de urgência ("É NESTE SÁBADO, 18/10") hoje, se ainda não subiu.
