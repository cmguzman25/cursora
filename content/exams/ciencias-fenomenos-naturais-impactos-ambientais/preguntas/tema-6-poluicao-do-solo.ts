import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 6: Poluição e degradação do solo (capítulo 11, pp. 55–57).
 *
 * Cubre para qué sirve el suelo, la contaminación por basura (chorume, lixões,
 * aterros sanitários, residuos industriales y hospitalarios, coleta seletiva y
 * compostagem), por defensivos químicos y fertilizantes, la deforestación, las
 * quemas, la erosión, el assoreamento del recuadro AZpédia, la desertificación,
 * y la minería con la ruptura de las represas de Mariana y Brumadinho.
 */
export const TEMA_POLUICAO_DO_SOLO: ExamQuestionWithTopic[] = [
  {
    id: "cie-t6-q01",
    topic: "poluicao-do-solo",
    prompt: "Por que o livro diz que o solo é tão importante para a natureza e para os seres humanos?",
    options: [
      {
        id: "A",
        text: "Porque sustenta a vegetação, regula a infiltração da chuva, armazena e recicla nutrientes e fornece matérias-primas",
        correct: true,
        explanation:
          "Correta. O livro diz que o solo é o principal substrato para o crescimento da vegetação, regula a infiltração da água das chuvas, possibilita o armazenamento e a ciclagem de nutrientes, e é essencial para as atividades humanas, inclusive fornecendo matérias-primas para a construção civil.",
      },
      {
        id: "B",
        text: "Porque filtra a radiação ultravioleta do Sol antes que ela chegue às plantas e aos animais",
        correct: false,
        explanation:
          "Filtrar a radiação ultravioleta é a função da camada de ozônio, que fica na atmosfera e filtra cerca de 90 % dos raios UV. Parece certa porque também é uma proteção essencial para a vida. Mas o solo fica embaixo dos seres vivos e não tem como filtrar a luz que vem do Sol.",
      },
      {
        id: "C",
        text: "Porque é o único lugar onde se forma o gás carbônico que as plantas usam na fotossíntese",
        correct: false,
        explanation:
          "O gás carbônico que as plantas usam na fotossíntese está no ar, e vem de muitas fontes, como a respiração dos seres vivos e a queima de combustíveis. Parece certa porque o solo é ligado ao crescimento das plantas. Mas o livro não diz que o solo produza o CO2; ele destaca outras funções do solo.",
      },
      {
        id: "D",
        text: "Porque é um recurso que não pode ser degradado, já que se renova sozinho e recupera todos os nutrientes depois de cada chuva",
        correct: false,
        explanation:
          "Essa alternativa imagina o solo como um recurso que não se estraga. Parece certa porque o solo parece existir em quantidade infinita. Mas o livro diz o contrário: apesar da sua importância, o solo tem sido continuamente degradado pelas atividades humanas, e a chuva sobre o solo desprotegido causa erosão.",
      },
    ],
    tips: [
      "Funções do solo: sustentar a vegetação, regular a infiltração, armazenar e reciclar nutrientes, servir às atividades humanas.",
      "O solo é importante e, mesmo assim, é continuamente degradado.",
    ],
  },
  {
    id: "cie-t6-q02",
    topic: "poluicao-do-solo",
    prompt: "O que é o chorume, de acordo com o livro?",
    options: [
      {
        id: "A",
        text: "O nome dos sedimentos que a erosão arranca do solo desprotegido e leva para dentro dos rios, onde acabam obstruindo os seus leitos",
        correct: false,
        explanation:
          "Sedimentos levados pela erosão para dentro dos rios causam o assoreamento, que obstrui os corpos d'água. Parece certa porque também é algo que sai do solo e polui a água. Mas o chorume não é terra: é um líquido que vem da decomposição do lixo.",
      },
      {
        id: "B",
        text: "O adubo produzido pela compostagem do lixo orgânico, usado para melhorar a fertilidade do solo",
        correct: false,
        explanation:
          "A compostagem transforma o lixo orgânico em adubo, e o livro a indica como medida para reduzir a poluição. Parece certa porque os dois saem da decomposição do lixo orgânico. Mas o adubo da compostagem é útil, e o chorume é um resíduo tóxico que contamina o ambiente.",
      },
      {
        id: "C",
        text: "Um gás tóxico, liberado pelas queimadas, que destrói os microrganismos decompositores do solo",
        correct: false,
        explanation:
          "As queimadas realmente destroem os microrganismos decompositores e liberam gases que aumentam o efeito estufa. Parece certa porque mistura dois efeitos reais das queimadas. Mas o chorume não é um gás nem vem do fogo: é um líquido que se forma na decomposição do lixo.",
      },
      {
        id: "D",
        text: "Um resíduo líquido tóxico do lixo orgânico em decomposição, que libera metano e contamina o solo e o lençol freático",
        correct: true,
        explanation:
          "Correta. O livro explica que, na decomposição do lixo orgânico, é produzido um resíduo líquido tóxico, o chorume, que libera gás metano e, ao infiltrar-se, contamina não apenas o terreno, mas também o lençol freático, a água que fica embaixo da terra.",
      },
    ],
    tips: [
      "Chorume: líquido tóxico do lixo orgânico; solta metano e contamina solo e lençol freático.",
      "Lençol freático é a água subterrânea; o chorume chega até ela por infiltração.",
    ],
  },
  {
    id: "cie-t6-q03",
    topic: "poluicao-do-solo",
    prompt: "Qual é a diferença entre um lixão e um aterro sanitário?",
    options: [
      {
        id: "A",
        text: "Não há diferença: os dois são terrenos a céu aberto onde o lixo é jogado sem nenhuma proteção",
        correct: false,
        explanation:
          "Essa alternativa trata os dois locais como iguais. Parece certa porque nos dois o lixo da cidade é depositado no chão. Mas a definição de terreno a céu aberto, sem proteção, é só a do lixão; o aterro sanitário foi justamente criado para proteger o solo e captar os gases.",
      },
      {
        id: "B",
        text: "O lixão não protege o ambiente; o aterro impermeabiliza o solo e capta os gases e o chorume",
        correct: true,
        explanation:
          "Correta. O lixão é um terreno a céu aberto, sem nenhum tipo de proteção ao meio ambiente e à saúde pública. O aterro sanitário é uma maneira mais adequada de descarte: tem impermeabilização do solo para impedir a sua contaminação e viabiliza a captação dos gases liberados e do chorume.",
      },
      {
        id: "C",
        text: "O lixão recebe só lixo hospitalar e industrial, e o aterro recebe só o lixo orgânico das residências",
        correct: false,
        explanation:
          "Essa alternativa separa os dois locais pelo tipo de lixo. Parece certa porque o livro fala de lixos diferentes, como o orgânico, o industrial e o hospitalar. Mas a diferença entre lixão e aterro está na proteção do solo e na captação de gases, e não no tipo de lixo recebido.",
      },
      {
        id: "D",
        text: "O aterro queima todo o lixo para não ocupar espaço, e o lixão o enterra para que não apareça",
        correct: false,
        explanation:
          "Queimar lixo libera gases que poluem o ar e aumentam o efeito estufa. Parece certa porque parece uma forma de 'sumir' com o lixo. Mas o livro não descreve o aterro como um lugar de queima: ele impermeabiliza o solo e capta os gases e o chorume do lixo em decomposição.",
      },
    ],
    tips: [
      "Lixão: céu aberto, sem proteção. Aterro sanitário: solo impermeabilizado e gases captados.",
      "A impermeabilização do aterro existe para segurar o chorume.",
    ],
  },
  {
    id: "cie-t6-q04",
    topic: "poluicao-do-solo",
    prompt:
      "Uma escola quer diminuir a quantidade de lixo que vai poluir o solo. Que medidas o livro cita para reduzir essa poluição e os impactos ambientais?",
    options: [
      {
        id: "A",
        text: "Queimar todo o lixo produzido em um terreno vazio, longe das salas de aula, uma vez por semana",
        correct: false,
        explanation:
          "Queimar lixo é uma forma de queimada: libera gases que pioram a qualidade do ar e aumentam o efeito estufa. Parece certa porque o lixo desaparece da vista. Mas o problema só muda de lugar, do solo para o ar, e o livro não indica essa medida.",
      },
      {
        id: "B",
        text: "Enterrar o lixo no pátio da escola, para que ele se decomponha embaixo da terra sem cheiro",
        correct: false,
        explanation:
          "Enterrar o lixo sem proteção faz o chorume, formado na decomposição, infiltrar-se no solo e chegar ao lençol freático. Parece certa porque esconde o lixo e o cheiro. Mas é justamente a contaminação que o aterro sanitário evita ao impermeabilizar o solo.",
      },
      {
        id: "C",
        text: "Misturar o lixo orgânico com o reciclável, para que todo o lixo seja levado de uma vez ao lixão",
        correct: false,
        explanation:
          "Misturar os tipos de lixo é o contrário da coleta seletiva, que os separa. Parece certa porque parece mais simples recolher tudo junto. Mas assim nada é reciclado nem compostado, e tudo vai para o lixão, que o livro descreve como um terreno a céu aberto, sem proteção.",
      },
      {
        id: "D",
        text: "Fazer a coleta seletiva para a reciclagem e a compostagem do lixo orgânico",
        correct: true,
        explanation:
          "Correta. O livro cita a coleta seletiva para reciclagem e a compostagem do lixo orgânico como medidas que reduzem a poluição dos solos e os impactos ambientais. A coleta seletiva separa o que pode ser reciclado, e a compostagem transforma o lixo orgânico em adubo.",
      },
    ],
    tips: [
      "Medidas do livro para o lixo: coleta seletiva, reciclagem, compostagem e aterros sanitários.",
      "Lixo industrial e hospitalar pode ter metais tóxicos e produtos químicos de alto risco.",
    ],
  },
  {
    id: "cie-t6-q05",
    topic: "poluicao-do-solo",
    prompt:
      "Um agricultor passou a usar defensivos químicos e fertilizantes em grande quantidade, sem controle. O que o livro diz sobre esse uso?",
    options: [
      {
        id: "A",
        text: "Traz benefícios à agricultura, mas em excesso degrada o solo, reduz a fertilidade e contamina água e ar",
        correct: true,
        explanation:
          "Correta. O livro diz que defensivos químicos e fertilizantes trazem certos benefícios à agricultura, mas fazem muito mal à saúde humana e de outros seres vivos, podem contaminar a água e o ar, e, usados em excesso e de maneira inadequada, levam à degradação do solo e à redução da sua fertilidade.",
      },
      {
        id: "B",
        text: "Só traz benefícios, porque os fertilizantes devolvem ao solo todos os nutrientes perdidos",
        correct: false,
        explanation:
          "Fertilizantes são produtos que acrescentam nutrientes ao solo para as plantas crescerem melhor. Parece certa porque essa é justamente a função deles. Mas o livro diz que, em excesso, eles degradam o solo e reduzem a sua fertilidade, além de fazerem mal à saúde.",
      },
      {
        id: "C",
        text: "Prejudica apenas o agricultor que aplica o produto, porque o efeito não sai da plantação",
        correct: false,
        explanation:
          "Essa alternativa imagina que o dano dos defensivos ficaria preso à plantação. Parece certa porque a foto do livro mostra trabalhadores com roupas de proteção aplicando o produto. Mas o livro diz que esses produtos podem contaminar a água e o ar, atingindo também outros seres vivos, como as abelhas.",
      },
      {
        id: "D",
        text: "Causa a erosão do solo, porque os produtos químicos dissolvem as rochas e abrem grandes crateras",
        correct: false,
        explanation:
          "A erosão é o desgaste, transporte e sedimentação de solos e rochas pela chuva e pelo vento, intensificado pela retirada da vegetação. Parece certa porque também é uma forma de degradação do solo. Mas o livro não diz que os defensivos dissolvem rochas; ele liga o excesso deles à perda de fertilidade.",
      },
    ],
    tips: [
      "Defensivos e fertilizantes: ajudam a agricultura, mas em excesso degradam o solo e contaminam água e ar.",
      "O uso descontrolado de defensivos também é a principal causa do declínio das abelhas.",
    ],
  },
  {
    id: "cie-t6-q06",
    topic: "poluicao-do-solo",
    prompt: "Quais consequências do desmatamento o livro apresenta?",
    options: [
      {
        id: "A",
        text: "O aumento da biodiversidade, porque as áreas abertas recebem espécies novas vindas de outros lugares",
        correct: false,
        explanation:
          "Biodiversidade é a variedade de seres vivos de um lugar. Parece certa porque espécies novas podem chegar a uma área aberta. Mas o livro diz o contrário: o desmatamento reduz a biodiversidade, e espécies vindas de fora podem ser exóticas e desequilibrar o ambiente.",
      },
      {
        id: "B",
        text: "A redução do efeito estufa, porque sem árvores há menos folhas soltando gás carbônico no ar",
        correct: false,
        explanation:
          "Essa alternativa imagina que as árvores seriam fontes de gás carbônico. Parece certa porque as plantas também respiram. Mas o livro diz que plantas absorvem CO2 na fotossíntese, e que o desmatamento intensifica o efeito estufa em vez de reduzi-lo.",
      },
      {
        id: "C",
        text: "Menos fotossíntese e biodiversidade, solo desprotegido, erosão, desertificação e efeito estufa intensificado",
        correct: true,
        explanation:
          "Correta. O livro diz que o desmatamento diminui a produtividade dos ecossistemas, pela redução da fotossíntese e da biodiversidade, e deixa o solo desprotegido, levando-o à erosão e à desertificação, alterando o ciclo da água e intensificando o efeito estufa.",
      },
      {
        id: "D",
        text: "O aumento da fertilidade do solo, porque as cinzas e os galhos das árvores derrubadas viram adubo",
        correct: false,
        explanation:
          "Adubo é matéria que acrescenta nutrientes ao solo, como o produzido na compostagem. Parece certa porque restos de plantas realmente podem virar adubo. Mas o livro diz que o desmatamento e as queimadas deixam o solo mais pobre em nutrientes e sujeito à erosão.",
      },
    ],
    tips: [
      "Desmatamento: menos fotossíntese, menos biodiversidade, solo exposto, erosão, desertificação, ciclo da água alterado, mais efeito estufa.",
      "Árvores absorvem CO2; derrubá-las aumenta o CO2 no ar.",
    ],
  },
  {
    id: "cie-t6-q07",
    topic: "poluicao-do-solo",
    prompt:
      "Depois de uma queimada, o solo de uma área ficou mais pobre em nutrientes. Que explicação o livro dá para isso?",
    options: [
      {
        id: "A",
        text: "O fogo faz a chuva ficar ácida naquela área, e a chuva ácida retira os nutrientes do solo",
        correct: false,
        explanation:
          "A chuva ácida é a precipitação com pH abaixo de 5,6, causada por óxidos de enxofre e de nitrogênio, e também empobrece o solo. Parece certa porque o efeito final é o mesmo. Mas o livro explica o empobrecimento pelas queimadas de outro jeito: pela morte dos microrganismos decompositores.",
      },
      {
        id: "B",
        text: "As cinzas formam uma camada escura que impede a entrada de luz no solo, como a floração das algas faz na superfície da água",
        correct: false,
        explanation:
          "A floração é a camada de algas que se forma na superfície da água na eutrofização e impede a entrada de luz. Parece certa porque as cinzas também cobrem a superfície. Mas o livro não fala de bloqueio de luz no solo; o problema das queimadas está nos decompositores destruídos.",
      },
      {
        id: "C",
        text: "O fogo derrete as rochas do solo, que endurecem e deixam de absorver a água das chuvas",
        correct: false,
        explanation:
          "Essa alternativa imagina o fogo derretendo rochas. Parece certa porque o solo realmente fica mais duro e exposto depois do fogo. Mas uma queimada não chega a derreter rochas; o livro liga o empobrecimento do solo à destruição dos microrganismos que reciclam os nutrientes.",
      },
      {
        id: "D",
        text: "O fogo destrói os microrganismos decompositores, que reciclam os nutrientes, e afeta os ciclos biogeoquímicos",
        correct: true,
        explanation:
          "Correta. O livro diz que as queimadas destroem os microrganismos decompositores que vivem no solo e são responsáveis pela reciclagem de nutrientes, impactando os ciclos biogeoquímicos. Com isso, o solo fica mais pobre em nutrientes e sujeito à erosão.",
      },
    ],
    tips: [
      "Queimadas matam os decompositores do solo, que reciclam nutrientes: o solo empobrece.",
      "As queimadas também liberam gases do efeito estufa e podem se alastrar para áreas de preservação.",
    ],
  },
  {
    id: "cie-t6-q08",
    topic: "poluicao-do-solo",
    prompt: "O que é a erosão, e como os seres humanos a intensificam?",
    options: [
      {
        id: "A",
        text: "É o desgaste natural de solos e rochas por chuvas e ventos, intensificado pela retirada da vegetação",
        correct: true,
        explanation:
          "Correta. O livro define a erosão como o processo natural de desgaste, transporte e sedimentação de solos e rochas, por meio de chuvas e ventos. As atividades humanas a intensificam com o desmatamento e as queimadas, o uso inadequado de máquinas agrícolas e as ocupações desordenadas em encostas e margens de rios.",
      },
      {
        id: "B",
        text: "É a transformação de uma paisagem em deserto, causada só pela falta de chuva ao longo dos anos",
        correct: false,
        explanation:
          "A transformação de uma paisagem em deserto é a desertificação. Parece certa porque as duas aparecem juntas na mesma seção do livro, e a erosão é uma das causas dela. Mas a erosão é o desgaste do solo e das rochas, e a desertificação não é causada só pela falta de chuva: o livro cita desmatamento, agropecuária e mineração.",
      },
      {
        id: "C",
        text: "É a contaminação do solo pelo chorume do lixo, que se infiltra na terra e chega ao lençol freático",
        correct: false,
        explanation:
          "O chorume é o líquido tóxico que se forma na decomposição do lixo orgânico. Parece certa porque também é uma forma de degradação do solo. Mas o chorume contamina o solo com substâncias tóxicas, enquanto a erosão desgasta e transporta o próprio solo.",
      },
      {
        id: "D",
        text: "É o acúmulo de sedimentos dentro de rios e lagos, que vão ficando rasos ao longo do tempo",
        correct: false,
        explanation:
          "O acúmulo de sedimentos nos corpos d'água é o assoreamento. Parece certa porque o livro diz que a erosão provoca o assoreamento: uma é causa da outra. Mas a erosão acontece no solo, que é desgastado e transportado; o assoreamento é o que acontece quando esse material chega à água.",
      },
    ],
    tips: [
      "Erosão é natural, mas é intensificada por desmatamento, queimadas, máquinas agrícolas e ocupação de encostas e margens de rios.",
      "Erosão no solo → assoreamento na água. Uma causa a outra.",
    ],
  },
  {
    id: "cie-t6-q09",
    topic: "poluicao-do-solo",
    prompt:
      "No quadro AZpédia, o livro explica o assoreamento. Por que ele leva à morte de organismos aquáticos?",
    options: [
      {
        id: "A",
        text: "Porque os sedimentos liberam metais tóxicos que se acumulam no corpo dos peixes",
        correct: false,
        explanation:
          "Metais tóxicos, como o mercúrio, se acumulam nos tecidos dos seres vivos na bioacumulação. Parece certa porque também mata organismos aquáticos. Mas os metais vêm de indústrias e da mineração; o livro explica a morte no assoreamento pela falta de luz e de oxigênio.",
      },
      {
        id: "B",
        text: "Porque os sedimentos reduzem a entrada de luz, dificultam a fotossíntese e diminuem o oxigênio da água",
        correct: true,
        explanation:
          "Correta. O AZpédia define o assoreamento como o acúmulo de sedimentos nos ecossistemas aquáticos, que obstrui os corpos d'água e destrói esses ambientes: reduz a entrada de luz, dificulta a fotossíntese e diminui a oxigenação da água, levando à morte dos organismos aquáticos.",
      },
      {
        id: "C",
        text: "Porque a água fica com pH abaixo de 5,6 e se torna ácida demais para os peixes e as plantas que vivem nela",
        correct: false,
        explanation:
          "Água com pH abaixo de 5,6 é a consequência da chuva ácida nos ambientes aquáticos. Parece certa porque a chuva ácida também faz os ambientes aquáticos perderem biodiversidade. Mas o assoreamento não muda a acidez: é a terra acumulada que bloqueia a luz e reduz o oxigênio.",
      },
      {
        id: "D",
        text: "Porque os sedimentos esquentam a água do rio, como faz o aquecimento global nos oceanos",
        correct: false,
        explanation:
          "O aquecimento global é o aumento anormal das temperaturas médias do planeta, que deixa os oceanos mais ácidos e reduz os recifes e os corais. Parece certa porque também prejudica ambientes aquáticos. Mas o livro não diz que os sedimentos esquentam a água; o problema é a luz e o oxigênio.",
      },
    ],
    tips: [
      "Assoreamento: sedimentos na água → menos luz → menos fotossíntese → menos oxigênio → morte.",
      "Falta de luz e de oxigênio também mata na eutrofização; o que muda é a causa (algas ou sedimentos).",
    ],
  },
  {
    id: "cie-t6-q10",
    topic: "poluicao-do-solo",
    prompt:
      "O livro mostra uma área da China que está sofrendo desertificação. O que é esse processo?",
    options: [
      {
        id: "A",
        text: "A formação de crateras no solo pela ação das chuvas fortes sobre terrenos sem vegetação",
        correct: false,
        explanation:
          "Crateras abertas pela chuva em solo sem vegetação são um resultado da erosão, como na foto do processo erosivo do livro. Parece certa porque a erosão aparece junto da desertificação e é uma das suas causas. Mas a desertificação é a transformação da paisagem toda em algo parecido com um deserto, e não só a formação de crateras.",
      },
      {
        id: "B",
        text: "O derretimento de grandes áreas de gelo, que deixam o solo exposto, seco, sem nutrientes e coberto apenas de pedras",
        correct: false,
        explanation:
          "O derretimento do gelo das calotas polares é uma consequência do aquecimento global, que eleva o nível dos oceanos. Parece certa porque também é uma mudança enorme na paisagem. Mas a desertificação é a transformação de solos produtivos em áreas secas, e não tem a ver com o gelo.",
      },
      {
        id: "C",
        text: "A transformação de uma paisagem em área improdutiva e seca, que vai ficando parecida com um deserto",
        correct: true,
        explanation:
          "Correta. A desertificação é o processo que leva à improdutividade dos solos e à intensificação de áreas secas, transformando o ambiente em um deserto. É causada por desmatamento, expansão agropecuária, mineração e uso inapropriado do solo; sem vegetação, as chuvas cessam e o solo se torna árido.",
      },
      {
        id: "D",
        text: "O acúmulo de areia trazida pelo vento nos rios e lagos, que acabam secando com o tempo",
        correct: false,
        explanation:
          "O acúmulo de sedimentos em rios e lagos é o assoreamento, que obstrui os corpos d'água. Parece certa porque a areia e a seca lembram um deserto. Mas o assoreamento acontece na água, e a desertificação é a transformação do solo e da paisagem em área árida.",
      },
    ],
    tips: [
      "Desertificação: solo improdutivo, área seca, paisagem parecida com um deserto.",
      "Causas: desmatamento, agropecuária, mineração e uso inapropriado do solo. Sem vegetação, as chuvas cessam.",
    ],
  },
  {
    id: "cie-t6-q11",
    topic: "poluicao-do-solo",
    prompt:
      "Em 2015 e em 2019, barragens de mineração se romperam em Mariana e em Brumadinho, em Minas Gerais. O que essas barragens guardavam, e que impactos o rompimento causou?",
    options: [
      {
        id: "A",
        text: "Água para abastecer as cidades; o rompimento só causou falta de água nas torneiras da população que vivia na região",
        correct: false,
        explanation:
          "Barragens de abastecimento guardam água para o consumo das cidades. Parece certa porque 'barragem' costuma lembrar represa de água. Mas as barragens de Mariana e Brumadinho eram de contenção de rejeitos da mineração, e o rompimento espalhou lama, não apenas água.",
      },
      {
        id: "B",
        text: "Petróleo extraído do subsolo; o rompimento cobriu os rios com uma mancha negra de óleo",
        correct: false,
        explanation:
          "A mancha negra de óleo é o efeito do derramamento de petróleo, causado por vazamentos de jazidas, navios e plataformas. Parece certa porque, nos dois casos, um material cobre a água e impede a fotossíntese. Mas as barragens de Minas Gerais guardavam rejeitos de minério, e o que se espalhou foi lama.",
      },
      {
        id: "C",
        text: "Lixo das cidades próximas; o rompimento espalhou chorume pelo solo e pelo lençol freático",
        correct: false,
        explanation:
          "O chorume é o líquido tóxico do lixo orgânico em decomposição, que o aterro sanitário procura conter. Parece certa porque os dois são resíduos guardados para não contaminar o ambiente. Mas as barragens de Mariana e Brumadinho não guardavam lixo urbano: guardavam rejeitos da mineração.",
      },
      {
        id: "D",
        text: "Rejeitos da mineração; a lama cobriu o solo, deixou os rios turvos e tirou casas e trabalho das pessoas",
        correct: true,
        explanation:
          "Correta. As barragens guardavam rejeitos, as rochas e os minerais separados do minério por não terem utilidade econômica. A lama atingiu florestas, rios, mares e cidades; o solo ficou compactado, os rios turvos reduziram a fotossíntese do fitoplâncton e mataram animais, e a população perdeu casas e ficou impedida de plantar e pescar.",
      },
    ],
    tips: [
      "Rejeitos: rochas e minerais sem valor econômico, separados do minério e guardados em barragens.",
      "Mariana (2015) e Brumadinho (2019), em Minas Gerais: impactos ambientais, sociais e econômicos.",
    ],
  },
];
