import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 4: Triângulos: elementos, classificação e construção (capítulo 11,
 * pp. 76–82 y 90–92).
 *
 * Cubre la definición de triángulo, los puntos no colineales, los elementos
 * (vértices, lados, ángulos internos, sin diagonales), la clasificación por
 * ángulos y por lados con las propiedades del isósceles y del equilátero, la
 * construcción con regla y compás, la rigidez en estructuras y el teorema de
 * Pitágoras (Voando Alto).
 */
export const TEMA_TRIANGULOS_ELEMENTOS: ExamQuestionWithTopic[] = [
  {
    id: "mat-t4-q01",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "Para que três pontos A, B e C sejam vértices de um triângulo, eles não podem ser colineares. O que quer dizer colineares?",
    options: [
      {
        id: "A",
        text: "Que pertencem a uma mesma reta",
        correct: true,
        explanation:
          "Correta. Pontos colineares estão alinhados, sobre uma mesma reta. Se A, B e C estivessem alinhados, os segmentos AB, BC e AC ficariam todos sobre essa reta e não fechariam uma figura: por isso os três vértices de um triângulo não podem ser colineares.",
      },
      {
        id: "B",
        text: "Que pertencem a um mesmo plano",
        correct: false,
        explanation:
          "Pontos que estão em um mesmo plano são chamados de coplanares. Tenta porque as palavras são parecidas e as duas começam com 'co' (junto). Mas os vértices de um triângulo são sempre coplanares, e o que eles não podem ser é colineares: alinhados numa reta.",
      },
      {
        id: "C",
        text: "Que estão todos à mesma distância de um ponto central",
        correct: false,
        explanation:
          "Pontos à mesma distância de um ponto central formam uma circunferência, como os pontos que o compasso desenha. Tenta porque o compasso aparece na construção de triângulos. Mas essa ideia não tem a ver com 'colinear', que vem de linha (reta).",
      },
      {
        id: "D",
        text: "Que são as duas extremidades de um mesmo lado",
        correct: false,
        explanation:
          "As duas extremidades de um lado são dois vértices consecutivos do triângulo, como A e B no lado AB. Tenta porque fala de pontos e lados. Mas colinear é uma propriedade de três (ou mais) pontos estarem na mesma reta, e não da posição deles nos lados.",
      },
    ],
    tips: [
      "Colineares = na mesma reta. Três pontos colineares não formam triângulo.",
      "Coplanares = no mesmo plano. Todo triângulo é plano.",
    ],
  },
  {
    id: "mat-t4-q02",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "O livro diz que os triângulos têm os mesmos elementos dos polígonos, com uma exceção. Qual elemento dos polígonos os triângulos não têm?",
    options: [
      {
        id: "A",
        text: "Vértices",
        correct: false,
        explanation:
          "Vértices são os pontos onde os lados se encontram, os 'cantos' da figura. Tenta porque é o primeiro elemento da lista. Mas todo triângulo tem três vértices, geralmente indicados por letras maiúsculas (A, B e C).",
      },
      {
        id: "B",
        text: "Ângulos internos",
        correct: false,
        explanation:
          "Ângulos internos são os ângulos formados por dois lados consecutivos, do lado de dentro da figura. Tenta porque o triângulo é o polígono com menos ângulos. Mas ele tem três ângulos internos, e a soma deles (180°) é um dos assuntos principais do capítulo.",
      },
      {
        id: "C",
        text: "Diagonais",
        correct: true,
        explanation:
          "Correta. Diagonal é o segmento que liga dois vértices não consecutivos. No triângulo, cada vértice é vizinho dos outros dois, então não há vértices não consecutivos para ligar: o triângulo não tem diagonais. Isso combina com a fórmula d = n(n − 3)/2, que dá 0 para n = 3.",
      },
      {
        id: "D",
        text: "Lados",
        correct: false,
        explanation:
          "Lados são os segmentos de reta que formam a figura, ligando os vértices. Tenta porque o triângulo tem o menor número de lados possível. Mas ele tem três lados (AB, BC e AC), e é justamente o número de lados que o define.",
      },
    ],
    tips: [
      "Triângulo: 3 vértices, 3 lados, 3 ângulos internos, 0 diagonais.",
      "Diagonal liga vértices não consecutivos; no triângulo todos os vértices são vizinhos.",
    ],
  },
  {
    id: "mat-t4-q03",
    topic: "triangulos-elementos-e-classificacao",
    prompt: "Os ângulos internos de um triângulo medem 50°, 54° e 76°. Como ele se classifica quanto aos ângulos?",
    options: [
      {
        id: "A",
        text: "Retângulo",
        correct: false,
        explanation:
          "Triângulo retângulo é o que tem um ângulo reto (90°) e os outros dois agudos. Tenta porque é o tipo mais conhecido de triângulo. Mas nenhum dos ângulos dados mede 90°.",
      },
      {
        id: "B",
        text: "Acutângulo",
        correct: true,
        explanation:
          "Correta. Acutângulo é o triângulo com os três ângulos agudos, ou seja, menores que 90°. Aqui 50°, 54° e 76° são todos menores que 90°.",
      },
      {
        id: "C",
        text: "Obtusângulo",
        correct: false,
        explanation:
          "Obtusângulo é o triângulo que tem um ângulo obtuso (maior que 90°) e os outros dois agudos. Tenta porque 76° é um ângulo 'grande'. Mas 76° ainda é menor que 90°, e para ser obtusângulo seria preciso passar de 90°.",
      },
      {
        id: "D",
        text: "Equilátero",
        correct: false,
        explanation:
          "Equilátero é uma classificação quanto aos lados: os três lados iguais. Nele, os três ângulos medem 60°. Tenta porque os ângulos dados são parecidos e próximos de 60°. Mas eles são diferentes entre si, e a pergunta pede a classificação quanto aos ângulos.",
      },
    ],
    tips: [
      "Quanto aos ângulos, olhe o maior: menor que 90° (acutângulo), igual (retângulo), maior (obtusângulo).",
      "Equilátero, isósceles e escaleno são classificações quanto aos lados.",
    ],
  },
  {
    id: "mat-t4-q04",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "Dois triângulos estão lado a lado. O primeiro tem um ângulo de 91°. O segundo tem os três lados de mesma medida. Quais são as classificações corretas, respectivamente?",
    options: [
      {
        id: "A",
        text: "Retângulo e equilátero",
        correct: false,
        explanation:
          "Retângulo é o triângulo com um ângulo de exatamente 90°. Tenta porque 91° está muito perto de 90°. Mas 91° já é maior que 90°: é um ângulo obtuso, e o triângulo é obtusângulo.",
      },
      {
        id: "B",
        text: "Acutângulo e isósceles",
        correct: false,
        explanation:
          "Acutângulo tem os três ângulos menores que 90°, e isósceles tem dois lados iguais. Tenta porque todo equilátero também tem dois lados iguais. Mas o primeiro tem um ângulo de 91°, que não é agudo, e o segundo tem os três lados iguais, o que o classifica como equilátero.",
      },
      {
        id: "C",
        text: "Obtusângulo e escaleno",
        correct: false,
        explanation:
          "Escaleno é o triângulo com os três lados de medidas diferentes. Tenta porque a primeira parte (obtusângulo) está certa. Mas o segundo triângulo tem os três lados iguais, o oposto de escaleno.",
      },
      {
        id: "D",
        text: "Obtusângulo e equilátero",
        correct: true,
        explanation:
          "Correta. Um ângulo de 91° é obtuso (maior que 90°), então o primeiro é obtusângulo. Três lados iguais (congruentes) fazem do segundo um triângulo equilátero.",
      },
    ],
    tips: [
      "91° já é obtuso: 'quase reto' não conta como reto.",
      "Lados: três iguais (equilátero), dois iguais (isósceles), todos diferentes (escaleno).",
    ],
  },
  {
    id: "mat-t4-q05",
    topic: "triangulos-elementos-e-classificacao",
    prompt: "É possível desenhar um triângulo que seja ao mesmo tempo obtusângulo e equilátero?",
    options: [
      {
        id: "A",
        text: "Não, porque no equilátero todos os ângulos internos medem 60°",
        correct: true,
        explanation:
          "Correta. Uma propriedade do triângulo equilátero é que seus três ângulos internos são iguais e medem 60° (180° ÷ 3). Como 60° é agudo, todo equilátero é acutângulo, e nunca pode ter um ângulo obtuso.",
      },
      {
        id: "B",
        text: "Sim, desde que um dos lados seja maior que os outros",
        correct: false,
        explanation:
          "Um triângulo com um lado maior que os outros é isósceles (se os outros dois forem iguais) ou escaleno. Tenta porque, de fato, um triângulo obtusângulo tem um lado maior, oposto ao ângulo obtuso. Mas aí ele deixa de ser equilátero, que exige os três lados iguais.",
      },
      {
        id: "C",
        text: "Sim, com um ângulo de 120° e dois de 30°",
        correct: false,
        explanation:
          "Um triângulo com ângulos de 120°, 30° e 30° existe (a soma dá 180°) e é obtusângulo e isósceles, porque os dois ângulos iguais ficam na base. Tenta porque a soma confere. Mas os ângulos não são todos iguais, então os lados também não são: não é equilátero.",
      },
      {
        id: "D",
        text: "Não, porque o equilátero sempre tem um ângulo reto",
        correct: false,
        explanation:
          "Um triângulo com ângulo reto é o retângulo, como o de lados 3, 4 e 5 construído no livro. Tenta porque a resposta 'não' está certa. Mas a justificativa está errada: os ângulos do equilátero medem 60°, e nenhum é reto.",
      },
    ],
    tips: [
      "Equilátero: três lados iguais e três ângulos de 60°. Por isso é sempre acutângulo.",
      "Para justificar, use a propriedade: 180° ÷ 3 = 60°.",
    ],
  },
  {
    id: "mat-t4-q06",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "Em um triângulo isósceles, a base é o lado de medida diferente dos outros dois. Que propriedade o livro destaca para esse triângulo?",
    options: [
      {
        id: "A",
        text: "A base é sempre o maior lado do triângulo",
        correct: false,
        explanation:
          "O maior lado de um triângulo é o que fica oposto ao maior ângulo. Tenta porque nos desenhos mais comuns a base aparece embaixo e comprida. Mas a base do isósceles pode ser menor que os outros lados, como no exemplo do livro com lados 4, 4 e base 3.",
      },
      {
        id: "B",
        text: "O ângulo oposto à base mede sempre 90°",
        correct: false,
        explanation:
          "Um triângulo com um ângulo de 90° é retângulo. Tenta porque existe o isósceles retângulo (ângulos de 90°, 45° e 45°). Mas isso é um caso particular: no exemplo da casa enxaimel o ângulo oposto à base mede 78°.",
      },
      {
        id: "C",
        text: "Os dois ângulos da base têm a mesma medida",
        correct: true,
        explanation:
          "Correta. No triângulo isósceles, os dois ângulos que ficam nas pontas da base são congruentes. É por isso que, conhecendo o ângulo oposto à base, basta fazer (180° − esse ângulo) ÷ 2 para achar cada ângulo da base.",
      },
      {
        id: "D",
        text: "Os três ângulos internos medem 60°",
        correct: false,
        explanation:
          "Três ângulos de 60° são a propriedade do triângulo equilátero, que tem os três lados iguais. Tenta porque o equilátero é um caso especial de triângulo com lados iguais. Mas o isósceles tem a base diferente, e só os dois ângulos da base são iguais entre si.",
      },
    ],
    tips: [
      "Isósceles: dois lados iguais e dois ângulos da base iguais.",
      "Os tracinhos sobre os lados indicam quais lados têm a mesma medida.",
    ],
  },
  {
    id: "mat-t4-q07",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "O triângulo ABC é isósceles de base BC. Os lados AB e AC medem, em centímetros, 3x − 4 e x + 10. Quanto mede o lado AB?",
    options: [
      {
        id: "A",
        text: "7 cm",
        correct: false,
        explanation:
          "7 é o valor de x, que sai de igualar os lados: 3x − 4 = x + 10, 2x = 14, x = 7. Tenta porque é o resultado da equação. Mas a pergunta pede o lado AB, e é preciso substituir: 3 · 7 − 4 = 17 cm.",
      },
      {
        id: "B",
        text: "17 cm",
        correct: true,
        explanation:
          "Correta. Como a base é BC, os lados iguais são AB e AC: 3x − 4 = x + 10, 3x − x = 10 + 4, 2x = 14, x = 7. Então AB = 3 · 7 − 4 = 17 cm, e conferindo AC = 7 + 10 = 17 cm.",
      },
      {
        id: "C",
        text: "5 cm",
        correct: false,
        explanation:
          "5 cm sai de um erro de sinal: 2x = 10 − 4 = 6, x = 3 e AB = 3 · 3 − 4 = 5. O −4 passa para o outro lado somando, e o certo é 2x = 10 + 4. Tenta porque a ideia de igualar AB e AC está certa. Mas com x = 3, AC daria 13 cm, diferente de AB, o que mostra o erro.",
      },
      {
        id: "D",
        text: "34 cm",
        correct: false,
        explanation:
          "34 cm é a soma de AB e AC (17 + 17), ou seja, parte do perímetro do triângulo. Tenta porque usa os dois lados iguais. Mas a pergunta pede a medida de um lado só.",
      },
    ],
    tips: [
      "Isósceles de base BC: os lados iguais são os outros dois, AB e AC. Iguale-os.",
      "Depois de achar x, confira se AB e AC dão o mesmo valor.",
    ],
  },
  {
    id: "mat-t4-q08",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "Para construir com régua e compasso um triângulo de lados BC = 5 cm, AC = 3 cm e AB = 4 cm, já foi traçado o lado BC com a régua. Qual é o próximo passo?",
    options: [
      {
        id: "A",
        text: "Medir com o transferidor um ângulo de 90° em B e traçar o lado BA",
        correct: false,
        explanation:
          "Traçar ângulos com o transferidor é o método para construir um triângulo conhecendo os ângulos. Tenta porque esse triângulo tem mesmo um ângulo reto. Mas ele fica em A, oposto ao maior lado (BC = 5 cm), e não em B. E, de qualquer forma, a construção com régua e compasso a partir dos três lados não mede ângulos: usa arcos com a abertura de cada lado.",
      },
      {
        id: "B",
        text: "Com o compasso aberto em 5 cm, traçar arcos com a ponta-seca em B e em C",
        correct: false,
        explanation:
          "Arcos com a mesma abertura do lado BC nas duas pontas constroem um triângulo equilátero, com os três lados de 5 cm. Tenta porque usa o compasso nas duas extremidades, como na construção certa. Mas os outros lados medem 3 cm e 4 cm, então cada arco precisa da sua própria abertura.",
      },
      {
        id: "C",
        text: "Traçar com a régua um segmento de 3 cm saindo de C em qualquer direção",
        correct: false,
        explanation:
          "Traçar um segmento de 3 cm em qualquer direção garante a medida de AC, mas não a de AB. Tenta porque usa a medida certa a partir do ponto certo. Mas sem os dois arcos não há como saber onde fica o vértice A para que AB meça 4 cm ao mesmo tempo.",
      },
      {
        id: "D",
        text: "Traçar um arco de abertura 3 cm com ponta-seca em C e outro de 4 cm com ponta-seca em B",
        correct: true,
        explanation:
          "Correta. O arco de centro C e abertura 3 cm reúne todos os pontos a 3 cm de C; o de centro B e abertura 4 cm, todos os pontos a 4 cm de B. O ponto onde os arcos se cruzam está a 3 cm de C e a 4 cm de B: é o vértice A. Depois, basta ligar A a B e a C com a régua.",
      },
    ],
    tips: [
      "Ordem: régua para um lado; compasso nas duas pontas com as outras duas medidas; o cruzamento é o terceiro vértice.",
      "Se os arcos não se cruzam, o triângulo não existe (condição de existência).",
    ],
  },
  {
    id: "mat-t4-q09",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "Um triângulo retângulo tem catetos de 6 cm e 8 cm. Pelo teorema de Pitágoras, quanto mede a hipotenusa?",
    options: [
      {
        id: "A",
        text: "14 cm",
        correct: false,
        explanation:
          "14 cm é a soma dos catetos (6 + 8). Tenta porque somar os lados conhecidos parece o caminho natural. Mas o teorema soma os quadrados dos catetos, e não os catetos: hip² = 6² + 8². Além disso, pela condição de existência, a hipotenusa tem que ser menor que 6 + 8.",
      },
      {
        id: "B",
        text: "100 cm",
        correct: false,
        explanation:
          "100 é o valor de hip², ou seja, 6² + 8² = 36 + 64. Tenta porque é o resultado da soma do teorema. Mas falta o último passo: a hipotenusa é a raiz quadrada de 100.",
      },
      {
        id: "C",
        text: "10 cm",
        correct: true,
        explanation:
          "Correta. O teorema de Pitágoras diz que (hip)² = (cat₁)² + (cat₂)². Então hip² = 6² + 8² = 36 + 64 = 100, e hip = √100 = 10 cm (o valor −10 não serve, porque é uma medida). É o triângulo 3, 4, 5 com todas as medidas dobradas.",
      },
      {
        id: "D",
        text: "7 cm",
        correct: false,
        explanation:
          "7 cm é a média dos catetos ((6 + 8) ÷ 2). Tenta porque fica 'entre' os dois. Mas a hipotenusa é o maior lado do triângulo retângulo, oposto ao ângulo reto, e precisa ser maior que cada cateto.",
      },
    ],
    tips: [
      "Pitágoras: hip² = cat₁² + cat₂². Não esqueça a raiz no final.",
      "A hipotenusa fica oposta ao ângulo reto e é sempre o maior lado.",
    ],
  },
  {
    id: "mat-t4-q10",
    topic: "triangulos-elementos-e-classificacao",
    prompt:
      "Telhados, pontes e fachadas de estruturas metálicas usam muitos triângulos. Segundo o livro, por que eles são tão importantes nessas construções?",
    options: [
      {
        id: "A",
        text: "Porque o triângulo é o polígono que tem mais diagonais para reforçar a estrutura",
        correct: false,
        explanation:
          "Diagonais são segmentos que ligam vértices não consecutivos de um polígono. Tenta porque nas estruturas aparecem barras inclinadas, parecidas com diagonais. Mas o triângulo é justamente o polígono que não tem nenhuma diagonal.",
      },
      {
        id: "B",
        text: "Porque o triângulo é rígido: não sofre deformação facilmente",
        correct: true,
        explanation:
          "Correta. Nas estruturas de telhados e fachadas os elementos sofrem forças de tração e compressão, e o triângulo não se deforma com facilidade: com os três lados fixos, sua forma não muda. É a rigidez geométrica do triângulo, usada também nas casas enxaimel.",
      },
      {
        id: "C",
        text: "Porque todos os triângulos são polígonos regulares",
        correct: false,
        explanation:
          "Polígono regular é o que tem todos os lados e todos os ângulos iguais. Entre os triângulos, só o equilátero é regular. Tenta porque o equilátero é o mais usado em arquitetura, como nas faces da pirâmide de Gizé. Mas isósceles e escalenos não são regulares, e a razão do uso é a rigidez.",
      },
      {
        id: "D",
        text: "Porque a soma dos seus ângulos internos é 360°",
        correct: false,
        explanation:
          "360° é a soma dos ângulos internos de um quadrilátero, como o quadrado (4 · 90°). Tenta porque é uma soma famosa. Mas a soma dos ângulos internos do triângulo é 180°, e esse número não explica por que a estrutura não se deforma.",
      },
    ],
    tips: [
      "Triângulo = figura rígida. Um quadrado de barras articuladas 'amassa'; um triângulo não.",
      "O mais usado na arquitetura é o equilátero; o isósceles aparece em fachadas, como a da Galeria Nacional de Arte.",
    ],
  },
];
