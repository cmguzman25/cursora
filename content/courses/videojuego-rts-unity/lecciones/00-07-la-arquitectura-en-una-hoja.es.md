# 0.7 — La arquitectura del juego en una hoja

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 7 de 8 · ⏱️ 8 min de lectura

## 🎯 De qué va esta clase

Esta es la clase que decide cómo será el resto del curso.

Vas a ver las cuatro capas en las que se reparte el juego. También quién puede
hablar con quién y por qué. Es poco código y mucha decisión. Y es lo que hará
que en el módulo 7 puedas poner el juego en red sin reescribirlo entero.

## 🧠 Antes de empezar

1. En la clase 0.4 escribiste cuatro carpetas de scripts en las reglas del
   proyecto. ¿Recuerdas qué guardaba cada una?
2. Cuando haces clic derecho en el suelo, ¿quién debería decidir si la unidad
   puede ir ahí: el ratón o el juego?
3. En una partida por internet, si tu ordenador decidiera cuánta vida le queda
   a tu soldado, ¿qué podría salir mal?

## 📖 Contenido

### Las cuatro capas

Un juego de estrategia hace muchas cosas a la vez. Repartirlas en capas evita
que se conviertan en una madeja.

| Capa | Qué hace | Ejemplo |
|---|---|---|
| Datos | Define qué existe y con qué números | El aldeano cuesta 50 de comida |
| Simulación | Aplica las reglas y cambia el estado | El aldeano talla y la madera sube |
| Presentación | Dibuja, anima y suena | El aldeano mueve el hacha |
| Entrada | Traduce teclado y ratón en intenciones | Clic derecho en el bosque |

La regla que las ordena es de sentido único:

```text
Entrada  ──órdenes──►  Simulación  ──estado──►  Presentación
                            ▲
                            │ lee
                          Datos
```

La entrada nunca dibuja. La presentación nunca decide. Los datos no hacen nada:
solo se dejan leer.

### La regla que lo sostiene todo

De ahí sale una frase que vas a leer muchas veces en este curso:

**La entrada emite órdenes, la simulación decide, la presentación solo dibuja.**

Mira lo que significa en un caso concreto. Haces clic derecho sobre un bosque
con un aldeano seleccionado. Lo natural sería escribir, ahí mismo, el código
que mueve al aldeano.

No lo haremos. En su lugar, la capa de entrada crea una orden: "el aldeano 7
debe ir a recolectar al árbol 132". Esa orden llega a la simulación, que decide
si es posible y la ejecuta. La presentación se entera después y pone la
animación de caminar.

Parece un rodeo. Son tres ventajas.

La primera es que puedes **probar sin ratón**. Si las órdenes son datos, puedes
fabricarlas desde código y comprobar que la simulación hace lo suyo.

La segunda es que el **enemigo sale gratis**. El bot del módulo 5 no necesita un
ratón falso. Emite las mismas órdenes que tú, por otro camino.

La tercera es la que importa de verdad: en el módulo 7, **esas órdenes viajan
por la red tal cual**. Un clic no se puede enviar por internet. Una orden sí.

### Cada cosa tiene dueño

Hay una segunda decisión, más pequeña y con las mismas consecuencias.

Toda unidad y todo edificio llevan un número de jugador desde el principio.
Jugador 0 eres tú, jugador 1 es el rival. Aunque durante cinco módulos no haya
rival, el campo está ahí.

Sin ese número, todo lo que preguntes al juego tiene una respuesta ambigua.
¿Cuánta madera hay? ¿De quién? ¿Qué se ve en el mapa? ¿Para quién? La niebla de
guerra del módulo 5 se calcula por jugador justo por esto.

### La pregunta de control

Cuando dudes de dónde poner algo, hazte esta pregunta:

**¿Esto seguiría funcionando si el que manda estuviera en otro ordenador?**

Si la respuesta es no, lo estás poniendo en la capa equivocada. Es la misma
pregunta que aparecerá en el módulo 7. Y allí ya no será una duda de diseño,
sino un error.

Un ejemplo de los que pasan de verdad. El panel de recursos de arriba muestra
cuánta madera tienes. Es tentador que ese panel, además, decida si puedes pagar
una casa: ya tiene el número delante.

No puede. En una partida en red, ese panel vive en el ordenador del jugador. Y
un jugador no decide si puede pagar: lo decide quien lleva la cuenta. El panel
enseña el número y nada más.

### Lo que esto te va a costar

Conviene ser honesto. Esta forma de repartir el trabajo tiene un precio, y lo
vas a pagar en el módulo 3.

Mover una unidad al hacer clic serían diez líneas escritas del tirón. Con capas
son tres piezas. La entrada crea la orden, la simulación la ejecuta y la
presentación la anima. Más archivos y más nombres que recordar.

La factura llega de golpe y pronto. Los beneficios aparecen más tarde. El bot
del módulo 5 reutilizará las mismas órdenes sin tocar nada. Y el módulo 7 las
mandará por la red igual que están.

Lo digo ahora para que no te sorprenda. Puede que en el módulo 3 te parezca
mucha ceremonia para mover un aldeano. Es exactamente esto, y es a propósito.

Tampoco conviene exagerarlo. Cuatro capas son suficientes para un juego de este
tamaño, y el curso no añade ninguna más. Ante la duda, aplica este criterio.
Respeta la separación cuando afecte a quién decide algo. Para lo demás, escribe
lo más sencillo que funcione.

## 🗺️ Cómo encaja en el juego

Las capas se corresponden con carpetas. Esas carpetas ya están escritas en las
reglas de tu proyecto desde la clase 0.4.

| Carpeta | Qué vive ahí | Se llena en |
|---|---|---|
| `Assets/Scripts/Data` | Datos de unidades, edificios y recursos | Módulos 1 y 4 |
| `Assets/Scripts/Simulation` | Movimiento, economía, combate, IA | Módulos 3, 4 y 5 |
| `Assets/Scripts/Presentation` | Animación, efectos, sonido | Módulos 2, 3 y 6 |
| `Assets/Scripts/Input` | Cámara, selección, órdenes del ratón | Módulos 1 y 3 |

Hay una carpeta que no está en la lista. En el módulo 7 aparecerá
`Assets/Scripts/Network`, y será la única que se añada en todo el curso. Que
quepa sin mover nada de lo demás es la prueba de que esta clase sirvió.

## 🔁 Repaso relámpago

1. ¿Cuáles son las cuatro capas y en qué orden se hablan?
2. ¿Por qué el clic derecho no mueve directamente a la unidad?
3. ¿Para qué sirve el número de jugador antes de que exista un rival?
4. ¿Qué pregunta te haces cuando dudas dónde colocar un script?

**Respuestas:** 1. Datos, simulación, presentación y entrada; la entrada manda
órdenes a la simulación, y la presentación lee el estado. 2. Porque una orden la
puede emitir también el bot y viaja por la red; un clic, no. 3. Para que toda
pregunta sobre recursos o visión tenga un dueño claro. 4. Si seguiría
funcionando con el que manda en otro ordenador.

## 🎒 Qué hacer hoy

Crea las cuatro carpetas dentro de `Assets/Scripts`, aunque estén vacías: `Data`,
`Simulation`, `Presentation` e `Input`. Una carpeta que existe se respeta más
que una carpeta descrita.

Después coge papel y dibuja el esquema de las tres flechas de memoria, sin mirar.
Es un dibujo de treinta segundos y vas a consultarlo durante meses.

Y haz un último ejercicio mental. Piensa dónde pondrías el sonido que suena al
seleccionar una unidad. Si dudaste entre entrada y presentación, la clase ha
funcionado: la respuesta es presentación, porque un sonido no decide nada.
