import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: Pares e ímpares, crescente e decrescente (pp. 49, 53–55).
 *
 * Cubre el recuadro "Relembre os números pares e ímpares" con sus ejemplos (8,
 * 12, 20, 84, 136 / 5, 17, 31, 89, 143), los puntos de la barraca como números
 * ímpares, las definiciones de sequência crescente (11…19) y decrescente
 * (30…22), las fichas mezcladas de Felipe (125…137), la regla "começa no 40 e
 * diminui de 2 em 2" del ejercicio 3 (la del 110 aparece en una explicación) y
 * el dibujo de unir puntos del 97 al 104.
 */
export const TEMA_PARES_IMPARES_CRESCENTE_DECRESCENTE: ExamQuestionWithTopic[] = [
  {
    id: "mat-t2-q01",
    topic: "pares-impares-crescente-decrescente",
    prompt: "Qual destes números é par?",
    options: [
      {
        id: "A",
        text: "89",
        correct: false,
        explanation:
          "89 é um número ímpar, porque termina em 9. Os ímpares terminam em 1, 3, 5, 7 ou 9.",
      },
      {
        id: "B",
        text: "143",
        correct: false,
        explanation:
          "143 é um número ímpar, porque termina em 3. Ele é grande, mas o que decide é o último algarismo.",
      },
      {
        id: "C",
        text: "84",
        correct: true,
        explanation:
          "Isso! 84 termina em 4. Os números pares terminam em 0, 2, 4, 6 ou 8.",
      },
    ],
    tips: [
      "Para saber se é par ou ímpar, olhe só o último algarismo.",
      "Pares terminam em 0, 2, 4, 6 ou 8.",
    ],
  },
  {
    id: "mat-t2-q02",
    topic: "pares-impares-crescente-decrescente",
    prompt: "Qual destes números é ímpar?",
    options: [
      {
        id: "A",
        text: "17",
        correct: true,
        explanation: "Isso! 17 termina em 7. Os números ímpares terminam em 1, 3, 5, 7 ou 9.",
      },
      {
        id: "B",
        text: "136",
        correct: false,
        explanation:
          "136 é um número par, porque termina em 6. O 1 e o 3 do começo não importam: vale o último algarismo.",
      },
      {
        id: "C",
        text: "20",
        correct: false,
        explanation:
          "20 é um número par, porque termina em 0. Todo número que termina em 0 é par.",
      },
    ],
    tips: [
      "Ímpares terminam em 1, 3, 5, 7 ou 9.",
      "Não olhe o primeiro algarismo, olhe o último.",
    ],
  },
  {
    id: "mat-t2-q03",
    topic: "pares-impares-crescente-decrescente",
    prompt:
      "Os pontos da barraca de argolas são 1, 3, 5 e 7. Como são esses números?",
    options: [
      {
        id: "A",
        text: "São todos pares",
        correct: false,
        explanation:
          "Números pares terminam em 0, 2, 4, 6 ou 8, como 2, 4, 6. Nenhum ponto da barraca termina assim.",
      },
      {
        id: "B",
        text: "São todos ímpares",
        correct: true,
        explanation:
          "Isso! 1, 3, 5 e 7 são números ímpares. Tainá percebeu que a pontuação forma uma sequência de ímpares.",
      },
      {
        id: "C",
        text: "São dezenas exatas",
        correct: false,
        explanation:
          "Dezenas exatas são números que terminam em zero, como 10, 20, 30. Os pontos da barraca não terminam em zero.",
      },
    ],
    tips: [
      "Começando no 1 e pulando de 2 em 2, todos são ímpares.",
      "Começando no 0 e pulando de 2 em 2, todos são pares.",
    ],
  },
  {
    id: "mat-t2-q04",
    topic: "pares-impares-crescente-decrescente",
    prompt: "Qual destas sequências é crescente?",
    options: [
      {
        id: "A",
        text: "30, 28, 26, 24, 22",
        correct: false,
        explanation:
          "30, 28, 26, 24, 22 é uma sequência decrescente: cada número é menor que o anterior.",
      },
      {
        id: "B",
        text: "131, 127, 133, 129",
        correct: false,
        explanation:
          "131, 127, 133, 129 são as fichas misturadas de Felipe. Os números sobem e descem, então não estão em ordem.",
      },
      {
        id: "C",
        text: "11, 13, 15, 17, 19",
        correct: true,
        explanation:
          "Isso! Cada número é maior que o anterior: 11, depois 13, depois 15... Isso é uma sequência crescente.",
      },
    ],
    tips: [
      "Crescente: cada número é maior que o anterior.",
      "Decrescente: cada número é menor que o anterior.",
    ],
  },
  {
    id: "mat-t2-q05",
    topic: "pares-impares-crescente-decrescente",
    prompt: "A sequência 30, 28, 26, 24, 22 é...",
    options: [
      {
        id: "A",
        text: "decrescente",
        correct: true,
        explanation:
          "Isso! Cada número é menor que o anterior: 30, 28, 26... Os números vão diminuindo, então é decrescente.",
      },
      {
        id: "B",
        text: "crescente",
        correct: false,
        explanation:
          "Crescente é quando cada número é maior que o anterior, como 11, 13, 15. Aqui depois do 30 vem o 28, que é menor.",
      },
      {
        id: "C",
        text: "de ímpares",
        correct: false,
        explanation:
          "Uma sequência de ímpares tem números que terminam em 1, 3, 5, 7 ou 9. Aqui todos terminam em 0, 8, 6, 4 ou 2: são pares.",
      },
    ],
    tips: [
      "Leia da esquerda para a direita: os números sobem ou descem?",
      "Descer de 2 em 2 começando num par dá sempre pares.",
    ],
  },
  {
    id: "mat-t2-q06",
    topic: "pares-impares-crescente-decrescente",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/fichas.jpg",
      alt: "Fichas de papel misturadas com os números 131, 127, 133, 129, 137, 135 e 125.",
      width: 922,
      height: 523,
    },
    prompt:
      "As fichas de Felipe estão misturadas: 131, 127, 133, 129, 137, 135, 125. Em ordem crescente, qual ficha vem primeiro?",
    options: [
      {
        id: "A",
        text: "131",
        correct: false,
        explanation:
          "131 é a primeira ficha da bagunça, mas não é a menor. Na ordem crescente ela fica no meio: 125, 127, 129, 131.",
      },
      {
        id: "B",
        text: "125",
        correct: true,
        explanation:
          "Isso! Em ordem crescente começamos pelo menor número. O menor é 125: 125, 127, 129, 131, 133, 135, 137.",
      },
      {
        id: "C",
        text: "137",
        correct: false,
        explanation:
          "137 é o maior número das fichas. Ele vem primeiro na ordem decrescente, mas na crescente ele é o último.",
      },
    ],
    tips: [
      "Ordem crescente começa pelo menor número.",
      "Quando todos começam com 1 e 2, compare o último algarismo.",
    ],
  },
  {
    id: "mat-t2-q07",
    topic: "pares-impares-crescente-decrescente",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/fichas.jpg",
      alt: "Fichas de papel misturadas com os números 131, 127, 133, 129, 137, 135 e 125.",
      width: 922,
      height: 523,
    },
    prompt:
      "Em ordem, as fichas ficam 125, 127, 129, 131, 133, 135, 137. Como essa sequência é formada?",
    options: [
      {
        id: "A",
        text: "De 1 em 1",
        correct: false,
        explanation:
          "De 1 em 1 seria 125, 126, 127. Não tem a ficha 126: o número pula uma casa.",
      },
      {
        id: "B",
        text: "De 5 em 5",
        correct: false,
        explanation:
          "De 5 em 5 seria 125, 130, 135. A ficha depois do 125 é 127, e 125 + 5 dá 130.",
      },
      {
        id: "C",
        text: "De 2 em 2",
        correct: true,
        explanation:
          "Isso! 125 + 2 = 127, 127 + 2 = 129... Aumenta de 2 em 2, e todos são números ímpares.",
      },
    ],
    tips: [
      "Faça a conta do segundo número menos o primeiro: 127 − 125.",
      "Começando num ímpar e pulando de 2 em 2, todos são ímpares.",
    ],
  },
  {
    id: "mat-t2-q08",
    topic: "pares-impares-crescente-decrescente",
    prompt: "Começa no 40 e diminui de 2 em 2. Quais são os cinco primeiros números?",
    options: [
      {
        id: "A",
        text: "40, 42, 44, 46, 48",
        correct: false,
        explanation:
          "40, 42, 44, 46, 48 aumenta de 2 em 2: é crescente. A regra pede para diminuir.",
      },
      {
        id: "B",
        text: "40, 38, 36, 34, 32",
        correct: true,
        explanation: "Isso! 40 − 2 = 38, 38 − 2 = 36, 36 − 2 = 34, 34 − 2 = 32.",
      },
      {
        id: "C",
        text: "40, 39, 38, 37, 36",
        correct: false,
        explanation:
          "40, 39, 38, 37, 36 diminui de 1 em 1. Essa é a regra de outro exercício, o do 110. Aqui é de 2 em 2.",
      },
    ],
    tips: [
      "Diminuir é fazer conta de menos. Aumentar é fazer conta de mais.",
      "Confira o pulo: de 40 para 38 faltam 2.",
    ],
  },
  {
    id: "mat-t2-q09",
    topic: "pares-impares-crescente-decrescente",
    prompt:
      "Para desenhar a casa, ligue os pontos em ordem crescente: 97, 98, 99, 100, 101, 102, 103... Qual ponto vem depois do 103?",
    options: [
      {
        id: "A",
        text: "104",
        correct: true,
        explanation:
          "Isso! Em ordem crescente vem o número seguinte, que é um a mais: 103 + 1 = 104.",
      },
      {
        id: "B",
        text: "102",
        correct: false,
        explanation:
          "102 é o número que vem antes do 103. Voltar para ele seria a ordem decrescente.",
      },
      {
        id: "C",
        text: "113",
        correct: false,
        explanation:
          "113 é 103 + 10, um pulo de dez. Os pontos da casa vão de 1 em 1, do 97 até o 104.",
      },
    ],
    tips: [
      "Depois do 100 os números continuam: 101, 102, 103...",
      "Ordem crescente: do menor para o maior.",
    ],
  },
];
