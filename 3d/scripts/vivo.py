"""Enlace en vivo: vigila materiales.py y lo reaplica sobre la escena abierta.

Ejecutar UNA vez dentro de Blender (pestana Scripting -> Abrir -> Alt+P).
A partir de ahi, cada guardado de scripts/materiales.py se aplica solo en
~1 segundo, sin tocar geometria ni camara. Poner la vista en Rendered para verlo.

Para pararlo: volver a ejecutar este script, o cerrar el fichero.
"""
import bpy, os, sys, importlib, traceback

AQUI = os.path.dirname(os.path.abspath(bpy.context.space_data.text.filepath)) \
    if getattr(bpy.context, 'space_data', None) and getattr(bpy.context.space_data, 'text', None) \
    else os.path.join(os.path.dirname(bpy.data.filepath), 'scripts')
if AQUI not in sys.path:
    sys.path.insert(0, AQUI)

VIGILADO = os.path.join(AQUI, 'materiales.py')
INTERVALO = 1.0
_estado = {'mtime': 0.0, 'activo': True}

def _recargar(motivo):
    try:
        import materiales
        importlib.reload(materiales)
        materiales.aplicar()
        print(f"[vivo] {motivo}: materiales reaplicados")
    except Exception:
        # un fallo no debe matar el timer: se corrige el fichero y reintenta solo
        print("[vivo] ERROR al aplicar materiales:")
        traceback.print_exc()

def _tic():
    if not _estado['activo']:
        return None
    try:
        m = os.path.getmtime(VIGILADO)
        if m > _estado['mtime']:
            _estado['mtime'] = m
            _recargar('cambio detectado')
    except FileNotFoundError:
        pass
    return INTERVALO

# si ya habia un vigilante, se apaga antes de arrancar el nuevo
for f in list(bpy.app.timers.get_list() if hasattr(bpy.app.timers, 'get_list') else []):
    if getattr(f, '__name__', '') == '_tic':
        try: bpy.app.timers.unregister(f)
        except Exception: pass

if bpy.app.timers.is_registered(_tic):
    bpy.app.timers.unregister(_tic)
    _estado['activo'] = False
    print("[vivo] vigilante DETENIDO")
else:
    _estado['mtime'] = 0.0
    bpy.app.timers.register(_tic, first_interval=0.2, persistent=True)
    print(f"[vivo] vigilando {VIGILADO} cada {INTERVALO}s")
