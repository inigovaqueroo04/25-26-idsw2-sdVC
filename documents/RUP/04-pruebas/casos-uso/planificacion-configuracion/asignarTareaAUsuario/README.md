# asignarTareaAUsuario() > Pruebas

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Asignar a miembro del grupo | Tarea actualizada con responsable | Verificado |
| Asignar a usuario ajeno | Error `usuario_asignado_no_valido` | Verificado |
| Quitar responsable | `asignado_usuario_id` queda vacio | Pendiente visual |

Verificado con smoke de servicio sobre SQLite temporal y `npm run build`.
