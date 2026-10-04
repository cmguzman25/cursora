# 0.2 — Tu presupuesto y tus alertas, antes de crear nada

> Módulo 0 · Preparar el terreno · Clase 2 de 3 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a lograr hoy

Vas a dejar puesta una red de seguridad. Es un presupuesto que te avisa por
correo al llegar a 1, a 5 y a 10 dólares de gasto. Son diez minutos de trabajo,
y es lo único de este curso que te pido no saltarte. Si todo lo demás falla,
esto te avisa.

## 🤔 Antes de empezar

1. ¿Cuánto tardarías en darte cuenta de que algo que creaste hace un mes sigue
   encendido?
2. ¿Por qué crees que las facturas sorpresa de la nube son tan famosas, si los
   precios están publicados?
3. Si un aviso te llega cuando ya has gastado 300 dólares, ¿te sirve de algo?

## 📐 La idea

AWS cobra por tiempo encendido, no por uso. Una pieza de red que creas y
olvidas no da ninguna señal: no se ralentiza, no falla, no te escribe. Solo
cuenta horas en silencio hasta que llega el recibo.

Ahí está la segunda pregunta del principio. Los precios están publicados, sí,
pero nadie se sienta a multiplicar 0,045 por 24 y por 30. Y eso da 32 dólares
al mes por un solo recurso olvidado.

La respuesta de AWS a esto se llama **AWS Budgets**. Le dices cuánto esperas
gastar al mes y a qué correo avisar. Cuando el gasto cruza el umbral que
marques, te escribe.

Conviene entender qué hace y qué no hace, porque mucha gente se confía:

- **Avisa.** Te manda un correo cuando cruzas un umbral.
- **No corta nada.** No apaga recursos ni bloquea la cuenta. Sigue gastando.
- **Mira hacia atrás.** Te dice lo que ya gastaste, no lo que vas a gastar.

Por eso el diseño importa. Un presupuesto de 10 dólares que solo avisa al 100 %
te escribe cuando ya llevas 10 gastados. Lo útil es poner **varios avisos
escalonados**, y que el primero salte muy pronto.

Ahí está la tercera pregunta del principio. Un aviso tardío no frena el gasto:
solo sirve para enterarte. El que sirve de verdad es el primero.

Y una decisión que conviene explicar, porque parece al revés. El presupuesto
que vas a poner es de **10 dólares**, no de 100. No es que esperes gastar diez:
es que cualquier cosa por encima de eso significa que algo se quedó encendido.
El número del presupuesto no es una previsión. Es el umbral a partir del cual
quieres que te molesten.

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (Norte de Virginia)**. La facturación es
> global y no depende de la región, pero acostúmbrate desde hoy a mirar el
> selector de arriba a la derecha. El error más común al empezar es crear algo
> y después no encontrarlo.

**1.** Entra en la consola de AWS con tu cuenta. En la barra de búsqueda de
arriba escribe `Billing and Cost Management` y entra.

*Deberías ver:* un panel con el gasto del mes en curso. Si la cuenta es nueva,
casi seguro pone 0,00 USD.

**2.** En el menú de la izquierda, entra en `Budgets` y pulsa
`Create budget`.

*Deberías ver:* una pantalla que te deja elegir entre plantillas y una opción
de personalizar.

**3.** Elige `Customize (advanced)` y después, en tipo de presupuesto,
`Cost budget`. Continúa.

**4.** Rellena el presupuesto con estos valores.

| Campo | Valor |
|---|---|
| Budget name | `redes-aws-presupuesto` |
| Period | `Monthly` |
| Budget renewal type | `Recurring budget` |
| Budgeting method | `Fixed` |
| Enter your budgeted amount | `10` |

*Deberías ver:* un resumen que dice 10,00 USD al mes.

**5.** Ahora los avisos, que son lo importante. En `Configure alerts` crea
**tres**, uno por fila de esta tabla. En los tres, el tipo de umbral es
`Percentage` y la condición es `Greater than`.

| Aviso | Threshold | Equivale a | Para qué sirve |
|---|---|---|---|
| Primero | `10` % | 1 USD | Enterarte de que algo empezó a cobrar |
| Segundo | `50` % | 5 USD | Avisarte de que algo lleva días encendido |
| Tercero | `100` % | 10 USD | Red de seguridad final |

En cada uno, escribe tu correo en `Email recipients`.

**6.** Revisa el resumen y pulsa `Create budget`.

*Deberías ver:* el presupuesto en la lista, con el gasto actual y los tres
avisos configurados.

## ▶️ Compruébalo

Abre `Budgets` y mira la fila de `redes-aws-presupuesto`. Tiene que mostrar:

```text
   Budget name              redes-aws-presupuesto
   Budgeted amount          $10.00
   Current spend            $0.00  (o lo que lleves)
   Alerts                   3
```

Entra en el presupuesto y abre la pestaña de alertas. Tienen que aparecer los
tres umbrales, en 10 %, 50 % y 100 %, cada uno con tu correo.

Si tu cuenta ya tenía gasto previo, el número de `Current spend` no será cero.
No pasa nada: lo que importa es que los tres avisos estén puestos.

Una advertencia honesta: **no vas a poder probar que el correo llega** hasta
que gastes de verdad. AWS no tiene un botón de prueba. La primera vez que te
escriba será en el módulo 2, con el primer recurso que cobra.

Por eso merece la pena hacer una comprobación que sí puedes hacer hoy. Mira la
dirección que pusiste y pregúntate dos cosas. ¿Es un correo que lees de verdad?
¿Y pasaría el filtro de no deseado, o acabaría en una carpeta que no abres
nunca? Un aviso que nadie lee es lo mismo que no tener aviso.

## 🧯 Si algo se rompe

**No encuentras `Billing and Cost Management` o entras y no ves nada.**
Causa: estás usando un usuario que no tiene permiso para ver la facturación.
Solo el usuario raíz y quien tenga permisos de facturación la ven.
Arreglo: entra con el usuario raíz de la cuenta, o pide que te den acceso a
facturación.

**El presupuesto aparece creado pero el gasto se queda en blanco.**
Causa: los datos de facturación tardan hasta 24 horas en actualizarse.
Arreglo: esperar. No es un fallo. Y es justo la razón de poner el primer aviso
al 10 %. Cuando te llegue, ya llevarás un rato gastando.

**No te deja poner tres avisos.**
Causa: te has saltado el paso de `Add alert threshold` entre uno y otro.
Arreglo: en la pantalla de alertas, cada aviso se añade aparte. Crea el
primero, guárdalo, y repite.

## 🧹 Qué se queda encendido

**Qué creaste:** un presupuesto con tres avisos por correo.

**Qué se borra ahora:** nada.

**Qué se queda vivo:**

| Recurso | Costo mientras vive | Se borra en |
|---|---|---|
| `redes-aws-presupuesto` | Gratis. Los dos primeros presupuestos de una cuenta no se cobran | la clase 8.6, y solo si quieres |

Este es el único recurso del curso que te recomiendo **no borrar al final**. Es
gratis, no molesta y te va a seguir avisando cuando este curso sea un recuerdo.
La clase 8.6 te lo recuerda y te deja decidir.

**Comprueba que no quedó nada de más:** en `Budgets`, tiene que haber uno solo
con el nombre del curso.

## 🔁 Autoevaluación

1. ¿Qué hace AWS Budgets cuando cruzas el umbral, y qué no hace?
2. ¿Por qué se quedan cortos un presupuesto y un solo aviso al 100 %?
3. ¿Qué umbral en porcentaje equivale a 1 dólar en un presupuesto de 10?
4. ¿Por qué el gasto puede tardar en aparecer?

**Respuestas:** Una, te manda un correo. No apaga nada ni bloquea la cuenta, y
el gasto sigue corriendo. Dos, porque te avisaría cuando ya has gastado los 10.
El aviso útil es el primero, el que salta pronto. Tres, el 10 %. Cuatro, porque
los datos de facturación de AWS tardan hasta 24 horas en actualizarse.

## 🎒 Para pensar

El presupuesto que acabas de poner es mensual. Imagina que creas algo un día 28
y se te olvida. ¿Cuándo te avisaría el primer umbral, y qué pasa cuando el mes
cambia y el contador vuelve a cero? Piensa en si eso te protege o te despista.
