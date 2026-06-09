# crearGrupo > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Crear grupo valido | Nombre no vacio y descripcion opcional | `201`, estado `GRUPO_ABIERTO`, grupo devuelto con `numero_miembros = 1` | Verificado |
| Nombre vacio | Nombre vacio o solo espacios | Error funcional y sin insercion | Verificado |
| Nombre duplicado para el usuario | Nombre ya asociado al usuario autenticado | Error `409` y sin insercion duplicada | Verificado |
| Sesion no activa | Sin `X-Session-Token` valido | Error `401` | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall database.py init_db.py main.py models routes schemas services`: correcto.
- Smoke de backend con SQLite temporal: login demo, listado inicial,
  `crearGrupo()`, listado actualizado, duplicado y nombre vacio: correcto.
- `POST /api/groups` sin `X-Session-Token`: devuelve `401`.
- `npm run build` en `app/frontend`: correcto.
- Revision en navegador integrado: dashboard, formulario de creacion, creacion
  desde UI, estado `Grupo abierto`, mensaje correcto y listado actualizado.
- Revision visual responsive: formulario y listado sin solapamientos en desktop
  y viewport movil.

## Riesgos pendientes

- No hay pruebas automatizadas todavia.
- La persistencia de sesiones sigue siendo en memoria, como en el primer
  vertical de sesion.
