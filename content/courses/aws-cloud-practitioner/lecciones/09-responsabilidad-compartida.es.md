# 2.1 — Modelo de responsabilidad compartida

> Dominio 2 · Task Statement 2.1 — Understand the AWS shared responsibility model

## 🤔 Antes de empezar

- Si alquilás un departamento en un edificio, ¿de qué cosas se encarga la administración del edificio y de cuáles te encargás vos?
- Cuando guardás archivos en un servicio en la nube y alguien no autorizado los ve, ¿de quién dirías que es la culpa: de la empresa que da el servicio o tuya?
- ¿Esa división de responsabilidades será siempre la misma, o puede cambiar según el tipo de servicio que uses?

## 📘 Contenido

Hay una pregunta que aparece una y otra vez en el examen, con distintos
disfraces: **¿esto lo tiene que cuidar AWS o lo tengo que cuidar yo?** La
respuesta está en el **modelo de responsabilidad compartida**, que es
simplemente el acuerdo que dice quién se ocupa de qué en materia de
seguridad.

### El edificio de departamentos

Imaginá que alquilás un departamento. La administración del edificio se
encarga de la estructura, del ascensor, de las cámaras del hall, del portero
y de que la puerta principal cierre bien. Vos no vas a reforzar los cimientos
ni a arreglar el ascensor: no es tu trabajo, y ni siquiera te dejarían
hacerlo.

Pero dentro de tu departamento manda otra lógica. Vos decidís si cerrás la
puerta con llave, a quién le das una copia, qué guardás adentro y si dejás la
ventana abierta al salir. Si le prestás la llave a un desconocido y te
entran a robar, no es culpa del edificio.

AWS funciona igual. Se resume en dos frases que conviene memorizar:

- **AWS es responsable de la seguridad *de* la nube.** El edificio: los
  centros de datos, los servidores físicos, la red, la electricidad, las
  cámaras y guardias.
- **Vos sos responsable de la seguridad *en* la nube.** Tu departamento: tus
  datos, quién tiene acceso, cómo configuraste lo que levantaste ahí adentro.

Esa diferencia entre "de la nube" y "en la nube" parece un juego de palabras,
pero es exactamente lo que el examen quiere que sepas distinguir.

### Qué hace siempre AWS

Sin importar qué servicio uses, AWS se ocupa de:

- La **seguridad física** de los centros de datos: guardias, cámaras, control
  de acceso al edificio. Ningún cliente entra a tocar un servidor.
- El **hardware**: los servidores, los discos, los equipos de red, y
  destruirlos de forma segura cuando se dan de baja.
- La **infraestructura global**: las Regiones, las Zonas de disponibilidad y
  la red que las conecta.
- El **software base que hace funcionar el servicio**: la capa que permite
  que muchos clientes compartan el mismo hardware sin verse entre sí.

Nada de esto es negociable ni configurable por vos. Es el edificio.

### Qué hacés siempre vos

También hay cosas que son tuyas pase lo que pase:

- **Tus datos.** Qué subís, qué tan sensible es, si lo cifrás, cuánto tiempo
  lo guardás. AWS no mira tus datos ni decide por vos.
- **Quién tiene acceso.** Crear usuarios, darles permisos, activar la
  verificación en dos pasos, quitarle el acceso a alguien que se fue de la
  empresa. Esto se hace con un servicio llamado **IAM** (*Identity and Access
  Management*, gestión de identidades y accesos), que vemos en detalle en la
  lección 2.3.

Si alguien filtra información porque un usuario tenía más permisos de los que
necesitaba, eso es responsabilidad tuya, no de AWS.

### La línea se mueve según el servicio

Acá está la parte que más se pregunta, y la que más confunde: **la división
no está siempre en el mismo lugar**. Cuanto más se encarga AWS de administrar
el servicio, menos te queda a vos.

Pensalo como tres formas de resolver la comida:

- **Alquilar una cocina vacía:** te dan el espacio y los electrodomésticos,
  pero comprás los ingredientes, cocinás y limpiás vos.
- **Un servicio de viandas:** te traen la comida hecha; vos solo decidís qué
  pedir y a quién se la servís.
- **Un restaurante:** te sentás y comés. No te ocupás de nada de la cocina.

En AWS pasa lo mismo:

| Servicio | De qué se ocupa AWS | Qué te queda a vos |
|---|---|---|
| **EC2** (servidores virtuales) | El hardware y la capa que lo virtualiza | El sistema operativo y sus actualizaciones de seguridad, el software que instales, el firewall, tus datos y los accesos |
| **RDS** (base de datos administrada) | El hardware, el sistema operativo y las actualizaciones del motor de base de datos | La configuración de red, el cifrado, quién se conecta, tus datos y los accesos |
| **Lambda** (código sin servidores) | El hardware, el sistema operativo y todo el entorno donde corre tu código | Tu código, tus datos y los accesos |

Fijate el patrón: **a medida que bajás en la tabla, tu lista se acorta**. Con
EC2 tenés que instalar vos los parches de seguridad del sistema operativo;
con RDS eso ya lo hace AWS; con Lambda ni siquiera existe un sistema
operativo que puedas tocar.

Pero mirá también qué es lo que **nunca** desaparece de tu columna: tus datos
y los accesos. En los tres casos siguen siendo tuyos. Ese es el detalle que
más se cae en el examen.

### Las zonas compartidas

Hay algunas responsabilidades que son de los dos, cada uno en su parte. AWS
las llama **controles compartidos**:

- **Parches y actualizaciones:** AWS parchea la infraestructura; vos
  parcheás el sistema operativo y las aplicaciones que instalaste (si el
  servicio te deja tocarlos).
- **Configuración:** AWS configura sus dispositivos de red; vos configurás
  los tuyos, como el firewall de tus servidores.
- **Capacitación:** AWS entrena a su gente; vos entrenás a la tuya.

**En resumen:** AWS se encarga de la seguridad *de* la nube (el edificio:
centros de datos, hardware, red) y vos de la seguridad *en* la nube (tu
departamento: tus datos, tus accesos, tu configuración). Dónde está exactamente
la línea depende del servicio — con EC2 te toca bastante más que con Lambda —
pero tus datos y el control de quién accede a ellos son siempre tuyos.

## 💬 Ahora te toca a ti

**Pregunta:** Si alquilás un departamento en un edificio, ¿de qué cosas se
encarga la administración del edificio y de cuáles te encargás vos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La administración se ocupa de todo lo que es común y
estructural: los cimientos, el ascensor, la puerta de entrada, las cámaras
del hall, el portero. Vos te ocupás de lo que pasa puertas adentro: cerrar
con llave, decidir a quién le das una copia y qué guardás adentro. Es la
misma lógica del modelo de responsabilidad compartida: AWS cuida el edificio,
vos cuidás tu departamento.

**Pregunta:** Cuando guardás archivos en un servicio en la nube y alguien no
autorizado los ve, ¿de quién dirías que es la culpa: de la empresa que da el
servicio o tuya?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Casi siempre es responsabilidad tuya. Tus datos y los
permisos de acceso están siempre de tu lado del modelo, sin importar qué
servicio uses. Si alguien vio algo que no debía, en general es porque los
permisos estaban mal configurados o se compartió un acceso de más — no porque
AWS haya fallado. AWS solo respondería si el problema hubiera estado en la
infraestructura misma, algo que vos no podés configurar.

**Pregunta:** ¿Esa división de responsabilidades será siempre la misma, o
puede cambiar según el tipo de servicio que uses?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Cambia según el servicio. Cuanto más administrado sea,
menos te queda a vos: con EC2 tenés que mantener el sistema operativo
actualizado, con RDS eso ya lo hace AWS, y con Lambda no hay sistema
operativo que mantener. Lo que no cambia nunca es que tus datos y el control
de los accesos siguen siendo tuyos en todos los casos.

## 🎯 Pistas para el examen

- Ante cualquier pregunta de este tema, traducila mentalmente a: **¿esto es
  el edificio o es mi departamento?** Físico, hardware y red son de AWS;
  datos, permisos y configuración son tuyos.
- Si una opción dice que **AWS es responsable de tus datos o de tus permisos
  de IAM**, es incorrecta. Esas dos cosas nunca se le pasan a AWS, con ningún
  servicio.
- Si una opción dice que **el cliente es responsable de la seguridad física
  del centro de datos** o de mantener el hardware, también es incorrecta. Un
  cliente jamás toca eso.
- Cuando el escenario nombre un servicio puntual, preguntate cuán administrado
  es. "Parchear el sistema operativo" es tuyo en EC2, pero es de AWS en RDS y
  en Lambda — la misma tarea cambia de dueño según el servicio.
- Ojo con la palabra "cifrado": AWS te **da las herramientas** para cifrar,
  pero **decidir cifrar y configurarlo** es tuyo. Que exista la opción no
  significa que esté activada.
