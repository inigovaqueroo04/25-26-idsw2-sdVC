# 01-analisis

Analisis de casos de uso preparado al estilo de pySigHor: cada caso separa descripcion funcional, colaboracion de analisis y secuencia entre vista, controlador, repositorio y entidades del dominio.

Cada caso contiene:

- `README.md`: analisis textual del caso, enlaces e imagenes de sus diagramas.
- `colaboracion.puml` / `colaboracion.svg`: colaboracion MVC de analisis.
- `secuencia.puml` / `secuencia.svg`: secuencia de analisis del caso.

Los diagramas originales de SdR estan en [00-casos-uso/02-detalle](../00-casos-uso/02-detalle/README.md).

## Diagramas de referencia SdR

Estos diagramas ayudan a situar actores, modulos y estados antes de entrar en cada caso concreto.

### Gestion de sesion y navegacion

![Gestion de sesion y navegacion](../00-casos-uso/01-actores-casos-uso/diagramas/diagrama-gestion-sesion-navegacion.svg)

### Organizacion de grupos

![Organizacion de grupos](../00-casos-uso/01-actores-casos-uso/diagramas/diagrama-organizacion-grupos.svg)

### Gestion de tareas

![Gestion de tareas](../00-casos-uso/01-actores-casos-uso/diagramas/diagrama-gestion-tareas.svg)

### Planificacion y detalles

![Planificacion y detalles](../00-casos-uso/01-actores-casos-uso/diagramas/diagrama-planificacion-detalles.svg)

### Contexto de administrador

![Contexto de administrador](../00-casos-uso/01-actores-casos-uso/diagrama-contexto/diagrama-contexto-admin.svg)

### Contexto de miembro administrador

![Contexto de miembro administrador](../00-casos-uso/01-actores-casos-uso/diagrama-contexto/diagrama-contexto-miembro-admin.svg)

### Contexto de miembro

![Contexto de miembro](../00-casos-uso/01-actores-casos-uso/diagrama-contexto/diagrama-contexto-miembro.svg)

## Galeria de analisis por caso de uso

Cada bloque muestra directamente la colaboracion y la secuencia del caso. El titulo enlaza al README detallado.

### Gestion de grupos

#### [abrirGrupos()](./casos-uso/gestion-grupos/abrirGrupos/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de abrirGrupos()](./casos-uso/gestion-grupos/abrirGrupos/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de abrirGrupos()](./casos-uso/gestion-grupos/abrirGrupos/secuencia.svg)

#### [abrirInvitaciones()](./casos-uso/gestion-grupos/abrirInvitaciones/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de abrirInvitaciones()](./casos-uso/gestion-grupos/abrirInvitaciones/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de abrirInvitaciones()](./casos-uso/gestion-grupos/abrirInvitaciones/secuencia.svg)

#### [crearGrupo()](./casos-uso/gestion-grupos/crearGrupo/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de crearGrupo()](./casos-uso/gestion-grupos/crearGrupo/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de crearGrupo()](./casos-uso/gestion-grupos/crearGrupo/secuencia.svg)

#### [editarGrupo()](./casos-uso/gestion-grupos/editarGrupo/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de editarGrupo()](./casos-uso/gestion-grupos/editarGrupo/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de editarGrupo()](./casos-uso/gestion-grupos/editarGrupo/secuencia.svg)

#### [editarInvitacion()](./casos-uso/gestion-grupos/editarInvitacion/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de editarInvitacion()](./casos-uso/gestion-grupos/editarInvitacion/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de editarInvitacion()](./casos-uso/gestion-grupos/editarInvitacion/secuencia.svg)

#### [editarMiembro()](./casos-uso/gestion-grupos/editarMiembro/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de editarMiembro()](./casos-uso/gestion-grupos/editarMiembro/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de editarMiembro()](./casos-uso/gestion-grupos/editarMiembro/secuencia.svg)

#### [eliminarGrupo()](./casos-uso/gestion-grupos/eliminarGrupo/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de eliminarGrupo()](./casos-uso/gestion-grupos/eliminarGrupo/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de eliminarGrupo()](./casos-uso/gestion-grupos/eliminarGrupo/secuencia.svg)

#### [eliminarMiembro()](./casos-uso/gestion-grupos/eliminarMiembro/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de eliminarMiembro()](./casos-uso/gestion-grupos/eliminarMiembro/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de eliminarMiembro()](./casos-uso/gestion-grupos/eliminarMiembro/secuencia.svg)

#### [invitarUsuario()](./casos-uso/gestion-grupos/invitarUsuario/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de invitarUsuario()](./casos-uso/gestion-grupos/invitarUsuario/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de invitarUsuario()](./casos-uso/gestion-grupos/invitarUsuario/secuencia.svg)


### Gestion de sesion

#### [cerrarSesion()](./casos-uso/gestion-sesion/cerrarSesion/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de cerrarSesion()](./casos-uso/gestion-sesion/cerrarSesion/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de cerrarSesion()](./casos-uso/gestion-sesion/cerrarSesion/secuencia.svg)

#### [completarGestion()](./casos-uso/gestion-sesion/completarGestion/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de completarGestion()](./casos-uso/gestion-sesion/completarGestion/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de completarGestion()](./casos-uso/gestion-sesion/completarGestion/secuencia.svg)

#### [iniciarSesion()](./casos-uso/gestion-sesion/iniciarSesion/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de iniciarSesion()](./casos-uso/gestion-sesion/iniciarSesion/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de iniciarSesion()](./casos-uso/gestion-sesion/iniciarSesion/secuencia.svg)


### Gestion de tareas

#### [abrirTareas()](./casos-uso/gestion-tareas/abrirTareas/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de abrirTareas()](./casos-uso/gestion-tareas/abrirTareas/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de abrirTareas()](./casos-uso/gestion-tareas/abrirTareas/secuencia.svg)

#### [crearTarea()](./casos-uso/gestion-tareas/crearTarea/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de crearTarea()](./casos-uso/gestion-tareas/crearTarea/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de crearTarea()](./casos-uso/gestion-tareas/crearTarea/secuencia.svg)

#### [editarTarea()](./casos-uso/gestion-tareas/editarTarea/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de editarTarea()](./casos-uso/gestion-tareas/editarTarea/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de editarTarea()](./casos-uso/gestion-tareas/editarTarea/secuencia.svg)

#### [eliminarTarea()](./casos-uso/gestion-tareas/eliminarTarea/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de eliminarTarea()](./casos-uso/gestion-tareas/eliminarTarea/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de eliminarTarea()](./casos-uso/gestion-tareas/eliminarTarea/secuencia.svg)

#### [marcarCompletada()](./casos-uso/gestion-tareas/marcarCompletada/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de marcarCompletada()](./casos-uso/gestion-tareas/marcarCompletada/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de marcarCompletada()](./casos-uso/gestion-tareas/marcarCompletada/secuencia.svg)

#### [relacionarTareas()](./casos-uso/gestion-tareas/relacionarTareas/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de relacionarTareas()](./casos-uso/gestion-tareas/relacionarTareas/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de relacionarTareas()](./casos-uso/gestion-tareas/relacionarTareas/secuencia.svg)

#### [validarConflicto()](./casos-uso/gestion-tareas/validarConflicto/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de validarConflicto()](./casos-uso/gestion-tareas/validarConflicto/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de validarConflicto()](./casos-uso/gestion-tareas/validarConflicto/secuencia.svg)


### Planificacion y configuracion

#### [abrirPlanificacion()](./casos-uso/planificacion-configuracion/abrirPlanificacion/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de abrirPlanificacion()](./casos-uso/planificacion-configuracion/abrirPlanificacion/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de abrirPlanificacion()](./casos-uso/planificacion-configuracion/abrirPlanificacion/secuencia.svg)

#### [asignarTareaAUsuario()](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de asignarTareaAUsuario()](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de asignarTareaAUsuario()](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/secuencia.svg)

#### [configurarRecordatorio()](./casos-uso/planificacion-configuracion/configurarRecordatorio/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de configurarRecordatorio()](./casos-uso/planificacion-configuracion/configurarRecordatorio/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de configurarRecordatorio()](./casos-uso/planificacion-configuracion/configurarRecordatorio/secuencia.svg)

#### [definirLocalizacion()](./casos-uso/planificacion-configuracion/definirLocalizacion/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de definirLocalizacion()](./casos-uso/planificacion-configuracion/definirLocalizacion/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de definirLocalizacion()](./casos-uso/planificacion-configuracion/definirLocalizacion/secuencia.svg)

#### [establecerHorario()](./casos-uso/planificacion-configuracion/establecerHorario/README.md)

Colaboracion de analisis:

![Colaboracion de analisis de establecerHorario()](./casos-uso/planificacion-configuracion/establecerHorario/colaboracion.svg)

Secuencia de analisis:

![Secuencia de analisis de establecerHorario()](./casos-uso/planificacion-configuracion/establecerHorario/secuencia.svg)
