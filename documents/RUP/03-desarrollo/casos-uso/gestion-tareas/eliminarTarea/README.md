# eliminarTarea() > Desarrollo

Implementado como cuarto incremento vertical de gestion de tareas, despues de
consultar, crear y editar tareas.

## Alcance implementado

- Eliminar una tarea visible para el usuario cuando su rol en el grupo permite
  gestion.
- Pedir confirmacion antes de ejecutar el borrado.
- Retirar la tarea del listado `Mis tareas` tras la respuesta correcta.
- Mantener el borrado dentro del modulo de tareas sin borrar grupos ni usuarios.

## Backend

Archivos principales:

- `app/backend/routes/tasks.py`
- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`

Endpoint incorporado:

```http
DELETE /api/tasks/{task_id}
```

La ruta valida sesion y delega en `eliminar_tarea()`. El servicio comprueba que
la tarea exista para el usuario autenticado y que su rol en el grupo sea
`Administrador` o `Miembro Administrador`. Si las comprobaciones son correctas,
borra la fila de `tareas` y devuelve el id eliminado.

## Frontend

Archivos principales:

- `app/frontend/src/api/tasks.js`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

Cada tarea gestionable abierta muestra la accion `Eliminar`. Al pulsarla se
abre una confirmacion inline en la propia tarjeta. Si se confirma, la tarea se
elimina mediante la API y desaparece del listado sin recargar la aplicacion.

## Decisiones

- La eliminacion es irreversible dentro de este incremento y vuelve al listado
  `TAREAS_ABIERTO`.
- Solo se elimina la entidad `Tarea`; no se modifican grupos ni usuarios.
- La eliminacion recursiva de subtareas y la limpieza de relaciones externas no
  se implementan todavia porque esas estructuras no existen aun en codigo.
- Las tareas `Finalizada` o `Cancelada` no se muestran como editables ni
  eliminables desde la UI actual para mantener un criterio prudente con
  registros cerrados.

## Estado resultante

`eliminarTarea()` queda implementado en backend y frontend. La gestion basica
de tareas ya permite consultar, crear, editar y eliminar tareas programadas.
Queda pendiente marcar tareas como completadas y abordar planificacion,
asignaciones, conflictos y recordatorios.
