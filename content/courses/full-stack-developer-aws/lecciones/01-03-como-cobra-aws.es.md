# 1.3 — Cómo cobra AWS: pago por uso, Always Free, créditos y pruebas

> Módulo 1 · Lección 1.3 · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si te dijeran que un servicio "cobra por uso", ¿qué crees que estaría midiendo exactamente para saber cuánto cobrarte?
- ¿Alguna vez te llegó una cuenta más alta de lo que esperabas (luz, datos del celular, un servicio que se renovó solo)? ¿Por qué pasó?
- Si un servicio te regala "1 millón de peticiones gratis al mes", ¿eso te parece mucho o poco para una tienda de barrio?

## 📘 Cómo funciona

Esta es la lección que casi ningún curso da, y es la razón por la que mucha gente abandona AWS: no por difícil, sino por un susto en la tarjeta. Vamos a sacarle el misterio.

### AWS no tiene "planes": tiene un taxímetro por servicio

Netflix te cobra un plan fijo al mes. AWS **no funciona así**. Cada servicio tiene su propio taxímetro, con su propia unidad de medida, y al final del mes te llega la suma de todos.

Es más parecido a los servicios de tu casa. La luz se cobra por kilovatio-hora, el agua por metro cúbico, el gas por metro cúbico: tres unidades distintas, una sola factura. En AWS pasa igual, con más medidores.

Aunque hay más de 200 servicios, casi todos cobran combinando estas **cuatro unidades**:

| Unidad | Qué mide | Ejemplo |
|---|---|---|
| ⏱️ **Tiempo encendido** | Cuántas horas existió el recurso | Un servidor cuesta X por hora, esté ocupado o dormido |
| 💾 **Almacenamiento** | Cuántos GB guardados, por mes | Guardar 10 GB de fotos cuesta lo mismo las mires o no |
| 🔁 **Peticiones** | Cuántas veces se usó | Cada vez que alguien abre tu página, se cuentan pedidos |
| 📤 **Salida de datos** | Cuántos GB salieron de AWS hacia internet | Es el que más sorprende, y lo explicamos abajo |

Fíjate en la trampa del primer renglón: **el tiempo encendido se cobra aunque nadie use el recurso**. Un servidor prendido en una madrugada sin visitas cuesta igual que uno lleno de clientes. Eso es lo que convierte un ejercicio olvidado en una factura sorpresa, y por eso este curso te hace borrar todo al terminar cada lección.

### La unidad que nadie ve venir: la salida de datos

Meter datos en AWS es gratis. **Sacarlos, no.** Subir 100 GB de fotos no cuesta nada de transferencia; que tus visitantes descarguen esas fotos, sí.

Piénsalo como un depósito donde guardar cajas es barato y dejarlas ahí también, pero cada vez que mandas una caja a la calle pagas el envío. Una página con muchas imágenes pesadas y muchas visitas paga sobre todo por eso, no por guardar.

### Los cuatro sabores de "gratis"

Aquí está la letra chica que hay que entender antes de crear la cuenta. En AWS, "gratis" significa cuatro cosas distintas:

**1. Always Free (siempre gratis).** Más de 30 servicios regalan una cantidad de uso **todos los meses, para siempre**, sin importar la antigüedad de tu cuenta. No es una promoción: es el precio. Estos son los pilares del curso, y son sorprendentemente generosos:

| Servicio | Qué regala cada mes, siempre |
|---|---|
| **Lambda** (tu backend) | 1.000.000 de peticiones + 400.000 GB-segundos |
| **DynamoDB** (tu base de datos) | 25 GB de almacenamiento + 25 unidades de lectura y 25 de escritura |
| **CloudFront** (la entrega de tu web) | Plan gratuito con 100 GB de salida + 1.000.000 de peticiones |

*Cifras de `us-east-1` consultadas en agosto de 2026. AWS las ajusta de vez en cuando: verifica en la página del servicio antes de confiar en un número.*

**2. Créditos de bienvenida.** Desde el **15 de julio de 2025**, toda cuenta nueva recibe **hasta 200 dólares en créditos**: 100 al registrarte y hasta 100 más completando actividades de iniciación. Sirven durante los primeros **6 meses** y caducan a los 12 meses de crear la cuenta. Un crédito es un vale: si el mes cierra en 3 dólares, se descuentan de ahí y tu tarjeta no se toca.

**3. Pruebas cortas.** Algunos servicios se pueden probar gratis por 30, 60 o 90 días, o hasta cierta cantidad de uso. Se acaban y empiezan a cobrar, casi siempre **sin avisarte**.

**4. Los 12 meses gratis (probablemente ya no aplique a ti).** Durante años, toda cuenta nueva tenía 12 meses con cosas como 750 horas de servidor pequeño al mes. Ese esquema sigue vigente **solo para las cuentas creadas antes del 15 de julio de 2025**. Si creas tu cuenta hoy, no lo tienes: en su lugar tienes los créditos del punto 2. Lo aclaramos porque **casi todos los tutoriales que encuentres en internet están escritos para el esquema viejo** y te van a prometer cosas que ya no existen.

### La decisión que vas a tomar en la próxima lección

Al registrarte, AWS te va a pedir elegir entre dos planes de cuenta. La diferencia es enorme y conviene saberla antes:

| | **Free Plan** (plan gratuito) | **Paid Plan** (plan de pago) |
|---|---|---|
| ¿Puede cobrarte? | No. Se detiene al agotar los créditos | Sí, lo que exceda lo gratuito |
| Créditos de bienvenida | Hasta 200 USD | Hasta 200 USD también |
| Servicios disponibles | **Limitado**: bloquea los servicios que se comerían los créditos de golpe | Todos |
| Duración | **6 meses** o hasta gastar los créditos | Indefinida |
| Al terminar | **AWS cierra tu cuenta y pierdes tus recursos y datos** (90 días para reabrirla pasando a plan de pago; después se borra de forma permanente) | Nada, sigue |

Léelo otra vez: el Free Plan **cierra la cuenta**. No es "te deja de dar cosas gratis": se cierra, y lo que construiste se pierde si no pasas a plan de pago dentro de los 90 días.

**Recomendación de este curso: elige el Paid Plan** y protégete con una alarma de gasto (lección 1.6). Suena contradictorio en un curso obsesionado con no gastar, así que aquí está el razonamiento:

- Los servicios Always Free que usa el curso siguen siendo gratis igual, con plan de pago o sin él.
- Todo lo que hagas fuera de eso se descuenta primero de los 200 dólares de crédito.
- No te quedas sin acceso a servicios que el curso necesita.
- Y sobre todo: **tu cuenta y tu proyecto no desaparecen a los 6 meses**, justo cuando lo quieras mostrar en una entrevista.

El precio de esa elección es que la responsabilidad de no gastar es tuya. Por eso la lección 1.6 es obligatoria y va antes de crear cualquier recurso.

### Cómo se calcula todo esto en la práctica

Hagamos la cuenta real de la panadería. Doña Rosa vende bien: **100 pedidos por día**, o sea unos 3.000 al mes. Cada pedido dispara unas 4 llamadas a la API (ver el menú, agregar al carrito, confirmar, consultar el estado). Eso son **12.000 peticiones al mes**.

- Lambda regala 1.000.000 de peticiones al mes → usa el **1,2%** de lo gratis.
- DynamoDB regala 25 GB → 3.000 pedidos de texto pesan unos pocos megas al mes.
- Costo del backend y la base de datos de Doña Rosa: **0 dólares**.

¿Y cuánto tendría que crecer para pagar aunque sea un dólar de Lambda? Pasado el millón gratis, AWS cobra 0,20 USD por millón de peticiones. Un dólar son 5 millones de peticiones extra, es decir alrededor de **1,25 millones de pedidos en un mes**. Doña Rosa tendría que atender a media ciudad.

Esa es la idea que debe quedarte: **para lo que tú vas a construir aprendiendo, el costo real es cero o casi cero**. El peligro nunca es el volumen de uso; es encender por error algo que se cobra por hora y olvidarlo.

**En resumen:** AWS cobra por uso con cuatro medidores (tiempo encendido, almacenamiento, peticiones y salida de datos), y "gratis" tiene cuatro sabores distintos: Always Free para siempre, créditos de bienvenida por 6 meses, pruebas cortas y los 12 meses del esquema viejo que ya no aplica a cuentas nuevas. El riesgo no está en usar mucho, sino en dejar encendido lo que se cobra por hora.

## 🛠️ Manos a la obra

> 📋 Esta práctica se hace en páginas públicas de AWS: **sin cuenta y sin tarjeta**.
> 💚 Costo de esta práctica: **$0**. No se crea nada.

Vas a aprender a verificar los límites tú mismo, que es lo único que no envejece: los números cambian, el lugar donde mirarlos no.

1. **Abre la lista oficial de ofertas gratuitas.** Entra a [aws.amazon.com/free](https://aws.amazon.com/free) y baja hasta el buscador de ofertas.
   *Deberías ver:* una lista de servicios con filtros al costado, entre ellos uno de tipo de oferta.

2. **Filtra por "Always Free".** Marca esa opción.
   *Deberías ver:* solo las ofertas que son gratis para siempre. Estas son las que le importan a este curso; las demás caducan.

3. **Busca `Lambda` en esa lista y lee su tarjeta.**
   *Deberías ver:* el millón de peticiones y los 400.000 GB-segundos mensuales. Anota los números tal como te aparezcan hoy.

4. **Haz lo mismo con `DynamoDB`.**
   *Deberías ver:* los 25 GB de almacenamiento. Ojo con un detalle que casi nadie lee: el límite es **por región y por cuenta pagadora**. Si creas tablas en tres regiones, no tienes 75 GB gratis repartidos como quieras: tienes que mirar región por región.

5. **Ve al taxímetro completo de un servicio.** Abre [la página de precios de Lambda](https://aws.amazon.com/lambda/pricing/) y busca el precio por millón de peticiones.
   *Deberías ver:* **0,20 USD por millón de peticiones** y un precio por GB-segundo con muchos ceros (0,0000166667). Que el número sea ridículamente chico es justamente el punto: pagar por ejecución es distinto a pagar por servidor.

6. **Haz tu propia cuenta.** Con esos números, calcula cuánto costaría tu proyecto si tuviera **50.000 peticiones al mes** (unos 400 pedidos diarios).
   *Deberías ver:* que sigue entrando en el millón gratuito, o sea **0 USD**. Escríbelo: es tu primera estimación de costos hecha por ti.

7. **Busca la advertencia.** En cualquier página de precios de AWS, localiza la nota que dice que los precios pueden cambiar y que no incluyen impuestos.
   *Por qué:* todo número que leas en un curso (incluido este) es una foto de un momento. La costumbre profesional es verificar en la página oficial antes de comprometerse con un presupuesto.

## 💰 Costo y limpieza

- **Qué creaste:** nada. Solo leíste páginas públicas de precios.
- **Qué se factura:** nada. Aún no existe tu cuenta de AWS.
- **Limpieza:** no hay nada que borrar.
- **Guarda esto para después:** los tres números que anotaste (límites de Lambda y DynamoDB, y precio por millón de peticiones). En el ejercicio 1.11 vas a estimar la factura completa de la aplicación del curso y te van a hacer falta.

## 💬 Ahora te toca a ti

**Pregunta:** Si te dijeran que un servicio "cobra por uso", ¿qué crees que estaría midiendo exactamente para saber cuánto cobrarte?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En AWS, casi siempre una combinación de cuatro cosas: cuánto tiempo estuvo encendido el recurso, cuántos GB tienes guardados, cuántas veces se usó (peticiones) y cuántos GB salieron hacia internet. Cada servicio elige sus medidores: Lambda cobra por ejecución y por tiempo de ejecución, S3 por lo guardado más las peticiones, un servidor EC2 por hora encendido. La consecuencia práctica: lo que se cobra por tiempo encendido hay que apagarlo, y lo que se cobra por uso puedes dejarlo tranquilo si nadie lo usa.

**Pregunta:** ¿Alguna vez te llegó una cuenta más alta de lo que esperabas (luz, datos del celular, un servicio que se renovó solo)? ¿Por qué pasó?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Casi siempre por lo mismo: algo siguió consumiendo cuando creías que estaba apagado, o una promoción se terminó sin aviso y pasó a precio lleno. En AWS existen exactamente esos dos casos: un recurso que se cobra por hora y quedó encendido, y una prueba gratuita que caducó. Contra el primero se usan las alarmas de gasto y borrar lo que no se usa; contra el segundo, saber de antemano cuál de los cuatro sabores de "gratis" estás usando.

**Pregunta:** Si un servicio te regala "1 millón de peticiones gratis al mes", ¿eso te parece mucho o poco para una tienda de barrio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Es muchísimo. Una panadería con 100 pedidos diarios y 4 llamadas por pedido gasta unas 12.000 peticiones al mes: el 1,2% del regalo. Para pagar un solo dólar de más habría que superar el millón en más de 5 millones de peticiones. La lección que hay detrás es que, mientras aprendes, **el volumen de uso casi nunca es el problema**; el problema es encender algo que se cobra por hora y olvidarlo. Por eso este curso insiste tanto con borrar y tan poco con "usar menos".

## ⚠️ Errores comunes

- **Seguir un tutorial escrito para el esquema viejo.** Promete "750 horas gratis al mes durante 12 meses" y tu cuenta nueva no las tiene → verifica siempre la fecha del tutorial: si es anterior a julio de 2025, sus promesas de free tier ya no valen. Los Always Free sí siguen vigentes.
- **Elegir el Free Plan pensando que es "el seguro".** Es el que no puede cobrarte, pero **cierra la cuenta a los 6 meses y te hace perder los datos** → para un curso largo conviene el plan de pago con alarma de gasto. La protección real es la alarma, no el plan.
- **Creer que borrar la consola es borrar el recurso.** Se cierra la pestaña y se asume que se apagó → el recurso sigue existiendo y cobrando. Solo se detiene el taxímetro cuando lo borras o lo detienes explícitamente.
- **Sumar límites gratuitos entre regiones.** "Tengo 25 GB gratis en DynamoDB, uso 10 aquí y 15 allá" → el límite se cuenta por región. Trabajar siempre en la misma región (`us-east-1` en este curso) también es una forma de cuidar el bolsillo.
- **Confiar en un número de hace un año.** Los precios cambian y las páginas de precios lo advierten → mira la fuente oficial antes de comprometer un presupuesto.

## 🎯 Para llevarte

- Cuatro medidores: tiempo encendido, almacenamiento, peticiones y salida de datos. La salida es la que más sorprende.
- Cuatro sabores de gratis: Always Free (para siempre), créditos de bienvenida (hasta 200 USD, 6 meses), pruebas cortas y los 12 meses del esquema viejo, que ya no aplica a cuentas nuevas.
- Lo que se cobra por hora es el peligro real; lo que se cobra por uso, mientras aprendes, es prácticamente gratis.
- Free Plan no cobra pero cierra tu cuenta a los 6 meses; Paid Plan no se cierra pero exige que pongas tú la alarma.
- Todo número de precios es una foto: la habilidad profesional es saber verificarlo, no memorizarlo.

**En la próxima lección:** creamos tu cuenta de AWS paso a paso — qué datos pide, por qué necesita una tarjeta aunque no vayas a gastar, qué plan elegir con lo que acabas de aprender, y los dos cobros de prueba que verás en el resumen y que no son un error.
