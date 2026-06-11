# marcarCompletada() > Pruebas

## Escenarios

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Completar tarea visible | Estado `Finalizada` y `fecha_finalizacion` informada | Verificado |
| Completar tarea ya finalizada | Error `tarea_ya_finalizada` | Verificado |
| Completar tarea cancelada | Error `tarea_no_completable` | Verificado |
| Tarea inexistente o no visible | Error `tarea_no_disponible` | Verificado |
| UI desktop | Boton `Completar`, mensaje de exito y tarea cerrada sin acciones | Verificado |
| UI movil | Acciones sin overflow horizontal | Verificado en revisiones responsive posteriores |

## Verificacion

- `python -m compileall` sobre backend.
- `npm run build` en frontend.
- Smoke de servicio con SQLite temporal.
- API real con tarea temporal creada, completada, rechazada al repetir y
  eliminada despues de la prueba.
- Revisiones posteriores en navegador integrado con la app abierta en
  `http://127.0.0.1:5173/`.

## Pendiente

- Automatizar esta prueba cuando exista suite frontend.
