# Cursora

Plataforma de cursos online (inglés, portugués, programación y más), construida con Next.js.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — internacionalización (español, inglés, portugués de Brasil)
- **lucide-react** — iconos

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — te redirige automáticamente a tu idioma detectado.

## Autenticación (datos en duro, temporal)

El login valida contra dos usuarios hardcodeados en `src/lib/users.ts`, simulando los endpoints
que más adelante se conectarán a una base de datos real:

| Rol   | Correo               | Contraseña  |
| ----- | --------------------- | ----------- |
| user  | `user@cursora.com`    | `User123!`  |
| admin | `admin@cursora.com`   | `Admin123!` |

El formulario de login (`/login`) ya viene precargado con la cuenta `user`, y tiene botones para
rellenar cualquiera de las dos cuentas con un clic.

## Estructura del proyecto

```
src/
  app/[locale]/        # Rutas de la app (home, login, register) con prefijo de idioma
  app/api/auth/        # Endpoints de login/logout (mock, listos para migrar a DB)
  components/          # UI reutilizable (auth, cursos, i18n, layout)
  i18n/                # Configuración de next-intl (idiomas, navegación)
  lib/                 # Datos mock (usuarios, cursos) y helpers de sesión
messages/               # Traducciones (es.json, en.json, pt-BR.json)
```

## Idiomas

Agregar o quitar un idioma solo requiere tocar `src/i18n/routing.ts` (lista de locales) y crear/quitar
el archivo `messages/<locale>.json` correspondiente.
