# 4.1 — Modelos de precios

> Dominio 4 · Task Statement 4.1 — Compare AWS pricing models

## 🤔 Antes de empezar

- Si supieras que vas a usar un auto todos los días durante los próximos tres años, ¿lo alquilarías por día o firmarías un contrato largo?
- ¿Por qué creés que un hotel remata las habitaciones que le quedan vacías esa misma noche?
- Cuando subís una foto a una red social y después la mirás mil veces, ¿qué te parece que le cuesta más caro a esa empresa: que la subas o que la miren?

## 📘 Contenido

En el Módulo 1 vimos la idea grande: en la nube dejás de comprar servidores por
adelantado y pasás a pagar por lo que usás. Esta lección es el detalle de ese
"pagar por lo que usás". Porque AWS no te cobra de una sola forma: te ofrece
**varias maneras de pagar lo mismo**, y elegir bien puede cambiar la factura en
un 70 % sin cambiar una línea de código.

### De qué se compone una factura de AWS

Casi todo lo que vas a pagar cae en tres bolsas:

1. **Cómputo** — el tiempo que tus servidores o funciones están trabajando.
   Suele ser la bolsa más grande.
2. **Almacenamiento** — los datos que dejás guardados, normalmente por
   gigabyte y por mes.
3. **Transferencia de datos** — mover datos hacia afuera de AWS.

Esa tercera bolsa es la que sorprende a todo el mundo, así que vale la regla:
**meter datos en AWS es gratis; sacarlos hacia internet se paga.** Ahí está la
tercera pregunta del principio. Es como una bodega que te deja guardar cajas sin
cobrarte la entrada, pero te cobra el camión cada vez que sacás una. Subir la
foto no cuesta; que la miren un millón de veces, sí.

También se paga el tráfico **entre Regiones** y, en algunos casos, entre Zonas
de disponibilidad. Dentro de la misma Zona, normalmente no.

### El Free Tier: probar sin pagar

Antes de los modelos de compra, una aclaración que el examen pregunta. La
**capa gratuita** (*Free Tier*) tiene tres sabores:

- **Gratis siempre** (*always free*): ciertos servicios tienen una porción que
  nunca se cobra (por ejemplo, el primer millón de ejecuciones de Lambda al
  mes).
- **Gratis 12 meses**: cantidades limitadas de servicios como EC2 o S3, desde
  que abrís la cuenta.
- **Pruebas** (*trials*): un servicio gratis por unos días o hasta cierto uso.

> **Ojo con esto.** Como vimos en la lección 0.2, AWS ya no abre cuentas nuevas
> con los 12 meses: hoy te da los servicios "siempre gratis" más un **crédito de
> bienvenida** de hasta 200 USD que vence a los 6 meses. Pero el examen CLF-C02
> todavía se escribió sobre el esquema de tres sabores, así que hay que
> conocerlo igual. Si una pregunta menciona los 12 meses, se refiere a este.

### Los modelos de compra de cómputo

Acá está el corazón del tema. Para una misma instancia EC2, AWS te da varias
formas de pagarla.

**On-Demand (bajo demanda).** Pagás por segundo o por hora lo que usás, sin
compromiso, y apagás cuando querés. Es el hotel: caro por noche, pero te vas
cuando se te da la gana. Sirve para cargas nuevas, impredecibles o de corta
duración, y para probar cuánto vas a necesitar realmente.

**Reserved Instances (instancias reservadas).** Te comprometés a usar **un tipo
de instancia concreto** durante **1 o 3 años** y a cambio pagás hasta un **72 %
menos**. Es el contrato de alquiler: firmás largo, pagás mucho menos por mes.
Ahí está la primera pregunta del principio: si sabés que lo vas a usar todos los
días durante tres años, alquilar por día es tirar plata.

Dos detalles que el examen pregunta:

- **Standard** (más descuento, pero atada a ese tipo de instancia) contra
  **Convertible** (menos descuento, pero podés cambiar a otro tipo).
- **Cómo pagás por adelantado**: *All Upfront* (todo adelantado, máximo
  descuento), *Partial Upfront* (una parte) o *No Upfront* (nada adelantado,
  mínimo descuento). Cuanto más adelantás, más te descuentan.

**Savings Plans (planes de ahorro).** Son la versión moderna y más flexible de
lo anterior. En vez de comprometerte a una instancia, te comprometés a **gastar
al menos X dólares por hora** durante 1 o 3 años. Mientras gastes eso, lo pagás
con descuento, sin importar qué instancia uses. Es el abono del gimnasio:
pagás una cuota fija y usás la máquina que quieras. Hay tres:

- **Compute Savings Plans**: los más flexibles. Aplican a EC2, Lambda y
  Fargate, en cualquier Región y familia de instancia.
- **EC2 Instance Savings Plans**: más descuento, pero atados a una familia de
  instancias en una Región.
- **SageMaker Savings Plans**: para aprendizaje automático.

**Spot Instances (instancias spot).** AWS vende la capacidad que le está
sobrando con hasta **90 % de descuento**, con una condición: **te la puede
quitar con 2 minutos de aviso** si la necesita. Ahí está la segunda pregunta:
el hotel remata la habitación vacía porque una noche sin vender no se recupera
nunca — y si aparece un cliente que paga la tarifa completa, esa habitación
tiene dueño. Spot sirve para trabajos que pueden **interrumpirse y retomarse**:
procesar videos, análisis en lote, pruebas. **Nunca** para una base de datos o
un sitio que tiene que estar siempre en pie.

**Dedicated Hosts y Dedicated Instances.** Los dos te dan servidores físicos
que no compartís con nadie más, y son los más caros. La diferencia:

| | Dedicated Instance | Dedicated Host |
|---|---|---|
| Qué te dan | Hardware no compartido | El servidor físico entero |
| ¿Ves el servidor? | No | Sí, con sus procesadores y sockets |
| Para qué se usa | Aislamiento por normativa | Licencias que se cobran por servidor físico |

La palabra clave del examen para **Dedicated Host** es **licencias**: si una
empresa tiene licencias de Windows o Oracle que se cuentan por procesador
físico, necesita ver el hardware, y eso solo lo da el Dedicated Host.

### Licencias: BYOL o incluida

Cuando el software que corrés tiene licencia (Windows Server, SQL Server,
Oracle), hay dos caminos:

- **License Included**: la licencia viene incluida en el precio por hora. No
  tenés que comprar nada; dejás de pagarla cuando apagás.
- **BYOL** (*Bring Your Own License*, "traé tu propia licencia"): usás la que
  ya compraste. Conviene si ya pagaste esas licencias y no querés perderlas.

### Una tabla para fijar los cinco

| Modelo | Compromiso | Descuento | Cuándo |
|---|---|---|---|
| **On-Demand** | Ninguno | 0 % | Cargas nuevas o impredecibles |
| **Reserved Instances** | 1 o 3 años, instancia fija | Hasta 72 % | Uso estable y conocido |
| **Savings Plans** | 1 o 3 años, gasto por hora | Hasta 72 % | Uso estable pero cambiante |
| **Spot** | Ninguno, interrumpible | Hasta 90 % | Trabajos que pueden cortarse |
| **Dedicated Host** | Opcional | Es la opción más cara | Licencias por hardware o normativa |

**En resumen:** la factura de AWS se arma con cómputo, almacenamiento y salida
de datos — entrar es gratis, salir se paga. Para el cómputo hay cinco formas de
pagar lo mismo: On-Demand sin compromiso, Reserved y Savings Plans a cambio de
comprometerte 1 o 3 años, Spot barato pero interrumpible, y Dedicated Host
cuando necesitás ver el hardware físico por licencias o normativa.

## 💬 Ahora te toca a ti

**Pregunta:** Si supieras que vas a usar un auto todos los días durante los
próximos tres años, ¿lo alquilarías por día o firmarías un contrato largo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Contrato largo, porque el alquiler por día está pensado
para la flexibilidad que no necesitás, y esa flexibilidad se paga. En AWS es
igual: cuando el uso es **estable y predecible**, se pasa de **On-Demand** a
**Reserved Instances** o a un **Savings Plan** por 1 o 3 años, y se ahorra hasta
un 72 % sin cambiar nada del sistema. El único costo es el compromiso: si dejás
de usarlo, lo seguís pagando.

**Pregunta:** ¿Por qué creés que un hotel remata las habitaciones que le quedan
vacías esa misma noche?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque una noche sin vender no se recupera nunca: algo
es mejor que nada. AWS hace lo mismo con la capacidad que le sobra y la vende
como **Spot**, con hasta 90 % de descuento. La condición es la misma que en el
hotel: si aparece alguien que paga la tarifa completa, te piden la habitación —
AWS te avisa **2 minutos antes** y te quita la instancia. Por eso Spot sirve
para trabajos que se pueden interrumpir y retomar, no para lo que tiene que
estar siempre disponible.

**Pregunta:** Cuando subís una foto a una red social y después la mirás mil
veces, ¿qué te parece que le cuesta más caro a esa empresa: que la subas o que
la miren?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que la miren. En AWS, **meter datos es gratis y sacarlos
hacia internet se cobra** por gigabyte. Subir la foto una vez no cuesta nada;
entregarla mil veces sí. Por eso la **transferencia de datos de salida** es el
renglón que más sorprende en la primera factura, y por eso conviene entregar el
contenido desde una red de distribución como CloudFront en vez de servirlo
directo desde el origen.

## 🎯 Pistas para el examen

- Buscá en el enunciado **cuánto compromiso acepta el cliente**. "Sin
  compromiso" ⇒ On-Demand. "Carga estable, 3 años" ⇒ Reserved o Savings Plans.
  "Se puede interrumpir" ⇒ Spot. Esa sola señal resuelve la mayoría.
- **Reserved vs. Savings Plans:** si el escenario menciona flexibilidad para
  cambiar de instancia, de Región o usar también Lambda y Fargate, es **Savings
  Plans**. Si es una instancia concreta que no va a cambiar, Reserved.
- **Dedicated Host es la respuesta cuando aparece la palabra "licencia"** atada
  a hardware físico, o una norma que exige servidores no compartidos. Si el
  escenario solo pide "más barato" o "aislado", no es la correcta: es cara.
- Cuidado con los distractores que ofrecen **Spot para algo crítico**. Si el
  escenario dice "producción", "siempre disponible" o "base de datos", Spot está
  descartado por más que sea la opción más barata.
- Ante cualquier duda de transferencia de datos, aplicá la regla: **entrada
  gratis, salida paga**. Muchas preguntas se contestan solo con eso.
