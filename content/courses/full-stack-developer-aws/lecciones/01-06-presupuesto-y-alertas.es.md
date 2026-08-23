# 1.6 — Presupuesto y alertas de gasto con AWS Budgets

> Módulo 1 · Lección 1.6 · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si tuvieras una fuga de agua un domingo a la noche, ¿cómo te enterarías antes de que llegue la factura del mes?
- ¿Qué diferencia hay entre un detector de humo y un extintor?
- Si le pones a tu cuenta un límite de gasto de 10 dólares, ¿qué esperarías que pase exactamente cuando llegues a 10?

## 📘 Cómo funciona

Esta es **la lección obligatoria del curso**. Va antes de crear cualquier recurso, y no es una exageración pedagógica: es el orden en el que un profesional prepara una cuenta nueva.

### El taxímetro que nadie mira

En la lección 1.3 viste que AWS cobra por uso, con cuatro medidores. Falta la parte incómoda: **nadie te avisa**. No hay un cartel rojo, ni un aviso al encender un servidor caro. El taxímetro corre en silencio y el resultado aparece a fin de mes.

Piensa en una fuga de agua detrás de una pared. No hace ruido, no se ve, y te enteras cuando llega la factura con un número absurdo. Lo que necesitas no es una pared más gruesa: necesitas un **sensor** que te avise el primer día, cuando el daño todavía es de centavos.

Eso es AWS Budgets: un presupuesto con avisos por correo.

### Verdad incómoda nº1: Budgets avisa, no apaga

Aquí es donde casi todo el mundo se confunde, así que léelo dos veces: **poner un presupuesto de 10 dólares no impide que gastes 300**. AWS Budgets es un **detector de humo**, no un extintor. Suena, te despierta, y apagar el fuego sigue siendo tu trabajo.

¿Se puede hacer que apague solo? Sí, existen las *budget actions*: al llegar al umbral, AWS puede aplicar automáticamente una política que te impida crear más recursos. Pero es una función avanzada (necesita permisos y configuración que aún no tienes) y, además, **es de las pocas partes de Budgets que cuestan**: las dos primeras al mes son gratis y a partir de ahí cada una cuesta 0,10 USD por día. La vemos más adelante en el curso, cuando ya sepas de políticas IAM.

Mientras tanto, tu extintor eres tú: cada lección te dice qué borrar, y esa disciplina es la que de verdad mantiene la factura en cero.

### Verdad incómoda nº2: la alarma llega con retraso

La documentación de AWS es explícita: **la información de los presupuestos se actualiza hasta tres veces al día, con 8 a 12 horas entre actualizaciones**. Y a eso se suma el retraso entre usar un recurso y que ese uso se facture.

Traducido: puedes superar tu umbral **antes** de que te llegue el correo. AWS lo advierte con todas las letras — podrías incurrir en costos que excedan el umbral antes de que Budgets alcance a notificarte.

Esto tiene dos consecuencias prácticas, y las dos las aplica este curso:

1. **El umbral se pone ridículamente bajo.** Si esperas al aviso de 50 dólares, cuando llegue ya gastaste 50 y quizá vas por 80. Con un aviso en **1 dólar**, cuando suene el daño sigue siendo trivial.
2. **La alarma no reemplaza borrar.** Es la red de seguridad para cuando te olvidas, no el plan principal.

### Real o previsto: dos formas de avisar

Al configurar un aviso eliges entre dos:

| Tipo | Cuándo suena | Para qué sirve |
|---|---|---|
| **Actual** (*actual*) | Cuando ya gastaste esa cantidad | Confirmación de que algo está pasando |
| **Previsto** (*forecasted*) | Cuando AWS proyecta que vas a llegar a esa cantidad a fin de mes | Te avisa **antes**, con el gasto todavía chico |

El previsto es el que te salva. Si dejas encendido algo que cuesta 0,05 USD por hora, el gasto real del primer día es de un dólar —quizá no dispare nada—, pero la proyección a fin de mes son 36 dólares, y ahí sí suena. Usa los dos.

### Qué cuesta Budgets (poco, pero conviene saberlo)

- **Monitorear y recibir notificaciones: gratis.** Es lo que vas a usar.
- **Presupuestos con acciones automáticas:** los dos primeros al mes gratis; después, 0,10 USD por día cada uno.
- **Informes de presupuesto** (*budget reports*, esos resúmenes programados por correo): **0,01 USD por cada informe entregado**. Un informe diario son unos 30 centavos al mes.

O sea: los avisos que vamos a crear no cuestan nada. Lo único que hay que evitar es activar informes programados o acciones automáticas sin querer.

### La estrategia de tres umbrales

Vamos a montar dos presupuestos, y entre los dos cubren todos los casos:

1. **"Gasto cero"** (plantilla *Zero spend budget*): avisa **apenas tu gasto supere lo gratuito**. Es el más importante del curso: mientras todo esté bien, nunca deberías recibir este correo. Si llega, algo se encendió.
2. **Presupuesto mensual de 10 USD** con tres avisos:
   - **1 USD** → "algo empezó a cobrar, revisa qué es".
   - **5 USD** → "esto no fue un accidente menor, entra hoy".
   - **10 USD** → "apaga todo ya".

Tres niveles funcionan mejor que uno porque distinguen entre "curiosidad" y "emergencia". Con un solo aviso a 10 dólares, te enteras tarde; con uno solo a 1 dólar, te acostumbras a ignorarlo.

Un detalle: al crear tu primer presupuesto, AWS activa **Cost Explorer** (la herramienta para ver en qué se te va el dinero). Su gráfico puede tardar **hasta 24 horas** en mostrar datos. No está roto: está juntando información.

**En resumen:** AWS no te avisa solo, así que la alarma se pone antes de crear nada. Budgets notifica pero no corta el gasto, y avisa con horas de retraso — por eso los umbrales van bajos y se usa también el aviso *previsto*. Monitorear y notificar es gratis; lo que cuesta son las acciones automáticas y los informes programados.

## 🛠️ Manos a la obra

> 📍 Región: la facturación es global. No importa qué región tengas seleccionada.
> 💚 Costo de esta práctica: **$0**. Los presupuestos con notificaciones por correo no se cobran. **No** actives informes programados ni acciones automáticas, que sí tienen costo.

Entra como usuario raíz (todavía no tienes otro usuario; eso es del módulo 2).

### Presupuesto 1 — "Si gasto algo, avísame"

1. **Abre la consola de facturación.** Ve a [console.aws.amazon.com/cost-management](https://console.aws.amazon.com/cost-management/) o busca `Billing and Cost Management` en el buscador de la consola.
   *Deberías ver:* un panel con el gasto del mes, probablemente en 0,00 USD.

2. **Entra a Budgets.** En el menú de la izquierda, elige **Budgets** (*presupuestos*).
   *Deberías ver:* una lista vacía y un botón **Create budget** (*crear presupuesto*).

3. **Crea con plantilla.** Pulsa **Create budget** y elige **Use a template (simplified)** (*usar una plantilla, simplificado*).
   *Deberías ver:* cuatro plantillas. Las dos últimas (Savings Plans y reservas) no te sirven ahora.

4. **Elige "Zero spend budget".** Es la que avisa cuando tu gasto supera lo que cubre la capa gratuita.
   *Deberías ver:* un formulario corto con el nombre del presupuesto y un campo de correo.

5. **Pon tu correo y crea.** Escribe un correo que **leas de verdad** y pulsa **Create budget**.
   *Deberías ver:* el presupuesto en la lista, con estado "OK" o similar.

### Presupuesto 2 — Los tres umbrales

6. **Otro presupuesto, ahora a medida.** **Create budget** → esta vez elige **Customize (advanced)** (*personalizar, avanzado*) → tipo **Cost budget** (*presupuesto de costos*).
   *Deberías ver:* un asistente de varios pasos.

7. **Configura el importe.** Periodo **Monthly** (*mensual*), presupuesto **Recurring** (*recurrente*), importe fijo: **10** USD. Nómbralo `fsaws-alarma-mensual`.
   *Por qué 10:* es lo bastante bajo para que cualquier error se note, y lo bastante alto para no saltar por unos centavos legítimos.

8. **Primer aviso: 10% real.** En la sección de alertas, añade una: umbral **10%** del importe (= 1 USD), tipo **Actual** (*real*), y tu correo.
   *Deberías ver:* la alerta añadida a una lista.

9. **Segundo aviso: 50% real.** Añade otra con umbral **50%** (= 5 USD), tipo **Actual**, mismo correo.

10. **Tercer aviso: 100% real.** Añade otra con umbral **100%** (= 10 USD), tipo **Actual**.

11. **Cuarto aviso: 100% previsto.** Añade una última con umbral **100%**, pero tipo **Forecasted** (*previsto*).
    *Por qué:* esta es la que te avisa **antes** de gastar, en cuanto la proyección del mes apunte a superar los 10 dólares.

12. **Revisa y crea.** Salta cualquier paso de **acciones** (*actions*) — déjalo vacío — y confirma.
    *Deberías ver:* dos presupuestos en la lista. **Si el asistente te ofrece adjuntar una acción automática, no la actives**: es lo único con costo por día.

### Comprobación

13. **Verifica que los correos son correctos.** Abre cada presupuesto y revisa la dirección en sus alertas.
    *Por qué:* una alarma configurada con un correo que no lees es exactamente igual a no tener alarma.

14. **Anota la fecha de hoy.** Dentro de 24 horas, vuelve a **Cost Explorer** y mira si aparece el gráfico.
    *Deberías ver:* un gráfico en 0,00 USD. Ese cero es tu punto de partida.

## 💰 Costo y limpieza

- **Qué creaste:** dos presupuestos con notificaciones por correo.
- **Qué se factura:** **nada**. Monitorear y notificar es gratis. Lo que cuesta —y no activamos— son las acciones automáticas (más de dos al mes: 0,10 USD/día) y los informes programados (0,01 USD por informe).
- **Limpieza:** **no borres nada.** Estos presupuestos se quedan durante todo el curso y después. Son la única red de seguridad de tu tarjeta.
- **Rutina recomendada:** una vez por semana, mira el panel de **Billing and Cost Management**. Treinta segundos. Es el hábito que separa a quien controla su cuenta de quien se lleva sustos.

## 💬 Ahora te toca a ti

**Pregunta:** Si tuvieras una fuga de agua un domingo a la noche, ¿cómo te enterarías antes de que llegue la factura del mes?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Solo si tuvieras algo que te avise: un sensor, un medidor que mires, alguien que escuche el goteo. Si no, te enteras con la factura, cuando ya se fueron miles de litros. En AWS pasa igual: el consumo no hace ruido y la factura llega a fin de mes. Por eso lo primero que se configura en una cuenta nueva no es un servidor, es el sensor. Y por eso se pone en un umbral bajísimo: para enterarte del goteo, no de la inundación.

**Pregunta:** ¿Qué diferencia hay entre un detector de humo y un extintor?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El detector avisa; el extintor apaga. AWS Budgets es un detector de humo: te manda un correo, pero **no detiene el gasto**. Confundirlos es el error más caro de los principiantes ("le puse límite de 10 dólares, así que no puedo gastar más" — sí puedes). El extintor equivalente son las *budget actions*, que aplican automáticamente una política que bloquea crear recursos; requieren saber de IAM y las dos primeras al mes son gratis, después cuestan por día. Hasta entonces, el extintor eres tú borrando lo que creaste.

**Pregunta:** Si le pones a tu cuenta un límite de gasto de 10 dólares, ¿qué esperarías que pase exactamente cuando llegues a 10?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo intuitivo sería que AWS deje de cobrar o apague los recursos. Lo que pasa de verdad es que te llega un correo — y ni siquiera al instante: los presupuestos se actualizan hasta tres veces al día, cada 8 a 12 horas, más el retraso propio de la facturación, así que puedes ir por 15 cuando te enteras de los 10. De ahí las dos costumbres del curso: umbrales bajos (1 USD, no 50), avisos también en modo *previsto*, y borrar los recursos al terminar cada lección en vez de confiar en la alarma.

## ⚠️ Errores comunes

- **"Con el presupuesto puesto ya no puedo gastar de más".** Se confunde aviso con tope → Budgets solo notifica. Lo único que corta el gasto es borrar recursos (o configurar acciones automáticas, que es avanzado y tiene costo).
- **Esperar el aviso al instante.** Se enciende algo caro, no llega correo y se asume que no cuesta → los datos se refrescan hasta tres veces al día, cada 8-12 horas. El silencio de las primeras horas no significa nada.
- **Poner el umbral "por si acaso" en 50 o 100 dólares.** Suena prudente → para cuando avisa, ya dolió. El aviso útil es el de 1 dólar.
- **Usar un correo que no revisas.** La alarma existe pero nadie la escucha → usa el correo del día a día, no el que creaste solo para AWS, si no lo miras.
- **Activar informes o acciones sin darse cuenta.** Aparecen en el asistente y se aceptan por inercia → son las dos únicas partes de Budgets con costo. Déjalos vacíos.
- **Más adelante: no ver los presupuestos desde un usuario IAM.** Los usuarios normales no ven facturación por defecto → el root debe habilitar el acceso a la información de facturación (**Account** → *IAM user and role access to Billing information*). Lo tocamos en el módulo 2.

## 🎯 Para llevarte

- La alarma se pone **antes** de crear el primer recurso. Siempre.
- Budgets avisa, no apaga: es detector de humo, no extintor.
- Los avisos llegan con horas de retraso, así que los umbrales van bajos y con modo *previsto* activado.
- Monitorear y notificar es gratis; las acciones automáticas y los informes programados son lo único que cuesta.
- Tres umbrales (1, 5 y 10 USD) distinguen "revisa esto" de "apaga todo". Uno solo, no.

**En la próxima lección:** ya tienes cuenta protegida y vigilada. Toca entender el mapa: qué son las regiones y las zonas de disponibilidad, por qué el mismo servidor cuesta distinto en Virginia que en São Paulo, y por qué todo el curso trabaja en `us-east-1`.
