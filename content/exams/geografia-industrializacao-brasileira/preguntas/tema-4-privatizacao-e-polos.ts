import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 4: Privatização e principais polos industriais (capítulo 10, pp. 110–111).
 *
 * Cubre la privatización y las concesiones de la Nova República, el gráfico de
 * participación de la industria en el PIB (1996–2014), el crecimiento de los
 * servicios, por qué cae la participación industrial, el mapa de distribución de
 * la industria (polos principales y secundarios), el desafío del siglo XXI y los
 * estados sin industria de máquinas y equipos.
 */
export const TEMA_PRIVATIZACAO_E_POLOS: ExamQuestionWithTopic[] = [
  {
    id: "geo-t4-q01",
    topic: "privatizacao-e-polos",
    prompt:
      "Um conjunto de medidas mantido na política econômica de toda a Nova República foi chamado de privatização. O que esse termo significa?",
    options: [
      {
        id: "A",
        text: "Investir dinheiro público para criar novas empresas estatais em setores estratégicos",
        correct: false,
        explanation:
          "Criar empresas estatais com dinheiro público é a estatização, típica da forte intervenção do Estado na economia, como nas indústrias estatais dos anos 1950 e na Ditadura. Tenta porque também é uma política sobre empresas. Mas é o movimento contrário da privatização.",
      },
      {
        id: "B",
        text: "Proteger os produtos nacionais cobrando impostos mais baixos do que os dos importados",
        correct: false,
        explanation:
          "Cobrar impostos mais baixos para os produtos nacionais é o protecionismo fiscal, política usada até a Ditadura Civil-Militar. Tenta porque também é uma medida de política econômica do capítulo. Mas o protecionismo fala de impostos, e a privatização fala de quem é o dono das empresas.",
      },
      {
        id: "C",
        text: "Oferecer isenção de impostos para que uma fábrica se instale em determinado município",
        correct: false,
        explanation:
          "Oferecer isenção de impostos para atrair fábricas é um incentivo fiscal, a principal arma da Guerra Fiscal entre estados e municípios. Tenta porque também envolve o governo e as empresas privadas. Mas no incentivo a empresa já é privada; na privatização, o que muda é o dono.",
      },
      {
        id: "D",
        text: "Transferir o capital público investido nas empresas estatais para as mãos da iniciativa privada",
        correct: true,
        explanation:
          "Correta. Segundo o livro, privatização é o conjunto de medidas de governo que transferem o capital público, investido nas empresas estatais, para as mãos da iniciativa privada. Dependendo do governo, isso ocorreu por venda das empresas para compradores particulares ou pelo sistema de concessões.",
      },
    ],
    tips: [
      "Privatizar = o Estado passa empresas para donos particulares. Estatizar = o contrário.",
      "Protecionismo e incentivo fiscal mexem em impostos; privatização mexe na propriedade.",
    ],
  },
  {
    id: "geo-t4-q02",
    topic: "privatizacao-e-polos",
    prompt:
      "Uma empresa particular passa a administrar uma rodovia federal e a cobrar pedágio, mas a estrada continua pertencendo ao Estado. Que regime é esse?",
    options: [
      {
        id: "A",
        text: "Venda simples, em que a empresa compradora passa a ser a dona da rodovia",
        correct: false,
        explanation:
          "Na venda simples, o Estado vende a empresa ou o bem, e o comprador particular passa a ser o proprietário. Tenta porque também é uma forma de privatização citada no livro. Mas o enunciado diz que a estrada continua sendo do Estado, e na venda isso não acontece.",
      },
      {
        id: "B",
        text: "Concessão, em que o investidor privado controla e opera a rodovia sem ser o dono",
        correct: true,
        explanation:
          "Correta. No regime de concessão, o investidor particular assume o controle e a operação do bem estatal, mas sem ser o proprietário de fato, como acontece na venda simples. Segundo o livro, o sistema de concessões funciona principalmente em estradas, aeroportos e portos.",
      },
      {
        id: "C",
        text: "Estatização, em que o governo toma o controle de uma empresa que era particular",
        correct: false,
        explanation:
          "Estatização é quando o Estado passa a controlar ou ser dono de uma empresa que antes era privada. Tenta porque a estrada continua sendo do Estado. Mas na estatização é o governo que administra; no exemplo, quem administra e cobra o pedágio é a empresa particular.",
      },
      {
        id: "D",
        text: "Incentivo fiscal, em que o município perdoa os impostos da empresa que se instala",
        correct: false,
        explanation:
          "Incentivos fiscais são estratégias de renúncia de impostos para fomentar um setor específico, como faz a Guerra Fiscal. Tenta porque também é um acordo entre governo e empresa privada. Mas no exemplo não se fala de impostos, e sim de quem opera um bem público.",
      },
    ],
    tips: [
      "Concessão: o particular opera, o Estado continua dono. Venda: o particular vira dono.",
      "Concessões aparecem principalmente em estradas, aeroportos e portos.",
    ],
  },
  {
    id: "geo-t4-q03",
    topic: "privatizacao-e-polos",
    prompt:
      "No gráfico da participação da indústria no PIB brasileiro (1996–2014), o que acontece a partir de meados da década de 2000?",
    options: [
      {
        id: "A",
        text: "A participação sobe sem parar e passa de 20% do PIB no fim do período",
        correct: false,
        explanation:
          "Uma participação que sobe até perto de 30% foi o que aconteceu entre 1947 e 1966, quando a indústria passou de 17,8% para 29,2% do PIB. Tenta porque é o outro gráfico de participação do capítulo. Mas no gráfico de 1996 a 2014 a linha nunca chega a 16% e, depois de 2004, desce.",
      },
      {
        id: "B",
        text: "A participação fica praticamente estável, sempre perto de 13% do PIB",
        correct: false,
        explanation:
          "Uma linha estável perto de 13% descreve bem o começo do gráfico, entre 1996 e 2002, quando a participação oscila entre 12% e 13%. Tenta porque é o que se vê na primeira metade. Mas depois do pico em torno de 2004 a linha cai até o fim, e o enunciado pergunta pelo período a partir de meados dos anos 2000.",
      },
      {
        id: "C",
        text: "A participação cai fortemente, chegando a 9,2% do PIB em 2014",
        correct: true,
        explanation:
          "Correta. Depois do pico por volta de 2004, perto de 15%, a participação da indústria no PIB cai com tendência a continuar caindo. Segundo o livro, desde os anos 1990 a produção industrial tem reduzido sua participação no PIB até o patamar de 9,2% em 2014.",
      },
      {
        id: "D",
        text: "A participação cai até zero, porque as fábricas deixam de produzir no país",
        correct: false,
        explanation:
          "Uma participação zero significaria que a indústria não produz mais nada no país, uma desindustrialização total. Tenta porque o gráfico mostra uma queda forte. Mas o livro diz que a produção continua a crescer, só que em ritmo mais lento que outros setores; por isso a fatia cai sem desaparecer.",
      },
    ],
    tips: [
      "Gráfico 1996–2014: pico perto de 15% por volta de 2004, depois queda até 9,2% em 2014.",
      "Participação menor não quer dizer produção menor: os outros setores podem estar crescendo mais rápido.",
    ],
  },
  {
    id: "geo-t4-q04",
    topic: "privatizacao-e-polos",
    prompt:
      "Segundo os dados do IBGE citados no livro, a produção industrial continua a crescer, mas em ritmo mais lento que outros setores. Que setor aumenta proporcionalmente sua participação na oferta de postos de trabalho?",
    options: [
      {
        id: "A",
        text: "O setor de serviços",
        correct: true,
        explanation:
          "Correta. Proporcionalmente, são os serviços que aumentam a cada dia sua participação na oferta de postos de trabalho, enquanto a indústria decai. O livro diz que o mesmo ocorre com o volume de renda gerada.",
      },
      {
        id: "B",
        text: "A indústria de base",
        correct: false,
        explanation:
          "A indústria de base produz bens de produção, como aço, cimento e produtos petroquímicos. Tenta porque é um setor importante e citado no capítulo. Mas ela faz parte da própria indústria, e o livro diz que é a indústria que perde participação nos empregos.",
      },
      {
        id: "C",
        text: "O setor industrial",
        correct: false,
        explanation:
          "O setor industrial reúne as atividades que transformam matérias-primas em produtos nas fábricas. Tenta porque o enunciado diz que a produção industrial continua a crescer. Mas crescer devagar faz a fatia diminuir: o livro diz que a participação da indústria nos postos de trabalho decai.",
      },
      {
        id: "D",
        text: "As empresas estatais",
        correct: false,
        explanation:
          "Empresas estatais são as que pertencem ao governo. Tenta porque já foram muito importantes na economia brasileira. Mas a política da Nova República foi a privatização, que diminuiu o peso das estatais; não são elas que ganham empregos nesse período.",
      },
    ],
    tips: [
      "Hoje os serviços ganham peso nos empregos e na renda; a indústria perde.",
      "Crescer mais devagar que os outros faz qualquer setor perder participação.",
    ],
  },
  {
    id: "geo-t4-q05",
    topic: "privatizacao-e-polos",
    prompt: "Segundo o livro, que fator ajuda a explicar a forte queda da participação da indústria no PIB?",
    options: [
      {
        id: "A",
        text: "A proibição da entrada de empresas e de investidores estrangeiros, que deixou a indústria sem capital para crescer",
        correct: false,
        explanation:
          "Proibir a entrada de empresas estrangeiras seria uma forma extrema de proteger o mercado nacional. Tenta porque o livro cita o capital estrangeiro nesse trecho. Mas diz o contrário: as políticas recentes não conseguiram diminuir os efeitos negativos que a entrada de empresas e investidores estrangeiros provocou no Brasil.",
      },
      {
        id: "B",
        text: "A volta do Brasil à condição de país agrário, sem nenhuma indústria",
        correct: false,
        explanation:
          "Um país agrário é aquele cuja economia depende sobretudo da agricultura e da pecuária. Tenta porque o agronegócio cresce e a indústria perde espaço. Mas o Brasil continua industrializado e com quase todos os tipos de indústria; a queda é de participação, não o fim da indústria.",
      },
      {
        id: "C",
        text: "O incentivo ao agronegócio e ao extrativismo, que deixa a indústria local sem condições de competir",
        correct: true,
        explanation:
          "Correta. O livro afirma que o incentivo aos setores do agronegócio e do extrativismo deixa a indústria local sem condições de competitividade, tanto no mercado externo como no interno. O resultado é que, desde os anos 1990, a indústria vem reduzindo sua participação no PIB.",
      },
      {
        id: "D",
        text: "A concentração de todas as fábricas do país dentro da Zona Franca de Manaus",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área de isenção de impostos que atrai empresas de tecnologia e comunicação. Tenta porque concentra um polo industrial. Mas ela não reúne todas as fábricas do país, e mudar a localização das fábricas não muda o peso da indústria no PIB.",
      },
    ],
    tips: [
      "Competitividade é a capacidade de vender em condições de disputar com os concorrentes.",
      "Mudar onde as fábricas ficam não altera o peso total da indústria na economia.",
    ],
  },
  {
    id: "geo-t4-q06",
    topic: "privatizacao-e-polos",
    prompt: "Segundo o mapa do IBGE, onde se concentra a distribuição das empresas industriais no território brasileiro?",
    options: [
      {
        id: "A",
        text: "No litoral e nos estados do Sudeste, com Rio de Janeiro e São Paulo como principais polos",
        correct: true,
        explanation:
          "Correta. O mapa mostra que a distribuição das empresas ainda é concentrada no litoral e nos estados do Sudeste. Os principais polos nacionais são Rio de Janeiro e São Paulo, com predomínio no número de indústrias e no tamanho delas.",
      },
      {
        id: "B",
        text: "No Centro-Oeste, em torno de Goiânia e de Brasília, por causa da nova capital",
        correct: false,
        explanation:
          "Goiânia e Brasília formam um grande polo industrial no Centro-Oeste, que o livro destaca à parte, depois dos polos secundários do Nordeste e do Sul. Tenta porque Brasília foi criada para levar o desenvolvimento para o interior. Mas no mapa o Centro-Oeste tem muito menos empresas que o Sudeste.",
      },
      {
        id: "C",
        text: "Na região Norte, por causa dos incentivos fiscais da Zona Franca de Manaus",
        correct: false,
        explanation:
          "A Zona Franca de Manaus é uma área de isenção de impostos criada em 1967 para desenvolver a Amazônia. Tenta porque é o polo industrial mais conhecido do Norte. Mas ela é um ponto isolado: no mapa, o Norte é a região com menos empresas industriais.",
      },
      {
        id: "D",
        text: "No Nordeste, especialmente em Fortaleza, Recife e Salvador, as maiores capitais",
        correct: false,
        explanation:
          "Fortaleza, Recife e Salvador são polos industriais secundários do Nordeste. Tenta porque são grandes cidades litorâneas e aparecem no mapa. Mas o livro os coloca como polos secundários; a maior concentração está no Sudeste.",
      },
    ],
    tips: [
      "Polos principais: Rio de Janeiro e São Paulo. Secundários: Fortaleza, Recife, Salvador, Curitiba, Porto Alegre e norte de SC. No Centro-Oeste, o polo de Goiânia–Brasília.",
      "Um polo forte numa região não faz dela a região mais industrializada.",
    ],
  },
  {
    id: "geo-t4-q07",
    topic: "privatizacao-e-polos",
    prompt:
      "Parte do território brasileiro é ocupada por reservas indígenas e parques de preservação, mas o livro diz que mesmo assim é possível desenvolver a indústria. Qual é, segundo o livro, o desafio do século XXI?",
    options: [
      {
        id: "A",
        text: "Substituir as reservas e os parques por novos parques industriais",
        correct: false,
        explanation:
          "Reservas indígenas e parques de preservação são áreas protegidas por lei, e parque industrial é a área onde estão as indústrias de um lugar. Tenta pela palavra 'parque' nos dois casos. Mas o livro fala em desenvolver a indústria respeitando essas áreas, não em trocar umas pelas outras.",
      },
      {
        id: "B",
        text: "Concentrar toda a indústria na região Sudeste para que o resto do território fique totalmente preservado",
        correct: false,
        explanation:
          "A concentração industrial é o acúmulo de indústrias numa região, como aconteceu historicamente no Sudeste. Tenta porque parece proteger as outras regiões. Mas o livro valoriza a distribuição das indústrias pelo país, e o próprio texto diz que os esforços de distribuição ainda não se completaram.",
      },
      {
        id: "C",
        text: "Fazer a economia crescer o mais rápido possível, mesmo à custa da natureza",
        correct: false,
        explanation:
          "Crescimento econômico é o aumento da produção e da riqueza de um país. Tenta porque é uma das metas do desafio. Mas o livro não fala em crescer a qualquer custo: o crescimento precisa vir junto com justiça social e preservação ambiental.",
      },
      {
        id: "D",
        text: "Desenvolver uma indústria que alie crescimento econômico, justiça social e preservação ambiental",
        correct: true,
        explanation:
          "Correta. Embora parte do território seja ocupada por reservas indígenas e parques nacionais de preservação, é possível desenvolver uma indústria que alie crescimento econômico, justiça social e preservação ambiental. Esse é, segundo o livro, o desafio do século XXI.",
      },
    ],
    tips: [
      "Desafio do século XXI: crescimento econômico + justiça social + preservação ambiental, os três juntos.",
      "Quando a alternativa sacrifica uma meta para alcançar outra, ela contradiz a ideia de 'aliar'.",
    ],
  },
  {
    id: "geo-t4-q08",
    topic: "privatizacao-e-polos",
    prompt:
      "O livro diz que pelo menos sete estados não possuem nenhuma indústria de máquinas e equipamentos. Por que isso os prejudica?",
    options: [
      {
        id: "A",
        text: "Porque esses estados ficam proibidos por lei de cobrar o ICMS das empresas",
        correct: false,
        explanation:
          "O ICMS é o imposto estadual sobre a circulação de mercadorias e serviços, a maior fonte de arrecadação dos estados. Tenta porque o livro cita o ICMS nesse trecho. Mas nenhum estado fica proibido de cobrá-lo; o problema é que o produto vindo de fora chega mais caro por causa dele.",
      },
      {
        id: "B",
        text: "Porque isso limita a capacidade de gerar outras indústrias, e o produto feito fora chega mais caro por causa do ICMS",
        correct: true,
        explanation:
          "Correta. Máquinas e equipamentos são o principal setor de bens de produção. Sem eles, o estado tem menos capacidade de gerar outras indústrias, e a produção feita fora do estado encarece o produto por conta do Imposto Sobre a Circulação de Mercadorias e Serviços (ICMS).",
      },
      {
        id: "C",
        text: "Porque máquinas e equipamentos são bens de consumo, os produtos mais procurados pelas famílias",
        correct: false,
        explanation:
          "Bens de consumo são produtos destinados ao uso das pessoas, como roupas, alimentos e remédios. Tenta porque máquinas também são compradas. Mas o livro classifica a indústria de máquinas e equipamentos como o principal setor de bens de produção: ela serve para criar outras indústrias, não para o consumo das famílias.",
      },
      {
        id: "D",
        text: "Porque esses estados passam a ter um superávit na balança comercial com os outros países",
        correct: false,
        explanation:
          "Superávit na balança comercial é quando um país exporta mais do que importa. Tenta porque fala de comprar e vender. Mas ter de comprar máquinas de fora faz gastar mais, não sobrar; além disso, a balança comercial é do país, e o problema citado no livro é a capacidade de gerar indústrias.",
      },
    ],
    tips: [
      "Máquinas e equipamentos = principal setor de bens de produção: sem ele, é difícil criar outras indústrias.",
      "Produto que vem de outro estado paga ICMS no caminho e chega mais caro.",
    ],
  },
];
