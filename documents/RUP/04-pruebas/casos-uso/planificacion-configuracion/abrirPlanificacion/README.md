# abrirPlanificacion() > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Abrir `Planificacion` con tareas cargadas | Se muestra la agenda filtrada | Verificado |
| Cambiar filtros de tareas | La agenda usa el mismo subconjunto filtrado | Verificado por build y revision visual |
| Filtrar agenda por recordatorios | Solo muestra tareas con recordatorio configurado | Verificado por revision visual |
| Filtrar agenda por solapes | Solo muestra tareas con solapamientos detectados | Verificado por revision visual |
| Tareas solapadas sin responsable | La agenda cuenta y marca el solape | Verificado en navegador integrado |
| Sin overflow horizontal | La agenda se adapta a escritorio y movil | Verificado en navegador integrado |

## Pendiente

- Automatizar la verificacion visual cuando exista suite frontend.
