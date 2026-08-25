# 2.4 — Políticas administradas vs propias y el principio de menor privilegio

> Módulo 2 · Lección 2.4 · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si el conserje de un edificio te presta el llavero maestro porque necesitas entrar al depósito, ¿qué problema le ves?
- ¿Por qué crees que, cuando algo falla por permisos, la tentación es dar **más** permisos en lugar de menos?
- ¿Cómo averiguarías qué permisos necesita de verdad una aplicación, sin adivinar?

## 📘 Cómo funciona

Necesitas entrar al depósito del sótano a buscar una caja. Vas a la portería y el conserje tiene dos opciones.

La primera: te da el **llavero maestro**, ese que abre las 40 puertas del edificio. Tarda dos segundos y funciona seguro.

La segunda: busca en el tablero la llave del depósito, esa sola, y te la da. Tarda un minuto más.

Las dos te dejan entrar al depósito. Pero si pierdes la primera en el autobús, quien la encuentre entra a todos los apartamentos. Si pierdes la segunda, alguien puede robar una caja de cartón.

**Eso es el principio de menor privilegio.** Y en AWS la diferencia entre los dos llaveros la eliges tú, cada vez.

### Las tres familias de políticas

En la lección 2.3 leíste dos políticas: `AdministratorAccess` (que trae AWS) y una que escribiste tú. Parecen lo mismo —las dos son un JSON con `Effect`, `Action` y `Resource`— pero AWS las trata distinto. Hay tres familias:

| Familia | Quién la escribe | ¿Puedes editarla? | ¿Se reutiliza? |
|---|---|---|---|
| **AWS managed** (administrada por AWS) | AWS | ❌ No | Sí, en toda tu cuenta |
| **Customer managed** (administrada por el cliente) | Tú | ✅ Sí | Sí, en toda tu cuenta |
| **Inline** (en línea) | Tú | ✅ Sí | ❌ No, vive pegada a una sola identidad |

Las **administradas por AWS** son las que ya viste en la lista: `AdministratorAccess`, `AmazonS3ReadOnlyAccess`, `AmazonEC2FullAccess`. Las mantiene AWS. Cuando sale un servicio nuevo, AWS actualiza sus políticas para incluirlo, sin que hagas nada. Es cómodo. Y no puedes tocarlas: no hay botón de editar.

Las **administradas por el cliente** son las tuyas. La que creaste en la lección 2.3 es una de estas. Las escribes, las editas, y las enganchas a cuantos usuarios, grupos o roles quieras. Cambias la política en un sitio y el cambio le llega a todos.

Las **inline** son un caso especial: en vez de existir por su cuenta, van pegadas a una única identidad. Si borras el usuario, la política se va con él. No se pueden reutilizar.

### Por qué las de AWS casi nunca alcanzan

Vuelve a `AmazonS3ReadOnlyAccess`, la que abriste en la práctica anterior. Aplicaste las tres preguntas y encontraste esto: acciones acotadas a lectura, pero `Resource: "*"`.

Ese asterisco significa **todos los buckets de la cuenta**. El de las facturas. El de las copias de seguridad. El que todavía no has creado.

No es un error de AWS. Es que esa política tiene que servirle igual a una startup de tres personas y a un banco con 4.000 buckets. Para servirle a todos, tiene que ser ancha.

> **La regla práctica:** las políticas de AWS son un punto de partida excelente para **entender** y un punto de llegada malo para **producción**.

### El principio de menor privilegio

Dicho en una frase: **cada identidad debe tener exactamente los permisos que necesita para su trabajo, y ni uno más.**

Aquí viene la parte que cuesta aceptar. Esto no se hace porque desconfíes de tu equipo. Se hace por dos razones que no tienen nada que ver con la mala fe:

- **Las credenciales se filtran.** Alguien sube una clave a GitHub por error. Alguien cae en un correo falso. Pasa todos los días, en empresas serias.
- **El código tiene errores.** Un script que debía borrar los archivos temporales borra la carpeta equivocada.

En los dos casos, la pregunta no es *"¿quién falló?"*. La pregunta es **"¿hasta dónde llegaba esa identidad?"**. El daño de un incidente no lo decide el atacante: lo decide el permiso que tenía la llave que se perdió.

Por eso los profesionales lo resumen así: **el permiso que no diste es el incidente que no tuviste.**

### Cómo llegar al mínimo sin adivinar

Aquí está la trampa de la que casi nadie te avisa. Menor privilegio suena bien hasta que tienes que decidir permisos de verdad, y entonces te das cuenta de que **no sabes qué necesita la aplicación**. Así que pones `s3:*` "por ahora", y ese "por ahora" dura tres años.

Hay una salida, y es más simple de lo que parece: **empieza por debajo y deja que falle.**

1. Da el permiso más estrecho que se te ocurra. Casi seguro va a ser insuficiente.
2. Ejecuta la aplicación. Va a fallar con un error de permisos.
3. **Lee el error.** AWS no dice "acceso denegado" a secas: te dice qué identidad, qué acción y sobre qué recurso. Algo así:

```
User: arn:aws:iam::123456789012:user/carlos is not authorized to
perform: s3:PutObject on resource: arn:aws:s3:::fsaws-facturas-4821/informe.pdf
```

4. Añade **esa** acción. Solo esa. Repite.

Suena lento. Son tres o cuatro vueltas, y terminas con una política que sabes defender delante de un auditor, en vez de un asterisco que no sabes explicar.

Existe además una herramienta que hace este trabajo mirando lo que la identidad usó de verdad durante los últimos días: **IAM Access Analyzer**. La vemos en la lección 2.9, cuando ya tengas actividad real que analizar.

### Entonces, ¿cuál uso?

- **Administrada por AWS:** mientras aprendes, y para permisos de solo lectura amplios que de verdad quieres amplios (por ejemplo, un rol de auditoría).
- **Administrada por el cliente:** el caballo de batalla. Cuando el mismo permiso lo van a necesitar varias personas o varios servicios.
- **Inline:** cuando el permiso es tan específico de esa identidad que no tiene sentido reutilizarlo, y quieres la garantía de que desaparece con ella.

**En resumen:** las políticas de AWS son cómodas pero anchas; las tuyas son estrechas y las controlas. Menor privilegio significa dar solo lo necesario, y se consigue empezando corto y ampliando según los errores reales, no adivinando de entrada.

## 🛠️ Manos a la obra

> 📍 IAM es **global**: la región no importa.
> 💚 Costo de esta práctica: **$0**. Políticas, grupos y el simulador son gratis.

Entra con **tu usuario** (el de la lección 2.2), no con root. Vas a usar la política que creaste en la 2.3 y te pedí no borrar.

### Parte 1 — Ver las familias en pantalla

1. **Abre IAM → Policies.** En el filtro de la izquierda, elige **Filter by Type → AWS managed** (*administradas por AWS*) y fíjate en el número de resultados. Luego cambia a **Customer managed** (*administradas por el cliente*).
   *Deberías ver:* varios cientos en la primera lista y **solo la tuya** en la segunda. Ese contraste es la lección entera.

2. **Abre `AmazonS3ReadOnlyAccess`** y busca el botón de editar.
   *Deberías ver:* que **no existe**. Solo puedes verla, y en el menú de acciones aparece una opción para *clonarla*. AWS te deja copiar su trabajo, no modificarlo.

3. **Abre ahora tu política** (la que empieza por `fsaws-`).
   *Deberías ver:* el botón **Edit** disponible, y una pestaña **Tags** con la etiqueta que le pusiste. Las políticas tuyas sí admiten etiquetas; las de AWS no son tuyas.

### Parte 2 — Poner tu política a trabajar

4. **Crea un grupo.** IAM → **User groups** → **Create group** → nómbralo `fsaws-lectores-s3`. **No le añadas ningún usuario.**
   *Deberías ver:* el formulario con la lista de políticas debajo.

5. **Adjunta tu política**, la `fsaws-` de la lección 2.3. Usa el filtro de tipo para encontrarla rápido. Crea el grupo.
   *Deberías ver:* `fsaws-lectores-s3` en la lista, con **0 usuarios y 1 política**.
   *Por qué un grupo vacío:* porque hoy quieres **probar** los permisos, no dárselos a nadie. Un grupo sin usuarios no otorga nada, igual que una política sin asignar.

### Parte 3 — Demostrar que el límite existe

Ahora la parte que separa a quien *cree* que sus permisos están bien de quien *lo sabe*.

6. **Abre el simulador de políticas** en `policysim.aws.amazon.com`. Es una herramienta de solo lectura: prueba permisos sin ejecutar nada de verdad.
   *Deberías ver:* una lista de tus usuarios, grupos y roles a la izquierda.

7. **Selecciona el grupo `fsaws-lectores-s3`.** Marca su política.
   *Deberías ver:* la política listada como seleccionada.

8. **Elige el servicio `Amazon S3`** y marca tres acciones: `GetObject`, `ListBucket` y `DeleteObject`.

9. **Pon el recurso.** En el campo de recurso escribe el ARN del bucket de tu política, con `/*` al final:
   `arn:aws:s3:::fsaws-ejemplo-1234/*`
   *(Usa el nombre exacto que pusiste en la lección 2.3.)*

10. **Pulsa Run Simulation** (*ejecutar simulación*).
    *Deberías ver:* `GetObject` → **allowed** (*permitido*), y `DeleteObject` → **denied** (*denegado*). Acabas de comprobar que tu política deja leer y **no** deja borrar. Eso es menor privilegio, verificado.

11. **Ahora la prueba que importa.** Cambia el recurso por un bucket distinto, por ejemplo `arn:aws:s3:::fsaws-otro-9999/*`, y vuelve a simular `GetObject`.
    *Deberías ver:* **denied**. Compara esto con `AmazonS3ReadOnlyAccess`, que habría dicho *allowed* para cualquier bucket del planeta que sea tuyo. Ahí está, medida, la diferencia entre el llavero maestro y la llave del depósito.

## 💰 Costo y limpieza

- **Qué creaste:** un grupo de IAM vacío, con una política ya existente adjunta.
- **Qué se factura:** **nada**. Usuarios, grupos, políticas, roles y el simulador son gratis y sin límite práctico. IAM no aparece nunca en tu factura.
- **Limpieza:**
  - **La política `fsaws-`: no la borres.** La reutilizamos en el ejercicio de la lección 2.10.
  - **El grupo `fsaws-lectores-s3`: no lo borres tampoco.** En la 2.10 le vas a meter un usuario dentro.
  - Ojo con una cosa: los **grupos de IAM no admiten etiquetas**, así que este no va a aparecer si lo buscas con el Tag Editor de la lección 1.9. Anótalo donde lleves la cuenta de tus recursos.

## 💬 Ahora te toca a ti

**Pregunta:** Si el conserje de un edificio te presta el llavero maestro porque necesitas entrar al depósito, ¿qué problema le ves?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que el permiso que recibes no tiene nada que ver con lo que necesitas. Entrar al depósito requiere una llave; te dieron cuarenta. El problema no es que vayas a usarlas mal, es que **el daño posible ya no depende de tus intenciones**: si pierdes ese llavero, o alguien te lo copia, el alcance del desastre lo fijó el conserje cuando eligió la comodidad. En AWS pasa igual: cuando adjuntas `AdministratorAccess` porque es rápido, estás decidiendo por adelantado cuánto se puede romper.

**Pregunta:** ¿Por qué crees que, cuando algo falla por permisos, la tentación es dar **más** permisos en lugar de menos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque dar de más **funciona a la primera y se nota enseguida**, mientras que dar lo justo requiere varias vueltas y no da ninguna recompensa visible. Nadie te felicita por una política ajustada. Además, el coste de haber dado de más no aparece ese día: aparece meses después, en un incidente, cuando ya nadie recuerda quién puso el asterisco ni por qué. Es una decisión con el beneficio inmediato y el precio aplazado, que es justo el tipo de decisión que los humanos tomamos mal.

**Pregunta:** ¿Cómo averiguarías qué permisos necesita de verdad una aplicación, sin adivinar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Dejándola fallar. Le das el permiso más estrecho que se te ocurra, la ejecutas, y lees el mensaje de error: AWS te dice literalmente qué acción faltó y sobre qué recurso. Añades esa acción, repites, y en tres o cuatro vueltas tienes una política ajustada a lo que la aplicación **hace**, no a lo que tú **crees** que hace. Cuando ya lleva tiempo funcionando, IAM Access Analyzer puede generarte la política mirando su actividad real (lección 2.9).

## ⚠️ Errores comunes

- **Buscas el botón de editar en una política de AWS y no aparece.** Las administradas por AWS son de solo lectura → clónala (*Create policy like this* / *Clone*), ponle tu nombre con prefijo `fsaws-` y recorta lo que sobre. La copia ya es tuya y sí se edita.
- **Adjuntas políticas directamente al usuario en lugar del grupo.** Funciona igual, pero a los seis meses nadie sabe por qué esa persona puede hacer lo que hace → el permiso va al grupo (el puesto), no a la persona, como viste en la 2.2. Deja los permisos directos para excepciones que puedas justificar.
- **Pones `"Resource": "*"` "temporalmente" para desbloquear algo.** Lo temporal en permisos es permanente → si de verdad necesitas desbloquear ya, anótalo en tu lista de pendientes con fecha. Un asterisco sin dueño no se cierra solo.
- **Te da error al adjuntar la política número once.** Una identidad admite **hasta 10 políticas administradas** → junta permisos relacionados en una sola política tuya, en vez de acumular políticas de AWS sueltas. Es otra razón para escribir las propias.
- **Confundes "no tiene permiso" con "está denegado".** No son lo mismo → si no hay ningún `Allow`, la acción falla por omisión y basta con añadir el permiso. Si hay un `Deny` explícito en alguna política, ningún `Allow` lo vence (lección 2.3) y hay que quitar la denegación.
- **Buscas el grupo en el Tag Editor y no aparece.** Los grupos de IAM no admiten etiquetas → no es un fallo tuyo. Usuarios, roles y políticas sí las admiten; los grupos, no.

## 🎯 Para llevarte

- Tres familias: las de **AWS** (cómodas y anchas, no editables), las **tuyas** (estrechas y reutilizables) y las **inline** (pegadas a una sola identidad).
- Las políticas de AWS son un buen punto de partida y un mal punto de llegada: están hechas para servirle a todo el mundo.
- Menor privilegio no va de desconfianza. Va de que **el daño de un incidente lo decide el permiso, no el atacante**.
- Para acertar con los permisos, empieza corto y deja que falle: el mensaje de error de AWS te dice exactamente qué añadir.
- El simulador de políticas te deja **demostrar** que un permiso no existe, sin tocar nada real. Probar lo que debe fallar es parte del trabajo.

**En la próxima lección:** hasta ahora los permisos han sido de personas. Pero la mayoría de los accesos en AWS no son de personas: son de servicios. Vamos con los **roles de IAM**, la identidad que se presta en vez de darse — el concepto que más cuesta al principio y el que más vas a usar el resto del curso.
