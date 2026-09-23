"""Materiales de la cocina de portada, separados para poder reaplicarlos en vivo.

`aplicar()` reconstruye todos los materiales y los reasigna por nombre de objeto
sin tocar la geometria, asi que puede ejecutarse una y otra vez sobre la escena
abierta. scripts/vivo.py vigila este fichero y lo llama en cada guardado.
"""
import bpy, os, sys, json

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Factores medidos con scripts/sondas.py contra la portada. El albedo extraido
# se normalizo a la media de su recorte, que venia de una zona en penumbra de la
# imagen, asi que el nogal salia muy oscuro: esto lo devuelve a su nivel real.
GANANCIA_NOGAL = (1.85, 1.95, 2.15)
GANANCIA_ONIX  = (0.80, 0.77, 0.71)

# ------------------------------------------------------------------ utiles
def set_in(nodo, nombre, valor):
    """Asigna una entrada por nombre tolerando los renombrados del Principled."""
    alias = {
        'Subsurface': ['Subsurface Weight', 'Subsurface'],
        'Transmission': ['Transmission Weight', 'Transmission'],
        'Specular': ['Specular IOR Level', 'Specular'],
        'Sheen': ['Sheen Weight', 'Sheen'],
        'Coat': ['Coat Weight', 'Clearcoat', 'Coat'],
        'Emission': ['Emission Color', 'Emission'],
    }
    for n in alias.get(nombre, [nombre]):
        if n in nodo.inputs:
            nodo.inputs[n].default_value = valor
            return True
    return False

def material(nombre):
    m = bpy.data.materials.new(nombre)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        if n.type != 'OUTPUT_MATERIAL':
            nt.nodes.remove(n)
    out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
    bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (-300, 0)
    nt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return m, nt, bsdf


# --------------------------------------------------------------- materiales
def _lado(clave, defecto):
    """Lado en metros de una muestra, leido de textures/texturas.json."""
    try:
        meta = json.load(open(os.path.join(RAIZ, 'textures', 'texturas.json')))
        return float(meta[clave]['lado_m'])
    except Exception:
        return defecto

def _ruido(nt, x, escala, detalle, rug, estirado):
    """Ruido con coordenadas de objeto estiradas: 'estirado' alarga la veta en Z."""
    co = nt.nodes.new('ShaderNodeTexCoord'); co.location = (x-420, 0)
    mp = nt.nodes.new('ShaderNodeMapping');  mp.location = (x-240, 0)
    mp.inputs['Scale'].default_value = estirado
    ns = nt.nodes.new('ShaderNodeTexNoise'); ns.location = (x, 0)
    ns.inputs['Scale'].default_value = escala
    ns.inputs['Detail'].default_value = detalle
    ns.inputs['Roughness'].default_value = rug
    nt.links.new(co.outputs['Object'], mp.inputs['Vector'])
    nt.links.new(mp.outputs['Vector'], ns.inputs['Vector'])
    return ns

def _tex_imagen(nt, ruta, lado_m, x=-900):
    """Textura de imagen en proyeccion de caja, escalada a metros reales.

    Las coordenadas de objeto de caja() estan centradas en la pieza y en escala
    del mundo, asi que dividir por el lado en metros hace que la textura repita
    cada lado_m metros sobre cualquier cara.
    """
    img = bpy.data.images.load(ruta, check_existing=True)
    co = nt.nodes.new('ShaderNodeTexCoord'); co.location = (x-420, 0)
    mp = nt.nodes.new('ShaderNodeMapping');  mp.location = (x-240, 0)
    k = 1.0 / lado_m
    mp.inputs['Scale'].default_value = (k, k, k)
    te = nt.nodes.new('ShaderNodeTexImage'); te.location = (x, 0)
    te.image = img
    te.projection = 'BOX'
    te.projection_blend = 0.25
    te.extension = 'REPEAT'
    nt.links.new(co.outputs['Object'], mp.inputs['Vector'])
    nt.links.new(mp.outputs['Vector'], te.inputs['Vector'])
    return te

def _ganancia(nt, salida, factor, x=-700):
    """Multiplica un color por un factor sin recortar.

    MixRGB clampea segun la version; VectorMath no, y los sockets de color
    conectan sin problema con los de vector.
    """
    g = nt.nodes.new('ShaderNodeVectorMath'); g.location = (x, 120)
    g.operation = 'MULTIPLY'
    g.inputs[1].default_value = factor
    nt.links.new(salida, g.inputs[0])
    return g

def _luminancia(nt, tex, x=-660):
    bw = nt.nodes.new('ShaderNodeRGBToBW'); bw.location = (x, -220)
    nt.links.new(tex.outputs['Color'], bw.inputs['Color'])
    return bw

def mat_nogal(nombre='Nogal', lado=None):
    """Nogal a partir de la muestra rectificada de la propia portada."""
    ruta = os.path.join(RAIZ, 'textures', 'nogal_albedo.png')
    m, nt, b = material(nombre)
    # Con rugosidad 0.22 y barniz, el nogal devolvia el suelo y el ventanal como
    # un velo claro sobre la isla que la portada no tiene. Satinado mate.
    set_in(b, 'Specular', 0.42); set_in(b, 'Coat', 0.04)
    if not os.path.exists(ruta):
        set_in(b, 'Base Color', (0.105, 0.044, 0.019, 1))
        set_in(b, 'Roughness', 0.30)
        return m
    lado = lado or _lado('nogal_albedo', 0.833) * 1.26
    tex = _tex_imagen(nt, ruta, lado)
    gan = _ganancia(nt, tex.outputs['Color'], GANANCIA_NOGAL)
    nt.links.new(gan.outputs['Vector'], b.inputs['Base Color'])
    bw = _luminancia(nt, tex)
    rug = nt.nodes.new('ShaderNodeMapRange'); rug.location = (-440, -220)
    rug.inputs['To Min'].default_value = 0.34
    rug.inputs['To Max'].default_value = 0.52
    nt.links.new(bw.outputs['Val'], rug.inputs['Value'])
    nt.links.new(rug.outputs['Result'], b.inputs['Roughness'])
    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (-280, -330)
    bump.inputs['Strength'].default_value = 0.22
    nt.links.new(bw.outputs['Val'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def mat_onix(nombre='OnixRetro', emision=2.4, lado=1.00):
    """Onix retroiluminado: la muestra hace de albedo y tambien guia la emision."""
    ruta = os.path.join(RAIZ, 'textures', 'onix_albedo.png')
    m, nt, b = material(nombre)
    set_in(b, 'Roughness', 0.07); set_in(b, 'Specular', 0.6)
    set_in(b, 'Subsurface', 0.40)
    if 'Subsurface Radius' in b.inputs:
        b.inputs['Subsurface Radius'].default_value = (0.32, 0.17, 0.08)
    if not os.path.exists(ruta):
        set_in(b, 'Base Color', (0.80, 0.70, 0.55, 1))
        return m
    tex = _tex_imagen(nt, ruta, lado)
    gan = _ganancia(nt, tex.outputs['Color'], GANANCIA_ONIX)
    nt.links.new(gan.outputs['Vector'], b.inputs['Base Color'])
    if emision > 0:
        tinte = nt.nodes.new('ShaderNodeMixRGB'); tinte.location = (-420, -260)
        tinte.blend_type = 'MULTIPLY'; tinte.inputs['Fac'].default_value = 0.85
        tinte.inputs['Color2'].default_value = (1.0, 0.60, 0.30, 1)
        nt.links.new(tex.outputs['Color'], tinte.inputs['Color1'])
        clave = 'Emission Color' if 'Emission Color' in b.inputs else 'Emission'
        nt.links.new(tinte.outputs['Color'], b.inputs[clave])
        set_in(b, 'Emission Strength', emision)
    return m

def mat_onix_macizo():
    """Onix del tambor: macizo, no retroiluminado.

    Darle el mismo material que al panel del fondo era un error fisico: ese
    lleva LED detras, y el tambor es un bloque. Con emision y subsurface altos
    la luz atraviesa las ranuras y borra su sombra, que es exactamente lo que
    las hacia invisibles.
    """
    m = mat_onix(nombre='OnixMacizo', emision=0.0, lado=0.85)
    b = m.node_tree.nodes['Principled BSDF'] if 'Principled BSDF' in m.node_tree.nodes \
        else next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    # A 0.13 el tambor se leia como metal pulido: cada flauta hacia de espejo
    # curvo y devolvia el gris de la sala en vez de su propio color. Piedra
    # apomazada, no espejo.
    set_in(b, 'Subsurface', 0.18)
    set_in(b, 'Roughness', 0.40)
    set_in(b, 'Coat', 0.0)
    return m

def mat_piedra():
    """Encimera de piedra clara, tipo travertino pulido."""
    m, nt, b = material('PiedraClara')
    set_in(b, 'Roughness', 0.24); set_in(b, 'Specular', 0.5); set_in(b, 'Coat', 0.10)
    ns = _ruido(nt, -760, 3.2, 10.0, 0.55, (1.0, 1.0, 1.0))
    ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.location = (-500, 0)
    cr = ramp.color_ramp
    cr.elements[0].position = 0.38; cr.elements[0].color = (0.385, 0.320, 0.238, 1)
    cr.elements[1].position = 0.70; cr.elements[1].color = (0.585, 0.520, 0.415, 1)
    nt.links.new(ns.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], b.inputs['Base Color'])
    return m

def mat_techo():
    """El techo recibe mucho mas rebote que las paredes, asi que va mas oscuro.

    Con un unico material para ambos no hay salida: subir el ambiente para
    levantar la pared quemaba el techo, que ya estaba en su sitio (factor 1.04).
    """
    m = mat_microcemento(nombre='MicrocementoTecho',
                         color=(0.300, 0.248, 0.190, 1))
    return m

def mat_microcemento(nombre='Microcemento', color=(0.505, 0.428, 0.336, 1)):
    m, nt, b = material(nombre)
    set_in(b, 'Base Color', color)
    set_in(b, 'Roughness', 0.78); set_in(b, 'Specular', 0.18)
    ns = _ruido(nt, -760, 1.8, 7.0, 0.55, (1.0, 1.0, 1.0))
    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (-320, -260)
    bump.inputs['Strength'].default_value = 0.06
    nt.links.new(ns.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def mat_porcelanico(lado_baldosa=1.20):
    """Porcelanico de gran formato pulido, con junta fina.

    La junta importa mas de lo que parece: es lo unico que da escala al suelo y
    sin ella el reflejo se lee como una superficie continua de plastico.
    """
    m, nt, b = material('PorcelanicoPulido')
    set_in(b, 'Specular', 0.62); set_in(b, 'Coat', 0.30)
    co = nt.nodes.new('ShaderNodeTexCoord'); co.location = (-1200, 0)
    mp = nt.nodes.new('ShaderNodeMapping');  mp.location = (-1020, 0)
    k = 1.0 / lado_baldosa
    mp.inputs['Scale'].default_value = (k, k, k)
    br = nt.nodes.new('ShaderNodeTexBrick'); br.location = (-840, 0)
    br.offset = 0.0; br.squash = 1.0
    br.inputs['Scale'].default_value = 1.0
    br.inputs['Mortar Size'].default_value = 0.0045
    br.inputs['Mortar Smooth'].default_value = 0.10
    br.inputs['Bias'].default_value = 0.0
    br.inputs['Brick Width'].default_value = 1.0
    br.inputs['Row Height'].default_value = 1.0
    br.inputs['Color1'].default_value = (0.560, 0.520, 0.485, 1)
    br.inputs['Color2'].default_value = (0.535, 0.497, 0.462, 1)
    br.inputs['Mortar'].default_value = (0.455, 0.420, 0.392, 1)
    nt.links.new(co.outputs['Object'], mp.inputs['Vector'])
    nt.links.new(mp.outputs['Vector'], br.inputs['Vector'])
    nt.links.new(br.outputs['Color'], b.inputs['Base Color'])
    # la junta es mate; la baldosa, pulida
    rug = nt.nodes.new('ShaderNodeMapRange'); rug.location = (-520, -200)
    rug.inputs['To Min'].default_value = 0.42
    rug.inputs['To Max'].default_value = 0.10
    nt.links.new(br.outputs['Fac'], rug.inputs['Value'])
    nt.links.new(rug.outputs['Result'], b.inputs['Roughness'])
    return m

def mat_lacado():
    """Lacado crema de los muebles bajos del fondo."""
    m, nt, b = material('LacadoCrema')
    set_in(b, 'Base Color', (0.620, 0.575, 0.520, 1))
    set_in(b, 'Roughness', 0.34); set_in(b, 'Specular', 0.5); set_in(b, 'Coat', 0.18)
    return m

def mat_cuero():
    """Cuero marron oscuro del asiento: mate con brillo suave y grano fino."""
    m, nt, b = material('CueroMarron')
    set_in(b, 'Base Color', (0.085, 0.038, 0.030, 1))
    set_in(b, 'Roughness', 0.52)
    set_in(b, 'Specular', 0.26)
    # Sin sheen: sobre un cuero oscuro con el entorno claro de esta cocina
    # lavaba el asiento a gris (152,130,117 frente a 96,58,49 en la portada).
    set_in(b, 'Sheen', 0.0)
    gr = _ruido(nt, -760, 210.0, 4.0, 0.45, (1.0, 1.0, 1.0))
    bump = nt.nodes.new('ShaderNodeBump'); bump.location = (-330, -280)
    bump.inputs['Strength'].default_value = 0.10
    nt.links.new(gr.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def mat_acero():
    """Acero cepillado de pie y columna."""
    m, nt, b = material('AceroCepillado')
    set_in(b, 'Base Color', (0.560, 0.565, 0.570, 1))
    set_in(b, 'Metallic', 1.0)
    set_in(b, 'Roughness', 0.22)
    if 'Anisotropic' in b.inputs:
        b.inputs['Anisotropic'].default_value = 0.55
    return m

def mat_clay():
    m, nt, b = material('Clay')
    set_in(b, 'Base Color', (0.62, 0.62, 0.62, 1))
    set_in(b, 'Roughness', 0.62); set_in(b, 'Specular', 0.2)
    return m

def mat_emision(nombre, color, fuerza):
    m = bpy.data.materials.new(nombre); m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        if n.type != 'OUTPUT_MATERIAL': nt.nodes.remove(n)
    out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = color
    em.inputs['Strength'].default_value = fuerza
    nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
    return m



# ------------------------------------------------------------------- luces
# Potencias calibradas contra las sondas de la portada (scripts/sondas.py).
# La escena vive de fuentes practicas: ventana lateral, tiras LED y el onix.
TECHO_Z = 3.55
# La exposicion forma parte del look, asi que vive aqui y entra en el bucle en
# vivo. Calibrada a la mediana de la portada (0.549).
EXPOSICION = 0.17
FUERZA_VENTANAL = 1.7

def _luz(nombre, tipo, loc, **kw):
    """Crea o actualiza una luz por nombre, para poder reaplicar sin duplicar."""
    ob = bpy.data.objects.get(nombre)
    if ob is None or ob.type != 'LIGHT':
        d = bpy.data.lights.new(nombre, type=tipo)
        ob = bpy.data.objects.new(nombre, d)
        bpy.context.collection.objects.link(ob)
    ob.data.type = tipo
    ob.location = loc
    for k, v in kw.items():
        if k == 'rot':
            ob.rotation_euler = v
        else:
            setattr(ob.data, k, v)
    return ob

def _vincular_solo_a(luz, nombres):
    """Restringe una luz a iluminar unicamente los objetos dados (light linking)."""
    try:
        col = bpy.data.collections.get('luz_' + luz.name)
        if col is None:
            col = bpy.data.collections.new('luz_' + luz.name)
        for ob in list(col.objects):
            col.objects.unlink(ob)
        for n in nombres:
            ob = bpy.data.objects.get(n)
            if ob is not None:
                col.objects.link(ob)
        luz.light_linking.receiver_collection = col
    except Exception as e:
        print(f"[luces] light linking no disponible ({e}); "
              f"se baja la potencia de {luz.name} como alternativa")
        luz.data.energy *= 0.35

def aplicar_luces():
    import math
    # En la portada el ventanal marca 179/146/127: apenas mas claro que la
    # pared, o sea que NO es una fuente quemada. Asi que el cristal visible va
    # tenue (FUERZA_VENTANAL) y el relleno de la sala lo da este foco grande de
    # fuera, oculto a camara para que no aparezca como un rectangulo blanco.
    lz = _luz('LuzVentana', 'AREA', (-9.10, 3.95, 2.10), shape='RECTANGLE',
              size=4.2, size_y=3.6, energy=3400.0, color=(1.0, 0.95, 0.88),
              rot=(math.radians(90), 0, math.radians(-90)))
    lz.visible_camera = False
    # sin reflejo especular: es un relleno que hace de ventana, no una ventana.
    # Con visible_glossy su imagen se estampaba como una banda blanca sobre el
    # nogal de la isla, que la portada no tiene.
    lz.visible_glossy = False

    # El techo salia demasiado claro y demasiado frio frente a la portada
    # (factores 0.91/0.80/0.77): menos potencia y mas ambar.
    _luz('RellenoTecho', 'AREA', (-3.2, 4.2, TECHO_Z - 0.06), shape='RECTANGLE',
         size=5.0, size_y=3.2, energy=26.0, color=(1.0, 0.76, 0.55))

    _luz('TraseraOnix', 'AREA', (-2.4, 4.6, 2.05), shape='RECTANGLE', size=3.0,
         size_y=1.9, energy=90.0, color=(1.0, 0.70, 0.42),
         rot=(math.radians(-90), 0, 0))

    # El frente de la isla quedaba 1.5x oscuro respecto a la portada mientras
    # las columnas ya estaban bien: es reparto de luz, no albedo. Rasante calida
    # que ademas revela los flautados del tambor, que el cuerpo de la isla
    # dejaba en sombra.
    # baja y estrecha: solo debe lamer el frente, no subir a la encimera, que
    # con la version anterior salia un 27% mas clara que en la portada.
    _luz('RasanteIsla', 'AREA', (-5.10, 2.05, 0.45), shape='RECTANGLE', size=2.0,
         size_y=0.55, energy=110.0, color=(1.0, 0.82, 0.62),
         rot=(math.radians(90), 0, math.radians(-72)))

    # Los flautados solo existen si algo los lame. La rasante de la isla queda
    # a 4 m y el propio cuerpo de la isla la bloquea, asi que el tambor necesita
    # su propia fuente, delante del frente (Y<3.20) y a su izquierda.
    rt = _luz('RasanteTambor', 'AREA', (-2.30, 2.30, 0.46), shape='RECTANGLE',
              size=0.9, size_y=0.6, energy=34.0, color=(1.0, 0.80, 0.58),
              rot=(math.radians(90), 0, math.radians(-96)))
    # Queda a 1 m del cuerpo de la isla y lo blanqueaba (la sonda nogal_isla se
    # iba a 0.73). Con light linking solo alcanza al tambor, que es para lo
    # unico que esta.
    _vincular_solo_a(rt, ['IslaTambor'])

    # Mundo: el factor azul se disparaba en sombra (1.76 en las columnas, 3.02
    # en el suelo lejano) porque el ambiente era oscuro y calido. La portada
    # tiene relleno de dia; se sube y se enfria.
    bpy.context.scene.view_settings.exposure = EXPOSICION
    w = bpy.context.scene.world or bpy.data.worlds.new('W')
    bpy.context.scene.world = w
    w.use_nodes = True
    bg = w.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (0.125, 0.131, 0.147, 1)
    bg.inputs['Strength'].default_value = 1.0

# --------------------------------------------------------------- asignacion
# objeto -> clave de material. Los nombres son los que crea escena.py.
MAPA = {
    'Suelo':          'suelo',
    'Techo':          'techo',
    'ParedFondo':     'muro',
    'ParedIzq':       'muro',
    'ParedIzqA':      'muro',
    'ParedIzqB':      'muro',
    'ParedIzqC':      'muro',
    'ParedIzqD':      'muro',
    'Ventanal':       'ventanal',
    'BajosFondo':     'lacado',
    'EncimeraFondo':  'piedra',
    'OnixFondo':      'onix',
    'LedOnixInf':     'led',
    'LedAltosOnix':   'led',
    'LedIsla':        'led',
    'ColumnasNogal':  'nogal',
    'AltosIzq':       'nogal',
    'AltosOnix':      'nogal',
    'IslaCuerpo':     'nogal',
    'IslaTambor':     'onix_macizo',
    'IslaEncimera':   'piedra',
    'TabureteA_asiento': 'cuero', 'TabureteA_pie': 'acero',
    'TabureteA_colbaja': 'acero', 'TabureteA_colalta': 'acero',
    'TabureteA_reposa': 'acero',
    'TabureteB_asiento': 'cuero', 'TabureteB_pie': 'acero',
    'TabureteB_colbaja': 'acero', 'TabureteB_colalta': 'acero',
    'TabureteB_reposa': 'acero',
    'TabureteC_asiento': 'cuero', 'TabureteC_pie': 'acero',
    'TabureteC_colbaja': 'acero', 'TabureteC_colalta': 'acero',
    'TabureteC_reposa': 'acero',
}

def construir_materiales(clay=False):
    if clay:
        c = mat_clay()
        M = {k: c for k in ('nogal', 'onix', 'onix_macizo', 'piedra', 'muro',
                            'techo', 'suelo', 'lacado', 'cuero', 'acero')}
        M['led'] = mat_emision('LED', (1.0, 0.72, 0.42, 1), 9.0)
        M['ventanal'] = mat_emision('Ventanal', (1, 1, 1, 1), 6.0)
        return M
    return {
        'nogal':  mat_nogal(),
        'onix':   mat_onix(),
        'onix_macizo': mat_onix_macizo(),
        'piedra': mat_piedra(),
        'muro':   mat_microcemento(),
        'techo':  mat_techo(),
        'suelo':  mat_porcelanico(),
        'lacado': mat_lacado(),
        'cuero':  mat_cuero(),
        'acero':  mat_acero(),
        'led':    mat_emision('LED', (1.0, 0.72, 0.42, 1), 11.0),
        # El ventanal como geometria emisiva, no como foco: asi se ve en cuadro
        # y reparte luz como en la portada. La potencia es ajustable en vivo.
        'ventanal': mat_emision('Ventanal', (1.0, 0.955, 0.90, 1), FUERZA_VENTANAL),
    }

def aplicar(clay=False, verbose=True):
    """Rehace los materiales y los reasigna. No toca geometria ni camara.

    Desasigna y purga ANTES de construir: si se construye primero, los viejos
    siguen ocupando el nombre y los nuevos nacen como 'Nogal.001', que ensucia
    el fichero tras unas cuantas recargas.
    """
    objetivos = [ob for ob in bpy.context.scene.objects
                 if ob.type == 'MESH' and ob.name in MAPA]
    for ob in objetivos:
        ob.data.materials.clear()
    for m in list(bpy.data.materials):
        if m.users == 0:
            bpy.data.materials.remove(m)

    M = construir_materiales(clay=clay)
    for ob in objetivos:
        ob.data.materials.append(M[MAPA[ob.name]])
    aplicar_luces()
    if verbose:
        print(f"[materiales] reaplicados a {len(objetivos)} objetos: "
              f"{', '.join(sorted(M))}  + luces")
    return M
