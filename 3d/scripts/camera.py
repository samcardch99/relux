"""Camara resuelta a partir de los puntos de fuga de public/assets/kitchen-dining.webp.

Las intrinsecas salen del ajuste RANSAC sobre las juntas del suelo (ver 3d/README.md):
verticales a 90.000 grados -> camara nivelada; punto principal a 1.2 px del centro
exacto -> sin desplazamiento de objetivo. Mundo centrado en la camara:
X = a lo largo de la pared del fondo, Y = profundidad, Z = arriba.
"""
import numpy as np

W, H_PX = 2400, 1350
VP_PARED = np.array([-1118.4, 670.6])   # direccion X
VP_FONDO = np.array([2130.3, 681.8])    # direccion Y
CX, CY = 1200.0, 676.2
F_PX = 1468.6
F_MM36 = F_PX / W * 36.0                # 22.03 mm en sensor de 36 mm
ALTURA_CAMARA = 1.20                    # m, fijada por los flautados de onix

def ejes():
    dX = np.array([VP_PARED[0]-CX, VP_PARED[1]-CY, F_PX]); dX /= np.linalg.norm(dX); dX = -dX
    dY = np.array([VP_FONDO[0]-CX, VP_FONDO[1]-CY, F_PX]); dY /= np.linalg.norm(dY)
    dZ = np.cross(dX, dY); dZ /= np.linalg.norm(dZ)
    return np.column_stack([dX, dY, dZ])   # mundo -> camara

R = ejes()
C = np.array([0.0, 0.0, ALTURA_CAMARA])

# Blender coloca el punto principal en el centro exacto; el nuestro esta 1.2 px
# mas abajo, asi que lo compensamos con shift_y (en unidades del ancho de sensor).
SHIFT_X = (CX - W/2) / W
SHIFT_Y = (CY - H_PX/2) / W


def matriz_blender():
    """matrix_world de la camara de Blender (mira por su -Z local, +Y arriba)."""
    M = np.diag([1.0, -1.0, -1.0])
    R_b = M @ R                 # mundo -> camara de Blender
    m = np.eye(4)
    m[:3, :3] = R_b.T
    m[:3, 3] = C
    return m

def proyectar(P):
    v = R @ (np.asarray(P, float) - C)
    if v[2] <= 1e-6: return None
    return np.array([CX + F_PX*v[0]/v[2], CY + F_PX*v[1]/v[2]])
