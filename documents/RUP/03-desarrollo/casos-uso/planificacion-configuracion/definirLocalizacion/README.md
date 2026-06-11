# definirLocalizacion() > Desarrollo

## Alcance

- Registrar una localizacion textual opcional para una tarea gestionable.
- Mostrar la localizacion en la tarjeta cuando exista.

## Codigo

- Columna `localizacion` en `tareas`, con migracion ligera.
- `PATCH /api/tasks/{task_id}` acepta `localizacion`.
- React añade el campo `Localizacion` al formulario inline de edicion.

## Decision

La localizacion se trata como texto simple. Mapas, coordenadas y rutas quedan
fuera del alcance de esta entrega.
