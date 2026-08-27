# 3.6a — Almacenamiento: objetos y bloques

> Dominio 3 · Task Statement 3.6 — Identify AWS storage services

## 🤔 Antes de empezar

- ¿Qué diferencia hay entre guardar una caja completa en un depósito y tener un armario al lado de tu escritorio?
- Si tenés facturas de hace ocho años que por ley no podés tirar pero casi nunca mirás, ¿las guardarías en el mismo lugar que las de este mes?
- Si apagás tu computadora y la volvés a encender, ¿esperarías que tus archivos sigan ahí?

## 📘 Contenido

"Almacenamiento" parece una sola cosa, pero en AWS hay tipos distintos y el
examen quiere que sepas **cuál corresponde a cada situación**. Esta lección
cubre los dos primeros: objetos y bloques. Los archivos compartidos y las
copias de seguridad quedan para la 3.6b.

### Amazon S3: el depósito de objetos

**Amazon S3** (*Simple Storage Service*) guarda **objetos**: archivos
completos, cada uno con su nombre y su información asociada. No se edita un
pedacito de un archivo — se sube el archivo entero o se baja el archivo
entero.

Es el depósito con cajas rotuladas: guardás la caja, la buscás por su rótulo
y te la llevás completa. No entrás a cambiar un tornillo de adentro sin sacar
la caja.

Los archivos van en **buckets** (depósitos), y S3 sirve para casi todo lo que
sea "guardar archivos": fotos y videos de una aplicación, respaldos, archivos
de una página web, registros de actividad. Su capacidad es prácticamente
ilimitada y se paga por lo que guardás.

Una cosa que S3 hace sola y conviene saber: guarda cada archivo replicado en
varias instalaciones dentro de la Región, así que la probabilidad de perder
un objeto es despreciable. Que sea muy durable no significa que esté
protegido de que alguien lo borre por error — eso es otro problema, y se
resuelve más abajo.

### Las clases de S3: no todo se guarda igual

Acá está la segunda pregunta del principio. Guardar facturas de hace ocho años
en el mismo lugar que las de este mes es pagar de más: unas se consultan
todos los días, las otras casi nunca.

Por eso S3 tiene **clases de almacenamiento**, que cambian el precio según
cuánto accedas:

| Clase | Para qué | Idea general |
|---|---|---|
| **S3 Standard** | Datos que se usan seguido | Más caro de guardar, sin cargo por recuperar |
| **S3 Standard-IA** | Datos que se usan poco pero se necesitan ya | Más barato de guardar, con cargo por recuperar |
| **S3 Glacier** (varias variantes) | Archivo histórico que casi nunca se toca | Muy barato de guardar; recuperar puede tardar |
| **S3 Intelligent-Tiering** | Cuando no sabés qué tan seguido se va a usar | AWS mueve cada archivo a la clase que convenga |

S3 tiene además el **versionado**: si lo activás, cada vez que alguien
reemplaza o borra un archivo, la versión anterior se conserva. Es el seguro
contra el borrado accidental, que es de las formas más comunes de perder
información — y no requiere que nadie haga una copia a mano.

El patrón de las clases: **cuanto menos accedas, más barato guardar y más caro
(o más lento) recuperar.** Si el escenario dice "cumplimiento normativo", "retener por años"
o "casi nunca se consulta", la respuesta es Glacier. Si dice "no sabemos cómo
se va a usar", es Intelligent-Tiering.

### Amazon EBS: el disco de la instancia

Ahora la tercera pregunta. Una instancia EC2 necesita un disco donde tener su
sistema operativo y sus programas, igual que cualquier computadora.

**Amazon EBS** (*Elastic Block Store*) es ese disco. Almacenamiento de
**bloques**: el sistema operativo lo ve como un disco común y puede modificar
pedacitos de un archivo sin reescribirlo entero. Es el armario al lado de tu
escritorio, no el depósito lejano.

Dos características que el examen pregunta:

- **Es persistente:** si apagás la instancia y la volvés a encender, lo que
  está en el disco EBS sigue ahí.
- **Vive en una sola Zona de disponibilidad**, y normalmente se conecta a una
  sola instancia por vez. Se le pueden sacar **instantáneas** (*snapshots*),
  que se guardan en S3 y sirven de respaldo o para copiarlo a otra zona.

### Instance store: el escritorio que se limpia solo

Existe una tercera opción: el **instance store** es un disco físicamente
pegado al servidor donde corre la instancia. Es rapidísimo, pero **efímero**:
cuando la instancia se apaga, **todo lo que había ahí se pierde**.

Es el escritorio donde dejás papeles mientras trabajás y que alguien vacía
cada noche. Sirve para archivos temporales o caché, nunca para algo que
necesites conservar.

La distinción **EBS persistente / instance store efímero** es una de las más
preguntadas del tema.

### Objetos y bloques, uno al lado del otro

| | S3 (objetos) | EBS (bloques) |
|---|---|---|
| Qué guarda | Archivos completos | Un disco para una instancia |
| Cómo se modifica | Se reemplaza el archivo entero | Se puede cambiar una parte |
| Alcance | Accesible desde cualquier lado | Atado a una Zona de disponibilidad |
| Caso típico | Fotos, respaldos, sitios web | Sistema operativo y datos de un servidor |

**En resumen:** S3 guarda archivos completos como objetos, tiene capacidad
casi ilimitada y ofrece clases que abaratan el almacenamiento cuanto menos se
acceda, con Glacier para el archivo histórico. EBS es el disco persistente de
una instancia EC2, vive en una sola Zona de disponibilidad y se respalda con
instantáneas. Y el instance store es un disco muy rápido pero efímero, que se
borra cuando la instancia se apaga.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Qué diferencia hay entre guardar una caja completa en un
depósito y tener un armario al lado de tu escritorio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El depósito guarda la caja entera y la buscás por su
rótulo cuando la necesitás; el armario está pegado a tu puesto y abrís
directamente el cajón que te interesa. Esa es la diferencia entre
almacenamiento de **objetos** y de **bloques**: **S3** guarda archivos
completos y accesibles desde cualquier lado, mientras que **EBS** es el disco
de una instancia puntual, donde el sistema operativo puede modificar pedacitos
sin reescribir el archivo entero.

**Pregunta:** Si tenés facturas de hace ocho años que por ley no podés tirar
pero casi nunca mirás, ¿las guardarías en el mismo lugar que las de este mes?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, porque estarías pagando precio de acceso rápido
por algo que casi nunca se toca. En S3 eso se resuelve con las **clases de
almacenamiento**: las facturas del mes van en **S3 Standard** y las de hace
ocho años en **Glacier**, que es mucho más barato de guardar a cambio de que
recuperarlas tarde más. Si no supieras cuán seguido se van a consultar,
**Intelligent-Tiering** mueve cada archivo solo a la clase que corresponda.

**Pregunta:** Si apagás tu computadora y la volvés a encender, ¿esperarías que
tus archivos sigan ahí?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Sí, y eso es exactamente lo que hace **EBS**: es
almacenamiento **persistente**, así que lo que guardaste sigue estando después
de apagar y encender la instancia. Pero cuidado, porque existe una opción que
se comporta al revés: el **instance store**, que es más rápido pero
**efímero** — cuando la instancia se apaga, se pierde todo lo que había ahí.
Sirve para archivos temporales, nunca para datos que necesites conservar.

## 🎯 Pistas para el examen

- **Objetos vs. bloques** es la primera decisión. Si el escenario habla de
  archivos, fotos, videos, respaldos o un sitio web estático, es **S3**. Si
  habla del disco de una instancia o de un sistema operativo, es **EBS**.
- Ante **"retener por años", "cumplimiento normativo" o "casi nunca se
  consulta"**, la respuesta es **Glacier**. Ante **"no sabemos cómo se va a
  usar"**, es **Intelligent-Tiering**.
- **EBS es persistente, instance store es efímero.** Si una opción propone
  guardar datos importantes en instance store, es incorrecta siempre.
- Recordá que **EBS vive en una sola Zona de disponibilidad**. Si el escenario
  quiere sobrevivir a la caída de una zona, hacen falta instantáneas o
  replicar de otra forma.
- No confundas capacidad con durabilidad: S3 no es "más seguro" que EBS por
  ser ilimitado. Resuelven problemas distintos, no compiten.
