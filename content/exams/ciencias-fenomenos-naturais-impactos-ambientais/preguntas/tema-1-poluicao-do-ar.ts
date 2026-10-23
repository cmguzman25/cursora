import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: Poluição ambiental e poluição do ar (capítulo 11, pp. 48–49).
 *
 * Cubre la apertura del capítulo (cómo los seres humanos transforman el paisaje),
 * la definición de poluição ambiental, qué es la poluição do ar, qué formas toman
 * los poluentes (gases, sólidos, energía) y la diferencia entre causas naturales
 * y antrópicas.
 */
export const TEMA_POLUICAO_DO_AR: ExamQuestionWithTopic[] = [
  {
    id: "cie-t1-q01",
    topic: "poluicao-do-ar",
    prompt: "Segundo o livro, o que é considerado poluição ambiental?",
    options: [
      {
        id: "A",
        text: "A introdução direta ou indireta de substâncias ou energia no ambiente que provoque algum efeito prejudicial à vida",
        correct: true,
        explanation:
          "Correta. É a definição do livro: qualquer substância ou energia colocada no ambiente, de forma direta ou indireta, que cause algum efeito prejudicial à vida. Repare que 'energia' entra na definição: por isso ruído e luz em excesso também são poluição.",
      },
      {
        id: "B",
        text: "Somente o lançamento de lixo sólido e de esgoto doméstico nos rios, nos mares e nos terrenos a céu aberto, sem nenhuma proteção",
        correct: false,
        explanation:
          "Lixo e esgoto lançados no ambiente são exemplos de poluição da água e do solo, que o capítulo estuda mais adiante. Tenta porque são os exemplos mais visíveis de poluição. Mas a definição é bem mais ampla: inclui gases no ar e até energia, como o barulho e a luz artificial, e não só lixo e esgoto.",
      },
      {
        id: "C",
        text: "Qualquer transformação da paisagem natural feita pelos seres humanos, mesmo que não prejudique a vida",
        correct: false,
        explanation:
          "Transformar a paisagem natural é o que os seres humanos fazem há muito tempo, construindo cidades, lavouras e hidrelétricas, como conta a abertura do capítulo. Tenta porque essas transformações costumam gerar poluição. Mas a definição de poluição exige um efeito prejudicial à vida; sem esse efeito, a mudança na paisagem sozinha não é poluição.",
      },
      {
        id: "D",
        text: "Apenas a liberação de gases tóxicos pelas indústrias e pelos automóveis na atmosfera das cidades",
        correct: false,
        explanation:
          "Gases soltos por indústrias e automóveis são poluição do ar de origem antrópica, um dos tipos de poluição do capítulo. Tenta porque é o exemplo clássico, o da foto da cidade coberta de fumaça. Mas é só um tipo: a poluição ambiental inclui também a da água, a do solo, a sonora, a visual e a luminosa.",
      },
    ],
    tips: [
      "Na definição de poluição entram substâncias e também energia; guarde isso para a poluição sonora e luminosa.",
      "Sem efeito prejudicial à vida não há poluição: esse é o critério da definição.",
    ],
  },
  {
    id: "cie-t1-q02",
    topic: "poluicao-do-ar",
    prompt:
      "Uma erupção vulcânica lança cinzas e gases na atmosfera. Como o livro classifica esse tipo de poluição do ar?",
    options: [
      {
        id: "A",
        text: "Antrópica, porque todo poluente da atmosfera acaba prejudicando os seres humanos de alguma forma",
        correct: false,
        explanation:
          "Antrópica é a poluição causada pelos seres humanos, como queimadas provocadas, automóveis, indústrias e usinas termoelétricas. Tenta porque a palavra lembra 'humano' e os poluentes do vulcão também fazem mal às pessoas. Mas a classificação depende de quem causa a poluição, não de quem ela atinge: o vulcão não é uma atividade humana.",
      },
      {
        id: "B",
        text: "Luminosa, porque a erupção produz muita luz e calor que alteram o ambiente ao redor do vulcão",
        correct: false,
        explanation:
          "Poluição luminosa é o excesso de luzes artificiais, como a iluminação das cidades à noite, que desorienta animais. Tenta porque a lava brilha. Mas a luminosa é de luz artificial, e o que o vulcão lança na atmosfera são gases e partículas, o que faz dela poluição do ar.",
      },
      {
        id: "C",
        text: "Natural, porque a atividade vulcânica é um fenômeno da natureza e não depende da ação humana",
        correct: true,
        explanation:
          "Correta. O livro cita a atividade vulcânica entre as causas naturais da poluição do ar, junto com o processo digestivo de alguns animais, a queimada natural e a tempestade de areia nos desertos. É natural porque acontece sem ação humana.",
      },
      {
        id: "D",
        text: "Não é poluição, porque só se considera poluição o que é lançado pelas atividades humanas",
        correct: false,
        explanation:
          "Essa alternativa aplica a ideia de que poluição seria sempre culpa humana. Tenta porque quase todos os exemplos do capítulo são de atividades humanas. Mas o livro diz que a poluição do ar pode ser natural ou antrópica, e coloca o vulcão justamente entre as causas naturais.",
      },
    ],
    tips: [
      "Natural ou antrópica depende de quem causa, não de quem sofre a poluição.",
      "Causas naturais do livro: digestão de alguns animais, vulcões, queimada natural e tempestade de areia.",
    ],
  },
  {
    id: "cie-t1-q03",
    topic: "poluicao-do-ar",
    prompt:
      "Qual das fontes abaixo o livro coloca entre as causas antrópicas da poluição do ar?",
    options: [
      {
        id: "A",
        text: "A tempestade de areia nos desertos, que espalha poeira por grandes distâncias na atmosfera",
        correct: false,
        explanation:
          "A tempestade de areia é o vento forte que levanta e carrega a areia dos desertos. Tenta porque espalha muita poeira, que é um poluente sólido. Mas acontece sem ação humana: o livro a lista entre as causas naturais da poluição do ar.",
      },
      {
        id: "B",
        text: "As usinas termoelétricas, que produzem eletricidade queimando combustíveis e soltam poluentes",
        correct: true,
        explanation:
          "Correta. Usinas termoelétricas geram energia queimando combustíveis, e o livro as coloca entre as causas antrópicas, junto com as queimadas, os automóveis e as indústrias. Antrópica quer dizer causada pelo ser humano.",
      },
      {
        id: "C",
        text: "O processo digestivo de alguns animais, que libera gases como o metano para a atmosfera",
        correct: false,
        explanation:
          "O processo digestivo de alguns animais, como os ruminantes, solta gases como o metano. Tenta porque é um gás que também esquenta o planeta e porque muitos desses animais são criados pelas pessoas. Mas o livro coloca a digestão dos animais entre as causas naturais da poluição do ar.",
      },
      {
        id: "D",
        text: "A atividade vulcânica, que lança cinzas, gases e poeira em grande quantidade na atmosfera",
        correct: false,
        explanation:
          "A atividade vulcânica é a erupção de vulcões, que solta cinzas e gases. Tenta porque lança uma quantidade enorme de poluentes de uma vez. Mas é um fenômeno da natureza, sem participação humana, e por isso é causa natural, não antrópica.",
      },
    ],
    tips: [
      "Causas antrópicas do livro: queimadas, automóveis, indústrias e usinas termoelétricas.",
      "Se a fonte existiria mesmo sem nenhum ser humano no planeta, ela é natural.",
    ],
  },
  {
    id: "cie-t1-q04",
    topic: "poluicao-do-ar",
    prompt:
      "Os poluentes do ar podem aparecer em formas diferentes. Em que forma o livro coloca a radiação emitida por elementos radioativos?",
    options: [
      {
        id: "A",
        text: "Na forma de gases, junto com o gás carbônico e o metano soltos pelas fábricas",
        correct: false,
        explanation:
          "Gases são poluentes como o gás carbônico e o metano, substâncias que se misturam ao ar. Tenta porque é a forma de poluente mais lembrada. Mas a radiação não é uma substância que se mistura ao ar: é energia, e o livro a coloca nessa forma.",
      },
      {
        id: "B",
        text: "Na forma de sólidos, junto com a poeira, os vírus, os fungos e as bactérias",
        correct: false,
        explanation:
          "Os sólidos são as partículas que ficam suspensas no ar: o livro cita poeira, vírus, fungos e bactérias. Tenta porque os elementos radioativos são materiais sólidos. Mas o poluente aqui não é o material, e sim a radiação que ele emite, que o livro classifica como energia.",
      },
      {
        id: "C",
        text: "Na forma de líquidos, junto com o chorume que escorre do lixo e solta gases que chegam ao ar",
        correct: false,
        explanation:
          "O chorume é o líquido tóxico formado na decomposição do lixo orgânico, estudado na poluição do solo. Tenta porque solta gás metano. Mas o livro não fala em poluentes líquidos do ar: as formas que ele dá são gases, sólidos e energia, e a radiação é energia.",
      },
      {
        id: "D",
        text: "Na forma de energia, porque a radiação não é uma substância, mas energia emitida",
        correct: true,
        explanation:
          "Correta. O livro diz que os poluentes podem estar na forma de gases, de sólidos (poeira, vírus, fungos e bactérias) e até mesmo de energia, como a radiação emitida por elementos radioativos.",
      },
    ],
    tips: [
      "Três formas de poluente do ar: gases, sólidos e energia.",
      "Vírus, fungos e bactérias no ar entram como sólidos, não como gases.",
    ],
  },
  {
    id: "cie-t1-q05",
    topic: "poluicao-do-ar",
    prompt:
      "Em uma cidade, o ar fica cheio de poeira e microrganismos como fungos e bactérias. Segundo o livro, isso é poluição do ar?",
    options: [
      {
        id: "A",
        text: "Não, porque só gases como o gás carbônico e o metano contam como poluentes do ar",
        correct: false,
        explanation:
          "Essa alternativa aplica a ideia de que poluição do ar seria só gás. Tenta porque os gases são os poluentes mais citados no capítulo, no efeito estufa e na chuva ácida. Mas o livro inclui também os sólidos, como poeira e microrganismos, e até a energia.",
      },
      {
        id: "B",
        text: "Não, porque fungos e bactérias são seres vivos e, por isso, sempre fazem parte do ambiente natural da cidade",
        correct: false,
        explanation:
          "Fungos e bactérias são seres vivos microscópicos que existem naturalmente no ambiente. Tenta porque parece estranho chamar um ser vivo de poluente. Mas, quando estão no ar em quantidade que prejudica a saúde, o livro os coloca entre os poluentes sólidos do ar.",
      },
      {
        id: "C",
        text: "Sim, porque poeira, fungos e bactérias são poluentes sólidos que o livro coloca entre os do ar",
        correct: true,
        explanation:
          "Correta. O livro diz que os poluentes do ar podem estar na forma de sólidos, como poeira, vírus, fungos e bactérias. Se eles prejudicam o ambiente e a saúde, contam como poluição do ar.",
      },
      {
        id: "D",
        text: "Sim, mas é poluição do solo, porque a poeira vem da terra e depois volta a cair sobre ela",
        correct: false,
        explanation:
          "Poluição do solo é a contaminação e a degradação da terra, por lixo, defensivos químicos ou desmatamento. Tenta porque a poeira tem origem no chão. Mas o que importa é onde o poluente está causando o problema: suspensa no ar, a poeira é poluição do ar.",
      },
    ],
    tips: [
      "Poeira e microrganismos no ar são poluentes sólidos da atmosfera.",
      "O tipo de poluição depende de onde o poluente está fazendo o estrago.",
    ],
  },
  {
    id: "cie-t1-q06",
    topic: "poluicao-do-ar",
    prompt:
      "A abertura do capítulo explica por que os seres humanos retiram tantos recursos da natureza. Qual é o motivo apresentado?",
    options: [
      {
        id: "A",
        text: "Produzir bens de consumo para suprir as necessidades de uma população mundial de 7,7 bilhões",
        correct: true,
        explanation:
          "Correta. O livro conta que o crescimento populacional e as tecnologias aumentaram a demanda, e que, para produzir bens de consumo para 7,7 bilhões de habitantes, retiramos uma quantidade enorme de recursos da natureza, degradando os ecossistemas.",
      },
      {
        id: "B",
        text: "Recuperar as áreas desmatadas, plantando árvores nas regiões que antes tinham lavouras",
        correct: false,
        explanation:
          "Recuperar áreas desmatadas é reflorestar, uma medida para reduzir os impactos ambientais. Tenta porque também mexe com a paisagem. Mas é o contrário do que o texto descreve: a abertura fala de matas e florestas transformadas em cidades e lavouras, não de áreas sendo recuperadas.",
      },
      {
        id: "C",
        text: "Combater o aquecimento global, trocando os combustíveis fósseis pelas energias renováveis",
        correct: false,
        explanation:
          "Trocar combustíveis fósseis por energias renováveis, como a solar e a eólica, é uma das medidas que o livro propõe para reduzir o aquecimento global. Tenta porque é assunto do mesmo capítulo. Mas é uma solução para os impactos, e não o motivo pelo qual tantos recursos são retirados da natureza.",
      },
      {
        id: "D",
        text: "Proteger as poucas áreas ainda intocadas, separando-as das cidades e das fábricas",
        correct: false,
        explanation:
          "Áreas intocadas são lugares onde a natureza ainda não foi alterada pelas pessoas; o livro diz que restam poucas. Tenta porque a expressão aparece logo no início do texto. Mas o livro cita essas áreas para mostrar quanto a paisagem já foi transformada, não como motivo para retirar recursos.",
      },
    ],
    tips: [
      "Mais gente e mais tecnologia, mais demanda por recursos: é a ideia que abre o capítulo.",
      "Uma medida de solução nunca é a causa do problema; confira de que lado do texto a alternativa está.",
    ],
  },
  {
    id: "cie-t1-q07",
    topic: "poluicao-do-ar",
    prompt:
      "Uma fazenda queima restos da colheita para limpar o terreno. Que tipo de causa de poluição do ar é essa?",
    options: [
      {
        id: "A",
        text: "Natural, porque o fogo é um fenômeno da natureza que também acontece sozinho nas matas secas",
        correct: false,
        explanation:
          "A queimada natural é o fogo que começa sem ação humana, por exemplo com um raio em vegetação seca, e o livro a coloca entre as causas naturais. Tenta porque o fogo é o mesmo. Mas aqui quem acendeu o fogo foi o agricultor: queimada provocada por pessoas é causa antrópica.",
      },
      {
        id: "B",
        text: "Sonora, porque o fogo das queimadas faz barulho e espanta os animais que vivem na região",
        correct: false,
        explanation:
          "Poluição sonora é o excesso de ruído, como o de automóveis, obras e fábricas, que pode levar à surdez, à irritabilidade e à neurose. Tenta porque o fogo assusta os animais. Mas o principal poluente de uma queimada é a fumaça, com gases e partículas lançados no ar, e não o barulho.",
      },
      {
        id: "C",
        text: "Visual, porque a fumaça escura da queimada deixa a paisagem feia e atrapalha a vista",
        correct: false,
        explanation:
          "Poluição visual é o excesso de informações e objetos na paisagem urbana, como outdoors, cartazes, placas e fios. Tenta porque a fumaça realmente se vê de longe. Mas a fumaça é feita de gases e partículas que vão para a atmosfera e fazem mal à saúde, o que a torna poluição do ar.",
      },
      {
        id: "D",
        text: "Antrópica, porque a queimada foi provocada pelas pessoas para preparar o terreno",
        correct: true,
        explanation:
          "Correta. O livro coloca as queimadas entre as causas antrópicas da poluição do ar. Antrópica quer dizer causada pela ação humana: aqui foi o agricultor quem colocou fogo. A queimada só é natural quando começa sem participação humana.",
      },
    ],
    tips: [
      "A queimada aparece nos dois lados: natural se começa sozinha, antrópica se foi provocada.",
      "Fumaça é gás e partícula na atmosfera: é poluição do ar, não visual.",
    ],
  },
];
