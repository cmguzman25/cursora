import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 5: O contexto atual e a desconcentração industrial (capítulo 11,
 * pp. 118–121).
 *
 * Cubre la balanza comercial, el desfase tecnológico, la dependencia de
 * tecnología extranjera, la descentralización dentro del Sudeste, qué es la
 * desconcentración y qué la permitió, la mano de obra (Revolução Verde,
 * calificación, sindicatos) y por qué el mercado consumidor quedó en el litoral
 * y el Sudeste.
 */
export const TEMA_DESCONCENTRACAO_INDUSTRIAL: ExamQuestionWithTopic[] = [
  {
    id: "geo-t5-q01",
    topic: "desconcentracao-industrial",
    prompt:
      "O livro diz que a balança comercial brasileira oscila entre déficit e superávit. Quando há superávit na balança comercial?",
    options: [
      {
        id: "A",
        text: "Quando o país exporta mais do que importa",
        correct: true,
        explanation:
          "Correta. A balança comercial compara o que um país vende para fora (exportações) com o que compra de fora (importações). Há superávit quando predominam as exportações, ou seja, quando o país vende mais do que compra.",
      },
      {
        id: "B",
        text: "Quando o país importa mais do que exporta",
        correct: false,
        explanation:
          "Importar mais do que exportar é o déficit na balança comercial: o país compra de fora mais do que vende. Tenta porque é o outro lado da mesma oscilação citada no livro. Mas é o oposto do superávit.",
      },
      {
        id: "C",
        text: "Quando a indústria cresce mais rápido que o PIB",
        correct: false,
        explanation:
          "Quando a indústria cresce mais rápido que o PIB, aumenta a participação industrial no PIB, como aconteceu entre 1947 e 1966. Tenta porque também é um dado positivo da economia. Mas a balança comercial não mede a produção interna: mede as trocas com outros países.",
      },
      {
        id: "D",
        text: "Quando o governo arrecada mais impostos do que gasta",
        correct: false,
        explanation:
          "Arrecadar mais do que gasta é o superávit nas contas do governo, chamado superávit fiscal. Tenta porque usa a mesma palavra. Mas o livro fala da balança comercial, que compara exportações e importações, e não do orçamento público.",
      },
    ],
    tips: [
      "Balança comercial: exporta mais = superávit; importa mais = déficit.",
      "A mesma palavra pode ter sentidos diferentes: veja sempre do que se fala (comércio exterior ou contas do governo).",
    ],
  },
  {
    id: "geo-t5-q02",
    topic: "desconcentracao-industrial",
    prompt:
      "A industrialização brasileira foi tardia: os países pioneiros a fizeram cerca de 200 anos antes. Que consequência esse 'atraso' trouxe, segundo o livro?",
    options: [
      {
        id: "A",
        text: "O fim da produção agrícola, substituída totalmente pela indústria",
        correct: false,
        explanation:
          "O fim da produção agrícola seria a troca completa do campo pela indústria. Tenta porque o Brasil deixou de ser predominantemente agrário. Mas o livro diz que a produção agrícola e a industrial ocorreram paralelamente; a agricultura continua muito importante.",
      },
      {
        id: "B",
        text: "A Guerra Fiscal entre estados e municípios na disputa pelas fábricas",
        correct: false,
        explanation:
          "A Guerra Fiscal é a disputa entre estados e municípios, que oferecem incentivos para atrair empresas. Tenta porque também é uma característica da indústria brasileira atual. Mas ela é ligada à desconcentração recente, não ao fato de a industrialização ter começado tarde.",
      },
      {
        id: "C",
        text: "Uma defasagem tecnológica, isto é, atraso em relação à tecnologia dos concorrentes",
        correct: true,
        explanation:
          "Correta. A primeira característica apontada é ter realizado a 'revolução industrial' muito depois dos países que se industrializaram no século XVIII (Inglaterra, França, Estados Unidos). Esse atraso acarretou uma defasagem tecnológica: atraso em relação à tecnologia utilizada pelos concorrentes.",
      },
      {
        id: "D",
        text: "A Revolução Verde, que trouxe novas técnicas para o campo",
        correct: false,
        explanation:
          "A Revolução Verde foi o processo pelo qual a agricultura se modernizou com o uso de tecnologia, trazendo também controvérsias, como os organismos geneticamente modificados. Tenta porque também envolve tecnologia. Mas ela explica a saída de famílias do campo, não o atraso da indústria.",
      },
    ],
    tips: [
      "Começar tarde = ficar atrás na tecnologia: isso é a defasagem tecnológica.",
      "Pioneiros citados no livro: Inglaterra, França e Estados Unidos, no século XVIII.",
    ],
  },
  {
    id: "geo-t5-q03",
    topic: "desconcentracao-industrial",
    prompt:
      "A segunda característica da industrialização brasileira é ser dependente de tecnologias estrangeiras. O que isso significa?",
    options: [
      {
        id: "A",
        text: "Que o Brasil apenas vende produtos para outros países e não compra nada deles",
        correct: false,
        explanation:
          "Vender sem comprar seria ter só exportações, um superávit extremo na balança comercial. Tenta porque fala de comércio com outros países. Mas a dependência significa justamente o contrário: o Brasil precisa comprar tecnologia de fora.",
      },
      {
        id: "B",
        text: "Que ainda importamos máquinas e equipamentos que não sabemos fabricar ou que fabricamos a custos maiores",
        correct: true,
        explanation:
          "Correta. Ser dependente de tecnologias estrangeiras significa que o Brasil ainda importa máquinas e equipamentos que não tem condições de fabricar ou que fabrica a custos maiores do que os de outros países.",
      },
      {
        id: "C",
        text: "Que todas as fábricas instaladas no Brasil pertencem a empresas multinacionais com sede em outros países",
        correct: false,
        explanation:
          "Multinacionais são empresas com sede num país e filiais em vários outros, como as que têm sede no Itaim Bibi, em São Paulo. Tenta porque elas trazem tecnologia de fora. Mas a afirmação é exagerada: há muitas empresas nacionais, e a dependência fala de importar tecnologia, não de quem é dono das fábricas.",
      },
      {
        id: "D",
        text: "Que o Brasil paga royalties sobre todos os produtos que ele mesmo inventa e vende",
        correct: false,
        explanation:
          "Royalties são a taxa paga quando se usam processos ou sistemas de propriedade de terceiros. Tenta porque o Brasil de fato paga royalties por tecnologia estrangeira. Mas ninguém paga royalties pelo que inventou: quem paga é quem usa a invenção de outro.",
      },
    ],
    tips: [
      "Dependência tecnológica = precisar importar máquinas e equipamentos.",
      "Royalties pagam o uso da invenção de outro, nunca da própria.",
    ],
  },
  {
    id: "geo-t5-q04",
    topic: "desconcentracao-industrial",
    prompt:
      "Uma empresa instalada na capital paulista decide mudar sua fábrica para o Vale do Paraíba, perto da rodovia Presidente Dutra. Segundo o livro, o que ela busca?",
    options: [
      {
        id: "A",
        text: "Ficar mais perto do porto de Santos para exportar a produção de café",
        correct: false,
        explanation:
          "O porto de Santos foi o destino do café levado pelas ferrovias paulistas no início do século XX. Tenta porque liga São Paulo, transporte e exportação. Mas o exemplo é atual, e o livro explica essas mudanças pela busca de custos menores, não pelo café.",
      },
      {
        id: "B",
        text: "Receber os incentivos fiscais que só a Zona Franca de Manaus oferece às empresas de todo o país",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área de isenção de impostos no Amazonas. Tenta porque fala de incentivos fiscais. Mas o Vale do Paraíba fica no Sudeste, longe de Manaus, e os incentivos ali vêm da Guerra Fiscal entre os próprios municípios.",
      },
      {
        id: "C",
        text: "Contratar trabalhadores mais sindicalizados e pagar salários mais altos",
        correct: false,
        explanation:
          "Sindicatos são associações de trabalhadores que lutam por salários maiores e outros direitos. Tenta porque fala de mão de obra. Mas o livro diz que sindicatos fortes e salários altos tornam a mão de obra menos atraente; as empresas procuram o contrário.",
      },
      {
        id: "D",
        text: "Custos de produção menores, com incentivos fiscais, infraestrutura e mão de obra mais barata",
        correct: true,
        explanation:
          "Correta. É a descentralização industrial gerada pela Guerra Fiscal: no Sudeste, muitas empresas procuram custos menores no interior paulista, no Vale do Paraíba, ao longo da rodovia Presidente Dutra, ou em outros estados. Essas áreas oferecem incentivos fiscais, infraestrutura e mão de obra mais barata.",
      },
    ],
    tips: [
      "Empresa que muda de lugar costuma buscar o mesmo trio: incentivos fiscais, infraestrutura e mão de obra barata.",
      "A desconcentração também acontece dentro do próprio Sudeste, da capital para o interior.",
    ],
  },
  {
    id: "geo-t5-q05",
    topic: "desconcentracao-industrial",
    prompt: "O que caracteriza a desconcentração industrial no Brasil e quando ela se tornou mais significativa?",
    options: [
      {
        id: "A",
        text: "O retorno das indústrias às capitais do Sudeste, que voltaram a concentrar as novas fábricas, sobretudo a partir da crise de 1929",
        correct: false,
        explanation:
          "A ida das indústrias para as capitais do Sudeste, sobretudo São Paulo, é a concentração industrial, que começou com o dinheiro do café e a crise de 1929. Tenta porque 1929 é uma data-chave do capítulo anterior. Mas desconcentrar é o oposto: espalhar as indústrias para fora dessas áreas.",
      },
      {
        id: "B",
        text: "Novas indústrias nascendo em regiões menos tradicionais, em cidades médias e pequenas, sobretudo a partir dos anos 2000",
        correct: true,
        explanation:
          "Correta. Na desconcentração, as novas indústrias nascem em regiões menos tradicionais, em cidades médias e pequenas e em estados fora do Sudeste. Os fatores que concentraram a indústria no Sudeste deixaram de ser tão significativos a partir dos anos 2000, embora o processo já aparecesse antes, por esforços estatais.",
      },
      {
        id: "C",
        text: "A venda das empresas estatais à iniciativa privada, sobretudo a partir da Nova República",
        correct: false,
        explanation:
          "Vender estatais à iniciativa privada é a privatização, política mantida durante toda a Nova República. Tenta porque também é uma mudança recente na indústria. Mas privatizar muda o dono das empresas, não o lugar onde elas ficam no território.",
      },
      {
        id: "D",
        text: "A mudança de todas as indústrias para Brasília, sobretudo a partir da inauguração da capital",
        correct: false,
        explanation:
          "Brasília foi inaugurada em 1960 para mudar o eixo do desenvolvimento para o interior. Tenta porque também foi um esforço para tirar o desenvolvimento do Sudeste. Mas as indústrias não foram todas para Brasília, e a desconcentração é um espalhamento por muitas regiões e cidades.",
      },
    ],
    tips: [
      "Desconcentração = espalhar a indústria para regiões menos tradicionais e cidades médias e pequenas.",
      "Concentração e desconcentração falam de onde as fábricas ficam; privatização fala de quem é o dono.",
    ],
  },
  {
    id: "geo-t5-q06",
    topic: "desconcentracao-industrial",
    prompt:
      "Segundo o livro, que avanços permitiram que fábricas fossem construídas em locais onde outras vantagens se concentravam?",
    options: [
      {
        id: "A",
        text: "A padronização e a linha de montagem, que baratearam os custos de produção",
        correct: false,
        explanation:
          "Padronização e linha de montagem são consequências da criação da indústria: produtos iguais, feitos em etapas, a custos menores. Tenta porque também são avanços da produção. Mas mudam como se produz dentro da fábrica, não onde ela pode ser instalada.",
      },
      {
        id: "B",
        text: "O fim dos impedimentos de Portugal, que proibiam fábricas no interior da colônia",
        correct: false,
        explanation:
          "Os impedimentos de Portugal dificultavam o surgimento de indústrias durante o Período Colonial, até 1822. Tenta porque fala de onde a indústria podia ou não existir. Mas é um fato de dois séculos atrás e não explica a desconcentração recente.",
      },
      {
        id: "C",
        text: "As ferrovias do café, como a Sorocabana e a Companhia Mogiana de Estradas de Ferro, que cruzavam o interior",
        correct: false,
        explanation:
          "A Sorocabana e a Mogiana foram ferrovias paulistas que escoavam o café até o porto de Santos. Tenta porque transporte é parte da resposta. Mas são do início do século XX e ajudaram a concentrar a indústria em São Paulo, e não a espalhá-la.",
      },
      {
        id: "D",
        text: "As modernas tecnologias de informação, como a internet, e o desenvolvimento das redes de transporte",
        correct: true,
        explanation:
          "Correta. A revolução provocada pelas modernas tecnologias de informação (internet), junto com o desenvolvimento das redes de transporte, permitiu que as fábricas fossem construídas em locais onde outras vantagens se concentravam, como incentivos fiscais ou mão de obra mais barata.",
      },
    ],
    tips: [
      "Internet + redes de transporte = a fábrica pode ficar longe da sede e dos grandes centros.",
      "Na desconcentração, pergunte: o que permite à fábrica ficar longe? Comunicação e transporte.",
    ],
  },
  {
    id: "geo-t5-q07",
    topic: "desconcentracao-industrial",
    prompt:
      "No século XX, muitas indústrias surgiram nas capitais e grandes cidades porque havia mão de obra abundante. De onde vinha essa mão de obra, segundo o livro?",
    options: [
      {
        id: "A",
        text: "De famílias que deixaram o campo por causa da Revolução Verde e foram ocupar vagas nas fábricas",
        correct: true,
        explanation:
          "Correta. A Revolução Verde modernizou a agricultura com tecnologia, e muitas famílias deixaram o campo. As fábricas das grandes cidades passaram a ser a grande ocupação disponível para elas. Além disso, a concentração de escolas nessas cidades produziu maior qualificação da força de trabalho.",
      },
      {
        id: "B",
        text: "De sindicatos fortes, que atraíam as empresas oferecendo trabalhadores organizados e bem pagos",
        correct: false,
        explanation:
          "Sindicatos são associações que defendem os trabalhadores e lutam por melhores salários. Tenta porque organizam a mão de obra. Mas o livro diz que o crescimento dos sindicatos, a partir dos anos 1980, tornou a mão de obra das grandes cidades menos atraente para as empresas.",
      },
      {
        id: "C",
        text: "De trabalhadores trazidos pela Guerra Fiscal, que obrigava as fábricas a ficarem nas capitais",
        correct: false,
        explanation:
          "A Guerra Fiscal é a disputa entre estados e municípios por empresas, usando incentivos. Tenta porque mexe com a localização das fábricas. Mas ela não obriga ninguém a ficar nas capitais: ao contrário, leva muitas fábricas para o interior e para cidades médias.",
      },
      {
        id: "D",
        text: "De imigrantes europeus que chegaram pelas ferrovias para trabalhar diretamente nas fábricas",
        correct: false,
        explanation:
          "Os imigrantes europeus chegaram ao interior paulista pelas ferrovias do café. Tenta porque eles foram uma mão de obra importante na história de São Paulo. Mas vieram inicialmente para a lavoura, e o livro liga a mão de obra das fábricas do século XX à saída das famílias do campo.",
      },
    ],
    tips: [
      "Revolução Verde: máquinas no campo, famílias vão para a cidade, sobra mão de obra para as fábricas.",
      "Escolas concentradas nas grandes cidades = trabalhadores mais qualificados.",
    ],
  },
  {
    id: "geo-t5-q08",
    topic: "desconcentracao-industrial",
    prompt:
      "Com o tempo, dois aspectos passaram a deixar a mão de obra das grandes cidades menos atraente para as empresas. Quais?",
    options: [
      {
        id: "A",
        text: "A falta de escolas e a baixa qualificação dos trabalhadores dessas cidades",
        correct: false,
        explanation:
          "Qualificação é o processo de preparar alguém para determinado desempenho profissional. Tenta porque trabalhadores pouco qualificados de fato desanimam um investidor. Mas o livro diz o oposto sobre as grandes cidades: a concentração de escolas produziu maior qualificação ali.",
      },
      {
        id: "B",
        text: "A Revolução Verde, que esvaziou as cidades e levou as famílias para o campo",
        correct: false,
        explanation:
          "A Revolução Verde foi a modernização da agricultura com tecnologia. Tenta porque também mexeu com a mão de obra. Mas o movimento foi o contrário: as famílias deixaram o campo e foram para as cidades, aumentando a mão de obra urbana.",
      },
      {
        id: "C",
        text: "O crescimento dos sindicatos e o aumento dos salários, com conquistas como a participação nos lucros",
        correct: true,
        explanation:
          "Correta. O primeiro aspecto são os sindicatos, que cresceram fortemente com a redemocratização nos anos 1980. O segundo é o aumento salarial: os ganhos de produtividade não são compartilhados naturalmente, e conquistas como a participação nos lucros vieram da luta sindical, o que torna a mão de obra mais cara em certas localidades.",
      },
      {
        id: "D",
        text: "A proibição das associações profissionais, que deixou os trabalhadores desorganizados e sem como negociar salários",
        correct: false,
        explanation:
          "As associações e organizações profissionais foram proibidas em vários períodos da história nacional, segundo o livro. Tenta porque essa proibição é citada no trecho. Mas ela pertence ao passado; a partir dos anos 1980, com a redemocratização, aconteceu o contrário: os sindicatos cresceram.",
      },
    ],
    tips: [
      "Do ponto de vista da empresa, mão de obra organizada e bem paga é mão de obra mais cara.",
      "Redemocratização (anos 1980) = sindicatos crescem e conquistam direitos.",
    ],
  },
  {
    id: "geo-t5-q09",
    topic: "desconcentracao-industrial",
    prompt:
      "Outro fator para escolher onde produzir é o mercado consumidor. Por que, historicamente, a maior parte das iniciativas produtivas surgiu no litoral e no Sudeste?",
    options: [
      {
        id: "A",
        text: "Porque o Centro-Oeste se tornou a nova fronteira agrícola e afastou a população do interior",
        correct: false,
        explanation:
          "A nova fronteira é a região, sobretudo Mato Grosso, onde hoje avançam novos investimentos, principalmente agropecuários. Tenta porque fala de onde a economia cresce. Mas é um fenômeno recente e atrai gente para o interior; não explica a concentração histórica no litoral.",
      },
      {
        id: "B",
        text: "Porque a população se concentrou no litoral desde as capitanias e, depois, no Sudeste, com o Rio como capital e os ciclos do ouro e do café",
        correct: true,
        explanation:
          "Correta. Desde as capitanias hereditárias, a população se concentrou no litoral, com destaque para Pernambuco e São Vicente. Depois, o Rio de Janeiro como capital, somado aos ciclos do ouro e do café, concentrou a população no Sudeste. As iniciativas produtivas surgiram para atender esses centros populacionais.",
      },
      {
        id: "C",
        text: "Porque o governo de Juscelino Kubitschek levou a capital do país do interior para o litoral",
        correct: false,
        explanation:
          "O governo de Juscelino Kubitschek construiu Brasília e levou a capital para o Planalto Central em 1960. Tenta porque mudar a capital atrai população. Mas a mudança foi do litoral (Rio de Janeiro) para o interior, o contrário do que diz a alternativa.",
      },
      {
        id: "D",
        text: "Porque grandes empresas da China, atraídas pela mão de obra barata, instalaram suas fábricas no litoral e no Sudeste do Brasil",
        correct: false,
        explanation:
          "A China aparece no livro como exemplo atual de país que atrai muitos investimentos por oferecer vantagens competitivas. Tenta porque fala de investimento e localização. Mas o livro não diz que empresas chinesas criaram a concentração no Sudeste, que é histórica e vem desde a colônia.",
      },
    ],
    tips: [
      "Indústria procura consumidor: onde a população se concentrou (litoral e Sudeste), as fábricas vieram atrás.",
      "Linha do tempo da população: capitanias no litoral, Rio capital, ouro e café no Sudeste.",
    ],
  },
];
