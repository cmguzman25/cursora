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
  { id: "00-01-como-usar-este-curso", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Cómo usar este curso" } },
  { id: "00-02-presupuesto-y-alertas", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Tu presupuesto y tus alertas, antes de crear nada" } },
  { id: "00-03-la-red-que-ya-tienes", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Primer vistazo: la red que AWS ya te dio" } },

  // Módulo 1 — Redes sin nube (13)
  { id: "01-01-que-es-una-red", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Qué es una red: dos máquinas y un cable" } },
  { id: "01-02-la-direccion-ip", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La dirección IP: qué identifica y qué no" } },
  { id: "01-03-la-mascara-de-subred", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La máscara: dónde termina tu red y empieza el mundo" } },
  { id: "01-04-notacion-cidr", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La notación CIDR: qué significa de verdad /24" } },
  { id: "01-05-por-que-partir-una-red", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Subredes: por qué partir una red en trozos" } },
  { id: "01-06-calcular-un-rango", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Calcular un rango a mano, sin fórmulas raras" } },
  { id: "01-07-router-y-tabla-de-rutas", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El router y la tabla de rutas" } },
  { id: "01-08-ip-publica-y-privada", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "IP pública e IP privada: dos mundos y un malentendido" } },
  { id: "01-09-nat", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "NAT: cómo salen muchos por una sola puerta" } },
  { id: "01-10-puertos-y-protocolos", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: 'Puertos y protocolos: qué es "el 443"' } },
  { id: "01-11-dns", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "DNS: del nombre al número" } },
  { id: "01-12-cortafuegos-con-y-sin-estado", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El cortafuegos: con estado y sin estado" } },
  { id: "01-13-el-viaje-de-un-paquete", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El viaje de un paquete, de punta a punta" } },

  // Módulo 2 — La VPC (11)
  { id: "02-01-que-es-una-vpc", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Qué es una VPC y qué no es" } },
  { id: "02-02-elegir-el-cidr", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Elegir el rango de tu VPC, y lo que no se deshace" } },
  { id: "02-03-crear-tu-vpc", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Tu primera VPC, vacía y hecha a mano" } },
  { id: "02-04-subredes-y-zonas", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Subredes y zonas de disponibilidad" } },
  { id: "02-05-las-cinco-ips-reservadas", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Las cinco direcciones que AWS te quita" } },
  { id: "02-06-tablas-de-rutas", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Tablas de rutas: la principal y las asociadas" } },
  { id: "02-07-internet-gateway", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Internet Gateway: qué hace pública a una subred" } },
  { id: "02-08-una-instancia-alcanzable", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Una instancia que sí responde" } },
  { id: "02-09-nat-gateway", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "NAT Gateway: salir sin ser alcanzable" } },
  { id: "02-10-subred-privada-con-nat", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "La subred privada, con NAT y con factura" } },
  { id: "02-11-por-que-no-tengo-internet", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Por qué no tengo internet: el árbol de diagnóstico" } },

  // Módulo 3 — Controlar el tráfico (8)
  { id: "03-01-grupos-de-seguridad", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Grupos de seguridad: el guardia de cada tarjeta de red" } },
  { id: "03-02-reglas-de-entrada-y-salida", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Reglas de entrada y de salida" } },
  { id: "03-03-referenciar-otro-grupo", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Referenciar un grupo desde otro" } },
  { id: "03-04-listas-de-control-de-acceso", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Listas de control de acceso: el guardia del piso entero" } },
  { id: "03-05-grupo-contra-lista", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Grupo de seguridad contra lista de red: cuándo cuál" } },
  { id: "03-06-romperlo-de-cinco-formas", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Diagnóstico: romper la conexión de cinco formas" } },
  { id: "03-07-registros-de-flujo", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Registros de flujo: ver lo que pasó y lo que no" } },
  { id: "03-08-analizador-de-alcance", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "El analizador de alcance: preguntar antes de probar" } },

  // Módulo 4 — Llegar a los servicios sin internet (7)
  { id: "04-01-el-problema-del-acceso-privado", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "El problema: tu instancia privada necesita S3" } },
  { id: "04-02-endpoints-de-puerta", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Endpoints de puerta: S3 por la tabla de rutas" } },
  { id: "04-03-s3-sin-internet", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Lab: leer de S3 sin salir a internet" } },
  { id: "04-04-endpoints-de-interfaz", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Endpoints de interfaz y PrivateLink" } },
  { id: "04-05-el-dns-de-los-endpoints", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "El DNS privado de los endpoints" } },
  { id: "04-06-politicas-de-endpoint", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Políticas de endpoint: cerrar la puerta por dentro" } },
  { id: "04-07-publicar-tu-propio-servicio", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Publicar tu propio servicio con PrivateLink" } },

  // Módulo 5 — Conectar redes entre sí (7)
  { id: "05-01-por-que-una-vpc-esta-sola", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Por qué una VPC no habla con otra" } },
  { id: "05-02-vpc-peering", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "VPC Peering: el cable directo entre dos redes" } },
  { id: "05-03-lab-peering", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Lab: conectar dos VPC con peering" } },
  { id: "05-04-los-limites-del-peering", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Los límites del peering: rangos que se pisan y saltos que no existen" } },
  { id: "05-05-transit-gateway", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Transit Gateway: el router de la región" } },
  { id: "05-06-tablas-del-transit-gateway", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Segmentar con las tablas del Transit Gateway" } },
  { id: "05-07-lab-transit-gateway", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Lab: un Transit Gateway en treinta minutos" } },

  // Módulo 6 — Conectar con tu oficina (6)
  { id: "06-01-el-problema-hibrido", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "El problema híbrido: dos mundos y un plan de direcciones" } },
  { id: "06-02-vpn-sitio-a-sitio", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "VPN de sitio a sitio: las cuatro piezas" } },
  { id: "06-03-rutas-estaticas-y-bgp", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Rutas estáticas y BGP, sin ser ingeniero de redes" } },
  { id: "06-04-client-vpn", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Client VPN: cuando el que entra eres tú" } },
  { id: "06-05-direct-connect", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Direct Connect: qué es físicamente y por qué tarda semanas" } },
  { id: "06-06-dns-hibrido", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "El DNS híbrido con Route 53 Resolver" } },

  // Módulo 7 — Repartir y exponer tráfico (7)
  { id: "07-01-que-resuelve-un-balanceador", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Qué problema resuelve un balanceador" } },
  { id: "07-02-alb-nlb-y-gwlb", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "ALB, NLB y GWLB: cuál y por qué" } },
  { id: "07-03-grupos-de-destino-y-salud", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Grupos de destino y comprobaciones de salud" } },
  { id: "07-04-lab-balanceador", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Lab: un balanceador repartiendo entre dos zonas" } },
  { id: "07-05-route-53", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Route 53: zonas públicas y zonas privadas" } },
  { id: "07-06-politicas-de-enrutamiento", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Las políticas de enrutamiento de Route 53" } },
  { id: "07-07-cloudfront-y-global-accelerator", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "CloudFront y Global Accelerator: donde acaba tu VPC" } },

  // Módulo 8 — Diseñar, proteger y pagar (6)
  { id: "08-01-dimensionar-una-red", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "Dimensionar una red que no se quede sin direcciones" } },
  { id: "08-02-ipam-y-rangos-secundarios", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "IPAM y rangos secundarios: cuando te quedaste corto" } },
  { id: "08-03-salida-centralizada", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "Patrones: salida centralizada e inspección" } },
  { id: "08-04-waf-shield-y-network-firewall", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "WAF, Shield y Network Firewall: qué protege qué" } },
  { id: "08-05-la-factura-de-red", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "La factura de red: lo que de verdad cuesta" } },
  { id: "08-06-desmontaje-y-que-sigue", moduleId: "modulo-8", module: MODULES["modulo-8"], title: { es: "Desmontaje completo y hacia dónde seguir" } },
];

export const manifest: CourseManifest = {
  slug: COURSE_SLUG,
  title: COURSE_TITLE,
  lessons: LESSONS,
};
