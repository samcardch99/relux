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
    p10Tag: "Bathrooms",
    p10Title: "Bathroom in black marble and walnut",
    p11Tag: "Kitchens",
    p11Title: "Walnut kitchen with black granite",
    p12Tag: "Commercial",
    p12Title: "Beauty academy",
    p13Tag: "Commercial",
    p13Title: "EnvySky office reception",
    p14Tag: "Bathrooms",
    p14Title: "Bathroom in grey stone and oak",
    p15Tag: "Kitchens",
    p15Title: "Grey and dark wood kitchen",
    p16Tag: "Kitchens",
    p16Title: "Kitchen with a black marble floor",
    p17Tag: "Kitchens",
    p17Title: "Oak kitchen with two islands",
    p18Tag: "Kitchens",
    p18Title: "White and light oak kitchen",
    p19Tag: "Kitchens",
    p19Title: "Kitchen with a fluted stone island",

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
    p10Tag: "Baños",
    p10Title: "Baño en mármol negro y nogal",
    p11Tag: "Cocinas",
    p11Title: "Cocina en nogal con granito negro",
    p12Tag: "Comercial",
    p12Title: "Academia de belleza",
    p13Tag: "Comercial",
    p13Title: "Recepción de oficina EnvySky",
    p14Tag: "Baños",
    p14Title: "Baño en piedra gris y roble",
    p15Tag: "Cocinas",
    p15Title: "Cocina gris y madera oscura",
    p16Tag: "Cocinas",
    p16Title: "Cocina con piso de mármol negro",
    p17Tag: "Cocinas",
    p17Title: "Cocina en roble con dos islas",
    p18Tag: "Cocinas",
    p18Title: "Cocina blanca y roble claro",
    p19Tag: "Cocinas",
    p19Title: "Cocina con isla acanalada de piedra",

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
/** 1…n, the way the photo files are numbered. */
const range = (n: number) => Array.from({ length: n }, (_, k) => k + 1);

const IMG = {
  kitchenOnyx: "/assets/kitchen-onyx.webp",
  /** "Liz Kitchen", the first project: hero plus six detail shots. */
  liz: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/liz-${n}.webp`),
  /** Projects 2–5, numbered as the design's photo files. */
  closet2: [1, 2, 3, 4, 5].map((n) => `/assets/wc-${n}.webp`),
  bath2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => `/assets/bath2-${n}.webp`),
  kitchen3: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/k3-${n}.webp`),
  crystalLuxe: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/cl-${n}.webp`),
  /** Project 7, the white and gold walk-in closet. */
  goldCloset: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => `/assets/gw-${n}.webp`),
  /** Project 6: 1–6 are the light walnut version of the same kitchen, 7–12 the black one. */
  blackKitchen: range(12).map((n) => `/assets/bk-${n}.webp`),
  /** Projects 10–19, numbered as the renders were delivered. */
  blackBath: range(4).map((n) => `/assets/bm-${n}.webp`),
  graniteKitchen: range(8).map((n) => `/assets/kg-${n}.webp`),
  academy: range(11).map((n) => `/assets/acad-${n}.webp`),
  envySky: range(8).map((n) => `/assets/envy-${n}.webp`),
  greyBath: range(6).map((n) => `/assets/bg-${n}.webp`),
  /** The delivery's two near-black lighting frames are left out. */
  greyKitchen: range(4).map((n) => `/assets/kd-${n}.webp`),
  marbleFloorKitchen: range(4).map((n) => `/assets/km-${n}.webp`),
  oakKitchen: range(4).map((n) => `/assets/ko-${n}.webp`),
  whiteKitchen: range(7).map((n) => `/assets/kw-${n}.webp`),
  /** 2–6 are the lights coming on one by one; 2 and 3 are too dark to use. */
  flutedKitchen: range(8).map((n) => `/assets/kf-${n}.webp`),
  flutedKitchenVideo: "/assets/kf-video.mp4",
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
 * Every project with a detail view. Hidden projects keep their slot so the
 * indices still line up with SHOTS and DETAIL — see WORK and FEATURED below.
 */
export const PROJECTS = [
  { i: 0, slug: "liz-kitchen", tagKey: "p1Tag", titleKey: "p1Title", img: IMG.liz[0] },
  { i: 1, slug: "walk-in-closet-grafito-y-nogal", tagKey: "p2Tag", titleKey: "p2Title", img: IMG.closet2[0] },
  { i: 2, slug: "bano-principal-nogal-y-onix", tagKey: "p3Tag", titleKey: "p3Title", img: IMG.bath2[2] },
  { i: 3, slug: "cocina-nogal-isla-de-cuarcita", tagKey: "p4Tag", titleKey: "p4Title", img: IMG.kitchen3[4] },
  { i: 4, slug: "crystal-luxe-wellness-center", tagKey: "p5Tag", titleKey: "p5Title", img: IMG.crystalLuxe[0] },
  { i: 5, slug: "cocina-negro-mate", tagKey: "p6Tag", titleKey: "p6Title", img: IMG.blackKitchen[8], focus: FOCUS.proj6 },
  { i: 6, slug: "walk-in-closet-blanco-y-dorado", tagKey: "p7Tag", titleKey: "p7Title", img: IMG.goldCloset[4] },
  { i: 7, slug: "sala-y-tv-wall", tagKey: "p8Tag", titleKey: "p8Title", img: IMG.kitchenDining },
  { i: 8, slug: "recibidor-panelado-de-madera", tagKey: "p9Tag", titleKey: "p9Title", img: IMG.closet },
  { i: 9, slug: "bano-marmol-negro-y-nogal", tagKey: "p10Tag", titleKey: "p10Title", img: IMG.blackBath[2] },
  { i: 10, slug: "cocina-nogal-y-granito-negro", tagKey: "p11Tag", titleKey: "p11Title", img: IMG.graniteKitchen[0] },
  { i: 11, slug: "academia-de-belleza", tagKey: "p12Tag", titleKey: "p12Title", img: IMG.academy[9] },
  { i: 12, slug: "recepcion-envysky", tagKey: "p13Tag", titleKey: "p13Title", img: IMG.envySky[3] },
  { i: 13, slug: "bano-piedra-gris-y-roble", tagKey: "p14Tag", titleKey: "p14Title", img: IMG.greyBath[1] },
  { i: 14, slug: "cocina-gris-y-madera-oscura", tagKey: "p15Tag", titleKey: "p15Title", img: IMG.greyKitchen[2] },
  { i: 15, slug: "cocina-piso-marmol-negro", tagKey: "p16Tag", titleKey: "p16Title", img: IMG.marbleFloorKitchen[2] },
  { i: 16, slug: "cocina-roble-dos-islas", tagKey: "p17Tag", titleKey: "p17Title", img: IMG.oakKitchen[0] },
  { i: 17, slug: "cocina-blanca-y-roble-claro", tagKey: "p18Tag", titleKey: "p18Title", img: IMG.whiteKitchen[0] },
  { i: 18, slug: "cocina-isla-acanalada", tagKey: "p19Tag", titleKey: "p19Title", img: IMG.flutedKitchen[6] },
] as const;

/**
 * The "Our work" view, in this order. Projects 2–5 and 7 (the photographed
 * ones) are off the site for now, and 8–9 had no project of their own.
 */
export const WORK = [0, 5, 11, 10, 12, 18, 9, 13, 17, 16, 15, 14].map((i) => PROJECTS[i]);

/** The homepage shows the first six of them. */
export const FEATURED = WORK.slice(0, 6);

/**
 * Each full-screen view has its own address, so it can be shared and the
 * browser's Back button closes it. Every path below is also built as a real
 * page (src/pages), which opens with that view already on screen.
 */
export const VIEW_PATHS = {
  work: "/trabajos/",
  about: "/nosotros/",
  process: "/proceso/",
} as const;

export const projectPath = (index: number) => `/proyectos/${PROJECTS[index].slug}/`;

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
  {
    hero: IMG.blackKitchen[8],
    side: [IMG.blackKitchen[11], IMG.blackKitchen[6]],
    shots: pick(IMG.blackKitchen, 10, 11, 8, 3, 2, 5, 6, 4, 1),
  },
  {
    hero: IMG.goldCloset[4],
    side: [IMG.goldCloset[5], IMG.goldCloset[7]],
    shots: pick(IMG.goldCloset, 2, 4, 10, 3, 1, 9, 11, 7),
    tall: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  { hero: IMG.kitchenDining, shots: [IMG.kitchenWood, IMG.kitchenDark] },
  { hero: IMG.closet, shots: [IMG.interiorEmpty, IMG.kitchenWood] },
  {
    hero: IMG.blackBath[1],
    side: [IMG.blackBath[0], IMG.blackBath[1]],
    shots: pick(IMG.blackBath, 3, 4),
    tall: [0, 1],
  },
  {
    hero: IMG.graniteKitchen[0],
    side: [IMG.graniteKitchen[2], IMG.graniteKitchen[3]],
    shots: pick(IMG.graniteKitchen, 1, 2, 5, 6, 7, 8),
    tall: [0, 1, 2, 3, 4, 5],
  },
  {
    hero: IMG.academy[9],
    side: [IMG.academy[0], IMG.academy[5]],
    shots: pick(IMG.academy, 2, 3, 5, 9, 7, 4, 8, 11),
  },
  {
    hero: IMG.envySky[3],
    side: [IMG.envySky[4], IMG.envySky[5]],
    shots: pick(IMG.envySky, 1, 2, 3, 7, 8, 4),
    tall: [0, 1, 2, 3, 4, 5],
  },
  {
    hero: IMG.greyBath[1],
    side: [IMG.greyBath[4], IMG.greyBath[5]],
    shots: pick(IMG.greyBath, 1, 3, 4),
  },
  {
    hero: IMG.greyKitchen[2],
    side: [IMG.greyKitchen[1], IMG.greyKitchen[3]],
    shots: pick(IMG.greyKitchen, 1, 3),
    tall: [0, 1],
  },
  {
    hero: IMG.marbleFloorKitchen[2],
    side: [IMG.marbleFloorKitchen[0], IMG.marbleFloorKitchen[1]],
    shots: pick(IMG.marbleFloorKitchen, 4, 3),
    tall: [0, 1],
  },
  {
    hero: IMG.oakKitchen[1],
    side: [IMG.oakKitchen[2], IMG.oakKitchen[0]],
    shots: pick(IMG.oakKitchen, 1, 4),
    tall: [0, 1],
  },
  {
    hero: IMG.whiteKitchen[0],
    side: [IMG.whiteKitchen[4], IMG.whiteKitchen[2]],
    shots: pick(IMG.whiteKitchen, 4, 2, 6, 7),
  },
  {
    hero: IMG.flutedKitchen[6],
    video: IMG.flutedKitchenVideo,
    side: [IMG.flutedKitchen[3], IMG.flutedKitchen[5]],
    shots: pick(IMG.flutedKitchen, 1, 8, 5, 7),
    tall: [0, 1, 2, 3],
  },
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
        "The waterfall end of the island and the stools from the window side.",
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
        "An open kitchen and dining room built around an angular island in black and gold marble, with dark wood tall units and a run of lit glass cabinets.",
      paras: [
        "The island is cut on a slant at both ends, and the same black marble with gold veining climbs the wall behind the hob. Warm LED strips run under the island overhang and inside every glass cabinet.",
        "The project was also drawn in a lighter version, in walnut with a white marble island and hood, which closes the gallery below.",
      ],
      meta: [["Scope", "Kitchen + dining room"], ["Materials", "Black marble, dark wood, glass"]],
      captions: [
        "The black marble island beside the dining table.",
        "The dark wood tall units and lit glass cabinets behind the table.",
        "The dining table runner and the lit wine cabinets.",
        "The light version: walnut tall units and a white marble island.",
        "The dining table in front of the walnut wall and stone hood.",
        "The island and the glass cabinets in daylight.",
        "Afternoon light across the island in the walnut version.",
        "The dining table and its walnut runner in the light version.",
        "The whole kitchen and dining room in the light walnut finish.",
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
    {
      summary:
        "A bathroom in black marble with gold veining and walnut joinery, with a floating vanity, a backlit mirror and a lit glass cabinet beside it.",
      paras: [
        "The vanity wall is clad in black marble from floor to ceiling. The walnut vanity floats over a lit shelf for towels, under a tall mirror with rounded corners and a warm LED edge.",
        "A narrow walnut column with glass doors and lit shelves stands between the vanity and the toilet, and a walnut door and a brass towel rail close the room on the other side.",
      ],
      meta: [["Scope", "Bathroom"], ["Materials", "Black marble, walnut, brass"]],
      captions: [
        "The vanity, the lit glass column and the toilet in black.",
        "The dressing chair under the mirror, behind the glass shower screen.",
      ],
    },
    {
      summary:
        "A walnut kitchen with a rounded, fluted island topped in black granite, a window seat and a wall of lit glass cabinets.",
      paras: [
        "The island is an oval in fluted walnut with a black and white granite top, and seats four along one side. The same granite runs up the backsplash and around the window.",
        "Tall walnut units hide the refrigerator and frame lit glass display cabinets. Under the window, a built-in bench with grey cushions sits between the cabinetry and a glass-door bar unit.",
      ],
      meta: [["Scope", "Kitchen + window seat"], ["Materials", "Walnut, black granite, glass"]],
      captions: [
        "The fluted island and the walnut wall.",
        "The granite top of the island from above.",
        "The tall walnut units and glass cabinets.",
        "The window seat between the cabinetry and the coffee station.",
        "The bench under the window, framed in walnut.",
        "The bench beside the lit glass bar unit.",
      ],
    },
    {
      summary:
        "A beauty academy with a reception, a waiting lounge, rows of styling stations and a washing area, all in light oak with black and white details.",
      paras: [
        "The reception desk and the wall behind it are oak with curved ends and a lit plinth, beside the academy's logo and a tall oval mirror. The waiting lounge is a curved oak bench under a backlit sign.",
        "Each styling station is a long oak counter with tall oval mirrors and black chairs, divided by lit oak columns for products. A slatted black ceiling with linear LED lines runs the full length of the floor.",
      ],
      meta: [["Scope", "Commercial interior"], ["Materials", "Oak, stone, black slatted ceiling"]],
      captions: [
        "The styling stations along the window.",
        "The washing area along the curved wall.",
        "The rows of stations and the lit oak columns.",
        "Stations and mirrors from the corner.",
        "The logo, the oval mirror and the reception.",
        "Oak plaques along the curved wall.",
        "Stations between the oak display columns.",
        "Detail of a styling counter.",
      ],
    },
    {
      summary:
        "Reception and waiting area for EnvySky, wrapped in oak panelling with deep teal niches, a stone-clad desk and a lounge in soft grey.",
      paras: [
        "Oak panels run floor to ceiling, broken by vertical slats and lit niches with teal back panels. The EnvySky logo sits on the oak wall behind the reception desk, which is clad in white stone with an oak front.",
        "The waiting area has a low curved sofa and a pair of stone side tables, with an aeroplane model on the teal wall as a nod to the client's business.",
      ],
      meta: [["Scope", "Reception + waiting area"], ["Materials", "Oak, teal lacquer, stone"]],
      captions: [
        "A client waiting beside the lit oak niches.",
        "The lounge and the reception behind it.",
        "The sofa and the teal wall with the aeroplane.",
        "Detail of a lit niche.",
        "The oak grain beside the shelving.",
        "The reception desk and the EnvySky logo.",
      ],
    },
    {
      summary:
        "A bathroom in grey stone and light oak, with a long double vanity, arched backlit mirrors and a lit ceiling frame.",
      paras: [
        "The grey stone covers the walls, and an oak frame with an LED line wraps the vanity from the ceiling down. The counter is white marble with two wooden vessel sinks, and steps into a dressing table at one end.",
        "Opposite the vanity, open oak shelves hold towels and baskets, leading to the walk-in shower at the end of the room.",
      ],
      meta: [["Scope", "Bathroom"], ["Materials", "Grey stone, oak, marble"]],
      captions: [
        "The vanity and the dressing table under the lit frame.",
        "The open shelves and the shower at the end of the room.",
        "The arched mirrors along the stone wall.",
      ],
    },
    {
      summary:
        "A grey kitchen framed by dark wood tall units, with lit glass cabinets on both walls and a white stone island with a wooden front.",
      paras: [
        "Two dark wood columns stand at the ends of the kitchen, each with full-height glass cabinets and a vertical LED line. The grey base units run round the room under a stone backsplash.",
        "The island is white stone with a waterfall end and a wooden front lit from below, with two stools under a pair of glass pendants.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Dark wood, grey lacquer, stone, glass"]],
      captions: [
        "The grey run between the two lit glass columns.",
        "The island from the end, with the stools and the pendants.",
      ],
    },
    {
      summary:
        "A kitchen with a polished black marble floor, an island in green-veined stone and walnut, and a ring of lit glass cabinets.",
      paras: [
        "The island is clad in green-veined stone at both ends with a walnut front lit from below, and seats four under three white pendant lights. The same stone runs up the backsplash and the hood.",
        "Dark wood wall cabinets with glass fronts and LED lighting circle the room above white base units, with tall units for the ovens at one end.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Black marble, green stone, walnut, glass"]],
      captions: [
        "The island and the pendants from the side.",
        "The island head-on, with the stools and the hood.",
      ],
    },
    {
      summary:
        "A large open kitchen in light oak with two stone islands, each with four stools and a lit ceiling panel overhead.",
      paras: [
        "Two islands in light marble run side by side, each lit from below and seated on the long side. Over each one, a lowered ceiling panel in the same stone carries an LED edge and a linear pendant.",
        "A full wall of oak tall units holds the ovens, a lit pantry and open display shelving, with a marble hood at the corner.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Light oak, marble"]],
      captions: [
        "The first island and the marble hood.",
        "Both islands from the end of the room.",
      ],
    },
    {
      summary:
        "A bright kitchen in white and light oak, with a marble island, black appliances and a dining table by the garden window.",
      paras: [
        "The wall cabinets are light oak with a run of black glass display units lit from inside, over white base units and a white marble backsplash.",
        "The island has a marble top with a waterfall end and an oak front, with four black stools under a pair of dark glass pendants.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Light oak, white lacquer, marble"]],
      captions: [
        "The island, the stools and the garden windows.",
        "The hob, the sink and the corner of the island.",
        "The ovens and the refrigerator beside the island.",
        "The sink under the window, framed by the oak cabinets.",
      ],
    },
    {
      summary:
        "A kitchen in oak panelling with a rounded island clad in fluted stone, orange leather stools and a curved, lit ceiling panel.",
      paras: [
        "The island is an oval in fluted marble with a pale stone top, lit from below on the seating side. Above it, a lowered ceiling panel with rounded corners carries an LED line and three pendant lights.",
        "Vertical oak panelling covers the walls and hides the tall units, with lit glass cabinets and a marble backsplash on the cooking wall.",
      ],
      meta: [["Scope", "Full kitchen"], ["Materials", "Oak, fluted marble, leather"]],
      captions: [
        "The fluted island and the orange stools.",
        "The island and the second counter from the entrance.",
        "The kitchen at night, with the island and the cabinets lit.",
        "The kitchen with every light on.",
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
        "El extremo en cascada de la isla y los taburetes desde el lado de la ventana.",
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
        "Una cocina abierta con comedor, construida alrededor de una isla angular en mármol negro y dorado, con muebles altos en madera oscura y una fila de vitrinas iluminadas.",
      paras: [
        "La isla va cortada en diagonal en los dos extremos, y el mismo mármol negro con vetas doradas sube por la pared detrás de la placa. Tiras LED cálidas recorren el voladizo de la isla y el interior de cada vitrina.",
        "El proyecto también se dibujó en una versión clara, en nogal con isla y campana de mármol blanco, que cierra la galería de abajo.",
      ],
      meta: [["Alcance", "Cocina y comedor"], ["Materiales", "Mármol negro, madera oscura, cristal"]],
      captions: [
        "La isla de mármol negro junto a la mesa del comedor.",
        "Los muebles altos de madera oscura y las vitrinas iluminadas detrás de la mesa.",
        "El camino de mesa y las vitrinas de vinos iluminadas.",
        "La versión clara: muebles altos de nogal e isla de mármol blanco.",
        "La mesa del comedor frente a la pared de nogal y la campana de piedra.",
        "La isla y las vitrinas con luz de día.",
        "Luz de tarde sobre la isla en la versión de nogal.",
        "La mesa del comedor y su camino de nogal en la versión clara.",
        "Toda la cocina y el comedor en el acabado claro de nogal.",
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
    {
      summary:
        "Un baño en mármol negro con vetas doradas y carpintería en nogal, con mueble de lavabo flotante, espejo retroiluminado y una vitrina iluminada al lado.",
      paras: [
        "La pared del lavabo va revestida en mármol negro de piso a techo. El mueble de nogal flota sobre un estante iluminado para toallas, bajo un espejo alto de esquinas redondeadas con borde LED cálido.",
        "Una columna estrecha de nogal con puertas de cristal y estantes iluminados separa el lavabo del inodoro, y una puerta de nogal y un toallero de latón cierran el baño por el otro lado.",
      ],
      meta: [["Alcance", "Baño"], ["Materiales", "Mármol negro, nogal, latón"]],
      captions: [
        "El lavabo, la columna de cristal iluminada y el inodoro en negro.",
        "La silla de tocador bajo el espejo, tras la mampara de la ducha.",
      ],
    },
    {
      summary:
        "Una cocina en nogal con isla redondeada y acanalada, cubierta de granito negro, un banco bajo la ventana y una pared de vitrinas iluminadas.",
      paras: [
        "La isla es un óvalo en nogal acanalado con cubierta de granito blanco y negro, y tiene cuatro asientos por un lado. El mismo granito sube por el salpicadero y rodea la ventana.",
        "Los muebles altos de nogal ocultan el refrigerador y enmarcan vitrinas de cristal iluminadas. Bajo la ventana, un banco empotrado con cojines grises queda entre la carpintería y un mueble bar con puertas de cristal.",
      ],
      meta: [["Alcance", "Cocina y banco de ventana"], ["Materiales", "Nogal, granito negro, cristal"]],
      captions: [
        "La isla acanalada y la pared de nogal.",
        "La cubierta de granito de la isla desde arriba.",
        "Los muebles altos de nogal y las vitrinas.",
        "El banco de la ventana entre la carpintería y la estación de café.",
        "El banco bajo la ventana, enmarcado en nogal.",
        "El banco junto al mueble bar de cristal iluminado.",
      ],
    },
    {
      summary:
        "Una academia de belleza con recepción, sala de espera, filas de puestos de peinado y zona de lavado, todo en roble claro con detalles en blanco y negro.",
      paras: [
        "El mostrador de recepción y la pared de detrás son de roble con extremos curvos y zócalo iluminado, junto al logo de la academia y un espejo ovalado alto. La sala de espera es un banco curvo de roble bajo un rótulo retroiluminado.",
        "Cada puesto de peinado es una encimera larga de roble con espejos ovalados altos y sillones negros, separada por columnas de roble iluminadas para productos. Un techo de lamas negras con líneas LED recorre todo el local.",
      ],
      meta: [["Alcance", "Interior comercial"], ["Materiales", "Roble, piedra, techo de lamas negras"]],
      captions: [
        "Los puestos de peinado junto a la cristalera.",
        "La zona de lavado a lo largo de la pared curva.",
        "Las filas de puestos y las columnas de roble iluminadas.",
        "Puestos y espejos desde la esquina.",
        "El logo, el espejo ovalado y la recepción.",
        "Placas de roble a lo largo de la pared curva.",
        "Puestos entre las columnas de exhibición de roble.",
        "Detalle de una encimera de peinado.",
      ],
    },
    {
      summary:
        "Recepción y sala de espera para EnvySky, revestidas en panelado de roble con nichos en verde petróleo, un mostrador forrado en piedra y una zona de estar en gris suave.",
      paras: [
        "Los paneles de roble van de piso a techo, interrumpidos por lamas verticales y nichos iluminados con fondo en verde petróleo. El logo de EnvySky está sobre la pared de roble detrás del mostrador, que va revestido en piedra blanca con frente de roble.",
        "La sala de espera tiene un sofá curvo bajo y un par de mesas auxiliares de piedra, con una maqueta de avión en la pared verde petróleo como guiño al negocio del cliente.",
      ],
      meta: [["Alcance", "Recepción y sala de espera"], ["Materiales", "Roble, laca verde petróleo, piedra"]],
      captions: [
        "Un cliente esperando junto a los nichos de roble iluminados.",
        "La zona de estar y la recepción al fondo.",
        "El sofá y la pared verde petróleo con el avión.",
        "Detalle de un nicho iluminado.",
        "La veta del roble junto a los estantes.",
        "El mostrador de recepción y el logo de EnvySky.",
      ],
    },
    {
      summary:
        "Un baño en piedra gris y roble claro, con un lavabo doble largo, espejos en arco retroiluminados y un marco de techo iluminado.",
      paras: [
        "La piedra gris reviste las paredes, y un marco de roble con una línea LED envuelve el lavabo desde el techo. La encimera es de mármol blanco con dos lavabos de madera sobre encimera, y se prolonga en un tocador en un extremo.",
        "Frente al lavabo, unos estantes abiertos de roble guardan toallas y cestas, y llevan hasta la ducha walk-in al fondo del baño.",
      ],
      meta: [["Alcance", "Baño"], ["Materiales", "Piedra gris, roble, mármol"]],
      captions: [
        "El lavabo y el tocador bajo el marco iluminado.",
        "Los estantes abiertos y la ducha al fondo.",
        "Los espejos en arco sobre la pared de piedra.",
      ],
    },
    {
      summary:
        "Una cocina gris enmarcada por muebles altos en madera oscura, con vitrinas iluminadas en ambas paredes y una isla de piedra blanca con frente de madera.",
      paras: [
        "Dos columnas de madera oscura cierran los extremos de la cocina, cada una con vitrinas de cristal de altura completa y una línea LED vertical. Los muebles bajos grises rodean el espacio bajo un salpicadero de piedra.",
        "La isla es de piedra blanca con extremo en cascada y un frente de madera iluminado desde abajo, con dos taburetes bajo un par de lámparas de cristal.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Madera oscura, laca gris, piedra, cristal"]],
      captions: [
        "El frente gris entre las dos columnas de cristal iluminadas.",
        "La isla desde el extremo, con los taburetes y las lámparas.",
      ],
    },
    {
      summary:
        "Una cocina con piso de mármol negro pulido, una isla en piedra de vetas verdes y nogal, y un anillo de vitrinas iluminadas.",
      paras: [
        "La isla va revestida en piedra de vetas verdes en los dos extremos, con un frente de nogal iluminado desde abajo, y tiene cuatro asientos bajo tres lámparas blancas. La misma piedra sube por el salpicadero y la campana.",
        "Los muebles altos de madera oscura con frentes de cristal e iluminación LED rodean la cocina sobre muebles bajos blancos, con columnas para los hornos en un extremo.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Mármol negro, piedra verde, nogal, cristal"]],
      captions: [
        "La isla y las lámparas de lado.",
        "La isla de frente, con los taburetes y la campana.",
      ],
    },
    {
      summary:
        "Una cocina abierta y amplia en roble claro con dos islas de piedra, cada una con cuatro taburetes y un panel de techo iluminado encima.",
      paras: [
        "Dos islas en mármol claro corren en paralelo, iluminadas desde abajo y con asientos en el lado largo. Sobre cada una, un panel de techo bajado en la misma piedra lleva un borde LED y una lámpara lineal.",
        "Una pared completa de muebles altos de roble guarda los hornos, una despensa iluminada y estantes abiertos de exhibición, con una campana de mármol en la esquina.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Roble claro, mármol"]],
      captions: [
        "La primera isla y la campana de mármol.",
        "Las dos islas desde el fondo del espacio.",
      ],
    },
    {
      summary:
        "Una cocina luminosa en blanco y roble claro, con isla de mármol, electrodomésticos negros y una mesa de comedor junto a la ventana al jardín.",
      paras: [
        "Los muebles altos son de roble claro con una fila de vitrinas de cristal negro iluminadas por dentro, sobre muebles bajos blancos y un salpicadero de mármol blanco.",
        "La isla tiene cubierta de mármol con extremo en cascada y frente de roble, con cuatro taburetes negros bajo un par de lámparas de cristal oscuro.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Roble claro, laca blanca, mármol"]],
      captions: [
        "La isla, los taburetes y las ventanas al jardín.",
        "La placa, el fregadero y la esquina de la isla.",
        "Los hornos y el refrigerador junto a la isla.",
        "El fregadero bajo la ventana, entre los muebles de roble.",
      ],
    },
    {
      summary:
        "Una cocina en panelado de roble con una isla redondeada revestida en piedra acanalada, taburetes de piel naranja y un panel de techo curvo iluminado.",
      paras: [
        "La isla es un óvalo en mármol acanalado con cubierta de piedra clara, iluminado desde abajo en el lado de los asientos. Encima, un panel de techo bajado con esquinas redondeadas lleva una línea LED y tres lámparas colgantes.",
        "El panelado vertical de roble cubre las paredes y oculta los muebles altos, con vitrinas iluminadas y un salpicadero de mármol en la pared de cocción.",
      ],
      meta: [["Alcance", "Cocina completa"], ["Materiales", "Roble, mármol acanalado, piel"]],
      captions: [
        "La isla acanalada y los taburetes naranjas.",
        "La isla y la segunda encimera desde la entrada.",
        "La cocina de noche, con la isla y las vitrinas encendidas.",
        "La cocina con todas las luces encendidas.",
      ],
    },
  ],
};
