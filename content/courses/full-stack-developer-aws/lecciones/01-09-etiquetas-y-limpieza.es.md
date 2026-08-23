# 1.9 — Etiquetas, nombres y la regla de limpieza del curso

> Módulo 1 · Lección 1.9 · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si te mudas y guardas 40 cajas iguales sin rotular, ¿cuánto tardarías en encontrar el cargador del teléfono?
- Dentro de tres meses vas a tener decenas de cosas creadas en AWS. ¿Cómo sabrás cuáles puedes borrar sin romper nada?
- Si la factura llegara con 12 dólares, ¿cómo averiguarías **qué** los generó?

## 📘 Cómo funciona

Esta es la última lección de higiene antes de empezar a construir. Y es la que decide si dentro de dos meses tu cuenta es un lugar ordenado o un desván con cosas que no te atreves a tocar.

### El problema de las cajas sin rotular

Cuando te mudas, las cajas rotuladas ("cocina", "libros", "cables") se buscan en segundos. Las que no, hay que abrirlas todas.

En AWS pasa exactamente eso. Hoy tienes la cuenta vacía. En el módulo 12 vas a tener servidores, contenedores, imágenes, redes, funciones, tablas y buckets. Y ahí llega la pregunta incómoda: *este bucket de nombre raro, ¿es del ejercicio del módulo 5 o lo usa algo que todavía funciona?*

Sin rótulos, la respuesta es "no sé", y "no sé" significa una de dos: o lo borras y rompes algo, o lo dejas y sigue costando.

### Qué es una etiqueta

Una **etiqueta** (*tag*) es un par de datos que le pegas a un recurso:

```
curso = fullstack-aws
```

A la izquierda la **clave** (*key*), a la derecha el **valor** (*value*). Nada más. No hace nada por sí sola: es un rótulo. Pero como AWS te deja **buscar y filtrar por etiquetas**, ese rótulo se convierte en cuatro superpoderes:

1. **Encontrar** todo lo de un proyecto, aunque esté repartido en diez servicios distintos.
2. **Borrar sin miedo**, porque sabes qué es cada cosa.
3. **Saber en qué se te va el dinero**, con la factura desglosada por etiqueta.
4. **Dar permisos por etiqueta** (por ejemplo, "puedes apagar solo lo que esté marcado como `entorno=dev`"). Es avanzado y lo veremos en el módulo 2.

### Las reglas del juego

Las etiquetas tienen límites, y conviene conocerlos antes de inventarse un sistema:

| Regla | Detalle |
|---|---|
| Máximo por recurso | **50 etiquetas** |
| Largo de la clave | hasta **128 caracteres** |
| Largo del valor | hasta **256 caracteres** |
| Caracteres seguros | letras, números, espacios y `+ - = . _ : / @` |
| Mayúsculas | **Sensibles**: `Curso` y `curso` son etiquetas distintas |
| Prefijo `aws:` | Reservado por AWS; no puedes crear ni editar esas |
| Claves repetidas | Cada clave una sola vez por recurso |

La fila de las mayúsculas es la que muerde. Si un día escribes `Curso` y otro `curso`, tu búsqueda encontrará la mitad de las cosas y jurarás que AWS está roto. **Elige minúsculas y no te desvíes.**

Y una advertencia que AWS repite en su documentación: **nunca pongas información sensible en una etiqueta**. Nada de correos de clientes, documentos de identidad ni contraseñas. Las etiquetas aparecen en la facturación y las devuelven muchísimas llamadas a la API; no son un lugar privado.

### La convención de este curso

De aquí en adelante, todo lo que crees sigue estas dos reglas.

**Nombres:** prefijo `fsaws-`, después qué es, y un número al azar si el nombre debe ser único en todo el mundo (como los buckets de S3):

```
fsaws-pedidos-api
fsaws-portfolio-4821
```

**Etiquetas:** tres, siempre las mismas:

| Clave | Valor | Para qué |
|---|---|---|
| `curso` | `fullstack-aws` | Encontrar todo lo del curso de un vistazo |
| `modulo` | `01`, `05`, `12`… | Saber de qué ejercicio salió |
| `borrar` | `si` / `no` | La más importante: distingue lo desechable de lo que debe seguir vivo |

Esa tercera etiqueta es la que convierte la limpieza en algo mecánico. Cuando termines el módulo 6, filtras por `borrar = si` y borras todo lo que aparezca, sin pensar y sin miedo. Lo que lleva `borrar = no` es lo que las lecciones siguientes necesitan.

### La factura desglosada por etiqueta (y su letra chica)

Las etiquetas pueden aparecer como columnas en tu informe de costos, y ahí es donde de verdad brillan: en vez de "gastaste 8 dólares", ves "el módulo 12 te costó 8 dólares".

Para eso hay que **activarlas** en la consola de facturación, y tiene tres detalles que sorprenden:

1. **Solo puedes activar claves que ya existan** en algún recurso. Si nunca etiquetaste nada, la lista está vacía.
2. **No es retroactivo.** AWS lo dice con todas las letras: las etiquetas no se aplican a recursos creados antes de que la etiqueta existiera. Lo que gastaste antes de activarla no se puede clasificar hacia atrás, nunca.
3. **Tarda.** Los datos del mes en curso aparecen unas **24 horas** después de habilitar los informes.

Por eso activamos esto **hoy**, con la cuenta vacía: para que absolutamente todo el gasto del curso quede clasificado desde el primer día.

### La regla de limpieza del curso

Aquí está el compromiso que hace que este curso cueste cero. Tres partes:

1. **Se borra en la misma sesión.** Si un ejercicio crea algo que cuesta, se borra al terminar el ejercicio, no "mañana". El mañana no llega, y el taxímetro sí corre.
2. **Lo que sobrevive, se dice.** Cada lección declara explícitamente qué se queda para la siguiente y por qué. Si no lo dice, se borra.
3. **Revisión semanal de dos minutos.** Abres el Tag Editor, filtras por `curso = fullstack-aws` y miras la lista. Después abres la facturación y miras el número. Si ambas cosas coinciden con lo que esperabas, todo bien.

Y un matiz honesto: **las etiquetas no lo cazan todo**. Hay cosas que cuestan y no aparecen etiquetadas en el informe de costos —las direcciones IP fijas, por ejemplo, que son un cargo sorpresa clásico—. Por eso la revisión semanal mira **las dos cosas**: la lista de recursos etiquetados y el gasto real por servicio. La etiqueta te dice qué tienes; la factura te dice qué pagas.

**En resumen:** una etiqueta es un rótulo clave/valor que te deja encontrar, borrar y facturar por proyecto. Usa siempre minúsculas, nunca datos sensibles, y las tres del curso (`curso`, `modulo`, `borrar`). Actívalas para costos hoy mismo, porque no son retroactivas — y borra lo que crees en la misma sesión.

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (N. Virginia)**. Verifícala arriba a la derecha.
> 💚 Costo de esta práctica: **$0**. Vas a crear tu primer recurso —un bucket de S3 vacío—, y un bucket vacío no cuesta nada: S3 cobra por lo que guardas y por las peticiones, y aquí no guardaremos nada. Aun así lo vamos a borrar al final, **porque practicar la regla de limpieza es justamente el objetivo de hoy**.

### Parte 1 — Crear tu primer recurso, ya rotulado

1. **Abre S3.** Escribe `S3` en el buscador de la consola y entra.
   *Deberías ver:* una lista de buckets vacía y un botón **Create bucket** (*crear bucket*).

2. **Crea el bucket.** Nombre: `fsaws-etiquetas-` seguido de 4 números al azar (por ejemplo `fsaws-etiquetas-7391`). Región: **US East (N. Virginia)**.
   *Por qué los números:* el nombre de un bucket es único **en todo el mundo**, no solo en tu cuenta. Si te dice que ya existe, cambia los números.

3. **Deja el resto como está.** No toques nada de acceso público: debe quedar bloqueado, que es lo que viene por defecto.
   *Deberías ver:* la casilla **Block all public access** marcada. En el módulo 5 explicamos por qué esto casi nunca se desactiva.

4. **Añade las tres etiquetas.** Busca la sección **Tags** (*etiquetas*) y añade:

   | Key | Value |
   |---|---|
   | `curso` | `fullstack-aws` |
   | `modulo` | `01` |
   | `borrar` | `si` |

   *Deberías ver:* las tres en la lista antes de crear. Todo en minúsculas.

5. **Crea el bucket.**
   *Deberías ver:* un mensaje verde de confirmación y tu bucket en la lista.

### Parte 2 — Encontrarlo por su etiqueta

6. **Abre el Tag Editor.** Busca `Tag Editor` (está dentro de *Resource Groups & Tag Editor*).
   *Deberías ver:* un formulario para buscar recursos por región, tipo y etiqueta.

7. **Busca por etiqueta.** Región: `US East (N. Virginia)`. Tipo de recurso: `All supported resource types`. Etiqueta: clave `curso`, valor `fullstack-aws`. Pulsa **Search resources**.
   *Deberías ver:* tu bucket en los resultados. Con un solo filtro acabas de encontrar todo lo del curso — hoy es una cosa; en el módulo 12 serán treinta.

8. **Comprueba lo de las mayúsculas.** Repite la búsqueda cambiando la clave a `Curso` (con C mayúscula).
   *Deberías ver:* **cero resultados**. Ahí tienes la prueba de por qué el curso usa siempre minúsculas.

### Parte 3 — Activar las etiquetas en la factura

9. **Ve a las etiquetas de costos.** Entra a **Billing and Cost Management** → **Cost allocation tags** (*etiquetas de asignación de costos*), en el menú de la izquierda.
   *Deberías ver:* una lista de claves de etiqueta detectadas en tu cuenta. Puede tardar un rato en aparecer `curso` y `modulo`, porque acabas de crearlas.

10. **Actívalas.** Marca `curso` y `modulo` y pulsa **Activate**.
    *Deberías ver:* su estado pasa a activo.
    *Por qué ahora:* no es retroactivo. Todo lo que gastes a partir de hoy quedará clasificado; lo de ayer, jamás.

### Parte 4 — La regla de limpieza, en vivo

11. **Borra el bucket.** Vuelve a S3, selecciónalo, pulsa **Delete** y escribe su nombre para confirmar.
    *Deberías ver:* la lista de buckets vacía otra vez.
    *Por qué:* el bucket no costaba nada, y lo borramos igual. Ese es el hábito: **lo que se crea para un ejercicio, se borra al terminar el ejercicio.**

12. **Confirma que no queda nada.** Repite la búsqueda del paso 7 en el Tag Editor.
    *Deberías ver:* cero resultados. Cuenta limpia, y ahora con un sistema de rótulos listo para los 16 módulos que vienen.

## 💰 Costo y limpieza

- **Qué creaste:** un bucket de S3 vacío (ya borrado) y la activación de dos etiquetas de costos.
- **Qué se factura:** nada. Un bucket vacío no cobra almacenamiento, y las pocas peticiones de hoy entran de sobra en lo gratuito. Activar etiquetas de costos tampoco cuesta.
- **Limpieza:** ya la hiciste en el paso 11. **La activación de etiquetas se queda**: no la desactives, es la que clasificará tu gasto durante todo el curso.
- **Mañana:** entra a Cost Explorer y comprueba que puedes agrupar por la etiqueta `curso`. Los datos tardan unas 24 horas en aparecer.

## 💬 Ahora te toca a ti

**Pregunta:** Si te mudas y guardas 40 cajas iguales sin rotular, ¿cuánto tardarías en encontrar el cargador del teléfono?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Muchísimo, porque tendrías que abrirlas casi todas. Rotularlas cuesta un minuto por caja al empaquetar y ahorra horas después. Las etiquetas de AWS son exactamente eso: unos segundos al crear el recurso, que después te permiten filtrar entre decenas de cosas repartidas en distintos servicios. Y como en la mudanza, el rótulo solo sirve si lo pones **al momento de guardar**: etiquetar después funciona para buscar, pero ya no puede clasificar el gasto que ocurrió antes.

**Pregunta:** Dentro de tres meses vas a tener decenas de cosas creadas en AWS. ¿Cómo sabrás cuáles puedes borrar sin romper nada?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Solo si lo dejaste escrito en el propio recurso. Esa es la razón de la etiqueta `borrar = si | no`: convierte una decisión difícil ("¿esto lo usa algo?") en un filtro mecánico. Filtras por `borrar = si`, borras todo lo que salga y duermes tranquilo. Sin ese rótulo, la duda se resuelve de la peor manera posible: dejándolo todo encendido por las dudas, que es exactamente como se acumulan las facturas de gente que "casi no usa AWS".

**Pregunta:** Si la factura llegara con 12 dólares, ¿cómo averiguarías **qué** los generó?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con dos herramientas, no una. Cost Explorer te desglosa el gasto por servicio y, si activaste las etiquetas de costos, también por etiqueta: podrías ver "el módulo 12 costó 8 dólares". Pero las etiquetas tienen huecos —hay cargos que no salen etiquetados en el informe, como las IP fijas—, así que la revisión seria mira **las dos**: la lista de recursos etiquetados (qué tienes) y el gasto por servicio (qué pagas). Cuando ambas cuadran, no hay sorpresas escondidas.

## ⚠️ Errores comunes

- **Mezclar mayúsculas y minúsculas.** Un día `curso`, otro `Curso` → son etiquetas distintas y la búsqueda encuentra la mitad. Minúsculas, siempre.
- **Etiquetar después de crear.** Se crea el recurso "y luego le pongo las etiquetas" → sirve para buscarlo, pero el gasto anterior ya no se puede clasificar: las etiquetas de costos no son retroactivas.
- **Esperar ver el desglose al instante.** Se activa la etiqueta y no aparece nada → tarda unas 24 horas, y solo clasifica lo que pase desde la activación.
- **Poner datos sensibles en etiquetas.** Correos, documentos, claves → las etiquetas viajan a la facturación y a muchas APIs. AWS advierte explícitamente que no lo hagas.
- **Confiar solo en las etiquetas para cazar gastos.** Hay cargos que no aparecen etiquetados en el informe de costos → contrasta siempre con el gasto por servicio en Cost Explorer.
- **Dejar el ejercicio "para borrar mañana".** Mañana no llega → borra en la misma sesión. Si algo debe sobrevivir, la lección te lo dice explícitamente.

## 🎯 Para llevarte

- Una etiqueta es un rótulo clave/valor. Sirve para encontrar, borrar, facturar y (más adelante) dar permisos.
- Límites: 50 por recurso, 128 y 256 caracteres, sensibles a mayúsculas, `aws:` reservado.
- Las tres del curso: `curso=fullstack-aws`, `modulo=NN`, `borrar=si|no`.
- Las etiquetas de costos se activan una vez, tardan 24 horas y **no son retroactivas**.
- Regla de limpieza: se borra en la misma sesión; lo que sobrevive, la lección lo dice; revisión semanal de dos minutos.

**En la próxima lección:** el primer ejercicio guiado del curso. Vas a hacer, de punta a punta, la auditoría de seguridad y costos que haría un profesional al recibir una cuenta de AWS recién creada — usando todo lo que montaste en este módulo.
