import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 3: Camada de ozônio (capítulo 11, p. 51).
 *
 * Cubre qué hace la capa de ozono (filtra ~90 % de la radiación UV), los daños y
 * el beneficio de la radiación UV (vitamina D), qué son los CFCs y cómo la
 * destruyen, el agujero sobre la Antártida (1985), el Protocolo de Montreal
 * (1987), la lectura de la imagen de octubre de 2019 y por qué el problema dura
 * todavía unos cincuenta años.
 */
export const TEMA_CAMADA_DE_OZONIO: ExamQuestionWithTopic[] = [
  {
    id: "cie-t3-q01",
    topic: "camada-de-ozonio",
    prompt: "Qual é a função da camada de ozônio para a vida no planeta?",
    options: [
      {
        id: "A",
        text: "Reter o calor do Sol na atmosfera e manter a temperatura média da Terra em torno de 15 °C",
        correct: false,
        explanation:
          "Reter calor e manter a Terra em torno de 15 °C é o papel do efeito estufa, feito por gases como o gás carbônico, o metano e o vapor d'água. Parece certa porque os dois assuntos tratam de gases que protegem a vida. Mas o ozônio não aparece como gás do efeito estufa no livro: a função dele é filtrar os raios ultravioleta.",
      },
      {
        id: "B",
        text: "Produzir o oxigênio que os seres vivos respiram, liberando esse gás durante o dia inteiro",
        correct: false,
        explanation:
          "O oxigênio que respiramos é produzido pela fotossíntese de plantas e algas. Parece certa porque o ozônio (O3) é formado por átomos de oxigênio. Mas a camada de ozônio não produz o ar que respiramos: o papel dela, segundo o livro, é filtrar a radiação ultravioleta.",
      },
      {
        id: "C",
        text: "Filtrar em torno de 90 % da radiação ultravioleta emitida pelo Sol, protegendo os seres vivos",
        correct: true,
        explanation:
          "Correta. O livro diz que, ao redor da Terra, há uma camada rica em gás ozônio (O3) que filtra em torno de 90 % da radiação ultravioleta (UV) emitida pelo Sol. Por isso ela é fundamental: os raios UV são muito nocivos aos seres vivos.",
      },
      {
        id: "D",
        text: "Impedir que os poluentes das cidades subam, segurando-os perto da superfície durante o inverno",
        correct: false,
        explanation:
          "Segurar os poluentes perto da superfície é o que acontece na inversão térmica, quando uma camada de ar quente fica sobre o ar frio. Parece certa porque também é uma 'camada' na atmosfera. Mas isso é um problema, e não uma proteção; a camada de ozônio protege filtrando os raios UV.",
      },
    ],
    tips: [
      "Camada de ozônio = filtro de UV (cerca de 90 %). Efeito estufa = retenção de calor.",
      "Ozônio é O3; o oxigênio que respiramos é O2, produzido pela fotossíntese.",
    ],
  },
  {
    id: "cie-t3-q02",
    topic: "camada-de-ozonio",
    prompt:
      "Uma pessoa passa muitas horas ao sol todos os dias, sem nenhuma proteção. Quais danos da radiação ultravioleta o livro cita?",
    options: [
      {
        id: "A",
        text: "Surdez, irritabilidade e neurose, causadas pela exposição prolongada aos raios do Sol",
        correct: false,
        explanation:
          "Surdez, irritabilidade e neurose são os danos que o livro atribui à poluição sonora, o excesso de ruído de automóveis, obras e fábricas. Parece certa porque são danos à saúde citados no mesmo capítulo. Mas não têm relação com a radiação ultravioleta.",
      },
      {
        id: "B",
        text: "Doenças respiratórias e má-formação do sistema nervoso nas crianças que nascem na região",
        correct: false,
        explanation:
          "Doenças respiratórias e o nascimento de crianças com má-formação do sistema nervoso são efeitos que o livro atribui à chuva ácida. Parece certa porque também são problemas de saúde causados por algo que vem da atmosfera. Mas pertencem a outro fenômeno; a radiação UV atinge sobretudo a pele e os olhos.",
      },
      {
        id: "C",
        text: "Intoxicação e danos ao sistema nervoso, pelo acúmulo de metais pesados nos tecidos do corpo",
        correct: false,
        explanation:
          "Intoxicação e danos ao sistema nervoso pelo acúmulo de substâncias nos tecidos é o que o livro descreve para os metais tóxicos, como o mercúrio, na bioacumulação. Parece certa porque também são danos graves e acumulativos. Mas vêm da ingestão de água e de alimentos contaminados, não da luz do Sol.",
      },
      {
        id: "D",
        text: "Envelhecimento precoce, câncer de pele, danos ao sistema de defesa do corpo e à visão",
        correct: true,
        explanation:
          "Correta. O livro diz que os raios UV são responsáveis pelo envelhecimento precoce e pelo câncer de pele, além de afetarem o sistema de defesa do corpo e poderem danificar a visão.",
      },
    ],
    tips: [
      "Danos do UV: envelhecimento precoce, câncer de pele, defesa do corpo e visão.",
      "Cada poluição tem os seus danos: ruído (surdez), chuva ácida (respiração), metais (sistema nervoso).",
    ],
  },
  {
    id: "cie-t3-q03",
    topic: "camada-de-ozonio",
    prompt:
      "Apesar dos malefícios, o livro diz que a radiação ultravioleta é benéfica em pequenas quantidades. Por quê?",
    options: [
      {
        id: "A",
        text: "Porque ajuda as plantas a absorver o gás carbônico do ar e, assim, diminui o aquecimento global",
        correct: false,
        explanation:
          "Absorver gás carbônico é o que plantas e algas fazem na fotossíntese, e isso ajuda a reduzir o aquecimento global. Parece certa porque a fotossíntese depende da luz do Sol. Mas o livro não liga esse benefício aos raios UV; o benefício que ele cita é para o corpo humano.",
      },
      {
        id: "B",
        text: "Porque ajuda na produção de vitamina D, que ajuda o corpo a absorver o cálcio, fortalece os ossos e previne a osteoporose",
        correct: true,
        explanation:
          "Correta. Segundo o livro, em pequenas quantidades a radiação UV é benéfica para a produção de vitamina D, que ajuda o corpo a absorver o mineral cálcio, fortalecendo os ossos e prevenindo a osteoporose, uma doença que deixa os ossos frágeis.",
      },
      {
        id: "C",
        text: "Porque destrói os CFCs que estão na atmosfera e ajuda a fechar o buraco na camada de ozônio",
        correct: false,
        explanation:
          "Os CFCs são os gases que destroem a camada de ozônio. Parece certa porque soaria como uma solução natural para o problema. Mas o livro diz o contrário: os CFCs é que destroem o ozônio, e as moléculas que já estão no ar vão continuar agindo por pelo menos mais cinquenta anos.",
      },
      {
        id: "D",
        text: "Porque fortalece o sistema de defesa do corpo e protege a pele contra o envelhecimento precoce e o câncer",
        correct: false,
        explanation:
          "O sistema de defesa do corpo protege contra doenças, o envelhecimento precoce é a pele envelhecer antes do tempo, e o câncer de pele é uma doença grave da pele. Parece certa porque usa termos que aparecem no mesmo parágrafo do livro. Mas os três estão na lista dos malefícios: os raios UV prejudicam a defesa do corpo e causam o envelhecimento precoce e o câncer de pele.",
      },
    ],
    tips: [
      "Benefício do UV: vitamina D → ajuda a absorver o cálcio → ossos fortes → previne osteoporose.",
      "Cuidado com alternativas que pegam um dano e o apresentam como benefício.",
    ],
  },
  {
    id: "cie-t3-q04",
    topic: "camada-de-ozonio",
    prompt:
      "Os clorofluorcarbonetos (CFCs) são os principais responsáveis pela destruição da camada de ozônio. O que o livro diz sobre eles?",
    options: [
      {
        id: "A",
        text: "São formados por cloro, flúor e carbono e eram muito usados em aerossóis e em gases de refrigeração",
        correct: true,
        explanation:
          "Correta. O livro explica que os CFCs são formados pelos elementos cloro, flúor e carbono e eram muito utilizados como aerossóis (sprays) e gases para refrigeração, como os de geladeiras. Ao reagir com o ozônio, eles o destroem.",
      },
      {
        id: "B",
        text: "São formados por carbono e hidrogênio e saem principalmente da queima de carvão e de petróleo",
        correct: false,
        explanation:
          "Carvão e petróleo são combustíveis fósseis, e a sua queima libera principalmente gás carbônico, que intensifica o efeito estufa. Parece certa porque 'carbono' faz parte do nome dos CFCs. Mas os CFCs não vêm da queima de combustíveis: eram fabricados para uso em sprays e na refrigeração.",
      },
      {
        id: "C",
        text: "São os gases liberados por vulcões e pântanos, que tornam a chuva mais ácida do que o normal",
        correct: false,
        explanation:
          "Vulcões e pântanos são causas naturais da chuva ácida, segundo o livro. Parece certa porque também envolvem gases nocivos na atmosfera. Mas os CFCs não são naturais: são substâncias produzidas pelos seres humanos, e o problema deles é destruir o ozônio, não acidificar a chuva.",
      },
      {
        id: "D",
        text: "São nutrientes como o nitrogênio e o fósforo, que chegam aos rios pelo esgoto e pelos fertilizantes",
        correct: false,
        explanation:
          "O nitrogênio e o fósforo são os nutrientes que, em excesso nos corpos d'água, causam a eutrofização, a proliferação de algas. Parece certa porque também são substâncias lançadas pela ação humana. Mas estão na poluição da água; os CFCs são gases que agem na atmosfera.",
      },
    ],
    tips: [
      "CFC = cloro + flúor + carbono. Usos: aerossóis (sprays) e refrigeração.",
      "Os CFCs aparecem em dois assuntos: destroem o ozônio e também intensificam o efeito estufa.",
    ],
  },
  {
    id: "cie-t3-q05",
    topic: "camada-de-ozonio",
    prompt:
      "Depois que se descobriu um buraco na camada de ozônio sobre a Antártida, em 1985, o que o mundo fez a respeito dos CFCs?",
    options: [
      {
        id: "A",
        text: "Passou a usar mais CFCs nas geladeiras, porque eles ajudam a resfriar a atmosfera do planeta",
        correct: false,
        explanation:
          "Essa alternativa imagina que um gás de refrigeração também resfriaria o planeta. Parece certa porque os CFCs eram mesmo usados para refrigerar geladeiras. Mas eles destroem o ozônio e ainda intensificam o efeito estufa; a resposta do mundo foi proibi-los.",
      },
      {
        id: "B",
        text: "Assinou o Acordo de Paris, que proibiu de imediato os CFCs e fechou o buraco no mesmo ano",
        correct: false,
        explanation:
          "O Acordo de Paris é um acordo internacional sobre as mudanças climáticas, citado no 'Saiba Mais' do livro junto com o Protocolo de Kyoto. Parece certa porque é o tratado ambiental mais famoso. Mas o tratado que proibiu os CFCs foi o Protocolo de Montreal, e o buraco não se fechou: o problema continua por décadas.",
      },
      {
        id: "C",
        text: "Decidiu proibir apenas os CFCs usados nos aerossóis e manter os gases das geladeiras",
        correct: false,
        explanation:
          "Essa alternativa imagina uma proibição só parcial. Parece certa porque os aerossóis são o uso mais lembrado dos CFCs. Mas o livro diz que os CFCs foram proibidos e que o tratado eliminou o uso dessas substâncias ao longo dos anos seguintes, sem separar os usos.",
      },
      {
        id: "D",
        text: "Proibiu os CFCs em 1987 pelo Protocolo de Montreal, para eliminar o seu uso nos anos seguintes",
        correct: true,
        explanation:
          "Correta. O livro conta que o buraco sobre a Antártida foi descoberto em 1985 e que, em 1987, os CFCs foram proibidos pelo Protocolo de Montreal, um tratado internacional para eliminar a utilização dessas substâncias ao longo dos anos seguintes.",
      },
    ],
    tips: [
      "1985: descoberta do buraco sobre a Antártida. 1987: Protocolo de Montreal proíbe os CFCs.",
      "Montreal = ozônio. Kyoto e Paris = mudanças climáticas.",
    ],
  },
  {
    id: "cie-t3-q06",
    topic: "camada-de-ozonio",
    prompt:
      "O livro mostra uma imagem do buraco na camada de ozônio em outubro de 2019, com regiões coloridas. O que indicam as áreas em roxo e azul?",
    options: [
      {
        id: "A",
        text: "As áreas com mais ozônio, onde a camada está mais grossa e protege melhor contra o UV",
        correct: false,
        explanation:
          "As áreas com mais ozônio, segundo a legenda da imagem, são as que aparecem em amarelo e verde. Parece certa porque as cores frias poderiam lembrar proteção. Mas a legenda é clara: roxo e azul marcam onde há menos ozônio.",
      },
      {
        id: "B",
        text: "As áreas mais frias do planeta, onde o gelo das calotas polares ainda não derreteu",
        correct: false,
        explanation:
          "As calotas polares são as grandes massas de gelo dos polos, que derretem com o aquecimento global. Parece certa porque a imagem mostra justamente a região da Antártida. Mas ela não mede temperatura nem gelo: mede a quantidade de ozônio na atmosfera.",
      },
      {
        id: "C",
        text: "As áreas com menos ozônio, ou seja, a região do buraco sobre a Antártida",
        correct: true,
        explanation:
          "Correta. A legenda diz que, na imagem, as áreas em roxo e azul são as que apresentam menos ozônio, e as em amarelo e verde, as que apresentam mais. O roxo e o azul mostram, portanto, o buraco na camada.",
      },
      {
        id: "D",
        text: "As áreas com mais gás carbônico, onde o efeito estufa está mais forte em todo o planeta",
        correct: false,
        explanation:
          "O gás carbônico é o principal gás de efeito estufa intensificado pelas atividades humanas. Parece certa porque mapas coloridos da atmosfera muitas vezes mostram CO2. Mas a imagem do livro é sobre a camada de ozônio, e as cores indicam a quantidade de ozônio, não de gás carbônico.",
      },
    ],
    tips: [
      "Imagem de 2019: roxo e azul = menos ozônio (o buraco); amarelo e verde = mais ozônio.",
      "Sempre leia a legenda antes de interpretar as cores de uma imagem.",
    ],
  },
  {
    id: "cie-t3-q07",
    topic: "camada-de-ozonio",
    prompt:
      "Hoje a emissão de CFCs é quase zero. Mesmo assim, o livro diz que a camada de ozônio ainda vai ser afetada. Por quê?",
    options: [
      {
        id: "A",
        text: "Porque o aquecimento global derrete o gelo da Antártida e esse gelo libera o ozônio guardado",
        correct: false,
        explanation:
          "O aquecimento global derrete as calotas polares, o que diminui a radiação refletida e eleva o nível dos oceanos. Parece certa porque o buraco fica sobre a Antártida, uma região de gelo. Mas o livro não fala em ozônio guardado no gelo; a camada continua sendo afetada por causa dos CFCs que já estão no ar.",
      },
      {
        id: "B",
        text: "Porque as moléculas de CFC que já estão na atmosfera vão afetar o ozônio por, no mínimo, mais cinquenta anos",
        correct: true,
        explanation:
          "Correta. O livro diz que, embora a emissão de CFC seja quase zero, as moléculas que já existem na atmosfera vão continuar afetando o gás ozônio por, no mínimo, mais cinquenta anos. Parar de emitir não apaga o que já foi lançado.",
      },
      {
        id: "C",
        text: "Porque o Protocolo de Montreal permitiu que os países continuassem usando CFCs nas indústrias e nas geladeiras",
        correct: false,
        explanation:
          "O Protocolo de Montreal é o tratado internacional de 1987 que proibiu os CFCs. Parece certa porque é o tratado ligado ao assunto. Mas ele não liberou o uso: proibiu e eliminou essas substâncias ao longo dos anos seguintes. Por isso a emissão hoje é quase zero.",
      },
      {
        id: "D",
        text: "Porque a radiação ultravioleta que passa pelo buraco destrói, sozinha, o ozônio que ainda sobra",
        correct: false,
        explanation:
          "A radiação ultravioleta é a que a camada de ozônio filtra; em excesso, causa câncer de pele e envelhecimento precoce. Parece certa porque é ela que passa pelo buraco. Mas o livro não diz que a radiação destrói o ozônio: quem faz isso são os CFCs, que reagem com o gás.",
      },
    ],
    tips: [
      "Emissão quase zero não é problema resolvido: os CFCs já lançados agem por mais 50 anos, no mínimo.",
      "Quem destrói o ozônio são os CFCs; com menos ozônio, mais radiação UV chega até nós.",
    ],
  },
];
