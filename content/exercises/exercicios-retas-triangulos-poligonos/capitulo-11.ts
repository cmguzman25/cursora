import type { ExamQuestionImage, Exercise } from "../types";

/**
 * Capítulo 11, "Triângulos": todas las Atividades (pp. 94–101) y la Folha AZ
 * (p. 102), con los enunciados y las figuras del libro.
 */

const SECAO = "capitulo-11";

function figura(nome: string, alt: string, width: number, height: number): ExamQuestionImage {
  return { src: `/exercises/exercicios-retas-triangulos-poligonos/${nome}.png`, alt, width, height };
}

const N1_3 = "Calcule a medida do ângulo interno que não está indicada em cada triângulo.";
const N2_3 = "Determine o valor de x nas figuras.";
const N2_5 = "Verifique se é possível construir os triângulos de medidas:";

export const CAPITULO_11: Exercise[] = [
  /* --- Nível 1 ------------------------------------------------------------ */
  {
    id: "c11-n1-1",
    section: SECAO,
    label: "Nível 1 · Atividade 1",
    prompt:
      "Use régua e compasso para fazer a construção descrita a seguir.\nPasso 1: Trace um segmento AC medindo 7 cm.\nPasso 2: Com a ponta-seca em A e abertura igual a 8 cm, trace um arco.\nPasso 3: Com a ponta-seca em C e abertura igual a 5 cm, trace um arco que intersecte o arco traçado anteriormente.\nPasso 4: Marque o ponto B, que é a intersecção dos arcos traçados em II e III.\nEm seguida, determine, com o transferidor, a medida do ângulo AB̂C.",
    steps: [
      {
        text: "Siga os passos: o ponto B fica a 8 cm de A (está no primeiro arco) e a 5 cm de C (está no segundo). O triângulo construído tem lados AC = 7 cm, AB = 8 cm e BC = 5 cm.",
      },
      {
        text: "Antes de medir, confira que o triângulo existe: o maior lado, 8, é menor que a soma dos outros dois.",
        work: ["8 < 7 + 5 = 12 ✓"],
      },
      {
        text: "Ligue B a A e a C com a régua. Coloque o centro do transferidor em B, com a linha de 0° sobre BC, e leia onde passa BA.",
      },
      {
        text: "O ângulo AB̂C é o que fica oposto ao lado AC (7 cm). Com um desenho caprichado, o transferidor marca 60°. Se der 58° ou 62°, a diferença é do desenho, não da conta.",
      },
    ],
    answer: "AB̂C mede 60°",
  },
  {
    id: "c11-n1-2",
    section: SECAO,
    label: "Nível 1 · Atividade 2",
    prompt: "É possível traçar um triângulo obtusângulo equilátero? Justifique sua resposta.",
    steps: [
      {
        text: "Equilátero é o triângulo com os três lados iguais. Uma propriedade dele é ter também os três ângulos internos iguais.",
      },
      {
        text: "A soma dos ângulos internos é 180°, então cada um mede:",
        work: ["180° ÷ 3 = 60°"],
      },
      {
        text: "Obtusângulo precisa ter um ângulo maior que 90°. No equilátero todos medem 60°, que é agudo: ele é sempre acutângulo.",
      },
    ],
    answer: "Não. No triângulo equilátero todos os ângulos medem 60°, e nenhum pode ser obtuso",
  },
  {
    id: "c11-n1-3a",
    section: SECAO,
    label: "Nível 1 · Atividade 3a",
    prompt: N1_3,
    image: figura("c11-n1-3a", "Triângulo com ângulos indicados de 40° e 60°; o terceiro ângulo não está indicado.", 222, 154),
    steps: [
      {
        text: "A soma dos ângulos internos de qualquer triângulo é 180°.",
        work: ["40° + 60° + a = 180°", "100° + a = 180°", "a = 80°"],
      },
    ],
    answer: "80°",
  },
  {
    id: "c11-n1-3b",
    section: SECAO,
    label: "Nível 1 · Atividade 3b",
    prompt: N1_3,
    image: figura("c11-n1-3b", "Triângulo retângulo (com o símbolo de ângulo reto) com um ângulo de 64°; o terceiro ângulo não está indicado.", 250, 158),
    steps: [
      {
        text: "O quadradinho com um ponto indica um ângulo reto, de 90°. Somamos os três ângulos.",
        work: ["90° + 64° + a = 180°", "154° + a = 180°", "a = 26°"],
      },
    ],
    answer: "26°",
  },
  {
    id: "c11-n1-3c",
    section: SECAO,
    label: "Nível 1 · Atividade 3c",
    prompt: N1_3,
    image: figura("c11-n1-3c", "Triângulo com ângulos indicados de 40° e 25°; o terceiro ângulo, que parece obtuso, não está indicado.", 250, 184),
    steps: [
      {
        text: "A soma dos ângulos internos é 180°.",
        work: ["40° + 25° + a = 180°", "65° + a = 180°", "a = 115°"],
      },
      {
        text: "Como 115° é maior que 90°, esse triângulo é obtusângulo.",
      },
    ],
    answer: "115°",
  },

  /* --- Nível 2 ------------------------------------------------------------ */
  {
    id: "c11-n2-1",
    section: SECAO,
    label: "Nível 2 · Atividade 1",
    prompt: "Calcule o valor de x no triângulo.",
    image: figura("c11-n2-1", "Triângulo com ângulos internos 2x (em cima), 3x (embaixo à esquerda) e 4x (embaixo à direita).", 330, 228),
    steps: [
      {
        text: "Somamos os três ângulos internos e igualamos a 180°.",
        work: ["2x + 3x + 4x = 180°", "9x = 180°", "x = 20°"],
      },
      {
        text: "Os ângulos medem 40°, 60° e 80° (conferindo: 40 + 60 + 80 = 180 ✓).",
      },
    ],
    answer: "x = 20°",
  },
  {
    id: "c11-n2-2",
    section: SECAO,
    label: "Nível 2 · Atividade 2",
    prompt: "Se um triângulo tiver os três lados medindo 5 cm, quanto medirá cada um de seus ângulos internos?",
    steps: [
      {
        text: "Com os três lados iguais, o triângulo é equilátero, e no equilátero os três ângulos internos também são iguais.",
      },
      {
        text: "Dividimos a soma dos ângulos internos por 3.",
        work: ["180° ÷ 3 = 60°"],
      },
      {
        text: "A medida do lado (5 cm) não muda nada: todo equilátero tem ângulos de 60°.",
      },
    ],
    answer: "Cada ângulo mede 60°",
  },
  {
    id: "c11-n2-3a",
    section: SECAO,
    label: "Nível 2 · Atividade 3a",
    prompt: N2_3,
    image: figura("c11-n2-3a", "Triângulo retângulo com ângulo reto embaixo à esquerda, ângulo x em cima e ângulo de 30° embaixo à direita.", 256, 148),
    steps: [
      {
        text: "O triângulo tem um ângulo reto (90°). Somamos os três ângulos.",
        work: ["x + 90° + 30° = 180°", "x + 120° = 180°", "x = 60°"],
      },
    ],
    answer: "x = 60°",
  },
  {
    id: "c11-n2-3b",
    section: SECAO,
    label: "Nível 2 · Atividade 3b",
    prompt: N2_3,
    image: figura("c11-n2-3b", "Triângulo achatado com ângulos de 25° e 10° na base e o ângulo x no vértice de cima.", 302, 102),
    steps: [
      {
        text: "Somamos os três ângulos internos.",
        work: ["25° + x + 10° = 180°", "x + 35° = 180°", "x = 145°"],
      },
      {
        text: "O triângulo é obtusângulo, porque 145° > 90°.",
      },
    ],
    answer: "x = 145°",
  },
  {
    id: "c11-n2-4",
    section: SECAO,
    label: "Nível 2 · Atividade 4",
    prompt: "Descubra a medida de x em graus.",
    image: figura("c11-n2-4", "Triângulo ABC com ângulo x em A, 3x − 26 em B e x + 6 em C.", 448, 230),
    steps: [
      {
        text: "Somamos os três ângulos internos e igualamos a 180°.",
        work: ["x + (3x − 26°) + (x + 6°) = 180°", "5x − 20° = 180°", "5x = 200°", "x = 40°"],
      },
      {
        text: "Os ângulos medem Â = 40°, B̂ = 3 · 40 − 26 = 94° e Ĉ = 40 + 6 = 46°. Conferindo: 40 + 94 + 46 = 180 ✓.",
      },
    ],
    answer: "x = 40°",
  },
  {
    id: "c11-n2-5a",
    section: SECAO,
    label: "Nível 2 · Atividade 5a",
    prompt: `${N2_5} 6 cm, 8 cm e 5 cm.`,
    steps: [
      {
        text: "Condição de existência: cada lado tem que ser menor que a soma dos outros dois (e maior que a diferença). Testamos os três.",
        work: ["6 < 8 + 5 = 13 ✓", "8 < 6 + 5 = 11 ✓", "5 < 6 + 8 = 14 ✓"],
      },
      {
        text: "As três desigualdades são verdadeiras.",
      },
    ],
    answer: "Sim, é possível",
  },
  {
    id: "c11-n2-5b",
    section: SECAO,
    label: "Nível 2 · Atividade 5b",
    prompt: `${N2_5} 7 dm, 9 dm e 21 dm.`,
    steps: [
      {
        text: "Testamos o maior lado: ele tem que ser menor que a soma dos outros dois.",
        work: ["21 < 7 + 9 = 16 ✗ (falso)"],
      },
      {
        text: "Os dois lados menores, juntos, não alcançam as pontas do maior: os arcos do compasso não se encontram.",
      },
    ],
    answer: "Não é possível",
  },
  {
    id: "c11-n2-5c",
    section: SECAO,
    label: "Nível 2 · Atividade 5c",
    prompt: `${N2_5} 6 m, 4 m e 2 m.`,
    steps: [
      {
        text: "Testamos o maior lado.",
        work: ["6 < 4 + 2 = 6 ✗ (6 não é menor que 6)"],
      },
      {
        text: "Quando o maior lado é igual à soma dos outros dois, os segmentos ficam deitados um sobre o outro, em linha reta, e não fecham um triângulo.",
      },
    ],
    answer: "Não é possível",
  },
  {
    id: "c11-n2-6",
    section: SECAO,
    label: "Nível 2 · Atividade 6",
    prompt:
      "Um carpinteiro vai montar um telhado para um galpão. O telhado terá um madeiramento frontal em forma triangular. As medidas desse triângulo são 6 m, 4 m e 5 m. Ele poderia montar esse madeiramento frontal em forma triangular?",
    steps: [
      {
        text: "Aplicamos a condição de existência aos três lados.",
        work: ["6 < 4 + 5 = 9 ✓", "4 < 6 + 5 = 11 ✓", "5 < 6 + 4 = 10 ✓"],
      },
      {
        text: "Todas são verdadeiras, então o triângulo existe.",
      },
    ],
    answer: "Sim, ele pode montar o madeiramento",
  },
  {
    id: "c11-n2-7",
    section: SECAO,
    label: "Nível 2 · Atividade 7",
    prompt: "É possível construir um triângulo com os ângulos 95° e 106°?",
    steps: [
      {
        text: "Somamos os dois ângulos dados.",
        work: ["95° + 106° = 201°"],
      },
      {
        text: "A soma dos três ângulos de um triângulo é 180°, e esses dois já passam de 180°. Não sobra medida para o terceiro ângulo.",
      },
    ],
    answer: "Não é possível",
  },
  {
    id: "c11-n2-8",
    section: SECAO,
    label: "Nível 2 · Atividade 8",
    prompt: "Um triângulo isósceles tem um ângulo interno não pertencente à base com medida 36°. Quanto medem os outros dois ângulos internos?",
    steps: [
      {
        text: "No isósceles, os dois ângulos da base são iguais. Chamamos cada um de y. O de 36° é o ângulo do topo.",
        work: ["y + y + 36° = 180°", "2y = 144°", "y = 72°"],
      },
    ],
    answer: "Os outros dois ângulos medem 72° cada",
  },
  {
    id: "c11-n2-9",
    section: SECAO,
    label: "Nível 2 · Atividade 9",
    prompt: "Em um triângulo isósceles, um dos ângulos da base mede 70°. Quais são as medidas dos outros ângulos do triângulo?",
    steps: [
      {
        text: "Os dois ângulos da base são iguais, então o outro ângulo da base também mede 70°.",
      },
      {
        text: "O terceiro ângulo é o que falta para 180°.",
        work: ["70° + 70° + a = 180°", "a = 40°"],
      },
    ],
    answer: "70° (o outro da base) e 40°",
  },
  {
    id: "c11-n2-10",
    section: SECAO,
    label: "Nível 2 · Atividade 10",
    prompt:
      "O piso de uma sala quadrada compõe-se de ladrilhos roxos ou brancos. Qual é o menor número de ladrilhos roxos que devem ser trocados de posição com um ladrilho branco de modo que o piso apresente o mesmo aspecto quando visto de cada uma das quatro direções assinaladas na figura?",
    image: figura("c11-n2-10", "Piso quadrado com ladrilhos em forma de losango (inteiros no meio, metades nas bordas), alguns roxos e outros brancos, com quatro setas indicando que o piso é visto de cada lado.", 400, 396),
    steps: [
      {
        text: "Ver o piso igual das quatro direções quer dizer que, girando o desenho um quarto de volta (90°), ele não muda. Então os ladrilhos se organizam em grupos de 4 posições que trocam de lugar entre si a cada giro: em cada grupo, ou são todos roxos, ou todos brancos.",
      },
      {
        text: "Metades de ladrilho (nas bordas): estão roxas a da borda esquerda (perto de cima), a da borda de cima (perto da direita) e a da borda de baixo (perto da esquerda). Girando o piso, uma vai para o lugar da outra, e elas formam um grupo de 4 com a metade da borda direita, perto de baixo, que está branca. A quarta metade roxa, no meio da borda de baixo, está sozinha no seu grupo.",
      },
      {
        text: "Basta trocar essa metade roxa sozinha com a metade branca que completa o primeiro grupo: 1 troca.",
      },
      {
        text: "Losangos inteiros: três dos roxos (o de cima à esquerda, o do meio à esquerda e o de baixo à direita) formam um grupo de 4 cujo quarto losango, à direita, perto de cima, está branco. O losango roxo do centro, à direita, está sozinho no seu grupo.",
      },
      {
        text: "Trocamos esse losango roxo sozinho com o branco que completa o grupo: mais 1 troca.",
        work: ["1 + 1 = 2 trocas"],
      },
    ],
    answer: "2 ladrilhos roxos",
    note: "Este é um problema de olimpíada, mais difícil que os outros. A resposta foi deduzida da figura do livro; se o gabarito do professor disser outra coisa, confira as posições dos ladrilhos no livro.",
  },
  {
    id: "c11-n2-11",
    section: SECAO,
    label: "Nível 2 · Atividade 11",
    prompt: "Um triângulo tem dois de seus ângulos de medidas 38° e 102°, respectivamente. Qual é a medida do terceiro ângulo desse triângulo?",
    steps: [
      {
        text: "A soma dos ângulos internos é 180°.",
        work: ["38° + 102° + a = 180°", "140° + a = 180°", "a = 40°"],
      },
    ],
    answer: "40°",
  },
  {
    id: "c11-n2-12",
    section: SECAO,
    label: "Nível 2 · Atividade 12",
    prompt: "Determine a medida dos ângulos internos do triângulo.",
    image: figura("c11-n2-12", "Triângulo com ângulos internos x (embaixo à esquerda), 7x/6 (em cima) e x/3 (embaixo à direita).", 380, 184),
    steps: [
      {
        text: "Somamos os três ângulos e igualamos a 180°.",
        work: ["x + 7x/6 + x/3 = 180°"],
      },
      {
        text: "Escrevemos tudo com denominador 6.",
        work: ["6x/6 + 7x/6 + 2x/6 = 180°", "15x/6 = 180°", "15x = 1 080°", "x = 72°"],
      },
      {
        text: "Calculamos cada ângulo.",
        work: ["x = 72°", "7x/6 = 7 · 72 ÷ 6 = 84°", "x/3 = 72 ÷ 3 = 24°", "72 + 84 + 24 = 180 ✓"],
      },
    ],
    answer: "72°, 84° e 24°",
  },
  {
    id: "c11-n2-13",
    section: SECAO,
    label: "Nível 2 · Atividade 13",
    prompt:
      "Clara quer construir um triângulo grande usando pequenos ladrilhos triangulares iguais. Ela já juntou alguns ladrilhos conforme mostra a figura. Quantos ladrilhos a mais serão necessários para ela completar o triângulo?",
    image: figura("c11-n2-13", "Sete pequenos triângulos equiláteros roxos encaixados: três numa faixa de cima, três numa faixa do meio deslocada para a direita e um embaixo, apontando para baixo.", 360, 298),
    steps: [
      {
        text: "Conte os ladrilhos da figura: 3 na faixa de cima, 3 na faixa do meio e 1 embaixo.",
        work: ["3 + 3 + 1 = 7 ladrilhos"],
      },
      {
        text: "O triângulo grande tem que conter todas as peças. A peça de baixo aponta para baixo, então o triângulo grande também aponta para baixo, com a ponta nela.",
      },
      {
        text: "A faixa de cima, a mais larga, tem que caber nele. Um triângulo de lado 3 ladrilhos não alcança a peça da esquerda da faixa de cima; o menor que cabe tudo tem lado de 4 ladrilhos, contando 4 faixas de cima para baixo.",
      },
      {
        text: "Um triângulo de lado 4 é formado por 4 · 4 = 16 ladrilhos (as faixas têm 7, 5, 3 e 1 peças).",
        work: ["7 + 5 + 3 + 1 = 16"],
      },
      {
        text: "Faltam os que ela ainda não tem.",
        work: ["16 − 7 = 9"],
      },
    ],
    answer: "9 ladrilhos",
  },
  {
    id: "c11-n2-14",
    section: SECAO,
    label: "Nível 2 · Atividade 14",
    prompt: "Determine as medidas dos ângulos x, y e z nos dois triângulos.",
    image: figura("c11-n2-14", "Dois triângulos com um vértice comum C, como uma ampulheta. No triângulo de cima, ABC: x em A, 35° em B e 105° em C. No triângulo de baixo, DCE: y em D, 50° em E e z em C.", 410, 332),
    steps: [
      {
        text: "No triângulo de cima, a soma dos ângulos é 180°.",
        work: ["x + 35° + 105° = 180°", "x = 40°"],
      },
      {
        text: "Em C, os ângulos de 105° e z estão de frente um para o outro, formados pelas mesmas duas retas: são opostos pelo vértice.",
        work: ["z = 105°"],
      },
      {
        text: "No triângulo de baixo, a soma é 180°.",
        work: ["y + 50° + 105° = 180°", "y = 25°"],
      },
    ],
    answer: "x = 40°, y = 25° e z = 105°",
  },
  {
    id: "c11-n2-15",
    section: SECAO,
    label: "Nível 2 · Atividade 15",
    prompt: "Na figura, a medida de AD é igual à medida de BD. Calcule as medidas de x, y e z.",
    image: figura("c11-n2-15", "Triângulo ABC com o ponto D no lado AC, ligado a B. Em D, o ângulo ADB mede 100° e o ângulo BDC é x. Em C, 70°. Em B, o ângulo ABD é z e o ângulo DBC é y.", 360, 200),
    steps: [
      {
        text: "Em D, os ângulos de 100° e x estão lado a lado sobre a reta AC: são suplementares.",
        work: ["x = 180° − 100° = 80°"],
      },
      {
        text: "No triângulo BDC, a soma dos ângulos é 180°.",
        work: ["y + 80° + 70° = 180°", "y = 30°"],
      },
      {
        text: "Como AD = BD, o triângulo ABD é isósceles de base AB: os ângulos em A e em B (que é z) são iguais.",
        work: ["z + z + 100° = 180°", "2z = 80°", "z = 40°"],
      },
    ],
    answer: "x = 80°, y = 30° e z = 40°",
  },

  /* --- Nível 3 ------------------------------------------------------------ */
  {
    id: "c11-n3-1",
    section: SECAO,
    label: "Nível 3 · Atividade 1",
    prompt:
      "Uma estrela é composta de quatro triângulos equiláteros e um quadrado. O perímetro do quadrado é 36 cm. Qual é o perímetro da estrela, em centímetros, destacado em verde?\na) 72   b) 90   c) 104   d) 120   e) 144",
    image: figura("c11-n3-1", "Um quadrado branco com um triângulo equilátero verde apoiado em cada um dos seus quatro lados, formando uma estrela de quatro pontas.", 312, 308),
    steps: [
      {
        text: "O quadrado tem 4 lados iguais. Com perímetro 36 cm, cada lado mede:",
        work: ["36 ÷ 4 = 9 cm"],
      },
      {
        text: "Cada triângulo equilátero está apoiado em um lado do quadrado, então seus três lados medem 9 cm.",
      },
      {
        text: "O contorno da estrela não passa pelos lados do quadrado: usa os outros dois lados de cada triângulo.",
        work: ["4 triângulos · 2 lados = 8 lados", "8 · 9 cm = 72 cm"],
      },
    ],
    answer: "a) 72",
  },
  {
    id: "c11-n3-2",
    section: SECAO,
    label: "Nível 3 · Atividade 2",
    prompt: "Elabore uma descrição para a construção do triângulo da figura.",
    image: figura("c11-n3-2", "Triângulo com lados de 5 cm (base), 7 cm e 3 cm. Os ângulos são 22° no vértice da esquerda da base, 120° no vértice da direita da base e 38° no vértice de cima.", 364, 180),
    steps: [
      {
        text: "Uma descrição possível, usando os três lados (régua e compasso):",
      },
      {
        text: "Passo 1: com a régua, trace a base AB com 5 cm.",
      },
      {
        text: "Passo 2: com a ponta-seca do compasso em A e abertura de 7 cm, trace um arco acima da base.",
      },
      {
        text: "Passo 3: com a ponta-seca em B e abertura de 3 cm, trace outro arco que corte o primeiro. O encontro dos arcos é o vértice C.",
      },
      {
        text: "Passo 4: ligue C a A e a B com a régua.",
      },
      {
        text: "Para conferir, meça os ângulos com o transferidor: 22° em A, 120° em B e 38° em C (22 + 120 + 38 = 180 ✓). Também dá para construir com o transferidor: trace a base de 5 cm, marque 22° em A e 120° em B; as duas semirretas se cruzam em C.",
      },
    ],
    answer: "Base de 5 cm; arcos de 7 cm (a partir de A) e de 3 cm (a partir de B); o cruzamento dos arcos é o terceiro vértice",
  },
  {
    id: "c11-n3-3",
    section: SECAO,
    label: "Nível 3 · Atividade 3",
    prompt: "Construa um triângulo que tenha ângulos internos de medidas de 30° e 60°; o lado oposto ao ângulo de 60° deve medir 4 cm.",
    steps: [
      {
        text: "Primeiro descubra o terceiro ângulo: 180° − 30° − 60° = 90°. O triângulo é retângulo. Chame os vértices de A (30°), B (60°) e C (90°).",
      },
      {
        text: "O lado oposto ao ângulo de 60° (em B) é AC. Passo 1: trace AC com 4 cm.",
      },
      {
        text: "Passo 2: em C, com o transferidor, trace uma semirreta perpendicular a AC (90°).",
      },
      {
        text: "Passo 3: em A, com o transferidor, trace uma semirreta formando 30° com AC, do mesmo lado da perpendicular.",
      },
      {
        text: "Passo 4: o ponto onde as duas semirretas se cruzam é B. Medindo o ângulo em B, ele deve dar 60°.",
      },
    ],
    answer: "Triângulo retângulo com AC = 4 cm, ângulo de 90° em C e de 30° em A (o ângulo em B fica com 60°)",
  },

  /* --- Folha AZ ----------------------------------------------------------- */
  {
    id: "c11-folha-1",
    section: SECAO,
    label: "Folha AZ · 1",
    prompt: "(OBM) Na figura, os dois triângulos são equiláteros. Qual o valor do ângulo x?\na) 30°   b) 40°   c) 50°   d) 60°   e) 70°",
    image: figura("c11-folha-1", "Dois triângulos equiláteros apoiados com um vértice numa reta horizontal e cruzados no alto. O da esquerda forma 75° com a reta, do lado de fora à esquerda; o da direita forma 65° com a reta, do lado de fora à direita. No cruzamento dos dois, forma-se um triângulo pequeno com o ângulo x.", 452, 240),
    steps: [
      {
        text: "Triângulo da esquerda: no vértice sobre a reta, a reta forma uma meia volta (180°) dividida em três partes: 75° (fora), 60° (dentro do equilátero) e o ângulo entre o lado da direita e a reta.",
        work: ["180° − 75° − 60° = 45°"],
      },
      {
        text: "Triângulo da direita, do mesmo jeito: o lado da esquerda forma com a reta:",
        work: ["180° − 65° − 60° = 55°"],
      },
      {
        text: "Esses dois lados e a reta formam um triângulo com ângulos de 45° e 55° na base. O lado de cima do triângulo da esquerda e o lado da esquerda do triângulo da direita fecham o triângulo pequeno onde está x.",
      },
      {
        text: "O lado de cima do triângulo da esquerda faz 60° com o seu lado da direita, então fica inclinado 60° − 45° = 15° descendo para a direita. O lado da esquerda do triângulo da direita desce para a direita com inclinação 55°. O ângulo entre essas duas linhas é a diferença das inclinações.",
        work: ["x = 55° − 15° = 40°"],
      },
      {
        text: "Conferindo no triângulo pequeno: os outros ângulos são 60° (vértice do triângulo da esquerda) e 80°, e 40 + 60 + 80 = 180 ✓.",
      },
    ],
    answer: "b) 40°",
  },
  {
    id: "c11-folha-2",
    section: SECAO,
    label: "Folha AZ · 2",
    prompt:
      "Um triângulo equilátero grande foi dividido em triângulos equiláteros menores, como mostra a figura. O lado do triângulo verde mede 1 m. Qual é o perímetro do triângulo grande?\na) 15 m   b) 17 m   c) 18 m   d) 20 m   e) 21 m",
    image: figura("c11-folha-2", "Um triângulo equilátero grande dividido em triângulos equiláteros de tamanhos diferentes. No canto de baixo à esquerda há um triângulo verde pequeno de lado 1 m.", 308, 278),
    steps: [
      {
        text: "Olhe a base do triângulo grande. Ela começa pelo triângulo verde, de lado 1 m.",
      },
      {
        text: "Ao lado do verde, a base continua com dois triângulos maiores. Cada um tem lado igual a dois triângulos pequenos (dá para ver pela altura: cada um alcança a altura de dois verdes empilhados), ou seja, 2 m.",
      },
      {
        text: "Somamos os pedaços da base.",
        work: ["1 m + 2 m + 2 m = 5 m"],
      },
      {
        text: "O triângulo grande é equilátero: os três lados medem 5 m.",
        work: ["perímetro = 3 · 5 m = 15 m"],
      },
    ],
    answer: "a) 15 m",
  },
  {
    id: "c11-folha-3",
    section: SECAO,
    label: "Folha AZ · 3",
    prompt:
      "Os triângulos podem ser classificados com relação aos seus ângulos ou com relação aos seus lados. Dois triângulos colocados lado a lado têm as seguintes características: o primeiro tem um ângulo de 91°, e o segundo tem três lados iguais. As classificações corretas para esses triângulos são, respectivamente:\na) retângulo e equilátero.\nb) acutângulo e isósceles.\nc) obtusângulo e escaleno.\nd) obtusângulo e equilátero.\ne) retângulo e escaleno.",
    steps: [
      {
        text: "Primeiro triângulo: 91° é maior que 90°, então é um ângulo obtuso. O triângulo é obtusângulo (não é retângulo, que exige exatamente 90°).",
      },
      {
        text: "Segundo triângulo: três lados iguais, então é equilátero.",
      },
    ],
    answer: "d) obtusângulo e equilátero",
  },
];
