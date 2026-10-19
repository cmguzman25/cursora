import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 3: Administração e sociedade na América espanhola (capítulo 9,
 * pp. 166–167; páginas 7 e 8 da guia).
 *
 * Vice-reinos y Capitanías Generales, audiencia, cabildo, Pacto Colonial, la
 * economía minera, la pirámide social (chapetones, criollos, mestizos,
 * esclavizados, indígenas) y las dos formas de trabajo forzado: mita y
 * encomienda. Varias preguntas son escenarios ("un hombre nacido en Lima...")
 * para que el alumno aplique la definición en vez de recitarla.
 */
export const TEMA_AMERICA_ESPANHOLA: ExamQuestionWithTopic[] = [
  {
    id: "hist-t3-q01",
    topic: "america-espanhola",
    prompt: "Quais foram os quatro Vice-reinos criados pela Espanha na América?",
    options: [
      {
        id: "A",
        text: "Cuba, Guatemala, Chile e Venezuela",
        correct: false,
        explanation:
          "Cuba, Guatemala, Chile e Venezuela foram as quatro Capitanias Gerais: divisões menores, governadas por um capitão e submetidas a um vice-reino. Tenta porque também são quatro e também são divisões espanholas. Mas são as capitanias, o nível de baixo.",
      },
      {
        id: "B",
        text: "Pernambuco, São Vicente, Bahia e Ceará",
        correct: false,
        explanation:
          "Pernambuco, São Vicente, Baía de Todos os Santos e Ceará foram capitanias hereditárias do Brasil, criadas por Portugal entre 1534 e 1536. Tenta porque também são divisões do território colonial. Mas são portuguesas, não espanholas.",
      },
      {
        id: "C",
        text: "Nova Espanha, Nova Granada, Peru e Rio da Prata",
        correct: true,
        explanation:
          "Correta. Os quatro Vice-reinos foram Nova Espanha, Nova Granada, Peru e Rio da Prata. Eram as maiores divisões da América espanhola, governadas por um vice-rei de origem nobre, com uma audiência (tribunal de juízes) na sede.",
      },
      {
        id: "D",
        text: "México, Peru, Chile e Brasil",
        correct: false,
        explanation:
          "Essa lista mistura nomes de países atuais. Tenta porque México e Peru eram mesmo centros da colonização espanhola. Mas Chile era uma Capitania Geral, e o Brasil era colônia de Portugal, não da Espanha.",
      },
    ],
    tips: [
      "Vice-reinos: 'dois Novos + Peru + Rio da Prata'.",
      "Capitanias Gerais: C-G-C-V = Cuba, Guatemala, Chile, Venezuela.",
    ],
  },
  {
    id: "hist-t3-q02",
    topic: "america-espanhola",
    prompt:
      "Um comerciante da colônia espanhola queria vender sua prata direto a um navio inglês, que pagava mais. Que regra proibia esse negócio?",
    options: [
      {
        id: "A",
        text: "O Pacto Colonial",
        correct: true,
        explanation:
          "Correta. O Pacto Colonial era a regra do comércio externo que dava à metrópole (a Espanha) a exclusividade do comércio com a colônia. Assim a Espanha mantinha a balança comercial favorável, e vender a outro país era proibido.",
      },
      {
        id: "B",
        text: "A encomienda",
        correct: false,
        explanation:
          "A encomienda era o sistema em que indígenas ficavam sob o controle de um indivíduo, que os usava como mão de obra, em troca de a Coroa oferecer a catequização. Tenta porque também é uma regra da colônia espanhola. Mas trata de trabalho, não de com quem se pode comerciar.",
      },
      {
        id: "C",
        text: "O Tratado de Tordesilhas",
        correct: false,
        explanation:
          "O Tratado de Tordesilhas (1494) dividiu as terras da América entre Espanha e Portugal. Tenta porque é um acordo que limitava o que cada país podia fazer. Mas ele dividia território entre dois reinos; não dizia nada sobre a quem a colônia podia vender.",
      },
      {
        id: "D",
        text: "As Capitulações de Santa Fé",
        correct: false,
        explanation:
          "As Capitulações de Santa Fé foram o acordo que fez de Colombo a principal autoridade das terras descobertas, com direito a um dízimo das riquezas. Tenta porque fala de riquezas da colônia. Mas era um contrato com uma pessoa, Colombo, e não uma regra de comércio.",
      },
    ],
    tips: [
      "Pacto Colonial = a colônia só comercia com a sua metrópole.",
      "Metrópole é o país que domina; colônia é o território dominado.",
    ],
  },
  {
    id: "hist-t3-q03",
    topic: "america-espanhola",
    prompt:
      "Em todas as cidades da América espanhola havia um órgão que regulava a vida dos habitantes e fiscalizava as propriedades públicas. Qual era?",
    options: [
      {
        id: "A",
        text: "A audiência",
        correct: false,
        explanation:
          "A audiência era o tribunal de juízes que funcionava nas sedes dos Vice-reinos, cuidando da Justiça e dos funcionários reais. Tenta porque também é um órgão de governo espanhol. Mas existia só nas sedes dos Vice-reinos, não em todas as cidades, e julgava em vez de administrar a cidade.",
      },
      {
        id: "B",
        text: "O vice-rei",
        correct: false,
        explanation:
          "O vice-rei era o nobre que governava um Vice-reino inteiro em nome da Coroa. Tenta porque era a maior autoridade na colônia. Mas é uma pessoa, não um órgão, e cuidava de um território enorme, não da vida de cada cidade.",
      },
      {
        id: "C",
        text: "A Igreja",
        correct: false,
        explanation:
          "A Igreja também estava em todas as cidades: propagava a fé cristã, fiscalizava os costumes e atuava na educação. Tenta porque aparece junto com a resposta no esquema ('igreja + ...'). Mas o órgão de governo que regulava a vida dos habitantes e as propriedades públicas era outro.",
      },
      {
        id: "D",
        text: "O cabildo",
        correct: true,
        explanation:
          "Correta. O cabildo era o conselho municipal: o órgão do governo que regulava a vida dos habitantes e fiscalizava as propriedades públicas. Toda cidade espanhola na América tinha uma igreja e um cabildo.",
      },
    ],
    tips: [
      "Em toda cidade: igreja (fé) + cabildo (conselho municipal).",
      "Audiência = tribunal, só nas sedes dos Vice-reinos.",
    ],
  },
  {
    id: "hist-t3-q04",
    topic: "america-espanhola",
    prompt:
      "Um funcionário real foi acusado de desviar dinheiro na sede de um Vice-reino espanhol. Qual órgão era responsável por julgá-lo?",
    options: [
      {
        id: "A",
        text: "O cabildo da cidade",
        correct: false,
        explanation:
          "O cabildo era o conselho municipal que regulava a vida dos habitantes e fiscalizava as propriedades públicas. Tenta porque cuidava da ordem na cidade. Mas não era um tribunal, e os funcionários reais respondiam a outro órgão.",
      },
      {
        id: "B",
        text: "A audiência",
        correct: true,
        explanation:
          "Correta. A audiência era o tribunal de juízes nas sedes dos Vice-reinos; cuidava da Justiça e da administração dos funcionários reais. Um funcionário acusado na sede do Vice-reino seria julgado por ela.",
      },
      {
        id: "C",
        text: "O ouvidor-mor",
        correct: false,
        explanation:
          "O ouvidor-mor era o responsável pela Justiça no Governo-Geral do Brasil, criado por Portugal em 1548. Tenta porque também cuidava da Justiça. Mas era um cargo português, e a pergunta é sobre um Vice-reino espanhol.",
      },
      {
        id: "D",
        text: "O capitão de uma Capitania Geral",
        correct: false,
        explanation:
          "O capitão governava uma Capitania Geral (como Cuba ou Chile), uma divisão submetida a um vice-reino. Tenta porque era uma autoridade espanhola. Mas era um governante, não um tribunal, e a pergunta se passa na sede de um Vice-reino.",
      },
    ],
    tips: [
      "Audiência = tribunal de juízes (Espanha). Ouvidor-mor = Justiça (Portugal, no Brasil).",
      "Antes de responder, veja se a pergunta é sobre a América espanhola ou portuguesa.",
    ],
  },
  {
    id: "hist-t3-q05",
    topic: "america-espanhola",
    prompt: "Por que a Coroa espanhola criou os Vice-reinos e as Capitanias Gerais?",
    options: [
      {
        id: "A",
        text: "Para controlar o contrabando, a sonegação de impostos e os roubos, fortalecendo o Pacto Colonial",
        correct: true,
        explanation:
          "Correta. À medida que a colonização crescia, a Coroa queria controlar os contrabandos, a sonegação de impostos e os roubos. Com uma estrutura de governo espalhada pelo território, garantia que a riqueza fosse para a Espanha, fortalecendo o Pacto Colonial.",
      },
      {
        id: "B",
        text: "Para dar aos criollos os cargos políticos que eles exigiam desde a conquista",
        correct: false,
        explanation:
          "Os criollos eram os descendentes de espanhóis nascidos na América: ricos, mas sem os mesmos direitos políticos dos chapetones. Tenta porque fala de cargos na colônia. Mas os altos cargos ficavam com os chapetones; negar poder aos criollos foi um dos motivos de descontentamento.",
      },
      {
        id: "C",
        text: "Para proteger os indígenas da escravização e da violência dos colonos",
        correct: false,
        explanation:
          "A escravização dos indígenas chegou a ser proibida, e a violência na encomienda também. Tenta porque essas proibições existiram. Mas o trabalho forçado continuou (mita e encomienda), e o livro diz que a estrutura foi criada para controlar a riqueza, não para proteger os nativos.",
      },
      {
        id: "D",
        text: "Para dividir as terras com Portugal, conforme a linha de Tordesilhas",
        correct: false,
        explanation:
          "A divisão de terras entre Espanha e Portugal foi feita pelo Tratado de Tordesilhas, em 1494. Tenta porque é uma divisão de território. Mas os Vice-reinos organizavam o governo dentro da América espanhola; não tinham nada a ver com a fronteira com Portugal.",
      },
    ],
    tips: [
      "A estrutura administrativa espanhola servia para controlar a riqueza: contrabando, impostos e roubos.",
      "Controle da colônia e Pacto Colonial andam juntos.",
    ],
  },
  {
    id: "hist-t3-q06",
    topic: "america-espanhola",
    prompt: "Qual era a principal atividade econômica da América espanhola?",
    options: [
      {
        id: "A",
        text: "O cultivo de cana-de-açúcar nos engenhos",
        correct: false,
        explanation:
          "A cana-de-açúcar foi a riqueza das capitanias de São Vicente e Pernambuco, no Brasil português. Tenta porque foi a grande produção colonial de Portugal. Mas na América espanhola a atividade principal era outra.",
      },
      {
        id: "B",
        text: "A extração de pau-brasil por meio do escambo",
        correct: false,
        explanation:
          "O pau-brasil era a madeira que tingia tecidos de vermelho, explorada pelos portugueses no litoral do Brasil, sobretudo até 1530, trocando mercadorias com os indígenas (escambo). Tenta porque foi a primeira atividade econômica colonial do livro. Mas é portuguesa, não espanhola.",
      },
      {
        id: "C",
        text: "A mineração de ouro e prata",
        correct: true,
        explanation:
          "Correta. A mineração de ouro e prata era a principal atividade. A riqueza era enviada à metrópole, junto com impostos e taxas. Havia também agricultura e gado em grandes propriedades, para exportação.",
      },
      {
        id: "D",
        text: "O comércio de especiarias trazidas da Ásia",
        correct: false,
        explanation:
          "As especiarias da Ásia eram o grande objetivo das navegações: foi buscando um caminho até elas que Colombo chegou à América. Tenta porque motivaram a viagem. Mas a América não produzia essas especiarias; a riqueza que a Espanha encontrou ali foi o metal.",
      },
    ],
    tips: [
      "Espanha: metais (ouro e prata). Portugal: pau-brasil, depois açúcar.",
      "Separe o que motivou a viagem do que sustentou a colônia depois.",
    ],
  },
  {
    id: "hist-t3-q07",
    topic: "america-espanhola",
    prompt:
      "Um homem nasceu em Lima, filho de pais espanhóis. É rico e dono de muitas terras, mas não pode ocupar os altos cargos políticos da colônia. A que grupo social ele pertence?",
    options: [
      {
        id: "A",
        text: "Chapetones",
        correct: false,
        explanation:
          "Os chapetones (ou guachupines) eram espanhóis nascidos na Espanha que viviam na América e ocupavam os cargos políticos, administrativos, militares e religiosos. Tenta porque também tinham origem espanhola e riqueza. Mas o homem nasceu na América e não pode ocupar os altos cargos, o contrário de um chapetón.",
      },
      {
        id: "B",
        text: "Mestiços",
        correct: false,
        explanation:
          "Os mestiços eram descendentes de espanhóis, indígenas e africanos: uma camada intermediária de trabalhadores livres, sem acesso a cargo político. Tenta porque também nasceram na América e não tinham poder político. Mas o homem é filho de pais espanhóis e muito rico, o que não descreve um mestiço.",
      },
      {
        id: "C",
        text: "Donatários",
        correct: false,
        explanation:
          "Donatários eram os capitães-mores que recebiam uma capitania hereditária da Coroa portuguesa, no Brasil. Tenta porque eram donos de muita terra. Mas é um cargo do Brasil português, não um grupo social da América espanhola.",
      },
      {
        id: "D",
        text: "Criollos",
        correct: true,
        explanation:
          "Correta. Criollos eram descendentes de espanhóis nascidos na América. Eram latifundiários e comerciantes, com bastante riqueza, mas sem os mesmos direitos políticos dos chapetones. Essa diferença gerava muito descontentamento.",
      },
    ],
    tips: [
      "Chapetones = nasceram na Espanha e mandam. Criollos = nasceram na América: ricos, sem poder político.",
      "Entre chapetones e criollos, o que decide é onde a pessoa nasceu: os pais dos dois eram espanhóis.",
    ],
  },
  {
    id: "hist-t3-q08",
    topic: "america-espanhola",
    prompt:
      "Na mita, os indígenas eram escalados para trabalhar nas minas por longos períodos. O que recebiam no fim?",
    options: [
      {
        id: "A",
        text: "A catequização, oferecida pela Coroa em troca do trabalho",
        correct: false,
        explanation:
          "A catequização como troca pelo trabalho era a regra da encomienda: o indígena prestava serviços a um indivíduo e a Coroa oferecia o ensino da fé cristã. Tenta porque mita e encomienda são as duas formas de trabalho forçado do mesmo quadro. Mas na mita o pagamento era outro.",
      },
      {
        id: "B",
        text: "Uma pequena parte do minério extraído, chamada partido",
        correct: true,
        explanation:
          "Correta. Na mita, os indígenas trabalhavam na extração de minérios por longos períodos e, no fim, recebiam uma pequena parte do minério, o partido. A mita era uma adaptação de um costume que já existia entre os incas.",
      },
      {
        id: "C",
        text: "Um lote de terra para plantar, chamado sesmaria",
        correct: false,
        explanation:
          "Sesmaria era uma terra doada pelo donatário, um dos direitos da Carta foral nas capitanias do Brasil. Tenta porque também é uma forma de 'pagamento' em terra. Mas é um instituto português, e os indígenas da mita não recebiam terras.",
      },
      {
        id: "D",
        text: "A liberdade e os mesmos direitos políticos dos criollos",
        correct: false,
        explanation:
          "Os direitos políticos eram restritos até para os criollos, os descendentes de espanhóis nascidos na América. Tenta porque parece uma recompensa justa por anos de trabalho. Mas os indígenas ficavam na base da sociedade colonial, e a mita não dava liberdade nem direitos.",
      },
    ],
    tips: [
      "Mita = minas + pagamento pequeno em minério (o partido).",
      "Encomienda = serviços a um indivíduo + catequização como troca.",
    ],
  },
  {
    id: "hist-t3-q09",
    topic: "america-espanhola",
    prompt:
      "A escravização dos indígenas foi proibida na América espanhola, mas os colonos passaram a usar escravizados africanos. Qual foi o motivo, segundo o livro?",
    options: [
      {
        id: "A",
        text: "A Igreja proibiu a catequização dos indígenas que trabalhavam nas minas",
        correct: false,
        explanation:
          "A catequização era justamente uma das ferramentas da Igreja para garantir o domínio espanhol, e fazia parte da encomienda. Tenta porque mistura Igreja e trabalho indígena. Mas a Igreja não proibia catequizar; ela catequizava, e isso não explica a troca de mão de obra.",
      },
      {
        id: "B",
        text: "Os africanos tinham direitos políticos e podiam ser contratados como trabalhadores livres",
        correct: false,
        explanation:
          "Trabalhadores livres, sem cargo político, eram os mestiços, a camada intermediária da sociedade. Tenta porque descreve uma forma de trabalho que existia na colônia. Mas os africanos trazidos à força eram escravizados, sem nenhum direito.",
      },
      {
        id: "C",
        text: "A mão de obra indígena ficou escassa",
        correct: true,
        explanation:
          "Correta. Com a escassez de mão de obra indígena (muitos tinham morrido por doenças, guerras e trabalho forçado), os colonos passaram a usar escravizados africanos. Eles trabalhavam sobretudo na agricultura e nos serviços domésticos, e estavam mais presentes na América Central.",
      },
      {
        id: "D",
        text: "O Pacto Colonial obrigava a colônia a comprar trabalhadores da Espanha",
        correct: false,
        explanation:
          "O Pacto Colonial dava à metrópole a exclusividade do comércio com a colônia. Tenta porque é uma regra que obrigava a colônia a negociar só com a Espanha. Mas ele trata de comércio de mercadorias e não é a explicação que o livro dá para o uso de escravizados africanos.",
      },
    ],
    tips: [
      "Menos indígenas para trabalhar = mais escravizados africanos.",
      "Escravizados africanos: mais na América Central; nas outras regiões, mão de obra indígena.",
    ],
  },
  {
    id: "hist-t3-q10",
    topic: "america-espanhola",
    prompt:
      "Um colono espanhol recebeu da Coroa o controle de um grupo de indígenas para trabalhar em suas minas e terras. Em troca, a Coroa garantia que esses indígenas fossem catequizados. Como se chamava esse sistema?",
    options: [
      {
        id: "A",
        text: "Mita",
        correct: false,
        explanation:
          "A mita era o trabalho indígena nas minas, por longos períodos, com um pequeno pagamento em minério, o partido; era uma adaptação de um costume inca. Tenta porque também é trabalho forçado nas minas. Mas a mita era paga com o partido; o livro não fala de um colono que controlasse o grupo nem da catequização como troca.",
      },
      {
        id: "B",
        text: "Escambo",
        correct: false,
        explanation:
          "Escambo é a troca de mercadorias ou serviços sem usar dinheiro, como faziam portugueses e indígenas com o pau-brasil. Tenta porque o enunciado também descreve uma troca. Mas o escambo era um negócio entre as duas partes, e aqui os indígenas ficavam sob o controle de alguém.",
      },
      {
        id: "C",
        text: "Guerras justas",
        correct: false,
        explanation:
          "Guerras justas eram a regra do Brasil colonial: indígenas que atacassem os colonizadores podiam ser escravizados, e os outros deviam ser catequizados. Tenta porque também liga trabalho forçado e catequização. Mas é uma regra portuguesa, sobre quem podia ser escravizado.",
      },
      {
        id: "D",
        text: "Encomienda",
        correct: true,
        explanation:
          "Correta. Na encomienda, os indígenas ficavam sob o controle de um indivíduo, que podia usá-los como mão de obra na mineração ou em outras atividades. Em troca, a Coroa oferecia a catequização. A violência era proibida, mas as condições eram precárias.",
      },
    ],
    tips: [
      "Encomienda: 'encomendar' indígenas a um colono, com a catequização como troca.",
      "Mita e encomienda são espanholas; guerras justas e escambo aparecem no Brasil.",
    ],
  },
];
