# Criterios de integración para diseño e implementación

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
  `establecerHorario()`, `definirLocalizacion()`, `configurarRecordatorio()`,
  `asignarTareaAUsuario()`.

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
  un detalle inexistente. Tras `eliminarMiembro()` se volverá a
  `GRUPO_ABIERTO`.

## Roles y permisos

SdR mezcla en algunos puntos actor detallado, diagrama de organización y
diagramas de contexto. Para implementar sin romper el sistema, conviene fijar
esta matriz operativa:

| Acción | Perfil recomendado |
| --- | --- |
| Iniciar/cerrar sesión | Cualquier usuario |
| Consultar grupos propios | Cualquier usuario autenticado |
| Crear grupo | Administrador |
| Eliminar grupo | Administrador |
| Editar grupo | Administrador o Miembro Administrador |
| Invitar usuario | Administrador o Miembro Administrador |
| Editar/eliminar miembro | Administrador o Miembro Administrador |
| Abrir invitaciones | Cualquier usuario autenticado |
| Aceptar/rechazar invitación | Usuario destinatario |
| Abrir tareas | Miembro, Miembro Administrador o Administrador |
| Crear/editar/eliminar tareas | Miembro Administrador o Administrador |
| Relacionar tareas | Miembro Administrador o Administrador |
| Marcar tarea completada | Usuario asignado, miembro habilitado por modo grupal o perfil administrador |
| Abrir planificación | Miembro Administrador o Administrador |
| Establecer horario | Miembro Administrador o Administrador |
| Definir localización | Miembro Administrador o Administrador |
| Configurar recordatorio | Miembro Administrador o Administrador |
| Asignar tarea a usuario | Miembro Administrador o Administrador |

Esta matriz no cambia la jerarquía del SdR: la concreta. `abrirGrupos()` será
una vista de lectura para el `Miembro`; las acciones administrativas seguirán
dependiendo del perfil.

## Modelo de datos que habrá que cuidar

### Pertenencia a grupo

El modelo de dominio indica que un usuario puede pertenecer a varios grupos de
forma independiente. Por tanto, en diseño se representará la pertenencia como
relación propia entre usuario y grupo, no como un dato plano del usuario.

Recomendación de diseño:

- `Usuario`
- `Grupo`
- `MiembroGrupo`
- `RolEnGrupo`

El rol operativo se asociará a `MiembroGrupo`, no a `Usuario`. Así una misma
persona podrá administrar un grupo y ser miembro ordinario en otro sin heredar
permisos indebidos.

### Roles

El catálogo mínimo de roles por grupo será:

- `Administrador`
- `Miembro Administrador`
- `Miembro`

También existirá la regla de integridad: un grupo no puede quedarse sin ningún
miembro con perfil capaz de administrarlo.
- El primer incremento partirá de usuarios precargados. No se inventará un
  registro de cuentas que SdR no define.

### Invitaciones

La invitación debe enlazar como mínimo:

- grupo de destino,
- usuario emisor,
- email normalizado del destinatario,
- estado,
- fecha límite.

El email será el identificador común para login e invitaciones. La fecha
solicitada por `invitarUsuario()` se tratará como límite de caducidad.

## Decisiones por módulo

### Grupos

- `crearGrupo()` exige nombre obligatorio. Faltan reglas de longitud, nombres
  duplicados y mensajes de validación.
- Al crear un grupo se registrará también la pertenencia del creador con rol
  `Administrador`.
- `editarGrupo()` permitirá modificar nombre y descripción.
- `eliminarGrupo()` exigirá confirmación y se bloqueará mientras existan tareas
  asociadas. Si no hay tareas, retirará las pertenencias y cancelará las
  invitaciones pendientes del grupo.
- Las listas (`abrirGrupos()`) deben soportar lista vacía, error de carga y
  filtro sin resultados.

### Miembros

- `editarMiembro()` debe limitarse a datos de gestión dentro del grupo,
  especialmente rol o permisos, no a editar el perfil global del usuario.
- `eliminarMiembro()` debe retirar la pertenencia al grupo, no borrar la cuenta
  del usuario.
- No se debe permitir eliminar al último administrador o último gestor efectivo
  del grupo.
- Tras eliminar un miembro se volverá a `GRUPO_ABIERTO`, porque
  `MIEMBRO_ABIERTO` ya no representa un elemento válido.

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
  grupo con rol inicial `Miembro`. Rechazarla no debe modificar la composición
  del grupo.
- El estado `Cancelada` aparece en el modelo como acción de administrador, pero
  no tiene un caso de uso propio. Se conservará en el modelo sin exponer una
  pantalla nueva en el primer incremento.

### Tareas

- `abrirTareas()` debe separar consulta y gestión: el `Miembro` puede consultar
  y marcar tareas, mientras que la creación, edición y eliminación requieren
  perfil administrador.
- El `Miembro` verá sus tareas asignadas y las abiertas a
  `CUALQUIERA_DEL_GRUPO`; los perfiles gestores podrán consultar las tareas de
  los grupos que administran.
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
- `Creada` será el estado transitorio durante la captura de datos. Al guardar
  una tarea con horario válido quedará `Programada`.
- La localización será opcional y no condicionará el paso a `Programada`.
- La transición `Programada -> En ejecución` se aplicará cuando se alcance la
  hora de inicio. SdR no define un caso de uso manual para iniciar tareas.
- Un solapamiento horario no bloqueará la creación ni cambiará el ciclo de vida
  de la tarea. Si ya hay destinatarios concretos, se registrará como conflicto
  paralelo del usuario afectado y se generará el aviso correspondiente.
- `editarTarea()` coordinará la edición de datos base y las operaciones
  relacionadas de asignación, horario, localización, recordatorios y
  relaciones entre tareas.
- Si una edición provoca solapamiento, la implementación guardará los cambios
  válidos y registrará o actualizará el conflicto del usuario para su
  notificación y resolución independiente. La aclaración posterior del cliente
  prevalecerá sobre el bloqueo dibujado en el PUML de `editarTarea()`.
- `relacionarTareas()` partirá y terminará en `TAREA_ABIERTO` como operación
  asociada a la edición. Admitirá `subtarea de`, `predecesora` y `sucesora`.
- La jerarquía recursiva de subtareas se almacenará separada de las relaciones
  lógicas de precedencia. Ambas rechazarán autorrelaciones, duplicados y ciclos
  incoherentes.
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
  irreversible. Como SdR no define un caso de uso para cancelar tareas, el
  estado se conservará en el modelo sin añadir una pantalla nueva al primer
  incremento.
- `marcarCompletada()` se ejecutará desde `TAREAS_ABIERTO` y mantendrá la lista
  abierta. Solo permitirá la transición de `En ejecución` a `Finalizada` y
  registrará la fecha de finalización.
- Un `Miembro` podrá completar tareas asignadas o abiertas a
  `CUALQUIERA_DEL_GRUPO`. Los perfiles administradores podrán hacerlo dentro de
  su ámbito de gestión.
- La finalización no se propagará en cascada a las subtareas. Una tarea padre
  no podrá finalizar mientras tenga descendientes pendientes y requerirá
  confirmación explícita aunque todas estén resueltas.
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
- La notificación de conflicto se generará al abrir o reabrir un conflicto, no
  en cada reevaluación idéntica. No se confundirá con un `Recordatorio`
  programado por el usuario.
- La resolución se realizará mediante los flujos existentes de reprogramación
  o reasignación. No se inventará una pantalla adicional en el primer
  incremento.

### Planificación y configuración

- `abrirPlanificacion()` partirá de `SISTEMA_DISPONIBLE` y dejará abierto
  `PLANIFICACION_ABIERTO`.
- El módulo estará disponible para `Miembro Administrador` y `Administrador`,
  no para el `Miembro` operacional.
- La vista permitirá consultar la planificación existente y solicitar
  `establecerHorario()`, `definirLocalizacion()`,
  `configurarRecordatorio()` o `asignarTareaAUsuario()`.
- La planificación se abrirá como agenda global con filtro opcional por grupo.
  Cada mutación usará el grupo de la tarea seleccionada.
- Si todavía no hay datos planificados, la vista vacía debe seguir permitiendo
  iniciar las operaciones de configuración.
- `establecerHorario()` partirá y terminará en `PLANIFICACION_ABIERTO`.
- El horario de una tarea incluirá fecha, hora de inicio y hora de fin. El
  inicio deberá ser anterior al fin.
- El primer incremento solo admitirá intervalos cerrados. Los horarios
  flexibles y repetitivos quedan fuera de alcance.
- Antes de guardar se comprobará la disponibilidad de los usuarios asignados.
  Un solapamiento válido registrará o actualizará el conflicto y generará una
  notificación, pero no bloqueará el horario.
- Si el usuario cancela o falla el guardado, se conservará el horario anterior.
- `definirLocalizacion()` partirá y terminará en `PLANIFICACION_ABIERTO`.
- La localización se asociará a una tarea concreta y se validará antes de
  guardar. Si el usuario cancela o falla el guardado, se conservará el valor
  anterior.
- La primera implementación tratará la localización como texto opcional propio
  de la tarea. No dependerá de mapas, rutas, proximidad geográfica ni servicios
  externos de geolocalización.
- `configurarRecordatorio()` partirá y terminará en `PLANIFICACION_ABIERTO`.
- El recordatorio se asociará a una tarea concreta e incluirá al menos tipo de
  aviso y antelación respecto a la tarea.
- Una tarea podrá tener varios recordatorios con antelaciones distintas. En el
  primer incremento el aviso será interno a la aplicación; los canales externos
  quedan fuera de alcance.
- `configurarRecordatorio()` no se acoplará a `definirLocalizacion()`. El flujo
  de localización incluido por error en su PUML de SdR se ignorará durante el
  desarrollo.
- Antes de guardar se validará que la tarea exista, disponga de horario y que
  la antelación sea válida. Los duplicados se evitarán o actualizarán sin crear
  registros repetidos.
- Si el usuario cancela o falla el guardado, se conservará la configuración
  anterior.
- Los recordatorios vigentes pasarán a `Finalizado` cuando se envíen o cuando
  la tarea asociada quede `Finalizada` o `Cancelada`.
- `asignarTareaAUsuario()` partirá y terminará en `PLANIFICACION_ABIERTO`.
- La asignación enlazará una tarea con usuarios existentes que pertenezcan al
  grupo responsable de esa tarea.
- La asignación admitirá varios destinatarios concretos o el modo
  `CUALQUIERA_DEL_GRUPO`, sin crear un usuario ficticio. Este último modo no
  generará conflictos hasta que exista un destinatario concreto.
- Si una tarea abierta a `CUALQUIERA_DEL_GRUPO` se completa, se registrará el
  usuario que la realizó.
- No se crearán asignaciones duplicadas. Si cambia la asignación de una tarea
  con horario, se reevaluarán los conflictos de los usuarios afectados sin
  bloquear una asignación válida.
- Si el usuario cancela o falla el guardado, se conservarán las asignaciones
  anteriores.

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
- Las mutaciones que afecten a varias entidades deben ser atómicas: si falla
  una parte, no deben quedar cambios parciales.
- Las tareas `Finalizada` y `Cancelada` serán de solo lectura en el primer
  incremento.

## Pendientes no bloqueantes

Estos puntos no impiden comenzar el diseño del primer incremento:

1. Definir longitudes máximas y mensajes de validación para nombres y
   descripciones.
2. Precisar el tratamiento visual de cambios no guardados en `cerrarSesion()`
   y `completarGestion()`.
3. Corregir en SdR el conflicto de merge del PUML de `abrirTareas()`.
4. Corregir en SdR el PUML de `configurarRecordatorio()`, que contiene por
   error el flujo de `definirLocalizacion()`.
5. Corregir en SdR los enlaces de `asignarTareaAUsuario()` que apuntan a una
   carpeta incorrecta.
6. Valorar en incrementos posteriores cancelación de tareas, reprogramación
   guiada, cancelación administrativa de invitaciones, horarios flexibles,
   repeticiones y canales externos de notificación.
