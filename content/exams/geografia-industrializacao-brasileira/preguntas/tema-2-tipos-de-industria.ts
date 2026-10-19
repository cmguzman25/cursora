import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: Tipos de indústria (capítulo 10, pp. 106–107).
 *
 * Cubre la clasificación del IBGE (bienes de producción, intermedios y de
 * consumo), qué son los bienes de capital y los insumos, ejemplos de cada tipo,
 * el niobio, de qué dependen las decisiones de inversión y las otras
 * clasificaciones (porte, tecnología, rama, producto final).
 *
 * Ojo: el libro llama "bens de capital" a los bienes intermedios. Las preguntas
 * siguen al libro, porque es lo que se evalúa en la prueba.
 */
export const TEMA_TIPOS_DE_INDUSTRIA: ExamQuestionWithTopic[] = [
  {
    id: "geo-t2-q01",
    topic: "tipos-de-industria",
    prompt:
      "De acordo com o IBGE, o setor industrial pode ser dividido com base nas mercadorias que produz. Quais são os três tipos?",
    options: [
      {
        id: "A",
        text: "Indústria extrativa, indústria de transformação e indústria de construção",
        correct: false,
        explanation:
          "Extrativa e de transformação são classificações pelo ramo de atividade: a extrativa retira recursos da natureza, como a mineração, e a de transformação transforma matéria-prima em outro produto. Tenta porque também é uma classificação de indústrias citada no livro. Mas é um critério diferente: a pergunta é sobre o tipo de mercadoria produzida.",
      },
      {
        id: "B",
        text: "Indústria de porte grande, indústria de porte médio e indústria de porte pequeno",
        correct: false,
        explanation:
          "Classificar pelo porte é separar as indústrias pelo tamanho da empresa: grande, média ou pequena. Tenta porque são três categorias, como pede a pergunta. Mas o porte fala do tamanho de quem produz, e a classificação do IBGE pedida é pelo tipo de mercadoria que sai da fábrica.",
      },
      {
        id: "C",
        text: "Bens de produção, bens intermediários e bens de consumo",
        correct: true,
        explanation:
          "Correta. Pelo critério das mercadorias, o IBGE divide o segmento industrial em três tipos: bens de produção (indústria de base), bens intermediários (que o livro também chama de bens de capital) e bens de consumo.",
      },
      {
        id: "D",
        text: "Produtos duráveis, produtos semiduráveis e produtos não duráveis",
        correct: false,
        explanation:
          "Durável, semidurável e não durável é uma classificação pelas características do produto final, ou seja, por quanto tempo ele dura em uso. Tenta porque também tem três categorias e fala de produtos. Mas é outro critério de classificação, e não o do IBGE baseado no tipo de mercadoria produzida.",
      },
    ],
    tips: [
      "Pelo tipo de mercadoria: produção (base), intermediários (capital) e consumo.",
      "O livro cita vários critérios: mercadoria, porte, tecnologia, ramo e produto final. Leia qual critério a pergunta pede.",
    ],
  },
  {
    id: "geo-t2-q02",
    topic: "tipos-de-industria",
    prompt:
      "Uma siderúrgica transforma minério de ferro em aço, que depois é usado por outras fábricas para montar máquinas e estruturas. Pelo critério do IBGE, que tipo de indústria ela é?",
    options: [
      {
        id: "A",
        text: "Indústria de bens de produção, também chamada de indústria de base",
        correct: true,
        explanation:
          "Correta. A indústria de base produz bens de produção: é indispensável para a constituição de outras indústrias, porque fornece as estruturas e os equipamentos necessários para o parque industrial. O livro cita como exemplos mineradoras, petroquímica, metalúrgica, siderúrgica e indústrias de cimento.",
      },
      {
        id: "B",
        text: "Indústria de bens de consumo, porque o aço acaba chegando às pessoas",
        correct: false,
        explanation:
          "A indústria de bens de consumo é a que produz mercadorias destinadas diretamente às pessoas, como roupas, calçados, remédios e alimentos. Tenta porque, no fim da cadeia, o aço vira objetos que alguém usa. Mas a siderúrgica vende o aço para outras fábricas, não para o consumidor final.",
      },
      {
        id: "C",
        text: "Indústria tradicional, porque usa fornos e uma tecnologia antiga",
        correct: false,
        explanation:
          "Indústria tradicional é uma classificação pelo uso de tecnologia, oposta à indústria de ponta, que usa tecnologias avançadas. Tenta porque fornos de aço parecem algo antigo. Mas é outro critério, e a pergunta pede o critério do IBGE, que é o tipo de mercadoria produzida.",
      },
      {
        id: "D",
        text: "Indústria extrativa, porque trabalha com um recurso retirado da natureza",
        correct: false,
        explanation:
          "A indústria extrativa é a que retira recursos diretamente da natureza, como a extração de minérios. Tenta porque a siderúrgica usa minério de ferro. Mas ela não extrai o minério, ela o transforma em aço; e 'extrativa' é uma classificação por ramo de atividade, não a do IBGE por mercadoria.",
      },
    ],
    tips: [
      "Se o produto serve para construir outras indústrias (aço, cimento, petroquímicos), é indústria de base.",
      "Pergunte sempre: quem compra esse produto? Outra fábrica ou o consumidor final?",
    ],
  },
  {
    id: "geo-t2-q03",
    topic: "tipos-de-industria",
    prompt:
      "As indústrias de bens intermediários produzem mercadorias que são insumos para outras fábricas. O que são insumos?",
    options: [
      {
        id: "A",
        text: "Os produtos prontos que as pessoas compram nas lojas para o seu próprio uso",
        correct: false,
        explanation:
          "Produtos prontos comprados nas lojas para uso próprio são bens de consumo, como roupas, calçados e alimentos. Tenta porque também são mercadorias industriais. Mas o insumo não vai para o consumidor final: ele entra na fabricação de outro produto.",
      },
      {
        id: "B",
        text: "Os impostos que as empresas pagam ao governo estadual sobre as mercadorias",
        correct: false,
        explanation:
          "O imposto estadual sobre mercadorias é o ICMS, a maior fonte de arrecadação dos estados. Tenta porque o imposto também entra no custo de produção. Mas imposto é dinheiro pago ao governo, e insumo é um elemento físico usado para fabricar alguma coisa.",
      },
      {
        id: "C",
        text: "O preço dado a um produto de acordo com a complexidade da sua produção",
        correct: false,
        explanation:
          "Essa é a definição de valor agregado: o preço estipulado para um produto de acordo com sua complexidade de produção. Tenta porque também é um termo econômico do capítulo. Mas valor agregado fala de preço, e insumo fala do que é usado para produzir.",
      },
      {
        id: "D",
        text: "Elementos essenciais para a produção, usados na fabricação de outros produtos",
        correct: true,
        explanation:
          "Correta. É a definição do AZpédia: insumos são elementos essenciais para a produção. As fábricas de bens intermediários fornecem a matéria-prima que a indústria de transformação final vai usar para fazer os bens que chegam ao consumidor, como rolos de tecido que viram roupas.",
      },
    ],
    tips: [
      "Insumo = o que entra na produção. Valor agregado = quanto vale o que sai dela.",
      "Rolo de tecido é insumo da fábrica de roupas; a roupa já é bem de consumo.",
    ],
  },
  {
    id: "geo-t2-q04",
    topic: "tipos-de-industria",
    prompt: "Qual destas listas reúne apenas exemplos de bens intermediários citados pelo livro?",
    options: [
      {
        id: "A",
        text: "Remédios, roupas, calçados, alimentos e bebidas vendidos ao público",
        correct: false,
        explanation:
          "Remédios, roupas, calçados, alimentos e bebidas são os exemplos de bens de consumo do livro: produtos usados pelas pessoas para seu conforto ou sobrevivência. Tenta porque alguns, como o tecido da roupa, lembram insumos. Mas aqui são produtos finais, que vão direto para o consumidor.",
      },
      {
        id: "B",
        text: "Rolos de tecido, motores, reagentes químicos e peças automotivas",
        correct: true,
        explanation:
          "Correta. O livro cita como bens intermediários rolos de tecidos, maquinários, motores, reagentes químicos, peças automotivas e subprodutos do petróleo. Todos servem de insumo para fabricar outros produtos: o tecido vira roupa, a peça vira carro.",
      },
      {
        id: "C",
        text: "Mineradoras, petroquímicas, siderúrgicas e fábricas de cimento",
        correct: false,
        explanation:
          "Mineradoras, petroquímicas, siderúrgicas e fábricas de cimento são os exemplos de indústrias de base, que produzem bens de produção. Tenta porque também abastecem outras fábricas. Mas são o primeiro segmento da classificação, e não o segundo, dos bens intermediários; além disso, a lista traz indústrias, não produtos.",
      },
      {
        id: "D",
        text: "Bauxita, minério de ferro e soja vendidos em estado bruto",
        correct: false,
        explanation:
          "Produtos vendidos em estado bruto, in natura, são retirados da natureza e comercializados sem transformação industrial, como a bauxita extraída no Pará. Tenta porque também são matérias-primas. Mas eles não passaram por uma indústria de bens intermediários: são recursos naturais e agrícolas, de baixo valor agregado.",
      },
    ],
    tips: [
      "Bem intermediário é um produto já fabricado que ainda vai entrar em outra fabricação.",
      "Compare as listas: indústrias (base), peças e materiais (intermediários), produtos de uso pessoal (consumo).",
    ],
  },
  {
    id: "geo-t2-q05",
    topic: "tipos-de-industria",
    prompt:
      "Que matéria-prima ganhou destaque no Brasil nos últimos anos, é usada em ligas de aço para produzir tubulações como gasodutos e oleodutos, e tem no país um dos maiores produtores do mundo?",
    options: [
      {
        id: "A",
        text: "A bauxita, minerada no estado do Pará",
        correct: false,
        explanation:
          "A bauxita é a matéria-prima do alumínio, e o livro mostra que ela é minerada no estado do Pará. Tenta porque também é um minério brasileiro citado no capítulo. Mas o livro a usa como exemplo de produto de baixo valor agregado, não como a matéria-prima das ligas de aço.",
      },
      {
        id: "B",
        text: "O petróleo extraído em águas profundas",
        correct: false,
        explanation:
          "A exploração de petróleo em águas profundas é um dos exemplos notáveis de tecnologia brasileira citados no livro. Tenta porque a pergunta fala de oleodutos, que transportam petróleo. Mas o oleoduto é feito com a liga de aço; o petróleo é o que passa por dentro dele.",
      },
      {
        id: "C",
        text: "O trigo usado pela indústria de pães",
        correct: false,
        explanation:
          "O trigo é a matéria-prima da indústria de pães, e o livro diz que o Brasil precisa importá-lo para atender à demanda nacional. Tenta porque também é matéria-prima. Mas é um produto agrícola, não entra em ligas de aço, e o Brasil depende de compras externas, o oposto de ser grande produtor.",
      },
      {
        id: "D",
        text: "O nióbio",
        correct: true,
        explanation:
          "Correta. O nióbio é a matéria-prima que ganhou destaque no Brasil por sua vasta ocorrência no país. Uma de suas aplicações é em ligas de aço para tubulações, como gasodutos, oleodutos e tubulações de água. Segundo o DNPM, o Brasil é autossuficiente e está entre os maiores produtores do mundo.",
      },
    ],
    tips: [
      "Nióbio: ligas de aço, tubulações, Brasil autossuficiente e entre os maiores produtores.",
      "Autossuficiente quer dizer que o país produz tudo o que precisa daquele produto: é o caso do nióbio, e o oposto do trigo, que o Brasil importa.",
    ],
  },
  {
    id: "geo-t2-q06",
    topic: "tipos-de-industria",
    prompt:
      "Um par de tênis é comprado numa loja e usado por uma pessoa até gastar. Ele não serve para construir outras coisas. Segundo o livro, esse tênis é um exemplo de quê?",
    options: [
      {
        id: "A",
        text: "De bem de capital, porque gerou lucro para a empresa que o fabricou",
        correct: false,
        explanation:
          "Para o livro, bens de capital são bens que servem como matéria-prima para a criação de outros bens ou serviços, como máquinas, equipamentos ou instalações industriais. Tenta pela palavra 'capital', que lembra dinheiro e lucro. Mas o tênis não serve para criar outros bens, e todo produto vendido gera lucro, então isso não define o tipo.",
      },
      {
        id: "B",
        text: "De insumo, porque passou por várias etapas numa linha de montagem",
        correct: false,
        explanation:
          "Insumos são elementos essenciais para a produção, usados na fabricação de outros produtos. Tenta porque o tênis é feito numa linha de montagem. Mas ter sido fabricado em etapas não o torna insumo: insumo é o que entra numa fabricação, e o tênis já é o produto final.",
      },
      {
        id: "C",
        text: "De bem de consumo, destinado ao consumo e ao usufruto das pessoas",
        correct: true,
        explanation:
          "Correta. Bens de consumo têm uma única destinação: o consumo e o usufruto das pessoas. Não servem para construir coisas nem se convertem em outros produtos. O livro cita remédios, roupas, calçados, alimentos e bebidas, usados pelos indivíduos para seu conforto ou sobrevivência.",
      },
      {
        id: "D",
        text: "De produto in natura, vendido sem passar por transformação",
        correct: false,
        explanation:
          "Produto in natura é o retirado da natureza e vendido em estado bruto, como muitos produtos agrícolas e a bauxita. Tenta porque o tênis não é usado para fabricar outra coisa. Mas ele passou por muita transformação numa fábrica; in natura é justamente o que não foi industrializado.",
      },
    ],
    tips: [
      "Se a mercadoria termina nas mãos de quem vai usá-la e não vira outra coisa, é bem de consumo.",
      "O tipo de indústria depende do destino da mercadoria, não de como ela foi fabricada.",
    ],
  },
  {
    id: "geo-t2-q07",
    topic: "tipos-de-industria",
    prompt:
      "O livro diz que, no nosso sistema, qualquer pessoa pode investir na produção de qualquer bem. Do que depende, contudo, a decisão sobre esses investimentos?",
    options: [
      {
        id: "A",
        text: "De uma autorização do governo federal, que escolhe quem pode abrir cada fábrica",
        correct: false,
        explanation:
          "Uma economia em que o governo decide quem pode produzir é uma economia controlada pelo Estado. Tenta porque o livro mostra o Estado intervindo muito na indústria, como na Ditadura. Mas o próprio enunciado diz que qualquer pessoa pode investir: a decisão depende de condições econômicas, não de uma autorização.",
      },
      {
        id: "B",
        text: "Da oferta de matéria-prima, de um mercado consumidor e de mão de obra",
        correct: true,
        explanation:
          "Correta. Segundo o livro, todos os investimentos dependem da oferta de matéria-prima, de mercado consumidor e de mão de obra. Na ausência de qualquer um desses elementos, as chances de uma indústria ter sucesso são muito pequenas.",
      },
      {
        id: "C",
        text: "Do número de patentes já registradas no município onde a fábrica ficará",
        correct: false,
        explanation:
          "Patente é o registro que protege uma invenção, feito no Brasil pelo INPI. Tenta porque o livro mostra que muitas patentes indicam regiões com indústria forte. Mas as patentes são resultado da atividade industrial e de pesquisa, e não a condição que o livro aponta para decidir um investimento.",
      },
      {
        id: "D",
        text: "Da existência de uma zona franca na região, com isenção total de impostos",
        correct: false,
        explanation:
          "Uma zona franca, como a de Manaus, é uma área com isenção de impostos e incentivos fiscais. Tenta porque menos impostos atraem empresas. Mas é um caso específico de política regional; a maioria das indústrias do país está fora de zonas francas, então ela não pode ser a condição geral.",
      },
    ],
    tips: [
      "Matéria-prima, mercado consumidor e mão de obra: faltando um, a indústria dificilmente dá certo.",
      "Uma condição geral precisa valer para quase todas as indústrias, não só para um caso particular.",
    ],
  },
  {
    id: "geo-t2-q08",
    topic: "tipos-de-industria",
    prompt:
      "As indústrias também podem ser classificadas pelas características do produto final. Uma geladeira, que costuma ser usada por muitos anos, recebe qual classificação?",
    options: [
      {
        id: "A",
        text: "Produto durável",
        correct: true,
        explanation:
          "Correta. Pelo critério do produto final, o livro separa produtos duráveis, semiduráveis e não duráveis. Uma geladeira, usada por muitos anos, é um produto durável.",
      },
      {
        id: "B",
        text: "Produto semidurável",
        correct: false,
        explanation:
          "Produto semidurável é o que dura um tempo intermediário e vai se desgastando com o uso, como roupas e calçados. Tenta porque fica entre os extremos e parece uma resposta segura. Mas a geladeira foi feita para durar muitos anos, o que a coloca no grupo dos duráveis.",
      },
      {
        id: "C",
        text: "Produto não durável",
        correct: false,
        explanation:
          "Produto não durável é o que se gasta de uma vez ou em pouco tempo, como alimentos e bebidas. Tenta porque toda mercadoria um dia acaba. Mas o enunciado diz que a geladeira é usada por muitos anos, o oposto de um produto consumido rapidamente.",
      },
      {
        id: "D",
        text: "Produto de ponta",
        correct: false,
        explanation:
          "'De ponta' é uma classificação pelo uso de tecnologia: indústrias de ponta usam tecnologias avançadas, ao contrário das tradicionais. Tenta porque uma geladeira moderna tem tecnologia. Mas a pergunta pede o critério do produto final, que fala de quanto tempo ele dura, não de quanta tecnologia ele tem.",
      },
    ],
    tips: [
      "Critério do produto final = quanto tempo o produto dura: durável, semidurável, não durável.",
      "Quando várias alternativas são da mesma escala, procure a palavra do enunciado que decide (aqui, 'muitos anos').",
    ],
  },
];
