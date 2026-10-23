import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 7: Poluição sonora, visual e luminosa, abelhas e espécies exóticas
 * (capítulo 11, pp. 57–58).
 *
 * Cubre las causas y efectos de cada una de las tres contaminaciones, la
 * desorientación de las aves migratorias, el "Voando Alto" de las abejas (73 %
 * de las plantas dependen de su polinización, por qué están en declive y qué
 * pasaría si se extinguieran) y la definición de especie exótica del recuadro
 * "Reflita, Argumente e Compartilhe", que también abre el capítulo.
 */
export const TEMA_OUTRAS_POLUICOES: ExamQuestionWithTopic[] = [
  {
    id: "cie-t7-q01",
    topic: "outras-poluicoes",
    prompt:
      "Uma pessoa mora ao lado de uma obra e de uma avenida muito movimentada. Que problemas de saúde o livro associa a esse tipo de poluição?",
    options: [
      {
        id: "A",
        text: "Câncer de pele e envelhecimento precoce, pela exposição contínua à poeira da obra e ao calor do asfalto",
        correct: false,
        explanation:
          "Câncer de pele e envelhecimento precoce são danos que o livro atribui à radiação ultravioleta, que passa mais quando a camada de ozônio está destruída. Tenta porque são problemas de saúde citados no mesmo capítulo. Mas o enunciado descreve barulho de obras e de trânsito, que é poluição sonora.",
      },
      {
        id: "B",
        text: "Surdez, irritabilidade e neurose, causadas pelo barulho dos automóveis e da construção civil",
        correct: true,
        explanation:
          "Correta. É poluição sonora, causada, por exemplo, por automóveis, atividades da construção civil e fábricas. O livro diz que ela pode levar à surdez, à irritabilidade e à neurose.",
      },
      {
        id: "C",
        text: "Nenhum problema de saúde, só desconforto, porque o barulho não chega a afetar o corpo humano",
        correct: false,
        explanation:
          "'Não causa doenças, mas causa desconforto' é o que o livro diz da poluição visual, o excesso de outdoors, cartazes, placas e fios. Tenta porque o barulho também incomoda. Mas a poluição sonora causa sim problemas de saúde: surdez, irritabilidade e neurose.",
      },
      {
        id: "D",
        text: "Desorientação para se locomover, porque o barulho impede que a pessoa perceba onde está",
        correct: false,
        explanation:
          "A desorientação de organismos é o efeito que o livro atribui à poluição luminosa, o excesso de luzes artificiais que confunde animais que dependem do escuro. Tenta porque também é um efeito de poluição urbana. Mas pertence à poluição luminosa, e quem se desorienta são sobretudo os animais, como os pássaros.",
      },
    ],
    tips: [
      "Poluição sonora: automóveis, construção civil, fábricas. Efeitos: surdez, irritabilidade, neurose.",
      "Visual não causa doenças (só desconforto); luminosa desorienta animais.",
    ],
  },
  {
    id: "cie-t7-q02",
    topic: "outras-poluicoes",
    prompt: "O que o livro diz sobre a poluição visual?",
    options: [
      {
        id: "A",
        text: "Não causa doenças, mas causa desconforto e afeta a qualidade de vida, pelo excesso de informações e de objetos",
        correct: true,
        explanation:
          "Correta. O livro diz que a poluição visual, apesar de não causar doenças, causa desconforto e afeta a qualidade de vida. É ocasionada pelo excesso de informações em outdoors, cartazes, placas e postes, pelo excesso de fios de eletricidade e pelo acúmulo de resíduos.",
      },
      {
        id: "B",
        text: "É a poluição causada pelo excesso de luzes artificiais à noite, que deixa o céu sem estrelas",
        correct: false,
        explanation:
          "O excesso de luzes artificiais à noite é a poluição luminosa, que desorienta organismos que dependem do escuro. Tenta porque as duas têm a ver com o que se vê. Mas a poluição visual é o excesso de informações e objetos na paisagem, como outdoors e fios, e não o excesso de luz.",
      },
      {
        id: "C",
        text: "É a mais perigosa das três, porque provoca problemas de visão e câncer nos olhos de quem vive nas cidades",
        correct: false,
        explanation:
          "Danos à visão aparecem no livro como efeito da radiação ultravioleta, quando a camada de ozônio não a filtra. Tenta porque 'visual' lembra os olhos. Mas o livro diz justamente que a poluição visual não causa doenças, apenas desconforto.",
      },
      {
        id: "D",
        text: "É a fumaça escura das fábricas e dos automóveis, que encobre a vista dos prédios nas cidades",
        correct: false,
        explanation:
          "A fumaça de fábricas e automóveis é poluição do ar, com gases e partículas lançados na atmosfera, como na foto da cidade coberta de fumaça. Tenta porque a fumaça atrapalha a vista. Mas a poluição visual é o excesso de informações e objetos na paisagem, e não uma poluição do ar.",
      },
    ],
    tips: [
      "Poluição visual: outdoors, cartazes, placas, postes, fios de eletricidade e acúmulo de resíduos.",
      "Visual não causa doenças, mas tira qualidade de vida.",
    ],
  },
  {
    id: "cie-t7-q03",
    topic: "outras-poluicoes",
    prompt: "Por que o excesso de luzes artificiais é considerado uma forma de poluição?",
    options: [
      {
        id: "A",
        text: "Porque as lâmpadas liberam gás carbônico na atmosfera e intensificam o efeito estufa",
        correct: false,
        explanation:
          "O gás carbônico que intensifica o efeito estufa vem principalmente da queima de combustíveis fósseis e das queimadas. Tenta porque gerar eletricidade em termoelétricas solta CO2. Mas o livro não define a poluição luminosa por gases: o poluente aqui é a própria luz, que é energia.",
      },
      {
        id: "B",
        text: "Porque a luz forte das cidades destrói a camada de ozônio e deixa passar mais raios ultravioleta",
        correct: false,
        explanation:
          "Quem destrói a camada de ozônio são os CFCs, gases de cloro, flúor e carbono usados em aerossóis e na refrigeração. Tenta porque luz e raios UV parecem coisas parecidas. Mas a luz das cidades não afeta o ozônio; o dano da poluição luminosa é outro.",
      },
      {
        id: "C",
        text: "Porque interfere nos ecossistemas e na saúde, desorientando organismos que dependem do escuro",
        correct: true,
        explanation:
          "Correta. O livro diz que a poluição luminosa decorre do excesso de luzes artificiais, que interferem nos ecossistemas e na saúde humana, desorientando organismos que dependem do escuro para se locomover e realizar as suas atividades. Por isso a luz, que é energia, entra na definição de poluição.",
      },
      {
        id: "D",
        text: "Porque a luz esquenta o ar das cidades durante a noite e provoca a inversão térmica no inverno",
        correct: false,
        explanation:
          "A inversão térmica acontece quando o ar frio fica preso embaixo de uma camada de ar mais quente, e é mais comum no inverno e em manhãs frias. Tenta porque fala de ar e de cidade. Mas ela é um fenômeno natural ligado ao aquecimento da superfície pelo Sol, e não à iluminação artificial.",
      },
    ],
    tips: [
      "Poluição luminosa: excesso de luz artificial que desorienta organismos que dependem do escuro.",
      "Luz é energia; por isso entra na definição de poluição ambiental.",
    ],
  },
  {
    id: "cie-t7-q04",
    topic: "outras-poluicoes",
    prompt:
      "Muitos pássaros migram à noite. Segundo o livro, o que acontece com eles nas regiões com excesso de iluminação?",
    options: [
      {
        id: "A",
        text: "Migram mais rápido, porque a luz das cidades ilumina o caminho e eles enxergam melhor",
        correct: false,
        explanation:
          "Essa alternativa imagina a luz artificial como uma ajuda para os pássaros. Tenta porque, para nós, luz facilita enxergar à noite. Mas os pássaros se orientam pelas estrelas e pela lua, e a luz artificial atrapalha essa orientação.",
      },
      {
        id: "B",
        text: "Param de migrar, porque a luz faz a noite parecer dia e eles ficam no ninho esperando",
        correct: false,
        explanation:
          "Essa alternativa supõe que os pássaros confundiriam a noite com o dia e deixariam de voar. Tenta porque a luz muda mesmo o ambiente noturno. Mas o livro não diz que eles param; diz que ficam desorientados durante o voo e sofrem colisões.",
      },
      {
        id: "C",
        text: "Ficam com problemas de audição, porque o barulho das cidades iluminadas os impede de se comunicar",
        correct: false,
        explanation:
          "Problemas de audição, como a surdez, são efeito da poluição sonora, causada por automóveis, obras e fábricas. Tenta porque as cidades iluminadas também costumam ser barulhentas. Mas o enunciado fala de iluminação, e o efeito da poluição luminosa é a desorientação.",
      },
      {
        id: "D",
        text: "Ficam desorientados, porque usam as constelações e a luz da lua para se guiar, e sofrem colisões",
        correct: true,
        explanation:
          "Correta. O livro diz que muitos pássaros utilizam as constelações e a luz da lua para migrar durante a noite, mas, com o excesso de iluminação, ficam desorientados e sofrem colisões.",
      },
    ],
    tips: [
      "Pássaros migratórios se guiam pelas constelações e pela lua; a luz artificial os desorienta.",
      "Poluição luminosa → desorientação → colisões.",
    ],
  },
  {
    id: "cie-t7-q05",
    topic: "outras-poluicoes",
    prompt:
      "Em uma rua do centro, os postes estão cheios de fios de eletricidade emaranhados e de placas de propaganda. Que tipo de poluição é essa?",
    options: [
      {
        id: "A",
        text: "Poluição luminosa, porque os fios levam a energia que acende as luzes artificiais da cidade",
        correct: false,
        explanation:
          "A poluição luminosa é o excesso de luzes artificiais, que desorienta organismos que dependem do escuro. Tenta porque os fios carregam a eletricidade das lâmpadas. Mas o enunciado não fala de luz, e sim de fios e placas acumulados na paisagem, o que o livro chama de poluição visual.",
      },
      {
        id: "B",
        text: "Poluição do solo, porque os postes estão fincados na terra e os fios acabam caindo no chão",
        correct: false,
        explanation:
          "A poluição do solo é a contaminação e a degradação da terra, por lixo, chorume, defensivos químicos ou desmatamento. Tenta porque os postes estão fincados no chão. Mas fios e placas não contaminam o solo; o problema é o excesso de objetos à vista.",
      },
      {
        id: "C",
        text: "Poluição visual, pelo excesso de fios, placas e informações expostas na paisagem urbana",
        correct: true,
        explanation:
          "Correta. A poluição visual é ocasionada pelo excesso de informações contidas em outdoors, cartazes, placas e postes, pelo excesso de fios de eletricidade e pelo acúmulo de resíduos. É a foto B do livro: postes cheios de fios.",
      },
      {
        id: "D",
        text: "Poluição sonora, porque a eletricidade que passa pelos fios produz um zumbido constante",
        correct: false,
        explanation:
          "A poluição sonora é o excesso de ruído, como o de automóveis, obras e fábricas, que pode causar surdez, irritabilidade e neurose. Tenta porque alguns fios e transformadores realmente zumbem. Mas o livro usa o excesso de fios como exemplo de poluição visual, não sonora.",
      },
    ],
    tips: [
      "Fios, placas, outdoors, cartazes e lixo acumulado na paisagem: poluição visual.",
      "Essas três poluições (sonora, visual e luminosa) são mais comuns nos grandes centros urbanos.",
    ],
  },
  {
    id: "cie-t7-q06",
    topic: "outras-poluicoes",
    prompt:
      "No quadro 'Voando Alto', o livro fala das abelhas. Que parte das espécies de plantas do mundo depende da polinização feita por elas?",
    options: [
      {
        id: "A",
        text: "Cerca de 73 % das espécies de plantas, que dependem das abelhas para poderem se reproduzir",
        correct: true,
        explanation:
          "Correta. O livro diz que 73 % das espécies de plantas do mundo dependem da polinização por abelhas, ou seja, dependem delas para poderem se reproduzir. Polinização é o transporte do pólen de uma flor para outra.",
      },
      {
        id: "B",
        text: "Cerca de 90 % das espécies de plantas, a mesma parte da radiação UV que o ozônio filtra",
        correct: false,
        explanation:
          "O número 90 % aparece no capítulo, mas na camada de ozônio: ela filtra em torno de 90 % da radiação ultravioleta do Sol. Tenta porque é outro número marcante do mesmo capítulo. Mas, para as abelhas, o número do livro é 73 %.",
      },
      {
        id: "C",
        text: "Somente as plantas que produzem mel, porque as abelhas só visitam as flores de que fazem mel",
        correct: false,
        explanation:
          "O mel é o alimento que as abelhas produzem a partir do néctar das flores. Tenta porque o mel é o produto das abelhas mais conhecido. Mas o livro diz que sem abelhas não ficaríamos apenas sem mel: a maior parte das plantas do planeta depende delas para se reproduzir.",
      },
      {
        id: "D",
        text: "Cerca de 15 % das espécies de plantas, porque a maior parte é polinizada pelo vento e pela água",
        correct: false,
        explanation:
          "O número 15 aparece no capítulo como a temperatura média do planeta, 15 °C, mantida pelo efeito estufa. Tenta porque soa como uma porcentagem pequena e possível. Mas o livro diz que as abelhas polinizam 73 % das espécies de plantas, a maioria delas.",
      },
    ],
    tips: [
      "Abelhas: 73 % das espécies de plantas dependem da polinização delas.",
      "Não misture os números do capítulo: 15 °C (efeito estufa), 90 % (ozônio), 5,6 (pH da chuva), 73 % (abelhas).",
    ],
  },
  {
    id: "cie-t7-q07",
    topic: "outras-poluicoes",
    prompt:
      "Segundo o 'Voando Alto', por que as populações de abelhas estão em declínio, e o que aconteceria se elas fossem extintas?",
    options: [
      {
        id: "A",
        text: "Por causa da poluição luminosa; com a extinção, só a produção de mel no mundo seria prejudicada",
        correct: false,
        explanation:
          "A poluição luminosa é o excesso de luzes artificiais que desorienta animais noturnos, como os pássaros migratórios. Tenta porque abelhas também voam e se orientam. Mas o livro aponta outra causa para o declínio das abelhas, e diz que a extinção afetaria muito mais que o mel.",
      },
      {
        id: "B",
        text: "Pelo uso descontrolado de defensivos químicos; sem elas, a maior parte das plantas, das cultivadas aos seres humanos, seria afetada",
        correct: true,
        explanation:
          "Correta. O livro diz que as populações de abelhas estão em declínio principalmente pelo uso descontrolado de defensivos químicos. Se elas fossem extintas, a maior parte das plantas desapareceria, incluindo as cultivadas para alimentação; sem as plantas, os animais e os seres humanos também desapareceriam.",
      },
      {
        id: "C",
        text: "Por causa do aquecimento global; com a extinção, outros insetos ocupariam o lugar delas na polinização das plantas, sem nenhum prejuízo para ninguém",
        correct: false,
        explanation:
          "O aquecimento global pode levar à extinção de espécies que não conseguem migrar para áreas mais amenas, segundo o livro. Tenta porque é uma causa real de extinção citada no capítulo. Mas, no caso das abelhas, o livro aponta os defensivos químicos como causa principal, e não diz que outros insetos as substituiriam.",
      },
      {
        id: "D",
        text: "Por causa das espécies exóticas; com a extinção, só as flores ornamentais deixariam de existir",
        correct: false,
        explanation:
          "Espécie exótica é a que vive fora da sua área de distribuição natural e pode desequilibrar o ecossistema. Tenta porque aparece logo abaixo, na mesma página. Mas o livro não a liga ao declínio das abelhas, e a extinção delas atingiria também as plantas usadas na alimentação.",
      },
    ],
    tips: [
      "Declínio das abelhas: principalmente o uso descontrolado de defensivos químicos.",
      "Sem abelhas: sem a maioria das plantas, sem alimento, e por fim sem animais e seres humanos.",
    ],
  },
  {
    id: "cie-t7-q08",
    topic: "outras-poluicoes",
    prompt:
      "O livro propõe pesquisar uma espécie exótica presente no Brasil. O que é uma espécie exótica, e por que a sua introdução pode ser um problema?",
    options: [
      {
        id: "A",
        text: "É uma espécie rara e colorida, e o problema é que ela atrai caçadores para os ambientes naturais",
        correct: false,
        explanation:
          "Essa alternativa usa o sentido cotidiano de 'exótico', de algo raro ou diferente. Tenta porque é assim que a palavra é usada fora da Ciência. Mas, no livro, espécie exótica é a que está fora da sua área de distribuição natural, e o problema é o desequilíbrio que ela causa no ecossistema.",
      },
      {
        id: "B",
        text: "É uma espécie que só existe no Brasil, e o problema é que ela corre risco de ser extinta",
        correct: false,
        explanation:
          "Uma espécie que só existe em um lugar é chamada de endêmica, e pode correr risco de extinção. Tenta porque o enunciado fala de espécies presentes no Brasil. Mas a espécie exótica é o contrário: veio de fora da sua área natural, e o problema é o dano que ela causa às espécies nativas.",
      },
      {
        id: "C",
        text: "É uma espécie que sempre viveu no mesmo ambiente, e o problema é que ela não consegue se adaptar a mudanças",
        correct: false,
        explanation:
          "Uma espécie que sempre viveu em um ambiente é chamada de nativa daquele lugar. Tenta porque o livro fala das espécies nativas na mesma frase. Mas as nativas são as que a espécie exótica prejudica; a exótica é a que chegou de fora.",
      },
      {
        id: "D",
        text: "É uma espécie fora da sua área natural, e pode alterar o ecossistema, prejudicar as nativas e causar desequilíbrio",
        correct: true,
        explanation:
          "Correta. O livro define espécie exótica como qualquer espécie, animal ou vegetal, que se encontre fora da sua área de distribuição natural. A sua introdução pode alterar o funcionamento dos ecossistemas, prejudicar as espécies nativas e causar desequilíbrio ambiental.",
      },
    ],
    tips: [
      "Exótica = fora da sua área natural. Nativa = do próprio lugar.",
      "Na pesquisa proposta, o livro pede: local de origem, como chegou ao Brasil, impactos e forma de combate.",
    ],
  },
];
