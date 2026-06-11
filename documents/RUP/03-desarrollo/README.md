# 03-desarrollo

Seguimiento de implementacion. Esta disciplina recoge que partes del diseño RUP
ya se han transformado en codigo ejecutable.

## Contenido

- [casos-uso](./casos-uso/README.md)

## Iteracion actual

| Incremento | Estado | Codigo | Notas |
| --- | --- | --- | --- |
| Gestion de sesion y navegacion | Implementado | [`app/`](../../../app/README.md) | Primer vertical con React, FastAPI y SQLite |
| Gestion de grupos y usuarios | En progreso | [`app/`](../../../app/README.md) | CRUD basico de grupos, invitaciones recibidas y gestion de miembros implementados |
| Gestion de tareas | En progreso | [`app/`](../../../app/README.md) | Consulta, creacion, edicion, eliminacion, finalizacion, conflictos iniciales y dependencia simple entre tareas implementadas |
| Planificacion y configuracion | En progreso | [`app/`](../../../app/README.md) | Agenda filtrada, horario, responsable, localizacion y recordatorio simple implementados desde tareas |

Casos cubiertos en codigo:

- `iniciarSesion()`: login contra SQLite y apertura de sesion.
- `cerrarSesion()`: cierre confirmado desde el frontend y limpieza de sesion.
- `completarGestion()`: reflejado como estabilizacion del panel principal tras
  iniciar sesion.
- `abrirGrupos()`: listado de grupos asociados al usuario autenticado.
- `crearGrupo()`: creacion de grupo propio con membresia inicial de
  administrador.
- `editarGrupo()`: modificacion de nombre y descripcion de un grupo propio con
  permisos de gestion.
- `eliminarGrupo()`: eliminacion confirmada de un grupo propio con rol de
  administrador.
- `invitarUsuario()`: registro de invitacion pendiente con email, rol propuesto
  y fecha limite.
- `abrirInvitaciones()`: listado de invitaciones recibidas o gestionables con
  filtro por estado.
- `editarInvitacion()`: aceptacion o rechazo de invitaciones pendientes
  recibidas y cancelacion de invitaciones pendientes gestionables; aceptar crea
  la membresia en el grupo.
- `editarMiembro()`: listado de miembros de grupos gestionables y cambio de rol
  dentro de `MiembroGrupo`.
- `eliminarMiembro()`: retirada confirmada de una pertenencia al grupo sin
  borrar el usuario global.
- `abrirTareas()`: listado de tareas visibles para el usuario autenticado y
  filtrado por texto, grupo y estado.
- `crearTarea()`: alta de tarea programada en un grupo gestionable con fecha y
  horario obligatorio.
- `editarTarea()`: modificacion de titulo, descripcion, fecha y horario de una
  tarea gestionable.
- `eliminarTarea()`: eliminacion confirmada de una tarea gestionable.
- `marcarCompletada()`: cambio de estado a `Finalizada` para una tarea visible,
  registrando la fecha de finalizacion.
- `validarConflicto()`: deteccion no bloqueante de solapamientos para el
  responsable asignado.
- `relacionarTareas()`: relacion de dependencia simple entre una tarea y una
  predecesora activa del mismo grupo.
- `abrirPlanificacion()`: agenda filtrada con resumen de tareas planificadas,
  responsables, recordatorios, dependencias y conflictos.
- `establecerHorario()`: validacion de fecha, hora de inicio y hora de fin al
  crear o editar tareas.
- `asignarTareaAUsuario()`: asignacion de responsable dentro del grupo de la
  tarea.
- `definirLocalizacion()`: localizacion textual opcional en la tarea.
- `configurarRecordatorio()`: recordatorio simple expresado en minutos.

Pendiente del modulo de grupos:

- sin pendientes funcionales inmediatos en grupos antes de iniciar tareas.

Pendiente del modulo de tareas:

- resolucion guiada de conflictos horarios, subtareas, tipos avanzados de
  relaciones, mapas/rutas y notificaciones reales de recordatorio.

## Criterio de seguimiento

- Cada nuevo incremento debe actualizar este README y el dashboard de
  [99-seguimiento](../99-seguimiento/README.md).
- Si se añade o modifica un `.puml`, debe generarse y enlazarse tambien su
  `.svg`.
