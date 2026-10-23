import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 4: Chuva ácida e inversão térmica (capítulo 11, pp. 52–53).
 *
 * Cubre por qué la lluvia ya es ácida, cuándo pasa a ser lluvia ácida (pH < 5,6),
 * la escala de pH del recuadro AZpédia, las causas naturales y antrópicas, los
 * efectos sobre suelo, plantas, agua, salud y monumentos de calcáreo, el caso de
 * la Mata Atlántica y cómo reducirla. Después, la circulación normal del aire y
 * qué cambia en un día de inversión térmica.
 */
export const TEMA_CHUVA_ACIDA_E_INVERSAO: ExamQuestionWithTopic[] = [
  {
    id: "cie-t4-q01",
    topic: "chuva-acida-e-inversao",
    prompt:
      "O livro diz que toda chuva já é naturalmente ácida. Então, quando uma precipitação passa a ser considerada chuva ácida?",
    options: [
      {
        id: "A",
        text: "Quando tem pH igual a 7, que é o valor da água pura e indica a acidez máxima da escala",
        correct: false,
        explanation:
          "O pH 7 é o ponto neutro da escala de pH, nem ácido nem alcalino. Tenta porque 7 é o número mais lembrado da escala. Mas pH 7 não é acidez máxima: quanto mais perto de 0, mais ácida a substância. A chuva ácida tem pH abaixo de 5,6.",
      },
      {
        id: "B",
        text: "Quando tem pH acima de 5,6, porque, quanto maior o pH, mais ácida é a água da chuva",
        correct: false,
        explanation:
          "Essa alternativa usa o número certo, 5,6, mas com a escala invertida. Tenta porque parece natural pensar que número maior quer dizer 'mais'. Mas, na escala de pH, quanto menor o valor, mais ácida é a substância; por isso a chuva ácida é a que tem pH inferior a 5,6.",
      },
      {
        id: "C",
        text: "Somente quando cai na forma de chuva, porque a neblina e a neve, mesmo vindas de nuvens poluídas, não carregam acidez",
        correct: false,
        explanation:
          "Neblina e neve são outras formas de precipitação, ou seja, de água que se condensa e cai ou se deposita a partir da atmosfera. Tenta porque o nome do fenômeno é 'chuva' ácida. Mas o livro diz que a chuva ácida pode cair na forma de chuva, neblina ou neve.",
      },
      {
        id: "D",
        text: "Quando a acidez é maior que a da chuva normal, com pH inferior a 5,6, na forma de chuva, neblina ou neve",
        correct: true,
        explanation:
          "Correta. A chuva normal já é um pouco ácida por causa do gás carbônico do ar, com pH em torno de 5,6. A chuva ácida é a precipitação, seja chuva, neblina ou neve, com acidez superior a essa, ou seja, com pH inferior a 5,6.",
      },
    ],
    tips: [
      "Chuva normal: pH em torno de 5,6 (já um pouco ácida pelo CO2). Chuva ácida: pH abaixo de 5,6.",
      "Na escala de pH, número menor = mais ácido.",
    ],
  },
  {
    id: "cie-t4-q02",
    topic: "chuva-acida-e-inversao",
    prompt:
      "No quadro AZpédia, o livro explica a escala de pH. Uma substância com pH 2 e outra com pH 12 são, respectivamente:",
    options: [
      {
        id: "A",
        text: "Muito ácida e muito alcalina, porque perto de 0 a substância é ácida e perto de 14 é alcalina",
        correct: true,
        explanation:
          "Correta. A escala de pH vai de 0 a 14. Quanto mais perto de 0, mais ácida é a substância; quanto mais perto de 14, mais alcalina; e o pH 7 é neutro. Assim, pH 2 é muito ácido e pH 12 é muito alcalino.",
      },
      {
        id: "B",
        text: "Muito alcalina e muito ácida, porque o pH mede o quanto a substância tem de alcalina",
        correct: false,
        explanation:
          "Uma substância alcalina, ou básica, é o oposto de uma ácida, e fica na parte alta da escala de pH. Tenta porque basta trocar os dois extremos de lugar para chegar a esta resposta. Mas o pH baixo indica acidez: pH 2 é ácido e pH 12 é alcalino, não o contrário.",
      },
      {
        id: "C",
        text: "As duas neutras, porque o pH só indica acidez quando o valor é exatamente igual a zero",
        correct: false,
        explanation:
          "Neutra é a substância com pH 7, nem ácida nem alcalina, como a água pura. Tenta porque o zero parece o único ponto 'ácido' da escala. Mas a acidez aumenta aos poucos conforme o valor se aproxima de 0, então pH 2 já é bem ácido, e pH 12 está longe do neutro.",
      },
      {
        id: "D",
        text: "As duas ácidas, porque toda substância com pH diferente de 7 é considerada ácida pela escala",
        correct: false,
        explanation:
          "Essa alternativa aplica a ideia de que qualquer valor fora do 7 seria ácido. Tenta porque o 7 é o ponto de referência. Mas os valores abaixo de 7 são ácidos e os acima de 7 são alcalinos; o pH 12 está do lado alcalino.",
      },
    ],
    tips: [
      "Escala de pH: 0 a 14. Abaixo de 7, ácido; 7, neutro; acima de 7, alcalino.",
      "Quanto mais longe do 7, mais forte a característica: pH 1 é mais ácido que pH 5.",
    ],
  },
  {
    id: "cie-t4-q03",
    topic: "chuva-acida-e-inversao",
    prompt:
      "Em uma região com muitas indústrias e muitos automóveis, a chuva ácida ficou mais frequente. Como o livro explica essa intensificação?",
    options: [
      {
        id: "A",
        text: "Pelos CFCs dos aerossóis, que sobem até a camada de ozônio e voltam com a água da chuva",
        correct: false,
        explanation:
          "Os CFCs são gases de cloro, flúor e carbono que destroem a camada de ozônio. Tenta porque também são gases lançados pelas atividades humanas. Mas o livro não os liga à chuva ácida; os responsáveis por ela são os óxidos de enxofre e de nitrogênio.",
      },
      {
        id: "B",
        text: "Pelos vulcões e pelos pântanos da região, que liberam gases ácidos em grande quantidade",
        correct: false,
        explanation:
          "Vulcões e pântanos são causas naturais da chuva ácida, segundo o livro. Tenta porque realmente liberam gases que acidificam a chuva. Mas o enunciado fala de indústrias e automóveis, e a intensificação que o livro descreve vem da ação humana, não da natureza.",
      },
      {
        id: "C",
        text: "Pela queima de combustíveis fósseis, que libera óxidos de enxofre e de nitrogênio que reagem com a água",
        correct: true,
        explanation:
          "Correta. O livro explica que a queima de combustíveis fósseis em indústrias e automóveis intensificou a liberação de poluentes na atmosfera, principalmente óxidos de enxofre e de nitrogênio, que reagem com a água e formam a chuva ácida.",
      },
      {
        id: "D",
        text: "Pelo esgoto lançado nos rios, que evapora com o calor do dia levando o nitrogênio e o fósforo para as nuvens de chuva",
        correct: false,
        explanation:
          "O esgoto rico em nitrogênio e fósforo causa a eutrofização, a proliferação exagerada de algas nos corpos d'água. Tenta porque o nitrogênio aparece nos dois assuntos. Mas na chuva ácida o nitrogênio está em óxidos lançados no ar pela queima de combustíveis, e não em nutrientes que evaporam do esgoto.",
      },
    ],
    tips: [
      "Chuva ácida: óxidos de enxofre e de nitrogênio + água. Origem humana: queima de combustíveis fósseis.",
      "Causas naturais da chuva ácida: vulcões e pântanos.",
    ],
  },
  {
    id: "cie-t4-q04",
    topic: "chuva-acida-e-inversao",
    prompt:
      "Que efeitos a chuva ácida provoca nos solos, nas plantas e nos ambientes aquáticos, segundo o livro?",
    options: [
      {
        id: "A",
        text: "Deixa os solos mais férteis e as águas mais limpas, porque a acidez da chuva elimina os microrganismos que causam doenças",
        correct: false,
        explanation:
          "Essa alternativa imagina a acidez como uma espécie de limpeza do ambiente. Tenta porque produtos ácidos são usados para limpar. Mas o livro diz o contrário: a chuva ácida empobrece os solos e torna as águas ácidas demais para muitos seres vivos.",
      },
      {
        id: "B",
        text: "Empobrece os solos, faz morrer muitas plantas, tira biodiversidade das águas e contamina o lençol freático",
        correct: true,
        explanation:
          "Correta. O livro diz que a chuva ácida contamina os solos, tornando-os pobres em nutrientes e prejudicando o crescimento das plantas; as plantas atingidas por essas águas ácidas muitas vezes não resistem e morrem. Os ecossistemas aquáticos perdem biodiversidade, e há contaminação dos corpos d'água e do lençol freático.",
      },
      {
        id: "C",
        text: "Cobre a superfície dos rios com uma camada verde de algas que impede a entrada de luz",
        correct: false,
        explanation:
          "A camada verde de algas sobre a água é a floração, típica da eutrofização, causada pelo excesso de nutrientes como nitrogênio e fósforo. Tenta porque também é uma poluição da água que prejudica os ecossistemas aquáticos. Mas é outro fenômeno, com outra causa; a chuva ácida age pela acidez da água, e não por excesso de algas.",
      },
      {
        id: "D",
        text: "Acumula sedimentos no fundo dos rios e lagos, que ficam rasos e acabam totalmente obstruídos",
        correct: false,
        explanation:
          "O acúmulo de sedimentos que obstrui rios e lagos é o assoreamento, consequência da erosão do solo. Tenta porque também prejudica os ambientes aquáticos. Mas é causado pela terra levada para dentro da água, e não pela acidez da chuva.",
      },
    ],
    tips: [
      "Chuva ácida: solo sem nutrientes, plantas prejudicadas, águas ácidas, lençol freático contaminado.",
      "Na saúde humana, o livro cita doenças respiratórias e má-formação do sistema nervoso em bebês.",
    ],
  },
  {
    id: "cie-t4-q05",
    topic: "chuva-acida-e-inversao",
    prompt:
      "O livro mostra a foto de um templo no Camboja corroído pela chuva ácida. Por que construções como essa são atingidas?",
    options: [
      {
        id: "A",
        text: "Porque a chuva ácida degrada construções e monumentos feitos à base de calcário, como o mármore",
        correct: true,
        explanation:
          "Correta. O livro diz que a chuva ácida provoca a degradação de construções civis e monumentos à base de calcário, como o mármore. A acidez da água desgasta essas rochas aos poucos, como se vê no templo do Camboja.",
      },
      {
        id: "B",
        text: "Porque a radiação ultravioleta que passa pelo buraco na camada de ozônio desgasta as pedras",
        correct: false,
        explanation:
          "A radiação ultravioleta é a que a camada de ozônio filtra; o livro fala dos danos dela aos seres vivos, como câncer de pele e problemas de visão. Tenta porque também vem do céu e atinge tudo o que está ao ar livre. Mas a legenda e o texto ligam a corrosão do templo à chuva ácida.",
      },
      {
        id: "C",
        text: "Porque a erosão causada pelos ventos e pelas chuvas comuns desgasta qualquer tipo de rocha",
        correct: false,
        explanation:
          "A erosão é o processo natural de desgaste, transporte e sedimentação de solos e rochas pela ação das chuvas e dos ventos. Tenta porque ela também desgasta rochas. Mas a foto do livro está na seção de chuva ácida, e a legenda atribui a corrosão a ela, pela acidez da água sobre o calcário.",
      },
      {
        id: "D",
        text: "Porque a inversão térmica prende o ar quente sobre o templo e faz as pedras racharem com o calor",
        correct: false,
        explanation:
          "A inversão térmica é o fenômeno em que uma camada de ar quente fica sobre o ar frio e impede a dispersão dos poluentes. Tenta porque fala de ar quente preso. Mas ela prejudica a qualidade do ar que se respira, e o livro não a liga à corrosão de monumentos.",
      },
    ],
    tips: [
      "Calcário e mármore são atacados pela acidez: por isso estátuas e templos se desgastam com a chuva ácida.",
      "Nas fotos do livro, a legenda diz qual fenômeno está sendo mostrado.",
    ],
  },
  {
    id: "cie-t4-q06",
    topic: "chuva-acida-e-inversao",
    prompt:
      "No Brasil, que bioma o livro cita como danificado pela chuva ácida, e por qual motivo?",
    options: [
      {
        id: "A",
        text: "A Floresta Amazônica, por causa do mercúrio lançado pelos garimpos nos rios da região",
        correct: false,
        explanation:
          "O mercúrio lançado pela mineração na Amazônia é um exemplo de contaminação da água por metais tóxicos, que se acumulam na cadeia alimentar. Tenta porque a Amazônia é o bioma mais citado nos problemas ambientais. Mas o mercúrio contamina rios, não a chuva; o bioma que o livro liga à chuva ácida é outro.",
      },
      {
        id: "B",
        text: "O Cerrado, por causa das queimadas feitas para abrir espaço para as lavouras e os pastos",
        correct: false,
        explanation:
          "O Cerrado é o bioma de savana do centro do Brasil, onde as queimadas para a agropecuária são frequentes. Tenta porque queimadas soltam gases na atmosfera. Mas o livro não cita o Cerrado na chuva ácida; ele liga o problema aos centros urbanos e industriais do litoral.",
      },
      {
        id: "C",
        text: "O Pantanal, por causa dos pântanos, que são a principal causa natural de chuva ácida no país",
        correct: false,
        explanation:
          "O Pantanal é a grande planície alagável do Centro-Oeste, e os pântanos aparecem no livro como uma causa natural da chuva ácida. Tenta porque junta as duas palavras. Mas o livro não fala do Pantanal; o dano que ele cita no Brasil vem da poluição de cidades e indústrias.",
      },
      {
        id: "D",
        text: "A Mata Atlântica, por causa dos centros urbanos e industriais localizados perto do litoral",
        correct: true,
        explanation:
          "Correta. O livro diz que, no Brasil, a chuva ácida causou diversos danos à Mata Atlântica, levando à perda de parte desse bioma, devido à presença de centros urbanos e industriais próximos ao litoral, onde essa mata fica.",
      },
    ],
    tips: [
      "Chuva ácida no Brasil: Mata Atlântica, por causa das cidades e indústrias do litoral.",
      "Mercúrio na Amazônia é contaminação da água por metais tóxicos, não chuva ácida.",
    ],
  },
  {
    id: "cie-t4-q07",
    topic: "chuva-acida-e-inversao",
    prompt: "Segundo o livro, qual é a única maneira de amenizar a ocorrência de chuva ácida?",
    options: [
      {
        id: "A",
        text: "Jogar cal nos rios e nos solos atingidos, para neutralizar a acidez depois que a chuva cai",
        correct: false,
        explanation:
          "Jogar cal é uma forma de corrigir a acidez de um solo ou de uma água já atingidos, porque a cal é alcalina. Tenta porque parece resolver o problema de forma rápida. Mas trata o efeito e não a causa, e o livro não cita essa medida: ele diz que a única maneira de amenizar a chuva ácida é reduzir a emissão dos gases.",
      },
      {
        id: "B",
        text: "Reduzir a emissão de gases poluentes, consumindo menos energia e usando fontes mais limpas",
        correct: true,
        explanation:
          "Correta. O livro afirma que a única maneira de amenizar a chuva ácida é reduzir a emissão de gases poluentes na atmosfera: para isso, devemos reduzir o consumo de energia e de combustíveis fósseis e estimular o uso de energias renováveis e de combustíveis mais limpos.",
      },
      {
        id: "C",
        text: "Proibir o uso dos CFCs nos aerossóis, como foi feito pelo Protocolo de Montreal em 1987",
        correct: false,
        explanation:
          "O Protocolo de Montreal foi o tratado de 1987 que proibiu os CFCs para proteger a camada de ozônio. Tenta porque é a medida ambiental de maior sucesso do capítulo. Mas os CFCs não causam chuva ácida; o que a causa são os óxidos de enxofre e de nitrogênio.",
      },
      {
        id: "D",
        text: "Construir aterros sanitários, que impedem que o chorume do lixo chegue até as nuvens de chuva",
        correct: false,
        explanation:
          "O aterro sanitário é um local de descarte de lixo com o solo impermeabilizado, que impede a contaminação pelo chorume e capta os gases liberados e o próprio chorume. Tenta porque é uma medida de proteção ambiental do livro. Mas resolve a poluição do solo e da água pelo lixo, não a chuva ácida.",
      },
    ],
    tips: [
      "Contra a chuva ácida: menos emissão de gases, menos combustível fóssil, mais energia limpa.",
      "Uma boa medida ambiental só serve para o problema cuja causa ela ataca.",
    ],
  },
  {
    id: "cie-t4-q08",
    topic: "chuva-acida-e-inversao",
    prompt:
      "Em um dia normal, sem inversão térmica, os poluentes de uma cidade conseguem se dispersar. O que acontece com o ar nesse dia?",
    options: [
      {
        id: "A",
        text: "O ar frio, mais leve, sobe, e o ar quente, mais pesado, desce até ficar parado perto do solo",
        correct: false,
        explanation:
          "Essa alternativa troca a densidade do ar quente e do frio. Tenta porque usa os mesmos elementos da explicação correta: ar que sobe e ar que desce. Mas o ar quente é que é menos denso e sobe; o ar frio, mais denso, desce. E num dia normal o ar não fica parado: ele circula.",
      },
      {
        id: "B",
        text: "Uma camada de ar quente fica acima do ar frio e impede que o ar perto da superfície se mova",
        correct: false,
        explanation:
          "Uma camada de ar quente por cima do ar frio, impedindo a circulação, é exatamente a situação de inversão térmica. Tenta porque é a imagem mais lembrada do assunto. Mas o enunciado fala de um dia normal, quando essa camada não existe e o ar circula livremente.",
      },
      {
        id: "C",
        text: "O Sol aquece a superfície, o ar quente sobe por ser menos denso e o ar frio de cima desce",
        correct: true,
        explanation:
          "Correta. Num dia normal, a superfície se aquece com a radiação solar; o ar quente próximo ao solo sobe, por ser menos denso, e o ar frio das camadas mais altas desce, por ser mais denso. Essa movimentação das massas de ar dispersa os poluentes.",
      },
      {
        id: "D",
        text: "Os gases de efeito estufa retêm o calor e mantêm o ar da cidade parado em torno de 15 °C",
        correct: false,
        explanation:
          "Os gases de efeito estufa retêm parte do calor do Sol e mantêm a temperatura média do planeta em torno de 15 °C. Tenta porque também envolve calor na atmosfera. Mas o efeito estufa trata da temperatura média do planeta todo e não explica a circulação do ar sobre uma cidade.",
      },
    ],
    tips: [
      "Ar quente: menos denso, sobe. Ar frio: mais denso, desce. É essa troca que espalha os poluentes.",
      "Dia normal = ar circulando. Inversão = ar parado sob uma camada quente.",
    ],
  },
  {
    id: "cie-t4-q09",
    topic: "chuva-acida-e-inversao",
    prompt:
      "Numa manhã muito fria de inverno, a fumaça das chaminés fica estagnada perto do chão da cidade. Por que isso acontece, segundo o livro?",
    options: [
      {
        id: "A",
        text: "A superfície não se aquece o bastante, e o ar frio fica preso embaixo de uma camada de ar mais quente",
        correct: true,
        explanation:
          "Correta. É a inversão térmica: no inverno ou em manhãs muito frias, a superfície não se aquece o suficiente, e o ar frio fica estagnado abaixo de uma camada de ar mais quente, que impossibilita a circulação. Os poluentes ficam retidos e prejudicam a qualidade do ar e a saúde.",
      },
      {
        id: "B",
        text: "O frio congela os poluentes no ar, e eles ficam pesados demais para serem levados pelo vento para longe da cidade",
        correct: false,
        explanation:
          "Congelar é passar do estado líquido para o sólido por causa do frio. Tenta porque o enunciado fala de uma manhã muito fria. Mas o livro não diz que os poluentes congelam: eles ficam presos porque o ar perto do solo não consegue subir, já que está sob uma camada de ar mais quente.",
      },
      {
        id: "C",
        text: "A chuva ácida dessa manhã dissolve a fumaça e a deposita no chão, sobre ruas e construções",
        correct: false,
        explanation:
          "A chuva ácida é a precipitação com pH abaixo de 5,6, formada por óxidos de enxofre e de nitrogênio que reagem com a água. Tenta porque também é um fenômeno de poluição do ar nas cidades. Mas o enunciado não fala de chuva, e sim de fumaça parada no ar, que é o que acontece na inversão térmica.",
      },
      {
        id: "D",
        text: "O buraco na camada de ozônio deixa o frio entrar e impede que a fumaça das chaminés suba",
        correct: false,
        explanation:
          "O buraco na camada de ozônio é a região onde o ozônio foi destruído pelos CFCs, deixando passar mais raios ultravioleta. Tenta porque também é um problema da atmosfera. Mas o ozônio filtra radiação, não controla a temperatura nem a circulação do ar perto do solo.",
      },
    ],
    tips: [
      "Inversão térmica: ar frio embaixo, camada de ar quente em cima, poluentes presos. Mais comum no inverno e em manhãs frias.",
      "A inversão é natural, mas vira problema nas cidades cheias de poluentes.",
    ],
  },
];
