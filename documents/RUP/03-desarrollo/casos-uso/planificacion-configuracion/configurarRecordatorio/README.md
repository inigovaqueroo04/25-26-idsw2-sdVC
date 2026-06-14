# configurarRecordatorio() > Desarrollo

## Alcance

- Guardar un recordatorio simple en minutos antes de la tarea.
- Configurar el recordatorio al crear una tarea o al editarla.
- Permitir quitar el recordatorio dejando el campo vacio en edicion.
- Mostrar el recordatorio en la tarjeta y en la agenda cuando exista.

## Codigo

- Columna `recordatorio_minutos` en `tareas`, con migracion ligera.
- `POST /api/tasks` acepta `recordatorio_minutos` opcional.
- `PATCH /api/tasks/{task_id}` acepta `recordatorio_minutos`.
- `crear_tarea()` y `editar_tarea()` validan que el valor este entre 0 y
  10080 minutos.
- React muestra `Recordatorio` en el formulario de alta y en el formulario de
  edicion.

## Decision

El recordatorio no envia avisos reales todavia; queda guardado como
configuracion interna para que la planificacion ayude a reducir olvidos.
