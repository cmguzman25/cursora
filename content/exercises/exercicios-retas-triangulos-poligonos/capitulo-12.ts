import type { ExamQuestionImage, Exercise } from "../types";

/**
 * Capítulo 12, "Polígonos regulares": todas las Atividades (pp. 120–127) y la
 * Folha AZ (p. 128), con los enunciados y las figuras del libro.
 */

const SECAO = "capitulo-12";

function figura(nome: string, alt: string, width: number, height: number): ExamQuestionImage {
  return { src: `/exercises/exercicios-retas-triangulos-poligonos/${nome}.png`, alt, width, height };
}

const N2_1 = "Determine a medida do ângulo interno e a do externo de cada polígono regular.";

export const CAPITULO_12: Exercise[] = [
  /* --- Nível 1 ------------------------------------------------------------ */
  {
    id: "c12-n1-1",
    section: SECAO,
    label: "Nível 1 · Atividade 1",
    prompt: "Calcule a medida dos ângulos internos dos polígonos regulares indicados.\na) Heptágono\nb) Dodecágono\nc) Eneágono\nd) Icoságono",
    steps: [
      {
        text: "No polígono regular todos os ângulos internos são iguais. Cada um mede a soma (n − 2) · 180° dividida pelo número de lados n.",
        work: ["aᵢ = (n − 2) · 180° ÷ n"],
      },
      {
        text: "a) Heptágono, n = 7.",
        work: ["aᵢ = 5 · 180° ÷ 7 = 900° ÷ 7 ≈ 128,6°"],
      },
      {
        text: "b) Dodecágono, n = 12.",
        work: ["aᵢ = 10 · 180° ÷ 12 = 1 800° ÷ 12 = 150°"],
      },
      {
        text: "c) Eneágono, n = 9.",
        work: ["aᵢ = 7 · 180° ÷ 9 = 1 260° ÷ 9 = 140°"],
      },
      {
        text: "d) Icoságono, n = 20.",
        work: ["aᵢ = 18 · 180° ÷ 20 = 3 240° ÷ 20 = 162°"],
      },
    ],
    answer: "a) 900°/7 ≈ 128,6°; b) 150°; c) 140°; d) 162°",
  },
  {
    id: "c12-n1-2",
    section: SECAO,
    label: "Nível 1 · Atividade 2",
    prompt:
      "Em cada item, determine o número de lados e o nome de cada polígono regular, conhecendo a soma das medidas dos ângulos internos.\na) Sᵢ = 360°\nb) Sᵢ = 540°\nc) Sᵢ = 3 240°\nd) Sᵢ = 1 800°",
    steps: [
      {
        text: "Usamos Sᵢ = (n − 2) · 180°. Dividindo a soma por 180° obtemos n − 2; somando 2, obtemos n.",
      },
      {
        text: "a) 360° ÷ 180° = 2, então n = 2 + 2 = 4.",
        work: ["n = 4: quadrilátero (o regular é o quadrado)"],
      },
      {
        text: "b) 540° ÷ 180° = 3, então n = 5.",
        work: ["n = 5: pentágono"],
      },
      {
        text: "c) 3 240° ÷ 180° = 18, então n = 20.",
        work: ["n = 20: icoságono"],
      },
      {
        text: "d) 1 800° ÷ 180° = 10, então n = 12.",
        work: ["n = 12: dodecágono"],
      },
    ],
    answer: "a) 4 lados, quadrilátero (quadrado); b) 5, pentágono; c) 20, icoságono; d) 12, dodecágono",
  },
  {
    id: "c12-n1-3",
    section: SECAO,
    label: "Nível 1 · Atividade 3",
    prompt: "Desenhe um quadrado regular de 3 cm de lado usando régua e compasso.",
    steps: [
      {
        text: "Passo 1: trace uma reta e marque nela o segmento AB com 3 cm (use o compasso aberto em 3 cm, medido na régua).",
      },
      {
        text: "Passo 2: construa retas perpendiculares a AB nos pontos A e B, formando ângulos de 90°.",
      },
      {
        text: "Passo 3: com a ponta-seca em B e abertura de 3 cm, marque na perpendicular de B o ponto C. Faça o mesmo em A para marcar o ponto D.",
      },
      {
        text: "Passo 4: com a régua, ligue C a D. O quadrado ABCD tem os quatro lados de 3 cm e os quatro ângulos retos.",
      },
    ],
    answer: "Quadrado ABCD com lados de 3 cm: lado AB, perpendiculares em A e B, C e D marcados com o compasso",
  },

  /* --- Nível 2 ------------------------------------------------------------ */
  {
    id: "c12-n2-1a",
    section: SECAO,
    label: "Nível 2 · Atividade 1a",
    prompt: N2_1,
    image: figura("c12-n2-1a", "Um octógono regular (8 lados).", 270, 256),
    steps: [
      {
        text: "Conte os lados da figura: são 8. É um octógono regular.",
      },
      {
        text: "Ângulo externo: a soma dos externos é sempre 360°, dividida pelos 8 lados.",
        work: ["aₑ = 360° ÷ 8 = 45°"],
      },
      {
        text: "Ângulo interno: suplementar ao externo.",
        work: ["aᵢ = 180° − 45° = 135°"],
      },
    ],
    answer: "Interno 135°, externo 45°",
  },
  {
    id: "c12-n2-1b",
    section: SECAO,
    label: "Nível 2 · Atividade 1b",
    prompt: N2_1,
    image: figura("c12-n2-1b", "Um pentágono regular (5 lados).", 276, 254),
    steps: [
      {
        text: "A figura tem 5 lados: é um pentágono regular.",
      },
      {
        text: "Ângulo externo:",
        work: ["aₑ = 360° ÷ 5 = 72°"],
      },
      {
        text: "Ângulo interno:",
        work: ["aᵢ = 180° − 72° = 108°"],
      },
    ],
    answer: "Interno 108°, externo 72°",
  },
  {
    id: "c12-n2-1c",
    section: SECAO,
    label: "Nível 2 · Atividade 1c",
    prompt: N2_1,
    image: figura("c12-n2-1c", "Um dodecágono regular (12 lados).", 268, 256),
    steps: [
      {
        text: "Contando os lados com cuidado, a figura tem 12: é um dodecágono regular. Dica: conte 3 lados em cada quarto da figura.",
      },
      {
        text: "Ângulo externo:",
        work: ["aₑ = 360° ÷ 12 = 30°"],
      },
      {
        text: "Ângulo interno:",
        work: ["aᵢ = 180° − 30° = 150°"],
      },
    ],
    answer: "Interno 150°, externo 30°",
  },
  {
    id: "c12-n2-1d",
    section: SECAO,
    label: "Nível 2 · Atividade 1d",
    prompt: N2_1,
    image: figura("c12-n2-1d", "Um icoságono regular (20 lados), quase parecido com um círculo.", 268, 264),
    steps: [
      {
        text: "Contando os lados, a figura tem 20: é um icoságono regular. Dica: são 5 lados em cada quarto da figura.",
      },
      {
        text: "Ângulo externo:",
        work: ["aₑ = 360° ÷ 20 = 18°"],
      },
      {
        text: "Ângulo interno:",
        work: ["aᵢ = 180° − 18° = 162°"],
      },
    ],
    answer: "Interno 162°, externo 18°",
  },
  {
    id: "c12-n2-2",
    section: SECAO,
    label: "Nível 2 · Atividade 2",
    prompt:
      "Complete a tabela com a soma dos ângulos internos e a medida de cada ângulo interno dos polígonos regulares: triângulo, quadrado, pentágono, hexágono, octógono e decágono.",
    steps: [
      {
        text: "Para cada polígono: Sᵢ = (n − 2) · 180° e, como é regular, aᵢ = Sᵢ ÷ n.",
      },
      {
        text: "Fazendo as contas:",
        work: [
          "Triângulo (n = 3): Sᵢ = 1 · 180° = 180°; aᵢ = 180° ÷ 3 = 60°",
          "Quadrado (n = 4): Sᵢ = 2 · 180° = 360°; aᵢ = 360° ÷ 4 = 90°",
          "Pentágono (n = 5): Sᵢ = 3 · 180° = 540°; aᵢ = 540° ÷ 5 = 108°",
          "Hexágono (n = 6): Sᵢ = 4 · 180° = 720°; aᵢ = 720° ÷ 6 = 120°",
          "Octógono (n = 8): Sᵢ = 6 · 180° = 1 080°; aᵢ = 1 080° ÷ 8 = 135°",
          "Decágono (n = 10): Sᵢ = 8 · 180° = 1 440°; aᵢ = 1 440° ÷ 10 = 144°",
        ],
      },
      {
        text: "Repare: quanto mais lados, maior o ângulo interno, mas ele nunca chega a 180°.",
      },
    ],
    answer: "Somas: 180°, 360°, 540°, 720°, 1 080°, 1 440°. Ângulos internos: 60°, 90°, 108°, 120°, 135°, 144°",
  },
  {
    id: "c12-n2-3",
    section: SECAO,
    label: "Nível 2 · Atividade 3",
    prompt: "Determine a medida de cada ângulo externo dos polígonos.\na) Quadrado\nb) Pentágono regular\nc) Hexágono regular\nd) Octógono regular",
    steps: [
      {
        text: "No polígono regular, os ângulos externos são iguais e somam 360°: aₑ = 360° ÷ n.",
        work: [
          "a) Quadrado: 360° ÷ 4 = 90°",
          "b) Pentágono: 360° ÷ 5 = 72°",
          "c) Hexágono: 360° ÷ 6 = 60°",
          "d) Octógono: 360° ÷ 8 = 45°",
        ],
      },
    ],
    answer: "a) 90°; b) 72°; c) 60°; d) 45°",
  },
  {
    id: "c12-n2-4",
    section: SECAO,
    label: "Nível 2 · Atividade 4",
    prompt: "Para qualquer polígono, que relação se verifica entre a medida do ângulo interno e a medida do ângulo externo do mesmo vértice?",
    steps: [
      {
        text: "O ângulo externo é formado por um lado e pelo prolongamento do lado vizinho. Ele fica ao lado do ângulo interno do mesmo vértice.",
      },
      {
        text: "Juntos, o interno e o externo formam o ângulo entre um lado e o seu prolongamento, que é uma meia volta.",
        work: ["aᵢ + aₑ = 180°"],
      },
    ],
    answer: "São suplementares: a soma dos dois é 180°",
  },
  {
    id: "c12-n2-5",
    section: SECAO,
    label: "Nível 2 · Atividade 5",
    prompt: "Um quadrilátero tem ângulos internos de medida, em graus, 3x − 45, 2x + 10, 2x + 15 e x + 20. Qual é a medida, em graus, do menor ângulo desse quadrilátero?",
    steps: [
      {
        text: "A soma dos ângulos internos de um quadrilátero é (4 − 2) · 180° = 360°.",
        work: ["(3x − 45) + (2x + 10) + (2x + 15) + (x + 20) = 360", "8x = 360", "x = 45"],
      },
      {
        text: "Calculamos cada ângulo.",
        work: ["3 · 45 − 45 = 90°", "2 · 45 + 10 = 100°", "2 · 45 + 15 = 105°", "45 + 20 = 65°", "90 + 100 + 105 + 65 = 360 ✓"],
      },
    ],
    answer: "O menor ângulo mede 65°",
  },
  {
    id: "c12-n2-6",
    section: SECAO,
    label: "Nível 2 · Atividade 6",
    prompt: "Um polígono regular tem todos os ângulos externos congruentes, de medida 20°. Quantos lados tem esse polígono?",
    steps: [
      {
        text: "Os ângulos externos somam 360°. Se cada um mede 20°, o número de lados é:",
        work: ["n = 360° ÷ 20° = 18"],
      },
    ],
    answer: "18 lados",
  },
  {
    id: "c12-n2-7",
    section: SECAO,
    label: "Nível 2 · Atividade 7",
    prompt: "Qual é o nome do polígono regular em que a soma das medidas dos ângulos internos é o quádruplo da soma das medidas dos ângulos externos?",
    steps: [
      {
        text: "A soma dos ângulos externos é sempre 360°. A soma dos internos é o quádruplo:",
        work: ["Sᵢ = 4 · 360° = 1 440°"],
      },
      {
        text: "Usamos Sᵢ = (n − 2) · 180°.",
        work: ["(n − 2) · 180° = 1 440°", "n − 2 = 8", "n = 10"],
      },
    ],
    answer: "Decágono (10 lados)",
  },
  {
    id: "c12-n2-8",
    section: SECAO,
    label: "Nível 2 · Atividade 8",
    prompt: "Dado um polígono regular em que, de cada um de seus vértices, partem tantas diagonais quantas são as diagonais de um hexágono. Quanto mede, em graus, cada ângulo interno desse polígono?",
    steps: [
      {
        text: "Total de diagonais do hexágono (n = 6):",
        work: ["d = 6 · (6 − 3) ÷ 2 = 18 ÷ 2 = 9"],
      },
      {
        text: "No polígono procurado, de cada vértice partem 9 diagonais. De um vértice partem n − 3 diagonais.",
        work: ["n − 3 = 9", "n = 12"],
      },
      {
        text: "Ângulo interno do dodecágono regular:",
        work: ["aᵢ = (12 − 2) · 180° ÷ 12 = 1 800° ÷ 12 = 150°"],
      },
    ],
    answer: "150°",
  },
  {
    id: "c12-n2-9",
    section: SECAO,
    label: "Nível 2 · Atividade 9",
    prompt: "Quantos lados tem um polígono regular cujo ângulo externo mede 12°?",
    steps: [
      {
        text: "Os ângulos externos somam 360° e, no regular, são todos iguais.",
        work: ["n = 360° ÷ 12° = 30"],
      },
    ],
    answer: "30 lados",
  },
  {
    id: "c12-n2-10",
    section: SECAO,
    label: "Nível 2 · Atividade 10",
    prompt: "Um hectógono é um polígono com 100 lados. Determine as medidas dos ângulos internos e dos ângulos externos de um hectógono regular.",
    steps: [
      {
        text: "Ângulo externo:",
        work: ["aₑ = 360° ÷ 100 = 3,6°"],
      },
      {
        text: "Ângulo interno: suplementar ao externo.",
        work: ["aᵢ = 180° − 3,6° = 176,4°"],
      },
      {
        text: "Conferindo pela outra fórmula: (100 − 2) · 180° ÷ 100 = 17 640° ÷ 100 = 176,4° ✓.",
      },
    ],
    answer: "Ângulo interno 176,4°, ângulo externo 3,6°",
  },
  {
    id: "c12-n2-11",
    section: SECAO,
    label: "Nível 2 · Atividade 11",
    prompt: "Quantos lados tem um polígono cuja soma dos ângulos internos é 2 340°?",
    steps: [
      {
        text: "Usamos Sᵢ = (n − 2) · 180°.",
        work: ["(n − 2) · 180° = 2 340°", "n − 2 = 2 340 ÷ 180 = 13", "n = 15"],
      },
    ],
    answer: "15 lados",
  },
  {
    id: "c12-n2-12",
    section: SECAO,
    label: "Nível 2 · Atividade 12",
    prompt: "Verifique se o triângulo ABC é equilátero, sabendo que Â = 6x − 30, B̂ = 2x − 50 e Ĉ = 2x/3.",
    steps: [
      {
        text: "A soma dos ângulos internos é 180°.",
        work: ["(6x − 30) + (2x − 50) + 2x/3 = 180", "8x + 2x/3 − 80 = 180", "8x + 2x/3 = 260"],
      },
      {
        text: "Multiplicamos tudo por 3 para tirar a fração.",
        work: ["24x + 2x = 780", "26x = 780", "x = 30"],
      },
      {
        text: "Calculamos os ângulos.",
        work: ["Â = 6 · 30 − 30 = 150°", "B̂ = 2 · 30 − 50 = 10°", "Ĉ = 2 · 30 ÷ 3 = 20°"],
      },
      {
        text: "No equilátero os três ângulos medem 60°. Aqui são todos diferentes (e um é obtuso).",
      },
    ],
    answer: "Não é equilátero: os ângulos medem 150°, 10° e 20°",
  },
  {
    id: "c12-n2-13",
    section: SECAO,
    label: "Nível 2 · Atividade 13",
    prompt: "Calcule o perímetro de um polígono regular cuja soma das medidas dos ângulos internos seja 720° e cada lado meça 1,2 cm.",
    steps: [
      {
        text: "Descobrimos o número de lados.",
        work: ["(n − 2) · 180° = 720°", "n − 2 = 4", "n = 6 (hexágono)"],
      },
      {
        text: "O perímetro é a soma dos lados, todos iguais.",
        work: ["P = 6 · 1,2 cm = 7,2 cm"],
      },
    ],
    answer: "7,2 cm",
  },
  {
    id: "c12-n2-14",
    section: SECAO,
    label: "Nível 2 · Atividade 14",
    prompt: "O perímetro de um polígono regular é 200 cm. Sabendo que o ângulo interno mede 144°, qual é a medida de cada lado desse polígono?",
    steps: [
      {
        text: "O ângulo externo é o suplemento do interno.",
        work: ["aₑ = 180° − 144° = 36°"],
      },
      {
        text: "Número de lados:",
        work: ["n = 360° ÷ 36° = 10 (decágono)"],
      },
      {
        text: "Cada lado é o perímetro dividido pelo número de lados.",
        work: ["200 cm ÷ 10 = 20 cm"],
      },
    ],
    answer: "Cada lado mede 20 cm",
  },
  {
    id: "c12-n2-15",
    section: SECAO,
    label: "Nível 2 · Atividade 15",
    prompt: "Determine a medida de α, sabendo que todos os polígonos da figura são regulares.",
    image: figura("c12-n2-15", "Um quadrado ABCD, um triângulo BCE e um pentágono com vértices em B, E, H, G e D, todos com o vértice B em comum. O ângulo α é o espaço que sobra em B, entre o lado BA do quadrado e o lado do pentágono que desce de B.", 328, 280),
    steps: [
      {
        text: "Em volta do ponto B, os ângulos dão uma volta completa: 360°. Ali se encontram o quadrado, o triângulo, o pentágono e o espaço α.",
      },
      {
        text: "Ângulos internos de cada polígono regular nesse vértice:",
        work: ["quadrado: 90°", "triângulo equilátero: 60°", "pentágono regular: 108°"],
      },
      {
        text: "α é o que falta para 360°.",
        work: ["α = 360° − 90° − 60° − 108° = 102°"],
      },
    ],
    answer: "α = 102°",
  },

  /* --- Nível 3 ------------------------------------------------------------ */
  {
    id: "c12-n3-1",
    section: SECAO,
    label: "Nível 3 · Atividade 1",
    prompt: "Pablo fez uma montagem com recortes de papel em formato de quadrado e de pentágono regular, como mostra a figura. É possível verificar um espaço entre os recortes quadrados. Qual é a medida do ângulo α destacado na figura?",
    image: figura("c12-n3-1", "Um pentágono regular verde com um quadrado apoiado em cada um dos seus cinco lados. Entre dois quadrados vizinhos sobra um espaço, marcado com o ângulo α.", 328, 304),
    steps: [
      {
        text: "Olhe um vértice do pentágono: em volta dele estão o ângulo interno do pentágono, os ângulos de dois quadrados e o espaço α. Tudo junto dá uma volta completa, 360°.",
      },
      {
        text: "Ângulo interno do pentágono regular:",
        work: ["(5 − 2) · 180° ÷ 5 = 540° ÷ 5 = 108°"],
      },
      {
        text: "Cada quadrado contribui com 90°.",
        work: ["α = 360° − 108° − 90° − 90° = 72°"],
      },
    ],
    answer: "α = 72°",
  },
  {
    id: "c12-n3-2",
    section: SECAO,
    label: "Nível 3 · Atividade 2",
    prompt: "Observe o retângulo ABCD. Sabe-se que um dos ângulos do vértice C mede 30°, conforme indicado na figura, e que BE // DF. Qual é a medida dos demais ângulos destacados?",
    image: figura("c12-n3-2", "Retângulo ABCD (A em cima à esquerda, D em cima à direita, B embaixo à esquerda, C embaixo à direita) com a diagonal AC. BE e DF são perpendiculares à diagonal (E perto de A, F perto de C). Em A: a entre AD e AC, b entre AC e AB. Em B: c entre BA e BE, d entre BE e BC. Em C: e entre CD e CA; o ângulo entre CA e CB mede 30°. Em D: f entre DA e DF.", 568, 348),
    steps: [
      {
        text: "Os ângulos do retângulo são retos (90°). Em C, o ângulo de 90° está dividido em 30° e e.",
        work: ["e = 90° − 30° = 60°"],
      },
      {
        text: "AD // BC, e a diagonal AC corta as duas: a (em A, entre AD e AC) e o ângulo de 30° (em C) são alternos internos.",
        work: ["a = 30°"],
      },
      {
        text: "Em A, a e b completam o ângulo reto.",
        work: ["b = 90° − 30° = 60°"],
      },
      {
        text: "No triângulo BEC, o ângulo em E é reto e o ângulo em C é 30°. Então d (em B) é o que falta para 180°.",
        work: ["d = 180° − 90° − 30° = 60°"],
      },
      {
        text: "Em B, c e d completam o ângulo reto.",
        work: ["c = 90° − 60° = 30°"],
      },
      {
        text: "No triângulo AFD, o ângulo em F é reto e o ângulo em A é a = 30°. Então f é o que falta.",
        work: ["f = 180° − 90° − 30° = 60°"],
      },
    ],
    answer: "a = 30°, b = 60°, c = 30°, d = 60°, e = 60° e f = 60°",
  },
  {
    id: "c12-n3-3",
    section: SECAO,
    label: "Nível 3 · Atividade 3",
    prompt: "Determine, em graus, a medida do ângulo α, sabendo que o pentágono é regular.",
    image: figura("c12-n3-3", "Pentágono regular ABCDE com A em cima. Do vértice A saem as diagonais AC e AD; α é o ângulo entre elas, em A.", 306, 286),
    steps: [
      {
        text: "Cada ângulo interno do pentágono regular mede 108°.",
      },
      {
        text: "O triângulo ABC tem AB = BC (lados do pentágono): é isósceles, com o ângulo de 108° em B. Os ângulos da base, em A e em C, são iguais.",
        work: ["BÂC = (180° − 108°) ÷ 2 = 36°"],
      },
      {
        text: "Pelo mesmo motivo, no triângulo AED o ângulo em A mede 36°.",
        work: ["EÂD = 36°"],
      },
      {
        text: "O ângulo de 108° em A fica dividido em três partes: 36°, α e 36°.",
        work: ["α = 108° − 36° − 36° = 36°"],
      },
    ],
    answer: "α = 36°",
  },

  /* --- Folha AZ ----------------------------------------------------------- */
  {
    id: "c12-folha-1",
    section: SECAO,
    label: "Folha AZ · 1",
    prompt: "Qual é a medida, aproximada, de cada ângulo interno do polígono regular da figura?\na) 98°   b) 112°   c) 136°   d) 154°   e) 168°",
    image: figura("c12-folha-1", "Um polígono regular com os vértices nomeados de A a N.", 450, 446),
    steps: [
      {
        text: "Conte os vértices pelas letras: A, B, C, D, E, F, G, H, I, J, K, L, M, N. São 14, então o polígono tem 14 lados.",
      },
      {
        text: "Ângulo interno do regular de 14 lados:",
        work: ["aᵢ = (14 − 2) · 180° ÷ 14 = 2 160° ÷ 14 ≈ 154,3°"],
      },
    ],
    answer: "d) 154°",
  },
  {
    id: "c12-folha-2",
    section: SECAO,
    label: "Folha AZ · 2",
    prompt: "Qual é a soma de α e β, sabendo que ambos os pentágonos da figura são regulares?\na) 108°   b) 216°   c) 218°   d) 306°   e) 318°",
    image: figura("c12-folha-2", "Dois pentágonos regulares, ABCDE e BCHGF, que têm o lado BC em comum. Em B, α é o ângulo interno do primeiro pentágono e β o ângulo interno do segundo.", 464, 460),
    steps: [
      {
        text: "α e β são ângulos internos de pentágonos regulares, um em cada pentágono, os dois com vértice em B.",
      },
      {
        text: "Cada ângulo interno do pentágono regular mede:",
        work: ["(5 − 2) · 180° ÷ 5 = 108°"],
      },
      {
        text: "Somamos.",
        work: ["α + β = 108° + 108° = 216°"],
      },
    ],
    answer: "b) 216°",
  },
  {
    id: "c12-folha-3",
    section: SECAO,
    label: "Folha AZ · 3",
    prompt: "Dado que o número de diagonais de um polígono de 8 lados é o quíntuplo do número de lados de outro polígono, conclui-se que o polígono de número de lados desconhecido possui:\na) 8 lados   b) 7 lados   c) 5 lados   d) 4 lados   e) 3 lados",
    steps: [
      {
        text: "Número de diagonais do polígono de 8 lados:",
        work: ["d = 8 · (8 − 3) ÷ 2 = 40 ÷ 2 = 20"],
      },
      {
        text: "Esse número é o quíntuplo (5 vezes) do número de lados do outro polígono.",
        work: ["5 · n = 20", "n = 4"],
      },
    ],
    answer: "d) 4 lados",
  },
];
