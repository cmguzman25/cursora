# 0.3 — Cómo trabaja Claude Code: contexto, permisos y sesiones

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 3 de 8 · ⏱️ 8 min de lectura

## 🎯 De qué va esta clase

Claude Code no es un buscador ni un chat cualquiera.

Esta clase explica cómo entiende tu proyecto, qué recuerda y qué olvida. También
qué te va a pedir permiso para hacer. Con eso sabrás escribir encargos que
salgan bien a la primera. Hoy tampoco tocas el juego.

## 🧠 Antes de empezar

1. Si le pides a alguien que arregle un archivo sin decirle cuál, ¿qué crees
   que hará antes de responder?
2. En la clase anterior le pediste que listara las carpetas del proyecto. ¿De
   dónde sacó la lista: de lo que sabe de Unity o de tu disco duro?
3. ¿Qué debería pedirte permiso antes de hacer: leer un archivo o borrarlo?

## 📖 Contenido

### Lee tu proyecto, no lo adivina

La diferencia con un chat normal es que Claude Code está dentro de tu carpeta.

Antes de responder, abre archivos, busca por nombre, mira la estructura. Si le
preguntas por tu script de la cámara, lo lee. Por eso sus respuestas hablan de
tu código, con tus nombres de variable. No de un ejemplo genérico sacado de
internet.

Eso tiene una consecuencia. Su calidad depende de lo ordenado que esté el
proyecto. Con nombres claros y carpetas con sentido responde mejor que con
veinte scripts llamados `Script1` y `NuevoScript`.

Y hay algo que no puede leer: lo que está solo en tu cabeza. Imagina un campo
llamado `radio` que mide celdas y no metros. No lo sabrá, salvo que se lo digas
o esté escrito en el proyecto.

### La sesión recuerda; el disco manda

Mientras la sesión está abierta, recuerda lo que habéis hablado. Puedes decir
"ahora cámbiale el nombre a esa variable" sin repetir de qué archivo hablas.

Al cerrar la terminal, esa conversación se acaba. La sesión siguiente empieza
sin memoria de la anterior. Lo único que sobrevive es lo que quedó escrito en
disco. Es decir, tus archivos y el archivo de reglas que harás en la clase
siguiente.

De ahí sale una costumbre útil. Si una decisión importa para mañana, no la
dejes en la conversación. Escríbela en el proyecto.

### Una sesión por tarea

Hay una tentación clara: dejar una sola sesión abierta durante días y pedirle
de todo. Funciona mal.

Una conversación muy larga arrastra todo lo hablado antes. Si has pasado dos
horas peleando con la cámara y ahora quieres tocar la economía, ese pasado no
ayuda. Estorba.

La costumbre sana es una sesión por tarea. Terminas el zoom de la cámara,
cierras, abres otra para lo siguiente. Las clases de este curso están pensadas
así: cada una es una tarea que cabe en una sesión corta.

### Los permisos

Claude Code pide permiso antes de tocar nada. El reparto es este:

| Acción | ¿Pregunta? |
|---|---|
| Leer un archivo | No |
| Buscar dentro del proyecto | No |
| Crear o modificar un archivo | Sí |
| Ejecutar un comando | Sí |
| Borrar cosas | Sí, y conviene mirarlo dos veces |

Puedes autorizar una acción una vez o para toda la sesión. Al principio del
curso, contesta que sí de una en una. Ver qué archivo va a tocar antes de que
lo toque es la mejor forma de entender cómo piensa.

Hay una regla que no conviene relajar: **lee siempre qué archivo va a
modificar**. La mayoría de los sustos no vienen de código malo. Vienen de código
bueno escrito en el archivo equivocado.

Otra situación que conviene reconocer pronto. A veces le pides una cosa y te
ofrece tres, incluidas dos que no pediste. Puede que tenga razón y sean buenas
ideas. Pero acepta solo lo que entraba en tu encargo.

El motivo es práctico. Si aceptas cinco cambios de golpe y el juego deja de
funcionar, ya no sabes cuál lo rompió. Un cambio cada vez, probado en pantalla,
avanza más despacio y llega antes.

### Un buen encargo tiene tres partes

Compara estos dos. El primero, ❌ el que no sirve:

```text
Haz que la cámara se mueva.
```

El segundo, ✅ el que sí:

```text
En Assets/Scripts/Camera/CameraPan.cs, añade zoom con la rueda del ratón.
Usa el Input System, como el resto del archivo. Limita la altura entre 10 y
40 metros. No toques el paneo con teclado, que ya funciona.
```

El segundo funciona porque dice tres cosas. **Qué** quieres, **dónde** va y
**qué no** hay que tocar. Ese tercer punto es el que más disgustos ahorra.

Añade el contexto que no puede adivinar. Si el proyecto usa un patrón concreto,
nómbralo. Si ya intentaste algo y falló, cuéntalo. Si hay un error en pantalla,
pégalo entero en lugar de resumirlo.

### Lo que no se le pide

Dos cosas quedan fuera durante todo el curso.

La primera son las **decisiones de diseño**. Cuánto tarda un aldeano en talar un
árbol. Cuánta vida tiene un soldado. Si una casa da cinco de población o diez.
Eso no se pregunta. Se decide, se prueba jugando y se ajusta.

La segunda es **entender por ti**. Si te devuelve treinta líneas y no sabes qué
hace una de ellas, no la pegues. Pregúntale qué hace esa línea. Es una pregunta
perfectamente razonable y la responderá sin quejarse.

La clase siguiente va entera sobre eso: cómo revisar lo que te devuelve sin ser
todavía experto en Unity.

Hay una tercera que conviene añadir con el tiempo. No le pidas cosas enormes.
Un encargo de "hazme el sistema de combate" produce doscientas líneas que nadie
va a revisar de verdad. Un encargo del tamaño de una clase sí se revisa.

## 🗺️ Cómo encaja en el juego

A partir del módulo 1, cada clase de construcción trae su encargo ya escrito,
listo para copiar. Verás siempre el mismo formato: el texto exacto, qué revisar
de la respuesta y qué no delegar.

Esos encargos son ejemplos, no plantillas sagradas. Cuando lleves veinte
clases, los escribirás mejor tú, porque conocerás tu proyecto. Ese es el punto
al que vamos.

Y hay un motivo práctico para aprender a revisarlo bien. En el módulo 7 pondrás
el juego en red. Allí, un código que parece correcto puede dejar que decida la
máquina equivocada. Revisar con criterio deja de ser una virtud y pasa a ser
una necesidad.

## 🔁 Repaso relámpago

1. ¿Qué sobrevive al cerrar la terminal: la conversación o lo escrito en disco?
2. ¿Para qué acciones no te va a pedir permiso?
3. ¿Cuáles son las tres partes de un encargo bien escrito?
4. ¿Qué haces si te devuelve una línea que no entiendes?

**Respuestas:** 1. Solo lo escrito en disco; la conversación se pierde al cerrar
la sesión. 2. Para leer archivos y buscar dentro del proyecto. 3. Qué quieres,
dónde va y qué no hay que tocar. 4. Preguntar qué hace esa línea, y no pegarla
hasta entenderla.

## 🎒 Qué hacer hoy

Abre Claude Code en la carpeta del proyecto y hazle dos preguntas seguidas.

La primera: pídele que te explique qué es un `MonoBehaviour` en Unity. Pregunta
también por qué casi todos los scripts heredan de él. La segunda, sin cerrar la
sesión: pídele un ejemplo mínimo de uno.

Fíjate en que la segunda pregunta no repite el contexto y aun así te entiende.
Eso es la sesión trabajando. Cierra la terminal, ábrela otra vez y pide "otro
ejemplo". No sabrá de qué le hablas, y esa es la lección de hoy.
