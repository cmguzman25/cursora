# 0.6 — Git en un proyecto de Unity: qué se guarda y qué no

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 6 de 8 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a poner tu proyecto bajo control de versiones, con la configuración que
Unity necesita.

Al terminar tendrás un repositorio con el primer commit y sin las carpetas
generadas. Unity quedará ajustado para que dos cambios en la misma escena no se
conviertan en un problema sin solución.

## 🧠 Antes de empezar

1. En la clase 0.3 viste que la sesión de Claude Code olvida todo al cerrarse.
   ¿Qué te permitiría volver atrás si una sesión estropea algo?
2. Unity genera una carpeta `Library` que puede pesar varios gigas y se
   reconstruye sola. ¿La guardarías en el repositorio?
3. Si dos personas editan la misma escena y la escena es un archivo binario,
   ¿crees que se pueden juntar los dos cambios?

## 📐 La idea

Un proyecto de Unity tiene tres clases de archivos, y cada una se trata
distinto.

Los **tuyos** son los que escribes o importas: scripts, escenas, materiales,
modelos. Van al repositorio, sin discusión.

Los **generados** los fabrica Unity a partir de los tuyos: `Library`, `Temp`,
`obj`, `Build`. No van nunca. Pesan mucho, cambian cada vez que abres el editor
y se reconstruyen solos.

Los **`.meta`** son el caso raro y el que más disgustos da. Por cada archivo o
carpeta dentro de `Assets`, Unity crea un `.meta` invisible con un
identificador único. Ese identificador es lo que usan las escenas y los prefabs
para saber a qué archivo se refieren.

Mira lo que pasa si no los guardas. Descargas el proyecto en otro ordenador y
Unity genera identificadores nuevos. Todas las referencias apuntan a la nada.
Materiales en rosa, scripts desconectados, prefabs vacíos.

Los `.meta` van al repositorio, siempre. Es el error más caro de esta clase y el
que menos se ve venir. En tu ordenador nunca da la cara. Aparece el día que
clonas el proyecto en otro sitio, o el día que te ayuda alguien.

Por eso la comprobación de más abajo insiste tanto en ellos. Es el único fallo
de hoy que no notarías hasta dentro de meses.

Queda un detalle: Unity puede guardar escenas y prefabs en binario o en texto.
En binario, cualquier cambio simultáneo es irresoluble. En texto, al menos se
puede leer y arreglar a mano. Hoy lo dejamos en texto.

## 🛠️ Manos a la obra

**1.** Abre Unity y ve a `Edit` → `Project Settings` → `Editor`.

**2.** En `Version Control`, pon `Mode` en `Visible Meta Files`. En `Asset
Serialization`, pon `Mode` en `Force Text`. Cierra los ajustes y guarda el
proyecto con `Ctrl + S`.

**3.** Cierra Unity. Abre una terminal en la carpeta del proyecto, la que
contiene `Assets`.

**4.** Crea el archivo de exclusiones:

`.gitignore`

```text
[Ll]ibrary/
[Tt]emp/
[Oo]bj/
[Bb]uild/
[Bb]uilds/
[Ll]ogs/
[Uu]serSettings/
.vs/
.vscode/
*.csproj
*.sln
*.unityproj
*.pidb
*.booproj
sysinfo.txt
*.apk
*.unitypackage
crashlytics-build.properties
```

**5.** Los modelos, texturas y sonidos son archivos binarios grandes. Git los
guarda enteros en cada cambio, y el repositorio crece sin freno. Git LFS los
guarda aparte:

`.gitattributes`

```text
*.fbx filter=lfs diff=lfs merge=lfs -text
*.blend filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text
*.mp3 filter=lfs diff=lfs merge=lfs -text
```

**6.** Arranca el repositorio y guarda el primer commit:

`Terminal`

```bash
git init
git lfs install
git add .
git commit -m "Proyecto inicial de Unity"
```

## 🤖 Pídelo a Claude Code

```text
Revisa el archivo .gitignore de este proyecto de Unity 6.3. Dime si falta
alguna carpeta generada por el editor, y si alguna de las reglas actuales
excluiría por error archivos .meta, que sí quiero versionar. No lo modifiques
todavía: explícame primero qué cambiarías.
```

Revisa dos cosas de su respuesta. Que confirma que ningún patrón afecta a los
`.meta`, porque ese es el error caro. Y que no propone excluir `ProjectSettings`
ni `Packages`, que sí van al repositorio.

Lo que no se delega: ejecutar el `git add` y el commit. Conviene que mires con
`git status` qué vas a guardar antes de guardarlo.

## ▶️ Compruébalo

`Terminal`

```bash
git status
```

Debe decir que no hay nada pendiente. Si aparecen miles de archivos sin
guardar, el `.gitignore` no se está aplicando.

Ahora la comprobación importante. Ejecuta esto:

`Terminal`

```bash
git ls-files "*.meta"
```

Tiene que salir una lista larga de archivos `.meta`. Si no sale ninguno, los
identificadores de tus assets se están quedando fuera del repositorio.

Por último, mira el tamaño de la carpeta `.git`. Debe ser de pocos megas. Si ya
pesa un giga, `Library` entró en el commit.

## 🧯 Si algo se rompe

**El primer commit tiene miles de archivos.**
Causa: creaste el `.gitignore` después de hacer `git add`.
Arreglo: ejecuta `git rm -r --cached .` y vuelve a hacer `git add .` y el
commit.

**Al clonar el proyecto, los materiales se ven en rosa.**
Causa: los `.meta` no están versionados y las referencias se perdieron.
Arreglo: comprueba que `Visible Meta Files` está activo y que el `.gitignore` no
excluye `*.meta`.

**Git avisa de finales de línea al hacer commit.**
Causa: Windows y Unity usan convenciones distintas.
Arreglo: es un aviso, no un error. Puedes seguir sin hacer nada.

**`git lfs` no se reconoce.**
Causa: Git LFS no viene activado en algunas instalaciones.
Arreglo: instálalo desde `git-lfs.com` y repite el paso 6.

## 🔁 Repaso relámpago

1. ¿Por qué los archivos `.meta` tienen que ir al repositorio?
2. ¿Qué tres carpetas generadas nunca se versionan?
3. ¿Para qué sirve poner la serialización en `Force Text`?
4. ¿Qué haces si el primer commit se llevó `Library` por delante?

**Respuestas:** 1. Guardan el identificador que usan escenas y prefabs para
encontrar cada archivo. 2. `Library`, `Temp` y `obj`, entre otras; todas se
reconstruyen solas. 3. Para que escenas y prefabs se guarden en texto legible en
lugar de en binario. 4. Ejecutar `git rm -r --cached .` y rehacer el `add` y el
commit con el `.gitignore` ya puesto.

## 🎒 Tu turno

Haz una prueba de que esto sirve para algo.

Abre un script cualquiera, bórrale unas líneas y guarda. Comprueba el estropicio
con `git diff`. Después deshazlo con `git checkout -- .` y mira que el archivo
volvió a estar entero.

Toma la costumbre de hacer un commit al terminar cada clase, con un mensaje que
diga qué añadiste. Dentro de dos meses, cuando algo deje de funcionar, ese
historial te dirá exactamente cuándo se rompió.
