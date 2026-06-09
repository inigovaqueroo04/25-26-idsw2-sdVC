# editarGrupo > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Editar grupo valido | Grupo propio con rol de gestion, nombre no vacio | `200`, estado `GRUPO_ABIERTO`, grupo actualizado | Verificado |
| Nombre vacio | Nombre vacio o solo espacios | Error funcional y sin cambios | Verificado |
| Nombre duplicado para el usuario | Nombre ya asociado a otro grupo del usuario | Error `409` y sin cambios | Verificado |
| Grupo no disponible | Grupo inexistente o no asociado al usuario | Error `404` | Verificado |
| Sesion no activa | Sin `X-Session-Token` valido | Error `401` | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall database.py init_db.py main.py models routes schemas services`: correcto.
- Smoke de backend con SQLite temporal: edicion como `Administrador`, edicion
  como `Miembro Administrador`, listado actualizado, duplicado, nombre vacio,
  grupo inexistente y sesion ausente: correcto.
- `npm run build` en `app/frontend`: correcto.
- Revision en navegador integrado: apertura de formulario inline, guardado
  desde UI, estado `Grupo abierto`, mensaje correcto y listado actualizado.
- Revision visual responsive: tarjetas, acciones y formularios sin
  solapamientos en desktop y viewport movil.

## Riesgos pendientes

- No hay pruebas automatizadas todavia.
- La edicion de permisos y miembros queda fuera de este incremento.
