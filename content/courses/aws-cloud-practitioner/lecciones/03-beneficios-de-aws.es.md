# 1.1 — Beneficios de AWS Cloud

> Dominio 1 · Task Statement 1.1 — Define the benefits of the AWS Cloud

## 🤔 Antes de empezar

- Si tuvieras que abrir una tienda nueva y no supieras cuántos clientes vas a tener el primer mes, ¿comprarías de entrada todos los estantes y cajas registradoras que podrías llegar a necesitar en el mejor escenario posible, o empezarías con lo mínimo e irías agregando?
- ¿Alguna vez calculaste mal cuánto ibas a necesitar de algo (espacio en el celular, plata para un viaje) y te quedaste corto, o te sobró un montón? ¿Qué hubiese sido mejor?
- Si una empresa quiere empezar a vender sus productos en otro país, ¿qué cosas tendría que resolver antes de poder hacerlo?

## 📘 Contenido

AWS suele resumir por qué conviene usar la nube en seis beneficios concretos.
No hace falta memorizarlos como una lista de la escuela — alcanza con
entenderlos, porque el examen los pregunta disfrazados de situaciones
("una empresa necesita X, ¿qué beneficio de la nube resuelve esto?").

### 1. Cambiás gasto fijo por gasto variable

Si organizás una fiesta una sola vez, no comprás 50 sillas para guardarlas
después en un depósito — las alquilás por el día y listo. Pagás solo por
usarlas, cuando las usás.

Antes de la nube, una empresa que quería tener un sitio web tenía que
*comprar* sus propios servidores, por adelantado, sin saber todavía cuánto
tráfico iban a tener. Con AWS pasa lo mismo que con las sillas: en vez de
comprar servidores propios (gasto fijo, pagás lo mismo los tengas ocupados o
no), pagás solo por la capacidad que efectivamente usás (gasto variable).

### 2. Te beneficiás de economías de escala

Comprar una sola barra de jabón en el almacén de la esquina sale más caro por
unidad que comprar una caja de 20 en un mayorista — el mayorista compra
cantidades enormes y consigue mejor precio, y te traslada parte de ese
ahorro.

AWS le compra infraestructura (servidores, redes, electricidad) a una escala
gigantesca, porque le da servicio a millones de clientes al mismo tiempo. Esa
escala le permite conseguir mejores precios que los que conseguiría una
empresa comprando sus propios servidores por su cuenta — y AWS históricamente
traslada buena parte de ese ahorro a sus clientes bajando precios con el
tiempo.

### 3. Dejás de adivinar cuánta capacidad vas a necesitar

Pensá en un pantalón con cintura elástica en vez de un cinturón con un solo
agujero fijo: se adapta solo, sin que vos tengas que estar recalculando.

Antes, una empresa tenía que *adivinar* cuántos servidores iba a necesitar
dentro de un año y comprarlos de antemano — si adivinaba de menos, el sitio
se caía en un pico de tráfico; si adivinaba de más, pagaba de más por
capacidad que nunca usó. En AWS, la capacidad puede subir y bajar sola según
la demanda real, en vez de basarse en una adivinanza. A esta característica
se la llama **elasticidad**, y la vamos a ver con más detalle en el Módulo 3.

### 4. Ganás velocidad y agilidad

Si necesitás una herramienta nueva para un proyecto, es muy distinto ir a la
ferretería y comprarla en el momento, a tener que construir una fábrica
propia para fabricarla vos mismo.

Levantar un servidor nuevo en AWS toma minutos. Comprar, enviar, instalar y
configurar un servidor físico propio podía tomar semanas o meses. Esa
diferencia de velocidad le permite a un equipo probar una idea nueva
rápido — y si no funciona, apagarla sin haber gastado en hardware que ahora
sobra.

### 5. Dejás de gastar en mantener centros de datos

Vivir en un edificio de departamentos con administración incluida significa
que no te ocupás vos de arreglar el ascensor o la bomba de agua — pagás
expensas y alguien más se encarga. Tener tu propia casa significa que cada
arreglo es tu problema.

Mantener un centro de datos propio implica enfriamiento, generadores de
respaldo, seguridad física, personal técnico las 24 horas — todo eso, antes
de escribir una sola línea de código del producto que la empresa realmente
quiere vender. Con AWS, ese trabajo de "mantenimiento del edificio" lo hace
AWS, y el equipo técnico de la empresa se dedica a construir su producto en
lugar de mantener infraestructura física.

### 6. Alcanzás el mundo entero en minutos

Abrir una sucursal física en otro país implica alquilar un local, conseguir
permisos, contratar gente — meses o años de trabajo. AWS tiene centros de
datos (Regiones) distribuidos en el mundo entero, listos para usar. Si tu
aplicación necesita atender usuarios en otro continente más rápido, podés
desplegarla en una Región nueva en minutos, en vez de construir algo físico
ahí.

**En resumen:** los seis beneficios de AWS Cloud son: gasto variable en vez
de fijo, economías de escala, dejar de adivinar capacidad (elasticidad),
más velocidad y agilidad, no mantener centros de datos propios, y alcance
global casi inmediato. El examen no te va a pedir la lista textual — te va a
describir una situación y esperar que reconozcas cuál de estos seis
beneficios la resuelve.

## 💬 Ahora te toca a ti

**Pregunta:** Si tuvieras que abrir una tienda nueva y no supieras cuántos
clientes vas a tener el primer mes, ¿comprarías de entrada todos los
estantes y cajas registradoras que podrías llegar a necesitar en el mejor
escenario posible, o empezarías con lo mínimo e irías agregando?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo más razonable es empezar con lo mínimo necesario e
ir agregando a medida que la demanda real lo confirme — comprar de más "por
las dudas" es plata inmovilizada en algo que quizás nunca uses. Es
exactamente la lógica detrás de la elasticidad y el gasto variable.

**Pregunta:** ¿Alguna vez calculaste mal cuánto ibas a necesitar de algo
(espacio en el celular, plata para un viaje) y te quedaste corto, o te sobró
un montón? ¿Qué hubiese sido mejor?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo ideal en cualquiera de los dos casos hubiese sido
poder ajustar la cantidad sobre la marcha, en vez de tener que decidir todo
de antemano y quedar atado a esa decisión. Eso es justamente lo que la nube
le resuelve a una empresa: no tiene que "adivinar bien" una sola vez.

**Pregunta:** Si una empresa quiere empezar a vender sus productos en otro
país, ¿qué cosas tendría que resolver antes de poder hacerlo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Típicamente: dónde operar físicamente, permisos
legales, logística, y que el producto responda rápido para los clientes de
ese país. AWS no resuelve los permisos legales, pero sí resuelve la parte de
"tener infraestructura funcionando ahí" en minutos, gracias a sus Regiones
distribuidas por el mundo.

## 🎯 Pistas para el examen

- El examen casi nunca pregunta "¿cuáles son los 6 beneficios de AWS Cloud?"
  como lista — describe una situación (una empresa que no quiere invertir en
  hardware propio, una que necesita escalar rápido para un evento, una que
  quiere llegar a otro continente) y espera que identifiques cuál beneficio
  aplica.
- Cuidado con confundir **elasticidad** (la capacidad se ajusta sola según la
  demanda, subiendo y bajando) con **escalabilidad** (la capacidad puede
  crecer para soportar más carga). Están relacionadas, pero no son lo mismo —
  vamos a volver sobre esta distinción en el Módulo 3.
- Si una pregunta menciona "no queremos comprar hardware por adelantado" o
  "pagar solo por lo que usamos", casi siempre apunta al beneficio de gasto
  variable, no a elasticidad — son beneficios relacionados pero distintos:
  uno es sobre *cómo pagás*, el otro sobre *cómo se ajusta la capacidad*.
- Si la pregunta menciona "llegar a usuarios en otro continente más rápido"
  o "reducir la latencia para clientes lejanos", el beneficio que están
  buscando es el alcance global de la infraestructura de AWS, no
  elasticidad ni economías de escala.
