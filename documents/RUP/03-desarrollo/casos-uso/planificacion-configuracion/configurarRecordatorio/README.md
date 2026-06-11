# configurarRecordatorio() > Desarrollo

## Alcance

- Guardar un recordatorio simple en minutos antes de la tarea.
- Permitir quitar el recordatorio dejando el campo vacio.
- Mostrar el recordatorio en la tarjeta cuando exista.

## Codigo

- Columna `recordatorio_minutos` en `tareas`, con migracion ligera.
- `PATCH /api/tasks/{task_id}` acepta `recordatorio_minutos`.
- `editar_tarea()` valida que el valor este entre 0 y 10080 minutos.
- React añade el campo `Recordatorio` al formulario inline de edicion.

## Decision

El recordatorio no envia avisos reales todavia; queda guardado como
configuracion interna para poder completar la trazabilidad funcional.
