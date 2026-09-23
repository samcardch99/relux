"""Sondas de color: compara parches equivalentes entre la portada y el render.

Ajustar materiales a ojo es lento y se va de tono. Esto mide el color medio de
cada material en las dos imagenes y da el factor de correccion a aplicar.
"""
import cv2, numpy as np, os, sys
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# nombre -> (x, y, w, h) en pixeles de la portada 2400x1350
SONDAS = {
    'suelo_cerca':  (260, 1180, 150,  90),
    'suelo_medio':  (1750, 1210, 160,  80),
    'suelo_lejos':  (2050, 1010, 140,  45),
    'encimera_isla':(700,  762, 220,  18),
    'pared_izq':    (40,   330,  70, 150),
    'ventanal':     (150,  420,  60, 200),
    'cuero_taburete':(855, 800,  48,  70),
    'techo':        (620,   30, 240,  36),
    'nogal_isla':   (1150,  900, 150, 110),
    'onix_fondo':   (1290,  620, 170,  70),
    'nogal_columna':(2150,  250, 150, 300),
}

def medio(im, r):
    x, y, w, h = r
    p = im[y:y+h, x:x+w].reshape(-1, 3).astype(float)
    return p.mean(axis=0)[::-1]           # -> RGB

if __name__ == '__main__':
    ref = cv2.imread(os.path.join(RAIZ, 'ref', 'portada.png'))
    ruta = sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, 'renders', 'full.png')
    ren = cv2.imread(ruta) if os.path.exists(ruta) else None

    vis = ref.copy()
    print(f"{'sonda':15s} {'portada RGB':18s} {'render RGB':18s} {'factor R,G,B':20s}")
    for nombre, r in SONDAS.items():
        a = medio(ref, r)
        cv2.rectangle(vis, (r[0], r[1]), (r[0]+r[2], r[1]+r[3]), (0, 255, 255), 3)
        cv2.putText(vis, nombre, (r[0], max(18, r[1]-8)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.62, (0, 255, 255), 2)
        if ren is None:
            print(f"{nombre:15s} ({a[0]:5.1f},{a[1]:5.1f},{a[2]:5.1f})")
            continue
        b = medio(ren, r)
        f = np.where(b > 1, a / np.maximum(b, 1e-6), 1.0)
        print(f"{nombre:15s} ({a[0]:5.1f},{a[1]:5.1f},{a[2]:5.1f})  "
              f"({b[0]:5.1f},{b[1]:5.1f},{b[2]:5.1f})  "
              f"{f[0]:5.2f} {f[1]:5.2f} {f[2]:5.2f}")
    sal = os.path.join(RAIZ, 'renders', 'sondas.png')
    cv2.imwrite(sal, cv2.resize(vis, (1600, 900)))
    print('\nubicacion de las sondas ->', sal)
