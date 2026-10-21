"use client";

import { useState, type CSSProperties } from "react";

/**
 * Lo que pasó y hay que festejar (o consolar). `id` cambia en cada evento: es lo
 * que reinicia la animación aunque se acierten dos preguntas seguidas.
 */
export interface CelebrationEvent {
  id: number;
  kind: "correct" | "wrong" | "finish";
}

const FESTEJOS = [
  "Muito bem, Lucía! 🦄",
  "Arrasou! 🌈",
  "Isso mesmo! ⭐",
  "Que demais! 💖",
  "Você é incrível! ✨",
  "Mandou bem! 🦄",
];

const CONSUELOS = ["Quase! Leia a explicação 💜", "Tudo bem! Vamos ver por quê 💜"];

const FINAL = "Você terminou! Parabéns, Lucía! 🦄🌈";

const CHISPAS = ["🦄", "🌈", "⭐", "💖", "✨", "🌟", "💗", "🎀"];

/**
 * Un generador pseudoaleatorio con semilla (mulberry32).
 *
 * Las chispas se derivan del `id` del evento en vez de sortearse con
 * `Math.random()` dentro de un efecto: así el componente no necesita estado para
 * guardarlas, el render es puro, y la misma celebración se dibuja igual si React
 * la renderiza dos veces.
 */
function aleatorio(semilla: number): () => number {
  let a = semilla * 2654435761;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function chispasDe(evento: CelebrationEvent) {
  const azar = aleatorio(evento.id);
  const cantidad = evento.kind === "finish" ? 40 : 24;

  return Array.from({ length: cantidad }, (_, index) => ({
    emoji: CHISPAS[Math.floor(azar() * CHISPAS.length)],
    left: `${Math.round(azar() * 96)}%`,
    drift: `${Math.round((azar() - 0.5) * 160)}px`,
    rotate: `${Math.round((azar() - 0.5) * 720)}deg`,
    delay: `${(azar() * 0.5).toFixed(2)}s`,
    duration: `${(1.6 + azar() * 1.2).toFixed(2)}s`,
    size: `${(1.5 + azar() * 1.75).toFixed(2)}rem`,
    key: index,
  }));
}

/**
 * La lluvia de unicornios del tema `unicornio`.
 *
 * Al acertar suben unicornios, arcoíris, estrellas y corazones desde abajo y
 * aparece un cartel que festeja; al terminar el repaso, el doble de chispas. Al
 * equivocarse no hay chispas, solo un cartel tranquilo que invita a leer la
 * explicación: el error es el momento de aprender, no de sentirse mal.
 *
 * Con "reducir movimiento" activado en el sistema, `globals.css` oculta las
 * chispas y deja solo el cartel.
 *
 * Los textos están en portugués y fijos acá porque el tema existe para una sola
 * alumna, cuyas pruebas son en portugués.
 */
export function UnicornCelebration({ event }: { event: CelebrationEvent | null }) {
  // El último evento cuya animación ya terminó. Comparar ids, en vez de guardar
  // un "visible" que haya que reponer en un efecto, hace que cada evento nuevo se
  // muestre solo por tener otro id.
  const [terminado, setTerminado] = useState<number | null>(null);

  if (!event || terminado === event.id) return null;

  const mensaje =
    event.kind === "finish"
      ? FINAL
      : event.kind === "correct"
        ? FESTEJOS[event.id % FESTEJOS.length]
        : CONSUELOS[event.id % CONSUELOS.length];

  return (
    <div className="unicornio-celebracion" aria-live="polite" key={event.id}>
      {event.kind !== "wrong" &&
        chispasDe(event).map((chispa) => (
          <span
            key={chispa.key}
            className="unicornio-chispa"
            aria-hidden="true"
            style={
              {
                left: chispa.left,
                fontSize: chispa.size,
                animationDelay: chispa.delay,
                animationDuration: chispa.duration,
                "--deriva": chispa.drift,
                "--giro": chispa.rotate,
              } as CSSProperties
            }
          >
            {chispa.emoji}
          </span>
        ))}
      <p
        className={`unicornio-cartel ${
          event.kind === "wrong"
            ? "unicornio-cartel-suave"
            : event.kind === "finish"
              ? "unicornio-cartel-final"
              : ""
        }`}
        onAnimationEnd={() => setTerminado(event.id)}
      >
        {mensaje}
      </p>
    </div>
  );
}
