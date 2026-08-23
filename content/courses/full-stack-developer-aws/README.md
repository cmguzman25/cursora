# Full Stack Developer con AWS

Curso práctico para pasar de **cero a nivel intermedio** construyendo y
desplegando aplicaciones web completas en AWS. Al terminar, el alumno no tiene
17 proyectos sueltos: tiene **una sola aplicación** que fue creciendo módulo a
módulo, con frontend, login, API, base de datos, infraestructura como código,
despliegue automático y monitoreo.

Este archivo es el **índice vivo**: se marca `[x]` cada lección a medida que se
desarrolla. La forma de escribir cada lección está definida en
`CONTRATO-DE-CLASES.md` y **no se improvisa**.

## Ficha del curso

| | |
|---|---|
| Nivel de entrada | Cero / básico (no requiere experiencia previa) |
| Nivel de salida | Intermedio (empleable como junior full stack cloud) |
| Módulos | 17 |
| Lecciones | 184 (mínimo 10 por módulo, las 2 últimas siempre ejercicios guiados) |
| Stack | TypeScript de punta a punta: React + Node.js sobre AWS |
| Práctica | En la consola web de AWS (`console.aws.amazon.com`) |
| Región del curso | `us-east-1` (N. Virginia) |
| Costo objetivo | **USD 0.** Todo diseñado para el Free Tier; lo que cuesta, se avisa antes |
| Idioma inicial | Español (`.es.md`) |

## Cómo está pensado el curso

1. **Teoría + práctica en cada lección.** Ninguna lección es solo de leer: todas
   terminan con algo hecho en la consola de AWS, en el editor o en el navegador.
2. **Dificultad creciente.** Módulos 1-5 básico (una pieza a la vez), 6-11
   básico-intermedio (piezas conectadas entre sí), 12-17 intermedio
   (automatización, entornos, decisiones de arquitectura y costo).
3. **Los dos últimos temas de cada módulo son ejercicios guiados profesionales**,
   planteados como encargos reales de trabajo, con criterios de aceptación,
   verificación (incluidas pruebas negativas) y limpieza obligatoria. No pesan
   lo mismo: el primero es de **construir** (45-90 min) y el segundo de
   **operar** lo construido —medir costos, revertir, apagar y restaurar,
   comprobar que lo que debe fallar falla— en 20-40 minutos.
4. **El dinero es un tema de primera clase.** Cada lección lleva semáforo de
   costo (💚 $0 / 💛 centavos / 🔴 cargos reales) y cada paso que puede facturar
   lleva un aviso antes de ejecutarse, con la alternativa gratuita.
5. **Continuidad.** Lo que se construye en un módulo se reutiliza en el
   siguiente. El proyecto que atraviesa el curso es **"Pedidos Doña Rosa"**, la
   app de una panadería de barrio que empieza como una página estática y termina
   como un SaaS multiusuario en producción.

## La aplicación que se construye

```
        Navegador
            │
     [ React + TS ]  ← S3 + CloudFront (HTTPS, dominio)
            │
      login │ token
            ▼
      [ Cognito ]        [ API Gateway ]
                               │
                          [ Lambda (Node/TS) ]
                           │            │
                   [ DynamoDB ]    [ S3 archivos ]
                           │
                   [ SQS → Lambda → email ]

  Todo definido en CDK/SAM · desplegado por GitHub Actions · vigilado con CloudWatch
```

---

## Módulo 1 — La nube, tu cuenta AWS y el control del gasto

> Nivel: Básico · Todas las lecciones 💚 $0

- [x] 1.1 Qué es la nube y qué problema resuelve de verdad (`lecciones/01-01-que-es-la-nube.es.md`)
- [x] 1.2 Qué significa "full stack" y qué vas a construir en este curso (`lecciones/01-02-que-es-full-stack.es.md`)
- [x] 1.3 Cómo cobra AWS: pago por uso, Always Free, créditos y pruebas (`lecciones/01-03-como-cobra-aws.es.md`)
- [x] 1.4 Crear tu cuenta AWS paso a paso, sin sustos con la tarjeta (`lecciones/01-04-crear-cuenta-aws.es.md`)
- [x] 1.5 Blindar la cuenta: MFA en el usuario root y por qué nunca se trabaja con root (`lecciones/01-05-proteger-cuenta-root-mfa.es.md`)
- [x] 1.6 Presupuesto y alertas de gasto con AWS Budgets (paso obligatorio del curso) (`lecciones/01-06-presupuesto-y-alertas.es.md`)
- [x] 1.7 Regiones y zonas de disponibilidad: por qué la región cambia el precio (`lecciones/01-07-regiones-y-zonas.es.md`)
- [x] 1.8 Tour por la consola: buscador, favoritos, cambio de región y CloudShell (`lecciones/01-08-tour-por-la-consola.es.md`)
- [x] 1.9 Etiquetas, nombres y la regla de limpieza del curso (`lecciones/01-09-etiquetas-y-limpieza.es.md`)
- [x] 1.10 ⭐ Ejercicio guiado: auditoría de seguridad y costos de una cuenta recién creada (`lecciones/01-10-ejercicio-auditoria-de-cuenta.es.md`)
- [x] 1.11 ⭐ Ejercicio guiado: estimar la factura de una app real con AWS Pricing Calculator (`lecciones/01-11-ejercicio-estimar-factura.es.md`)

## Módulo 2 — Identidad y accesos: IAM

> Nivel: Básico · Todas las lecciones 💚 $0

- [x] 2.1 Por qué IAM es lo primero que revisa un profesional (`lecciones/02-01-por-que-importa-iam.es.md`)
- [x] 2.2 Usuarios, grupos y root: quién es quién en tu cuenta (`lecciones/02-02-usuarios-grupos-root.es.md`)
- [x] 2.3 Políticas IAM: leer un JSON de permisos sin miedo (`lecciones/02-03-politicas-iam.es.md`)
- [ ] 2.4 Políticas administradas vs propias y el principio de menor privilegio (`lecciones/02-04-menor-privilegio.es.md`)
- [ ] 2.5 Roles IAM: identidad prestada, el concepto que más cuesta y más se usa (`lecciones/02-05-roles-iam.es.md`)
- [ ] 2.6 Cómo un servicio asume un rol: el caso de una Lambda leyendo un bucket (`lecciones/02-06-servicios-que-asumen-roles.es.md`)
- [ ] 2.7 IAM Identity Center: por qué las empresas ya casi no crean usuarios IAM (`lecciones/02-07-identity-center.es.md`)
- [ ] 2.8 Credenciales, access keys y AWS CLI: cuándo sí y cuándo nunca (`lecciones/02-08-credenciales-y-cli.es.md`)
- [ ] 2.9 Herramientas de revisión: Access Analyzer, credential report y política de contraseñas (`lecciones/02-09-revision-de-accesos.es.md`)
- [ ] 2.10 ⭐ Ejercicio guiado: onboarding de un desarrollador junior con permisos mínimos (`lecciones/02-10-ejercicio-onboarding-junior.es.md`)
- [ ] 2.11 ⭐ Ejercicio guiado: el rol que rompe menos — acceso de una app a un solo bucket, y demostrarlo (`lecciones/02-11-ejercicio-rol-minimo.es.md`)

## Módulo 3 — Fundamentos del desarrollo web

> Nivel: Básico · Todas las lecciones 💚 $0 (práctica local, sin AWS)

- [ ] 3.1 Cómo funciona la web: cliente, servidor, pedido y respuesta (`lecciones/03-01-como-funciona-la-web.es.md`)
- [ ] 3.2 HTTP en 20 minutos: métodos, rutas, códigos de estado y cabeceras (`lecciones/03-02-http-basico.es.md`)
- [ ] 3.3 HTML y CSS: la estructura y la ropa de una página (`lecciones/03-03-html-y-css.es.md`)
- [ ] 3.4 JavaScript esencial: variables, funciones, arrays y objetos (`lecciones/03-04-javascript-esencial.es.md`)
- [ ] 3.5 JavaScript asíncrono: promesas, async/await y fetch (`lecciones/03-05-javascript-asincrono.es.md`)
- [ ] 3.6 TypeScript sin dolor: tipos, interfaces y los bugs que te ahorra (`lecciones/03-06-typescript-sin-dolor.es.md`)
- [ ] 3.7 Node.js y npm: ejecutar JavaScript fuera del navegador (`lecciones/03-07-node-y-npm.es.md`)
- [ ] 3.8 JSON y APIs REST: cómo se diseñan los endpoints (`lecciones/03-08-json-y-apis-rest.es.md`)
- [ ] 3.9 Git y GitHub: control de versiones mínimo viable (`lecciones/03-09-git-y-github.es.md`)
- [ ] 3.10 Tu entorno de trabajo: VS Code, Node, AWS CLI y CloudShell como plan B (`lecciones/03-10-entorno-de-trabajo.es.md`)
- [ ] 3.11 ⭐ Ejercicio guiado: la primera API de "Pedidos Doña Rosa" corriendo en tu máquina (`lecciones/03-11-ejercicio-api-local.es.md`)
- [ ] 3.12 ⭐ Ejercicio guiado: una página que consume tu API y maneja bien los errores (`lecciones/03-12-ejercicio-pagina-consume-api.es.md`)

## Módulo 4 — Frontend con React y TypeScript

> Nivel: Básico · Todas las lecciones 💚 $0 (práctica local)

- [ ] 4.1 Por qué React: del HTML a mano a los componentes (`lecciones/04-01-por-que-react.es.md`)
- [ ] 4.2 Tu primer proyecto con Vite + React + TypeScript (`lecciones/04-02-primer-proyecto-vite.es.md`)
- [ ] 4.3 JSX, componentes y props (`lecciones/04-03-componentes-y-props.es.md`)
- [ ] 4.4 Estado con useState y manejo de eventos (`lecciones/04-04-estado-y-eventos.es.md`)
- [ ] 4.5 useEffect y datos remotos: traer información de una API (`lecciones/04-05-useeffect-y-datos.es.md`)
- [ ] 4.6 Listas, formularios y validación básica (`lecciones/04-06-listas-y-formularios.es.md`)
- [ ] 4.7 Cargando, error y vacío: los tres estados que separan a un junior de un profesional (`lecciones/04-07-estados-carga-error-vacio.es.md`)
- [ ] 4.8 Rutas en el frontend y organización de carpetas (`lecciones/04-08-rutas-y-estructura.es.md`)
- [ ] 4.9 Variables de entorno, build de producción y qué es un sitio estático (`lecciones/04-09-build-de-produccion.es.md`)
- [ ] 4.10 ⭐ Ejercicio guiado: panel de pedidos de Doña Rosa en React (`lecciones/04-10-ejercicio-panel-de-pedidos.es.md`)
- [ ] 4.11 ⭐ Ejercicio guiado: dejarlo listo para producción — build, errores y checklist de calidad (`lecciones/04-11-ejercicio-listo-para-produccion.es.md`)

## Módulo 5 — Publicar en AWS: S3, CloudFront y dominios

> Nivel: Básico · 💚 $0 salvo el dominio (🔴 avisado en 5.7)

- [ ] 5.1 S3 y los buckets: el depósito de cajas de internet (`lecciones/05-01-que-es-s3.es.md`)
- [ ] 5.2 Subir archivos y permisos: por qué "hacerlo público" casi nunca es la respuesta (`lecciones/05-02-permisos-de-s3.es.md`)
- [ ] 5.3 Hosting estático en S3: servir tu aplicación React (`lecciones/05-03-hosting-estatico-s3.es.md`)
- [ ] 5.4 CloudFront: la CDN explicada con el ejemplo de las sucursales (`lecciones/05-04-que-es-cloudfront.es.md`)
- [ ] 5.5 Bucket privado + Origin Access Control: la forma correcta de publicar (`lecciones/05-05-origin-access-control.es.md`)
- [ ] 5.6 HTTPS gratis con AWS Certificate Manager (`lecciones/05-06-https-con-acm.es.md`)
- [ ] 5.7 Dominios y DNS con Route 53: qué cuesta realmente (`lecciones/05-07-dominios-y-route53.es.md`)
- [ ] 5.8 Caché e invalidaciones: por qué "subí el cambio y no se ve" (`lecciones/05-08-cache-e-invalidaciones.es.md`)
- [ ] 5.9 Costos de S3 y CloudFront: qué es gratis, qué no y dónde se dispara (`lecciones/05-09-costos-s3-cloudfront.es.md`)
- [ ] 5.10 ⭐ Ejercicio guiado: la web de Doña Rosa en producción con HTTPS (`lecciones/05-10-ejercicio-web-en-produccion.es.md`)
- [ ] 5.11 ⭐ Ejercicio guiado: despliegue reproducible — script de subida, invalidación y vuelta atrás (`lecciones/05-11-ejercicio-despliegue-reproducible.es.md`)

## Módulo 6 — Backend serverless: Lambda y API Gateway

> Nivel: Básico-Intermedio · 💚 $0 (free tier de Lambda es Always Free)

- [ ] 6.1 Qué es serverless y por qué cambia la cuenta de la luz (`lecciones/06-01-que-es-serverless.es.md`)
- [ ] 6.2 Tu primera función Lambda desde la consola (`lecciones/06-02-primera-lambda.es.md`)
- [ ] 6.3 Anatomía de una Lambda: handler, event, context y respuesta (`lecciones/06-03-anatomia-de-una-lambda.es.md`)
- [ ] 6.4 Memoria, timeout y variables de entorno: los tres botones que tocan el precio (`lecciones/06-04-memoria-timeout-variables.es.md`)
- [ ] 6.5 El rol de ejecución: qué puede tocar tu función (`lecciones/06-05-rol-de-ejecucion.es.md`)
- [ ] 6.6 API Gateway: convertir tu función en una URL pública (HTTP API vs REST API) (`lecciones/06-06-api-gateway.es.md`)
- [ ] 6.7 Rutas, métodos y parámetros: path, query y body (`lecciones/06-07-rutas-y-parametros.es.md`)
- [ ] 6.8 CORS explicado de una vez por todas (`lecciones/06-08-cors.es.md`)
- [ ] 6.9 Logs y depuración con CloudWatch: lo mínimo para no sufrir (`lecciones/06-09-logs-y-depuracion.es.md`)
- [ ] 6.10 ⭐ Ejercicio guiado: la API de pedidos, ahora serverless (CRUD completo) (`lecciones/06-10-ejercicio-api-serverless.es.md`)
- [ ] 6.11 ⭐ Ejercicio guiado: conectar el React del módulo 4 con la API real (`lecciones/06-11-ejercicio-conectar-front-y-api.es.md`)

## Módulo 7 — Datos NoSQL con DynamoDB

> Nivel: Básico-Intermedio · 💚 $0 (25 GB Always Free)

- [ ] 7.1 SQL vs NoSQL en palabras simples: la carpeta y el fichero (`lecciones/07-01-sql-vs-nosql.es.md`)
- [ ] 7.2 Tablas, ítems y claves: partition key y sort key (`lecciones/07-02-tablas-items-y-claves.es.md`)
- [ ] 7.3 Crear tu primera tabla en modo On-Demand (y por qué On-Demand para aprender) (`lecciones/07-03-crear-tabla-on-demand.es.md`)
- [ ] 7.4 Operaciones básicas desde la consola: crear, leer, actualizar y borrar (`lecciones/07-04-operaciones-basicas.es.md`)
- [ ] 7.5 Query vs Scan: la diferencia que te ahorra dinero (`lecciones/07-05-query-vs-scan.es.md`)
- [ ] 7.6 Modelado simple: pensar las claves antes de crear la tabla (`lecciones/07-06-modelado-de-claves.es.md`)
- [ ] 7.7 Índices secundarios (GSI) sin complicarse (`lecciones/07-07-indices-gsi.es.md`)
- [ ] 7.8 Usar DynamoDB desde Lambda con el SDK v3 (`lecciones/07-08-dynamodb-desde-lambda.es.md`)
- [ ] 7.9 Costos, TTL y límites del free tier de DynamoDB (`lecciones/07-09-costos-y-ttl.es.md`)
- [ ] 7.10 ⭐ Ejercicio guiado: los pedidos ya no se pierden — persistir la API en DynamoDB (`lecciones/07-10-ejercicio-persistir-pedidos.es.md`)
- [ ] 7.11 ⭐ Ejercicio guiado: varias panaderías en la misma tabla — datos separados por cliente (`lecciones/07-11-ejercicio-datos-por-cliente.es.md`)

## Módulo 8 — Datos relacionales: SQL, RDS y Aurora

> Nivel: Básico-Intermedio · 💚 free tier de RDS (12 meses) · 🔴 avisos en 8.7 y 8.9

- [ ] 8.1 Cuándo conviene una base relacional (y cuándo no) (`lecciones/08-01-cuando-usar-sql.es.md`)
- [ ] 8.2 SQL esencial: SELECT, INSERT, UPDATE, DELETE (`lecciones/08-02-sql-esencial.es.md`)
- [ ] 8.3 Relaciones y JOIN con el ejemplo de la panadería (`lecciones/08-03-relaciones-y-joins.es.md`)
- [ ] 8.4 RDS: qué administra AWS y qué sigue siendo tuyo (`lecciones/08-04-que-es-rds.es.md`)
- [ ] 8.5 Crear una instancia RDS free tier sin gastar de más (`lecciones/08-05-crear-rds-free-tier.es.md`)
- [ ] 8.6 Conectarte a la base: host, puerto, usuario y un cliente SQL (`lecciones/08-06-conectarse-a-la-base.es.md`)
- [ ] 8.7 Dónde van las contraseñas: Parameter Store vs Secrets Manager (`lecciones/08-07-secretos-y-contrasenas.es.md`)
- [ ] 8.8 Backups, snapshots y restauración: dormir tranquilo (`lecciones/08-08-backups-y-snapshots.es.md`)
- [ ] 8.9 Aurora Serverless v2: qué es y por qué todavía no lo enciendes (`lecciones/08-09-aurora-serverless.es.md`)
- [ ] 8.10 ⭐ Ejercicio guiado: inventario y ventas de la panadería en RDS (`lecciones/08-10-ejercicio-inventario-rds.es.md`)
- [ ] 8.11 ⭐ Ejercicio guiado: apaga y ahorra — snapshot, borrar la instancia y restaurarla (`lecciones/08-11-ejercicio-snapshot-y-restaurar.es.md`)

## Módulo 9 — Redes en AWS: VPC

> Nivel: Intermedio · 💚 $0 · 🔴 aviso fuerte en 9.4 (NAT Gateway) y 9.9 (IPv4)

- [ ] 9.1 Qué es una red privada y por qué AWS te regala una (`lecciones/09-01-que-es-una-vpc.es.md`)
- [ ] 9.2 CIDR y subredes explicadas con el ejemplo del edificio (`lecciones/09-02-cidr-y-subredes.es.md`)
- [ ] 9.3 Subred pública vs privada, Internet Gateway y tablas de rutas (`lecciones/09-03-publica-vs-privada.es.md`)
- [ ] 9.4 NAT Gateway: el servicio que más facturas sorpresa genera (y cómo evitarlo) (`lecciones/09-04-nat-gateway-y-alternativas.es.md`)
- [ ] 9.5 Security Groups vs Network ACLs: el portero y el muro (`lecciones/09-05-security-groups-vs-nacl.es.md`)
- [ ] 9.6 Poner tu base de datos en subred privada (`lecciones/09-06-rds-en-subred-privada.es.md`)
- [ ] 9.7 VPC endpoints: hablar con S3 y DynamoDB sin salir a internet (`lecciones/09-07-vpc-endpoints.es.md`)
- [ ] 9.8 "No conecta": checklist de diagnóstico de red (`lecciones/09-08-checklist-de-red.es.md`)
- [ ] 9.9 Costos de red: transferencia de datos e IPs públicas (`lecciones/09-09-costos-de-red.es.md`)
- [ ] 9.10 ⭐ Ejercicio guiado: red de dos pisos — VPC con subred pública y privada, hecha a mano (`lecciones/09-10-ejercicio-vpc-a-mano.es.md`)
- [ ] 9.11 ⭐ Ejercicio guiado: base de datos blindada — Lambda dentro de la VPC hablando con RDS privada (`lecciones/09-11-ejercicio-lambda-en-vpc.es.md`)

## Módulo 10 — Autenticación con Cognito

> Nivel: Intermedio · 💚 $0 (free tier de usuarios activos mensuales)

- [ ] 10.1 Autenticación vs autorización: el portero y las llaves (`lecciones/10-01-autenticacion-vs-autorizacion.es.md`)
- [ ] 10.2 Cómo funciona el login moderno: tokens JWT, sesión y refresco (`lecciones/10-02-tokens-jwt.es.md`)
- [ ] 10.3 Cognito User Pools: tu directorio de usuarios (`lecciones/10-03-cognito-user-pools.es.md`)
- [ ] 10.4 Registro, verificación por email y políticas de contraseña (`lecciones/10-04-registro-y-verificacion.es.md`)
- [ ] 10.5 Hosted UI o pantalla propia: cuándo conviene cada una (`lecciones/10-05-hosted-ui-o-propia.es.md`)
- [ ] 10.6 Integrar el login en tu aplicación React (`lecciones/10-06-login-en-react.es.md`)
- [ ] 10.7 Proteger la API: autorizador de Cognito en API Gateway (`lecciones/10-07-proteger-la-api.es.md`)
- [ ] 10.8 Leer al usuario dentro de la Lambda y aislar sus datos (`lecciones/10-08-usuario-en-la-lambda.es.md`)
- [ ] 10.9 Login con Google y MFA para tus usuarios (`lecciones/10-09-login-social-y-mfa.es.md`)
- [ ] 10.10 ⭐ Ejercicio guiado: Doña Rosa con login real y rutas protegidas (`lecciones/10-10-ejercicio-login-real.es.md`)
- [ ] 10.11 ⭐ Ejercicio guiado: cada quien ve lo suyo — aislamiento de datos y pruebas de intrusión básicas (`lecciones/10-11-ejercicio-aislamiento-de-datos.es.md`)

## Módulo 11 — Archivos y multimedia con S3

> Nivel: Intermedio · 💚 $0 (5 GB free tier 12 meses)

- [ ] 11.1 Por qué los archivos no van dentro de la base de datos (`lecciones/11-01-archivos-fuera-de-la-base.es.md`)
- [ ] 11.2 Presigned URLs: subir desde el navegador sin exponer llaves (`lecciones/11-02-presigned-urls.es.md`)
- [ ] 11.3 Descargas seguras y enlaces que caducan (`lecciones/11-03-descargas-seguras.es.md`)
- [ ] 11.4 Organizar objetos: prefijos, convenciones de nombres y carpetas que no existen (`lecciones/11-04-organizar-objetos.es.md`)
- [ ] 11.5 Clases de almacenamiento y reglas de ciclo de vida: bajar costos solo (`lecciones/11-05-clases-y-ciclo-de-vida.es.md`)
- [ ] 11.6 Versionado, borrado accidental y bloqueo de acceso público (`lecciones/11-06-versionado-y-proteccion.es.md`)
- [ ] 11.7 Eventos de S3 hacia Lambda: procesar un archivo apenas llega (`lecciones/11-07-eventos-s3-lambda.es.md`)
- [ ] 11.8 Costos reales de S3: almacenamiento, peticiones y salida de datos (`lecciones/11-08-costos-de-s3.es.md`)
- [ ] 11.9 ⭐ Ejercicio guiado: fotos de los productos — subida directa, validación y galería (`lecciones/11-09-ejercicio-fotos-de-productos.es.md`)
- [ ] 11.10 ⭐ Ejercicio guiado: fábrica de miniaturas — evento S3 → Lambda → thumbnail + ciclo de vida (`lecciones/11-10-ejercicio-miniaturas.es.md`)

## Módulo 12 — Servidores y contenedores: EC2, Docker, ECS

> Nivel: Intermedio · 💚 EC2 free tier · 🔴 avisos en 12.7, 12.8 y 12.9

- [ ] 12.1 Cuándo serverless no alcanza: casos reales para servidores (`lecciones/12-01-cuando-no-usar-serverless.es.md`)
- [ ] 12.2 EC2 en 15 minutos: lanzar una instancia free tier (`lecciones/12-02-primera-instancia-ec2.es.md`)
- [ ] 12.3 Conectarte con Session Manager, sin llaves SSH ni puertos abiertos (`lecciones/12-03-session-manager.es.md`)
- [ ] 12.4 Qué es Docker y por qué mata el "en mi máquina funciona" (`lecciones/12-04-que-es-docker.es.md`)
- [ ] 12.5 Tu primer Dockerfile para una API Node + TypeScript (`lecciones/12-05-primer-dockerfile.es.md`)
- [ ] 12.6 ECR: guardar tu imagen dentro de AWS (`lecciones/12-06-ecr.es.md`)
- [ ] 12.7 ECS Fargate: contenedores sin administrar servidores (`lecciones/12-07-ecs-fargate.es.md`)
- [ ] 12.8 App Runner y Elastic Beanstalk: las opciones "fáciles" y su letra chica (`lecciones/12-08-app-runner-y-beanstalk.es.md`)
- [ ] 12.9 Balanceadores de carga y auto scaling en palabras simples (`lecciones/12-09-balanceadores-y-autoscaling.es.md`)
- [ ] 12.10 ⭐ Ejercicio guiado: la API en un contenedor — Docker + ECR + Fargate por una hora, y borrar (`lecciones/12-10-ejercicio-api-en-fargate.es.md`)
- [ ] 12.11 ⭐ Ejercicio guiado: la misma API en Lambda, Fargate y EC2 — comparativa de costo con números (`lecciones/12-11-ejercicio-comparativa-de-costos.es.md`)

## Módulo 13 — Infraestructura como código: CloudFormation, SAM y CDK

> Nivel: Intermedio · 💚 $0 (las herramientas no cuestan; sí lo que crean)

- [ ] 13.1 El problema de hacer todo a mano (y por qué tu cuenta ya es un desorden) (`lecciones/13-01-el-problema-del-clic-a-mano.es.md`)
- [ ] 13.2 CloudFormation: plantillas, stacks y cambios controlados (`lecciones/13-02-cloudformation.es.md`)
- [ ] 13.3 Leer una plantilla YAML sin miedo (`lecciones/13-03-leer-yaml.es.md`)
- [ ] 13.4 Parámetros, outputs y referencias entre recursos (`lecciones/13-04-parametros-y-outputs.es.md`)
- [ ] 13.5 AWS SAM: la versión corta para serverless (`lecciones/13-05-aws-sam.es.md`)
- [ ] 13.6 Probar y desplegar con SAM de forma repetible (`lecciones/13-06-desplegar-con-sam.es.md`)
- [ ] 13.7 AWS CDK con TypeScript: infraestructura en el lenguaje que ya sabes (`lecciones/13-07-cdk-con-typescript.es.md`)
- [ ] 13.8 Entornos dev y prod, nombres y etiquetas desde el código (`lecciones/13-08-entornos-dev-y-prod.es.md`)
- [ ] 13.9 Borrar todo con un comando: la ventaja de costos de la IaC (`lecciones/13-09-destruir-el-stack.es.md`)
- [ ] 13.10 ⭐ Ejercicio guiado: tu API como código — recrear módulos 6 y 7 con SAM (`lecciones/13-10-ejercicio-api-con-sam.es.md`)
- [ ] 13.11 ⭐ Ejercicio guiado: dos entornos, un comando — CDK con dev y prod, y destrucción limpia (`lecciones/13-11-ejercicio-dos-entornos-cdk.es.md`)

## Módulo 14 — Despliegue automático: Git, CI/CD y GitHub Actions

> Nivel: Intermedio · 💚 $0 con GitHub Actions · 💛 avisos en 14.8

- [ ] 14.1 Qué es CI/CD y qué dolor resuelve (`lecciones/14-01-que-es-ci-cd.es.md`)
- [ ] 14.2 Ramas, pull requests y flujo de trabajo en equipo (`lecciones/14-02-ramas-y-pull-requests.es.md`)
- [ ] 14.3 Los tests automáticos mínimos que sí valen la pena (`lecciones/14-03-tests-minimos.es.md`)
- [ ] 14.4 GitHub Actions: tu primer workflow (`lecciones/14-04-primer-workflow.es.md`)
- [ ] 14.5 Conectar GitHub con AWS sin claves: OIDC y un rol (`lecciones/14-05-oidc-sin-claves.es.md`)
- [ ] 14.6 Despliegue automático del frontend a S3 + CloudFront (`lecciones/14-06-deploy-del-frontend.es.md`)
- [ ] 14.7 Despliegue automático del backend con SAM o CDK (`lecciones/14-07-deploy-del-backend.es.md`)
- [ ] 14.8 Las alternativas de AWS: CodePipeline, CodeBuild y Amplify Hosting (`lecciones/14-08-alternativas-aws.es.md`)
- [ ] 14.9 ⭐ Ejercicio guiado: de un push a producción — pipeline completo de front y back (`lecciones/14-09-ejercicio-pipeline-completo.es.md`)
- [ ] 14.10 ⭐ Ejercicio guiado: rollback sin pánico — desplegar algo roto, detectarlo y volver atrás (`lecciones/14-10-ejercicio-rollback.es.md`)

## Módulo 15 — Observabilidad: ver qué pasa en producción

> Nivel: Intermedio · 💚 $0 dentro del free tier · 💛 aviso en 15.7 (retención de logs)

- [ ] 15.1 Por qué "en mi máquina funciona" no basta: logs, métricas y trazas (`lecciones/15-01-logs-metricas-trazas.es.md`)
- [ ] 15.2 CloudWatch Logs: encontrar el error en dos minutos con Logs Insights (`lecciones/15-02-logs-insights.es.md`)
- [ ] 15.3 Métricas y dashboards que se entienden de un vistazo (`lecciones/15-03-metricas-y-dashboards.es.md`)
- [ ] 15.4 Alarmas que avisan antes que el cliente (`lecciones/15-04-alarmas.es.md`)
- [ ] 15.5 AWS X-Ray: ver a dónde se va el tiempo (`lecciones/15-05-x-ray.es.md`)
- [ ] 15.6 Los errores clásicos de producción y cómo se ven en los logs (`lecciones/15-06-errores-en-produccion.es.md`)
- [ ] 15.7 Retención de logs: la fuga de dinero más silenciosa de AWS (`lecciones/15-07-retencion-de-logs.es.md`)
- [ ] 15.8 Timeouts, reintentos y health checks (`lecciones/15-08-timeouts-y-reintentos.es.md`)
- [ ] 15.9 ⭐ Ejercicio guiado: guardia de producción — dashboard, alarma y aviso por email (`lecciones/15-09-ejercicio-guardia-de-produccion.es.md`)
- [ ] 15.10 ⭐ Ejercicio guiado: caza del bug — provocar una falla real y diagnosticarla con logs y trazas (`lecciones/15-10-ejercicio-caza-del-bug.es.md`)

## Módulo 16 — Arquitecturas asíncronas: colas, eventos y flujos

> Nivel: Intermedio · 💚 $0 (SQS, SNS y EventBridge tienen free tier generoso)

- [ ] 16.1 Síncrono vs asíncrono: la fila del banco (`lecciones/16-01-sincrono-vs-asincrono.es.md`)
- [ ] 16.2 SQS: colas y por qué dejas de perder trabajo (`lecciones/16-02-colas-con-sqs.es.md`)
- [ ] 16.3 Reintentos y Dead Letter Queues: dónde van los mensajes que fallan (`lecciones/16-03-reintentos-y-dlq.es.md`)
- [ ] 16.4 SNS: avisarle a varios a la vez (`lecciones/16-04-sns-y-fanout.es.md`)
- [ ] 16.5 EventBridge: eventos y tareas programadas (el cron de la nube) (`lecciones/16-05-eventbridge.es.md`)
- [ ] 16.6 Step Functions: flujos de varios pasos sin código pegamento (`lecciones/16-06-step-functions.es.md`)
- [ ] 16.7 Idempotencia: el concepto que evita cobrarle dos veces al cliente (`lecciones/16-07-idempotencia.es.md`)
- [ ] 16.8 Costos de mensajería y límites del free tier (`lecciones/16-08-costos-de-mensajeria.es.md`)
- [ ] 16.9 ⭐ Ejercicio guiado: confirmación por email sin hacer esperar al cliente (API → SQS → Lambda → SES) (`lecciones/16-09-ejercicio-email-asincrono.es.md`)
- [ ] 16.10 ⭐ Ejercicio guiado: el reporte nocturno — EventBridge programado → Step Functions → informe en S3 (`lecciones/16-10-ejercicio-reporte-nocturno.es.md`)

## Módulo 17 — Costos, seguridad y proyecto final

> Nivel: Intermedio · 💚 $0 · el capstone reutiliza todo lo ya construido

- [ ] 17.1 Repaso: la arquitectura completa que ya sabes construir (`lecciones/17-01-repaso-de-la-arquitectura.es.md`)
- [ ] 17.2 Optimización de costos: los diez ajustes que más ahorran (`lecciones/17-02-optimizacion-de-costos.es.md`)
- [ ] 17.3 Revisión de seguridad de tu aplicación: checklist profesional (`lecciones/17-03-checklist-de-seguridad.es.md`)
- [ ] 17.4 Well-Architected en la práctica: aplicar los pilares a tu proyecto (`lecciones/17-04-well-architected-en-la-practica.es.md`)
- [ ] 17.5 Rendimiento: caché, paginación y las consultas que salen caras (`lecciones/17-05-rendimiento-y-cache.es.md`)
- [ ] 17.6 Tu proyecto como carta de presentación: README, demo y entrevista (`lecciones/17-06-proyecto-para-el-portfolio.es.md`)
- [ ] 17.7 Qué sigue: certificaciones y caminos (Developer Associate, Solutions Architect) (`lecciones/17-07-que-sigue.es.md`)
- [ ] 17.8 Cómo cerrar o vaciar tu cuenta AWS sin dejar cargos colgados (`lecciones/17-08-cerrar-la-cuenta.es.md`)
- [ ] 17.9 Auditoría final: encontrar y borrar recursos huérfanos (`lecciones/17-09-auditoria-final.es.md`)
- [ ] 17.10 ⭐ Ejercicio guiado (capstone 1/2): el SaaS de pedidos — frontend, login, API y datos (`lecciones/17-10-ejercicio-capstone-parte-1.es.md`)
- [ ] 17.11 ⭐ Ejercicio guiado (capstone 2/2): a producción — IaC, CI/CD, monitoreo y costo mensual estimado (`lecciones/17-11-ejercicio-capstone-parte-2.es.md`)

---

## Progreso

**14 / 184 lecciones desarrolladas.**

## Integración con la app

- [x] `manifest.ts` del curso (generado a partir de este índice).
- [x] Curso registrado en `content/courses/registry.ts` y en el catálogo
      (`src/lib/courses.ts`); las páginas de curso y lección ya son multi-curso.

**Al agregar, renombrar o reordenar una lección:** se cambia primero aquí (este
archivo es el índice legible) y después se refleja en `manifest.ts`, que es por
donde la app navega. El `id` de cada lección en el manifest es el nombre del
archivo sin `.es.md`.
