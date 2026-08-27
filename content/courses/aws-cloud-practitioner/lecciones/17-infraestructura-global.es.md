# 3.2 — Infraestructura global de AWS

> Dominio 3 · Task Statement 3.2 — Define the AWS global infrastructure

## 🤔 Antes de empezar

- Si tuvieras una cadena de locales en varios países, ¿guardarías toda la mercadería en un único depósito?
- ¿Qué pasaría si ese único depósito se inunda?
- Si un cliente en Japón entra a tu sitio y el servidor está en Brasil, ¿qué creés que notaría?

## 📘 Contenido

En la lección 1.1 vimos que uno de los beneficios de AWS es "alcanzar el
mundo entero en minutos". Ahora vemos **cómo está armado por dentro** eso que
lo hace posible. Es de los temas que más se preguntan del módulo.

### Regiones: los depósitos repartidos por el mundo

Una **Región** es una zona geográfica del mundo donde AWS tiene
infraestructura: San Pablo, Virginia, Irlanda, Tokio. Cada Región es
**independiente de las demás**: tus datos no se mueven de una a otra salvo que
vos lo pidas expresamente.

Cuando creás algo en AWS, elegís en qué Región va. Y esa elección se hace
mirando cuatro cosas:

- **Cumplimiento de normas.** Si una ley exige que los datos no salgan del
  país, la Región queda determinada por eso y no hay más que discutir.
- **Cercanía a los usuarios.** Cuanto más cerca esté el servidor, más rápido
  responde. Esa demora se llama **latencia**.
- **Servicios disponibles.** No todos los servicios de AWS existen en todas
  las Regiones; los más nuevos suelen aparecer primero en unas pocas.
- **Precio.** El mismo servicio puede costar distinto según la Región.

Ese orden no es casual: si hay una obligación legal, manda sobre todo lo demás.

### Zonas de disponibilidad: varios depósitos por ciudad

Acá está la pregunta que abrimos al principio: ¿qué pasa si el único depósito
se inunda?

Por eso cada Región está formada por varias **Zonas de disponibilidad**
(*Availability Zones*, o AZ). Cada zona es uno o más centros de datos con su
propia electricidad, su propia refrigeración y su propia red, **físicamente
separados** entre sí —a kilómetros de distancia— pero conectados con enlaces
muy rápidos.

La idea es simple: están lo bastante lejos como para que un incendio, una
inundación o un corte de luz no afecte a dos a la vez, y lo bastante cerca
como para trabajar juntas sin demora perceptible.

Si tu aplicación corre en **una sola zona** y esa zona se cae, tu aplicación
se cae. Si la repartís en **dos o más zonas**, sigue funcionando. Esa frase
resume la respuesta correcta de muchísimas preguntas del examen:

> **Alta disponibilidad = repartir en varias Zonas de disponibilidad.**

### Ubicaciones de borde: el kiosco de la esquina

Falta la tercera pregunta: el cliente en Japón y el servidor en Brasil. Aunque
la información viaje a la velocidad de la luz, cruzar el planeta y volver
lleva tiempo, y el sitio se siente lento.

Las **ubicaciones de borde** (*edge locations*) resuelven eso. Son puntos de
presencia de AWS repartidos por muchísimas más ciudades que las Regiones, y
guardan una **copia de tu contenido más pedido** cerca del usuario. El cliente
japonés recibe la copia que está en Tokio, en vez de esperar a Brasil.

Es el kiosco de la esquina: no tiene todo el catálogo del depósito, tiene lo
que la gente pide seguido, y lo tiene al lado tuyo. El servicio que usa esta
red se llama **Amazon CloudFront**, y lo vemos con más detalle en la lección
de red.

Dos detalles que conviene saber. Primero, las ubicaciones de borde sirven
sobre todo para contenido que **no cambia a cada segundo**: imágenes, videos,
archivos de la página. Segundo, hay **muchísimas más** ubicaciones de borde
que Regiones, porque una ubicación de borde es una instalación mucho más
chica: no corre tu aplicación, solo guarda copias.

### Cómo se elige una Región en la práctica

Supongamos una empresa argentina cuyos clientes están casi todos en el país.
El razonamiento sería: ¿hay alguna ley que obligue a guardar los datos acá? Si
la hay, la decisión ya está tomada. Si no la hay, se busca la Región más
cercana para reducir la latencia, se verifica que tenga los servicios que la
aplicación necesita, y recién al final se compara el precio entre las
candidatas que quedaron.

### Las tres piezas, una junto a la otra

| | Qué es | Para qué sirve | Cuántas hay |
|---|---|---|---|
| **Región** | Una zona geográfica del mundo | Elegir dónde viven tus datos | Decenas |
| **Zona de disponibilidad** | Centros de datos aislados dentro de una Región | Que una falla no te tire el servicio | Varias por Región |
| **Ubicación de borde** | Punto de presencia cerca del usuario | Entregar contenido rápido | Cientos |

La relación es de contención: **una Región contiene varias Zonas de
disponibilidad**, y cada Zona contiene uno o más centros de datos. Las
ubicaciones de borde son una red aparte, mucho más numerosa y repartida.

**En resumen:** una Región es una zona geográfica del mundo y se elige por
normas, cercanía, servicios disponibles y precio. Dentro de cada Región hay
varias Zonas de disponibilidad, que son centros de datos aislados entre sí:
repartir la aplicación en varias es lo que da alta disponibilidad. Y las
ubicaciones de borde son cientos de puntos repartidos que guardan copias del
contenido cerca del usuario para que llegue rápido.

## 💬 Ahora te toca a ti

**Pregunta:** Si tuvieras una cadena de locales en varios países,
¿guardarías toda la mercadería en un único depósito?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, por dos motivos distintos. Primero, porque si a
ese depósito le pasa algo te quedás sin nada — para eso están las **Zonas de
disponibilidad**, que reparten tu aplicación en centros de datos aislados
dentro de una misma Región. Y segundo, porque mandar mercadería desde un solo
lugar al mundo entero es lento — para eso están las **Regiones** repartidas
por el planeta y las **ubicaciones de borde**, que acercan el contenido al
cliente.

**Pregunta:** ¿Qué pasaría si ese único depósito se inunda?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Te quedarías sin servicio. Justamente por eso AWS
divide cada Región en varias **Zonas de disponibilidad**, que están a
kilómetros de distancia y tienen electricidad, refrigeración y red propias, de
modo que una inundación o un corte no puede afectarlas a las dos. Si tu
aplicación corre en una sola zona y esa zona falla, tu aplicación falla; si
está repartida en dos o más, sigue en pie. Eso es la alta disponibilidad.

**Pregunta:** Si un cliente en Japón entra a tu sitio y el servidor está en
Brasil, ¿qué creés que notaría?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que el sitio va lento, aunque el servidor sea potente:
cada pedido tiene que cruzar el planeta y volver, y esa demora se llama
**latencia**. Hay dos formas de resolverlo: desplegar también en una Región
cercana a Japón, o usar las **ubicaciones de borde**, que guardan una copia
del contenido más pedido cerca del usuario. Para contenido que no cambia todo
el tiempo, lo segundo suele alcanzar y es mucho más simple.

## 🎯 Pistas para el examen

- **Alta disponibilidad y tolerancia a fallos ⇒ varias Zonas de
  disponibilidad.** Si una opción propone resolver la disponibilidad con
  varias Regiones, suele ser exagerado: el examen espera multi-AZ salvo que
  hable expresamente de recuperación ante desastres a escala regional.
- **Latencia o usuarios lejanos ⇒ ubicaciones de borde (CloudFront)** o
  desplegar en una Región más cercana. Fijate si el escenario habla de
  contenido repetido (borde) o de la aplicación entera (otra Región).
- Memorizá los **cuatro criterios para elegir Región**: cumplimiento
  normativo, latencia, servicios disponibles y precio. Si el escenario
  menciona una ley o un regulador, ese criterio gana sobre los otros tres.
- No confundas las tres piezas por su tamaño: **hay decenas de Regiones,
  varias Zonas por Región y cientos de ubicaciones de borde.** Si una opción
  invierte esa proporción, es incorrecta.
- Recordá que **las Regiones son independientes**: tus datos no se copian de
  una a otra automáticamente. Si el escenario quiere una copia en otro
  continente, alguien tiene que configurarlo.
