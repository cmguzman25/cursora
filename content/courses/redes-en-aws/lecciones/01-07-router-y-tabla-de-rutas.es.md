# 1.7 — El router y la tabla de rutas

> Módulo 1 · Redes sin nube · Clase 7 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Qué hace un router cuando le llega un paquete, y cómo decide por dónde
mandarlo. Vas a leer tu primera tabla de rutas y a aplicar la única regla que
importa para interpretarla. Es la clase que convierte las tablas de AWS de
jeroglífico a cosa obvia.

## 🤔 Antes de empezar

1. En la clase 1.4 vimos qué significa `0.0.0.0/0`. ¿Te acuerdas?
2. Si en una estación hay un cartel que dice "andenes 1 a 10 a la derecha" y
   otro que dice "andén 7 por la escalera", ¿cuál sigues para ir al 7?
3. ¿Cómo sabe el cartero de tu barrio qué hacer con una carta para otro país?

## 📐 La idea

Un **router** es una máquina conectada a dos o más redes a la vez. Esa es toda
su definición. Tiene un pie en cada barrio, y por eso puede pasar cosas de uno
a otro.

Cuando le llega un paquete hace una cosa, y solo una. Mira la dirección de
destino y decide **por dónde sacarlo**. No lo abre, no lo entiende y no lo
guarda.

Para decidir consulta su **tabla de rutas**. Es una lista de dos columnas, y no
hay nada más:

| Destino | Por dónde sale |
|---|---|
| `10.0.1.0/24` | Por la pata A |
| `10.0.2.0/24` | Por la pata B |
| `0.0.0.0/0` | Al router de arriba |

Se lee literalmente. "Si el destino cae dentro de este rango, sal por aquí."

La última fila es la importante. `0.0.0.0/0` significa cualquier dirección del
mundo, así que **siempre encaja**. Es la red de seguridad: cuando nada más
coincide, se usa esa. Por eso se llama la ruta por defecto.

Ahí está la tercera pregunta del principio. El cartero de tu barrio no conoce
las calles de Japón. Solo sabe que lo que no es de su barrio va a la oficina
central. De ahí en adelante ya se encargan otros.

## 🔬 En detalle

Queda un problema. Si `0.0.0.0/0` encaja con todo, ¿por qué no gana siempre?

Porque hay una regla, y es la única que necesitas:

> **Gana la coincidencia más específica.** Es decir, la del número más grande
> después de la barra.

Esa es la segunda pregunta del principio. El cartel del andén 7 es más concreto
que el de "andenes 1 a 10", así que manda el concreto.

Veamos la tabla de arriba en acción, con tres destinos:

```text
   destino 10.0.1.55
     ¿encaja en 10.0.1.0/24?  sí   (/24)
     ¿encaja en 0.0.0.0/0?    sí   (/0)
     gana /24  →  pata A

   destino 10.0.9.3
     ¿encaja en 10.0.1.0/24?  no
     ¿encaja en 10.0.2.0/24?  no
     ¿encaja en 0.0.0.0/0?    sí
     gana /0   →  router de arriba
```

Fíjate en que el router **no sabe** si `10.0.9.3` existe. Lo manda hacia arriba
y se olvida. Si nadie sabe nada de esa dirección, el paquete se pierde por el
camino. La red no avisa al que lo mandó.

Esa es la diferencia entre "no hay ruta" y "la ruta no lleva a ningún sitio". En
el primer caso el router rechaza al momento. En el segundo acepta, manda, y el
paquete desaparece lejos. El segundo caso es mucho más difícil de diagnosticar.
AWS le pone nombre a esa situación, y lo vas a ver en la clase 2.7.

Una última cosa que incomoda al principio. Una ruta dice por dónde salir, y
nada más. **No dice que el destino vaya a contestar.** Para que haya
conversación tiene que existir también el camino de vuelta. Y ese lo decide
otra tabla, en otro sitio. La mitad de los problemas de red son rutas que
existen solo en un sentido.

Conviene cerrar la analogía del cartero, porque deja de valer en algo que duele.
Si una carta no se puede entregar, correos te la devuelve. Un router no
devuelve nada: descarta el paquete y no avisa a nadie. Nadie te va a decir que
tu tráfico se perdió. Por eso estos fallos se diagnostican mirando tablas, no
esperando un aviso.

## 🗺️ Dónde aparece esto en AWS

En AWS las tablas de rutas se ven tal cual, con las mismas dos columnas:
`Destination` y `Target`. Lo que cambia es quién las aplica.

No hay una caja que puedas señalar. El router de una VPC está repartido por la
infraestructura de Amazon, y ya lo nombramos en la clase 1.3. Tú no lo
configuras: configuras sus tablas.

Hay tres diferencias con el router de tu casa que conviene tener claras:

- **Las tablas se asocian a subredes**, no al router. Cada subred mira la suya,
  y dos subredes pueden decidir cosas distintas.
- **La fila `local` aparece sola y no se puede borrar ni editar.** Es la que
  hace que todas las subredes de la VPC se hablen entre sí. Para el tráfico de
  dentro de la VPC, da por hecho que gana ella. Desviarlo es posible en casos
  avanzados, y queda fuera de este curso.
- **Si no hay ruta hacia fuera, no hay salida.** Nadie la pone por ti. Una VPC
  recién creada está aislada del mundo a propósito.

La regla de la coincidencia más específica funciona igual. La vas a usar en el
módulo 4 para un truco elegante. Consiste en mandar el tráfico de un servicio
concreto por un camino distinto, dejando todo lo demás como estaba. Una sola
fila nueva, muy específica, y el resto de la tabla ni se entera.

Merece la pena quedarse con esa idea desde ya. En una tabla de rutas **no se
modifica el comportamiento general para cambiar un caso**. Se añade una fila
más específica y esa gana sola. Añadir es seguro, y tocar la fila por defecto
afecta a todo a la vez.

## ⚠️ No lo confundas con

**Router con el aparato de tu casa.** Lo que te dio la compañía hace cuatro
trabajos a la vez. Es router, punto de acceso sin cables, cortafuegos y
repartidor de direcciones. Llamarlo "el router" mezcla cuatro cosas que en AWS
son cuatro servicios distintos.

**Una ruta con un permiso.** Una ruta dice por dónde se va. No dice quién puede
ir. Una ruta perfecta hacia un sitio no impide que el tráfico se bloquee, porque
el permiso es otra cosa. Eso es la clase 1.12.

**Que exista la ida con que exista la vuelta.** Son dos decisiones separadas,
tomadas por tablas distintas. Un paquete puede llegar perfectamente y que la
respuesta no encuentre el camino de regreso.

## 🔁 Autoevaluación

1. ¿Qué hace un router cuando le llega un paquete?
2. Si un destino encaja en dos rutas, ¿cuál se usa?
3. ¿Qué pasa si el destino no encaja en ninguna ruta y no hay ruta por defecto?
4. ¿A qué se asocian las tablas de rutas en AWS?

**Respuestas:** Una, mira la dirección de destino y decide por dónde sacarlo.
No lo abre ni lo guarda. Dos, la más específica, que es la del número más
grande tras la barra. Tres, el router lo rechaza al momento, porque no sabe qué
hacer con él. Cuatro, a las subredes. Cada subred mira la tabla que tenga
asociada, y dos subredes pueden tener tablas distintas.

## 🎒 Para pensar

Una tabla tiene `0.0.0.0/0` hacia internet y `10.0.0.0/8` hacia la oficina.
Llega un paquete para `10.50.3.7`. ¿Por dónde sale? Ahora imagina que alguien
añade `10.50.0.0/16` hacia un tercer sitio. ¿Cambia la respuesta? Fíjate en que
nadie borró nada, y aun así el comportamiento es otro.
