# abrirPlanificacion > Desarrollo

## Implementacion

La planificacion se abre como una agenda filtrada dentro de `Mis tareas`. Usa
los mismos filtros de texto, grupo y estado para mostrar un resumen de tareas
programadas, responsables, recordatorios, dependencias y conflictos. Tambien
permite enfocar la agenda en tareas con recordatorio o con conflicto.

Archivos principales:

- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`
- `app/frontend/README.md`

## Decision

No se crea una ruta ni pantalla separada. La agenda queda junto al listado de
tareas porque las operaciones de horario, responsable, localizacion,
recordatorio y revision de conflictos ya se ejecutan desde esa zona.
