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
| Gestion de tareas | En progreso | [`app/`](../../../app/README.md) | Consulta inicial de tareas implementada |

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

Pendiente del modulo de grupos:

- sin pendientes funcionales inmediatos en grupos antes de iniciar tareas.

Pendiente del modulo de tareas:

- crear tareas.
- editar y eliminar tareas.
- marcar tareas como completadas.

## Criterio de seguimiento

- Cada nuevo incremento debe actualizar este README y el dashboard de
  [99-seguimiento](../99-seguimiento/README.md).
- Si se añade o modifica un `.puml`, debe generarse y enlazarse tambien su
  `.svg`.
