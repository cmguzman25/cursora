# Contrato de redacción — curso Full Stack Developer con AWS

Este documento define **cómo se escribe cada lección** de este curso. Es un
contrato: toda lección nueva dentro de `lecciones/` tiene que respetar la misma
estructura, el mismo tono, los mismos bloques y las mismas reglas de costo.

Este contrato aplica **solo a este curso**. El curso de AWS Cloud Practitioner
tiene el suyo, con otra estructura (ese prepara un examen; este forma a alguien
que va a construir y desplegar aplicaciones reales).

---

## 1. A quién le hablamos

- Alguien que **arranca desde cero o casi cero** en desarrollo web y en AWS.
- Termina el curso en un **nivel intermedio**: capaz de construir y desplegar
  una aplicación full stack completa en AWS, con login, base de datos, API,
  infraestructura como código, CI/CD y monitoreo.
- No asumimos carrera de sistemas, ni inglés técnico, ni experiencia previa en
  la nube. Sí asumimos ganas de practicar y una computadora con internet.
- **El presupuesto del lector es cero o casi cero.** Todo el curso está diseñado
  para hacerse dentro del Free Tier de AWS. Cuando algo cuesta, se avisa antes,
  se dice cuánto, y se explica cómo apagarlo.

## 2. Principios de redacción

- **Lenguaje simple, siempre.** Frases cortas. Dos oraciones simples antes que
  una larga con tres ideas encadenadas.
- **Tono cercano, de "tú".** Como un compañero de trabajo con más experiencia
  explicándote algo en la mesa de al lado, no como un manual corporativo.
- **Ningún término técnico sin explicar la primera vez.** Nada de "haz un
  deploy del artifact en el bucket": primero se dice qué es cada cosa en
  palabras normales, y recién después se usa el nombre técnico.
- **Ejemplo cotidiano primero, ejemplo técnico después.** Cada concepto
  importante entra por una analogía de la vida real (un restaurante, un
  edificio, una fila del banco, un depósito de cajas) y recién ahí aparece el
  servicio de AWS o el código. Nunca al revés.
- **Ejemplos simples y cortos.** Un bloque de código enseña *una* cosa. Si un
  ejemplo necesita 60 líneas para mostrar una idea, el ejemplo está mal
  planteado: se recorta o se parte en dos.
- **Código completo y copiable.** Nada de `// ...resto del código`. Si el lector
  copia el bloque, tiene que funcionar. Comentarios dentro del código, en
  español.
- **Nada de "es fácil", "obviamente" ni "simplemente".** Si al lector no le sale,
  esas palabras solo lo hacen sentir tonto.
- **Rutas de consola siempre con el mismo formato:**
  `Consola AWS → S3 → Buckets → Create bucket`. Los nombres de botones y menús
  se dejan **en inglés**, porque así los ve el lector en la consola real, con la
  traducción entre paréntesis la primera vez que aparecen en la lección.
- **No prometemos capturas de pantalla.** En su lugar, después de cada paso se
  describe en texto **qué debería ver** el lector ("deberías ver un cartel verde
  que dice *Successfully created bucket*"). Así la lección no envejece cuando
  AWS rediseña la consola.
- **Extensión de la sección de contenido (📘):** entre 900 y 1800 palabras en las
  lecciones de tema, y entre 1200 y 2500 en el paso a paso de los ejercicios
  guiados. El resto de las secciones (preguntas, errores comunes, cierre) suma
  aparte, y una lección completa suele quedar entre 2000 y 2800 palabras. Este
  techo es fijo: si un tema no entra sin volverse superficial, **se parte en dos
  lecciones** — nunca se estira una más allá del rango.

## 3. La práctica es en la consola de AWS

- **Todo ejercicio de AWS se hace en la consola web** (`console.aws.amazon.com`),
  con clics, no por línea de comandos. La CLI y el código aparecen como
  *complemento* ("lo mismo, en un comando"), nunca como el camino principal,
  hasta el módulo de Infraestructura como Código — que justamente enseña por qué
  hacer todo a mano no escala.
- **Región por defecto del curso: `us-east-1` (N. Virginia).** Es la más barata,
  la que tiene todos los servicios y la que usan casi todos los tutoriales. Cada
  lección con práctica recuerda verificar la región arriba a la derecha, porque
  el error nº1 del principiante es crear un recurso y después no encontrarlo
  porque está mirando otra región.
- **Todo recurso creado en el curso lleva la etiqueta (tag)**
  `curso = fullstack-aws`. Sirve para encontrarlos después con el Tag Editor y
  borrarlos todos. Cada lección que crea un recurso lo recuerda.
- **Nombres de recursos:** siempre con el prefijo `fsaws-` y, cuando el nombre
  tiene que ser único en todo AWS (buckets de S3), se le agrega un número al
  azar: `fsaws-portfolio-4821`.

## 4. Reglas de dinero (la parte no negociable)

Este curso se toma el costo en serio. Un principiante que recibe una factura
inesperada de 60 dólares abandona la nube para siempre.

### 4.1 Semáforo de costo obligatorio

**Toda** lección lleva un semáforo en la cabecera, y **todo** ejercicio guiado lo
repite justo antes del primer paso. Solo hay tres estados:

| Semáforo | Qué significa |
|---|---|
| 💚 **Costo: $0** | Entra completo en Free Tier o Always Free. Aunque te olvides de borrarlo, no se factura (o el consumo es tan bajo que no cambia nada). |
| 💛 **Costo: centavos** | Cuesta menos de USD 0,10 si sigues los pasos y borras al terminar. Siempre se dice el número aproximado y cuánto costaría si lo dejas encendido un mes. |
| 🔴 **Costo: genera cargos reales** | Usa un servicio que cobra desde el primer minuto y no tiene free tier (NAT Gateway, ALB, Fargate, dominios, Secrets Manager…). Requiere el aviso completo de la sección 4.2 y una alternativa gratuita. |

### 4.2 Aviso de costo

Cada vez que un paso crea algo que puede facturar, va este bloque **antes** del
paso, nunca después:

```markdown
> ⚠️ **AVISO DE COSTO — [nombre del servicio]**
>
> Este paso crea un recurso que **sí se cobra**: aproximadamente **USD X,XX por
> hora** (unos **USD XX al mes** si lo dejas encendido).
> - **Qué hacer:** haz el ejercicio de una sentada y borra el recurso al final
>   (paso de limpieza al pie de la lección).
> - **Si no quieres gastar nada:** [alternativa gratuita concreta, o "lee el
>   ejercicio sin ejecutarlo — igual entenderás el concepto"].
```

Reglas de los avisos:

- **Nunca** se asume que el lector "ya sabe" que algo cuesta. Se repite el aviso
  en cada lección donde aparezca el servicio, aunque ya se haya avisado antes.
- Los precios se escriben como **aproximados y de `us-east-1`**, con la fecha de
  consulta, y con un enlace a la página de precios oficial del servicio. AWS
  cambia precios: la lección dice explícitamente "verifica el precio actual".
- Si un servicio tiene free tier con límite (por ejemplo, 750 horas de EC2 al
  mes durante 12 meses), se dice **el límite exacto** y **qué pasa al pasarse**.
- El Free Tier de AWS tiene tres sabores y se nombran con precisión:
  **Always Free** (siempre gratis), **12 meses gratis** (solo cuentas nuevas) y
  **prueba corta** (por ejemplo 30 días). Nunca se dice "es gratis" a secas.

### 4.3 Limpieza obligatoria

Toda lección que crea recursos termina con un bloque de limpieza:

- Lista **en orden** de qué borrar (el orden importa: no se puede borrar una VPC
  con recursos adentro).
- Cómo **confirmar** que quedó borrado.
- Un recordatorio de revisar **Billing → Free Tier** y **Cost Explorer** al día
  siguiente, porque los cargos aparecen con retraso.
- Si algo **debe quedar vivo** para la próxima lección, se dice claramente:
  "esto se queda, no lo borres — y aquí está cuánto cuesta dejarlo".

### 4.4 Presupuesto y alarmas

El módulo 1 obliga a crear un presupuesto de AWS Budgets con alerta por email en
USD 1, USD 5 y USD 10 **antes** de crear cualquier otro recurso del curso. Toda
lección con semáforo 🔴 recuerda esa alarma en una línea.

## 5. Estructura obligatoria — Lección de tema (Tipo A)

Cabecera fija, siempre igual:

```markdown
# X.Y — Título de la lección

> Módulo X · Lección X.Y · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0
```

(El nivel es `Básico`, `Básico-Intermedio` o `Intermedio` y va subiendo a lo
largo del curso; el tiempo es una estimación honesta de lectura + práctica.)

Y después, exactamente estas siete secciones, en este orden:

### 1. 🤔 Antes de empezar

Entre 2 y 4 preguntas escritas por nosotros, antes de cualquier contenido. No se
responden aquí. Sirven para que el cerebro del lector quede buscando la respuesta
mientras lee. Son abiertas y de intuición, nunca de sí/no ni de examen.

### 2. 📘 Cómo funciona (la teoría)

La explicación del tema. Ejemplo cotidiano primero, después el equivalente en
AWS o en código. Se permiten subtítulos, listas y tablas para que sea fácil de
escanear. **Cierra siempre con un "En resumen" de 2 o 3 líneas.**

### 3. 🛠️ Manos a la obra (la práctica)

Práctica corta y guiada, de 10 a 25 minutos, con pasos numerados. Reglas:

- Cada paso dice **qué hacer** y **qué deberías ver**.
- Empieza recordando la región y el semáforo de costo.
- Si el tema no tiene práctica posible en la consola de AWS (por ejemplo, una
  lección de TypeScript), la práctica se hace en el editor o el navegador —
  **pero la sección nunca se omite**. En este curso no hay lecciones de solo leer.

### 4. 💰 Costo y limpieza

Obligatoria en toda lección, incluso cuando el costo es cero (ahí dice
explícitamente por qué es cero, que también se aprende). Contiene:

- Qué se creó y qué se factura.
- Qué parte del Free Tier consume, con el límite exacto.
- Pasos de borrado en orden, o "esto se queda para la próxima lección".

### 5. 💬 Ahora te toca a ti

Se repiten **exactamente las mismas preguntas** de la sección 1, palabra por
palabra. Formato por pregunta:

```markdown
**Pregunta:** (la misma de la sección 1)

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...
```

### 6. ⚠️ Errores comunes

De 3 a 5 tropiezos reales, con el síntoma y la solución. Formato:
**"Síntoma → causa → cómo se arregla"**. Aquí van los clásicos: región
equivocada, permisos faltantes, CORS, caché de CloudFront, security group
cerrado.

### 7. 🎯 Para llevarte

De 3 a 5 puntos con lo esencial, más una línea de **"En la próxima lección…"**
que conecta con el tema siguiente. No repite el resumen: aquí va lo que un
profesional recordaría del tema seis meses después.

## 6. Estructura obligatoria — Ejercicio práctico guiado (Tipo B)

**Las dos últimas lecciones de cada módulo son ejercicios guiados.** No son
"repasos": son encargos de trabajo realistas, del tipo que aparece en una
empresa de verdad, y se resuelven de punta a punta.

### Los dos ejercicios tienen pesos y papeles distintos

Dos encargos grandes seguidos cansan y hacen abandonar. Por eso no son dos
versiones de lo mismo: son las dos mitades de cómo se trabaja de verdad.

| | **Ejercicio A — Construir** | **Ejercicio B — Operar** |
|---|---|---|
| Qué hace | Levanta algo nuevo de punta a punta | Trabaja **sobre lo que acabas de construir** |
| Duración | 45 a 90 minutos | 20 a 40 minutos |
| Ejemplos | La API de pedidos en Lambda; la web publicada con HTTPS; la VPC hecha a mano | Medir cuánto costaría en producción; romperlo y revertir; apagar con snapshot y restaurar; intentar entrar sin permiso y comprobar que falla |
| Qué enseña | A hacer | A verificar, medir, mantener y deshacer |

El ejercicio B es corto **a propósito**: llega cuando el lector ya gastó energía
en el A. Si al escribirlo se está estirando más de 40 minutos, es señal de que
en realidad es otro ejercicio A y hay que replantearlo.

**Excepción 1:** si en un módulo el segundo ejercicio no enseñaría nada que el
primero no enseñe ya —solo repetir el mismo trabajo con otros datos—, se deja
**un único ejercicio guiado** y se dice en el índice. Es preferible un ejercicio
bueno a dos donde el segundo es relleno.

**Excepción 2:** el proyecto final del módulo 17 son **dos ejercicios de
construir**, partidos en dos por tamaño (la aplicación y su puesta en
producción). Es el único módulo donde el segundo no es de operar.

Cabecera:

```markdown
# X.Y — Ejercicio guiado: Título del encargo

> Módulo X · Ejercicio guiado 1 de 2 · Construir · Nivel: Intermedio · ⏱️ 60 min · 💛 Costo: centavos
```

(El tercer campo dice **Construir** u **Operar**, para que el lector sepa de
entrada si le esperan 60 minutos o 25.)

Secciones, en este orden:

### 1. 🎬 El caso

El escenario laboral, en 2 o 3 párrafos: quién pide, qué necesita y por qué. Con
nombres concretos ("la panadería *Doña Rosa* quiere tomar pedidos por WhatsApp y
verlos en una pantalla"). Nada de "supongamos una empresa X".

### 2. ✅ Lo que vas a construir

- Qué queda funcionando al terminar, en una frase.
- Un diagrama simple en texto o en bloque de código (cajas y flechas).
- **Criterios de aceptación**: lista de casillas verificables, como las que
  pondría un líder técnico en un ticket.

### 3. 🧰 Antes de empezar

Prerrequisitos concretos: qué lecciones previas hacen falta, qué recursos de
módulos anteriores deben seguir vivos, qué instalar, tiempo estimado real.

### 4. 💰 Semáforo de costo

El semáforo completo, con el aviso de la sección 4.2 si corresponde, **antes**
del primer paso. Nunca se llega al paso 1 sin haber pasado por aquí.

### 5. 🪜 Paso a paso

Pasos numerados, agrupados en fases (`### Fase 1 — Preparar la base de datos`).
Cada paso: qué hacer, qué deberías ver, y por qué se hace así (una línea de
"por qué" en los pasos que no son obvios — un ejercicio que solo se copia no
enseña nada).

### 6. 🔍 Verifica que funciona

Pruebas concretas que el lector ejecuta para confirmar el resultado, incluyendo
al menos una prueba **negativa** ("intenta entrar sin token: debe responder
401"). Los profesionales prueban que lo que debe fallar, falla.

### 7. 🧹 Limpieza

Orden exacto de borrado, cómo confirmar que no queda nada, y qué se conserva
para el módulo siguiente.

### 8. 🧠 Qué acabas de aprender

De 4 a 6 puntos que conectan lo que hizo con los conceptos del módulo, y una
frase sobre **cómo se ve esto en un trabajo real** (qué parte de esto haría un
equipo de otra forma, con más presupuesto o más tráfico).

### 9. 🚀 Reto extra (opcional)

Una mejora sin solución paso a paso, para que el lector la resuelva solo. Si el
reto puede costar dinero, lleva su propio aviso de costo. Se indica qué tendría
que investigar, no cómo hacerlo.

## 7. Progresión de dificultad

- **Módulos 1 a 5:** nivel Básico. Ejercicios de una sola pieza (una cuenta, un
  bucket, una página). Todos con semáforo 💚.
- **Módulos 6 a 11:** nivel Básico-Intermedio. Los ejercicios empiezan a
  conectar dos o tres servicios entre sí y a reutilizar lo construido en módulos
  anteriores. Aparecen los primeros 💛.
- **Módulos 12 a 17:** nivel Intermedio. Ejercicios con varias piezas,
  automatización, entornos separados y decisiones de arquitectura y costo.
  Aparecen los 🔴, siempre con alternativa gratuita.
- **Regla de continuidad:** lo que se construye en un módulo se reutiliza en el
  siguiente siempre que se pueda. Al final del curso el lector no tiene 17
  proyectos sueltos: tiene **una aplicación** que fue creciendo. Cada ejercicio
  dice explícitamente de qué lección toma lo que ya existe.

## 8. Plantillas listas para copiar

### Tipo A — Lección de tema

```markdown
# X.Y — Título

> Módulo X · Lección X.Y · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Pregunta 1
- Pregunta 2

## 📘 Cómo funciona

[Ejemplo cotidiano → explicación → ejemplo en AWS o en código]

**En resumen:** ...

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (N. Virginia)**. Verifícala arriba a la derecha.
> 💚 Costo de esta práctica: $0.

1. **Paso 1.** Qué hacer.
   *Deberías ver:* ...
2. **Paso 2.** ...

## 💰 Costo y limpieza

- **Qué creaste:** ...
- **Qué se factura:** ...
- **Limpieza:** ...

## 💬 Ahora te toca a ti

**Pregunta:** Pregunta 1

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...

## ⚠️ Errores comunes

- **Síntoma.** Causa → cómo se arregla.

## 🎯 Para llevarte

- Punto 1
- Punto 2

**En la próxima lección:** ...
```

### Tipo B — Ejercicio guiado

```markdown
# X.Y — Ejercicio guiado: Título del encargo

> Módulo X · Ejercicio guiado 1 de 2 · Construir · Nivel: Intermedio · ⏱️ 60 min · 💛 Costo: centavos

## 🎬 El caso

...

## ✅ Lo que vas a construir

[Diagrama en texto]

**Criterios de aceptación:**
- [ ] ...

## 🧰 Antes de empezar

- ...

## 💰 Semáforo de costo

> ⚠️ **AVISO DE COSTO — [servicio]** ...

## 🪜 Paso a paso

### Fase 1 — ...

1. **Paso 1.** ...
   *Deberías ver:* ...

## 🔍 Verifica que funciona

- ...

## 🧹 Limpieza

1. ...

## 🧠 Qué acabas de aprender

- ...

## 🚀 Reto extra (opcional)

...
```

## 9. Checklist antes de dar una lección por terminada

- [ ] ¿La cabecera tiene módulo, número, nivel, tiempo y semáforo de costo?
- [ ] ¿Las preguntas de "Antes de empezar" y "Ahora te toca a ti" son
      exactamente las mismas, palabra por palabra?
- [ ] ¿Cada término técnico nuevo se explicó en palabras simples la primera vez?
- [ ] ¿Hay al menos un ejemplo cotidiano por concepto importante, **antes** del
      ejemplo técnico?
- [ ] ¿La teoría cierra con "En resumen"?
- [ ] ¿Hay práctica? (Ninguna lección es solo teoría.)
- [ ] ¿Cada paso dice qué deberías ver?
- [ ] ¿Todo recurso que puede facturar tiene su aviso de costo **antes** del paso?
- [ ] ¿Hay pasos de limpieza en orden, o se dice explícitamente qué se conserva?
- [ ] ¿Se recuerda la región y la etiqueta `curso = fullstack-aws`?
- [ ] ¿El código de los ejemplos es completo y funciona si se copia tal cual?
- [ ] ¿Se conecta con la lección anterior y anuncia la siguiente?
- [ ] En un ejercicio guiado: ¿la cabecera dice si es de **Construir** u
      **Operar**, y su duración cae dentro del rango de ese papel (45-90 min /
      20-40 min)?

## 10. Convenciones de archivos

- Un archivo por lección, en `lecciones/`, con el nombre
  `MM-LL-slug-corto.es.md` — `MM` es el módulo con dos dígitos y `LL` la lección
  dentro del módulo. Ejemplo: `06-10-ejercicio-api-tareas-serverless.es.md`.
- Idioma inicial: **español** (`.es.md`). Las traducciones a `.en.md` y
  `.pt-BR.md` se agregan después; la app ya cae a español cuando falta.
- El índice vivo del curso está en `README.md`, y se marca `[x]` cada lección al
  terminarla.
