# Auditoria técnica — TetraPREP 2026-2027 — 21/09/2026

Checagem feita antes de subir qualquer verba. Tudo abaixo foi verificado
por requisição direta (HTTP + leitura do bundle JS), não por suposição.

## 1. Existem DUAS páginas `/novoprep` no ar — uma delas está morta

| | `tetrabrazil.com.br/novoprep` | `tetrabrazil.com/novoprep` |
|---|---|---|
| Tecnologia | Wix (Thunderbolt) | React/Vite SPA |
| Title | `NOVO PREP \| TetraBrazil 2025` | `TetraBrazil Soccer Academy...` |
| Edição vendida | **TetraPREP 2025-2026** (passada) | **TetraPREP 2026-2027** (correta) |
| Link de checkout | `sympla.com.br/play/tetraprep-2025-2026/3462775`… → **HTTP 404** | `sympla.com.br/play/tetraprep-2026-2027/3462775` → **HTTP 200** |
| Meta Pixel | Não encontrado no HTML | 2 pixels, só `PageView` |
| Status | 🔴 **DESLIGAR / REDIRECIONAR** | 🟢 Destino do tráfego pago |

**Ação:** redirecionar (301) `tetrabrazil.com.br/novoprep` para
`tetrabrazil.com/novoprep`. Enquanto os dois estiverem no ar, qualquer
clique (pago ou orgânico) que cair no `.com.br` morre num 404 de Sympla.
Checar também bio do Instagram, posts antigos, e-mails e QR codes.

> Nota: é o mesmo tipo de vazamento já documentado no projeto iEsports
> (`.com` expirado vs `.com.br` ativo) — só que aqui invertido.

## 2. Rastreamento: o pixel está instalado, mas não mede nada

No `<head>` de `tetrabrazil.com/novoprep`:

```js
fbq('init', '1092407173145058');
fbq('init', '2044408082864046');
fbq('track', 'PageView');
```

Três problemas:

1. **Só dispara `PageView`.** Busca no bundle (`/assets/index-D1dp7Q-i.js`,
   4,3 MB) por `ViewContent`, `InitiateCheckout`, `Lead`, `Purchase`:
   **nenhuma ocorrência**. Não existe evento de fundo de funil.
2. **Dois pixels no mesmo disparo.** Todo evento entra duplicado em dois
   datasets. Precisa definir qual é o oficial da conta de anúncio.
3. **A compra acontece no Sympla**, domínio de terceiro. Sem a integração
   de pixel no painel do organizador do Sympla, `Purchase` nunca chega.

**Consequência direta:** hoje é impossível (a) otimizar por compra,
(b) medir CPA/ROAS real, (c) montar o remarketing de "quase comprou" que
você descreveu — esse público simplesmente não existe na conta.

## 3. Um único link para todas as praças

As 3 cidades no site apontam para exatamente a mesma URL, com o mesmo
parâmetro `_gl`. Sem UTM e sem parâmetro de evento, não há como saber se
uma venda veio de SP, RJ ou Porto Velho — nem como otimizar por praça.

## 4. Datas reais da edição 2026-2027 (extraídas do bundle)

| Praça | Data | Local | Dias até o evento |
|---|---|---|---|
| Porto Velho (RO) | 05–08/dez/2026 | Centro de Desenv. do Futebol de Rondônia | 75 |
| **São Paulo** | **10–13/dez/2026** | Teal Rising Academy — **Itu/SP** | 80 |
| **Rio de Janeiro** | **17–20/dez/2026** | CT da Base do Fluminense — **Xerém** | 87 |

⚠️ **O plano de rodar até 16/dez está errado para São Paulo:** o núcleo de
SP acontece **10–13/dez**. Anunciar SP depois de ~05/dez é queimar verba
num evento que já aconteceu.

⚠️ **Geolocalização:** SP é em **Itu** (~100 km da capital) e RJ é em
**Xerém/Duque de Caxias** (~50 km do centro). Segmentar só as capitais
está errado nos dois casos.

## 5. Divergências de oferta

- Preço no site: **R$ 1.350,00**. Você mencionou R$ 1.300. Confirmar qual
  vai no criativo — anúncio com preço diferente do checkout derruba
  conversão e gera reclamação.
- Idade na página: **18+**. Sua segmentação pretendida: 21–42.
- O checkout é **Sympla Play** (`/play/`), plataforma de curso — fluxo e
  opções de rastreamento diferentes de um evento Sympla comum.

## 6. Ativos de prova social já disponíveis na página

Material forte, pronto para virar criativo:

- +1.000 alunos em 12 anos; +500 profissionais contratados no exterior
- **2025: 220 participantes → 90 receberam proposta de trabalho nos EUA**
- +95% de aprovação de visto desde 2009
- Remuneração: USD 210–250/semana + hospedagem + transporte + seguro +
  passagem aérea (visto J-1)
- Não exige faculdade de Educação Física
- 2 vídeos no YouTube já embedados (`BfrdNxwEm18`, `qQ-80-6KR5Y`)
- Instrutores com vínculo em Fluminense, Cruzeiro, Santos, Red Bull
  Bragantino, Vasco
