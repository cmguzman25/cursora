import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: Retas paralelas, concorrentes e transversais (capítulo 10, pp. 40–43).
 *
 * Cubre retas coplanares, paralelas distintas y coincidentes, el símbolo //, el
 * feixe de retas paralelas, concorrentes oblíquas y perpendiculares, y la reta
 * transversal, con los ejemplos del día a día que trae el libro.
 */
export const TEMA_RETAS_NO_PLANO: ExamQuestionWithTopic[] = [
  {
    id: "mat-t1-q01",
    topic: "retas-no-plano",
    prompt:
      "Duas retas estão no mesmo plano e a distância entre elas é sempre a mesma, em qualquer ponto em que você medir. Como elas são classificadas?",
    options: [
      {
        id: "A",
        text: "Concorrentes perpendiculares",
        correct: false,
        explanation:
          "Retas concorrentes perpendiculares são retas que se cruzam em um único ponto formando um ângulo reto (90°), como as linhas de um sinal de mais. Tenta porque 'perpendicular' parece um tipo especial e organizado de reta. Mas retas concorrentes se cruzam, e quando se cruzam a distância entre elas chega a zero no ponto de encontro: não é sempre a mesma.",
      },
      {
        id: "B",
        text: "Paralelas",
        correct: true,
        explanation:
          "Correta. Duas retas coplanares são paralelas quando a distância entre elas é sempre a mesma. Por isso nunca se encontram, como os dois trilhos de uma ferrovia ou as faixas amarelas contínuas de uma rodovia.",
      },
      {
        id: "C",
        text: "Transversais",
        correct: false,
        explanation:
          "Uma reta transversal é aquela que corta (é concorrente a) todas as retas de um feixe de paralelas. Tenta porque aparece sempre junto das paralelas no capítulo. Mas a transversal cruza as outras retas, então a distância até elas não é constante: no ponto de corte ela é zero.",
      },
      {
        id: "D",
        text: "Concorrentes oblíquas",
        correct: false,
        explanation:
          "Retas concorrentes oblíquas são retas que se cruzam em um único ponto formando um ângulo que não é reto (diferente de 90°), como um X inclinado. Tenta porque também são duas retas no mesmo plano. Mas se cruzam, e retas que se cruzam vão se afastando a partir do ponto de encontro: a distância muda.",
      },
    ],
    tips: [
      "Paralelas: mesma distância sempre, nenhum ponto em comum (ou todos, se forem coincidentes).",
      "Concorrentes: exatamente um ponto em comum.",
    ],
  },
  {
    id: "mat-t1-q02",
    topic: "retas-no-plano",
    prompt:
      "As retas r e s estão no mesmo plano e uma está exatamente em cima da outra, de modo que todos os pontos de r também são pontos de s. Como o livro classifica esse par?",
    options: [
      {
        id: "A",
        text: "Paralelas distintas",
        correct: false,
        explanation:
          "Paralelas distintas são duas retas paralelas que não têm nenhum ponto em comum: ficam lado a lado, separadas por uma distância constante. Tenta porque é o outro tipo de reta paralela e o nome é parecido. Mas aqui as retas têm todos os pontos em comum, e não nenhum.",
      },
      {
        id: "B",
        text: "Concorrentes perpendiculares",
        correct: false,
        explanation:
          "Concorrentes perpendiculares são retas que têm um único ponto em comum e formam ali um ângulo de 90°. Tenta porque perpendicularidade é uma relação muito citada. Mas r e s não se cruzam em um ponto só: compartilham a reta inteira.",
      },
      {
        id: "C",
        text: "Concorrentes oblíquas",
        correct: false,
        explanation:
          "Concorrentes oblíquas são retas com um único ponto em comum que formam um ângulo diferente de 90°. Tenta porque 'ter pontos em comum' lembra retas que se encontram. Mas concorrentes têm apenas um ponto em comum, e aqui são todos.",
      },
      {
        id: "D",
        text: "Paralelas coincidentes",
        correct: true,
        explanation:
          "Correta. O livro divide as paralelas em dois tipos: as distintas, que não têm ponto em comum, e as coincidentes, que têm todos os pontos em comum. Na figura do livro isso aparece escrito como r = s.",
      },
    ],
    tips: [
      "Paralelas distintas: nenhum ponto em comum. Paralelas coincidentes: todos os pontos em comum (r = s).",
      "Concorrentes têm um único ponto em comum: nem zero, nem todos.",
    ],
  },
  {
    id: "mat-t1-q03",
    topic: "retas-no-plano",
    prompt:
      "Na bandeira do Reino Unido, uma faixa vertical cruza uma faixa horizontal formando um canto de 90°. Considerando as faixas como retas, como elas se classificam?",
    options: [
      {
        id: "A",
        text: "Concorrentes perpendiculares",
        correct: true,
        explanation:
          "Correta. As duas retas têm um único ponto em comum, então são concorrentes. E o ângulo formado é reto (90°), o que as torna perpendiculares. O livro indica o ângulo reto com um pequeno quadrado no canto.",
      },
      {
        id: "B",
        text: "Concorrentes oblíquas",
        correct: false,
        explanation:
          "Concorrentes oblíquas são retas que se cruzam em um ponto formando um ângulo diferente de 90°, como as faixas diagonais da mesma bandeira. Tenta porque essas retas também se cruzam. Mas o enunciado diz que o canto formado mede 90°, e é exatamente isso que separa as perpendiculares das oblíquas.",
      },
      {
        id: "C",
        text: "Paralelas distintas",
        correct: false,
        explanation:
          "Paralelas distintas são retas do mesmo plano que nunca se encontram, porque a distância entre elas é sempre a mesma. Tenta porque as duas faixas são retas 'arrumadas', uma vertical e outra horizontal. Mas elas se cruzam, e retas paralelas nunca se cruzam.",
      },
      {
        id: "D",
        text: "Paralelas coincidentes",
        correct: false,
        explanation:
          "Paralelas coincidentes são duas retas que ficam uma sobre a outra e têm todos os pontos em comum. Tenta porque as faixas 'se encontram'. Mas a vertical e a horizontal se encontram em um ponto só, e não ao longo de toda a reta.",
      },
    ],
    tips: [
      "Concorrentes: um ponto em comum. Se o ângulo for 90°, perpendiculares; se não, oblíquas.",
      "O quadradinho desenhado no canto de um ângulo indica 90°.",
    ],
  },
  {
    id: "mat-t1-q04",
    topic: "retas-no-plano",
    prompt:
      "Em uma cerca de madeira, várias ripas verticais são paralelas entre si, e uma ripa inclinada cruza todas elas. Que nome a Geometria dá a essa ripa inclinada?",
    options: [
      {
        id: "A",
        text: "Feixe de retas paralelas",
        correct: false,
        explanation:
          "Feixe de retas paralelas é o nome do conjunto formado por duas ou mais retas paralelas. Tenta porque a cerca tem exatamente um feixe: as ripas verticais. Mas o feixe são as ripas verticais, e não a ripa que corta todas elas.",
      },
      {
        id: "B",
        text: "Reta coincidente",
        correct: false,
        explanation:
          "Uma reta coincidente é uma reta paralela que fica exatamente sobre outra, com todos os pontos em comum. Tenta porque a ripa inclinada 'encosta' em cada ripa vertical. Mas ela toca cada uma em um ponto só, e não fica sobre nenhuma delas.",
      },
      {
        id: "C",
        text: "Reta transversal",
        correct: true,
        explanation:
          "Correta. Quando uma reta cruza todas as retas de um feixe de paralelas, ou seja, é concorrente a todas elas, ela se chama transversal. É o mesmo nome da flauta transversal, tocada atravessada em relação ao corpo.",
      },
      {
        id: "D",
        text: "Diagonal",
        correct: false,
        explanation:
          "Diagonal é o segmento que une dois vértices não consecutivos de um polígono, como a linha que liga cantos opostos de um quadrado. Tenta porque no dia a dia chamamos de 'diagonal' qualquer coisa inclinada. Mas na Geometria a diagonal pertence a um polígono, e a reta que corta um feixe de paralelas se chama transversal.",
      },
    ],
    tips: [
      "Transversal = reta que corta todas as retas de um feixe de paralelas.",
      "Diagonal é um termo de polígonos: liga vértices não consecutivos.",
    ],
  },
  {
    id: "mat-t1-q05",
    topic: "retas-no-plano",
    prompt:
      "Em um caderno está escrito q // r // s. O que o símbolo // indica, e que nome recebe o conjunto dessas três retas?",
    options: [
      {
        id: "A",
        text: "Que as retas são paralelas; o conjunto é um feixe de retas paralelas",
        correct: true,
        explanation:
          "Correta. O símbolo // é usado para indicar que duas retas são paralelas, e o conjunto formado por duas ou mais retas paralelas é chamado de feixe de retas paralelas.",
      },
      {
        id: "B",
        text: "Que as retas são perpendiculares; o conjunto é um feixe de perpendiculares",
        correct: false,
        explanation:
          "Retas perpendiculares são concorrentes que formam um ângulo de 90°, e o símbolo delas é outro (⊥, um T de cabeça para baixo). Tenta porque os dois traços do // lembram retas desenhadas. Mas os dois tracinhos inclinados lado a lado representam justamente duas retas que nunca se cruzam: paralelas.",
      },
      {
        id: "C",
        text: "Que as retas são concorrentes; o conjunto é uma reta transversal",
        correct: false,
        explanation:
          "Retas concorrentes são retas com um único ponto em comum, e uma transversal é uma reta só, que corta um feixe de paralelas. Tenta porque transversal é um nome que aparece junto do //. Mas // diz o contrário de concorrentes, e três retas juntas não formam 'uma' reta transversal.",
      },
      {
        id: "D",
        text: "Que as retas são coincidentes; o conjunto é um polígono de três lados",
        correct: false,
        explanation:
          "Retas coincidentes são paralelas que ficam uma sobre a outra, e um polígono de três lados é um triângulo, uma figura fechada. Tenta porque são três retas, como os três lados de um triângulo. Mas o // não diz que as retas estão uma sobre a outra, e retas paralelas não se fecham em uma figura.",
      },
    ],
    tips: [
      "// = paralelas. Duas ou mais paralelas juntas formam um feixe de retas paralelas.",
      "Retas paralelas nunca fecham uma figura: um polígono precisa de lados que se encontram.",
    ],
  },
  {
    id: "mat-t1-q06",
    topic: "retas-no-plano",
    prompt:
      "Para classificar duas retas como paralelas ou concorrentes, o livro exige que elas sejam coplanares. O que significa a palavra coplanares?",
    options: [
      {
        id: "A",
        text: "Que estão alinhados em uma mesma reta",
        correct: false,
        explanation:
          "Pontos que estão em uma mesma reta são chamados de colineares, palavra que o livro usa no capítulo de triângulos. Tenta porque 'colineares' e 'coplanares' são parecidas e as duas começam com 'co', que quer dizer 'junto'. Mas colinear vem de linha (reta), e coplanar vem de plano.",
      },
      {
        id: "B",
        text: "Que estão localizados no mesmo plano",
        correct: true,
        explanation:
          "Correta. Coplanares é o termo usado para se referir a todos os pontos (ou retas) localizados em um mesmo plano. Só faz sentido dizer que duas retas são paralelas ou concorrentes se elas estiverem no mesmo plano.",
      },
      {
        id: "C",
        text: "Que nunca se cruzam, por mais que sejam prolongadas",
        correct: false,
        explanation:
          "Retas que nunca se cruzam, mantendo sempre a mesma distância, são as paralelas (distintas). Tenta porque o termo aparece logo na definição de paralelas. Mas ser coplanar é só estar no mesmo plano: duas retas coplanares podem ser paralelas ou concorrentes.",
      },
      {
        id: "D",
        text: "Que se cruzam formando um ângulo reto",
        correct: false,
        explanation:
          "Retas que se cruzam formando um ângulo de 90° são as concorrentes perpendiculares. Tenta porque perpendicularidade também é uma relação entre retas do mesmo plano. Mas coplanar não diz nada sobre ângulo: só diz onde as retas estão.",
      },
    ],
    tips: [
      "Coplanares = no mesmo plano. Colineares = na mesma reta.",
      "Retas coplanares podem ser paralelas ou concorrentes; ser coplanar não decide qual.",
    ],
  },
  {
    id: "mat-t1-q07",
    topic: "retas-no-plano",
    prompt:
      "Em uma ferrovia, os dois trilhos de aço são paralelos, e os dormentes de madeira ficam por baixo cruzando os dois trilhos. Pensando nos trilhos e nos dormentes como retas, qual é o papel de cada dormente?",
    options: [
      {
        id: "A",
        text: "Uma reta paralela aos trilhos",
        correct: false,
        explanation:
          "Uma reta paralela aos trilhos seria uma reta que mantém sempre a mesma distância deles, como um terceiro trilho. Tenta porque os dormentes também são paralelos, mas entre si. Mas cada dormente cruza os trilhos, e uma reta que cruza outra não é paralela a ela.",
      },
      {
        id: "B",
        text: "Uma reta coincidente com um dos trilhos",
        correct: false,
        explanation:
          "Uma reta coincidente com um trilho ficaria exatamente sobre ele, com todos os pontos em comum. Tenta porque o dormente encosta nos trilhos. Mas ele toca cada trilho em um ponto só, atravessando de um lado para o outro.",
      },
      {
        id: "C",
        text: "O ponto de encontro dos dois trilhos",
        correct: false,
        explanation:
          "Um ponto de encontro só existe entre retas concorrentes, que têm exatamente um ponto em comum. Tenta porque o dormente liga um trilho ao outro. Mas os trilhos são paralelos e nunca se encontram, e o dormente é uma reta inteira, não um ponto.",
      },
      {
        id: "D",
        text: "Uma reta transversal aos trilhos",
        correct: true,
        explanation:
          "Correta. Os trilhos formam um feixe de retas paralelas, e cada dormente corta os dois, sendo concorrente a ambos. Uma reta que corta todas as retas de um feixe de paralelas é uma transversal, e é assim que o livro descreve a ferrovia no início do capítulo.",
      },
    ],
    tips: [
      "Procure no exemplo qual é o feixe de paralelas e qual reta corta todas elas.",
      "Ruas paralelas cortadas por outra rua, faixas de pedestre e quadras esportivas também mostram paralelas e transversais.",
    ],
  },
];
