import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: Sequências numéricas e o número que falta (pp. 48–55, 66–68).
 *
 * Cubre el padrón de una sequência (aumentar o disminuir siempre lo mismo), la
 * barraca de argolas (1, 3, 5, 7), la cuenta de 3 en 3 de Quique, el ejercicio
 * resuelto 2, 5, 8, 11, el tablero de Yuri de 2 en 2 hasta el 52, los dos
 * roteiros de la calculadora, los números que faltan de "Abelhas construtoras",
 * las camisetas de Yuri, los apartamentos del edificio de Quique y el desafío de
 * los botones (1, 2, 4, 8).
 */
export const TEMA_SEQUENCIAS_NUMERICAS: ExamQuestionWithTopic[] = [
  {
    id: "mat-t1-q01",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/argolas.jpg",
      alt: "Barraca de argolas com pinos azuis, verdes, amarelos e vermelhos e uma placa de pontuação: azul 1, verde 3, amarelo 5, vermelho 7.",
      width: 1000,
      height: 697,
    },
    prompt:
      "Na barraca de argolas, os pontos são: azul 1, verde 3, amarelo 5, vermelho 7. De quanto em quanto os números aumentam?",
    options: [
      {
        id: "A",
        text: "De 2 em 2",
        correct: true,
        explanation:
          "Isso! De um número para o outro somamos 2: 1 + 2 = 3, 3 + 2 = 5, 5 + 2 = 7.",
      },
      {
        id: "B",
        text: "De 1 em 1",
        correct: false,
        explanation:
          "De 1 em 1 é contar sem pular nenhum: 1, 2, 3, 4. Aqui o 2 e o 4 não aparecem, então não é de 1 em 1.",
      },
      {
        id: "C",
        text: "De 3 em 3",
        correct: false,
        explanation:
          "De 3 em 3 é somar 3 cada vez: 1, 4, 7. Mas depois do 1 vem o 3, e 1 + 3 dá 4, não 3.",
      },
    ],
    tips: [
      "Para achar o padrão, faça a conta do segundo número menos o primeiro.",
      "Confira o padrão em todos os números, não só nos dois primeiros.",
    ],
  },
  {
    id: "mat-t1-q02",
    topic: "sequencias-numericas",
    prompt:
      "Quique acertou 3 pinos verdes. Cada pino verde vale 3 pontos. Ele contou de 3 em 3. Quantos pontos ele fez?",
    options: [
      {
        id: "A",
        text: "6 pontos",
        correct: false,
        explanation:
          "6 é o total de 2 pinos verdes: 3, 6. Quique acertou 3 pinos, então falta contar mais um.",
      },
      {
        id: "B",
        text: "9 pontos",
        correct: true,
        explanation: "Isso! Contando de 3 em 3: 3, 6, 9. Três pinos verdes valem 9 pontos.",
      },
      {
        id: "C",
        text: "12 pontos",
        correct: false,
        explanation:
          "12 é o total de 4 pinos verdes: 3, 6, 9, 12. Quique acertou só 3 pinos, então parou no 9.",
      },
    ],
    tips: [
      "Contar de 3 em 3 é falar um número para cada pino: 3, 6, 9...",
      "Use os dedos: um dedo para cada pino que acertou.",
    ],
  },
  {
    id: "mat-t1-q03",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/sequencia-2-5-8-11.jpg",
      alt: "Quadros com os números 2, 5, 8 e 11, e um último quadro vazio.",
      width: 1000,
      height: 152,
    },
    prompt: "Qual é o número que falta? 2, 5, 8, 11, ...",
    options: [
      {
        id: "A",
        text: "13",
        correct: false,
        explanation:
          "13 seria somar 2 ao 11. Mas nessa sequência o pulo é de 3: 5 − 2 = 3. Então não se soma 2.",
      },
      {
        id: "B",
        text: "12",
        correct: false,
        explanation:
          "12 é o número que vem logo depois do 11 quando contamos de 1 em 1. Mas a sequência pula de 3 em 3.",
      },
      {
        id: "C",
        text: "14",
        correct: true,
        explanation:
          "Isso! 5 − 2 = 3, 8 − 5 = 3, 11 − 8 = 3. Aumenta sempre 3. Então 11 + 3 = 14.",
      },
    ],
    tips: [
      "Descubra o pulo com uma conta de menos: o maior menos o menor.",
      "Depois some esse pulo ao último número.",
    ],
  },
  {
    id: "mat-t1-q04",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/tabuleiro.jpg",
      alt: "Tabuleiro desenhado no chão com números de 0 a 52 misturados.",
      width: 1000,
      height: 922,
    },
    prompt:
      "Yuri anda no tabuleiro começando no 0 e pulando de 2 em 2. Ele já passou pelo 48 e pelo 50. Qual é a casa de saída?",
    options: [
      {
        id: "A",
        text: "51",
        correct: false,
        explanation:
          "51 é o número logo depois do 50, contando de 1 em 1. E o 51 é ímpar: no caminho de Yuri só tem números pares.",
      },
      {
        id: "B",
        text: "52",
        correct: true,
        explanation: "Isso! 48 + 2 = 50 e 50 + 2 = 52. O 52 é a casa de saída do tabuleiro.",
      },
      {
        id: "C",
        text: "54",
        correct: false,
        explanation:
          "54 é 50 + 4, ou seja, pular duas vezes. Depois do 50 o primeiro pulo de 2 chega no 52.",
      },
    ],
    tips: [
      "Começando no 0 e pulando de 2 em 2, todos os números são pares.",
      "Um pulo de cada vez: some 2 só uma vez.",
    ],
  },
  {
    id: "mat-t1-q05",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/calculadora-roteiro-1.jpg",
      alt: "Teclas da calculadora: 1, 0, mais, 1, 0, e depois a tecla igual.",
      width: 1000,
      height: 143,
    },
    prompt:
      "Na calculadora, digite 1 0 + 1 0 e aperte = várias vezes. Primeiro aparece 20. Quais números aparecem depois?",
    options: [
      {
        id: "A",
        text: "21, 22, 23",
        correct: false,
        explanation:
          "21, 22, 23 é uma sequência de 1 em 1. Mas a calculadora soma o 10 que você digitou, não 1.",
      },
      {
        id: "B",
        text: "40, 60, 80",
        correct: false,
        explanation:
          "40, 60, 80 é uma sequência de 20 em 20. O 20 aparece primeiro e engana, mas cada = soma só + 10.",
      },
      {
        id: "C",
        text: "30, 40, 50",
        correct: true,
        explanation:
          "Isso! Cada vez que aperta =, a calculadora soma 10 de novo: 20 + 10 = 30, 30 + 10 = 40, 40 + 10 = 50.",
      },
    ],
    tips: [
      "A tecla = repete a última conta: soma de novo o mesmo número.",
      "Somar 10 muda só o número da dezena: 20, 30, 40.",
    ],
  },
  {
    id: "mat-t1-q06",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/calculadora-roteiro-2.jpg",
      alt: "Teclas da calculadora: 5, 0, menos, 5, e depois a tecla igual.",
      width: 1000,
      height: 166,
    },
    prompt:
      "Na calculadora, digite 5 0 − 5 e aperte =. Aparece 45. Se apertar = mais vezes, quais números aparecem?",
    options: [
      {
        id: "A",
        text: "40, 35, 30",
        correct: true,
        explanation:
          "Isso! A tecla − tira 5 cada vez: 45 − 5 = 40, 40 − 5 = 35, 35 − 5 = 30. Os números diminuem.",
      },
      {
        id: "B",
        text: "46, 47, 48",
        correct: false,
        explanation:
          "46, 47, 48 é uma sequência que aumenta de 1 em 1. Mas a tecla − faz o número diminuir, não aumentar.",
      },
      {
        id: "C",
        text: "50, 55, 60",
        correct: false,
        explanation:
          "50, 55, 60 aumenta de 5 em 5. O 5 está certo, mas com a tecla − ele é tirado, então os números ficam menores.",
      },
    ],
    tips: [
      "Com a tecla −, cada = tira o mesmo número de novo.",
      "Se a conta é de menos, a sequência é decrescente.",
    ],
  },
  {
    id: "mat-t1-q07",
    topic: "sequencias-numericas",
    prompt: "Quais números estão faltando? 50, 45, 40, 35, ..., ..., 20",
    options: [
      {
        id: "A",
        text: "34 e 33",
        correct: false,
        explanation:
          "34 e 33 seria diminuir de 1 em 1 depois do 35. Mas a sequência diminui de 5 em 5: 50, 45, 40.",
      },
      {
        id: "B",
        text: "30 e 25",
        correct: true,
        explanation: "Isso! Diminui de 5 em 5: 35 − 5 = 30, 30 − 5 = 25, e 25 − 5 = 20.",
      },
      {
        id: "C",
        text: "40 e 45",
        correct: false,
        explanation:
          "40 e 45 são números que já apareceram no começo, aumentando. A sequência vai diminuindo até chegar no 20.",
      },
    ],
    tips: [
      "Confira se o último número dá certo: 25 − 5 = 20.",
      "De 5 em 5, os números terminam sempre em 0 ou em 5.",
    ],
  },
  {
    id: "mat-t1-q08",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/camisas.jpg",
      alt: "Oito camisas de time com os números 4, 32, 8, 16, 28, 20, 24 e 12.",
      width: 1000,
      height: 512,
    },
    prompt:
      "Yuri vai ajudar o amigo a organizar as camisas em ordem crescente: 4, 8, 12, 16, 20, 24, 28, 32. Qual é o padrão?",
    options: [
      {
        id: "A",
        text: "Aumenta de 2 em 2",
        correct: false,
        explanation:
          "De 2 em 2 seria 4, 6, 8, 10. Não tem camisa 6 nem camisa 10: de 4 para 8 o pulo é maior.",
      },
      {
        id: "B",
        text: "Aumenta de 8 em 8",
        correct: false,
        explanation:
          "De 8 em 8 seria 8, 16, 24, 32. Mas entre o 8 e o 16 está a camisa 12, então o pulo é menor.",
      },
      {
        id: "C",
        text: "Aumenta de 4 em 4",
        correct: true,
        explanation: "Isso! 4 + 4 = 8, 8 + 4 = 12, 12 + 4 = 16... Cada camisa tem 4 a mais.",
      },
    ],
    tips: [
      "Olhe dois números vizinhos e veja quanto falta de um para o outro.",
      "Se o padrão for certo, ele funciona em todos os vizinhos.",
    ],
  },
  {
    id: "mat-t1-q09",
    topic: "sequencias-numericas",
    prompt:
      "No prédio de Quique, o 3º andar tem os apartamentos 31, 32, 33 e 34. O 5º andar tem 51, 52, 53 e 54. Quais são os do 4º andar?",
    options: [
      {
        id: "A",
        text: "41, 42, 43 e 44",
        correct: true,
        explanation:
          "Isso! O primeiro algarismo é o número do andar. No 4º andar todos começam com 4: 41, 42, 43, 44.",
      },
      {
        id: "B",
        text: "14, 24, 34 e 44",
        correct: false,
        explanation:
          "14, 24, 34, 44 são números que terminam em 4. Mas o andar fica no começo do número, como no 31 do 3º andar.",
      },
      {
        id: "C",
        text: "40, 41, 42 e 43",
        correct: false,
        explanation:
          "40, 41, 42, 43 começam com 4, mas o fim está errado: os apartamentos terminam em 1, 2, 3 e 4. O 40 não existe.",
      },
    ],
    tips: [
      "O primeiro algarismo diz o andar. O segundo diz qual apartamento.",
      "Todo andar tem 4 apartamentos: terminam em 1, 2, 3 e 4.",
    ],
  },
  {
    id: "mat-t1-q10",
    topic: "sequencias-numericas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/botoes.jpg",
      alt: "Montinhos de botões: 1 botão, 2 botões, 4 botões e 8 botões.",
      width: 1000,
      height: 684,
    },
    prompt:
      "Yuri fez montinhos de botões: 1, 2, 4, 8. Quantos botões tem o próximo montinho?",
    options: [
      {
        id: "A",
        text: "10 botões",
        correct: false,
        explanation:
          "10 seria somar 2 ao 8. Mas aqui o pulo não é sempre igual: de 1 para 2 é 1, de 2 para 4 é 2.",
      },
      {
        id: "B",
        text: "12 botões",
        correct: false,
        explanation:
          "12 seria somar 4 ao 8, como numa sequência de 4 em 4. Mas o pulo cresce: cada montinho é o dobro do outro.",
      },
      {
        id: "C",
        text: "16 botões",
        correct: true,
        explanation:
          "Isso! Cada montinho tem o dobro do anterior: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16.",
      },
    ],
    tips: [
      "Nem toda sequência soma sempre o mesmo número.",
      "Dobro é somar o número com ele mesmo: 8 + 8.",
    ],
  },
];
