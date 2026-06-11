# establecerHorario > Desarrollo

## Implementacion

El horario se gestiona dentro de crear y editar tareas. La API valida fecha,
hora de inicio y hora de fin, exige que el inicio sea anterior al fin y devuelve
la tarea con los posibles conflictos calculados.

Archivos principales:

- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`
- `app/backend/routes/tasks.py`
- `app/frontend/src/App.jsx`

## Decision

No se crea una pantalla separada de planificacion. Para ahorrar tiempo y evitar
duplicar flujos, el horario sigue editandose desde `Mis tareas`; la deteccion de
conflictos acompana ese guardado.
