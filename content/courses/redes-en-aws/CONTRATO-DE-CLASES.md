# Contrato de clases — Redes en AWS desde cero

Este documento decide **de antemano** cómo se escribe cada clase de este curso:
los tipos de clase, sus secciones, la longitud, el tono, las reglas de dinero y
lo que está prohibido. Existe para que sesenta y ocho clases escritas en semanas
distintas se lean como una sola voz, y para que buena parte de su calidad se
compruebe con un script en lugar de a ojo.

Este contrato aplica **solo a este curso**. Los otros cursos de la plataforma
tienen el suyo, con otra estructura y otro público. No se copian secciones entre
cursos: lo único que se comparte es la maquinaria (el formato de archivo que la
app sabe renderizar y la forma del verificador).

---

## 1. Qué consigue el alumno

Al terminar, el alumno **entiende** una red en AWS en vez de reconocerla. En
concreto, puede hacer tres cosas:

- Dibujar en un papel el camino completo de un paquete, desde una máquina en su
  casa hasta un proceso dentro de una subred privada, nombrando cada pieza que
  atraviesa y por qué está ahí.
- Construir desde cero, en la consola de AWS, una red con subredes públicas y
  privadas que funcione, y explicar qué línea de qué tabla de rutas la hace
  funcionar.
- Diagnosticar por qué algo **no** conecta, por descarte y en orden, en lugar de
  tocar reglas al azar hasta que funcione.

**La promesa central del curso: cada clase responde una pregunta concreta que el
alumno ya se estaba haciendo.** No "hoy toca NAT Gateway", sino "por qué mi
servidor privado puede descargar actualizaciones pero nadie puede entrar a él".
Si una clase no se puede formular como una pregunta así, está mal planteada.

Corolario que manda sobre el temario: el curso **no es un catálogo de servicios
de red de AWS**. Un servicio entra cuando resuelve un problema que el alumno ya
siente. Por eso Transit Gateway no aparece hasta que el alumno ha sufrido los
límites del peering con sus propias manos.

## 2. A quién le hablamos y qué damos por sabido

El lector es un adulto que trabaja o quiere trabajar con AWS, y que **no entiende
redes**. Puede llevar meses usando la nube y seguir sin saber qué es una máscara
de subred. Eso no es un hueco de principiante: es lo normal, porque las redes se
aprenden en un sitio donde casi nadie estuvo.

**Se da por sabido**, y por tanto no se explica:

- Qué es una cuenta de AWS, una región y la consola web.
- Qué son, a grandes rasgos, EC2, S3 e IAM. No hace falta saber usarlos.
- Navegar por una interfaz web: buscar un servicio, rellenar un formulario,
  pulsar un botón de crear.

**No se da por sabido**, y por tanto se explica la primera vez que aparece:

- Absolutamente nada de redes. Ni IP, ni puerto, ni DNS, ni protocolo.
- La terminal y Linux. Ver la sección 11.3.
- Cualquier sigla, en el momento en que se escribe por primera vez.

Esto último es una regla dura, no una recomendación. El alumno que abandona un
curso de redes lo hace en el párrafo donde aparecieron CIDR, NAT y BGP sin
presentación.

## 3. Mapa del curso

Nueve módulos, 68 clases. El hito de cada módulo es lo que el alumno sabe hacer
al cerrarlo, no lo que leyó.

| # | Módulo | Clases | Hito al cerrarlo |
|---|---|---|---|
| 0 | Preparar el terreno | 3 | Cuenta con presupuesto y alertas, región fija, y el hábito de borrar |
| 1 | Redes sin nube | 13 | Explica el viaje de un paquete sin mencionar AWS una sola vez |
| 2 | La VPC | 11 | Una red propia, con subred pública y privada, construida y funcionando |
| 3 | Controlar el tráfico | 8 | Diagnostica un bloqueo y sabe si lo causó un grupo de seguridad o una lista de red |
| 4 | Llegar a los servicios sin internet | 7 | Una instancia sin salida a internet que lee de S3 |
| 5 | Conectar redes entre sí | 7 | Dos redes que se hablan, y sabe cuándo eso deja de escalar |
| 6 | Conectar con tu oficina | 6 | Elige entre VPN y conexión dedicada con argumentos de costo y tiempo |
| 7 | Repartir y exponer tráfico | 7 | Un balanceador repartiendo entre dos zonas, con sus comprobaciones de salud |
| 8 | Diseñar, proteger y pagar | 6 | Dimensiona una red que no se queda sin direcciones y sabe qué la encarece |

**El orden es una promesa.** Una clase solo puede usar lo que ya se enseñó en una
clase anterior. Si hace falta algo que no está, se mueve a una clase propia. Las
referencias hacia delante valen solo como aviso ("esto lo vas a ver en la 4.3"),
nunca como dependencia.

De esa promesa salen tres decisiones del temario que parecen raras y no lo son:

- **El cortafuegos con estado y sin estado se enseña en el módulo 1**, antes de
  tocar AWS. Sin esa distinción, la diferencia entre un grupo de seguridad y una
  lista de control de acceso se memoriza en vez de entenderse.
- **NAT se enseña dos veces**: como idea general en la 1.9 y como servicio de
  AWS en la 2.9. No es repetición: la primera explica el mecanismo, la segunda
  explica qué parte de ese mecanismo cuesta dinero.
- **El módulo 1 no toca la consola.** Doce clases seguidas sin AWS es mucho
  pedir, y aun así es lo correcto: quien abre la consola sin estos doce
  conceptos aprende a hacer clics, no redes.

## 4. El entorno está fijo

Para que las clases no se contradigan entre sí y la limpieza del final sea
posible, todo el curso usa los mismos valores:

| Cosa | Valor | Por qué |
|---|---|---|
| Región | `us-east-1` (Norte de Virginia) | La más barata, la que tiene todo, la de casi todos los tutoriales |
| Etiqueta obligatoria | `curso = redes-aws` | Permite encontrar y borrar todo lo del curso de una vez |
| Prefijo de nombres | `redes-` | `redes-vpc-principal`, `redes-subred-publica-a`, `redes-igw` |
| CIDR de la red principal | `10.0.0.0/16` | Ver la 2.2 |
| CIDR de la segunda red | `10.1.0.0/16` | Sin solaparse, para los módulos 5 y 6 |
| Zonas de disponibilidad | `us-east-1a` y `us-east-1b` | Dos bastan para enseñar alta disponibilidad |
| Tipo de instancia | `t3.micro` con Amazon Linux 2023 | Es la que cubre la capa gratuita |
| Acceso a las instancias | EC2 Instance Connect y Session Manager, desde el navegador | Ver la sección 11.3 |

Toda clase con consola recuerda la región en una línea, antes del primer paso.
El error número uno del que empieza es crear algo y después no encontrarlo
porque estaba mirando otra región.

Los nombres de servicio se escriben como aparecen en la consola, en inglés y con
su traducción entre paréntesis la primera vez de cada clase: *Internet Gateway*
(puerta de enlace a internet). Después, en inglés a secas. Traducirlos siempre
deja al alumno incapaz de encontrar el botón.

## 5. Reglas de dinero y de limpieza

Este curso **sí gasta dinero**, y por eso estas reglas son las menos negociables
del contrato. Un NAT Gateway olvidado cuesta unos 32 USD al mes. El alumno que
recibe esa factura abandona la nube para siempre.

### 5.1 Semáforo de costo

**Toda** clase lleva un semáforo en la cabecera. Solo hay tres estados:

| Semáforo | Qué significa |
|---|---|
| 💚 **Costo: $0** | No crea nada que facture, o lo que crea es gratis siempre (una VPC, una subred, una tabla de rutas, un grupo de seguridad, un Internet Gateway). |
| 💛 **Costo: centavos** | Menos de 0,50 USD si se siguen los pasos y se borra cuando toca. Se dice el número aproximado. |
| 🔴 **Costo: cargos reales** | Usa algo que cobra desde el primer minuto y no tiene capa gratuita: NAT Gateway, Transit Gateway, VPN, balanceadores, endpoints de interfaz, IP elástica sin asociar. |

Las clases sin consola, que son todas las de tipo A, llevan 💚 igual. Que el
semáforo esté siempre en el mismo sitio es parte de que se lea.

### 5.2 El aviso va antes, nunca después

Cada vez que un paso crea algo que factura, este bloque va **inmediatamente
antes del paso**:

```text
> ⚠️ AVISO DE COSTO — NAT Gateway
>
> Este paso crea un recurso que sí se cobra: unos 0,045 USD por hora, más
> 0,045 USD por gigabyte procesado. Son unos 32 USD al mes si se queda
> encendido.
>
> - Qué hacer: haz el lab de una sentada. Se borra en la clase 2.11.
> - Si no quieres gastar: lee el lab sin ejecutarlo. Los valores que verías
>   están en la tabla de abajo.
```

Reglas del aviso:

- **Nunca** se asume que el alumno ya sabe que algo cuesta. El aviso se repite
  en cada clase donde aparezca el servicio, aunque ya se avisara tres clases
  antes.
- Los precios se escriben como aproximados y de `us-east-1`, y la clase dice que
  se verifique el precio actual. AWS cambia precios.
- Toda clase 🔴 ofrece una alternativa sin gastar, aunque sea "lee el lab y mira
  la tabla de resultados".

### 5.3 El registro de recursos vivos

Esta es la regla propia de este curso y la que lo hace distinto de un montón de
tutoriales sueltos.

Un lab **no borra todo al terminar**. Borra lo que ya no hace falta, y deja vivo
lo que una clase posterior necesita. Para que eso no degenere en recursos
olvidados, cada clase con consola cierra con la sección `🧹 Qué se queda
encendido`, que declara cuatro cosas:

1. **Qué creaste** en esta clase.
2. **Qué se borra ahora**, en orden, porque ya cumplió su función.
3. **Qué se queda vivo**, cuánto cuesta por hora, y **en qué clase se borra**.
   El número de clase es obligatorio: "más adelante" no vale.
4. **Cómo comprobar que no quedó nada de más**, filtrando por la etiqueta
   `curso = redes-aws`.

El índice del curso mantiene la tabla maestra de ese registro: cada recurso, la
clase que lo crea y la clase que lo mata. Si una clase deja vivo un recurso 🔴,
tiene que existir una clase posterior que lo borre. **Ningún recurso sobrevive
al final del curso**: la última clase del módulo 8 es el desmontaje completo,
con la lista de comprobación por servicio.

Orden de borrado, siempre: lo que está dentro antes que lo que lo contiene.
Instancias y endpoints, después NAT Gateway e IP elástica, después subredes y
tablas de rutas, después el Internet Gateway, y la VPC al final. Una VPC no se
puede borrar con cosas adentro, y el mensaje de error de AWS no dice cuál.

### 5.4 El presupuesto es la clase 0.2

Antes de crear nada, el alumno configura un presupuesto con alertas por correo
en 1, 5 y 10 USD. Toda clase 🔴 recuerda esa alarma en una línea. Es la red de
seguridad de todo lo demás: si el registro de la 5.3 falla, la alerta avisa.

## 6. Los dos tipos de clase

| Tipo | Qué es | Cuántas | Lleva archivo |
|---|---|---|---|
| **A — Concepto** | Explica una idea. No se toca la consola. | 44 | Sí |
| **B — Concepto y consola** | Explica una idea y la construye. | 24 | Sí |

**Ante la duda, la clase es de tipo B.** Si la idea se puede ver en la consola
sin inventar un pretexto, se ve. El tipo A se reserva para dos casos:

- Fundamentos que no tienen nada que tocar todavía (todo el módulo 1).
- Servicios que no se pueden practicar de verdad: una conexión dedicada necesita
  un circuito físico y semanas de trámite, y fingir un lab de eso sería mentir.

Una clase de tipo A **nunca** se justifica por pereza ni por costo. Si el único
problema es el dinero, es una clase de tipo B con semáforo 🔴 y su alternativa
de lectura.

No hay más tipos. En concreto, no hay clases de cuestionario: ver la sección 14.

## 7. Secciones del tipo A — Concepto

Las ocho secciones, en este orden exacto, con su presupuesto de palabras para
una clase de 9 minutos:

| # | Sección | Palabras | Qué hace |
|---|---|---|---|
| 1 | `## 🎯 Qué vas a entender hoy` | ~60 | La pregunta que responde la clase, y la respuesta en una frase |
| 2 | `## 🤔 Antes de empezar` | ~80 | Tres preguntas abiertas. Ver la regla del callback, abajo |
| 3 | `## 📐 La idea` | ~400 | El cuerpo. Analogía primero, nombre técnico después |
| 4 | `## 🔬 En detalle` | ~300 | La parte que la analogía no cubre, y dónde se rompe |
| 5 | `## 🗺️ Dónde aparece esto en AWS` | ~150 | El puente. En el módulo 1 apunta hacia delante |
| 6 | `## ⚠️ No lo confundas con` | ~130 | Dos o tres pares "A contra B", en negrita |
| 7 | `## 🔁 Autoevaluación` | ~140 | Cuatro preguntas numeradas y sus respuestas |
| 8 | `## 🎒 Para pensar` | ~60 | Un reto de elaboración, sin solución |

Suman unas 1.320 palabras. Con uno o dos diagramas, el peso aterriza en la banda
de los 9 minutos. **Este tipo todavía no está calibrado con una clase real**:
ver el aviso al final de la sección 9.

**La regla del callback.** Las tres preguntas de apertura se hacen sin dar la
respuesta ahí mismo. Pero el cuerpo de la clase **tiene que retomar al menos
una**, con la fórmula "ahí está la segunda pregunta del principio" seguida de
la respuesta. Una pregunta de activación que nadie recoge deja al alumno con la
duda abierta, y eso es peor que no haberla hecho. El verificador comprueba que
la fórmula aparezca.

Sobre la sección 3, `📐 La idea`: **la analogía va primero y el nombre técnico
después, nunca al revés.** Y cada analogía que se abre se cierra en la sección 4
diciendo en qué deja de valer. Una analogía sin su límite declarado produce
alumnos seguros y equivocados, que es peor que alumnos confundidos.

El cierre se escribe con la fórmula literal **"deja de valer"**, y el
verificador la busca. No es capricho de redacción: el módulo 1 se escribió
entero y doce de sus trece clases se quedaron sin cerrar la analogía, pasando
todos los demás controles. Una regla que solo vive en la cabeza del que escribe
no se cumple.

Quedan exentas las clases de síntesis y las que continúan la analogía de otra.
La exención se declara por identificador dentro del verificador, para que sea
explícita y se vea quién la usa.

Sobre la sección 6, `⚠️ No lo confundas con`: los pares se eligen entre las cosas
que de verdad se confunden, no entre las que se parecen en el nombre. "Grupo de
seguridad contra lista de control de acceso" sí. "VPC contra VPN" no, salvo que
la clase haya dado motivos para confundirlas.

## 8. Secciones del tipo B — Concepto y consola

Las nueve secciones, en este orden exacto, con su presupuesto para 9 minutos.
Una clase de 10 minutos escala estos números un 15 %:

| # | Sección | Palabras | Qué hace |
|---|---|---|---|
| 1 | `## 🎯 Qué vas a lograr hoy` | ~70 | Lo que estará construido y funcionando al terminar |
| 2 | `## 🤔 Antes de empezar` | ~80 | Tres preguntas abiertas |
| 3 | `## 📐 La idea` | ~330 | El concepto, antes de tocar nada |
| 4 | `## 🛠️ Manos a la obra` | ~400 | Pasos numerados en la consola |
| 5 | `## ▶️ Compruébalo` | ~130 | Qué se ve exactamente si salió bien |
| 6 | `## 🧯 Si algo se rompe` | ~170 | Fallos típicos: síntoma, causa, arreglo |
| 7 | `## 🧹 Qué se queda encendido` | ~130 | El registro de la sección 5.3 |
| 8 | `## 🔁 Autoevaluación` | ~140 | Cuatro preguntas numeradas y sus respuestas |
| 9 | `## 🎒 Para pensar` | ~60 | Un reto de elaboración |

Reglas de `🛠️ Manos a la obra`:

- Empieza recordando la región en una línea de cita.
- Los pasos se numeran con `**1.**`, `**2.**` al principio de línea.
- **Cada paso dice qué hacer y qué deberías ver.** Un paso sin su resultado
  esperado deja al alumno sin saber si puede seguir.
- Las rutas de menú se escriben completas y en `código`: `VPC → Subnets → Create
  subnet`. Nunca "ve a la sección correspondiente".
- Los valores que el alumno tiene que escribir van en una tabla de dos columnas,
  no enterrados en la prosa. Son lo que más se vuelve a consultar.

Regla de `▶️ Compruébalo`: la comprobación es **observable y concreta**. "La
tabla de rutas muestra una fila `0.0.0.0/0` con destino `igw-`" vale. "Ya
tendrías internet" no vale. Cuando lo que se construyó todavía no se puede
probar con tráfico real, se dice así, y se nombra la clase donde se probará.

Regla de `🧯 Si algo se rompe`: de dos a cuatro fallos, cada uno con el síntoma
en negrita y después las líneas `Causa:` y `Arreglo:`. Solo fallos que ocurren
de verdad. Inventar fallos plausibles infla la sección y no ayuda a nadie.

## 9. Longitud y tiempo de lectura

Declarar "9 minutos" sin poder medirlo es una promesa vacía. La unidad es:

```text
peso = palabras_de_prosa + (líneas_de_bloque × 6)
```

El factor es **6**, no el 10 habitual de los cursos de programación. Este curso
casi no tiene código: sus bloques son diagramas, tablas de rutas y salidas de la
consola. Una línea de diagrama es corta y se lee de un vistazo, pero se mira con
más cuidado que una línea de prosa. Seis es el punto medio medido con la clase
piloto, no una estimación.

La banda depende del tipo, y esto salió de medir, no de estimar:

| Tipo | Unidades por minuto | Por qué |
|---|---|---|
| **A — Concepto** | 130 – 165 | Prosa conceptual sobre una idea nueva. Se lee despacio y se relee |
| **B — Concepto y consola** | 150 – 190 | Los pasos numerados se siguen con los ojos mientras se hace clic |

La diferencia no es un capricho. Una clase de tipo A dedica la mitad de sus
palabras a construir un modelo mental que el alumno no tiene. Eso se lee a otra
velocidad que "pulsa `Create` y comprueba que dice `Attached`".

Una cabecera solo puede declarar **8, 9 o 10 minutos**. En la práctica: tipo A
declara 8 o 9, tipo B declara 9 o 10.

Medición real de las dos clases piloto, como referencia para quien escriba las
demás:

| Piloto | Prosa | Bloques | Peso | Declara | Banda |
|---|---|---|---|---|---|
| 2.7, tipo B | 1.306 pal | 23 líneas | **1.444** | 9 min | 1.350 – 1.710 |
| 1.1, tipo A | 1.201 pal | 10 líneas | **1.261** | 9 min | 1.170 – 1.485 |

Las dos aterrizan cerca del centro de su banda. Apunta a esos números.

Con el módulo 1 ya escrito, el rango real de una clase de tipo A va de 990 a
1.200 palabras de prosa. De ahí sale una regla práctica para la cabecera:

| Palabras de prosa | Declara |
|---|---|
| Hasta unas 1.100 | 8 min |
| De 1.150 en adelante | 9 min |

En el hueco entre las dos, mide y decide. Una clase de 1.120 palabras cabe en
las dos bandas, y entonces manda lo honesto: si el tema es denso, 9.

Las dos obligaron a corregir algo, y conviene saber qué para no repetirlo:

- La **2.7** se escribió apuntando a 10 minutos y midió 1.444. Se bajó la
  cabecera a 9 en lugar de rellenar la clase.
- La **1.1** midió 1.122 contra un mínimo de 1.350, un 17 % por debajo. La
  causa no era la clase: era que la banda única trataba la prosa conceptual
  como si se leyera a la velocidad de unos pasos de consola. De ahí salieron
  las dos velocidades de la tabla de arriba. Después se le añadieron unas 140
  palabras que faltaban de verdad, no de relleno.

Si al medir una tanda de clases el peso cae **sistemáticamente** fuera de la
banda por poco, la banda está mal calibrada y se ajusta aquí. Lo que no vale es
rellenar para llegar.

## 10. Formato del archivo

- Nombre: `MM-CC-slug-corto.es.md`. La clase 2.7 es `02-07-internet-gateway.es.md`
  y la 2.10 es `02-10-subred-privada-con-nat.es.md`.
- El nombre del archivo, sin la extensión, es exactamente el identificador de la
  clase en el índice del curso.
- **Sin frontmatter.** El Markdown se renderiza crudo: un bloque `---` al
  principio saldría impreso en la página. El archivo empieza por `# `.
- Línea 1: `# M.C — Título de la clase`.
- Línea 2: en blanco.
- Línea 3, la cabecera:

```text
> Módulo 2 · La VPC · Clase 7 de 12 · ⏱️ 10 min de lectura · 💚 Costo: $0
```

- **Sin HTML y sin imágenes.** Ninguna de las dos cosas se renderiza. Los
  diagramas van en bloques ` ```text `, en tablas o en listas.
- **Emojis solo en los títulos `##`.** En el cuerpo se permiten exactamente dos,
  ❌ y ✅, para marcar lo que está mal y lo que está bien.
- Las clases **no nombran archivos internos del repositorio**. El alumno ve una
  página web, no este proyecto.

## 11. Diagramas, tablas y comandos

### 11.1 Diagramas

Sin imágenes, el diagrama es un bloque ` ```text ` con arte de caracteres. Dos
reglas: **máximo 20 líneas**, y toda caja lleva su etiqueta dentro, no en una
leyenda aparte. Un diagrama que necesita leyenda es dos diagramas.

Hay un diagrama recurrente, **el mapa de la red**, que se dibuja igual en todo
el curso: la VPC como marco exterior, las subredes como cajas dentro, y las
salidas en los bordes. Cuando una clase añade una pieza, redibuja el mismo mapa
con la pieza nueva marcada. Ver la pieza aparecer en un dibujo que ya se conoce
es la mitad de la explicación.

### 11.2 Tablas

De dos a cuatro columnas, nunca más: la plataforma se ve también en pantallas
estrechas. Las tablas de rutas se escriben con las mismas columnas que la
consola (`Destination`, `Target`), porque el alumno va a comparar con lo que
tiene delante.

### 11.3 Comandos

El alumno **no sabe usar una terminal**, y este curso no se la enseña. Por eso:

- Todo lo que se construye se construye en la consola web.
- Entrar a una instancia se hace con EC2 Instance Connect o Session Manager, que
  abren una terminal **en el navegador**, sin claves ni clientes.
- El curso usa **seis comandos y ni uno más**: `ping`, `curl`, `dig`,
  `traceroute`, `ip addr` y `aws s3 ls`. Son herramientas de diagnóstico, no de
  construcción.
- Cada uno se explica la primera vez que aparece: qué hace, qué devuelve cuando
  funciona y qué devuelve cuando falla. **El caso de fallo es obligatorio**: en
  un curso de redes, el comando que se queda colgado es el resultado más
  frecuente y el más informativo.
- Los bloques de comandos van con ` ```bash ` y las salidas con ` ```text `.
  Máximo 5 líneas de comando por bloque.

## 12. Cómo se redacta

- **Segunda persona del singular, tuteo** (*tienes*, *puedes*, *vas a ver*). No
  voseo: este curso es para cualquier hispanohablante, y el tuteo es el registro
  que se entiende en todas partes sin sonar ajeno.
- Frases de **20 palabras como máximo**, con un promedio por debajo de 18.
- **Cuatro términos nuevos por clase como máximo.** Si salen cinco, es que la
  clase lleva dos ideas y hay que partirla.
- **Una idea por clase.** Regla dura: si al resumir la clase en una frase salen
  dos, son dos clases.
- Ninguna sigla sin desplegar la primera vez que se escribe: *CIDR* (Classless
  Inter-Domain Routing, enrutamiento sin clases).
- **Una exclamación por sección como máximo.** En general, ninguna.
- Palabras prohibidas, porque hacen sentir torpe al que no lo entiende a la
  primera: *es fácil, simplemente, obviamente, basta con, sencillamente, como ya
  sabes, solo tienes que, no tiene ningún misterio, es trivial, es intuitivo,
  como es lógico, evidentemente*.
- Los números de clase se citan como `la 2.7`, nunca por el nombre del archivo.

## 13. Repaso espaciado y autoevaluación

Son dos cosas distintas y las dos son obligatorias.

**El repaso espaciado** vive en `🤔 Antes de empezar`. De las tres preguntas,
**una recupera algo de entre 3 y 8 clases atrás**. No se marca como repaso ni se
anuncia: es una pregunta más. Las otras dos activan lo que el alumno ya sabe de
su propia vida, no del curso.

Excepción declarada: **las clases 0.1 a 1.3 no llevan repaso espaciado**. Para
la 0.1 no hay nada por detrás, y para las siguientes lo único que hay a tres
clases de distancia son las de preparación de la cuenta. Recuperar "cómo crear
un presupuesto" mientras se explica qué es una dirección IP no enseña nada. En
esas cinco clases, las tres preguntas son de activación.

A partir de la 1.4 la regla se aplica entera, y el primer repaso espaciado de
verdad recupera la 1.1.

**La autoevaluación** vive en `🔁 Autoevaluación`, al final. Son exactamente
**cuatro preguntas numeradas**, seguidas de un párrafo que empieza por
`**Respuestas:**` con las cuatro respuestas breves. Las preguntas son de
recuperación: se contestan con lo de hoy, de memoria, sin volver a buscar.

Trampa conocida: si al ajustar el margen una respuesta empieza una línea con
`2.`, el verificador la cuenta como una quinta pregunta. Se arregla el salto de
línea, no el contador.

## 14. Este curso no tiene evaluaciones

Decisión tomada al diseñarlo: **no hay cuestionarios de módulo ni examen final.**
Ninguna clase es de tipo interactivo, todas tienen su archivo, y el curso no
necesita banco de preguntas ni guarda resultados de nadie.

Se dice aquí explícitamente para que nadie lo "arregle" más adelante añadiendo
uno. La práctica de recuperación, que es lo que un cuestionario aporta de
verdad, ya está cubierta por la autoevaluación de la sección 13: mismas
preguntas, misma función, sin nota y sin que quede registrado nada.

## 15. El verificador

`node content/courses/redes-en-aws/verificar-lecciones.mjs` comprueba lo que se
puede medir sin criterio: el nombre del archivo, el título, la cabecera con su
semáforo, que los tres digan el mismo número de clase, el peso dentro de la
banda de la sección 9, las secciones exactas y en orden según el tipo, el tope
de líneas por diagrama y por bloque de comandos, el HTML y las imágenes, los
emojis fuera de título, las palabras prohibidas, **el voseo**, las
exclamaciones, el largo de las frases, las cuatro preguntas de la autoevaluación
con su bloque de respuestas, y las referencias a archivos internos.

Comprueba además siete cosas propias de este curso: que el texto del semáforo
case con su emoji, que una clase de tipo A no lleve semáforo de pago, que una
clase 💛 o 🔴 lleve su bloque de aviso de costo (y que una 💚 no lo lleve), que
las clases con consola recuerden la región, que el registro de recursos nombre
una clase concreta donde se borra lo que queda vivo, que haya tres preguntas de
apertura y el cuerpo retome alguna, y **el orden del temario**.

Ese último merece su párrafo. El verificador lleva un glosario de término y
clase que lo define. Si una clase nombra un término de más adelante, tiene que
decir en qué clase se explica, con la fórmula "la clase 1.7". Es la única forma
automática de hacer cumplir la promesa de la sección 3. El glosario se amplía
al escribir la clase que define cada término nuevo.

Dos avisos sobre el detector de voseo. Solo busca **formas acentuadas**
(*tenés*, *podés*, *mirá*): una versión anterior marcaba *mira*, *crees* y
*haces*, que son tuteo correcto. Y *estás*, *ves* y *vas* son iguales en los dos
registros, así que no sirven como señal y no están en la lista.

Un verificador que solo se ha probado en verde no vale nada. Este se probó
contra dos archivos rotos a propósito, uno de cada tipo, confirmando que salta
cada control; después se borraron. Al añadir un control nuevo, se repite.

**Lo que el verificador no mide**: si la clase enseña una sola idea, si el lab
funciona de verdad en la consola, si el fallo listado ocurre, si el precio
sigue siendo ese y si la analogía ayuda. Eso es la sección 16.

## 16. Checklist manual

Antes de dar una clase por terminada:

- [ ] ¿La clase responde **una** pregunta concreta, y se puede enunciar?
- [ ] ¿Usa solo cosas ya enseñadas? ¿Alguna referencia hacia delante se cuela
      como dependencia?
- [ ] ¿La analogía se cierra diciendo dónde deja de valer?
- [ ] ¿Cada sigla nueva se desplegó la primera vez?
- [ ] ¿Los pasos de la consola están probados en la consola real, con los nombres
      de menú de hoy?
- [ ] ¿Cada paso dice qué deberías ver?
- [ ] ¿El precio citado se verificó en la página de precios, y se dice la fecha?
- [ ] ¿Todo recurso que factura tiene su aviso **antes** del paso?
- [ ] ¿El registro de recursos nombra la clase donde se borra lo que queda vivo?
- [ ] ¿Ese número de clase existe y esa clase lo borra de verdad?
- [ ] ¿Los fallos de `🧯 Si algo se rompe` ocurrieron de verdad al probarlo?
- [ ] ¿La pregunta de repaso espaciado apunta a una clase entre 3 y 8 atrás?
