import type { ExamQuestionImage, Exercise } from "../types";

/**
 * Capítulo 10, "Retas paralelas cortadas por uma transversal: ângulos": todas las
 * Atividades (pp. 61–73) y la Folha AZ (p. 74), con los enunciados y las figuras
 * del libro.
 */

const SECAO = "capitulo-10";

function figura(nome: string, alt: string, width: number, height: number): ExamQuestionImage {
  return { src: `/exercises/exercicios-retas-triangulos-poligonos/${nome}.png`, alt, width, height };
}

const N1_1 = "Determine as medidas indicadas por x, y e z em cada caso.";
const N2_3 = "Calcule os valores de a, b, c e d em cada caso.";
const N2_4 = "Calcule os valores das incógnitas em cada caso, sabendo que as retas r e s são paralelas.";
const N2_5 = "Determine a medida do ângulo α e a do ângulo β em cada caso, sabendo que as retas r e s são paralelas.";
const N2_6 = "Identifique os pares de ângulos alternos internos e os pares de ângulos alternos externos em cada caso.";
const N2_7 = "Calcule os valores de x, y e z em cada caso, sabendo que as retas r e s são paralelas.";
const N2_8 = "Na figura, as retas paralelas r₁, r₂ e r₃ são cortadas por uma reta transversal t.";
const N3_2 = "Sabendo que as retas r e s são paralelas, assim como as retas t e u, determine os valores de a, b, x, y e z em cada figura.";

export const CAPITULO_10: Exercise[] = [
  /* --- Nível 1 ------------------------------------------------------------ */
  {
    id: "c10-n1-1a",
    section: SECAO,
    label: "Nível 1 · Atividade 1a",
    prompt: N1_1,
    image: figura("c10-n1-1a", "Duas retas concorrentes. À esquerda do ponto de encontro há um ângulo de 22°; à direita, o ângulo x; em cima, y; embaixo, z.", 442, 104),
    steps: [
      {
        text: "O ângulo x fica do lado oposto ao de 22°, no mesmo vértice: os dois são opostos pelo vértice (OPV), e OPV têm a mesma medida.",
        work: ["x = 22°"],
      },
      {
        text: "O ângulo y é vizinho (adjacente) ao de 22°: juntos eles formam meia volta, então são suplementares.",
        work: ["y + 22° = 180°", "y = 180° − 22°", "y = 158°"],
      },
      {
        text: "O ângulo z fica do lado oposto a y: são OPV.",
        work: ["z = y = 158°"],
      },
      {
        text: "Conferindo: os quatro ângulos dão a volta completa.",
        work: ["22° + 158° + 22° + 158° = 360° ✓"],
      },
    ],
    answer: "x = 22°, y = 158° e z = 158°",
  },
  {
    id: "c10-n1-1b",
    section: SECAO,
    label: "Nível 1 · Atividade 1b",
    prompt: N1_1,
    image: figura("c10-n1-1b", "Duas retas concorrentes. À esquerda do ponto de encontro está o ângulo x; à direita, o ângulo 2x − 20°; em cima, z; embaixo, y.", 442, 166),
    steps: [
      {
        text: "Os ângulos x e 2x − 20° ficam de frente um para o outro no mesmo vértice: são opostos pelo vértice, então têm a mesma medida. Igualamos as expressões.",
        work: ["2x − 20° = x", "2x − x = 20°", "x = 20°"],
      },
      {
        text: "Conferindo o outro ângulo: 2 · 20° − 20° = 20°. Os dois medem 20°.",
      },
      {
        text: "y e z são vizinhos do ângulo de 20°, então cada um é suplementar a ele (e y e z são OPV entre si).",
        work: ["y = 180° − 20° = 160°", "z = 160°"],
      },
    ],
    answer: "x = 20°, y = 160° e z = 160°",
  },
  {
    id: "c10-n1-1c",
    section: SECAO,
    label: "Nível 1 · Atividade 1c",
    prompt: N1_1,
    image: figura("c10-n1-1c", "Uma reta horizontal e uma reta inclinada que sobe para a direita se cruzam. Acima, à esquerda da inclinada, o ângulo 4z; acima, à direita, o ângulo x; abaixo, à esquerda, 3x − 112°; abaixo, à direita, y.", 442, 380),
    steps: [
      {
        text: "O ângulo x (em cima, à direita) e o ângulo 3x − 112° (embaixo, à esquerda) ficam de frente um para o outro: são OPV e têm a mesma medida.",
        work: ["3x − 112° = x", "3x − x = 112°", "2x = 112°", "x = 56°"],
      },
      {
        text: "O ângulo 4z (em cima, à esquerda) é vizinho de x, então os dois somam 180°.",
        work: ["4z + 56° = 180°", "4z = 124°", "z = 31°"],
      },
      {
        text: "O ângulo y (embaixo, à direita) é OPV de 4z.",
        work: ["y = 4z = 4 · 31° = 124°"],
      },
    ],
    answer: "x = 56°, y = 124° e z = 31° (o ângulo 4z mede 124°)",
  },
  {
    id: "c10-n1-1d",
    section: SECAO,
    label: "Nível 1 · Atividade 1d",
    prompt: N1_1,
    image: figura("c10-n1-1d", "Uma reta horizontal e uma reta inclinada que desce para a direita se cruzam. Acima, à esquerda, o ângulo 17° + 5x; acima, à direita, 2y + 43°; abaixo, à direita, 9x + 1°; abaixo, à esquerda, (3/2)y + 68°.", 442, 310),
    steps: [
      {
        text: "17° + 5x (em cima, à esquerda) e 9x + 1° (embaixo, à direita) estão de frente um para o outro: são OPV.",
        work: ["9x + 1° = 17° + 5x", "9x − 5x = 17° − 1°", "4x = 16°", "x = 4°"],
      },
      {
        text: "Com x = 4, esses dois ângulos medem 17 + 5 · 4 = 37°.",
      },
      {
        text: "2y + 43° (em cima, à direita) e (3/2)y + 68° (embaixo, à esquerda) também são OPV.",
        work: ["2y + 43° = (3/2)y + 68°", "2y − (3/2)y = 68° − 43°", "(1/2)y = 25°", "y = 50°"],
      },
      {
        text: "Com y = 50, esses ângulos medem 2 · 50 + 43 = 143°. Conferindo: 37° + 143° = 180°, como devem somar dois vizinhos.",
      },
    ],
    answer: "x = 4° e y = 50° (os ângulos medem 37° e 143°)",
  },
  {
    id: "c10-n1-2",
    section: SECAO,
    label: "Nível 1 · Atividade 2",
    prompt: "Determine os valores das incógnitas x, y e z na figura, sabendo que as retas r e s são paralelas.",
    image: figura("c10-n1-2", "Retas paralelas r e s cortadas pela transversal t, que sobe para a direita. Em r: acima e à esquerda de t, o ângulo 3x + 12°; abaixo e à esquerda de t, o ângulo z. Em s: acima e à esquerda de t, o ângulo 5x − 48°; abaixo e à direita de t, o ângulo y.", 370, 240),
    steps: [
      {
        text: "3x + 12° e 5x − 48° ocupam a mesma posição nos dois cruzamentos (acima da reta e à esquerda de t): são correspondentes. Como r // s, são congruentes.",
        work: ["5x − 48° = 3x + 12°", "5x − 3x = 12° + 48°", "2x = 60°", "x = 30°"],
      },
      {
        text: "Cada um desses ângulos mede 3 · 30 + 12 = 102°.",
      },
      {
        text: "z é vizinho de 3x + 12° no mesmo cruzamento (os dois à esquerda de t, um acima e outro abaixo de r): são suplementares.",
        work: ["z = 180° − 102° = 78°"],
      },
      {
        text: "y fica de frente para 5x − 48° no cruzamento de s: são OPV.",
        work: ["y = 102°"],
      },
    ],
    answer: "x = 30°, y = 102° e z = 78°",
  },
  {
    id: "c10-n1-3",
    section: SECAO,
    label: "Nível 1 · Atividade 3",
    prompt: "Encontre o valor dos ângulos coloridos indicados na figura (r // s).",
    image: figura("c10-n1-3", "Retas paralelas r e s cortadas pela transversal t, que sobe para a direita. Em r, acima da reta, o ângulo 2x − 62°. Em s, abaixo da reta, o ângulo x/2 + 103°.", 530, 250),
    steps: [
      {
        text: "Um ângulo está acima de r (região externa) e o outro abaixo de s (também externa), em lados opostos da transversal: são alternos externos. Como r // s, são congruentes.",
        work: ["2x − 62° = x/2 + 103°"],
      },
      {
        text: "Para tirar a fração, multiplicamos os dois lados por 2.",
        work: ["4x − 124° = x + 206°", "4x − x = 206° + 124°", "3x = 330°", "x = 110°"],
      },
      {
        text: "Substituímos para achar a medida dos ângulos coloridos.",
        work: ["2 · 110° − 62° = 158°", "110°/2 + 103° = 55° + 103° = 158° ✓"],
      },
    ],
    answer: "x = 110°; os dois ângulos coloridos medem 158°",
    note: "No desenho do livro os dois ângulos parecem agudos, mas com as expressões dadas eles medem 158°. Os desenhos do livro não estão em escala: o que vale é a posição dos ângulos (alternos externos, logo iguais), e não o tamanho que eles aparentam.",
  },

  /* --- Nível 2 ------------------------------------------------------------ */
  {
    id: "c10-n2-1",
    section: SECAO,
    label: "Nível 2 · Atividade 1",
    prompt:
      "As retas concorrentes r e s formam dois pares de ângulos opostos pelo vértice. Em um dos pares, um dos ângulos mede 2x + 70° e o outro mede 6x + 10°. No outro par, um deles mede 4y − 12°, e o outro mede 3y + 11°. Calcule os valores de x e y.",
    steps: [
      {
        text: "Ângulos opostos pelo vértice têm a mesma medida. Igualamos as expressões do primeiro par.",
        work: ["6x + 10° = 2x + 70°", "6x − 2x = 70° − 10°", "4x = 60°", "x = 15°"],
      },
      {
        text: "Fazemos o mesmo com o segundo par.",
        work: ["4y − 12° = 3y + 11°", "4y − 3y = 11° + 12°", "y = 23°"],
      },
      {
        text: "Conferindo: o primeiro par mede 2 · 15 + 70 = 100° e o segundo 4 · 23 − 12 = 80°. Um ângulo de cada par são vizinhos, e 100° + 80° = 180° ✓.",
      },
    ],
    answer: "x = 15° e y = 23°",
  },
  {
    id: "c10-n2-2",
    section: SECAO,
    label: "Nível 2 · Atividade 2",
    prompt:
      "Com régua e transferidor, trace uma reta transversal t que intersecte uma reta r, formando um ângulo de 60°, e uma reta s, formando um ângulo de 85°.",
    steps: [
      {
        text: "Com a régua, trace a reta t inclinada no meio da folha.",
      },
      {
        text: "Escolha um ponto P em t. Coloque o centro do transferidor em P, com a linha de 0° sobre t, marque 60° e trace por P a reta r.",
      },
      {
        text: "Escolha outro ponto Q em t, mais abaixo. Do mesmo jeito, marque 85° a partir de t, do mesmo lado em que mediu os 60°, e trace por Q a reta s.",
      },
      {
        text: "Observe o desenho: os ângulos de 60° e 85° ocupam a mesma posição nos dois cruzamentos, então são correspondentes. Como têm medidas diferentes, r e s não são paralelas: prolongando o desenho, elas se encontram em um ponto.",
      },
    ],
    answer: "Desenho com régua e transferidor; r e s ficam concorrentes, porque os correspondentes (60° e 85°) são diferentes",
  },
  {
    id: "c10-n2-3a",
    section: SECAO,
    label: "Nível 2 · Atividade 3a",
    prompt: N2_3,
    image: figura("c10-n2-3a", "A reta t corta a reta r e depois a reta s, que não são paralelas. No cruzamento com r: em cima, a; à direita, 50°; embaixo, 130°; à esquerda, b + 5°. No cruzamento com s: em cima, 5c; à esquerda, d − 10°; embaixo, a + 20°.", 522, 240),
    steps: [
      {
        text: "Aqui r e s não são paralelas, então só usamos ângulos opostos pelo vértice (iguais) e vizinhos (somam 180°). No cruzamento de t com r, a fica de frente para o ângulo de 130°: são OPV.",
        work: ["a = 130°"],
      },
      {
        text: "b + 5° fica de frente para o ângulo de 50°: também são OPV.",
        work: ["b + 5° = 50°", "b = 45°"],
      },
      {
        text: "No cruzamento de t com s, 5c fica de frente para a + 20°: são OPV.",
        work: ["5c = a + 20°", "5c = 130° + 20° = 150°", "c = 30°"],
      },
      {
        text: "d − 10° é vizinho de 5c, então os dois somam 180°.",
        work: ["d − 10° + 150° = 180°", "d − 10° = 30°", "d = 40°"],
      },
    ],
    answer: "a = 130°, b = 45°, c = 30° e d = 40°",
  },
  {
    id: "c10-n2-3b",
    section: SECAO,
    label: "Nível 2 · Atividade 3b",
    prompt: N2_3,
    image: figura("c10-n2-3b", "A reta t corta a reta r e a reta s. No cruzamento com r: acima à esquerda, 5c + 40°; acima à direita, c + 20°; abaixo à esquerda, d − 30°; abaixo à direita, 3d − 70°. No cruzamento com s: em cima, 2b − 5°; à direita, a + 20°; à esquerda, 4a − 85°; embaixo, b + 60°.", 522, 254),
    steps: [
      {
        text: "No cruzamento de t com r, 5c + 40° e c + 20° são vizinhos: somam 180°.",
        work: ["5c + 40° + c + 20° = 180°", "6c + 60° = 180°", "6c = 120°", "c = 20°"],
      },
      {
        text: "Então c + 20° = 40°. O ângulo d − 30° fica de frente para ele: são OPV.",
        work: ["d − 30° = 40°", "d = 70°"],
      },
      {
        text: "Conferindo o quarto ângulo: 3d − 70° = 140°, que é OPV de 5c + 40° = 140° ✓.",
      },
      {
        text: "No cruzamento de t com s, 2b − 5° (em cima) e b + 60° (embaixo) são OPV.",
        work: ["2b − 5° = b + 60°", "b = 65°"],
      },
      {
        text: "4a − 85° (à esquerda) e a + 20° (à direita) também são OPV.",
        work: ["4a − 85° = a + 20°", "3a = 105°", "a = 35°"],
      },
      {
        text: "Conferindo: 2 · 65 − 5 = 125° e 35 + 20 = 55°; vizinhos, 125° + 55° = 180° ✓.",
      },
    ],
    answer: "a = 35°, b = 65°, c = 20° e d = 70°",
  },
  {
    id: "c10-n2-4a",
    section: SECAO,
    label: "Nível 2 · Atividade 4a",
    prompt: N2_4,
    image: figura("c10-n2-4a", "Retas paralelas r e s cortadas por uma transversal t quase vertical, que sobe para a direita. Em r, abaixo da reta e à esquerda de t, um ângulo de 82°. Em s, abaixo da reta e à direita de t, o ângulo x.", 376, 260),
    steps: [
      {
        text: "Leve o ângulo de 82° para baixo ao longo de t: em s, o ângulo na mesma posição (abaixo da reta e à esquerda de t) é o correspondente dele, e mede 82°.",
      },
      {
        text: "O ângulo x fica ao lado desse correspondente, no mesmo cruzamento (os dois abaixo de s): são vizinhos, logo suplementares.",
        work: ["x + 82° = 180°", "x = 98°"],
      },
    ],
    answer: "x = 98°",
  },
  {
    id: "c10-n2-4b",
    section: SECAO,
    label: "Nível 2 · Atividade 4b",
    prompt: N2_4,
    image: figura("c10-n2-4b", "Retas paralelas r e s cortadas por uma transversal t pouco inclinada, que desce para a direita. Em r: o ângulo agudo de 19° à esquerda de t e o ângulo y acima da reta, à direita de t. Em s: o ângulo agudo x à esquerda de t e o ângulo z acima da reta, à direita de t.", 376, 174),
    steps: [
      {
        text: "Os ângulos agudos marcados em r (19°) e em s (x) ocupam a mesma posição nos dois cruzamentos: são correspondentes, e r // s.",
        work: ["x = 19°"],
      },
      {
        text: "y é o vizinho do ângulo de 19° no cruzamento de r: são suplementares.",
        work: ["y = 180° − 19° = 161°"],
      },
      {
        text: "z ocupa em s a mesma posição de y em r: é o correspondente de y.",
        work: ["z = 161°"],
      },
    ],
    answer: "x = 19°, y = 161° e z = 161°",
  },
  {
    id: "c10-n2-4c",
    section: SECAO,
    label: "Nível 2 · Atividade 4c",
    prompt: N2_4,
    image: figura("c10-n2-4c", "Retas paralelas r e s cortadas por uma transversal t que desce para a direita. Em r: acima à esquerda de t, x; acima à direita, y; abaixo à direita, 51°. Em s: acima à esquerda de t, z; acima à direita, w.", 376, 264),
    steps: [
      {
        text: "No cruzamento de t com r, x fica de frente para o ângulo de 51°: são OPV.",
        work: ["x = 51°"],
      },
      {
        text: "y é vizinho de x: são suplementares.",
        work: ["y = 180° − 51° = 129°"],
      },
      {
        text: "Em s, z está na mesma posição que x está em r (acima da reta, à esquerda de t): são correspondentes. E w é o correspondente de y.",
        work: ["z = 51°", "w = 129°"],
      },
    ],
    answer: "x = 51°, y = 129°, z = 51° e w = 129°",
  },
  {
    id: "c10-n2-4d",
    section: SECAO,
    label: "Nível 2 · Atividade 4d",
    prompt: N2_4,
    image: figura("c10-n2-4d", "Retas paralelas r e s cortadas por uma transversal t que desce para a direita. Em r: acima da reta, à direita de t, 159°; acima, à esquerda, o ângulo agudo z; abaixo, à esquerda, w. Em s: o ângulo agudo acima da reta, à esquerda de t, vale 7x/24; o ângulo y está abaixo da reta.", 376, 230),
    steps: [
      {
        text: "Em r, z é vizinho do ângulo de 159°: são suplementares.",
        work: ["z = 180° − 159° = 21°"],
      },
      {
        text: "w fica de frente para o ângulo de 159°: são OPV.",
        work: ["w = 159°"],
      },
      {
        text: "Em s, o ângulo 7x/24 está na mesma posição que z em r: são correspondentes, e r // s.",
        work: ["7x/24 = 21°", "7x = 21° · 24 = 504°", "x = 72°"],
      },
      {
        text: "O ângulo y, em s, é o obtuso do cruzamento (como o de 159° em r): é suplementar ao agudo de 21°.",
        work: ["y = 180° − 21° = 159°"],
      },
    ],
    answer: "x = 72°, y = 159°, z = 21° e w = 159°",
  },
  {
    id: "c10-n2-5a",
    section: SECAO,
    label: "Nível 2 · Atividade 5a",
    prompt: N2_5,
    image: figura("c10-n2-5a", "Retas paralelas r e s. Uma linha quebrada desce de r até um ponto entre as retas, onde faz uma dobra (o ângulo α), e depois desce para a direita cortando s. Em r, o ângulo entre r (lado esquerdo) e a linha mede 99°. Em s, o ângulo entre s (lado direito) e a linha, abaixo de s, mede 26°.", 358, 214),
    steps: [
      {
        text: "Trace pelo vértice de α uma reta auxiliar u, paralela a r e a s. Ela divide α em duas partes: uma de cima e uma de baixo.",
      },
      {
        text: "Em r, o ângulo entre o lado esquerdo de r e a linha mede 99°. A parte de cima de α, entre a linha e o lado direito de u, é alterna interna a ele (r // u).",
        work: ["parte de cima = 99°"],
      },
      {
        text: "Em s, o ângulo de 26° fica abaixo de s; o seu OPV, acima de s, está entre o lado esquerdo de s e a linha. A parte de baixo de α é alterna interna a esse OPV (u // s).",
        work: ["parte de baixo = 26°"],
      },
      {
        text: "Somamos as duas partes.",
        work: ["α = 99° + 26° = 125°"],
      },
    ],
    answer: "α = 125°",
  },
  {
    id: "c10-n2-5b",
    section: SECAO,
    label: "Nível 2 · Atividade 5b",
    prompt: N2_5,
    image: figura("c10-n2-5b", "Retas paralelas r e s. Uma linha corta r formando 30° com ela (acima de r, à direita) e desce para a esquerda até um ponto entre as retas, onde faz um ângulo reto; dali outra linha desce para a direita cortando s. Em s, acima da reta e à esquerda dessa linha, está o ângulo β.", 358, 184),
    steps: [
      {
        text: "Trace pelo vértice do ângulo reto uma reta auxiliar u, paralela a r e a s. O ângulo reto fica dividido em duas partes que somam 90°.",
      },
      {
        text: "A primeira linha faz 30° com r. A parte do ângulo reto entre essa linha e u é alterna interna a esse ângulo (r // u).",
        work: ["parte de cima = 30°"],
      },
      {
        text: "Então a outra parte, entre u e a segunda linha, mede o resto do ângulo reto.",
        work: ["parte de baixo = 90° − 30° = 60°"],
      },
      {
        text: "β, em s, é alterno interno a essa parte de baixo (u // s).",
        work: ["β = 60°"],
      },
    ],
    answer: "β = 60°",
  },
  {
    id: "c10-n2-6a",
    section: SECAO,
    label: "Nível 2 · Atividade 6a",
    prompt: N2_6,
    image: figura("c10-n2-6a", "A transversal t corta as retas r e s. Em r: b acima à esquerda de t, a acima à direita, c abaixo à esquerda, d abaixo à direita. Em s: f acima à esquerda, e acima à direita, g abaixo à esquerda, h abaixo à direita.", 378, 354),
    steps: [
      {
        text: "Região interna: entre r e s. Ficam nela c e d (abaixo de r) e f e e (acima de s). Região externa: a e b (acima de r) e g e h (abaixo de s).",
      },
      {
        text: "Alternos internos: os dois na região interna e em lados opostos de t.",
        work: ["c e e", "d e f"],
      },
      {
        text: "Alternos externos: os dois na região externa e em lados opostos de t.",
        work: ["a e g", "b e h"],
      },
    ],
    answer: "Alternos internos: c e e; d e f. Alternos externos: a e g; b e h",
  },
  {
    id: "c10-n2-6b",
    section: SECAO,
    label: "Nível 2 · Atividade 6b",
    prompt: N2_6,
    image: figura("c10-n2-6b", "A transversal t corta as retas r e s. Em r: n acima à esquerda de t, m acima à direita, o abaixo à esquerda, p abaixo à direita. Em s: y acima à esquerda, x acima à direita, z abaixo à esquerda, w abaixo à direita.", 412, 348),
    steps: [
      {
        text: "Região interna (entre r e s): o e p, abaixo de r, e y e x, acima de s. Região externa: n e m, acima de r, e z e w, abaixo de s.",
      },
      {
        text: "Alternos internos: na região interna e em lados opostos de t.",
        work: ["o e x", "p e y"],
      },
      {
        text: "Alternos externos: na região externa e em lados opostos de t.",
        work: ["n e w", "m e z"],
      },
    ],
    answer: "Alternos internos: o e x; p e y. Alternos externos: n e w; m e z",
  },
  {
    id: "c10-n2-7a",
    section: SECAO,
    label: "Nível 2 · Atividade 7a",
    prompt: N2_7,
    image: figura("c10-n2-7a", "Retas paralelas r e s cortadas pela transversal t, que desce para a direita. Em r: abaixo da reta e à direita de t, 27°; abaixo e à esquerda, x. Em s: acima da reta e à esquerda de t, y; acima e à direita, z.", 480, 232),
    steps: [
      {
        text: "Em r, x é vizinho do ângulo de 27° (os dois abaixo de r): são suplementares.",
        work: ["x = 180° − 27° = 153°"],
      },
      {
        text: "y (acima de s, à esquerda de t) e o ângulo de 27° (abaixo de r, à direita de t) estão entre as paralelas e em lados opostos de t: são alternos internos, logo iguais.",
        work: ["y = 27°"],
      },
      {
        text: "z (acima de s, à direita de t) e x (abaixo de r, à esquerda de t) também são alternos internos.",
        work: ["z = 153°"],
      },
    ],
    answer: "x = 153°, y = 27° e z = 153°",
  },
  {
    id: "c10-n2-7b",
    section: SECAO,
    label: "Nível 2 · Atividade 7b",
    prompt: N2_7,
    image: figura("c10-n2-7b", "Retas paralelas r e s cortadas pela transversal t, que sobe para a direita. Em r: acima da reta e à direita de t, 37°; acima à esquerda, y; abaixo, z. Em s: acima da reta e à esquerda de t, 143°; abaixo e à esquerda, x.", 480, 210),
    steps: [
      {
        text: "Os ângulos de 37° e de 143° somam 180°: são os dois valores que aparecem em cada cruzamento (o agudo e o obtuso).",
      },
      {
        text: "Em r, y é vizinho do ângulo de 37° (os dois acima de r): são suplementares. Também dá para ver que y é o correspondente do ângulo de 143° em s.",
        work: ["y = 180° − 37° = 143°"],
      },
      {
        text: "z, abaixo de r, fica de frente para y: são OPV.",
        work: ["z = 143°"],
      },
      {
        text: "Em s, x é vizinho do ângulo de 143° (os dois à esquerda de t): são suplementares.",
        work: ["x = 180° − 143° = 37°"],
      },
    ],
    answer: "x = 37°, y = 143° e z = 143°",
  },
  {
    id: "c10-n2-7c",
    section: SECAO,
    label: "Nível 2 · Atividade 7c",
    prompt: N2_7,
    image: figura("c10-n2-7c", "Retas paralelas r (em cima) e s (embaixo), cortadas por duas transversais: t, pouco inclinada, e u, mais inclinada. Onde t corta s: abaixo de s, à direita de t, 150°; à esquerda, z. Onde t corta r: acima de r, à direita de t, y. Onde u corta r: acima de r, à direita de u, 2y. Onde u corta s: acima de s, à esquerda de u, x.", 492, 268),
    steps: [
      {
        text: "Onde t corta s, z é vizinho do ângulo de 150° (os dois abaixo de s): são suplementares.",
        work: ["z = 180° − 150° = 30°"],
      },
      {
        text: "O ângulo agudo acima de s, à direita de t, é OPV de z e mede 30°. Em r, y ocupa essa mesma posição: é o correspondente dele.",
        work: ["y = 30°"],
      },
      {
        text: "Onde u corta r, o ângulo acima de r e à direita de u mede 2y.",
        work: ["2y = 2 · 30° = 60°"],
      },
      {
        text: "Em s, o ângulo na mesma posição (acima de s, à direita de u) é o correspondente de 2y e mede 60°. O ângulo x, acima de s e à esquerda de u, é vizinho dele.",
        work: ["x = 180° − 60° = 120°"],
      },
    ],
    answer: "x = 120°, y = 30° e z = 30°",
  },
  {
    id: "c10-n2-7d",
    section: SECAO,
    label: "Nível 2 · Atividade 7d",
    prompt: N2_7,
    image: figura("c10-n2-7d", "Retas paralelas r e s. Uma transversal desce para a direita cortando r e s. Em r, acima da reta e à esquerda dela, 40°. Em s, acima da reta e à esquerda dela, x; abaixo e à direita, z. Outra linha sai dessa transversal, entre as paralelas, e sobe para a direita cortando r: acima de r, à esquerda dessa linha, 110°; abaixo de r, à esquerda, y.", 362, 276),
    steps: [
      {
        text: "O ângulo x, em s, está na mesma posição que o de 40° em r (acima da reta, à esquerda da transversal): são correspondentes.",
        work: ["x = 40°"],
      },
      {
        text: "z fica de frente para x no cruzamento de s: são OPV.",
        work: ["z = 40°"],
      },
      {
        text: "Onde a outra linha corta r, y é vizinho do ângulo de 110° (os dois à esquerda dela): são suplementares.",
        work: ["y = 180° − 110° = 70°"],
      },
    ],
    answer: "x = 40°, y = 70° e z = 40°",
  },
  {
    id: "c10-n2-8a",
    section: SECAO,
    label: "Nível 2 · Atividade 8a",
    prompt: `${N2_8} Quais são os ângulos correspondentes a â?`,
    image: figura("c10-n2-8", "Três retas paralelas, r₃ em cima, r₂ no meio e r₁ embaixo, cortadas pela transversal t. Em r₃: b acima à esquerda de t, a acima à direita, c abaixo à esquerda, d abaixo à direita. Em r₂: f, e, g, h nas mesmas posições. Em r₁: n, m, o, p nas mesmas posições.", 344, 316),
    steps: [
      {
        text: "Correspondentes ocupam a mesma posição em cada cruzamento. â está acima da reta e à direita de t.",
      },
      {
        text: "Nessa mesma posição ficam ê, no cruzamento com r₂, e m̂, no cruzamento com r₁. Como as três retas são paralelas, os três ângulos são congruentes.",
      },
    ],
    answer: "ê e m̂",
  },
  {
    id: "c10-n2-8b",
    section: SECAO,
    label: "Nível 2 · Atividade 8b",
    prompt: `${N2_8} Quais são os ângulos alternos internos a ĉ?`,
    image: figura("c10-n2-8", "Três retas paralelas, r₃ em cima, r₂ no meio e r₁ embaixo, cortadas pela transversal t. Em r₃: b acima à esquerda de t, a acima à direita, c abaixo à esquerda, d abaixo à direita. Em r₂: f, e, g, h nas mesmas posições. Em r₁: n, m, o, p nas mesmas posições.", 344, 316),
    steps: [
      {
        text: "ĉ está em r₃, abaixo da reta e à esquerda de t. Um alterno interno a ele fica entre as duas paralelas consideradas e do outro lado de t, ou seja, acima da outra reta e à direita de t.",
      },
      {
        text: "Com o par r₃ e r₂, esse ângulo é ê. Com o par r₃ e r₁ (a região entre elas também contém c), é m̂.",
      },
    ],
    answer: "ê (com r₂) e m̂ (com r₁)",
  },
  {
    id: "c10-n2-9",
    section: SECAO,
    label: "Nível 2 · Atividade 9",
    prompt: "Quais pares de ângulos da figura são opostos pelo vértice?",
    image: figura("c10-n2-9", "Uma estrutura de três quadros retangulares com diagonais cruzadas em X. No primeiro quadro, o ângulo a fica acima do cruzamento das diagonais e b abaixo; c fica num canto, entre uma diagonal e a barra de cima. No segundo, d fica à esquerda do cruzamento e e à direita; f fica num canto de cima. No terceiro, g fica num canto de cima, h à direita do cruzamento e i num canto de baixo.", 580, 170),
    steps: [
      {
        text: "OPV aparecem onde duas retas se cruzam: os lados de um ângulo são o prolongamento dos lados do outro. Isso acontece nos cruzamentos das diagonais, no meio de cada quadro.",
      },
      {
        text: "No primeiro quadro, a (em cima) e b (embaixo) estão no mesmo cruzamento, de frente um para o outro.",
        work: ["a e b"],
      },
      {
        text: "No segundo quadro, d (à esquerda) e e (à direita) também estão de frente um para o outro.",
        work: ["d e e"],
      },
      {
        text: "c, f, g e i estão em cantos, entre uma diagonal e uma barra, e não em um cruzamento de duas retas. h está no cruzamento do terceiro quadro, mas o seu oposto (à esquerda) não foi marcado.",
      },
    ],
    answer: "a e b; d e e",
  },
  {
    id: "c10-n2-10",
    section: SECAO,
    label: "Nível 2 · Atividade 10",
    prompt:
      "Duas retas paralelas cortadas por uma transversal formam ângulos colaterais externos, cujas medidas, em graus, são dadas por: 4x + 40 e x − 15. Calcule a medida desses ângulos.",
    steps: [
      {
        text: "Com retas paralelas, ângulos colaterais (internos ou externos) são suplementares: somam 180°.",
        work: ["4x + 40 + x − 15 = 180", "5x + 25 = 180", "5x = 155", "x = 31"],
      },
      {
        text: "Substituímos x nas duas expressões.",
        work: ["4 · 31 + 40 = 164°", "31 − 15 = 16°"],
      },
      {
        text: "Conferindo: 164° + 16° = 180° ✓.",
      },
    ],
    answer: "Os ângulos medem 164° e 16°",
  },
  {
    id: "c10-n2-11",
    section: SECAO,
    label: "Nível 2 · Atividade 11",
    prompt: "Na figura, r e s são paralelas. Determine o valor de x.",
    image: figura("c10-n2-11", "Retas paralelas r e s ligadas por uma linha em zigue-zague. Em r, o ângulo entre r (lado esquerdo) e o primeiro segmento mede 130°. O primeiro bico, apontando para a direita, mede (7/5)x + 10°. O segundo bico, apontando para a esquerda, mede (2/3)x + 12°. Em s, o ângulo entre s (lado esquerdo) e o último segmento mede 50°.", 468, 290),
    steps: [
      {
        text: "Vamos usar o teorema dos bicos: a soma dos ângulos cujos bicos apontam para um lado é igual à soma dos que apontam para o outro. As retas r e s também contam, com o ângulo que fazem com o segmento.",
      },
      {
        text: "Em r, o ângulo marcado (130°) está do lado esquerdo do segmento. O ângulo do lado direito é o suplemento dele, e é esse que forma um bico apontando para a esquerda.",
        work: ["180° − 130° = 50°"],
      },
      {
        text: "Em s, o ângulo de 50° está do lado esquerdo do segmento, com o bico apontando para a direita.",
      },
      {
        text: "Bicos para a direita: (7/5)x + 10° e 50°. Bicos para a esquerda: (2/3)x + 12° e 50°. Igualamos as somas.",
        work: ["(7/5)x + 10° + 50° = (2/3)x + 12° + 50°", "(7/5)x − (2/3)x = 12° − 10°", "(21/15)x − (10/15)x = 2°", "(11/15)x = 2°", "x = 30/11 ≈ 2,7°"],
      },
    ],
    answer: "x = 30/11 ≈ 2,7°",
    note: "Com os números que aparecem no livro, a conta leva a uma fração (30/11), o que é raro neste tipo de exercício, e os bicos mediriam só uns 14°, bem menos do que o desenho mostra. Pode ser um erro de impressão no livro: vale conferir com o professor qual é o valor esperado.",
  },
  {
    id: "c10-n2-12",
    section: SECAO,
    label: "Nível 2 · Atividade 12",
    prompt:
      "Duas retas paralelas, cortadas por uma transversal, determinam ângulos alternos externos cujas medidas são expressas, em graus, por 3x e (4/3)x + 45°. Determine o valor de x.",
    steps: [
      {
        text: "Com retas paralelas, alternos externos são congruentes. Igualamos as expressões.",
        work: ["3x = (4/3)x + 45°"],
      },
      {
        text: "Multiplicamos tudo por 3 para tirar a fração.",
        work: ["9x = 4x + 135°", "5x = 135°", "x = 27°"],
      },
      {
        text: "Conferindo: 3 · 27 = 81° e (4/3) · 27 + 45 = 36 + 45 = 81° ✓.",
      },
    ],
    answer: "x = 27° (os ângulos medem 81°)",
  },
  {
    id: "c10-n2-13",
    section: SECAO,
    label: "Nível 2 · Atividade 13",
    prompt:
      "Observe a figura e classifique as afirmações em V (verdadeira) ou F (falsa).\na) Os ângulos d e m são correspondentes e, portanto, congruentes.\nb) Os ângulos c e i são alternos internos e, portanto, suplementares.\nc) Os ângulos a e l são congruentes, pois são alternos externos.\nd) Os ângulos e e j são suplementares, pois são colaterais externos.\ne) Os ângulos g e m são colaterais internos e, portanto, congruentes.",
    image: figura("c10-n2-13", "Três retas paralelas r, s e t (r // s // t) cortadas pela transversal u, que sobe para a direita. Em r: a acima à esquerda de u, d acima à direita, b abaixo à esquerda, c abaixo à direita. Em s: e, h, f, g nas mesmas posições. Em t: i, m, j, l nas mesmas posições.", 554, 280),
    steps: [
      {
        text: "a) d (em r) e m (em t) estão acima da reta e à direita de u: correspondentes. Com paralelas, são congruentes.",
        work: ["V"],
      },
      {
        text: "b) c (abaixo de r, à direita) e i (acima de t, à esquerda) estão entre as paralelas e em lados opostos: alternos internos. Mas alternos são congruentes, não suplementares.",
        work: ["F"],
      },
      {
        text: "c) a (acima de r, à esquerda) e l (abaixo de t, à direita) estão fora das paralelas e em lados opostos: alternos externos, logo congruentes.",
        work: ["V"],
      },
      {
        text: "d) e (acima de s, à esquerda) e j (abaixo de t, à esquerda): considerando as retas s e t, os dois estão fora da faixa entre elas e do mesmo lado de u. São colaterais externos, logo suplementares.",
        work: ["V"],
      },
      {
        text: "e) g (abaixo de s, à direita) e m (acima de t, à direita) estão entre s e t e do mesmo lado de u: colaterais internos. Mas colaterais são suplementares, não congruentes.",
        work: ["F"],
      },
    ],
    answer: "a) V, b) F, c) V, d) V, e) F",
  },
  {
    id: "c10-n2-14",
    section: SECAO,
    label: "Nível 2 · Atividade 14",
    prompt:
      "Duas retas paralelas cortadas por uma transversal formam ângulos colaterais internos em que a medida de um deles é a quinta parte da medida do outro. Quanto mede cada ângulo obtuso formado pelas retas paralelas e a transversal?",
    steps: [
      {
        text: "Chamamos o ângulo menor de x. Como ele é a quinta parte do outro, o maior mede 5x.",
      },
      {
        text: "Colaterais internos, com retas paralelas, são suplementares.",
        work: ["x + 5x = 180°", "6x = 180°", "x = 30°"],
      },
      {
        text: "O maior mede 5 · 30° = 150°. Uma transversal forma só dois valores de ângulo com as paralelas: o agudo (30°) e o obtuso (150°).",
      },
    ],
    answer: "Cada ângulo obtuso mede 150°",
  },
  {
    id: "c10-n2-15",
    section: SECAO,
    label: "Nível 2 · Atividade 15",
    prompt:
      "Uma reta transversal corta duas paralelas, formando ângulos correspondentes cujas medidas são expressas por 3x + 36° e 4x + 14°. Qual é a medida de cada ângulo agudo formado?",
    steps: [
      {
        text: "Correspondentes, com retas paralelas, são congruentes.",
        work: ["4x + 14° = 3x + 36°", "x = 22°"],
      },
      {
        text: "Cada correspondente mede 3 · 22 + 36 = 102°. Esse é o ângulo obtuso.",
      },
      {
        text: "Os ângulos agudos são os suplementares dele.",
        work: ["180° − 102° = 78°"],
      },
    ],
    answer: "Cada ângulo agudo mede 78°",
  },

  /* --- Nível 3 ------------------------------------------------------------ */
  {
    id: "c10-n3-1",
    section: SECAO,
    label: "Nível 3 · Atividade 1",
    prompt: "Calcule as medidas representadas por x, y, z e w, sabendo que as retas r e s são paralelas em ambos os casos.",
    image: figura("c10-n3-1", "Retas paralelas r e s cortadas por duas transversais. A transversal u, bem inclinada, sobe para a direita: em r, acima à esquerda dela está y e acima à direita está x/3 − 10°; em s, abaixo da reta e à direita dela, (2x/3) − 32°. A transversal t, pouco inclinada, sobe para a direita: em s, acima à esquerda dela está w e o pequeno ângulo acima à direita vale y/4 + 6°; em r, abaixo da reta e à direita dela, está z.", 550, 260),
    steps: [
      {
        text: "Na transversal u: x/3 − 10° (acima de r, à direita de u) e 2x/3 − 32° (abaixo de s, à direita de u) estão fora das paralelas e do mesmo lado de u. São colaterais externos, logo suplementares.",
        work: ["x/3 − 10° + 2x/3 − 32° = 180°", "x − 42° = 180°", "x = 222°"],
      },
      {
        text: "Com x = 222°, o ângulo x/3 − 10° mede 74 − 10 = 64°, e o outro mede 148 − 32 = 116°.",
      },
      {
        text: "y é vizinho do ângulo de 64° em r (os dois acima de r): são suplementares.",
        work: ["y = 180° − 64° = 116°"],
      },
      {
        text: "Na transversal t, o ângulo pequeno em s vale y/4 + 6°.",
        work: ["y/4 + 6° = 116°/4 + 6° = 29° + 6° = 35°"],
      },
      {
        text: "w é vizinho desse ângulo (os dois acima de s): são suplementares.",
        work: ["w = 180° − 35° = 145°"],
      },
      {
        text: "z (abaixo de r, à direita de t) e w (acima de s, à esquerda de t) estão entre as paralelas e em lados opostos de t: alternos internos.",
        work: ["z = w = 145°"],
      },
    ],
    answer: "x = 222°, y = 116°, z = 145° e w = 145°",
  },
  {
    id: "c10-n3-2a",
    section: SECAO,
    label: "Nível 3 · Atividade 2a",
    prompt: N3_2,
    image: figura("c10-n3-2a", "Retas paralelas r e s cortadas pelas retas paralelas t e u, quase verticais. Uma terceira linha sai de um ponto de t acima de r e desce até um ponto de u abaixo de s; nesse ponto de t, o ângulo entre t (para cima) e a linha mede 160°. Onde u corta r, acima de r e à esquerda de u, há um ângulo de 85°. Onde t corta s: a acima à esquerda, b acima à direita, x abaixo à esquerda, y abaixo à direita. No ponto de u abaixo de s, o ângulo z fica entre u (para cima) e a linha.", 376, 412),
    steps: [
      {
        text: "Como t // u e r // s, o ângulo entre r e u acima de r, à esquerda (85°), aparece na mesma posição onde t corta s: é o ângulo a.",
        work: ["a = 85°"],
      },
      {
        text: "b é vizinho de a: são suplementares. x é OPV de b e y é OPV de a.",
        work: ["b = 180° − 85° = 95°", "x = 95°", "y = 85°"],
      },
      {
        text: "Na linha inclinada: em t, o ângulo entre t para cima e a linha mede 160°, então o ângulo entre t para baixo e a linha mede 180° − 160° = 20°.",
      },
      {
        text: "Essa linha é uma transversal das paralelas t e u. O ângulo de 20° (em t) e o ângulo z (em u) estão entre t e u e em lados opostos da linha: alternos internos.",
        work: ["z = 20°"],
      },
    ],
    answer: "a = 85°, b = 95°, x = 95°, y = 85° e z = 20°",
  },
  {
    id: "c10-n3-2b",
    section: SECAO,
    label: "Nível 3 · Atividade 2b",
    prompt: N3_2,
    image: figura("c10-n3-2b", "Retas paralelas r e s cortadas pelas retas paralelas t e u. Onde u corta r: acima à esquerda, 2a; acima à direita, 3a; abaixo à esquerda, b; abaixo à direita, y. Onde t corta s: acima à esquerda, x; acima à direita, z.", 376, 406),
    steps: [
      {
        text: "Onde u corta r, 2a e 3a são vizinhos (os dois acima de r): somam 180°.",
        work: ["2a + 3a = 180°", "5a = 180°", "a = 36°"],
      },
      {
        text: "Então 2a = 72° e 3a = 108°. b fica de frente para 3a e y fica de frente para 2a: OPV.",
        work: ["b = 108°", "y = 72°"],
      },
      {
        text: "Como r // s e t // u, os ângulos onde t corta s repetem as posições dos ângulos onde u corta r. x está na posição de 2a e z na de 3a.",
        work: ["x = 72°", "z = 108°"],
      },
    ],
    answer: "a = 36°, b = 108°, x = 72°, y = 72° e z = 108°",
  },
  {
    id: "c10-n3-3",
    section: SECAO,
    label: "Nível 3 · Atividade 3",
    prompt: "Calcule os valores de x, y e z na figura, sabendo que as retas r e s são paralelas.",
    image: figura("c10-n3-3", "Retas paralelas r e s cortadas pela transversal t, quase vertical, que sobe para a direita. Em r: acima à esquerda de t, 5y; acima à direita, x/2 − y; abaixo à esquerda, 4z. Em s: acima à esquerda, 5z; abaixo à esquerda, x/4 + 30°; abaixo à direita, 7y − 40°.", 390, 360),
    steps: [
      {
        text: "5y (em r) e 5z (em s) estão na mesma posição, acima da reta e à esquerda de t: são correspondentes.",
        work: ["5z = 5y  ⟹  z = y"],
      },
      {
        text: "Em s, 7y − 40° (abaixo, à direita) fica de frente para 5z (acima, à esquerda): são OPV. Usando 5z = 5y:",
        work: ["7y − 40° = 5y", "2y = 40°", "y = 20°"],
      },
      {
        text: "Logo z = 20°, e os ângulos 5y e 5z medem 100°.",
      },
      {
        text: "Em r, x/2 − y é vizinho de 5y: são suplementares.",
        work: ["x/2 − 20° + 100° = 180°", "x/2 = 100°", "x = 200°"],
      },
      {
        text: "Conferindo os outros ângulos: 4z = 80° (OPV de x/2 − y = 80° ✓) e x/4 + 30° = 50° + 30° = 80° (correspondente de 4z ✓).",
      },
    ],
    answer: "x = 200°, y = 20° e z = 20°",
  },

  /* --- Folha AZ ----------------------------------------------------------- */
  {
    id: "c10-folha-1",
    section: SECAO,
    label: "Folha AZ · 1",
    prompt: "Na figura, as retas r e s são paralelas. Qual é a medida do ângulo y?\na) 7°   b) 74°   c) 106°   d) 89°   e) 123°",
    image: figura("c10-folha-1", "Retas paralelas r e s cortadas pela transversal t, que desce para a direita. Em r, acima da reta e à direita de t, 17x − 13°. Em s, abaixo da reta: à esquerda de t, y; à direita de t, 8x + 18°.", 364, 320),
    steps: [
      {
        text: "17x − 13° (acima de r, à direita de t) e y (abaixo de s, à esquerda de t) estão fora das paralelas e em lados opostos de t: alternos externos, logo iguais.",
        work: ["y = 17x − 13°"],
      },
      {
        text: "Em s, y e 8x + 18° são vizinhos (os dois abaixo de s): somam 180°.",
        work: ["17x − 13° + 8x + 18° = 180°", "25x + 5° = 180°", "25x = 175°", "x = 7"],
      },
      {
        text: "Substituímos.",
        work: ["y = 17 · 7 − 13 = 119 − 13 = 106°"],
      },
      {
        text: "Cuidado com a alternativa a): 7 é o valor de x, não do ângulo y.",
      },
    ],
    answer: "c) 106°",
  },
  {
    id: "c10-folha-2",
    section: SECAO,
    label: "Folha AZ · 2",
    prompt: "Duas retas formam os seguintes ângulos. De acordo com a figura, podemos concluir que x + y + z equivale a:\na) 210°   b) 220°   c) 230°   d) 240°   e) 250°",
    image: figura("c10-folha-2", "Duas retas concorrentes. Acima, à esquerda do cruzamento, 110°; à direita, x; abaixo, y; à esquerda, z.", 452, 380),
    steps: [
      {
        text: "x é vizinho do ângulo de 110°: são suplementares.",
        work: ["x = 180° − 110° = 70°"],
      },
      {
        text: "y fica de frente para o ângulo de 110° (OPV), e z fica de frente para x.",
        work: ["y = 110°", "z = 70°"],
      },
      {
        text: "Somamos.",
        work: ["x + y + z = 70° + 110° + 70° = 250°"],
      },
      {
        text: "Atalho: os quatro ângulos somam 360°, então x + y + z = 360° − 110° = 250°.",
      },
    ],
    answer: "e) 250°",
  },
  {
    id: "c10-folha-3",
    section: SECAO,
    label: "Folha AZ · 3",
    prompt: "Sabendo que r é paralela a s, determine o valor de x na figura:\na) 12°   b) 15°   c) 18°   d) 21°   e) 24°",
    image: figura("c10-folha-3", "Retas paralelas r (em cima) e s (embaixo). Uma linha poligonal sai de r e desce até s em três segmentos, cada um mais inclinado que o anterior. O ângulo entre r e o primeiro segmento é x; nas duas dobras, o ângulo entre o prolongamento de um segmento e o seguinte é 2x e depois 3x; em s, o ângulo entre s e o último segmento mede 72°.", 560, 280),
    steps: [
      {
        text: "O primeiro segmento sai de r com uma inclinação de x. Em cada dobra a linha gira mais um pouco para baixo: primeiro 2x, depois 3x.",
      },
      {
        text: "Somando os giros, o último segmento está inclinado x + 2x + 3x em relação a r. Traçando paralelas a r nas dobras, cada giro vira um ângulo alterno.",
        work: ["x + 2x + 3x = 6x"],
      },
      {
        text: "Como r // s, a inclinação do último segmento em relação a s é a mesma, e ela vale 72°.",
        work: ["6x = 72°", "x = 12°"],
      },
    ],
    answer: "a) 12°",
  },
];
