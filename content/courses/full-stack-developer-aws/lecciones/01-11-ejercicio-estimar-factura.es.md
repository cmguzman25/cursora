# 1.11 — Ejercicio guiado: ¿cuánto costaría al mes la app de Doña Rosa?

> Módulo 1 · Ejercicio guiado 2 de 2 · Operar · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🎬 El caso

Doña Rosa está convencida del proyecto, pero antes de darte el sí hace la pregunta que hace todo cliente:

> — ¿Y esto cuánto me va a costar al mes?

"Depende" no es una respuesta aceptable. Ella necesita un número para decidir, y tú necesitas saber **qué pieza de la aplicación se va a llevar tu factura** para vigilarla desde el primer día.

En la lección 1.2 dibujaste la arquitectura completa. Hoy le vas a poner precio, pieza por pieza, con la calculadora oficial de AWS. Y vas a descubrir algo que sorprende a casi todo el mundo la primera vez.

## ✅ Lo que vas a construir

Una **estimación guardada y compartible** de la aplicación completa, con dos escenarios y un ranking de piezas por costo.

```
   ESTIMACIÓN — Pedidos Doña Rosa
   ├── Escenario A: barrio        100 pedidos/día
   ├── Escenario B: se hizo viral 10.000 pedidos/día  (×100)
   └── Ranking: ¿qué pieza se lleva la factura?
```

**Criterios de aceptación:**

- [ ] Las seis piezas de la arquitectura están estimadas, no solo una.
- [ ] Tienes el total mensual del escenario A y del escenario B.
- [ ] Sabes decir, con números, **cuál es la pieza más cara** y por qué.
- [ ] Sabes decir cuánto sube la factura al multiplicar los clientes por 100.
- [ ] La estimación está guardada (enlace o archivo), no solo mirada.

## 🧰 Antes de empezar

- Haber hecho las lecciones **1.1** (calculadora), **1.2** (la arquitectura), **1.3** (cómo cobra AWS) y **1.7** (regiones).
- Tener a mano los números que anotaste en esas lecciones.
- No hace falta cuenta de AWS: la calculadora es pública.
- Tiempo real: unos 30 minutos.

## 💰 Semáforo de costo

> 💚 **Costo: $0.** La calculadora de precios solo hace cuentas: no crea recursos, no toca tu cuenta y ni siquiera pide iniciar sesión. **Estimar no es contratar.**

## 🪜 Paso a paso

### Fase 1 — Fija el escenario

1. **Escribe los números del negocio antes de tocar la calculadora.** Este es el escenario A, la panadería del barrio:

   | Dato | Valor |
   |---|---|
   | Pedidos por día | 100 (≈ **3.000 al mes**) |
   | Llamadas a la API por pedido | 4 (≈ **12.000 al mes**) |
   | Visitas a la web por mes | 3.000, unos **6 GB** de descarga |
   | Archivos del sitio (HTML, CSS, imágenes) | **50 MB** |
   | Datos guardados de pedidos | **1 GB** |
   | Consultas de DNS | **50.000 al mes** |

   *Por qué primero:* estimar sin escenario es adivinar. En un trabajo real, estos números salen de preguntarle al cliente cuántos clientes tiene hoy — no de la intuición del programador.

### Fase 2 — Pon precio a cada pieza

2. **Abre [calculator.aws](https://calculator.aws)** → **Create estimate**. Fija la región **US East (N. Virginia)** en cada servicio que agregues.

3. **Añade las seis piezas**, una por una, con estos datos:

   | Pieza | Servicio a buscar | Qué poner |
   |---|---|---|
   | El sitio web | **S3** | 50 MB de almacenamiento, unas pocas miles de peticiones |
   | La entrega | **CloudFront** | 6 GB de transferencia de salida, 30.000 peticiones |
   | El backend | **Lambda** | 12.000 invocaciones, 200 ms cada una, 512 MB de memoria |
   | La puerta de la API | **API Gateway** | **HTTP API**, 12.000 peticiones al mes |
   | La base de datos | **DynamoDB** | Modo **On-Demand**: 3.000 escrituras, 20.000 lecturas, 1 GB |
   | El dominio | **Route 53** | 1 zona alojada, 50.000 consultas |

   *Deberías ver:* cada servicio agregándose a la estimación con su subtotal a la derecha.

4. **Anota el subtotal de cada pieza** en una lista, del más caro al más barato.
   *Deberías ver:* varios en **0,00 USD** o en fracciones de centavo, y **Route 53 en torno a 0,50 USD**. Si algún número te sale en decenas de dólares, revisa: seguramente pusiste horas donde iban peticiones, o una región equivocada.

5. **Suma el dominio, que la calculadora no incluye.** Registrar un `.com` cuesta del orden de 15 dólares al año — **unos 1,25 USD al mes**. Añádelo a mano a tu lista.

### Fase 3 — El hallazgo

6. **Mira tu ranking y responde:** ¿qué porcentaje del total mensual son el dominio y la zona DNS?
   *Deberías ver:* algo alrededor de **1,75 USD de un total de ~1,80** — es decir, **más del 95% de la factura**.

7. **Escríbelo con tus palabras.** Algo así:

   > La aplicación entera de Doña Rosa cuesta menos de 2 dólares al mes, y casi todo es el dominio y su zona de DNS. El cómputo, la base de datos y el almacenamiento del negocio real cuestan prácticamente cero.

   *Por qué es tan importante:* acabas de descubrir la diferencia entre **costo fijo** y **costo variable**. El dominio y la zona DNS se pagan **exista o no un solo cliente**. Lo demás solo se paga si alguien lo usa.

8. **Identifica las dos piezas sin regalo mensual.** De las seis, dos **no tienen capa siempre gratis**: **Route 53** (cobra 0,50 USD por zona desde el primer día) y **API Gateway** (cobra desde la primera petición; su millón gratis es solo para cuentas con el free tier de 12 meses, que ya no aplica a cuentas nuevas — lo viste en la lección 1.3).
   *Por qué anotarlo:* son las que hay que vigilar. Las demás tienen colchón.

### Fase 4 — ¿Y si se hace viral?

9. **Duplica el escenario, multiplicando por 100.** Crea una segunda estimación (o edita cada servicio) con: 300.000 pedidos al mes, 1,2 millones de llamadas a la API, 600 GB de transferencia, 300.000 escrituras y 2 millones de lecturas.
   *Deberías ver:* un total de unos pocos dólares al mes. **No 100 veces más.**

10. **Calcula el múltiplo real.** Divide el total B entre el total A.
    *Deberías ver:* un número pequeño, del orden de 2 a 5. Cien veces más clientes, unas pocas veces más factura.
    *Por qué pasa esto:* porque el costo fijo no cambia y varias piezas siguen dentro de sus límites gratuitos. Es exactamente el beneficio de la nube del que hablamos en la lección 1.1, ahora con números tuyos.

### Fase 5 — Guarda el trabajo

11. **Guarda la estimación.** La calculadora ofrece **Share** (*compartir*, genera un enlace público) y exportar a CSV o PDF.
    *Deberías ver:* un enlace o un archivo descargado.
    *Por qué:* esto es lo que se le manda a un cliente o a un jefe. Una estimación que solo miraste no sirve para decidir nada.

12. **Anótalo en tu informe de auditoría** (el de la lección 1.10), en la sección de dinero: total del escenario A, total del B y la pieza más cara.

## 🔍 Verifica que funciona

- **La suma cuadra.** Suma a mano los subtotales de las seis piezas y compáralo con el total que muestra la calculadora. Deben coincidir.
- **El enlace funciona.** Abre el enlace compartido en una ventana de incógnito. Debe cargar tu estimación sin pedir sesión.
- **Prueba negativa 1 — la región importa.** Cambia una pieza (por ejemplo Lambda o DynamoDB) a **South America (São Paulo)** y mira el total.
  *Debe subir.* Si no cambiara nada, es que no aplicaste bien la región: repasa la lección 1.7.
- **Prueba negativa 2 — sin dominio no hay costo fijo.** Quita Route 53 de la estimación del escenario A.
  *El total debe caer prácticamente a cero.* Esa es la prueba de que el gasto no venía del negocio, sino de la decisión de tener dominio propio. Vuelve a añadirlo después.

## 🧹 Limpieza

**No hay nada que borrar**: la calculadora no crea recursos ni toca tu cuenta.

1. Guarda el enlace o el PDF donde puedas encontrarlo.
2. Conserva la lista de subtotales: la vas a comparar con la factura real cuando publiques la aplicación en el módulo 5.
3. Comprueba, por costumbre, que tu gasto real en **Billing** sigue igual.

## 🧠 Qué acabas de aprender

- **A poner un número a una arquitectura**, que es lo que separa "quiero hacer una app" de "puedo presupuestar una app".
- **La diferencia entre costo fijo y variable**, no en teoría sino en tu propia estimación: el dominio y la zona DNS se pagan aunque no entre nadie.
- **Cuáles son las dos piezas sin colchón gratuito** de esta arquitectura (Route 53 y API Gateway) y, por lo tanto, cuáles vigilar.
- **Que escalar en la nube no multiplica la factura en proporción.** Cien veces más clientes salieron unas pocas veces más caro.
- **Que una estimación se guarda y se comparte**, porque su destino es una conversación con alguien que decide.

**Cómo se ve esto en un trabajo real:** en una empresa esta estimación se hace antes de aprobar el proyecto, se revisa cada trimestre contra la factura real y suele vivir en la propuesta comercial. Con más presupuesto se usan Cost Explorer y presupuestos por proyecto (etiquetados, como los de la lección 1.9) para comparar lo estimado con lo gastado. Y hay un detalle cultural: casi nadie estima el costo *de operar* —logs, backups, transferencia de datos—, que es justo donde aparecen las sorpresas. Nosotros lo veremos en el módulo 15.

## 🚀 Reto extra (opcional)

Estima la **misma aplicación** pero con un servidor encendido todo el mes en vez de serverless: sustituye Lambda y API Gateway por una instancia `t3.micro` funcionando 730 horas. Compara los dos totales en el escenario A y en el B.

Vas a encontrarte con una idea incómoda: hay un punto de cruce donde el servidor sale más barato que pagar por petición. Encontrarlo es exactamente lo que haremos en el ejercicio 12.11. Pista de por dónde investigar: fíjate en a partir de cuántos millones de peticiones al mes se igualan.

**En la próxima lección:** cierras el módulo 1 y empieza el 2. Con la cuenta ya auditada y presupuestada, toca la pieza que faltaba para dejar de trabajar como usuario raíz: IAM — usuarios, grupos, políticas y roles.
