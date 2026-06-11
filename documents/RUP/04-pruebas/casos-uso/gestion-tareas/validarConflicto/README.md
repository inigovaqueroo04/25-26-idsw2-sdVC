# validarConflicto > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Dos tareas del mismo responsable se solapan en el mismo dia | La segunda tarea devuelve `conflictos_horario` con la tarea previa | Verificado |
| Listar tareas tras guardar el solapamiento | Ambas tareas muestran el conflicto calculado | Verificado |
| Limpieza de tareas temporales | No quedan tareas `Temporal conflicto %` en SQLite | Verificado |

## Pendiente

- Probar visualmente el aviso en navegador con tareas reales del usuario.
- Automatizar el smoke cuando exista suite de pruebas.
