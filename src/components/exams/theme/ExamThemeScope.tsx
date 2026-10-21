import type { ReactNode } from "react";
import { Fredoka } from "next/font/google";
import type { ExamVisualTheme } from "@content/exams/types";
import { ExamThemeProvider } from "./exam-theme-context";

/**
 * La letra del tema `unicornio`: redonda y gruesa, fácil de leer a los 7 años.
 * `next/font` la descarga en el build y la sirve desde el propio sitio; solo se
 * aplica dentro de este contenedor.
 */
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Los adornos del fondo: dónde va cada uno, qué tan grande y cuánto tarda en flotar. */
const ADORNOS = [
  { emoji: "🦄", top: "12%", left: "4%", size: "3.5rem", duration: "7s" },
  { emoji: "🌈", top: "6%", left: "82%", size: "3rem", duration: "9s" },
  { emoji: "⭐", top: "38%", left: "92%", size: "1.75rem", duration: "6s" },
  { emoji: "💖", top: "62%", left: "3%", size: "2rem", duration: "8s" },
  { emoji: "☁️", top: "28%", left: "12%", size: "2.5rem", duration: "10s" },
  { emoji: "✨", top: "80%", left: "88%", size: "2rem", duration: "6.5s" },
  { emoji: "🦄", top: "86%", left: "70%", size: "2.75rem", duration: "8.5s" },
  { emoji: "🌟", top: "50%", left: "48%", size: "1.5rem", duration: "7.5s" },
];

interface ExamThemeScopeProps {
  theme: ExamVisualTheme | null;
  className?: string;
  children: ReactNode;
}

/**
 * El contenedor de una página de `/exams` que puede llevar tema visual.
 *
 * Sin tema es un `div` común con la `className` que se le pase, así que envolver
 * una página no le cambia nada a los exámenes que no tienen tema. Con tema:
 *
 *   - marca `data-exam-theme`, que es lo que mira `globals.css` para redefinir
 *     los colores y tamaños de Tailwind **solo acá adentro**;
 *   - aplica la letra del tema;
 *   - dibuja los adornos del fondo, decorativos y fuera del árbol accesible;
 *   - provee el tema por contexto, para los componentes que celebran.
 */
export function ExamThemeScope({ theme, className = "", children }: ExamThemeScopeProps) {
  if (!theme) {
    return (
      <ExamThemeProvider theme={null}>
        <div className={className}>{children}</div>
      </ExamThemeProvider>
    );
  }

  return (
    <ExamThemeProvider theme={theme}>
      <div data-exam-theme={theme} className={`${fredoka.className} relative ${className}`}>
        <div className="exam-theme-adornos" aria-hidden="true">
          {ADORNOS.map((adorno, index) => (
            <span
              key={index}
              style={{
                top: adorno.top,
                left: adorno.left,
                fontSize: adorno.size,
                animationDuration: adorno.duration,
              }}
            >
              {adorno.emoji}
            </span>
          ))}
        </div>
        {children}
      </div>
    </ExamThemeProvider>
  );
}
