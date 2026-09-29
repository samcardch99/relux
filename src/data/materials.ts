/**
 * The Materials section — an interactive breakdown of a render.
 *
 * Transcribed from the Claude Design file. Two scenes: the landscape kitchen
 * on desktop and tablet, and a portrait bathroom that replaces it on phones
 * (≤720px), where a 16:9 image is too small to tap. Each scene's mask polygons
 * are authored against its own canvas and converted to percentages here, so
 * they track the image at any rendered size. Coordinates and copy are the
 * design's own.
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
  /** Tab group it lights: cashmere is a sub-option under "Wood". */
  group?: MaterialKey;
  /** Photographed sample shown in the spec panel. */
  swatch: string;
  /** i18n key for the tab label. */
  labelKey: string;
  /** The floor is not lifted — scaling a full-width plane looks wrong. */
  lift: boolean;
  en: MaterialCopy;
  es: MaterialCopy;
  mask: [number, number][][];
};

/** The canvas the kitchen mask coordinates were authored against. */
const MAT_REF = { w: 2576, h: 1449 };

export const MAT_ORDER: MaterialKey[] = ["wood", "onyx", "cashmere", "glass", "floor"];

export const MATERIALS: Record<MaterialKey, Material> = {
  wood: {
    index: "01",
    group: "wood",
    swatch: "/assets/swatch-wood.webp",
    labelKey: "matWood",
    lift: true,
    en: {
      name: "Natural Walnut",
      category: "Wood · Walnut",
      finish: "Satin matte, open grain",
      application: "Tall cabinetry, wall panels, island front",
      description: "Book-matched walnut veneer run vertically across every panel, so the grain continues from the tall units into the wall.",
    },
    es: {
      name: "Nogal Natural",
      category: "Madera · Nogal",
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
    swatch: "/assets/swatch-onyx.webp",
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
    index: "01",
    group: "wood",
    swatch: "/assets/swatch-cashmere.webp",
    labelKey: "matCashmere",
    lift: true,
    en: {
      name: "Cashmere Wood",
      category: "Wood · Cashmere",
      finish: "Matte, cashmere tone, handleless",
      application: "Base cabinets, back wall",
      description: "Wood cabinetry finished in a warm cashmere tone that sits quietly under the walnut and onyx. Push-to-open fronts keep the run clean, with no hardware breaking the line.",
    },
    es: {
      name: "Madera Cashmere",
      category: "Madera · Cashmere",
      finish: "Mate, tono cashmere, sin tiradores",
      application: "Muebles bajos, pared del fondo",
      description: "Carpintería en madera con un tono cashmere cálido que acompaña sin competir con el nogal y el ónix. Frentes con apertura push mantienen la línea limpia, sin herrajes a la vista.",
    },
    mask: [
      [[110,820], [708,820], [708,924], [718,924], [718,1048], [548,1048], [544,940], [528,915], [522,884], [452,872], [300,874], [200,878], [110,884]],
    ],
  },
  glass: {
    index: "03",
    swatch: "/assets/swatch-glass.webp",
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
    index: "04",
    swatch: "/assets/swatch-floor.webp",
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

/** The canvas the bathroom mask coordinates were authored against. */
const BATH_REF = { w: 1600, h: 1800 };

export const BATH_ORDER: MaterialKey[] = ["wood", "onyx", "glass", "floor"];

/** The phone scene. Its "onyx" is a marble, and the tab is relabelled to match. */
export const BATH: Partial<Record<MaterialKey, Material>> = {
  wood: {
    index: "01",
    group: "wood",
    swatch: "/assets/swatch-bath-wood.webp",
    labelKey: "matWood",
    lift: true,
    en: {
      name: "Natural Walnut",
      category: "Wood · Walnut",
      finish: "Satin matte, open grain",
      application: "Vanity, mirror wall, wall panels and canopy",
      description: "Walnut veneer wraps the vanity, frames the mirror and climbs the wall into the ceiling canopy, with LED lines set into the joints.",
    },
    es: {
      name: "Nogal Natural",
      category: "Madera · Nogal",
      finish: "Mate satinado, poro abierto",
      application: "Mueble de lavabo, pared del espejo, paneles y techo",
      description: "La chapa de nogal envuelve el mueble, enmarca el espejo y sube por la pared hasta el techo, con líneas LED integradas en las juntas.",
    },
    mask: [
      [[378,380], [668,380], [668,440], [378,440]],
      [[378,440], [410,440], [410,965], [378,965]],
      [[640,440], [668,440], [668,965], [640,965]],
      [[378,965], [668,965], [668,1062], [378,1062]],
      [[114,1135], [795,1135], [795,1400], [120,1400], [120,1295], [114,1295]],
      [[1005,212], [1505,212], [1345,328], [1345,1388], [1322,1388], [1322,1195], [1225,1195], [1225,390], [1280,390], [1280,322], [1082,322], [1082,1195], [1082,1388], [1005,1388]],
    ],
  },
  onyx: {
    index: "02",
    swatch: "/assets/swatch-bath-onyx.webp",
    labelKey: "matMarble",
    lift: true,
    en: {
      name: "Black & Gold Marble",
      category: "Natural stone",
      finish: "Polished",
      application: "Wall cladding, vanity top, lit niche",
      description: "Dark marble with gold veining, set on both sides of the mirror and repeated inside the lit niche so the stone reads as one material across the room.",
    },
    es: {
      name: "Mármol Negro y Oro",
      category: "Piedra natural",
      finish: "Pulido",
      application: "Revestimiento de pared, encimera, nicho iluminado",
      description: "Mármol oscuro con vetas doradas, colocado a ambos lados del espejo y repetido en el nicho iluminado para que la piedra se lea como un solo material.",
    },
    mask: [
      [[250,380], [378,380], [378,1062], [250,1062]],
      [[668,380], [795,380], [795,1062], [668,1062]],
      [[110,1062], [795,1062], [795,1135], [110,1135]],
      [[165,1400], [795,1400], [795,1445], [165,1445]],
      [[1082,322], [1280,322], [1280,390], [1225,390], [1225,1195], [1082,1195]],
    ],
  },
  glass: {
    index: "03",
    swatch: "/assets/swatch-bath-glass.webp",
    labelKey: "matGlass",
    lift: true,
    en: {
      name: "Smoked Glass Tower",
      category: "Glass / metal",
      finish: "Tinted glass, black frame",
      application: "Floor-to-ceiling storage",
      description: "A full-height glass cabinet with a walnut interior and strip lighting under every shelf.",
    },
    es: {
      name: "Torre de Cristal Ahumado",
      category: "Cristal / metal",
      finish: "Cristal tintado, marco negro",
      application: "Almacenaje de piso a techo",
      description: "Una vitrina de altura completa con interior de nogal e iluminación bajo cada estante.",
    },
    mask: [[[795,205], [1005,205], [1005,1500], [795,1500]]],
  },
  floor: {
    index: "04",
    swatch: "/assets/swatch-bath-floor.webp",
    labelKey: "matFloor",
    lift: false,
    en: {
      name: "Large-format Porcelain",
      category: "Porcelain tile",
      finish: "Soft matte, large format",
      application: "Bathroom floor",
      description: "Light porcelain laid with minimal joints, so the dark wood and stone read clearly against it.",
    },
    es: {
      name: "Porcelánico Gran Formato",
      category: "Porcelánico",
      finish: "Mate suave, gran formato",
      application: "Piso del baño",
      description: "Porcelánico claro con juntas mínimas, para que la madera y la piedra oscuras destaquen sobre él.",
    },
    mask: [
      [[0,1590], [120,1500], [165,1450], [795,1450], [795,1500], [1005,1500], [1005,1392], [1085,1392], [1090,1480], [1320,1480], [1330,1392], [1400,1392], [1600,1560], [1600,1800], [0,1800]],
    ],
  },
};

export type Scene = "kitchen" | "bath";

export const SCENES = {
  kitchen: { ref: MAT_REF, mats: MATERIALS as Partial<Record<MaterialKey, Material>>, order: MAT_ORDER },
  bath: { ref: BATH_REF, mats: BATH, order: BATH_ORDER },
} as const;

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
export function regionsFor(scene: Scene): Region[] {
  const { ref, mats, order } = SCENES[scene];
  return order.flatMap((mat) => {
    const m = mats[mat]!;
    return m.mask.map((poly) => {
      const points = poly
        .map(([x, y]) => `${pct(x, ref.w)}% ${pct(y, ref.h)}%`)
        .join(", ");
      const xs = poly.map((p) => p[0]);
      const ys = poly.map((p) => p[1]);
      const ox = pct((Math.min(...xs) + Math.max(...xs)) / 2, ref.w);
      const oy = pct((Math.min(...ys) + Math.max(...ys)) / 2, ref.h);
      return { mat, lift: m.lift, clipPath: points, origin: `${ox}% ${oy}%` };
    });
  });
}
