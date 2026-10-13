import type { CourseManifest, LessonMeta, LocalizedText } from "../types";

/**
 * Generado a partir del `README.md` de este curso, que es el índice legible.
 * Cuando se agrega, renombra o reordena una clase, se cambia primero allí y
 * después aquí — la app navega por esta lista.
 *
 * Las 68 clases se reparten en 9 módulos: el alumno empieza sin saber qué es
 * una dirección IP y termina diseñando una red que no se queda sin
 * direcciones. Cómo se escribe cada clase está en `CONTRATO-DE-CLASES.md`.
 *
 * Ninguna clase lleva `kind`: este curso no tiene cuestionarios ni examen (ver
 * la sección 14 del contrato), así que todas vienen de un archivo Markdown y
 * no hace falta carpeta `preguntas/`.
 *
 * Las clases que todavía no están escritas se quedan listadas igualmente: la
 * app muestra un aviso de "no está lista" en lugar de romper, y así el curso
 * se puede publicar a medias.
 *
 * Los títulos llevan `en` en las 68, estén escritas o no: el índice del curso
 * se navega entero en inglés aunque la clase todavía no tenga su `.en.md`, y
 * sin el título traducido la lista saldría mezclada. En las clases ya escritas,
 * el título en inglés es el mismo que el `# ` de su archivo. Al escribir una
 * clase nueva se comprueba que sigan coincidiendo.
 */

const COURSE_SLUG = "redes-en-aws";
/** Mismo texto que el título del catálogo en `src/lib/courses.ts`: la tarjeta y
 *  la cabecera del curso salen de sitios distintos y no deben discrepar. */
const COURSE_TITLE: LocalizedText = {
  es: "Redes en AWS desde cero",
  en: "AWS Networking from Scratch",
  "pt-BR": "Redes na AWS do zero",
};

const MODULES: Record<string, LocalizedText> = {
  "modulo-0": {
    es: "Módulo 0 — Preparar el terreno",
    en: "Module 0 — Getting set up",
    "pt-BR": "Módulo 0 — Preparar o terreno",
  },
  "modulo-1": {
    es: "Módulo 1 — Redes sin nube",
    en: "Module 1 — Networking without the cloud",
    "pt-BR": "Módulo 1 — Redes sem nuvem",
  },
  "modulo-2": {
    es: "Módulo 2 — La VPC",
    en: "Module 2 — The VPC",
    "pt-BR": "Módulo 2 — A VPC",
  },
  "modulo-3": {
    es: "Módulo 3 — Controlar el tráfico",
    en: "Module 3 — Controlling traffic",
    "pt-BR": "Módulo 3 — Controlar o tráfego",
  },
  "modulo-4": {
    es: "Módulo 4 — Llegar a los servicios sin internet",
    en: "Module 4 — Reaching services without the internet",
    "pt-BR": "Módulo 4 — Chegar aos serviços sem internet",
  },
  "modulo-5": {
    es: "Módulo 5 — Conectar redes entre sí",
    en: "Module 5 — Connecting networks together",
    "pt-BR": "Módulo 5 — Conectar redes entre si",
  },
  "modulo-6": {
    es: "Módulo 6 — Conectar con tu oficina",
    en: "Module 6 — Connecting to your office",
    "pt-BR": "Módulo 6 — Conectar com seu escritório",
  },
  "modulo-7": {
    es: "Módulo 7 — Repartir y exponer tráfico",
    en: "Module 7 — Distributing and exposing traffic",
    "pt-BR": "Módulo 7 — Distribuir e expor tráfego",
  },
  "modulo-8": {
    es: "Módulo 8 — Diseñar, proteger y pagar",
    en: "Module 8 — Designing, protecting, and paying",
    "pt-BR": "Módulo 8 — Projetar, proteger e pagar",
  },
};

const LESSONS: LessonMeta[] = [
  // Módulo 0 — Preparar el terreno (3)
  { id: "00-01-como-usar-este-curso", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Cómo usar este curso", en: "How to use this course" } },
  { id: "00-02-presupuesto-y-alertas", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Tu presupuesto y tus alertas, antes de crear nada", en: "Your budget and your alerts, before you create anything" } },
  { id: "00-03-la-red-que-ya-tienes", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Primer vistazo: la red que AWS ya te dio", en: "First look: the network AWS already gave you" } },

  // Módulo 1 — Redes sin nube (13)
  { id: "01-01-que-es-una-red", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Qué es una red: dos máquinas y un cable", en: "What a network is: two machines and a cable" } },
  { id: "01-02-la-direccion-ip", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La dirección IP: qué identifica y qué no", en: "The IP address: what it identifies and what it doesn't" } },
  { id: "01-03-la-mascara-de-subred", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La máscara: dónde termina tu red y empieza el mundo", en: "The mask: where your network ends and the world begins" } },
  { id: "01-04-notacion-cidr", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La notación CIDR: qué significa de verdad /24", en: "CIDR notation: what /24 really means" } },
  { id: "01-05-por-que-partir-una-red", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Subredes: por qué partir una red en trozos", en: "Subnets: why you would split a network into pieces" } },
  { id: "01-06-calcular-un-rango", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Calcular un rango a mano, sin fórmulas raras", en: "Working out a range by hand, with no odd formulas" } },
  { id: "01-07-router-y-tabla-de-rutas", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El router y la tabla de rutas", en: "The router and the route table" } },
  { id: "01-08-ip-publica-y-privada", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "IP pública e IP privada: dos mundos y un malentendido", en: "Public IP and private IP: two worlds and one misunderstanding" } },
  { id: "01-09-nat", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "NAT: cómo salen muchos por una sola puerta", en: "NAT: how many get out through a single door" } },
  { id: "01-10-puertos-y-protocolos", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: 'Puertos y protocolos: qué es "el 443"', en: 'Ports and protocols: what "443" is' } },
  { id: "01-11-dns", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "DNS: del nombre al número", en: "DNS: from the name to the number" } },
  { id: "01-12-cortafuegos-con-y-sin-estado", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El cortafuegos: con estado y sin estado", en: "The firewall: stateful and stateless" } },
  { id: "01-13-el-viaje-de-un-paquete", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El viaje de un paquete, de punta a punta", en: "A packet's journey, end to end" } },

  // Módulo 2 — La VPC (11)
  { id: "02-01-que-es-una-vpc", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Qué es una VPC y qué no es", en: "What a VPC is and what it isn't" } },
  { id: "02-02-elegir-el-cidr", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Elegir el rango de tu VPC, y lo que no se deshace", en: "Choosing your VPC's range, and what can't be undone" } },
  { id: "02-03-crear-tu-vpc", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Tu primera VPC, vacía y hecha a mano", en: "Your first VPC, empty and built by hand" } },
  { id: "02-04-subredes-y-zonas", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Subredes y zonas de disponibilidad", en: "Subnets and availability zones" } },
  { id: "02-05-las-cinco-ips-reservadas", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Las cinco direcciones que AWS te quita", en: "The five addresses AWS takes away from you" } },
  { id: "02-06-tablas-de-rutas", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Tablas de rutas: la principal y las asociadas", en: "Route tables: the main one and the associated ones" } },
  { id: "02-07-internet-gateway", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Internet Gateway: qué hace pública a una subred", en: "Internet Gateway: what makes a subnet public" } },
  { id: "02-08-una-instancia-alcanzable", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Una instancia que sí responde", en: "An instance that actually replies" } },
  { id: "02-09-nat-gateway", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "NAT Gateway: salir sin ser alcanzable", en: "NAT Gateway: getting out without being reachable" } },
  { id: "02-10-subred-privada-con-nat", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "La subred privada, con NAT y con factura", en: "The private subnet, with NAT and with a bill" } },
  { id: "02-11-por-que-no-tengo-internet", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Por qué no tengo internet: el árbol de diagnóstico", en: "Why I have no internet: the diagnosis tree" } },

  // Módulo 3 — Controlar el tráfico (8)
  { id: "03-01-grupos-de-seguridad", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Grupos de seguridad: el guardia de cada tarjeta de red", en: "Security groups: the guard on every network card" } },
  { id: "03-02-reglas-de-entrada-y-salida", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Reglas de entrada y de salida", en: "Inbound and outbound rules" } },
  { id: "03-03-referenciar-otro-grupo", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Referenciar un grupo desde otro", en: "Referencing one group from another" } },
  { id: "03-04-listas-de-control-de-acceso", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Listas de control de acceso: el guardia del piso entero", en: "Access control lists: the guard for the whole floor" } },
  { id: "03-05-grupo-contra-lista", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Grupo de seguridad contra lista de red: cuándo cuál", en: "Security group versus network list: when to use which" } },
  { id: "03-06-romperlo-de-cinco-formas", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Diagnóstico: romper la conexión de cinco formas", en: "Diagnosis: breaking the connection five ways" } },
  { id: "03-07-registros-de-flujo", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Registros de flujo: ver lo que pasó y lo que no", en: "Flow logs: seeing what got through and what didn't" } },
  { id: "03-08-analizador-de-alcance", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "El analizador de alcance: preguntar antes de probar", en: "The reachability analyzer: asking before testing" } },

  // Módulo 4 — Llegar a los servicios sin internet (7)
  { id: "04-01-el-problema-del-acceso-privado", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "El problema: tu instancia privada necesita S3", en: "The problem: your private instance needs S3" } },
  { id: "04-02-endpoints-de-puerta", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Endpoints de puerta: S3 por la tabla de rutas", en: "Gateway endpoints: S3 through the route table" } },
  { id: "04-03-s3-sin-internet", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Lab: leer de S3 sin salir a internet", en: "Lab: reading from S3 without going out to the internet" } },
  { id: "04-04-endpoints-de-interfaz", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Endpoints de interfaz y PrivateLink", en: "Interface endpoints and PrivateLink" } },
  { id: "04-05-el-dns-de-los-endpoints", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "El DNS privado de los endpoints", en: "The private DNS of endpoints" } },
  { id: "04-06-politicas-de-endpoint", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Políticas de endpoint: cerrar la puerta por dentro", en: "Endpoint policies: locking the door from inside" } },
  { id: "04-07-publicar-tu-propio-servicio", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Publicar tu propio servicio con PrivateLink", en: "Publishing your own service with PrivateLink" } },

  // Módulo 5 — Conectar redes entre sí (7)
  { id: "05-01-por-que-una-vpc-esta-sola", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Por qué una VPC no habla con otra", en: "Why one VPC doesn't talk to another" } },
  { id: "05-02-vpc-peering", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "VPC Peering: el cable directo entre dos redes", en: "VPC Peering: the direct cable between two networks" } },
  { id: "05-03-lab-peering", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Lab: conectar dos VPC con peering", en: "Lab: connecting two VPCs with peering" } },
  { id: "05-04-los-limites-del-peering", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Los límites del peering: rangos que se pisan y saltos que no existen", en: "The limits of peering: overlapping ranges and hops that don't exist" } },
  { id: "05-05-transit-gateway", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Transit Gateway: el router de la región", en: "Transit Gateway: the region's router" } },
  { id: "05-06-tablas-del-transit-gateway", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Segmentar con las tablas del Transit Gateway", en: "Segmenting with Transit Gateway route tables" } },
  { id: "05-07-lab-transit-gateway", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Lab: un Transit Gateway en treinta minutos", en: "Lab: a Transit Gateway in thirty minutes" } },

  // Módulo 6 — Conectar con tu oficina (6)
  { id: "06-01-el-problema-hibrido", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "El problema híbrido: dos mundos y un plan de direcciones", en: "The hybrid problem: two worlds and one address plan" } },
  { id: "06-02-vpn-sitio-a-sitio", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "VPN de sitio a sitio: las cuatro piezas", en: "Site-to-site VPN: the four pieces" } },
  { id: "06-03-rutas-estaticas-y-bgp", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Rutas estáticas y BGP, sin ser ingeniero de redes", en: "Static routes and BGP, without being a network engineer" } },
  { id: "06-04-client-vpn", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Client VPN: cuando el que entra eres tú", en: "Client VPN: when the one coming in is you" } },
  { id: "06-05-direct-connect", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Direct Connect: qué es físicamente y por qué tarda semanas", en: "Direct Connect: what it physically is and why it takes weeks" } },
  { id: "06-06-dns-hibrido", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "El DNS híbrido con Route 53 Resolver", en: "Hybrid DNS with Route 53 Resolver" } },

  // Módulo 7 — Repartir y exponer tráfico (7)
  { id: "07-01-que-resuelve-un-balanceador", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Qué problema resuelve un balanceador", en: "What problem a load balancer solves" } },
  { id: "07-02-alb-nlb-y-gwlb", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "ALB, NLB y GWLB: cuál y por qué", en: "ALB, NLB, and GWLB: which one and why" } },
  { id: "07-03-grupos-de-destino-y-salud", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Grupos de destino y comprobaciones de salud", en: "Target groups and health checks" } },
  { id: "07-04-lab-balanceador", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Lab: un balanceador repartiendo entre dos zonas", en: "Lab: a load balancer sharing traffic across two zones" } },
  { id: "07-05-route-53", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Route 53: zonas públicas y zonas privadas", en: "Route 53: public zones and private zones" } },
  { id: "07-06-politicas-de-enrutamiento", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Las políticas de enrutamiento de Route 53", en: "Route 53's routing policies" } },
  { id: "07-07-cloudfront-y-global-accelerator", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "CloudFront y Global Accelerator: donde acaba tu VPC", en: "CloudFront and Global Accelerator: where your VPC ends" } },

  // Módulo 8 — Diseñar, proteger y pagar (6)
  { id: "08-01-dimensionar-una-red", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "Dimensionar una red que no se quede sin direcciones", en: "Sizing a network that won't run out of addresses" } },
  { id: "08-02-ipam-y-rangos-secundarios", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "IPAM y rangos secundarios: cuando te quedaste corto", en: "IPAM and secondary ranges: when you came up short" } },
  { id: "08-03-salida-centralizada", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "Patrones: salida centralizada e inspección", en: "Patterns: centralized egress and inspection" } },
  { id: "08-04-waf-shield-y-network-firewall", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "WAF, Shield y Network Firewall: qué protege qué", en: "WAF, Shield, and Network Firewall: what protects what" } },
  { id: "08-05-la-factura-de-red", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "La factura de red: lo que de verdad cuesta", en: "The networking bill: what it really costs" } },
  { id: "08-06-desmontaje-y-que-sigue", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "Desmontaje completo y hacia dónde seguir", en: "Full teardown and where to go next" } },
];

export const manifest: CourseManifest = {
  slug: COURSE_SLUG,
  title: COURSE_TITLE,
  lessons: LESSONS,
};
