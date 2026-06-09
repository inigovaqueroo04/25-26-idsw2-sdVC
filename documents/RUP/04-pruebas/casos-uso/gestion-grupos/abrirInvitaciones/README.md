# abrirInvitaciones > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Listar invitaciones gestionables | Usuario con rol gestor en un grupo con invitacion pendiente | `200`, estado `INVITACIONES_ABIERTO`, invitacion visible como gestionable | Verificado |
| Listar invitaciones recibidas | Usuario cuyo email coincide con la invitacion | `200`, invitacion visible como recibida | Verificado |
| Filtrar por estado valido | `estado=Pendiente` | Solo se devuelven invitaciones con ese estado | Verificado |
| Filtrar por estado invalido | Estado no definido en el modelo | Error `400` | Verificado |
| Usuario sin sesion | Sin `X-Session-Token` valido | Error `401` | Verificado |
| Sin invitaciones | Usuario autenticado sin invitaciones asociadas | Lista vacia y estado `INVITACIONES_ABIERTO` | Verificado |
| Vista responsive | Panel con invitaciones en ancho movil | Sin desbordamiento horizontal | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall app/backend`: correcto.
- Smoke de rutas y servicios con SQLite temporal: invitacion creada,
  consulta como gestor, consulta como destinatario, filtro valido, filtro
  invalido y sesion ausente: correcto.
- `npm run build` en `app/frontend`: correcto.
- Prueba contra backend vivo local: `GET /api/groups/invitations` devuelve
  `INVITACIONES_ABIERTO` con lista vacia cuando no hay datos asociados.
- Revision en navegador integrado: seccion `Mis invitaciones`, filtro por
  estado y una invitacion temporal visible en desktop.
- Revision responsive en navegador integrado con viewport movil: lista apilada
  sin `overflow` horizontal.
- Limpieza posterior de la invitacion temporal creada en la base SQLite local.

## Riesgos pendientes

- No hay pruebas automatizadas permanentes todavia.
- La aceptacion, rechazo y cancelacion de invitaciones queda para
  `editarInvitacion()`.
- Las invitaciones vencidas no pasan automaticamente a `Caducada`.
