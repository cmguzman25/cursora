import fs from "node:fs";
import path from "node:path";

/**
 * Verifica lo que se puede medir sin criterio, según `CONTRATO-DE-CLASES.md`.
 * Lo que exige leer (que la clase enseñe una sola idea, que el lab funcione de
 * verdad en la consola, que el fallo listado ocurra, que el precio siga siendo
 * ese) se queda en la checklist manual de la sección 16 del contrato.
 *
 *   node content/courses/redes-en-aws/verificar-lecciones.mjs
 *
 * Tres decisiones heredadas de la plantilla que parecen detalles y no lo son:
 *
 *  - Las secciones se buscan en la prosa, no en el texto crudo. Una clase puede
 *    enseñar un bloque con "##" dentro, y eso no es una sección.
 *  - Las líneas sangradas se descartan como continuación de lista. Sin eso, el
 *    contador de frases pega el final de una lista al párrafo siguiente.
 *  - Las líneas que empiezan por cifra y punto se tratan como lista. Es correcto
 *    casi siempre, y da un falso positivo en la prosa que empieza por un número.
 *    Reescribe el salto de línea en vez de tocar el filtro.
 */

const dir = "content/courses/redes-en-aws/lecciones";

// Las secciones obligatorias de cada tipo, en orden (contrato, secciones 7 y 8).
// Tienen que coincidir carácter a carácter con las del contrato.
const SECCIONES = {
  A: [
    "🎯 Qué vas a entender hoy",
    "🤔 Antes de empezar",
    "📐 La idea",
    "🔬 En detalle",
    "🗺️ Dónde aparece esto en AWS",
    "⚠️ No lo confundas con",
    "🔁 Autoevaluación",
    "🎒 Para pensar",
  ],
  B: [
    "🎯 Qué vas a lograr hoy",
    "🤔 Antes de empezar",
    "📐 La idea",
    "🛠️ Manos a la obra",
    "▶️ Compruébalo",
    "🧯 Si algo se rompe",
    "🧹 Qué se queda encendido",
    "🔁 Autoevaluación",
    "🎒 Para pensar",
  ],
};

// Contrato, sección 9. Adulto que no conoce el tema, y una velocidad por tipo:
// la prosa conceptual de una idea nueva se lee más despacio que unos pasos
// numerados de consola, que se siguen con los ojos mientras se hace clic.
// Medido con las dos clases piloto, no estimado.
const UNIDADES_POR_MINUTO = {
  A: { min: 130, max: 165 },
  B: { min: 150, max: 190 },
};
// Seis, no diez: los bloques de este curso son diagramas, tablas de rutas y
// salidas de consola, no programas. Una línea de diagrama es corta y se lee de
// un vistazo, pero con más cuidado que una línea de prosa.
const PESO_LINEA_BLOQUE = 6;
const MINUTOS_VALIDOS = [8, 9, 10];

// Contrato, sección 11. Un diagrama que no cabe en 20 líneas son dos diagramas.
const MAX_LINEAS_DE_DIAGRAMA = 20;
// Contrato, sección 11.3. El curso usa seis comandos y son de diagnóstico.
const MAX_LINEAS_DE_COMANDO = 5;

// Contrato, sección 5.1. Los tres estados del semáforo y nada más.
const SEMAFOROS = { "💚": "$0", "💛": "centavos", "🔴": "cargos reales" };

// Contrato, sección 12. Hacen sentir torpe al que no lo entiende a la primera.
const PALABRAS_PROHIBIDAS =
  /\b(es f[áa]cil|simplemente|obviamente|basta con|sencillamente|como ya sabes|solo tienes que|no tiene ning[úu]n misterio|es trivial|es intuitivo|como es l[óo]gico|evidentemente)\b/gi;

// Contrato, sección 12: tuteo, no voseo. Solo las formas acentuadas, que son
// las que distinguen de verdad: "mira", "crees" y "haces" son tuteo correcto, y
// una clase de versión anterior de este regex los marcaba a todos. "estás",
// "ves" y "vas" son iguales en los dos registros y no sirven como señal.
const VOSEO =
  /\b(ten[é]s|pod[é]s|quer[é]s|sab[é]s|cre[é]s|hac[é]s|dec[í]s|us[á]s|eleg[í]s|ven[í]s|mir[á]|and[á]|fijate|acordate|sos|vos)\b/gi;

const MAX_PALABRAS_POR_FRASE = 20;
const MAX_PROMEDIO_POR_FRASE = 18;

/**
 * El orden es una promesa (contrato, sección 3): una clase solo puede usar lo
 * que ya se enseñó. Aquí va el término y la clase que lo define.
 *
 * Una clase anterior puede nombrarlo igualmente, pero solo como aviso, y
 * entonces el párrafo tiene que apuntar a dónde se explica ("la clase 1.7",
 * "el módulo 4"). Eso es lo que distingue un adelanto de una dependencia.
 *
 * Se añade un término aquí cuando se escribe la clase que lo define.
 */
const GLOSARIO = {
  paquete: "01-01",
  "dirección ip": "01-02",
  máscara: "01-03",
  "puerta de enlace": "01-03",
  cidr: "01-04",
  subred: "01-05",
  router: "01-07",
  "tabla de rutas": "01-07",
  "ip privada": "01-08",
  nat: "01-09",
  puerto: "01-10",
  dns: "01-11",
  cortafuegos: "01-12",
};

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

if (!fs.existsSync(dir)) {
  console.log(`No existe ${dir} todavía — nada que verificar.`);
  process.exit(0);
}

const archivos = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .sort();

if (archivos.length === 0) {
  console.log(`${dir} está vacío — nada que verificar.`);
  process.exit(0);
}

/** Separa los bloques cercados del resto del texto. */
function separarBloques(raw) {
  const bloques = [];
  const prosa = raw.replace(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm, (_, info, cuerpo) => {
    bloques.push({
      lenguaje: info.trim().toLowerCase(),
      lineas: cuerpo.split("\n").filter((l) => l.trim() !== ""),
      cuerpo,
    });
    return "\n";
  });
  return { bloques, prosa };
}

/** Palabras reales de prosa: sin marcas de markdown y sin tuberías de tabla. */
function contarPalabras(prosa) {
  return prosa
    .replace(/^#+\s*/gm, "")
    .replace(/`[^`]*`/g, " ")
    .replace(/^\s*\|[\s|:-]+\|\s*$/gm, " ")
    .replace(/[|>*_`-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Solo los párrafos: las tablas, listas, citas y títulos no son frases. */
function frasesDeParrafo(prosa) {
  const parrafos = prosa
    .split("\n")
    .filter((l) => {
      const t = l.trim();
      if (t === "") return false;
      // Una línea sangrada es la continuación de un elemento de lista.
      if (/^\s/.test(l)) return false;
      return !/^[#>|]/.test(t) && !/^([-*+]|\d+\.)\s/.test(t) && !/^\[\s*[ x]\s*\]/.test(t);
    })
    .join(" ")
    .replace(/`[^`]*`/g, "X")
    .replace(/\*\*|\*|_/g, "");

  return parrafos
    .split(/(?<=[.!?:])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"«])/)
    .map((f) => f.trim())
    .filter((f) => f.length > 0);
}

/** El cuerpo de una sección, desde su título hasta el siguiente "## ". */
function seccion(prosa, titulo) {
  return prosa.split(`## ${titulo}`)[1]?.split("\n## ")[0] ?? null;
}

for (const file of archivos) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  console.log(`\n${file}`);

  // 1. Nombre, título y cabecera --------------------------------------------
  const nombreOk = /^(\d{2})-(\d{2})-[a-z0-9-]+\.es\.md$/.exec(file);
  if (!nombreOk) fallo(`el nombre no sigue el patrón MM-CC-slug-corto.es.md`);

  const lineas = raw.split("\n");
  const titulo = lineas[0] ?? "";

  if (titulo.trim() === "---") {
    fallo(`el archivo empieza con frontmatter, y la app lo imprimiría tal cual`);
  }

  const tituloOk = /^# (\d+)\.(\d+) — .+/.exec(titulo);
  if (!tituloOk) fallo(`el título no tiene el formato "# M.C — Título de la clase"`);

  const cabecera =
    /^> Módulo (\d+) · (.+) · Clase (\d+) de (\d+) · ⏱️ (\d+) min de lectura · (💚|💛|🔴) Costo: (.+)$/m.exec(
      raw,
    );
  if (!cabecera) {
    fallo(
      `la cabecera no tiene el formato "> Módulo M · Nombre · Clase C de N · ⏱️ NN min de lectura · 💚 Costo: $0"`,
    );
  } else if (SEMAFOROS[cabecera[6]] !== cabecera[7].trim()) {
    fallo(`el semáforo ${cabecera[6]} tiene que decir "Costo: ${SEMAFOROS[cabecera[6]]}"`);
  }

  // El número de módulo y de clase dice lo mismo en los tres sitios
  if (nombreOk && tituloOk) {
    if (Number(nombreOk[1]) !== Number(tituloOk[1]) || Number(nombreOk[2]) !== Number(tituloOk[2])) {
      fallo(
        `el nombre del archivo (${nombreOk[1]}.${nombreOk[2]}) y el título (${tituloOk[1]}.${tituloOk[2]}) no coinciden`,
      );
    }
  }
  if (nombreOk && cabecera) {
    if (Number(nombreOk[1]) !== Number(cabecera[1]) || Number(nombreOk[2]) !== Number(cabecera[3])) {
      fallo(
        `la cabecera dice módulo ${cabecera[1]}, clase ${cabecera[3]}, y el archivo es ${nombreOk[1]}.${nombreOk[2]}`,
      );
    }
  }
  if (cabecera && Number(cabecera[3]) > Number(cabecera[4])) {
    fallo(`la cabecera dice "Clase ${cabecera[3]} de ${cabecera[4]}"`);
  }

  // El identificador "MM-CC" de la clase, que varios controles comparan para
  // saber qué viene antes y qué viene después.
  const claveActual = nombreOk ? `${nombreOk[1]}-${nombreOk[2]}` : "99-99";

  // 2. Tipo de clase ---------------------------------------------------------
  const { bloques, prosa } = separarBloques(raw);
  const presentes = [...prosa.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const tipo = presentes[0] === SECCIONES.A[0] ? "A" : "B";
  const semaforo = cabecera ? cabecera[6] : "💚";

  // 3. Peso de lectura -------------------------------------------------------
  const palabras = contarPalabras(prosa);
  const lineasDeBloque = bloques.reduce((n, b) => n + b.lineas.length, 0);
  const peso = palabras + lineasDeBloque * PESO_LINEA_BLOQUE;
  const declarado = cabecera ? Number(cabecera[5]) : 0;

  console.log(
    `  tipo ${tipo} ${semaforo} | prosa ${palabras} pal | bloques ${lineasDeBloque} líneas | peso ${peso} | declara ${declarado} min`,
  );

  if (!MINUTOS_VALIDOS.includes(declarado)) {
    fallo(`declara ${declarado} min, y solo valen ${MINUTOS_VALIDOS.join(", ")}`);
  } else {
    const velocidad = UNIDADES_POR_MINUTO[tipo];
    const min = declarado * velocidad.min;
    const max = declarado * velocidad.max;
    if (peso < min || peso > max) {
      fallo(`el peso ${peso} está fuera del rango ${min}-${max} del tipo ${tipo} para ${declarado} min`);
    }
  }

  // 4. Secciones exactas y en orden ------------------------------------------
  const esperadas = SECCIONES[tipo];
  if (presentes.join(" | ") !== esperadas.join(" | ")) {
    fallo(`las secciones no coinciden con el tipo ${tipo}`);
    console.log(`      esperadas: ${esperadas.join(" | ")}`);
    console.log(`      están:     ${presentes.join(" | ") || "(ninguna)"}`);
  }

  // 5. Bloques: diagramas y comandos -----------------------------------------
  for (const bloque of bloques) {
    if (bloque.lenguaje === "") fallo(`hay un bloque sin lenguaje declarado`);
    if (bloque.lenguaje === "text" && bloque.lineas.length > MAX_LINEAS_DE_DIAGRAMA) {
      fallo(
        `un diagrama tiene ${bloque.lineas.length} líneas y el máximo es ${MAX_LINEAS_DE_DIAGRAMA}: son dos diagramas`,
      );
    }
    if (bloque.lenguaje === "bash" && bloque.lineas.length > MAX_LINEAS_DE_COMANDO) {
      fallo(
        `un bloque de comandos tiene ${bloque.lineas.length} líneas y el máximo es ${MAX_LINEAS_DE_COMANDO}`,
      );
    }
  }

  // 6. Lo que el renderizador no soporta -------------------------------------
  [...prosa.matchAll(/<(details|summary|br|audio|img|div|span|iframe|table|p|b|i)\b/gi)].forEach((m) =>
    fallo(`etiqueta HTML no soportada: <${m[1]}>`),
  );
  if (/!\[[^\]]*\]\(/.test(prosa)) fallo(`hay una imagen, y las clases no pueden llevarlas`);

  // Emojis fuera de los títulos. Se permiten en el cuerpo ❌ y ✅, más los tres
  // del semáforo de costo: son notación declarada del curso (contrato, 5.1), y
  // la clase que los explica tiene que poder enseñarlos en una tabla.
  // Las líneas de cita se saltan: ahí vive el aviso de costo, con su ⚠️.
  const emoji = /\p{Extended_Pictographic}/u;
  prosa.split("\n").forEach((l, i) => {
    if (l.startsWith("#") || l.startsWith(">")) return;
    if (emoji.test(l.replace(/[❌✅💚💛🔴]/g, ""))) {
      fallo(`emoji fuera de un título (línea ${i + 1}): ${l.trim().slice(0, 60)}`);
    }
  });

  // 7. Tono y redacción ------------------------------------------------------
  const cuerpo = prosa.replace(/^#.*$/gm, "").replace(/^>.*$/gm, "");
  [...cuerpo.matchAll(PALABRAS_PROHIBIDAS)].forEach((m) => fallo(`palabra prohibida: "${m[0]}"`));
  [...cuerpo.matchAll(VOSEO)].forEach((m) => fallo(`voseo, y este curso va en tuteo: "${m[0]}"`));

  prosa.split(/^## /m).forEach((bloque, i) => {
    const exclamaciones = (bloque.match(/!/g) ?? []).length;
    if (exclamaciones > 1) fallo(`${exclamaciones} exclamaciones en la sección ${i} (el máximo es 1)`);
  });

  const frases = frasesDeParrafo(cuerpo);
  if (frases.length > 0) {
    const largos = frases.map((f) => f.split(/\s+/).filter(Boolean).length);
    const promedio = largos.reduce((a, b) => a + b, 0) / largos.length;
    console.log(`  frases: ${frases.length} | promedio ${promedio.toFixed(1)} palabras`);
    frases.forEach((f, i) => {
      if (largos[i] > MAX_PALABRAS_POR_FRASE) {
        fallo(`frase de ${largos[i]} palabras (el máximo es ${MAX_PALABRAS_POR_FRASE}): ${f.slice(0, 70)}…`);
      }
    });
    if (promedio > MAX_PROMEDIO_POR_FRASE) {
      fallo(`el promedio de frase es ${promedio.toFixed(1)} y el máximo es ${MAX_PROMEDIO_POR_FRASE}`);
    }
  }

  // 8. Autoevaluación --------------------------------------------------------
  const auto = seccion(prosa, "🔁 Autoevaluación");
  if (auto === null) {
    fallo(`falta la sección "🔁 Autoevaluación"`);
  } else {
    const preguntas = [...auto.matchAll(/^\s*\d+\.\s+\S/gm)].length;
    if (preguntas !== 4) {
      fallo(`la autoevaluación tiene ${preguntas} preguntas y el contrato pide 4`);
    }
    if (!/\*\*Respuestas:?\*\*/.test(auto)) fallo(`la autoevaluación no trae su bloque de respuestas`);
  }

  // 9. Las preguntas de apertura se retoman (contrato, sección 7) ------------
  // Una pregunta de activación que el cuerpo nunca recoge deja al alumno con
  // la duda abierta. Se detectó revisando el módulo 1 a mano: una clase de
  // trece no cerraba ninguna de las tres.
  const apertura = seccion(prosa, "🤔 Antes de empezar");
  if (apertura === null) {
    fallo(`falta la sección "🤔 Antes de empezar"`);
  } else {
    const abiertas = [...apertura.matchAll(/^\s*\d+\.\s+\S/gm)].length;
    if (abiertas !== 3) fallo(`"Antes de empezar" tiene ${abiertas} preguntas y el contrato pide 3`);
    if (!/pregunta[s]? del principio/.test(prosa)) {
      fallo(`el cuerpo no retoma ninguna pregunta del principio (falta un "ahí está la N pregunta del principio")`);
    }
  }

  // 10. La analogía se cierra (contrato, sección 7) --------------------------
  // "🔬 En detalle" tiene que decir dónde deja de valer la analogía de la
  // clase. Una analogía sin su límite declarado produce alumnos seguros y
  // equivocados. Doce de las trece clases del módulo 1 se escribieron sin esto
  // y pasaron todos los demás controles, así que no basta con confiar en que
  // uno se acuerde.
  //
  // Exentas: las clases de síntesis y las que continúan la analogía de otra,
  // declaradas aquí por su id para que la excepción sea explícita.
  // 00-01 orienta sobre el curso y no explica ningún concepto de red, así que
  // no tiene analogía que cerrar. Forzarle una sería peor que no tenerla.
  const SIN_ANALOGIA_PROPIA = new Set(["00-01", "01-04", "01-13"]);
  const detalle = seccion(prosa, "🔬 En detalle");
  if (tipo === "A" && detalle !== null && !SIN_ANALOGIA_PROPIA.has(claveActual)) {
    if (!/deja de valer|se rompe la analog|no cubre la analog/i.test(detalle)) {
      fallo(`"🔬 En detalle" no dice dónde deja de valer la analogía de la clase`);
    }
  }

  // 11. Dinero y limpieza (contrato, sección 5) ------------------------------
  // Solo aplica al tipo B: el A no toca la consola y es siempre 💚.
  if (tipo === "A" && semaforo !== "💚") {
    fallo(`una clase de tipo A no toca la consola, así que no puede llevar ${semaforo}`);
  }

  // Fuera del bloque de tipo B a propósito: una clase de concepto con un aviso
  // de costo también está mal, y ahí no hay nada que la detecte.
  if (semaforo === "💚" && /AVISO DE COSTO/.test(prosa)) {
    fallo(`la clase dice 💚 y lleva un aviso de costo: una de las dos cosas está mal`);
  }

  if (tipo === "B") {
    const registro = seccion(prosa, "🧹 Qué se queda encendido");
    if (registro === null) {
      fallo(`falta la sección "🧹 Qué se queda encendido"`);
    } else if (!/no queda nada encendido/i.test(registro)) {
      // Lo que sobrevive tiene que nombrar la clase que lo borra. "Más
      // adelante" es justo la frase que deja recursos facturando para siempre.
      if (!/\b(?:clase|la)\s+\d+\.\d+\b/i.test(registro)) {
        fallo(
          `el registro no nombra la clase donde se borra lo que queda vivo (o di "no queda nada encendido")`,
        );
      }
    }

    // El aviso va antes del paso, y es una cita para que su ⚠️ no cuente como
    // emoji fuera de título.
    if (semaforo !== "💚" && !/^> ⚠️ \*\*AVISO DE COSTO/m.test(prosa)) {
      fallo(`la clase es ${semaforo} y no lleva su bloque "> ⚠️ **AVISO DE COSTO — …**"`);
    }

    // Contrato, sección 4: toda clase con consola recuerda la región.
    if (!/us-east-1/.test(raw)) {
      fallo(`una clase con consola tiene que recordar la región us-east-1`);
    }
  }

  // 12. El orden es una promesa (contrato, sección 3) ------------------------
  // Un término se puede nombrar antes de su clase, pero entonces la clase
  // tiene que decir dónde se explica. Sin ese puntero es una dependencia, y se
  // estaría apoyando en algo que el alumno todavía no tiene.
  // Sin acentos y con frontera de palabra: "nat" no debe casar "destinatario".
  const plano = (s) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  const cuerpoPlano = plano(cuerpo);

  for (const [termino, claveDef] of Object.entries(GLOSARIO)) {
    if (claveActual >= claveDef) continue;
    const patron = new RegExp(`\\b${plano(termino).replace(/ /g, "\\s+")}\\b`);
    if (!patron.test(cuerpoPlano)) continue;

    // Adelantarlo vale, pero la clase tiene que decir dónde se explica. Se
    // comprueba a nivel de clase y no de párrafo: el puntero puede estar en
    // otro sitio del texto y sigue cumpliendo su función.
    // El puntero exige la palabra "clase" delante del número. Sin eso, una
    // dirección de ejemplo como 192.168.1.10 colaba como si fuera un puntero
    // a la clase 1.10, y el control se saltaba en silencio.
    const [mod, cls] = claveDef.split("-");
    const destino = `${Number(mod)}.${Number(cls)}`;
    // Con `i`: el puntero vale igual en prosa ("la clase 1.2") que en la
    // celda de una tabla ("Clase 1.2").
    const puntero = new RegExp(`\\bclases?\\s+${destino.replace(".", "\\.")}\\b`, "i");
    if (puntero.test(cuerpo)) continue;

    fallo(`usa "${termino}" antes de la clase ${destino}, y no dice en ningún sitio que se explica allí`);
  }

  // 13. Referencias a archivos internos del repositorio ----------------------
  [...raw.matchAll(/`?(CONTRATO-DE-CLASES\.md|manifest\.ts|registry\.ts|README\.md|lecciones\/)`?/g)].forEach(
    (m) => fallo(`referencia a un archivo interno del repositorio: ${m[1]}`),
  );
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
