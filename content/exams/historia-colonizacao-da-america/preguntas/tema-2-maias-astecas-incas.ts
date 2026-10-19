import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: Maias, astecas e incas (capítulo 9, pp. 163–165; página 6 da guia).
 *
 * El cuadro comparativo de la guía, fila por fila: dónde vivían, cómo se
 * organizaban, economía y cultura, religión, y quién y cómo los conquistó. Los
 * distractores salen casi siempre de otra columna del mismo cuadro, que es la
 * confusión real de quien lo estudia.
 */
export const TEMA_MAIAS_ASTECAS_INCAS: ExamQuestionWithTopic[] = [
  {
    id: "hist-t2-q01",
    topic: "maias-astecas-incas",
    prompt:
      "Os maias não tinham um imperador único: cada centro político, com seus templos e seu governante, era independente dos outros. Como se chama essa forma de organização?",
    options: [
      {
        id: "A",
        text: "Império centralizado",
        correct: false,
        explanation:
          "Império centralizado é quando um único governante, o imperador, controla a política e o exército de todo o território. Era a organização dos astecas, uma sociedade guerreira e hierarquizada. Tenta porque é a civilização vizinha dos maias, no México. Mas o enunciado diz justamente que não havia imperador único.",
      },
      {
        id: "B",
        text: "Cidades-estados",
        correct: true,
        explanation:
          "Correta. Os maias se organizavam em cidades-estados: cada cidade tinha a sua liderança política própria. Por isso as cidades maias chegaram a guerrear entre si, como Chichén Itzá, Mayapan e Uxmal.",
      },
      {
        id: "C",
        text: "Confederação de povos",
        correct: false,
        explanation:
          "Confederação de povos é a união de vários grupos sob um líder comum. Era o caso dos incas, que reuniam vários povos liderados pelo inca, o imperador. Tenta porque também fala de vários grupos. Mas na confederação inca havia um governante acima de todos, e entre os maias não.",
      },
      {
        id: "D",
        text: "Capitanias Gerais",
        correct: false,
        explanation:
          "As Capitanias Gerais foram divisões administrativas criadas pelos espanhóis na América colonial (Cuba, Guatemala, Chile e Venezuela), governadas por um capitão. Tenta porque é um nome de organização política do mesmo capítulo. Mas é uma criação dos colonizadores, não a forma como os maias se governavam.",
      },
    ],
    tips: [
      "Maias = muitas cidades, sem imperador único.",
      "Astecas = império; Incas = confederação de povos com um imperador, o inca.",
    ],
  },
  {
    id: "hist-t2-q02",
    topic: "maias-astecas-incas",
    prompt: "Qual era a capital do Império Asteca, construída numa região pantanosa?",
    options: [
      {
        id: "A",
        text: "Tenochtitlán",
        correct: true,
        explanation:
          "Correta. Tenochtitlán, no atual México, foi construída numa região de pântano. Por isso os astecas desenvolveram técnicas de drenagem e as chinampas, canteiros flutuantes para plantar.",
      },
      {
        id: "B",
        text: "Machu Picchu",
        correct: false,
        explanation:
          "Machu Picchu é uma cidade inca no alto da Cordilheira dos Andes, famosa pelas ruínas de templos e terraços agrícolas. Tenta porque é a cidade antiga mais famosa da América. Mas é dos incas, nas montanhas, e não dos astecas, no pântano.",
      },
      {
        id: "C",
        text: "Tayasal",
        correct: false,
        explanation:
          "Tayasal foi a última cidade maia a cair: os espanhóis só a dominaram em 1697. Tenta porque é uma cidade que aparece no quadro das civilizações. Mas é maia, não asteca, e é lembrada pelo fim da conquista, não por ser uma capital de império.",
      },
      {
        id: "D",
        text: "Chichén Itzá",
        correct: false,
        explanation:
          "Chichén Itzá foi uma das cidades-estados maias que, nos séculos X e XI, guerrearam com Mayapan e Uxmal. Tenta porque fica na mesma região (península de Yucatán e México). Mas é maia, e os maias nem tinham uma capital única.",
      },
    ],
    tips: [
      "Asteca = água e pântano: Tenochtitlán e chinampas.",
      "Inca = montanha: Andes, terraços e Machu Picchu.",
    ],
  },
  {
    id: "hist-t2-q03",
    topic: "maias-astecas-incas",
    prompt:
      "Para conseguir plantar milho, tomate e pimenta numa região de pântano, os astecas criaram canteiros que flutuavam sobre a água. Como eles se chamavam?",
    options: [
      {
        id: "A",
        text: "Terraços",
        correct: false,
        explanation:
          "Terraços são degraus cavados na encosta da montanha para plantar, técnica usada pelos incas nos Andes. Tenta porque também é uma técnica agrícola criativa para um terreno difícil. Mas o terreno difícil dos incas era a montanha, e o dos astecas era a água.",
      },
      {
        id: "B",
        text: "Mita",
        correct: false,
        explanation:
          "A mita foi o trabalho forçado dos indígenas nas minas, na América espanhola, em troca de um pequeno pagamento em minério, o partido. Era uma adaptação de um costume inca. Tenta porque é uma palavra indígena do mesmo capítulo. Mas é trabalho nas minas, não uma técnica de plantio.",
      },
      {
        id: "C",
        text: "Sesmarias",
        correct: false,
        explanation:
          "Sesmarias eram terras doadas pelos donatários no Brasil colonial, um dos direitos da Carta foral. Tenta porque também tem a ver com terra para plantar. Mas é um sistema português do capítulo 11, e não tem relação com os astecas.",
      },
      {
        id: "D",
        text: "Chinampas",
        correct: true,
        explanation:
          "Correta. As chinampas eram canteiros flutuantes: os astecas empilhavam lama e plantas sobre a água do pântano e plantavam em cima. Junto com a drenagem, elas permitiram cultivar alimentos como milho, tomate e pimenta perto de Tenochtitlán.",
      },
    ],
    tips: [
      "Chinampa = canteiro flutuante (astecas). Terraço = degrau na montanha (incas).",
      "Ligue cada técnica ao terreno: pântano ou montanha.",
    ],
  },
  {
    id: "hist-t2-q04",
    topic: "maias-astecas-incas",
    prompt:
      "Os incas acreditavam que o imperador era filho do Grande Sol. Como se chamava o deus Sol que eles adoravam?",
    options: [
      {
        id: "A",
        text: "Quetzalcoatl",
        correct: false,
        explanation:
          "Quetzalcoatl era um deus dos astecas, a serpente emplumada. Há uma hipótese de que alguns indígenas associaram a chegada dos espanhóis ao retorno desse deus. Tenta porque é o nome de deus mais famoso do capítulo. Mas é asteca, e não é o Sol.",
      },
      {
        id: "B",
        text: "Inti",
        correct: true,
        explanation:
          "Correta. Inti era o deus Sol dos incas. O imperador era considerado filho do Grande Sol, e os incas faziam festas com oferendas e até sacrifício humano em sua honra.",
      },
      {
        id: "C",
        text: "Inka",
        correct: false,
        explanation:
          "Inka é a palavra que deu nome ao povo e ao imperador: significa 'senhor' ou 'governante'. Tenta porque é parecida com Inti e também é inca. Mas é o título do governante, o filho do Sol, e não o próprio deus.",
      },
      {
        id: "D",
        text: "Nahuatl",
        correct: false,
        explanation:
          "Nahuatl era a escrita (e a língua) dos astecas. Tenta porque soa como um nome de deus indígena. Mas não é um deus, e não é inca.",
      },
    ],
    tips: [
      "Inti = Sol. Inka = governante, o 'filho do Sol'.",
      "Os maias eram politeístas (vários deuses); os incas davam lugar central ao Sol.",
    ],
  },
  {
    id: "hist-t2-q05",
    topic: "maias-astecas-incas",
    prompt:
      "Em 1519, um espanhol desembarcou no Yucatán e, depois de cerca de três anos de conflitos, tomou a capital dos astecas. Quem foi?",
    options: [
      {
        id: "A",
        text: "Francisco Pizarro",
        correct: false,
        explanation:
          "Francisco Pizarro foi o espanhol que conquistou o Império Inca, nos Andes: avançou em 1524, recebeu autorização da Coroa em 1529 e chegou em 1532. Tenta porque é o outro grande conquistador do capítulo. Mas ele conquistou os incas, não os astecas.",
      },
      {
        id: "B",
        text: "Vasco Núñez de Balboa",
        correct: false,
        explanation:
          "Balboa foi o explorador que atravessou o istmo do Panamá e viu o oceano Pacífico, mostrando que a América era um novo continente. Tenta porque é outro espanhol famoso da mesma época. Mas ele não conquistou nenhum império.",
      },
      {
        id: "C",
        text: "Hernán Cortés",
        correct: true,
        explanation:
          "Correta. Hernán Cortés desembarcou no Yucatán em 1519 e, após uns três anos de conflitos, tomou Tenochtitlán. Venceu com a ajuda de indígenas descontentes com os astecas, de armas superiores e da varíola. Sua intérprete foi Malinche.",
      },
      {
        id: "D",
        text: "Cristóvão Colombo",
        correct: false,
        explanation:
          "Colombo foi o navegador que chegou a Guanahani, nas Bahamas, em 1492, financiado pela Espanha. Tenta porque é o nome mais conhecido da chegada espanhola. Mas ele explorou sobretudo as ilhas do Caribe e morreu em 1506, antes da conquista dos astecas.",
      },
    ],
    tips: [
      "CA = Cortés conquistou os Astecas. PI = Pizarro conquistou os Incas.",
      "Cortés: 1519. Pizarro: 1524 a 1532.",
    ],
  },
  {
    id: "hist-t2-q06",
    topic: "maias-astecas-incas",
    prompt:
      "Uma arqueóloga encontra, no alto de uma cordilheira, ruínas de templos e degraus de plantio onde se cultivava batata. Esses vestígios são de qual civilização?",
    options: [
      {
        id: "A",
        text: "Dos maias, na península de Yucatán",
        correct: false,
        explanation:
          "Os maias viviam em parte da América Central e no sul do México (península de Yucatán) e deixaram ruínas de templos com arquitetura avançada. Tenta porque também deixaram templos famosos. Mas o Yucatán é uma região baixa, não uma cordilheira, e a batata e os terraços são marcas dos incas.",
      },
      {
        id: "B",
        text: "Dos incas, na Cordilheira dos Andes",
        correct: true,
        explanation:
          "Correta. Os incas viviam na Cordilheira dos Andes e cultivavam em terraços (os degraus de plantio) milho, pimenta, tomate e batata. Machu Picchu é o exemplo mais famoso: ruínas com templos e terraços agrícolas.",
      },
      {
        id: "C",
        text: "Dos astecas, perto de Tenochtitlán",
        correct: false,
        explanation:
          "Os astecas viviam no atual México, com capital em Tenochtitlán, numa região pantanosa. Tenta porque também construíram templos. Mas a técnica deles eram as chinampas, canteiros sobre a água, e não degraus na montanha.",
      },
      {
        id: "D",
        text: "Dos Taínos, nas ilhas das Bahamas",
        correct: false,
        explanation:
          "Os Taínos, da etnia Aruaque, eram os nativos de Guanahani, nas Bahamas, os primeiros que Colombo encontrou. Tenta porque são um povo nativo citado no capítulo. Mas viviam em ilhas, sem cordilheira, e não construíram grandes templos.",
      },
    ],
    tips: [
      "Montanha + terraços + batata = incas.",
      "Para identificar uma civilização, use o lugar e a técnica de plantio juntos.",
    ],
  },
  {
    id: "hist-t2-q07",
    topic: "maias-astecas-incas",
    prompt:
      "Qual civilização se destacou por conhecimentos sofisticados de matemática e astronomia e pela criação de um calendário?",
    options: [
      {
        id: "A",
        text: "Os maias",
        correct: true,
        explanation:
          "Correta. Os maias viviam da agricultura e do comércio e tinham conhecimentos sofisticados de matemática e astronomia. Criaram um calendário e deixaram ruínas de templos com arquitetura avançada.",
      },
      {
        id: "B",
        text: "Os astecas",
        correct: false,
        explanation:
          "Os astecas foram um império guerreiro no atual México, conhecidos pelas chinampas, pelo cacau usado como moeda, pela escrita nahuatl e pelos templos com sacrifício humano. Tenta porque eram uma civilização avançada e vizinha dos maias. Mas o livro liga a matemática, a astronomia e o calendário aos maias.",
      },
      {
        id: "C",
        text: "Os incas",
        correct: false,
        explanation:
          "Os incas, nos Andes, ficaram conhecidos pelos terraços agrícolas, por Machu Picchu e pelo culto ao Sol (Inti). Tenta porque observar o Sol parece ligado à astronomia. Mas no livro o destaque da matemática e do calendário é dos maias.",
      },
      {
        id: "D",
        text: "Os Tupinambás",
        correct: false,
        explanation:
          "Os Tupinambás eram uma das principais etnias do litoral do Brasil quando os portugueses chegaram, em 1500. Tenta porque são um povo indígena famoso. Mas pertencem ao capítulo 10 (Portugal) e não estão entre as grandes civilizações do capítulo 9.",
      },
    ],
    tips: [
      "Maias = matemática, astronomia e calendário.",
      "As três grandes civilizações do capítulo 9 são maias, astecas e incas; os povos do litoral brasileiro são do capítulo 10.",
    ],
  },
  {
    id: "hist-t2-q08",
    topic: "maias-astecas-incas",
    prompt:
      "Segundo o livro, o que Francisco Pizarro aproveitou para avançar sobre o Império Inca a partir de 1524?",
    options: [
      {
        id: "A",
        text: "A ajuda da intérprete Malinche, que conhecia as línguas da região",
        correct: false,
        explanation:
          "Malinche foi a intérprete indígena de Hernán Cortés na conquista dos astecas, no México. Tenta porque uma intérprete foi mesmo decisiva numa conquista. Mas foi na conquista de Cortés, e não na de Pizarro.",
      },
      {
        id: "B",
        text: "A crença de que ele era o deus Quetzalcoatl voltando à terra",
        correct: false,
        explanation:
          "Quetzalcoatl, a serpente emplumada, era um deus asteca, e há a hipótese de que alguns indígenas associaram a chegada dos espanhóis à volta desse deus. Tenta porque é uma explicação famosa para a conquista. Mas é uma crença asteca, não inca, e o livro a apresenta só como hipótese.",
      },
      {
        id: "C",
        text: "Um grave conflito interno que dividia e enfraquecia os incas",
        correct: true,
        explanation:
          "Correta. Pizarro avançou em 1524 aproveitando um grave conflito interno entre os incas. Depois, em 1529, a Coroa espanhola autorizou a conquista, e em 1532 ele chegou e fundou San Miguel de Piura, a primeira vila espanhola na região.",
      },
      {
        id: "D",
        text: "A queda de Tayasal, que deixou os Andes sem nenhuma defesa",
        correct: false,
        explanation:
          "A queda de Tayasal foi o momento em que os espanhóis dominaram os últimos maias, em 1697. Tenta porque é uma derrota indígena para os espanhóis. Mas aconteceu mais de 160 anos depois de Pizarro, e numa região bem longe dos Andes.",
      },
    ],
    tips: [
      "Pizarro: 1524 avanço, 1529 autorização da Coroa, 1532 chegada.",
      "Os conquistadores se aproveitaram das divisões entre os povos nativos.",
    ],
  },
  {
    id: "hist-t2-q09",
    topic: "maias-astecas-incas",
    prompt:
      "Quando os espanhóis chegaram à região dos maias, essa civilização já estava em declínio. Por quê?",
    options: [
      {
        id: "A",
        text: "Porque tinha sido conquistada pelos astecas, que tomaram as cidades maias",
        correct: false,
        explanation:
          "Essa alternativa diz que um império indígena dominou o outro. Tenta porque astecas e maias viviam em regiões vizinhas e os astecas eram guerreiros. Mas o livro não fala em conquista asteca dos maias: o enfraquecimento veio de dentro.",
      },
      {
        id: "B",
        text: "Porque a varíola trazida por Colombo em 1492 já tinha matado quase todos",
        correct: false,
        explanation:
          "A varíola e outras doenças europeias foram a principal causa da morte dos indígenas depois do contato. Tenta porque as doenças enfraqueceram muitos povos antes das batalhas. Mas o declínio maia começou séculos antes, com problemas internos, e o livro não o explica pela varíola.",
      },
      {
        id: "C",
        text: "Porque Francisco Pizarro já tinha destruído as cidades em 1532",
        correct: false,
        explanation:
          "Pizarro foi o conquistador do Império Inca, que chegou em 1532 ao atual Peru. Tenta porque é uma data de conquista espanhola. Mas ele atuou nos Andes, longe dos maias, que só foram dominados em 1697.",
      },
      {
        id: "D",
        text: "Por crises agrícolas e lutas internas entre cidades como Chichén Itzá e Mayapan",
        correct: true,
        explanation:
          "Correta. Nos séculos X e XI houve guerra entre as cidades de Chichén Itzá, Mayapan e Uxmal; Mayapan venceu, mas saiu enfraquecida. Com crises agrícolas e lutas internas, os maias entraram em declínio. Mesmo assim, só em 1697, com a queda de Tayasal, os espanhóis dominaram os últimos maias.",
      },
    ],
    tips: [
      "Maias: expansão desde 731 d.C., declínio por crise agrícola e lutas internas, fim em 1697 (Tayasal).",
      "Cidades-estados independentes podem guerrear entre si, e isso enfraquece todas.",
    ],
  },
  {
    id: "hist-t2-q10",
    topic: "maias-astecas-incas",
    prompt: "Entre os astecas, as sementes de qual planta eram usadas como moeda?",
    options: [
      {
        id: "A",
        text: "Milho",
        correct: false,
        explanation:
          "O milho era um dos alimentos mais importantes de astecas e incas e, depois, mudou a alimentação na Europa. Tenta porque é o alimento americano mais famoso. Mas era comida, não moeda.",
      },
      {
        id: "B",
        text: "Cacau",
        correct: true,
        explanation:
          "Correta. O cacau fazia parte da economia asteca, e as suas sementes eram usadas como moeda nas trocas comerciais. É a mesma planta de que hoje se faz o chocolate.",
      },
      {
        id: "C",
        text: "Batata",
        correct: false,
        explanation:
          "A batata era cultivada pelos incas nos terraços dos Andes e, levada à Europa, mudou a alimentação de lá. Tenta porque também é um alimento americano. Mas era inca, e não era usada como moeda.",
      },
      {
        id: "D",
        text: "Pau-brasil",
        correct: false,
        explanation:
          "O pau-brasil era uma árvore do litoral brasileiro cuja madeira tingia tecidos de vermelho; os portugueses a obtinham dos indígenas por escambo. Tenta porque aparece ligado a comércio. Mas é do capítulo 10, no Brasil, e é madeira, não semente.",
      },
    ],
    tips: [
      "Astecas: milho, tomate, pimenta e cacau. O cacau servia como moeda.",
      "Incas: milho, pimenta, tomate e batata, plantados em terraços.",
    ],
  },
];
