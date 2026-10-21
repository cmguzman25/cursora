import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 6: Polígonos regulares: diagonais e ângulos (capítulo 12, pp. 104–128).
 *
 * Cubre la definición de polígono, convexo y no convexo, equiángulo, equilátero
 * y regular, los nombres por número de lados, las diagonales desde un vértice
 * (n − 3) y los triángulos que forman (n − 2), el total de diagonales
 * n(n − 3)/2, la suma de los ángulos internos (n − 2) · 180°, el ángulo interno
 * y el externo (360°/n) del polígono regular, la construcción del cuadrado con
 * regla y compás y el hexágono de las colmenas (Voando Alto).
 */
export const TEMA_POLIGONOS_REGULARES: ExamQuestionWithTopic[] = [
  {
    id: "mat-t6-q01",
    topic: "poligonos-regulares",
    prompt: "Qual das descrições corresponde à definição de polígono dada no livro?",
    options: [
      {
        id: "A",
        text: "Figura plana fechada formada por lados retos e lados curvos",
        correct: false,
        explanation:
          "Uma figura com partes curvas, como a que tem uma semicircunferência no exemplo A do livro, não é polígono. Tenta porque ela é plana e fechada, como os polígonos. Mas no polígono todos os lados são segmentos de reta: basta um lado curvo para deixar de ser.",
      },
      {
        id: "B",
        text: "Figura plana aberta formada por segmentos de reta",
        correct: false,
        explanation:
          "Uma figura aberta, como um 'U' feito de segmentos (o exemplo B do livro), não delimita uma região interna. Tenta porque é feita só de segmentos de reta, como os polígonos. Mas o polígono precisa ser fechado.",
      },
      {
        id: "C",
        text: "Figura plana fechada formada por segmentos de reta unidos pelas extremidades",
        correct: true,
        explanation:
          "Correta. Polígono é uma figura plana e fechada, formada por segmentos de reta que se unem pelas extremidades (os vértices) e delimitam uma região interna. Quadrado, triângulo e pentágono são exemplos.",
      },
      {
        id: "D",
        text: "Figura formada por segmentos de reta que se cruzam no meio",
        correct: false,
        explanation:
          "Uma figura em que os segmentos se cruzam no meio, como uma ampulheta desenhada com retas (o exemplo C do livro), não é polígono. Tenta porque é feita só de segmentos e pode parecer fechada. Mas nos polígonos os lados só se encontram nas extremidades, sem cruzamentos.",
      },
    ],
    tips: [
      "Polígono: plano, fechado, só segmentos de reta, sem cruzamentos.",
      "Os três exemplos de 'não polígono' do livro: tem curva, é aberto, ou os lados se cruzam.",
    ],
  },
  {
    id: "mat-t6-q02",
    topic: "poligonos-regulares",
    prompt: "Quando um polígono é chamado de convexo?",
    options: [
      {
        id: "A",
        text: "Quando todo segmento com extremidades dentro dele fica inteiramente dentro dele",
        correct: true,
        explanation:
          "Correta. Um polígono é convexo quando qualquer segmento de reta com as duas extremidades dentro dele fica totalmente dentro da figura. Se pelo menos um desses segmentos passar por fora, o polígono é não convexo (côncavo). Todos os polígonos regulares são convexos.",
      },
      {
        id: "B",
        text: "Quando todos os seus lados têm a mesma medida",
        correct: false,
        explanation:
          "Um polígono com todos os lados iguais é chamado de equilátero. Tenta porque os polígonos regulares, que são equiláteros, também são convexos. Mas são ideias diferentes: uma estrela de lados iguais é equilátera e não é convexa.",
      },
      {
        id: "C",
        text: "Quando tem uma ponta voltada para dentro, como uma seta",
        correct: false,
        explanation:
          "Uma figura com uma ponta para dentro, como a seta ou a bandeirinha do livro, é o exemplo típico de polígono não convexo (côncavo). Tenta porque é a figura que aparece ao lado dos convexos na explicação. Mas é justamente o contrário: nela há segmentos com as pontas dentro que passam por fora.",
      },
      {
        id: "D",
        text: "Quando todos os seus ângulos internos são retos",
        correct: false,
        explanation:
          "Ângulos internos todos retos são característica do quadrado e do retângulo. Tenta porque esses polígonos são convexos. Mas ter ângulos retos não é a definição: um pentágono regular é convexo e tem ângulos de 108°.",
      },
    ],
    tips: [
      "Teste do convexo: ligue dois pontos de dentro. Se o segmento sair da figura, é não convexo.",
      "Todo polígono regular é convexo.",
    ],
  },
  {
    id: "mat-t6-q03",
    topic: "poligonos-regulares",
    prompt:
      "Um losango tem os quatro lados de 5 cm, mas seus ângulos internos medem 60°, 120°, 60° e 120°. Como ele se classifica?",
    options: [
      {
        id: "A",
        text: "Polígono regular",
        correct: false,
        explanation:
          "Polígono regular é o que é ao mesmo tempo equilátero (lados iguais) e equiângulo (ângulos iguais), como o quadrado. Tenta porque os lados do losango são todos iguais. Mas seus ângulos não são todos iguais (60° e 120°), então ele não é regular.",
      },
      {
        id: "B",
        text: "Equilátero, mas não regular",
        correct: true,
        explanation:
          "Correta. Com todos os lados de mesma medida, o losango é equilátero. Mas, como os ângulos internos não são todos congruentes, ele não é equiângulo, e para ser regular precisaria das duas coisas.",
      },
      {
        id: "C",
        text: "Equiângulo, mas não equilátero",
        correct: false,
        explanation:
          "Equiângulo é o polígono com todos os ângulos internos iguais, como o retângulo (quatro ângulos de 90° e lados de medidas diferentes). Tenta porque é a 'outra metade' da definição de regular. Mas aqui é o contrário: os lados são iguais e os ângulos não.",
      },
      {
        id: "D",
        text: "Polígono não convexo",
        correct: false,
        explanation:
          "Polígono não convexo é o que tem segmentos com as pontas dentro que passam por fora da figura, como uma seta. Tenta porque o losango não é regular, e às vezes se confunde 'irregular' com 'não convexo'. Mas o losango é convexo: nenhum segmento interno sai dele.",
      },
    ],
    tips: [
      "Regular = equilátero (lados iguais) + equiângulo (ângulos iguais).",
      "Losango: equilátero e não equiângulo. Retângulo: equiângulo e não equilátero. Quadrado: os dois.",
    ],
  },
  {
    id: "mat-t6-q04",
    topic: "poligonos-regulares",
    prompt: "Quantos lados têm, respectivamente, um undecágono e um icoságono?",
    options: [
      {
        id: "A",
        text: "12 e 20",
        correct: false,
        explanation:
          "O polígono de 12 lados é o dodecágono. Tenta porque 'undecágono' e 'dodecágono' são vizinhos na tabela e os dois terminam em 'decágono'. Mas 'un' indica 11 (dez mais um) e 'do' indica 12 (dez mais dois).",
      },
      {
        id: "B",
        text: "11 e 12",
        correct: false,
        explanation:
          "12 lados é o dodecágono, que vem logo depois do undecágono na tabela. Tenta porque o undecágono está certo e os dois nomes estão juntos na lista. Mas o icoságono é o último da tabela do livro, com 20 lados.",
      },
      {
        id: "C",
        text: "10 e 20",
        correct: false,
        explanation:
          "O polígono de 10 lados é o decágono. Tenta porque 'undecágono' contém a palavra 'decágono'. Mas o prefixo 'un' acrescenta um: undecágono tem 11 lados.",
      },
      {
        id: "D",
        text: "11 e 20",
        correct: true,
        explanation:
          "Correta. Pela tabela do livro: undecágono tem 11 lados e icoságono tem 20 lados. Os outros nomes da tabela: triângulo (3), quadrilátero (4), pentágono (5), hexágono (6), heptágono (7), octógono (8), eneágono (9), decágono (10) e dodecágono (12).",
      },
    ],
    tips: [
      "Decágono 10, undecágono 11, dodecágono 12, icoságono 20.",
      "O número de lados é igual ao número de ângulos internos.",
    ],
  },
  {
    id: "mat-t6-q05",
    topic: "poligonos-regulares",
    prompt:
      "Em um polígono de 12 lados, traçam-se todas as diagonais que partem de um mesmo vértice. Quantas diagonais são, e quantos triângulos elas formam?",
    options: [
      {
        id: "A",
        text: "9 diagonais e 10 triângulos",
        correct: true,
        explanation:
          "Correta. As diagonais que partem de um vértice são n − 3 = 12 − 3 = 9: não se liga o vértice a ele mesmo nem aos dois vizinhos. Os triângulos formados são n − 2 = 12 − 2 = 10.",
      },
      {
        id: "B",
        text: "10 diagonais e 9 triângulos",
        correct: false,
        explanation:
          "São os números certos, mas trocados. Tenta porque os dois valores aparecem nas contas. Mas as diagonais de um vértice são n − 3 = 9, e os triângulos são n − 2 = 10: sempre há um triângulo a mais do que diagonais.",
      },
      {
        id: "C",
        text: "12 diagonais e 10 triângulos",
        correct: false,
        explanation:
          "12 é o número de lados do polígono, que é também o número de vértices. Tenta porque parece que cada vértice gera uma diagonal. Mas de um vértice não sai diagonal para ele mesmo nem para os dois vizinhos (esses são lados): são 12 − 3 = 9.",
      },
      {
        id: "D",
        text: "54 diagonais e 10 triângulos",
        correct: false,
        explanation:
          "54 é o total de diagonais do dodecágono, d = 12 · (12 − 3) ÷ 2 = 54, contando as de todos os vértices. Tenta porque é o número da tabela do livro. Mas a pergunta pede só as que partem de um mesmo vértice.",
      },
    ],
    tips: [
      "De um vértice: D = n − 3 diagonais, que formam n − 2 triângulos.",
      "O total de diagonais do polígono é outra fórmula: d = n · (n − 3) ÷ 2.",
    ],
  },
  {
    id: "mat-t6-q06",
    topic: "poligonos-regulares",
    prompt: "Quantas diagonais tem, no total, um octógono?",
    options: [
      {
        id: "A",
        text: "5",
        correct: false,
        explanation:
          "5 é o número de diagonais que partem de um mesmo vértice do octógono (n − 3 = 8 − 3). Tenta porque é a primeira fórmula de diagonais do capítulo. Mas a pergunta pede o total, contando as diagonais de todos os vértices.",
      },
      {
        id: "B",
        text: "40",
        correct: false,
        explanation:
          "40 é 8 · 5, ou seja, n · (n − 3) sem dividir por 2. Tenta porque é quase a fórmula toda. Mas assim cada diagonal é contada duas vezes (a diagonal AC sai de A e também de C), e é por isso que a fórmula divide por 2.",
      },
      {
        id: "C",
        text: "20",
        correct: true,
        explanation:
          "Correta. O total de diagonais é d = n · (n − 3) ÷ 2. Para o octógono, n = 8: d = 8 · 5 ÷ 2 = 40 ÷ 2 = 20 diagonais, como na tabela do livro.",
      },
      {
        id: "D",
        text: "6",
        correct: false,
        explanation:
          "6 é n − 2 = 8 − 2, o número de triângulos formados pelas diagonais de um vértice. Tenta porque também é uma fórmula do capítulo com n. Mas ela conta triângulos, e não diagonais.",
      },
    ],
    tips: [
      "Total de diagonais: d = n · (n − 3) ÷ 2. O ÷ 2 tira as diagonais contadas duas vezes.",
      "Confira com a tabela: quadrado 2, pentágono 5, hexágono 9, octógono 20.",
    ],
  },
  {
    id: "mat-t6-q07",
    topic: "poligonos-regulares",
    prompt: "Somando todos os ângulos internos de um octógono, que total se obtém?",
    options: [
      {
        id: "A",
        text: "1 440°",
        correct: false,
        explanation:
          "1 440° é 8 · 180°, multiplicando pelo número de lados em vez de n − 2. Tenta porque a fórmula usa 180° vezes um número. Mas as diagonais de um vértice dividem o polígono em n − 2 triângulos, e são esses triângulos que somam 180° cada.",
      },
      {
        id: "B",
        text: "1 080°",
        correct: true,
        explanation:
          "Correta. A soma dos ângulos internos é Sᵢ = (n − 2) · 180°. Para o octógono: (8 − 2) · 180° = 6 · 180° = 1 080°. São os 6 triângulos formados pelas diagonais de um vértice.",
      },
      {
        id: "C",
        text: "135°",
        correct: false,
        explanation:
          "135° é a medida de cada ângulo interno do octógono regular (1 080° ÷ 8). Tenta porque é um número conhecido do octógono. Mas a pergunta pede a soma de todos os ângulos, e não um ângulo só.",
      },
      {
        id: "D",
        text: "720°",
        correct: false,
        explanation:
          "720° é a soma dos ângulos internos do hexágono, (6 − 2) · 180° = 4 · 180°. Tenta porque é o exemplo resolvido no livro. Mas o octógono tem 8 lados e forma 6 triângulos, não 4.",
      },
    ],
    tips: [
      "Sᵢ = (n − 2) · 180°: número de triângulos vezes 180°.",
      "Vale para qualquer polígono convexo, regular ou não.",
    ],
  },
  {
    id: "mat-t6-q08",
    topic: "poligonos-regulares",
    prompt: "Quanto mede cada ângulo interno de um dodecágono regular?",
    options: [
      {
        id: "A",
        text: "30°",
        correct: false,
        explanation:
          "30° é a medida de cada ângulo externo do dodecágono regular (360° ÷ 12). Tenta porque é a conta mais curta do capítulo. Mas o interno é o suplemento do externo: 180° − 30° = 150°.",
      },
      {
        id: "B",
        text: "1 800°",
        correct: false,
        explanation:
          "1 800° é a soma de todos os ângulos internos do dodecágono, (12 − 2) · 180°. Tenta porque é o primeiro passo da conta. Mas no polígono regular os 12 ângulos são iguais, e falta dividir por 12.",
      },
      {
        id: "C",
        text: "120°",
        correct: false,
        explanation:
          "120° é o ângulo interno do hexágono regular (720° ÷ 6), o exemplo resolvido no livro. Tenta porque é o ângulo interno mais conhecido depois dos 90° do quadrado. Mas o dodecágono tem o dobro de lados, e quanto mais lados, maior o ângulo interno.",
      },
      {
        id: "D",
        text: "150°",
        correct: true,
        explanation:
          "Correta. No polígono regular, aᵢ = (n − 2) · 180° ÷ n. Para n = 12: (10 · 180°) ÷ 12 = 1 800° ÷ 12 = 150°. Conferindo pelo externo: 360° ÷ 12 = 30° e 180° − 30° = 150°.",
      },
    ],
    tips: [
      "Ângulo interno do regular: aᵢ = (n − 2) · 180° ÷ n.",
      "Atalho: ache o externo (360° ÷ n) e faça 180° menos ele.",
    ],
  },
  {
    id: "mat-t6-q09",
    topic: "poligonos-regulares",
    prompt: "Quantos lados tem um polígono regular cujo ângulo externo mede 12°?",
    options: [
      {
        id: "A",
        text: "30",
        correct: true,
        explanation:
          "Correta. No polígono regular, aₑ = 360° ÷ n. Então 12° = 360° ÷ n, e n = 360° ÷ 12° = 30 lados.",
      },
      {
        id: "B",
        text: "12",
        correct: false,
        explanation:
          "12 é a medida do ângulo externo, e não o número de lados. Tenta porque é o único número do enunciado. Mas um polígono de 12 lados teria ângulo externo de 360° ÷ 12 = 30°, e não de 12°.",
      },
      {
        id: "C",
        text: "168",
        correct: false,
        explanation:
          "168° é a medida do ângulo interno desse polígono (180° − 12°). Tenta porque é uma conta certa sobre o mesmo polígono. Mas a pergunta pede o número de lados, que sai de 360° ÷ 12°.",
      },
      {
        id: "D",
        text: "15",
        correct: false,
        explanation:
          "15 é 180° ÷ 12°, como se a volta completa dos ângulos externos fosse 180°. Tenta porque 180° aparece em quase todas as fórmulas. Mas a soma dos ângulos externos de um polígono é 360°, e por isso aₑ = 360° ÷ n.",
      },
    ],
    tips: [
      "aₑ = 360° ÷ n, então n = 360° ÷ aₑ.",
      "A soma dos ângulos externos de qualquer polígono convexo é sempre 360°.",
    ],
  },
  {
    id: "mat-t6-q10",
    topic: "poligonos-regulares",
    prompt:
      "A soma das medidas dos ângulos internos de um polígono é 1 800°. Quantos lados ele tem e qual é o seu nome?",
    options: [
      {
        id: "A",
        text: "10 lados, decágono",
        correct: false,
        explanation:
          "10 é 1 800° ÷ 180°, que dá o número de triângulos (n − 2), e não o de lados. Tenta porque dividir por 180° é o primeiro passo certo. Mas ainda falta somar 2: n − 2 = 10, então n = 12.",
      },
      {
        id: "B",
        text: "11 lados, undecágono",
        correct: false,
        explanation:
          "O undecágono tem soma (11 − 2) · 180° = 1 620°. Tenta porque fica entre 10 e 12, como se a fórmula pedisse 'mais um'. Mas a fórmula usa n − 2, então é preciso somar 2 ao número de triângulos.",
      },
      {
        id: "C",
        text: "12 lados, dodecágono",
        correct: true,
        explanation:
          "Correta. (n − 2) · 180° = 1 800°, então n − 2 = 1 800 ÷ 180 = 10, e n = 12. O polígono de 12 lados é o dodecágono.",
      },
      {
        id: "D",
        text: "12 lados, icoságono",
        correct: false,
        explanation:
          "Icoságono é o polígono de 20 lados, o último da tabela do livro. Tenta porque o número de lados (12) está certo e os nomes são parecidos. Mas o nome do polígono de 12 lados é dodecágono.",
      },
    ],
    tips: [
      "Para achar n pela soma: divida por 180° e some 2.",
      "Confira refazendo a conta: (12 − 2) · 180° = 1 800°.",
    ],
  },
  {
    id: "mat-t6-q11",
    topic: "poligonos-regulares",
    prompt:
      "Em um polígono regular, a soma das medidas dos ângulos internos é o quádruplo da soma das medidas dos ângulos externos. Que polígono é esse?",
    options: [
      {
        id: "A",
        text: "Octógono",
        correct: false,
        explanation:
          "O octógono tem soma dos internos (8 − 2) · 180° = 1 080°, que é só o triplo de 360°. Tenta porque 1 440° ÷ 180° = 8, e é fácil parar aí. Mas 8 é n − 2: o número de lados é 8 + 2 = 10.",
      },
      {
        id: "B",
        text: "Decágono",
        correct: true,
        explanation:
          "Correta. A soma dos externos é sempre 360°, então a dos internos é 4 · 360° = 1 440°. Com a fórmula: (n − 2) · 180° = 1 440°, n − 2 = 8, n = 10. O polígono de 10 lados é o decágono.",
      },
      {
        id: "C",
        text: "Pentágono",
        correct: false,
        explanation:
          "O pentágono tem soma dos internos (5 − 2) · 180° = 540°, que é só 1,5 vez 360°. Tenta porque é o polígono regular mais usado nos exemplos. Mas para chegar ao quádruplo de 360° são precisos 1 440°.",
      },
      {
        id: "D",
        text: "Eneágono",
        correct: false,
        explanation:
          "O eneágono (9 lados) tem soma dos internos (9 − 2) · 180° = 1 260°. Tenta porque é o exemplo do livro para ângulos internos (140°) e externos (40°). Mas 1 260° é 3,5 vezes 360°, e não 4.",
      },
    ],
    tips: [
      "A soma dos ângulos externos é sempre 360°, para qualquer número de lados.",
      "Transforme a frase em equação: (n − 2) · 180° = 4 · 360°.",
    ],
  },
  {
    id: "mat-t6-q12",
    topic: "poligonos-regulares",
    prompt:
      "Um polígono regular tem soma dos ângulos internos igual a 720°, e cada lado mede 1,2 cm. Qual é o seu perímetro?",
    options: [
      {
        id: "A",
        text: "6 cm",
        correct: false,
        explanation:
          "6 cm é 5 · 1,2, o perímetro de um pentágono com esse lado. Tenta porque o pentágono é o polígono regular mais citado. Mas o pentágono tem soma dos internos 540°; para 720° é preciso (n − 2) = 4, ou seja, 6 lados.",
      },
      {
        id: "B",
        text: "4,8 cm",
        correct: false,
        explanation:
          "4,8 cm é 4 · 1,2, usando n − 2 = 4 (o número de triângulos) como se fosse o número de lados. Tenta porque 720° ÷ 180° = 4 é o primeiro passo. Mas falta somar 2: o polígono tem 6 lados.",
      },
      {
        id: "C",
        text: "8,4 cm",
        correct: false,
        explanation:
          "8,4 cm é 7 · 1,2, o perímetro de um heptágono. Tenta porque parece um ajuste a mais em n. Mas o heptágono tem soma (7 − 2) · 180° = 900°, e não 720°.",
      },
      {
        id: "D",
        text: "7,2 cm",
        correct: true,
        explanation:
          "Correta. (n − 2) · 180° = 720°, então n − 2 = 4 e n = 6: é um hexágono regular. Perímetro é a soma dos lados, todos iguais: 6 · 1,2 cm = 7,2 cm.",
      },
    ],
    tips: [
      "Primeiro descubra n pela soma dos ângulos; depois perímetro = n · lado.",
      "720° é a soma do hexágono: 4 triângulos de 180°.",
    ],
  },
  {
    id: "mat-t6-q13",
    topic: "poligonos-regulares",
    prompt:
      "As abelhas constroem os alvéolos da colmeia em forma de hexágonos regulares. Segundo o texto do livro, por que essa forma é vantajosa?",
    options: [
      {
        id: "A",
        text: "Porque cobrem a superfície sem deixar espaços e desperdiçam menos área",
        correct: true,
        explanation:
          "Correta. O texto explica que a rede de hexágonos regulares é a figura que cobre o maior espaço com a menor área, encaixando-se sem vãos. Quanto mais lados um polígono tem, mais eficiente é a área, e o hexágono é o que menos desperdiça espaço para conter um círculo, sem deixar buracos entre os favos.",
      },
      {
        id: "B",
        text: "Porque o hexágono regular tem todos os ângulos internos retos",
        correct: false,
        explanation:
          "Todos os ângulos internos retos (90°) é característica do quadrado. Tenta porque o quadrado também cobre superfícies sem deixar espaços, como um piso de ladrilhos. Mas o ângulo interno do hexágono regular mede 120° (720° ÷ 6).",
      },
      {
        id: "C",
        text: "Porque o hexágono é o polígono regular com o menor número de lados",
        correct: false,
        explanation:
          "O polígono regular com menos lados é o triângulo equilátero, com 3. Tenta porque o hexágono é uma figura simples e comum. Mas ele tem 6 lados, e o texto diz o contrário: mais lados deixam a forma mais eficiente.",
      },
      {
        id: "D",
        text: "Porque o hexágono não tem nenhuma diagonal que enfraqueça o favo",
        correct: false,
        explanation:
          "O único polígono sem diagonais é o triângulo. Tenta porque a frase parece técnica. Mas o hexágono tem 9 diagonais no total (6 · 3 ÷ 2), e isso não tem relação com a escolha das abelhas.",
      },
    ],
    tips: [
      "Hexágono regular: 6 lados, ângulos internos de 120°, 9 diagonais.",
      "Mosaicos regulares usam um só polígono regular; as abelhas usam o hexágono.",
    ],
  },
  {
    id: "mat-t6-q14",
    topic: "poligonos-regulares",
    prompt:
      "O perímetro de um polígono regular é 200 cm, e cada ângulo interno mede 144°. Qual é a medida de cada lado?",
    options: [
      {
        id: "A",
        text: "10 cm",
        correct: false,
        explanation:
          "10 é o número de lados do polígono: o externo mede 180° − 144° = 36° e n = 360° ÷ 36° = 10. Tenta porque é o resultado do cálculo principal. Mas a pergunta pede a medida de cada lado, que é o perímetro dividido por 10.",
      },
      {
        id: "B",
        text: "36 cm",
        correct: false,
        explanation:
          "36 é a medida, em graus, do ângulo externo (180° − 144°). Tenta porque é um passo da resolução. Mas um ângulo não é um comprimento: o 36° serve para achar o número de lados.",
      },
      {
        id: "C",
        text: "20 cm",
        correct: true,
        explanation:
          "Correta. O ângulo externo é 180° − 144° = 36°, então n = 360° ÷ 36° = 10 lados (é um decágono). Como os lados de um polígono regular são iguais, cada um mede 200 ÷ 10 = 20 cm.",
      },
      {
        id: "D",
        text: "25 cm",
        correct: false,
        explanation:
          "25 cm é 200 ÷ 8, o lado de um octógono regular com esse perímetro. Tenta porque o octógono é um polígono comum nos exemplos. Mas o ângulo interno do octógono é 135°, e o de 144° é do decágono.",
      },
    ],
    tips: [
      "Do ângulo interno ao número de lados: externo = 180° − interno; n = 360° ÷ externo.",
      "Polígono regular: lado = perímetro ÷ n.",
    ],
  },
  {
    id: "mat-t6-q15",
    topic: "poligonos-regulares",
    prompt:
      "Para construir um quadrado ABCD com régua e compasso, com lado igual ao segmento MN, o passo 1 é transportar MN para uma reta, marcando o lado AB. Qual é o passo 2?",
    options: [
      {
        id: "A",
        text: "Com abertura igual a MN, traçar arcos com ponta-seca em B e em A para marcar C e D",
        correct: false,
        explanation:
          "Traçar arcos com abertura MN a partir de B e de A é o passo 3, que marca os vértices C e D. Tenta porque é um passo real da construção. Mas sem as perpendiculares do passo 2 não se sabe em que direção marcar C e D, e o resultado poderia ser um losango em vez de um quadrado.",
      },
      {
        id: "B",
        text: "Traçar retas perpendiculares a AB nos pontos A e B, formando ângulos de 90°",
        correct: true,
        explanation:
          "Correta. O quadrado tem todos os ângulos internos retos, então o passo 2 é construir duas perpendiculares à reta, em A e em B. Depois (passo 3) se marcam C e D nelas com o compasso aberto em MN, e (passo 4) a régua liga C e D.",
      },
      {
        id: "C",
        text: "Ligar A e B ao ponto médio do segmento MN",
        correct: false,
        explanation:
          "O ponto médio é o ponto que divide um segmento em duas partes iguais. Tenta porque MN é o segmento de referência da construção. Mas MN só serve para dar a medida do lado: depois de transportada, ele não participa mais do desenho.",
      },
      {
        id: "D",
        text: "Traçar a diagonal AC e medir nela um ângulo de 45°",
        correct: false,
        explanation:
          "A diagonal de um quadrado de fato forma 45° com os lados, mas ela liga vértices que ainda não existem nesse ponto da construção (C ainda não foi marcado). Tenta porque é uma propriedade verdadeira do quadrado. Mas a construção com régua e compasso parte dos ângulos retos em A e B.",
      },
    ],
    tips: [
      "Quadrado: lados iguais (compasso com abertura MN) e ângulos de 90° (perpendiculares).",
      "Ordem: lado AB, perpendiculares em A e B, marcar C e D, ligar C a D.",
    ],
  },
];
