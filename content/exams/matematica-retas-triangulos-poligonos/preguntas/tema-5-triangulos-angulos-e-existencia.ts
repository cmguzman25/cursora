import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 5: Triângulos: soma dos ângulos e condição de existência (capítulo 11,
 * pp. 82–90).
 *
 * Cubre la suma de los ángulos internos (180°) y sus aplicaciones (ángulo que
 * falta, ángulos proporcionales, triángulo rectángulo, isósceles), el ángulo
 * externo, el perímetro, el equilátero deducido por los ángulos y la condición
 * de existencia (desigualdades triangulares) con sus problemas de la vida real.
 */
export const TEMA_TRIANGULOS_ANGULOS: ExamQuestionWithTopic[] = [
  {
    id: "mat-t5-q01",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Um triângulo DEF tem ângulos de 25° em D e 18° em F. Quanto mede o ângulo α, em E, e como o triângulo se classifica quanto aos ângulos?",
    options: [
      {
        id: "A",
        text: "43°, acutângulo",
        correct: false,
        explanation:
          "43° é a soma dos dois ângulos dados (25° + 18°). Tenta porque é a primeira conta da resolução. Mas falta tirar essa soma de 180°: α = 180° − 43°. Com 43° a soma dos três daria só 86°.",
      },
      {
        id: "B",
        text: "137°, obtusângulo",
        correct: true,
        explanation:
          "Correta. A soma dos ângulos internos de qualquer triângulo é 180°: 25° + α + 18° = 180°, 43° + α = 180°, α = 137°. Como 137° é maior que 90°, o triângulo é obtusângulo.",
      },
      {
        id: "C",
        text: "137°, retângulo",
        correct: false,
        explanation:
          "Triângulo retângulo é o que tem um ângulo de exatamente 90°. Tenta porque a medida de α está certa e a classificação parece um detalhe. Mas nenhum ângulo mede 90°, e o de 137° é obtuso, o que faz do triângulo um obtusângulo.",
      },
      {
        id: "D",
        text: "155°, obtusângulo",
        correct: false,
        explanation:
          "155° é 180° − 25°, como se só um dos ângulos dados tivesse sido descontado. Tenta porque a classificação (obtusângulo) coincide. Mas os três ângulos juntos somariam 155 + 25 + 18 = 198°, mais que 180°.",
      },
    ],
    tips: [
      "Ângulo que falta = 180° − (soma dos outros dois).",
      "Confira: os três ângulos somados têm que dar exatamente 180°.",
    ],
  },
  {
    id: "mat-t5-q02",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Em um triângulo ABC, o ângulo Â é o triplo do ângulo B̂, e o ângulo Ĉ é o quíntuplo de B̂. Quanto mede o ângulo Ĉ?",
    options: [
      {
        id: "A",
        text: "20°",
        correct: false,
        explanation:
          "20° é a medida de B̂, que é o x da equação x + 3x + 5x = 180°. Tenta porque é o resultado da equação. Mas a pergunta pede Ĉ, que é cinco vezes B̂.",
      },
      {
        id: "B",
        text: "60°",
        correct: false,
        explanation:
          "60° é a medida de Â (3 · 20°). Tenta porque é outro ângulo do mesmo triângulo, calculado na mesma resolução. Mas Ĉ é o quíntuplo de B̂, não o triplo.",
      },
      {
        id: "C",
        text: "100°",
        correct: true,
        explanation:
          "Correta. Chamando B̂ de x: Â = 3x e Ĉ = 5x. A soma dos ângulos é 180°: x + 3x + 5x = 180°, 9x = 180°, x = 20°. Então Ĉ = 5 · 20° = 100°. Conferindo: 20° + 60° + 100° = 180°.",
      },
      {
        id: "D",
        text: "36°",
        correct: false,
        explanation:
          "36° é 180° ÷ 5, como se Ĉ fosse 'a quinta parte' do total. Tenta porque o número 5 aparece no enunciado. Mas o total 180° tem que ser dividido pelo número de partes iguais a x, que são 1 + 3 + 5 = 9.",
      },
    ],
    tips: [
      "Chame o menor ângulo de x e escreva os outros em função dele (3x, 5x...).",
      "Some tudo, iguale a 180° e divida pelo total de partes.",
    ],
  },
  {
    id: "mat-t5-q03",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Em um triângulo retângulo, um ângulo agudo mede o dobro do outro ângulo agudo. Quanto medem esses dois ângulos agudos?",
    options: [
      {
        id: "A",
        text: "60° e 120°",
        correct: false,
        explanation:
          "60° e 120° sai de x + 2x = 180°, esquecendo que o triângulo já tem um ângulo de 90°. Tenta porque usa a soma de 180°. Mas 120° nem é agudo, e com o ângulo reto a soma passaria de 180°: o certo é x + 2x + 90° = 180°.",
      },
      {
        id: "B",
        text: "45° e 45°",
        correct: false,
        explanation:
          "45° e 45° são os ângulos agudos do triângulo retângulo isósceles, em que os dois catetos são iguais. Tenta porque a soma (90°) está certa. Mas aqui um ângulo é o dobro do outro, então eles não podem ser iguais.",
      },
      {
        id: "C",
        text: "22,5° e 67,5°",
        correct: false,
        explanation:
          "22,5° e 67,5° são a resposta do exemplo do livro em que um agudo é o triplo do outro (x + 3x + 90° = 180°). Tenta porque o caminho é o mesmo. Mas aqui a relação é 'o dobro', e a conta muda para x + 2x + 90° = 180°.",
      },
      {
        id: "D",
        text: "30° e 60°",
        correct: true,
        explanation:
          "Correta. Em um triângulo retângulo um ângulo mede 90°. Chamando o menor agudo de x, o outro é 2x: x + 2x + 90° = 180°, 3x = 90°, x = 30°. Os agudos medem 30° e 60°.",
      },
    ],
    tips: [
      "Triângulo retângulo: os dois agudos somam 90°, porque o reto já usa 90° dos 180°.",
      "Escreva a equação com os três ângulos, incluindo o de 90°.",
    ],
  },
  {
    id: "mat-t5-q04",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Um triângulo isósceles tem o ângulo que não pertence à base medindo 40°. Quanto medem os outros dois ângulos internos?",
    options: [
      {
        id: "A",
        text: "70° e 70°",
        correct: true,
        explanation:
          "Correta. No isósceles os dois ângulos da base são iguais. Chamando cada um de y: y + y + 40° = 180°, 2y = 140°, y = 70°. Os ângulos da base medem 70° cada.",
      },
      {
        id: "B",
        text: "40° e 100°",
        correct: false,
        explanation:
          "40° e 100° seria a resposta se o ângulo de 40° fosse um dos ângulos da base: o outro da base também mediria 40° e o terceiro, 100°. Tenta porque essa é a outra forma de ler o problema. Mas o enunciado diz que o de 40° não pertence à base, então é o ângulo do topo.",
      },
      {
        id: "C",
        text: "70° e 110°",
        correct: false,
        explanation:
          "110° é o suplemento de 70° (180° − 70°), que seria o ângulo externo de um vértice da base. Tenta porque 70° aparece certo. Mas os ângulos da base do isósceles são iguais entre si, e 40° + 70° + 110° passaria de 180°.",
      },
      {
        id: "D",
        text: "20° e 20°",
        correct: false,
        explanation:
          "20° é a metade de 40°, como se o ângulo do topo fosse dividido entre os dois da base. Tenta porque os dois ângulos da base são iguais e a conta usa 'dividir por 2'. Mas o que se divide por 2 é o que sobra de 180°: (180° − 40°) ÷ 2.",
      },
    ],
    tips: [
      "Isósceles: ângulos da base = (180° − ângulo do topo) ÷ 2.",
      "Leia com atenção se o ângulo dado é da base ou o oposto a ela.",
    ],
  },
  {
    id: "mat-t5-q05",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "O ângulo interno de um triângulo no vértice B mede 65°. Prolongando um dos lados que saem de B, forma-se o ângulo externo nesse vértice. Quanto ele mede?",
    options: [
      {
        id: "A",
        text: "65°",
        correct: false,
        explanation:
          "65° é a medida do próprio ângulo interno, e também a do ângulo oposto pelo vértice a ele. Tenta porque o ângulo externo parece uma 'cópia' do interno do outro lado. Mas o externo é formado por um lado e o prolongamento do lado vizinho, e fica ao lado do interno, não de frente.",
      },
      {
        id: "B",
        text: "115°",
        correct: true,
        explanation:
          "Correta. O ângulo externo é formado por um lado do triângulo e pelo prolongamento do lado adjacente. Ele fica ao lado do ângulo interno e os dois juntos formam meia volta: são suplementares. Então o externo mede 180° − 65° = 115°.",
      },
      {
        id: "C",
        text: "25°",
        correct: false,
        explanation:
          "25° é o complemento de 65° (90° − 65°). Tenta porque completar um ângulo é uma conta frequente. Mas interno e externo do mesmo vértice completam 180° (um ângulo raso), e não 90°.",
      },
      {
        id: "D",
        text: "295°",
        correct: false,
        explanation:
          "295° é 360° − 65°, o 'resto da volta completa' ao redor do vértice. Tenta porque 360° é a volta inteira. Mas o externo ocupa só a meia volta ao lado do interno, porque é limitado pelo prolongamento do lado.",
      },
    ],
    tips: [
      "Ângulo interno + ângulo externo (do mesmo vértice) = 180°.",
      "O externo é feito com um lado e o prolongamento do lado vizinho.",
    ],
  },
  {
    id: "mat-t5-q06",
    topic: "triangulos-angulos-e-existencia",
    prompt: "É possível construir um triângulo com lados de 7 dm, 9 dm e 21 dm?",
    options: [
      {
        id: "A",
        text: "Sim, porque os três lados são diferentes",
        correct: false,
        explanation:
          "Um triângulo com os três lados diferentes é chamado de escaleno. Tenta porque esses lados formariam um escaleno, se o triângulo existisse. Mas a classificação só vale para triângulos que existem, e lados diferentes não garantem nada: é preciso testar a condição de existência.",
      },
      {
        id: "B",
        text: "Sim, porque a soma 7 + 9 + 21 = 37 é maior que cada lado",
        correct: false,
        explanation:
          "7 + 9 + 21 = 37 é o perímetro, a soma dos três lados. Tenta porque a condição de existência também compara um lado com uma soma. Mas a comparação certa é de cada lado com a soma dos outros dois, sem incluir ele mesmo: 21 < 7 + 9 = 16 é falso.",
      },
      {
        id: "C",
        text: "Não, porque 21 é maior que 7 + 9",
        correct: true,
        explanation:
          "Correta. Pela condição de existência, cada lado tem que ser menor que a soma dos outros dois. O lado de 21 dm é maior que 7 + 9 = 16 dm: os dois lados menores, mesmo esticados, não alcançam as pontas do maior, e os arcos do compasso não se cruzam.",
      },
      {
        id: "D",
        text: "Não, porque nenhum lado de um triângulo pode passar de 20 dm",
        correct: false,
        explanation:
          "Não existe limite fixo para o tamanho dos lados: o que importa é a relação entre eles. Tenta porque a resposta 'não' está certa. Mas a justificativa é inventada: um triângulo de lados 21, 15 e 10 dm existe. O problema aqui é 21 ser maior que 7 + 9.",
      },
    ],
    tips: [
      "Basta testar o maior lado: ele tem que ser menor que a soma dos outros dois.",
      "Se o maior lado for maior ou igual à soma dos outros, o triângulo não fecha.",
    ],
  },
  {
    id: "mat-t5-q07",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Um carpinteiro quer montar a frente de um telhado em forma de triângulo, com peças de madeira de 6 m, 4 m e 5 m. Ele consegue?",
    options: [
      {
        id: "A",
        text: "Sim: cada lado é menor que a soma dos outros dois",
        correct: true,
        explanation:
          "Correta. Testando a condição de existência: 6 < 4 + 5 = 9, 4 < 6 + 5 = 11 e 5 < 6 + 4 = 10. As três desigualdades são verdadeiras, então o triângulo existe.",
      },
      {
        id: "B",
        text: "Não, porque os três lados são diferentes",
        correct: false,
        explanation:
          "Três lados diferentes formam um triângulo escaleno, que é um tipo de triângulo perfeitamente possível. Tenta porque muitas estruturas de telhado são isósceles, com dois lados iguais. Mas ter lados diferentes não impede a construção: o que decide é a condição de existência.",
      },
      {
        id: "C",
        text: "Não, porque 6 é maior que 4 e também maior que 5",
        correct: false,
        explanation:
          "Todo triângulo escaleno tem um lado maior que cada um dos outros dois, e isso é normal. Tenta porque a condição de existência compara o maior lado com os outros. Mas a comparação é com a soma dos outros dois (4 + 5 = 9), e não com cada um separado.",
      },
      {
        id: "D",
        text: "Não, porque a diferença 6 − 4 = 2 é menor que 5",
        correct: false,
        explanation:
          "A diferença entre dois lados (em módulo) tem que ser menor que o terceiro lado: essa é a segunda parte da condição de existência, |6 − 4| < 5. Tenta porque usa a desigualdade do livro. Mas ela foi lida ao contrário: a diferença ser menor que o terceiro lado é o que precisa acontecer, e não um impedimento.",
      },
    ],
    tips: [
      "Condição de existência: |b − c| < a < b + c, para cada lado.",
      "Na prática, testar se o maior lado é menor que a soma dos outros dois já basta.",
    ],
  },
  {
    id: "mat-t5-q08",
    topic: "triangulos-angulos-e-existencia",
    prompt: "É possível construir um triângulo que tenha dois ângulos internos de 95° e 106°?",
    options: [
      {
        id: "A",
        text: "Sim; o terceiro ângulo mede 21°",
        correct: false,
        explanation:
          "21° é a diferença 201° − 180°, ou seja, o quanto os dois ângulos já passaram de 180°. Tenta porque é um número que sai das contas com 180°. Mas o terceiro ângulo seria 180° − 201° = −21°, e um ângulo de medida negativa não existe.",
      },
      {
        id: "B",
        text: "Sim; ele será um triângulo obtusângulo",
        correct: false,
        explanation:
          "Obtusângulo é o triângulo que tem um ângulo obtuso (maior que 90°) e os outros dois agudos. Tenta porque os ângulos dados são obtusos. Mas um triângulo só pode ter um ângulo obtuso: dois obtusos já somam mais de 180°.",
      },
      {
        id: "C",
        text: "Não, porque nenhum ângulo de um triângulo pode passar de 90°",
        correct: false,
        explanation:
          "Um triângulo pode ter um ângulo maior que 90°: é o obtusângulo, como o de ângulos 135°, 22° e 23° do livro. Tenta porque a resposta 'não' está certa. Mas a justificativa é falsa: o problema é haver dois ângulos obtusos, cuja soma passa de 180°.",
      },
      {
        id: "D",
        text: "Não, porque 95° + 106° já passa de 180°",
        correct: true,
        explanation:
          "Correta. A soma dos três ângulos internos de qualquer triângulo é 180°. Como 95° + 106° = 201°, já passa de 180° antes mesmo do terceiro ângulo: não sobra medida para ele, e o triângulo não existe.",
      },
    ],
    tips: [
      "Some os ângulos dados: se chegar ou passar de 180°, o triângulo não existe.",
      "Um triângulo tem no máximo um ângulo obtuso (ou um reto).",
    ],
  },
  {
    id: "mat-t5-q09",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Um triângulo tem perímetro de 25 cm, e dois de seus lados medem 10 cm e 5 cm. Quanto mede o terceiro lado, e como o triângulo se classifica quanto aos lados?",
    options: [
      {
        id: "A",
        text: "15 cm, escaleno",
        correct: false,
        explanation:
          "15 cm é 25 − 10, como se só um dos lados tivesse sido descontado do perímetro. Tenta porque é uma conta com o perímetro. Mas é preciso tirar os dois lados: 25 − 10 − 5 = 10. Além disso, com 15 cm o perímetro daria 30 cm.",
      },
      {
        id: "B",
        text: "10 cm, isósceles",
        correct: true,
        explanation:
          "Correta. Perímetro é a soma dos lados: 10 + 5 + x = 25, 15 + x = 25, x = 10 cm. Os lados ficam 10, 10 e 5: dois lados iguais, então o triângulo é isósceles (e ele existe, porque 10 < 10 + 5).",
      },
      {
        id: "C",
        text: "10 cm, escaleno",
        correct: false,
        explanation:
          "Escaleno é o triângulo com os três lados diferentes. Tenta porque a medida do terceiro lado está certa. Mas com o terceiro lado de 10 cm, o triângulo fica com dois lados de 10 cm, e dois lados iguais é isósceles.",
      },
      {
        id: "D",
        text: "40 cm, isósceles",
        correct: false,
        explanation:
          "40 cm é 25 + 10 + 5, como se o perímetro fosse mais um lado a somar. Tenta porque 'perímetro' lembra soma. Mas o perímetro já é a soma dos três lados: o terceiro sai de tirar os outros dois dele. E um lado de 40 cm nem caberia, pela condição de existência.",
      },
    ],
    tips: [
      "Perímetro = soma dos lados. Lado que falta = perímetro − (soma dos outros dois).",
      "Depois de achar o lado, compare os três para classificar.",
    ],
  },
  {
    id: "mat-t5-q10",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "No triângulo GHI, os lados GH e GI medem 6 cm cada, e o ângulo Ĝ mede 60°. Quanto mede o lado HI?",
    options: [
      {
        id: "A",
        text: "6 cm",
        correct: true,
        explanation:
          "Correta. Como GH = GI, o triângulo é isósceles e os ângulos da base são iguais: 60° + 2Ĥ = 180°, Ĥ = Î = 60°. Com os três ângulos iguais, o triângulo é equilátero, e todos os lados medem 6 cm: HI = 6 cm.",
      },
      {
        id: "B",
        text: "12 cm",
        correct: false,
        explanation:
          "12 cm é a soma GH + GI. Tenta porque usa os dois lados conhecidos. Mas pela condição de existência HI tem que ser menor que 6 + 6 = 12, e os ângulos de 60° mostram que ele é igual aos outros.",
      },
      {
        id: "C",
        text: "3 cm",
        correct: false,
        explanation:
          "3 cm é a metade de 6 cm. Tenta porque, no exemplo do isósceles do livro, a base (3) é menor que os lados iguais (4). Mas isso dependia dos ângulos daquele triângulo; aqui os três ângulos dão 60° e o triângulo é equilátero.",
      },
      {
        id: "D",
        text: "Não dá para saber sem medir",
        correct: false,
        explanation:
          "Seria preciso medir se só soubéssemos os dois lados, sem nenhum ângulo: aí HI poderia ter vários valores. Tenta porque nenhuma medida de HI aparece no enunciado. Mas o ângulo de 60° entre os lados iguais decide tudo: os outros dois também medem 60°.",
      },
    ],
    tips: [
      "Isósceles com ângulo de 60° no topo: os da base também dão 60°, e ele é equilátero.",
      "Três ângulos iguais ⇔ três lados iguais.",
    ],
  },
  {
    id: "mat-t5-q11",
    topic: "triangulos-angulos-e-existencia",
    prompt:
      "Um triângulo tem dois lados medindo 4 cm e 9 cm. Pelas desigualdades triangulares, entre quais valores deve estar a medida a do terceiro lado?",
    options: [
      {
        id: "A",
        text: "4 < a < 9",
        correct: false,
        explanation:
          "4 < a < 9 usa os próprios lados conhecidos como limites. Tenta porque parece natural que o terceiro lado fique 'entre' os outros dois. Mas ele pode ser maior que 9 (por exemplo, 11 cm, porque 11 < 4 + 9) e não pode ser 4,5 cm (porque 9 − 4 = 5 > 4,5).",
      },
      {
        id: "B",
        text: "0 < a < 13",
        correct: false,
        explanation:
          "0 < a < 13 aplica só a primeira parte da condição: o lado menor que a soma dos outros (a < 4 + 9). Tenta porque o limite de cima está certo. Mas falta a segunda parte: o lado tem que ser maior que a diferença |9 − 4| = 5. Um lado de 3 cm, por exemplo, não fecharia o triângulo.",
      },
      {
        id: "C",
        text: "5 < a < 13",
        correct: true,
        explanation:
          "Correta. Pela condição de existência, |b − c| < a < b + c. Aqui |9 − 4| < a < 9 + 4, ou seja, 5 < a < 13. O terceiro lado tem que ser maior que a diferença e menor que a soma dos outros dois.",
      },
      {
        id: "D",
        text: "9 < a < 13",
        correct: false,
        explanation:
          "9 < a < 13 exige que o terceiro lado seja o maior de todos. Tenta porque o limite de cima está certo. Mas o terceiro lado pode ser menor que 9: um triângulo de lados 4, 9 e 7 cm existe, porque 7 < 13 e 7 > 5.",
      },
    ],
    tips: [
      "Terceiro lado: maior que a diferença e menor que a soma dos outros dois.",
      "|b − c| é o módulo: a diferença sem sinal (sempre positiva).",
    ],
  },
];
