# 1.6 — Esquemas: schema-on-read, schema-on-write y evolución

> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- Si un data lake acepta cualquier dato sin validar su estructura, ¿en qué momento
  se descubre que un dato estaba mal?
- Un equipo de aplicación añade un campo nuevo a los eventos que emite y no avisa
  a nadie. ¿Qué crees que ocurre aguas abajo?
- ¿Por qué crees que renombrar una columna puede ser más peligroso que añadir una
  nueva?

## 📘 Contenido

Corriente Pagos tiene un pipeline que lleva funcionando dos años. Un martes, el
equipo de la aplicación móvil despliega una versión que cambia el campo `amount`
—hasta entonces un número— por una cadena de texto con el símbolo de la moneda:
`"USD 45.20"`.

Nadie avisa, porque desde la perspectiva del equipo móvil no cambiaron nada
importante. El pipeline sigue ejecutándose sin errores durante once días. Al cabo
de ese tiempo, alguien nota que los ingresos del mes son un 30 % menores de lo
esperado: la transformación estaba convirtiendo el texto a número, fallaba, y
escribía nulo.

Esto se llama **data drift** (deriva de datos), y es una de las formas más caras
de fallo en un pipeline: no se cae, miente.

### Qué es un esquema

Un **esquema** (*schema*) es la definición de la estructura de un conjunto de
datos: qué campos tiene, de qué tipo es cada uno, cuáles admiten nulos y cómo se
anidan.

La pregunta que separa las arquitecturas es **cuándo se aplica y se valida** ese
esquema.

### Schema-on-write: validar al escribir

En **schema-on-write**, el esquema se define antes y los datos se validan al
entrar. Un registro que no encaja se rechaza. Es el modelo de las bases
relacionales y de los almacenes de datos como Amazon Redshift.

- **A favor:** los datos almacenados son consistentes por construcción. Quien
  consulta sabe qué va a encontrar, y los errores se detectan **en el momento de
  la carga**, cuando todavía se sabe de dónde vino el problema.
- **En contra:** rígido. Cada cambio en el origen exige un cambio coordinado en el
  destino, y los datos que no encajan se pierden si no se guardan aparte.

### Schema-on-read: aplicar al leer

En **schema-on-read**, los datos se guardan tal cual llegan y el esquema se aplica
en el momento de consultarlos. Es el modelo del data lake: en S3 se pueden dejar
archivos con cualquier estructura, y una tabla del catálogo define cómo
interpretarlos.

- **A favor:** flexible y barato. Se ingiere sin fricción, se conserva todo, y
  distintos consumidores pueden interpretar los mismos archivos de formas
  distintas.
- **En contra:** el error se descubre tarde y lejos. En el caso de Corriente
  Pagos, once días después y en un informe, no en la carga.

| | Schema-on-write | Schema-on-read |
|---|---|---|
| Validación | Al cargar | Al consultar |
| Dato que no encaja | Se rechaza | Se guarda igual |
| Errores | Inmediatos y localizables | Tardíos y difusos |
| Flexibilidad | Baja | Alta |
| Dónde | Redshift, RDS | S3 con un catálogo |

La lección importante para el examen es que **schema-on-read no significa "sin
control"**. Significa que el control hay que ponerlo explícitamente: validaciones
de calidad en el pipeline, un catálogo que registre el esquema esperado y un
registro de esquemas para los flujos de eventos.

### Evolución de esquema

Los esquemas cambian: el negocio añade campos, cambia unidades, deja de usar
otros. **La evolución de esquema** (*schema evolution*) es la capacidad de
cambiarlo sin romper lo que ya está escrito ni lo que ya está leyendo.

Los cambios no son igual de peligrosos:

| Cambio | Riesgo | Por qué |
|---|---|---|
| Añadir un campo opcional | Bajo | Los lectores antiguos lo ignoran; los datos viejos lo leen como nulo |
| Eliminar un campo | Medio | Los consumidores que lo usaban se rompen |
| Renombrar un campo | **Alto** | Equivale a eliminar uno y añadir otro: los lectores antiguos ven el viejo desaparecido y no reconocen el nuevo |
| Cambiar el tipo | **Alto** | Puede fallar la conversión o, peor, convertir en silencio y perder precisión |
| Reordenar columnas | Depende | Irrelevante en formatos con nombres; catastrófico en CSV, donde la posición **es** la identidad |

Renombrar es más peligroso que añadir precisamente por eso: en la mayoría de los
formatos, el nombre es la identidad del campo. Un renombrado es un borrado y un
alta simultáneos, y ningún dato histórico se migra solo.

### Compatibilidad hacia atrás y hacia adelante

Cuando un flujo de eventos tiene productores y consumidores desplegados por
separado, la pregunta clave es quién puede actualizarse primero. De ahí salen tres
términos que el examen usa:

- **Compatibilidad hacia atrás** (*backward*): un consumidor **nuevo** puede leer
  datos **antiguos**. Se consigue añadiendo campos con valor por defecto.
- **Compatibilidad hacia adelante** (*forward*): un consumidor **antiguo** puede
  leer datos **nuevos**, ignorando lo que no conoce.
- **Compatibilidad total** (*full*): las dos a la vez.

Estos conceptos son el corazón de un **registro de esquemas** (*schema
registry*): un servicio central que guarda las versiones del esquema de cada
flujo y **rechaza publicar una versión incompatible**. Convierte el problema de
Corriente Pagos en un error de despliegue del equipo móvil, en lugar de en un
informe erróneo once días después. En AWS existe el **AWS Glue Schema Registry**,
que se estudia en la lección 3.4.

### Cómo lo soporta cada formato

Enlazando con la lección 1.4:

- **Avro** es el mejor. Lleva el esquema dentro del archivo y define reglas
  explícitas de resolución entre el esquema de escritura y el de lectura. Por eso
  domina en streaming.
- **Parquet y ORC** guardan el esquema y admiten bien añadir columnas; el motor
  puede fusionar esquemas al leer varios archivos, aunque hacerlo tiene coste.
- **JSON** es flexible por naturaleza —cada registro puede tener campos
  distintos— pero no valida nada: la flexibilidad es también la ausencia de red de
  seguridad.
- **CSV** es el peor. Sin nombres ni tipos, un cambio de orden o una columna
  añadida en medio corrompe la interpretación de todo lo posterior sin dar ningún
  error.

Sobre el data lake, los **formatos de tabla abiertos** como Apache Iceberg añaden
otro nivel: permiten añadir, eliminar y renombrar columnas de forma segura,
porque identifican cada columna por un **id interno** en lugar de por su nombre o
su posición. Es una de las razones por las que aparecen tanto en el examen.

**En resumen:** schema-on-write valida al cargar y detecta errores pronto;
schema-on-read guarda todo y descubre los problemas tarde, así que exige poner el
control de forma explícita. Añadir campos opcionales es seguro; renombrar y
cambiar tipos no lo es. Y un registro de esquemas convierte un fallo silencioso
de datos en un error de despliegue.

## 🔍 Cómo lo pregunta el examen

> Una aplicación publica eventos en un flujo que consumen tres equipos distintos.
> Un cambio en la aplicación modificó el tipo de un campo y varios informes
> quedaron con valores nulos durante días, sin que ningún proceso fallara. La
> empresa quiere impedir que un cambio incompatible llegue a producción. ¿Qué
> solución lo consigue?

Las pistas son **sin que ningún proceso fallara**, **varios equipos consumen** e
**impedir que un cambio incompatible llegue a producción**. Lo último es lo
decisivo: no piden detectar, piden **prevenir**.

Eso descarta las opciones que solo detectan después del hecho: una alarma sobre
el porcentaje de nulos, o un control de calidad que marque el problema al
procesar. Son útiles, pero llegan tarde por definición y el enunciado pide
impedirlo.

También descarta validar dentro de cada consumidor: hay tres equipos, así que la
validación se repetiría tres veces y seguiría sin bloquear al productor.

La respuesta correcta es un **registro de esquemas** que verifique la
compatibilidad antes de aceptar la nueva versión, de modo que el despliegue del
productor falle. Cuando el enunciado diga "impedir" o "evitar que ocurra", busca
el control que actúa **antes** del dato, no el que lo observa después.

## 💬 Ahora te toca a ti

**Pregunta:** Si un data lake acepta cualquier dato sin validar su estructura, ¿en
qué momento se descubre que un dato estaba mal?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Al leerlo, que puede ser días o semanas después, y a
menudo no como un error sino como un número raro en un informe. Ese retraso es el
verdadero coste de schema-on-read: cuando alguien lo detecta, ya hay datos
corruptos acumulados, el contexto de qué cambió se perdió y hay que reprocesar.
Por eso un data lake serio compensa esa flexibilidad con validaciones de calidad
en el pipeline y un catálogo que registre el esquema esperado.

**Pregunta:** Un equipo de aplicación añade un campo nuevo a los eventos que emite
y no avisa a nadie. ¿Qué crees que ocurre aguas abajo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Si el campo es **opcional y añadido**, casi nada: los
consumidores antiguos lo ignoran y todo sigue funcionando. Ese es el cambio más
seguro y por eso es la forma recomendada de evolucionar un esquema. El riesgo
aparece con las otras operaciones: renombrar, eliminar o cambiar el tipo de un
campo existente. Y si el consumidor infiere el esquema automáticamente con un
crawler, un campo nuevo puede provocar que el esquema de la tabla cambie sin que
nadie lo haya decidido.

**Pregunta:** ¿Por qué crees que renombrar una columna puede ser más peligroso que
añadir una nueva?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque en la mayoría de los formatos el nombre **es** la
identidad del campo, así que renombrar equivale a eliminar uno y crear otro. Los
consumidores que buscaban el nombre viejo dejan de encontrarlo, los datos
históricos siguen teniendo el nombre antiguo y no se migran solos, y el resultado
son nulos en lugar de un error claro. Añadir una columna opcional, en cambio, no
invalida nada de lo anterior. Los formatos de tabla como Iceberg mitigan esto
porque identifican las columnas por un id interno, no por el nombre.

## ⚠️ No lo confundas con

- **Schema-on-read vs. sin esquema:** schema-on-read tiene esquema, solo que se
  aplica al consultar. "Sin esquema" no existe: si nadie lo define, cada
  consumidor improvisa el suyo.
- **Compatibilidad hacia atrás vs. hacia adelante:** hacia atrás es que un
  consumidor nuevo lea datos viejos; hacia adelante es que un consumidor viejo lea
  datos nuevos. Se confunden constantemente.
- **Evolución de esquema vs. conversión de esquema:** evolucionar es cambiar el
  esquema de un mismo sistema a lo largo del tiempo; convertir es traducir el
  esquema de un motor a otro al migrar, que es trabajo de otras herramientas.
- **Data drift vs. mala calidad de datos:** el drift es un cambio en la
  **estructura o el significado** del dato de origen; la mala calidad son valores
  incorrectos dentro de una estructura estable.
- **Detectar vs. impedir:** una alarma sobre nulos detecta; un registro de
  esquemas impide. El examen distingue las dos con cuidado.

## 🎯 Pistas para el examen

- **"Impedir" o "evitar que llegue a producción" pide un control previo**, no una
  alarma. Es la distinción que decide estas preguntas.
- **Cambios que el examen considera seguros: añadir campos opcionales.**
  Peligrosos: renombrar y cambiar tipos. Si una opción propone renombrar como
  solución sin más, sospecha.
- **Un fallo que no genera errores pero produce nulos es data drift.** Buscar la
  causa en la capacidad o en la red es el camino equivocado.
- **Cuando haya varios consumidores de un mismo flujo**, la solución correcta suele
  ser central —un registro de esquemas— y no repetida en cada consumidor.
- **Si el enunciado menciona añadir, borrar o renombrar columnas sobre datos en
  S3**, ten presente que los formatos de tabla abiertos lo hacen de forma segura,
  y los archivos sueltos no.
