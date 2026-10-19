import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 5: Capitanias hereditárias (capítulo 11, pp. 188–193; páginas 12 e 13
 * da guia).
 *
 * Por qué Portugal pasó de explotar a ocupar, D. João III y Martim Afonso, cómo
 * funcionaba el sistema, la Carta de doação y la Carta foral (deberes, derechos,
 * guerras justas), los donatarios de la tabla y por qué el sistema tuvo éxito
 * en dos capitanías y fracasó en la mayoría.
 */
export const TEMA_CAPITANIAS_HEREDITARIAS: ExamQuestionWithTopic[] = [
  {
    id: "hist-t5-q01",
    topic: "capitanias-hereditarias",
    prompt:
      "Por volta de 1530, Portugal decidiu ocupar de verdade o Brasil, em vez de apenas explorar o pau-brasil. Quais motivos levaram a essa mudança?",
    options: [
      {
        id: "A",
        text: "Caminha tinha encontrado ouro, e a Coroa queria proteger as minas",
        correct: false,
        explanation:
          "A busca de ouro e prata motivou toda a colonização, mas Caminha registrou justamente o contrário: a aparente falta de metais. Tenta porque proteger riquezas parece um bom motivo para ocupar uma terra. Mas em 1530 ninguém tinha encontrado minas no Brasil.",
      },
      {
        id: "B",
        text: "O Tratado de Tordesilhas obrigava Portugal a povoar a sua parte das terras",
        correct: false,
        explanation:
          "O Tratado de Tordesilhas (1494) dividiu as terras da América entre Espanha e Portugal. Tenta porque Martim Afonso até fez mapas da linha de Tordesilhas. Mas o tratado só dividia; não obrigava ninguém a povoar.",
      },
      {
        id: "C",
        text: "Estrangeiros ameaçavam o domínio português, e o comércio com o Oriente rendia menos",
        correct: true,
        explanation:
          "Correta. O pau-brasil dava lucro e atraía estrangeiros (como os franceses), que ameaçavam o domínio português. Ao mesmo tempo, o comércio com o Oriente rendia menos, por causa da concorrência. Assim, ficou mais atraente planejar e efetivar a colonização.",
      },
      {
        id: "D",
        text: "Os povos do litoral pediram ao rei que os protegesse dos franceses",
        correct: false,
        explanation:
          "Na verdade, alguns povos indígenas se aliaram aos franceses contra os portugueses, como na Confederação dos Tamoios. Tenta porque os franceses eram mesmo uma ameaça. Mas a decisão de ocupar foi da Coroa, por interesses próprios, e não um pedido indígena.",
      },
    ],
    tips: [
      "Pau-brasil lucrativo + estrangeiros + Oriente rendendo menos = hora de colonizar.",
      "Linha do tempo do Brasil: 1530 ocupar, 1534 capitanias, 1548 Governo-Geral.",
    ],
  },
  {
    id: "hist-t5-q02",
    topic: "capitanias-hereditarias",
    prompt:
      "Em 1530, D. João III incentivou a vinda de colonos, mandou fundar vilas e manteve a patrulha do litoral. Segundo o livro, qual era o principal efeito dessas medidas?",
    options: [
      {
        id: "A",
        text: "Mostrar aos outros países que Portugal estava tomando posse do território",
        correct: true,
        explanation:
          "Correta. As medidas de D. João III ainda não eram uma colonização efetiva: eram sinais aos outros países de que Portugal estava tomando posse da terra. A colonização de fato começou com as capitanias hereditárias.",
      },
      {
        id: "B",
        text: "Recuperar a autoridade do rei, que estava nas mãos dos donatários",
        correct: false,
        explanation:
          "Recuperar a autoridade transferida aos donatários foi o objetivo do Governo-Geral, criado em 1548. Tenta porque também é uma medida do rei para o Brasil. Mas em 1530 ainda nem existiam donatários: as capitanias só vieram em 1534.",
      },
      {
        id: "C",
        text: "Expulsar definitivamente os franceses da baía de Guanabara",
        correct: false,
        explanation:
          "Expulsar os franceses da baía de Guanabara, onde eles fundaram a França Antártica, foi a missão de Mem de Sá, terceiro governador-geral, entre 1558 e 1572. Tenta porque os franceses já rondavam a costa em 1530. Mas isso só aconteceu décadas depois.",
      },
      {
        id: "D",
        text: "Organizar a catequese com a chegada dos primeiros padres jesuítas",
        correct: false,
        explanation:
          "Os primeiros padres jesuítas chegaram em 1549, com o primeiro governador-geral, Tomé de Sousa, para catequizar os indígenas. Tenta porque a catequização foi um dos pilares da colonização. Mas não fazia parte das medidas de 1530.",
      },
    ],
    tips: [
      "1530: sinalizar posse. 1534: capitanias. 1548: Governo-Geral.",
      "Cada etapa da colonização do Brasil 'reorganiza' a anterior.",
    ],
  },
  {
    id: "hist-t5-q03",
    topic: "capitanias-hereditarias",
    prompt: "Qual foi a primeira vila do Brasil, fundada em 1532?",
    options: [
      {
        id: "A",
        text: "São Sebastião do Rio de Janeiro",
        correct: false,
        explanation:
          "São Sebastião do Rio de Janeiro foi fundada em 1565 por Estácio de Sá, sobrinho de Mem de Sá, para derrotar os franceses. Tenta porque é uma fundação famosa do mesmo capítulo. Mas veio mais de 30 anos depois.",
      },
      {
        id: "B",
        text: "San Miguel de Piura",
        correct: false,
        explanation:
          "San Miguel de Piura foi a primeira vila espanhola na região dos incas, fundada por Francisco Pizarro, também por volta de 1532. Tenta porque tem a mesma data e também é uma 'primeira vila'. Mas é espanhola, nos Andes, e não brasileira.",
      },
      {
        id: "C",
        text: "Pernambuco",
        correct: false,
        explanation:
          "Pernambuco (Nova Lusitânia) foi uma capitania hereditária, doada a Duarte Coelho, e uma das que mais prosperaram com o açúcar. Tenta porque é um dos lugares mais importantes do Brasil colonial. Mas era uma capitania, uma grande faixa de terra, e não uma vila, e só surgiu a partir de 1534.",
      },
      {
        id: "D",
        text: "São Vicente",
        correct: true,
        explanation:
          "Correta. Em 1532, Martim Afonso de Sousa fundou São Vicente (no atual estado de São Paulo), a primeira vila do Brasil. Depois, São Vicente virou uma capitania, de dois lotes, e foi uma das mais lucrativas pelo açúcar.",
      },
    ],
    tips: [
      "São Vicente = 1532 = Martim Afonso = 1ª vila do Brasil.",
      "Vila é um povoado com governo próprio; capitania é uma grande faixa de terra.",
    ],
  },
  {
    id: "hist-t5-q04",
    topic: "capitanias-hereditarias",
    prompt: "O que significava dizer que as capitanias eram 'hereditárias'?",
    options: [
      {
        id: "A",
        text: "Que eram propriedade do donatário, que podia vendê-las a quem quisesse",
        correct: false,
        explanation:
          "Essa alternativa descreve a propriedade plena: ser dono e poder vender. Tenta porque o donatário governava a capitania como se fosse dono. Mas a Carta de doação dizia que a propriedade continuava com a Coroa: o donatário só tinha o direito de administrar e explorar.",
      },
      {
        id: "B",
        text: "Que passavam de pai para filho, como herança",
        correct: true,
        explanation:
          "Correta. Hereditário quer dizer que passa por herança: a capitania passava de pai para filho. A terra só se transferia assim, por hereditariedade, e não podia ser vendida.",
      },
      {
        id: "C",
        text: "Que eram arrendadas pela Coroa, mediante uma cobrança anual",
        correct: false,
        explanation:
          "Arrendar é ceder um território para uso de outra pessoa mediante cobrança. A Coroa fez isso com o pau-brasil antes de 1530. Tenta porque também é ceder terra sem passar a propriedade. Mas as capitanias foram doadas, e não alugadas.",
      },
      {
        id: "D",
        text: "Que eram divididas em sesmarias e entregues aos indígenas",
        correct: false,
        explanation:
          "Sesmarias eram terras que o donatário podia doar a colonos, um dos direitos da Carta foral. Tenta porque é uma palavra do mesmo assunto. Mas eram doadas a colonos, não a indígenas, e não explicam o que é 'hereditário'.",
      },
    ],
    tips: [
      "Hereditário = de herança, de pai para filho.",
      "O donatário governava em lugar do rei, mas a terra continuava sendo da Coroa.",
    ],
  },
  {
    id: "hist-t5-q05",
    topic: "capitanias-hereditarias",
    prompt:
      "Qual documento definia os limites geográficos de uma capitania e deixava claro que a propriedade continuava com a Coroa?",
    options: [
      {
        id: "A",
        text: "A Carta foral",
        correct: false,
        explanation:
          "A Carta foral era o documento com os direitos e deveres do donatário: enviar impostos, defender a terra, fundar vilas, doar sesmarias. Tenta porque também era uma carta entregue ao donatário. Mas tratava de direitos e deveres, não dos limites da terra.",
      },
      {
        id: "B",
        text: "A Carta de Caminha",
        correct: false,
        explanation:
          "A Carta de Caminha foi escrita em 1500 ao rei D. Manuel I, descrevendo as terras, os povos e o potencial econômico. Tenta porque é a 'carta' mais famosa do Brasil e depois serviu para garantir a posse portuguesa. Mas não dividia o território em capitanias.",
      },
      {
        id: "C",
        text: "A Carta de doação",
        correct: true,
        explanation:
          "Correta. A Carta de doação cedia o direito de administrar e explorar o território, mas a propriedade continuava com a Coroa. Definia os limites geográficos, e a terra só se transferia por hereditariedade. É um exemplo de fonte histórica: documento oficial que os historiadores estudam.",
      },
      {
        id: "D",
        text: "As Capitulações de Santa Fé",
        correct: false,
        explanation:
          "As Capitulações de Santa Fé foram o acordo entre os reis espanhóis e Colombo, que fazia dele a autoridade das terras descobertas. Tenta porque também concedia autoridade sobre terras. Mas é espanhol e de 1492, sem nenhuma relação com as capitanias.",
      },
    ],
    tips: [
      "Carta de doação = a terra (limites, quem administra, herança).",
      "Carta foral = as regras (direitos e deveres do donatário).",
    ],
  },
  {
    id: "hist-t5-q06",
    topic: "capitanias-hereditarias",
    prompt: "Pela Carta foral, quanto o donatário devia enviar à metrópole?",
    options: [
      {
        id: "A",
        text: "20% de todas as riquezas e 10% dos metais",
        correct: false,
        explanation:
          "Essa alternativa tem os mesmos números da regra certa, mas invertidos. Tenta porque 10 e 20 estão na Carta foral. Mas a porcentagem maior era a dos metais, que eram a riqueza mais desejada pela Coroa.",
      },
      {
        id: "B",
        text: "Seis navios por ano carregados de pau-brasil",
        correct: false,
        explanation:
          "Seis navios por ano com madeira era a obrigação de Fernão de Noronha, na concessão do pau-brasil antes de 1530. Tenta porque também é um envio de riqueza a Portugal. Mas era outro acordo, de outra época.",
      },
      {
        id: "C",
        text: "Um dízimo das riquezas, como nas Capitulações de Santa Fé",
        correct: false,
        explanation:
          "O dízimo (a décima parte das riquezas) era o que a Espanha prometeu a Colombo nas Capitulações de Santa Fé: era ele que recebia, não que pagava. Tenta porque 10% também está na Carta foral. Mas a resposta completa tem dois números diferentes.",
      },
      {
        id: "D",
        text: "10% de todas as riquezas e 20% dos metais",
        correct: true,
        explanation:
          "Correta. Entre os deveres da Carta foral estavam garantir a colonização e a defesa, enviar 10% de todas as riquezas e 20% dos metais à metrópole e zelar pelo monopólio real do pau-brasil.",
      },
    ],
    tips: [
      "Carta foral: 10% das riquezas, 20% dos metais. Para os metais, a porcentagem é o dobro.",
      "Deveres do donatário: colonizar, defender, pagar e proteger o monopólio do pau-brasil.",
    ],
  },
  {
    id: "hist-t5-q07",
    topic: "capitanias-hereditarias",
    prompt:
      "Pela regra das 'guerras justas', em que situação os colonizadores podiam escravizar um indígena?",
    options: [
      {
        id: "A",
        text: "Quando o indígena atacasse os colonizadores",
        correct: true,
        explanation:
          "Correta. Pelas guerras justas, os indígenas que atacassem os colonizadores podiam ser escravizados; os outros deviam ser catequizados. Era um dos direitos do donatário na Carta foral.",
      },
      {
        id: "B",
        text: "Quando o indígena recusasse a catequização",
        correct: false,
        explanation:
          "A catequização era o ensino da religião cristã aos indígenas, e a regra dizia que os indígenas que não atacassem deviam ser catequizados. Tenta porque liga escravização e catequese. Mas o que permitia escravizar era o ataque, e não a recusa da fé.",
      },
      {
        id: "C",
        text: "Sempre que faltasse mão de obra nos engenhos",
        correct: false,
        explanation:
          "A falta de mão de obra foi o motivo real pelo qual os colonos passaram a escravizar, e por isso entraram em conflito com os jesuítas. Tenta porque descreve o que aconteceu na prática. Mas a regra das guerras justas não autorizava isso; exigia um ataque.",
      },
      {
        id: "D",
        text: "Quando o indígena trabalhasse como intérprete para os franceses",
        correct: false,
        explanation:
          "Indígenas se aliaram aos franceses, por exemplo na Confederação dos Tamoios, e os franceses lhes davam armas. Tenta porque os franceses eram inimigos de Portugal. Mas a regra não falava em franceses nem em intérpretes.",
      },
    ],
    tips: [
      "Guerra justa: atacou → podia ser escravizado; não atacou → devia ser catequizado.",
      "Separe a regra escrita do que os colonos faziam na prática.",
    ],
  },
  {
    id: "hist-t5-q08",
    topic: "capitanias-hereditarias",
    prompt:
      "Um donatário recebeu, sozinho, três capitanias: Itamaracá, Santo Amaro e Santana. Quem foi ele?",
    options: [
      {
        id: "A",
        text: "Martim Afonso de Sousa",
        correct: false,
        explanation:
          "Martim Afonso de Sousa foi quem patrulhou a costa, fundou São Vicente em 1532 e depois recebeu a capitania de São Vicente, em dois lotes. Tenta porque é o donatário mais famoso e tem o mesmo sobrenome do certo. Mas recebeu São Vicente, não as três do enunciado.",
      },
      {
        id: "B",
        text: "Pero Lopes de Sousa",
        correct: true,
        explanation:
          "Correta. Pero Lopes de Sousa recebeu três capitanias: Itamaracá, Santo Amaro e Santana. É o donatário que aparece mais vezes na tabela das 14 capitanias.",
      },
      {
        id: "C",
        text: "Duarte Coelho",
        correct: false,
        explanation:
          "Duarte Coelho foi o donatário de Pernambuco (Nova Lusitânia), capitania que prosperou com o açúcar. Tenta porque é um dos nomes mais lembrados da tabela. Mas recebeu uma só capitania.",
      },
      {
        id: "D",
        text: "Aires da Cunha",
        correct: false,
        explanation:
          "Aires da Cunha recebeu o 1º lote do Maranhão, junto com o sócio João de Barros. Tenta porque também é um donatário que dividiu terras com outra pessoa. Mas não recebeu as três capitanias do enunciado.",
      },
    ],
    tips: [
      "Pero Lopes = 3 capitanias. Duarte Coelho = Pernambuco. Martim Afonso = São Vicente.",
      "Foram 14 capitanias, distribuídas entre 1534 e 1536.",
    ],
  },
  {
    id: "hist-t5-q09",
    topic: "capitanias-hereditarias",
    prompt:
      "Quais foram as duas capitanias mais produtivas e lucrativas, e qual produto explicava esse sucesso?",
    options: [
      {
        id: "A",
        text: "Maranhão e Ceará, pela exportação de pau-brasil",
        correct: false,
        explanation:
          "Maranhão e Ceará foram capitanias do norte do litoral, e o pau-brasil foi a primeira riqueza explorada pelos portugueses. Tenta porque junta nomes da tabela com um produto do Brasil colonial. Mas não estão entre as capitanias de sucesso, e o pau-brasil era monopólio do rei.",
      },
      {
        id: "B",
        text: "Baía de Todos os Santos e Porto Seguro, pela mineração de ouro",
        correct: false,
        explanation:
          "Baía de Todos os Santos e Porto Seguro também estão na tabela das 14 capitanias. A mineração de ouro, porém, era a riqueza da América espanhola. Tenta porque o ouro parece a explicação natural para lucro. Mas nessa época as capitanias não viviam de ouro.",
      },
      {
        id: "C",
        text: "São Vicente e Pernambuco, pela produção de açúcar",
        correct: true,
        explanation:
          "Correta. São Vicente e Pernambuco foram as mais produtivas e lucrativas, graças à produção de açúcar. Em Pernambuco, a renda dos donatários vinha em grande parte dos impostos pagos pelos colonos.",
      },
      {
        id: "D",
        text: "Itamaracá e Santana, pela criação de gado",
        correct: false,
        explanation:
          "Itamaracá e Santana foram duas das três capitanias de Pero Lopes de Sousa. A criação de gado em grandes propriedades aparece no livro como atividade da América espanhola. Tenta porque mistura um donatário famoso com uma atividade colonial real. Mas não foram as de sucesso.",
      },
    ],
    tips: [
      "Sucesso = São Vicente + Pernambuco = açúcar.",
      "O livro também diz: cinco se sustentaram sem grande lucro, três fracassaram totalmente e só duas ficaram abandonadas.",
    ],
  },
  {
    id: "hist-t5-q10",
    topic: "capitanias-hereditarias",
    prompt: "Por que a maioria das capitanias hereditárias não deu certo?",
    options: [
      {
        id: "A",
        text: "Porque a Coroa proibiu a produção de açúcar para proteger o pau-brasil",
        correct: false,
        explanation:
          "O monopólio real do pau-brasil existia, e o donatário tinha de zelar por ele. Tenta porque mistura duas regras reais da colônia. Mas a Coroa nunca proibiu o açúcar: era o que os donatários deviam organizar, e foi o que fez São Vicente e Pernambuco prosperarem.",
      },
      {
        id: "B",
        text: "Porque os jesuítas expulsaram os donatários para proteger os indígenas",
        correct: false,
        explanation:
          "Os jesuítas se opunham à escravização dos indígenas e entraram em conflito com os colonos. Tenta porque houve tensão real entre jesuítas e colonos. Mas eles chegaram em 1549, quando o sistema já estava em crise, e nunca expulsaram donatários.",
      },
      {
        id: "C",
        text: "Porque o Tratado de Tordesilhas devolveu essas terras à Espanha",
        correct: false,
        explanation:
          "O Tratado de Tordesilhas (1494) dividiu as terras entre Espanha e Portugal, décadas antes das capitanias. Tenta porque é o acordo sobre a posse da América. Mas ele não foi mudado para devolver capitanias, e o fracasso foi por dinheiro, não por fronteira.",
      },
      {
        id: "D",
        text: "Porque tornar uma capitania produtiva exigia investimentos muito altos",
        correct: true,
        explanation:
          "Correta. O donatário precisava de altos investimentos: construir engenhos e vilas, atrair colonos, importar equipamentos, objetos e até alimentos, e ter soldados, armas e munições para a defesa. E havia pouca gente: em 1570, só cerca de 20 mil europeus viviam no Brasil.",
      },
    ],
    tips: [
      "Fracasso = custava caro: engenhos, vilas, colonos, importações e defesa.",
      "Em 1570 havia só uns 20 mil europeus no Brasil inteiro.",
    ],
  },
];
