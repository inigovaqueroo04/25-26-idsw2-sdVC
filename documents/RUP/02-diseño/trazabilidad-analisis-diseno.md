# Trazabilidad análisis-diseño

Esta tabla enlaza los casos de uso analizados con sus artefactos de diseño. El estado diseñado indica que existe documentación conceptual de diseño, no implementación.

| Caso de uso | Artefacto de análisis | Artefacto de diseño | Módulo funcional | Entidades afectadas | Estado |
| --- | --- | --- | --- | --- | --- |
| iniciarSesion() | [análisis](../01-analisis/casos-uso/gestion-sesion/iniciarSesion/README.md) | [diseño](./casos-uso/gestion-sesion/iniciarSesion/README.md) | Gestión de sesión y navegación | Usuario, EstadoAplicacion, Sesion | diseñado |
| cerrarSesion() | [análisis](../01-analisis/casos-uso/gestion-sesion/cerrarSesion/README.md) | [diseño](./casos-uso/gestion-sesion/cerrarSesion/README.md) | Gestión de sesión y navegación | Usuario, EstadoAplicacion, Sesion | diseñado |
| completarGestion() | [análisis](../01-analisis/casos-uso/gestion-sesion/completarGestion/README.md) | [diseño](./casos-uso/gestion-sesion/completarGestion/README.md) | Gestión de sesión y navegación | EstadoAplicacion, Usuario | diseñado |
| abrirGrupos() | [análisis](../01-analisis/casos-uso/gestion-grupos/abrirGrupos/README.md) | [diseño](./casos-uso/gestion-grupos/abrirGrupos/README.md) | Gestión de grupos y usuarios | Usuario, Grupo, MiembroGrupo, EstadoAplicacion | diseñado |
| crearGrupo() | [análisis](../01-analisis/casos-uso/gestion-grupos/crearGrupo/README.md) | [diseño](./casos-uso/gestion-grupos/crearGrupo/README.md) | Gestión de grupos y usuarios | Usuario, Grupo, MiembroGrupo, EstadoAplicacion | diseñado |
| editarGrupo() | [análisis](../01-analisis/casos-uso/gestion-grupos/editarGrupo/README.md) | [diseño](./casos-uso/gestion-grupos/editarGrupo/README.md) | Gestión de grupos y usuarios | Grupo, MiembroGrupo, Usuario, EstadoAplicacion | diseñado |
| eliminarGrupo() | [análisis](../01-analisis/casos-uso/gestion-grupos/eliminarGrupo/README.md) | [diseño](./casos-uso/gestion-grupos/eliminarGrupo/README.md) | Gestión de grupos y usuarios | Grupo, MiembroGrupo, Invitacion, Tarea, EstadoAplicacion | diseñado |
| invitarUsuario() | [análisis](../01-analisis/casos-uso/gestion-grupos/invitarUsuario/README.md) | [diseño](./casos-uso/gestion-grupos/invitarUsuario/README.md) | Gestión de grupos y usuarios | Grupo, Invitacion, Usuario, MiembroGrupo | diseñado |
| editarMiembro() | [análisis](../01-analisis/casos-uso/gestion-grupos/editarMiembro/README.md) | [diseño](./casos-uso/gestion-grupos/editarMiembro/README.md) | Gestión de grupos y usuarios | MiembroGrupo, Usuario, Grupo | diseñado |
| eliminarMiembro() | [análisis](../01-analisis/casos-uso/gestion-grupos/eliminarMiembro/README.md) | [diseño](./casos-uso/gestion-grupos/eliminarMiembro/README.md) | Gestión de grupos y usuarios | MiembroGrupo, Grupo, Usuario, Tarea | diseñado |
| abrirInvitaciones() | [análisis](../01-analisis/casos-uso/gestion-grupos/abrirInvitaciones/README.md) | [diseño](./casos-uso/gestion-grupos/abrirInvitaciones/README.md) | Gestión de grupos y usuarios | Invitacion, Usuario, Grupo, EstadoAplicacion | diseñado |
| editarInvitacion() | [análisis](../01-analisis/casos-uso/gestion-grupos/editarInvitacion/README.md) | [diseño](./casos-uso/gestion-grupos/editarInvitacion/README.md) | Gestión de grupos y usuarios | Invitacion, Usuario, Grupo, MiembroGrupo | diseñado |
| abrirTareas() | [análisis](../01-analisis/casos-uso/gestion-tareas/abrirTareas/README.md) | [diseño](./casos-uso/gestion-tareas/abrirTareas/README.md) | Gestión de tareas | Tarea, Grupo, MiembroGrupo, Usuario, EstadoAplicacion | diseñado |
| crearTarea() | [análisis](../01-analisis/casos-uso/gestion-tareas/crearTarea/README.md) | [diseño](./casos-uso/gestion-tareas/crearTarea/README.md) | Gestión de tareas | Tarea, Grupo, Horario, Localizacion, Recordatorio, ConflictoHorario | diseñado |
| editarTarea() | [análisis](../01-analisis/casos-uso/gestion-tareas/editarTarea/README.md) | [diseño](./casos-uso/gestion-tareas/editarTarea/README.md) | Gestión de tareas | Tarea, Horario, Localizacion, Recordatorio, ConflictoHorario, RelacionTareas | diseñado |
| relacionarTareas() | [análisis](../01-analisis/casos-uso/gestion-tareas/relacionarTareas/README.md) | [diseño](./casos-uso/gestion-tareas/relacionarTareas/README.md) | Gestión de tareas | Tarea, RelacionTareas, Grupo | diseñado |
| eliminarTarea() | [análisis](../01-analisis/casos-uso/gestion-tareas/eliminarTarea/README.md) | [diseño](./casos-uso/gestion-tareas/eliminarTarea/README.md) | Gestión de tareas | Tarea, RelacionTareas, Recordatorio, ConflictoHorario | diseñado |
| marcarCompletada() | [análisis](../01-analisis/casos-uso/gestion-tareas/marcarCompletada/README.md) | [diseño](./casos-uso/gestion-tareas/marcarCompletada/README.md) | Gestión de tareas | Tarea, Usuario, MiembroGrupo | diseñado |
| validarConflicto() | [análisis](../01-analisis/casos-uso/gestion-tareas/validarConflicto/README.md) | [diseño](./casos-uso/gestion-tareas/validarConflicto/README.md) | Gestión de tareas | Tarea, Horario, ConflictoHorario, Usuario | diseñado |
| abrirPlanificacion() | [análisis](../01-analisis/casos-uso/planificacion-configuracion/abrirPlanificacion/README.md) | [diseño](./casos-uso/planificacion-configuracion/abrirPlanificacion/README.md) | Planificación y configuración | Tarea, Horario, Grupo, Usuario, EstadoAplicacion | diseñado |
| establecerHorario() | [análisis](../01-analisis/casos-uso/planificacion-configuracion/establecerHorario/README.md) | [diseño](./casos-uso/planificacion-configuracion/establecerHorario/README.md) | Planificación y configuración | Tarea, Horario, ConflictoHorario | diseñado |
| definirLocalizacion() | [análisis](../01-analisis/casos-uso/planificacion-configuracion/definirLocalizacion/README.md) | [diseño](./casos-uso/planificacion-configuracion/definirLocalizacion/README.md) | Planificación y configuración | Tarea, Localizacion | diseñado |
| configurarRecordatorio() | [análisis](../01-analisis/casos-uso/planificacion-configuracion/configurarRecordatorio/README.md) | [diseño](./casos-uso/planificacion-configuracion/configurarRecordatorio/README.md) | Planificación y configuración | Tarea, Recordatorio, Horario | diseñado |
| asignarTareaAUsuario() | [análisis](../01-analisis/casos-uso/planificacion-configuracion/asignarTareaAUsuario/README.md) | [diseño](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/README.md) | Planificación y configuración | Tarea, Usuario, MiembroGrupo, Grupo, ConflictoHorario | diseñado |

## Criterio de uso

- Antes de implementar un caso, revisar su README de diseño y su secuencia.puml.
- Si durante implementación aparece una decisión nueva, actualizar primero el diseño o registrar la desviación.
- Si se detecta información incompleta, marcar [PENDIENTE] y no inventar requisitos.