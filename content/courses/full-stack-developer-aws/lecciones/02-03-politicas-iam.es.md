# 2.3 — Políticas IAM: leer un JSON de permisos sin miedo

> Módulo 2 · Lección 2.3 · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si tuvieras que escribir en una sola frase quién puede entrar a tu casa y a qué habitaciones, ¿qué datos necesitarías incluir sí o sí?
- ¿Por qué crees que en una dirección postal el orden importa: país, ciudad, calle, número?
- Si un permiso dice "puede abrir el archivador", ¿eso incluye leer las carpetas que hay dentro?

## 📘 Cómo funciona

En la lección 2.1 abriste `AdministratorAccess` y viste tres líneas con dos asteriscos. Hoy vas a entender ese documento entero, porque **todos los permisos de AWS se escriben así**. Si sabes leerlo, sabes auditar una cuenta.

### Primero, treinta segundos de JSON

Las políticas se escriben en **JSON**, una forma estándar de anotar datos. Lo veremos a fondo en la lección 3.8, pero para hoy alcanza con tres reglas:

- Las llaves `{ }` agrupan un conjunto de datos.
- Dentro van pares `"nombre": valor`, separados por comas.
- Los corchetes `[ ]` son una lista de varios elementos.

Nada más. Si eso te suena, ya puedes leer cualquier política.

### Una política es un formulario de permiso

Piensa en el papel que firma un portero cuando autoriza a un proveedor: *permitido / entregar paquetes / en el edificio Rivadavia 100 / de 9 a 18*. Cuatro datos: qué se decide, qué se puede hacer, sobre qué, y bajo qué condiciones.

Una política IAM es exactamente ese papel:

| Palabra en el JSON | Pregunta que responde | En el ejemplo del portero |
|---|---|---|
| `Effect` | ¿Se permite o se prohíbe? | "Permitido" |
| `Action` | ¿Qué se puede hacer? | "Entregar paquetes" |
| `Resource` | ¿Sobre qué cosa concreta? | "El edificio Rivadavia 100" |
| `Condition` | ¿Bajo qué circunstancias? | "De 9 a 18" |

Con esas cuatro palabras se escribe el 95% de los permisos de AWS.

### La política más simple posible

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*"
    }
  ]
}
```

Se lee así: **permite** (`Allow`) **ver la lista de buckets** (`s3:ListAllMyBuckets`) **de todos** (`*`).

Fíjate en el formato de la acción: `servicio:Operación`. Siempre. `s3:GetObject`, `lambda:InvokeFunction`, `dynamodb:PutItem`. Cuando veas una acción desconocida, la parte de antes de los dos puntos ya te dice de qué servicio habla.

Y ojo con `Version`: **no es la fecha de tu política**. Es la versión del idioma en que está escrita, y `2012-10-17` es la vigente. Se copia tal cual y no se toca nunca.

### El ARN: la dirección postal de AWS

`"Resource": "*"` significa "todo", y "todo" casi nunca es la respuesta correcta. Para señalar una cosa concreta, AWS usa un **ARN** (*Amazon Resource Name*), que funciona igual que una dirección postal: campos de lo más general a lo más específico, separados por dos puntos.

```
arn : partition : service : region : account-id : resource-id
 │       │          │         │          │            │
 │       │          │         │          │            └── qué cosa exacta
 │       │          │         │          └── tu cuenta (12 dígitos)
 │       │          │         └── la región
 │       │          └── el servicio (s3, lambda, dynamodb…)
 │       └── casi siempre "aws"
 └── siempre empieza así
```

Un ejemplo real de un usuario IAM:

```
arn:aws:iam::123456789012:user/carlos
```

¿Por qué tiene dos puntos seguidos (`::`)? Porque **IAM es global**: el campo de la región va vacío. Lo mismo pasa con S3, que además omite la cuenta, porque los nombres de bucket son únicos en todo el mundo:

```
arn:aws:s3:::fsaws-portfolio-4821
```

### La trampa del archivador

Aquí está la respuesta a la tercera pregunta del inicio, y es el error número uno al escribir políticas de S3.

Un bucket y los archivos que hay dentro son **dos cosas distintas** con **dos direcciones distintas**:

| ARN | Qué es | Analogía |
|---|---|---|
| `arn:aws:s3:::mi-bucket` | El bucket en sí | El archivador |
| `arn:aws:s3:::mi-bucket/*` | Todos los objetos dentro | Las carpetas de adentro |

Dar permiso sobre el archivador **no** da permiso sobre las carpetas. Por eso una política para "leer los archivos de este bucket" necesita casi siempre **los dos ARNs**: uno para listar el contenido (`s3:ListBucket` sobre el bucket) y otro para leer los archivos (`s3:GetObject` sobre `bucket/*`).

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::fsaws-portfolio-4821"
    },
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::fsaws-portfolio-4821/*"
    }
  ]
}
```

Cuando alguien diga "le di permisos y sigue sin funcionar", empieza mirando si falta el `/*`.

### Las condiciones: permisos con letra pequeña

`Condition` añade circunstancias. Es la parte que convierte un permiso amplio en uno razonable:

```json
{
  "Effect": "Allow",
  "Action": "s3:DeleteObject",
  "Resource": "arn:aws:s3:::fsaws-portfolio-4821/*",
  "Condition": {
    "Bool": { "aws:MultiFactorAuthPresent": "true" }
  }
}
```

Se lee: puedes borrar archivos, **pero solo si iniciaste sesión con MFA**. Hay condiciones para la hora, la dirección IP de origen, la región, si la conexión va cifrada… Con esto se construyen las barreras finas.

### Cómo leer cualquier política en 30 segundos

Este es el método que usa un profesional al abrir una política ajena. Tres preguntas, en este orden:

1. **¿Qué tan ancha es la acción?** ¿Es `s3:GetObject` (una cosa), `s3:Get*` (una familia) o `s3:*` (el servicio entero)?
2. **¿Qué tan ancho es el recurso?** ¿Un ARN concreto, un prefijo con comodín, o `*`?
3. **¿Hay condiciones?** Si no hay ninguna, el permiso vale siempre, desde cualquier sitio.

Aplícalo a `AdministratorAccess` —acción `*`, recurso `*`, sin condiciones— y entenderás por qué esa política se trata con respeto.

### Dónde se enganchan las políticas

Un último concepto, corto pero importante. Hay dos formas de usar una política:

- **Políticas de identidad:** se pegan a un usuario, grupo o rol. Dicen *"esta persona puede hacer esto"*. Es lo que hiciste en la lección 2.2 al darle `AdministratorAccess` al grupo.
- **Políticas de recurso:** se pegan al recurso. Dicen *"a esta cosa pueden accederla estos"*. La típica es la política de un bucket de S3, que veremos en el módulo 11.

Cuando las dos existen, **se suman**: si cualquiera de las dos permite, se permite. Salvo que alguna deniegue explícitamente — porque, como viste en la 2.1, la denegación siempre gana.

**En resumen:** una política es un JSON con cuatro palabras clave: `Effect` (permitir o negar), `Action` (qué), `Resource` (sobre qué, con su ARN) y `Condition` (bajo qué circunstancias). El ARN es una dirección postal de seis campos, y en S3 el bucket y sus objetos son direcciones distintas — de ahí el famoso `/*` que falta.

## 🛠️ Manos a la obra

> 📍 IAM es global: la región no importa.
> 💚 Costo de esta práctica: **$0**. Las políticas no cuestan; hoy además ni siquiera vamos a aplicarla a nadie.

Entra con **tu usuario** (el de la lección 2.2), no con root.

### Parte 1 — Leer

1. **Abre `AmazonS3ReadOnlyAccess`.** IAM → **Policies** → búscala → pestaña **JSON**.
   *Deberías ver:* un bloque con `Effect: Allow`, una lista de acciones y `Resource: "*"`.

2. **Aplica el método de las tres preguntas.** Anota las respuestas:
   - ¿Qué tan ancha es la acción? *(Pista: mira si hay asteriscos dentro de las acciones.)*
   - ¿Qué tan ancho es el recurso?
   - ¿Hay condiciones?
   *Deberías ver:* que las acciones están acotadas a lectura, pero **el recurso es `*`**: puede leer *cualquier* bucket de la cuenta. Ancha en recurso, estrecha en acción.

3. **Descompón un ARN.** Toma `arn:aws:iam::123456789012:user/carlos` y escribe qué es cada campo.
   *Deberías ver:* que el campo de región está vacío, y por qué (IAM es global, lección 2.1).

### Parte 2 — Escribir tu primera política

4. **Crea una política.** IAM → **Policies** → **Create policy**. Elige el servicio **S3**.
   *Deberías ver:* el editor visual, con listas de acciones agrupadas por tipo (List, Read, Write…).

5. **Marca solo dos acciones:** `ListBucket` (en *List*) y `GetObject` (en *Read*).
   *Deberías ver:* abajo, un aviso de que faltan recursos por especificar.

6. **Especifica los recursos.** En la sección de recursos, añade:
   - Para `bucket`: el nombre `fsaws-ejemplo-1234` (no hace falta que exista).
   - Para `object`: el mismo bucket y, en la clave del objeto, marca **Any object key** (*cualquier objeto*).
   *Deberías ver:* dos ARNs distintos en el resumen. **Ahí está, en vivo, la trampa del archivador**: la consola te obliga a declarar los dos.

7. **Mira el JSON generado.** Cambia del editor visual a la pestaña **JSON**.
   *Deberías ver:* algo muy parecido al ejemplo de la teoría, con `arn:aws:s3:::fsaws-ejemplo-1234` y `arn:aws:s3:::fsaws-ejemplo-1234/*`. Acabas de escribir una política sin escribir JSON a mano.

8. **Fíjate en el validador.** Si el editor muestra avisos o sugerencias, léelos.
   *Por qué:* AWS valida tus políticas mientras las escribes y te avisa de errores y de permisos más amplios de lo que parecen. Es gratis y te ahorra sustos.

9. **Guárdala** con el nombre `fsaws-lectura-un-bucket` y las etiquetas `curso = fullstack-aws`, `modulo = 02`, `borrar = no`.
   *Deberías ver:* la política en la lista, con tipo **Customer managed** (*gestionada por el cliente*).
   *Ojo:* **no se la asignes a nadie**. Existe, pero no da permisos a ninguna identidad todavía. La usaremos en la lección 2.4.

### Parte 3 — Comprobar desde la terminal

10. **Lista tus propias políticas.** En CloudShell:

    ```bash
    aws iam list-policies --scope Local --query "Policies[].PolicyName"
    ```

    *Deberías ver:* solo `fsaws-lectura-un-bucket`. El filtro `--scope Local` pide las tuyas; sin él saldrían también las cientos que trae AWS.

## 💰 Costo y limpieza

- **Qué creaste:** una política gestionada por el cliente, sin asignar a nadie.
- **Qué se factura:** nada. Las políticas no tienen costo, ni siquiera cuando se usan.
- **Limpieza:** **no la borres** (`borrar = no`): la reutilizamos en la lección 2.4.
- **Nota de seguridad:** una política que no está asignada a ninguna identidad **no da ningún permiso**. Existe como plantilla. Esto es útil: puedes escribir y revisar permisos con calma antes de que tengan efecto sobre nadie.

## 💬 Ahora te toca a ti

**Pregunta:** Si tuvieras que escribir en una sola frase quién puede entrar a tu casa y a qué habitaciones, ¿qué datos necesitarías incluir sí o sí?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Quién (la persona), qué puede hacer (entrar, mirar, llevarse cosas), dónde exactamente (toda la casa, o solo el garaje) y, si aplica, cuándo o bajo qué condición. Una política IAM tiene exactamente esas piezas: la identidad a la que se la enganchas responde el "quién", y dentro del documento están `Action` (qué), `Resource` (dónde) y `Condition` (bajo qué circunstancias), más `Effect` para decir si es un permiso o una prohibición.

**Pregunta:** ¿Por qué crees que en una dirección postal el orden importa: país, ciudad, calle, número?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque va de lo general a lo específico, y así cada nivel acota al siguiente sin ambigüedad: hay muchas calles "Belgrano" en el mundo, pero solo una en esa ciudad de ese país. El ARN de AWS es la misma idea: `arn:aws:s3:::mi-bucket` va de la partición al servicio, la región, la cuenta y el recurso. Y como en una dirección, **los campos vacíos significan algo**: cuando ves `::`, es que ese dato no aplica — en IAM porque es global, en S3 porque los nombres de bucket son únicos en el mundo entero.

**Pregunta:** Si un permiso dice "puede abrir el archivador", ¿eso incluye leer las carpetas que hay dentro?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No necesariamente, y en AWS definitivamente no. El bucket (`arn:aws:s3:::mi-bucket`) y sus objetos (`arn:aws:s3:::mi-bucket/*`) son recursos distintos con permisos distintos: `s3:ListBucket` te deja ver qué hay, y `s3:GetObject` te deja abrirlo. Una política que solo menciona el bucket produce el clásico "veo los nombres de los archivos pero no puedo descargarlos". Cuando algo de S3 falle con "acceso denegado", lo primero que hay que mirar es si falta el `/*`.

## ⚠️ Errores comunes

- **Falta el `/*`.** Se da permiso al bucket y no a los objetos → se pueden listar los nombres pero no leer los archivos (o al revés). Casi siempre hacen falta los dos ARNs.
- **Escribir el ARN incompleto.** Por ejemplo `arn:aws:s3` a secas → AWS **rellena los campos que faltan con comodines**, así que ese ARN significa *todo S3, en todas las regiones y cuentas*. Un descuido de tres caracteres puede convertir un permiso mínimo en uno enorme.
- **Tratar `Version` como una fecha.** Se cambia por la de hoy y la política deja de ser válida → `2012-10-17` es la versión del idioma. Se copia y no se toca.
- **Poner `"Action": "s3:*"` "para que funcione".** Es la salida rápida cuando algo da error de permisos → funciona, y de paso te da borrar buckets enteros. Mejor leer el mensaje de error, que **dice exactamente qué acción faltó**.
- **Escribir mal las mayúsculas.** `effect` en vez de `Effect`, `resource` en vez de `Resource` → el JSON de IAM distingue mayúsculas y la política se rechaza al guardar.
- **Olvidar que negar gana.** Se añaden permisos y sigue sin funcionar → busca si hay una denegación explícita en alguna política de la identidad. Ninguna cantidad de `Allow` la vence.

## 🎯 Para llevarte

- Cuatro palabras: `Effect`, `Action`, `Resource`, `Condition`. Con eso lees casi cualquier política.
- Las acciones se escriben `servicio:Operación`; el prefijo te dice de qué servicio se habla.
- El ARN es una dirección postal de seis campos, y los campos vacíos (`::`) significan "no aplica".
- En S3, el bucket y sus objetos son recursos distintos: casi siempre necesitas los dos ARNs.
- Método de lectura rápida: ¿qué tan ancha es la acción? ¿y el recurso? ¿hay condiciones?

**En la próxima lección:** ya sabes leer permisos; ahora toca decidirlos. Vamos a ver la diferencia entre las políticas que trae AWS y las tuyas propias, y a aplicar el principio de menor privilegio: cómo pasar de "que funcione" a "que funcione y nada más".
