"""Comprueba que la camara de Blender proyecta igual que scripts/camera.py."""
import bpy, sys, os
import numpy as np
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Matrix, Vector
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import camera as K

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.resolution_x, sc.render.resolution_y = K.W, K.H_PX
cam = bpy.data.cameras.new('C'); ob = bpy.data.objects.new('C', cam)
bpy.context.collection.objects.link(ob)
cam.sensor_fit = 'HORIZONTAL'; cam.sensor_width = 36.0; cam.lens = K.F_MM36
cam.shift_x = K.SHIFT_X; cam.shift_y = K.SHIFT_Y
ob.matrix_world = Matrix([list(r) for r in K.matriz_blender()])
sc.camera = ob
bpy.context.view_layer.update()

puntos = [(-4.30,3.20,0.0), (-1.28,3.20,0.0), (-1.28,3.20,0.893),
          (-0.84,5.22,0.0), (-2.00,5.90,3.55), (0.43,3.65,0.0)]
print(f"{'mundo':26s} {'blender':18s} {'python':18s} {'error px':9s}")
peor = 0.0
for p in puntos:
    co = world_to_camera_view(sc, ob, Vector(p))
    b = np.array([co.x*K.W, (1.0-co.y)*K.H_PX])
    q = K.proyectar(p)
    e = float(np.linalg.norm(b-q)); peor = max(peor, e)
    print(f"{str(p):26s} ({b[0]:7.1f},{b[1]:7.1f}) ({q[0]:7.1f},{q[1]:7.1f}) {e:8.3f}")
print(f"\nerror maximo = {peor:.4f} px  ->", "OK" if peor < 0.5 else "DESAJUSTE")
