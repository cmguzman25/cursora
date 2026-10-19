import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: Colombo e a conquista dos povos nativos (capítulo 9, pp. 158–163;
 * páginas 4 e 5 da guia).
 *
 * Cubre por qué la Corona española apoyó a Colón, el acuerdo que firmó con él,
 * qué creía haber encontrado, cómo Balboa reveló el continente nuevo, el término
 * "indígena", la caída de la población nativa, las reacciones indígenas, el mito
 * de El Dorado y por qué España venció.
 */
export const TEMA_COLOMBO_E_CONQUISTA: ExamQuestionWithTopic[] = [
  {
    id: "hist-t1-q01",
    topic: "colombo-e-conquista",
    prompt:
      "No fim do século XV, a Espanha decidiu financiar a viagem de Cristóvão Colombo rumo ao oeste. Qual era o principal motivo?",
    options: [
      {
        id: "A",
        text: "Portugal já dominava a rota pela costa africana, e a Espanha queria outro caminho até as especiarias da Ásia",
        correct: true,
        explanation:
          "Correta. Portugal controlava o caminho pela costa da África desde o fim do século XV. Para chegar ao mercado asiático de especiarias sem depender dessa rota, a Espanha apostou num caminho diferente: navegar para o oeste, como Colombo propunha.",
      },
      {
        id: "B",
        text: "Os reis espanhóis já sabiam que havia muito ouro na América e queriam chegar antes dos portugueses",
        correct: false,
        explanation:
          "O ouro americano foi o grande motor da colonização espanhola, mas só depois de 1492: foi em Cuba, já na primeira viagem, que os espanhóis viram ouro nos adornos dos nativos. Tenta porque o ouro aparece em todo o capítulo. Mas antes da viagem ninguém na Europa sabia que a América existia, então ninguém podia saber do seu ouro.",
      },
      {
        id: "C",
        text: "O Tratado de Tordesilhas obrigava a Espanha a explorar as terras que ficavam a oeste da linha",
        correct: false,
        explanation:
          "O Tratado de Tordesilhas (1494) foi o acordo que dividiu as terras entre Espanha e Portugal por uma linha imaginária. Tenta porque fala de Espanha, Portugal e oeste. Mas ele foi assinado dois anos depois da viagem de 1492, então não podia ser o motivo dela; além disso, dividia terras, não obrigava ninguém a explorar.",
      },
      {
        id: "D",
        text: "A Igreja exigia que a Espanha levasse a fé católica aos povos que já conhecia na América",
        correct: false,
        explanation:
          "Expandir a fé católica foi mesmo um dos interesses das navegações, junto com as riquezas. Por isso parece certa. Mas a frase fala de povos 'que já conhecia na América', e antes de Colombo os europeus não conheciam nenhum povo americano. O motivo da viagem foi a busca de um novo caminho para as especiarias.",
      },
    ],
    tips: [
      "Cuidado com a ordem dos fatos: um acontecimento não pode ser causa de algo que aconteceu antes dele.",
      "Ligue a Espanha e Portugal como rivais: o que um já controlava, o outro procurava por outro caminho.",
    ],
  },
  {
    id: "hist-t1-q02",
    topic: "colombo-e-conquista",
    prompt: "O que as Capitulações de Santa Fé garantiam a Colombo?",
    options: [
      {
        id: "A",
        text: "Uma capitania hereditária no litoral, que ele poderia deixar de herança para os filhos",
        correct: false,
        explanation:
          "Capitania hereditária foi o sistema português no Brasil (1534–1536): o rei de Portugal dividiu a costa em 14 faixas e doou cada uma a um donatário, que passava a terra de pai para filho. Tenta pela palavra parecida (Capitulações e capitanias). Mas aquilo foi Portugal, mais de 40 anos depois, e não tem relação com Colombo.",
      },
      {
        id: "B",
        text: "O cargo de vice-rei do Peru e o direito de cobrar impostos de todos os colonos",
        correct: false,
        explanation:
          "O Vice-reino do Peru foi uma das quatro grandes divisões administrativas que a Espanha criou na América quando a colonização já tinha crescido, governada por um vice-rei de origem nobre. Tenta porque 'vice-rei' soa como uma recompensa de autoridade. Mas o Peru só foi conquistado depois de 1532, muito depois do acordo com Colombo.",
      },
      {
        id: "C",
        text: "Ser a principal autoridade das terras descobertas e receber um dízimo das riquezas",
        correct: true,
        explanation:
          "Correta. As Capitulações de Santa Fé foram o acordo entre os reis católicos (Fernando de Aragão e Isabela de Castela) e Colombo: ele seria a principal autoridade de todas as terras que descobrisse e receberia o dízimo, ou seja, a décima parte das riquezas.",
      },
      {
        id: "D",
        text: "Três caravelas emprestadas por Portugal e a exclusividade da rota pela costa africana",
        correct: false,
        explanation:
          "A rota pela costa africana era justamente a que Portugal já dominava, e foi por isso que a Espanha procurou outro caminho. Colombo saiu do porto de Palos, em Castela, com três embarcações espanholas: Santa Maria, Pinta e Niña. A alternativa tenta porque as três caravelas são verdadeiras, mas mistura com Portugal, o rival.",
      },
    ],
    tips: [
      "Dízimo = a décima parte (10%). A palavra vem de 'dez'.",
      "Capitulações (acordo da Espanha com Colombo) e capitanias (divisão do Brasil por Portugal) se parecem só no som.",
    ],
  },
  {
    id: "hist-t1-q03",
    topic: "colombo-e-conquista",
    prompt:
      "Em 1492 Colombo desembarcou na ilha de Guanahani, nas Bahamas. Onde ele acreditava ter chegado?",
    options: [
      {
        id: "A",
        text: "Num continente novo, que ainda não aparecia em nenhum mapa europeu",
        correct: false,
        explanation:
          "Isso é o que de fato aconteceu: a América era um continente desconhecido pelos europeus. Por isso tenta. Mas a pergunta é sobre o que Colombo acreditava, e ele morreu achando que tinha chegado à Ásia. Quem mostrou que era um continente novo foi Balboa, ao ver o oceano Pacífico.",
      },
      {
        id: "B",
        text: "Na costa oriental da Ásia, perto das Índias e das especiarias",
        correct: true,
        explanation:
          "Correta. O objetivo de Colombo era chegar às especiarias das Índias navegando para o oeste, e ele achou que tinha conseguido: pensava estar na costa oriental da Ásia. É desse engano que vem a palavra 'índio'.",
      },
      {
        id: "C",
        text: "Numa ilha da costa africana, já conhecida pelos navegadores portugueses",
        correct: false,
        explanation:
          "A costa africana era a rota dominada por Portugal desde o fim do século XV, com suas feitorias. Tenta porque era o lugar que os europeus mais conheciam fora da Europa. Mas Colombo navegou para o oeste justamente para fugir da rota africana, e o que ele procurava era a Ásia.",
      },
      {
        id: "D",
        text: "No território que hoje é o Brasil, onde viviam os povos Tupinambás",
        correct: false,
        explanation:
          "O território do atual Brasil foi alcançado por Pedro Álvares Cabral, português, em 22 de abril de 1500, e os Tupinambás eram uma das etnias do seu litoral. Tenta porque também é uma chegada europeia à América. Mas Colombo era financiado pela Espanha, chegou às Bahamas em 1492, e os nativos de Guanahani eram os Taínos.",
      },
    ],
    tips: [
      "Separe o que aconteceu de verdade do que a pessoa acreditava na época: as perguntas podem pedir um ou outro.",
      "Colombo = 1492, Espanha, Bahamas. Cabral = 1500, Portugal, Brasil.",
    ],
  },
  {
    id: "hist-t1-q04",
    topic: "colombo-e-conquista",
    prompt:
      "Qual acontecimento mostrou aos europeus que as terras alcançadas por Colombo eram um novo continente, e não as Índias?",
    options: [
      {
        id: "A",
        text: "A assinatura do Tratado de Tordesilhas, que dividiu as novas terras entre Espanha e Portugal",
        correct: false,
        explanation:
          "O Tratado de Tordesilhas (1494) dividiu as terras entre Espanha e Portugal por uma linha imaginária. Tenta porque é um marco famoso logo depois de Colombo. Mas um tratado reparte terras; não é uma descoberta geográfica e não provou nada sobre ser outro continente.",
      },
      {
        id: "B",
        text: "A descoberta de ouro nos adornos dos nativos de Cuba, durante a primeira viagem",
        correct: false,
        explanation:
          "Em Cuba, na primeira viagem, os espanhóis viram ouro nos enfeites dos nativos, o que aumentou o interesse pela região. Tenta porque é um fato real da viagem. Mas encontrar ouro não diz em que continente se está: Colombo continuou achando que estava na Ásia.",
      },
      {
        id: "C",
        text: "A chegada de Cabral ao Brasil, que provou que havia terra também ao sul",
        correct: false,
        explanation:
          "Cabral chegou ao atual Brasil em 22 de abril de 1500, numa expedição portuguesa que ia para as Índias. Tenta porque mostra mais terra americana. Mas encontrar mais litoral não provava que não era a Ásia. A prova veio quando alguém viu um segundo oceano do outro lado das terras.",
      },
      {
        id: "D",
        text: "Balboa atravessou o istmo do Panamá por terra e avistou o oceano Pacífico",
        correct: true,
        explanation:
          "Correta. Vasco Núñez de Balboa cruzou a pé o istmo do Panamá (uma estreita faixa de terra) e viu o oceano Pacífico. Se havia outro oceano depois daquelas terras, elas não eram a Ásia: eram um novo continente. A partir daí, o objetivo passou a ser achar uma passagem marítima até as Índias.",
      },
    ],
    tips: [
      "Istmo = estreita faixa de terra entre dois mares, como o do Panamá.",
      "Para provar que uma terra é um continente novo, é preciso ver o que existe do outro lado dela.",
    ],
  },
  {
    id: "hist-t1-q05",
    topic: "colombo-e-conquista",
    prompt:
      "O livro diz que o termo mais correto é 'indígena', e que 'índio' é eurocêntrico. O que significa dizer que 'índio' é eurocêntrico?",
    options: [
      {
        id: "A",
        text: "É uma palavra criada pelos próprios povos nativos para se referirem a todos os grupos",
        correct: false,
        explanation:
          "Essa alternativa descreve uma autodenominação, ou seja, um nome que o próprio povo escolhe para si. Tenta porque parece um motivo para usar a palavra. Mas 'índio' foi criado pelos europeus, não pelos nativos, e cada povo tinha o seu nome próprio (Taínos, Tupinambás, Xavante...).",
      },
      {
        id: "B",
        text: "É uma palavra antiga do espanhol que significa 'rei' ou 'senhor da terra'",
        correct: false,
        explanation:
          "A palavra que o livro explica com o sentido de 'senhor ou governante' é 'Inca', que vem de Inka, o título do imperador. Tenta porque mistura duas explicações de nomes que aparecem no capítulo. Mas 'índio' não significa rei: vem de 'Índias', o lugar onde os europeus achavam que estavam.",
      },
      {
        id: "C",
        text: "Nasceu do engano dos europeus, que achavam estar nas Índias, e trata povos diferentes como um só",
        correct: true,
        explanation:
          "Correta. Eurocêntrico é ver o mundo pelos valores europeus. 'Índio' nasceu porque os europeus pensaram ter chegado às Índias; além disso, é genérico (ignora a diversidade de povos, línguas e culturas) e pode ser usado de forma pejorativa. Por isso 'indígena', que quer dizer 'nativo do lugar', é o termo mais correto.",
      },
      {
        id: "D",
        text: "É um termo usado só pelos portugueses, enquanto os espanhóis preferiam 'indígena'",
        correct: false,
        explanation:
          "Essa alternativa trata a palavra como uma diferença entre dois países colonizadores. Tenta porque o capítulo compara Espanha e Portugal o tempo todo. Mas eurocêntrico não quer dizer 'de um só país europeu': quer dizer que o termo mostra o olhar europeu como um todo, e os dois colonizadores usavam 'índio'.",
      },
    ],
    tips: [
      "Eurocêntrico = olhar o mundo com os valores da Europa no centro.",
      "Um termo genérico apaga as diferenças: cada povo indígena tinha língua, deuses e costumes próprios.",
    ],
  },
  {
    id: "hist-t1-q06",
    topic: "colombo-e-conquista",
    prompt:
      "Por volta de 1500 havia cerca de 50 milhões de indígenas na América. Cem anos depois, cerca de 80% tinham morrido. Qual foi a causa principal, segundo o livro?",
    options: [
      {
        id: "A",
        text: "Os conflitos diretos com os europeus, que tinham armas de fogo e cavalos",
        correct: false,
        explanation:
          "Os conflitos diretos com os europeus foram uma das três causas das mortes, e a superioridade bélica ajudou na conquista. Por isso tenta: é a causa mais visível. Mas o livro destaca outra como a principal, uma que matava sem batalha nenhuma.",
      },
      {
        id: "B",
        text: "As guerras entre os vários grupos indígenas, que já eram inimigos antes dos europeus",
        correct: false,
        explanation:
          "As guerras entre grupos indígenas também mataram muita gente, e os europeus até se aproveitaram dessas rivalidades para fazer alianças. Tenta porque está na lista de causas. Mas não foi a principal: elas existiam antes de 1500 e não explicam uma queda de 80% em cem anos.",
      },
      {
        id: "C",
        text: "O trabalho forçado nas minas de ouro e prata, que durava longos períodos",
        correct: false,
        explanation:
          "O trabalho forçado nas minas (como a mita) e a escravização foram formas de exploração muito duras. Tenta porque realmente causaram sofrimento e mortes, e no capítulo 10 a escravização aparece entre o que reduziu a população indígena do Brasil. Mas, na lista das três causas da queda de 80% na América, o livro não a inclui: as causas são conflitos, guerras entre indígenas e doenças.",
      },
      {
        id: "D",
        text: "As doenças trazidas pelos europeus, contra as quais os indígenas não tinham defesa",
        correct: true,
        explanation:
          "Correta. As doenças trazidas pelos europeus, como a varíola, foram a causa principal: os indígenas não tinham defesas biológicas contra elas. Muitas vezes a doença chegava antes dos próprios soldados e enfraquecia povos inteiros.",
      },
    ],
    tips: [
      "Em 100 anos, de cada 10 indígenas, 8 morreram.",
      "As três causas: conflitos com os europeus, guerras entre indígenas e doenças. A principal foram as doenças.",
    ],
  },
  {
    id: "hist-t1-q07",
    topic: "colombo-e-conquista",
    prompt:
      "Um povo indígena que sofria com um império vizinho decidiu lutar ao lado dos espanhóis para derrotar esse inimigo. Que tipo de reação indígena foi essa?",
    options: [
      {
        id: "A",
        text: "Aliança com os europeus para vencer um grupo inimigo",
        correct: true,
        explanation:
          "Correta. Fazer alianças com os espanhóis para derrotar grupos inimigos foi uma das reações indígenas. Isso ajudou muito os espanhóis: Cortés, por exemplo, venceu os astecas com a ajuda de indígenas descontentes.",
      },
      {
        id: "B",
        text: "Resistência, com hostilidades permanentes contra os invasores",
        correct: false,
        explanation:
          "Resistência é quando o povo enfrenta os europeus e mantém hostilidades (ataques, guerra) contra eles. Tenta porque também envolve lutar. Mas no enunciado o povo luta ao lado dos espanhóis, não contra eles.",
      },
      {
        id: "C",
        text: "Fuga para regiões que os europeus ainda não tinham alcançado",
        correct: false,
        explanation:
          "A fuga foi a reação de quem se afastou dos europeus, indo para áreas que eles ainda não tinham alcançado. Tenta porque era uma forma comum de proteger o povo. Mas o povo do enunciado ficou e se juntou aos espanhóis, o contrário de fugir.",
      },
      {
        id: "D",
        text: "Conversão ao cristianismo, abandonando a religião dos seus antepassados",
        correct: false,
        explanation:
          "A conversão ao cristianismo aconteceu com muitos indígenas, enquanto outros mantiveram sua religião e cultura. Tenta porque mostra aproximação com os europeus. Mas é uma mudança de religião; o enunciado fala de uma união militar para vencer um inimigo.",
      },
    ],
    tips: [
      "Reações indígenas: aliança, resistência, fuga, conversão (ou manter a cultura).",
      "Os indígenas não reagiram todos igual: cada povo escolheu um caminho diferente.",
    ],
  },
  {
    id: "hist-t1-q08",
    topic: "colombo-e-conquista",
    prompt:
      "No século XVI, muitos europeus acreditavam que existia uma cidade feita de ouro em algum lugar da América do Sul. Como se chama essa crença?",
    options: [
      {
        id: "A",
        text: "O retorno de Quetzalcoatl",
        correct: false,
        explanation:
          "Quetzalcoatl era um deus asteca, a serpente emplumada. Há uma hipótese de que alguns indígenas associaram a chegada dos espanhóis ao retorno desse deus. Tenta porque também é uma crença ligada à conquista. Mas é uma crença dos indígenas sobre os espanhóis, não dos europeus sobre o ouro.",
      },
      {
        id: "B",
        text: "O intercâmbio cultural",
        correct: false,
        explanation:
          "O intercâmbio cultural foram as trocas entre os dois lados: alimentos americanos, como a batata e o milho, mudaram a alimentação na Europa. Tenta porque fica no mesmo trecho do livro. Mas é um fato real de troca, não uma crença numa cidade de ouro.",
      },
      {
        id: "C",
        text: "As Capitulações de Santa Fé",
        correct: false,
        explanation:
          "As Capitulações de Santa Fé foram o acordo entre os reis espanhóis e Colombo, prometendo a ele autoridade e um dízimo das riquezas. Tenta porque fala de riquezas e tem nome de lugar. Mas é um documento assinado antes da viagem, não uma lenda sobre uma cidade de ouro.",
      },
      {
        id: "D",
        text: "O mito do El Dorado",
        correct: true,
        explanation:
          "Correta. O mito do El Dorado era a crença numa cidade de ouro na América do Sul. As histórias de templos cheios de ouro e prata aumentaram o interesse dos espanhóis e incentivaram novas expedições.",
      },
    ],
    tips: [
      "Mito = história em que as pessoas acreditavam, mas que não era verdade.",
      "El Dorado = 'o dourado'. O nome já lembra o ouro.",
    ],
  },
  {
    id: "hist-t1-q09",
    topic: "colombo-e-conquista",
    prompt:
      "Os espanhóis eram muito menos numerosos que os povos que conquistaram. Quais três fatores explicam a vitória da Espanha?",
    options: [
      {
        id: "A",
        text: "Alianças com povos rivais, doenças como a varíola e armas superiores",
        correct: true,
        explanation:
          "Correta. São os três fatores do livro: alianças com tribos rivais ou exploradas pelos impérios que já existiam; doenças trazidas pelos europeus, como a varíola, que enfraqueceram os povos; e superioridade bélica, ou seja, armas e equipamentos de guerra melhores.",
      },
      {
        id: "B",
        text: "Ajuda de Portugal, apoio dos imperadores indígenas e mais soldados",
        correct: false,
        explanation:
          "Essa alternativa junta três ideias falsas. Portugal era rival da Espanha e não ajudou na conquista; os imperadores (o asteca e o inca) foram os derrotados, não aliados; e os espanhóis eram poucos. Tenta porque 'mais soldados' parece a explicação óbvia para uma vitória, mas foi justamente o contrário.",
      },
      {
        id: "C",
        text: "Catequização, Pacto Colonial e a criação dos Vice-reinos",
        correct: false,
        explanation:
          "Catequização (ensinar a fé cristã), Pacto Colonial (comércio só com a metrópole) e Vice-reinos (grandes divisões administrativas) foram formas de controlar a colônia depois de conquistada. Tenta porque são ferramentas de domínio espanhol. Mas vieram depois da vitória militar; não explicam como ela aconteceu.",
      },
      {
        id: "D",
        text: "O mito do El Dorado, o comércio de especiarias e o ouro de Cuba",
        correct: false,
        explanation:
          "Essas três coisas explicam por que os espanhóis queriam a América (a lenda da cidade de ouro, a busca das especiarias e o ouro visto em Cuba). Tenta porque fala dos interesses da conquista. Mas a pergunta é como eles venceram, não por que quiseram ir.",
      },
    ],
    tips: [
      "Para vencer: alianças + doenças + armas. Separe o que explica a vitória do que explica o interesse.",
      "A conquista foi 'pulverizada': aos poucos, em vários lugares, até dominar os impérios Asteca e Inca.",
    ],
  },
  {
    id: "hist-t1-q10",
    topic: "colombo-e-conquista",
    prompt:
      "Quais eram os dois grandes interesses de portugueses e espanhóis ao navegar pelos oceanos no século XVI?",
    options: [
      {
        id: "A",
        text: "Fugir das guerras na Europa e encontrar terras vazias para morar",
        correct: false,
        explanation:
          "Essa alternativa descreve uma migração para fugir de guerras e povoar terras desocupadas. Tenta porque, depois, muitos europeus foram morar na América. Mas o objetivo das navegações era comercial e religioso, e as terras não estavam vazias: na América viviam cerca de 50 milhões de indígenas.",
      },
      {
        id: "B",
        text: "Estudar a natureza e os povos nativos para escrever livros de ciência",
        correct: false,
        explanation:
          "Essa alternativa descreve uma expedição científica, feita para estudar plantas, animais e povos. Tenta porque os europeus de fato descreveram a natureza que encontraram, como Caminha fez na sua carta. Mas essas descrições serviam para avaliar o potencial econômico da terra, não eram o objetivo da viagem.",
      },
      {
        id: "C",
        text: "Riquezas para o comércio, como metais e especiarias, e a expansão da fé católica",
        correct: true,
        explanation:
          "Correta. Os navegadores buscavam riquezas e matérias-primas para o comércio (metais preciosos e especiarias) e queriam expandir a fé católica. Esses dois interesses, o econômico e o religioso, aparecem nos três capítulos.",
      },
      {
        id: "D",
        text: "Levar à América alimentos europeus e trazer a batata e o milho para a Europa",
        correct: false,
        explanation:
          "Essa alternativa descreve o intercâmbio: as trocas entre os dois lados, em que alimentos americanos como a batata e o milho mudaram a alimentação na Europa. Tenta porque essas trocas aconteceram de verdade. Mas foram uma consequência do contato, não o objetivo das viagens: ninguém na Europa conhecia a batata antes de chegar à América.",
      },
    ],
    tips: [
      "Dois interesses que voltam o tempo todo: o econômico (riquezas) e o religioso (fé católica).",
      "Quando a pergunta pede 'interesses', procure o que os europeus queriam ganhar.",
    ],
  },
];
