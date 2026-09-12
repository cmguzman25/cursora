# 0.1 — Qué vas a construir

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 1 de 8 · ⏱️ 8 min de lectura

## 🎯 De qué va esta clase

Antes de instalar nada, conviene saber a dónde vas.

Esta clase describe el juego que tendrás al final, las piezas que lo forman y
el camino para llegar. Hoy no tocas el ordenador. Al terminar sabrás qué
construyes, en qué orden y con qué herramienta.

## 🧠 Antes de empezar

Tres preguntas para pensar. No hace falta que las respondas por escrito.

1. Cuando mueves veinte unidades a la vez en un juego de estrategia, ¿cuántas
   decisiones crees que toma el ordenador cada segundo?
2. Le dices a un aldeano que corte madera. Se va solo, corta, vuelve y
   deposita. ¿Cuántas órdenes le has dado tú en realidad?
3. De todo lo que hace un juego así, ¿qué te parece más difícil: el arte, la
   inteligencia del enemigo o que nada vaya lento?

## 📖 Contenido

### Una partida, contada

Arrancas el juego. Ves un mapa verde desde arriba, en ángulo. Mueves la cámara
con el teclado y con el borde de la pantalla. Tienes un centro urbano y tres
aldeanos.

Arrastras un recuadro sobre los tres y haces clic derecho en un bosque. Los
aldeanos caminan hasta allí, esquivándose entre ellos, y empiezan a talar. Cada
poco vuelven al centro urbano y descargan la madera. El contador de arriba sube
solo.

Con esa madera colocas una casa sobre el terreno. Aparece una silueta que sigue
al ratón y se pone roja donde no cabe. Confirmas, un aldeano va y la construye
poco a poco. Ahora puedes entrenar más gente.

Al otro lado del mapa, oculto por la niebla, un rival hace lo mismo sin que se
lo digas. Cuando sus soldados aparezcan, los tuyos tendrán que estar listos.

Ese es el juego. Y al final del curso podrás jugar esa misma partida contra una
persona de verdad, por internet.

Nada de lo que acabas de leer viene hecho. El terreno, la cámara, el aldeano que
camina, el árbol que cae, la silueta roja de la casa. Todo eso lo construyes tú.
Y el aldeano que ves en pantalla lo habrás modelado y animado en Blender con tus
propias manos.

### Las piezas que hay debajo

Un juego así parece una sola cosa, pero son once sistemas que se hablan entre
ellos:

| Sistema | Qué resuelve |
|---|---|
| Cámara | Recorrer el mapa sin marearse |
| Selección | Decirle al juego de qué unidades hablas |
| Movimiento | Ir de A a B rodeando obstáculos y sin pisarse |
| Economía | Recursos que se recogen, se guardan y se gastan |
| Construcción | Colocar edificios en sitios válidos y levantarlos |
| Producción | Colas de entrenamiento, coste y límite de población |
| Combate | Alcance, daño, muerte y proyectiles |
| Niebla de guerra | Que cada jugador vea solo lo suyo |
| Enemigo | Un rival que decide por su cuenta |
| Interfaz | Recursos, minimapa, paneles y menús |
| Red | Dos personas jugando la misma partida |

Ninguno es muy difícil por separado. La dificultad está en que convivan.

### La ruta: ocho módulos

El curso avanza por capas. Cada módulo deja el juego un poco más completo, y
cada uno cierra con algo que puedes enseñar:

| Módulo | Qué añade | Con qué acaba |
|---|---|---|
| 0 | Preparación y forma de trabajar | Proyecto listo y decisiones tomadas |
| 1 | Unity y C# | Terreno con cámara de estrategia |
| 2 | Blender | Tu propio arte dentro del juego |
| 3 | Unidades | Seleccionas, mandas y caminan |
| 4 | Economía | Recolectan, construyes, produces |
| 5 | Combate e IA | Partida completa contra un bot |
| 6 | Interfaz y pulido | Juego terminado de un jugador |
| 7 | Multijugador | Partida 1v1 por internet |

### Tres herramientas, tres trabajos

| Herramienta | Su trabajo | Lo que no hace |
|---|---|---|
| Unity | Motor: escena, física, render, código | No modela |
| Blender | Modelar, texturizar y animar el arte | No juega |
| Claude Code | Escribir código a tu dictado | No decide el diseño |

El reparto importa. Unity y Blender hacen cosas distintas y se comunican por
archivos. Claude Code no es una cuarta pata del juego: es quien teclea rápido
mientras tú decides.

### Qué hace falta traer

Saber programar en algún lenguaje. Con eso basta.

No hace falta C#, ni haber abierto Unity, ni saber dibujar. Tampoco hace falta
un ordenador potente: el juego es de baja poligonización y cabe de sobra en un
portátil normal.

Sí se da por sabido lo que ya sabes de programar. Variables, bucles, funciones
y clases no se explican en ninguna clase. Sí se explica todo lo que Unity hace
distinto, que es bastante.

Sobre el tiempo: cada clase se lee en diez minutos, pero hacerla lleva entre
media hora y una hora. Son 94 clases. A dos por semana, el curso entero ronda
los once meses; a cuatro por semana, los seis. Ir más rápido suele salir caro,
porque cada módulo se apoya en el anterior.

### Cómo son las clases

Cada clase es una lectura de ocho a diez minutos y enseña **una sola idea**.

Cuatro reglas que se cumplen siempre:

- Al terminar la clase, el juego compila y se puede ejecutar.
- Cada paso dice exactamente dónde tocar y qué escribir.
- Antes de acabar compruebas en pantalla que salió bien.
- Los fallos habituales vienen listados con su arreglo.

No hay clases de relleno. Si algo aparece, es porque el juego lo necesita.

Cuatro de cada cinco clases son de construcción: abres el proyecto y algo cambia.
Las demás son de concepto, y se leen sin tocar nada. Aparecen justo antes de
algo difícil, para que llegues entendiendo en vez de copiando.

Cada módulo termina con un cuestionario. No es un examen: sirve para que veas
qué se te quedó y qué conviene releer antes de seguir. Las preguntas van sobre
decisiones y averías, no sobre dónde estaba un botón.

## 🗺️ Cómo encaja en el juego

Hay un hilo que sostiene todo el curso: **nunca dejas el proyecto roto**.

Eso cambia cómo se construye. En lugar de escribir el sistema de combate entero
y probarlo al final, lo partimos en trozos que funcionan solos. Primero las
unidades se pegan sin animación. Después se les pone la animación. Después
mueren. Cada paso se ve en pantalla.

Esa forma de avanzar tiene un premio escondido. Cuando algo se rompe, la culpa
está en lo último que tocaste. Eso son diez minutos de trabajo, no tres semanas
buscando a ciegas.

## 🔁 Repaso relámpago

1. ¿Cuántos sistemas distintos conviven en el juego que vas a construir?
2. ¿Qué herramienta se encarga del arte y cuál del motor?
3. ¿Qué decisión no se delega nunca en Claude Code?
4. ¿Qué tiene que pasar al terminar cada clase, sin excepción?

**Respuestas:** 1. Once, y la dificultad está en que convivan, no en cada uno por
separado. 2. Blender modela, texturiza y anima; Unity ejecuta el juego. 3. El
diseño: qué hace el juego y con qué números. 4. El proyecto compila y el juego
se puede ejecutar.

## 🎒 Qué hacer hoy

Ponle nombre a tu juego. Va a ser el nombre de la carpeta durante meses, así
que elige uno corto y sin espacios.

Después escribe en una frase qué quieres que tenga el tuyo y no tengan los
demás. Puede ser una civilización rara, un recurso que no existe en otros
juegos o un mapa con nieve. Guárdala donde no la pierdas.

Y responde por escrito a la tercera pregunta del principio. Al acabar el curso
te va a dar risa lo que contestaste.
