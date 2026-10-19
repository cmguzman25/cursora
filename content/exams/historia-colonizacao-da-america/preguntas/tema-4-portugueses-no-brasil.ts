import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 4: Os portugueses no Brasil (capítulo 10, pp. 174–181; páginas 9 a 11
 * da guia).
 *
 * Las naciones indígenas, las intenciones de Cabral, las alianzas con las
 * etnias del litoral, la Carta de Caminha (qué dijo y qué propuso), la
 * resistencia indígena, el pau-brasil con sus feitorias y el escambo, y la
 * comparación con la colonización española.
 */
export const TEMA_PORTUGUESES_NO_BRASIL: ExamQuestionWithTopic[] = [
  {
    id: "hist-t4-q01",
    topic: "portugueses-no-brasil",
    prompt:
      "Quando a expedição de Pedro Álvares Cabral saiu de Portugal, em 1500, quais eram as suas duas intenções?",
    options: [
      {
        id: "A",
        text: "Estabelecer feitorias na costa africana e garantir o acesso às especiarias da Ásia",
        correct: true,
        explanation:
          "Correta. A expedição de Cabral tinha dois objetivos: estabelecer feitorias (postos comerciais) ao longo da costa africana e garantir o acesso ao mercado asiático de especiarias. No caminho, chegou ao atual Brasil em 22 de abril de 1500.",
      },
      {
        id: "B",
        text: "Procurar o ouro que Colombo tinha visto em Cuba e levá-lo para Portugal",
        correct: false,
        explanation:
          "O ouro nos adornos dos nativos de Cuba foi visto pelos espanhóis na viagem de Colombo, em 1492. Tenta porque o ouro motivou muito a colonização espanhola. Mas Cuba era área da Espanha, e o foco de Portugal estava na África e nas Índias.",
      },
      {
        id: "C",
        text: "Fundar a vila de São Vicente e dividir o litoral em capitanias",
        correct: false,
        explanation:
          "São Vicente, a primeira vila do Brasil, foi fundada por Martim Afonso de Sousa em 1532, e as capitanias hereditárias vieram em 1534. Tenta porque são marcos da ocupação portuguesa. Mas aconteceram mais de 30 anos depois de Cabral.",
      },
      {
        id: "D",
        text: "Catequizar os Tupinambás e os outros povos do litoral brasileiro",
        correct: false,
        explanation:
          "Catequizar os nativos foi um interesse da Igreja na colonização, e os Tupinambás eram uma das etnias do litoral. Tenta porque a fé foi um dos dois grandes interesses das navegações. Mas, ao sair de Portugal, ninguém sabia que encontraria esses povos: as intenções declaradas eram a África e as especiarias.",
      },
    ],
    tips: [
      "Cabral: 22 de abril de 1500. O objetivo era a África e a Ásia; o Brasil ficou no caminho.",
      "Feitoria = posto comercial fortificado no litoral.",
    ],
  },
  {
    id: "hist-t4-q02",
    topic: "portugueses-no-brasil",
    prompt:
      "No litoral sudeste, os Tupinambás pediram apoio aos Tamoios e aos Goitacazes para enfrentar os portugueses. Com qual povo os portugueses se aliaram?",
    options: [
      {
        id: "A",
        text: "Caetés",
        correct: false,
        explanation:
          "Os Caetés eram uma etnia do litoral, no atual Alagoas, que mais tarde matou o bispo Sardinha e foi alvo de uma guerra de Mem de Sá. Tenta porque é uma das etnias do litoral citadas. Mas não aparece como aliada dos portugueses no sudeste.",
      },
      {
        id: "B",
        text: "Tupiniquins",
        correct: true,
        explanation:
          "Correta. As etnias do litoral eram inimigas entre si, e os portugueses aproveitaram isso: aliaram-se aos Tupiniquins para derrotar os Tupinambás, que tinham o apoio dos Tamoios e dos Goitacazes.",
      },
      {
        id: "C",
        text: "Goitacazes",
        correct: false,
        explanation:
          "Os Goitacazes eram um povo do litoral sudeste. Tenta porque aparece no mesmo esquema da aliança. Mas estavam do outro lado: foram um dos povos a quem os Tupinambás pediram apoio contra os portugueses.",
      },
      {
        id: "D",
        text: "Tamoios",
        correct: false,
        explanation:
          "Os Tamoios eram uma das etnias do litoral e, mais tarde, deram nome à Confederação dos Tamoios, a união de povos contra os portugueses. Tenta porque é um nome muito citado. Mas eles apoiaram os Tupinambás, inimigos dos portugueses.",
      },
    ],
    tips: [
      "Portugueses + Tupiniquins contra Tupinambás + Tamoios + Goitacazes.",
      "Os europeus usavam as rivalidades entre povos indígenas a seu favor, na América espanhola e na portuguesa.",
    ],
  },
  {
    id: "hist-t4-q03",
    topic: "portugueses-no-brasil",
    prompt:
      "Pero Vaz de Caminha, que viajava com Cabral, escreveu uma carta ao rei D. Manuel I. Qual era o objetivo dessa carta?",
    options: [
      {
        id: "A",
        text: "Registrar os limites geográficos das terras que seriam doadas aos donatários",
        correct: false,
        explanation:
          "Registrar os limites geográficos era a função da Carta de doação, o documento que cedia a um donatário o direito de administrar uma capitania. Tenta porque também é uma carta oficial sobre as terras do Brasil. Mas é do capítulo 11, mais de 30 anos depois.",
      },
      {
        id: "B",
        text: "Denunciar ao rei a violência dos colonos contra os povos indígenas",
        correct: false,
        explanation:
          "Denunciar a violência contra os indígenas foi o que fizeram, anos depois, a Câmara de Salvador e o bispo Sardinha, contra o governador-geral Duarte da Costa. Tenta porque a carta fala dos indígenas. Mas em 1500 ainda não havia colonos, e Caminha descreveu os nativos, não denunciou violência.",
      },
      {
        id: "C",
        text: "Descrever as novas terras, seus povos e o potencial econômico",
        correct: true,
        explanation:
          "Correta. Caminha descreveu as terras do Novo Mundo, seus povos e o potencial econômico. Foi o primeiro documento escrito sobre o território e depois serviu para garantir a posse portuguesa. É também um documento eurocêntrico: mostra os indígenas pelo olhar europeu.",
      },
      {
        id: "D",
        text: "Pedir ao rei autorização para fundar a primeira vila do Brasil",
        correct: false,
        explanation:
          "A primeira vila do Brasil foi São Vicente, fundada em 1532 por Martim Afonso de Sousa, depois que D. João III decidiu ocupar o território. Tenta porque é um pedido que alguém da colônia faria ao rei. Mas Caminha morreu em 1500, e a carta não pede nada disso.",
      },
    ],
    tips: [
      "Carta de Caminha = a 'certidão de nascimento' escrita do Brasil: descreve terra, povos e riquezas.",
      "Carta de Caminha (1500) não é Carta de doação nem Carta foral (capitanias, 1530s).",
    ],
  },
  {
    id: "hist-t4-q04",
    topic: "portugueses-no-brasil",
    prompt: "O que Caminha escreveu sobre os metais preciosos da nova terra?",
    options: [
      {
        id: "A",
        text: "Que os indígenas usavam enfeites de ouro, como os nativos de Cuba",
        correct: false,
        explanation:
          "Enfeites de ouro nos nativos foi o que os espanhóis viram em Cuba, na viagem de Colombo de 1492. Tenta porque é uma cena famosa de chegada europeia. Mas foi na América espanhola, não no relato de Caminha.",
      },
      {
        id: "B",
        text: "Que havia minas de prata no interior, parecidas com as do Peru",
        correct: false,
        explanation:
          "As grandes minas de prata ficavam na América espanhola, como no Vice-reino do Peru, onde a mineração era a principal atividade. Tenta porque a prata era a riqueza da colonização espanhola. Mas Caminha não encontrou nada parecido no Brasil.",
      },
      {
        id: "C",
        text: "Que os indígenas trocavam ouro por mercadorias europeias",
        correct: false,
        explanation:
          "Essa alternativa descreve um escambo com ouro. O escambo existiu, mas foi com pau-brasil: os indígenas cortavam e carregavam a madeira em troca de mercadorias. Tenta porque mistura um fato verdadeiro (as trocas) com outro produto. Mas Caminha não relatou trocas de ouro.",
      },
      {
        id: "D",
        text: "Que, aparentemente, não havia ouro, prata nem outro metal",
        correct: true,
        explanation:
          "Correta. Caminha destacou a aparente falta de metais: 'nem prata, nem coisa alguma de metal'. O que ele elogiou foram as águas (muitos rios) e a terra boa ('tudo que se planta cresce'), além da natureza exótica.",
      },
    ],
    tips: [
      "Caminha destacou 3 coisas: falta de metais, águas e terra boa, natureza exótica.",
      "Ouro e prata = América espanhola. No Brasil de 1500, nada de metal.",
    ],
  },
  {
    id: "hist-t4-q05",
    topic: "portugueses-no-brasil",
    prompt:
      "Os povos indígenas do Brasil formavam nações com línguas, religiões e tecnologias próprias. Como essas nações são agrupadas?",
    options: [
      {
        id: "A",
        text: "Em troncos linguísticos",
        correct: true,
        explanation:
          "Correta. As nações indígenas são divididas em troncos linguísticos: grupos de línguas com a mesma origem. Exemplos de povos são Bororo, Kaingang, Munduruku, Pataxó, Ticuna e Xavante, cada um com deuses, rituais e costumes únicos.",
      },
      {
        id: "B",
        text: "Em cidades-estados",
        correct: false,
        explanation:
          "Cidades-estados são cidades independentes, cada uma com seu governo, como entre os maias. Tenta porque também é uma forma de organização de povos nativos. Mas os indígenas do Brasil viviam em tribos e aldeias, e o critério de agrupamento é a língua.",
      },
      {
        id: "C",
        text: "Em capitanias",
        correct: false,
        explanation:
          "Capitanias foram as faixas de terra em que Portugal dividiu o litoral do Brasil a partir de 1534. Tenta porque é uma divisão do território brasileiro. Mas foi criada pelos colonizadores e não tem relação com a forma como os povos indígenas se organizavam.",
      },
      {
        id: "D",
        text: "Em confederações",
        correct: false,
        explanation:
          "Confederação é uma união de vários povos sob uma liderança ou para um objetivo comum, como a dos incas ou a Confederação dos Tamoios. Tenta porque reúne vários povos. Mas foram uniões de momento ou de um império, não a forma de classificar todas as nações indígenas.",
      },
    ],
    tips: [
      "Nação indígena = povo com língua, religião e tecnologia próprias.",
      "Diversidade cultural: cada etnia tem deuses, rituais, crenças e costumes únicos.",
    ],
  },
  {
    id: "hist-t4-q06",
    topic: "portugueses-no-brasil",
    prompt:
      "Caminha descreveu os indígenas como inocentes e sem crença. Que proposta veio dessa visão, no chamado 'processo civilizatório'?",
    options: [
      {
        id: "A",
        text: "Escravizar os indígenas que se recusassem a trabalhar nas feitorias",
        correct: false,
        explanation:
          "A escravização de indígenas foi autorizada mais tarde, pela regra das guerras justas, só para os que atacassem os colonizadores. Tenta porque a escravização fez parte da colonização. Mas Caminha não propôs escravizar ninguém; ao achar os indígenas 'inocentes', propôs outra coisa.",
      },
      {
        id: "B",
        text: "Que o rei enviasse missões para catequizá-los e 'salvá-los'",
        correct: true,
        explanation:
          "Correta. Para Caminha, os indígenas precisavam de um credo: era preciso 'salvá-los'. Por isso o rei devia enviar missões de catequização. Depois, religiosos aprenderam o tupi e combateram práticas indígenas. Esse é o interesse religioso da colonização, que andava junto com o econômico.",
      },
      {
        id: "C",
        text: "Respeitar a cultura indígena e deixar que vivessem do seu próprio jeito",
        correct: false,
        explanation:
          "Respeitar culturas, crenças e modos de viver diferentes é a ideia de diversidade cultural: ser diferente não significa estar errado. Tenta porque é o que o livro ensina hoje. Mas era o contrário da visão de Caminha, que achava que os indígenas não tinham crença e precisavam ser convertidos.",
      },
      {
        id: "D",
        text: "Levar os indígenas a Portugal para aprenderem a língua portuguesa",
        correct: false,
        explanation:
          "Ensinar a língua portuguesa aos indígenas foi um trabalho dos jesuítas, na própria colônia, depois de 1549. Tenta porque a língua fez parte da aculturação. Mas isso foi feito aqui, pelos religiosos, e não foi a proposta da carta.",
      },
    ],
    tips: [
      "Processo civilizatório: 'inocentes, sem crença' → precisam de credo → missões de catequização.",
      "Dois interesses complementares: o econômico (mercantilismo) e o religioso (catequese).",
    ],
  },
  {
    id: "hist-t4-q07",
    topic: "portugueses-no-brasil",
    prompt:
      "Os indígenas cortavam o pau-brasil e o levavam até as feitorias; em troca, recebiam mercadorias europeias, sem uso de dinheiro. Como se chama essa forma de troca?",
    options: [
      {
        id: "A",
        text: "Escambo",
        correct: true,
        explanation:
          "Correta. Escambo é a troca de mercadorias ou de serviços sem valor monetário. Os comerciantes portugueses negociavam assim com os indígenas o corte e o transporte das toras de pau-brasil, madeira usada para tingir tecidos de vermelho.",
      },
      {
        id: "B",
        text: "Encomienda",
        correct: false,
        explanation:
          "A encomienda era o sistema espanhol em que indígenas ficavam sob o controle de um colono, que os usava como mão de obra em troca da catequização. Tenta porque também envolve trabalho indígena. Mas era espanhola, e os indígenas ficavam sob controle de alguém, em vez de negociar.",
      },
      {
        id: "C",
        text: "Arrendamento",
        correct: false,
        explanation:
          "Arrendar é ceder um território para uso de outra pessoa mediante cobrança; a Coroa portuguesa decretou o monopólio do pau-brasil, mas acabou arrendando a terra para a sua exploração. Tenta porque está ligado ao mesmo negócio da madeira. Mas é o acordo entre a Coroa e um particular, não a troca com os indígenas.",
      },
      {
        id: "D",
        text: "Mita",
        correct: false,
        explanation:
          "A mita era o trabalho forçado dos indígenas nas minas da América espanhola, pago com uma pequena parte do minério. Tenta porque também é trabalho indígena com uma 'paga'. Mas era nas minas espanholas e forçado, não uma troca de madeira por mercadorias.",
      },
    ],
    tips: [
      "Escambo = troca sem dinheiro.",
      "Pau-brasil = madeira cor de brasa que tingia tecidos de vermelho.",
    ],
  },
  {
    id: "hist-t4-q08",
    topic: "portugueses-no-brasil",
    prompt:
      "A Coroa concedeu a exploração do pau-brasil, por 3 anos, a uma empresa liderada por Fernão de Noronha. O que ele precisava fazer em troca?",
    options: [
      {
        id: "A",
        text: "Patrulhar a costa e fazer mapas da linha de Tordesilhas",
        correct: false,
        explanation:
          "Patrulhar a costa e fazer estudos cartográficos sobre a linha de Tordesilhas foi a missão de Martim Afonso de Sousa, entre 1530 e 1533. Tenta porque proteger o litoral também era uma preocupação da Coroa. Mas não era a obrigação de Noronha.",
      },
      {
        id: "B",
        text: "Enviar 6 navios por ano com madeira e construir postos fortificados",
        correct: true,
        explanation:
          "Correta. Fernão (ou Fernando) de Noronha deveria enviar 6 navios por ano a Portugal com madeira e construir postos comerciais fortificados, as feitorias. A Coroa copiava um modelo que tinha dado certo na África.",
      },
      {
        id: "C",
        text: "Enviar à metrópole 10% das riquezas e 20% dos metais encontrados",
        correct: false,
        explanation:
          "Enviar 10% das riquezas e 20% dos metais era um dever dos donatários, escrito na Carta foral das capitanias hereditárias. Tenta porque também é uma obrigação em troca de explorar o território. Mas é das capitanias (1534), não da concessão do pau-brasil.",
      },
      {
        id: "D",
        text: "Fundar vilas, trazer colonos e plantar cana-de-açúcar",
        correct: false,
        explanation:
          "Construir vilas, povoar e organizar a exploração da cana-de-açúcar eram os deveres dos donatários das capitanias. Tenta porque é o que se esperava de quem recebia terras do rei. Mas a concessão de Noronha era só comercial: madeira e feitorias.",
      },
    ],
    tips: [
      "Noronha: 3 anos, 6 navios por ano, postos fortificados.",
      "Antes de 1530 a Coroa só queria comerciar; povoar veio depois, com as capitanias.",
    ],
  },
  {
    id: "hist-t4-q09",
    topic: "portugueses-no-brasil",
    prompt:
      "No Censo de 2010, 896 mil pessoas se declararam indígenas, e a maior parte vive no interior do Brasil. Como o livro explica isso?",
    options: [
      {
        id: "A",
        text: "Os indígenas sempre viveram só no interior, e o litoral era desabitado",
        correct: false,
        explanation:
          "Essa alternativa supõe que o litoral estava vazio em 1500. Tenta porque hoje a maioria vive mesmo no interior. Mas o litoral era habitado por Tupiniquins, Tupinambás, Tamoios, Caetés, Potiguaras e Tabajaras, os primeiros a ter contato com os portugueses.",
      },
      {
        id: "B",
        text: "O governo transferiu as aldeias do litoral para o interior em 2010",
        correct: false,
        explanation:
          "2010 é o ano do Censo, a contagem da população que mostrou os 896 mil indígenas. Tenta porque a data aparece no enunciado. Mas o Censo só contou as pessoas; a mudança para o interior aconteceu ao longo de séculos.",
      },
      {
        id: "C",
        text: "A colonização se concentrou no litoral, e os povos migraram para o interior",
        correct: true,
        explanation:
          "Correta. A colonização se concentrou no litoral, e ao longo do tempo os povos indígenas migraram para o interior. Fugir para o interior e mudar de lugar com a aldeia foram formas de resistência ao controle português.",
      },
      {
        id: "D",
        text: "No interior havia ouro, e os indígenas foram trabalhar nas minas",
        correct: false,
        explanation:
          "Trabalhar nas minas de ouro e prata era a realidade dos indígenas na América espanhola, com a mita. Tenta porque liga indígenas e mineração. Mas o livro não explica a ida ao interior pelas minas, e Caminha nem tinha achado metais.",
      },
    ],
    tips: [
      "Formas de resistência: lutar, fugir para o interior, aliar-se contra inimigos, mudar a aldeia de lugar.",
      "Colonização no litoral → indígenas no interior.",
    ],
  },
  {
    id: "hist-t4-q10",
    topic: "portugueses-no-brasil",
    prompt:
      "Comparando os primeiros anos da colonização, qual diferença entre a América espanhola e a portuguesa está correta?",
    options: [
      {
        id: "A",
        text: "Os portugueses encontraram grandes impérios; os espanhóis, só tribos do litoral",
        correct: false,
        explanation:
          "Essa alternativa inverte os dois lados. Os grandes impérios (maias, astecas e incas) estavam na América espanhola, e as tribos do litoral (Tupiniquins, Tupinambás, Tamoios, Caetés) na portuguesa. Tenta porque as duas categorias existem no quadro; só estão trocadas.",
      },
      {
        id: "B",
        text: "Os espanhóis criaram feitorias; os portugueses, Vice-reinos",
        correct: false,
        explanation:
          "Essa alternativa também troca os lados. Feitorias (postos comerciais) foram a primeira organização portuguesa no Brasil, e os Vice-reinos foram criados pela Espanha. Tenta porque os dois termos são formas de organização do quadro comparativo.",
      },
      {
        id: "C",
        text: "Só a Espanha impôs o Pacto Colonial; o Brasil podia comerciar com qualquer país",
        correct: false,
        explanation:
          "O Pacto Colonial é a regra que dá à metrópole a exclusividade do comércio com a colônia. Tenta porque o livro o explica dentro do capítulo da Espanha. Mas Portugal também o aplicou: o comércio exterior do Brasil era exclusivo com Portugal.",
      },
      {
        id: "D",
        text: "Os espanhóis buscaram logo os metais; os portugueses, até 1530, quase só o pau-brasil",
        correct: true,
        explanation:
          "Correta. Os espanhóis buscaram metais preciosos e exploração imediata. Os portugueses tiveram pouca atividade até 1530: só algumas expedições atrás do pau-brasil, porque o foco estava na África e nas especiarias das Índias.",
      },
    ],
    tips: [
      "Espanha: impérios, metais, Vice-reinos. Portugal: tribos do litoral, pau-brasil, feitorias e depois capitanias.",
      "As duas colônias tinham Pacto Colonial com a sua metrópole.",
    ],
  },
];
