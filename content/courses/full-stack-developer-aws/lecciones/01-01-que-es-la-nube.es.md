# 1.1 — Qué es la nube y qué problema resuelve de verdad

> Módulo 1 · Lección 1.1 · Nivel: Básico · ⏱️ 20 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si abres una panadería y no sabes cuántos clientes vas a tener el primer mes, ¿compras de entrada diez hornos por si acaso, o empiezas con uno y ves qué pasa?
- Cuando entras a una página web desde tu celular, ¿dónde crees que está guardada esa página realmente?
- ¿Qué crees que pasaría si mañana tu tienda online se vuelve famosa de un día para otro y entran mil personas a la vez?

## 📘 Cómo funciona

### El problema de Doña Rosa

Doña Rosa tiene una panadería de barrio. Toma los pedidos por WhatsApp, los anota en un cuaderno y a veces se le pierde alguno. Quiere una página donde sus clientes pidan solos y ella vea todo en una pantalla.

Va a preguntar y le dicen: *"necesitas un servidor"*.

Un **servidor** no es nada mágico: es una computadora que está prendida todo el tiempo, conectada a internet, esperando que alguien le pida algo. Cuando escribes una dirección en el navegador, tu celular le manda un mensaje a esa computadora ("dame la página de la panadería") y esa computadora le contesta. Eso es todo. La diferencia con tu laptop es que no se apaga nunca y que está preparada para atender a muchas personas al mismo tiempo.

Hasta hace unos años, Doña Rosa solo tenía un camino: **comprar** esa computadora. Y ahí empiezan los problemas de verdad:

1. **Hay que adivinar el tamaño antes de saber nada.** ¿Cuántos clientes va a tener? ¿50 al mes o 5.000? Si compra chico y le va bien, la página se cae justo el día que más vende. Si compra grande y le va lento, pagó por una máquina que está dormida el 95% del tiempo.
2. **Hay que pagar todo por adelantado.** La computadora se paga hoy, los clientes llegan en seis meses. Ese dinero sale del bolsillo antes de que entre el primero.
3. **Hay que esperar.** Comprarla, que llegue, instalarla, configurarla: semanas.
4. **Hay que cuidarla.** ¿Quién cambia el disco cuando se rompe un domingo a las 3 de la mañana? ¿Qué pasa si se corta la luz? ¿Y si se moja? ¿Quién le instala las actualizaciones de seguridad?
5. **Crecer duele.** Si la panadería se vuelve famosa, hay que volver a empezar: comprar otra máquina, esperar, instalar.

A tener las computadoras en tu propio local se le llama **on-premises** ("en las instalaciones"). Es la forma tradicional, y sigue existiendo.

### Entonces, ¿qué es "la nube"?

**La nube es alquilar computadoras y servicios de otra empresa, por internet, y pagar solo por lo que usas.**

La analogía que mejor funciona es la de las sillas para una fiesta. Si organizas una fiesta de 100 personas una vez al año, no compras 100 sillas para guardarlas en el garaje los otros 364 días: las alquilas por el día, las usas, las devuelves y pagas solo por ese día. Si al final vienen 150 personas, llamas y pides 50 más.

Eso es exactamente lo que hace la nube con las computadoras. Amazon (o Google, o Microsoft) ya compró miles de servidores, los tiene en edificios enormes, con electricidad de respaldo, aire acondicionado, gente cuidándolos las 24 horas. Tú le alquilas un pedacito por hora, o por segundo, o por cada vez que alguien usa tu página.

Y "la nube" no es un lugar en el cielo: son **edificios llenos de computadoras** (se llaman *centros de datos*) repartidos por el mundo. Cuando entras a una página web, tu mensaje viaja hasta uno de esos edificios y vuelve. Que se llame "nube" es solo marketing: alguien dibujó una nubecita en un diagrama para no tener que dibujar los cables, y el nombre quedó.

### Los cinco problemas, resueltos

| El problema de comprar | Lo que hace la nube |
|---|---|
| Adivinar el tamaño | Empiezas chico y creces en minutos. Si te sobra, achicas. |
| Pagar por adelantado | Pagas al final del mes, solo lo que usaste. Sin compra inicial. |
| Esperar semanas | Un servidor nuevo está listo en 2 minutos. |
| Cuidar la máquina | El edificio, la luz, el aire, los discos rotos: problema de Amazon. |
| Crecer duele | Se agrega capacidad con un clic (o sola, automáticamente). |

Fíjate en el punto 2, porque es el que más cambia la vida de alguien que está aprendiendo: **no necesitas comprar nada para empezar**. Puedes construir la página de Doña Rosa hoy, sin invertir dinero, y si nadie la usa, no pagas casi nada. Ese es el motivo por el que este curso completo se puede hacer gratis.

### Las tres formas de alquilar (la analogía de la pizza)

Vas a escuchar tres siglas todo el tiempo. Se entienden en 30 segundos con pizza:

- **IaaS** (*Infrastructure as a Service*, infraestructura como servicio): te alquilan la cocina. Tú pones la masa, el queso, y horneas. Es el servidor "pelado": tú instalas todo. → *Ejemplo en AWS: EC2, que veremos en el módulo 12.*
- **PaaS** (*Platform as a Service*, plataforma como servicio): te dan la masa lista y el horno prendido. Tú solo pones los ingredientes que te interesan. → *Ejemplo en AWS: Lambda, el corazón del módulo 6.*
- **SaaS** (*Software as a Service*, software como servicio): pides la pizza hecha. No cocinas nada, solo la usas. → *Ejemplo: Gmail, Netflix, Spotify.*

En este curso vas a vivir sobre todo en el mundo PaaS: le das tu código a AWS y AWS se encarga de dónde y cómo se ejecuta. Es más barato, más rápido de aprender y hay muchísimo menos que mantener.

### Lo que la nube NO resuelve

Aquí es donde muchos cursos te mienten por omisión. Cuatro verdades incómodas:

1. **La nube no es automáticamente más barata.** Es más barata si la usas bien. Un servidor grande encendido todo el mes, olvidado, cuesta más que la alternativa. **Lo que se olvida encendido, se paga.**
2. **La nube no te quita la responsabilidad de la seguridad.** Amazon cuida el edificio y las máquinas; tú cuidas tus contraseñas, tus permisos y tus datos. A eso se le llama *responsabilidad compartida*.
3. **La nube no arregla un mal diseño.** Si tu página es lenta por cómo está hecha, ponerla en AWS la deja igual de lenta, pero con factura.
4. **La nube tiene un botón de gastar muy fácil de apretar.** Crear algo caro toma tres clics. Por eso, en la lección 1.6, lo primero que haremos —antes de crear cualquier otra cosa— es poner una alarma de gasto.

### ¿Y AWS?

**AWS** (*Amazon Web Services*) es la plataforma de nube de Amazon y la más usada del mundo. Empezó en 2006 alquilando espacio para guardar archivos y hoy ofrece más de 200 servicios distintos.

Esa cifra asusta, así que quítale el susto ahora: **en este curso vas a usar unos 15**. Con eso alcanza para construir y publicar una aplicación completa, de verdad, en internet. Los otros 185 existen para casos que no son el tuyo.

**En resumen:** la nube es alquilar computadoras y servicios por internet y pagar solo por lo que usas, en vez de comprar máquinas y cuidarlas tú. Resuelve el problema de adivinar cuánto vas a necesitar y de pagar por adelantado. Pero no perdona los descuidos: lo que dejas encendido, se factura.

## 🛠️ Manos a la obra

> 📋 Para esta práctica **no necesitas cuenta de AWS ni tarjeta de crédito**. La calculadora de precios es una página pública.
> 💚 Costo de esta práctica: **$0**. No se crea ningún recurso: es una calculadora, no la consola.

Vas a ponerle número a lo que acabas de leer. La idea es simple: comparar lo que cuesta un servidor encendido siempre contra uno encendido solo cuando se usa.

1. **Abre la calculadora.** Entra a [calculator.aws](https://calculator.aws) y haz clic en **Create estimate** (*crear estimación*).
   *Deberías ver:* un buscador de servicios con una lista larga debajo.

2. **Busca el servicio de servidores.** Escribe `EC2` en el buscador y elige **Amazon EC2** con el botón **Configure** (*configurar*).
   *Deberías ver:* un formulario con una región arriba y opciones de instancia debajo. EC2 es, justamente, "alquilar una computadora". Es el IaaS de la analogía de la pizza.

3. **Fija la región en `US East (N. Virginia)`.** Es la región que usaremos en todo el curso.
   *Por qué:* el mismo servidor cuesta distinto según el país donde esté la máquina. En la lección 1.7 vemos por qué.

4. **Elige un servidor chico.** En el buscador de instancias escribe `t3.micro` y selecciónalo. Es de los más pequeños: sirve perfecto para una página como la de Doña Rosa.
   *Deberías ver:* una descripción con 2 vCPU y 1 GiB de memoria.

5. **Déjalo encendido todo el mes.** En las opciones de uso (*Workload* o *Utilization*), elige el equivalente a **100% de uso / 730 horas al mes** y anota el número que aparece abajo, en **Estimated monthly cost**.
   *Deberías ver:* un costo del orden de **7 a 10 dólares al mes** (precio aproximado de `us-east-1`, consultado en agosto de 2026 — el número que vale es el que te muestre a ti la calculadora).

6. **Ahora enciéndelo solo 3 horas al día.** Cambia el uso a unas **90 horas al mes** y mira otra vez el total.
   *Deberías ver:* aproximadamente **la octava parte** del número anterior. Ahí está, en un número concreto, la frase "pagas solo por lo que usas".

7. **Guarda la comparación.** Anota los dos números en un papel o un archivo. Los vamos a volver a mirar en la lección 1.11, cuando estimes la factura de una aplicación completa.

## 💰 Costo y limpieza

- **Qué creaste:** nada. La calculadora de precios solo hace cuentas; no crea servidores ni pide cuenta de AWS.
- **Qué se factura:** nada. Este es el único tipo de lección con costo cero garantizado, incluso si te olvidas de cerrar la pestaña.
- **Limpieza:** no hay nada que borrar. Cierra la pestaña y listo.
- **Ojo con lo que viene:** a partir de la lección 1.4 vas a tener una cuenta real de AWS. Desde ahí, cada lección te va a decir exactamente qué se crea, qué cuesta y qué borrar.

## 💬 Ahora te toca a ti

**Pregunta:** Si abres una panadería y no sabes cuántos clientes vas a tener el primer mes, ¿compras de entrada diez hornos por si acaso, o empiezas con uno y ves qué pasa?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Empiezas con uno. Comprar diez sería gastar hoy un dinero que quizá nunca recuperes, y encima tendrías nueve hornos ocupando lugar y juntando polvo. Ese es exactamente el problema que resuelve la nube con las computadoras: en vez de comprar por adelantado la capacidad del "mejor escenario posible", alquilas lo que necesitas hoy y agregas más el día que de verdad haga falta. La diferencia es que agregar un horno toma semanas, y agregar un servidor en AWS toma dos minutos.

**Pregunta:** Cuando entras a una página web desde tu celular, ¿dónde crees que está guardada esa página realmente?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En una computadora ajena que está prendida todo el tiempo esperando pedidos: un servidor. Tu celular no "tiene" la página, la pide y la recibe. Si esa computadora está en el sótano de una empresa, es *on-premises*. Si está en un edificio de Amazon que le alquila pedacitos a miles de clientes, es "la nube". La nube no está en el cielo: es un edificio lleno de computadoras, en un país concreto, con una dirección concreta.

**Pregunta:** ¿Qué crees que pasaría si mañana tu tienda online se vuelve famosa de un día para otro y entran mil personas a la vez?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con un servidor comprado de tamaño fijo, lo más probable es que la página se ponga lentísima o directamente se caiga, justo el día que más ibas a vender; y arreglarlo significa comprar otra máquina y esperar. En la nube puedes crecer en minutos, e incluso dejar configurado que crezca sola cuando llega mucha gente y se achique cuando se va (eso se llama *elasticidad*, y lo vemos en el módulo 12). El lado B: si esa multitud llega, la factura de ese mes sube. Crecer sin límite y gastar sin límite son la misma moneda.

## ⚠️ Errores comunes

- **"La nube es gratis".** Confundir el Free Tier (la capa gratuita para empezar) con "AWS no cobra" → AWS cobra por casi todo; lo que hay es un conjunto de servicios y cantidades gratis con límites. Cuáles y cuánto, en la lección 1.3.
- **"La nube siempre sale más barata".** Se compara el precio de alquilar contra el de comprar, olvidando que alquilar sale caro si dejas todo encendido → la nube es barata cuando apagas lo que no usas. Por eso este curso te obliga a borrar lo que creas.
- **"La nube es donde están mis fotos".** Se mezcla el almacenamiento personal (Drive, iCloud) con la nube de infraestructura → esos son SaaS: productos terminados. Aquí vas a alquilar las piezas para construir tu propio producto.
- **Comparar precios de regiones distintas.** Se estima en una región y se despliega en otra, y el número no coincide → fija siempre la misma región (en este curso, `us-east-1`) antes de mirar cualquier precio.

## 🎯 Para llevarte

- Un servidor es una computadora prendida todo el tiempo esperando pedidos. La nube es alquilarla en vez de comprarla.
- El valor real de la nube no es la tecnología, es no tener que adivinar cuánto vas a necesitar ni pagarlo por adelantado.
- IaaS, PaaS y SaaS = cocina, masa lista o pizza a domicilio. Este curso vive sobre todo en PaaS.
- Lo que dejas encendido, se paga. Es la única regla que hay que memorizar del módulo 1.
- AWS tiene más de 200 servicios; con unos 15 se construye una aplicación completa.

**En la próxima lección:** vas a ver qué significa exactamente "full stack", qué partes tiene una aplicación web y cuál es el mapa completo de lo que vamos a construir juntos a lo largo del curso.
