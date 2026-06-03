# Gestor de tareas familiares

[![Inicio](https://img.shields.io/badge/Inicio-FFFFFF?style=for-the-badge&logo=homeassistant&logoColor=black)](../../README.md)
[![Modelo de Dominio](https://img.shields.io/badge/Modelo%20de%20Dominio-FFFFFF?style=for-the-badge&logo=bookstack&logoColor=black)](../modelosUML/modeloDeDominio/README.md)
[![Actores Y CasosDeUso](https://img.shields.io/badge/Actores%20&%20Casos%20De%20Uso-FFFFFF?style=for-the-badge&logo=people&logoColor=black)](./README.md)
[![Diagramas de Contexto](https://img.shields.io/badge/Diagramas%20de%20Contexto-FFFFFF?style=for-the-badge&logo=bookstack&logoColor=black)](./diagramaContexto/README.md)
[![Detallar & Prototipar](https://img.shields.io/badge/Detallar%20&%20Prototipar-FFFFFF?style=for-the-badge&logo=figma&logoColor=black)](./detalladoYPrototipado/README.md)

## Diagrama de Gestión de Sesión y Navegación

| Diagrama | Código Fuente |
|----------|---------------|
| ![Diagrama de Gestión de Sesión y Navegación](./diagramas/diagramaGestionSesionYNavegacion/diagramaGestionSesionYNavegacion.svg)| [Ver código](./diagramas/diagramaGestionSesionYNavegacion/diagramaGestionSesionYNavegacion.puml) |

## Diagrama de Organizacion y Grupos 
| Diagrama  | Código Fuente |
|----------|---------------|
| ![Diagrama de Organización y Grupos](./diagramas/diagramaOrganizacionYGrupos/diagramaOrganizacionYGrupos.svg)| [Ver código](./diagramas/diagramaOrganizacionYGrupos/diagramaOrganizacionYGrupos.puml) |


## Diagrama de Gestión de Tareas 
| Diagrama | Código Fuente |
|----------|---------------|
| ![Diagrama de Gestion de Tareas](./diagramas/diagramaGestionTareas/diagramaGestionTareas.svg)| [Ver código](./diagramas/diagramaGestionTareas/diagramaGestionTareas.puml) |

## Diagrama de Planificación Y Detalles 

| Diagrama | Código Fuente |
|----------|---------------|
| ![Diagrama de Planificación Y Detalles](./diagramas/diagramaPlanificaciónYDetalles/diagramaPlanificacionYDetalles.svg)| [Ver código](./diagramas/diagramaPlanificaciónYDetalles/diagramaPlanificacionYDetalles.puml) |

## Actores

### Administrador

Persona que gestiona el grupo familiar y controla toda la configuración. Puede crear y modificar miembros, tareas y reglas.

### Miembro Administrador

Persona que gestiona el grupo familiar y controla toda la configuración. Puede crear y modificar miembros, tareas y reglas, pero no tiene acceso a crear ni eliminar grupos.

### Miembro

Personas del grupo que consultan y realizan las tareas asignadas, marcan actividades completadas y visualizan la información general.

## Casos de uso

### [Gestión de sesión y navegación](./detalladoYPrototipado/gestionDeSesionYNavegacion/README.md)

1. [iniciarSesion()](./detalladoYPrototipado/gestionDeSesionYNavegacion/iniciarSesion/iniciarSesion.md)
2. [cerrarSesion()](./detalladoYPrototipado/gestionDeSesionYNavegacion/cerrarSesion/cerrarSesion.md)
3. [completarGestion()](./detalladoYPrototipado/gestionDeSesionYNavegacion/completarGestion/completarGestion.md)

### [Gestión de grupos y usuarios](./detalladoYPrototipado/gestionDeGruposYUsuarios/README.md)

1. [abrirGrupos()](./detalladoYPrototipado/gestionDeGruposYUsuarios/abrirGrupos/abrirGrupos.md)
2. [crearGrupo()](./detalladoYPrototipado/gestionDeGruposYUsuarios/crearGrupo/crearGrupo.md)
3. [editarGrupo()](./detalladoYPrototipado/gestionDeGruposYUsuarios/editarGrupo/editarGrupo.md)
4. [eliminarGrupo()](./detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarGrupo/eliminarGrupo.md)
5. [invitarUsuario()](./detalladoYPrototipado/gestionDeGruposYUsuarios/invitarUsuario/invitarUsuario.md)
6. [editarMiembro()](./detalladoYPrototipado/gestionDeGruposYUsuarios/editarMiembro/editarMiembro.md)
7. [eliminarMiembro()](./detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarMiembro/eliminarMiembro.md)
8. [abrirInvitaciones()](./detalladoYPrototipado/gestionDeGruposYUsuarios/abrirInvitaciones/abrirInvitaciones.md)
9. [editarInvitacion()](./detalladoYPrototipado/gestionDeGruposYUsuarios/editarInvitacion/editarInvitacion.md)

### [Gestión de tareas](./detalladoYPrototipado/gestionDeTareas/README.md)

1. [abrirTareas()](./detalladoYPrototipado/gestionDeTareas/abrirTareas/abrirTareas.md)
2. [crearTarea()](./detalladoYPrototipado/gestionDeTareas/crearTarea/crearTarea.md)
3. [editarTarea()](./detalladoYPrototipado/gestionDeTareas/editarTarea/editarTarea.md)
4. [relacionarTareas()](./detalladoYPrototipado/gestionDeTareas/relacionarTareas/relacionarTareas.md)
5. [eliminarTarea()](./detalladoYPrototipado/gestionDeTareas/eliminarTarea/eliminarTarea.md)
6. [marcarCompletada()](./detalladoYPrototipado/gestionDeTareas/marcarCompletada/marcarCompletada.md)
6. [validarConflicto()](./detalladoYPrototipado/gestionDeTareas/editarTarea/editarTarea.md)

### [Planificación y configuración](./detalladoYPrototipado/planificacionYConfiguracion/README.md)

1. [abrirPlanificacion()](./detalladoYPrototipado/planificacionYConfiguracion/abrirPlanificacion/abrirPlanificacion.md)
2. [establecerHorario()](./detalladoYPrototipado/planificacionYConfiguracion/establecerHorario/establecerHorario.md)
3. [definirLocalizacion()](./detalladoYPrototipado/planificacionYConfiguracion/definirLocalizacion/definirLocalizacion.md)
4. [configurarRecordatorio()](./detalladoYPrototipado/planificacionYConfiguracion/configurarRecordatorio/configurarRecordatorio.md)
5. [asignarTareaAUsuario()](./detalladoYPrototipado/gestionDeGruposYUsuarios/asignarTareaAUsuario/asignarTareaAUsuario.md)