# Redes en AWS desde cero — índice del curso

Curso de redes para quien usa AWS y no entiende de redes. Empieza por qué es una
dirección IP y termina en Transit Gateway, PrivateLink y el diseño de una red
que no se queda sin direcciones. **No prepara ninguna certificación**: sirve a
cualquiera que quiera entender el tema.

Las reglas de escritura están en `CONTRATO-DE-CLASES.md`. Este archivo es el
índice: los identificadores de aquí son los definitivos y de ellos sale el
índice que lee la app.

- **68 clases** en 9 módulos · 44 de concepto, 24 con consola
- Lecturas de 8 a 10 minutos · unas 11 horas de lectura, más los labs
- Región `us-east-1` · etiqueta `curso = redes-aws` · prefijo `redes-`
- **Sin cuestionarios y sin examen.** Cada clase cierra con su autoevaluación

Leyenda: **A** concepto (sin consola) · **B** concepto y consola ·
💚 sin costo · 💛 centavos · 🔴 cargos reales

---

## Módulo 0 — Preparar el terreno (3)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 0.1 | `00-01-como-usar-este-curso` | Cómo usar este curso | A | 💚 |
| 0.2 | `00-02-presupuesto-y-alertas` | Tu presupuesto y tus alertas, antes de crear nada | B | 💚 |
| 0.3 | `00-03-la-red-que-ya-tienes` | Primer vistazo: la red que AWS ya te dio | B | 💚 |

**Hito:** cuenta con alertas de gasto en 1, 5 y 10 USD, región fija y el hábito
de etiquetar y borrar.

## Módulo 1 — Redes sin nube (13)

Trece clases sin abrir la consola. Es deliberado: quien entra a la consola sin
esto aprende a hacer clics, no redes.

El orden de la 1.5 y la 1.6 se invirtió respecto al diseño inicial. "Calcular
un rango" hablaba de subredes sin que estuvieran definidas, y partir una red
es la razón por la que uno calcula rangos. Primero el porqué, después la
aritmética.

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 1.1 | `01-01-que-es-una-red` | Qué es una red: dos máquinas y un cable | A | 💚 |
| 1.2 | `01-02-la-direccion-ip` | La dirección IP: qué identifica y qué no | A | 💚 |
| 1.3 | `01-03-la-mascara-de-subred` | La máscara: dónde termina tu red y empieza el mundo | A | 💚 |
| 1.4 | `01-04-notacion-cidr` | La notación CIDR: qué significa de verdad `/24` | A | 💚 |
| 1.5 | `01-05-por-que-partir-una-red` | Subredes: por qué partir una red en trozos | A | 💚 |
| 1.6 | `01-06-calcular-un-rango` | Calcular un rango a mano, sin fórmulas raras | A | 💚 |
| 1.7 | `01-07-router-y-tabla-de-rutas` | El router y la tabla de rutas | A | 💚 |
| 1.8 | `01-08-ip-publica-y-privada` | IP pública e IP privada: dos mundos y un malentendido | A | 💚 |
| 1.9 | `01-09-nat` | NAT: cómo salen muchos por una sola puerta | A | 💚 |
| 1.10 | `01-10-puertos-y-protocolos` | Puertos y protocolos: qué es "el 443" | A | 💚 |
| 1.11 | `01-11-dns` | DNS: del nombre al número | A | 💚 |
| 1.12 | `01-12-cortafuegos-con-y-sin-estado` | El cortafuegos: con estado y sin estado | A | 💚 |
| 1.13 | `01-13-el-viaje-de-un-paquete` | El viaje de un paquete, de punta a punta | A | 💚 |

**Hito:** explica en voz alta el camino de un paquete desde su casa hasta un
servidor, sin nombrar AWS una sola vez.

## Módulo 2 — La VPC (11)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 2.1 | `02-01-que-es-una-vpc` | Qué es una VPC y qué no es | A | 💚 |
| 2.2 | `02-02-elegir-el-cidr` | Elegir el rango de tu VPC, y lo que no se deshace | A | 💚 |
| 2.3 | `02-03-crear-tu-vpc` | Tu primera VPC, vacía y hecha a mano | B | 💚 |
| 2.4 | `02-04-subredes-y-zonas` | Subredes y zonas de disponibilidad | B | 💚 |
| 2.5 | `02-05-las-cinco-ips-reservadas` | Las cinco direcciones que AWS te quita | A | 💚 |
| 2.6 | `02-06-tablas-de-rutas` | Tablas de rutas: la principal y las asociadas | B | 💚 |
| 2.7 | `02-07-internet-gateway` | Internet Gateway: qué hace pública a una subred | B | 💚 |
| 2.8 | `02-08-una-instancia-alcanzable` | Una instancia que sí responde | B | 💛 |
| 2.9 | `02-09-nat-gateway` | NAT Gateway: salir sin ser alcanzable | A | 💚 |
| 2.10 | `02-10-subred-privada-con-nat` | La subred privada, con NAT y con factura | B | 🔴 |
| 2.11 | `02-11-por-que-no-tengo-internet` | Por qué no tengo internet: el árbol de diagnóstico | A | 💚 |

**Hito:** una red propia con subred pública y privada, construida a mano y
funcionando, y sabe señalar la línea de la tabla de rutas que la hace funcionar.

## Módulo 3 — Controlar el tráfico (8)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 3.1 | `03-01-grupos-de-seguridad` | Grupos de seguridad: el guardia de cada tarjeta de red | B | 💚 |
| 3.2 | `03-02-reglas-de-entrada-y-salida` | Reglas de entrada y de salida | B | 💚 |
| 3.3 | `03-03-referenciar-otro-grupo` | Referenciar un grupo desde otro | B | 💚 |
| 3.4 | `03-04-listas-de-control-de-acceso` | Listas de control de acceso: el guardia del piso entero | B | 💚 |
| 3.5 | `03-05-grupo-contra-lista` | Grupo de seguridad contra lista de red: cuándo cuál | A | 💚 |
| 3.6 | `03-06-romperlo-de-cinco-formas` | Diagnóstico: romper la conexión de cinco formas | B | 💛 |
| 3.7 | `03-07-registros-de-flujo` | Registros de flujo: ver lo que pasó y lo que no | B | 💛 |
| 3.8 | `03-08-analizador-de-alcance` | El analizador de alcance: preguntar antes de probar | B | 💛 |

**Hito:** ante un bloqueo, sabe en qué orden mirar y si lo causó un grupo de
seguridad o una lista de red.

## Módulo 4 — Llegar a los servicios sin internet (7)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 4.1 | `04-01-el-problema-del-acceso-privado` | El problema: tu instancia privada necesita S3 | A | 💚 |
| 4.2 | `04-02-endpoints-de-puerta` | Endpoints de puerta: S3 por la tabla de rutas | B | 💚 |
| 4.3 | `04-03-s3-sin-internet` | Lab: leer de S3 sin salir a internet | B | 💚 |
| 4.4 | `04-04-endpoints-de-interfaz` | Endpoints de interfaz y PrivateLink | B | 🔴 |
| 4.5 | `04-05-el-dns-de-los-endpoints` | El DNS privado de los endpoints | A | 💚 |
| 4.6 | `04-06-politicas-de-endpoint` | Políticas de endpoint: cerrar la puerta por dentro | B | 🔴 |
| 4.7 | `04-07-publicar-tu-propio-servicio` | Publicar tu propio servicio con PrivateLink | A | 💚 |

**Hito:** una instancia sin ninguna salida a internet que lee de S3, y sabe
explicar por qué eso no es un agujero de seguridad.

## Módulo 5 — Conectar redes entre sí (7)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 5.1 | `05-01-por-que-una-vpc-esta-sola` | Por qué una VPC no habla con otra | A | 💚 |
| 5.2 | `05-02-vpc-peering` | VPC Peering: el cable directo entre dos redes | A | 💚 |
| 5.3 | `05-03-lab-peering` | Lab: conectar dos VPC con peering | B | 💚 |
| 5.4 | `05-04-los-limites-del-peering` | Los límites del peering: rangos que se pisan y saltos que no existen | A | 💚 |
| 5.5 | `05-05-transit-gateway` | Transit Gateway: el router de la región | A | 💚 |
| 5.6 | `05-06-tablas-del-transit-gateway` | Segmentar con las tablas del Transit Gateway | A | 💚 |
| 5.7 | `05-07-lab-transit-gateway` | Lab: un Transit Gateway en treinta minutos | B | 🔴 |

**Hito:** dos redes que se hablan, y el argumento de cuándo el peering deja de
escalar y hay que cambiar de herramienta.

## Módulo 6 — Conectar con tu oficina (6)

Módulo entero de concepto. Una conexión dedicada necesita un circuito físico y
semanas de trámite, y una VPN de verdad necesita un equipo al otro lado. Fingir
un lab de esto sería mentir; ver la sección 6 del contrato.

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 6.1 | `06-01-el-problema-hibrido` | El problema híbrido: dos mundos y un plan de direcciones | A | 💚 |
| 6.2 | `06-02-vpn-sitio-a-sitio` | VPN de sitio a sitio: las cuatro piezas | A | 💚 |
| 6.3 | `06-03-rutas-estaticas-y-bgp` | Rutas estáticas y BGP, sin ser ingeniero de redes | A | 💚 |
| 6.4 | `06-04-client-vpn` | Client VPN: cuando el que entra eres tú | A | 💚 |
| 6.5 | `06-05-direct-connect` | Direct Connect: qué es físicamente y por qué tarda semanas | A | 💚 |
| 6.6 | `06-06-dns-hibrido` | El DNS híbrido con Route 53 Resolver | A | 💚 |

**Hito:** elige entre VPN y conexión dedicada con argumentos de costo, latencia
y plazo de entrega.

## Módulo 7 — Repartir y exponer tráfico (7)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 7.1 | `07-01-que-resuelve-un-balanceador` | Qué problema resuelve un balanceador | A | 💚 |
| 7.2 | `07-02-alb-nlb-y-gwlb` | ALB, NLB y GWLB: cuál y por qué | A | 💚 |
| 7.3 | `07-03-grupos-de-destino-y-salud` | Grupos de destino y comprobaciones de salud | A | 💚 |
| 7.4 | `07-04-lab-balanceador` | Lab: un balanceador repartiendo entre dos zonas | B | 🔴 |
| 7.5 | `07-05-route-53` | Route 53: zonas públicas y zonas privadas | B | 💛 |
| 7.6 | `07-06-politicas-de-enrutamiento` | Las políticas de enrutamiento de Route 53 | A | 💚 |
| 7.7 | `07-07-cloudfront-y-global-accelerator` | CloudFront y Global Accelerator: donde acaba tu VPC | A | 💚 |

**Hito:** un balanceador repartiendo entre dos zonas, con sus comprobaciones de
salud entendidas (que son el origen de la mayoría de los fallos).

## Módulo 8 — Diseñar, proteger y pagar (6)

| # | id | Título | Tipo | $ |
|---|---|---|---|---|
| 8.1 | `08-01-dimensionar-una-red` | Dimensionar una red que no se quede sin direcciones | A | 💚 |
| 8.2 | `08-02-ipam-y-rangos-secundarios` | IPAM y rangos secundarios: cuando te quedaste corto | A | 💚 |
| 8.3 | `08-03-salida-centralizada` | Patrones: salida centralizada e inspección | A | 💚 |
| 8.4 | `08-04-waf-shield-y-network-firewall` | WAF, Shield y Network Firewall: qué protege qué | A | 💚 |
| 8.5 | `08-05-la-factura-de-red` | La factura de red: lo que de verdad cuesta | A | 💚 |
| 8.6 | `08-06-desmontaje-y-que-sigue` | Desmontaje completo y hacia dónde seguir | B | 💚 |

**Hito:** dimensiona una red para una empresa que va a crecer, y sabe de
antemano qué partes de esa red van a aparecer en la factura.

---

## Registro maestro de recursos

La regla está en la sección 5.3 del contrato: nada se borra si una clase
posterior lo necesita, y **nada sobrevive al curso**. Esta tabla es la que manda.
Si una clase deja vivo algo que cuesta, aquí tiene que aparecer la clase que lo
mata.

| Recurso | Lo crea | Lo borra | Costo mientras vive |
|---|---|---|---|
| VPC `redes-vpc-principal` y sus subredes | 2.3 / 2.4 | 8.6 | 💚 gratis |
| Tabla de rutas pública y privada | 2.6 | 8.6 | 💚 gratis |
| Internet Gateway `redes-igw` | 2.7 | 8.6 | 💚 gratis |
| Instancia `redes-web-a` (`t3.micro`) | 2.8 | 3.8 | 💛 capa gratuita, ~0,01 USD/h fuera de ella |
| NAT Gateway `redes-nat` | 2.10 | **2.11** | 🔴 ~0,045 USD/h + 0,045 USD/GB |
| Instancia privada `redes-privada-a` | 2.10 | 4.6 | 💛 capa gratuita |
| Grupos de seguridad y listas de red | 3.1 / 3.4 | 8.6 | 💚 gratis |
| Registros de flujo + grupo de CloudWatch | 3.7 | 3.8 | 💛 centavos por GB ingerido |
| Bucket `redes-lab-<tu-sufijo>` | 4.3 | 4.6 | 💚 gratis a este volumen |
| Endpoint de puerta a S3 | 4.2 | 8.6 | 💚 gratis |
| Endpoint de interfaz | 4.4 | **4.6** | 🔴 ~0,01 USD/h por zona + datos |
| Segunda VPC `redes-vpc-b` | 5.3 | 5.7 | 💚 gratis |
| Peering entre las dos VPC | 5.3 | 5.7 | 💚 gratis (el tráfico entre zonas sí se cobra) |
| Transit Gateway y sus conexiones | 5.7 | **5.7** | 🔴 ~0,05 USD/h por conexión + 0,02 USD/GB |
| Balanceador de aplicación | 7.4 | **7.4** | 🔴 ~0,0225 USD/h + unidades de capacidad |
| Segunda instancia `redes-web-b` | 7.4 | 7.4 | 💛 capa gratuita |
| Zona privada de Route 53 | 7.5 | 8.6 | 💛 ~0,50 USD/mes por zona |

Las clases en **negrita** en la columna de borrado son las que matan el recurso
dentro de la misma clase o muy poco después, porque cuesta demasiado dejarlo
vivo. Las demás viven hasta el desmontaje de la 8.6.

Precios aproximados de `us-east-1`, consultados el 3 de octubre de 2026. Las
clases repiten el aviso de verificar el precio actual.

---

## Estado

| Archivo | Estado |
|---|---|
| `CONTRATO-DE-CLASES.md` | Terminado |
| `README.md` | Terminado |
| `verificar-lecciones.mjs` | Terminado, y probado contra dos archivos rotos a propósito (uno por tipo) |
| **Módulo 1 completo** (13 clases, 1.1 a 1.13) | Escritas y en verde. Marcadas `[~]`: ver abajo |
| `lecciones/02-07-internet-gateway.es.md` | Clase piloto de tipo B, en verde |
| Los módulos 0 y 2 a 8 (54 clases) | Sin escribir |

El módulo 1 ha pasado dos revisiones manuales.

**La primera**, estructural, encontró ocho cosas: cuatro siglas sin desplegar,
una clase sin retomar ninguna de sus preguntas de apertura, dos referencias
cruzadas equivocadas, una afirmación de más sobre la ruta `local` de AWS, y el
orden de la 1.5 y la 1.6.

**La segunda**, leyendo las trece seguidas, encontró siete más. La gorda: solo
una de las trece cerraba su analogía diciendo dónde deja de valer, que es lo
que la sección 7 del contrato exige. Las otras seis: una tabla de máscaras
incompleta que dejaba sin resolver el reto de su propia clase, dos errores de
índice (`base+1` y `base+2` descritos como "la primera" y "la segunda"
dirección), una referencia a una tercera columna en una tabla de dos, un
rótulo bajo la columna equivocada en un diagrama, y negrita dentro de comillas
invertidas, que se habría impreso literal.

Tres de esas comprobaciones son ahora automáticas, y las tres se han probado
en rojo contra un archivo roto a propósito.

Ninguna clase está marcada `[x]` todavía:

- **Módulo 1.** No toca la consola, así que no hay pasos que probar. Falta que
  alguien lea las trece seguidas y juzgue si las analogías ayudan de verdad.
- **Clase 2.7.** Sus pasos de menú salen de la documentación de AWS y **nadie
  los ha pulsado**. Hasta que alguien recorra el lab en una cuenta real, se
  queda en `[~]`.

**Pasar el verificador no es estar verificada**: el script mide forma, no
verdad.

Marcas de estado: `[x]` terminada, pasada por el verificador **y** revisada a
mano · `[~]` escrita y en verde, pendiente de revisión manual o de probar sus
pasos en la consola real · `[ ]` sin escribir.

## Pendiente para conectar el curso a la app

Nada de esto existe todavía; el curso no aparece en la aplicación hasta que se
haga. Son cuatro cosas:

1. **`manifest.ts`** en esta carpeta, exportando `manifest: CourseManifest` con
   las 68 clases de este índice. Los identificadores son los de las tablas de
   arriba. Ninguna lleva `kind`: no hay cuestionarios ni examen.
2. **`content/courses/registry.ts`** — importar el manifest y añadirlo a
   `COURSE_MANIFESTS`. No hay que tocar `EXAM_QUIZZES` ni `PRACTICE_EXAMS`.
3. **`src/lib/courses.ts`** — una entrada en `COURSES` con
   `slug: "redes-en-aws"`, `category: "programming"`, `level: "beginner"`,
   `durationHours: 35`, y título y descripción en los tres idiomas.
4. **No hace falta carpeta `preguntas/`.** Un curso sin clases de tipo
   cuestionario no la necesita.

Un aviso que ahorra una hora: el título del manifest y el del catálogo se leen
desde sitios distintos — uno sale en la tarjeta y otro en la cabecera del curso.
Tienen que ser el mismo texto: **Redes en AWS desde cero**.

## Lo que este curso no cubre

Dicho aquí para que nadie lo busque: IPv6 más allá de una mención, multicast,
los detalles del protocolo BGP más allá de para qué sirve, la configuración del
equipo del lado del cliente en una VPN, redes de contenedores en EKS, y
certificaciones. Nada de eso cabe sin romper la regla de una idea por clase.
