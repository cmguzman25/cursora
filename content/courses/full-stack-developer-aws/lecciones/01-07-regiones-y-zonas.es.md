# 1.7 — Regiones y zonas de disponibilidad: por qué la región cambia el precio

> Módulo 1 · Lección 1.7 · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si abrieras una tienda online que vende sobre todo en Colombia, ¿dónde te convendría tener el depósito: en Bogotá o en Tokio? ¿Por qué?
- Una empresa guarda todo su inventario en un único depósito y se inunda. ¿Qué debería haber hecho distinto?
- ¿Se te ocurre por qué alquilar un servidor podría costar más caro en un país que en otro, si es exactamente la misma máquina?

## 📘 Cómo funciona

Ya tienes cuenta, cerradura y alarma. Ahora falta el mapa, porque **cada cosa que crees en AWS vive en un lugar físico concreto**, y elegir mal ese lugar te cuesta dinero, velocidad o ambas.

### Región: la ciudad

Una **región** es un grupo de centros de datos en una zona geográfica. AWS tiene hoy **39 regiones** repartidas por el mundo, y cada una tiene dos nombres:

- Uno para humanos: *N. Virginia*, *São Paulo*, *Irlanda*.
- Uno para máquinas: `us-east-1`, `sa-east-1`, `eu-west-1`.

El código es el que vas a ver mil veces: en la URL de la consola, en los nombres de recursos, en la documentación. Se lee fácil: `us` (Estados Unidos) + `east` (este) + `1` (la primera de esa zona).

Piensa en una cadena de supermercados: la región es **la ciudad** donde decides operar. Y como en el mundo real, la ciudad determina cuánto te cuesta el alquiler.

### Zona de disponibilidad: los depósitos de esa ciudad

Dentro de cada región hay **zonas de disponibilidad** (*Availability Zones*, AZ). En palabras de AWS, una AZ es *"uno o más centros de datos separados, con energía, redes y conectividad redundantes"*.

Los detalles que importan:

- Cada región tiene **al menos tres** AZs. En total hay **124** en el mundo.
- Están **separadas por kilómetros** entre sí, pero todas dentro de un radio de **100 km**.
- Se conectan por fibra dedicada, con tráfico **cifrado** y latencia lo bastante baja como para copiar datos entre ellas **al instante**.

Siguiendo la analogía: la región es la ciudad y las AZs son **tres depósitos en barrios distintos de esa ciudad**. Suficientemente lejos para que una inundación no se lleve los tres; suficientemente cerca para mover mercadería entre ellos en minutos.

¿Para qué sirve esto? Para lo de la segunda pregunta. Si guardas todo en un solo depósito y se inunda, cierras. Si tu aplicación corre en **dos AZs**, cuando una se cae la otra sigue atendiendo. Esa es, literalmente, la receta de la alta disponibilidad en AWS, y la vas a aplicar en los módulos 9 y 12.

Regla para grabarse: **una AZ es para aprender; dos o más es para producción.**

### Lo que se queda quieto

Aquí viene el concepto que causa más confusión al principio: **lo que creas en una región se queda en esa región**. No viaja solo. Si guardas archivos en `us-east-1`, no aparecen mágicamente en `eu-west-1`.

De ahí sale el error número uno del principiante: *"creé un bucket y desapareció"*. No desapareció: estás mirando otra región. La consola muestra únicamente lo que existe en la región seleccionada arriba a la derecha.

Por eso este curso fija una sola región. Cada práctica empieza recordándotelo.

### No todo es regional

Algunos servicios no viven en una región concreta, sino que son **globales**:

| Globales | Regionales |
|---|---|
| IAM (usuarios, roles y permisos) | EC2 (servidores) |
| Route 53 (dominios y DNS) | S3 (el bucket vive en una región) |
| CloudFront (la red de entrega) | Lambda (funciones) |
| Facturación y presupuestos | DynamoDB, RDS (bases de datos) |

El caso de S3 despista: **el nombre del bucket es único en todo el mundo** (por eso `mi-bucket` seguro ya está tomado), pero **los archivos viven en la región donde lo creaste**. Nombre global, datos regionales.

### Por qué el precio cambia según la región

Es exactamente la misma máquina virtual, pero el precio cambia. No es arbitrario: a AWS le cuesta distinto operar en cada país. Cambian el precio de la electricidad, el terreno, los impuestos, la conectividad y hasta el clima (refrigerar en Estocolmo es más barato que en São Paulo).

Como referencia general: **`us-east-1` suele ser de las más baratas** del mundo, y regiones como São Paulo están entre las más caras — la diferencia por el mismo servidor puede ser de decenas de puntos porcentuales. No te quedes con mi número: en la práctica de hoy vas a medirlo tú.

### Cómo se elige una región de verdad

En un trabajo real se decide con cuatro criterios, en este orden:

1. **Dónde están tus usuarios.** Los datos viajan a la velocidad de la luz por fibra, pero la distancia se nota: un servidor en Tokio atendiendo a clientes en Bogotá agrega un retraso perceptible en cada clic. Cerca de los usuarios, no cerca de ti.
2. **Qué dice la ley.** Hay datos que legalmente no pueden salir del país o del bloque (historias clínicas, datos bancarios, el RGPD europeo). Este criterio manda sobre todos los demás.
3. **Qué servicios hay.** No todas las regiones tienen todos los servicios. Los nuevos suelen estrenarse en `us-east-1` y tardan meses o años en llegar a las demás.
4. **Cuánto cuesta.** Cuando los tres anteriores empatan, decide el precio.

### Por qué este curso usa `us-east-1`

Por tres motivos concretos:

- Es de las más baratas, y todo el curso está pensado para gastar cero.
- Tiene **todos** los servicios, así que ninguna lección se te va a caer por "eso no está disponible en tu región".
- Hay cosas que **solo** funcionan ahí: los certificados HTTPS que usa CloudFront deben crearse en `us-east-1` (lo verás en el módulo 5) y las métricas de facturación viven únicamente en esa región.

Si algún día publicas para usuarios de tu país, mueves la aplicación a la región que les convenga. Aprender en `us-east-1` no te ata a nada.

### Un tercer tipo de lugar: los puntos de presencia

Además de regiones y AZs, AWS tiene **más de 750 puntos de presencia** (*edge locations*) y 15 cachés regionales. No son regiones: no puedes poner un servidor ahí. Son sitios pequeñitos, repartidos por muchísimas ciudades, que **guardan copias de tu contenido cerca del usuario** para que cargue más rápido.

Es la diferencia entre el depósito central y el kiosco de la esquina: el kiosco no fabrica nada, solo tiene copias de lo que más se pide. Eso es CloudFront, y lo montamos en el módulo 5.

**En resumen:** una región es una ciudad con al menos tres centros de datos independientes (AZs) a menos de 100 km entre sí; lo que creas en una región se queda ahí y solo lo ves si tienes esa región seleccionada. La región se elige por usuarios, ley, servicios disponibles y precio — y este curso usa `us-east-1` porque es barata, completa y obligatoria para un par de cosas que haremos más adelante.

## 🛠️ Manos a la obra

> 📍 Hoy la región **es** el tema. Vamos a cambiarla a propósito y volver a `us-east-1` al final.
> 💚 Costo de esta práctica: **$0**. No se crea ningún recurso; cambiar de región no cuesta nada.

### Parte 1 — El selector de región

1. **Entra a la consola** en [console.aws.amazon.com](https://console.aws.amazon.com) y mira **arriba a la derecha**, al lado de tu nombre de cuenta.
   *Deberías ver:* el nombre de una región, probablemente `N. Virginia` o la más cercana a ti.

2. **Ábrelo y mira la lista.** Haz clic en ese selector.
   *Deberías ver:* decenas de regiones con su nombre y su código (`us-east-1`, `sa-east-1`, `eu-west-1`…). Ese código es el que aparece en la documentación.

3. **Cambia a São Paulo** (`sa-east-1`) y **mira la barra de direcciones** del navegador.
   *Deberías ver:* que la URL ahora incluye `?region=sa-east-1`. Truco profesional: la región siempre está en la URL, así que si dudas de dónde estás parado, míralo ahí.

4. **Vuelve a `us-east-1` (N. Virginia).** Esta es la región del curso, de aquí en adelante siempre.
   *Deberías ver:* la URL con `?region=us-east-1`.

### Parte 2 — Cuánto cambia el precio

5. **Abre la calculadora** en [calculator.aws](https://calculator.aws) → **Create estimate** → busca `EC2` → **Configure**.
   *Deberías ver:* el formulario que ya conoces de la lección 1.1.

6. **Precio en Virginia.** Región `US East (N. Virginia)`, instancia `t3.micro`, uso 100% (730 horas al mes). Anota el costo mensual.
   *Deberías ver:* el mismo número del orden que te dio en la lección 1.1.

7. **Ahora São Paulo.** Cambia solo la región a `South America (São Paulo)`, dejando todo lo demás igual. Anota el nuevo costo.
   *Deberías ver:* un número claramente más alto. Misma máquina, mismo tiempo, otro país.

8. **Calcula la diferencia.** Divide el segundo entre el primero.
   *Por qué importa:* ese porcentaje es lo que te ahorras o te gastas **por una sola decisión tomada en 3 segundos** al crear el recurso. Escríbelo junto a los números de la lección 1.1.

### Parte 3 — No todo está en todas partes

9. **Abre la lista de servicios por región.** Busca `AWS Regional Services List` en el sitio de AWS y ábrela.
   *Deberías ver:* una tabla enorme de servicios contra regiones.

10. **Compara dos regiones.** Filtra por `us-east-1` y luego por una región pequeña (por ejemplo, alguna de reciente apertura) y fíjate en la diferencia de servicios disponibles.
    *Deberías ver:* que `us-east-1` los tiene prácticamente todos, y la otra bastantes menos. Esa es la razón número 3 para elegir región, ahora comprobada por ti.

## 💰 Costo y limpieza

- **Qué creaste:** nada. Cambiar de región, mirar precios y leer tablas no cuesta.
- **Qué se factura:** nada.
- **Limpieza:** no hay nada que borrar. Solo asegúrate de terminar con **`us-east-1` seleccionada**.
- **Costumbre que te va a ahorrar horas:** antes de crear cualquier recurso, mira la esquina superior derecha. Es un vistazo de un segundo que evita el clásico "¿dónde quedó lo que hice ayer?".

## 💬 Ahora te toca a ti

**Pregunta:** Si abrieras una tienda online que vende sobre todo en Colombia, ¿dónde te convendría tener el depósito: en Bogotá o en Tokio? ¿Por qué?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En Bogotá, porque cada envío desde Tokio tardaría muchísimo más. En AWS pasa igual con los datos: aunque viajan por fibra a velocidades enormes, la distancia se nota en cada ida y vuelta, y una página hace decenas de idas y vueltas. Por eso el primer criterio para elegir región es **dónde están tus usuarios**, no dónde estás tú. Con un matiz importante: para el contenido estático (imágenes, CSS, JavaScript) existen los puntos de presencia de CloudFront, que son como kioscos con copias cerca del cliente aunque tu "depósito" siga estando lejos.

**Pregunta:** Una empresa guarda todo su inventario en un único depósito y se inunda. ¿Qué debería haber hecho distinto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Repartirlo en varios depósitos suficientemente separados como para que un mismo accidente no los alcance a todos. Eso es exactamente una zona de disponibilidad: cada región tiene al menos tres, con energía y redes independientes, separadas por kilómetros pero dentro de 100 km, para que una falla local no se lleve todo y a la vez se puedan copiar datos entre ellas al instante. La aplicación que corre en dos AZs sobrevive a la caída de una; la que corre en una sola, no.

**Pregunta:** ¿Se te ocurre por qué alquilar un servidor podría costar más caro en un país que en otro, si es exactamente la misma máquina?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque el hardware es lo mismo, pero **operarlo** no: cambian el precio de la electricidad, el terreno, los impuestos, la conectividad y hasta lo que cuesta refrigerar según el clima. AWS traslada esas diferencias al precio por hora. Por eso la misma `t3.micro` sale bastante más cara en São Paulo que en Virginia, y por eso este curso trabaja en `us-east-1`: es de las más baratas y tiene todos los servicios. La lección de fondo es que **la región es una decisión de costo**, no solo técnica.

## ⚠️ Errores comunes

- **"Se me borró lo que creé ayer".** Se creó en una región y se busca en otra → mira el selector de arriba a la derecha, o el `?region=` de la URL. Nada se borró.
- **Seguir un tutorial que usa otra región.** Se copia medio ejercicio en `eu-west-1` y medio en `us-east-1`, y después nada se conecta → los recursos de regiones distintas no se ven entre sí. Fija `us-east-1` y tradúcelo mentalmente cuando el tutorial diga otra cosa.
- **Suponer que un servicio está en todas partes.** Se busca en el menú y no aparece → puede que no exista en esa región. Verifica en la lista de servicios por región antes de pensar que hiciste algo mal.
- **Elegir la región por cercanía a uno mismo.** "Estoy en Perú, uso São Paulo" → si tus usuarios están en otro lado, o si estás aprendiendo, esa cercanía te cuesta dinero sin darte velocidad donde importa.
- **Crear el certificado HTTPS en la región equivocada.** Aparece en el módulo 5 → los certificados que usa CloudFront **solo** valen si están en `us-east-1`. Es una de las excepciones que hay que saberse de memoria.

## 🎯 Para llevarte

- Región = ciudad (hoy 39). Zona de disponibilidad = uno o más centros de datos independientes dentro de esa ciudad (hoy 124, mínimo 3 por región, dentro de 100 km).
- Lo que creas en una región se queda ahí, y solo lo ves con esa región seleccionada.
- Una AZ para aprender, dos o más para producción.
- Se elige región por usuarios, ley, servicios disponibles y precio — en ese orden.
- Los puntos de presencia (750+) no ejecutan tu aplicación: solo guardan copias cerca del usuario. Eso es CloudFront.

**En la próxima lección:** un recorrido por la consola para que dejes de sentirte perdido: el buscador, los favoritos, dónde está cada cosa, cómo cambiar de región sin perder lo que estabas haciendo y qué es CloudShell (una terminal gratis dentro del navegador).
