# editarInvitacion > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Aceptar invitacion pendiente | Invitacion dirigida al usuario autenticado | Estado `Aceptada` y nueva membresia en el grupo | Verificado |
| Rechazar invitacion pendiente | Invitacion dirigida al usuario autenticado | Estado `Rechazada` sin crear membresia | Verificado |
| Invitacion ajena | Invitacion dirigida a otro email | Error `403` | Verificado |
| Decision no permitida | Estado distinto de `Aceptada` o `Rechazada` | Error `400` | Verificado |
| Invitacion ya finalizada | Invitacion aceptada o rechazada | Error `409` | Verificado |
| Invitacion caducada | Fecha limite anterior al dia actual | Error `409` y estado `Caducada` | Verificado |
| UI de aceptacion | Invitacion pendiente recibida visible en `Mis invitaciones` | Botones `Aceptar` y `Rechazar` disponibles | Verificado |
| UI tras aceptar | Pulsar `Aceptar` desde el navegador | Mensaje de exito, retirada de acciones y grupo incorporado | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall database.py init_db.py main.py models routes schemas services`: correcto.
- Smoke de rutas y servicios con SQLite temporal: aceptar, rechazar, intento
  sobre invitacion ajena, decision invalida, invitacion finalizada e invitacion
  caducada: correcto.
- `npm run build` en `app/frontend`: correcto.
- Revision en navegador integrado: invitacion temporal dirigida al usuario demo,
  botones de decision visibles, aceptacion correcta y aparicion del grupo en
  `Mis grupos`.
- Limpieza posterior de usuario, grupo, membresias e invitacion temporales en
  la base SQLite local.

## Riesgos pendientes

- No hay pruebas automatizadas permanentes todavia.
- La cancelacion de invitaciones por parte de gestores queda fuera de este
  incremento.
- La caducidad se aplica al intentar gestionar la invitacion, no mediante una
  tarea programada.
