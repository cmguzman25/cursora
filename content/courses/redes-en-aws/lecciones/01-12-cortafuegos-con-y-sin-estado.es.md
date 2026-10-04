# 1.12 — El cortafuegos: con estado y sin estado

> Módulo 1 · Redes sin nube · Clase 12 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

La diferencia entre un cortafuegos que recuerda y uno que no. Es la clase más
rentable del módulo. Sin ella, la diferencia entre los dos cortafuegos de AWS
se memoriza y se olvida. Con ella, se deduce sola y ya no se vuelve a
consultar.

## 🤔 Antes de empezar

1. En la clase 1.9 vimos una tabla que se escribía solo al salir. ¿Para qué
   servía?
2. Un portero apunta quién sale del edificio. Otro no apunta nada y solo mira
   una lista. ¿En qué se van a comportar distinto?
3. Si das permiso para hacer una pregunta, ¿has dado permiso para recibir la
   respuesta?

## 📐 La idea

Un **cortafuegos** mira cada paquete y decide si pasa o no. Compara el paquete
con una lista de reglas, y la respuesta es dejar pasar o descartar.

Hasta aquí, nada nuevo. Lo que cambia todo es **si recuerda lo que ya vio**.

**Con estado.** Lleva una tabla de las conversaciones abiertas. Cuando dejas
salir algo, apunta esa conversación. Cuando vuelve la respuesta, la reconoce y
la deja entrar sola, sin consultar ninguna regla.

**Sin estado.** No recuerda nada. Cada paquete se juzga solo, como si fuera el
primero del mundo. La respuesta a algo que tú pediste es un paquete más, y
tiene que estar permitida explícitamente.

Ahí está la segunda pregunta del principio. El portero que apunta sabe que
vuelves. El que no apunta te ve como un desconocido cada vez.

La consecuencia práctica se resume en una frase:

> En un cortafuegos con estado, permites la **ida** y la vuelta viene incluida.
> En uno sin estado, tienes que permitir las **dos**.

Y esa frase explica por qué el de sin estado tiene fama de confuso. No es más
estricto ni más seguro. Es que te hace escribir el doble, y la mitad de lo que
escribes es poco intuitivo.

## 🔬 En detalle

Vamos al caso concreto, porque aquí es donde se entiende de golpe.

Tu servidor quiere descargar una actualización de un sitio en internet. De la
clase 1.10 sabes que esa conversación tiene dos puertos. El de destino es el
443. El de origen lo elige tu máquina al azar entre los altos, y es efímero.

Con un cortafuegos **con estado**, escribes una regla:

```text
   SALIDA:  permitir TCP destino 443    → listo
```

La respuesta vuelve y entra sola. El cortafuegos la reconoce.

Con un cortafuegos **sin estado**, hacen falta dos:

```text
   SALIDA:  permitir TCP destino 443
   ENTRADA: permitir TCP destino 1024-65535
```

Mira bien la segunda. Estás permitiendo la entrada a **todo el rango de
puertos altos**, porque no sabes cuál eligió tu máquina. Es el precio de no
recordar nada.

Esa segunda regla es el motivo de que casi nadie use cortafuegos sin estado
como defensa principal. Para que las respuestas vuelvan, acabas abriendo un
rango enorme. Lo que de verdad aporta es bloquear algo concreto de forma
tajante, sin excepciones.

Hay una segunda diferencia que conviene fijar. Un cortafuegos sin estado suele
permitir **denegar explícitamente**. Puedes decir "esta dirección no, nunca". El
que va con estado normalmente solo permite, y lo que no está permitido queda
fuera por omisión. Son dos formas distintas de decir que no:

| | Con estado | Sin estado |
|---|---|---|
| Recuerda conversaciones | Sí | No |
| Hay que permitir la vuelta | No | Sí |
| Se puede denegar algo concreto | Normalmente no | Sí |
| Regla por omisión | Lo no permitido se descarta | Se evalúa todo en orden |

Falta decir dónde deja de valer la analogía del portero. Un portero te recuerda
la cara durante años. La tabla de conversaciones no: caduca en minutos si por
ahí no pasa nada. Una conexión que se queda callada demasiado tiempo deja de
estar apuntada. La respuesta que llegue después se descarta, como si nunca la
hubieras pedido.

## 🗺️ Dónde aparece esto en AWS

AWS tiene los dos, y ahora puedes deducir cómo se comporta cada uno:

- El **grupo de seguridad** va **con estado**. Se aplica a la tarjeta de red de
  cada máquina. Solo permite, nunca deniega. Si dejas salir al 443, la
  respuesta vuelve sola.
- La **lista de control de acceso de red** va **sin estado**. Se aplica a la
  subred entera. Permite y deniega, con reglas numeradas que se evalúan en
  orden. Si dejas salir al 443, tienes que permitir también la entrada a los
  puertos altos.

De ahí sale el fallo clásico de AWS, que vas a ver mil veces. Alguien toca la
lista de la subred, permite lo que quiere que entre, y todo deja de funcionar.
La causa es que no permitió la vuelta de lo que sale.

También explica el comentario del final de la clase 1.10. En un grupo de
seguridad no hacen falta los puertos efímeros, y en una lista de red sí. No es
una inconsistencia de AWS: son dos tipos de cortafuegos distintos.

Los dos actúan sobre el mismo tráfico, y el módulo 3 entero va de esto.

## ⚠️ No lo confundas con

**Cortafuegos con ruta.** Una ruta dice por dónde se va, y un cortafuegos dice
quién puede ir. Puedes tener ruta y que te bloqueen. Puedes tener permiso y no
tener por dónde. Son dos preguntas distintas, y conviene comprobarlas por
separado y en ese orden.

**Denegar con no permitir.** No es lo mismo. Si algo no está permitido,
cualquier regla posterior podría permitirlo. Si está denegado explícitamente,
ya no hay vuelta atrás. Esa diferencia decide cuál de los dos usar.

**Sin estado con más seguro.** Es un reflejo frecuente y es falso. No recordar
te obliga a abrir un rango enorme de puertos de vuelta. El de con estado acaba
siendo más estricto en la práctica. La única respuesta que deja entrar es la de
una conversación que tú empezaste.

## 🔁 Autoevaluación

1. ¿Qué recuerda un cortafuegos con estado, y para qué?
2. ¿Por qué uno sin estado obliga a permitir los puertos 1024-65535 de entrada?
3. ¿Cuál de los dos puede denegar algo de forma explícita?
4. En AWS, ¿cuál va con estado y a qué se aplica?

**Respuestas:** Una, las conversaciones abiertas. Así reconoce la respuesta de
algo que salió y la deja entrar sin regla. Dos, porque no sabe qué puerto
efímero eligió la máquina al salir, y la respuesta vuelve a ese. Tres, el que
va sin estado. El otro normalmente solo permite. Cuatro, el grupo de seguridad,
y se aplica a la tarjeta de red de cada máquina.

## 🎒 Para pensar

Una máquina tiene un grupo de seguridad que permite la entrada solo al puerto
443. Aun así descarga actualizaciones de internet sin problema. Eso usa puertos
de salida y respuestas de vuelta. ¿Por qué funciona? Y ahora la
pregunta de verdad: ¿seguiría funcionando si ese grupo fuera sin estado?
