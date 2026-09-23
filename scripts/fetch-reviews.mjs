/**
 * Descarga las reseñas reales del perfil de Google del negocio y las escribe en
 * src/data/reviews.json, que es lo que lee el componente Reviews.
 *
 * Se ejecuta EN BUILD, no en el navegador: asi la clave nunca viaja al cliente
 * y la pagina no depende de que la API responda cuando alguien la visita.
 *
 * La Places API devuelve como mucho 5 reseñas, las que Google considera mas
 * relevantes — que es exactamente el "top 5" que se pidio.
 *
 *   GOOGLE_PLACES_API_KEY=...  GOOGLE_PLACE_ID=...  node scripts/fetch-reviews.mjs
 *
 * Sin credenciales no rompe el build: deja el fichero vacio y la seccion no se
 * renderiza. Preferible a publicar reseñas inventadas.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const SALIDA = "src/data/reviews.json";
const KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

const vacio = { rating: null, total: 0, mapsUrl: null, reviews: [], fetchedAt: null };

async function main() {
  if (!KEY || !PLACE_ID) {
    console.warn(
      "[reviews] Sin GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID: se deja " +
        "reviews.json vacio y la seccion no se muestra.",
    );
    return escribir(vacio);
  }

  const res = await fetch("https://places.googleapis.com/v1/places/" + PLACE_ID, {
    headers: {
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
    },
  });

  if (!res.ok) {
    throw new Error(`[reviews] Places API ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const reviews = (data.reviews ?? []).map((r) => ({
    text: r.originalText?.text ?? r.text?.text ?? "",
    lang: r.originalText?.languageCode ?? r.text?.languageCode ?? null,
    name: r.authorAttribution?.displayName ?? "",
    avatar: r.authorAttribution?.photoUri ?? "",
    profile: r.authorAttribution?.uri ?? "",
    stars: r.rating ?? null,
    when: r.relativePublishTimeDescription ?? "",
    publishedAt: r.publishTime ?? null,
  }));

  await escribir({
    rating: data.rating ?? null,
    total: data.userRatingCount ?? 0,
    mapsUrl: data.googleMapsUri ?? null,
    reviews: reviews.filter((r) => r.text && r.name),
    fetchedAt: new Date().toISOString(),
  });
}

async function escribir(payload) {
  await mkdir(dirname(SALIDA), { recursive: true });
  await writeFile(SALIDA, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `[reviews] ${payload.reviews.length} reseñas escritas en ${SALIDA}` +
      (payload.rating ? ` (${payload.rating}★ de ${payload.total})` : ""),
  );
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
