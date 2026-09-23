"""Recorrido de camara para la transicion pre-renderizada.

t=0 es exactamente la camara de la portada, asi que el primer fotograma empalma
con la imagen que ya esta en la web. De ahi entra hacia el tambor de onix y el
frente de la isla, que es donde estan los materiales que la transicion enseña.

El movimiento NO es un dolly puro: el eje optico de la portada sale por la
derecha de la cocina (a Y=5.90 ya va por X=3.73, fuera de la sala), asi que un
avance recto se llevaria la camara de paseo. Es un travelling con paneo suave
hacia el objetivo, interpolando la rotacion por slerp.
"""
import math
import numpy as np
from mathutils import Matrix, Quaternion, Vector

import camera as K

# Punto al que se entra: junta entre el tambor flautado y el frente de nogal,
# con el panel de onix retroiluminado al fondo del encuadre.
OBJETIVO = Vector((-1.15, 3.24, 0.62))
# Posicion final: a 1.45 m del objetivo, manteniendo el lado desde el que la
# rasante revela los flautados.
POS_FINAL = Vector((-1.62, 1.86, 0.96))


def _rot_mirando(pos, objetivo, arriba=Vector((0, 0, 1))):
    """Rotacion de camara de Blender (mira por -Z local) que apunta al objetivo."""
    d = (pos - objetivo).normalized()          # +Z local = hacia atras
    x = arriba.cross(d)
    if x.length < 1e-6:
        x = Vector((1, 0, 0))
    x.normalize()
    y = d.cross(x)
    return Matrix((x, y, d)).transposed()


def pose(t):
    """Devuelve la matrix_world de la camara para t en [0, 1]."""
    t = max(0.0, min(1.0, float(t)))
    # suavizado en ambos extremos: arranca y para sin tiron
    e = t * t * (3.0 - 2.0 * t)

    m0 = Matrix([list(r) for r in K.matriz_blender()])
    p0 = m0.to_translation()
    q0 = m0.to_quaternion()

    p1 = POS_FINAL
    q1 = _rot_mirando(p1, OBJETIVO).to_quaternion()

    p = p0.lerp(p1, e)
    q = q0.slerp(q1, e)
    m = q.to_matrix().to_4x4()
    m.translation = p
    return m


def focal(t):
    """La focal no cambia: el acercamiento es fisico, no un zoom de objetivo.

    Un zoom aplanaria la perspectiva y delataria que es un truco; moviendo la
    camara los paralajes son reales y el material gana volumen al acercarse.
    """
    return K.F_MM36
