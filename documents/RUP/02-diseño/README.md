# 02-diseño

Fase de diseño de BreñoTask tras cerrar el análisis de casos de uso. Esta fase transforma los análisis en decisiones de colaboración, responsabilidades, estados y trazabilidad, sin entrar todavía en tecnología concreta de frontend, backend o base de datos.

## Propósito

- Definir una arquitectura conceptual que guíe la implementación posterior.
- Identificar participantes de diseño y responsabilidades por caso de uso.
- Mantener trazabilidad entre análisis, diseño y futuras pruebas.
- Evitar mezclar decisiones tecnológicas con decisiones de dominio antes de iniciar código.

## Artefactos generales

- [arquitectura.puml](./arquitectura.puml) / [arquitectura.svg](./arquitectura.svg): capas conceptuales y dependencias permitidas.
- [clases-diseno.puml](./clases-diseno.puml) / [clases-diseno.svg](./clases-diseno.svg): modelo de dominio de diseño.
- [configuracion-proyecto.md](./configuracion-proyecto.md): organización conceptual de diseño y reglas de responsabilidad.
- [decisiones-diseno.md](./decisiones-diseno.md): decisiones globales por módulo.
- [trazabilidad-analisis-diseno.md](./trazabilidad-analisis-diseno.md): relación entre análisis y diseño.
- [casos-uso](./casos-uso/README.md): diseño detallado de los 24 casos de uso.

## Vista rápida

### Arquitectura conceptual

![Arquitectura conceptual](./arquitectura.svg)

Código fuente: [arquitectura.puml](./arquitectura.puml)

### Modelo de clases de diseño

![Modelo de clases de diseño](./clases-diseno.svg)

Código fuente: [clases-diseno.puml](./clases-diseno.puml)

## Relación con análisis

Cada caso de uso parte de su README de análisis, su diagrama de colaboración y su secuencia de análisis. En diseño se transforma esa información en una colaboración conceptual entre interfaz, coordinador del caso, servicios, dominio, persistencia conceptual y estado de aplicación.

## Galeria de diseño por caso de uso

Esta vista evita tener que entrar carpeta por carpeta desde GitHub. Para el detalle textual de cada caso, abre el enlace del titulo.

### Gestion de grupos

#### [abrirGrupos()](./casos-uso/gestion-grupos/abrirGrupos/README.md)

![Secuencia de diseño de abrirGrupos()](./casos-uso/gestion-grupos/abrirGrupos/secuencia.svg)

#### [abrirInvitaciones()](./casos-uso/gestion-grupos/abrirInvitaciones/README.md)

![Secuencia de diseño de abrirInvitaciones()](./casos-uso/gestion-grupos/abrirInvitaciones/secuencia.svg)

#### [crearGrupo()](./casos-uso/gestion-grupos/crearGrupo/README.md)

![Secuencia de diseño de crearGrupo()](./casos-uso/gestion-grupos/crearGrupo/secuencia.svg)

#### [editarGrupo()](./casos-uso/gestion-grupos/editarGrupo/README.md)

![Secuencia de diseño de editarGrupo()](./casos-uso/gestion-grupos/editarGrupo/secuencia.svg)

#### [editarInvitacion()](./casos-uso/gestion-grupos/editarInvitacion/README.md)

![Secuencia de diseño de editarInvitacion()](./casos-uso/gestion-grupos/editarInvitacion/secuencia.svg)

#### [editarMiembro()](./casos-uso/gestion-grupos/editarMiembro/README.md)

![Secuencia de diseño de editarMiembro()](./casos-uso/gestion-grupos/editarMiembro/secuencia.svg)

#### [eliminarGrupo()](./casos-uso/gestion-grupos/eliminarGrupo/README.md)

![Secuencia de diseño de eliminarGrupo()](./casos-uso/gestion-grupos/eliminarGrupo/secuencia.svg)

#### [eliminarMiembro()](./casos-uso/gestion-grupos/eliminarMiembro/README.md)

![Secuencia de diseño de eliminarMiembro()](./casos-uso/gestion-grupos/eliminarMiembro/secuencia.svg)

#### [invitarUsuario()](./casos-uso/gestion-grupos/invitarUsuario/README.md)

![Secuencia de diseño de invitarUsuario()](./casos-uso/gestion-grupos/invitarUsuario/secuencia.svg)


### Gestion de sesion

#### [cerrarSesion()](./casos-uso/gestion-sesion/cerrarSesion/README.md)

![Secuencia de diseño de cerrarSesion()](./casos-uso/gestion-sesion/cerrarSesion/secuencia.svg)

#### [completarGestion()](./casos-uso/gestion-sesion/completarGestion/README.md)

![Secuencia de diseño de completarGestion()](./casos-uso/gestion-sesion/completarGestion/secuencia.svg)

#### [iniciarSesion()](./casos-uso/gestion-sesion/iniciarSesion/README.md)

![Secuencia de diseño de iniciarSesion()](./casos-uso/gestion-sesion/iniciarSesion/secuencia.svg)


### Gestion de tareas

#### [abrirTareas()](./casos-uso/gestion-tareas/abrirTareas/README.md)

![Secuencia de diseño de abrirTareas()](./casos-uso/gestion-tareas/abrirTareas/secuencia.svg)

#### [crearTarea()](./casos-uso/gestion-tareas/crearTarea/README.md)

![Secuencia de diseño de crearTarea()](./casos-uso/gestion-tareas/crearTarea/secuencia.svg)

#### [editarTarea()](./casos-uso/gestion-tareas/editarTarea/README.md)

![Secuencia de diseño de editarTarea()](./casos-uso/gestion-tareas/editarTarea/secuencia.svg)

#### [eliminarTarea()](./casos-uso/gestion-tareas/eliminarTarea/README.md)

![Secuencia de diseño de eliminarTarea()](./casos-uso/gestion-tareas/eliminarTarea/secuencia.svg)

#### [marcarCompletada()](./casos-uso/gestion-tareas/marcarCompletada/README.md)

![Secuencia de diseño de marcarCompletada()](./casos-uso/gestion-tareas/marcarCompletada/secuencia.svg)

#### [relacionarTareas()](./casos-uso/gestion-tareas/relacionarTareas/README.md)

![Secuencia de diseño de relacionarTareas()](./casos-uso/gestion-tareas/relacionarTareas/secuencia.svg)

#### [validarConflicto()](./casos-uso/gestion-tareas/validarConflicto/README.md)

![Secuencia de diseño de validarConflicto()](./casos-uso/gestion-tareas/validarConflicto/secuencia.svg)


### Planificacion y configuracion

#### [abrirPlanificacion()](./casos-uso/planificacion-configuracion/abrirPlanificacion/README.md)

![Secuencia de diseño de abrirPlanificacion()](./casos-uso/planificacion-configuracion/abrirPlanificacion/secuencia.svg)

#### [asignarTareaAUsuario()](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/README.md)

![Secuencia de diseño de asignarTareaAUsuario()](./casos-uso/planificacion-configuracion/asignarTareaAUsuario/secuencia.svg)

#### [configurarRecordatorio()](./casos-uso/planificacion-configuracion/configurarRecordatorio/README.md)

![Secuencia de diseño de configurarRecordatorio()](./casos-uso/planificacion-configuracion/configurarRecordatorio/secuencia.svg)

#### [definirLocalizacion()](./casos-uso/planificacion-configuracion/definirLocalizacion/README.md)

![Secuencia de diseño de definirLocalizacion()](./casos-uso/planificacion-configuracion/definirLocalizacion/secuencia.svg)

#### [establecerHorario()](./casos-uso/planificacion-configuracion/establecerHorario/README.md)

![Secuencia de diseño de establecerHorario()](./casos-uso/planificacion-configuracion/establecerHorario/secuencia.svg)

## Pendiente antes de implementación

- Seleccionar tecnología concreta y documentarla en la fase de implementación.
- Convertir los participantes conceptuales en componentes, servicios y almacenamiento reales.
- Priorizar el primer incremento de construcción.
- Añadir pruebas ejecutables cuando exista código.