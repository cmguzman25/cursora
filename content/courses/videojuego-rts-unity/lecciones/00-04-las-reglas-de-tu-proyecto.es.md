# 0.4 — Las reglas de tu proyecto

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 4 de 8 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a escribir el archivo de reglas que Claude Code lee al arrancar.

Al terminar, tu proyecto tendrá un documento con la versión de Unity, las
carpetas y las convenciones de nombres. También con lo que está prohibido.
Desde hoy no tendrás que repetir esas cosas en cada encargo.

## 🧠 Antes de empezar

1. En la clase 0.1 viste que el juego final tiene once sistemas conviviendo.
   ¿Qué pasaría si cada uno se escribiera con convenciones distintas?
2. Si contratas a alguien nuevo en un equipo, ¿qué le cuentas antes de darle la
   primera tarea?
3. ¿Por qué crees que una regla como "no toques la carpeta `Library`" vale más
   escrita que dicha?

## 📐 La idea

Claude Code busca un archivo llamado `CLAUDE.md` en la raíz del proyecto y lo
lee antes de cualquier cosa. Todo lo que pongas ahí vale para todas las
sesiones, sin repetirlo.

Es el equivalente a la charla que le darías a alguien que entra en tu equipo.
No le explicas todo el juego. Le dices cuatro cosas que no puede adivinar
mirando el código.

Un buen archivo de reglas responde a cuatro preguntas:

| Pregunta | Ejemplo de respuesta |
|---|---|
| ¿Con qué trabajamos? | Unity 6.3 LTS, C#, Input System |
| ¿Dónde va cada cosa? | Los scripts de unidades en `Assets/Scripts/Units` |
| ¿Cómo se nombra? | Clases en PascalCase, campos privados con `_` |
| ¿Qué está prohibido? | Tocar `Library`, inventar APIs, usar el Input viejo |

La parte de las prohibiciones es la que más rinde. Un modelo que conoce Unity
conoce también diez formas de hacer lo mismo, y algunas están desfasadas.
Decirle cuál usas evita la mitad de las correcciones.

Una advertencia. Este archivo no es un manual: es una tarjeta de referencia. Si
crece hasta doscientas líneas, deja de leerse con atención. Mantenlo por debajo
de cuarenta.

Tampoco nace terminado. El de hoy es un punto de partida razonable, y va a
cambiar. Cada vez que corrijas lo mismo por segunda vez, esa corrección merece
una línea aquí. Es la señal más clara de que falta una regla.

Al revés también vale. Una regla que nunca se incumple probablemente sobra, y
está gastando espacio en un archivo que quieres corto.

## 🛠️ Manos a la obra

**1.** Abre la carpeta raíz de tu proyecto, la que contiene `Assets` y
`ProjectSettings`.

**2.** Crea ahí un archivo de texto llamado `CLAUDE.md`. En la raíz, no dentro
de `Assets`. Unity generaría un archivo `.meta` acompañante que no hace falta.

Si usas el explorador de Windows, vigila que no te añada `.txt` al final. Con
las extensiones ocultas, un archivo llamado `CLAUDE.md.txt` se ve exactamente
igual que uno correcto.

**3.** Pega este contenido y ajusta el nombre del juego.

Un aviso sobre la sección de estructura. Esas cuatro carpetas separan el código
por responsabilidad. Salen de una decisión de diseño que se explica entera en la
clase 0.7. Hoy las dejas escritas y poco más. Sus nombres se entienden solos, y
allí verás por qué son justo esas cuatro.

`CLAUDE.md`

```text
# Reglas del proyecto

Juego de estrategia en tiempo real, estilo Age of Empires.

## Entorno
- Unity 6.3 LTS (6000.3). No propongas APIs de versiones anteriores.
- Entrada: paquete Input System. Nunca la clase Input antigua.
- Blender 5.2 LTS para el arte.

## Estructura
- Assets/Scripts/Data: ScriptableObjects y datos del juego.
- Assets/Scripts/Simulation: reglas del juego. No conoce la interfaz.
- Assets/Scripts/Presentation: animación, sonido, efectos.
- Assets/Scripts/Input: lectura de teclado y ratón.

## Convenciones
- Clases y métodos en PascalCase; campos privados con guion bajo delante.
- Campos visibles en el Inspector con [SerializeField], nunca públicos.
- Nada de GetComponent dentro de Update: guarda la referencia en Awake.
- FindObjectOfType está obsoleto en Unity 6. Usa FindAnyObjectByType, y solo
  al arrancar.
- Todo movimiento se multiplica por Time.deltaTime.

## Prohibido
- Tocar Library, Temp, obj ni Build: son carpetas generadas.
- Inventar métodos. Si no existe en Unity 6.3, dilo en vez de suponerlo.
- Decidir valores de juego (vida, coste, velocidad). Eso lo decido yo.
```

**4.** Guarda el archivo y léelo entero una vez. A partir de ahora se aplica a
todo lo que escribas con ayuda. Conviene que estés de acuerdo con lo que dice
antes de que empiece a mandar.

## 🤖 Pídelo a Claude Code

Cierra la sesión si la tenías abierta y abre una nueva, para que lea el archivo
recién creado. Después pídele esto:

```text
Lee las reglas del proyecto y resúmelas en cinco puntos. Después dime qué
carpeta de scripts le tocaría a un script que lee el clic derecho del ratón, y
por qué. No crees ningún archivo.
```

Comprueba dos cosas en su respuesta. Que el resumen menciona la prohibición de
la clase `Input` antigua, porque eso demuestra que leyó el archivo entero. Y que
coloca el script en `Assets/Scripts/Input`, no en cualquier sitio.

Lo que no se delega: qué reglas van en el archivo. Son tus reglas y describen
cómo quieres que sea tu proyecto.

## ▶️ Compruébalo

Arranca Claude Code en la carpeta del proyecto. Al iniciar la sesión debe
indicar que ha cargado el archivo de reglas.

La prueba de verdad es otra. Pídele un script de ejemplo con un campo visible en
el Inspector. Si escribe `[SerializeField] private float speed;` en lugar de
`public float speed;`, las reglas están funcionando.

Si escribe el campo público, revisa dos cosas. Que el archivo está en la raíz
del proyecto. Y que se llama exactamente `CLAUDE.md`, sin extensión de más.

## 🧯 Si algo se rompe

**Claude Code no menciona el archivo al arrancar.**
Causa: el archivo está en otra carpeta, o el nombre lleva otra extensión.
Arreglo: comprueba que está junto a `Assets` y que no se llama `CLAUDE.md.txt`.

**Ignora las reglas a mitad de una sesión larga.**
Causa: la conversación se ha alargado mucho y las reglas quedaron atrás.
Arreglo: recuérdaselo en el propio encargo con una frase corta.

**Unity crea un archivo `.meta` junto a las reglas.**
Causa: guardaste el archivo dentro de `Assets`.
Arreglo: muévelo a la raíz del proyecto y borra el `.meta` que sobra.

**Las reglas se contradicen entre sí.**
Causa: fuiste añadiendo líneas sin releer las de arriba.
Arreglo: léelo entero cada vez que lo amplíes. Por eso se mantiene corto.

**Respeta las convenciones pero coloca los scripts donde quiere.**
Causa: la sección de estructura describe carpetas que todavía no existen.
Arreglo: créalas vacías dentro de `Assets/Scripts`. Una carpeta que existe pesa
más que una carpeta descrita. En la clase 0.7 las crearás todas de golpe.

## 🔁 Repaso relámpago

1. ¿Dónde tiene que estar el archivo de reglas para que se lea?
2. ¿Cuál de las cuatro secciones ahorra más correcciones, y por qué?
3. ¿Qué pasa si el archivo crece hasta doscientas líneas?
4. ¿Qué comprobarías para saber si las reglas se están aplicando de verdad?

**Respuestas:** 1. En la raíz del proyecto, junto a `Assets`. 2. La de
prohibiciones, porque descarta las formas desfasadas de hacer lo mismo. 3. Deja
de leerse con atención y las reglas empiezan a incumplirse. 4. Pedir un script
de ejemplo y ver si respeta las convenciones, como usar `[SerializeField]`.

## 🎒 Tu turno

Añade una regla propia al archivo.

Piensa en algo que te moleste de cómo escriben otros el código. Comentarios
obvios, nombres de una letra, archivos de trescientas líneas. Escríbelo como
prohibición, en una línea, dentro de la sección que le toque.

Después pídele un script cualquiera y mira si la respeta. Si no la respeta, casi
siempre es que la regla estaba escrita de forma ambigua. Reescríbela más
concreta y vuelve a probar.
