# abrirPlanificacion > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Abrir `Mis tareas` con tareas cargadas | Se muestra la agenda filtrada | Verificado |
| Cambiar filtros de tareas | La agenda usa el mismo subconjunto filtrado | Verificado por build y revision visual |
| Filtrar agenda por recordatorios | Solo muestra tareas con recordatorio configurado | Verificado por revision visual |
| Filtrar agenda por conflictos | Solo muestra tareas con solapamientos detectados | Verificado por revision visual |
| Sin tareas planificadas para el filtro | Se muestra estado vacio de planificacion | Pendiente visual especifico |

## Pendiente

- Automatizar la verificacion visual cuando exista suite frontend.
