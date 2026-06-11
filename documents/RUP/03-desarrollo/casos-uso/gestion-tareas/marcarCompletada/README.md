# marcarCompletada() > Desarrollo

## Alcance

- Permitir finalizar una tarea visible para el usuario autenticado.
- Registrar `fecha_finalizacion` y cambiar el estado a `Finalizada`.
- Ocultar acciones de edicion, eliminacion y finalizacion en tareas cerradas.

## Codigo

- Backend: `PATCH /api/tasks/{task_id}/complete` en `routes/tasks.py` y
  `marcar_tarea_completada()` en `services/task_service.py`.
- Datos: columna `fecha_finalizacion` en `tareas`, con migracion ligera para
  SQLite existente.
- Frontend: accion `Completar` en `Mis tareas`, llamada `completeTask()` y
  actualizacion de la tarjeta sin recargar.

## Decision

La version actual permite completar cualquier tarea visible. Aunque ya existe
asignacion de responsable, se mantiene esta regla para no bloquear tareas de
grupo sin responsable o tareas compartidas. Una regla mas restrictiva puede
definirse como mejora posterior.
