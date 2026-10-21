import type { ExamQuestionImage, ExamQuestionWithTopic } from "../../types";

/**
 * Tema 3: Ângulos correspondentes, alternos e colaterais (capítulo 10, pp. 46–59).
 *
 * Cubre las regiones interna y externa, los pares correspondientes, alternos
 * (internos y externos) y colaterales (internos y externos), qué propiedad
 * cumple cada par cuando r // s, cómo se usa eso para saber si dos rectas son
 * paralelas, las ecuaciones que salen de cada par, la paralela auxiliar por el
 * vértice de un "bico" y el teorema de los bicos (Voando Alto).
 */

const FIGURA: ExamQuestionImage = {
  src: "/exams/matematica-retas-triangulos-poligonos/retas-paralelas-transversal.png",
  alt: "Duas retas horizontais paralelas, r em cima e s embaixo, cortadas por uma reta inclinada t que desce da esquerda para a direita. No cruzamento de t com r ficam os ângulos a (acima, à direita de t), b (acima, à esquerda), c (abaixo, à esquerda) e d (abaixo, à direita). No cruzamento de t com s ficam, na mesma ordem, e (acima, à direita), f (acima, à esquerda), g (abaixo, à esquerda) e h (abaixo, à direita).",
  width: 800,
  height: 480,
};

const FIGURA_BICO: ExamQuestionImage = {
  src: "/exams/matematica-retas-triangulos-poligonos/angulo-entre-paralelas.png",
  alt: "Duas retas horizontais paralelas, r em cima e s embaixo. Do ponto A, em r, sai um segmento que desce até um ponto P entre as retas; de P, outro segmento desce até o ponto B, em s. O ângulo entre r e AP, em A, mede 35°. O ângulo entre s e BP, em B, mede 45°. O ângulo em P, entre PA e PB, está marcado com x.",
  width: 720,
  height: 480,
};

export const TEMA_ANGULOS_COM_TRANSVERSAL: ExamQuestionWithTopic[] = [
  {
    id: "mat-t3-q01",
    topic: "angulos-com-transversal",
    prompt: "Observe a figura. Qual ângulo é correspondente ao ângulo a?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "c",
        correct: false,
        explanation:
          "O ângulo c está no mesmo vértice que a, do lado oposto do cruzamento: a e c são opostos pelo vértice. Tenta porque, como o correspondente, ele também tem a mesma medida de a. Mas correspondentes ficam em vértices diferentes (um em r e outro em s), e c está no mesmo vértice de a.",
      },
      {
        id: "B",
        text: "e",
        correct: true,
        explanation:
          "Correta. Correspondentes ocupam a mesma posição em cada cruzamento: a está acima de r e à direita de t; e está acima de s e à direita de t. Um fica na região externa (a) e o outro na interna (e), do mesmo lado da transversal. Com r // s, a e e são congruentes.",
      },
      {
        id: "C",
        text: "g",
        correct: false,
        explanation:
          "O ângulo g está abaixo de s e à esquerda de t: a e g ficam nas duas regiões externas e em lados opostos de t, o que os torna alternos externos. Tenta porque, com r // s, g também tem a mesma medida de a. Mas o correspondente fica do mesmo lado de t, e g está do outro lado.",
      },
      {
        id: "D",
        text: "h",
        correct: false,
        explanation:
          "O ângulo h está abaixo de s e à direita de t: a e h ficam nas regiões externas e do mesmo lado de t, o que os torna colaterais externos, que somam 180° quando r // s. Tenta porque h está do mesmo lado de t, como o correspondente. Mas o correspondente de a precisa estar em cima da reta s, na mesma posição que a ocupa em r.",
      },
    ],
    tips: [
      "Correspondentes: mesma posição nos dois cruzamentos (a e e, b e f, c e g, d e h).",
      "Para achar o correspondente, 'deslize' o ângulo ao longo de t até o outro cruzamento.",
    ],
  },
  {
    id: "mat-t3-q02",
    topic: "angulos-com-transversal",
    prompt: "Na figura, qual destes pares é formado por ângulos alternos internos?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "c e e",
        correct: true,
        explanation:
          "Correta. Os dois estão na região interna, entre r e s, e em lados diferentes de t: c fica à esquerda (em r) e e fica à direita (em s). O outro par de alternos internos da figura é d e f. Com r // s, alternos internos são congruentes.",
      },
      {
        id: "B",
        text: "c e f",
        correct: false,
        explanation:
          "c e f estão na região interna e do mesmo lado de t (os dois à esquerda): são colaterais internos, que somam 180° quando r // s. Tenta porque estão entre as paralelas, como os alternos internos. Mas 'alterno' quer dizer em lados alternados da transversal, e c e f estão do mesmo lado.",
      },
      {
        id: "C",
        text: "a e g",
        correct: false,
        explanation:
          "a e g estão em lados opostos de t, mas os dois ficam nas regiões externas (a acima de r, g abaixo de s): são alternos externos. Tenta porque também são alternos e também são congruentes quando r // s. Mas a pergunta pede os internos, que ficam entre r e s.",
      },
      {
        id: "D",
        text: "d e h",
        correct: false,
        explanation:
          "d e h ocupam a mesma posição nos dois cruzamentos (abaixo da reta e à direita de t): são correspondentes. Tenta porque d está na região interna. Mas h está na externa e os dois estão do mesmo lado de t, enquanto alternos internos estão os dois dentro e em lados opostos.",
      },
    ],
    tips: [
      "Interno = entre r e s. Alterno = lados opostos de t.",
      "Alternos internos: c e e, d e f. Alternos externos: a e g, b e h.",
    ],
  },
  {
    id: "mat-t3-q03",
    topic: "angulos-com-transversal",
    prompt: "Observe os ângulos que ficam fora da faixa entre r e s. Qual par deles é de colaterais externos?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "a e g",
        correct: false,
        explanation:
          "a e g estão nas regiões externas, mas em lados opostos de t: são alternos externos, congruentes quando r // s. Tenta porque os dois são externos. Mas 'colateral' quer dizer do mesmo lado da transversal, e a e g estão em lados diferentes.",
      },
      {
        id: "B",
        text: "b e f",
        correct: false,
        explanation:
          "b e f ocupam a mesma posição nos dois cruzamentos (acima da reta e à esquerda de t): são correspondentes. Tenta porque estão do mesmo lado de t, como os colaterais. Mas f está na região interna, e colaterais externos precisam estar os dois fora das paralelas.",
      },
      {
        id: "C",
        text: "d e e",
        correct: false,
        explanation:
          "d e e estão do mesmo lado de t, mas os dois na região interna, entre r e s: são colaterais internos. Tenta porque são colaterais e também somam 180° quando r // s. Mas a pergunta pede os externos, que ficam acima de r e abaixo de s.",
      },
      {
        id: "D",
        text: "a e h",
        correct: true,
        explanation:
          "Correta. a fica acima de r e h fica abaixo de s, os dois nas regiões externas, e os dois à direita de t, ou seja, do mesmo lado. O outro par de colaterais externos é b e g. Quando r // s, colaterais externos são suplementares: a + h = 180°.",
      },
    ],
    tips: [
      "Colateral = mesmo lado de t. Externo = fora das paralelas.",
      "Colaterais internos: c e f, d e e. Colaterais externos: a e h, b e g.",
    ],
  },
  {
    id: "mat-t3-q04",
    topic: "angulos-com-transversal",
    prompt: "Na figura, sabe-se que r // s e que o ângulo d mede 65°. Quanto mede o ângulo f?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "115°",
        correct: false,
        explanation:
          "115° é o suplemento de 65° (180° − 65°). É a medida certa para os vizinhos de d (como a e c) e para o colateral interno de d, que é e. Tenta porque somar 180° é a regra dos colaterais. Mas d e f estão em lados opostos de t: são alternos internos, e alternos são iguais.",
      },
      {
        id: "B",
        text: "25°",
        correct: false,
        explanation:
          "25° é o complemento de 65° (90° − 65°). Tenta porque 'completar' um ângulo é uma conta comum. Mas nenhuma das relações entre paralelas e transversal usa 90°: os pares ou são iguais ou somam 180°.",
      },
      {
        id: "C",
        text: "65°",
        correct: true,
        explanation:
          "Correta. d e f estão na região interna (entre r e s) e em lados opostos de t: são alternos internos. Como r // s, alternos internos são congruentes, então f = d = 65°.",
      },
      {
        id: "D",
        text: "130°",
        correct: false,
        explanation:
          "130° é o dobro de 65°. Tenta porque parece que 'dois ângulos' pedem uma soma. Mas não existe propriedade em que um ângulo seja o dobro do outro: alternos internos têm a mesma medida.",
      },
    ],
    tips: [
      "Com r // s: correspondentes, alternos internos e alternos externos são iguais.",
      "Com r // s: colaterais (internos ou externos) somam 180°.",
    ],
  },
  {
    id: "mat-t3-q05",
    topic: "angulos-com-transversal",
    prompt:
      "Duas retas paralelas são cortadas por uma transversal. Dois ângulos colaterais internos medem 3x + 20° e 2x + 10°. Qual é o valor de x?",
    options: [
      {
        id: "A",
        text: "−10°",
        correct: false,
        explanation:
          "−10° sai de igualar as duas expressões (3x + 20° = 2x + 10°), que é o que se faz com ângulos congruentes, como correspondentes ou alternos. Tenta porque igualar é a conta mais comum do capítulo. Mas colaterais não são iguais, são suplementares, e um x negativo daria ângulos sem sentido.",
      },
      {
        id: "B",
        text: "110°",
        correct: false,
        explanation:
          "110° é a medida do ângulo 3x + 20° quando x = 30. Tenta porque aparece no fim da resolução. Mas a pergunta pede x, e não o ângulo. (O outro ângulo mede 2 · 30 + 10 = 70°, e 110° + 70° = 180°.)",
      },
      {
        id: "C",
        text: "30°",
        correct: true,
        explanation:
          "Correta. Com retas paralelas, colaterais internos são suplementares: 3x + 20° + 2x + 10° = 180°, 5x + 30° = 180°, 5x = 150°, x = 30°. Os ângulos medem 110° e 70°.",
      },
      {
        id: "D",
        text: "42°",
        correct: false,
        explanation:
          "42° sai de um erro ao passar o 30° para o outro lado: 5x = 180° + 30° = 210°. Somando os ângulos e igualando a 180° a montagem estava certa. Mas o +30° passa para o outro lado subtraindo: 5x = 180° − 30° = 150°.",
      },
    ],
    tips: [
      "Colaterais: some e iguale a 180°. Correspondentes e alternos: iguale um ao outro.",
      "Ao passar um termo para o outro lado da igualdade, o sinal dele troca.",
    ],
  },
  {
    id: "mat-t3-q06",
    topic: "angulos-com-transversal",
    prompt:
      "Uma reta t corta as retas r e s. Medindo com o transferidor, um aluno encontra dois ângulos correspondentes: um de 80° e outro de 60°. O que ele pode concluir sobre r e s?",
    options: [
      {
        id: "A",
        text: "Que r e s são concorrentes",
        correct: true,
        explanation:
          "Correta. Se dois ângulos correspondentes têm medidas diferentes, as retas r e s não são paralelas: são concorrentes. Prolongando o desenho, elas se encontram em algum ponto, como o ponto P da figura do livro com os ângulos de 80° e 60°.",
      },
      {
        id: "B",
        text: "Que r e s são paralelas",
        correct: false,
        explanation:
          "Retas paralelas, cortadas por uma transversal, formam correspondentes de medidas iguais. Tenta porque o capítulo inteiro trata de paralelas, e é fácil supor que as retas do desenho são paralelas. Mas aqui os correspondentes são diferentes (80° e 60°), e isso é justamente o sinal de que não são.",
      },
      {
        id: "C",
        text: "Que r e s são perpendiculares entre si",
        correct: false,
        explanation:
          "Retas perpendiculares são concorrentes que formam um ângulo de 90° entre si. Tenta porque perpendiculares também são concorrentes. Mas os ângulos medidos não dizem qual é o ângulo entre r e s, só que elas se encontram: nada indica que ele seja de 90°.",
      },
      {
        id: "D",
        text: "Que r e s são coincidentes",
        correct: false,
        explanation:
          "Retas coincidentes ficam uma sobre a outra, com todos os pontos em comum. Tenta porque coincidentes também são um tipo de paralelas. Mas se fossem coincidentes, t as cortaria em um único ponto e não haveria dois cruzamentos com ângulos de 80° e 60°.",
      },
    ],
    tips: [
      "Correspondentes iguais ⇔ retas paralelas. Correspondentes diferentes ⇔ retas concorrentes.",
      "O mesmo vale para alternos (iguais ou não) e colaterais (suplementares ou não).",
    ],
  },
  {
    id: "mat-t3-q07",
    topic: "angulos-com-transversal",
    prompt:
      "Duas retas paralelas cortadas por uma transversal formam dois ângulos alternos externos que medem 5x − 30° e 3x + 10°. Quanto mede cada um desses ângulos?",
    options: [
      {
        id: "A",
        text: "20°",
        correct: false,
        explanation:
          "20° é o valor de x, a incógnita da equação. Tenta porque é o primeiro resultado que aparece. Mas a pergunta pede a medida dos ângulos, e é preciso substituir x nas expressões: 5 · 20 − 30 = 70°.",
      },
      {
        id: "B",
        text: "70°",
        correct: true,
        explanation:
          "Correta. Com retas paralelas, alternos externos são congruentes: 5x − 30° = 3x + 10°, 2x = 40°, x = 20°. Substituindo: 5 · 20 − 30 = 70° e 3 · 20 + 10 = 70°. As duas expressões dão o mesmo valor, o que confirma a conta.",
      },
      {
        id: "C",
        text: "110°",
        correct: false,
        explanation:
          "110° é o suplemento de 70° (180° − 70°): é a medida dos vizinhos desses ângulos e dos seus colaterais. Tenta porque 110° também aparece na figura. Mas a pergunta é sobre os próprios alternos externos, que medem 70°.",
      },
      {
        id: "D",
        text: "40°",
        correct: false,
        explanation:
          "40° é o valor de 2x, a penúltima linha da conta (2x = 40°). Tenta porque é onde a equação 'parece' terminar. Mas ainda falta dividir por 2 para achar x = 20° e depois substituir para achar o ângulo.",
      },
    ],
    tips: [
      "Alternos externos, com r // s, são iguais: iguale as expressões.",
      "A conta acaba quando você responde o que foi pedido: x ou a medida do ângulo.",
    ],
  },
  {
    id: "mat-t3-q08",
    topic: "angulos-com-transversal",
    prompt:
      "Uma reta transversal corta duas paralelas formando ângulos correspondentes de medidas 2x + 50° e 3x + 20°. Qual é a medida de cada ângulo agudo formado nessa figura?",
    options: [
      {
        id: "A",
        text: "110°",
        correct: false,
        explanation:
          "110° é a medida dos ângulos correspondentes do enunciado: 2x + 50° = 3x + 20° dá x = 30° e 2 · 30 + 50 = 110°. Tenta porque é o resultado direto da equação. Mas 110° é maior que 90°, ou seja, é um ângulo obtuso, e a pergunta pede os agudos.",
      },
      {
        id: "B",
        text: "30°",
        correct: false,
        explanation:
          "30° é o valor de x. Tenta porque é um número menor que 90°, como um ângulo agudo. Mas x é só a incógnita: os ângulos da figura medem 110° (os obtusos) e 70° (os agudos).",
      },
      {
        id: "C",
        text: "90°",
        correct: false,
        explanation:
          "90° é a medida do ângulo reto, que só aparece quando a transversal é perpendicular às paralelas. Tenta porque divide os agudos dos obtusos. Mas aqui os ângulos medem 110° e 70°, e nenhum é reto.",
      },
      {
        id: "D",
        text: "70°",
        correct: true,
        explanation:
          "Correta. Correspondentes são iguais: 2x + 50° = 3x + 20°, x = 30°, e cada um mede 110° (obtuso). Os ângulos agudos da figura são os vizinhos deles, suplementares: 180° − 110° = 70°.",
      },
    ],
    tips: [
      "Uma transversal que não é perpendicular forma só dois valores: um agudo e um obtuso, que somam 180°.",
      "Agudo: menor que 90°. Obtuso: maior que 90°.",
    ],
  },
  {
    id: "mat-t3-q09",
    topic: "angulos-com-transversal",
    prompt:
      "Uma transversal corta r e s, com r // s. Entre as paralelas e do mesmo lado da transversal, um ângulo mede o dobro do outro. Quanto mede o maior deles?",
    options: [
      {
        id: "A",
        text: "60°",
        correct: false,
        explanation:
          "60° é a medida do menor dos dois colaterais (x + 2x = 180° dá x = 60°). Tenta porque é o primeiro valor que a equação fornece. Mas 60° é agudo, e a pergunta pede o obtuso, que é o dobro dele.",
      },
      {
        id: "B",
        text: "90°",
        correct: false,
        explanation:
          "90° é o ângulo reto: dois colaterais de 90° aparecem quando a transversal é perpendicular, e aí os dois são iguais. Tenta porque 90° + 90° = 180°. Mas aqui um ângulo é o dobro do outro, então eles não podem ser iguais.",
      },
      {
        id: "C",
        text: "120°",
        correct: true,
        explanation:
          "Correta. Colaterais internos são suplementares. Chamando o menor de x, o maior é 2x: x + 2x = 180°, 3x = 180°, x = 60°. O obtuso mede 2 · 60° = 120°.",
      },
      {
        id: "D",
        text: "150°",
        correct: false,
        explanation:
          "150° é a resposta de outro problema do livro, em que um colateral é a quinta parte do outro (x + 5x = 180°, x = 30°, obtuso de 150°). Tenta porque a montagem é igual. Mas aqui a relação é 'o dobro', então a soma tem 3 partes, e não 6.",
      },
    ],
    tips: [
      "'Um é o dobro do outro' vira x e 2x. 'Um é a quinta parte do outro' vira x e 5x.",
      "Colaterais (com r // s) somam 180°: some as partes e divida.",
    ],
  },
  {
    id: "mat-t3-q10",
    topic: "angulos-com-transversal",
    prompt: "Na figura, r // s. Qual é a medida do ângulo x, em P?",
    image: FIGURA_BICO,
    options: [
      {
        id: "A",
        text: "80°",
        correct: true,
        explanation:
          "Correta. Traçando por P uma reta u paralela a r e a s, o ângulo x fica dividido em duas partes. A parte de cima é alterna interna ao ângulo de 35° (com r // u) e a de baixo é alterna interna ao de 45° (com u // s). Então x = 35° + 45° = 80°.",
      },
      {
        id: "B",
        text: "100°",
        correct: false,
        explanation:
          "100° é o suplemento de 80° (180° − 80°). Tenta porque somar 180° é comum com paralelas. Mas aqui não há colaterais: com a reta auxiliar, cada parte de x é alterna a um ângulo dado, e alternos são iguais.",
      },
      {
        id: "C",
        text: "10°",
        correct: false,
        explanation:
          "10° é a diferença entre os ângulos dados (45° − 35°). Tenta porque subtrair também usa os dois números. Mas as duas partes de x se somam: cada uma é igual a um dos ângulos marcados, e juntas formam x.",
      },
      {
        id: "D",
        text: "160°",
        correct: false,
        explanation:
          "160° é o dobro de 80°, como se cada ângulo dado contasse duas vezes. Tenta porque usar os dois ângulos 'dos dois lados' parece natural. Mas cada parte de x é igual a um ângulo só (35° ou 45°), e não ao dobro.",
      },
    ],
    tips: [
      "Ângulo com vértice entre duas paralelas: trace uma paralela auxiliar pelo vértice.",
      "Com a paralela auxiliar, o ângulo do 'bico' é a soma dos dois ângulos que ele faz com r e com s.",
    ],
  },
  {
    id: "mat-t3-q11",
    topic: "angulos-com-transversal",
    prompt:
      "Entre duas paralelas r e s há uma linha quebrada em zigue-zague, com bicos apontando alternadamente para a direita e para a esquerda. Os bicos que apontam para a direita medem 30°, x e 50°. Os que apontam para a esquerda medem 45°, 55° e 40°. Pelo teorema dos bicos, quanto vale x?",
    options: [
      {
        id: "A",
        text: "140°",
        correct: false,
        explanation:
          "140° é a soma dos bicos que apontam para a esquerda (45° + 55° + 40°). Tenta porque é a primeira conta do teorema. Mas essa soma tem que ser igual à soma dos bicos da direita, que ainda inclui 30° e 50° além de x.",
      },
      {
        id: "B",
        text: "60°",
        correct: true,
        explanation:
          "Correta. O teorema dos bicos diz que a soma dos ângulos cujos bicos apontam para um lado é igual à soma dos que apontam para o outro: 30° + x + 50° = 45° + 55° + 40°, ou seja, 80° + x = 140°, x = 60°.",
      },
      {
        id: "C",
        text: "80°",
        correct: false,
        explanation:
          "80° é a soma dos bicos conhecidos da direita (30° + 50°). Tenta porque é um dos lados da equação. Mas x é o que falta para esse lado chegar a 140°: 140° − 80° = 60°.",
      },
      {
        id: "D",
        text: "220°",
        correct: false,
        explanation:
          "220° é a soma de todos os ângulos conhecidos (140° + 80°). Tenta porque somar tudo parece usar toda a informação. Mas o teorema não soma os dois lados: ele iguala um lado ao outro.",
      },
    ],
    tips: [
      "Teorema dos bicos: soma dos bicos para a direita = soma dos bicos para a esquerda.",
      "Atenção: só vale se os bicos alternam de lado. Se não alternam, é preciso reorganizar a figura.",
    ],
  },
  {
    id: "mat-t3-q12",
    topic: "angulos-com-transversal",
    prompt: "Na figura, sabe-se que r // s. Qual relação é sempre verdadeira entre os ângulos a e h?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "a = h",
        correct: false,
        explanation:
          "Igualdade é a relação dos pares congruentes: correspondentes, alternos internos e alternos externos. Tenta porque é a relação mais frequente no capítulo. Mas a e h estão do mesmo lado de t, nas regiões externas: são colaterais externos, e colaterais não são iguais (a não ser que os dois meçam 90°).",
      },
      {
        id: "B",
        text: "a + h = 90°",
        correct: false,
        explanation:
          "Somar 90° é a relação de ângulos complementares. Tenta porque é outra 'soma famosa' de ângulos. Mas nenhum par formado por paralelas e transversal soma 90°: ou são iguais ou somam 180°.",
      },
      {
        id: "C",
        text: "a + h = 360°",
        correct: false,
        explanation:
          "360° é a soma dos quatro ângulos ao redor de um mesmo ponto. Tenta porque é a 'volta completa' citada no capítulo. Mas a e h estão em vértices diferentes, e dois ângulos menores que 180° nunca somariam 360°.",
      },
      {
        id: "D",
        text: "a + h = 180°",
        correct: true,
        explanation:
          "Correta. a e h são colaterais externos (regiões externas, mesmo lado de t). O livro prova que, com r // s, colaterais são suplementares: a e e são correspondentes (iguais), e e + h = 180° porque são vizinhos; logo a + h = 180°.",
      },
    ],
    tips: [
      "Primeiro classifique o par (correspondente, alterno ou colateral), depois aplique a regra.",
      "Colaterais somam 180° quando r // s; se não somam, as retas são concorrentes.",
    ],
  },
  {
    id: "mat-t3-q13",
    topic: "angulos-com-transversal",
    prompt: "Na figura, quais ângulos estão na região interna às retas r e s?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "c, d, e e f",
        correct: true,
        explanation:
          "Correta. A região interna é a faixa entre r e s. Os ângulos que ficam abaixo de r (c e d) e acima de s (e e f) estão dentro dessa faixa. Os outros quatro (a, b, g, h) ficam nas regiões externas, acima de r ou abaixo de s.",
      },
      {
        id: "B",
        text: "a, b, g e h",
        correct: false,
        explanation:
          "a, b, g e h são os ângulos das regiões externas: a e b ficam acima de r, g e h ficam abaixo de s. Tenta porque é o grupo complementar ao certo, e é fácil trocar 'dentro' por 'fora'. Mas a região interna é a que fica entre as duas paralelas.",
      },
      {
        id: "C",
        text: "a, b, c e d",
        correct: false,
        explanation:
          "a, b, c e d são os quatro ângulos do cruzamento de t com r, todos com vértice no mesmo ponto. Tenta porque formam um grupo natural na figura. Mas a e b estão acima de r, fora da faixa entre as paralelas.",
      },
      {
        id: "D",
        text: "a, d, e e h",
        correct: false,
        explanation:
          "a, d, e e h são os ângulos que ficam à direita da transversal t. Tenta porque 'lado de t' é a outra divisão do plano usada no capítulo. Mas essa divisão separa direita e esquerda, e a pergunta é sobre a divisão por r e s (interna e externa).",
      },
    ],
    tips: [
      "r e s dividem o plano em interna (entre elas) e externas. t divide o plano em direita e esquerda.",
      "Cada par de ângulos combina essas duas divisões: é isso que dá os nomes correspondente, alterno e colateral.",
    ],
  },
];
