# AWS Certified Cloud Practitioner (CLF-C02)

> Nota: el nombre oficial de la certificación es **AWS Certified Cloud Practitioner**
> (no "Cloud Partitioner"). Es el examen fundacional de AWS, pensado para quien
> quiere demostrar conocimiento general de la nube de AWS sin necesitar experiencia
> técnica previa.

Curso para preparar el examen **CLF-C02**, la versión vigente de la certificación.
Este archivo es el índice general: iremos creando el contenido de cada lección,
módulo a módulo, dentro de esta misma carpeta.

## Ficha del examen

| | |
|---|---|
| Código | CLF-C02 |
| Preguntas | 65 (50 puntuables + 15 no puntuables, sin identificar cuáles) |
| Tipo de preguntas | Opción múltiple y respuesta múltiple |
| Duración | 90 minutos |
| Puntaje para aprobar | 700 / 1000 (escala 100–1000) |
| Costo | 100 USD |
| Modalidad | Centro Pearson VUE o examen online supervisado |
| Vigencia del certificado | 3 años |
| Prerrequisitos | Ninguno (se recomiendan ~6 meses de exposición a AWS, no obligatorio) |
| Idiomas | Inglés, español y otros 11 idiomas |

**Fuera de alcance del examen** (no se evalúa): programar, diseñar arquitecturas,
resolver incidentes, implementar soluciones, ni pruebas de carga/rendimiento. Es un
examen de conocimiento conceptual, no práctico.

## Dominios y peso en el examen

| Dominio | Peso |
|---|---|
| 1. Conceptos de la nube | 24% |
| 2. Seguridad y cumplimiento | 30% |
| 3. Tecnología y servicios en la nube | 34% |
| 4. Facturación, precios y soporte | 12% |

El dominio 3 es el más extenso, pero el dominio 2 (seguridad) pesa casi lo mismo
repartido en solo 4 temas oficiales — vale la pena no subestimarlo.

*Fuente: guía oficial de examen de AWS (docs.aws.amazon.com/aws-certification),
consultada en agosto de 2026. AWS actualiza estas guías de tanto en tanto — conviene
recontrastar el índice contra la guía oficial antes de dar el curso por cerrado.*

## Cómo vamos a trabajar

1. Este `README.md` es el índice vivo del curso: se va marcando `[x]` cada lección
   a medida que la desarrollamos.
2. Cada lección será su propio archivo Markdown dentro de `lecciones/`, con el
   nombre indicado entre paréntesis en cada punto del índice, y sigue la
   estructura fija definida en `CONTRATO-DE-CLASES.md`.
3. Vamos módulo por módulo, en el orden de los dominios oficiales, salvo que
   prefieras otro orden.

**Sobre este rediseño:** la primera versión del índice cubría todos los temas
oficiales, pero como experiencia de aprendizaje era delgada — un solo paso por
cada tema, sin repaso comparativo entre servicios parecidos, y un par de
lecciones (almacenamiento, y "otras categorías de servicios") mezclaban
demasiados servicios distintos en una sola lección. Este índice corrige eso
con tres cambios:

- **Una lección de "tablas comparativas" al final de cada módulo de contenido**
  (marcada con ★), enfocada en el tipo de pregunta que más aparece en el
  examen real: "¿cuándo usarías X en vez de Y?".
- **Las lecciones más sobrecargadas se dividieron en dos**, para que cada
  archivo siga siendo explicable de forma simple sin quedar superficial.
- **Una lección de "analiza preguntas de examen" al cierre de cada módulo 1-4**
  (justo después de la de tablas comparativas): 20 preguntas con el formato
  real del examen (opción múltiple / respuesta múltiple), explicando por qué
  la correcta es correcta y por qué cada una de las otras opciones está mal.
  No es un simulacro cronometrado ni tiene puntaje — es una sección de
  análisis, para entrenar el ojo a detectar las trampas del examen mientras
  el módulo todavía está fresco. El formato exacto está definido en
  `CONTRATO-DE-CLASES.md`.

---

## Módulo 0 — Bienvenida y preparación

- [x] 0.1 Objetivos del curso y cómo está organizado (`lecciones/00-bienvenida.md`)
- [x] 0.2 Cómo crear y proteger una cuenta AWS Free Tier para practicar (`lecciones/01-cuenta-free-tier.md`)
- [x] 0.3 Cómo inscribirse al examen y qué esperar el día de la prueba (`lecciones/02-inscripcion-examen.md`)

## Módulo 1 — Conceptos de la nube (Dominio 1 · 24%)

- [x] 1.1 Beneficios de AWS Cloud: agilidad, elasticidad, alta disponibilidad,
      alcance de la infraestructura global (`lecciones/03-beneficios-de-aws.md`)
- [x] 1.2 Principios de diseño: los 6 pilares del AWS Well-Architected Framework
      (excelencia operativa, seguridad, fiabilidad, eficiencia de rendimiento,
      optimización de costos, sostenibilidad) (`lecciones/04-well-architected-framework.md`)
- [x] 1.3 Migración a la nube: AWS Cloud Adoption Framework (AWS CAF) y
      estrategias de migración (`lecciones/05-migracion-y-aws-caf.md`)
- [x] 1.4 Economía de la nube: costos fijos vs. variables, licenciamiento (BYOL),
      rightsizing, economías de escala (`lecciones/06-economia-de-la-nube.md`)
- [x] ★ 1.5 Tablas comparativas: pilares del Well-Architected uno junto al otro,
      CapEx vs. OpEx, y cuándo aplica cada estrategia de migración
      (`lecciones/07-comparativas-conceptos-de-la-nube.md`)
- [ ] 1.6 Analiza preguntas de examen: 20 preguntas de conceptos de la nube,
      con el porqué de cada opción correcta e incorrecta
      (`lecciones/08-analisis-preguntas-modulo-1.md`)

## Módulo 2 — Seguridad y cumplimiento (Dominio 2 · 30%)

- [ ] 2.1 Modelo de responsabilidad compartida y cómo cambia según el servicio
      (EC2, RDS, Lambda) (`lecciones/09-responsabilidad-compartida.md`)
- [ ] 2.2 Seguridad, gobierno y cumplimiento: AWS Artifact, cifrado en tránsito/reposo,
      CloudWatch, CloudTrail, AWS Config (`lecciones/10-gobierno-y-cumplimiento.md`)
- [ ] 2.3 Gestión de accesos: IAM (usuarios, grupos, roles, políticas), usuario root,
      MFA, IAM Identity Center, principio de menor privilegio (`lecciones/11-iam-y-gestion-de-accesos.md`)
- [ ] 2.4 Componentes y recursos de seguridad: WAF, Firewall Manager, Shield,
      GuardDuty, Trusted Advisor, AWS Marketplace (`lecciones/12-servicios-de-seguridad.md`)
- [ ] ★ 2.5 Tablas comparativas: GuardDuty vs. Inspector vs. Macie vs. Security
      Hub vs. Trusted Advisor — qué hace cada uno — y encriptación en tránsito
      vs. en reposo (`lecciones/13-comparativas-seguridad.md`)
- [ ] 2.6 Analiza preguntas de examen: 20 preguntas de seguridad y cumplimiento,
      con el porqué de cada opción correcta e incorrecta
      (`lecciones/14-analisis-preguntas-modulo-2.md`)

## Módulo 3 — Tecnología y servicios en la nube (Dominio 3 · 34%)

- [ ] 3.1 Formas de desplegar y operar en AWS: consola, CLI, SDKs, IaC,
      modelos de despliegue (nube, híbrido, on-premises) (`lecciones/15-formas-de-desplegar.md`)
- [ ] 3.2 Infraestructura global de AWS: Regiones, Zonas de disponibilidad,
      edge locations, alta disponibilidad (`lecciones/16-infraestructura-global.md`)
- [ ] 3.3 Servicios de cómputo: EC2 (tipos de instancia), contenedores (ECS/EKS),
      serverless (Lambda, Fargate), Auto Scaling, balanceadores de carga (`lecciones/17-servicios-de-computo.md`)
- [ ] 3.4 Servicios de bases de datos: RDS, Aurora, DynamoDB, ElastiCache,
      migración de bases de datos (DMS, SCT) (`lecciones/18-servicios-de-bases-de-datos.md`)
- [ ] 3.5 Servicios de red: componentes de una VPC, security groups vs. NACLs,
      Route 53, VPN y Direct Connect (`lecciones/19-servicios-de-red.md`)
- [ ] 3.6a Almacenamiento — objetos y bloques: S3 y sus clases, EBS e instance
      store (`lecciones/20-almacenamiento-objetos-y-bloques.md`)
- [ ] 3.6b Almacenamiento — archivos y protección de datos: EFS, FSx, Storage
      Gateway, políticas de ciclo de vida, AWS Backup (`lecciones/21-almacenamiento-archivos-y-backup.md`)
- [ ] 3.7 IA/ML y analítica: SageMaker AI, Lex, Athena, Kinesis, Glue, QuickSight (`lecciones/22-ia-ml-y-analitica.md`)
- [ ] 3.8a Integración, mensajería y soporte al cliente: SNS, SQS, EventBridge,
      Connect, SES, AWS Support (`lecciones/23-integracion-y-soporte-al-cliente.md`)
- [ ] 3.8b Desarrollo, cómputo para el usuario final e IoT: CodeBuild,
      CodePipeline, X-Ray, WorkSpaces, AppStream 2.0, Amplify, IoT Core
      (`lecciones/24-desarrollo-end-user-computing-e-iot.md`)
- [ ] ★ 3.9 Tablas comparativas: cómputo (EC2 vs. Lambda vs. contenedores),
      almacenamiento (S3 vs. EBS vs. EFS) y bases de datos (RDS vs. Aurora vs.
      DynamoDB vs. ElastiCache) (`lecciones/25-comparativas-tecnologia-y-servicios.md`)
- [ ] 3.10 Analiza preguntas de examen: 20 preguntas de tecnología y servicios,
      con el porqué de cada opción correcta e incorrecta
      (`lecciones/26-analisis-preguntas-modulo-3.md`)

## Módulo 4 — Facturación, precios y soporte (Dominio 4 · 12%)

- [ ] 4.1 Modelos de precios: On-Demand, Reserved Instances, Spot, Savings Plans,
      Dedicated Hosts/Instances, costos de transferencia de datos (`lecciones/27-modelos-de-precios.md`)
- [ ] 4.2 Recursos de facturación y costos: AWS Budgets, Cost Explorer,
      Pricing Calculator, consolidated billing, cost allocation tags (`lecciones/28-facturacion-y-costos.md`)
- [ ] 4.3 Soporte técnico: planes de AWS Support (Basic, Developer, Business,
      Enterprise), Trusted Advisor, AWS Health Dashboard, AWS Partner Network (`lecciones/29-soporte-y-recursos-tecnicos.md`)
- [ ] ★ 4.4 Tablas comparativas: On-Demand vs. Reserved vs. Spot vs. Savings
      Plans, y los planes de soporte de AWS uno junto al otro
      (`lecciones/30-comparativas-precios-y-soporte.md`)
- [ ] 4.5 Analiza preguntas de examen: 20 preguntas de facturación, precios y
      soporte, con el porqué de cada opción correcta e incorrecta
      (`lecciones/31-analisis-preguntas-modulo-4.md`)

## Módulo 5 — Repaso final y simulacro

- [ ] 5.1 Repaso rápido por dominio con los puntos que más se confunden
      (`lecciones/32-repaso-por-dominio.md`)
- [ ] 5.2 Examen de práctica completo (65 preguntas, 90 minutos, cronometrado)
      (`lecciones/33-simulacro-de-examen.md`)
- [ ] 5.3 Estrategias para el día del examen y qué hacer si no se aprueba
      (`lecciones/34-estrategias-dia-del-examen.md`)

---

## Progreso

**8 / 35 lecciones desarrolladas.**
