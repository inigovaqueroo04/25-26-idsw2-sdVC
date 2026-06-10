# editarTarea() > Desarrollo

Implementado como tercer incremento vertical de gestion de tareas, despues de
`abrirTareas()` y `crearTarea()`.

## Alcance implementado

- Editar tareas visibles para el usuario cuando su rol en el grupo permite
  gestion.
- Modificar titulo, descripcion, fecha, hora de inicio y hora de fin.
- Reutilizar las validaciones de titulo, fecha y horario ya aplicadas al crear
  tareas.
- Mantener el grupo y el estado actual de la tarea.
- Mostrar la edicion inline dentro de `Mis tareas`, sin cambiar de pantalla.

## Backend

Archivos principales:

- `app/backend/routes/tasks.py`
- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`

Endpoint incorporado:

```http
PATCH /api/tasks/{task_id}
```

La ruta valida sesion y delega en `editar_tarea()`. El servicio comprueba que
la tarea exista para el usuario autenticado, que el usuario tenga rol
`Administrador` o `Miembro Administrador` en el grupo de la tarea, que el
titulo no este vacio, que la fecha tenga formato `AAAA-MM-DD`, que las horas
tengan formato `HH:MM` y que inicio sea anterior a fin.

## Frontend

Archivos principales:

- `app/frontend/src/api/tasks.js`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

Cada tarea gestionable muestra la accion `Editar` salvo que este `Finalizada`
o `Cancelada`. Al editar, la tarjeta cambia a un formulario con los campos
actuales de la tarea. Tras guardar, se sustituye la tarea en la lista sin
recargar la aplicacion.

## Decisiones

- La edicion de este incremento se limita a los datos base que ya existen en
  codigo: titulo, descripcion, fecha y horario.
- No se cambia el grupo de la tarea, porque mover tareas entre grupos afecta a
  permisos, miembros y futuras asignaciones.
- No se permite editar tareas `Finalizada` o `Cancelada` para evitar alterar
  registros cerrados hasta que se defina una regla especifica.
- Asignaciones, relaciones entre tareas, conflictos y recordatorios quedan para
  sus casos de uso propios.

## Estado resultante

`editarTarea()` queda implementado en backend y frontend. La gestion de tareas
permite consultar, crear y corregir tareas programadas; quedan pendientes
eliminar tareas y marcarlas como completadas.
