"""Construye el blockout de la cocina de portada y lo renderiza con la camara resuelta.

Uso:  blender --background --python escena.py -- --modo clay --muestras 32
"""
import bpy, bmesh, sys, os, math, json, argparse
import numpy as np
from mathutils import Matrix, Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import camera as K
import materiales as MAT
import recorrido as REC
from materiales import set_in, material, mat_emision

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- parametros
# Todo en metros, mundo centrado en la camara (X pared, Y profundidad, Z arriba).
TECHO        = 3.55
PARED_Y      = 5.90      # plano de la pared del fondo
FRENTE_Y     = 5.30      # frente de los muebles bajos
ISLA_Y       = 3.20      # cara frontal de la isla
ISLA_FONDO   = 4.35      # cara trasera de la isla
ISLA_X0      = -4.30     # extremo izquierdo
ISLA_X1      = -1.28     # donde arranca el onix flautado
ISLA_X2      = -0.70     # extremo derecho del tambor
ISLA_ALTO    = 0.893     # cuerpo, sin encimera
LOSA         = 0.032     # canto de la encimera
COL_X0       = -0.79     # columnas de nogal de la derecha
COL_X1       =  2.60
COL_FONDO    = 0.68
ONIX_X0      = -4.00     # panel de onix del fondo
ONIX_X1      = -1.00
ONIX_Z0      = 0.95
ONIX_Z1      = 2.90
PARED_X0, PARED_X1 = -8.50, 6.20   # X de la pared izquierda: la esquina con la
                                   # del fondo cae en Y=5.93, contra 5.90 medido.
                                   # El limite derecho va holgado: con 3.2 el
                                   # final del recorrido de camara veia el vacio
                                   # por encima de las columnas.   # X de la pared izquierda: la esquina con la
                                  # del fondo cae en Y=5.93, contra 5.90 medido
# Ventanal: retroproyectado del hueco visible en la portada (x 128..320)
VENT_Y0, VENT_Y1 = 3.25, 4.72   # cristal + cortina: la cortina tambien emite,
                                # y es la mitad del hueco luminoso de la portada
VENT_Z0, VENT_Z1 = 0.54, 3.85

def limpiar():
    bpy.ops.wm.read_factory_settings(use_empty=True)

# ------------------------------------------------------------------ utiles
def caja(nombre, x0, x1, y0, y1, z0, z1, mat=None):
    me = bpy.data.meshes.new(nombre)
    ob = bpy.data.objects.new(nombre, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bm.to_mesh(me); bm.free()
    ob.scale = (x1-x0, y1-y0, z1-z0)   # create_cube(size=1) -> vertices en +-0.5
    ob.location = ((x0+x1)/2, (y0+y1)/2, (z0+z1)/2)
    bpy.context.view_layer.update()
    ob.data.transform(Matrix.Diagonal(ob.scale).to_4x4())
    ob.scale = (1, 1, 1)
    if mat: ob.data.materials.append(mat)
    return ob

def plano(nombre, x0, x1, y0, y1, z, mat=None):
    return caja(nombre, x0, x1, y0, y1, z-0.005, z+0.005, mat)

# --------------------------------------------------------------- geometria
def construir(clay=False):
    M = MAT.construir_materiales(clay=clay)

    plano('Suelo', PARED_X0, PARED_X1, -2.0, PARED_Y, 0.0, M['suelo'])
    plano('Techo', PARED_X0, PARED_X1, -2.0, PARED_Y, TECHO, M['muro'])
    caja('ParedFondo', PARED_X0, PARED_X1, PARED_Y, PARED_Y+0.2, 0, TECHO, M['muro'])
    # la pared izquierda se parte para dejar el hueco del ventanal en vez de
    # taparlo: es la fuente que rellena las sombras de toda la escena
    caja('ParedIzqA', PARED_X0-0.2, PARED_X0, -2.0, VENT_Y0, 0, TECHO, M['muro'])
    caja('ParedIzqB', PARED_X0-0.2, PARED_X0, VENT_Y1, PARED_Y, 0, TECHO, M['muro'])
    caja('ParedIzqC', PARED_X0-0.2, PARED_X0, VENT_Y0, VENT_Y1, 0, VENT_Z0, M['muro'])
    caja('ParedIzqD', PARED_X0-0.2, PARED_X0, VENT_Y0, VENT_Y1, VENT_Z1, TECHO, M['muro'])
    caja('Ventanal', PARED_X0-0.02, PARED_X0, VENT_Y0, VENT_Y1, VENT_Z0, VENT_Z1,
         M['ventanal'])

    # --- pared del fondo: muebles bajos, onix retroiluminado, columnas ---
    caja('BajosFondo', -7.60, COL_X0, FRENTE_Y, PARED_Y, 0, 0.90, M['lacado'])
    caja('EncimeraFondo', -7.60, COL_X0, FRENTE_Y-0.02, PARED_Y, 0.90, 0.94, M['piedra'])
    caja('OnixFondo', ONIX_X0, ONIX_X1, PARED_Y-0.03, PARED_Y, ONIX_Z0, ONIX_Z1, M['onix'])
    caja('LedOnixInf', ONIX_X0, ONIX_X1, PARED_Y-0.06, PARED_Y-0.03, ONIX_Z0-0.02, ONIX_Z0, M['led'])
    caja('ColumnasNogal', COL_X0, COL_X1, PARED_Y-COL_FONDO, PARED_Y, 0, TECHO-0.12, M['nogal'])
    caja('AltosIzq', -7.60, -4.05, PARED_Y-0.42, PARED_Y, 0.98, TECHO-0.10, M['nogal'])
    caja('AltosOnix', -3.62, -2.62, PARED_Y-0.38, PARED_Y-0.02, 1.86, 2.74, M['nogal'])
    caja('LedAltosOnix', -3.62, -2.62, PARED_Y-0.40, PARED_Y-0.37, 1.84, 1.87, M['led'])

    # --- isla ---
    caja('IslaCuerpo', ISLA_X0, ISLA_X1, ISLA_Y, ISLA_FONDO, 0, ISLA_ALTO, M['nogal'])
    tambor_flautado('IslaTambor', ISLA_X1, ISLA_X2, ISLA_Y, ISLA_FONDO,
                    0, ISLA_ALTO, radio=0.26, mat=M['onix_macizo'])
    caja('IslaEncimera', ISLA_X0-0.04, ISLA_X2+0.06, ISLA_Y-0.05, ISLA_FONDO+0.04,
         ISLA_ALTO, ISLA_ALTO+LOSA, M['piedra'])
    caja('LedIsla', ISLA_X0, ISLA_X1, ISLA_Y-0.012, ISLA_Y-0.002, 0.30, 0.33, M['led'])

    # Taburetes: en cuadro durante todo el recorrido y principal fuente de
    # rebote sobre el suelo, que es la sonda que sigue abierta.
    if not clay:
        for letra, x, giro in (('A', -3.47, 0.10), ('B', -2.89, 0.03), ('C', -2.38, -0.05)):
            taburete(letra, x, 2.77, giro, M)
    return M

def tambor_flautado(nombre, x0, x1, y0, y1, z0, z1, radio=0.26,
                    paso=0.034, prof=0.008, ancho_ranura=0.17, mat=None):
    """Tambor de extremo de isla con acanalado real.

    Dos cosas que hay que hacer bien o el tambor sale liso:

    - El perfil NO es un coseno. En la portada las flautas son caras planas
      separadas por ranuras estrechas en V, y son esas ranuras las que producen
      las lineas oscuras. Una ondulacion suave no las da, menos aun con onix
      translucido, que dispersa la luz y borra el sombreado sutil.
    - Hay que muestrear TODO el contorno, rectas incluidas. Muestrear solo los
      arcos de las esquinas deja las caras planas -justo la que mira a camara-
      sin un solo punto, o sea sin flauta ninguna.
    """
    cx0, cx1 = x0 + radio, x1 - radio
    cy0, cy1 = y0 + radio, y1 - radio
    tramos = [
        ('recta', (cx0, y0), (cx1, y0), (0.0, -1.0)),
        ('arco',  (cx1, cy0), -math.pi/2, 0.0),
        ('recta', (x1, cy0), (x1, cy1), (1.0, 0.0)),
        ('arco',  (cx1, cy1), 0.0, math.pi/2),
        ('recta', (cx1, y1), (cx0, y1), (0.0, 1.0)),
        ('arco',  (cx0, cy1), math.pi/2, math.pi),
        ('recta', (x0, cy1), (x0, cy0), (-1.0, 0.0)),
        ('arco',  (cx0, cy0), math.pi, 1.5*math.pi),
    ]
    muestra = paso / 12.0          # >=12 puntos por flauta
    perfil = []
    for tr in tramos:
        if tr[0] == 'recta':
            _, a, b_, n = tr
            largo_t = math.dist(a, b_)
            k = max(1, int(round(largo_t / muestra)))
            for i in range(k):
                u = i / k
                perfil.append((a[0] + (b_[0]-a[0])*u, a[1] + (b_[1]-a[1])*u,
                               n[0], n[1]))
        else:
            _, c, a0, a1 = tr
            largo_t = abs(a1 - a0) * radio
            k = max(2, int(round(largo_t / muestra)))
            for i in range(k):
                ang = a0 + (a1 - a0) * i / k
                perfil.append((c[0] + radio*math.cos(ang),
                               c[1] + radio*math.sin(ang),
                               math.cos(ang), math.sin(ang)))

    largo = [0.0]
    for i in range(1, len(perfil)):
        largo.append(largo[-1] + math.dist(perfil[i][:2], perfil[i-1][:2]))
    total = largo[-1] + math.dist(perfil[0][:2], perfil[-1][:2])
    n_flautas = max(1, round(total / paso))

    pts = []
    for (px, py, nx, ny), s_arc in zip(perfil, largo):
        fase = (n_flautas * s_arc / total) % 1.0
        borde = min(fase, 1.0 - fase)
        d = -prof * (1.0 - borde/ancho_ranura) if borde < ancho_ranura else 0.0
        pts.append((px + nx*d, py + ny*d))

    me = bpy.data.meshes.new(nombre)
    ob = bpy.data.objects.new(nombre, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    vs = [bm.verts.new((px, py, z0)) for px, py in pts]
    bm.faces.new(vs)
    ret = bmesh.ops.extrude_face_region(bm, geom=bm.faces[:])
    arriba = [v for v in ret['geom'] if isinstance(v, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=arriba, vec=(0, 0, z1 - z0))
    bm.normal_update()
    bm.to_mesh(me); bm.free()
    # plano, no suave: suavizar redondea la arista de la ranura y devuelve el
    # tambor liso, que es justo lo que se quiere evitar
    for pol in me.polygons:
        pol.use_smooth = False
    if mat:
        me.materials.append(mat)
    print(f"  {nombre}: {n_flautas} flautas de {total/n_flautas*1000:.1f} mm, "
          f"{len(pts)} puntos de contorno")
    return ob

# ------------------------------------------------------------- taburetes
# Cotas retroproyectadas de la portada: pletina en el suelo, columna hasta
# 0.543 m y respaldo hasta 1.248 m; separacion entre taburetes 0.66 m.
TAB_PLETINA   = 0.36
TAB_COL_ALTO  = 0.572     # cara inferior del asiento
TAB_RESPALDO  = 1.000     # remate del respaldo
TAB_ANCHO     = 0.42

def _girar(px, py, cx_, cy_, ang):
    c, sn = math.cos(ang), math.sin(ang)
    dx, dy = px - cx_, py - cy_
    return cx_ + dx*c - dy*sn, cy_ + dx*sn + dy*c

def _cilindro(nombre, r, z0, z1, x, y, mat=None, segmentos=32):
    """Cilindro ya colocado en coordenadas de mundo.

    Sin emparentado: al capturar matrix_parent_inverse antes de que Blender
    actualizara la escala del padre, la pletina (0.42 x 0.42 x 0.017) estiraba
    los hijos x58 en vertical. Cada pieza se genera donde va y punto.
    """
    me = bpy.data.meshes.new(nombre)
    ob = bpy.data.objects.new(nombre, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segmentos,
                          radius1=r, radius2=r, depth=z1 - z0)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(x, y, (z0 + z1) / 2))
    bm.to_mesh(me); bm.free()
    me.shade_smooth()
    for pol in me.polygons:
        if abs(pol.normal.z) > 0.9:
            pol.use_smooth = False
    if mat: me.materials.append(mat)
    return ob

def _pletina(nombre, x, y, lado, grosor, giro, mat):
    me = bpy.data.meshes.new(nombre)
    ob = bpy.data.objects.new(nombre, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    h = lado / 2
    esq = [(x-h, y-h), (x+h, y-h), (x+h, y+h), (x-h, y+h)]
    esq = [_girar(px, py, x, y, giro) for px, py in esq]
    abajo = [bm.verts.new((px, py, 0.0)) for px, py in esq]
    arriba = [bm.verts.new((px, py, grosor)) for px, py in esq]
    bm.faces.new(abajo[::-1]); bm.faces.new(arriba)
    for i in range(4):
        j = (i + 1) % 4
        bm.faces.new((abajo[i], abajo[j], arriba[j], arriba[i]))
    bm.normal_update(); bm.to_mesh(me); bm.free()
    if mat: me.materials.append(mat)
    bis = ob.modifiers.new('Bisel', 'BEVEL')
    bis.width = 0.0035; bis.segments = 2
    return ob

# Perfil lateral de la carcasa, en el plano YZ y relativo al eje del taburete:
# del borde delantero del asiento al remate del respaldo.
# Medido con base y respaldo sobre LA MISMA vertical: asiento a 0.573 y remate
# a 0.876. Tomar la base de un taburete y el respaldo del de al lado daba 1.248,
# un 40% de mas, y se notaba al instante contra la encimera.
_PERFIL_CARCASA = [
    (-0.190, 0.612), (-0.130, 0.598), (-0.050, 0.592), (0.048, 0.594),
    (0.118, 0.606), (0.158, 0.638), (0.176, 0.700), (0.184, 0.780),
    (0.183, 0.860), (0.176, 0.926), (0.158, 0.975), (0.122, 1.000),
]

def _carcasa(nombre, x, y, giro, mat, grosor=0.022, nv=17):
    """Carcasa de cuero: perfil lateral barrido a lo ancho con curvatura.

    Sin esa curvatura en seccion la pieza sale como una tabla doblada y se nota
    al instante que no es un asiento.
    """
    me = bpy.data.meshes.new(nombre)
    ob = bpy.data.objects.new(nombre, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    nu = len(_PERFIL_CARCASA)
    rejilla = []
    for i, (py, pz) in enumerate(_PERFIL_CARCASA):
        u = i / (nu - 1)
        fila = []
        for j in range(nv):
            v = -1.0 + 2.0 * j / (nv - 1)
            estrecha = 1.0 - 0.07 * v * v
            cuenco = 0.016 * v * v * (1.0 - 0.6 * u)
            ax = x + v * TAB_ANCHO / 2 * estrecha
            ay = y + py
            gx, gy = _girar(ax, ay, x, y, giro)
            fila.append(bm.verts.new((gx, gy, pz + cuenco)))
        rejilla.append(fila)
    for i in range(nu - 1):
        for j in range(nv - 1):
            bm.faces.new((rejilla[i][j], rejilla[i][j+1],
                          rejilla[i+1][j+1], rejilla[i+1][j]))
    bm.normal_update(); bm.to_mesh(me); bm.free()
    me.shade_smooth()
    if mat: me.materials.append(mat)
    sol = ob.modifiers.new('Grosor', 'SOLIDIFY')
    sol.thickness = grosor; sol.offset = 0.0
    bis = ob.modifiers.new('Bisel', 'BEVEL')
    bis.width = 0.006; bis.segments = 2; bis.limit_method = 'ANGLE'
    return ob

def _aro(nombre, x, y, z, radio, grosor, mat):
    """Reposapies como aro de barra fina.

    Con un cilindro plano se leia como un disco metalico bajo el asiento, que en
    la portada no existe.
    """
    me = bpy.data.meshes.new(nombre)
    ob = bpy.data.objects.new(nombre, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=False, segments=48, radius=radio)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(x, y, z))
    bm.to_mesh(me); bm.free()
    me.shade_smooth()
    if mat: me.materials.append(mat)
    sk = ob.modifiers.new('Barra', 'SKIN')
    for v in me.skin_vertices[0].data:
        v.radius = (grosor, grosor)
    sub = ob.modifiers.new('Suavizar', 'SUBSURF')
    sub.levels = 1; sub.render_levels = 2
    return ob

def taburete(letra, x, y, giro, M):
    """Taburete de barra completo, en su sitio y ya girado."""
    _pletina(f'Taburete{letra}_pie', x, y, TAB_PLETINA, 0.016, giro, M['acero'])
    _cilindro(f'Taburete{letra}_colbaja', 0.032, 0.016, 0.250, x, y, M['acero'])
    _cilindro(f'Taburete{letra}_colalta', 0.024, 0.250, TAB_COL_ALTO, x, y, M['acero'])
    _aro(f'Taburete{letra}_reposa', x, y, 0.185, 0.132, 0.008, M['acero'])
    _carcasa(f'Taburete{letra}_asiento', x, y, giro, M['cuero'])

def redondear(ob, radio, segmentos):
    me = ob.data
    bm = bmesh.new(); bm.from_mesh(me)
    aristas = [e for e in bm.edges
               if abs(e.verts[0].co.x - e.verts[1].co.x) < 1e-6
               and abs(e.verts[0].co.z - e.verts[1].co.z) < 1e-6]
    if aristas:
        bmesh.ops.bevel(bm, geom=aristas, offset=radio, segments=segmentos,
                        profile=0.5, affect='EDGES')
    bm.to_mesh(me); bm.free()

# ---------------------------------------------------------------- mascaras
PALETA = {
    'Suelo': (0.10, 0.10, 0.45), 'Techo': (0.45, 0.45, 0.10),
    'ParedFondo': (0.10, 0.35, 0.35), 'ParedIzq': (0.30, 0.15, 0.35),
    'BajosFondo': (0.90, 0.35, 0.10), 'EncimeraFondo': (1.00, 0.65, 0.10),
    'OnixFondo': (0.95, 0.95, 0.95), 'LedOnixInf': (1.00, 0.20, 0.60),
    'ColumnasNogal': (0.10, 0.70, 0.20), 'AltosIzq': (0.55, 0.90, 0.20),
    'AltosOnix': (0.75, 0.45, 0.95), 'LedAltosOnix': (1.00, 0.20, 0.60),
    'IslaCuerpo': (0.90, 0.10, 0.10), 'IslaTambor': (0.20, 0.55, 1.00),
    'IslaEncimera': (1.00, 1.00, 0.30), 'LedIsla': (1.00, 0.20, 0.60),
}

def pintar_mascaras():
    for ob in bpy.context.scene.objects:
        if ob.type != 'MESH':
            continue
        c = PALETA.get(ob.name, (0.5, 0.5, 0.5))
        m = mat_emision('M_' + ob.name, (c[0], c[1], c[2], 1), 1.0)
        ob.data.materials.clear()
        ob.data.materials.append(m)
    w = bpy.data.worlds.new('Wm'); bpy.context.scene.world = w
    w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.0

# ------------------------------------------------------------------- luces
def iluminar():
    MAT.aplicar_luces()

# ------------------------------------------------------------------ camara
def poner_camara(t=None):
    """t=None deja la camara de la portada; t en [0,1] la situa en el recorrido."""
    cam = bpy.data.cameras.new('CamPortada')
    ob = bpy.data.objects.new('CamPortada', cam)
    bpy.context.collection.objects.link(ob)
    cam.sensor_fit = 'HORIZONTAL'
    cam.sensor_width = 36.0
    cam.lens = K.F_MM36
    cam.shift_x = K.SHIFT_X; cam.shift_y = K.SHIFT_Y
    cam.clip_start = 0.05; cam.clip_end = 200.0
    if t is None:
        ob.matrix_world = Matrix([list(r) for r in K.matriz_blender()])
    else:
        ob.matrix_world = REC.pose(t)
        cam.lens = REC.focal(t)
    bpy.context.scene.camera = ob
    return ob

# ------------------------------------------------------------------ render
def ajustes(muestras, salida):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'GPU'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    try:
        prefs.compute_device_type = 'METAL'
        prefs.get_devices()
        for d in prefs.devices: d.use = True
    except Exception as e:
        print('GPU no disponible:', e)
    sc.cycles.samples = muestras
    sc.view_settings.exposure = float(os.environ.get('EXPO', MAT.EXPOSICION))
    sc.cycles.use_denoising = True
    sc.cycles.max_bounces = 8
    sc.cycles.transmission_bounces = 8
    sc.render.resolution_x = K.W
    sc.render.resolution_y = K.H_PX
    sc.render.resolution_percentage = 100
    sc.render.film_transparent = False
    if os.environ.get('PLANO'):
        sc.view_settings.view_transform = 'Standard'
        sc.view_settings.look = 'None'
    else:
        sc.view_settings.view_transform = 'AgX'
        sc.view_settings.look = 'AgX - Base Contrast'
    sc.render.image_settings.file_format = 'PNG'
    sc.render.filepath = salida

def main():
    argv = sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
    ap = argparse.ArgumentParser()
    ap.add_argument('--modo', default='clay', choices=['clay', 'full', 'mask'])
    ap.add_argument('--muestras', type=int, default=32)
    ap.add_argument('--salida', default=None)
    ap.add_argument('--t', type=float, default=None,
                    help='posicion en el recorrido de camara, 0=portada 1=final')
    a = ap.parse_args(argv)

    limpiar()
    construir(clay=(a.modo in ('clay', 'mask')))
    if a.modo == 'mask':
        pintar_mascaras()
    else:
        iluminar()
    poner_camara(a.t)
    salida = a.salida or os.path.join(RAIZ, 'renders', f'{a.modo}_')
    ajustes(a.muestras, salida)
    bpy.ops.render.render(write_still=True)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(RAIZ, 'cocina_poc.blend'))
    print('RENDER_OK', salida)

main()
