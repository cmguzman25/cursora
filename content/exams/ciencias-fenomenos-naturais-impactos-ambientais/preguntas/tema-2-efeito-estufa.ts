import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: Efeito estufa e aquecimento global (capítulo 11, pp. 50–51).
 *
 * Cubre el efecto invernadero como fenómeno natural (qué gases, cómo retiene el
 * calor, los 15 °C), su intensificación por la actividad humana (gases, quema de
 * combustibles fósiles, deforestación y océanos), la diferencia con el
 * calentamiento global, cada una de sus consecuencias y las medidas para
 * reducirlo, incluido el recuadro "Saiba Mais" de Kyoto y París.
 */
export const TEMA_EFEITO_ESTUFA: ExamQuestionWithTopic[] = [
  {
    id: "cie-t2-q01",
    topic: "efeito-estufa",
    prompt: "O que o livro diz sobre o efeito estufa em condições naturais, sem a interferência humana?",
    options: [
      {
        id: "A",
        text: "É um problema criado pelas fábricas no século passado e que precisa ser eliminado por completo do planeta",
        correct: false,
        explanation:
          "Essa alternativa trata o efeito estufa como se ele fosse a mesma coisa que a poluição causada pela indústria. Parece certa porque, no dia a dia, o efeito estufa costuma aparecer como vilão. Mas o livro diz que ele é um fenômeno natural e necessário; o problema é a sua intensificação pelas atividades humanas, e não a sua existência.",
      },
      {
        id: "B",
        text: "É um fenômeno natural que retém parte do calor do Sol e mantém a temperatura média do planeta em torno de 15 °C",
        correct: true,
        explanation:
          "Correta. Segundo o livro, o efeito estufa é natural: alguns gases da atmosfera aprisionam parte do calor e, assim, possibilitam a manutenção da vida na Terra, mantendo a temperatura média do planeta em torno de 15 °C.",
      },
      {
        id: "C",
        text: "É o buraco que se abre na atmosfera e deixa passar os raios ultravioleta que causam câncer de pele",
        correct: false,
        explanation:
          "O buraco na camada de ozônio é a região onde o gás ozônio foi destruído pelos CFCs e que deixa passar mais radiação ultravioleta. Parece certa porque os dois assuntos falam de gases da atmosfera e vêm um depois do outro no livro. Mas são fenômenos diferentes: o efeito estufa retém calor, e a camada de ozônio filtra os raios UV.",
      },
      {
        id: "D",
        text: "É a camada de ar quente que fica presa sobre as cidades no inverno e impede a dispersão dos poluentes",
        correct: false,
        explanation:
          "Isso descreve a inversão térmica, em que uma camada de ar quente fica por cima do ar frio e prende os poluentes perto da superfície. Parece certa porque também fala de calor preso na atmosfera. Mas a inversão térmica é um fenômeno local e passageiro, enquanto o efeito estufa envolve o planeta todo e mantém a sua temperatura média.",
      },
    ],
    tips: [
      "Efeito estufa natural = bom e necessário (15 °C). O problema é a intensificação.",
      "Efeito estufa retém calor; camada de ozônio filtra UV; inversão térmica prende poluentes. Não misture.",
    ],
  },
  {
    id: "cie-t2-q02",
    topic: "efeito-estufa",
    prompt:
      "Quais gases o livro cita como responsáveis pelo efeito estufa natural, aquele que existe mesmo sem a ação humana?",
    options: [
      {
        id: "A",
        text: "O ozônio (O3), o oxigênio (O2) e o nitrogênio (N2), os gases mais abundantes da atmosfera",
        correct: false,
        explanation:
          "O oxigênio e o nitrogênio são os gases mais abundantes do ar, e o ozônio forma a camada que filtra os raios ultravioleta. Parece certa porque são gases famosos da atmosfera. Mas não são os que o livro cita no efeito estufa: o ozônio aparece na camada de ozônio, e o oxigênio e o nitrogênio nem são mencionados como gases de efeito estufa.",
      },
      {
        id: "B",
        text: "Os clorofluorcarbonetos (CFCs) e o óxido nitroso (N2O), lançados por aerossóis e indústrias",
        correct: false,
        explanation:
          "Os CFCs são gases de cloro, flúor e carbono usados em aerossóis e geladeiras, e o óxido nitroso é outro gás emitido por atividades humanas. Parece certa porque o livro realmente os liga ao efeito estufa. Mas eles aparecem na intensificação causada pelos seres humanos, não no efeito estufa natural.",
      },
      {
        id: "C",
        text: "Os óxidos de enxofre e de nitrogênio, que se misturam à água da chuva e a tornam mais ácida",
        correct: false,
        explanation:
          "Os óxidos de enxofre e de nitrogênio são liberados pela queima de combustíveis fósseis e, ao reagir com a água, formam a chuva ácida. Parece certa porque também são gases poluentes da atmosfera. Mas pertencem ao assunto da chuva ácida, e não estão entre os gases do efeito estufa natural.",
      },
      {
        id: "D",
        text: "O gás carbônico (CO2), o metano (CH4) e o vapor d'água (H2O), que funcionam como um bloqueio",
        correct: true,
        explanation:
          "Correta. O livro cita o gás carbônico, o metano e o vapor d'água como os gases que, naturalmente, funcionam como um bloqueio, impedindo que toda a energia absorvida pela superfície durante o dia seja dissipada no espaço.",
      },
    ],
    tips: [
      "Natural: CO2, CH4 e H2O. A ação humana acrescenta N2O e CFCs e aumenta o CO2 e o CH4.",
      "Óxidos de enxofre e de nitrogênio são os gases da chuva ácida.",
    ],
  },
  {
    id: "cie-t2-q03",
    topic: "efeito-estufa",
    prompt:
      "O desmatamento e a poluição dos oceanos contribuem para o aquecimento global mesmo quando não há nenhuma queima. Por quê?",
    options: [
      {
        id: "A",
        text: "Porque plantas e algas absorvem gás carbônico na fotossíntese, e com menos delas sobra mais CO2 no ar",
        correct: true,
        explanation:
          "Correta. O livro explica que o desmatamento e a poluição dos oceanos reduzem a captura de gás carbônico, já que plantas e algas absorvem CO2 durante a fotossíntese. Com menos plantas e algas, menos CO2 é retirado da atmosfera.",
      },
      {
        id: "B",
        text: "Porque as árvores derrubadas e as águas poluídas passam a soltar ozônio, que esquenta a superfície",
        correct: false,
        explanation:
          "O ozônio é o gás que forma a camada que filtra a radiação ultravioleta do Sol. Parece certa porque é um gás da atmosfera que o capítulo estuda logo depois. Mas o livro não diz que árvores ou oceanos soltem ozônio; o que eles fazem é absorver gás carbônico, e o problema é deixarem de absorvê-lo.",
      },
      {
        id: "C",
        text: "Porque a falta de árvores deixa o solo exposto ao vento, e a poeira levantada esquenta o planeta",
        correct: false,
        explanation:
          "O solo exposto pelo desmatamento sofre erosão, que é o desgaste e o transporte do solo pela chuva e pelo vento. Parece certa porque é outro efeito real do desmatamento. Mas a erosão é um problema do solo; para o aquecimento global, o livro aponta a redução da captura de gás carbônico.",
      },
      {
        id: "D",
        text: "Porque os oceanos poluídos ficam mais escuros e passam a refletir mais luz do Sol para a atmosfera",
        correct: false,
        explanation:
          "Refletir luz é devolver ao espaço parte da radiação que chega; no livro, quem faz isso são as calotas polares. Parece certa porque a reflexão aparece no assunto do aquecimento. Mas superfícies escuras refletem menos, e não mais; e o livro liga os oceanos ao aquecimento pela captura de CO2 feita pelas algas.",
      },
    ],
    tips: [
      "Fotossíntese retira CO2 do ar: menos plantas e algas, mais CO2 na atmosfera.",
      "Existem duas formas de aumentar o CO2: soltando mais (queima) ou retirando menos (desmatamento).",
    ],
  },
  {
    id: "cie-t2-q04",
    topic: "efeito-estufa",
    prompt: "Qual é a diferença entre o efeito estufa e o aquecimento global, segundo o livro?",
    options: [
      {
        id: "A",
        text: "Não há diferença: são dois nomes para o mesmo fenômeno causado pelas fábricas e pelos automóveis",
        correct: false,
        explanation:
          "Essa alternativa trata os dois termos como sinônimos. Parece certa porque eles aparecem juntos no título da seção e se misturam no noticiário. Mas o livro separa os dois: o efeito estufa existe naturalmente e mantém a vida, e o aquecimento global é o aumento anormal da temperatura causado pela intensificação desse efeito.",
      },
      {
        id: "B",
        text: "O efeito estufa acontece só nas cidades poluídas, e o aquecimento global, nas regiões polares",
        correct: false,
        explanation:
          "Essa alternativa separa os dois fenômenos por lugar. Parece certa porque a poluição se concentra nas cidades e o derretimento acontece nos polos. Mas os dois são fenômenos do planeta inteiro; a diferença entre eles não é de lugar, e sim de ser natural (efeito estufa) ou de ser um aumento anormal (aquecimento global).",
      },
      {
        id: "C",
        text: "O efeito estufa é natural; o aquecimento global é o aumento anormal das temperaturas médias do planeta",
        correct: true,
        explanation:
          "Correta. O efeito estufa é um fenômeno natural que mantém a Terra em torno de 15 °C. O aquecimento global é o aumento anormal das temperaturas médias do planeta, provocado pela intensificação do efeito estufa pelas atividades humanas.",
      },
      {
        id: "D",
        text: "O aquecimento global é natural e necessário à vida; o efeito estufa é a poluição causada pelos seres humanos",
        correct: false,
        explanation:
          "Essa alternativa inverte os dois conceitos. Parece certa porque usa as palavras certas, natural e anormal, só que trocadas. Mas o natural e necessário é o efeito estufa; o aquecimento global é a consequência indesejada da sua intensificação.",
      },
    ],
    tips: [
      "Efeito estufa = causa natural. Aquecimento global = aumento anormal da temperatura média.",
      "Desconfie de alternativas que usam as palavras certas trocadas de lugar.",
    ],
  },
  {
    id: "cie-t2-q05",
    topic: "efeito-estufa",
    prompt:
      "O derretimento das calotas polares é uma das consequências do aquecimento global. Que efeitos o livro associa a esse derretimento?",
    options: [
      {
        id: "A",
        text: "A diminuição da acidez dos oceanos e o crescimento dos recifes e dos corais em todo o planeta",
        correct: false,
        explanation:
          "Os recifes de coral são estruturas marinhas formadas por pequenos animais, os corais, que são sensíveis à química da água. Parece certa porque os oceanos e os corais também aparecem nas consequências do aquecimento. Mas o livro diz o contrário: a acidez dos oceanos aumenta e os recifes diminuem, e isso não é atribuído ao derretimento das calotas.",
      },
      {
        id: "B",
        text: "A redução da radiação refletida de volta à atmosfera e o aumento do nível dos oceanos",
        correct: true,
        explanation:
          "Correta. O gelo das calotas reflete parte da radiação do Sol; quando derrete, menos radiação é refletida de volta, o que esquenta ainda mais o planeta. Além disso, a água do gelo derretido aumenta o nível dos oceanos.",
      },
      {
        id: "C",
        text: "O aumento da camada de ozônio sobre a Antártida e a diminuição dos raios ultravioleta",
        correct: false,
        explanation:
          "O buraco na camada de ozônio fica sobre a Antártida, e a camada é o que filtra os raios ultravioleta. Parece certa porque a Antártida tem gelo e aparece no mesmo capítulo. Mas a camada de ozônio é destruída pelos CFCs e não depende do derretimento do gelo; o livro não liga uma coisa à outra.",
      },
      {
        id: "D",
        text: "O resfriamento das regiões próximas aos polos e o aumento do gelo nas montanhas mais altas",
        correct: false,
        explanation:
          "Resfriar é baixar a temperatura, o oposto do que o aquecimento global provoca. Parece certa porque água de gelo derretido parece algo frio. Mas o derretimento faz o planeta refletir menos radiação e esquentar mais, e a água vai para os oceanos, aumentando o seu nível.",
      },
    ],
    tips: [
      "Gelo reflete radiação. Menos gelo, menos reflexão, mais calor: o aquecimento se alimenta sozinho.",
      "Derretimento das calotas: menos radiação refletida e mais água nos oceanos.",
    ],
  },
  {
    id: "cie-t2-q06",
    topic: "efeito-estufa",
    prompt:
      "Mergulhadores percebem que os recifes e os corais de uma região estão diminuindo. Qual consequência do aquecimento global, citada pelo livro, explica isso?",
    options: [
      {
        id: "A",
        text: "A alteração do ciclo da água, que faz algumas áreas terem longos períodos de seca",
        correct: false,
        explanation:
          "A alteração do ciclo da água é a mudança na forma como a água evapora e cai como chuva, fazendo algumas áreas terem secas longas e outras receberem chuva demais. Parece certa porque também é consequência do aquecimento. Mas a seca atinge a terra firme; não explica a perda de recifes que estão debaixo d'água.",
      },
      {
        id: "B",
        text: "A intensificação dos eventos climáticos, como tornados, furacões e grandes tempestades",
        correct: false,
        explanation:
          "Eventos climáticos extremos são fenômenos como furacões, tornados, tempestades e queimadas, que o aquecimento torna mais frequentes. Parece certa porque furacões passam pelo mar. Mas o livro liga a redução dos recifes e dos corais a outra consequência: o aumento da acidez dos oceanos.",
      },
      {
        id: "C",
        text: "A migração de espécies que causam doenças para as áreas urbanas, onde vivem mais pessoas",
        correct: false,
        explanation:
          "A migração de espécies que causam doenças para as cidades é a consequência do aquecimento que agrava os problemas de saúde humana. Parece certa porque fala de espécies se deslocando por causa do calor. Mas os corais vivem presos ao fundo do mar e não migram; o que os afeta, segundo o livro, é a acidez da água.",
      },
      {
        id: "D",
        text: "O aumento da acidez dos oceanos, que o livro cita junto com a redução dos recifes e dos corais",
        correct: true,
        explanation:
          "Correta. Entre as consequências do aquecimento global, o livro cita o aumento da acidez dos oceanos e a redução dos recifes e corais, os dois na mesma frase. Os corais são sensíveis à química da água.",
      },
    ],
    tips: [
      "Oceanos mais ácidos, menos recifes e corais: as duas coisas vêm juntas no livro.",
      "Para cada consequência, pergunte onde ela acontece: no mar, na terra, na cidade?",
    ],
  },
  {
    id: "cie-t2-q07",
    topic: "efeito-estufa",
    prompt:
      "Por que o aquecimento global pode levar à extinção de algumas espécies, segundo o livro?",
    options: [
      {
        id: "A",
        text: "Porque algumas espécies não conseguem migrar para áreas com temperaturas mais amenas",
        correct: true,
        explanation:
          "Correta. O livro diz que deve haver extinção de espécies que não conseguem migrar para áreas de temperaturas mais amenas. Quem não consegue sair de um lugar que esquentou demais não sobrevive.",
      },
      {
        id: "B",
        text: "Porque o aumento da radiação ultravioleta mata os animais que vivem mais perto da superfície",
        correct: false,
        explanation:
          "O aumento da radiação ultravioleta é o efeito da destruição da camada de ozônio, que pode causar câncer de pele e problemas de visão. Parece certa porque é outro perigo vindo do céu. Mas pertence ao assunto do ozônio; no aquecimento global, a extinção vem da dificuldade de migrar para lugares mais frescos.",
      },
      {
        id: "C",
        text: "Porque as espécies exóticas trazidas de outros países ocupam o lugar das espécies nativas",
        correct: false,
        explanation:
          "Espécie exótica é a que está fora da sua área de distribuição natural; o livro diz que ela pode alterar o funcionamento dos ecossistemas nativos e causar desequilíbrio. Parece certa porque também leva espécies a desaparecer. Mas é outro problema ambiental, ligado à introdução de espécies, e não ao aumento da temperatura.",
      },
      {
        id: "D",
        text: "Porque o frio intenso causado pelo derretimento do gelo congela os ambientes onde elas vivem",
        correct: false,
        explanation:
          "Essa alternativa imagina que o gelo derretido esfriaria o planeta. Parece certa porque gelo lembra frio. Mas o livro diz que o derretimento das calotas faz o planeta refletir menos radiação e esquentar mais; o risco para as espécies é o calor, não o frio.",
      },
    ],
    tips: [
      "Extinção por aquecimento: a espécie não consegue ir para onde está mais fresco.",
      "Raios UV = ozônio; espécies exóticas = introdução de espécies. São outras causas de dano.",
    ],
  },
  {
    id: "cie-t2-q08",
    topic: "efeito-estufa",
    prompt:
      "Uma família quer ajudar a reduzir o aquecimento global. Qual atitude está entre as medidas sugeridas pelo livro?",
    options: [
      {
        id: "A",
        text: "Usar mais o carro particular, porque os veículos novos já não soltam nenhum tipo de gás",
        correct: false,
        explanation:
          "Essa alternativa parte da ideia de que carro novo não polui. Parece certa porque os motores atuais poluem menos que os antigos. Mas automóveis que queimam combustível continuam soltando gás carbônico; o livro sugere o contrário: andar de bicicleta e usar o transporte público.",
      },
      {
        id: "B",
        text: "Comprar produtos que vêm de muito longe, porque eles costumam ser feitos em fábricas modernas",
        correct: false,
        explanation:
          "Produtos que vêm de longe precisam ser transportados por caminhões, navios ou aviões. Parece certa porque fábrica moderna parece sinônimo de menos poluição. Mas o transporte queima combustível e solta CO2; por isso o livro recomenda estimular o uso de produtos locais.",
      },
      {
        id: "C",
        text: "Andar de bicicleta, usar transporte público e preferir produtos locais, reduzindo o consumo",
        correct: true,
        explanation:
          "Correta. O livro cita, entre as medidas, reduzir o consumo, estimular o uso de produtos locais, andar mais de bicicleta e usar meios de transporte público. Todas diminuem a queima de combustíveis e, portanto, a emissão de CO2.",
      },
      {
        id: "D",
        text: "Trocar a energia solar da casa por uma usina a carvão, que fornece eletricidade o dia inteiro",
        correct: false,
        explanation:
          "Uma usina a carvão é uma termoelétrica: gera eletricidade queimando um combustível fóssil. Parece certa porque funciona também à noite, quando não há sol. Mas é o oposto do que o livro pede: trocar os combustíveis fósseis por energias renováveis e limpas, como a solar e a eólica.",
      },
    ],
    tips: [
      "Medidas do livro: energias renováveis (solar, eólica), menos desmatamento, menos consumo, produtos locais, bicicleta e transporte público.",
      "Toda medida contra o aquecimento reduz a emissão ou aumenta a captura de CO2.",
    ],
  },
  {
    id: "cie-t2-q09",
    topic: "efeito-estufa",
    prompt:
      "O livro diz que a queima de combustíveis fósseis libera grandes quantidades de gás carbônico. Quais são os exemplos de combustíveis fósseis que ele cita?",
    options: [
      {
        id: "A",
        text: "A energia solar e a energia eólica, usadas nas usinas que abastecem as cidades",
        correct: false,
        explanation:
          "A energia solar vem da luz do Sol, e a eólica, da força do vento. Parece certa porque também servem para produzir eletricidade. Mas são energias renováveis e limpas, que o livro recomenda justamente para substituir os combustíveis fósseis.",
      },
      {
        id: "B",
        text: "O carvão e o petróleo, que se formaram há muito tempo a partir de restos de seres vivos",
        correct: true,
        explanation:
          "Correta. O livro cita o carvão e o petróleo como combustíveis fósseis, cuja queima libera elevadas quantidades de gás carbônico. São chamados de fósseis porque se formaram ao longo de milhões de anos a partir de restos de seres vivos.",
      },
      {
        id: "C",
        text: "O vapor d'água e o metano, que existem na atmosfera mesmo sem a ação dos seres humanos",
        correct: false,
        explanation:
          "O vapor d'água e o metano são gases de efeito estufa, que existem naturalmente na atmosfera. Parece certa porque aparecem no mesmo parágrafo. Mas o livro os apresenta como gases de efeito estufa, e os exemplos de combustíveis fósseis que ele dá são o carvão e o petróleo.",
      },
      {
        id: "D",
        text: "O ozônio e os CFCs, usados como combustível nos aerossóis e nos aparelhos de refrigeração",
        correct: false,
        explanation:
          "O ozônio é o gás que filtra os raios ultravioleta, e os CFCs são gases usados em aerossóis e geladeiras, que destroem o ozônio. Parece certa porque os aerossóis e as geladeiras usam esses gases. Mas eles não são combustíveis: não são queimados para produzir energia.",
      },
    ],
    tips: [
      "Combustíveis fósseis do livro: carvão e petróleo. Queimá-los libera CO2.",
      "Um combustível é algo que se queima para gerar energia; um gás de efeito estufa é o que fica na atmosfera retendo calor.",
    ],
  },
  {
    id: "cie-t2-q10",
    topic: "efeito-estufa",
    prompt:
      "Com o aquecimento global, uma região passa a ter secas longas enquanto outra recebe chuvas muito maiores que o normal. Qual consequência citada pelo livro explica isso?",
    options: [
      {
        id: "A",
        text: "A alteração do ciclo da água, que faz algumas áreas secarem e outras receberem mais chuva",
        correct: true,
        explanation:
          "Correta. O livro cita a alteração do ciclo da água entre as consequências do aquecimento global: algumas áreas tendem a ter longos períodos de seca, e outras passam a receber maiores quantidades de chuva. Isso também afeta a produção agrícola.",
      },
      {
        id: "B",
        text: "A inversão térmica, que prende a umidade sobre algumas cidades e a tira de outras regiões",
        correct: false,
        explanation:
          "A inversão térmica é a camada de ar quente que fica sobre o ar frio e impede a dispersão dos poluentes, principalmente no inverno. Parece certa porque também mexe com a circulação do ar. Mas ela prende poluentes, não chuva, e é um fenômeno local, não uma consequência do aquecimento global.",
      },
      {
        id: "C",
        text: "A chuva ácida, que cai em excesso perto das indústrias e deixa as áreas distantes sem água",
        correct: false,
        explanation:
          "A chuva ácida é a precipitação com pH abaixo de 5,6, causada por óxidos de enxofre e de nitrogênio. Parece certa porque fala de chuva. Mas ela muda a acidez da chuva, e não a quantidade que cai em cada lugar; não explica secas e chuvas em excesso.",
      },
      {
        id: "D",
        text: "O assoreamento, que acumula sedimentos nos rios e faz a água faltar em outras regiões",
        correct: false,
        explanation:
          "Assoreamento é o acúmulo de sedimentos nos rios, lagos e mares, que obstrui os corpos d'água. Parece certa porque também tem a ver com água nos rios. Mas é uma consequência da erosão, e não do aquecimento global, e não muda o regime de chuvas.",
      },
    ],
    tips: [
      "Ciclo da água alterado: seca em um lugar, chuva demais em outro, e prejuízo para a agricultura.",
      "Para cada consequência do aquecimento, lembre-se de um exemplo: calotas, oceanos, ciclo da água, eventos extremos, extinção, saúde.",
    ],
  },
];
