# Diagnóstico Grêmio 25/09: por que tudo ficou caro desde janeiro

Fonte: Meta Ads via Windsor.ai, todas as campanhas com "GREMIO" no nome, de set/25 a set/26.
Gestor confirmou que o criativo muda todo mês (só o nome do anúncio é mantido), então o criativo
**não** é tratado como causa.

## 1. Funil do Grêmio: quando dava certo × agora

| Janela | Gasto | Vendas | CPA | CPM | Custo/clique | Visita→checkout | Checkout→venda | Clique→venda |
|---|---|---|---|---|---|---|---|---|
| **Set–Out/25** | R$3.949 | **118** | **R$33** | R$8,82 | R$0,61 | **14,2%** | **19,9%** | 1,82% |
| Nov–Dez/25 | R$3.120 | 60 | R$52 | R$7,17 | R$0,51 | 8,7% | 18,3% | 0,97% |
| Jan–Fev/26 | R$4.311 | **sem registro** | — | R$2,52–6,60 | R$0,23 | — | — | — |
| Mar–Abr/26 | R$4.754 | 44 | R$108 | R$9,25 | R$0,78 | 9,2% | 12,9% | 0,72% |
| Mai–Jun/26 | R$7.092 | 36 | R$197 | R$11,77 | R$0,94 | 6,3% | 13,2% | 0,48% |
| Jul–Ago/26 | R$5.019 | 38 | R$132 | R$13,40 | R$0,68 | 5,7% | 14,4% | 0,52% |
| Set/26 | R$2.110 | 7 | R$301 | R$11,76 | R$0,84 | **4,8%** | **7,8%** | 0,28% |

A linha de Nov–Dez/25 exclui uma campanha de R$587 que também não registrou conversão.

**Leitura:**
- O clique ficou só ~10–50% mais caro (R$0,61 → R$0,68–0,94). O CPA ficou **4 a 9 vezes**
  mais caro. A quebra está **depois do clique**, não no leilão nem no público.
- O público continua clicando no mesmo ritmo (CTR de link parecido). Quem clica é que parou
  de comprar:
  - visita → checkout caiu de 14% para 5%;
  - checkout → venda caiu de 20% para 8–14%.
- Os mesmos públicos de 2025 davam R$18–34 de CPA:

  | Público | CPA em 2025 |
  |---|---|
  | p1_estado_ambos_25mais | R$27,70 |
  | p3_estado_homens_18a44 | R$34,20 |
  | p4_cidade_homens_18a44 | R$29,90 |
  | p2_cidade_ambos_25mais | R$18,20 |

  A definição desses públicos não mudou. O que mudou foi a conversão depois do clique.

## 2. O que aconteceu em janeiro

De **dez/25 a fev/26**, as campanhas do Grêmio gastaram ~R$4.800 **sem registrar nenhuma venda,
nenhum checkout e nenhuma visita à página**, com CPM de R$2,42–6,60 e clique a R$0,15–0,24. Isso
não foi só no Grêmio. Em jan/26, várias campanhas da conta ficaram sem registro:

| Com registro de conversão em jan/26 | Sem registro de conversão em jan/26 |
|---|---|
| Santos, Bahia, Sport, Botafogo "Janeiro 2" | Vasco, Botafogo, Palmeiras, Cruzeiro, ABC, Grêmio |

O mais provável é que o pixel do Meta não estivesse configurado nos eventos do Sympla desses
clubes. No Sympla, o pixel é configurado **por evento**. Sem sinal de compra, o Meta otimiza
"às cegas" e entrega para quem clica barato. A campanha GREMIO [QUANTITATIVO] nasceu nesse
período e foi reaproveitada até setembro.

Em mar/26 o registro volta. O Grêmio, porém, não volta ao patamar anterior, e a piora continua
mês a mês. Isso aponta para dois fatores somados:
1. **Saturação local:** foram seletivas quase mensais em Porto Alegre desde set/25 (21/09, 19/10,
   06/12, 18/01…). As famílias mais dispostas já foram. O torcedor continua clicando, mas já fez a
   seletiva ou não quer repetir.
2. **Página/oferta:** a queda de visita→checkout (14% → 5%) é do tamanho de um problema na
   página do Sympla. Vale conferir: preço, data certa em destaque, sessões antigas ou encerradas
   aparecendo e descrição desatualizada.

## 3. O que fazer para 18/10 (35 vendas → CPA máximo de R$71)

**Antes de gastar R$1:**
1. Criar um **evento novo e limpo no Sympla, só para 18/10**. Configurar o pixel nele e testar
   no Gerenciador de Eventos (evento de teste de PageView, InitiateCheckout e Purchase).
2. Criar uma **campanha nova com orçamento por público (ABO)**. Não reaproveitar a QUANTITATIVO.

**Públicos (R$105/dia):**

| Público | R$/dia | Base |
|---|---|---|
| **COMPRADORES SYMPLA GRÊMIO (novo):** lista de quem já comprou seletiva do Grêmio, excluindo compras dos últimos 30 dias | R$25 | Nunca testado no Grêmio. No Bahia é o melhor público (R$56,62, 16 vendas). Atleta não selecionado volta um ano mais velho |
| **LOOKALIKE 1–3% COMPRADORES GRÊMIO, só RS (novo)** | R$30 | Parecidos com quem já comprou Grêmio, e não com viajantes genéricos |
| p1_estado_ambos_25mais_pais&futebol | R$25 | Melhor público de 2025 (R$27,70). Em set/26 fez 4 vendas a R$152 |
| **INTERIOR RS homens 18–44 aberto (novo):** RS **excluindo** Porto Alegre e região metropolitana | R$15 | Testa famílias fora da área já saturada |
| RMKT: checkout abandonado nos últimos 60 dias, excluindo compradores | R$10 | Sobe para R$20 a partir de 11/10 |

**Pergunta de oferta (decisão do gestor):** se os selecionados em 18/10 forem para a Disney Cup
2027 (Orlando, jul/27), isso deve ir **no topo da página do Sympla e do texto**. É o motivo
novo para quem já fez seletiva do Grêmio voltar.

**Regras:**
- Público que gastar R$150 sem vender: pausa.
- Reavaliar em 01/10.
- A conta a acompanhar é saldo ÷ vendas que faltam. Precisa ficar abaixo de R$71.

**Projeção honesta:** o CPA atual do Grêmio (R$130–300) não chega em 35. Para chegar, o evento
novo precisa recuperar o pós-clique (visita→checkout voltar a ~9–10%) **e** os públicos novos
precisam encontrar famílias fora da saturação. Se só uma das duas acontecer, a faixa realista é
de **20–25 vendas**.
