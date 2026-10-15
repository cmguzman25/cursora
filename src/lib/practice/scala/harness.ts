import type { CodeTest } from "@content/challenges/types";

/**
 * Harness de los retos de Scala (`evaluation.kind: "code-tests"`).
 *
 * Arma **un solo programa** con una o varias variantes de código (la del
 * alumno, o la referencia y cada solución ingenua en el verificador): cada
 * variante va dentro de su propio `object`, así no chocan sus definiciones y se
 * paga el arranque del JVM y del compilador una sola vez.
 *
 * Cada test imprime una línea `@@RESULT {json}` en stdout. Lo usa hoy el
 * verificador (`content/challenges/verificar-retos.mjs`, vía Docker) y lo
 * usará el runner de la app cuando exista.
 *
 * Módulo puro y solo con `import type`: Node lo carga directamente.
 */

/** Versión de Scala con la que se compila. Las soluciones evitan rasgos exclusivos de Scala 3. */
export const SCALA_VERSION = "3.3";

/** Tiempo máximo por test: un bucle infinito no debe colgar el resto. */
export const SCALA_TEST_TIMEOUT_MS = 5_000;

const MARCA = "@@RESULT ";

export interface ScalaVariant {
  /** Identificador de la variante en la salida ("ref", "naive1", "user"…). */
  id: string;
  code: string;
}

export interface ScalaTestResult {
  variant: string;
  name: string;
  passed: boolean;
  /** `toString` de lo que devolvió el código, si devolvió algo. */
  actual: string | null;
  expected: string;
  /** Excepción o timeout. */
  error: string | null;
}

/** Un literal de String de Scala, para incrustar nombres de test sin romper el código. */
function scalaString(s: string): string {
  return JSON.stringify(s);
}

const OBJETO = (i: number) => `Variant${i}`;

export function buildScalaProgram(variants: ScalaVariant[], tests: CodeTest[]): string {
  const objetos = variants
    .map((v, i) => {
      const checks = tests
        .map(
          (t) =>
            `    Harness.check(${scalaString(v.id)}, ${scalaString(t.name)}, () => {\n${t.call}\n}, () => {\n${t.expected}\n})`,
        )
        .join("\n");
      // `runTests` va en la columna 0, igual que el código del alumno: con la
      // sintaxis por indentación de Scala 3, una línea más adentro seguiría
      // siendo parte del cuerpo de su última función sin llaves.
      return `object ${OBJETO(i)} {\n${v.code}\n\ndef runTests(): Unit = {\n${checks}\n}\n}`;
    })
    .join("\n\n");

  return `//> using scala ${SCALA_VERSION}

${objetos}

object Harness {
  private def json(s: String): String = {
    val sb = new StringBuilder("\\"")
    s.foreach {
      case '"' => sb.append("\\\\\\"")
      case '\\\\' => sb.append("\\\\\\\\")
      case '\\n' => sb.append("\\\\n")
      case '\\r' => sb.append("\\\\r")
      case '\\t' => sb.append("\\\\t")
      case c if c < ' ' => sb.append("\\\\u%04x".format(c.toInt))
      case c => sb.append(c)
    }
    sb.append("\\"").toString
  }

  private def jsonOrNull(s: Option[String]): String = s.map(json).getOrElse("null")

  private def describe(e: Throwable): String = {
    val msg = Option(e.getMessage).filter(_.nonEmpty).map(m => ": " + m).getOrElse("")
    e.getClass.getName + msg
  }

  def check(variant: String, name: String, actual: () => Any, expected: () => Any): Unit = {
    val esperado = expected()
    @volatile var resultado: Either[Throwable, Any] = Left(new RuntimeException("timeout"))
    @volatile var termino = false
    val hilo = new Thread(() => {
      try { resultado = Right(actual()) } catch { case e: Throwable => resultado = Left(e) }
      termino = true
    })
    hilo.setDaemon(true)
    hilo.start()
    hilo.join(${SCALA_TEST_TIMEOUT_MS}L)
    val (passed, actualStr, error) =
      if (!termino) (false, None, Some("timeout (${SCALA_TEST_TIMEOUT_MS} ms)"))
      else resultado match {
        case Right(v) => (v == esperado, Some(String.valueOf(v)), None)
        case Left(e) => (false, None, Some(describe(e)))
      }
    println(
      "${MARCA}{\\"variant\\":" + json(variant) +
        ",\\"name\\":" + json(name) +
        ",\\"passed\\":" + passed +
        ",\\"actual\\":" + jsonOrNull(actualStr) +
        ",\\"expected\\":" + json(String.valueOf(esperado)) +
        ",\\"error\\":" + jsonOrNull(error) + "}"
    )
  }
}

object Main {
  def main(args: Array[String]): Unit = {
${variants.map((_, i) => `    ${OBJETO(i)}.runTests()`).join("\n")}
    System.exit(0)
  }
}
`;
}

/** Lee las líneas `@@RESULT` de la salida; ignora el resto (logs del compilador, prints del alumno). */
export function parseScalaOutput(stdout: string): ScalaTestResult[] {
  return stdout
    .split(/\r?\n/)
    .filter((l) => l.startsWith(MARCA))
    .map((l) => JSON.parse(l.slice(MARCA.length)) as ScalaTestResult);
}
