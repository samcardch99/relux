export type Lang = "en" | "es";

/**
 * Every visible string on the page, keyed so the client-side language
 * toggle can swap `[data-i18n]` nodes without a round trip.
 */
export const COPY = {
  en: {
    navServices: "Services",
    navProjects: "Work",
    navAbout: "About",
    navProcess: "Process",
    navQuote: "Get a Quote",

    heroEyebrow: "Miami Premier Construction",
    heroTitle: "DESIGNED & BUILT",
    heroSub:
      "Interior remodeling and custom woodwork for homes and businesses across Miami.",
    heroLead:
      "We design the entire job before the first cut — so what you pictured is exactly what gets built.",
    heroCta: "Start a Project",

    servicesKicker: "OUR",
    servicesWord: "SERVICES",
    servicesIntro:
      "Interiors, floors, bathrooms, walls and finishes — plus the woodwork we build ourselves: kitchens, closets, TV walls and wall panels.",
    s1Title: "Kitchens",
    s1Desc:
      "Cabinetry built in our own shop, stone countertops and integrated lighting, fitted to the room down to the millimetre.",
    s2Title: "Closets & Wall Panels",
    s2Desc:
      "Walk-in closets, TV walls and wood panelling designed as one continuous piece of joinery.",
    s3Title: "Bathrooms",
    s3Desc:
      "Full bathroom remodels — tile, stone, lighting and fixtures, handled end to end.",
    s4Title: "Floors & Finishes",
    s4Desc:
      "Flooring, walls, finish carpentry and paint: the layer that decides whether a space reads finished.",

    matTitle: "THE",
    matTitleEm: "MATERIALS",
    matIntro:
      "Every surface in a RE-LUX kitchen is specified with the client. Move across the render to see what each one is made of.",
    matWood: "Wood",
    matOnyx: "Onyx",
    matCashmere: "Cashmere",
    matGlass: "Glass",
    matFloor: "Flooring",
    matCursor: "View material",
    matFinish: "Finish",
    matApplication: "Application",
    matIdleTitle: "Hover a surface or pick a material below.",
    matIdleText:
      "Each material lights up across the whole kitchen, wherever it appears.",

    projTitle: "Our",
    projTitleEm: "Work",
    projIntro:
      "Kitchens, closets and complete interiors we designed and built for homes and businesses in Miami.",
    projLink: "See all projects",
    cardOpen: "View project",

    p1Tag: "Kitchens",
    p1Title: "Walnut kitchen with backlit onyx",
    p2Tag: "Closets",
    p2Title: "Walk-in closet in glass and wood",
    p3Tag: "Bathrooms",
    p3Title: "Primary bath in dark marble",
    p4Tag: "Interiors",
    p4Title: "Open kitchen and dining room",
    p5Tag: "Woodwork",
    p5Title: "Floor-to-ceiling wall panelling",
    p6Tag: "Kitchens",
    p6Title: "Matte black kitchen with island",
    p7Tag: "Interiors",
    p7Title: "Full apartment remodel",
    p8Tag: "Interiors",
    p8Title: "Living room and TV wall",
    p9Tag: "Woodwork",
    p9Title: "Entry hall and wood panelling",

    workTitle: "All",
    workTitleEm: "Projects",
    workIntro:
      "Every job here was designed, fabricated and installed by our own team — kitchens, closets, bathrooms and complete interiors across Miami.",
    workBack: "Back",
    workFoot:
      "Have a space in mind? Send us the measurements and we will come back with a design and a price.",
    workCta: "Request a Quote",

    detailFoot:
      "Want something like this in your space? Send us the measurements and we will come back with a design and a price.",
    detailBack: "Back to projects",

    storyKicker: "About Us",
    storyTitle1: "Built on",
    storyTitleEm: "Detail,",
    storyTitle2: "Not Shortcuts",
    storyLead:
      "RE-LUX Construction is a Miami firm working on high-end residential and commercial interiors — founded and run by two brothers who are on site with the crew.",
    storyQuote: "“Tu proyecto, nuestro compromiso de lujo.”",
    aboutBtn: "More about us",

    aboutTitle: "About",
    aboutTitleEm: "RE-LUX",
    aboutIntro:
      "A firm specialised in high-end residential and commercial projects, dedicated to transforming spaces through full renovations, design and construction to premium standards.",
    aboutH1: "Two brothers, one crew, one standard.",
    aboutP1:
      "RE-LUX Construction was founded by Enmanuel and Randy Cagigas around a simple idea: the people who design the job should be the same people who build it. Nothing is subcontracted away and forgotten — kitchens, closets and panelling are drawn, fabricated in our own shop, and installed by the team that measured the space.",
    aboutP2:
      "We work across Miami on homes and businesses: full interior remodels, floors, walls, bathrooms, finish carpentry and paint. Every job starts with drawings and material boards, so you approve exactly what will be built before anything is demolished.",
    aboutP3:
      "The result is what our clients keep coming back for — unique ideas, clean execution, and a finished space that reads as luxury, elegance and durability rather than a quick renovation.",
    aboutFoot:
      "Tell us about the space and we will come back with drawings, materials and a clear price.",

    v1Title: "Technical precision",
    v1Desc:
      "Measured, drawn and detailed before the first cut, so the finished piece fits the room down to the millimetre.",
    v2Title: "Materials & finishes",
    v2Desc:
      "Wood, stone, tile and hardware chosen with you and specified to last, not to hit a number.",
    v3Title: "One team, start to finish",
    v3Desc:
      "The same crew from the first visit to the final walkthrough. One contact, one standard, no handoffs.",

    founderRole: "Founder",
    sinceLine: "RE-LUX Construction — Miami, Florida",

    procTitle: "HOW WE",
    procTitleEm: "WORK",
    procIntro:
      "We design the whole job before we start. You approve drawings, materials and finishes, and only then do we build.",
    w1Title: "Consultation & Site Visit",
    w1Desc:
      "We visit the space, measure it, and listen to how you actually want to use it.",
    w2Title: "Design & Proposal",
    w2Desc:
      "Drawings and material boards for the entire job, with a clear price before anything begins.",
    w3Title: "Materials & Finishes",
    w3Desc:
      "Wood, stone, tile and hardware chosen with you and ordered ahead of the build.",
    w4Title: "Custom Fabrication",
    w4Desc:
      "Kitchens, closets and panelling built to your exact measurements in our own shop.",
    w5Title: "Installation & Build",
    w5Desc: "One crew on site, working clean, to the schedule agreed up front.",
    w6Title: "Final Walkthrough",
    w6Desc:
      "We walk the finished space together and correct anything before we hand it over.",

    revKicker: "Client reviews",
    revBasis: "Average rating across {n} Google reviews.",
    revAgo: "{n} months ago",
    revAgo1: "a month ago",
    revLink: "All Google reviews",

    ctaKicker: "Ready to start?",
    ctaTitle: "Let's build the space",
    ctaTitleEm: "you've been picturing",
    ctaButton: "Start Your Project",

    contactTitle: "GET IN",
    contactTitleEm: "TOUCH",
    labelEmail: "Email",
    labelLocation: "Location",
    location: "Miami, Florida",
    labelFirst: "First Name",
    labelLast: "Last Name",
    labelService: "Service",
    labelMessage: "Message",
    phFirst: "John",
    phLast: "Smith",
    phEmail: "john@example.com",
    phService: "Select a service…",
    phMessage: "Tell us about your project…",
    send: "Send Message",
    sending: "Sending…",
    sent: "Message Sent",
    sentTitle: "Message sent",
    sentDesc: "We'll be in touch shortly.",
    errTitle: "Something went wrong",
    errDesc: "Please try again later.",
    errFirst: "Please enter a valid first name",
    errLast: "Please enter a valid last name",
    errEmail: "Please enter a valid email",
    errService: "Please select a service",
    errMessage: "The message must be at least 10 characters",

    footerCopy: "© 2026 RE-LUX Construction — Miami, Florida",
    footerPrivacy: "Privacy",
  },

  es: {
    navServices: "Servicios",
    navProjects: "Trabajos",
    navAbout: "Nosotros",
    navProcess: "Proceso",
    navQuote: "Pedir Presupuesto",

    heroEyebrow: "Miami Premier Construction",
    heroTitle: "DISEÑO Y OBRA",
    heroSub:
      "Remodelación interior y carpintería a medida para casas y negocios en todo Miami.",
    heroLead:
      "Diseñamos el trabajo completo antes del primer corte, para que lo que imaginaste sea exactamente lo que se construye.",
    heroCta: "Iniciar un Proyecto",

    servicesKicker: "NUESTROS",
    servicesWord: "SERVICIOS",
    servicesIntro:
      "Interiores, pisos, baños, paredes y acabados, más la carpintería que fabricamos nosotros mismos: cocinas, closets, TV walls y wall panels.",
    s1Title: "Cocinas",
    s1Desc:
      "Carpintería fabricada en nuestro propio taller, encimeras en piedra e iluminación integrada, ajustadas al espacio al milímetro.",
    s2Title: "Closets y Wall Panels",
    s2Desc:
      "Walk-in closets, TV walls y paneles de madera diseñados como una sola pieza continua.",
    s3Title: "Baños",
    s3Desc:
      "Remodelación completa de baños: cerámica, piedra, iluminación y grifería, de principio a fin.",
    s4Title: "Pisos y Acabados",
    s4Desc:
      "Pisos, paredes, finish y pintura: la capa que decide si un espacio se ve realmente terminado.",

    matTitle: "LOS",
    matTitleEm: "MATERIALES",
    matIntro:
      "Cada superficie de una cocina RE-LUX se especifica junto al cliente. Recorre el render para ver de qu\u00e9 est\u00e1 hecha cada una.",
    matWood: "Madera",
    matOnyx: "\u00d3nix",
    matCashmere: "Cashmere",
    matGlass: "Cristal",
    matFloor: "Piso",
    matCursor: "Ver material",
    matFinish: "Acabado",
    matApplication: "Aplicaci\u00f3n",
    matIdleTitle: "Pasa sobre una superficie o elige un material.",
    matIdleText:
      "Cada material se ilumina en toda la cocina, all\u00ed donde aparece.",

    projTitle: "Nuestro",
    projTitleEm: "Trabajo",
    projIntro:
      "Cocinas, closets e interiores completos que diseñamos y construimos para casas y negocios en Miami.",
    projLink: "Ver todos los proyectos",
    cardOpen: "Ver proyecto",

    p1Tag: "Cocinas",
    p1Title: "Cocina en nogal con ónix retroiluminado",
    p2Tag: "Closets",
    p2Title: "Walk-in closet en cristal y madera",
    p3Tag: "Baños",
    p3Title: "Baño principal en mármol oscuro",
    p4Tag: "Interiores",
    p4Title: "Cocina y comedor en espacio abierto",
    p5Tag: "Carpintería",
    p5Title: "Panelado de pared de piso a techo",
    p6Tag: "Cocinas",
    p6Title: "Cocina en negro mate con isla",
    p7Tag: "Interiores",
    p7Title: "Remodelación completa de apartamento",
    p8Tag: "Interiores",
    p8Title: "Sala y TV wall",
    p9Tag: "Carpintería",
    p9Title: "Recibidor y panelado de madera",

    workTitle: "Todos los",
    workTitleEm: "Proyectos",
    workIntro:
      "Cada trabajo aquí fue diseñado, fabricado e instalado por nuestro propio equipo: cocinas, closets, baños e interiores completos en todo Miami.",
    workBack: "Volver",
    workFoot:
      "¿Tienes un espacio en mente? Envíanos las medidas y te respondemos con un diseño y un precio.",
    workCta: "Pedir Presupuesto",

    detailFoot:
      "¿Quieres algo así en tu espacio? Envíanos las medidas y te respondemos con un diseño y un precio.",
    detailBack: "Volver a proyectos",

    storyKicker: "Nosotros",
    storyTitle1: "Construido sobre el",
    storyTitleEm: "detalle,",
    storyTitle2: "no sobre atajos",
    storyLead:
      "RE-LUX Construction es una firma de Miami dedicada a interiores residenciales y comerciales de alta gama, fundada y dirigida por dos hermanos que están en obra junto al equipo.",
    storyQuote: "“Tu proyecto, nuestro compromiso de lujo.”",
    aboutBtn: "Conocer más",

    aboutTitle: "Sobre",
    aboutTitleEm: "RE-LUX",
    aboutIntro:
      "Una firma especializada en proyectos residenciales y comerciales de alta gama, dedicada a transformar espacios a través de renovaciones integrales, diseño y construcción con estándares premium.",
    aboutH1: "Dos hermanos, un equipo, un mismo estándar.",
    aboutP1:
      "RE-LUX Construction nació de una idea simple de Enmanuel y Randy Cagigas: quien diseña el trabajo debe ser quien lo construye. Nada se subcontrata y se olvida — cocinas, closets y paneles se dibujan, se fabrican en nuestro propio taller y los instala el mismo equipo que midió el espacio.",
    aboutP2:
      "Trabajamos en todo Miami, en casas y negocios: remodelación interior completa, pisos, paredes, baños, carpintería de acabado y pintura. Cada trabajo empieza con planos y muestras de materiales, para que apruebes exactamente lo que se va a construir antes de demoler nada.",
    aboutP3:
      "El resultado es lo que hace que nuestros clientes vuelvan: ideas únicas, ejecución limpia y un espacio terminado que se lee como lujo, elegancia y durabilidad, no como una reforma rápida.",
    aboutFoot:
      "Cuéntanos cómo es el espacio y te respondemos con planos, materiales y un precio claro.",

    v1Title: "Precisión técnica",
    v1Desc:
      "Medido, dibujado y detallado antes del primer corte, para que la pieza terminada encaje al milímetro.",
    v2Title: "Materiales y acabados",
    v2Desc:
      "Madera, piedra, cerámica y herrajes elegidos contigo y especificados para durar, no para cuadrar un número.",
    v3Title: "Un solo equipo",
    v3Desc:
      "El mismo equipo desde la primera visita hasta la entrega final. Un contacto, un estándar, sin traspasos.",

    founderRole: "Fundador",
    sinceLine: "RE-LUX Construction — Miami, Florida",

    procTitle: "CÓMO",
    procTitleEm: "TRABAJAMOS",
    procIntro:
      "Diseñamos todo el trabajo antes de comenzar. Apruebas planos, materiales y acabados, y solo entonces construimos.",
    w1Title: "Consulta y Visita",
    w1Desc:
      "Visitamos el espacio, lo medimos y escuchamos cómo quieres usarlo de verdad.",
    w2Title: "Diseño y Propuesta",
    w2Desc:
      "Planos y muestras de materiales de todo el trabajo, con un precio claro antes de empezar.",
    w3Title: "Materiales y Acabados",
    w3Desc:
      "Madera, piedra, cerámica y herrajes elegidos contigo y pedidos antes de la obra.",
    w4Title: "Fabricación a Medida",
    w4Desc:
      "Cocinas, closets y paneles fabricados a tus medidas exactas en nuestro taller.",
    w5Title: "Instalación y Obra",
    w5Desc:
      "Un solo equipo en obra, trabajando limpio y con el calendario acordado de antemano.",
    w6Title: "Entrega Final",
    w6Desc:
      "Recorremos juntos el espacio terminado y corregimos cualquier detalle antes de entregarlo.",

    revKicker: "Reseñas de clientes",
    revBasis: "Valoración media de {n} reseñas en Google.",
    revAgo: "hace {n} meses",
    revAgo1: "hace un mes",
    revLink: "Ver todas en Google",

    ctaKicker: "¿Listo para empezar?",
    ctaTitle: "Construyamos el espacio",
    ctaTitleEm: "que tienes en mente",
    ctaButton: "Comienza tu Proyecto",

    contactTitle: "PONTE EN",
    contactTitleEm: "CONTACTO",
    labelEmail: "Correo",
    labelLocation: "Ubicación",
    location: "Miami, Florida",
    labelFirst: "Nombre",
    labelLast: "Apellido",
    labelService: "Servicio",
    labelMessage: "Mensaje",
    phFirst: "Juan",
    phLast: "Pérez",
    phEmail: "juan@ejemplo.com",
    phService: "Selecciona un servicio…",
    phMessage: "Cuéntanos sobre tu proyecto…",
    send: "Enviar Mensaje",
    sending: "Enviando…",
    sent: "Mensaje Enviado",
    sentTitle: "Mensaje enviado",
    sentDesc: "Te contactaremos en breve.",
    errTitle: "Algo salió mal",
    errDesc: "Inténtalo de nuevo más tarde.",
    errFirst: "Introduce un nombre válido",
    errLast: "Introduce un apellido válido",
    errEmail: "Introduce un correo válido",
    errService: "Selecciona un servicio",
    errMessage: "El mensaje debe tener al menos 10 caracteres",

    footerCopy: "© 2026 RE-LUX Construction — Miami, Florida",
    footerPrivacy: "Privacidad",
  },
} as const;

export type CopyKey = keyof (typeof COPY)["en"];

/** Contact details, shared by the contact section, the about view and the footer. */
export const FOUNDERS = [
  { name: "Enmanuel Cagigas", tel: "+17863291283", phone: "(786) 329-1283" },
  { name: "Randy Cagigas", tel: "+17862719256", phone: "(786) 271-9256" },
] as const;

export const INSTAGRAM = {
  handle: "@re.lux.construction",
  url: "https://www.instagram.com/re.lux.construction",
} as const;

/**
 * Images extracted from the design project, re-encoded to WebP.
 *
 * Two origins, mirroring the design: `assets/*` are the photos the design
 * references by `src`, while the rest were dropped into `<image-slot>`s and
 * therefore override that `src` wherever both exist (proj-4, proj-6,
 * process-band, cta-band). Slots the author panned carry an `objectPosition`,
 * translated from the slot's stored offset.
 */
const IMG = {
  kitchenOnyx: "/assets/kitchen-onyx.webp",
  closet: "/assets/closet.webp",
  bath: "/assets/bath.webp",
  kitchenDining: "/assets/kitchen-dining.webp",
  kitchenWood: "/assets/kitchen-wood.webp",
  kitchenDark: "/assets/kitchen-dark.webp",
  interiorEmpty: "/assets/interior-empty.webp",
  materialKitchen: "/assets/material-kitchen.webp",

  proj4: "/assets/proj-4.webp",
  proj6: "/assets/proj-6.webp",
  processBand: "/assets/process-band.webp",
  ctaBand: "/assets/cta-band.webp",
  owners: "/assets/relux-owners.webp",
  ownersWide: "/assets/relux-owners-wide.webp",
  founder1: "/assets/relux-founder-1.webp",
  /** Cropped from the shot of the two of them — the design had no second portrait. */
  founder2: "/assets/relux-founder-2.webp",
} as const;

/** Crops the design's author set by panning the image inside its slot. */
export const FOCUS = {
  proj6: "62% center",
  processBand: "center bottom",
  ctaBand: "center 72%",
  ownersWide: "center 55%",
} as const;

export { IMG };

export const SERVICES = [
  { n: "01", titleKey: "s1Title", descKey: "s1Desc", img: IMG.kitchenDining, grow: 2.4, hover: 3.6 },
  { n: "02", titleKey: "s2Title", descKey: "s2Desc", img: IMG.closet, grow: 1, hover: 2.2 },
  { n: "03", titleKey: "s3Title", descKey: "s3Desc", img: IMG.bath, grow: 1, hover: 2.2 },
  { n: "04", titleKey: "s4Title", descKey: "s4Desc", img: IMG.kitchenDark, grow: 1, hover: 2.2 },
] as const;

export const PROCESS = [
  { n: "01", titleKey: "w1Title", descKey: "w1Desc" },
  { n: "02", titleKey: "w2Title", descKey: "w2Desc" },
  { n: "03", titleKey: "w3Title", descKey: "w3Desc" },
  { n: "04", titleKey: "w4Title", descKey: "w4Desc" },
  { n: "05", titleKey: "w5Title", descKey: "w5Desc" },
  { n: "06", titleKey: "w6Title", descKey: "w6Desc" },
] as const;

/**
 * Respaldo por si reviews.json no trae `mapsUrl`. Forma por CID: es la mas
 * corta y estable para identificar una ficha de Google. Una URL de /maps/search
 * NO sirve — abre una busqueda, no el negocio.
 */
export const REVIEWS_URL = "https://maps.google.com/?cid=12488415478177387112";

export const VALUES = [
  { n: "01", titleKey: "v1Title", descKey: "v1Desc" },
  { n: "02", titleKey: "v2Title", descKey: "v2Desc" },
  { n: "03", titleKey: "v3Title", descKey: "v3Desc" },
] as const;

/** The nine projects. The first six also appear in the homepage grid. */
export const PROJECTS = [
  { i: 0, tagKey: "p1Tag", titleKey: "p1Title", img: IMG.kitchenOnyx },
  { i: 1, tagKey: "p2Tag", titleKey: "p2Title", img: IMG.closet },
  { i: 2, tagKey: "p3Tag", titleKey: "p3Title", img: IMG.bath },
  { i: 3, tagKey: "p4Tag", titleKey: "p4Title", img: IMG.proj4 },
  { i: 4, tagKey: "p5Tag", titleKey: "p5Title", img: IMG.kitchenWood },
  { i: 5, tagKey: "p6Tag", titleKey: "p6Title", img: IMG.proj6, focus: FOCUS.proj6 },
  { i: 6, tagKey: "p7Tag", titleKey: "p7Title", img: IMG.interiorEmpty },
  { i: 7, tagKey: "p8Tag", titleKey: "p8Title", img: IMG.kitchenDining },
  { i: 8, tagKey: "p9Tag", titleKey: "p9Title", img: IMG.closet },
] as const;

/** Hero + the two secondary shots shown inside each project detail view. */
export const SHOTS = [
  { hero: IMG.kitchenOnyx, shots: [IMG.kitchenDining, IMG.kitchenWood] },
  { hero: IMG.closet, shots: [IMG.kitchenDark, IMG.bath] },
  { hero: IMG.bath, shots: [IMG.closet, IMG.kitchenDark] },
  { hero: IMG.proj4, shots: [IMG.kitchenOnyx, IMG.kitchenWood] },
  { hero: IMG.kitchenWood, shots: [IMG.kitchenDining, IMG.closet] },
  { hero: IMG.proj6, shots: [IMG.bath, IMG.kitchenOnyx] },
  { hero: IMG.interiorEmpty, shots: [IMG.kitchenWood, IMG.closet] },
  { hero: IMG.kitchenDining, shots: [IMG.kitchenWood, IMG.kitchenDark] },
  { hero: IMG.closet, shots: [IMG.interiorEmpty, IMG.kitchenWood] },
] as const;

type DetailEntry = {
  summary: string;
  paras: string[];
  meta: [string, string][];
  captions: string[];
};

export const DETAIL: Record<Lang, DetailEntry[]> = {
  en: [
    {
      summary:
        "A walnut kitchen built around a single backlit onyx panel, with the island and hood drawn as one continuous line.",
      paras: [
        "The client wanted the stone to be the only ornament in the room, so every cabinet front was kept flat and handleless and the lighting was buried in the millwork.",
        "Countertops, backsplash and island end panel come from the same slab, cut and bookmatched in our shop before installation.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Walnut, backlit onyx"], ["Duration", "7 weeks"]],
      captions: [
        "The island seats three without breaking the run of the counter.",
        "Warm strip lighting runs behind every open shelf.",
      ],
    },
    {
      summary:
        "A walk-in closet in glass and warm wood, lit shelf by shelf so the room reads like a display case.",
      paras: [
        "Every module was built to the exact ceiling height, so there is no filler panel anywhere in the room.",
        "Smoked glass doors keep the dust out while leaving the contents visible, which was the whole point for this client.",
      ],
      meta: [["Scope", "Walk-in closet"], ["Materials", "Walnut, smoked glass"], ["Duration", "5 weeks"]],
      captions: [
        "Each vertical bay has its own dimmable strip.",
        "The island doubles as drawer storage and a packing surface.",
      ],
    },
    {
      summary:
        "A primary bathroom in dark veined marble, with a backlit mirror and a vanity that runs into the dressing area.",
      paras: [
        "The shower, vanity wall and dressing area were treated as one continuous surface so the room feels larger than its footprint.",
        "All plumbing was rerouted to keep the stone joints symmetrical around the mirror.",
      ],
      meta: [["Scope", "Primary bath"], ["Materials", "Marble, walnut, brass"], ["Duration", "6 weeks"]],
      captions: [
        "The dressing area continues the same cabinetry line.",
        "Matte black fixtures against the veined stone.",
      ],
    },
    {
      summary:
        "An open kitchen and dining room for a family that cooks and entertains in the same space.",
      paras: [
        "We removed the wall between kitchen and dining and rebuilt the ceiling line so the lighting could run the full length of the room.",
        "The bar counter was set at a height that works for both stools and prep, which took two rounds of drawings to get right.",
      ],
      meta: [["Scope", "Kitchen + dining"], ["Materials", "Oak, quartzite"], ["Duration", "9 weeks"]],
      captions: [
        "The dining table sits directly off the counter run.",
        "Storage was pushed to full height to free the floor.",
      ],
    },
    {
      summary:
        "Floor-to-ceiling wall panelling in walnut, wrapping the kitchen, the pantry doors and the appliance wall.",
      paras: [
        "Appliances, pantry and doorways all disappear into the same panel rhythm, so the room reads as one built object.",
        "Panels were fabricated in our shop and installed in two days to keep the household running.",
      ],
      meta: [["Scope", "Millwork"], ["Materials", "Walnut veneer"], ["Duration", "4 weeks"]],
      captions: [
        "The rounded island softens the panelled walls.",
        "Glass-front bays break up the run without adding hardware.",
      ],
    },
    {
      summary:
        "A matte black kitchen with a marble island, built for a client who wanted the room to disappear at night.",
      paras: [
        "Cabinet fronts are matte lacquer with no visible hardware; the only reflective surfaces in the room are the stone and the glassware.",
        "The island was sized to seat five and still leave a full working aisle behind it.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Matte lacquer, marble"], ["Duration", "8 weeks"]],
      captions: [
        "Backlit shelving is the only light source after dark.",
        "The wine wall was integrated into the cabinetry run.",
      ],
    },
    {
      summary:
        "A full apartment remodel taken back to the shell: floors, walls, doors and finishes replaced throughout.",
      paras: [
        "We replaced every floor, squared the openings and rebuilt the baseboards so the new millwork would sit flush.",
        "The finish work — walls, doors and paint — is what makes an empty room feel finished before a single piece of furniture arrives.",
      ],
      meta: [["Scope", "Full interior"], ["Materials", "Engineered oak, paint"], ["Duration", "10 weeks"]],
      captions: [
        "New flooring runs unbroken through every room.",
        "Openings were squared before the joinery went in.",
      ],
    },
    {
      summary:
        "A living room built around a panelled TV wall, with the media unit, storage and lighting drawn as one piece.",
      paras: [
        "Every cable, speaker and outlet was planned before fabrication, so nothing is visible once the wall is closed.",
        "The panel rhythm continues past the TV into the storage bays, which keeps the wall reading as joinery rather than furniture.",
      ],
      meta: [["Scope", "Living room"], ["Materials", "Walnut veneer, lacquer"], ["Duration", "5 weeks"]],
      captions: [
        "Backlighting washes the panelling from behind the unit.",
        "Closed bays hide the media equipment.",
      ],
    },
    {
      summary:
        "An entry hall lined in wood panelling, with a bench, concealed coat storage and a stone floor run through to the living area.",
      paras: [
        "The hall was the last room in the remodel, so the panelling had to pick up the exact lines of the joinery already installed elsewhere.",
        "Coat storage sits behind two of the panels, with no handles and no visible break in the run.",
      ],
      meta: [["Scope", "Entry hall"], ["Materials", "Oak panelling, stone"], ["Duration", "4 weeks"]],
      captions: [
        "The bench is cantilevered off the panelling.",
        "Floor stone continues into the living area.",
      ],
    },
  ],
  es: [
    {
      summary:
        "Una cocina en nogal construida alrededor de un solo panel de ónix retroiluminado, con la isla y la campana dibujadas como una línea continua.",
      paras: [
        "El cliente quería que la piedra fuera el único ornamento del espacio, así que todos los frentes se dejaron planos y sin tiradores, y la iluminación se ocultó dentro de la carpintería.",
        "Encimeras, salpicadero y el lateral de la isla salen de la misma plancha, cortada y espejada en nuestro taller antes de instalarla.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Nogal, ónix retroiluminado"], ["Duración", "7 semanas"]],
      captions: [
        "La isla sienta a tres personas sin romper la línea de la encimera.",
        "Una tira de luz cálida recorre cada estante abierto.",
      ],
    },
    {
      summary:
        "Un walk-in closet en cristal y madera cálida, iluminado estante por estante para que el espacio se lea como una vitrina.",
      paras: [
        "Cada módulo se fabricó a la altura exacta del techo, así que no hay ni un panel de relleno en toda la habitación.",
        "Las puertas en cristal ahumado dejan fuera el polvo y mantienen el contenido a la vista, que era justo lo que pedía el cliente.",
      ],
      meta: [["Alcance", "Walk-in closet"], ["Materiales", "Nogal, cristal ahumado"], ["Duración", "5 semanas"]],
      captions: [
        "Cada cuerpo vertical tiene su propia tira regulable.",
        "La isla suma cajones y una superficie para preparar la ropa.",
      ],
    },
    {
      summary:
        "Un baño principal en mármol oscuro veteado, con espejo retroiluminado y un mueble que se prolonga hasta el vestidor.",
      paras: [
        "La ducha, la pared del lavabo y el vestidor se trataron como una sola superficie continua, y el espacio se percibe más grande de lo que es.",
        "Se reubicó toda la fontanería para mantener las juntas de piedra simétricas respecto al espejo.",
      ],
      meta: [["Alcance", "Baño principal"], ["Materiales", "Mármol, nogal, latón"], ["Duración", "6 semanas"]],
      captions: [
        "El vestidor continúa la misma línea de carpintería.",
        "Grifería en negro mate contra la piedra veteada.",
      ],
    },
    {
      summary:
        "Cocina y comedor en un solo espacio abierto para una familia que cocina y recibe en el mismo sitio.",
      paras: [
        "Quitamos el muro entre cocina y comedor y rehicimos la línea de techo para que la luminaria pudiera recorrer todo el largo.",
        "La barra se fijó a una altura que funciona para taburetes y para trabajar; hicieron falta dos rondas de planos para acertar.",
      ],
      meta: [["Alcance", "Cocina y comedor"], ["Materiales", "Roble, cuarcita"], ["Duración", "9 semanas"]],
      captions: [
        "La mesa arranca justo donde termina la encimera.",
        "El almacenaje se llevó a altura completa para liberar el suelo.",
      ],
    },
    {
      summary:
        "Panelado de pared de piso a techo en nogal, envolviendo la cocina, las puertas de la despensa y el frente de electrodomésticos.",
      paras: [
        "Electrodomésticos, despensa y puertas desaparecen dentro del mismo ritmo de paneles, y el espacio se lee como una sola pieza construida.",
        "Los paneles se fabricaron en nuestro taller y se instalaron en dos días para no parar la vida de la casa.",
      ],
      meta: [["Alcance", "Carpintería"], ["Materiales", "Chapa de nogal"], ["Duración", "4 semanas"]],
      captions: [
        "La isla redondeada suaviza las paredes paneladas.",
        "Los cuerpos con frente de cristal rompen la línea sin añadir herrajes.",
      ],
    },
    {
      summary:
        "Una cocina en negro mate con isla de mármol, para un cliente que quería que el espacio desapareciera de noche.",
      paras: [
        "Los frentes son laca mate sin herraje visible; las únicas superficies reflectantes del espacio son la piedra y la cristalería.",
        "La isla se dimensionó para sentar a cinco y dejar aun así un pasillo de trabajo completo por detrás.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Laca mate, mármol"], ["Duración", "8 semanas"]],
      captions: [
        "La estantería retroiluminada es la única luz al caer la noche.",
        "La vinoteca se integró dentro de la línea de armarios.",
      ],
    },
    {
      summary:
        "Remodelación completa de apartamento llevada hasta la obra gris: pisos, paredes, puertas y acabados renovados por completo.",
      paras: [
        "Cambiamos todos los pisos, escuadramos los vanos y rehicimos los rodapiés para que la nueva carpintería asentara a ras.",
        "El acabado —paredes, puertas y pintura— es lo que hace que una habitación vacía se vea terminada antes de que entre un solo mueble.",
      ],
      meta: [["Alcance", "Interior completo"], ["Materiales", "Roble laminado, pintura"], ["Duración", "10 semanas"]],
      captions: [
        "El piso corre sin interrupción por todas las habitaciones.",
        "Los vanos se escuadraron antes de montar la carpintería.",
      ],
    },
    {
      summary:
        "Una sala construida alrededor de un TV wall panelado, con el mueble, el almacenaje y la iluminación dibujados como una sola pieza.",
      paras: [
        "Cada cable, altavoz y toma se planificó antes de fabricar, así que nada queda a la vista cuando se cierra la pared.",
        "El ritmo de paneles continúa más allá del televisor hacia los cuerpos de almacenaje, y la pared se lee como carpintería, no como mueble.",
      ],
      meta: [["Alcance", "Sala"], ["Materiales", "Chapa de nogal, laca"], ["Duración", "5 semanas"]],
      captions: [
        "La luz indirecta lava el panelado desde detrás del mueble.",
        "Los cuerpos cerrados esconden el equipo audiovisual.",
      ],
    },
    {
      summary:
        "Un recibidor revestido en panelado de madera, con banco, almacenaje oculto para abrigos y un piso de piedra que continúa hasta la sala.",
      paras: [
        "El recibidor fue la última pieza de la remodelación, así que el panelado tuvo que recoger las líneas exactas de la carpintería ya instalada.",
        "El almacenaje para abrigos queda detrás de dos de los paneles, sin tiradores y sin ninguna interrupción visible en la línea.",
      ],
      meta: [["Alcance", "Recibidor"], ["Materiales", "Panelado en roble, piedra"], ["Duración", "4 semanas"]],
      captions: [
        "El banco está en voladizo desde el panelado.",
        "La piedra del piso continúa hacia la sala.",
      ],
    },
  ],
};
