import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 6: Governo-Geral, Tamoios e jesuítas (capítulo 11, pp. 193–196;
 * páginas 14 e 15 da guia).
 *
 * Por qué se creó el Gobierno General, sus cargos, los tres primeros
 * gobernadores, la Francia Antártica, la Confederação dos Tamoios, la Companhia
 * de Jesus y la catequesis (aculturación, conflicto con los colonos) y la
 * lectura de los mapas históricos.
 */
export const TEMA_GOVERNO_GERAL_E_JESUITAS: ExamQuestionWithTopic[] = [
  {
    id: "hist-t6-q01",
    topic: "governo-geral-e-jesuitas",
    prompt: "Por que a Coroa portuguesa criou, em 1548, o cargo de governador-geral?",
    options: [
      {
        id: "A",
        text: "Para dar ainda mais poder aos donatários, que pediam ajuda militar",
        correct: false,
        explanation:
          "Os donatários eram os capitães-mores que governavam as capitanias em lugar do rei. Tenta porque muitos deles estavam mesmo em dificuldades, sem soldados nem dinheiro. Mas o Governo-Geral fez o contrário: tirou autoridade dos donatários e a devolveu ao rei.",
      },
      {
        id: "B",
        text: "Para recuperar a autoridade do rei e centralizar a administração, diante da crise das capitanias",
        correct: true,
        explanation:
          "Correta. Com a crise do sistema de capitanias, a Coroa criou o governador-geral, um representante direto do rei na colônia. Assim o rei recuperou a autoridade transferida aos donatários, restabeleceu a ordem e centralizou a administração.",
      },
      {
        id: "C",
        text: "Para dividir o Brasil em Vice-reinos, como a Espanha tinha feito",
        correct: false,
        explanation:
          "Os Vice-reinos foram as quatro grandes divisões da América espanhola, governadas por vice-reis. Tenta porque o governador-geral também era um representante do rei na colônia. Mas Portugal não dividiu o Brasil em Vice-reinos; criou um governo central acima das capitanias.",
      },
      {
        id: "D",
        text: "Para trazer os jesuítas e entregar a eles o governo da colônia",
        correct: false,
        explanation:
          "Os primeiros jesuítas vieram com o primeiro governador-geral, Tomé de Sousa, para catequizar os indígenas. Tenta porque as duas coisas chegaram juntas. Mas os jesuítas cuidavam da catequese e da educação; o governo ficava com o governador-geral.",
      },
    ],
    tips: [
      "Capitanias = poder espalhado entre donatários. Governo-Geral = poder centralizado no representante do rei.",
      "1548: criação do cargo. 1549: chega o primeiro governador, Tomé de Sousa.",
    ],
  },
  {
    id: "hist-t6-q02",
    topic: "governo-geral-e-jesuitas",
    prompt:
      "Um colono deixou de pagar os impostos devidos à Coroa. Qual auxiliar do governador-geral era responsável por fiscalizar e cobrar esses impostos?",
    options: [
      {
        id: "A",
        text: "O provedor-mor",
        correct: true,
        explanation:
          "Correta. O provedor-mor cuidava da fiscalização e da coleta de impostos. Era um dos três auxiliares do governador-geral, ao lado do capitão-mor e do ouvidor-mor.",
      },
      {
        id: "B",
        text: "O ouvidor-mor",
        correct: false,
        explanation:
          "O ouvidor-mor era o responsável pela Justiça: ouvia e julgava os processos. Tenta porque um colono que não paga impostos poderia acabar sendo julgado. Mas fiscalizar e cobrar era tarefa de outro cargo.",
      },
      {
        id: "C",
        text: "O capitão-mor",
        correct: false,
        explanation:
          "O capitão-mor era o encarregado de proteger a costa contra invasões. Tenta porque era uma autoridade com força militar. Mas não cuidava de impostos.",
      },
      {
        id: "D",
        text: "O cabildo",
        correct: false,
        explanation:
          "O cabildo era o conselho municipal das cidades da América espanhola, que regulava a vida dos habitantes e fiscalizava as propriedades públicas. Tenta porque também fiscalizava. Mas era espanhol, e não fazia parte do Governo-Geral do Brasil.",
      },
    ],
    tips: [
      "Provedor 'provê' o cofre = impostos. Ouvidor ouve os processos = Justiça. Capitão cuida da costa.",
      "Os três auxiliares respondem ao governador-geral, que responde ao rei.",
    ],
  },
  {
    id: "hist-t6-q03",
    topic: "governo-geral-e-jesuitas",
    prompt:
      "Quem foi o primeiro governador-geral do Brasil, em cujo governo chegaram os primeiros padres jesuítas?",
    options: [
      {
        id: "A",
        text: "Mem de Sá",
        correct: false,
        explanation:
          "Mem de Sá foi o terceiro governador-geral (1558–1572): combateu os franceses da França Antártica, os Tamoios e os Caetés. Tenta porque é o governador mais lembrado, pelas guerras. Mas não foi o primeiro.",
      },
      {
        id: "B",
        text: "Duarte da Costa",
        correct: false,
        explanation:
          "Duarte da Costa foi o segundo governador-geral (1553–1558), num governo marcado por protestos da Câmara de Salvador e do bispo Sardinha. Tenta porque está no meio da lista dos três. Mas substituiu o primeiro, em 1553.",
      },
      {
        id: "C",
        text: "Tomé de Sousa",
        correct: true,
        explanation:
          "Correta. Tomé de Sousa foi o primeiro governador-geral (1549–1553). Visitou as capitanias para recuperá-las, criou políticas para a relação com os indígenas e trouxe os primeiros jesuítas. Não resolveu a crise colonial e, desgostoso, pediu para voltar a Portugal.",
      },
      {
        id: "D",
        text: "Martim Afonso de Sousa",
        correct: false,
        explanation:
          "Martim Afonso de Sousa patrulhou a costa entre 1530 e 1533, fundou São Vicente em 1532 e foi donatário da capitania de São Vicente. Tenta porque tem o mesmo sobrenome do certo. Mas foi donatário, nunca governador-geral.",
      },
    ],
    tips: [
      "TDM = Tomé (49), Duarte (53), Mem (58).",
      "Martim Afonso (1532) é antes das capitanias; os governadores-gerais vêm depois de 1548.",
    ],
  },
  {
    id: "hist-t6-q04",
    topic: "governo-geral-e-jesuitas",
    prompt:
      "O governo de Duarte da Costa foi marcado por protestos da Câmara de Salvador e do bispo Sardinha. Qual era o motivo das reclamações?",
    options: [
      {
        id: "A",
        text: "Ele e o filho facilitavam a escravização dos indígenas, contra a política da Coroa e da Igreja",
        correct: true,
        explanation:
          "Correta. O governador-geral e seu filho facilitavam a escravização dos indígenas, contrariando a política da Coroa e da Igreja. Em 1556 o bispo foi chamado a Portugal; na volta houve um naufrágio, e ele foi preso e morto pelos Caetés, etnia do litoral de Alagoas.",
      },
      {
        id: "B",
        text: "Ele não resolveu a crise colonial e pediu para voltar a Portugal",
        correct: false,
        explanation:
          "Não resolver a crise colonial e pedir para voltar a Portugal, desgostoso, foi o que aconteceu com Tomé de Sousa, o primeiro governador. Tenta porque é o fim de um governo difícil, logo antes do de Duarte da Costa. Mas não foi o motivo dos protestos contra ele.",
      },
      {
        id: "C",
        text: "Ele venceu os franceses, mas sem recursos para impedir que voltassem",
        correct: false,
        explanation:
          "Vencer os franceses da baía de Guanabara sem conseguir controlar a região, e vê-los voltar, aconteceu no governo de Mem de Sá, o terceiro governador. Tenta porque é outro problema dos governadores-gerais. Mas não tem relação com Duarte da Costa nem com o bispo.",
      },
      {
        id: "D",
        text: "Ele proibiu a vinda de novos jesuítas e fechou as escolas da colônia",
        correct: false,
        explanation:
          "A educação na colônia era controlada pelos jesuítas, e eles se opunham à escravização. Tenta porque o bispo era da Igreja, então o conflito parece religioso. Mas o livro não diz que Duarte da Costa proibiu jesuítas; o conflito foi pela escravização.",
      },
    ],
    tips: [
      "Duarte da Costa = protestos + bispo Sardinha + escravização de indígenas.",
      "Cada um dos três governadores tem uma marca: Tomé (jesuítas), Duarte (protestos), Mem (guerras).",
    ],
  },
  {
    id: "hist-t6-q05",
    topic: "governo-geral-e-jesuitas",
    prompt:
      "Os franceses se instalaram na baía de Guanabara e criaram a França Antártica. Como os portugueses conseguiram, por fim, derrotá-los?",
    options: [
      {
        id: "A",
        text: "Tomé de Sousa assinou um acordo e os franceses saíram em paz",
        correct: false,
        explanation:
          "Tomé de Sousa, primeiro governador-geral, enfrentou invasões estrangeiras, sobretudo de franceses e holandeses, mas não as resolveu. Tenta porque os franceses já eram um problema no governo dele. Mas o livro liga a França Antártica ao governo de Mem de Sá, e ela não terminou com um acordo de paz: terminou com guerra.",
      },
      {
        id: "B",
        text: "Os portugueses se aliaram aos Tamoios, que expulsaram os franceses",
        correct: false,
        explanation:
          "Os Tamoios eram os povos do litoral que formaram a Confederação dos Tamoios, contra os portugueses. Tenta porque os indígenas foram decisivos nessa guerra. Mas os Tamoios estavam do lado dos franceses, que lhes davam armas.",
      },
      {
        id: "C",
        text: "Mem de Sá venceu na primeira batalha e ocupou a baía para sempre",
        correct: false,
        explanation:
          "Mem de Sá reuniu um exército de colonos e indígenas e cercou o território francês. Tenta porque ele de fato venceu esse primeiro combate. Mas não tinha recursos para controlar a região, e os franceses voltaram.",
      },
      {
        id: "D",
        text: "Estácio de Sá fundou o Rio de Janeiro em 1565, e em 1567 franceses e Tamoios foram vencidos",
        correct: true,
        explanation:
          "Correta. Como os franceses voltaram, em 1565 Estácio de Sá, sobrinho de Mem de Sá, fundou São Sebastião do Rio de Janeiro para derrotá-los. Em 1567 os franceses e os Tamoios foram vencidos.",
      },
    ],
    tips: [
      "França Antártica = franceses na baía de Guanabara (RJ).",
      "1565: Estácio de Sá funda o Rio. 1567: franceses e Tamoios vencidos.",
    ],
  },
  {
    id: "hist-t6-q06",
    topic: "governo-geral-e-jesuitas",
    prompt: "O que foi a Confederação dos Tamoios?",
    options: [
      {
        id: "A",
        text: "A aliança entre os portugueses e os Tupiniquins contra os Tupinambás",
        correct: false,
        explanation:
          "A aliança entre portugueses e Tupiniquins contra os Tupinambás aparece no capítulo 10, sobre a chegada dos portugueses. Tenta porque também é uma aliança entre povos no litoral sudeste. Mas na Confederação os indígenas estavam contra os portugueses, não ao lado deles.",
      },
      {
        id: "B",
        text: "A união de povos indígenas de etnias diferentes do litoral, com apoio francês, contra os portugueses",
        correct: true,
        explanation:
          "Correta. Grupos indígenas do litoral (atuais São Paulo e Rio de Janeiro), de etnias diferentes, se uniram contra os colonizadores. Guerreiros Tupinambá lideraram Guaianás, Aymorés e outros do macrogrupo Tupi, com apoio dos franceses, que lhes deram armas. Mem de Sá a reprimiu com extrema violência, e o movimento foi derrotado em 1567.",
      },
      {
        id: "C",
        text: "Uma organização dos jesuítas para reunir os indígenas em aldeias e catequizá-los",
        correct: false,
        explanation:
          "A Companhia de Jesus era a ordem dos jesuítas, que controlava a educação e organizava a vida dos indígenas segundo os valores cristãos. Tenta porque também reunia indígenas de povos diferentes. Mas a Confederação foi um movimento indígena de guerra, não religioso.",
      },
      {
        id: "D",
        text: "O conselho de líderes indígenas que governava as aldeias, como um cabildo",
        correct: false,
        explanation:
          "O cabildo era o conselho municipal das cidades espanholas, que regulava a vida dos habitantes. Tenta porque 'confederação' soa como um governo de vários líderes. Mas a Confederação dos Tamoios foi uma união para a guerra, não um governo das aldeias.",
      },
    ],
    tips: [
      "Confederação dos Tamoios = resistência indígena + alianças (com os franceses).",
      "Foi derrotada em 1567, no governo de Mem de Sá.",
    ],
  },
  {
    id: "hist-t6-q07",
    topic: "governo-geral-e-jesuitas",
    prompt: "Qual padre jesuíta se destacou na catequização dos indígenas no Brasil?",
    options: [
      {
        id: "A",
        text: "José de Anchieta",
        correct: true,
        explanation:
          "Correta. O padre José de Anchieta, da Companhia de Jesus, é o grande destaque do livro na catequização dos indígenas. Os jesuítas difundiram a língua portuguesa e o ensino dos ofícios, e contribuíram para formar uma elite branca na colônia.",
      },
      {
        id: "B",
        text: "Bispo Sardinha",
        correct: false,
        explanation:
          "O bispo Sardinha foi o líder da Igreja que protestou contra Duarte da Costa pela escravização dos indígenas e foi morto pelos Caetés depois de um naufrágio. Tenta porque é um religioso do mesmo capítulo. Mas era bispo, não um padre jesuíta conhecido pela catequese.",
      },
      {
        id: "C",
        text: "Pero Vaz de Caminha",
        correct: false,
        explanation:
          "Pero Vaz de Caminha foi o escrivão da expedição de Cabral que escreveu a carta ao rei em 1500, sugerindo enviar missões para catequizar os indígenas. Tenta porque foi ele quem propôs a catequese. Mas era escrivão, não padre, e morreu em 1500.",
      },
      {
        id: "D",
        text: "Estácio de Sá",
        correct: false,
        explanation:
          "Estácio de Sá foi o sobrinho de Mem de Sá que fundou São Sebastião do Rio de Janeiro em 1565 para derrotar os franceses. Tenta porque é um nome do mesmo período. Mas era militar, não religioso.",
      },
    ],
    tips: [
      "Anchieta = jesuíta = catequização.",
      "Jesuítas: Companhia de Jesus, educação, língua portuguesa e ofícios.",
    ],
  },
  {
    id: "hist-t6-q08",
    topic: "governo-geral-e-jesuitas",
    prompt:
      "Os jesuítas queriam eliminar o canibalismo, o nudismo e o paganismo, fazendo os indígenas adotarem a cultura europeia. Como se chama o processo em que um povo é levado a adotar a cultura de outro?",
    options: [
      {
        id: "A",
        text: "Eurocentrismo",
        correct: false,
        explanation:
          "Eurocentrismo é interpretar o mundo segundo os valores do Ocidente europeu, como fez Caminha ao descrever os indígenas. Tenta porque está na raiz da catequese: os europeus achavam a sua cultura a certa. Mas é um modo de olhar, não o processo de um povo adotar a cultura de outro.",
      },
      {
        id: "B",
        text: "Diversidade cultural",
        correct: false,
        explanation:
          "Diversidade cultural é a existência de culturas, crenças e modos de viver diferentes, que devem ser entendidos e respeitados: ser diferente não significa estar errado. Tenta porque fala de culturas em contato. Mas é o oposto da proposta dos jesuítas, que queriam apagar as diferenças.",
      },
      {
        id: "C",
        text: "Aculturação",
        correct: true,
        explanation:
          "Correta. Aculturação é quando um povo adota, ou é forçado a adotar, a cultura de outro. Eliminar o canibalismo (o ritual tupi de comer o sangue ou órgãos do prisioneiro inimigo), o nudismo e o paganismo (não ser batizado, ser politeísta) era aculturar os indígenas.",
      },
      {
        id: "D",
        text: "Escambo",
        correct: false,
        explanation:
          "Escambo é a troca de mercadorias ou serviços sem dinheiro, como no comércio do pau-brasil. Tenta porque também é uma troca entre europeus e indígenas. Mas é uma troca de coisas, não de cultura.",
      },
    ],
    tips: [
      "Aculturação = adotar (ou ser forçado a adotar) a cultura de outro povo.",
      "Paganismo = não batizado, politeísta. Canibalismo = ritual tupi para se fortalecer.",
    ],
  },
  {
    id: "hist-t6-q09",
    topic: "governo-geral-e-jesuitas",
    prompt: "Por que havia tensões entre os jesuítas e os colonos no Brasil?",
    options: [
      {
        id: "A",
        text: "Os jesuítas cobravam impostos dos colonos para sustentar as missões",
        correct: false,
        explanation:
          "Cobrar impostos era a tarefa do provedor-mor, no Governo-Geral, e dos donatários, pela Carta foral. Tenta porque os membros da Igreja tinham privilégios e influência. Mas os jesuítas não cobravam impostos, e o conflito tinha outra causa.",
      },
      {
        id: "B",
        text: "Os jesuítas se opunham à escravização dos indígenas, que os colonos queriam usar como mão de obra",
        correct: true,
        explanation:
          "Correta. Os jesuítas viam os indígenas como pessoas a salvar e se opunham à sua escravização. Como faltava mão de obra, os colonos adotaram a escravização mesmo assim, e isso gerou tensões entre os dois grupos.",
      },
      {
        id: "C",
        text: "Os colonos queriam catequizar os indígenas, e os jesuítas eram contra",
        correct: false,
        explanation:
          "A catequização era o ensino da fé cristã aos indígenas, e quem a fazia eram justamente os jesuítas. Tenta porque a catequese está no centro do conflito. Mas os papéis estão invertidos: os jesuítas catequizavam; os colonos queriam trabalho.",
      },
      {
        id: "D",
        text: "Os jesuítas apoiavam os franceses na baía de Guanabara",
        correct: false,
        explanation:
          "Quem apoiou os franceses foram os Tamoios e outros grupos indígenas da Confederação. Tenta porque os franceses foram o grande inimigo do período. Mas os jesuítas atuavam junto com a Coroa portuguesa, e o livro não fala de nenhum apoio deles aos franceses.",
      },
    ],
    tips: [
      "Jesuítas: salvar e catequizar. Colonos: mão de obra. Os dois interesses se chocavam.",
      "Os indígenas também resistiam à catequese: não aceitavam passivamente.",
    ],
  },
  {
    id: "hist-t6-q10",
    topic: "governo-geral-e-jesuitas",
    prompt:
      "Compare dois mapas: o Planisfério de Cantino (1502) e o mapa de Diego Gutiérrez (1562). O que essa comparação mostra?",
    options: [
      {
        id: "A",
        text: "Que o mapa de Cantino desenhava a América com mais precisão, por ser mais antigo",
        correct: false,
        explanation:
          "O Planisfério de Cantino (1502) mostra só parte do litoral da América do Sul, com destaque para a flora e as aves; os contornos mais exatos nele são os da África e da Ásia. Tenta porque Cantino era preciso em outras regiões. Mas, para a América, o mapa mais preciso é o mais novo.",
      },
      {
        id: "B",
        text: "Que os mapas da época eram puramente científicos, sem desenhos de animais ou elementos fantásticos",
        correct: false,
        explanation:
          "Os mapas das Grandes Navegações usavam coordenadas geográficas, que eram a parte 'moderna'. Tenta porque essa parte científica existia de verdade. Mas eles também desenhavam animais, plantas e elementos fantásticos: misturavam a mentalidade europeia com a moderna.",
      },
      {
        id: "C",
        text: "Que o mapa de Gutiérrez mostrava só o litoral brasileiro, com destaque para as aves",
        correct: false,
        explanation:
          "Mostrar só parte do litoral da América do Sul, com destaque para a flora e as aves, é a descrição do mapa de Cantino, de 1502. Tenta porque troca as descrições dos dois mapas. Mas o de Gutiérrez mostra o continente com contornos mais precisos.",
      },
      {
        id: "D",
        text: "Que os europeus foram conhecendo o território americano aos poucos",
        correct: true,
        explanation:
          "Correta. Em 1502, Cantino mostrava só parte do litoral sul-americano; em 1562, Gutiérrez já desenhava os contornos do continente com mais precisão. Comparar os dois mostra o avanço do conhecimento europeu sobre a América ao longo do tempo. Mapas antigos são fontes históricas.",
      },
    ],
    tips: [
      "Mapa mais novo = contornos da América mais precisos.",
      "Os mapas misturavam mentalidade europeia (animais, elementos fantásticos) e moderna (coordenadas).",
    ],
  },
];
