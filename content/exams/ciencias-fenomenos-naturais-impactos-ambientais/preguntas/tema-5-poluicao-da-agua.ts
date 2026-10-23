import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 5: Poluição da água (capítulo 11, pp. 53–54).
 *
 * Cubre la eutrofización (qué es, de dónde vienen el nitrógeno y el fósforo, la
 * cadena floração → falta de luz → descomponedores → falta de oxígeno, los gases
 * tóxicos y cómo combatirla), la contaminación por metales tóxicos y la
 * bioacumulación, y el derrame de petróleo (orígenes, efectos sobre la vida, la
 * economía y la prevención).
 */
export const TEMA_POLUICAO_DA_AGUA: ExamQuestionWithTopic[] = [
  {
    id: "cie-t5-q01",
    topic: "poluicao-da-agua",
    prompt: "O que é a eutrofização, segundo o livro?",
    options: [
      {
        id: "A",
        text: "O acúmulo de sedimentos no fundo de rios e lagos, que vão ficando rasos e obstruídos com o tempo",
        correct: false,
        explanation:
          "O acúmulo de sedimentos nos corpos d'água é o assoreamento, que o livro explica na parte de erosão do solo. Parece certa porque também deixa a água turva e mata organismos aquáticos. Mas o assoreamento é causado por terra levada para a água, enquanto a eutrofização é causada por excesso de nutrientes.",
      },
      {
        id: "B",
        text: "A proliferação excessiva de algas e cianobactérias pelo aumento de nutrientes como nitrogênio e fósforo",
        correct: true,
        explanation:
          "Correta. O livro define a eutrofização como a proliferação excessiva de algas e cianobactérias nos corpos d'água, por causa do aumento de nutrientes que contêm os elementos nitrogênio e fósforo.",
      },
      {
        id: "C",
        text: "A contaminação da água por mercúrio, chumbo e arsênio lançados por indústrias e pela mineração",
        correct: false,
        explanation:
          "Mercúrio, chumbo e arsênio são metais tóxicos; a contaminação da água por eles é outro tipo de poluição da água estudado no livro. Parece certa porque também vem de indústrias. Mas os metais intoxicam os seres vivos e se acumulam na cadeia alimentar; não fazem as algas se multiplicarem.",
      },
      {
        id: "D",
        text: "A mancha escura que se forma na superfície do mar quando um navio petroleiro sofre um acidente",
        correct: false,
        explanation:
          "A mancha escura no mar é o derramamento de petróleo, causado por vazamentos de jazidas, de navios petroleiros e de plataformas. Parece certa porque, como na eutrofização, uma camada na superfície bloqueia a luz. Mas a mancha é de óleo, e a camada da eutrofização é de algas e cianobactérias vivas.",
      },
    ],
    tips: [
      "Eutrofização = excesso de nutrientes (nitrogênio e fósforo) → explosão de algas e cianobactérias.",
      "Não confunda: eutrofização (nutrientes), assoreamento (sedimentos), metais tóxicos, petróleo.",
    ],
  },
  {
    id: "cie-t5-q02",
    topic: "poluicao-da-agua",
    prompt:
      "Uma lagoa perto de uma cidade e de várias fazendas começou a ficar verde. De onde, segundo o livro, costuma vir o excesso de nutrientes que causa a eutrofização?",
    options: [
      {
        id: "A",
        text: "Somente de fenômenos naturais, porque as atividades humanas não lançam nitrogênio nem fósforo",
        correct: false,
        explanation:
          "Essa alternativa aplica a ideia de que a eutrofização seria só natural. Parece certa porque o livro realmente diz que o aumento de nutrientes também pode ser um fenômeno natural. Mas ele cita também, e em primeiro lugar, o lançamento indiscriminado de esgoto e de resíduos de atividades humanas.",
      },
      {
        id: "B",
        text: "Da chuva ácida, que traz da atmosfera os nutrientes que se acumulam no fundo das lagoas",
        correct: false,
        explanation:
          "A chuva ácida é a precipitação com pH abaixo de 5,6, formada por óxidos de enxofre e de nitrogênio. Parece certa porque o nitrogênio também aparece nela. Mas a chuva ácida empobrece o solo e acidifica a água; o livro não a coloca como fonte dos nutrientes da eutrofização.",
      },
      {
        id: "C",
        text: "Do lançamento de esgoto e de resíduos de atividades residenciais, agropecuárias e industriais",
        correct: true,
        explanation:
          "Correta. O livro diz que o aumento de nitrogênio e fósforo decorre do lançamento indiscriminado de esgoto e de resíduos de atividades residenciais, agropecuárias e industriais. Uma lagoa perto de uma cidade e de fazendas recebe exatamente esse tipo de resíduo.",
      },
      {
        id: "D",
        text: "Do petróleo vazado dos navios, que serve de alimento para as algas e as cianobactérias",
        correct: false,
        explanation:
          "O petróleo é um combustível fóssil; quando vaza, forma uma mancha que impede a entrada de luz e intoxica os animais. Parece certa porque também cobre a superfície da água. Mas ele não serve de alimento para as algas: na verdade, impede a fotossíntese e mata a flora.",
      },
    ],
    tips: [
      "Fontes dos nutrientes: esgoto e resíduos de casas, da agropecuária e das indústrias. Também pode ser natural.",
      "Lagoa ficando verde perto de cidade ou de fazenda: pense em eutrofização.",
    ],
  },
  {
    id: "cie-t5-q03",
    topic: "poluicao-da-agua",
    prompt:
      "Na eutrofização, por que os peixes e outros organismos que dependem de oxigênio acabam morrendo?",
    options: [
      {
        id: "A",
        text: "Porque as algas soltam um veneno na água que ataca o sistema nervoso de todos os peixes",
        correct: false,
        explanation:
          "Essa alternativa imagina que as algas envenenariam diretamente os peixes. Parece certa porque o livro fala de gases tóxicos produzidos na água eutrofizada. Mas a explicação que ele dá para a morte dos peixes é a falta de oxigênio causada pelas bactérias decompositoras, e não um veneno das algas.",
      },
      {
        id: "B",
        text: "Porque a água fica ácida demais, com pH abaixo de 5,6, e os peixes não resistem à acidez",
        correct: false,
        explanation:
          "Água ácida, com pH abaixo de 5,6, é o efeito da chuva ácida sobre os ambientes aquáticos. Parece certa porque, nos dois casos, os ecossistemas aquáticos perdem seres vivos. Mas na eutrofização o problema não é a acidez, e sim o oxigênio, consumido pelas bactérias que decompõem a matéria orgânica.",
      },
      {
        id: "C",
        text: "Porque o excesso de algas aumenta demais o oxigênio da água, e esse oxigênio extra acaba intoxicando os peixes",
        correct: false,
        explanation:
          "Essa alternativa raciocina que mais algas fazendo fotossíntese dariam mais oxigênio. Parece certa porque as algas realmente fazem fotossíntese. Mas o livro diz o contrário: a camada de algas bloqueia a luz, os organismos de baixo morrem, e as bactérias decompositoras reduzem o oxigênio da água.",
      },
      {
        id: "D",
        text: "Porque as algas bloqueiam a luz, organismos morrem, e as bactérias que os decompõem consomem o oxigênio",
        correct: true,
        explanation:
          "Correta. A floração cria uma camada que impede a entrada de luz; os organismos fotossintetizantes de baixo morrem. Com mais matéria orgânica e nutrientes, proliferam as bactérias decompositoras, que reduzem a quantidade de oxigênio, e morrem os organismos que dependem dele.",
      },
    ],
    tips: [
      "Cadeia da eutrofização: nutrientes → floração → falta de luz → morte → decompositores → falta de oxigênio.",
      "Quem consome o oxigênio são as bactérias decompositoras, não as algas.",
    ],
  },
  {
    id: "cie-t5-q04",
    topic: "poluicao-da-agua",
    prompt:
      "Uma lagoa eutrofizada passou a ter um cheiro forte e desagradável. Que explicação o livro dá para esse cheiro?",
    options: [
      {
        id: "A",
        text: "O cheiro vem do esgoto que chega à lagoa, e desaparece assim que as algas começam a crescer",
        correct: false,
        explanation:
          "O esgoto é uma das fontes dos nutrientes que causam a eutrofização, e tem mesmo cheiro forte. Parece certa porque é a fonte de mau cheiro mais óbvia. Mas o livro explica o odor pelos gases produzidos pelas bactérias num ambiente sem oxigênio, e esse cheiro aparece depois do crescimento das algas, não antes.",
      },
      {
        id: "B",
        text: "Bactérias num ambiente sem oxigênio produzem gases tóxicos de odor intenso, como o metano e o enxofre",
        correct: true,
        explanation:
          "Correta. O livro diz que a atuação das bactérias decompositoras em um ambiente sem oxigênio leva à produção de gases tóxicos de odor intenso e desagradável, como o metano e o enxofre.",
      },
      {
        id: "C",
        text: "As algas da superfície liberam ozônio, um gás de cheiro forte que se espalha pela região",
        correct: false,
        explanation:
          "O ozônio é o gás que forma a camada que filtra os raios ultravioleta, bem alto na atmosfera. Parece certa porque é um gás citado no mesmo capítulo. Mas o livro não diz que as algas soltam ozônio; os gases do mau cheiro são o metano e o enxofre, produzidos por bactérias.",
      },
      {
        id: "D",
        text: "O chorume do lixo depositado em volta da lagoa evapora e espalha um cheiro muito forte",
        correct: false,
        explanation:
          "O chorume é o líquido tóxico formado na decomposição do lixo orgânico, que contamina o solo e o lençol freático e libera metano. Parece certa porque também está ligado a decomposição e mau cheiro. Mas pertence à poluição do solo pelo lixo; na lagoa eutrofizada, os gases vêm das bactérias da própria água.",
      },
    ],
    tips: [
      "Sem oxigênio, as bactérias decompositoras produzem gases tóxicos, como o metano e compostos de enxofre; os de enxofre são os que dão o mau cheiro.",
      "O metano aparece em três lugares do capítulo: efeito estufa, chorume e eutrofização.",
    ],
  },
  {
    id: "cie-t5-q05",
    topic: "poluicao-da-agua",
    prompt: "Que medida o livro indica para combater a eutrofização?",
    options: [
      {
        id: "A",
        text: "Controlar a entrada de nutrientes e sedimentos nos corpos d'água e recuperar as áreas eutrofizadas",
        correct: true,
        explanation:
          "Correta. O livro diz que, para combater a eutrofização, deve-se controlar a entrada de nutrientes e sedimentos nos corpos d'água e implementar medidas para a recuperação de áreas eutrofizadas. Atacar a entrada de nutrientes é atacar a causa.",
      },
      {
        id: "B",
        text: "Adicionar mais fósforo e nitrogênio à água, para que os peixes tenham mais alimento disponível",
        correct: false,
        explanation:
          "Fósforo e nitrogênio são os nutrientes cujo excesso causa a eutrofização. Parece certa porque nutriente parece sinônimo de alimento bom. Mas acrescentar mais deles pioraria o problema, com ainda mais algas e menos oxigênio.",
      },
      {
        id: "C",
        text: "Fazer coleta seletiva e compostagem do lixo orgânico nas cidades próximas aos corpos d'água",
        correct: false,
        explanation:
          "A coleta seletiva separa o lixo para reciclagem, e a compostagem transforma o lixo orgânico em adubo; o livro as indica para reduzir a poluição do solo pelo lixo. Parece certa porque são boas medidas ambientais. Mas não são as que o livro aponta para a eutrofização, cuja causa é o esgoto e os resíduos ricos em nutrientes.",
      },
      {
        id: "D",
        text: "Proibir os CFCs nos aerossóis, porque eles descem com a chuva e alimentam as algas e as bactérias",
        correct: false,
        explanation:
          "Os CFCs são gases de cloro, flúor e carbono que destroem a camada de ozônio e foram proibidos pelo Protocolo de Montreal. Parece certa porque proibir uma substância parece uma solução forte. Mas os CFCs agem na atmosfera e não alimentam as algas.",
      },
    ],
    tips: [
      "Contra a eutrofização: menos nutrientes e sedimentos entrando na água, e recuperação das áreas atingidas.",
      "Cada problema tem a medida que ataca a sua causa; não troque as medidas entre os assuntos.",
    ],
  },
  {
    id: "cie-t5-q06",
    topic: "poluicao-da-agua",
    prompt:
      "Que atividades o livro cita como responsáveis pela contaminação das águas por metais tóxicos, e que metais são esses?",
    options: [
      {
        id: "A",
        text: "Hospitais e residências, que lançam ozônio, metano e gás carbônico nos rios das cidades",
        correct: false,
        explanation:
          "Ozônio, metano e gás carbônico são gases: o ozônio forma a camada que filtra os raios UV, e o metano e o gás carbônico são gases de efeito estufa. Parece certa porque são substâncias citadas no capítulo. Mas nenhum deles é metal; os metais tóxicos do livro são outros.",
      },
      {
        id: "B",
        text: "Agricultura e pecuária, que lançam nitrogênio e fósforo, vindos do adubo e do esterco, nos rios e lagos",
        correct: false,
        explanation:
          "Nitrogênio e fósforo são os nutrientes que a agropecuária lança nos rios e que causam a eutrofização. Parece certa porque também são elementos químicos que poluem a água. Mas não são metais tóxicos, e o problema que causam é a proliferação de algas, não a intoxicação.",
      },
      {
        id: "C",
        text: "Indústrias de tintas, metalúrgicas e mineração, que lançam mercúrio, chumbo, arsênio, níquel e manganês",
        correct: true,
        explanation:
          "Correta. O livro diz que o descarte de rejeitos de fábricas de tintas, metalúrgicas e de algumas atividades como a mineração contamina as águas com metais tóxicos, como mercúrio, chumbo, arsênio, níquel e manganês.",
      },
      {
        id: "D",
        text: "Navios petroleiros e plataformas, que lançam óleo e outros derivados do petróleo no oceano",
        correct: false,
        explanation:
          "Navios petroleiros e plataformas são as fontes do derramamento de petróleo, outro tipo de poluição da água. Parece certa porque também são atividades industriais que poluem a água. Mas o petróleo é um combustível fóssil, não um metal tóxico.",
      },
    ],
    tips: [
      "Metais tóxicos: mercúrio, chumbo, arsênio, níquel e manganês. Fontes: tintas, metalurgia e mineração.",
      "Na Amazônia, o livro liga a mineração à contaminação da água por mercúrio.",
    ],
  },
  {
    id: "cie-t5-q07",
    topic: "poluicao-da-agua",
    prompt:
      "Peixes pequenos de um rio absorvem um pouco de mercúrio. Peixes maiores os comem, e depois pessoas comem esses peixes maiores. Como se chama o fenômeno que deixa o mercúrio cada vez mais concentrado?",
    options: [
      {
        id: "A",
        text: "Eutrofização, porque o mercúrio é um nutriente que se acumula na água e alimenta as algas",
        correct: false,
        explanation:
          "A eutrofização é a proliferação excessiva de algas causada pelo excesso de nutrientes como nitrogênio e fósforo. Parece certa porque também envolve algo que se acumula na água. Mas o mercúrio não é nutriente: é um metal tóxico que se acumula no corpo dos animais, não na água.",
      },
      {
        id: "B",
        text: "Biodegradação, porque o mercúrio vai sendo decomposto por bactérias e fungos em cada ser vivo ao longo da cadeia",
        correct: false,
        explanation:
          "Biodegradação é a decomposição de uma substância por seres vivos, como bactérias e fungos. Parece certa porque o nome também começa com 'bio'. Mas o livro diz justamente que os metais tóxicos não são biodegradados no ambiente; por isso eles se acumulam.",
      },
      {
        id: "C",
        text: "Assoreamento, porque o mercúrio se deposita no fundo do rio junto com a terra e as pedras",
        correct: false,
        explanation:
          "O assoreamento é o acúmulo de sedimentos no fundo dos corpos d'água, causado pela erosão. Parece certa porque fala de algo se acumulando no rio. Mas o enunciado descreve o metal passando de um ser vivo para outro, pela alimentação, e não se depositando no fundo.",
      },
      {
        id: "D",
        text: "Bioacumulação, porque o metal se acumula nos tecidos e vai se concentrando ao longo da cadeia alimentar",
        correct: true,
        explanation:
          "Correta. O livro diz que os metais tóxicos se acumulam nos tecidos dos organismos e vão se concentrando ao longo da cadeia alimentar, num processo chamado bioacumulação. Quem está no fim da cadeia, como as pessoas, recebe a maior concentração.",
      },
    ],
    tips: [
      "Bioacumulação: o metal se acumula nos tecidos e fica mais concentrado a cada nível da cadeia alimentar.",
      "Metais tóxicos não são biodegradados: é por isso que se acumulam.",
    ],
  },
  {
    id: "cie-t5-q08",
    topic: "poluicao-da-agua",
    prompt:
      "Quando ocorre um vazamento de petróleo nos oceanos, por que a flora marinha e os animais que se alimentam dela morrem?",
    options: [
      {
        id: "A",
        text: "Porque o óleo esquenta a água do mar, como no aquecimento global, e as plantas não aguentam o calor",
        correct: false,
        explanation:
          "O aquecimento global é o aumento anormal das temperaturas médias do planeta, causado pela intensificação do efeito estufa. Parece certa porque o petróleo, queimado, contribui para esse aquecimento. Mas a mancha de óleo no mar mata a flora por bloquear a luz, e não por esquentar a água.",
      },
      {
        id: "B",
        text: "Porque a mancha negra impede a entrada de luz, a fotossíntese não acontece e a flora morre",
        correct: true,
        explanation:
          "Correta. O livro diz que o vazamento forma uma mancha negra na superfície da água que impede a entrada de luz, impedindo a fotossíntese e matando a flora e os animais que se alimentam dela. Os animais também morrem impregnados ou intoxicados pelo óleo.",
      },
      {
        id: "C",
        text: "Porque o petróleo é rico em nitrogênio e fósforo e provoca uma floração de algas no mar",
        correct: false,
        explanation:
          "A floração de algas é a camada verde formada na eutrofização, provocada pelo excesso de nitrogênio e fósforo. Parece certa porque, nos dois casos, uma camada na superfície bloqueia a luz. Mas o petróleo não é nutriente: a mancha é de óleo, não de algas.",
      },
      {
        id: "D",
        text: "Porque o óleo torna a água ácida, com pH abaixo de 5,6, e as plantas marinhas não resistem",
        correct: false,
        explanation:
          "Água com pH abaixo de 5,6 é o efeito da chuva ácida, causada por óxidos de enxofre e de nitrogênio. Parece certa porque a chuva ácida também faz os ambientes aquáticos perderem biodiversidade. Mas o livro explica a morte da flora no vazamento pela falta de luz e de fotossíntese, e não pela acidez.",
      },
    ],
    tips: [
      "Mancha de petróleo: sem luz, sem fotossíntese, sem flora; e animais impregnados ou intoxicados.",
      "Duas camadas que bloqueiam a luz: a de algas (eutrofização) e a de óleo (petróleo).",
    ],
  },
  {
    id: "cie-t5-q09",
    topic: "poluicao-da-agua",
    prompt:
      "Um vazamento de petróleo atinge as praias de uma cidade turística de pescadores. Segundo o livro, quem é prejudicado e qual é a melhor forma de evitar esse problema?",
    options: [
      {
        id: "A",
        text: "Só os animais marinhos; a melhor forma de evitar é limpar as praias e os animais sujos de óleo depois de cada vazamento",
        correct: false,
        explanation:
          "Limpar as praias é uma ação de remediação, feita depois que o óleo já chegou. Parece certa porque é o que se vê nas notícias depois de um acidente. Mas o livro diz que o dano vai além dos animais, e que a melhor maneira de evitar o problema é a prevenção, antes do vazamento.",
      },
      {
        id: "B",
        text: "Só a economia da cidade; a melhor forma de evitar é proibir o turismo nas praias da região",
        correct: false,
        explanation:
          "Proibir o turismo é fechar a região aos visitantes. Parece certa porque o turismo aparece entre as atividades prejudicadas. Mas isso não evita vazamento nenhum e ainda prejudicaria mais a população; o livro também diz que a biodiversidade é atingida, não só a economia.",
      },
      {
        id: "C",
        text: "A biodiversidade, a economia e quem vive do turismo e da pesca; a melhor forma é a prevenção pelas empresas",
        correct: true,
        explanation:
          "Correta. O livro diz que o derramamento prejudica a biodiversidade, a economia e a população que vive do turismo local e da atividade pesqueira, e que a melhor maneira de evitar o problema é a prevenção por parte das empresas que atuam com o petróleo.",
      },
      {
        id: "D",
        text: "Só os pescadores; a melhor forma de evitar é trocar a pesca por outra atividade econômica",
        correct: false,
        explanation:
          "Trocar de atividade econômica é uma adaptação da população ao problema, não uma forma de evitá-lo. Parece certa porque os pescadores realmente perdem o seu sustento. Mas o vazamento atinge também a biodiversidade e o turismo, e a forma de evitar que o livro aponta é a prevenção pelas empresas.",
      },
    ],
    tips: [
      "Petróleo derramado prejudica biodiversidade, economia, turismo e pesca. Melhor solução: prevenção pelas empresas.",
      "Origens do vazamento: jazidas de extração, navios petroleiros e plataformas.",
    ],
  },
];
