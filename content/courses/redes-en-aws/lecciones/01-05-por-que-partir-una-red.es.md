# 1.5 — Subredes: por qué partir una red en trozos

> Módulo 1 · Redes sin nube · Clase 5 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Por qué nadie monta una red plana con todas las máquinas juntas, aunque sería
más simple. Hay tres razones, y las tres explican decisiones que vas a tomar en
AWS. Al terminar vas a saber cuándo conviene partir una red y, lo que se
pregunta menos, cuándo no.

## 🤔 Antes de empezar

1. En la clase 1.2 vimos qué identifica de verdad una dirección IP. ¿Era la
   máquina, la persona, o ninguna de las dos?
2. ¿Por qué un hospital separa urgencias de las consultas, si todo es el mismo
   edificio?
3. Si un barco se parte en compartimentos estancos y entra agua en uno, ¿qué
   pasa con los demás?

## 📐 La idea

Una **subred** es un trozo de una red, con su propio rango de direcciones.
Partir `10.0.0.0/16` en cuatro `/18` te da cuatro subredes, cada una con su
barrio. Con la notación de la clase 1.4 ya puedes leer esos tamaños. En la
clase 1.6 aprenderás a calcular dónde empieza y acaba cada trozo.

Hoy la pregunta no es cómo se parte. Es **por qué** molestarse. Hay tres
razones, y son muy distintas entre sí.

**Razón uno: poner reglas distintas a grupos distintos.** Pon tus bases de
datos en un trozo aparte. Ahora puedes decir "a este trozo solo se entra desde
aquel otro". Con todo mezclado, esa frase no se puede ni formular. Agrupar es
el paso previo a cualquier regla.

**Razón dos: limitar el daño.** Si algo va mal en una subred, el problema
tiende a quedarse dentro. Una máquina infectada tiene a mano a sus vecinos.
Para salir del barrio necesita pasar por un sitio donde alguien puede pararla.
Ahí está la tercera pregunta del principio.

**Razón tres: decidir dónde están las cosas.** Una subred se puede atar a un
lugar físico: un edificio, una planta, un centro de datos. Esa es la razón
menos obvia y la que más importa en AWS.

Las tres se resumen en una frase: **una subred es la unidad con la que se
agrupa**. Y se agrupa para poder decir algo sobre el grupo entero.

## 🔬 En detalle

Partir tiene un precio, y conviene conocerlo antes de partir por costumbre.

**Pierdes direcciones.** Cada subred reserva algunas para sí misma. Si partes
un `/24` en cuatro `/26`, pagas esa reserva cuatro veces en vez de una. Con
subredes pequeñas, el desperdicio se nota mucho.

**Añades un salto.** Dos máquinas del mismo barrio se hablan directamente. Si
las separas, ahora hace falta alguien que enrute entre ellas. Eso es un sitio
más donde algo puede fallar, y un sitio más que configurar.

**Te obligas a acertar con el tamaño.** Una subred no se agranda después. Si te
quedas corto, la salida suele ser crear otra y repartir, que es más trabajo del
que parece.

De ahí sale un criterio práctico para no pasarse:

| Partir cuando | No partir cuando |
|---|---|
| Los grupos necesitan reglas distintas | Solo quieres "tener orden" |
| Quieres contener un problema | Las máquinas son pocas y hacen lo mismo |
| Las cosas van en sitios distintos | El único motivo es que queda bonito |

Un error frecuente es partir por tipo de aplicación, creando una subred por
sistema. Eso multiplica el trabajo sin dar nada a cambio.

Lo que suele funcionar es partir por **nivel de exposición**. Lo que da la cara
a internet va en un sitio. Lo que nunca debería verse desde fuera va en otro.
Normalmente con esos dos grupos se cubre casi todo.

El criterio funciona porque coincide con la pregunta que de verdad importa:
"¿pasa algo si esto queda expuesto?". Dos máquinas con la misma respuesta
pueden compartir subred sin problema, aunque hagan cosas completamente
distintas. Dos máquinas con respuestas opuestas no deberían compartirla nunca,
por mucho que pertenezcan al mismo sistema.

Queda decir dónde deja de valer la analogía del edificio, y es en el tamaño.
Una planta se construye de los metros que quieras. Una subred solo puede tener
potencias de dos: 16, 32, 64, 128 direcciones. No existe una subred de cien, y
la clase 1.6 explica por qué.

## 🗺️ Dónde aparece esto en AWS

Aquí la razón tres se vuelve obligatoria, y es la regla más importante de esta
clase:

> En AWS, **una subred vive en una sola zona de disponibilidad**. No puede
> estirarse entre dos.

Una zona de disponibilidad es un grupo de centros de datos separado de los
demás. Tiene su propia corriente y su propia red. Si una se cae, las otras
siguen funcionando.

Esa regla tiene una consecuencia que mucha gente descubre tarde. Para que un
sistema sobreviva a la caída de una zona, necesita máquinas en **dos zonas**. Y
como cada subred está en una sola zona, eso significa **dos subredes**.

Por eso casi todas las redes de AWS que vas a ver tienen las subredes por
parejas. Una pública en la zona A y otra pública en la zona B. Una privada en
la zona A y otra privada en la zona B. No es manía de arquitecto: es la única
forma de estar en dos sitios.

La otra consecuencia es que en AWS acabas partiendo más de lo que partirías en
una oficina. No porque haga falta más control, sino porque la geografía te
obliga. Lo vas a construir en la clase 2.4.

## ⚠️ No lo confundas con

**Subred con VPC.** La VPC es la red entera, con su rango grande. Las subredes
son los trozos de dentro. Una VPC con una sola subred es perfectamente válida,
y también es perfectamente frágil: vive en una sola zona.

**Partir la red con poner reglas.** Son dos cosas distintas que se hacen en
sitios distintos. Partir agrupa. Las reglas se ponen después, y se apoyan en
esos grupos. Una subred por sí sola no bloquea nada.

**Subred pública con subred segura.** "Pública" y "privada" no son tipos de
subred que elijas en un desplegable. Son el resultado de si la subred tiene o
no una ruta de salida. Eso lo verás en la clase 2.7.

## 🔁 Autoevaluación

1. ¿Cuáles son las tres razones para partir una red en subredes?
2. Nombra dos precios que pagas al partir.
3. En AWS, ¿en cuántas zonas de disponibilidad puede estar una subred?
4. ¿Por qué las subredes de AWS suelen ir por parejas?

**Respuestas:** Una, poner reglas distintas a cada grupo. Limitar el daño
cuando algo va mal. Y decidir dónde están las cosas físicamente. Dos, pierdes
direcciones en cada reserva y añades un salto que enrutar. También te obligas a
acertar el tamaño a la primera. Tres, en una sola. Cuatro, porque sobrevivir a
la caída de una zona exige estar en dos, y cada subred solo está en una.

## 🎒 Para pensar

Imagina una tienda en internet con tres partes. Las páginas que ve el cliente,
la lógica que calcula los precios, y la base de datos. ¿Cuántas subredes
harías? Piénsalo primero por nivel de exposición. Después multiplica por el
número de zonas. ¿Te sale el mismo número que esperabas al empezar?
