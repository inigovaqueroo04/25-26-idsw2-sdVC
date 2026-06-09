# invitarUsuario > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Registrar invitacion valida | Grupo gestionable, email valido, rol valido y fecha actual o futura | `201`, estado `INVITACION_ABIERTA`, invitacion `Pendiente` | Verificado |
| Invitacion pendiente duplicada | Mismo grupo y mismo email con estado `Pendiente` | Error `409` y sin duplicado | Verificado |
| Usuario ya miembro | Email de usuario que ya pertenece al grupo | Error `409` | Verificado |
| Email invalido | Email sin formato valido | Error `400` | Verificado |
| Fecha limite pasada | Fecha anterior al dia actual | Error `400` | Verificado |
| Usuario sin permisos | Miembro ordinario del grupo | Error `403` | Verificado |
| Grupo no disponible | Grupo inexistente o no asociado al usuario | Error `404` | Verificado |
| Sesion no activa | Sin `X-Session-Token` valido | Error `401` | Verificado |
| Cancelacion en UI | Formulario de invitacion cancelado | No se llama al backend y no queda invitacion | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall database.py init_db.py main.py models routes schemas services`: correcto.
- Smoke de backend con SQLite temporal: invitacion valida, duplicado, usuario
  ya miembro, email invalido, fecha pasada, grupo inexistente y sesion ausente:
  correcto.
- Smoke de permisos con SQLite temporal: usuario con rol `Miembro` dentro del
  grupo recibe `403` al intentar invitar.
- `npm run build` en `app/frontend`: correcto.
- Revision en navegador integrado: formulario de invitacion visible para
  `Miembro Administrador`, cancelacion sin crear invitacion y ausencia de
  solapamientos en desktop y viewport movil.
- Prueba contra API viva local: invitacion pendiente creada en
  `POST /api/groups/{group_id}/invitations` y eliminada despues de la base local
  como dato temporal de verificacion.

## Riesgos pendientes

- No hay pruebas automatizadas todavia.
- La aceptacion, rechazo y listado de invitaciones quedan fuera de este
  incremento.
- No existe envio real de correo; la invitacion queda persistida en SQLite.
