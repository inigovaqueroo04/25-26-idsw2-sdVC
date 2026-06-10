# editarMiembro > Pruebas

## Escenarios previstos

| Escenario | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Listar miembros como gestor | Grupo donde el usuario es `Administrador` | Lista de miembros y estado `GRUPO_ABIERTO` | Verificado |
| Cambiar rol valido | Miembro del grupo y rol permitido | Rol actualizado | Verificado |
| Cambio por `Miembro Administrador` | Gestor no administrador global | Rol actualizado si pertenece al grupo | Verificado |
| Usuario sin permisos | Miembro ordinario del grupo | Error `403` | Verificado |
| Rol invalido | Rol no definido en el modelo | Error `400` | Verificado |
| Miembro inexistente | Id de miembro que no pertenece al grupo | Error `404` | Verificado |
| Ultimo gestor | Degradar el unico gestor del grupo | Error `409` | Verificado |
| Panel visual | Abrir `Miembros` desde una tarjeta gestionable | Lista y selectores visibles sin solapamientos | Verificado |
| Guardado desde UI | Cambiar rol y pulsar `Guardar` | Mensaje de exito y rol actualizado | Verificado |

## Pruebas ejecutadas

- `app/backend/.venv/Scripts/python.exe -m compileall database.py init_db.py main.py models routes schemas services`: correcto.
- Smoke con SQLite temporal: listado, cambio de rol, permisos de
  `Miembro Administrador`, usuario sin permisos, rol invalido, miembro
  inexistente y proteccion del ultimo gestor: correcto.
- `npm run build` en `app/frontend`: correcto.
- Prueba contra API viva local: `PATCH /api/groups/{group_id}/members/{member_id}`
  actualiza el rol de un miembro temporal.
- Revision visual en navegador integrado: panel `Miembros`, fila temporal,
  selector de rol y boton `Guardar` visibles, sin desbordamiento horizontal ni
  solapamiento con tarjetas vecinas.
- Prueba desde UI en navegador integrado: cambio de rol a
  `Miembro Administrador` y mensaje `Miembro actualizado correctamente`.
- Revision responsive en navegador integrado: panel de miembros en viewport
  movil, botones dentro de la tarjeta, chips con altura normal y sin `overflow`
  horizontal.
- Limpieza posterior del usuario temporal y su membresia en SQLite local.

## Riesgos pendientes

- No hay pruebas automatizadas permanentes todavia.
- Eliminar miembros queda para `eliminarMiembro()`.
- No existen permisos granulares mas alla de los roles actuales.
