import type { ExamQuestionImage, ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: Ângulos adjacentes, suplementares e opostos pelo vértice
 * (capítulo 10, pp. 44–46).
 *
 * Cubre ángulos adyacentes y suplementarios, la definición de opuestos por el
 * vértice (OPV), su demostración, la suma de 360° y las ecuaciones de primer
 * grado que salen de igualar dos OPV o de sumar dos suplementarios.
 */

const FIGURA: ExamQuestionImage = {
  src: "/exams/matematica-retas-triangulos-poligonos/retas-paralelas-transversal.png",
  alt: "Duas retas horizontais paralelas, r em cima e s embaixo, cortadas por uma reta inclinada t que desce da esquerda para a direita. No cruzamento de t com r ficam os ângulos a (acima, à direita de t), b (acima, à esquerda), c (abaixo, à esquerda) e d (abaixo, à direita). No cruzamento de t com s ficam, na mesma ordem, e (acima, à direita), f (acima, à esquerda), g (abaixo, à esquerda) e h (abaixo, à direita).",
  width: 800,
  height: 480,
};

export const TEMA_ANGULOS_OPOSTOS_PELO_VERTICE: ExamQuestionWithTopic[] = [
  {
    id: "mat-t2-q01",
    topic: "angulos-opostos-pelo-vertice",
    prompt:
      "Quando duas retas se cruzam, o livro diz que alguns pares de ângulos formados são adjacentes. O que caracteriza dois ângulos adjacentes?",
    options: [
      {
        id: "A",
        text: "Eles têm o mesmo vértice e um lado em comum",
        correct: true,
        explanation:
          "Correta. Ângulos adjacentes ficam 'colados' um ao lado do outro: compartilham o vértice e um dos lados. Quando duas retas se cruzam, cada par de ângulos vizinhos é adjacente e, além disso, suplementar (soma 180°), porque juntos formam meia volta.",
      },
      {
        id: "B",
        text: "Eles têm sempre a mesma medida",
        correct: false,
        explanation:
          "Ângulos com a mesma medida são chamados de congruentes. Tenta porque os opostos pelo vértice, que aparecem na mesma figura, são congruentes. Mas adjacência fala da posição dos ângulos (lado a lado), e não da medida: dois ângulos adjacentes podem medir 30° e 150°.",
      },
      {
        id: "C",
        text: "Eles somam 90°",
        correct: false,
        explanation:
          "Dois ângulos que somam 90° são chamados de complementares. Tenta porque 'somar' é o que se faz com adjacentes nos exercícios. Mas nas retas que se cruzam os adjacentes somam 180°, e de qualquer forma a soma não é o que define a adjacência: é ter vértice e lado em comum.",
      },
      {
        id: "D",
        text: "Os lados de um são semirretas opostas aos lados do outro",
        correct: false,
        explanation:
          "Essa é a definição de ângulos opostos pelo vértice (OPV): eles ficam um de frente para o outro, em lados opostos do cruzamento. Tenta porque também é uma relação entre os ângulos de duas retas que se cruzam. Mas os OPV não têm lado em comum, e os adjacentes têm.",
      },
    ],
    tips: [
      "Adjacentes: lado a lado, com um lado em comum. Opostos pelo vértice: frente a frente.",
      "Em duas retas que se cruzam, ângulos adjacentes sempre somam 180°.",
    ],
  },
  {
    id: "mat-t2-q02",
    topic: "angulos-opostos-pelo-vertice",
    prompt: "Pela definição do livro, quando dois ângulos são opostos pelo vértice (OPV)?",
    options: [
      {
        id: "A",
        text: "Quando a soma das suas medidas é 180°",
        correct: false,
        explanation:
          "Ângulos cuja soma é 180° são chamados de suplementares. Tenta porque, em duas retas que se cruzam, os pares de ângulos vizinhos são suplementares e aparecem na mesma figura que os OPV. Mas OPV é uma questão de posição, e os OPV não somam 180° (a não ser que os dois meçam 90°): eles têm a mesma medida.",
      },
      {
        id: "B",
        text: "Quando os lados de um são semirretas opostas aos lados do outro",
        correct: true,
        explanation:
          "Correta. Dois ângulos são opostos pelo vértice quando os lados de um deles são formados pelas semirretas opostas aos lados do outro. Como consequência, os dois têm o mesmo vértice, e o livro demonstra que eles são sempre congruentes.",
      },
      {
        id: "C",
        text: "Quando estão em lados opostos de uma transversal, entre duas paralelas",
        correct: false,
        explanation:
          "Ângulos em lados opostos da transversal e na região entre as paralelas são os alternos internos. Tenta porque 'opostos' aparece nas duas definições. Mas os alternos ficam em vértices diferentes (um em r e outro em s), e os OPV têm o mesmo vértice.",
      },
      {
        id: "D",
        text: "Quando têm o mesmo vértice e um lado em comum",
        correct: false,
        explanation:
          "Ter o mesmo vértice e um lado em comum é a definição de ângulos adjacentes. Tenta porque os OPV também têm o mesmo vértice. Mas os OPV não compartilham nenhum lado: ficam um de frente para o outro.",
      },
    ],
    tips: [
      "OPV: mesmo vértice, lados que são prolongamentos uns dos outros. Resultado: medidas iguais.",
      "Duas retas concorrentes sempre formam dois pares de ângulos OPV.",
    ],
  },
  {
    id: "mat-t2-q03",
    topic: "angulos-opostos-pelo-vertice",
    prompt: "Observe a figura. Qual ângulo é oposto pelo vértice ao ângulo a?",
    image: FIGURA,
    options: [
      {
        id: "A",
        text: "b",
        correct: false,
        explanation:
          "O ângulo b fica ao lado de a, no mesmo vértice, e os dois compartilham a parte de cima da reta t: são adjacentes e suplementares (a + b = 180°). Tenta porque está colado em a. Mas OPV fica do outro lado do cruzamento, e não ao lado.",
      },
      {
        id: "B",
        text: "e",
        correct: false,
        explanation:
          "O ângulo e está no cruzamento de t com s, na mesma posição que a ocupa em r (acima da reta e à direita de t): a e e são correspondentes. Tenta porque, com r // s, e tem a mesma medida de a. Mas OPV precisa ter o mesmo vértice, e e está em outro vértice.",
      },
      {
        id: "C",
        text: "c",
        correct: true,
        explanation:
          "Correta. O ângulo c fica de frente para a no mesmo vértice: os lados de c são as semirretas opostas aos lados de a. Por isso a e c são OPV e têm a mesma medida. O outro par OPV desse vértice é b e d.",
      },
      {
        id: "D",
        text: "d",
        correct: false,
        explanation:
          "O ângulo d fica logo abaixo de a, do mesmo lado de t, compartilhando a semirreta de r que vai para a direita: a e d são adjacentes e suplementares (a + d = 180°). Tenta porque está 'embaixo' de a, como se fosse o oposto. Mas o oposto pelo vértice fica na diagonal, do outro lado das duas retas.",
      },
    ],
    tips: [
      "Para achar o OPV, atravesse o vértice em linha reta: o ângulo do outro lado é o oposto.",
      "Em cada cruzamento há dois pares OPV: a e c, b e d (e também e e g, f e h).",
    ],
  },
  {
    id: "mat-t2-q04",
    topic: "angulos-opostos-pelo-vertice",
    prompt:
      "Duas retas concorrentes formam dois ângulos opostos pelo vértice, de medidas 6x − 20° e 4x + 10°. Qual é o valor de x?",
    options: [
      {
        id: "A",
        text: "19°",
        correct: false,
        explanation:
          "19° é o que sai se você somar os dois ângulos e igualar a 180° (10x − 10° = 180°), ou seja, se tratar os dois como suplementares. Essa conta vale para ângulos adjacentes. Mas o enunciado diz que eles são OPV, e OPV têm a mesma medida: a equação certa é igualar um ao outro.",
      },
      {
        id: "B",
        text: "−5°",
        correct: false,
        explanation:
          "−5° é o resultado de um erro de sinal ao passar os números de lado: 6x − 4x = 10° − 20°. Ao trocar −20° de lado ele vira +20°, e o certo é 6x − 4x = 10° + 20°. Tenta porque a montagem da equação (igualar os OPV) está certa. Mas a passagem de termos inverteu o sinal, e um x negativo daria um ângulo sem sentido.",
      },
      {
        id: "C",
        text: "70°",
        correct: false,
        explanation:
          "70° é a medida de cada um dos ângulos, que se obtém substituindo x = 15 em 6x − 20° ou em 4x + 10°. Tenta porque é a última conta que aparece quando se resolve tudo. Mas a pergunta pede o valor de x, e não a medida do ângulo.",
      },
      {
        id: "D",
        text: "15°",
        correct: true,
        explanation:
          "Correta. Ângulos OPV são congruentes, então: 6x − 20° = 4x + 10°, 6x − 4x = 10° + 20°, 2x = 30°, x = 15°. Conferindo: 6 · 15 − 20 = 70° e 4 · 15 + 10 = 70°.",
      },
    ],
    tips: [
      "OPV: iguale as expressões. Adjacentes: some e iguale a 180°.",
      "Depois de achar x, substitua nas duas expressões: se der o mesmo valor, a conta está certa.",
    ],
  },
  {
    id: "mat-t2-q05",
    topic: "angulos-opostos-pelo-vertice",
    prompt:
      "As retas AD e BC se cruzam no ponto O. Os ângulos AÔC e BÔD são opostos pelo vértice e medem 5x − 12° e 3x + 20°. Quanto mede o ângulo AÔB, que é adjacente a AÔC?",
    options: [
      {
        id: "A",
        text: "112°",
        correct: true,
        explanation:
          "Correta. Primeiro, OPV são iguais: 5x − 12° = 3x + 20°, 2x = 32°, x = 16°, e AÔC = 5 · 16 − 12 = 68°. Depois, AÔB e AÔC são adjacentes formados por duas retas, logo suplementares: AÔB = 180° − 68° = 112°.",
      },
      {
        id: "B",
        text: "68°",
        correct: false,
        explanation:
          "68° é a medida de AÔC (e também de BÔD), o ângulo OPV calculado no primeiro passo. Tenta porque é o primeiro resultado 'de ângulo' que aparece. Mas a pergunta é sobre AÔB, o vizinho de AÔC, e vizinhos formados por duas retas somam 180°.",
      },
      {
        id: "C",
        text: "16°",
        correct: false,
        explanation:
          "16° é o valor de x, a incógnita da equação 5x − 12° = 3x + 20°. Tenta porque é o resultado da equação. Mas x é só um número que ajuda a calcular os ângulos: AÔC mede 68° e AÔB mede 180° − 68°.",
      },
      {
        id: "D",
        text: "22°",
        correct: false,
        explanation:
          "22° é o complemento de 68° (90° − 68°): o ângulo que, somado a 68°, daria 90°. Tenta porque usar 90° parece natural quando se fala de retas que se cruzam. Mas ângulos adjacentes formados por duas retas completam meia volta, 180°, e não um ângulo reto.",
      },
    ],
    tips: [
      "Problema em duas etapas: OPV para achar x, depois suplementares para achar o vizinho.",
      "Complementares somam 90°; suplementares somam 180°.",
    ],
  },
  {
    id: "mat-t2-q06",
    topic: "angulos-opostos-pelo-vertice",
    prompt: "Duas retas concorrentes formam quatro ângulos ao redor do ponto de encontro. Quanto vale a soma desses quatro ângulos?",
    options: [
      {
        id: "A",
        text: "180°",
        correct: false,
        explanation:
          "180° é a soma de dois ângulos adjacentes, que juntos formam meia volta (um ângulo raso). Tenta porque é a soma mais usada nos exercícios de retas concorrentes. Mas os quatro ângulos juntos dão a volta completa ao redor do ponto, e isso é o dobro.",
      },
      {
        id: "B",
        text: "360°",
        correct: true,
        explanation:
          "Correta. Os quatro ângulos dão uma volta completa ao redor do ponto de encontro, e uma volta completa mede 360°. O livro lembra disso logo depois da demonstração dos OPV.",
      },
      {
        id: "C",
        text: "90°",
        correct: false,
        explanation:
          "90° é a medida de um ângulo reto, e também a medida de cada um dos quatro ângulos quando as retas são perpendiculares. Tenta porque lembra o canto de um quadrado. Mas a pergunta pede a soma dos quatro, e mesmo no caso perpendicular ela é 4 · 90° = 360°.",
      },
      {
        id: "D",
        text: "270°",
        correct: false,
        explanation:
          "270° é a soma de três ângulos retos, ou três quartos de volta. Tenta porque fica entre 180° e 360°. Mas não corresponde a nenhuma propriedade das retas concorrentes: os quatro ângulos sempre fecham a volta inteira.",
      },
    ],
    tips: [
      "Volta completa = 360°. Meia volta (ângulo raso) = 180°.",
      "Se você souber um dos quatro ângulos, sabe todos: o OPV é igual e os vizinhos são 180° menos ele.",
    ],
  },
  {
    id: "mat-t2-q07",
    topic: "angulos-opostos-pelo-vertice",
    prompt: "Duas retas se cruzam e um dos ângulos formados mede 22°. Quanto medem os outros três ângulos?",
    options: [
      {
        id: "A",
        text: "68°, 68° e 22°",
        correct: false,
        explanation:
          "68° é o complemento de 22° (90° − 22°). Tenta porque o 22° do OPV está certo, e só os vizinhos ficaram errados. Mas os vizinhos de um ângulo formado por duas retas são suplementares a ele, ou seja, completam 180°, e não 90°.",
      },
      {
        id: "B",
        text: "158°, 158° e 158°",
        correct: false,
        explanation:
          "158° é o suplemento de 22° (180° − 22°) e é, de fato, a medida dos dois ângulos vizinhos. Tenta porque metade da resposta está certa. Mas o ângulo do lado oposto ao de 22° é OPV a ele e também mede 22°. Conferindo a soma: 22 + 158 · 3 = 496°, que passa de 360°.",
      },
      {
        id: "C",
        text: "22°, 158° e 158°",
        correct: true,
        explanation:
          "Correta. O ângulo oposto pelo vértice ao de 22° também mede 22°. Os dois vizinhos são suplementares a ele: 180° − 22° = 158°. Conferindo: 22 + 22 + 158 + 158 = 360°, a volta completa.",
      },
      {
        id: "D",
        text: "22°, 22° e 22°",
        correct: false,
        explanation:
          "Quatro ângulos iguais só aparecem quando as retas são perpendiculares, e aí cada um mede 90°. Tenta porque o OPV de 22° realmente é igual a ele. Mas os vizinhos não são OPV, são suplementares, e quatro ângulos de 22° somariam só 88°, longe dos 360° de uma volta.",
      },
    ],
    tips: [
      "Com um ângulo conhecido: o OPV é igual, os dois vizinhos são 180° menos ele.",
      "Confira sempre se os quatro somam 360°.",
    ],
  },
  {
    id: "mat-t2-q08",
    topic: "angulos-opostos-pelo-vertice",
    prompt:
      "Para demonstrar que os ângulos OPV b e d são congruentes, o livro parte de duas igualdades: a + b = 180° e a + d = 180°. Qual é o passo que completa a demonstração?",
    options: [
      {
        id: "A",
        text: "Somar as igualdades: b + d = 180°, logo b e d são suplementares",
        correct: false,
        explanation:
          "Somar as igualdades daria 2a + b + d = 360°, e não b + d = 180°. Dizer que b e d são suplementares seria afirmar que eles somam 180°, o que só acontece se os dois medirem 90°. Tenta porque as duas igualdades falam de 180°. Mas o objetivo é mostrar que b e d são iguais, e não que somam 180°.",
      },
      {
        id: "B",
        text: "Concluir que b = a e d = a, logo b = d",
        correct: false,
        explanation:
          "b = a seria dizer que b é igual ao seu vizinho, o que só vale quando as retas são perpendiculares (todos medem 90°). Tenta porque a conclusão final (b = d) está certa. Mas o caminho está errado: a e b são suplementares, e não iguais.",
      },
      {
        id: "C",
        text: "Somar todos os ângulos: a + b + c + d = 360°, logo b = d",
        correct: false,
        explanation:
          "A soma dos quatro ângulos ao redor de um ponto é de fato 360°. Tenta porque é uma propriedade verdadeira, citada logo depois no livro. Mas sozinha ela não prova que b = d: os quatro poderiam somar 360° com b e d diferentes.",
      },
      {
        id: "D",
        text: "Isolar: b = 180° − a e d = 180° − a, logo b = d",
        correct: true,
        explanation:
          "Correta. Isolando b na primeira igualdade e d na segunda, os dois ficam iguais à mesma expressão, 180° − a. Duas coisas iguais à mesma coisa são iguais entre si, então b = d: os OPV são congruentes.",
      },
    ],
    tips: [
      "Se duas medidas são iguais à mesma expressão, elas são iguais entre si.",
      "A demonstração usa só uma ideia: vizinhos em duas retas que se cruzam somam 180°.",
    ],
  },
  {
    id: "mat-t2-q09",
    topic: "angulos-opostos-pelo-vertice",
    prompt:
      "Duas retas concorrentes formam dois pares de ângulos opostos pelo vértice. Em um par, os ângulos medem 3x + 40° e 5x + 10°. No outro par, medem 4y − 5° e 2y + 45°. Quais são os valores de x e y?",
    options: [
      {
        id: "A",
        text: "x = 25° e y = 15°",
        correct: false,
        explanation:
          "Esses são os valores certos, mas trocados: 15° é o x e 25° é o y. Tenta porque os números aparecem na resolução. Mas x vem da equação do primeiro par (3x + 40° = 5x + 10°) e y da equação do segundo (4y − 5° = 2y + 45°).",
      },
      {
        id: "B",
        text: "x = 15° e y = 25°",
        correct: true,
        explanation:
          "Correta. Cada par OPV vira uma equação. Primeiro par: 3x + 40° = 5x + 10°, 30° = 2x, x = 15° (ângulos de 85°). Segundo par: 4y − 5° = 2y + 45°, 2y = 50°, y = 25° (ângulos de 95°). Conferindo: 85° + 95° = 180°, como devem somar os vizinhos.",
      },
      {
        id: "C",
        text: "x = 15° e y = 20°",
        correct: false,
        explanation:
          "y = 20° sai de um erro de sinal: 4y − 2y = 45° − 5°. Ao passar o −5° para o outro lado ele vira +5°, e o certo é 2y = 45° + 5° = 50°. Tenta porque x está certo e a ideia de igualar os OPV também. Mas com y = 20° os ângulos dariam 75° e 85°, que não são iguais.",
      },
      {
        id: "D",
        text: "x = 85° e y = 95°",
        correct: false,
        explanation:
          "85° e 95° são as medidas dos ângulos, que se obtêm substituindo x = 15 e y = 25 nas expressões. Tenta porque são os resultados finais do desenho. Mas a pergunta pede os valores das incógnitas x e y, e não as medidas dos ângulos.",
      },
    ],
    tips: [
      "Cada par OPV dá uma equação; resolva uma de cada vez.",
      "Prova real: um ângulo de cada par devem somar 180°, porque são vizinhos.",
    ],
  },
];
