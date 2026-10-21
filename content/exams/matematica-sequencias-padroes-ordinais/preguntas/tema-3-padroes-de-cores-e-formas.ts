import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 3: Padrões de cores e de formas (pp. 56–61, 67).
 *
 * Cubre "Sequências de cores e de formas" (los detalles de decoración indígena
 * forman figuras geométricas), el "Debate na colmeia" (saberes que pasan de
 * generación en generación), el artesanato de bambú (la región de 6 lados y la
 * colmena), las dos secuencias de figuras planas con un hueco, las pastillas de
 * colores del bolo de Mafê, la secuencia de emojis y las cuatro flechas que se
 * repiten.
 *
 * Las figuras del libro no se pueden mostrar (el examen es solo texto), así que
 * se nombran con su forma y su color, y los emojis y las flechas van como
 * caracteres.
 */
export const TEMA_PADROES_DE_CORES_E_FORMAS: ExamQuestionWithTopic[] = [
  {
    id: "mat-t3-q01",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/figuras-a.jpg",
      alt: "Sequência de figuras: triângulo verde, quadrado laranja, círculo amarelo, repetindo, com um ponto de interrogação no lugar de uma figura.",
      width: 1000,
      height: 153,
    },
    prompt:
      "Na sequência de triângulo, quadrado e círculo, qual figura fica no lugar do ponto de interrogação?",
    options: [
      {
        id: "A",
        text: "quadrado laranja",
        correct: true,
        explanation:
          "Isso! O padrão é triângulo verde, quadrado laranja, círculo amarelo, e repete. Depois do triângulo vem o quadrado laranja.",
      },
      {
        id: "B",
        text: "círculo amarelo",
        correct: false,
        explanation:
          "O círculo amarelo é a última figura do padrão. Ele vem depois do quadrado, e já aparece logo depois do ponto de interrogação.",
      },
      {
        id: "C",
        text: "triângulo verde",
        correct: false,
        explanation:
          "O triângulo verde é a primeira figura do padrão. Ele acabou de aparecer, então a próxima é outra figura.",
      },
    ],
    tips: [
      "Ache o pedaço que se repete e fale em voz alta: triângulo, quadrado, círculo...",
      "Olhe a figura antes e a figura depois do ponto de interrogação.",
    ],
  },
  {
    id: "mat-t3-q02",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/figuras-b.jpg",
      alt: "Sequência de figuras: dois triângulos azuis, quadrado verde, triângulo laranja, círculo vermelho, repetindo, com um ponto de interrogação no lugar de uma figura.",
      width: 1000,
      height: 156,
    },
    prompt:
      "Olhe a sequência com o círculo vermelho. Que figura está escondida atrás do ponto de interrogação?",
    options: [
      {
        id: "A",
        text: "quadrado verde",
        correct: false,
        explanation:
          "O quadrado verde vem depois dos dois triângulos azuis. Ele aparece logo depois do ponto de interrogação, então ainda falta um triângulo azul antes.",
      },
      {
        id: "B",
        text: "triângulo azul",
        correct: true,
        explanation:
          "Isso! O padrão começa com dois triângulos azuis. Só tem um antes do espaço, então falta o segundo triângulo azul.",
      },
      {
        id: "C",
        text: "círculo vermelho",
        correct: false,
        explanation:
          "O círculo vermelho é a última figura do padrão. Ele fecha a repetição, e não aparece entre os triângulos azuis e o quadrado.",
      },
    ],
    tips: [
      "Conte quantas figuras iguais aparecem juntas no começo do padrão.",
      "Um padrão pode ter a mesma figura duas vezes seguidas.",
    ],
  },
  {
    id: "mat-t3-q03",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/bolo.jpg",
      alt: "Bolo com pastilhas de chocolate coloridas no contorno: vermelho, verde, marrom, azul, repetindo.",
      width: 1000,
      height: 819,
    },
    prompt:
      "Mafê enfeita o bolo com pastilhas: vermelho, verde, marrom, azul, vermelho, verde, marrom, azul... Quantas cores ela está usando?",
    options: [
      {
        id: "A",
        text: "3 cores",
        correct: false,
        explanation:
          "3 cores seria se o padrão fosse só vermelho, verde e marrom. Mas antes de repetir o vermelho ainda vem o azul.",
      },
      {
        id: "B",
        text: "10 cores",
        correct: false,
        explanation:
          "10 é quantas pastilhas tem no bolo, contando uma por uma. Mas muitas têm a mesma cor: as cores se repetem.",
      },
      {
        id: "C",
        text: "4 cores",
        correct: true,
        explanation:
          "Isso! Vermelho, verde, marrom e azul. Depois a sequência repete as mesmas 4 cores.",
      },
    ],
    tips: [
      "Conte as cores só até a primeira cor aparecer de novo.",
      "Cores diferentes não é o mesmo que quantidade de pastilhas.",
    ],
  },
  {
    id: "mat-t3-q04",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/bolo.jpg",
      alt: "Bolo com pastilhas de chocolate coloridas no contorno: vermelho, verde, marrom, azul, repetindo.",
      width: 1000,
      height: 819,
    },
    prompt:
      "No bolo de Mafê, o padrão é vermelho, verde, marrom, azul. Depois de uma pastilha verde, quais são as 3 cores seguintes?",
    options: [
      {
        id: "A",
        text: "marrom, azul, vermelho",
        correct: true,
        explanation:
          "Isso! Depois do verde vem o marrom, depois o azul, e então o padrão começa de novo no vermelho.",
      },
      {
        id: "B",
        text: "vermelho, azul, marrom",
        correct: false,
        explanation:
          "Vermelho, azul, marrom tem as cores certas, mas fora de ordem. Num padrão a ordem importa: depois do verde vem o marrom.",
      },
      {
        id: "C",
        text: "azul, verde, marrom",
        correct: false,
        explanation:
          "Azul, verde, marrom pula o marrom logo no começo e repete o verde cedo demais. Depois do verde vem o marrom.",
      },
    ],
    tips: [
      "Quando chegar ao fim do padrão, volte para o começo.",
      "Num padrão, a ordem das cores é sempre a mesma.",
    ],
  },
  {
    id: "mat-t3-q05",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/emojis-a.jpg",
      alt: "Sequência de emojis: piscando, rindo de boca aberta, sorrindo de boca fechada, repetindo, terminando num emoji piscando.",
      width: 1000,
      height: 129,
    },
    prompt: "Qual é o próximo emoji da sequência?",
    options: [
      {
        id: "A",
        text: "😉 piscando",
        correct: false,
        explanation:
          "😉 é o emoji piscando, o primeiro do padrão. Ele acabou de aparecer, então agora vem o segundo.",
      },
      {
        id: "B",
        text: "😆 rindo de boca aberta",
        correct: true,
        explanation: "Isso! O padrão é 😉 😆 😊 e repete. Depois do 😉 vem sempre o 😆.",
      },
      {
        id: "C",
        text: "😊 sorrindo de boca fechada",
        correct: false,
        explanation:
          "😊 é o emoji sorrindo, o terceiro do padrão. Ele vem depois do 😆, não logo depois do 😉.",
      },
    ],
    tips: [
      "Separe o padrão em grupos: 😉 😆 😊 | 😉 😆 😊 | 😉 ...",
      "Veja qual emoji vem sempre depois do último que apareceu.",
    ],
  },
  {
    id: "mat-t3-q06",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/setas.jpg",
      alt: "Oito setas: verde para a direita, amarela para a esquerda, azul para cima, cinza para baixo, e de novo as quatro.",
      width: 1000,
      height: 126,
    },
    prompt:
      "As setas repetem um padrão de 4: verde ➡️, amarela ⬅️, azul ⬆️, cinza ⬇️. Depois da seta cinza, qual seta vem?",
    options: [
      {
        id: "A",
        text: "cinza ⬇️",
        correct: false,
        explanation:
          "A seta cinza ⬇️ é a quarta e última do padrão. Ela acabou de aparecer, e o padrão não repete a mesma seta duas vezes.",
      },
      {
        id: "B",
        text: "azul ⬆️",
        correct: false,
        explanation:
          "A seta azul ⬆️ é a terceira do padrão, que aponta para cima. Ela vem antes da cinza, não depois.",
      },
      {
        id: "C",
        text: "verde ➡️",
        correct: true,
        explanation:
          "Isso! A cinza é a última das 4. Depois dela o padrão começa de novo com a seta verde, que aponta para a direita.",
      },
    ],
    tips: [
      "No fim do padrão, volte para a primeira figura.",
      "Lembre a ordem: direita, esquerda, cima, baixo.",
    ],
  },
  {
    id: "mat-t3-q07",
    topic: "padroes-de-cores-e-formas",
    image: {
      src: "/exams/matematica-sequencias-padroes-ordinais/bambu.jpg",
      alt: "Artesanato de tiras finas de bambu cruzadas, com espaços de 6 lados entre elas.",
      width: 1000,
      height: 403,
    },
    prompt:
      "No artesanato de bambu, o espaço no meio das tiras tem 6 lados. Qual elemento da natureza tem essa forma?",
    options: [
      {
        id: "A",
        text: "A colmeia das abelhas",
        correct: true,
        explanation:
          "Isso! Os buraquinhos da colmeia, onde as abelhas guardam o mel, têm 6 lados, igual ao espaço entre as tiras de bambu.",
      },
      {
        id: "B",
        text: "A estrela-do-mar",
        correct: false,
        explanation:
          "A estrela-do-mar é um animal do mar com 5 braços, em forma de estrela. Ela não tem 6 lados.",
      },
      {
        id: "C",
        text: "Uma folha de árvore",
        correct: false,
        explanation:
          "A folha de árvore é verde, comprida e tem a borda curvada. Ela não tem 6 lados retos.",
      },
    ],
    tips: [
      "Uma figura de 6 lados se chama hexágono.",
      "As tiras de bambu cruzadas também formam triângulos.",
    ],
  },
  {
    id: "mat-t3-q08",
    topic: "padroes-de-cores-e-formas",
    prompt:
      "Na conversa de Tainá com a mãe: como indígenas que nunca foram à escola aprendem a fazer padrões geométricos?",
    options: [
      {
        id: "A",
        text: "Usando uma calculadora",
        correct: false,
        explanation:
          "A calculadora é uma máquina que faz contas, como somar 10 + 10. Ela não ensina a fazer desenhos com formas.",
      },
      {
        id: "B",
        text: "Os mais velhos ensinam os mais novos",
        correct: true,
        explanation:
          "Isso! O conhecimento passa de geração em geração: os avós e os pais ensinam os filhos e os netos.",
      },
      {
        id: "C",
        text: "Copiando de livros da escola",
        correct: false,
        explanation:
          "Copiar de um livro escolar é aprender com o material da escola. Mas a pergunta fala de quem nunca foi à escola.",
      },
    ],
    tips: [
      "Geração é cada grupo da família: avós, pais, filhos.",
      "A cultura indígena faz trabalhos com palha, cerâmica e penas.",
    ],
  },
];
