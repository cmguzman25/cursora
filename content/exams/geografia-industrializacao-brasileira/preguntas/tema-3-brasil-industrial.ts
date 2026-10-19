import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 3: Características do Brasil industrial (capítulo 10, pp. 108–109).
 *
 * Cubre la República y São Paulo, la crisis de 1929 y su efecto en el café, los
 * ferrocarriles del café, el gobierno de Juscelino Kubitschek y Brasília, la
 * Zona Franca de Manaus, las regiones que siguieron aisladas, la participación
 * de la industria en el PIB entre 1947 y 1966, y la política económica de la
 * Ditadura Civil-Militar.
 */
export const TEMA_BRASIL_INDUSTRIAL: ExamQuestionWithTopic[] = [
  {
    id: "geo-t3-q01",
    topic: "brasil-industrial",
    prompt:
      "A instauração da República, em 1889, marca também a projeção de qual estado como o centro industrial do Brasil no século XX?",
    options: [
      {
        id: "A",
        text: "Rio de Janeiro, que era a capital do país e teve as primeiras ferrovias",
        correct: false,
        explanation:
          "O Rio de Janeiro foi capital do país e foi lá que as primeiras linhas de trem foram construídas; hoje é um dos principais polos industriais junto com São Paulo. Tenta por tudo isso. Mas o livro diz que foi em São Paulo que surgiram as indústrias de maior importância nacional, ligadas ao dinheiro do café.",
      },
      {
        id: "B",
        text: "São Paulo, impulsionado pelos recursos acumulados com a lavoura cafeeira",
        correct: true,
        explanation:
          "Correta. A República marca a projeção de São Paulo como incipiente centro industrial do Brasil no século XX. Com a crise da lavoura cafeeira, que culminou em 1929, existia em São Paulo um montante de recursos que não podia mais ser revertido em produção agrícola, e ele foi para a indústria.",
      },
      {
        id: "C",
        text: "Minas Gerais, que acumulou riquezas durante o ciclo econômico do ouro",
        correct: false,
        explanation:
          "O ciclo do ouro foi o período, no século XVIII, em que a mineração de ouro em Minas Gerais movimentou a economia colonial e atraiu população para o Sudeste. Tenta porque o livro cita esse ciclo ao explicar a concentração no Sudeste. Mas o centro industrial que se projetou a partir de 1889 foi São Paulo, com o dinheiro do café.",
      },
      {
        id: "D",
        text: "Amazonas, por causa dos incentivos fiscais da Zona Franca de Manaus",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área de isenção de impostos criada em 1967 para desenvolver a economia amazônica. Tenta porque é um polo industrial importante. Mas foi criada quase oitenta anos depois da República, e o Amazonas nunca foi o centro industrial do país.",
      },
    ],
    tips: [
      "Café + República + crise de 1929 = São Paulo como centro industrial.",
      "O Rio teve as primeiras ferrovias, mas as indústrias de maior importância nacional surgiram em São Paulo.",
    ],
  },
  {
    id: "geo-t3-q02",
    topic: "brasil-industrial",
    prompt:
      "Depois da Primeira Guerra Mundial, os Estados Unidos viveram um clima de euforia, e muita gente passou a investir em ações. Que situação levou à quebra da bolsa de Nova York, em 1929?",
    options: [
      {
        id: "A",
        text: "A destruição das fábricas norte-americanas durante a guerra, que deixou o país sem ter o que vender",
        correct: false,
        explanation:
          "A destruição de fábricas por uma guerra aconteceu na Europa, principalmente depois da Segunda Guerra Mundial (1939–1945). Tenta porque o livro fala de fábricas destruídas. Mas os Estados Unidos saíram da Primeira Guerra como grande potência, com indústria crescendo; o problema deles foi produzir demais, não de menos.",
      },
      {
        id: "B",
        text: "A falta de café no mercado mundial, que fez o preço subir e as empresas norte-americanas falirem",
        correct: false,
        explanation:
          "O café era o principal produto de exportação do Brasil, e os Estados Unidos eram seus maiores compradores. Tenta porque café e crise de 1929 aparecem juntos no livro. Mas a ordem é a inversa: a crise começou nos Estados Unidos e depois derrubou o preço do café brasileiro.",
      },
      {
        id: "C",
        text: "Uma lei que proibiu os norte-americanos de comprar ações de empresas de outros países",
        correct: false,
        explanation:
          "Ações são partes de uma empresa vendidas a investidores na bolsa de valores; quem compra uma ação vira sócio dela. Tenta porque a crise de 1929 é uma crise da bolsa de valores. Mas o livro não fala de nenhuma proibição: as ações perderam valor porque todos quiseram vendê-las ao mesmo tempo.",
      },
      {
        id: "D",
        text: "Com a recuperação da Europa, as exportações caíram, houve superprodução e o medo fez muitos venderem suas ações",
        correct: true,
        explanation:
          "Correta. Com a reestruturação dos países europeus, grandes compradores dos produtos norte-americanos, as exportações diminuíram e sobrou mercadoria: uma superprodução. Com medo de perder os investimentos, muitas pessoas começaram a vender ações, o que gerou uma rápida desvalorização. Em 1929 a bolsa de Nova York quebrou, afetando a economia do mundo todo.",
      },
    ],
    tips: [
      "Sequência da crise: euforia, investimento em ações, Europa compra menos, superprodução, medo, venda de ações, quebra.",
      "Superprodução é produzir mais do que o mercado consegue comprar.",
    ],
  },
  {
    id: "geo-t3-q03",
    topic: "brasil-industrial",
    prompt: "De que forma a crise de 1929 acabou ajudando a industrialização de São Paulo?",
    options: [
      {
        id: "A",
        text: "Muitos fazendeiros de café, com grandes prejuízos, passaram a investir no setor industrial",
        correct: true,
        explanation:
          "Correta. Com a crise, os Estados Unidos compraram menos café, as exportações caíram e o preço despencou. Os produtores tiveram grandes prejuízos, mesmo com o governo comprando parte da produção. Muitos fazendeiros passaram então a investir na indústria, principalmente em São Paulo, o que impulsionou a industrialização do país.",
      },
      {
        id: "B",
        text: "Os Estados Unidos passaram a comprar mais café brasileiro, e o lucro foi usado nas fábricas",
        correct: false,
        explanation:
          "Os Estados Unidos eram os principais compradores do café brasileiro. Tenta porque a ideia de lucro do café financiando fábricas é verdadeira para o período anterior. Mas depois de 1929 aconteceu o contrário: as compras caíram, o café estagnou e o preço despencou.",
      },
      {
        id: "C",
        text: "O governo deixou de comprar café e usou esse dinheiro para construir fábricas estatais",
        correct: false,
        explanation:
          "Empresas estatais são empresas cujo dono é o governo, que se multiplicaram mais tarde, a partir dos anos 1950. Tenta porque fala da ação do governo na crise. Mas o livro diz o contrário: o governo comprou parte da produção para evitar a quebra econômica, e quem migrou para a indústria foram os fazendeiros.",
      },
      {
        id: "D",
        text: "Imigrantes europeus que fugiam da crise chegaram trazendo fábricas inteiras para o Brasil",
        correct: false,
        explanation:
          "Os imigrantes europeus chegaram ao interior paulista pelos trens, inicialmente em busca de trabalho na lavoura de café. Tenta porque eles fazem parte da história de São Paulo. Mas não trouxeram fábricas: o livro liga o impulso industrial ao dinheiro dos cafeicultores que mudaram de setor.",
      },
    ],
    tips: [
      "Crise de 1929 no Brasil: menos compras dos Estados Unidos, café sem preço, capital do café migra para a indústria.",
      "Uma crise num setor pode empurrar o dinheiro para outro: é isso que o livro mostra com o café e a indústria.",
    ],
  },
  {
    id: "geo-t3-q04",
    topic: "brasil-industrial",
    prompt:
      "A Estrada de Ferro Sorocabana e a Companhia Mogiana de Estradas de Ferro foram muito importantes em São Paulo. Qual era a principal função delas?",
    options: [
      {
        id: "A",
        text: "Levar os trabalhadores e os materiais para a construção da nova capital no Planalto Central",
        correct: false,
        explanation:
          "A nova capital, Brasília, foi construída no Planalto Central e inaugurada em 1960, no governo de Juscelino Kubitschek, acompanhada de novas rodovias. Tenta porque também é um grande projeto de transporte do capítulo. Mas as ferrovias paulistas são de décadas antes e foram feitas para o café.",
      },
      {
        id: "B",
        text: "Transportar o minério de ferro de Minas Gerais até as siderúrgicas instaladas no litoral",
        correct: false,
        explanation:
          "Siderúrgicas são indústrias de base que transformam minério de ferro em aço. Tenta pela palavra 'ferro' no nome das companhias. Mas 'estrada de ferro' é apenas o nome antigo de ferrovia; essas linhas paulistas carregavam café, não minério.",
      },
      {
        id: "C",
        text: "Escoar a produção de café do interior paulista até o porto de Santos",
        correct: true,
        explanation:
          "Correta. As duas ferrovias foram responsáveis pelo escoamento da produção de café até o porto de Santos. Os trens também levaram para o interior os imigrantes, que chegavam em busca de trabalho na lavoura, e trouxeram equipamentos e produtos de consumo importados.",
      },
      {
        id: "D",
        text: "Ligar a cidade de Manaus às áreas manufatureiras do Sudeste para vender seus produtos",
        correct: false,
        explanation:
          "Manaus abriga a Zona Franca, criada em 1967, cujo polo reúne empresas de tecnologia e comunicação. Tenta porque fala de integrar regiões à indústria. Mas o livro diz que a Amazônia continuava isolada das áreas do Sudeste, e as ferrovias citadas são paulistas e do tempo do café.",
      },
    ],
    tips: [
      "Ferrovias paulistas = café até o porto de Santos; na volta, imigrantes e produtos importados.",
      "'Estrada de ferro' é o nome antigo de ferrovia: não indica o que o trem carregava.",
    ],
  },
  {
    id: "geo-t3-q05",
    topic: "brasil-industrial",
    prompt:
      "Entre as décadas de 1950 e 1970, o governo transferiu a capital federal para o Planalto Central, com a criação de Brasília (1960). Qual era um dos objetivos desse empreendimento?",
    options: [
      {
        id: "A",
        text: "Mudar o eixo do desenvolvimento, deixando de concentrá-lo no litoral e no Sudeste",
        correct: true,
        explanation:
          "Correta. Um dos objetivos da construção de Brasília, no governo de Juscelino Kubitschek (1902–1976), era mudar o eixo de desenvolvimento do Brasil, que se concentrava no litoral e especialmente no Sudeste, para chegar até as outras regiões do território.",
      },
      {
        id: "B",
        text: "Aproximar a capital do porto de Santos para facilitar a exportação do café paulista",
        correct: false,
        explanation:
          "O porto de Santos, no litoral paulista, era o destino do café levado pelas ferrovias. Tenta porque liga governo, transporte e exportação. Mas Brasília fica no Planalto Central, no interior do país, muito mais longe do porto de Santos do que o Rio de Janeiro.",
      },
      {
        id: "C",
        text: "Concentrar ainda mais as indústrias no Sudeste, perto do novo centro político",
        correct: false,
        explanation:
          "Concentração industrial é o acúmulo de indústrias numa mesma região, como aconteceu historicamente no Sudeste. Tenta porque o Sudeste continuou concentrando as fábricas. Mas Brasília fica no Centro-Oeste, e a ideia era justamente levar o desenvolvimento para fora do Sudeste.",
      },
      {
        id: "D",
        text: "Proteger a floresta amazônica, impedindo a instalação de indústrias no Norte",
        correct: false,
        explanation:
          "A proteção ambiental por meio de reservas e parques limita a ocupação de certas áreas. Tenta porque a Amazônia aparece no mesmo trecho do livro. Mas a política da época ia no sentido oposto: a Zona Franca de Manaus, de 1967, foi criada para levar indústrias à Amazônia.",
      },
    ],
    tips: [
      "Brasília = interiorizar o desenvolvimento, tirando o foco do litoral e do Sudeste.",
      "Localize no mapa: Planalto Central é o interior do país, no Centro-Oeste.",
    ],
  },
  {
    id: "geo-t3-q06",
    topic: "brasil-industrial",
    prompt: "A Zona Franca de Manaus (ZFM), criada em 1967, é uma marca da concepção de desenvolvimento nacional. O que ela é?",
    options: [
      {
        id: "A",
        text: "Uma área de preservação ambiental onde a instalação de indústrias é proibida, criada para proteger a floresta",
        correct: false,
        explanation:
          "Áreas de preservação, como reservas e parques nacionais, são espaços protegidos por lei, onde a ocupação e a produção são limitadas. Tenta porque fica na Amazônia, onde há muitas áreas protegidas. Mas a ZFM foi criada para o oposto: atrair empresas e desenvolver a economia da região.",
      },
      {
        id: "B",
        text: "Uma grande rodovia que leva a produção da Amazônia até o Sudeste",
        correct: false,
        explanation:
          "As rodovias abertas no governo de Juscelino Kubitschek ligavam Brasília a outras regiões do país. Tenta porque o livro fala de integrar as regiões ao desenvolvimento. Mas a ZFM não é uma estrada: é uma área com regras de impostos próprias no município de Manaus.",
      },
      {
        id: "C",
        text: "Um centro de pesquisa ligado às universidades, que registra patentes",
        correct: false,
        explanation:
          "Centros de pesquisa ligados às universidades fazem parte dos tecnopolos, e as universidades públicas lideram os pedidos de patente no país. Tenta porque a ZFM reúne empresas de tecnologia. Mas ela é definida pelos incentivos fiscais, não pela pesquisa.",
      },
      {
        id: "D",
        text: "Uma área de isenção de impostos e incentivos fiscais em Manaus, criada para desenvolver a economia amazônica",
        correct: true,
        explanation:
          "Correta. A ZFM é uma área de isenção de impostos e incentivos fiscais localizada no município de Manaus (AM), criada com o objetivo de desenvolver a economia amazônica. Hoje o polo reúne empresas de tecnologia e comunicação que empregam cerca de 500 000 pessoas.",
      },
    ],
    tips: [
      "Zona franca = área com isenção de impostos para atrair empresas.",
      "ZFM: 1967, Manaus (AM), desenvolver a Amazônia, cerca de 500 mil empregos.",
    ],
  },
  {
    id: "geo-t3-q07",
    topic: "brasil-industrial",
    prompt:
      "Na tabela do IPEA, a participação da produção industrial no PIB brasileiro passa de 17,8% em 1947 para 29,2% em 1966. O que esses números mostram?",
    options: [
      {
        id: "A",
        text: "Que a indústria perdeu importância na economia, enquanto a agricultura crescia",
        correct: false,
        explanation:
          "A perda de importância da indústria no PIB, a chamada queda da participação industrial, aparece no livro, mas no gráfico de 1996 a 2014. Tenta porque é o outro gráfico de participação do capítulo. Mas na tabela de 1947 a 1966 os números sobem quase todo ano, de 17,8% para 29,2%, ou seja, a indústria ganhou peso.",
      },
      {
        id: "B",
        text: "Que a indústria passou a representar quase um terço de toda a produção nacional",
        correct: true,
        explanation:
          "Correta. PIB (Produto Interno Bruto) é a soma de tudo o que um país produz. Em 1966, a indústria chegou a 29,2% do PIB, quase um terço. Em números absolutos, a produção industrial cresceu mais de quatro vezes no período, enquanto o PIB cresceu menos de três vezes.",
      },
      {
        id: "C",
        text: "Que a indústria já produzia mais da metade de toda a riqueza do país em 1966",
        correct: false,
        explanation:
          "Mais da metade seria uma participação acima de 50% do PIB. Tenta porque a indústria cresceu muito no período. Mas 29,2% é menos de um terço; para ser mais da metade, a participação teria que quase dobrar.",
      },
      {
        id: "D",
        text: "Que o PIB brasileiro diminuiu no período, enquanto só a produção industrial crescia",
        correct: false,
        explanation:
          "A participação de um setor no PIB é uma porcentagem: ela sobe quando o setor cresce mais rápido que o total. Tenta porque, se a fatia da indústria aumentou, parece que o resto encolheu. Mas o gráfico mostra o PIB crescendo também, só que menos que a indústria.",
      },
    ],
    tips: [
      "29,2% é quase um terço (33%). Para 'mais da metade' seria preciso passar de 50%.",
      "Participação sobe quando o setor cresce mais rápido que o total, mesmo que o total também cresça.",
    ],
  },
  {
    id: "geo-t3-q08",
    topic: "brasil-industrial",
    prompt:
      "Mesmo com a nova capital, o livro diz que algumas regiões continuaram relativamente isoladas das áreas manufatureiras do Sudeste. Quais?",
    options: [
      {
        id: "A",
        text: "O interior paulista e o Vale do Paraíba, ao longo da rodovia Presidente Dutra",
        correct: false,
        explanation:
          "O interior paulista e o Vale do Paraíba, ao longo da rodovia Presidente Dutra, são as áreas para onde muitas empresas do Sudeste se mudaram atrás de custos menores. Tenta porque ficam fora da capital paulista. Mas estão dentro do próprio Sudeste e muito ligadas às suas fábricas.",
      },
      {
        id: "B",
        text: "As cidades do Rio de Janeiro e de São Paulo, principais polos do país",
        correct: false,
        explanation:
          "Rio de Janeiro e São Paulo são os principais polos industriais do país, com o maior número de indústrias. Tenta porque são citadas o tempo todo no capítulo. Mas elas são o próprio centro das áreas manufatureiras do Sudeste, e não regiões isoladas delas.",
      },
      {
        id: "C",
        text: "A região amazônica e o sertão nordestino",
        correct: true,
        explanation:
          "Correta. Mesmo com o deslocamento do centro de decisões políticas e a criação de uma região povoada no Centro-Oeste, regiões como a amazônica e o sertão nordestino continuavam relativamente isoladas das áreas manufatureiras do Sudeste. O próprio Centro-Oeste ainda tinha dificuldades para fazer circular pessoas e cargas.",
      },
      {
        id: "D",
        text: "Curitiba, Porto Alegre e o norte de Santa Catarina, no Sul",
        correct: false,
        explanation:
          "Curitiba, Porto Alegre e o norte de Santa Catarina são polos industriais secundários do Sul do país. Tenta porque estão fora do Sudeste. Mas o livro os apresenta como polos industriais, não como áreas isoladas da indústria.",
      },
    ],
    tips: [
      "Isoladas da indústria do Sudeste: Amazônia e sertão nordestino. O Centro-Oeste também tinha dificuldades de circulação.",
      "Polo secundário ainda é polo: não confunda com região isolada.",
    ],
  },
  {
    id: "geo-t3-q09",
    topic: "brasil-industrial",
    prompt: "Durante a Ditadura Civil-Militar (1964–1985), em que se baseava a política econômica, segundo o livro?",
    options: [
      {
        id: "A",
        text: "Na forte intervenção do Estado, no protecionismo fiscal e na substituição de importações",
        correct: true,
        explanation:
          "Correta. Em todos os momentos históricos citados, inclusive na Ditadura Civil-Militar (1964–1985), a política econômica se baseava na forte intervenção do Estado, no protecionismo fiscal (impostos mais baratos para os produtos nacionais) e na substituição de importações.",
      },
      {
        id: "B",
        text: "Na privatização das estatais e na concessão de estradas, aeroportos e portos",
        correct: false,
        explanation:
          "Privatização é transferir empresas do Estado para a iniciativa privada, e concessão é deixar um investidor privado operar um bem que continua sendo do Estado. Tenta porque também é uma política econômica do capítulo. Mas foi a marca da Nova República, depois de 1985, e é o contrário da forte intervenção estatal da Ditadura.",
      },
      {
        id: "C",
        text: "Na Guerra Fiscal, com estados e municípios disputando as novas empresas",
        correct: false,
        explanation:
          "A Guerra Fiscal é a disputa entre estados e municípios que oferecem incentivos para atrair empresas. Tenta porque também envolve governos e indústria. Mas é um fenômeno recente, ligado à desconcentração industrial, e não a base da política econômica da Ditadura.",
      },
      {
        id: "D",
        text: "No Marco Legal da Ciência, Tecnologia e Inovação, aprovado pelos militares",
        correct: false,
        explanation:
          "O Marco Legal da Ciência, Tecnologia e Inovação é a Lei n. 13.243, que aproxima empresas e instituições públicas de pesquisa. Tenta porque os militares também incentivaram a tecnologia. Mas a lei foi promulgada em 2016, mais de trinta anos depois do fim da Ditadura.",
      },
    ],
    tips: [
      "Protecionismo fiscal = impostos que favorecem o produto nacional em relação ao importado.",
      "Até 1985: Estado forte na economia. Nova República: privatização e concessões.",
    ],
  },
];
