/**
 * The Materials section — an interactive breakdown of the kitchen render.
 *
 * Transcribed from the Claude Design file. The mask polygons are authored
 * against a 2576×1449 canvas and converted to percentages here, so they track
 * the image at any rendered size. Coordinates and copy are the design's own.
 */

export type MaterialKey = "wood" | "onyx" | "cashmere" | "glass" | "floor";

export type MaterialCopy = {
  name: string;
  category: string;
  finish: string;
  application: string;
  description: string;
};

type Material = {
  index: string;
  /** Point on the image (0–1) the swatch crop is taken from. */
  sample: [number, number];
  /** i18n key for the tab label. */
  labelKey: string;
  /** The floor is not lifted — scaling a full-width plane looks wrong. */
  lift: boolean;
  en: MaterialCopy;
  es: MaterialCopy;
  mask: [number, number][][];
};

/** The canvas the mask coordinates were authored against. */
const MAT_REF = { w: 2576, h: 1449 };

export const MAT_ORDER: MaterialKey[] = ["wood", "onyx", "cashmere", "glass", "floor"];

export const MATERIALS: Record<MaterialKey, Material> = {
  wood: {
    index: "01",
    sample: [0.78, 0.35],
    labelKey: "matWood",
    lift: true,
    en: {
      name: "Natural Walnut",
      category: "Wood veneer",
      finish: "Satin matte, open grain",
      application: "Tall cabinetry, wall panels, island front",
      description: "Book-matched walnut veneer run vertically across every panel, so the grain continues from the tall units into the wall.",
    },
    es: {
      name: "Nogal Natural",
      category: "Chapa de madera",
      finish: "Mate satinado, poro abierto",
      application: "Muebles altos, paneles de pared, frente de isla",
      description: "Chapa de nogal espejada colocada en vertical en todos los paneles, para que la veta continúe de los muebles altos a la pared.",
    },
    mask: [
      [[708,117], [908,117], [908,620], [708,620]],
      [[908,117], [914,118], [940,166], [942,805], [908,805]],
      [[262,278], [555,278], [555,318], [358,318], [358,805], [262,805]],
      [[1700,158], [1722,118], [1728,117], [2190,117], [2190,1031], [1976,1031], [1976,886], [1981,868], [1978,855], [1965,846], [1940,841], [1728,838], [1728,805], [1700,805]],
      [[2190,113], [2350,0], [2576,0], [2576,1192], [2190,1050]],
      [[855,888], [1840,888], [1840,1232], [855,1232]],
    ],
  },
  onyx: {
    index: "02",
    sample: [0.52, 0.45],
    labelKey: "matOnyx",
    lift: true,
    en: {
      name: "Honey Onyx",
      category: "Backlit natural stone",
      finish: "Polished, LED backlit",
      application: "Backsplash, hood cladding, island top and ends, worktops",
      description: "Translucent onyx slabs lit from behind, cut from the same block so the veining reads as one continuous surface.",
    },
    es: {
      name: "Ónix Miel",
      category: "Piedra natural retroiluminada",
      finish: "Pulido, retroiluminación LED",
      application: "Salpicadero, campana, encimera y extremos de la isla, superficies de trabajo",
      description: "Planchas de ónix translúcido iluminadas por detrás, cortadas del mismo bloque para que la veta se lea como una sola superficie.",
    },
    mask: [
      [[358,318], [555,318], [555,800], [358,800]],
      [[945,170], [1083,170], [1083,637], [1228,637], [1228,580], [1410,580], [1410,637], [1552,637], [1552,170], [1690,170], [1690,800], [945,800]],
      [[1225,110], [1412,110], [1412,575], [1225,575]],
      [[718,888], [855,888], [855,1260], [820,1259], [787,1255], [758,1249], [736,1241], [723,1232], [718,1222]],
      [[1840,888], [1975,880], [1972,1180], [1971,1225], [1968,1236], [1960,1243], [1948,1249], [1932,1254], [1912,1258], [1890,1260], [1870,1261], [1842,1256]],
      [[713,857], [760,843], [1935,843], [1980,857], [1980,880], [1935,890], [760,890], [713,880]],
      [[910,800], [1728,800], [1728,815], [910,815]],
      [[262,800], [555,800], [555,818], [262,818]],
    ],
  },
  cashmere: {
    index: "03",
    sample: [0.2, 0.62],
    labelKey: "matCashmere",
    lift: true,
    en: {
      name: "Cashmere Lacquer",
      category: "Lacquered cabinetry",
      finish: "Soft-touch matte, handleless",
      application: "Base cabinets, back wall",
      description: "A warm greige lacquer that sits quietly under the walnut and onyx. Push-to-open fronts keep the run clean, with no hardware breaking the line.",
    },
    es: {
      name: "Laca Cashmere",
      category: "Carpintería lacada",
      finish: "Mate soft-touch, sin tiradores",
      application: "Muebles bajos, pared del fondo",
      description: "Una laca greige cálida que acompaña sin competir con el nogal y el ónix. Frentes con apertura push mantienen la línea limpia, sin herrajes a la vista.",
    },
    mask: [
      [[110,820], [708,820], [708,924], [718,924], [718,1048], [548,1048], [544,940], [528,915], [522,884], [452,872], [300,874], [200,878], [110,884]],
    ],
  },
  glass: {
    index: "04",
    sample: [0.12, 0.25],
    labelKey: "matGlass",
    lift: true,
    en: {
      name: "Smoked Glass & Bronze",
      category: "Glass / metal",
      finish: "Tinted glass, dark bronze frame",
      application: "Display cabinets and open shelving",
      description: "Slim bronze frames with smoked glass fronts and integrated strip lighting on every shelf.",
    },
    es: {
      name: "Cristal Ahumado y Bronce",
      category: "Cristal / metal",
      finish: "Cristal tintado, marco bronce oscuro",
      application: "Vitrinas y estantería abierta",
      description: "Marcos finos de bronce con frentes de cristal ahumado e iluminación integrada en cada estante.",
    },
    mask: [
      [[112,117], [705,117], [705,815], [558,815], [558,275], [258,275], [258,815], [112,815]],
      [[1083,137], [1228,137], [1228,637], [1083,637]],
      [[1410,137], [1552,137], [1552,637], [1410,637]],
    ],
  },
  floor: {
    index: "05",
    sample: [0.8, 0.9],
    labelKey: "matFloor",
    lift: false,
    en: {
      name: "Large-format Porcelain",
      category: "Porcelain tile",
      finish: "Soft matte, 120 × 120 cm",
      application: "Kitchen and dining floor",
      description: "Large tiles with minimal joints, laid continuously from the kitchen into the dining area.",
    },
    es: {
      name: "Porcelánico Gran Formato",
      category: "Porcelánico",
      finish: "Mate suave, 120 × 120 cm",
      application: "Piso de cocina y comedor",
      description: "Piezas grandes con juntas mínimas, colocadas sin interrupción desde la cocina hasta el comedor.",
    },
    mask: [
      [[0,1136], [104,1136], [122,1140], [156,1140], [158,1242], [190,1245], [196,1332], [222,1332], [206,1150], [206,1126], [248,1126], [248,1198], [278,1198], [280,1126], [334,1100], [352,1242], [376,1242], [360,1090], [378,1060], [376,1140], [400,1140], [402,1060], [416,1060], [418,1198], [456,1198], [440,1060], [520,1060], [530,1142], [552,1142], [534,1050], [712,1050], [718,1222], [723,1232], [736,1241], [758,1249], [787,1255], [820,1259], [855,1260], [1842,1256], [1870,1261], [1890,1260], [1912,1258], [1932,1254], [1948,1249], [1960,1243], [1968,1236], [1971,1225], [1974,1214], [1976,1053], [2190,1053], [2576,1194], [2576,1449], [0,1449]],
    ],
  },
};

export type Region = {
  mat: MaterialKey;
  lift: boolean;
  /** Ready-made polygon() argument list. */
  clipPath: string;
  /** Centre of the polygon's bounding box, so the lift scales in place. */
  origin: string;
};

const pct = (v: number, total: number) => ((v / total) * 100).toFixed(2);

/** One region per polygon, flattened in tab order. */
export const REGIONS: Region[] = MAT_ORDER.flatMap((mat) =>
  MATERIALS[mat].mask.map((poly) => {
    const points = poly
      .map(([x, y]) => `${pct(x, MAT_REF.w)}% ${pct(y, MAT_REF.h)}%`)
      .join(", ");
    const xs = poly.map((p) => p[0]);
    const ys = poly.map((p) => p[1]);
    const ox = pct((Math.min(...xs) + Math.max(...xs)) / 2, MAT_REF.w);
    const oy = pct((Math.min(...ys) + Math.max(...ys)) / 2, MAT_REF.h);
    return { mat, lift: MATERIALS[mat].lift, clipPath: points, origin: `${ox}% ${oy}%` };
  })
);

/**
 * Background size/position that crops a detail of the render for the swatch,
 * zoomed 7× on the material's sample point.
 */
export function swatchCrop(sample: [number, number]) {
  const S = 7;
  const Sy = (S * MAT_REF.h) / MAT_REF.w;
  const x = ((sample[0] * S - 0.5) / (S - 1)) * 100;
  const y = ((sample[1] * Sy - 0.5) / (Sy - 1)) * 100;
  return {
    size: `${S * 100}% auto`,
    position: `${x.toFixed(2)}% ${y.toFixed(2)}%`,
  };
}
