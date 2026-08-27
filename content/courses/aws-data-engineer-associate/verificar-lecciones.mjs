import fs from "node:fs";
import path from "node:path";

const dir = "content/courses/aws-data-engineer-associate/lecciones";
const WPM = 170;
let problemas = 0;
const fallo = (f, msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

for (const file of fs.readdirSync(dir).sort()) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  console.log(`\n${file}`);

  const words = raw
    .replace(/^#+\s*/gm, "")
    .replace(/[|>*_`-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  const minutes = words / WPM;
  const declared = Number(raw.match(/⏱️\s*(\d+)\s*min/)?.[1] ?? 0);
  const esComparativa = /★/.test(raw.split("\n")[0]);
  const [min, max] = esComparativa ? [900, 1600] : [1500, 2500];

  console.log(`  palabras ${words} | real ${minutes.toFixed(1)} min | declarado ${declared} min`);
  if (words < min || words > max) fallo(file, `fuera de rango ${min}-${max}`);
  if (Math.abs(declared - minutes) > 1.5) fallo(file, `tiempo declarado no coincide con el real`);

  // Preguntas idénticas palabra por palabra. Las lecciones ★ no las llevan: son
  // de consulta y se releen, así que el contrato les quita ambas secciones.
  if (esComparativa) {
    if (/## 🤔 Antes de empezar/.test(raw)) fallo(file, `una lección ★ no lleva "Antes de empezar"`);
  } else {
    const antes = raw.split("## 🤔 Antes de empezar")[1]?.split("\n## ")[0] ?? "";
    const qA = [...antes.matchAll(/^-\s+(.+(?:\n {2}.+)*)/gm)].map((m) => m[1].replace(/\s+/g, " ").trim());
    const post = raw.split("## 💬 Ahora te toca a ti")[1]?.split("\n## ")[0] ?? "";
    const qB = [...post.matchAll(/\*\*Pregunta:\*\*\s+([\s\S]*?)\n\n/g)].map((m) => m[1].replace(/\s+/g, " ").trim());
    if (qA.length < 2) fallo(file, `menos de 2 preguntas de activación`);
    if (qA.length !== qB.length) fallo(file, `${qA.length} preguntas antes vs ${qB.length} después`);
    qA.forEach((q, i) => {
      if (q !== qB[i]) fallo(file, `pregunta ${i + 1} no es idéntica:\n      A: ${q}\n      B: ${qB[i]}`);
    });
  }

  // reglas de tono y de fidelidad
  const cuerpo = raw.replace(/^#.*$/gm, "").replace(/^>.*$/gm, "");
  const prohibidas = /\b(es f[áa]cil|simplemente|obviamente|basta con|sencillamente)\b/gi;
  [...cuerpo.matchAll(prohibidas)].forEach((m) => fallo(file, `palabra prohibida: "${m[0]}"`));
  if (/[!¡]/.test(cuerpo)) fallo(file, `signo de exclamación en el cuerpo`);

  // referencias a archivos internos del repo
  [...raw.matchAll(/`?(COBERTURA\.md|CONTRATO-DE-CLASES\.md|manifest\.ts|README\.md)`?/g)].forEach((m) =>
    fallo(file, `referencia a archivo interno del repo: ${m[1]}`),
  );

  // emoji fuera de cabecera y de títulos de sección
  const lineas = raw.split("\n");
  const emoji = /\p{Extended_Pictographic}/u;
  lineas.forEach((l, i) => {
    if (l.startsWith("#") || l.startsWith(">")) return;
    if (emoji.test(l)) fallo(file, `emoji fuera de un título (línea ${i + 1}): ${l.trim().slice(0, 60)}`);
  });

  // cabecera con tiempo declarado
  if (!/^> Módulo \d+ · .+ · ⏱️ \d+ min de lectura$/m.test(raw)) fallo(file, `cabecera con formato inesperado`);
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
