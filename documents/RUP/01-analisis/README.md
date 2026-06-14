# 01-analisis

Analisis de casos de uso preparado al estilo de pySigHor: cada caso separa
descripcion funcional, colaboracion de analisis y secuencia entre vista,
controlador, repositorio y entidades del dominio.

Cada caso contiene:

- `README.md`: analisis textual del caso, enlaces e imagenes de sus diagramas.
- `colaboracion.puml` / `colaboracion.svg`: colaboracion MVC de analisis.
- `secuencia.puml` / `secuencia.svg`: secuencia de analisis del caso.

Los diagramas originales de SdR estan en
[00-casos-uso/02-detalle](../00-casos-uso/02-detalle/README.md).

## Casos de uso

### Gestion de grupos

- [abrirGrupos](./casos-uso/gestion-grupos/abrirGrupos/README.md)
- [abrirInvitaciones](./casos-uso/gestion-grupos/abrirInvitaciones/README.md)
- [crearGrupo](./casos-uso/gestion-grupos/crearGrupo/README.md)
- [editarGrupo](./casos-uso/gestion-grupos/editarGrupo/README.md)
- [editarInvitacion](./casos-uso/gestion-grupos/editarInvitacion/README.md)
- [editarMiembro](./casos-uso/gestion-grupos/editarMiembro/README.md)
- [eliminarGrupo](./casos-uso/gestion-grupos/eliminarGrupo/README.md)
- [eliminarMiembro](./casos-uso/gestion-grupos/eliminarMiembro/README.md)
- [invitarUsuario](./casos-uso/gestion-grupos/invitarUsuario/README.md)

### Gestion de sesion

- [cerrarSesion](./casos-uso/gestion-sesion/cerrarSesion/README.md)
- [completarGestion](./casos-uso/gestion-sesion/completarGestion/README.md)
- [iniciarSesion](./casos-uso/gestion-sesion/iniciarSesion/README.md)

### Gestion de tareas

- [abrirTareas](./casos-uso/gestion-tareas/abrirTareas/README.md)
- [crearTarea](./casos-uso/gestion-tareas/crearTarea/README.md)
- [editarTarea](./casos-uso/gestion-tareas/editarTarea/README.md)
- [eliminarTarea](./casos-uso/gestion-tareas/eliminarTarea/README.md)
- [marcarCompletada](./casos-uso/gestion-tareas/marcarCompletada/README.md)
- [relacionarTareas](./casos-uso/gestion-tareas/relacionarTareas/README.md)
- [validarConflicto](./casos-uso/gestion-tareas/validarConflicto/README.md)

### Planificacion y configuracion

- [abrirPlanificacion](./casos-uso/planificacion-configuracion/abrirPlanificacion/README.md)
- [asignarTareaAUsuario](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/README.md)
- [configurarRecordatorio](./casos-uso/planificacion-configuracion/configurarRecordatorio/README.md)
- [definirLocalizacion](./casos-uso/planificacion-configuracion/definirLocalizacion/README.md)
- [establecerHorario](./casos-uso/planificacion-configuracion/establecerHorario/README.md)
