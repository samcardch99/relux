# PoC de fidelidad — cocina de portada en Blender

Reconstruye en Blender la imagen de portada del sitio
(`public/assets/kitchen-dining.webp`) para validar que un modelo con materiales
puede igualarla. Es el paso 1 del plan: **si el render no se confunde con la
portada, no tiene sentido seguir con la transición web.**

## Resultado del match de cámara

La portada es un render CGI, no una foto: sin distorsión de lente, geometría
Manhattan limpia. La cámara se resolvió a partir de los puntos de fuga de las
juntas del suelo, con RANSAC y refinado por mínimos cuadrados.

| Magnitud | Valor | Cómo se comprobó |
|---|---|---|
| Verticales | 90.000° (mediana), σ=0.895° | 261 segmentos → cámara nivelada, sin roll ni tilt |
| Punto principal | (1200.0, 676.2) | a 1.2 px del centro exacto → objetivo sin desplazar |
| Focal | 1468.6 px = **22.03 mm** en sensor de 36 mm | FOV horizontal 78.50° |
| Ortogonalidad de los ejes | dot = 0.00000 | los dos PF son perpendiculares en 3D |
| Cobertura Manhattan | **93.3 %** de la longitud de línea | 226 segmentos > 100 px clasificados en 3 ejes |
| Altura de cámara | 1.20 m | por los flautados de ónix (suelo → bajo encimera) |

Puntos de fuga: dirección de la pared en `(-1118.4, 670.6)`, profundidad en
`(2130.3, 681.8)`. Ambos sobre el mismo horizonte (y difieren 11 px), que es la
comprobación de consistencia.

**Lo que parecía una esquina no lo es.** Los paneles de nogal de la derecha están
en el mismo plano que la pared del fondo; lo que los "gira" es el gran angular de
22 mm rakeando esa zona de la imagen. Modelarlos como pared perpendicular era el
error más fácil de cometer.

## Planta deducida

Todo en metros, mundo centrado en la cámara: X a lo largo de la pared del fondo,
Y en profundidad, Z arriba.

- Frente de la isla en **Y = 3.20**, longitud ≈ 3.5 m, cuerpo de **0.893 m**
  (encimera ≈ 0.92 m). La base de la isla converge al punto de fuga con un error
  de pendiente de 0.007 — es la validación más fuerte del ajuste.
- Frentes de los muebles bajos del fondo en **Y ≈ 5.30**; hueco de paso de 2.1 m.
- Techo a **≈ 3.55 m**.

## Texturas extraídas de la propia portada

Con la cámara resuelta y el plano de cada superficie conocido, se puede invertir
la perspectiva y recuperar la textura plana a escala métrica
(`scripts/extraer_texturas.py`). Es la vía práctica cuando sólo tienes una
imagen: no hace falta comprar librerías de materiales para igualar *esta* cocina.

| Muestra | Plano | Tamaño recuperado | Dentro de cuadro |
|---|---|---|---|
| `onix_fondo` | Y=5.895 | 3.00 × 1.95 m a 240 px/m | 100 % |
| `nogal_columna` | Y=5.220 | 2.39 × 2.94 m a 240 px/m | 59.5 % |
| `nogal_isla` | Y=3.200 | 2.98 × 0.86 m a 280 px/m | 100 % |
| `piedra_encim` | Z=0.925 | 2.20 × 0.90 m | inservible |
| `suelo` | Z=0 | 3.50 × 1.75 m | 49.3 % |

**Las superficies verticales se rectifican nítidas; las horizontales no.** La
encimera y el suelo se ven con un ángulo tan rasante que la densidad de píxeles
por metro se desploma y salen emborronadas. Encimera, suelo y cualquier plano
horizontal necesitan textura de fuera; el nogal y el ónix no.

De cada muestra se recorta un cuadrado limpio y se **des-ilumina** antes de
usarlo como albedo: se divide por su propia luminancia muy desenfocada, lo que
quita la sombra de los taburetes y el degradado de las tiras LED y conserva veta
y vetas. Dividir canal a canal en vez de por la luminancia normaliza cada canal
a su media y deja la madera gris azulada — hay que hacerlo sólo en luminancia.

## Estructura

```
3d/
├── ref/portada.png          copia sin pérdida de la portada
├── textures/                muestras rectificadas + albedos des-iluminados
├── scripts/
│   ├── camera.py            cámara resuelta; única fuente de verdad
│   ├── test_camara.py       comprueba Blender contra camera.py (error < 0.5 px)
│   ├── extraer_texturas.py  rectifica regiones de la portada sobre planos
│   ├── materiales.py        materiales, luces y exposicion (recargable en vivo)
│   ├── vivo.py              vigila materiales.py y lo reaplica en la sesion
│   ├── sondas.py            compara parches portada/render y da el factor
│   ├── ab.py                lamina A/B con detalles emparejados
│   ├── escena.py            construye el blockout y renderiza
│   └── comparar.py          superposiciones y estadísticas contra la portada
└── renders/
```

## Uso

```sh
# la cámara de Blender debe coincidir con la analítica antes de nada
blender --background --python scripts/test_camara.py

# máscaras por objeto: para ver qué arista es cuál sobre la portada
PLANO=1 blender --background --python scripts/escena.py -- --modo mask --muestras 1

# blockout gris y render con materiales
blender --background --python scripts/escena.py -- --modo clay --muestras 24
blender --background --python scripts/escena.py -- --modo full --muestras 64

python3 scripts/comparar.py renders/full.png full
python3 scripts/sondas.py renders/full.png     # factores de correccion
python3 scripts/ab.py     renders/full.png     # lamina comparativa

# rectificar texturas y recortar los albedos limpios
RECORTAR=1 python3 scripts/extraer_texturas.py
```

`comparar.py` escribe mezcla al 50 %, aristas sobre la portada, bandas alternas y
mapa de diferencia, e imprime media/percentiles/quemados de ambas imágenes.

## Veredicto del PoC

Render final: 2400×1350, Cycles, 96 muestras, **1 min 35 s** en M5 Pro (Metal + CPU).

| | portada | render |
|---|---|---|
| luminancia media | 0.523 | 0.511 |
| mediana | 0.549 | 0.533 |
| p95 | 0.871 | 0.859 |
| píxeles quemados | 0.44 % | 0.00 % |
| balance RGB | (163,124,103) | (150,125,107) |

Comparación material a material en `renders/AB.png`:

- **Nogal — pasa.** Tono, veta, juntas de panel y la tira LED empotrada son
  indistinguibles a escala de portada. No hace falta más trabajo aquí.
- **Ónix retroiluminado — pasa.** Crema con vetas ámbar y el resplandor de la
  retroiluminación. Algo menos contrastado que el original, se ajusta subiendo
  la emisión y bajando el difuso.
- **Tambor flautado — no pasa todavía.** Las 72 flautas de 41.9 mm existen como
  geometría, pero apenas se leen: en la portada las revela una luz rasante que
  aquí no llega, porque el cuerpo de la isla tapa la ventana. **El problema es
  de iluminación, no de modelado** — es el hallazgo que más condiciona la fase
  siguiente, porque el zoom web vive justo de estos detalles.

**Lo que no está modelado** y explica la mayor parte de la diferencia media de
49.9/255: taburetes, mesa y sillas de comedor, electrodomésticos, grifería,
atrezzo, la ventana con cortina de la izquierda y el despiece fino de los
muebles altos.

**Conclusión: la fidelidad es alcanzable.** Cámara y proporciones están
resueltas y verificadas, y los dos materiales protagonistas ya igualan. Lo que
queda es volumen de trabajo acotado (props e iluminación práctica), no riesgo
técnico.

## Ajuste de materiales contra la portada

`scripts/sondas.py` mide parches equivalentes en la portada y en el render y da
el factor de correccion por canal. Ajustar a ojo se va de tono enseguida; esto
cierra el bucle con numeros. `scripts/materiales.py` concentra materiales,
luces y exposicion para poder reaplicarlo todo sin reconstruir la escena, y
`scripts/vivo.py` lo vigila y lo reaplica en la sesion abierta de Blender.

Lo que dijeron las sondas, en orden de importancia:

1. **El nogal salia 2.2x oscuro.** El albedo extraido se habia normalizado a la
   media de su recorte, tomado de una zona en penumbra de la portada, asi que
   heredo esa penumbra. Se corrige con `GANANCIA_NOGAL`.
2. **El factor azul se disparaba en sombra** (hasta 5.0 en el suelo lejano): el
   mundo era oscuro y calido y las sombras se iban a naranja. La portada tiene
   relleno de dia. Mundo mas claro y frio.
3. **Techo y paredes no pueden compartir material.** El techo recibe mucho mas
   rebote; con un solo material, subir el ambiente para levantar la pared
   quemaba el techo. Separados, el techo al 30% de albedo y la pared al 50%.
4. **El ventanal de la portada marca 179/146/127**, apenas mas que la pared: no
   es una fuente quemada. El cristal visible va tenue y el relleno de la sala lo
   da un foco grande de fuera, oculto a camara.

## El tambor flautado: tres bugs encadenados

Las flautas no se veian, y la causa no era una sino tres:

1. **El perfil era un coseno.** En la portada son caras planas separadas por
   ranuras estrechas en V; una ondulacion suave no produce esas lineas oscuras.
2. **El muestreo solo cubria los arcos de las esquinas.** Los tramos rectos del
   contorno -incluida la cara que mira a camara- no recibian ni un punto, asi
   que alli no habia flauta en absoluto: 92 puntos de contorno para 89 flautas.
   Ahora se muestrea recta y arco por igual, con 12 puntos por flauta: 1062
   puntos.
3. **El tambor llevaba el onix retroiluminado del panel del fondo.** Ese lleva
   LED detras; el tambor es un bloque macizo. Con emision y subsurface altos la
   luz atraviesa las ranuras y borra su sombra. Material propio, `OnixMacizo`.

Los tres habia que arreglarlos: con cualquiera de ellos en pie el tambor sale
liso. Es el aviso mas util de cara al zoom web, donde este detalle es el
protagonista.

## Estado de cada material

Medido con `scripts/sondas.py`; el factor es portada/render por canal, 1.00 es
coincidencia exacta.

| Material | Factor R,G,B | Estado |
|---|---|---|
| Ónix del fondo | 0.91 / 0.91 / 0.90 | **igualado** |
| Techo | 0.94 / 0.87 / 0.89 | **igualado** |
| Encimera | 0.91 / 0.87 / 0.88 | **igualado** |
| Suelo (primer plano) | 0.91 / 0.83 / 0.82 | cerca |
| Nogal de las columnas | 1.23 / 1.37 / 1.58 | algo oscuro |
| Nogal de la isla | 1.33 / 1.45 / 1.55 | algo oscuro |
| Pared izquierda | 1.38 / 1.43 / 1.65 | algo oscuro |
| Suelo (medio y fondo) | 2.09 → 4.47 | **sin resolver** |
| Ventanal | 0.83 / 0.68 / 0.59 | **sin resolver** |

Los tres materiales protagonistas —nogal, ónix retroiluminado y ónix macizo del
tambor— ya leen como los de la portada. Lo que no cierra tiene una causa comun
y no es de materiales: **falta la mitad de la escena**. El suelo del fondo y la
pared izquierda estan oscuros porque en la portada los ilumina el rebote de los
taburetes, la mesa, las sillas y los frentes que aqui no existen, y el ventanal
es un rectangulo plano porque no tiene ni cortina ni vista detras.

Perseguir esos tres numeros con mas focos seria maquillaje: cada foto que se
anade para levantar una sonda estropea otra. La via correcta es meter los props.

## Recorrido de camara y props

`scripts/recorrido.py` define la entrada de la transicion. `escena.py --t 0..1`
situa la camara en cualquier punto del recorrido.

- **t=0 coincide con la camara de la portada con error de 5e-06**, que es lo que
  hace que el empalme entre la imagen que ya esta en la web y el primer
  fotograma no parpadee. Es la condicion que manda sobre todo lo demas.
- No es un dolly puro: el eje optico de la portada sale por la derecha de la
  cocina (a Y=5.90 ya va por X=3.73, fuera de la sala), asi que un avance recto
  se llevaria la camara de paseo. Travelling con paneo por slerp.
- La focal no cambia. Un zoom de objetivo aplanaria la perspectiva y delataria
  el truco; moviendo la camara el paralaje es real y el material gana volumen.

Fijar el recorrido antes de modelar decide que props hacen falta: **taburetes,
griferia y atrezzo de encimera** estan en cuadro todo el trayecto; **mesa y
sillas de comedor y la vista tras el ventanal** salen en los primeros
fotogramas y no hay que modelarlos.

### Taburetes

Cotas retroproyectadas de la portada: pletina de 0.36 m, asiento a 0.573 m,
remate de respaldo a 1.00 m, separacion 0.55 m, alineados en Y=2.77 paralelos
a la isla. La carcasa es un perfil lateral barrido a lo ancho con una leve
curvatura en seccion; sin ella sale como una tabla doblada.

## Trampas encontradas

- `bmesh.ops.create_cube(size=1.0)` da vértices en ±0.5, así que la escala es el
  lado completo, no la mitad. Con la mitad todo sale a escala 0.5 y encaja lo
  justo para no ser evidente.
- Blender pone el punto principal en el centro exacto. El de la portada está
  1.2 px más abajo, y se compensa con `shift_y = (CY - H/2) / W` — con el signo
  al revés el error se duplica en vez de anularse. `test_camara.py` lo detecta.
- La junta suelo-pared de la derecha **no** sirve para medir: el suelo es pulido
  y su reflejo desplaza el borde hacia abajo de forma variable. La base de la
  isla sí sirve.
- CLAHE agresivo sobre el suelo mete reflejos como si fueran juntas de baldosa.
- Un foco de apoyo cerca de una superficie la blanquea sin que se note de donde
  viene: `RasanteTambor` estaba a 1.07 m del cuerpo de la isla y lo llevaba a
  factor 0.73. Se resuelve con *light linking* (`_vincular_solo_a`), no bajando
  la potencia, que tambien apagaria el detalle que la luz existe para revelar.
- El nogal con rugosidad 0.22 y barniz devolvia suelo y ventanal como un velo
  claro sobre la isla. Satinado mate (0.34-0.52, sin barniz) lo quita.
- `vivo.py` recarga materiales, luces y exposicion, **pero no geometria**: tras
  tocar `escena.py` hay que reabrir el .blend. Con el addon BlenderMCP corriendo
  (puerto 9876) se puede hacer desde fuera con `scripts/bl.py`.
- Medir una altura tomando la base de un objeto y la parte alta del de al lado
  da un resultado plausible y equivocado: asi salio un respaldo de 1.248 m
  cuando son 1.00 m, un 40% de mas. Base y punto alto tienen que estar sobre la
  MISMA vertical.
- No emparentar piezas recien creadas sin forzar antes `view_layer.update()`:
  `matrix_parent_inverse` se captura con la escala del padre todavia aplicada.
  La pletina (0.36 x 0.36 x 0.016) estiraba los hijos x58 en vertical y los
  taburetes salieron como postes hasta el techo. Mas simple y sin sorpresas:
  generar cada pieza ya colocada en coordenadas de mundo.
- `Sheen` sobre un cuero oscuro en un interior claro lo lava a gris: el asiento
  marcaba 152/130/117 contra 96/58/49 de la portada. A cero.
- Las pletinas de acero pulido NO se pueden segmentar por color: reflejan el
  suelo calido y sus valores son casi los del suelo. Para medirlas, superponer
  el render sobre la portada.
- Editar este fichero por sustitucion de texto suelto es peligroso: una marca
  de corte que tambien aparece en una funcion anterior duplico `plano`,
  `construir` y `tambor_flautado`, y Python se quedaba con la copia vieja. El
  arreglo de las flautas estuvo dos renders sin ejecutarse mientras parecia que
  funcionaba, porque el material mejoraba a la vez. Delimitar siempre por
  `^def ` y comprobar que cada funcion aparece una sola vez.
