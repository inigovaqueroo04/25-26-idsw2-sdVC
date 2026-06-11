# configurarRecordatorio() > Pruebas

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Guardar recordatorio valido | La tarea devuelve los minutos guardados | Verificado |
| Recordatorio fuera de rango | Error `recordatorio_invalido` | Verificado |
| Quitar recordatorio | La tarea queda sin recordatorio | Pendiente visual |

Verificado con smoke de servicio sobre SQLite temporal y compilacion de
frontend/backend.
