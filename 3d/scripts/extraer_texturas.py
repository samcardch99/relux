"""Rectifica regiones de la portada sobre planos conocidos para usarlas como texturas.

Como la camara esta resuelta y sabemos en que plano esta cada superficie, se puede
invertir la perspectiva y recuperar la textura plana y a escala metrica. Lleva la
iluminacion original horneada: ideal para igualar la portada, inutil para relightear.
"""
import cv2, numpy as np, os, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import camera as K

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = cv2.imread(os.path.join(RAIZ, 'ref', 'portada.png'))

def rectificar(P0, U, V, u0, u1, v0, v1, px_por_m=260):
    """Muestrea el plano P0 + u*U + v*V y devuelve la textura desenrollada."""
    W = max(8, int(round((u1-u0)*px_por_m)))
    H = max(8, int(round((v1-v0)*px_por_m)))
    us = u0 + (np.arange(W)+0.5)/W*(u1-u0)
    vs = v1 - (np.arange(H)+0.5)/H*(v1-v0)          # v arriba -> fila 0
    UU, VV = np.meshgrid(us, vs)
    P = (np.array(P0)[None,None,:]
         + UU[...,None]*np.array(U)[None,None,:]
         + VV[...,None]*np.array(V)[None,None,:])
    d = P - K.C[None,None,:]
    cam = d @ K.R.T                                   # v_cam = R @ v_mundo
    z = cam[...,2]
    mapx = (K.CX + K.F_PX*cam[...,0]/np.where(z==0,1e-9,z)).astype(np.float32)
    mapy = (K.CY + K.F_PX*cam[...,1]/np.where(z==0,1e-9,z)).astype(np.float32)
    tex = cv2.remap(SRC, mapx, mapy, cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    valido = ((z > 0) & (mapx >= 0) & (mapx < K.W) & (mapy >= 0) & (mapy < K.H_PX))
    return tex, valido, (W, H)

X = (1.0, 0.0, 0.0); Y = (0.0, 1.0, 0.0); Z = (0.0, 0.0, 1.0)

TRABAJOS = {
    # nombre           P0                 U  V   u0     u1     v0     v1    px/m
    'onix_fondo':   ((0, 5.895, 0),      X, Z, -4.00, -1.00,  0.95,  2.90, 240),
    'nogal_columna':((0, 5.220, 0),      X, Z, -0.79,  1.60,  0.06,  3.00, 240),
    'nogal_isla':   ((0, 3.200, 0),      X, Z, -4.28, -1.30,  0.02,  0.88, 280),
    'piedra_encim': ((0, 3.150, 0.925),  X, Y, -3.60, -1.40,  0.05,  0.95, 300),
    'suelo':        ((0, 0, 0.0),        X, Y, -3.20,  0.30,  1.30,  3.05, 220),
}

if __name__ == '__main__':
    sal = os.path.join(RAIZ, 'textures')
    os.makedirs(sal, exist_ok=True)
    meta = {}
    for nombre, (P0, U, V, u0, u1, v0, v1, ppm) in TRABAJOS.items():
        tex, val, (W, H) = rectificar(P0, U, V, u0, u1, v0, v1, ppm)
        ruta = os.path.join(sal, nombre + '.png')
        cv2.imwrite(ruta, tex)
        meta[nombre] = {'ancho_m': round(u1-u0, 4), 'alto_m': round(v1-v0, 4),
                        'px': [W, H], 'px_por_m': ppm,
                        'cobertura': round(float(val.mean()), 4)}
        print(f"{nombre:15s} {W:4d}x{H:4d} px  {u1-u0:.2f} x {v1-v0:.2f} m  "
              f"dentro de cuadro {100*val.mean():5.1f}%")
    json.dump(meta, open(os.path.join(sal, 'texturas.json'), 'w'), indent=2)


# --------------------------------------------------------------------------
# Recortes limpios + des-iluminado.
#
# Las muestras rectificadas llevan la luz de la portada horneada (sombras de los
# taburetes, degradado de las tiras LED). Para usarlas como albedo tileable hay
# que quitar esa componente: se divide por una version muy desenfocada de si
# misma, lo que conserva veta y vetas pero aplana la iluminacion.
RECORTES = {
    # origen            x0   y0   lado  px_por_m
    'nogal_albedo':  ('nogal_columna', 130,  80, 200, 240),
    'onix_albedo':   ('onix_fondo',     350, 295, 160, 240),
}

def desiluminar(img, sigma_rel=0.22):
    """Divide solo por la LUMINANCIA desenfocada.

    Dividir canal a canal normaliza cada uno a su media local y se lleva por
    delante el color (el nogal salia gris azulado). La iluminacion es casi
    acromatica, asi que estimarla en luminancia y aplicarla por igual a los tres
    canales quita la sombra y conserva el tono.
    """
    f = img.astype(np.float32) + 1.0
    s = max(3, int(sigma_rel * max(img.shape[:2])) | 1)
    lum = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) + 1.0
    luz = cv2.GaussianBlur(lum, (0, 0), s)
    ganancia = (luz.mean() / luz)[..., None]
    return np.clip(f * ganancia, 0, 255).astype(np.uint8)

def recortar():
    sal = os.path.join(RAIZ, 'textures')
    meta = json.load(open(os.path.join(sal, 'texturas.json')))
    for nombre, (origen, x0, y0, lado, ppm) in RECORTES.items():
        src = cv2.imread(os.path.join(sal, origen + '.png'))
        rec = src[y0:y0+lado, x0:x0+lado]
        alb = desiluminar(rec)
        alb = cv2.resize(alb, (512, 512), interpolation=cv2.INTER_CUBIC)
        cv2.imwrite(os.path.join(sal, nombre + '.png'), alb)
        meta[nombre] = {'lado_m': round(lado/ppm, 4), 'origen': origen,
                        'px': [512, 512], 'desiluminado': True}
        print(f"{nombre:15s} recorte {lado}x{lado} px = {lado/ppm:.3f} m de lado "
              f"-> 512x512 des-iluminado")
    json.dump(meta, open(os.path.join(sal, 'texturas.json'), 'w'), indent=2)

if os.environ.get('RECORTAR'):
    recortar()
