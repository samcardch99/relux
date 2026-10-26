/**
 * The Materials section — an interactive breakdown of a render.
 *
 * Transcribed from the Claude Design file. Two scenes: the landscape kitchen
 * on desktop and tablet, and a portrait bathroom that replaces it on phones
 * (≤720px), where a 16:9 image is too small to tap. Each material is cut
 * out of its render by a PNG mask the size of that render, so the cut-outs
 * track the image at any rendered size. Masks and copy are the design's own.
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
};

/** A cut-out the size of the render; `box` is its opaque area, 0–1. */
type Mask = { src: string; box: [number, number, number, number] };


export const MAT_ORDER: MaterialKey[] = ["wood", "onyx", "cashmere", "glass", "floor"];

export const MATERIALS: Record<MaterialKey, Material> = {
  wood: {
    index: "01",
    group: "wood",
    swatch: "/assets/swatch-walnut-ref.webp",
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
  },
  onyx: {
    index: "02",
    swatch: "/assets/swatch-onyx-ref.webp",
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
  },
  glass: {
    index: "03",
    swatch: "/assets/swatch-glass-ref.webp",
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
  },
  floor: {
    index: "04",
    swatch: "/assets/swatch-floor-ref.webp",
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
  },
};

export const BATH_ORDER: MaterialKey[] = ["wood", "onyx", "glass", "floor"];

/** The phone scene. Its "onyx" is a marble, and the tab is relabelled to match. */
export const BATH: Partial<Record<MaterialKey, Material>> = {
  wood: {
    index: "01",
    group: "wood",
    swatch: "/assets/swatch-m-wood.webp",
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
  },
  onyx: {
    index: "02",
    swatch: "/assets/swatch-m-marble.webp",
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
  },
  glass: {
    index: "03",
    swatch: "/assets/swatch-glass-ref.webp",
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
  },
  floor: {
    index: "04",
    swatch: "/assets/swatch-m-floor.webp",
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
  },
};

export type Scene = "kitchen" | "bath";

/** The kitchen's cut-outs, one per material, all at the render's size. */
const KITCHEN_MASKS: Partial<Record<MaterialKey, Mask>> = {
  wood: { src: "/assets/mask-k-wood.png", box: [0.1011, 0, 0.9995, 0.9141] },
  onyx: { src: "/assets/mask-k-onyx.png", box: [0.1011, 0.079, 0.769, 0.8715] },
  cashmere: { src: "/assets/mask-k-cashmere.png", box: [0.043, 0.566, 0.2783, 0.7222] },
  glass: { src: "/assets/mask-k-glass.png", box: [0.0415, 0.0799, 0.604, 0.5642] },
  floor: { src: "/assets/mask-k-floor.png", box: [0, 0.7248, 0.9995, 0.9991] },
};

/** The bathroom's cut-outs, at the size of the portrait render. */
const BATH_MASKS: Partial<Record<MaterialKey, Mask>> = {
  wood: { src: "/assets/mask-b-wood.png", box: [0.0583, 0.117, 0.9433, 0.8311] },
  onyx: { src: "/assets/mask-b-onyx.png", box: [0.06, 0.1726, 0.8025, 0.8015] },
  glass: { src: "/assets/mask-b-glass.png", box: [0.4958, 0.1156, 0.625, 0.82] },
  floor: { src: "/assets/mask-b-floor.png", box: [0, 0.0644, 0.9992, 0.9993] },
};

type SceneDef = {
  mats: Partial<Record<MaterialKey, Material>>;
  order: MaterialKey[];
  masks: Partial<Record<MaterialKey, Mask>>;
};

export const SCENES: Record<Scene, SceneDef> = {
  kitchen: { mats: MATERIALS, order: MAT_ORDER, masks: KITCHEN_MASKS },
  bath: { mats: BATH, order: BATH_ORDER, masks: BATH_MASKS },
};

export type Region = {
  mat: MaterialKey;
  lift: boolean;
  /** Mask image URL. */
  maskSrc: string;
  /** Centre of the mask's opaque area, so the lift scales in place. */
  origin: string;
};

/** One region per material, in tab order. */
export function regionsFor(scene: Scene): Region[] {
  const { mats, order, masks } = SCENES[scene];
  return order.flatMap((mat) => {
    const m = masks[mat];
    if (!m) return [];
    const [x0, y0, x1, y1] = m.box;
    const origin = `${(((x0 + x1) / 2) * 100).toFixed(2)}% ${(((y0 + y1) / 2) * 100).toFixed(2)}%`;
    return [{ mat, lift: mats[mat]!.lift, maskSrc: m.src, origin }];
  });
}
