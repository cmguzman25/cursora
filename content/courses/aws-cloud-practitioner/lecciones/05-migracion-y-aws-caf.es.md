# 1.3 — Migración a la nube: AWS Cloud Adoption Framework y estrategias de migración

> Dominio 1 · Task Statement 1.3 — Understand the benefits of and strategies for migration to the AWS Cloud

## 🤔 Antes de empezar

- Si una empresa grande decidiera mudar todos sus sistemas a la nube de un día para el otro, ¿qué cosas creés que podrían salir mal, más allá de lo técnico?
- Si tuvieras que mudarte de casa, ¿llevarías todos tus muebles viejos tal cual están, comprarías todo nuevo, o una mezcla según el mueble?
- ¿Alguna vez tuviste algo (una app, un archivo, una suscripción) que sabías que ya no usabas pero seguías "manteniendo" por las dudas? ¿Qué tan buena idea fue eso, mirándolo en retrospectiva?

## 📘 Contenido

### Migrar no es solo un tema técnico

Cuando una empresa cambia de oficina, no alcanza con mover los escritorios.
También hay que capacitar a la gente en cómo funciona el edificio nuevo,
actualizar las políticas de seguridad, avisarle a los clientes la nueva
dirección. Migrar a la nube se parece más a esto que a un simple "copiar y
pegar" de servidores.

El **AWS Cloud Adoption Framework (AWS CAF)** existe justamente para eso: es
una guía que organiza todo lo que hay que pensar antes de migrar, no solo la
parte técnica. Lo divide en **6 perspectivas**, agrupadas en dos grandes
grupos.

### Las 6 perspectivas del AWS CAF

**Capacidades de negocio** (el "por qué" y "quién"):

- **Negocio:** ¿esta migración realmente ayuda a los objetivos de la
  empresa, o se está haciendo "porque sí"?
- **Personas:** ¿el equipo tiene las habilidades necesarias para trabajar en
  la nube, o hace falta capacitarlos primero?
- **Gobierno:** ¿existen políticas claras sobre cómo se van a gestionar y
  controlar los recursos en la nube?

**Capacidades técnicas** (el "cómo"):

- **Plataforma:** cómo se diseña e implementa la arquitectura técnica en sí.
- **Seguridad:** que los controles de seguridad se cumplan durante y después
  de la migración, no solo antes.
- **Operaciones:** cómo se van a operar, monitorear y mantener los sistemas
  una vez que ya están migrados.

La idea central del AWS CAF es que una migración que solo piensa en la parte
técnica (Plataforma) y se olvida de las personas o el gobierno, tiene muchas
más chances de fracasar aunque el código funcione perfecto.

### Las 6 estrategias de migración (las "6 R")

Una vez que se decide qué migrar, queda la pregunta de *cómo* migrar cada
sistema puntual. No todo se migra de la misma forma — es como decidir, mueble
por mueble, qué hacer con cada uno al mudarte de casa:

- **Rehosting ("lift and shift"):** mover la aplicación tal cual está, sin
  cambiarle nada. Como llevar el sofá viejo a la casa nueva exactamente
  como estaba. Es la forma más rápida de migrar, aunque no aproveche nada
  especial de la nube todavía.
- **Replatforming:** mover la aplicación haciéndole algunos cambios
  puntuales que faciliten sacarle provecho a la nube, sin rediseñarla por
  completo. Como cambiarle las patas al sofá para que entre mejor por la
  puerta nueva, sin comprar un sofá distinto.
- **Repurchasing:** reemplazar la aplicación por un producto distinto,
  típicamente un servicio ya armado (SaaS). Como vender el sofá viejo y
  comprar un modelo completamente distinto de otra marca.
- **Refactoring (o re-arquitectura):** rediseñar la aplicación desde cero
  para aprovechar al máximo las capacidades nativas de la nube. Como mandar
  a hacer un mueble a medida, pensado específicamente para el espacio
  nuevo — más trabajo, pero el mejor resultado posible para ese espacio.
- **Retire:** dar de baja algo que ya no se usa, en vez de migrarlo. Como
  donar algo que hace años no usás en vez de cargarlo hasta la casa nueva.
- **Retain:** dejarlo como está por ahora, sin migrar — a veces por
  regulaciones, por costo, o porque simplemente no es prioridad todavía.
  Como dejar algo guardado en la casa vieja porque todavía no es el momento
  de moverlo.

Fijate que **Retire** y **Retain** son las dos únicas estrategias de esta
lista que en realidad *no* mueven nada a la nube — una lo elimina, la otra lo
pospone.

**En resumen:** el AWS CAF organiza la migración en 6 perspectivas (negocio,
personas y gobierno del lado del negocio; plataforma, seguridad y operaciones
del lado técnico), para que una migración no se planee solo desde lo
técnico. Las 6 estrategias de migración (rehosting, replatforming,
repurchasing, refactoring, retire y retain) son las formas concretas de
migrar —o no migrar— cada sistema puntual.

## 💬 Ahora te toca a ti

**Pregunta:** Si una empresa grande decidiera mudar todos sus sistemas a la
nube de un día para el otro, ¿qué cosas creés que podrían salir mal, más
allá de lo técnico?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Podrían fallar cosas como que el equipo no sepa
operar las herramientas nuevas, que no haya políticas claras sobre quién
puede crear o borrar recursos, o que nadie haya evaluado si migrar
realmente ayuda al negocio. Son justamente los problemas que las
perspectivas de negocio, personas y gobierno del AWS CAF intentan prevenir.

**Pregunta:** Si tuvieras que mudarte de casa, ¿llevarías todos tus muebles
viejos tal cual están, comprarías todo nuevo, o una mezcla según el mueble?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo más realista es una mezcla: algunos muebles se
llevan tal cual (rehosting), otros se adaptan un poco (replatforming), y
algunos directamente se reemplazan por algo nuevo (repurchasing). Las
empresas migran igual — rara vez usan una sola de las 6 estrategias para
todo su sistema.

**Pregunta:** ¿Alguna vez tuviste algo que sabías que ya no usabas pero
seguías "manteniendo" por las dudas? ¿Qué tan buena idea fue eso, en
retrospectiva?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Casi siempre, en retrospectiva, hubiese sido mejor
haberlo dado de baja (retire) antes. Identificar qué cosas ya no aportan
valor —y animarse a eliminarlas en vez de arrastrarlas— es tan parte de una
buena migración como decidir qué sí se lleva.

## 🎯 Pistas para el examen

- No confundas el **AWS CAF** (las 6 perspectivas, sobre *cómo organizar* la
  migración como proyecto) con las **6 R** (las estrategias concretas sobre
  *cómo migrar cada sistema*). Son dos herramientas distintas que responden
  preguntas distintas — el examen puede preguntar por cualquiera de las dos
  por separado.
- La trampa más común entre las 6 R es confundir **rehosting** con
  **replatforming**: rehosting es mover sin cambiar nada; replatforming
  incluye algún cambio puntual, pero sin rediseñar la aplicación entera (eso
  ya sería refactoring). Si el enunciado dice "sin cambios", es rehosting.
  Si dice "algunos ajustes menores", es replatforming.
- Si una pregunta describe una migración que aprovecha al máximo las
  funciones nativas de la nube pero requiere rediseñar la aplicación desde
  cero, están describiendo **refactoring** — es la opción de mayor esfuerzo,
  pero también la de mayor beneficio a largo plazo.
- Recordá que **retire** y **retain** no mueven nada a la nube — si una
  pregunta pide identificar cuál de las 6 R *no* es realmente una migración,
  la respuesta es una de esas dos.
