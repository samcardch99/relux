"""Lamina A/B: portada contra render, con detalles emparejados de cada material."""
import cv2, numpy as np, os, sys
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ref = cv2.imread(os.path.join(RAIZ, 'ref', 'portada.png'))
ren = cv2.imread(sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, 'renders', 'full.png'))

# Recortes en pixeles de la portada (2400x1350). Como la geometria esta alineada,
# el mismo rectangulo vale para las dos imagenes: es justo lo que se compara.
DETALLES = [
    ('nogal de la isla',    (850, 860, 460, 230)),
    ('onix retroiluminado', (1180, 560, 500, 200)),
    ('tambor flautado',     (1440, 870, 340, 300)),
]
FUENTE = cv2.FONT_HERSHEY_SIMPLEX

def etiqueta(img, texto, escala=0.8):
    cv2.rectangle(img, (0, 0), (img.shape[1], 34), (22, 22, 22), -1)
    cv2.putText(img, texto, (10, 24), FUENTE, escala, (0, 240, 255), 2, cv2.LINE_AA)
    return img

anchura = 960
def mitad(im, t):
    h = int(im.shape[0] * anchura / im.shape[1])
    out = np.full((h + 34, anchura, 3), 22, np.uint8)
    out[34:] = cv2.resize(im, (anchura, h), interpolation=cv2.INTER_AREA)
    return etiqueta(out, t)

arriba = np.hstack([mitad(ref, 'PORTADA (referencia)'), mitad(ren, 'RENDER Blender (blockout + materiales)')])

filas = []
for nombre, (x, y, w, h) in DETALLES:
    par = []
    for im, t in ((ref, 'portada'), (ren, 'render')):
        c = im[y:y+h, x:x+w]
        c = cv2.resize(c, (640, int(640*h/w)), interpolation=cv2.INTER_CUBIC)
        blk = np.full((c.shape[0] + 34, 640, 3), 22, np.uint8)
        blk[34:] = c
        par.append(etiqueta(blk, f'{nombre} — {t}', 0.62))
    filas.append(np.hstack(par))

alto_total = max(arriba.shape[1], 1280)
arriba = cv2.resize(arriba, (alto_total, int(arriba.shape[0]*alto_total/arriba.shape[1])))
filas = [cv2.resize(f, (alto_total, int(f.shape[0]*alto_total/f.shape[1]))) for f in filas]
lamina = np.vstack([arriba] + filas)
ruta = os.path.join(RAIZ, 'renders', 'AB.png')
cv2.imwrite(ruta, lamina)
print('lamina escrita en', ruta, lamina.shape)
