# 5.3 — Estrategias para el día del examen

> Módulo 5 · Repaso final y simulacro

## 🤔 Antes de empezar

- ¿Qué harías si te quedan 10 minutos y todavía tenés 12 preguntas sin responder?
- Cuando dudás entre dos opciones y ya cambiaste de idea dos veces, ¿te conviene quedarte con la primera respuesta o con la última?
- Si no aprobás, ¿qué sería lo primero que harías al día siguiente?

## 📘 Contenido

En la lección 0.3 ya vimos la parte administrativa: cómo inscribirte, las dos
formas de rendir, qué identificación llevar y cómo se reprograma. Esta lección es
lo que pasa **adentro** del examen, que es donde se gana o se pierde con el mismo
conocimiento.

Un dato que conviene tener presente: de las 65 preguntas, **solo 50 puntúan**.
Las otras 15 son de prueba, AWS las está calibrando, y no se identifican. O sea
que si te topás con una pregunta rarísima sobre algo que nunca viste, puede
perfectamente no valer nada. No es señal de que vayas mal.

### Las 48 horas previas

Lo que más rinde a esta altura es dormir, no estudiar. El examen son 90 minutos
de lectura cuidadosa, y la fatiga se paga en preguntas mal leídas, no en temas
que no sabías.

Un plan razonable para los dos últimos días: una pasada por la lección 5.1 y por
las cuatro lecciones de tablas comparativas, y nada más. **Cero temas nuevos.**
Abrir un servicio que nunca viste el día anterior no suma un punto y sí suma
ansiedad.

### El presupuesto de tiempo

Noventa minutos divididos en 65 preguntas dan **1 minuto y 23 segundos** por
pregunta. Pero no conviene gastarlos parejo: hay que dejar un resto para volver
sobre las dudosas.

Tres puntos de control para saber si vas bien sin tener que calcular:

| A los... | Deberías ir por la pregunta... |
|---|---|
| 30 minutos | ~22 |
| 60 minutos | ~44 |
| 83 minutos | 65 (y te quedan 7 para revisar) |

Y una sola regla de disciplina, que es la más importante de toda la lección: **si
a los 90 segundos no sabés, marcá la pregunta y seguí.** Quedarse cinco minutos
peleando con una pregunta difícil no cuesta esa pregunta: cuesta las tres
fáciles que no llegaste a leer al final. Y encima puede ser una de las 15 que no
puntúan.

### Cómo leer una pregunta

El formato del examen es casi siempre un escenario de dos o tres frases y
después la pregunta. La forma eficiente de leerlo es **al revés**: primero la
última frase, la que tiene el signo de pregunta, y después el escenario sabiendo
ya qué estás buscando. Si leés el escenario primero, lo vas a leer sin criterio y
lo vas a tener que leer de nuevo.

Después, buscá **el calificativo**. El mismo escenario tiene respuestas
distintas según cómo termine la pregunta:

| Si la pregunta dice | Está pidiendo |
|---|---|
| "La opción **más económica**" | El precio manda, aunque haya más trabajo operativo |
| "El **mínimo esfuerzo operativo**" | Lo administrado, aunque cueste más |
| "**Alta disponibilidad**" | Repartido en varias zonas de disponibilidad |
| "Un requisito de **cumplimiento**" | Lo que la normativa exige, no lo más práctico |

Esa palabra es la que decide entre dos opciones que las dos funcionan. Está
puesta a propósito, y es gratis encontrarla.

Un caso aparte son las preguntas de **respuesta múltiple**, que te piden elegir
dos de cinco. Son dos decisiones independientes, no una: si identificás una
correcta con seguridad, eso no te dice nada sobre cuál es la otra. Y no hay
puntaje parcial — una de dos bien vale lo mismo que ninguna. Conviene tratarlas
como dos preguntas y dedicarles el doble de tiempo.

### Descarte y adivinanza

El examen **no penaliza** las respuestas incorrectas. De esto se desprende la
regla más barata de todas: **nunca dejes una pregunta en blanco.** Una respuesta
al azar entre cuatro opciones vale 25 % de chance; una en blanco vale cero. No
hay ninguna situación en la que convenga dejarla vacía.

Para adivinar mejor que al azar, descartá **por categoría antes que por
detalle**. Si la pregunta es de almacenamiento y una opción es un servicio de
mensajería, se va sin pensarla. Suele quedar un dos contra dos en pocos
segundos.

Tres señales que delatan opciones incorrectas:

- **Los absolutos.** *Siempre*, *nunca*, *el único servicio que*. AWS casi nunca
  escribe la respuesta correcta en términos absolutos.
- **Dos opciones que dicen lo mismo con otras palabras.** Si dos son
  equivalentes, lo más probable es que ninguna sea la correcta: están ahí para
  que gastes tiempo comparándolas.
- **La opción que se pasa.** Resuelve el problema, pero de más: Enterprise cuando
  Business alcanzaba, CloudHSM cuando KMS bastaba. AWS las considera
  incorrectas.

Y sobre cambiar de respuesta: quedate con la primera intuición **salvo que
encuentres una palabra del enunciado que la contradiga**. Evidencia nueva es
razón para cambiar; haberlo pensado más, no. La mayoría de los cambios por
nervios empeoran la respuesta.

### Marcar y volver

La herramienta de marcar existe para una cosa: sacarte la pregunta de encima sin
perderla. Usala sin culpa.

Con tus 7 minutos finales no reabras todo: revisá **solo las marcadas**, y en
este orden — primero las que dejaste en blanco, que es donde hay puntos seguros
por ganar, y después las que respondiste dudando.

### Cuando te bloqueás

Va a pasar, y conviene tener decidido de antemano qué hacer, porque en el momento
no se piensa bien. Veinte segundos: soltar el mouse, respirar, marcar la
pregunta, seguir. El bloqueo no se resuelve insistiendo sobre la misma pregunta.

Y ayuda tener presente que no hace falta responder bien todo: con 70 % alcanza,
o sea que podés errar unas 15 de las 50 que cuentan y aprobar igual.

### Si no aprobás

Pasa, y no significa que haya que empezar de cero. Lo primero al día siguiente no
es volver a estudiar: es **leer el informe de resultados**.

AWS no te da la lista de preguntas que fallaste, pero sí te da algo más útil: el
desempeño **por dominio**, marcado como *needs improvement* o *meets
competency*. Ese desglose es el plan de estudio ya escrito. El número total casi
no importa; lo que importa es qué dominio quedó flojo.

Con eso, el plan concreto para la espera de 14 días:

1. **Días 1 y 2:** leer el informe y mapear cada dominio flojo a su módulo y a su
   lección de tablas comparativas. Nada de estudiar todavía.
2. **Días 3 a 7:** el dominio más flojo, completo. Lecciones y preguntas del
   módulo, no solo las tablas.
3. **Días 8 a 11:** el segundo dominio más flojo.
4. **Día 12:** rehacer el simulacro de la lección 5.2, cronometrado y de una
   sentada.
5. **Días 13 y 14:** solo lo que falló en ese simulacro.

El orden importa: rehacer el simulacro **antes** de estudiar desperdicia la única
medición limpia que te queda, porque ya conocés las preguntas y el resultado te
va a salir mejor sin que hayas aprendido nada.

### Si aprobás

La insignia digital aparece en Credly, desde donde se comparte en LinkedIn. Y el
paso siguiente natural es **Solutions Architect Associate** o **Developer
Associate**: las dos dan por sabido todo lo de este curso, así que el mejor
momento para encararlas es ahora, con el contenido fresco.

**En resumen:** el examen se gana administrando tiempo y leyendo con método, no
sabiendo más. Noventa segundos por pregunta y después marcar y seguir; leer la
pregunta antes del escenario y buscar el calificativo que decide; no dejar nunca
una en blanco porque no hay penalización; y si no sale, el informe por dominio es
el plan de estudio para los 14 días de espera.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Qué harías si te quedan 10 minutos y todavía tenés 12 preguntas
sin responder?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Responder las 12, aunque sea rápido y mal. Tenés 50
segundos cada una: alcanza para leer la pregunta, descartar por categoría y
elegir entre lo que queda. Como no hay penalización por error, 12 respuestas
apuradas valen muchísimo más que 6 bien pensadas y 6 en blanco. Lo que **no** hay
que hacer es seguir en orden con cuidado hasta que suene la campana: eso
garantiza ceros en las últimas.

**Pregunta:** Cuando dudás entre dos opciones y ya cambiaste de idea dos veces,
¿te conviene quedarte con la primera respuesta o con la última?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con la primera, **salvo que hayas encontrado algo nuevo en
el enunciado**. Si al releer descubriste una palabra que se te había pasado
—*más económico*, *interrumpible*, *cumplimiento*— no estás cambiando de idea,
estás corrigiendo con evidencia, y hay que cambiar. Pero si das vueltas sobre la
misma información, la primera intuición viene de haber estudiado y la tercera
viene de los nervios. Haber pensado más no es información nueva.

**Pregunta:** Si no aprobás, ¿qué sería lo primero que harías al día siguiente?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Leer el informe de resultados, no ponerse a estudiar. El
informe trae el desempeño **por dominio**, y eso es un plan de estudio ya hecho:
te dice cuál de los cuatro quedó flojo, que es lo único que necesitás para
decidir dónde invertir los 14 días de espera. Estudiar todo de nuevo por las
dudas es la reacción natural y la menos eficiente — si fallaste por el dominio 2,
repasar el dominio 4 no cambia nada.

## 🎯 Pistas para el examen

- Nada de esto funciona si lo decidís durante el examen. Las reglas de tiempo y
  de descarte hay que tenerlas resueltas de antes, porque bajo presión no se
  elige una estrategia: se ejecuta la que ya estaba.
- Practicá estas tácticas en el simulacro de la lección 5.2, no en el examen
  real. Marcar y volver se siente raro la primera vez, y la primera vez no
  conviene que sea cuando cuenta.
- Separá siempre dos preguntas distintas: "¿sé este tema?" y "¿entendí qué me
  están pidiendo?". Casi todo lo que se pierde sabiendo el tema se pierde en la
  segunda.
- Cuidado con tratar tu sensación durante el examen como información. Salir con
  la impresión de que te fue mal es común entre quienes aprueban, porque uno
  recuerda las dudosas y no las obvias.
