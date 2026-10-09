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
    matIntroBath:
      "Every surface in a RE-LUX project is specified with the client. Tap the render to see what each one is made of.",
    matWood: "Wood",
    matWalnut: "Walnut",
    matMarble: "Marble",
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
    p1Title: "Liz Kitchen",
    p2Tag: "Closets",
    p2Title: "Walk-in closet in graphite and walnut",
    p3Tag: "Bathrooms",
    p3Title: "Primary bath in walnut and onyx",
    p4Tag: "Kitchens",
    p4Title: "Walnut kitchen with quartzite island",
    p5Tag: "Commercial",
    p5Title: "Crystal Luxe Wellness Center",
    p6Tag: "Kitchens",
    p6Title: "Matte black kitchen with island",
    p7Tag: "Closets",
    p7Title: "Walk-in closet in white and gold",
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
    procBtn: "Process",

    pxTitle: "OUR",
    pxTitleEm: "PROCESS",
    pxIntro:
      "Kitchens, closets and wall panels are cut and assembled in our own shop in Miami, on the same equipment, by the same team that installs them.",
    mKicker: "Equipment",
    mP1: "Every cabinet and panel starts on our Biesse Rover Multi Up NG S 1531, a CNC machining centre that cuts, drills and edges each part from the digital drawing you approved.",
    mP2: "Working straight from the file removes hand measurements from the process. Parts come off the machine ready to assemble, and the fit on site matches the drawing.",
    mSpecK1: "Machine",
    mSpecV1: "Biesse Rover Multi Up NG S 1531",
    mSpecK2: "Type",
    mSpecV2: "CNC machining centre",
    mSpecK3: "Work",
    mSpecV3: "Cutting, drilling, routing",
    mSpecK4: "Used for",
    mSpecV4: "Kitchens, closets, wall panels",
    shopKicker: "Workshop",
    shopTitle: "Where it gets built",
    shopIntro:
      "Materials arrive, get cut, assembled and checked here before they reach your home. Nothing leaves the shop until it matches the drawing.",
    shopCap1: "Panels ready for machining.",
    shopCap2: "Assembly bench.",
    shopCap3: "Edge and finish check.",
    shopCap4: "Cabinet boxes before installation.",
    shopCap5: "Hardware and fittings.",
    shopCap6: "Parts labelled by project.",
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

    baTitle: "Before & After",
    baHint: "Drag to compare",
    baBefore: "Before",
    baAfter: "After",
    vidTitle: "Project video",
    vidPending: "Video coming soon",
    menuOpen: "Menu",
    menuClose: "Close",

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
    matIntroBath:
      "Cada superficie de un proyecto RE-LUX se especifica junto al cliente. Toca el render para ver de qu\u00e9 est\u00e1 hecha cada una.",
    matWood: "Madera",
    matWalnut: "Nogal",
    matMarble: "M\u00e1rmol",
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
    p1Title: "Liz Kitchen",
    p2Tag: "Closets",
    p2Title: "Walk-in closet en grafito y nogal",
    p3Tag: "Baños",
    p3Title: "Baño principal en nogal y ónix",
    p4Tag: "Cocinas",
    p4Title: "Cocina en nogal con isla de cuarcita",
    p5Tag: "Comercial",
    p5Title: "Crystal Luxe Wellness Center",
    p6Tag: "Cocinas",
    p6Title: "Cocina en negro mate con isla",
    p7Tag: "Closets",
    p7Title: "Walk-in closet en blanco y dorado",
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
    procBtn: "Proceso",

    pxTitle: "NUESTRO",
    pxTitleEm: "PROCESO",
    pxIntro:
      "Cocinas, closets y paneles se cortan y montan en nuestro propio taller en Miami, con el mismo equipo y las mismas personas que después los instalan.",
    mKicker: "Equipo",
    mP1: "Cada mueble y cada panel empieza en nuestra Biesse Rover Multi Up NG S 1531, un centro de mecanizado CNC que corta, taladra y cantea cada pieza a partir del plano digital que aprobaste.",
    mP2: "Trabajar directamente desde el archivo elimina las medidas a mano. Las piezas salen de la máquina listas para montar, y en obra encajan tal como en el plano.",
    mSpecK1: "Máquina",
    mSpecV1: "Biesse Rover Multi Up NG S 1531",
    mSpecK2: "Tipo",
    mSpecV2: "Centro de mecanizado CNC",
    mSpecK3: "Trabajo",
    mSpecV3: "Corte, taladrado, fresado",
    mSpecK4: "Uso",
    mSpecV4: "Cocinas, closets, wall panels",
    shopKicker: "Taller",
    shopTitle: "Donde se construye",
    shopIntro:
      "Aquí llegan los materiales, se cortan, se montan y se revisan antes de llegar a tu casa. Nada sale del taller hasta que coincide con el plano.",
    shopCap1: "Paneles listos para mecanizar.",
    shopCap2: "Banco de montaje.",
    shopCap3: "Revisión de cantos y acabados.",
    shopCap4: "Cascos de mueble antes de instalar.",
    shopCap5: "Herrajes y accesorios.",
    shopCap6: "Piezas etiquetadas por proyecto.",
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

    baTitle: "Antes y Después",
    baHint: "Arrastra para comparar",
    baBefore: "Antes",
    baAfter: "Después",
    vidTitle: "Vídeo del proyecto",
    vidPending: "Vídeo próximamente",
    menuOpen: "Menú",
    menuClose: "Cerrar",

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
 * therefore override that `src` wherever both exist (proj-6,
 * process-band, cta-band). Slots the author panned carry an `objectPosition`,
 * translated from the slot's stored offset.
 */
const IMG = {
  kitchenOnyx: "/assets/kitchen-onyx.webp",
  /** "Liz Kitchen", the first project: hero plus five detail shots. */
  liz: [1, 2, 3, 4, 5, 6].map((n) => `/assets/liz-${n}.webp`),
  /** Projects 2–5, numbered as the design's photo files. */
  closet2: [1, 2, 3, 4, 5].map((n) => `/assets/wc-${n}.webp`),
  bath2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => `/assets/bath2-${n}.webp`),
  kitchen3: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/k3-${n}.webp`),
  crystalLuxe: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/cl-${n}.webp`),
  /** Project 7, the white and gold walk-in closet. */
  goldCloset: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => `/assets/gw-${n}.webp`),
  closet: "/assets/closet.webp",
  bath: "/assets/bath.webp",
  kitchenDining: "/assets/kitchen-dining.webp",
  kitchenWood: "/assets/kitchen-wood.webp",
  kitchenDark: "/assets/kitchen-dark.webp",
  interiorEmpty: "/assets/interior-empty.webp",
  materialKitchen: "/assets/material-kitchen.webp",
  /** Portrait render the Materials section swaps to on phones. */
  materialBath: "/assets/material-bath.webp",

  proj6: "/assets/proj-6.webp",
  processBand: "/assets/process-band.webp",
  ctaBand: "/assets/cta-band.webp",
  owners: "/assets/relux-owners.webp",
  ownersWide: "/assets/relux-owners-wide.webp",
  founder1: "/assets/relux-founder-1.webp",
  founder2: "/assets/relux-founder-2.webp",
  /** Process view: a render of the CNC (stands in for the machine video) and two details. */
  machineHero: "/assets/machine-hero.webp",
  machine: ["/assets/machine-1.webp", "/assets/machine-2.webp"],
} as const;

/** Crops the design's author set by panning the image inside its slot. */
export const FOCUS = {
  proj6: "62% center",
  processBand: "center bottom",
  ctaBand: "center 72%",
  ownersWide: "center center",
  /** The design pans the first founder's portrait slightly up inside its frame. */
  founder1: "center 45%",
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

/** Process view: the machine spec rows and the six workshop shots. */
export const MACHINE_SPECS = [
  { k: "mSpecK1", v: "mSpecV1" },
  { k: "mSpecK2", v: "mSpecV2" },
  { k: "mSpecK3", v: "mSpecV3" },
  { k: "mSpecK4", v: "mSpecV4" },
] as const;

/**
 * The design leaves every workshop slot empty, so `img` is unset and the
 * frame shows its tonal placeholder. `tall` cells are 4:5, the rest 4:3.
 */
export const SHOP: { capKey: CopyKey; tall: boolean; img?: string }[] = [
  { capKey: "shopCap1", tall: true },
  { capKey: "shopCap2", tall: false },
  { capKey: "shopCap3", tall: false },
  { capKey: "shopCap4", tall: true },
  { capKey: "shopCap5", tall: false },
  { capKey: "shopCap6", tall: false },
];

export const VALUES = [
  { n: "01", titleKey: "v1Title", descKey: "v1Desc" },
  { n: "02", titleKey: "v2Title", descKey: "v2Desc" },
  { n: "03", titleKey: "v3Title", descKey: "v3Desc" },
] as const;

/**
 * Every project with a detail view. Project 8 keeps its slot so the indices
 * still line up with SHOTS and DETAIL, but the design no longer lists it
 * anywhere — see WORK and FEATURED below.
 */
export const PROJECTS = [
  { i: 0, tagKey: "p1Tag", titleKey: "p1Title", img: IMG.liz[0] },
  { i: 1, tagKey: "p2Tag", titleKey: "p2Title", img: IMG.closet2[0] },
  { i: 2, tagKey: "p3Tag", titleKey: "p3Title", img: IMG.bath2[2] },
  { i: 3, tagKey: "p4Tag", titleKey: "p4Title", img: IMG.kitchen3[4] },
  { i: 4, tagKey: "p5Tag", titleKey: "p5Title", img: IMG.crystalLuxe[0] },
  { i: 5, tagKey: "p6Tag", titleKey: "p6Title", img: IMG.proj6, focus: FOCUS.proj6 },
  { i: 6, tagKey: "p7Tag", titleKey: "p7Title", img: IMG.goldCloset[4] },
  { i: 7, tagKey: "p8Tag", titleKey: "p8Title", img: IMG.kitchenDining },
  { i: 8, tagKey: "p9Tag", titleKey: "p9Title", img: IMG.closet },
] as const;

/** The "Our work" view lists every project except 8. */
export const WORK = PROJECTS.filter((p) => p.i !== 7);

/** The homepage shows six: projects 1–5 and 7, which uses a different photo there. */
export const FEATURED = [...PROJECTS.slice(0, 5), { ...PROJECTS[6], img: IMG.goldCloset[6] }];

/**
 * Hero + the secondary shots shown inside each project detail view.
 *
 * Every detail has a video row: the vertical video (or its "coming soon"
 * frame while `video` is unset) beside two photos. Those two are `side` when
 * given; otherwise the first two `shots` move there and the grid below starts
 * at the third, together with its caption. `tall` lists grid positions shown
 * as 2:3 portraits instead of 3:2. `before` turns on the before/after slider;
 * the design has the slot for Liz Kitchen but no photo in it yet, so no
 * project sets it.
 */
export type ProjectShots = {
  hero: string;
  shots: string[];
  side?: [string, string];
  tall?: number[];
  video?: string;
  before?: string;
};

const pick = (set: string[], ...n: number[]) => n.map((k) => set[k - 1]);

export const SHOTS: ProjectShots[] = [
  { hero: IMG.liz[0], shots: IMG.liz.slice(1) },
  {
    hero: IMG.closet2[0],
    side: [IMG.closet2[1], IMG.closet2[3]],
    shots: pick(IMG.closet2, 3, 5),
    tall: [0, 1],
  },
  { hero: IMG.bath2[2], shots: pick(IMG.bath2, 2, 6, 7, 8, 9, 10, 4, 1, 5, 11) },
  { hero: IMG.kitchen3[4], shots: pick(IMG.kitchen3, 3, 1, 6, 4, 2, 7) },
  {
    hero: IMG.crystalLuxe[0],
    side: [IMG.crystalLuxe[1], IMG.crystalLuxe[3]],
    shots: pick(IMG.crystalLuxe, 3, 5, 6, 7),
    tall: [0, 1, 2, 3],
  },
  { hero: IMG.proj6, shots: [IMG.bath, IMG.kitchenOnyx] },
  {
    hero: IMG.goldCloset[4],
    side: [IMG.goldCloset[5], IMG.goldCloset[7]],
    shots: pick(IMG.goldCloset, 2, 4, 10, 3, 1, 9, 11, 7),
    tall: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  { hero: IMG.kitchenDining, shots: [IMG.kitchenWood, IMG.kitchenDark] },
  { hero: IMG.closet, shots: [IMG.interiorEmpty, IMG.kitchenWood] },
];

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
        "A family kitchen in Miami built around a walnut wall, a quartzite waterfall island and a run of glass display cabinets over a strip window to the garden.",
      paras: [
        "The full left wall is floor-to-ceiling walnut, with the double oven and the refrigerator set flush into the same panel rhythm so the appliances read as part of the joinery.",
        "Taj Mahal quartzite runs up the backsplash and down both ends of the island. The island and base cabinets are finished in a soft cashmere tone, and a long horizontal window under the glass cabinets brings the garden into the room.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Walnut, Taj Mahal quartzite, cashmere lacquer"], ["Location", "Miami, FL"]],
      captions: [
        "Walnut tall wall with the double oven and refrigerator set flush.",
        "Cashmere base cabinets under the quartzite counter, with the strip window to the garden.",
        "The island from the side, with the quartzite waterfall and the alabaster pendant.",
        "Same view in evening light, with the ceiling cove and cabinet lighting on.",
        "Detail of the island, the glass cabinets and the backlit shelving.",
      ],
    },
    {
      summary:
        "A walk-in closet in graphite wood with vertical LED lines, a walnut island with a mirrored glass top and a sculptural pendant light overhead.",
      paras: [
        "Every hanging bay is framed by a recessed vertical LED strip, so the light runs the full height of the room and turns the graphite panels into a quiet backdrop for the clothes.",
        "The island is built in walnut with deep drawers on every side and two mirrored glass inserts in the top, cut to the same line as the drawer fronts. A walnut section of wardrobe with drawers closes the room on one side.",
      ],
      meta: [["Scope", "Walk-in closet"], ["Materials", "Graphite wood, walnut, mirrored glass"], ["Location", "Miami, FL"]],
      captions: [
        "The mirrored glass top set into the walnut island.",
        "The island, the pendant and the lit graphite bays.",
      ],
    },
    {
      summary:
        "A primary bathroom built as one piece of walnut joinery: a lit ceiling frame, three backlit mirrors, onyx vessel sinks and glass-front cabinets at both ends.",
      paras: [
        "The vanity wall is framed in walnut with LED channels cut into the ceiling panel, so the light follows the line of the joinery instead of coming from fixtures. The counter steps down in two levels and floats over a lit toe-kick.",
        "The walk-in shower is clad floor to ceiling in large-format onyx-look porcelain, with a lit niche running the full length of the wall, a brushed-brass ceiling rain head and a thermostatic column.",
      ],
      meta: [["Scope", "Primary bathroom"], ["Materials", "Walnut, onyx, brushed brass"], ["Location", "Miami, FL"]],
      captions: [
        "The vanity with the armchair and the shower behind the glass.",
        "Onyx vessel sink and brushed-brass faucet.",
        "Three backlit mirrors along the stone wall.",
        "Walk-in shower with a lit niche along the full wall.",
        "Ceiling rain head and brass shower column.",
        "From the shower towards the vanity.",
        "Shower, toilet and the single vanity by the entrance.",
        "Glass-front cabinet with lit shelves beside the vanity.",
        "The full run of cabinetry from the corner.",
        "The dressing area and vanity from the armchair.",
      ],
    },
    {
      summary:
        "An open kitchen built around a quartzite island with a folded waterfall edge, a matching stone hood and a full wall of walnut tall units.",
      paras: [
        "The island, hood and backsplash are cut from the same light quartzite, so the stone reads as one piece from the hood down to the angled leg of the island. Warm LED strips run under the island overhang and every wall cabinet.",
        "The walnut wall hides the refrigerator behind flush panels and frames the double oven and a lit glass display column. A second walnut column with open corner shelves divides the kitchen from the wine wall and the living room.",
      ],
      meta: [["Scope", "Kitchen + wine wall"], ["Materials", "Walnut, quartzite, glass"], ["Location", "Miami, FL"]],
      captions: [
        "The wine wall and walnut columns leading into the kitchen.",
        "The island and stone hood against the walnut wall.",
        "The island from the end, with the tall walnut units and lit glass column.",
        "Stools under the lit overhang of the island.",
        "The walnut column with open corner shelves and the waterfall counter.",
        "Lit walnut shelving between the living room and the kitchen.",
      ],
    },
    {
      summary:
        "Reception and waiting area for a wellness center in Miami, designed around a feature wall in oak with deep teal niches and the backlit brand logo at its centre.",
      paras: [
        "The feature wall is built as staggered oak modules with recessed LED strips, open display niches and teal back panels that frame the logo. The reception desk repeats the same oak with a curved end panel and a teal counter.",
        "Across the room, a second run of oak joinery holds lit open shelving, a low cabinet with bronze-framed glass doors and a wall panel for the screen, with lounge seating for clients in between.",
      ],
      meta: [["Scope", "Reception + waiting area"], ["Materials", "Oak laminate, teal lacquer, bronze glass"], ["Location", "Miami, FL"]],
      captions: [
        "Backlit logo set into the oak panel.",
        "The owner at the feature wall.",
        "Oak niches and teal panels around the logo.",
        "The owners in front of the lit shelving and glass cabinet.",
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
        "A walk-in closet lined wall to wall with gold-framed glass cabinets, built around a white island with a stone top and gold pulls.",
      paras: [
        "Every hanging bay sits behind a clear glass door in a brushed gold frame, with a vertical LED strip on each side so the clothes are lit from the edges and nothing casts a shadow.",
        "The white island carries deep drawers on both faces and a polished stone top. A second, lower run of glass display cabinets holds shoes along one side, and the walnut floor runs through the whole room.",
      ],
      meta: [["Scope", "Walk-in closet"], ["Materials", "Glass, brushed gold, white lacquer, stone"], ["Location", "Miami, FL"]],
      captions: [
        "The owners in front of the shelving and hanging bays.",
        "The owners in the corner of the closet.",
        "The owners between the glass cabinets.",
        "Leaning on the white island, with the glass bays behind.",
        "Choosing a jacket in front of the lit hanging bays.",
        "The sculpture on the stone top of the island.",
        "The island drawers with gold pulls and the walnut floor.",
        "The island and the hanging bays in warm evening light.",
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
        "Una cocina familiar en Miami construida alrededor de una pared de nogal, una isla en cascada de cuarcita y una fila de vitrinas de cristal sobre una ventana corrida al jardín.",
      paras: [
        "Toda la pared izquierda es nogal de piso a techo, con el horno doble y el refrigerador empotrados en el mismo ritmo de paneles para que los electrodomésticos se lean como parte de la carpintería.",
        "La cuarcita Taj Mahal sube por el salpicadero y baja por ambos extremos de la isla. La isla y los muebles bajos van en un tono cashmere suave, y una ventana horizontal bajo las vitrinas trae el jardín a la cocina.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Nogal, cuarcita Taj Mahal, laca cashmere"], ["Ubicación", "Miami, FL"]],
      captions: [
        "Pared alta de nogal con el horno doble y el refrigerador empotrados.",
        "Muebles bajos cashmere bajo la encimera de cuarcita, con la ventana corrida al jardín.",
        "La isla de lado, con la cascada de cuarcita y la lámpara de alabastro.",
        "La misma vista con luz de tarde, con la moldura del techo y las vitrinas encendidas.",
        "Detalle de la isla, las vitrinas de cristal y los estantes retroiluminados.",
      ],
    },
    {
      summary:
        "Un walk-in closet en madera grafito con líneas LED verticales, una isla de nogal con cubierta de cristal espejado y una lámpara escultórica colgante.",
      paras: [
        "Cada cuerpo de colgar va enmarcado por una tira LED vertical empotrada, así la luz recorre toda la altura del cuarto y los paneles grafito quedan como un fondo tranquilo para la ropa.",
        "La isla está construida en nogal con cajones profundos por todos los lados y dos insertos de cristal espejado en la cubierta, cortados en la misma línea que los frentes. Un tramo de armario en nogal con cajones cierra el cuarto por un lado.",
      ],
      meta: [["Alcance", "Walk-in closet"], ["Materiales", "Madera grafito, nogal, cristal espejado"], ["Ubicación", "Miami, FL"]],
      captions: [
        "La cubierta de cristal espejado integrada en la isla de nogal.",
        "La isla, la lámpara y los cuerpos grafito iluminados.",
      ],
    },
    {
      summary:
        "Un baño principal construido como una sola pieza de carpintería en nogal: marco de techo iluminado, tres espejos retroiluminados, lavabos de ónix y vitrinas de cristal a ambos lados.",
      paras: [
        "La pared del lavabo va enmarcada en nogal con canales LED cortados en el panel del techo, así la luz sigue la línea de la carpintería en lugar de salir de lámparas. La encimera baja en dos niveles y flota sobre un zócalo iluminado.",
        "La ducha walk-in va revestida de piso a techo en porcelánico gran formato efecto ónix, con un nicho iluminado a lo largo de toda la pared, rociador de techo en latón cepillado y columna termostática.",
      ],
      meta: [["Alcance", "Baño principal"], ["Materiales", "Nogal, ónix, latón cepillado"], ["Ubicación", "Miami, FL"]],
      captions: [
        "El mueble del lavabo con el sillón y la ducha tras el cristal.",
        "Lavabo de ónix y grifería en latón cepillado.",
        "Tres espejos retroiluminados sobre la pared de piedra.",
        "Ducha walk-in con nicho iluminado a lo largo de la pared.",
        "Rociador de techo y columna de ducha en latón.",
        "Desde la ducha hacia el lavabo.",
        "Ducha, inodoro y el lavabo individual junto a la entrada.",
        "Vitrina de cristal con estantes iluminados junto al lavabo.",
        "Todo el frente de carpintería desde la esquina.",
        "La zona de vestidor y lavabo desde el sillón.",
      ],
    },
    {
      summary:
        "Una cocina abierta construida alrededor de una isla de cuarcita con canto en cascada plegado, una campana en la misma piedra y una pared completa de muebles altos en nogal.",
      paras: [
        "La isla, la campana y el salpicadero salen de la misma cuarcita clara, así la piedra se lee como una sola pieza desde la campana hasta la pata inclinada de la isla. Tiras LED cálidas recorren el voladizo de la isla y todos los muebles de pared.",
        "La pared de nogal oculta el refrigerador tras paneles enrasados y enmarca el horno doble y una vitrina de cristal iluminada. Una segunda columna de nogal con estantes de esquina abiertos separa la cocina de la pared de vinos y del salón.",
      ],
      meta: [["Alcance", "Cocina y pared de vinos"], ["Materiales", "Nogal, cuarcita, cristal"], ["Ubicación", "Miami, FL"]],
      captions: [
        "La pared de vinos y las columnas de nogal que llevan a la cocina.",
        "La isla y la campana de piedra frente a la pared de nogal.",
        "La isla desde el extremo, con los muebles altos de nogal y la vitrina iluminada.",
        "Taburetes bajo el voladizo iluminado de la isla.",
        "La columna de nogal con estantes de esquina y la encimera en cascada.",
        "Estantería de nogal iluminada entre el salón y la cocina.",
      ],
    },
    {
      summary:
        "Recepción y sala de espera para un wellness center en Miami, diseñadas alrededor de una pared protagonista en roble con nichos en verde petróleo y el logo retroiluminado en el centro.",
      paras: [
        "La pared se construyó con módulos de roble escalonados, tiras LED empotradas, nichos abiertos de exhibición y fondos en verde petróleo que enmarcan el logo. El mostrador de recepción repite el mismo roble con un lateral curvo y una encimera en verde petróleo.",
        "Al otro lado, una segunda pared de carpintería en roble reúne estantes abiertos iluminados, un mueble bajo con puertas de cristal enmarcadas en bronce y un panel para la pantalla, con zona de espera para los clientes.",
      ],
      meta: [["Alcance", "Recepción y sala de espera"], ["Materiales", "Laminado roble, laca verde petróleo, cristal bronce"], ["Ubicación", "Miami, FL"]],
      captions: [
        "Logo retroiluminado integrado en el panel de roble.",
        "La dueña frente a la pared protagonista.",
        "Nichos de roble y paneles en verde petróleo alrededor del logo.",
        "Los dueños frente a los estantes iluminados y la vitrina de cristal.",
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
        "Un walk-in closet revestido de pared a pared con vitrinas de cristal y marco dorado, construido alrededor de una isla blanca con cubierta de piedra y tiradores dorados.",
      paras: [
        "Cada cuerpo de colgar queda detrás de una puerta de cristal transparente con marco dorado cepillado, con una tira LED vertical a cada lado para que la ropa se ilumine desde los bordes y nada proyecte sombra.",
        "La isla blanca lleva cajones profundos en ambas caras y una cubierta de piedra pulida. Una segunda fila de vitrinas más bajas guarda los zapatos en un lateral, y el piso de nogal recorre todo el cuarto.",
      ],
      meta: [["Alcance", "Walk-in closet"], ["Materiales", "Cristal, dorado cepillado, laca blanca, piedra"], ["Ubicación", "Miami, FL"]],
      captions: [
        "Los dueños frente a las repisas y los cuerpos de colgar.",
        "Los dueños en la esquina del closet.",
        "Los dueños entre las vitrinas de cristal.",
        "Apoyado en la isla blanca, con las vitrinas detrás.",
        "Eligiendo una chaqueta frente a los cuerpos iluminados.",
        "La escultura sobre la cubierta de piedra de la isla.",
        "Los cajones de la isla con tiradores dorados y el piso de nogal.",
        "La isla y los cuerpos de colgar con luz cálida de tarde.",
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
