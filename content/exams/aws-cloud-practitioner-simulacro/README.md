# AWS Cloud Practitioner: simulacro de examen

Las 65 preguntas del simulacro final, en formato CLF-C02.

## Este banco es independiente del curso

Las preguntas **nacieron** como copia de
`content/courses/aws-cloud-practitioner/preguntas/simulacro/`, pero ese banco
quedó **congelado**: las correcciones se hacen acá y no se llevan allá. Son dos
bancos separados que arrancaron idénticos y **ya divergieron**.

Quien edite el del curso debe saber que no está editando éste, y viceversa.

| | Lección `34-simulacro-de-examen` | Este examen |
|---|---|---|
| Duración | 90 min, fijos | La elige el alumno (90 sugeridos) |
| Nota | Escala 100–1000, 700 para aprobar | Porcentaje de aciertos, 70 % para aprobar |
| Modo estudio | No | Sí |
| Marcas para repasar | Mueren con el intento | Sobreviven, en `exam_review_flags` |
| Historial de fallos | No | Sí, por pregunta y entre intentos |
| Tabla por dominio | Con el peso oficial de AWS | Con la parte que ocupa cada tema acá |

Las dos notas miden lo mismo: 700/1000 y 70 % están ancladas a la misma fracción
de aciertos, así que nadie aprueba en una pantalla y desaprueba en la otra con las
mismas respuestas.

## Parámetros

| Parámetro | Valor |
|---|---|
| Preguntas | 65 |
| Temas | 4 (los dominios del CLF-C02) |
| Reparto | 16 / 19 / 22 / 8 → 24,6 / 29,2 / 33,8 / 12,3 % |
| Pesos oficiales de AWS | 24 / 30 / 34 / 12 % |
| Respuesta múltiple | 10 de 65 |
| Dificultad | Mixta |
| Duración sugerida | 90 min |
| Para aprobar | 70 % |
| Versión del banco | 2 |

Los ids (`sim-dN-qNN`) se conservaron a propósito pese al cambio de nombre de los
archivos: una rendida guardada los referencia, así que renombrarlos rompería el
historial de fallos y las marcas de repaso.

## Correcciones

### v2 — revisión de contenido de las 65 preguntas

Se leyeron las 65 preguntas comprobando que la opción marcada como correcta lo
fuera y que las explicaciones no afirmaran nada falso. **Ninguna respuesta
correcta cambió.** Se corrigieron dos explicaciones:

- **`sim-d2-q19`, opción B (Trusted Advisor).** Decía que recomienda mejoras en
  "cinco categorías". AWS agregó **excelencia operativa** a las cinco clásicas
  (costos, rendimiento, seguridad, tolerancia a fallos y cuotas de servicio), así
  que el número había quedado viejo. Ahora se enumeran sin comprometer una cifra.
- **`sim-d3-q21`, opción A (SNS).** Decía que si un suscriptor está caído "no hay
  una cola que retenga el mensaje". Es impreciso: SNS reintenta y admite una cola
  de mensajes fallidos. Lo que de verdad lo separa de SQS es que nadie va a buscar
  el mensaje a su propio ritmo, y eso es lo que dice ahora.

Las dos estaban en explicaciones de opciones **incorrectas**, así que ningún
alumno pudo haber sido calificado mal por ellas.

## Verificación

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/aws-cloud-practitioner-simulacro/verificar-preguntas.mjs
```

Última corrida: 65 preguntas (16/19/22/8), 10 de respuesta múltiple, reparto de la
correcta **A:15 B:14 C:13 D:13**, y la correcta es la más larga en 19 de 55 de
opción única (tope: 60 %).

## Lo que NO está verificado

- **Solo existe en español.** El banco del curso tampoco tiene traducciones, y se
  harán de una vez para los dos. Mientras tanto, con la interfaz en inglés o
  portugués las preguntas salen en español y la pantalla todavía no lo avisa.
- El título y la descripción de la ficha son nuevos, escritos para esta sección, y
  tampoco están traducidos.
- La revisión de contenido la hizo una lectura, no una fuente oficial contrastada
  pregunta por pregunta contra la documentación de AWS. Lo que se comprobó es que
  nada contradiga el temario del CLF-C02; no que cada cifra siga vigente el día que
  leas esto, porque AWS cambia límites y categorías sin avisar.
