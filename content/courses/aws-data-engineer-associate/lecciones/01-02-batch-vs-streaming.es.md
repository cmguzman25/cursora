# 1.2 — Batch, micro-batch y streaming: latencia, volumen y costo

> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- Si procesar datos en tiempo real es técnicamente posible, ¿por qué la mayoría
  de las empresas sigue procesando por lotes durante la noche?
- ¿Qué crees que hace que un sistema de streaming sea más caro de operar que uno
  por lotes, si mueve la misma cantidad de datos al día?
- ¿Qué significa exactamente "tiempo real" cuando una empresa lo pide?

## 📘 Contenido

Corriente Pagos procesa transacciones con tarjeta. Tiene dos necesidades sobre
los mismos datos:

- **Detectar fraude.** Si una tarjeta se usa en dos países en diez minutos, hay
  que bloquearla **antes** de aprobar la segunda compra. Un aviso a la mañana
  siguiente no sirve de nada.
- **Liquidar con los comercios.** Cada noche hay que sumar lo cobrado por cada
  comercio y preparar la transferencia. Aquí no importa si el cálculo termina a
  las 2 o a las 4 de la madrugada.

Son los mismos datos, y necesitan dos arquitecturas distintas. Entender por qué
es entender la diferencia entre batch y streaming.

### Datos acotados y datos no acotados

La distinción de fondo no es de velocidad, es de **forma del conjunto de datos**.

Un conjunto **acotado** (*bounded*) tiene principio y fin conocidos: "las ventas
del 26 de agosto". Puedes contarlo, dividirlo, procesarlo entero y saber cuándo
terminaste.

Un conjunto **no acotado** (*unbounded*) no termina nunca: el flujo de
transacciones de Corriente Pagos sigue llegando mientras la empresa exista. No
puedes esperar a tenerlo completo, porque nunca lo estará.

- **Procesamiento por lotes (batch)** trata los datos como acotados: acumula un
  bloque, lo procesa entero, termina.
- **Procesamiento de flujo (streaming)** trata los datos como no acotados:
  procesa cada registro o cada ventana de tiempo a medida que llega, sin fin.

El **micro-batch** está en medio: acumula lotes muy pequeños —segundos— y los
procesa como si fueran lotes. Desde fuera parece streaming; por dentro es batch
repetido muy rápido.

### El espectro de latencia

| Enfoque | Latencia típica | Cuándo encaja |
|---|---|---|
| Batch programado | Horas o un día | Informes, liquidaciones, cargas nocturnas |
| Micro-batch | Segundos a minutos | Paneles operativos, ingesta continua a un data lake |
| Streaming | Milisegundos a segundos | Fraude, alertas, decisiones que bloquean una operación |

La palabra que el examen usa para el medio del espectro es **near real time**
(casi en tiempo real), y para el extremo, **real time**. Distinguirlas es una de
las lecturas que más preguntas decide, porque llevan a servicios distintos.

### Por qué el streaming cuesta más

Mover la misma cantidad de datos al día en streaming cuesta más que en batch, y
no principalmente por el precio del servicio. Las razones son estructurales:

**La capacidad se dimensiona para el pico, no para el promedio.** Un proceso por
lotes que corre a las 3 de la madrugada usa recursos una hora al día. Un sistema
de streaming está encendido las 24 horas y debe soportar el minuto de mayor
tráfico del año, aunque el resto del tiempo esté al 5 %.

**Se pierde la eficiencia del volumen.** Escribir un archivo de 500 MB es mucho
más eficiente que escribir 500.000 registros de 1 KB. Cada operación tiene un
coste fijo de metadatos, red y llamadas a la API. El batch amortiza ese coste
sobre muchos registros; el streaming lo paga por registro o por lote pequeño.

**El estado hay que mantenerlo en memoria.** Para responder "¿cuántas
transacciones hizo esta tarjeta en los últimos 10 minutos?" el sistema debe
recordar los últimos 10 minutos de todas las tarjetas activas, y hacerlo de forma
tolerante a fallos. Eso consume memoria y complica la recuperación.

**El coste operativo humano es mayor.** Un proceso por lotes que falla se vuelve
a lanzar por la mañana. Un sistema de streaming que falla acumula retraso
mientras está caído, y alguien tiene que atenderlo cuando ocurra.

Por eso, cuando un enunciado del examen pide **la opción más económica** y el
requisito de latencia lo permite, la respuesta suele inclinarse hacia batch o
micro-batch.

### Procesamiento con estado y sin estado

Una transformación **sin estado** (*stateless*) trata cada registro de forma
independiente: convertir una moneda, validar un formato, filtrar por país. No
necesita recordar nada.

Una transformación **con estado** (*stateful*) necesita información de otros
registros: contar transacciones por tarjeta en los últimos 10 minutos, detectar
que falta un evento de confirmación, calcular una media móvil.

Esta distinción decide la arquitectura. Lo sin estado se resuelve con una función
sencilla que se ejecuta por registro. Lo con estado exige un motor que mantenga y
recupere ese estado, y ahí es donde entran los motores de procesamiento de flujo
especializados.

### Ventanas: cómo se acota lo no acotado

Si el flujo no termina nunca, ¿cómo se calcula un promedio? Con **ventanas**
(*windows*), que recortan trozos del flujo para poder agregarlos.

- **Ventana fija (tumbling).** Bloques consecutivos que no se solapan: cada 5
  minutos exactos. Un registro cae en una sola ventana. Sirve para "ventas por
  cada intervalo de 5 minutos".
- **Ventana deslizante (sliding).** Bloques que se solapan: los últimos 10
  minutos, recalculados cada minuto. Un registro cae en varias ventanas. Sirve
  para medias móviles y detección de picos.
- **Ventana de sesión (session).** Se agrupa por actividad y se cierra tras un
  período de inactividad. Sirve para agrupar la navegación de un usuario en
  Mediateca hasta que deja de ver vídeos.

### Tiempo del evento y tiempo de proceso

Un detalle que el examen usa como distractor: hay dos relojes distintos.

- El **event time** es cuándo ocurrió el hecho.
- El **processing time** es cuándo el sistema lo recibió.

Casi nunca coinciden. Un camión de RutaSur que atraviesa una zona sin cobertura
acumula lecturas y las envía media hora después: eventos de las 10:00 que llegan
a las 10:30. Si agregas por processing time, esas lecturas contaminan la ventana
equivocada y el informe de las 10:00 queda mal para siempre.

Agregar por event time da resultados correctos, pero obliga a decidir cuánto
esperar a los rezagados antes de cerrar una ventana. Los datos que llegan después
de ese plazo se llaman **late-arriving data**, y hay que decidir explícitamente
si se descartan o se reprocesa la ventana.

### Cómo elegir, en la práctica

Tres preguntas, en este orden:

1. **¿Qué pasa si el resultado llega una hora tarde?** Si la respuesta es "nada
   grave", es batch. Casi siempre lo es, aunque el área de negocio diga "tiempo
   real" por costumbre.
2. **¿El cálculo necesita recordar otros registros?** Si no, alcanza con una
   función por registro. Si sí, hace falta un motor con estado.
3. **¿El volumen justifica el coste de estar encendido siempre?** Un flujo de
   diez eventos por minuto casi nunca justifica una arquitectura de streaming.

**En resumen:** batch procesa conjuntos acotados y amortiza costes sobre grandes
volúmenes; streaming procesa flujos no acotados y paga por estar siempre
encendido y mantener estado. El micro-batch es el punto intermedio que el examen
llama *near real time*. Y las ventanas, junto con la distinción entre event time
y processing time, son lo que permite agregar algo que no termina nunca.

## 🔍 Cómo lo pregunta el examen

> Una empresa de logística recibe lecturas GPS de su flota. Algunos vehículos
> circulan por zonas sin cobertura y transmiten las lecturas acumuladas al
> recuperar señal, hasta 40 minutos después. El equipo necesita informes de
> actividad por franjas de 15 minutos que reflejen cuándo ocurrió cada lectura.
> ¿Qué enfoque cumple el requisito?

La pista está en **transmiten hasta 40 minutos después** y **reflejen cuándo
ocurrió cada lectura**. El enunciado no pide baja latencia: pide **corrección
temporal**.

Eso descarta cualquier opción que agregue por hora de llegada, por muy rápida que
sea: pondría lecturas de las 10:00 en la franja de las 10:40. También descarta
las que solo aumentan la capacidad de ingesta, porque el problema no es de
rendimiento.

La respuesta correcta usará **event time** con una tolerancia de espera mayor que
el retraso observado, o reprocesará la ventana cuando lleguen los rezagados.
Cuando veas "los datos llegan tarde" y "el informe debe reflejar cuándo ocurrió",
la respuesta está en el reloj que se usa para agregar, no en la velocidad.

## 💬 Ahora te toca a ti

**Pregunta:** Si procesar datos en tiempo real es técnicamente posible, ¿por qué
la mayoría de las empresas sigue procesando por lotes durante la noche?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque casi ningún caso de uso lo necesita y el batch es
bastante más barato y sencillo de operar. Un informe de ventas o una liquidación
mensual no mejoran por estar disponibles cinco minutos después del hecho. Además,
el batch amortiza el coste fijo de cada operación sobre grandes volúmenes y solo
consume recursos mientras corre, mientras que un sistema de streaming está
encendido siempre y dimensionado para el pico.

**Pregunta:** ¿Qué crees que hace que un sistema de streaming sea más caro de
operar que uno por lotes, si mueve la misma cantidad de datos al día?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Cuatro cosas. Se dimensiona para el pico y está encendido
las 24 horas aunque el uso medio sea bajo. Pierde la eficiencia del volumen,
porque escribir muchos registros pequeños cuesta más que escribir pocos grandes.
Debe mantener estado en memoria de forma tolerante a fallos para poder responder
preguntas sobre ventanas de tiempo. Y su coste operativo humano es mayor, porque
una caída acumula retraso y hay que atenderla cuando ocurra, no por la mañana.

**Pregunta:** ¿Qué significa exactamente "tiempo real" cuando una empresa lo
pide?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Casi nunca lo que dice literalmente. Conviene traducirlo a
una pregunta concreta: ¿qué pasa si el resultado llega una hora tarde? Si la
respuesta es "nada", lo que se pide es batch o micro-batch. El verdadero tiempo
real —milisegundos o segundos— solo se justifica cuando el resultado **bloquea
una decisión en curso**, como aprobar o rechazar una transacción. En el examen,
*real time* apunta a streaming y *near real time* a micro-batch.

## ⚠️ No lo confundas con

- **Real time vs. near real time:** *real time* significa segundos o menos y
  apunta a un motor de streaming; *near real time* admite minutos y se resuelve
  con micro-batch, que es más barato.
- **Event time vs. processing time:** cuándo ocurrió el hecho frente a cuándo lo
  recibió el sistema. Agregar por el reloj equivocado produce informes
  incorrectos, no lentos.
- **Ventana fija vs. deslizante:** la fija no se solapa y cada registro cae en una
  sola; la deslizante se solapa y sirve para medias móviles.
- **Stateless vs. stateful:** transformar cada registro por separado frente a
  necesitar recordar otros registros. Solo lo segundo exige un motor con estado.
- **Streaming vs. ingesta continua:** recibir datos de forma continua no obliga a
  procesarlos en streaming. Se pueden ingerir continuamente y procesar por lotes.

## 🎯 Pistas para el examen

- **Traduce siempre la latencia pedida antes de mirar servicios.** *Real time*,
  *near real time* y "informe diario" llevan a tres familias distintas de
  respuesta, y el enunciado casi siempre usa una de esas expresiones.
- **Si el enunciado pide la opción más económica y no exige segundos**, inclínate
  por batch o micro-batch. El streaming rara vez es la respuesta barata.
- **"Los datos llegan tarde" es una pregunta de event time**, no de rendimiento.
  Desconfía de opciones que solo aumenten capacidad.
- **Comprueba si el cálculo necesita estado.** Una agregación por ventana lo
  necesita; una conversión de formato no. Esa sola distinción descarta opciones
  que proponen una función simple donde hace falta un motor de flujo, y al revés.
