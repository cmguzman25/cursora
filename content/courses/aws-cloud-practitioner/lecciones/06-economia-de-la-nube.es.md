# 1.4 — Economía de la nube

> Dominio 1 · Task Statement 1.4 — Understand concepts of cloud economics

## 🤔 Antes de empezar

- Si estuvieras comparando el costo de tener auto propio contra el de usar taxis o apps de transporte todo el tiempo, ¿qué gastos tendrías que sumar además del "precio del auto" para que la comparación sea justa?
- ¿Alguna vez alquilaste algo (un camión de mudanza, una herramienta) más grande o más chico de lo que realmente necesitabas? ¿Qué pasó?
- Si ya compraste una herramienta cara (por ejemplo, un taladro), ¿tendría sentido volver a pagar por uno igual si te lo prestan en otro lugar, o preferirías poder llevar el tuyo?

## 📘 Contenido

### CapEx vs. OpEx: la versión formal de "gasto fijo vs. variable"

En la lección 1.1 vimos que la nube te permite pagar solo por lo que usás.
En el mundo de las finanzas, esa idea tiene nombres formales que el examen
espera que reconozcas: **CapEx** (gasto de capital) y **OpEx** (gasto
operativo).

Comprar una casa es CapEx: pagás una suma grande de una sola vez, y esa casa
queda registrada como un activo tuyo, que después vas a tener que mantener
con tu propia plata. Alquilar un departamento es OpEx: pagás un monto
mensual por usarlo, sin comprometerte a un pago gigante por adelantado, y te
podés mudar más fácil si tus necesidades cambian.

Comprar servidores propios es un gasto de capital (CapEx): pagás mucho de
entrada, y ese servidor queda como un activo que hay que mantener. Usar AWS
es un gasto operativo (OpEx): en vez de una inversión grande al principio,
pagás según el uso, mes a mes.

### El costo total de propiedad (TCO)

Si quisieras comparar "cuánto me cuesta tener auto propio" contra "cuánto me
cuesta usar apps de transporte todo el tiempo", no alcanza con mirar el
precio de compra del auto — hay que sumar la nafta, el seguro, el service, la
cochera, las multas. Recién ahí la comparación es justa.

Eso es el **TCO** (Total Cost of Ownership, costo total de propiedad): al
comparar mantener servidores propios contra usar AWS, no alcanza con
comparar el precio de un servidor contra el precio de una instancia EC2 — hay
que sumar electricidad, refrigeración, el espacio físico del centro de
datos, el sueldo del personal técnico que los mantiene, y el tiempo perdido
reparando o reemplazando hardware roto. Cuando se suma todo eso, la
comparación cambia bastante a favor de la nube en la mayoría de los casos.

### Rightsizing: elegir el tamaño correcto

Si alquilás un camión de mudanza mucho más grande de lo que necesitás,
pagás de más por espacio que nunca usaste. Si alquilás uno más chico,
terminás haciendo varios viajes y perdiendo tiempo (y plata en combustible).
Lo ideal es elegir el tamaño que realmente corresponde a la carga.

**Rightsizing** es exactamente eso, aplicado a recursos en AWS: elegir el
tamaño de servidor, base de datos o almacenamiento que corresponde a la
necesidad real, ni de más ni de menos. Como la capacidad en AWS se puede
ajustar fácilmente (a diferencia de comprar hardware propio), el rightsizing
es algo que se puede revisar y corregir todo el tiempo, no una decisión que
se toma una sola vez.

### BYOL: traer tu propia licencia

Si ya tenés un taladro propio, no tendría sentido pagar de nuevo para
alquilar uno igual en otro lugar — llevás el tuyo.

Algunos programas (por ejemplo, ciertos sistemas operativos o bases de
datos) necesitan una licencia para poder usarse. En AWS tenés dos caminos:
pagar una instancia que ya incluye la licencia dentro del precio ("License
Included"), o usar **BYOL** (*Bring Your Own License*, "traé tu propia
licencia") si tu empresa ya pagó por esa licencia en otro lado, para no
pagarla dos veces.

**En resumen:** la nube cambia el gasto de capital (CapEx, pagar mucho por
adelantado por algo que después hay que mantener) por gasto operativo
(OpEx, pagar según el uso). Comparar el costo real de tener infraestructura
propia contra usar AWS requiere mirar el costo total de propiedad (TCO), no
solo el precio de la lista. El rightsizing ayuda a no pagar de más por
capacidad que no se usa, y BYOL evita pagar dos veces por una licencia que
ya tenías.

## 💬 Ahora te toca a ti

**Pregunta:** Si estuvieras comparando el costo de tener auto propio contra
el de usar taxis o apps de transporte todo el tiempo, ¿qué gastos tendrías
que sumar además del "precio del auto" para que la comparación sea justa?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Nafta, seguro, mantenimiento, cochera, patente,
depreciación del auto con el tiempo. Es la misma lógica del TCO: comparar
solo el precio de compra sin estos otros costos da una idea incompleta y
poco realista.

**Pregunta:** ¿Alguna vez alquilaste algo (un camión de mudanza, una
herramienta) más grande o más chico de lo que realmente necesitabas? ¿Qué
pasó?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Si fue más grande de lo necesario, probablemente
pagaste de más por espacio o capacidad sin usar. Si fue más chico, seguro
tuviste que hacer viajes extra o arreglártelas con menos de lo que
necesitabas. Ambos casos son justo lo que el rightsizing busca evitar.

**Pregunta:** Si ya compraste una herramienta cara, ¿tendría sentido volver
a pagar por una igual si te la prestan en otro lugar, o preferirías poder
llevar la tuya?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo lógico es poder llevar la tuya sin pagar de
nuevo — que es exactamente lo que permite BYOL con licencias de software que
tu empresa ya compró.

## 🎯 Pistas para el examen

- Memorizá bien la dirección de la asociación: **comprar hardware propio =
  CapEx**, **usar AWS = OpEx**. El examen puede describir una situación
  ("la empresa no quiere hacer una gran inversión inicial") y esperar que
  identifiques que eso apunta a OpEx.
- Si una pregunta menciona comparar el costo de un servidor propio contra
  AWS pero solo habla del precio de compra, esa comparación está incompleta
  a propósito — la respuesta correcta suele apuntar a considerar el **TCO**
  completo (electricidad, personal, mantenimiento), no solo el precio de
  lista.
- El **rightsizing** está relacionado con el pilar de optimización de
  costos que vimos en la lección 1.2 — si una pregunta describe recursos
  sobredimensionados o subdimensionados, la respuesta suele apuntar a
  ajustar el tamaño, no a cambiar de proveedor o arquitectura.
- No confundas **BYOL** (traer una licencia que ya tenías) con comprar una
  instancia que ya incluye la licencia en el precio ("License Included") —
  son las dos opciones opuestas frente a la misma pregunta: "¿quién paga la
  licencia del software?"
