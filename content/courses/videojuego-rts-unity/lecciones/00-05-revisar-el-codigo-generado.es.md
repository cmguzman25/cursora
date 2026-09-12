# 0.5 — Revisar el código que escribe Claude Code

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 5 de 8 · ⏱️ 8 min de lectura

## 🎯 De qué va esta clase

Aceptar código sin mirarlo es la forma más rápida de acabar con un juego que no
entiendes.

Esta clase te da cuatro controles concretos para revisar lo que te devuelva.
También una lista de señales de alarma propias de Unity. No hace falta ser
experto para aplicarlos. Hace falta acordarse.

## 🧠 Antes de empezar

1. En la clase 0.2 instalaste una versión concreta de Unity. ¿Qué problema
   podría dar un código escrito pensando en otra versión?
2. Si un código compila sin errores, ¿significa que está bien?
3. ¿Cómo distinguirías un código lento de uno rápido sin medir nada?

## 📖 Contenido

### Por qué hay que revisarlo

Claude Code conoce Unity muy bien. Aun así, hay tres cosas que se le escapan y
conviene conocerlas.

La primera son las **versiones**. Unity lleva veinte años y ha cambiado de
opinión varias veces sobre cómo hacer lo mismo. Hay tres formas distintas de
leer el teclado y dos de buscar objetos. Si no le dices cuál usas, puede elegir
la de hace ocho años.

La segunda es el **rendimiento**. Un código puede ser correcto y aun así
hundirte el juego cuando haya cien unidades en pantalla. Compila igual, se ve
igual con una unidad, y va a tirones con cien.

La tercera es tu **proyecto**. Imagina que decidiste llevar los datos de tus
unidades de una forma concreta. No lo sabrá, salvo que se lo digas o ya esté
escrito en el código que lee.

Ninguna de las tres es un fallo de la herramienta. Son cosas que dependen de tu
proyecto, y el proyecto lo conoces tú.

### Los cuatro controles

Aplícalos en este orden, de más rápido a más lento:

| Control | Pregunta | Cuánto cuesta |
|---|---|---|
| 1 | ¿Compila sin errores ni avisos? | Segundos |
| 2 | ¿Usa APIs que existen en Unity 6.3? | Un vistazo |
| 3 | ¿Respeta las reglas de tu proyecto? | Un vistazo |
| 4 | ¿Entiendo qué hace cada línea? | Minutos |

El cuarto es el que la gente se salta, y es el único que importa de verdad. Los
otros tres los puede hacer una máquina. Ese no.

### Señales de alarma en Unity

Hay patrones que casi siempre indican un problema. Estos cinco cubren la
mayoría de los casos que verás en el curso:

- **`GetComponent` dentro de `Update`.** Busca el componente sesenta veces por
  segundo cuando bastaba buscarlo una vez al arrancar.
- **`FindObjectOfType`.** Doble aviso: recorre la escena entera, y además está
  obsoleto en Unity 6. El relevo es `FindAnyObjectByType`, y solo al arrancar.
- **Movimiento sin `Time.deltaTime`.** El juego irá a distinta velocidad en cada
  ordenador.
- **`new` dentro de un bucle que corre cada fotograma.** Genera basura que el
  recolector tendrá que limpiar, y eso produce tirones.
- **Un método `Update` vacío.** Unity lo llama igualmente y cuesta rendimiento
  a cambio de nada.

No hace falta que te los aprendas hoy. Vuelve a esta lista cuando revises.

Los tres primeros son fáciles de ver a simple vista, y los verás mucho. Los dos
últimos requieren fijarse un poco más. Todos tienen algo en común: el código
funciona igual con un objeto en escena y se hunde con doscientos.

Ese detalle explica por qué el rendimiento se escapa tan a menudo. Durante los
módulos 1 y 2 tendrás pocos objetos en pantalla y todo irá fino. El primer
aviso serio llegará en el módulo 3, con un grupo de unidades moviéndose a la
vez.

### Lo que no es una señal de alarma

Conviene decir también lo contrario, porque se confunde.

Que el código sea distinto del que habrías escrito tú no es un problema. Que
use un nombre de variable que no te gusta, tampoco. Que resuelva algo con tres
líneas donde tú habrías puesto seis, mucho menos.

Revisar no es imponer tu estilo. Es comprobar que funciona, que encaja con el
proyecto y que lo entiendes.

### Qué hacer cuando algo no cuadra

Tienes tres salidas, y ninguna es pegar el código y cruzar los dedos.

La primera es **preguntar**. "¿Por qué usas `GetComponent` dentro de `Update`
aquí?" es una pregunta legítima. A menudo la respuesta es que no hacía falta.

La segunda es **pedir la alternativa**. "Guarda la referencia en `Awake` y
reutilízala." Dile qué quieres, no solo que algo te chirría.

La tercera es **escribirlo tú**. Si el trozo es corto y ya sabes cómo va, sale
antes a mano que explicando.

Una advertencia sobre la primera. Cuando preguntes por qué hizo algo, a veces
cambiará de opinión y te dará otra versión. Eso no significa que la primera
estuviera mal, ni que la segunda esté bien. Significa que la decisión sigue
siendo tuya, y que preguntar no te libra de elegir.

### El límite

Hay una sola regla que no admite excepciones en todo el curso.

**Nunca pegues código que no entiendes.**

No es una cuestión de orgullo. Es que dentro de tres semanas ese código va a
fallar, y vas a tener que arreglarlo tú. Si no sabías qué hacía cuando lo
pegaste, tampoco lo sabrás cuando se rompa.

Y hay un aviso de fondo. Es cómodo avanzar rápido aceptando todo, y se nota
poco al principio. Se nota mucho en el módulo 5, cuando algo falle en un
sistema que nunca leíste.

## 🗺️ Cómo encaja en el juego

Cada clase de construcción trae una sección con el encargo ya escrito. Justo
debajo, qué revisar de la respuesta. Eso no es decoración: es esta clase
aplicada al caso concreto.

Las señales de alarma reaparecerán con nombre propio. En el módulo 3, cuando
tengas cincuenta unidades buscando camino a la vez. En el módulo 5, cuando cada
soldado busque enemigos a su alrededor.

Y en el módulo 7 se añade una pregunta nueva. Un código correcto ya no es
suficiente. Hay que saber en qué máquina se ejecuta. En una partida en red, no
todas las máquinas merecen la misma confianza.

Ahí verás el caso más claro de todo el curso. Un código que valida el precio de
un edificio puede estar perfectamente escrito y ser, aun así, un agujero. Solo
por ejecutarse en el sitio equivocado.

## 🔁 Repaso relámpago

1. ¿Cuál de los cuatro controles no puede hacer una máquina por ti?
2. ¿Por qué `GetComponent` dentro de `Update` es mala señal?
3. Un código compila sin errores. ¿Qué te garantiza eso?
4. ¿Qué haces si no entiendes una línea de la respuesta?

**Respuestas:** 1. El cuarto, entender qué hace cada línea. 2. Porque repite
sesenta veces por segundo una búsqueda que bastaba hacer una vez. 3. Solo que la
compilador lo acepta; ni que sea correcto, ni que sea rápido. 4. Preguntar qué
hace, y no pegarla hasta entenderla.

## 🎒 Qué hacer hoy

Haz una prueba que va a resultar reveladora.

Pídele a Claude Code un script de Unity que haga girar un cubo sobre sí mismo.
No le des ninguna indicación más. Después pásale los cuatro controles a la
respuesta, uno por uno, con la lista de señales delante.

Fíjate sobre todo en dos cosas. Si usó `Time.deltaTime`. Y si la velocidad quedó
a la vista en el Inspector o escondida en el código.

Después vuelve a pedírselo, ahora diciéndole esas dos cosas. Compara las dos
respuestas. Esa diferencia es todo lo que enseña la clase de hoy.
