# 0.2 — Instala Unity, Blender, Git y Claude Code

> Módulo 0 · Preparación y cómo trabajar con Claude Code · Clase 2 de 8 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a dejar montado el entorno completo y a crear el proyecto vacío del juego.

Al terminar, Unity abrirá tu proyecto y Blender arrancará. Git estará vigilando
la carpeta. Y Claude Code responderá desde la terminal, dentro del proyecto.

## 🧠 Antes de empezar

1. Un proyecto de Unity abierto con una versión distinta a la que se creó puede
   romperse. ¿Por qué crees que el motor no se limita a adaptarse?
2. ¿Qué diferencia esperas entre una versión "LTS" y la última publicada?
3. Cuando instalas un programa que luego usarás desde la terminal, ¿qué tiene
   que pasar para que el sistema encuentre el comando?

## 📐 La idea

Todo el curso usa versiones fijas. No es manía. Es lo único que mantiene las
rutas de menú donde dice la clase, durante los meses que dura el curso.

**LTS** significa soporte a largo plazo. Es la versión que recibe correcciones
durante años y deja de cambiar de aspecto. La última versión publicada trae
novedades, y también cambios de interfaz que dejarían estas clases obsoletas en
un mes.

Unity no se instala suelto. Se instala desde **Unity Hub**, un programa que
gestiona las versiones del editor y la lista de proyectos. Puedes tener varias
versiones a la vez, y cada proyecto recuerda con cuál nació.

Reserva unos 30 GB de disco para el editor, el proyecto y sus carpetas
generadas. Y elige bien dónde vive el proyecto. Moverlo a mitad del curso
obliga a rehacer rutas. Las carpetas sincronizadas con la nube tampoco sirven,
porque Unity escribe archivos sin parar y el sincronizador se atraganta.

Un proyecto de Unity es una carpeta con tres partes que importan y una que no:

| Carpeta | Qué guarda | ¿Es tuya? |
|---|---|---|
| `Assets` | Todo lo que haces: escenas, scripts, modelos | Sí |
| `ProjectSettings` | La configuración del proyecto | Sí |
| `Packages` | Qué paquetes usa el proyecto | Sí |
| `Library` | Versiones procesadas de tus assets | No, se regenera |

`Library` puede pesar varios gigas y Unity la reconstruye sola. Recuérdalo,
porque en la clase 0.6 decidirás qué va a Git y qué se queda fuera.

## 🛠️ Manos a la obra

**1. Unity.** Descarga Unity Hub desde `unity.com/download` e instálalo. Crea
una cuenta de Unity si no la tienes y acepta la licencia personal, que es
gratuita.

**2.** Dentro del Hub, ve a `Installs` → `Install Editor` y elige **Unity 6.3
LTS**. En la lista de módulos marca el soporte de compilación de tu sistema.
Son varios gigas, así que déjalo descargando mientras sigues.

**3. Blender.** Descarga **Blender 5.2 LTS** desde `blender.org/download` e
instálalo con las opciones por defecto.

**4. Git.** Instala Git desde `git-scm.com`. En Windows, el instalador trae
también Git Bash, que Claude Code aprovecha para ejecutar comandos.

**5. Visual Studio Code.** Instálalo desde `code.visualstudio.com`. En su panel
de extensiones busca `Unity`, la publicada por Microsoft, e instálala. Esa
arrastra sola las demás que hacen falta para escribir C#.

**6. Claude Code.** Ábrelo desde una terminal. En Windows, con PowerShell:

`PowerShell`

```powershell
irm https://claude.ai/install.ps1 | iex
```

En macOS o Linux, desde la terminal:

`Terminal`

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Claude Code necesita una cuenta de pago de Claude: Pro, Max, Team o Enterprise.
El plan gratuito no lo incluye.

**7. El proyecto.** Vuelve al Hub, `Projects` → `New project`, plantilla **3D
(Built-in Render Pipeline)**. Ponle el nombre que elegiste en la clase anterior
y guárdalo en una ruta sin espacios ni acentos.

**8.** Con el proyecto abierto, dile a Unity qué editor de código usar. Ve a
`Edit` → `Preferences` → `External Tools` y elige `Visual Studio Code` en
`External Script Editor`. Sin esto, al abrir un script se te lanzará otro
programa.

**9.** Cierra el editor de Unity. Abre una terminal en la carpeta del proyecto
y arranca Claude Code:

`Terminal, dentro de la carpeta del proyecto`

```bash
claude
```

La primera vez te pedirá iniciar sesión en el navegador.

## 🤖 Pídelo a Claude Code

Tu primer encargo es de reconocimiento, no de código:

```text
Estoy en la carpeta raíz de un proyecto de Unity 6.3 recién creado. Lista las
carpetas y archivos que ha generado Unity, di para qué sirve cada uno y cuáles
se regeneran solos si los borro. No modifiques nada.
```

Al leer la respuesta, comprueba tres cosas. Que menciona `Library` entre las
que se regeneran. Que no se ha inventado carpetas que no están en tu disco. Y
que no ha tocado ningún archivo, porque le dijiste que no lo hiciera.

Lo que no se delega: la instalación. Un instalador que no has ejecutado tú es
un instalador que no sabes arreglar cuando falle.

## ▶️ Compruébalo

En la terminal, dentro de la carpeta del proyecto:

`Terminal`

```bash
git --version
claude --version
```

El primero responde con un número de versión. El segundo responde algo como
`2.1.211 (Claude Code)`.

En Unity, al abrir el proyecto ves la escena `SampleScene` con una cámara y una
luz en la jerarquía. Arriba del todo, el título de la ventana muestra la
versión `6000.3`.

En Blender, al arrancar ves el cubo, la cámara y la luz de la escena inicial.

Una última comprobación que ahorra disgustos. En Unity, haz doble clic sobre
cualquier script de la carpeta `Assets`. Debe abrirse Visual Studio Code, y el
código debe salir coloreado. Si sale en blanco y negro, la extensión de C#
todavía está instalándose; espera un minuto y vuelve a probar.

## 🧯 Si algo se rompe

**`claude` no se reconoce como comando.**
Causa: la terminal se abrió antes de instalarlo y no ve la ruta nueva.
Arreglo: cierra la terminal y abre otra. Si sigue, ejecuta `claude doctor` desde
la carpeta de instalación para ver el diagnóstico.

**Unity Hub no deja crear el proyecto.**
Causa: falta activar la licencia personal.
Arreglo: en el Hub, entra en los ajustes de licencias y añade una licencia
personal gratuita.

**El proyecto tarda muchísimo en abrir la primera vez.**
Causa: Unity está generando `Library` desde cero.
Arreglo: ninguno, es normal. Las siguientes aperturas son rápidas.

**Unity abre con una interfaz distinta a la de las clases.**
Causa: instalaste otra versión del editor.
Arreglo: en el Hub, pestaña `Installs`, comprueba que tienes la rama `6000.3`.

**Claude Code dice que tu cuenta no tiene acceso.**
Causa: estás en el plan gratuito de Claude, que no lo incluye.
Arreglo: hace falta un plan de pago. Si prefieres no contratarlo, el curso se
puede seguir igual. Escribirás a mano el código de cada clase y te saltarás la
sección de Claude Code. Todo lo demás funciona sin cambios.

## 🔁 Repaso relámpago

1. ¿Por qué el curso fija la versión del editor en lugar de usar la más nueva?
2. ¿Cuál de las carpetas del proyecto se regenera sola si la borras?
3. ¿Qué gestiona Unity Hub que no gestiona el editor?
4. ¿Qué comando te dice si Claude Code quedó bien instalado?

**Respuestas:** 1. Para que las rutas de menú sigan coincidiendo con lo que dicen
las clases. 2. `Library`, que puede pesar varios gigas y Unity reconstruye
sola. 3. Las versiones instaladas del editor y la lista de proyectos. 4. El
comando `claude --version`, que responde con un número de versión.

## 🎒 Tu turno

Crea una escena nueva y llámala `Partida`.

En Unity: `File` → `New Scene`, elige la plantilla básica y guárdala con
`Ctrl + S` dentro de `Assets/Scenes`. Esa va a ser la escena del juego durante
todo el curso, y `SampleScene` no volverá a aparecer.

Si te sobra tiempo, abre Blender y borra el cubo. Vas a hacerlo muchas veces.
