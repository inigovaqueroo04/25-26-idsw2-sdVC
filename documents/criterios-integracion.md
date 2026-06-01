# Pendientes de diseño e implementación

Este documento recoge decisiones y ajustes que habrá que tener presentes cuando
los análisis de casos de uso pasen a diseño e implementación. No cambia el
planteamiento del sistema: sigue siendo una herramienta para que familias y
grupos coordinen, asignen y sigan tareas compartidas. Su función es evitar que
los casos analizados queden correctos por separado pero no encajen entre sí.

## Alcance actual revisado

Los criterios salen de los casos ya analizados:

- Gestión de sesión: `iniciarSesion()`, `cerrarSesion()`,
  `completarGestion()`.
- Gestión de grupos y usuarios: `abrirGrupos()`, `crearGrupo()`,
  `editarGrupo()`, `eliminarGrupo()`, `invitarUsuario()`,
  `editarMiembro()`, `eliminarMiembro()`.
- Gestión de invitaciones: `abrirInvitaciones()`, `editarInvitacion()`.
- Gestión de tareas: `abrirTareas()`, `crearTarea()`, `editarTarea()`,
  `relacionarTareas()`, `eliminarTarea()`, `marcarCompletada()`,
  `validarConflicto()`.
- Planificación y configuración: `abrirPlanificacion()`,
  `establecerHorario()`.

## Reglas transversales

### Metodología RUP

- El proyecto mantendrá trazabilidad entre requisitos, casos de uso, diseño,
  implementación y verificación.
- Cada cambio funcional deberá partir de un caso de uso o requisito analizado.
- Si los artefactos de SdR presentan contradicciones, se documentará el criterio
  operativo adoptado antes de implementar.
- La implementación se organizará de forma incremental: primero el flujo
  principal defendible y después las variantes, validaciones y mejoras
  justificadas por los requisitos.

### Autenticación y sesión

- Todo caso salvo `iniciarSesion()` exige sesión iniciada.
- `SISTEMA_DISPONIBLE` debe funcionar como hub común tras iniciar sesión.
- `cerrarSesion()` debe invalidar la sesión y devolver a `SESION_CERRADA`.
- `completarGestion()` no debe guardar cambios por sorpresa. Si hay datos sin
  guardar, debe avisar o impedir la salida hasta que el flujo quede resuelto.

### Estados de navegación

- Los estados de contexto deben conservarse como contrato de navegación:
  `GRUPOS_ABIERTO`, `GRUPO_ABIERTO`, `MIEMBRO_ABIERTO`,
  `INVITACIONES_ABIERTO`, `INVITACION_ABIERTO`, `TAREAS_ABIERTO` y
  `TAREA_ABIERTO`, `PLANIFICACION_ABIERTO`.
- Las cancelaciones deben volver al estado desde el que el usuario entró cuando
  SdR distingue ese origen. Esto ya aparece en `editarMiembro()` y
  `editarInvitacion()`.
- Si un flujo elimina el elemento que se está visualizando, no debe quedarse en
  un detalle inexistente. En especial, `eliminarMiembro()` necesita cerrar su
  destino final antes de implementarse.

## Roles y permisos

SdR mezcla en algunos puntos actor detallado, diagrama de organización y
diagramas de contexto. Para implementar sin romper el sistema, conviene fijar
esta matriz operativa:

| Acción | Perfil recomendado |
| --- | --- |
| Iniciar/cerrar sesión | Cualquier usuario |
| Abrir gestión de grupos | Administrador o Miembro Administrador |
| Crear grupo | Administrador |
| Eliminar grupo | Administrador |
| Editar grupo | Administrador o Miembro Administrador |
| Invitar usuario | Administrador o Miembro Administrador |
| Editar/eliminar miembro | Administrador o Miembro Administrador |
| Abrir invitaciones | Miembro |
| Aceptar/rechazar invitación | Miembro destinatario |
| Abrir tareas | Miembro, Miembro Administrador o Administrador |
| Crear/editar/eliminar tareas | Miembro Administrador o Administrador |
| Relacionar tareas | Miembro Administrador o Administrador |
| Marcar tarea completada | Miembro asignado o perfil administrador |
| Abrir planificación | Miembro Administrador o Administrador |
| Establecer horario | Miembro Administrador o Administrador |

Esta matriz no cambia la jerarquía del SdR: la concreta. Si se quiere que un
`Miembro` consulte grupos, debería definirse como vista de lectura, no como la
misma gestión administrativa de `abrirGrupos()`.

## Modelo de datos que habrá que cuidar

### Pertenencia a grupo

El modelo de dominio indica que un usuario puede pertenecer a varios grupos de
forma independiente. Por tanto, en diseño conviene representar la pertenencia
como relación propia entre usuario y grupo, no como un dato plano del usuario.

Recomendación de diseño:

- `Usuario`
- `Grupo`
- `Pertenencia` o `MiembroGrupo`
- `RolEnGrupo`

Esto permite que una misma persona sea administradora en un grupo y miembro en
otro, sin contradecir el planteamiento del SdR.

### Roles

Hay que cerrar el catálogo mínimo de roles antes de implementar permisos:

- `Administrador`
- `Miembro Administrador`
- `Miembro`

También debe existir la regla de integridad: un grupo no puede quedarse sin
ningún perfil capaz de administrarlo.

### Invitaciones

La invitación debe enlazar como mínimo:

- grupo de destino,
- usuario emisor,
- usuario destinatario o identificador invitado,
- estado,
- fecha relevante.

La fecha de `invitarUsuario()` debe concretarse. Para que encaje con el modelo
de estados, la interpretación más útil es tratarla como fecha límite o
caducidad de la invitación.

## Decisiones por módulo

### Grupos

- `crearGrupo()` exige nombre obligatorio. Faltan reglas de longitud, nombres
  duplicados y mensajes de validación.
- `editarGrupo()` necesita definir qué campos son editables. Como mínimo debe
  mantener coherencia con `crearGrupo()`: nombre y descripción.
- `eliminarGrupo()` no debe borrar en cascada de forma silenciosa. Antes de
  implementar hay que decidir si se bloquea cuando hay tareas, miembros o
  invitaciones asociadas, o si se pide confirmación reforzada.
- Las listas (`abrirGrupos()`) deben soportar lista vacía, error de carga y
  filtro sin resultados.

### Miembros

- `editarMiembro()` debe limitarse a datos de gestión dentro del grupo,
  especialmente rol o permisos, no a editar el perfil global del usuario.
- `eliminarMiembro()` debe retirar la pertenencia al grupo, no borrar la cuenta
  del usuario.
- No se debe permitir eliminar al último administrador o último gestor efectivo
  del grupo.
- El destino tras eliminar miembro debe aclararse: lo funcional es volver a
  `GRUPO_ABIERTO` o a una lista de miembros, no permanecer en un
  `MIEMBRO_ABIERTO` que ya no existe.

### Invitaciones

- `invitarUsuario()` debe impedir invitaciones pendientes duplicadas para el
  mismo usuario y grupo.
- Si el usuario ya pertenece al grupo, no debe generarse invitación.
- `abrirInvitaciones()` debería mostrar por defecto invitaciones `Pendiente`.
  Los estados `Aceptada`, `Rechazada`, `Cancelada` y `Caducada` deben quedar
  accesibles por filtro o historial.
- `editarInvitacion()` debe tratarse como validación de invitación, no como
  edición libre. Solo `Pendiente` debería permitir aceptar o rechazar.
- Aceptar una invitación debe crear o activar la pertenencia del usuario al
  grupo. Rechazarla no debe modificar la composición del grupo.
- El estado `Cancelada` aparece en el modelo como acción de administrador, pero
  todavía no hay un caso de uso administrativo claro para cancelar
  invitaciones. Habrá que cubrirlo más adelante o dejarlo fuera del alcance de
  la primera implementación.

### Tareas

- `abrirTareas()` debe separar consulta y gestión: el `Miembro` puede consultar
  y marcar tareas, mientras que la creación, edición y eliminación requieren
  perfil administrador.
- La lista debe poder abrirse desde `SISTEMA_DISPONIBLE`, desde una tarea
  concreta y desde un grupo. Si llega desde `GRUPO_ABIERTO`, el filtro por grupo
  debería conservarse.
- La lista necesita como datos mínimos identificador, título y estado. Para
  implementación conviene prever también grupo, asignados y horario, porque el
  resto del modelo depende de esos datos.
- El PUML de SdR para `abrirTareas()` contiene marcadores de conflicto de merge.
  Hasta corregirlo, la implementación tomará la navegación de los diagramas de
  contexto como referencia operativa.
- `crearTarea()` partirá de `TAREAS_ABIERTO` y terminará en `TAREA_ABIERTO` si
  se guarda o en `TAREAS_ABIERTO` si se cancela.
- Para crear una tarea se exigirán título, fecha, hora de inicio y hora de fin.
  La implementación validará que el inicio sea anterior al fin aunque el
  detalle y el prototipo de SdR todavía no reflejen todos esos campos.
- Un solapamiento horario no bloqueará la creación ni cambiará el ciclo de vida
  de la tarea. Se registrará como conflicto paralelo del usuario afectado y se
  generará el aviso correspondiente.
- `editarTarea()` coordinará la edición de datos base y las operaciones
  relacionadas de asignación, horario, localización, recordatorios y
  relaciones entre tareas.
- Si una edición provoca solapamiento, la implementación guardará los cambios
  válidos y registrará o actualizará el conflicto del usuario para su
  notificación y resolución independiente. La aclaración posterior del cliente
  prevalecerá sobre el bloqueo dibujado en el PUML de `editarTarea()`.
- `relacionarTareas()` partirá y terminará en `TAREA_ABIERTO` como operación
  asociada a la edición. La primera implementación registrará relaciones de
  precedencia `predecesora` o `sucesora`.
- Las relaciones de precedencia no se mezclarán automáticamente con la
  jerarquía recursiva de subtareas. La implementación rechazará autorrelaciones,
  duplicados y ciclos incoherentes.
- `eliminarTarea()` partirá de `TAREA_ABIERTO`: al confirmar volverá a
  `TAREAS_ABIERTO` y al cancelar mantendrá el detalle abierto.
- La eliminación de una tarea padre borrará también sus subtareas descendientes
  de forma recursiva, pero no afectará a sus tareas hermanas. La confirmación
  deberá advertir expresamente del alcance de la cascada.
- El borrado retirará relaciones y datos auxiliares exclusivos de las tareas
  eliminadas. Los conflictos afectados se reevaluarán dentro del módulo
  independiente del usuario, sin eliminarlos en cascada de forma automática.
- El estado `Cancelada` y `eliminarTarea()` no serán equivalentes: cancelar
  conservará el registro de la tarea y eliminar lo retirará de forma
  irreversible.
- `marcarCompletada()` se ejecutará desde `TAREAS_ABIERTO` y mantendrá la lista
  abierta. Solo permitirá la transición de `En ejecución` a `Finalizada` y
  registrará la fecha de finalización.
- Un `Miembro` solo podrá completar tareas asignadas. Los perfiles
  administradores podrán hacerlo dentro de su ámbito de gestión.
- La finalización no se propagará en cascada a las subtareas. Una tarea padre
  no podrá finalizar mientras tenga descendientes pendientes.
- Al finalizar una tarea se desactivarán sus recordatorios vigentes. Los
  conflictos del usuario seguirán tratándose como información independiente.
- `validarConflicto()` se implementará como servicio interno reutilizable. Se
  ejecutará al crear una tarea y cuando cambien su horario o sus asignaciones.
- La validación comparará las tareas de cada usuario aunque pertenezcan a
  grupos distintos. Cualquier intersección temporal positiva generará o
  actualizará un conflicto; dos intervalos contiguos no se considerarán
  solapados.
- Un horario inválido impedirá guardar. Un horario válido con solapamiento
  registrará el conflicto y generará la notificación, pero no bloqueará los
  cambios ni alterará el ciclo de vida de la tarea.
- Los conflictos se registrarán sin duplicados para cada usuario y conjunto de
  tareas implicadas. Si la planificación cambia, deberán reevaluarse para
  resolver o descartar los que ya no correspondan.

### Planificación y configuración

- `abrirPlanificacion()` partirá de `SISTEMA_DISPONIBLE` y dejará abierto
  `PLANIFICACION_ABIERTO`.
- El módulo estará disponible para `Miembro Administrador` y `Administrador`,
  no para el `Miembro` operacional.
- La vista permitirá consultar la planificación existente y solicitar
  `establecerHorario()`, `definirLocalizacion()`,
  `configurarRecordatorio()` o `asignarTareaAUsuario()`.
- Si todavía no hay datos planificados, la vista vacía debe seguir permitiendo
  iniciar las operaciones de configuración.
- `establecerHorario()` partirá y terminará en `PLANIFICACION_ABIERTO`.
- El horario de una tarea incluirá fecha, hora de inicio y hora de fin. El
  inicio deberá ser anterior al fin.
- Antes de guardar se comprobará la disponibilidad de los usuarios asignados.
  Un solapamiento válido registrará o actualizará el conflicto y generará una
  notificación, pero no bloqueará el horario.
- Si el usuario cancela o falla el guardado, se conservará el horario anterior.

### Sesión y salida de flujos

- `cerrarSesion()` debería avisar si existen cambios no guardados en una vista
  secundaria.
- `completarGestion()` debe ser retorno de navegación, no sustituto de guardar.
- Si una sesión expira, cualquier caso interno debe redirigir a
  `SESION_CERRADA` sin ejecutar cambios parciales.

## Criterios de implementación futura

- Toda mutación debe validar autenticación, permisos y existencia del recurso.
- Las operaciones destructivas requieren confirmación.
- Las pantallas de lista deben contemplar tres estados: cargando/error, vacío y
  con resultados.
- Los estados finales de invitación no deben volver a abrirse para edición sin
  un caso de uso específico.
- Los cambios de rol o pertenencia deben revisarse contra reglas de integridad
  del grupo.

## Puntos que conviene resolver antes de codificar

1. Identificador de usuario: decidir si el sistema usa email, nombre de usuario
   o ambos para login e invitaciones.
2. Fecha de invitación: confirmar que representa caducidad.
3. Campos editables de grupo.
4. Política de eliminación de grupos con datos asociados.
5. Destino final de `eliminarMiembro()` tras confirmar.
6. Catálogo exacto de roles y permisos.
7. Tratamiento de cambios no guardados en `cerrarSesion()` y
   `completarGestion()`.
8. Corregir en SdR el conflicto de merge pendiente del PUML de `abrirTareas()`.
9. Concretar si una tarea creada con horario obligatorio queda inicialmente en
   estado `Creada` o `Programada`.
10. Concretar qué modificaciones se permiten sobre tareas `Finalizada` o
    `Cancelada`.
11. Aclarar si `relacionarTareas()` también debe reestructurar subtareas y si
    los vínculos de bloqueo o apoyo del modelo se exponen en el mismo flujo.
12. Concretar si una tarea padre se finaliza automáticamente cuando todas sus
    subtareas quedan resueltas o si requiere confirmación explícita.
13. Completar en SdR el ciclo de vida de recordatorio para reflejar su
    finalización cuando la tarea asociada ya está `Finalizada`.
14. Concretar la política de repetición de notificaciones cuando un conflicto
    ya registrado siga pendiente tras una nueva validación.
15. Definir si `abrirPlanificacion()` muestra una agenda global del usuario o
    una planificación filtrada por grupo.
16. Concretar si `establecerHorario()` debe soportar horarios flexibles,
    repeticiones o solo intervalos cerrados con fecha, inicio y fin.
