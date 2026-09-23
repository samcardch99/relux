"""Superpone un render sobre la portada para validar el encaje de camara y geometria."""
import cv2, numpy as np, sys, os
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ref = cv2.imread(os.path.join(RAIZ, 'ref', 'portada.png'))
ren = cv2.imread(sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ,'renders','clay.png'))
tag = sys.argv[2] if len(sys.argv) > 2 else 'clay'
if ren.shape[:2] != ref.shape[:2]:
    ren = cv2.resize(ren, (ref.shape[1], ref.shape[0]))

sal = os.path.join(RAIZ, 'renders')
cv2.imwrite(f'{sal}/{tag}_mezcla.png',
            cv2.resize(cv2.addWeighted(ref, 0.5, ren, 0.5, 0), (1600, 900)))

# bordes del render sobre la portada: lo que importa es si las aristas caen encima
g = cv2.cvtColor(ren, cv2.COLOR_BGR2GRAY)
e = cv2.Canny(cv2.GaussianBlur(g, (0,0), 1.0), 30, 90)
e = cv2.dilate(e, np.ones((2,2), np.uint8))
ov = ref.copy(); ov[e > 0] = (0, 255, 0)
cv2.imwrite(f'{sal}/{tag}_aristas.png', cv2.resize(ov, (1600, 900)))

# bandas alternas: 8 franjas verticales, referencia / render
bandas = ref.copy(); n = 8; w = ref.shape[1] // n
for i in range(n):
    if i % 2: bandas[:, i*w:(i+1)*w] = ren[:, i*w:(i+1)*w]
cv2.imwrite(f'{sal}/{tag}_bandas.png', cv2.resize(bandas, (1600, 900)))
def stats(nombre, im):
    l = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(float) / 255
    b, g, r = [c.mean() for c in cv2.split(im.astype(float))]
    print(f"{nombre:9s} media={l.mean():.3f} p05={np.percentile(l,5):.3f} "
          f"p50={np.percentile(l,50):.3f} p95={np.percentile(l,95):.3f} "
          f"quemado={100*(l>0.99).mean():.2f}%  RGB=({r:.0f},{g:.0f},{b:.0f})")

stats('portada', ref)
stats(tag, ren)
d = cv2.absdiff(ref, ren)
print(f"diferencia media absoluta = {d.mean():.1f}/255")
cv2.imwrite(f'{sal}/{tag}_diferencia.png',
            cv2.resize(cv2.applyColorMap((d.mean(axis=2)*2).clip(0,255).astype('uint8'),
                                         cv2.COLORMAP_INFERNO), (1600, 900)))
print('comparaciones escritas en', sal)
