# 0.1 — Cómo usar este curso

> Módulo 0 · Preparar el terreno · Clase 1 de 3 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Qué promete este curso y qué no. Cómo está construido. Y las dos reglas que
hacen que no te lleves un susto en la factura. Son ocho minutos que evitan que
abandones en el módulo 3 sin saber por qué.

## 🤔 Antes de empezar

1. ¿Qué te pasó la última vez que alguien te explicó redes? ¿En qué palabra
   exacta te perdiste?
2. Cuando aprendes algo técnico, ¿qué te funciona mejor: leer primero o
   trastear primero?
3. ¿Has dejado alguna vez algo encendido en la nube y lo has descubierto al
   ver el recibo?

## 📐 La idea

Este curso tiene una promesa concreta, y conviene decirla antes de empezar:

> **Al terminar vas a entender las redes de AWS, no a reconocerlas.**

Mira la diferencia. Una cosa es saber que existe un Internet Gateway. Otra es
poder señalar qué línea de qué tabla hace que tu servidor tenga internet. Lo
primero se aprende en una tarde y se olvida en una semana. Lo segundo no se
olvida.

En concreto, al final vas a poder hacer tres cosas:

- **Dibujar en un papel** el camino que recorre un mensaje, desde una máquina
  de tu casa hasta un servidor escondido dentro de AWS, nombrando cada pieza
  que atraviesa y por qué está ahí.
- **Construir** desde cero, en la consola de AWS, una red con partes públicas y
  privadas que funcione de verdad.
- **Diagnosticar** por qué algo no conecta, por descarte y en orden, en lugar
  de tocar reglas al azar hasta que funcione.

Y aquí va lo que el curso **no** es. No prepara ninguna certificación. No es un
catálogo de servicios de red de AWS. Un servicio aparece cuando resuelve un
problema que ya has sentido, y no antes. Por eso Transit Gateway no sale hasta
el módulo 5: hasta entonces no has sufrido los límites de lo anterior.

Ahí está la primera pregunta del principio. Si te perdiste en una palabra
concreta, fue porque alguien la usó antes de explicarla.

En este curso eso está prohibido por escrito. Ninguna clase puede apoyarse en
algo que no se haya enseñado antes. Y cada sigla se despliega la primera vez
que aparece.

## 🔬 En detalle

Hay **dos tipos de clase** y se distinguen en la primera línea.

Las de **concepto** explican una idea y no tocan la consola. Son la mayoría, y
todo el módulo 1 es así: trece clases seguidas sin abrir AWS. Es deliberado.
Quien entra a la consola sin esos trece conceptos aprende a hacer clics, no
redes.

Las de **concepto y consola** explican una idea y después la construyen. Van
paso a paso, y cada paso dice lo que deberías ver si salió bien.

Ahí está la segunda pregunta del principio. Si eres de trastear primero, el
módulo 1 te va a costar. Te pido que lo aguantes igual: es el que hace que todo
lo demás se entienda en lugar de memorizarse.

Todas las clases terminan con una **autoevaluación**. Son cuatro preguntas con
sus respuestas, dentro de la propia clase. No hay nota, no hay examen y no se
guarda nada. Es para que te compruebes a ti mismo antes de seguir. Si fallas
dos de cuatro, vuelve atrás.

Una cosa más sobre el ritmo. Las clases son de 8 a 10 minutos de lectura, y
están pensadas para una sentada. Las de consola llevan además su rato de
trastear, que no cuenta en ese número.

## 🗺️ Dónde aparece esto en AWS

Dos reglas prácticas que valen para todo el curso. La primera es el dinero.

Este curso **sí gasta**, poco pero no cero. Algunas piezas de red de AWS se
cobran desde el primer minuto: traductores de salida, balanceadores, túneles.
Por eso toda clase lleva un semáforo en su primera línea:

| Semáforo | Qué significa |
|---|---|
| 💚 Costo: $0 | No crea nada que facture, o lo que crea es gratis siempre |
| 💛 Costo: centavos | Menos de 0,50 USD si sigues los pasos y borras cuando toca |
| 🔴 Costo: cargos reales | Cobra desde el primer minuto y no tiene capa gratuita |

Antes del primer paso que empieza a cobrar siempre hay un aviso. Lleva el
precio aproximado y una alternativa para no gastar nada.

La segunda regla es la limpieza, y responde a la tercera pregunta del
principio. Cada clase que crea algo termina diciendo qué se borra ahora y qué
se queda vivo. Y **nombra la clase concreta donde se borra**. Nunca "más
adelante". Nada de lo que construyas sobrevive al final del curso.

Y para que todo esto encaje, el entorno está fijo: región `us-east-1`, etiqueta
`curso = redes-aws` y nombres que empiezan por `redes-`. Así puedes encontrar y
borrar todo lo del curso de una vez.

## ⚠️ No lo confundas con

**Este curso con un curso de certificación.** No sigue el temario de ningún
examen y no te va a decir "esto cae mucho". Si además preparas una
certificación, lo de aquí te va a servir. Pero el orden y el alcance los manda
el entendimiento, no el examen.

**Leer con haber entendido.** Es el riesgo real de un curso de solo lectura
como el módulo 1. La autoevaluación del final está puesta justo para eso. Si
puedes contestar las cuatro de memoria, has entendido. Si las miras y te suenan,
no.

**Ir rápido con ir bien.** Este curso se puede leer entero en dos tardes y no
sirve de nada hacerlo. Los conceptos de red se asientan al volver a toparse con
ellos. Una o dos clases al día funciona mejor que ocho de golpe.

## 🔁 Autoevaluación

1. ¿Qué promete este curso, en una frase?
2. ¿Cuáles son los dos tipos de clase y en qué se diferencian?
3. ¿Por qué el módulo 1 no toca la consola de AWS?
4. ¿Qué tiene que decir una clase que deja algo encendido?

**Respuestas:** Una, que entiendas las redes de AWS en lugar de reconocerlas.
Dos, las de concepto, que explican una idea, y las de concepto y consola, que
además la construyen. Tres, porque quien abre la consola sin esos conceptos
aprende a hacer clics y no redes. Cuatro, qué se borra ahora, qué se queda
vivo, cuánto cuesta y en qué clase concreta se borra.

## 🎒 Para pensar

Vuelve a la primera pregunta y escribe la palabra en la que te perdiste.
Probablemente sea una de estas tres: "subred", que es la clase 1.5, "CIDR", que
es la clase 1.4, o "NAT", que es la clase 1.9. Guárdala en algún sitio. Cuando
llegues a esa clase, relee lo que escribiste hoy y mira si la explicación te
habría servido entonces.
