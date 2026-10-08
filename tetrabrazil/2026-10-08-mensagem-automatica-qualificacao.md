# Mensagem automática de qualificação — TetraPREP 2026-2027

**Data:** 08/10/2026
**Objetivo:** responder o lead no instante do envio do formulário, apresentar a
oferta de forma comercial, **expor o investimento logo de cara** para que curioso
e quem não pode pagar desista ali, e devolver uma resposta binária que diga ao
comercial em quem ligar primeiro.

---

## 1. Checagens feitas antes de escrever (tudo verificado, nada suposto)

| O que | Fonte | Resultado |
|---|---|---|
| Preço | `tetrabrazil.com/novoprep`, bundle `index-C8smNOPS.js` | **R$ 1.350,00** — "Parte Online + Prática Presencial" |
| Parcelamento | Página do Sympla | **"Parcele sua compra em até 12x"** (cartão) |
| Custo extra | Descrição do Sympla | **R$ 650 de hospedagem OPCIONAL, só no núcleo do Rio** (3 diárias + café + almoço), via PIX/boleto até 30/11/2026 |
| Núcleos presenciais | LP + Sympla | **Só RJ e SP.** LP: "núcleos: CT da base do Fluminense em Xerém (RJ) ou Teal Rising Academy em Itú (SP)" |
| Datas | Bundle da LP | SP **10 a 13/dez/2026** · RJ **17 a 20/dez/2026** |
| Contato oficial do PREP | Sympla + LP | WhatsApp **(11) 94148-8736** · `talentos@tetrabrazil.com` |
| O que a Tetra registra do aluno | Formulário interno na LP | `date_of_birth`, `passport`, `valid_visa`, `cnh`, `jersey_size`, `prep_presencial` |

### 🔴 Três pontos que precisam da sua decisão antes de publicar

1. **O preço é R$ 1.350, não R$ 1.300.** Você escreveu 1.300 no pedido. O site e
   o Sympla dizem 1.350. Escrevi a mensagem com **R$ 1.350** — mandar 1.300 e
   cobrar 1.350 depois queima a confiança logo no primeiro contato.
2. **O Porto Velho (05–08/dez) sumiu da oferta.** O Sympla não cita Porto Velho e
   a LP descreve só Xerém e Itú — mas a lista de datas do bundle ainda tem
   "05 a 08 de Dezembro de 2026". Confirmar com a Tetra se esse núcleo caiu.
3. **A hospedagem de R$ 650 do Rio.** Coloquei na mensagem como opcional e
   separada. Se ela for obrigatória para quem é de fora, o filtro muda de
   R$ 1.350 para R$ 2.000 e a mensagem precisa dizer isso.

---

## 2. O que a mensagem precisa filtrar

Qualificação real de um candidato do TetraPREP, na ordem em que derruba gente:

| Filtro | Por que importa | Está na mensagem? |
|---|---|---|
| **Pode pagar R$ 1.350** | É o filtro que você pediu e o que mais derruba curioso | ✅ em destaque, com o parcelamento |
| **Tem a data livre** | 24h presenciais em dezembro, em Itu ou Xerém. Quem trabalha em dezembro não vai | ✅ as duas datas, com cidade |
| **Está na faixa de idade** | Programa de carreira internacional; a campanha mira 21-42 | ✅ "21 a 45", como você pediu |
| **Quer mesmo ir para os EUA** | Muita gente se inscreve pelo curso e não pela viagem | ✅ o foco é a vaga lá fora, não o certificado |
| **Tem/pode tirar passaporte** | A Tetra registra `passport` e `valid_visa` no sistema | ⚠️ fora da 1ª mensagem — vai na 2ª, para não pesar |

**O que NÃO filtrar** (são as objeções que a Tetra derruba, e tirar isso da frente
aumenta conversão): faculdade de Educação Física, inglês fluente e experiência em
clube grande. Por isso a mensagem diz explicitamente que não são necessários.

---

## 3. A mensagem

### 3.0 O limite de 1.024 caracteres

A **mensagem de saudação** do app WhatsApp Business aceita no máximo **1.024
caracteres** — e o corpo de um *template* da Cloud API também. Todas as
mensagens abaixo estão medidas e cabem nos dois.

A contagem é em **unidades UTF-16**, que é como o WhatsApp conta: emojis fora do
plano básico (💰 📅 🙌) valem **2**, e bandeiras como 🇺🇸 valem **4**. Por isso a
versão final usa emoji com parcimônia — cada um come espaço que seria texto de
venda.

| Mensagem | Caracteres | UTF-16 | Folga |
|---|---|---|---|
| Principal (saudação) | 985 | **986** | 38 |
| Resposta ao "1" | 798 | 800 | 224 |
| Resposta ao "2" | 281 | 282 | 742 |
| Resposta inválida | 133 | 134 | 890 |

> Ao editar qualquer uma, meça de novo antes de publicar. O WhatsApp corta o
> excedente sem avisar — e o que ficaria de fora é justamente o fim da mensagem,
> onde estão as opções 1 e 2.

### 3.1 Mensagem principal — 986 de 1.024

```
Oi! Aqui é a equipe TetraBrazil ⚽

Que bom ter você por aqui.

Você não precisa de faculdade de Educação Física, nem de inglês fluente, nem de passagem por clube grande. Precisa de um caminho — e é isso que a gente faz há 25 anos.

*Ano passado, 220 pessoas fizeram o TetraPREP e 90 receberam proposta de trabalho nos Estados Unidos.*

*Lá fora:* USD 210 a 250 por semana, com casa, transporte, seguro saúde e passagem aérea inclusos.

*Investimento: R$ 1.350* (em até 12x no cartão)

USD 250 por semana dá cerca de R$ 1.290 — ou seja, *sua primeira semana de trabalho nos EUA já devolve quase tudo que você investiu aqui.*

*Imersão presencial:*
• São Paulo — 10 a 13/dez (Itu)
• Rio de Janeiro — 17 a 20/dez (CT do Fluminense, Xerém)

Vagas limitadas por núcleo e falamos com cada candidato individualmente. Me responde só com o número:

*1* — Estou ciente do investimento e quero que entrem em contato
*2* — Não tenho mais interesse

Se for *1*, já te coloco na fila do nosso time 🤝
```

**O que foi cortado para caber, e para onde foi:**

| Saiu da principal | Por quê | Foi para |
|---|---|---|
| "viver de futebol fora do Brasil" | Bonito, mas caro em caracteres. A linha das três objeções já faz o trabalho emocional | — |
| Lista de 4 benefícios em linhas separadas | Virou uma linha só, sem perder nenhum item | compactado |
| Visto J-1 e os 95% de aprovação | É objeção de quem **já** decidiu, não de quem está decidindo | resposta ao "1" |
| "mais de 1.000 treinadores" | O dado 220 → 90 é mais forte e mais barato | — |
| 40h / 16h online + 24h presencial | Detalhe operacional, não argumento de venda | resposta ao "1" |
| Hospedagem opcional de R$ 650 | Só vale para o núcleo do Rio e só importa depois do sim | resposta ao "1" |
| Os separadores ━━━ | 19 caracteres cada, duas vezes | — |

**O que foi mantido inteiro, porque é o que faz a mensagem funcionar:**

1. **A linha das três objeções** — faculdade, inglês, clube grande. É onde a
   pessoa se reconhece.
2. **O dado 220 → 90.** Prova concreta, em uma frase.
3. **O preço em destaque.** É o filtro que você pediu.
4. **A conta do retorno.** USD 250/semana = R$ 1.290 contra R$ 1.350 do curso.
   Transforma o preço de barreira em conta que fecha.
5. **As duas datas.** Segundo filtro: quem não pode estar em Itu ou Xerém em
   dezembro cai aqui.
6. **O fecho "já te coloco na fila do nosso time".** Faz o "1" parecer entrada,
   não formulário.

### 3.2 As respostas automáticas

**Se responder 1** — recebe o que foi cortado da principal, agora no momento
certo (800 caracteres):

```
Boa! 🙌 É exatamente com gente como você que a gente gosta de conversar.

Seu contato já está com o nosso time e falamos com você em até *24 horas*, no horário comercial.

Duas coisas que já adiantam seu processo:

• *Passaporte* — confere se o seu está válido. Se não tiver, já começa a emissão, leva algumas semanas.
• *Núcleo* — vai pensando em qual prefere: São Paulo (10-13/dez, em Itu) ou Rio de Janeiro (17-20/dez, no CT da base do Fluminense, em Xerém).

Ah, e sobre o visto: é o J-1, com *mais de 95% de aprovação desde 2009* — a gente cuida desse processo com você.

São 40h de formação no total: 16h online ao vivo + 24h de imersão presencial.

_No núcleo do Rio existe hospedagem opcional, com 3 diárias, café e almoço, por R$ 650 à parte._

Qualquer dúvida, manda aqui que eu respondo 🤝
```

**Se responder 2** — sai da fila sem queimar a ponte (282 caracteres):

```
Tudo certo, obrigado pela sinceridade! 🙏

Fica com a gente de qualquer forma: se mudar de ideia, é só chamar aqui. As inscrições do TetraPREP 2026-2027 seguem abertas até as vagas acabarem.

E se não for agora, que seja na próxima — o futebol é longo. Boa sorte na sua caminhada! ⚽
```

**Se responder qualquer outra coisa** (134 caracteres):

```
Não consegui entender 😅

Me responde só com *1* (quero contato) ou *2* (não tenho interesse) — assim seu atendimento sai mais rápido.
```

### 3.3 Como medir antes de publicar

Salve o texto num arquivo e rode:

```python
t = open('mensagem.txt', encoding='utf-8').read().rstrip('\n')
print(len(t), 'caracteres |', sum(2 if ord(c) > 0xFFFF else 1 for c in t), 'UTF-16')
```

Se o segundo número passar de 1.024, corte antes de colar no WhatsApp.

### 3.4 Variação que vale testar depois

A opção binária força quem está em cima do muro a dizer "não". Uma terceira
alternativa costuma recuperar parte desse pessoal:

```
*1* — Estou ciente do investimento e quero que entrem em contato
*2* — Quero entender melhor antes de decidir
*3* — Não tenho mais interesse
```

Fica a seu critério: com 2 opções o comercial recebe uma fila mais limpa; com 3,
recebe mais gente, mas separada por temperatura. Não troque sem testar — hoje o
gargalo é a velocidade do comercial, e fila maior pode piorar o problema.

---

## 4. Como isso dispara de verdade

**Restrição do WhatsApp que precisa estar clara:** o WhatsApp **não permite** que
uma empresa mande mensagem para quem não falou com ela nas últimas 24 horas — a
exceção é um *template* aprovado pela Meta, via WhatsApp Cloud API. E os **botões
clicáveis** também só existem na Cloud API; o aplicativo WhatsApp Business comum
não tem botão na mensagem de saudação.

Por isso são dois caminhos, e o primeiro funciona hoje.

### Caminho A — funciona hoje, sem aprovação nenhuma ⭐ *(recomendado começar por aqui)*

O lead envia o formulário → a página o leva direto pro WhatsApp com uma mensagem
já escrita → ele toca em enviar → **a saudação automática do WhatsApp Business
responde na hora** com a mensagem de qualificação → ele responde 1 ou 2.

**1. Na LP (pedir pro Lovable):** depois de salvar o lead, redirecionar para

```
https://wa.me/5511941488736?text=Ol%C3%A1!%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20do%20TetraPREP%202026-2027%20e%20quero%20mais%20informa%C3%A7%C3%B5es.
```

que é o texto `Olá! Acabei de preencher o formulário do TetraPREP 2026-2027 e
quero mais informações.` codificado para URL.

**2. No app WhatsApp Business:** Configurações → Ferramentas comerciais →
**Mensagem de saudação** → colar a mensagem da seção 3.1 → "Enviar para: todos".

**Por que esse caminho é bom:** além de ser imediato e grátis, quando o lead
manda a primeira mensagem ele **abre a janela de 24 horas** — e dentro dela o
comercial pode conversar livremente, sem template nenhum.

**A limitação honesta:** depende de a pessoa tocar em "enviar" no WhatsApp. Uma
parte não vai tocar. Por isso o caminho C abaixo existe como rede de segurança.

### Caminho B — botões de verdade, disparo sem depender do lead

WhatsApp Cloud API com *template* de botões de resposta rápida. Precisa de:
número dedicado à API, conta Business verificada, template aprovado pela Meta
(1 a 2 dias) e um provedor (Z-API, Twilio, 360dialog) ou um dev.

Template a submeter — categoria **Marketing**, com `{{1}}` = primeiro nome:

```
Olá, {{1}}! Aqui é a equipe TetraBrazil ⚽

Recebemos seu contato sobre o TetraPREP 2026-2027 — a formação
que já colocou mais de 1.000 treinadores brasileiros para
trabalhar nos Estados Unidos.

Investimento: R$ 1.350 (em até 12x no cartão).
Presencial: São Paulo 10-13/dez ou Rio de Janeiro 17-20/dez.

Podemos entrar em contato?
```
Botões de resposta rápida: `Estou ciente, quero contato` · `Não tenho interesse`

> Limite de 20 caracteres por botão no WhatsApp — por isso os textos estão
> encurtados em relação às opções 1 e 2.

### Caminho C — e-mail instantâneo pelo Apps Script *(rede de segurança, 10 min)*

Pega quem não foi para o WhatsApp. Acrescentar ao `doPost`, depois de gravar a
linha:

```js
function enviarRespostaImediata(data) {
  var email = (data.email || '').toString().trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;   // sem e-mail válido, sai
  var nome = (data.nome || '').toString().trim().split(' ')[0] || 'tudo bem';

  var corpo =
    'Olá, ' + nome + '!\n\n' +
    'Recebemos seu contato sobre o TetraPREP 2026-2027.\n\n' +
    'Se você tem entre 21 e 45 anos e quer trabalhar com futebol nos Estados\n' +
    'Unidos, essa é a sua oportunidade — e não precisa de faculdade de Educação\n' +
    'Física nem de inglês fluente.\n\n' +
    'O QUE O TETRAPREP ABRE PRA VOCÊ\n' +
    '- USD 210 a 250 por semana trabalhando nos EUA\n' +
    '- Hospedagem, transporte e seguro saúde inclusos\n' +
    '- Passagem aérea paga\n' +
    '- Visto J-1, mais de 95% de aprovação desde 2009\n\n' +
    'Em 25 anos já colocamos mais de 1.000 treinadores brasileiros nos EUA.\n' +
    'Só em 2025, 220 pessoas fizeram o TetraPREP e 90 receberam proposta.\n\n' +
    'INVESTIMENTO: R$ 1.350 (em até 12x no cartão)\n' +
    'Cobre 16h online ao vivo + 24h de imersão presencial.\n\n' +
    'DATAS DA IMERSÃO PRESENCIAL\n' +
    '- São Paulo: 10 a 13/dez, Teal Rising Academy (Itu)\n' +
    '- Rio de Janeiro: 17 a 20/dez, CT da base do Fluminense (Xerém)\n' +
    'No núcleo do Rio há hospedagem opcional (3 diárias, café e almoço) por\n' +
    'R$ 650 à parte.\n\n' +
    'Garanta sua vaga: https://www.sympla.com.br/play/tetraprep-2026-2027/3462775\n\n' +
    'Quer falar com a gente? WhatsApp (11) 94148-8736\n\n' +
    'Equipe TetraBrazil';

  try {
    MailApp.sendEmail({
      to: email,
      subject: 'TetraPREP 2026-2027 — recebemos seu contato',
      body: corpo,
      name: 'TetraBrazil'
    });
  } catch (err) {
    console.error('Falha ao enviar e-mail para o lead: ' + err);  // nunca derruba o doPost
  }
}
```

Chamar **depois** de gravar a linha na planilha, nunca antes — assim uma falha no
envio não faz o lead se perder:

```js
sheet.appendRow(linha);
enviarRespostaImediata(data);
```

> Cota do Gmail: 100 e-mails/dia em conta gratuita, 1.500/dia no Workspace. No
> ritmo atual (22 leads/dia) sobra folga nos dois casos.

---

## 5. O que medir depois

Acrescentar duas colunas na planilha, para o relatório do mês conseguir separar
lead bom de lead ruim:

| Coluna | Para quê |
|---|---|
| `resposta_qualificacao` | 1, 2 ou vazio — mede quantos % se dizem cientes do investimento |
| `data_primeiro_contato` | mede o tempo de resposta do comercial, que hoje é o gargalo |

Com essas duas colunas dá para responder a pergunta que ainda está aberta: **dos
leads a R$ 1,96, quantos são de verdade?** Se 60% responderem "1", o CPL
qualificado é R$ 3,27 — e continua excelente para um produto de R$ 1.350.
