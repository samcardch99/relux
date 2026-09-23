#!/usr/bin/env python3
"""Cliente minimo del addon BlenderMCP (JSON sobre TCP, puerto 9876).

Permite ejecutar codigo en la sesion de Blender abierta sin recargar nada.
Uso:  python3 scripts/bl.py "import bpy; print(len(bpy.data.objects))"
      python3 scripts/bl.py -f fichero.py
"""
import json, socket, sys

HOST, PUERTO = '127.0.0.1', 9876

def enviar(tipo, params=None, timeout=120.0):
    s = socket.create_connection((HOST, PUERTO), timeout=timeout)
    try:
        s.sendall(json.dumps({'type': tipo, 'params': params or {}}).encode())
        trozos = b''
        s.settimeout(timeout)
        while True:
            d = s.recv(65536)
            if not d:
                break
            trozos += d
            try:
                return json.loads(trozos.decode())
            except json.JSONDecodeError:
                continue
        return json.loads(trozos.decode()) if trozos else None
    finally:
        s.close()

def ejecutar(codigo):
    return enviar('execute_code', {'code': codigo})

if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == '-f':
        codigo = open(sys.argv[2]).read()
    elif len(sys.argv) > 1:
        codigo = sys.argv[1]
    else:
        print(json.dumps(enviar('get_scene_info'), indent=2)[:2000]); sys.exit()
    r = ejecutar(codigo)
    if isinstance(r, dict) and r.get('status') == 'success':
        print(r.get('result', {}).get('result', r.get('result')))
    else:
        print(json.dumps(r, indent=2)[:3000])
