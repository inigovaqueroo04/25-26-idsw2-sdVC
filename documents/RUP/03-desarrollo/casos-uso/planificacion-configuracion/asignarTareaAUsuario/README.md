# asignarTareaAUsuario() > Desarrollo

## Alcance

- Asignar una tarea gestionable a un miembro del mismo grupo.
- Permitir dejar la tarea sin responsable.
- Mostrar el responsable en la tarjeta de `Mis tareas`.

## Codigo

- `PATCH /api/tasks/{task_id}` acepta `asignado_usuario_id`.
- `editar_tarea()` valida que el usuario asignado pertenezca al grupo de la
  tarea.
- React carga miembros del grupo al abrir la edicion de una tarea y muestra un
  selector `Responsable`.

## Decision

La asignacion queda integrada en la edicion de tarea para ahorrar pantalla y
tiempo de implementacion. La planificacion se apoya en esa misma informacion
sin crear una vista separada de asignaciones.
