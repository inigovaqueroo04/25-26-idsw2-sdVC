# configurarRecordatorio() > Pruebas

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Crear tarea con recordatorio | La tarea nace con `recordatorio_minutos` informado | Verificado contra API local |
| Guardar recordatorio valido | La tarea devuelve los minutos guardados | Verificado |
| Recordatorio fuera de rango | Error `recordatorio_invalido` | Verificado |
| Quitar recordatorio | La tarea queda sin recordatorio | Verificado por flujo de edicion |
| Campo visible en alta | El formulario de creacion muestra `Recordatorio` | Verificado en navegador integrado |

Verificado con API local, compilacion de frontend/backend y revision visual del
campo `Recordatorio` en creacion.
