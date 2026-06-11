# relacionarTareas > Desarrollo

## Implementacion

La primera version permite indicar que una tarea depende de otra tarea activa
del mismo grupo. La relacion se guarda como predecesora desde la edicion inline
de `Mis tareas`.

Archivos principales:

- `app/database/schema.sql`
- `app/backend/database.py`
- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`
- `app/frontend/src/App.jsx`

## Decision

Se implementa solo la dependencia simple `Depende de` para mantener el alcance
controlado. Subtareas, varios tipos de relacion y una pantalla especifica de
busqueda quedan fuera de esta tanda. El backend rechaza autorrelaciones,
relaciones con tareas de otro grupo y ciclos.
