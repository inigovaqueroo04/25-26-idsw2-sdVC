# eliminarGrupo > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Eliminar grupo valido | Grupo propio con rol `Administrador` | `200`, estado `GRUPOS_ABIERTO`, grupo retirado del listado | Verificado |
| Usuario sin permisos | Grupo propio con rol `Miembro Administrador` | Error `403` y grupo conservado | Verificado |
| Grupo no disponible | Grupo inexistente o no asociado al usuario | Error `404` | Verificado |
| Sesion no activa | Sin `X-Session-Token` valido | Error `401` | Verificado |
| Cancelacion en UI | Confirmacion cancelada | No se llama al backend y el grupo se conserva | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall database.py init_db.py main.py models routes schemas services`: correcto.
- Smoke de backend con SQLite temporal: grupo borrable creado, eliminacion
  correcta, listado actualizado, intento sin permisos, grupo inexistente y
  sesion ausente: correcto.
- `npm run build` en `app/frontend`: correcto.
- Revision en navegador integrado: grupo temporal creado por API, confirmacion
  de eliminacion desde UI, listado actualizado, mensaje correcto, cancelacion
  sin borrado y ausencia de boton eliminar para `Miembro Administrador`.
- Revision visual responsive: botones y tarjetas sin solapamientos en desktop
  y viewport movil.

## Riesgos pendientes

- No hay pruebas automatizadas todavia.
- La prueba visual cubrio el borrado del grupo desde UI. Como mejora posterior
  conviene ampliar una prueba especifica de integridad para tareas,
  invitaciones y relaciones asociadas al grupo.
