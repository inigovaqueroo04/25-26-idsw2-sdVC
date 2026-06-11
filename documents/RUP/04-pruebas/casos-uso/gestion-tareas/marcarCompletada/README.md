# marcarCompletada() > Pruebas

## Escenarios

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Completar tarea visible | Estado `Finalizada` y `fecha_finalizacion` informada | Verificado |
| Completar tarea ya finalizada | Error `tarea_ya_finalizada` | Verificado |
| Completar tarea cancelada | Error `tarea_no_completable` | Verificado |
| Tarea inexistente o no visible | Error `tarea_no_disponible` | Verificado |
| UI desktop | Boton `Completar`, mensaje de exito y tarea cerrada sin acciones | Implementado; pendiente de navegador |
| UI movil | Acciones sin overflow horizontal | Pendiente de navegador |

## Verificacion

- `python -m compileall` sobre backend.
- `npm run build` en frontend.
- Smoke de servicio con SQLite temporal.
- API real con tarea temporal creada, completada, rechazada al repetir y
  eliminada despues de la prueba.

## Limitacion

El navegador integrado bloqueo `localhost` y `127.0.0.1` con
`ERR_BLOCKED_BY_CLIENT`, por lo que la comprobacion visual queda pendiente para
la siguiente sesion o para una validacion manual rapida.
