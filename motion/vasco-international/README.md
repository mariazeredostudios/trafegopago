# Vasco International — Motion (Reels, 9:16, 40s)

Projeto [Remotion](https://remotion.dev) (React → vídeo). Renderiza um MP4
de 1080x1920 @ 30fps, 40s, sem áudio/legenda embutida (finalização de trilha,
dublagem e efeitos extras fica no CapCut, como combinado).

## Rodar localmente

```bash
cd motion/vasco-international
npm install
npm start            # abre o Remotion Studio (preview interativo)
npm run render       # renderiza out/vasco-international.mp4
```

## Estrutura da timeline (src/timing.ts)

| Cena | Janela | Descrição |
|---|---|---|
| `browserSearch` | 0:00–0:04 | Digita "eu quero jogar pelo vasco da gama" e dá enter |
| `colagem` | 0:04–0:09 | Bobblehead do Lucas Fortuna com a camisa do Vasco, em campo |
| `hookValue` | 0:09–0:16 | Gancho emocional / exclusividade |
| `destino` | 0:16–0:24 | Disney Cup 2027 + experiências da viagem |
| `significado` | 0:24–0:30 | O que a viagem representa além do futebol |
| `seletiva` | 0:30–0:35 | Data, local, idade, avaliação |
| `cta` | 0:35–0:40 | Tagline + link da bio + end card (escudo Vasco × iEsports) |

## Trocar os assets reais (rosto, camisa, escudo, logo)

Edite `src/assetsConfig.ts`: salve o arquivo em `public/assets/` com o nome
indicado e mude `enabled: false` para `enabled: true`. Nenhum outro código
precisa mudar — os placeholders (iniciais "LF", camisa desenhada, "V", "iE")
saem automaticamente de cena.

- `rosto-lucas-fortuna.png` — PNG com fundo transparente, só cabeça/rosto
- `camisa-vasco.png` — PNG da camisa (fundo transparente)
- `escudo-vasco.png`
- `logo-iesports.png`
- `campo-futebol.jpg` (opcional — fundo real do campo na cena da colagem)

## Decisões tomadas (a validar com a cliente)

- **Sem voz sintética/IA**: como o pedido foi "nada de IA" na voz, a cena da
  colagem usa legenda em vez de narração — a voz real do Lucas (ou dublagem)
  entra depois, junto da trilha, no CapCut.
- **Paleta**: preto/branco/cinza do Vasco, vermelho só como acento pontual
  (2 usos no vídeo inteiro), por causa do rival.
- Data da seletiva usada literalmente como enviada ("16 de março") — sem
  ano explícito no vídeo.
