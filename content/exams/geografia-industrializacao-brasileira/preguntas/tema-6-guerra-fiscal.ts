import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 6: Guerra Fiscal e nova espacialização industrial (capítulo 11,
 * pp. 122–123).
 *
 * Cubre qué es la Guerra Fiscal y por qué los gobiernos entran en ella, el ICMS,
 * el gráfico de mecanismos municipales y sectores beneficiados (IBGE 2006), el
 * tamaño de los municipios que dan incentivos, hacia dónde va la industria y el
 * mapa de la participación de la industria en el PIB por estado (2017).
 */
export const TEMA_GUERRA_FISCAL: ExamQuestionWithTopic[] = [
  {
    id: "geo-t6-q01",
    topic: "guerra-fiscal",
    prompt: "O que o livro chama de Guerra Fiscal?",
    options: [
      {
        id: "A",
        text: "Um conflito armado entre estados vizinhos pelo controle de áreas ricas em minérios",
        correct: false,
        explanation:
          "Um conflito armado é uma guerra no sentido literal, com uso de força militar. Tenta pela palavra 'guerra' no nome. Mas a Guerra Fiscal é uma disputa econômica, feita com impostos e incentivos, sem armas.",
      },
      {
        id: "B",
        text: "A disputa entre estados e municípios que oferecem incentivos para atrair investimentos privados",
        correct: true,
        explanation:
          "Correta. Para atrair investimentos e promover a criação de empresas, municípios e estados promovem políticas de incentivo. Às vezes os governos se posicionam de maneira agressiva, desafiando outros governos da mesma região. A essa disputa pelos recursos privados investidos na produção local dá-se o nome de Guerra Fiscal.",
      },
      {
        id: "C",
        text: "A disputa entre o Brasil e outros países pela cotação do dólar em relação ao real",
        correct: false,
        explanation:
          "A cotação do dólar em relação ao real é o câmbio, que favorece exportadores quando o dólar está valorizado. Tenta porque também é uma disputa econômica. Mas a Guerra Fiscal acontece dentro do Brasil, entre estados e municípios, e não entre países.",
      },
      {
        id: "D",
        text: "A cobrança de royalties feita por empresas estrangeiras pelo uso de suas tecnologias",
        correct: false,
        explanation:
          "Royalties são a taxa paga pelo uso de processos ou sistemas de propriedade de terceiros. Tenta porque também é um custo que pesa sobre a indústria brasileira. Mas royalties são pagos a empresas donas de tecnologia, e a Guerra Fiscal é uma disputa entre governos.",
      },
    ],
    tips: [
      "Guerra Fiscal = governos (estados e municípios) competindo por empresas com incentivos.",
      "'Fiscal' vem de fisco, a parte do governo que cuida dos impostos.",
    ],
  },
  {
    id: "geo-t6-q02",
    topic: "guerra-fiscal",
    prompt:
      "Por que os governos têm tanto interesse em atrair atividades produtivas, a ponto de entrar na Guerra Fiscal?",
    options: [
      {
        id: "A",
        text: "Porque toda fábrica nova paga logo no primeiro ano mais impostos do que recebeu em incentivos",
        correct: false,
        explanation:
          "Incentivos fiscais são justamente a renúncia de impostos: a empresa deixa de pagar parte deles para se instalar. Tenta porque o objetivo final envolve arrecadar mais. Mas o livro não diz que a fábrica paga mais logo de início; o ganho vem indiretamente, pelos empregos e pelo consumo.",
      },
      {
        id: "B",
        text: "Porque as fábricas diminuem a população das cidades médias e reduzem a procura por emprego",
        correct: false,
        explanation:
          "Esvaziar uma cidade seria uma perda de população, como a que o campo sofreu com a Revolução Verde. Tenta porque a pergunta fala de emprego. Mas o efeito é o inverso: a fábrica cria empregos e atrai gente, e a procura por emprego nas cidades médias continua alta.",
      },
      {
        id: "C",
        text: "Porque uma lei federal obriga cada município brasileiro a ter pelo menos uma indústria",
        correct: false,
        explanation:
          "Uma lei federal vale para todo o país e obriga todos a cumpri-la. Tenta porque daria uma explicação simples para a disputa. Mas o livro não fala de nenhuma obrigação: os governos disputam as empresas por interesse próprio, em empregos, renda e arrecadação.",
      },
      {
        id: "D",
        text: "Porque a indústria cria muitos empregos e traz renda, e o consumo maior aumenta a arrecadação de impostos",
        correct: true,
        explanation:
          "Correta. Abrir uma indústria cria muitos postos de trabalho e traz mais renda para o lugar onde a indústria e os trabalhadores vivem. Com a procura por emprego alta e pouco investimento público, a iniciativa privada parece ser o setor das novas oportunidades. Além disso, mais salários geram mais consumo, o que aumenta indiretamente a arrecadação de impostos como o ICMS.",
      },
    ],
    tips: [
      "Dois motivos da Guerra Fiscal: empregos e renda; e, por consequência, mais arrecadação.",
      "Incentivo fiscal é imposto que o governo deixa de cobrar agora, apostando no ganho indireto depois.",
    ],
  },
  {
    id: "geo-t6-q03",
    topic: "guerra-fiscal",
    prompt:
      "Que imposto, cobrado sobre todo o consumo, representa a maior fonte de arrecadação do governo estadual?",
    options: [
      {
        id: "A",
        text: "O ICMS, imposto sobre a circulação de mercadorias e alguns serviços",
        correct: true,
        explanation:
          "Correta. O ICMS (Imposto sobre Operações relativas à Circulação de Mercadorias e sobre Prestações de Serviços de Transporte Interestadual e Intermunicipal e de Comunicação) taxa todo o consumo e é a maior fonte arrecadadora do governo estadual.",
      },
      {
        id: "B",
        text: "O IPTU, imposto sobre a propriedade de prédios e terrenos urbanos",
        correct: false,
        explanation:
          "O IPTU (Imposto sobre a Propriedade Predial e Territorial Urbana) é cobrado de quem tem imóveis na cidade. Tenta porque aparece no livro como um dos impostos usados na Guerra Fiscal. Mas é um imposto municipal, cobrado pela prefeitura, e não incide sobre o consumo.",
      },
      {
        id: "C",
        text: "O ISSQN, imposto sobre os serviços prestados no município",
        correct: false,
        explanation:
          "O ISSQN (Imposto sobre Serviços de Qualquer Natureza), ou ISS, é cobrado sobre serviços prestados, como consertos e consultas. Tenta porque também aparece entre os incentivos municipais. Mas é um imposto municipal, não estadual.",
      },
      {
        id: "D",
        text: "Os royalties, taxa paga pelo uso de tecnologia de outras empresas",
        correct: false,
        explanation:
          "Royalties são a taxa paga pelo uso de processos ou sistemas de propriedade de terceiros. Tenta porque também é um pagamento obrigatório citado no capítulo. Mas royalties não são imposto: são pagos a empresas donas de tecnologia, e não ao governo estadual.",
      },
    ],
    tips: [
      "Estadual: ICMS (consumo). Municipais: IPTU (imóveis urbanos) e ISS (serviços).",
      "Para descobrir de quem é o imposto, pergunte quem cobra: prefeitura, estado ou União.",
    ],
  },
  {
    id: "geo-t6-q04",
    topic: "guerra-fiscal",
    prompt:
      "No gráfico do IBGE (2006) sobre os mecanismos de incentivo usados pelos municípios para atrair empreendimentos, qual foi o mecanismo mais utilizado?",
    options: [
      {
        id: "A",
        text: "A isenção total de IPTU, adotada por 722 municípios",
        correct: false,
        explanation:
          "Isenção total de IPTU é deixar a empresa sem pagar nada do imposto municipal sobre o imóvel. Tenta porque é o primeiro item do gráfico. Mas tem a menor barra entre os mecanismos (722), bem abaixo da cessão de terrenos.",
      },
      {
        id: "B",
        text: "A isenção do ISS, adotada por 764 municípios",
        correct: false,
        explanation:
          "Isenção do ISS é dispensar a empresa do imposto municipal sobre serviços. Tenta porque é o mecanismo de imposto mais usado no gráfico. Mas os dois mecanismos com terrenos (doação e cessão) ficam acima de 1 200 municípios, bem mais que os 764 do ISS.",
      },
      {
        id: "C",
        text: "A cessão de terrenos, adotada por 1 236 municípios",
        correct: true,
        explanation:
          "Correta. A cessão de terrenos tem a maior barra do gráfico, com 1 236 municípios, seguida de perto pela doação de terrenos (1 204). Ceder é emprestar o terreno público para a empresa usar; doar é dar a propriedade. Os mecanismos de imposto (isenções de IPTU, de taxas e de ISS) ficaram entre 722 e 764.",
      },
      {
        id: "D",
        text: "A isenção de taxas, adotada por 729 municípios",
        correct: false,
        explanation:
          "Isenção de taxas é dispensar a empresa de pagar cobranças municipais por serviços públicos, como iluminação, água e esgoto ou asfalto. Tenta porque taxas e impostos parecem a forma óbvia de incentivo. Mas no gráfico tem 729 municípios, quase metade da cessão de terrenos.",
      },
    ],
    tips: [
      "No gráfico de mecanismos, os terrenos (cessão 1 236 e doação 1 204) superam todas as isenções.",
      "Ao ler um gráfico de barras, compare os números, não a ordem em que os itens aparecem.",
    ],
  },
  {
    id: "geo-t6-q05",
    topic: "guerra-fiscal",
    prompt:
      "No mesmo gráfico do IBGE (2006), qual tipo de empreendimento foi o mais beneficiado pelos incentivos dos municípios?",
    options: [
      {
        id: "A",
        text: "Turismo, esporte e lazer, com 344 municípios",
        correct: false,
        explanation:
          "Turismo, esporte e lazer são atividades de serviço ligadas ao tempo livre das pessoas. Tenta porque muitas cidades pequenas apostam no turismo. Mas no gráfico é o tipo menos beneficiado, com apenas 344 municípios.",
      },
      {
        id: "B",
        text: "Agrário, com 381 municípios",
        correct: false,
        explanation:
          "Empreendimentos agrários são os ligados à agricultura e à pecuária. Tenta porque o livro fala muito do agronegócio. Mas no gráfico de incentivos municipais o agrário aparece com só 381 municípios, um dos menores valores.",
      },
      {
        id: "C",
        text: "Comercial e serviços, com 1 185 municípios",
        correct: false,
        explanation:
          "Empreendimentos comerciais e de serviços são lojas, escritórios e prestadores de serviço. Tenta porque o valor é alto, e o livro diz que os serviços crescem nos empregos. Mas 1 185 fica abaixo do industrial, que passa de 1 800.",
      },
      {
        id: "D",
        text: "Industrial, com 1 864 municípios",
        correct: true,
        explanation:
          "Correta. O tipo de empreendimento industrial foi o mais beneficiado, com 1 864 municípios oferecendo incentivos, à frente de comercial e serviços (1 185), agrário (381) e turismo, esporte e lazer (344). Isso confirma que a Guerra Fiscal mira principalmente as fábricas.",
      },
    ],
    tips: [
      "A Guerra Fiscal mira principalmente as fábricas: o setor industrial lidera o gráfico.",
      "Um setor que cresce na economia não é, por isso, o que mais recebe incentivos.",
    ],
  },
  {
    id: "geo-t6-q06",
    topic: "guerra-fiscal",
    prompt:
      "Em 2006, 49,5% das cidades brasileiras praticavam alguma política de incentivo às empresas. Como essa proporção muda conforme o tamanho da cidade?",
    options: [
      {
        id: "A",
        text: "É bem maior nas cidades mais populosas: chega a 85,7% nos maiores municípios, contra 42,2% nos menores",
        correct: true,
        explanation:
          "Correta. Segundo o IBGE, a diferença entre os menores municípios que praticam a política (42,2%) e os maiores (85,7%) confirma o interesse elevado quando a população da cidade é maior. Ainda assim, os municípios com incentivos estão bem distribuídos entre as regiões, com predomínio das cidades pequenas e médias do estado de São Paulo.",
      },
      {
        id: "B",
        text: "É maior nas cidades pequenas: os menores municípios chegam a 85,7%, e os maiores ficam em 42,2%",
        correct: false,
        explanation:
          "Essa alternativa inverte os dois números do livro. Tenta porque o mapa mostra muitas cidades pequenas e médias de São Paulo com incentivos. Mas em proporção é o contrário: 42,2% entre os menores municípios e 85,7% entre os maiores.",
      },
      {
        id: "C",
        text: "Fica praticamente igual: perto de 49,5% nas cidades de qualquer tamanho",
        correct: false,
        explanation:
          "Ficar igual seria todas as faixas de tamanho perto da média nacional de 49,5%. Tenta porque 49,5% é o número do Brasil todo. Mas uma média esconde diferenças: entre os menores municípios são 42,2%, e entre os maiores, 85,7%.",
      },
      {
        id: "D",
        text: "Só existe nas cidades grandes: 0% dos menores municípios praticam incentivos",
        correct: false,
        explanation:
          "Dizer que nenhuma cidade pequena pratica incentivos seria uma proporção de 0% entre as menores. Tenta porque as grandes cidades lideram. Mas 42,2% dos menores municípios também praticam a política; não é zero.",
      },
    ],
    tips: [
      "Média nacional 49,5%; menores municípios 42,2%; maiores 85,7%: o interesse é bem mais alto nas cidades mais populosas.",
      "Uma média nacional pode esconder diferenças grandes entre grupos.",
    ],
  },
  {
    id: "geo-t6-q07",
    topic: "guerra-fiscal",
    prompt:
      "Em função de diversos aspectos, em especial a Guerra Fiscal, para onde as indústrias têm se dirigido nas últimas décadas?",
    options: [
      {
        id: "A",
        text: "Para as capitais do Sudeste, especialmente as cidades de São Paulo e do Rio de Janeiro",
        correct: false,
        explanation:
          "As capitais do Sudeste, principalmente São Paulo e Rio de Janeiro, são as áreas de concentração histórica da indústria. Tenta porque continuam sendo os principais polos. Mas a tendência recente é a oposta: sair dessas áreas atrás de custos menores.",
      },
      {
        id: "B",
        text: "Para a Amazônia, atraídas pelos incentivos que só a Zona Franca de Manaus oferece",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área de isenção de impostos criada em 1967 para desenvolver a economia amazônica. Tenta porque também atrai indústrias com incentivos. Mas o livro não aponta a Amazônia como destino da nova espacialização, e o Norte segue com pouca participação industrial.",
      },
      {
        id: "C",
        text: "Para estados do Sul e do Nordeste, além de cidades médias e pequenas",
        correct: true,
        explanation:
          "Correta. Em função de diversos aspectos, em especial os efeitos da Guerra Fiscal, a espacialização da indústria tem mudado nas últimas décadas: as indústrias têm seguido a tendência de se dirigir para estados do Sul e do Nordeste, além de médias e pequenas cidades.",
      },
      {
        id: "D",
        text: "Para outros países, como a China, abandonando de vez o território brasileiro",
        correct: false,
        explanation:
          "A China aparece no livro como exemplo de país que atrai muitos investimentos pelas vantagens competitivas que oferece. Tenta porque mostra que empresas mudam de lugar atrás de vantagens. Mas a pergunta é sobre a nova espacialização dentro do Brasil, e o livro não fala em abandono do país.",
      },
    ],
    tips: [
      "Nova espacialização: Sul, Nordeste e cidades médias e pequenas.",
      "Espacialização = como algo se distribui no espaço, no território.",
    ],
  },
  {
    id: "geo-t6-q08",
    topic: "guerra-fiscal",
    prompt:
      "O mapa da participação da indústria no PIB de cada estado (2017) ilustra a desigualdade industrial no país. O que ele mostra?",
    options: [
      {
        id: "A",
        text: "Que todos os estados têm participação parecida, entre 6% e 12% da indústria nacional",
        correct: false,
        explanation:
          "Uma participação parecida em todos os estados seria uma distribuição igualitária da indústria. Tenta porque 6% e 12% são os números que aparecem no texto sobre o mapa. Mas eles marcam os extremos: só São Paulo passa de 12%, e em regiões inteiras os estados ficam abaixo de 6%.",
      },
      {
        id: "B",
        text: "Que apenas São Paulo passa de 12%, e que em regiões inteiras os estados ficam abaixo de 6%",
        correct: true,
        explanation:
          "Correta. O mapa mostra a desigualdade: apenas o estado de São Paulo tem participação acima de 12% na indústria nacional. Rio Grande do Sul, Paraná e Bahia também ocupam posição de destaque. Nos demais estados, em regiões inteiras, a participação fica abaixo de 6%.",
      },
      {
        id: "C",
        text: "Que o Amazonas tem a maior participação do país, graças à Zona Franca de Manaus",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é um polo de empresas de tecnologia e comunicação com cerca de 500 mil empregos. Tenta porque é o polo industrial mais famoso fora do Sudeste. Mas no mapa o Amazonas fica entre os estados com participação abaixo de 6%.",
      },
      {
        id: "D",
        text: "Que a Bahia lidera a participação industrial, por ser o principal polo do Nordeste",
        correct: false,
        explanation:
          "A Bahia, com o polo de Salvador, é um dos estados de destaque na indústria, citado ao lado de Rio Grande do Sul e Paraná. Tenta porque realmente aparece em destaque. Mas ter destaque não é liderar: a liderança é de São Paulo, o único acima de 12%.",
      },
    ],
    tips: [
      "Mapa de 2017: São Paulo acima de 12%; destaque para RS, PR e BA; regiões inteiras abaixo de 6%.",
      "'Destaque' e 'liderança' não são a mesma coisa: vários podem se destacar, só um lidera.",
    ],
  },
];
