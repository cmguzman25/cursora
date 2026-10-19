import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: O processo de industrialização (capítulo 10, pp. 104–106).
 *
 * Cubre las etapas de la historia industrial brasileña (Colonia, Imperio,
 * sustitución de importaciones), la consolidación a partir de 1930, la
 * intensificación de los años 1950, qué es un parque industrial, por qué la
 * industrialización fue tardía, el Brasil emergente, las tres causas del
 * nacimiento de la industria y sus consecuencias.
 */
export const TEMA_PROCESSO_DE_INDUSTRIALIZACAO: ExamQuestionWithTopic[] = [
  {
    id: "geo-t1-q01",
    topic: "processo-de-industrializacao",
    prompt:
      "O livro divide a história da indústria no Brasil em etapas. O que marcou o Período Colonial (1500–1822) nessa história?",
    options: [
      {
        id: "A",
        text: "Os impedimentos criados por Portugal, que dificultavam o surgimento de indústrias na colônia",
        correct: true,
        explanation:
          "Correta. Enquanto o Brasil foi colônia, Portugal criou impedimentos para que aqui surgissem indústrias: a colônia devia fornecer produtos primários e comprar manufaturados da metrópole. Por isso o livro começa a história industrial brasileira por esses impedimentos.",
      },
      {
        id: "B",
        text: "Um certo desenvolvimento industrial, ainda limitado, durante o governo dos imperadores",
        correct: false,
        explanation:
          "O Império (1822–1889) foi o período em que o Brasil, já independente, era governado por imperadores, e o livro diz que nele houve 'certo desenvolvimento' industrial. Tenta porque é a etapa que vem logo depois. Mas a pergunta é sobre o Período Colonial, que termina justamente em 1822, quando começa o Império.",
      },
      {
        id: "C",
        text: "A substituição de importações, com o país fabricando o que antes comprava de fora",
        correct: false,
        explanation:
          "A substituição de importações é a política de produzir no próprio país os produtos que antes eram importados. Tenta porque é a etapa mais famosa da industrialização brasileira. Mas ela aconteceu ao longo do século XX, principalmente a partir de 1930, e não no Período Colonial.",
      },
      {
        id: "D",
        text: "A chegada das montadoras de automóveis estrangeiras, como Volkswagen, Simca e Vemag",
        correct: false,
        explanation:
          "Volkswagen, Simca e Vemag foram empresas privadas, a maioria estrangeiras, que se instalaram no Brasil em parceria com o governo de Juscelino Kubitschek, nas décadas de 1950 e 1960. Tenta porque são exemplos concretos de indústria no livro. Mas chegaram mais de um século depois do fim da Colônia.",
      },
    ],
    tips: [
      "Decore as três etapas na ordem: Colônia (impedimentos), Império (certo desenvolvimento), século XX (substituição de importações).",
      "Quando a pergunta dá um intervalo de anos, confira se o fato da alternativa cabe dentro dele.",
    ],
  },
  {
    id: "geo-t1-q02",
    topic: "processo-de-industrializacao",
    prompt:
      "A indústria brasileira se consolidou a partir da década de 1930. Que acontecimento externo e que política ajudam a explicar esse momento?",
    options: [
      {
        id: "A",
        text: "A Segunda Guerra Mundial e a política de privatização das empresas estatais",
        correct: false,
        explanation:
          "A Segunda Guerra Mundial (1939–1945) devastou a Europa, e a privatização é a transferência de empresas do governo para a iniciativa privada. Tenta porque a guerra também aparece como causa no livro. Mas a guerra explica a intensificação da década de 1950, e a privatização é da Nova República, décadas depois; nenhuma das duas explica o começo dos anos 1930.",
      },
      {
        id: "B",
        text: "A crise da bolsa de Nova York em 1929 e a política de substituição de importações",
        correct: true,
        explanation:
          "Correta. Segundo o livro, a indústria se consolidou a partir de 1930 com a política de substituição de importações, motivada principalmente pela crise na bolsa de valores dos Estados Unidos em 1929. Com a crise, ficou difícil vender café e comprar produtos de fora, e o país passou a fabricá-los.",
      },
      {
        id: "C",
        text: "A Revolução Industrial do século XVIII e a política de incentivos fiscais aos estados",
        correct: false,
        explanation:
          "A Revolução Industrial foi o processo que começou na Europa no século XVIII e espalhou a produção em fábricas; incentivos fiscais são reduções de impostos para atrair um setor. Tenta porque as duas expressões soam como 'causas da indústria'. Mas a Revolução Industrial aconteceu quase dois séculos antes, e os incentivos fiscais são a ferramenta da Guerra Fiscal recente.",
      },
      {
        id: "D",
        text: "A criação da Zona Franca de Manaus e a política de abertura para as montadoras",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área com isenção de impostos criada em 1967 para desenvolver a economia da Amazônia. Tenta porque é uma política industrial famosa do livro. Mas foi criada quase quarenta anos depois de 1930, então não pode explicar a consolidação daquela década.",
      },
    ],
    tips: [
      "Década de 1930: crise de 1929 + substituição de importações. Década de 1950: Europa destruída pela guerra.",
      "Uma causa precisa vir antes do efeito: descarte fatos que aconteceram depois da data perguntada.",
    ],
  },
  {
    id: "geo-t1-q03",
    topic: "processo-de-industrializacao",
    prompt:
      "Na década de 1950, um comerciante brasileiro que comprava máquinas e produtos europeus passou a não encontrá-los mais. Segundo o livro, por que essa situação estimulou a indústria nacional?",
    options: [
      {
        id: "A",
        text: "Porque os Estados Unidos proibiram o Brasil de comprar mercadorias de países europeus",
        correct: false,
        explanation:
          "Os Estados Unidos aparecem no livro como a grande potência que surgiu depois da Primeira Guerra e como os principais compradores do café brasileiro. Tenta porque eles têm papel central nas crises do período. Mas o livro não fala de nenhuma proibição: a falta de produtos europeus veio da destruição da própria Europa.",
      },
      {
        id: "B",
        text: "Porque a Europa enfrentava a crise do café, deixou de pagar pelos produtos brasileiros e o Brasil ficou sem dinheiro para importar",
        correct: false,
        explanation:
          "A crise do café foi a queda do preço e das exportações do café brasileiro depois de 1929, quando os Estados Unidos reduziram as compras. Tenta porque mistura duas crises do capítulo. Mas a crise do café é dos anos 1930 e atingiu o Brasil, não a Europa; nos anos 1950 o problema europeu era a guerra.",
      },
      {
        id: "C",
        text: "Porque a Europa saiu da Segunda Guerra devastada, com fábricas destruídas, e o Brasil passou a produzir o que não conseguia importar",
        correct: true,
        explanation:
          "Correta. Depois da Segunda Guerra Mundial (1939–1945), a Europa estava devastada e com as fábricas destruídas. As importações brasileiras de produtos europeus caíram, e o Brasil se viu obrigado a criar um parque industrial para atender à demanda interna.",
      },
      {
        id: "D",
        text: "Porque o governo brasileiro privatizou as fábricas europeias instaladas no país e passou a vender os seus produtos mais baratos",
        correct: false,
        explanation:
          "Privatizar é transferir empresas do governo para a iniciativa privada, medida da Nova República, a partir dos anos 1990. Tenta porque é uma política industrial do livro. Mas não faz sentido aqui: fábricas europeias não eram do governo brasileiro, e nos anos 1950 o Estado, ao contrário, criava empresas.",
      },
    ],
    tips: [
      "Se um país não consegue mais importar um produto e há procura por ele, a saída é fabricá-lo: essa é a lógica da substituição de importações.",
      "Primeira Guerra: Estados Unidos viram potência. Segunda Guerra: Europa destruída, Brasil acelera a indústria.",
    ],
  },
  {
    id: "geo-t1-q04",
    topic: "processo-de-industrializacao",
    prompt: "O livro diz que o Brasil foi obrigado a criar um parque industrial. O que é um parque industrial?",
    options: [
      {
        id: "A",
        text: "Uma área de preservação ambiental onde é proibido instalar fábricas",
        correct: false,
        explanation:
          "Uma área de preservação ambiental é um espaço protegido por lei, como os parques nacionais e as reservas indígenas, onde a ocupação é limitada. Tenta pela palavra 'parque', que lembra parque nacional. Mas no livro 'parque industrial' tem sentido oposto: é onde as indústrias estão.",
      },
      {
        id: "B",
        text: "Uma única fábrica muito grande, que produz todas as mercadorias de um país",
        correct: false,
        explanation:
          "Uma fábrica é um estabelecimento isolado que produz um tipo de mercadoria. Tenta porque a ideia de algo grande e industrial parece servir. Mas um parque industrial não é uma fábrica: é o conjunto de indústrias de um lugar, e nenhuma fábrica sozinha produz tudo o que um país consome.",
      },
      {
        id: "C",
        text: "Uma área com isenção de impostos criada para desenvolver a economia da Amazônia",
        correct: false,
        explanation:
          "Essa é a definição da Zona Franca de Manaus, criada em 1967 no município de Manaus (AM). Tenta porque a Zona Franca reúne um polo de indústrias. Mas ela é um caso particular, com regras de impostos próprias; parque industrial é o nome geral para a área das indústrias de qualquer lugar.",
      },
      {
        id: "D",
        text: "A área onde estão localizadas as indústrias de um local ou de uma região",
        correct: true,
        explanation:
          "Correta. É a definição do AZpédia do livro: parque industrial é a área onde estão localizadas as indústrias de um local ou de uma região. Quando se diz que o Brasil criou um parque industrial, quer dizer que passou a ter um conjunto de indústrias capaz de atender à demanda interna.",
      },
    ],
    tips: [
      "Parque industrial = conjunto das indústrias de um lugar. Não confunda com parque nacional (preservação).",
      "Uma definição geral vale para qualquer lugar; um nome próprio, como Zona Franca de Manaus, é um caso específico.",
    ],
  },
  {
    id: "geo-t1-q05",
    topic: "processo-de-industrializacao",
    prompt: "Por que se diz que a industrialização brasileira foi tardia?",
    options: [
      {
        id: "A",
        text: "Porque o Brasil iniciou a industrialização na segunda metade do século XX, e a Europa já se industrializava desde o século XVIII",
        correct: true,
        explanation:
          "Correta. 'Tardia' é uma comparação no tempo: o Brasil iniciou de fato sua industrialização apenas na segunda metade do século XX, algo que já ocorria na Europa desde o século XVIII. Por isso o livro chama o processo brasileiro de tardio.",
      },
      {
        id: "B",
        text: "Porque as fábricas brasileiras levavam mais tempo do que as europeias para produzir cada mercadoria",
        correct: false,
        explanation:
          "Levar mais ou menos tempo para produzir é uma questão de produtividade, a quantidade que se fabrica em certo tempo. Tenta porque 'tardia' lembra 'lenta'. Mas no livro 'tardia' fala de quando a industrialização começou, comparada com outros países, e não da velocidade de cada fábrica.",
      },
      {
        id: "C",
        text: "Porque Portugal proibia fábricas na colônia, e as primeiras indústrias só puderam surgir no Brasil depois da independência, em 1822",
        correct: false,
        explanation:
          "A independência, em 1822, marca o fim do Período Colonial e o início do Império, quando houve 'certo desenvolvimento' industrial. Tenta porque os impedimentos portugueses realmente atrasaram a indústria. Mas o termo 'tardia' compara o Brasil com a Europa: o processo consistente só começou no século XX, bem depois de 1822.",
      },
      {
        id: "D",
        text: "Porque o Brasil ainda hoje não possui indústrias de base, como a siderúrgica e a petroquímica",
        correct: false,
        explanation:
          "Indústrias de base são as que produzem bens de produção, como mineradoras, siderúrgicas e petroquímicas. Tenta porque parece um sinal de atraso. Mas a afirmação é falsa: o Brasil tem hoje quase todos os tipos de indústria, inclusive as de base; o atraso foi de data de início, não de falta de setores.",
      },
    ],
    tips: [
      "'Tardia' compara datas: o Brasil começou quase dois séculos depois dos pioneiros europeus.",
      "Desconfie de alternativas que dizem que o Brasil 'não possui' um setor: o livro diz que o país tem quase todos os tipos de indústria.",
    ],
  },
  {
    id: "geo-t1-q06",
    topic: "processo-de-industrializacao",
    prompt:
      "Hoje o Brasil tem papel importante na produção industrial mundial, destacando-se junto com China, Índia, Rússia e África do Sul. Como o livro classifica o país?",
    options: [
      {
        id: "A",
        text: "Como país desenvolvido, por ter completado a sua industrialização ainda no século XIX",
        correct: false,
        explanation:
          "Países desenvolvidos são os de economia industrial antiga e consolidada, com alta renda e muita tecnologia, como Inglaterra e Estados Unidos. Tenta porque o Brasil é hoje bastante industrializado. Mas o livro diz que o Brasil se classifica como em desenvolvimento, e a industrialização brasileira só se firmou no século XX.",
      },
      {
        id: "B",
        text: "Como país em desenvolvimento, também chamado de país emergente",
        correct: true,
        explanation:
          "Correta. O livro afirma que, com o avanço das tecnologias de produção industrial, o Brasil assumiu papel importante no cenário mundial ao lado de China, Índia, Rússia e África do Sul, e por isso se classifica como em desenvolvimento, chamado também de país emergente.",
      },
      {
        id: "C",
        text: "Como país predominantemente agrário, sem participação relevante da indústria",
        correct: false,
        explanation:
          "Um país predominantemente agrário é aquele cuja economia depende sobretudo da agricultura e da pecuária. Tenta porque o livro usa essa expressão para o Brasil. Mas a usa para o passado: o Brasil 'passou da condição' de agrário para a de país industrializado, com produção agrícola e industrial ao mesmo tempo.",
      },
      {
        id: "D",
        text: "Como país de industrialização clássica, igual à Inglaterra e à França",
        correct: false,
        explanation:
          "Industrialização clássica é a dos países que fizeram a sua 'revolução industrial' primeiro, no século XVIII, como Inglaterra, França e Estados Unidos. Tenta porque o Brasil hoje é industrial como eles. Mas o Brasil se industrializou cerca de 200 anos depois, e é exatamente essa diferença que o torna tardio e emergente.",
      },
    ],
    tips: [
      "Emergente = em desenvolvimento. O grupo citado no livro: Brasil, China, Índia, Rússia e África do Sul.",
      "Agrário descreve o Brasil do passado; o Brasil atual tem produção agrícola e industrial ao mesmo tempo.",
    ],
  },
  {
    id: "geo-t1-q07",
    topic: "processo-de-industrializacao",
    prompt: "O livro aponta três conjuntos de causas para o nascimento da indústria. Quais são?",
    options: [
      {
        id: "A",
        text: "Padronização da produção, linha de montagem e barateamento dos custos",
        correct: false,
        explanation:
          "Padronização, linha de montagem e barateamento dos custos são o que a indústria provoca depois que existe: produtos iguais, trabalho dividido em etapas numa esteira e preço menor. Tenta porque o livro lista esses três itens logo ao lado das causas. Mas eles são as consequências da criação da indústria, não as condições para ela nascer.",
      },
      {
        id: "B",
        text: "Isenção do IPTU, isenção do ISS e doação de terrenos públicos",
        correct: false,
        explanation:
          "Isenção de IPTU e de ISS e doação de terrenos são os incentivos que municípios oferecem para atrair empresas na Guerra Fiscal. Tenta porque ajudam a instalar fábricas. Mas são ferramentas recentes de disputa entre cidades, e não as causas gerais que explicam o surgimento da indústria.",
      },
      {
        id: "C",
        text: "Acúmulo de recursos para investir, oferta de mão de obra e disponibilidade de fontes de energia",
        correct: true,
        explanation:
          "Correta. Para o nascimento da indústria, o livro identifica três conjuntos de causas: dinheiro acumulado para investir (capital), trabalhadores disponíveis (mão de obra) e fontes de energia para mover as máquinas.",
      },
      {
        id: "D",
        text: "Sindicatos de trabalhadores fortes, salários mais altos e participação dos funcionários nos lucros das empresas",
        correct: false,
        explanation:
          "Sindicatos são associações que defendem os direitos dos trabalhadores, e salários maiores e participação nos lucros são conquistas da luta sindical. Tenta porque fala de mão de obra. Mas o livro mostra o efeito contrário: essas conquistas tornam a mão de obra mais cara e menos atraente para as empresas.",
      },
    ],
    tips: [
      "Causas = o que precisa existir antes (capital, trabalhadores, energia). Consequências = o que a indústria muda depois.",
      "Uma regra prática: mão de obra disponível atrai indústria; mão de obra cara e organizada tende a afastá-la.",
    ],
  },
  {
    id: "geo-t1-q08",
    topic: "processo-de-industrializacao",
    prompt:
      "Uma fábrica de tênis passa a fazer todos os pares no mesmo modelo, com cada trabalhador cuidando de uma única etapa numa esteira, e o preço de cada par cai. Que parte do processo de industrialização esse exemplo ilustra?",
    options: [
      {
        id: "A",
        text: "As causas do nascimento da indústria, que tornam possível abrir uma fábrica",
        correct: false,
        explanation:
          "As causas do nascimento da indústria são as condições que precisam existir antes: recursos para investir, mão de obra e fontes de energia. Tenta porque o exemplo fala de trabalhadores. Mas no exemplo a fábrica já existe e o que se descreve é o que ela muda na produção, ou seja, um efeito.",
      },
      {
        id: "B",
        text: "A defasagem tecnológica, que deixa a fábrica atrás dos concorrentes",
        correct: false,
        explanation:
          "Defasagem tecnológica é o atraso em relação à tecnologia usada pelos concorrentes, que o livro liga à industrialização tardia do Brasil. Tenta porque fala de como se produz. Mas o exemplo mostra o contrário de atraso: uma forma mais organizada e barata de produzir.",
      },
      {
        id: "C",
        text: "A Guerra Fiscal, que faz a fábrica pagar menos impostos para produzir",
        correct: false,
        explanation:
          "Guerra Fiscal é a disputa entre estados e municípios que oferecem incentivos, como menos impostos, para atrair empresas. Tenta porque também deixa a produção mais barata. Mas o exemplo não fala de impostos nem de governos: o preço cai pela forma de organizar o trabalho dentro da fábrica.",
      },
      {
        id: "D",
        text: "As consequências da indústria: padronização, linha de montagem e barateamento dos custos",
        correct: true,
        explanation:
          "Correta. Todos os pares iguais é a padronização; cada trabalhador numa etapa da esteira é a linha de montagem; o preço menor é o barateamento dos custos. São as três consequências da criação da indústria apontadas no livro, que responderam à necessidade de produzir mais barato e mais rápido para muita gente nas cidades.",
      },
    ],
    tips: [
      "Mesmo modelo = padronização; esteira com etapas = linha de montagem; preço menor = barateamento.",
      "Antes de escolher, pergunte: o exemplo descreve o que é preciso para a fábrica existir, ou o que ela muda depois?",
    ],
  },
];
