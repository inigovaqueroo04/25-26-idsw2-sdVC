# abrirPlanificacion() > Desarrollo

## Implementacion

La planificacion se abre como una pantalla propia del frontend. Usa los filtros
de texto, grupo y estado para mostrar un resumen de tareas programadas,
responsables, recordatorios, dependencias y solapes. Tambien permite enfocar la
agenda en tareas con recordatorio o con solape.

Archivos principales:

- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`
- `app/frontend/README.md`

## Decision

No se crea una ruta nueva de backend. La separacion es solo de interfaz para
que `Tareas` y `Planificacion` no aparezcan mezcladas. Los solapes visibles se
calculan en frontend con fecha y hora de tareas activas para avisar incluso
cuando aun no hay responsable asignado.
