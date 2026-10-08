import { intercalarPorTema } from "../../intercalar";
import { TEMA_1_STREAMING as EN_1 } from "./en/tema-1-streaming-kinesis-msk";
import { TEMA_2_FIREHOSE as EN_2 } from "./en/tema-2-firehose-delivery";
import { TEMA_3_BATCH as EN_3 } from "./en/tema-3-batch-database";
import { TEMA_4_ORQUESTACION as EN_4 } from "./en/tema-4-orchestration-event-driven";
import { TEMA_5_CAUDAL as EN_5 } from "./en/tema-5-throughput-replayability";
import { TEMA_1_STREAMING as ES_1 } from "./es/tema-1-streaming-kinesis-msk";
import { TEMA_2_FIREHOSE as ES_2 } from "./es/tema-2-firehose-delivery";
import { TEMA_3_BATCH as ES_3 } from "./es/tema-3-batch-database";
import { TEMA_4_ORQUESTACION as ES_4 } from "./es/tema-4-orchestration-event-driven";
import { TEMA_5_CAUDAL as ES_5 } from "./es/tema-5-throughput-replayability";

/**
 * Las 65 preguntas del examen en los dos idiomas, intercaladas por tema.
 *
 * El inglés es el original, escrito con la redacción del DEA-C01 real; el español es
 * su traducción. Los dos se intercalan con la **misma** función y en el **mismo**
 * orden de temas, que es lo que mantiene las dos listas alineadas posición por
 * posición. No es un detalle estético: la app califica siempre en el idioma por
 * defecto mientras el alumno puede estar leyendo el otro, así que dos órdenes
 * distintos calificarían la pregunta equivocada y en silencio.
 *
 * El orden de estas listas es el que tiene que repetir `TEMAS_POR_IDIOMA` en
 * `verificar-preguntas.mjs`: de esa posición sale el número que el verificador espera
 * en los ids, y de la comparación entre las dos sale el control de paralelismo.
 *
 * El reparto es 16 / 12 / 14 / 12 / 11, lo bastante parejo como para que el
 * intercalado no se quede sin temas: la última vuelta sirve solo preguntas del tema
 * 1, y son cuatro, no veinticinco.
 */
export const PREGUNTAS_EN = intercalarPorTema([EN_1, EN_2, EN_3, EN_4, EN_5]);

export const PREGUNTAS_ES = intercalarPorTema([ES_1, ES_2, ES_3, ES_4, ES_5]);
