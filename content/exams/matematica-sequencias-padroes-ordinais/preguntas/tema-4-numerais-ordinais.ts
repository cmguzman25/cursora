import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 4: Numerais ordinais (pp. 62–65).
 *
 * Cubre para qué sirven los ordinales (indican orden o posición), el
 * "trigésimo segundo" de la carrera de Tainá, la tabla del 1º al 50º, la
 * observación de 31º–39º y 41º–49º, los símbolos º (masculino) y ª (femenino)
 * con los ejemplos 2ª y 18ª, el ejercicio 3 (13º, 22º, 35ª, 48ª), el ascensor de
 * Joana (17º y 19º andar) y la carrera de videojuego de Mafê (22 coches delante
 * y 4 detrás).
 */
export const TEMA_NUMERAIS_ORDINAIS: ExamQuestionWithTopic[] = [
  {
    id: "mat-t4-q01",
    topic: "numerais-ordinais",
    prompt: "Para que servem os números ordinais, como primeiro, segundo e terceiro?",
    options: [
      {
        id: "A",
        text: "Para dizer a posição ou a ordem",
        correct: true,
        explanation:
          "Isso! Os ordinais indicam uma ordem: quem chegou em 1º, 2º, 3º lugar numa corrida, ou o andar de um prédio.",
      },
      {
        id: "B",
        text: "Para dizer se o número é par",
        correct: false,
        explanation:
          "Par ou ímpar diz como um número termina: em 0, 2, 4, 6, 8 ou em 1, 3, 5, 7, 9. Os ordinais não falam disso.",
      },
      {
        id: "C",
        text: "Para contar quantas coisas tem",
        correct: false,
        explanation:
          "Contar quantas coisas tem é usar um, dois, três (3 pinos, 9 pontos). Os ordinais dizem o lugar na fila, não a quantidade.",
      },
    ],
    tips: [
      "Ordinal vem de ordem: primeiro, segundo, terceiro...",
      "São usados em corridas, classificações e listas de nomes.",
    ],
  },
  {
    id: "mat-t4-q02",
    topic: "numerais-ordinais",
    prompt: "Tainá chegou em trigésimo segundo lugar na corrida. Que posição é essa?",
    options: [
      {
        id: "A",
        text: "23º",
        correct: false,
        explanation:
          "23º se lê vigésimo terceiro. Tem os mesmos algarismos trocados de lugar: o 2 e o 3.",
      },
      {
        id: "B",
        text: "32º",
        correct: true,
        explanation:
          "Isso! Trigésimo é o 30º, e segundo é o 2º. Trigésimo segundo é o 32º.",
      },
      {
        id: "C",
        text: "30º",
        correct: false,
        explanation:
          "30º se lê só trigésimo. Faltou o segundo: trigésimo segundo é dois lugares depois.",
      },
    ],
    tips: [
      "Vigésimo é 20, trigésimo é 30, quadragésimo é 40, quinquagésimo é 50.",
      "Primeiro se lê a dezena, depois a unidade.",
    ],
  },
  {
    id: "mat-t4-q03",
    topic: "numerais-ordinais",
    prompt: "Como se lê 13º?",
    options: [
      {
        id: "A",
        text: "Terceiro",
        correct: false,
        explanation:
          "Terceiro é o 3º, a posição logo depois do segundo. No 13º falta a parte da dezena: o décimo.",
      },
      {
        id: "B",
        text: "Trigésimo",
        correct: false,
        explanation:
          "Trigésimo é o 30º. O nome lembra o três, mas é a dezena 30, não o 13.",
      },
      {
        id: "C",
        text: "Décimo terceiro",
        correct: true,
        explanation: "Isso! 13º é 10 + 3: décimo (10º) e terceiro (3º). Fica décimo terceiro.",
      },
    ],
    tips: [
      "Do 11º ao 19º, começa sempre com décimo.",
      "Décimo é 10. Trigésimo é 30.",
    ],
  },
  {
    id: "mat-t4-q04",
    topic: "numerais-ordinais",
    prompt: "Como se lê 22º?",
    options: [
      {
        id: "A",
        text: "Vigésimo segundo",
        correct: true,
        explanation: "Isso! 22º é 20 + 2: vigésimo (20º) e segundo (2º). Fica vigésimo segundo.",
      },
      {
        id: "B",
        text: "Décimo segundo",
        correct: false,
        explanation:
          "Décimo segundo é o 12º, que também pode ser chamado de duodécimo. Ele começa com décimo, que é 10, e não 20.",
      },
      {
        id: "C",
        text: "Trigésimo segundo",
        correct: false,
        explanation:
          "Trigésimo segundo é o 32º, a posição de Tainá na corrida. Trigésimo é 30, e aqui a dezena é 20.",
      },
    ],
    tips: [
      "Do 21º ao 29º, começa sempre com vigésimo.",
      "Olhe primeiro a dezena: 2 é vigésimo.",
    ],
  },
  {
    id: "mat-t4-q05",
    topic: "numerais-ordinais",
    prompt: "Como se lê 2ª, com o símbolo ª?",
    options: [
      {
        id: "A",
        text: "Duas",
        correct: false,
        explanation:
          "Duas é um número que diz quantidade, como duas maçãs. O símbolo ª mostra que é um ordinal, que diz posição.",
      },
      {
        id: "B",
        text: "Segunda",
        correct: true,
        explanation:
          "Isso! O símbolo ª é usado para o feminino. 2ª se lê segunda, como na 2ª seta ou na 2ª corrida.",
      },
      {
        id: "C",
        text: "Segundo",
        correct: false,
        explanation:
          "Segundo é o ordinal no masculino, escrito 2º com a bolinha º. Com o símbolo ª, a palavra termina em a.",
      },
    ],
    tips: [
      "º é para o masculino: 18º, décimo oitavo.",
      "ª é para o feminino: 18ª, décima oitava.",
    ],
  },
  {
    id: "mat-t4-q06",
    topic: "numerais-ordinais",
    prompt: "Como se lê 35ª?",
    options: [
      {
        id: "A",
        text: "Vigésima quinta",
        correct: false,
        explanation:
          "Vigésima quinta é a 25ª. Vigésima é 20, e aqui a dezena é 3, que é 30.",
      },
      {
        id: "B",
        text: "Quinquagésima",
        correct: false,
        explanation:
          "Quinquagésima é a 50ª. O nome lembra o cinco, mas é a dezena 50, não o 5 da unidade.",
      },
      {
        id: "C",
        text: "Trigésima quinta",
        correct: true,
        explanation:
          "Isso! 35ª é 30 + 5: trigésima (30ª) e quinta (5ª). Com ª, as palavras terminam em a.",
      },
    ],
    tips: [
      "Do 31º ao 39º, basta repetir trigésimo no começo.",
      "Quinto é 5. Quinquagésimo é 50.",
    ],
  },
  {
    id: "mat-t4-q07",
    topic: "numerais-ordinais",
    prompt: "Como se lê 48ª?",
    options: [
      {
        id: "A",
        text: "Quadragésima oitava",
        correct: true,
        explanation:
          "Isso! 48ª é 40 + 8: quadragésima (40ª) e oitava (8ª). Fica quadragésima oitava.",
      },
      {
        id: "B",
        text: "Quinquagésima oitava",
        correct: false,
        explanation:
          "Quinquagésima oitava seria a 58ª. Quinquagésima é 50, e a dezena do 48 é 40.",
      },
      {
        id: "C",
        text: "Décima oitava",
        correct: false,
        explanation:
          "Décima oitava é a 18ª, um exemplo do livro. Décima é 10, e aqui a dezena é 40.",
      },
    ],
    tips: [
      "Do 41º ao 49º, basta repetir quadragésimo no começo.",
      "Quadragésimo é 40. Quinquagésimo é 50.",
    ],
  },
  {
    id: "mat-t4-q08",
    topic: "numerais-ordinais",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/elevador.jpg",
      alt: "Joana aponta o botão 17 do painel do elevador e diz: nós moramos nesse andar.",
      width: 1000,
      height: 693,
    },
    prompt:
      "No elevador, Joana aperta o botão 17 e diz: “Nós moramos nesse andar.” Em qual andar Joana mora?",
    options: [
      {
        id: "A",
        text: "Oitavo",
        correct: false,
        explanation:
          "Oitavo é o 8º andar, o botão 8. Ele fica na mesma coluna do 17 no painel, mais embaixo, mas é outro andar.",
      },
      {
        id: "B",
        text: "Décimo quarto",
        correct: false,
        explanation:
          "Décimo quarto é o 14º andar, o botão 14. Ele fica logo embaixo do 17 no painel, mas é outro número.",
      },
      {
        id: "C",
        text: "Décimo sétimo",
        correct: true,
        explanation: "Isso! 17 é 10 + 7: décimo e sétimo. Joana mora no décimo sétimo andar.",
      },
    ],
    tips: [
      "Sétimo é 7. Décimo sétimo é 17.",
      "O número do botão é o número do andar.",
    ],
  },
  {
    id: "mat-t4-q09",
    topic: "numerais-ordinais",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/elevador.jpg",
      alt: "Painel do elevador com botões de T e 1 até 20.",
      width: 1000,
      height: 693,
    },
    prompt: "Qual botão do elevador Joana aperta para chegar ao décimo nono andar?",
    options: [
      {
        id: "A",
        text: "Botão 19",
        correct: true,
        explanation: "Isso! Décimo é 10 e nono é 9. 10 + 9 = 19: décimo nono é o 19º andar.",
      },
      {
        id: "B",
        text: "Botão 9",
        correct: false,
        explanation:
          "O botão 9 leva ao nono andar, o 9º. Faltou o décimo, que soma mais 10.",
      },
      {
        id: "C",
        text: "Botão 20",
        correct: false,
        explanation:
          "O botão 20 leva ao vigésimo andar, o 20º. Ele vem logo depois do décimo nono.",
      },
    ],
    tips: [
      "Nono é 9. Décimo nono é 19.",
      "Vigésimo é 20, o andar depois do 19º.",
    ],
  },
  {
    id: "mat-t4-q10",
    topic: "numerais-ordinais",
    prompt:
      "Numa corrida de videogame, Mafê tem 22 carros na frente dela e 4 carros atrás. Em qual posição ela está?",
    options: [
      {
        id: "A",
        text: "22º",
        correct: false,
        explanation:
          "22º é a posição do último carro que está na frente de Mafê. Ela vem logo depois dele.",
      },
      {
        id: "B",
        text: "23º",
        correct: true,
        explanation:
          "Isso! Se 22 carros estão na frente, Mafê é a próxima: 22 + 1 = 23. Ela está em vigésimo terceiro.",
      },
      {
        id: "C",
        text: "27º",
        correct: false,
        explanation:
          "27º é a posição do último carro da corrida: 22 na frente, mais Mafê, mais 4 atrás dá 27 carros.",
      },
    ],
    tips: [
      "Conte quem está na frente e some 1: é você.",
      "Os carros de trás não mudam a sua posição.",
    ],
  },
];
