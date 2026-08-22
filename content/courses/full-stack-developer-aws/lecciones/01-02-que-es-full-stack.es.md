# 1.2 — Qué significa "full stack" y qué vas a construir en este curso

> Módulo 1 · Lección 1.2 · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Cuando aprietas el botón "Hacer pedido" en una app de delivery, ¿qué crees que pasa entre ese clic y el cartel de "pedido confirmado"?
- Si una aplicación fuera un restaurante, ¿qué partes tendría y quién haría cada trabajo?
- ¿Qué crees que hace un "desarrollador full stack" en un día normal de trabajo?

## 📘 Cómo funciona

### El restaurante

Doña Rosa ya entendió que va a alquilar computadoras en vez de comprarlas. Ahora falta la otra mitad: **qué va adentro de esas computadoras**.

Piensa en un restaurante:

- El **salón** es lo que ve el cliente: las mesas, la carta, el cartel de "abierto". Es bonito, es donde se elige, y no hay ollas a la vista.
- La **cocina** es donde se hace el trabajo de verdad: se preparan los platos, se revisa que haya ingredientes, se decide que sin pan no se puede hacer el sándwich.
- La **despensa** guarda lo que no se puede perder: los ingredientes, las cuentas del día, la libreta de clientes.
- El **mozo** lleva los pedidos del salón a la cocina y trae los platos de vuelta. Es el único que cruza esa puerta.
- El **local**: la luz, el gas, la llave de la puerta, el alquiler. Nadie lo nota hasta que falta.

Una aplicación web tiene exactamente esas cinco partes, con otros nombres:

| En el restaurante | En una aplicación | Qué es |
|---|---|---|
| Salón | **Frontend** | Lo que el usuario ve y toca. Corre en su celular o navegador. |
| Cocina | **Backend** | Donde se decide y se procesa. Corre en un servidor. |
| Despensa | **Base de datos** | Donde se guarda lo que no se puede perder. |
| Mozo | **API** | El camino por el que el frontend le pide cosas al backend. |
| Local, luz y llaves | **Infraestructura** | Los servidores, las redes, los permisos. Aquí entra AWS. |

### Las cinco piezas, una por una

**Frontend** ("la parte de adelante"). Es el código que se ejecuta **en el dispositivo del usuario**: los botones, los colores, el formulario. Se hace con HTML, CSS y JavaScript. Cuando el frontend crece, se usa una herramienta para organizarlo: en este curso será **React**. Regla para recordarlo: si puedes verlo con los ojos, es frontend.

**Backend** ("la parte de atrás"). Es el código que se ejecuta **en un servidor**, lejos del usuario, y que él nunca ve. Ahí viven las decisiones y las reglas: ¿este usuario puede ver este pedido?, ¿quedan medialunas?, ¿el precio total está bien calculado? Se escribe en muchos lenguajes; nosotros usaremos **JavaScript/TypeScript con Node.js**, para que sea el mismo idioma del frontend.

Hay un motivo de peso para que las reglas vivan en la cocina y no en el salón: **el usuario puede modificar todo lo que corre en su navegador**. Si el precio se calcula en el frontend, alguien puede cambiar el 20 por un 2 y pagar diez veces menos. La comida se cocina en la cocina.

**Base de datos.** Es la libreta que no se pierde. Si guardas los pedidos "en la memoria" del servidor, al reiniciarse desaparecen; una base de datos los guarda en disco y los devuelve ordenados cuando se los pides. Vas a conocer dos familias: las de tablas y filas (**SQL**, módulo 8) y las que guardan fichas sueltas (**NoSQL**, módulo 7).

**API.** Es la ventanilla por la que el frontend pide cosas. Nombre completo: *interfaz de programación de aplicaciones*, pero funciona como el mozo: el salón no entra a la cocina a servirse, hace un pedido con un formato acordado y recibe una respuesta. Ese "formato acordado" es justamente lo que hace que un mismo backend pueda atender a una página web, a una app de celular y a un cajero automático.

**Infraestructura.** Las computadoras donde corre todo, la red que las conecta, las llaves de quién puede entrar y el proceso de subir tu código. Todo eso es AWS, y es lo que separa "lo hice en mi computadora" de "está en internet y funciona a las 3 de la mañana".

### Entonces, ¿qué es "full stack"?

**Stack** significa "pila": la lista de piezas apiladas que usa un proyecto. **Full stack** es poder moverte por todas esas capas — del botón hasta la base de datos, y del código hasta el servidor donde vive.

Y ahora la parte honesta, porque hay mucho humo con esta palabra:

- **No significa saber todo de todo.** Nadie sabe todo. Significa entender cómo encajan las piezas y ser capaz de construir una aplicación completa, aunque cada pieza la hagas a nivel "suficiente" y no a nivel experto.
- **No significa hacer el trabajo de tres personas por un sueldo.** En equipos grandes hay especialistas de frontend, de backend y de infraestructura. El full stack es valiosísimo en equipos chicos, y en los grandes es el que conecta y traduce entre especialistas.
- **Sí significa poder terminar algo solo.** Y eso, para tu primer trabajo o tu primer cliente, vale oro: puedes entregar una aplicación funcionando, no un pedazo que depende de que alguien más haga el resto.

### El viaje de un pedido

Este es el recorrido completo cuando un cliente de Doña Rosa aprieta "Hacer pedido". Es literalmente lo que vas a construir en los próximos 16 módulos:

```
1. El cliente aprieta el botón          → frontend  (React)
2. El navegador envía el pedido         → API       (API Gateway)
3. Se revisa quién es el cliente        → login     (Cognito)
4. Se aplican las reglas del negocio    → backend   (Lambda)
5. Se guarda el pedido                  → datos     (DynamoDB)
6. Vuelve la respuesta "pedido #124 ok" → API
7. La pantalla muestra la confirmación  → frontend
   (y en paralelo, sin hacer esperar al cliente:
    se le manda un email de confirmación → cola     (SQS + Lambda))
```

Ese viaje completo, de punta a punta, tarda menos de un segundo. Y cada flecha de ese dibujo es un módulo de este curso.

### El mapa del curso

Los 17 módulos son cinco etapas:

| Etapa | Módulos | Qué logras |
|---|---|---|
| **Cimientos** | 1-2 | Cuenta de AWS segura, con alarmas de gasto, y entender permisos. |
| **Saber programar** | 3-4 | La web, JavaScript, TypeScript y React. Todo en tu máquina, gratis. |
| **Poner algo en internet** | 5-7 | Tu sitio publicado con HTTPS, una API serverless y una base de datos. |
| **Hacerlo profesional** | 8-11 | SQL, redes privadas, login de verdad y manejo de archivos. |
| **Trabajar como equipo** | 12-17 | Contenedores, infraestructura como código, despliegue automático, monitoreo y el proyecto final. |

Fíjate en algo: **recién en el módulo 5 publicas algo en internet**. No es demora, es orden. Publicar sin saber quién puede entrar a tu cuenta y sin una alarma de gasto es la forma más rápida de llevarte un susto.

**En resumen:** una aplicación web tiene frontend (lo que se ve), backend (donde se decide), base de datos (donde se guarda), una API que los comunica e infraestructura donde todo vive. Full stack no es saber todo: es poder recorrer esas capas y terminar una aplicación completa por tu cuenta.

## 🛠️ Manos a la obra

> 📋 Para esta práctica **no necesitas cuenta de AWS ni instalar nada**. Solo tu navegador (Chrome, Edge o Firefox).
> 💚 Costo de esta práctica: **$0**. No se crea ningún recurso.

Vas a ver las piezas de arriba funcionando en un sitio real, en vivo. Todas las páginas del mundo se pueden abrir "por dentro" con las herramientas que ya trae tu navegador.

1. **Mira un backend desnudo.** Abre una pestaña nueva y entra a `https://api.github.com/users/octocat`.
   *Deberías ver:* un montón de texto entre llaves, con cosas como `"login": "octocat"`. Eso es **JSON**: la forma en que un backend contesta cuando nadie le pidió que se vea bonito. No está roto: es una cocina sin salón.

2. **Ahora mira el salón.** Entra a `https://github.com/octocat`.
   *Deberías ver:* la misma información (nombre, foto, seguidores) pero con colores, tipografía y botones. Mismos datos, con frontend encima.

3. **Abre las herramientas de desarrollo.** Con esa página abierta, presiona **F12** (o clic derecho → *Inspeccionar*) y ve a la pestaña **Network** (*Red*).
   *Deberías ver:* una tabla vacía con columnas como Name, Status, Type y Size.

4. **Recarga la página con las herramientas abiertas.** Presiona F5.
   *Deberías ver:* decenas de líneas apareciendo de golpe. Cada línea es **un pedido que tu navegador le hizo a un servidor**: el HTML, los estilos, las imágenes, las fuentes. Una sola página son muchísimos viajes de ida y vuelta.

5. **Mira el primer pedido de todos.** Haz clic en la primera línea de la lista y abre la pestaña **Headers** (*cabeceras*).
   *Deberías ver:* `Request Method: GET` y `Status Code: 200`. `GET` significa "dame esto" y `200` significa "aquí lo tienes, todo bien". Los vas a ver mil veces en este curso.

6. **Filtra solo las llamadas a la API.** Arriba de la lista, haz clic en el filtro **Fetch/XHR** y navega un poco por la página (abre una pestaña del perfil, por ejemplo).
   *Deberías ver:* pedidos nuevos apareciendo mientras usas la página, sin que la pantalla se recargue entera. Eso es el frontend pidiéndole datos al backend por la API, exactamente el paso 2 del "viaje de un pedido".

7. **Espía una respuesta.** Elige uno de esos pedidos y abre la pestaña **Response** (*respuesta*) o **Preview**.
   *Deberías ver:* más JSON, como el del paso 1. Acabas de ver el mozo entrando a la cocina y saliendo con el plato.

8. **Anota el número.** Arriba o abajo del panel dice cuántos pedidos (*requests*) hizo la página. Anótalo.
   *Por qué:* cuando en el módulo 5 publiques tu sitio, ese número va a ser tu factura. Cada pedido cuesta una fracción minúscula de centavo — pero multiplicada por cada visitante.

## 💰 Costo y limpieza

- **Qué creaste:** nada. Miraste páginas públicas con herramientas que ya vienen en tu navegador.
- **Qué se factura:** nada. No hay cuenta de AWS todavía; la creamos en la lección 1.4.
- **Limpieza:** cierra las herramientas de desarrollo con F12 y listo.
- **Lo que sí conviene guardar:** el número de pedidos del paso 8 y los dos precios que anotaste en la lección 1.1. Los reutilizamos en el ejercicio guiado 1.11.

## 💬 Ahora te toca a ti

**Pregunta:** Cuando aprietas el botón "Hacer pedido" en una app de delivery, ¿qué crees que pasa entre ese clic y el cartel de "pedido confirmado"?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El frontend arma un mensaje con lo que elegiste y se lo manda al backend a través de la API. El backend revisa quién eres, aplica las reglas (que el producto exista, que el total esté bien, que el local esté abierto), guarda el pedido en la base de datos y devuelve una respuesta. El frontend recibe esa respuesta y recién ahí pinta el cartel de "confirmado". Todo eso, en menos de un segundo. Y si el mensaje nunca llega o el backend contesta un error, el frontend tiene que mostrarlo con claridad en vez de quedarse girando para siempre — eso lo trabajamos en la lección 4.7.

**Pregunta:** Si una aplicación fuera un restaurante, ¿qué partes tendría y quién haría cada trabajo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El salón es el frontend (lo que el cliente ve y toca), la cocina es el backend (donde se decide y se procesa), la despensa es la base de datos (donde se guarda lo que no se puede perder), el mozo es la API (el único camino entre salón y cocina) y el local con su luz y sus llaves es la infraestructura (AWS). La regla más importante de esa analogía: el cliente no entra a la cocina. Las reglas del negocio y los cálculos de dinero van en el backend, porque el frontend corre en el dispositivo del usuario y el usuario puede modificarlo.

**Pregunta:** ¿Qué crees que hace un "desarrollador full stack" en un día normal de trabajo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Se mueve entre capas según lo que haya que resolver: por la mañana arma una pantalla en React, después agrega el endpoint que esa pantalla necesita, ajusta cómo se guardan los datos y, si algo falla en producción, entra a mirar los logs del servidor. Lo que **no** hace es saber todo de todo: sabe lo suficiente de cada capa para terminar la funcionalidad completa, y sabe pedir ayuda o profundizar cuando un problema es de especialista. Su valor real es que puede entregar algo que funciona de punta a punta.

## ⚠️ Errores comunes

- **"Full stack es saber todo".** Se toma la palabra literal y aparece la parálisis de "nunca voy a estar listo" → full stack es poder recorrer las capas y terminar algo completo, con nivel suficiente en cada una. La profundidad llega con los años y siempre en algunas capas más que en otras.
- **Poner las reglas importantes en el frontend.** "Valido el precio en el navegador y listo" → el usuario controla su navegador y puede cambiar cualquier valor. Todo lo que importa (precios, permisos, límites) se valida otra vez en el backend, siempre.
- **Confundir el backend con la base de datos.** Se dice "guardo la lógica en la base" → el backend decide y la base guarda. Mezclarlos hace que después no sepas dónde buscar un error.
- **Ver JSON crudo y pensar que la página está rota.** El navegador muestra texto entre llaves y parece un error → es la respuesta normal de una API. Un backend no tiene por qué verse bonito: para eso está el frontend.

## 🎯 Para llevarte

- Cinco piezas, siempre las mismas: frontend, backend, base de datos, API e infraestructura.
- Si puedes verlo con los ojos, es frontend. Si decide algo importante, tiene que estar en el backend.
- La API es el único camino entre las dos: por eso un mismo backend sirve para la web y para una app de celular.
- Full stack no es saber todo; es poder terminar una aplicación completa por tu cuenta.
- El curso construye exactamente el "viaje de un pedido": cada flecha de ese diagrama es un módulo.

**En la próxima lección:** antes de crear la cuenta, vamos a lo que más miedo da y menos se explica: cómo cobra AWS exactamente, qué es gratis de verdad, qué es gratis solo 12 meses y dónde están las trampas de la letra chica.
