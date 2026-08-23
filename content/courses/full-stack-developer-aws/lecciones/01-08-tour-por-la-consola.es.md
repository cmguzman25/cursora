# 1.8 — Tour por la consola: buscador, favoritos, cambio de región y CloudShell

> Módulo 1 · Lección 1.8 · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Cuando entras por primera vez a un supermercado enorme y buscas una sola cosa, ¿recorres todos los pasillos o buscas otra manera?
- Si tuvieras que usar una herramienta que tiene más de 200 menús, ¿qué te ayudaría más a no perderte?
- ¿Qué crees que sería más rápido para preguntarle algo a AWS: hacer cinco clics por menús, o escribir una línea de texto?

## 📘 Cómo funciona

La consola de AWS asusta la primera vez. Son más de 200 servicios, menús dentro de menús y un diseño que cambia cada tanto. La buena noticia: **no hay que aprendérsela**. Hay que aprender tres o cuatro atajos, y con eso alcanza para todo el curso.

### La regla de oro: no navegues, busca

Cuando entras a un supermercado gigante buscando canela, no recorres los doce pasillos: le preguntas a alguien o miras los carteles. En la consola de AWS pasa lo mismo, y el "alguien" es **el buscador de arriba**.

Escribes `S3` y te lleva a S3. Escribes `budget` y te lleva a los presupuestos. Es más rápido que cualquier menú y —lo importante— **no se rompe cuando AWS rediseña la interfaz**, que es lo que deja obsoletos a la mitad de los tutoriales de internet.

El buscador además encuentra tres tipos de cosas a la vez: servicios, funciones dentro de un servicio, y hasta documentación. Si no sabes dónde está algo, escríbelo.

### El mapa de la pantalla

Casi todo lo que necesitas está en la barra de arriba:

| Dónde | Qué es | Para qué lo vas a usar |
|---|---|---|
| Buscador (centro) | Busca servicios y funciones | Tu forma principal de moverte |
| Selector de región (derecha) | La región activa | Verificarla **antes** de crear algo (lección 1.7) |
| Menú de la cuenta (derecha) | Tu cuenta, credenciales, facturación | Encontrar **Billing**, que no está donde uno esperaría |
| Icono de terminal (derecha) | CloudShell | Una consola de comandos gratis, ya autenticada |
| Campanita | Notificaciones y estado de los servicios | Enterarte si algo de AWS está caído |

Dos detalles que vale la pena conocer desde hoy:

- **Los favoritos.** Cada servicio tiene una estrellita; al marcarla, queda fijado en una barra lateral para acceder de un clic. Con cuatro o cinco servicios anclados, dejas de buscar los de siempre.
- **"Visitados recientemente".** La página de inicio de la consola lleva la cuenta de dónde estuviste. Cuando retomas un ejercicio al día siguiente, suele ser el camino más corto.

### El idioma de la consola

Abajo del todo hay un selector de idioma, y la consola habla español perfectamente. Aun así, **este curso escribe los botones en inglés**, y te recomiendo dejar la consola en inglés al menos mientras aprendes. El motivo es puramente práctico: la documentación oficial, los mensajes de error, las respuestas de foros y el 95% de los tutoriales del mundo usan los nombres en inglés. Si tu pantalla dice "Crear bucket" y el error que buscas en Google dice `CreateBucket`, estás traduciendo de ida y vuelta todo el tiempo.

Si prefieres el español, adelante — solo ten presente que los nombres entre paréntesis de este curso son los que verás traducidos.

### CloudShell: una terminal gratis dentro del navegador

Vas a ver que muchas cosas en AWS se pueden hacer de dos formas: haciendo clics o escribiendo un comando. Los clics son mejores para aprender (ves las opciones, entiendes qué existe); los comandos son mejores para repetir (una línea contra veinte clics).

Para escribir comandos normalmente habría que instalar la AWS CLI en tu computadora y configurar credenciales — lo veremos en la lección 2.8. Pero AWS ofrece un atajo: **CloudShell**, una terminal Linux que se abre dentro del navegador, **ya autenticada con tu propia identidad**. Sin instalar nada, sin claves que guardar.

Lo que conviene saber antes de usarla:

- **No tiene costo propio.** Pagas solo los recursos que crees desde ahí, igual que si los crearas con clics.
- **Tienes 1 GB de almacenamiento persistente por región**, en tu carpeta personal (`$HOME`), sin costo. Lo que guardas ahí sobrevive al cierre de la sesión; **lo que guardes fuera de esa carpeta, no**.
- **La sesión se cierra sola tras 20-30 minutos sin actividad**, y también a las ~12 horas seguidas aunque estés trabajando. Los procesos corriendo no cuentan como actividad: si dejas algo ejecutándose y te vas, la sesión igual se cierra.
- **Si dejas de usar CloudShell en una región durante 120 días**, esos archivos se borran automáticamente. Volver a abrirla en esa región reinicia el contador.
- Puedes tener **hasta 10 terminales a la vez** por región.
- Tiene salida a internet, pero **nadie puede conectarse hacia ella**: no es un servidor, es tu terminal.

En este curso CloudShell es el plan B perfecto: si tu computadora se resiste a instalar algo, casi todo se puede hacer desde ahí.

### Una advertencia sobre las capturas de pantalla

La consola cambia de aspecto varias veces al año: botones que se mueven, menús que se renombran, páginas que se rediseñan. Por eso este curso **no usa capturas**: te describe qué deberías ver.

Si algún paso no coincide exactamente con tu pantalla, no es que lo hayas hecho mal — es que AWS movió algo. Busca por el nombre del botón con el buscador y sigue adelante. Esa flexibilidad es, en sí misma, una habilidad profesional.

**En resumen:** no memorices la consola: usa el buscador, ancla tus cuatro servicios habituales como favoritos y verifica siempre la región antes de crear algo. CloudShell te da una terminal gratis y ya autenticada, con 1 GB persistente por región y sesiones que se cierran tras 20-30 minutos de inactividad.

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (N. Virginia)**. Verifícala arriba a la derecha antes de empezar.
> 💚 Costo de esta práctica: **$0**. CloudShell no cuesta y los comandos de hoy solo consultan información; no crean nada.

### Parte 1 — Moverte sin perderte

1. **Entra a la consola** y escribe `S3` en el buscador de arriba.
   *Deberías ver:* resultados agrupados: el servicio S3, funciones y documentación. Pulsa Enter sobre el servicio.

2. **Ánclalo a favoritos.** Busca la estrellita junto al nombre del servicio y márcala.
   *Deberías ver:* S3 aparece en la barra de favoritos, accesible desde cualquier página de la consola.

3. **Repite con tres más:** `EC2`, `Lambda` y `Billing and Cost Management`.
   *Deberías ver:* cuatro favoritos. Son los que más vas a abrir en los próximos módulos.

4. **Encuentra la facturación por el otro camino.** Haz clic en tu nombre de cuenta (arriba a la derecha).
   *Deberías ver:* el menú con **Billing and Cost Management**, **Security credentials** y tu ID de cuenta. Recuerda que estas dos son las que usaste en las lecciones 1.5 y 1.6.

5. **Mira "Recently visited".** Vuelve a la página de inicio de la consola (el logotipo de AWS, arriba a la izquierda).
   *Deberías ver:* un panel con los servicios que acabas de visitar.

### Parte 2 — Tu primera terminal en AWS

6. **Abre CloudShell.** Haz clic en el icono de terminal de la barra superior (o búscalo como `CloudShell`).
   *Deberías ver:* un panel negro abriéndose, con un mensaje de bienvenida. La primera vez tarda un minuto en prepararse.

7. **Pregúntale a AWS quién eres.** Escribe y ejecuta:

   ```bash
   aws sts get-caller-identity
   ```

   *Deberías ver:* un JSON con tu `Account` (los 12 dígitos que anotaste) y un `Arn` que termina en `:root`.
   *Por qué importa:* ese `:root` es la confirmación de que estás usando la llave maestra. A partir del módulo 2 trabajarás con una identidad acotada y este mismo comando dirá otra cosa.

8. **Comprueba lo de la lección anterior.** Pide las zonas de disponibilidad de la región del curso:

   ```bash
   aws ec2 describe-availability-zones --region us-east-1 --query "AvailabilityZones[].ZoneName" --output table
   ```

   *Deberías ver:* una tabla con varias zonas (`us-east-1a`, `us-east-1b`, …). Ahí están, en concreto, las AZs de las que hablamos en la 1.7.

9. **Prueba el almacenamiento persistente.** Crea un archivo en tu carpeta personal:

   ```bash
   echo "Empecé el curso el $(date)" > ~/notas-curso.txt
   cat ~/notas-curso.txt
   ```

   *Deberías ver:* la frase con la fecha de hoy.

10. **Cierra CloudShell y vuelve a abrirlo.** Cierra el panel, navega a otra parte de la consola y ábrelo de nuevo. Ejecuta `cat ~/notas-curso.txt`.
    *Deberías ver:* el archivo sigue ahí. Ese es el gigabyte persistente. Si hubieras guardado el archivo en `/tmp`, habría desaparecido.

11. **Cambia de región y mira qué pasa.** Cambia a otra región y abre CloudShell allí. Ejecuta `ls ~`.
    *Deberías ver:* la carpeta **vacía**: el almacenamiento es de 1 GB **por región**, no compartido. Vuelve a `us-east-1` al terminar.

## 💰 Costo y limpieza

- **Qué creaste:** favoritos en la consola y un archivo de texto en tu carpeta de CloudShell. Nada de eso es un recurso facturable.
- **Qué se factura:** nada. CloudShell no tiene costo propio y los comandos de hoy solo leen información.
- **Límites que conviene recordar:** 1 GB por región gratis; los archivos se borran tras 120 días sin usar CloudShell en esa región; la sesión se cierra sola a los 20-30 minutos de inactividad.
- **Limpieza:** no borres nada. Los favoritos te van a ahorrar tiempo todo el curso.
- **Ojo con lo que viene:** desde CloudShell **sí** se pueden crear recursos que cuestan. Que la terminal sea gratis no hace gratis lo que ejecutes en ella.

## 💬 Ahora te toca a ti

**Pregunta:** Cuando entras por primera vez a un supermercado enorme y buscas una sola cosa, ¿recorres todos los pasillos o buscas otra manera?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Preguntas o miras los carteles: recorrer todo es la peor estrategia. En la consola de AWS el equivalente es el buscador de arriba, y es la forma correcta de moverse por dos motivos. Uno, es más rápido que cualquier menú. Dos, y más importante: **sobrevive a los rediseños**. AWS cambia la interfaz varias veces al año, así que "el menú de la izquierda, tercera opción" caduca, pero "busca S3" funciona siempre.

**Pregunta:** Si tuvieras que usar una herramienta que tiene más de 200 menús, ¿qué te ayudaría más a no perderte?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Un buscador y una lista corta de accesos directos a lo que usas de verdad. Eso es exactamente lo que ofrece la consola: el buscador para lo ocasional y los favoritos para tus cuatro o cinco servicios habituales. La idea de fondo, que sirve para todo el curso: **no intentes conocer los 200 servicios**. Vas a usar unos 15, y con favoritos los tienes todos a un clic. El resto lo buscas el día que lo necesites.

**Pregunta:** ¿Qué crees que sería más rápido para preguntarle algo a AWS: hacer cinco clics por menús, o escribir una línea de texto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Para una consulta puntual, la línea de comandos gana casi siempre — lo acabas de comprobar: una sola línea te devolvió todas las zonas de disponibilidad de la región. Pero los clics tienen su ventaja mientras aprendes: te muestran qué opciones existen, y eso un comando no te lo enseña. Por eso este curso hace la práctica con clics y te da el comando como complemento. Cuando ya sabes qué quieres, escribirlo es más rápido; cuando todavía no lo sabes, verlo es mejor.

## ⚠️ Errores comunes

- **Buscar el servicio recorriendo menús.** Se pierde tiempo y aparece frustración → el buscador de arriba es siempre el camino corto.
- **No encontrar la facturación.** No está entre los servicios como uno esperaría → está en el menú de tu nombre de cuenta, arriba a la derecha (o buscando `Billing`).
- **Consola en español y tutoriales en inglés.** Los nombres no coinciden y todo cuesta el doble → deja la consola en inglés mientras aprendes, o ten presente la traducción.
- **Perder trabajo en CloudShell.** Se guarda un archivo en `/tmp` o en otra carpeta y desaparece → solo persiste lo que está en tu carpeta personal (`~`), y solo en esa región.
- **Dejar un proceso corriendo en CloudShell y marcharse.** Se vuelve y la sesión está cerrada → los procesos en ejecución no cuentan como actividad: la sesión se cierra igual a los 20-30 minutos.
- **Creer que CloudShell hace gratis lo que se ejecuta ahí.** La terminal no cuesta; el servidor que enciendas desde ella, sí.

## 🎯 Para llevarte

- No memorices la consola: usa el buscador. Es más rápido y no caduca cuando AWS rediseña.
- Ancla tus servicios habituales como favoritos; con cuatro o cinco alcanza.
- La facturación vive en el menú de la cuenta, no entre los servicios.
- CloudShell te da una terminal ya autenticada, gratis, con 1 GB persistente por región y sesiones que caducan a los 20-30 minutos de inactividad.
- Si un paso no coincide con tu pantalla, AWS movió algo: busca por el nombre del botón y sigue. Es parte del oficio.

**En la próxima lección:** la última pieza de higiene antes de empezar a construir: cómo nombrar y etiquetar todo lo que crees para poder encontrarlo —y borrarlo— después. Es la costumbre que mantiene tu factura en cero durante los 16 módulos que vienen.
