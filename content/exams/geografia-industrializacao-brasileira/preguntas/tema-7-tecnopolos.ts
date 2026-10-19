import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 7: Tecnopolos, patentes e grandes centros administrativos (capítulo 11,
 * pp. 124–128).
 *
 * Cubre el valor agregado, la bauxita frente al celular, a quién favorece el
 * dólar valorizado, qué importa Brasil, los royalties, los ejemplos notables de
 * tecnología nacional, los pedidos de patente por estado y municipio, quién
 * lidera el ranking de depositantes, dónde se concentran las decisiones tras las
 * privatizaciones y el Marco Legal de Ciencia, Tecnología e Innovación.
 */
export const TEMA_TECNOPOLOS: ExamQuestionWithTopic[] = [
  {
    id: "geo-t7-q01",
    topic: "tecnopolos",
    prompt: "Quando pensamos em PIB, falamos também de valor agregado dos produtos. O que é valor agregado?",
    options: [
      {
        id: "A",
        text: "O imposto que o governo estadual cobra sobre a circulação das mercadorias",
        correct: false,
        explanation:
          "O imposto estadual sobre a circulação de mercadorias é o ICMS, a maior fonte de arrecadação dos estados. Tenta porque o imposto também aumenta o preço final. Mas imposto é cobrado pelo governo; valor agregado é o valor que o próprio produto tem pela forma como foi feito.",
      },
      {
        id: "B",
        text: "A taxa paga pelo uso de processos ou sistemas que pertencem a outras empresas",
        correct: false,
        explanation:
          "Essa é a definição de royalties: a taxa a ser paga quando se usam processos ou sistemas de propriedade de terceiros. Tenta porque produtos de alta tecnologia, de alto valor agregado, costumam envolver royalties. Mas royalties são um pagamento pelo uso, não o valor do produto.",
      },
      {
        id: "C",
        text: "O preço estipulado para um produto de acordo com a complexidade da sua produção",
        correct: true,
        explanation:
          "Correta. É a definição do AZpédia: valor agregado é o preço estipulado para determinado produto de acordo com sua complexidade de produção. Desde o início da industrialização, os produtos que alcançam maior valor no mercado são os que concentram mais tecnologia.",
      },
      {
        id: "D",
        text: "A parte dos lucros da empresa que é dividida entre os seus trabalhadores",
        correct: false,
        explanation:
          "Dividir parte dos lucros com os trabalhadores é a participação nos lucros, uma conquista da luta sindical. Tenta porque também fala de valor e de empresa. Mas é um direito do trabalhador, e valor agregado é uma característica do produto.",
      },
    ],
    tips: [
      "Quanto mais complexa e tecnológica a produção, maior o valor agregado.",
      "Valor agregado é do produto; imposto é do governo; royalty é do dono da tecnologia.",
    ],
  },
  {
    id: "geo-t7-q02",
    topic: "tecnopolos",
    prompt:
      "O livro compara a bauxita minerada no Pará com um telefone celular. O que essa comparação quer mostrar?",
    options: [
      {
        id: "A",
        text: "Que a bauxita, vendida quase em estado bruto, tem valor agregado menor que o celular, que depende de muita tecnologia",
        correct: true,
        explanation:
          "Correta. Muitos recursos naturais e produtos agrícolas podem ser retirados da natureza e vendidos in natura, em estado bruto. Outros dependem de alto grau de tecnologia e transformação, como celulares e equipamentos esportivos. A bauxita (matéria-prima do alumínio) e o celular são exemplos de valores agregados diferentes.",
      },
      {
        id: "B",
        text: "Que a bauxita vale mais que o celular, por ser um recurso natural raro que demora milhões de anos para se formar",
        correct: false,
        explanation:
          "Recursos naturais são elementos retirados da natureza, como minérios, que podem levar muito tempo para se formar. Tenta porque a raridade costuma encarecer as coisas. Mas o livro usa a bauxita como exemplo do contrário: vendida em estado bruto, ela tem valor agregado menor que o de um produto tecnológico.",
      },
      {
        id: "C",
        text: "Que os dois são bens intermediários, porque ambos servem de insumo para fabricar outros produtos",
        correct: false,
        explanation:
          "Bens intermediários são produtos que servem de insumo para fabricar outros, como rolos de tecido e peças. Tenta porque a bauxita realmente vira alumínio. Mas o celular é um produto final, usado pelas pessoas; e a comparação do livro é sobre valor agregado, não sobre o tipo de indústria.",
      },
      {
        id: "D",
        text: "Que os dois produtos pagam royalties ao estado do Pará, onde a bauxita é extraída do solo",
        correct: false,
        explanation:
          "Royalties são a taxa paga pelo uso de processos ou sistemas de propriedade de terceiros, como uma tecnologia patenteada. Tenta porque o celular de fato envolve tecnologia alheia. Mas royalties não são pagos a um estado por extrair minério, e o livro não fala disso nessa comparação.",
      },
    ],
    tips: [
      "Produto in natura (bauxita, grãos) = pouco valor agregado. Produto com muita tecnologia (celular) = muito valor agregado.",
      "Raro não quer dizer valioso: o que pesa no valor agregado é a complexidade da produção.",
    ],
  },
  {
    id: "geo-t7-q03",
    topic: "tecnopolos",
    prompt: "Segundo o livro, a quem tendem a favorecer as políticas que mantêm o dólar valorizado em relação ao real?",
    options: [
      {
        id: "A",
        text: "À indústria de pães, que compra trigo de outros países para atender à demanda nacional",
        correct: false,
        explanation:
          "A indústria de pães depende de importar trigo para atender à demanda nacional. Tenta porque é o exemplo que o livro dá ao falar do dólar. Mas é exemplo do lado prejudicado: com a moeda estrangeira cara, importar trigo custa mais.",
      },
      {
        id: "B",
        text: "Aos consumidores que compram celulares, computadores e outros produtos importados",
        correct: false,
        explanation:
          "Consumidores de produtos importados pagam o preço convertido de outra moeda. Tenta porque eles são muito afetados pelo câmbio. Mas são prejudicados, e não favorecidos: com o dólar alto, cada produto importado fica mais caro em reais.",
      },
      {
        id: "C",
        text: "Às universidades públicas, que pagam royalties pelas tecnologias que usam nas pesquisas",
        correct: false,
        explanation:
          "As universidades públicas são as maiores depositantes de patentes de invenção no país. Tenta porque fazem parte da história da tecnologia brasileira. Mas o livro não as liga à política do dólar, e quem paga em moeda estrangeira sai prejudicado, não favorecido.",
      },
      {
        id: "D",
        text: "Aos exportadores, como os setores de minerais e da agropecuária",
        correct: true,
        explanation:
          "Correta. Políticas que mantêm o dólar valorizado em relação ao real tendem a favorecer os exportadores do país, que recebem em dólar e convertem em mais reais. Segundo o livro, esses empresários estão representados principalmente nos setores de minerais e da agropecuária, e esse tratamento diferenciado deixa a indústria em desvantagem.",
      },
    ],
    tips: [
      "Dólar alto: bom para quem vende para fora (exporta), ruim para quem compra de fora (importa).",
      "O agronegócio e a mineração exportam muito; por isso se beneficiam do dólar valorizado.",
    ],
  },
  {
    id: "geo-t7-q04",
    topic: "tecnopolos",
    prompt:
      "Segundo a Câmara de Comércio Exterior, qual destes produtos está entre os cinco principais grupos de produtos importados pelo Brasil?",
    options: [
      {
        id: "A",
        text: "Café em grão, produzido no interior paulista",
        correct: false,
        explanation:
          "O café em grão foi por muito tempo o principal produto de exportação brasileiro, escoado pelo porto de Santos. Tenta porque é um produto muito ligado ao comércio exterior do Brasil. Mas o Brasil vende café para fora, não o compra.",
      },
      {
        id: "B",
        text: "Medicamentos para medicina humana e veterinária",
        correct: true,
        explanation:
          "Correta. Os cinco principais grupos de produtos importados pelo Brasil são: demais produtos manufaturados; medicamentos para medicina humana e veterinária; óleos combustíveis; partes e peças para veículos automóveis e tratores; e circuitos integrados e microconjuntos eletrônicos.",
      },
      {
        id: "C",
        text: "Minério de ferro, extraído em Minas Gerais",
        correct: false,
        explanation:
          "O minério de ferro é uma matéria-prima mineral retirada da natureza e usada para fazer aço. Tenta porque é uma mercadoria importante no comércio exterior. Mas o setor de minerais está entre os exportadores, os que se beneficiam do dólar alto, e não entre as importações.",
      },
      {
        id: "D",
        text: "Nióbio, usado em ligas de aço para tubulações",
        correct: false,
        explanation:
          "O nióbio é a matéria-prima usada em ligas de aço para gasodutos, oleodutos e tubulações. Tenta porque é um produto estratégico citado no livro. Mas o Brasil é autossuficiente nele e está entre os maiores produtores do mundo, então não precisa importá-lo.",
      },
    ],
    tips: [
      "Importações principais: manufaturados, medicamentos, óleos combustíveis, peças de veículos e circuitos eletrônicos.",
      "O que o Brasil produz em abundância (café, minérios, nióbio) ele exporta, não importa.",
    ],
  },
  {
    id: "geo-t7-q05",
    topic: "tecnopolos",
    prompt:
      "No setor de alta tecnologia, o Brasil tem baixa competitividade. O que as empresas, os órgãos públicos e os consumidores precisam fazer ao comprar produtos tecnológicos estrangeiros, como computadores e celulares?",
    options: [
      {
        id: "A",
        text: "Pagar royalties às empresas internacionais pelo uso de processos e sistemas que pertencem a elas",
        correct: true,
        explanation:
          "Correta. A situação mais dramática ocorre no setor de alta tecnologia: o Brasil tem fraca representatividade no mercado global, e grandes empresas, órgãos públicos e consumidores precisam comprar produtos que pagam royalties às empresas internacionais. Royalties são a taxa paga pelo uso de processos ou sistemas de propriedade de terceiros.",
      },
      {
        id: "B",
        text: "Pagar ICMS diretamente ao governo do país onde esses produtos foram fabricados",
        correct: false,
        explanation:
          "O ICMS é o imposto estadual brasileiro sobre a circulação de mercadorias e serviços. Tenta porque é o imposto sobre consumo mais citado no capítulo. Mas ele é cobrado pelos estados brasileiros, e nunca pago a governos de outros países.",
      },
      {
        id: "C",
        text: "Registrar uma patente no INPI antes de começar a usar cada um desses produtos",
        correct: false,
        explanation:
          "Patente é o registro que protege uma invenção, e no Brasil ele é feito no INPI (Instituto Nacional da Propriedade Industrial). Tenta porque patentes e tecnologia andam juntas. Mas quem registra patente é o inventor, não quem compra ou usa o produto.",
      },
      {
        id: "D",
        text: "Pedir aos municípios a doação ou a cessão de terrenos públicos para instalar os equipamentos",
        correct: false,
        explanation:
          "Doação e cessão de terrenos são incentivos que municípios oferecem na Guerra Fiscal para atrair empresas. Tenta porque são mecanismos citados no capítulo. Mas servem para instalar fábricas, e não têm relação com comprar produtos de tecnologia estrangeira.",
      },
    ],
    tips: [
      "Usar tecnologia de outro = pagar royalties ao dono dela.",
      "Quem registra patente é quem inventa; quem paga royalties é quem usa.",
    ],
  },
  {
    id: "geo-t7-q06",
    topic: "tecnopolos",
    prompt:
      "Apesar de ser em geral importador de tecnologia, o Brasil tem alguns exemplos notáveis de produtos patenteados no país e exportados. Qual destes está entre eles?",
    options: [
      {
        id: "A",
        text: "Telefones celulares e laptops vendidos no mercado mundial",
        correct: false,
        explanation:
          "Celulares e laptops são produtos de alta tecnologia e alto valor agregado, muito procurados no mundo. Tenta porque são o exemplo do livro de produto valorizado. Mas o livro diz que o Brasil precisa comprá-los pagando royalties às empresas internacionais; não são exemplos de tecnologia brasileira exportada.",
      },
      {
        id: "B",
        text: "Rolos de tecido usados na indústria de confecção",
        correct: false,
        explanation:
          "Rolos de tecido são bens intermediários: servem de insumo para a indústria de roupas. Tenta porque são produtos industriais brasileiros. Mas não são tecnologia de ponta patenteada, e não aparecem entre os exemplos notáveis do livro.",
      },
      {
        id: "C",
        text: "Aeronaves, como os jatos fabricados pela Embraer",
        correct: true,
        explanation:
          "Correta. O livro cita como exemplos notáveis a produção de vacinas, de aeronaves, a exploração petrolífera em águas profundas e determinados implementos agropecuários, patenteados pelo Brasil e exportados. A foto da aeronave Embraer E195 num aeroporto de Zurique ilustra uma tecnologia nacional competitiva no mercado internacional.",
      },
      {
        id: "D",
        text: "Circuitos integrados e microconjuntos eletrônicos",
        correct: false,
        explanation:
          "Circuitos integrados e microconjuntos eletrônicos são os componentes que fazem funcionar aparelhos como computadores e celulares. Tenta porque são tecnologia avançada. Mas aparecem no livro entre os cinco principais grupos de produtos importados pelo Brasil, e não exportados.",
      },
    ],
    tips: [
      "Exemplos notáveis de tecnologia brasileira: vacinas, aeronaves, petróleo em águas profundas e implementos agropecuários.",
      "Ser de alta tecnologia não basta: a pergunta quer o que o Brasil patenteia e exporta.",
    ],
  },
  {
    id: "geo-t7-q07",
    topic: "tecnopolos",
    prompt:
      "No gráfico dos pedidos de patente de residentes por estado (2016), qual é a situação de São Paulo?",
    options: [
      {
        id: "A",
        text: "Fica atrás do Paraná, que concentra a maior parte dos pedidos do país",
        correct: false,
        explanation:
          "O Paraná, com 9,4% dos pedidos, é um dos estados que aparecem logo atrás de São Paulo, e Curitiba é o segundo município do ranking. Tenta porque o Paraná se destaca em patentes. Mas fica muito longe do primeiro lugar.",
      },
      {
        id: "B",
        text: "Tem cerca de 10% dos pedidos, o mesmo que Rio de Janeiro, Rio Grande do Sul e Minas Gerais",
        correct: false,
        explanation:
          "Cerca de 10% é a fatia de cada um dos estados que vêm depois de São Paulo: Rio de Janeiro (10,8%), Rio Grande do Sul (10,3%) e Minas Gerais (10,2%). Tenta porque esses números aparecem juntos no gráfico. Mas São Paulo tem mais que o triplo disso.",
      },
      {
        id: "C",
        text: "Concentra todos os pedidos de patente feitos por residentes no Brasil",
        correct: false,
        explanation:
          "Concentrar todos os pedidos seria ter 100% do gráfico. Tenta porque o livro fala em 'predomínio completo' de São Paulo. Mas predomínio não é exclusividade: vários outros estados também fazem pedidos, e 'Outros' somam 10,1%.",
      },
      {
        id: "D",
        text: "Lidera com 33,4% dos pedidos, mais que o triplo de qualquer outro estado",
        correct: true,
        explanation:
          "Correta. São Paulo tem 33,4% dos pedidos de patente de residentes, enquanto nenhum outro estado passa de 11%. Paraná, Rio de Janeiro e Minas Gerais, somados, não atingem o percentual paulista. Com isso, é difícil imaginar uma distribuição maior das indústrias pelo território nacional.",
      },
    ],
    tips: [
      "Patentes em 2016: São Paulo com 33,4%, os outros grandes estados perto de 10% cada.",
      "Predomínio é ter muito mais que os outros; exclusividade seria ter tudo.",
    ],
  },
  {
    id: "geo-t7-q08",
    topic: "tecnopolos",
    prompt:
      "Especialmente a partir dos anos 2000, o Estado fez privatizações e concessões, e as decisões administrativas sobre a produção passaram a ser tomadas pela iniciativa privada. Onde se concentram esses centros de decisão?",
    options: [
      {
        id: "A",
        text: "Nas cidades médias e pequenas do interior do Nordeste",
        correct: false,
        explanation:
          "Cidades médias e pequenas do Nordeste são destino da nova espacialização das fábricas. Tenta porque recebem novas indústrias. Mas receber uma fábrica não é receber a sede: as decisões administrativas continuam nos grandes centros.",
      },
      {
        id: "B",
        text: "Em centros de poder concentrados no eixo Rio–São Paulo–Brasília",
        correct: true,
        explanation:
          "Correta. Com as privatizações e concessões, as iniciativas produtivas ficam sob a escolha privada, e as decisões administrativas no nível da produção passam a ser tomadas por centros de poder concentrados no eixo Rio–São Paulo–Brasília. A foto do Itaim Bibi, em São Paulo, bairro que concentra sedes de multinacionais, ilustra isso.",
      },
      {
        id: "C",
        text: "Na Zona Franca de Manaus, por causa da isenção de impostos",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área de isenção de impostos criada para desenvolver a economia amazônica. Tenta porque reúne muitas empresas. Mas é um polo de produção, e não o lugar onde se concentram as sedes e as decisões das grandes empresas do país.",
      },
      {
        id: "D",
        text: "Nas universidades federais, que lideram os pedidos de patente",
        correct: false,
        explanation:
          "As universidades federais e estaduais públicas lideram o ranking de depositantes de patentes de invenção. Tenta porque são centros de conhecimento importantes. Mas elas fazem pesquisa; as decisões administrativas das empresas privadas ficam nas sedes dessas empresas.",
      },
    ],
    tips: [
      "Fábricas se espalham, mas as sedes e as decisões continuam concentradas no eixo Rio–São Paulo–Brasília.",
      "Não confunda onde se produz com onde se decide.",
    ],
  },
  {
    id: "geo-t7-q09",
    topic: "tecnopolos",
    prompt:
      "Na tabela dos maiores depositantes de patentes de invenção (2016), feita com dados do INPI, quem domina amplamente o ranking?",
    options: [
      {
        id: "A",
        text: "Empresas multinacionais estrangeiras de eletrodomésticos e eletrônicos, como a Whirlpool, que lideram a inovação",
        correct: false,
        explanation:
          "Multinacionais são empresas com sede num país e filiais em vários outros. Tenta porque a Whirlpool aparece no ranking. Mas ela é a única empresa entre os dez primeiros, empatada em nono lugar; todos os outros são universidades.",
      },
      {
        id: "B",
        text: "As montadoras de automóveis instaladas desde o governo de Juscelino Kubitschek",
        correct: false,
        explanation:
          "As montadoras de automóveis, como Volkswagen, Simca e Vemag, chegaram ao Brasil em parceria com o governo nas décadas de 1950 e 1960. Tenta porque foram símbolo da industrialização. Mas nenhuma montadora aparece no ranking de patentes de 2016.",
      },
      {
        id: "C",
        text: "Instituições públicas de ensino superior, com a Universidade Federal de Minas Gerais em primeiro lugar",
        correct: true,
        explanation:
          "Correta. As instituições públicas de ensino superior dominam amplamente o ranking: UFMG em primeiro (70 pedidos), seguida de Unicamp e USP. Historicamente, as demandas do desenvolvimento nacional foram atendidas pela colaboração das universidades na tecnologia; desde os anos 1950, as indústrias estatais incentivavam a pesquisa, e a ligação universidade-indústria permitia às empresas não investir maciçamente em inovação interna.",
      },
      {
        id: "D",
        text: "Empresas estatais que foram privatizadas a partir da década de 1990",
        correct: false,
        explanation:
          "Empresas estatais privatizadas são as que passaram do governo para donos particulares na Nova República. Tenta porque as estatais incentivaram muito a pesquisa no passado. Mas no ranking de 2016 quem aparece são universidades, além da Whirlpool, e não ex-estatais.",
      },
    ],
    tips: [
      "Ranking de depositantes de patentes de invenção: universidades públicas dominam (UFMG, Unicamp, USP).",
      "A indústria brasileira depende das instituições de pesquisa para inovar.",
    ],
  },
  {
    id: "geo-t7-q10",
    topic: "tecnopolos",
    prompt:
      "Em 2016 foi promulgada a Lei n. 13.243, chamada de novo Marco Legal da Ciência, Tecnologia e Inovação (MLCTI). Qual é o objetivo dessa lei?",
    options: [
      {
        id: "A",
        text: "Privatizar as universidades públicas, passando a pesquisa para as empresas particulares",
        correct: false,
        explanation:
          "Privatizar é transferir o que é do Estado para a iniciativa privada, como aconteceu com várias estatais. Tenta porque a lei envolve universidades e empresas. Mas ela não vende universidades: busca aproximá-las das empresas, mantendo as instituições públicas.",
      },
      {
        id: "B",
        text: "Proibir que empresas estrangeiras registrem patentes de invenção no Brasil",
        correct: false,
        explanation:
          "Proibir patentes estrangeiras seria uma medida de proteção ao mercado nacional, parecida com o protecionismo fiscal do passado. Tenta porque a indústria brasileira depende de tecnologia de fora. Mas o livro não fala de proibição; a lei trata da parceria entre empresas e pesquisa pública.",
      },
      {
        id: "C",
        text: "Dar isenção de ICMS a todas as empresas de tecnologia instaladas no território nacional",
        correct: false,
        explanation:
          "Isenção de ICMS é um incentivo fiscal típico da Guerra Fiscal, dado pelos estados para atrair empresas. Tenta porque também é uma forma de estimular a indústria. Mas o Marco Legal não trata de impostos, e sim da relação entre empresas e instituições de pesquisa.",
      },
      {
        id: "D",
        text: "Favorecer a relação entre a iniciativa privada e as instituições públicas de pesquisa",
        correct: true,
        explanation:
          "Correta. A lei procura promover ambiente favorável para a relação entre a iniciativa privada e as instituições públicas de pesquisa. Ela facilita a transferência de propriedade intelectual e o uso compartilhado de espaço e equipamentos. O livro ainda lembra que Sul e Sudeste concentram a infraestrutura de pesquisa, e que a sinergia entre os setores poderia desenvolver a indústria do Norte e do Nordeste.",
      },
    ],
    tips: [
      "Marco Legal de 2016 = aproximar empresas privadas e pesquisa pública (propriedade intelectual, espaço e equipamentos).",
      "Sinergia = esforço conjunto de dois ou mais órgãos, públicos ou privados, para uma tarefa comum.",
    ],
  },
];
