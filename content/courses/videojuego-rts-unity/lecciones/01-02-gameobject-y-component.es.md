# 1.2 — GameObject y Component: el modelo mental

> Módulo 1 · Unity y C# para un RTS · Clase 2 de 11 · ⏱️ 8 min de lectura

## 🎯 De qué va esta clase

Unity no organiza el mundo como te enseñaron a organizar clases.

Aquí no hay una clase `Aldeano` que hereda de `Personaje` que hereda de `Ser
Vivo`. Hay cajas vacías a las que les enchufas piezas. Entender eso hoy te
ahorra pelearte con el motor durante seis módulos.

## 🧠 Antes de empezar

1. En la clase 0.7 repartiste el juego en cuatro capas. ¿Qué te hizo separar la
   simulación de la presentación?
2. Si tuvieras que modelar un aldeano, un soldado y un arquero con herencia,
   ¿dónde pondrías "puede recolectar" y "puede disparar"?
3. En la clase anterior viste que un objeto tiene forma, color y posición. ¿Las
   guardarías juntas o separadas?

## 📖 Contenido

### La caja y las piezas

Un **GameObject** es una caja. Tiene nombre, tiene padre y poco más. Por sí solo
no se ve, no se mueve y no hace nada.

Un **Component** es una pieza que enchufas a la caja y le da una capacidad. Uno
le da forma, otro la pinta, otro la mueve, otro decide cuándo atacar.

Un aldeano en pantalla no es una clase `Aldeano`. Es una caja con piezas:

| Pieza | Qué aporta |
|---|---|
| `Transform` | Dónde está, cómo está girado y de qué tamaño |
| `Mesh Filter` | Qué forma tiene |
| `Mesh Renderer` | Con qué material se dibuja |
| `Animator` | Qué animación está reproduciendo |
| `NavMesh Agent` | Cómo busca camino |
| Tu script | Qué decide hacer |

Cambiar el juego es cambiar la lista de piezas. Un soldado es la misma caja con
otras piezas, no una subclase de nada.

### Transform es obligatorio

De todas las piezas, una no se puede quitar: `Transform`.

Todo GameObject tiene posición, rotación y escala, aunque sea invisible. Es la
única pieza que Unity garantiza, y por eso tu código puede escribir
`transform.position` sin comprobar antes si existe.

También guarda la jerarquía. Cuando arrastras un objeto dentro de otro en la
ventana `Hierarchy`, lo que estás emparentando son sus `Transform`. Mover al
padre mueve a los hijos, y las posiciones de los hijos pasan a medirse desde el
padre.

Eso se usa mucho. Un edificio con una bandera encima: la bandera es hija, con
posición `(0, 4, 0)` respecto a su padre. El edificio se mueve, la bandera va
con él, y nadie tuvo que programarlo.

### Por qué composición y no herencia

La herencia obliga a decidir el árbol antes de conocer el juego. Y los juegos
cambian de opinión.

Imagina que decides que `Soldado` hereda de `Unidad`, y `Aldeano` también.
Luego quieres un aldeano que se defienda: necesita atacar. Si "atacar" vivía en
`Soldado`, ahora toca mover código de sitio. Y mover código rompe lo que ya
funcionaba.

Con piezas no hay problema. Al aldeano le enchufas el componente de combate y
ya está. Y si mañana lo quitas, lo quitas.

Hay un precio, para ser justos. Con piezas, la lógica de una unidad queda
repartida en varios sitios en lugar de en un archivo. Al depurar hay que mirar
el Inspector para saber qué piezas tiene de verdad ese objeto.

### Cómo se hablan las piezas

Si la lógica está repartida, alguna pieza tendrá que hablar con otra. El método
para eso se llama `GetComponent`, y le pides a la caja una pieza por su tipo.

Tu script de combate le pregunta a su propia caja por el `Animator` para lanzar
la animación de golpe. O por el `NavMesh Agent` para pararse antes de atacar.
Siempre es la misma idea: pregunto a mi caja qué piezas tiene.

Aquí aparece una de las señales de alarma de la clase 0.5. Buscar una pieza
cuesta tiempo, poco pero real. Hazlo en cada fotograma con doscientas unidades
en pantalla y salen cuarenta mil búsquedas por segundo. Todas para encontrar
algo que nunca cambia.

La costumbre correcta es preguntar una vez al arrancar y guardar la respuesta en
un campo. Lo verás escrito así en todos los scripts del curso, a partir del
módulo 3.

### La caja vacía también sirve

Un GameObject sin más pieza que su `Transform` parece inútil. Se usa
constantemente.

Sirve de contenedor para ordenar la jerarquía. Una caja llamada `Unidades`, con
todos los aldeanos dentro, mantiene la lista legible.

Sirve de punto de referencia. Una caja vacía en la puerta de un cuartel marca
por dónde salen las unidades nuevas. Nadie tiene que calcular esa posición.

Y sirve de ancla. La bandera del ejemplo de antes podría colgar de una caja
vacía en lugar de colgar del edificio.

Son gratis y hacen legible una escena que si no acaba con trescientos objetos
sueltos en la raíz.

### Prefabs: la caja guardada

Queda una palabra que verás en todas las clases siguientes.

Un **prefab** es un GameObject guardado como archivo, con todas sus piezas y sus
valores. Arrastras el archivo a la escena y aparece una copia montada.

Lo importante es que la copia sigue conectada al original. Cambias el prefab del
aldeano y cambian los doscientos aldeanos de la partida a la vez. Sin prefabs,
un juego con muchas unidades es inmanejable.

### Dónde encaja tu código

Tus scripts son componentes. Por eso heredan de `MonoBehaviour`, que es la
clase base que convierte un archivo de C# en una pieza enchufable.

Ahí sí hay herencia, y es la única que usarás de forma habitual en todo el
curso. Heredas de `MonoBehaviour` para poder enchufar tu clase a una caja. Entre
tus propias clases, casi siempre será mejor componer.

## 🗺️ Cómo encaja en el juego

Esto se junta con las cuatro capas de la clase 0.7 de una forma concreta.

Una unidad del juego acabará siendo una caja con piezas de capas distintas. El
`NavMesh Agent` y tu script de estados son simulación. El `Animator` y el
`Mesh Renderer` son presentación. Los datos de esa unidad, su coste y su
velocidad, vivirán fuera. En un archivo aparte que verás en la clase 1.10.

Y hay una consecuencia que aparecerá en el módulo 7. Las piezas son
independientes, así que una misma unidad puede llevar piezas distintas según la
máquina. En el servidor, la que decide. En el cliente, solo las que dibujan. La
misma caja, distinta lista de piezas.

## 🔁 Repaso relámpago

1. ¿Qué componente no se le puede quitar a un GameObject y por qué?
2. ¿Qué relación hay entre un prefab y las copias que pones en la escena?
3. ¿Por qué Unity prefiere componer piezas a heredar clases?
4. ¿Qué convierte un archivo de C# en una pieza enchufable?

**Respuestas:** 1. El `Transform`, porque todo objeto tiene posición, rotación y
escala aunque sea invisible. 2. Siguen conectadas: al cambiar el prefab cambian
todas las copias a la vez. 3. Porque el árbol de herencia hay que decidirlo
antes de conocer el juego, y los juegos cambian. 4. Heredar de `MonoBehaviour`.

## 🎒 Qué hacer hoy

Abre la escena `Partida` y selecciona el cubo `Andamio` que creaste ayer.

Mira su Inspector de arriba abajo y cuenta las piezas que tiene. Deberían ser
cuatro. Quítale el `Mesh Renderer`. Se hace con el menú de los tres puntos de ese
componente. Mira después qué pasa en la ventana `Scene`.

El cubo desaparece de la vista, pero sigue en la jerarquía y sigue ocupando
sitio. Eso es composición funcionando: quitaste la pieza de dibujar y el resto
siguió ahí. Deshaz con `Ctrl + Z` y guarda.

Si te sobra tiempo, arrastra la luz dentro del cubo en la jerarquía y mueve el
cubo. Verás que la luz viaja con él. Después deshaz eso también.
