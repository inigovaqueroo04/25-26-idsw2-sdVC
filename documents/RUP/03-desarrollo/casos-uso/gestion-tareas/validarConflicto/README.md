# validarConflicto > Desarrollo

## Implementacion

La validacion inicial de conflictos horarios se integra en la respuesta de
tareas. Cuando una tarea tiene responsable, fecha y horario, el backend busca
otras tareas activas del mismo responsable que se solapen en el mismo dia.

Archivos principales:

- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

## Decision

El conflicto no bloquea el guardado. La tarea se mantiene como valida y el
frontend muestra un aviso para que el usuario pueda decidir si corrige el
horario o lo deja asi. La resolucion guiada queda pendiente.
