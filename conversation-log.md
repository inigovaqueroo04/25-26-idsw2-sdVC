# Conversation log

## [2026-05-25 19:10] Preparacion del protocolo de sesiones con IA

**Prompt:** El usuario pidio revisar `QUE_HACE.md`, `conversation-log.md` y las instrucciones del profesor para automatizar el inicio y cierre de sesiones con palabras clave.

**Resultado:** Se identifico que el alcance del sistema debe mantenerse alineado con `QUE_HACE.md` y que el log debe ser completo, honesto y cronologico. Se definio un protocolo documentado para usar `recopilacion` al iniciar una sesion y `cierre` al terminarla.

**Decision:** Se acepta trabajar con esas dos palabras clave. `recopilacion` servira para revisar contexto y preparar la sesion; `cierre` servira para completar el log, verificar el estado del proyecto y preparar el commit.

---

## [2026-05-25 20:00] Analisis del caso de uso iniciarSesion()

**Prompt:** El usuario inicio una sesion con `recopilacion` y pidio analizar el caso de uso `iniciarSesion()` dentro del repositorio actual, localizar elementos relacionados y crear una documentacion Markdown en `documentos/analisis/`.

**Resultado:** Se reviso el estado del repositorio, los documentos base (`QUE_HACE.md`, `README.md`, `2Think.md`, `conversation-log.md`) y la fuente de requisitos del repositorio SdR. Se preparo una primera version del analisis academico del caso de uso.

**Decision:** Se documentara el caso de uso sin modificar codigo fuente, indicando de forma honesta que en el repositorio actual aun no existe implementacion tecnica del inicio de sesion y que el comportamiento procede del requisitado SdR. Los proximos analisis se dividiran por familia de casos de uso antes de entrar en cada caso concreto.

---

## [2026-05-25 20:14] Reenfoque del analisis desde SdR

**Prompt:** El usuario pidio rehacer el analisis de `iniciarSesion()` usando SdR como referencia principal, con un formato breve y escalable para los 23 casos de uso restantes.

**Resultado:** Se revisaron los elementos de SdR relacionados con `iniciarSesion()`: indice de actores y casos de uso, detalle PUML, prototipo, diagrama de gestion de sesion, diagramas de contexto y modelo de dominio. Se actualizo el analisis en `documentos/analisis/iniciarSesion.md`.

**Decision:** Se prioriza SdR como fuente de verdad para los analisis de casos de uso. El formato queda simplificado para poder repetirlo con el resto de casos sin generar documentacion excesiva.

---

## [2026-05-25 20:20] Cierre de la sesion de analisis

**Prompt:** El usuario escribio `cierre` para cerrar la sesion de trabajo, completar el log, verificar los cambios y preparar el commit.

**Resultado:** Se comprobo que `documentos/analisis/iniciarSesion.md` existe y se puede leer correctamente. Se dejo el analisis breve basado en SdR, junto con un indice en `documentos/analisis/README.md`.

**Decision:** Se commitearan y subiran los cambios de documentacion generados durante la sesion usando la convencion de commits acordada.

---

## [2026-05-26 15:19] Analisis del caso de uso cerrarSesion()

**Prompt:** El usuario inicio una sesion con `recopilacion` y pidio analizar `cerrarSesion()` con un formato breve de caso de uso, creando su Markdown en `documentos/analisis/` sin modificar codigo fuente.

**Resultado:** Se localizaron en SdR los documentos, diagramas y prototipos relacionados con `cerrarSesion()`. Se creo `documentos/analisis/cerrarSesion.md` y se actualizo el indice de analisis.

**Decision:** Se mantiene SdR como fuente de verdad para los analisis de casos de uso y se conserva el formato breve usado para `iniciarSesion()`.

---

## [2026-05-26 16:05] Analisis del caso de uso completarGestion()

**Prompt:** El usuario pidio analizar `completarGestion()`, creando `documentos/analisis/completarGestion.md` con una estructura breve de objetivo, actor, precondiciones, flujo, alternativas, postcondiciones, elementos relacionados y observaciones.

**Resultado:** Se reviso el PUML especifico de `completarGestion()`, su documento Markdown, el prototipo, el diagrama general de gestion de sesion y los diagramas de contexto por actor. Se creo `documentos/analisis/completarGestion.md` y se anadio el caso al indice de analisis.

**Decision:** El caso se documento como un mecanismo de retorno al hub `SISTEMA_DISPONIBLE`, no como cierre de sesion ni como guardado automatico. Las dudas sobre datos pendientes o validaciones se dejaron en flujos alternativos y observaciones porque SdR no concreta ese comportamiento.

---

## [2026-05-26 20:49] Analisis del caso de uso abrirGrupos()

**Prompt:** El usuario inicio una sesion con `recopilacion` y pidio analizar `abrirGrupos()`, localizar elementos relacionados y generar `documentos/analisis/abrirGrupos.md` sin modificar codigo fuente.

**Resultado:** Se localizaron en SdR la carpeta especifica de `abrirGrupos()`, su documento Markdown, el diagrama PUML, el SVG, el prototipo, el indice de gestion de grupos y usuarios, el diagrama de organizacion y grupos, los diagramas de contexto y el modelo de dominio. Se creo `documentos/analisis/abrirGrupos.md` y se actualizo `documentos/analisis/README.md`.

**Decision:** Se documento `abrirGrupos()` como punto de entrada a `GRUPOS_ABIERTO`, con lista de grupos, filtrado y salidas hacia crear, editar, eliminar o completar la gestion. Se dejo constancia de que no hay implementacion directa localizada y de que existe una diferencia menor entre el actor indicado en el detalle y los perfiles permitidos en los diagramas de contexto.

---

## [2026-05-26 21:06] Analisis del caso de uso crearGrupo()

**Prompt:** El usuario inicio una sesion con `recopilacion` y pidio documentar `crearGrupo()` con el mismo formato breve de los casos anteriores, incluyendo precondiciones, flujo principal, alternativas, postcondiciones y elementos relacionados.

**Resultado:** Se comprobo que SdR contiene un caso detallado para `crearGrupo()` en `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/crearGrupo/`. El PUML situa el caso desde `GRUPOS_ABIERTO`, muestra al `Administrador` como iniciador, pide nombre obligatorio y descripcion, permite volver a modificar los datos introducidos, y separa dos salidas: creacion correcta hacia `GRUPO_ABIERTO` y cancelacion hacia `GRUPOS_ABIERTO`. Tambien se reviso el diagrama de organizacion y grupos, donde `crearGrupo()` aparece asociado al `Administrador`, y el diagrama de contexto de administrador, que confirma la transicion desde la lista de grupos al grupo abierto. Con esa base se creo `documentos/analisis/crearGrupo.md` y se enlazo desde `documentos/analisis/README.md`.

**Decision:** El analisis no trata `crearGrupo()` como una pantalla aislada, sino como una accion que nace dentro de la gestion de grupos abierta previamente con `abrirGrupos()`. Se incluyeron alternativas que SdR no desarrolla en detalle pero que son necesarias para completar el comportamiento esperado: usuario sin sesion, falta de permisos, nombre vacio, datos invalidos y fallo al guardar. En observaciones se dejo la duda concreta que queda pendiente en SdR: no se especifican reglas de validacion como nombres duplicados, longitud maxima o mensajes de error.

---

## [2026-05-26 21:24] Analisis del caso de uso editarGrupo()

**Prompt:** El usuario inicio una nueva recopilacion y pidio analizar `editarGrupo()`, creando `documentos/analisis/editarGrupo.md` con el formato breve acordado y sin modificar codigo fuente.

**Resultado:** Se reviso el caso detallado de SdR en `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/editarGrupo/`. El PUML no lo presenta como una edicion que solo nace desde la lista de grupos: permite entrar desde `GRUPOS_ABIERTO`, `GRUPO_ABIERTO`, `TAREAS_ABIERTO` y `MIEMBRO_ABIERTO`, muestra primero los datos actuales del grupo, permite modificar campos, guardar o cancelar, y en ambos finales vuelve a `GRUPO_ABIERTO`. Tambien se contrasto con el diagrama de organizacion y grupos, donde `editarGrupo()` aparece asociado a `Miembro Administrador`, y con los diagramas de contexto de administrador y miembro administrador, que confirman que ambos perfiles llegan a la edicion del grupo.

**Decision:** El analisis se redacto tratando `editarGrupo()` como una accion de mantenimiento de un grupo ya seleccionado, no como creacion ni como navegacion general. En el actor principal se reflejo la tension de SdR: el detalle nombra al `Administrador`, pero el diagrama general asigna el caso al `Miembro Administrador` y la jerarquia hace razonable incluir ambos perfiles. Las alternativas cubren huecos no desarrollados en el PUML, como grupo inexistente, falta de permisos, datos invalidos y fallo al guardar; en observaciones se dejo pendiente concretar campos editables y reglas de validacion.

---

## [2026-05-26 21:41] Analisis del caso de uso eliminarGrupo()

**Prompt:** El usuario pidio una nueva recopilacion para `eliminarGrupo()`, generando solo documentacion en `documentos/analisis/eliminarGrupo.md` con flujos alternativos como cancelacion, falta de permisos o fallo al borrar.

**Resultado:** La busqueda en SdR llevo al detalle de `eliminarGrupo()` dentro de gestion de grupos y usuarios. A diferencia de `editarGrupo()`, aqui no hay varios estados de entrada: el PUML parte de `GRUPOS_ABIERTO`, presenta una confirmacion y solo permite dos decisiones, confirmar o cancelar la eliminacion. En ambos casos el flujo termina de nuevo en `GRUPOS_ABIERTO`, lo que encaja con el diagrama de contexto de administrador, donde `eliminarGrupo()` es una transicion autorreflexiva sobre la lista de grupos. El diagrama de organizacion asigna el caso al `Administrador`, y el README de contexto refuerza que el miembro administrador gestiona grupos pero no crea ni elimina grupos.

**Decision:** Se documento el caso como una accion destructiva reservada al `Administrador`, no como una gestion compartida con `Miembro Administrador`. El flujo alternativo da peso a la cancelacion porque SdR la modela explicitamente, y se anadieron fallos necesarios para cerrar el comportamiento: usuario sin sesion, falta de permisos, grupo inexistente y error al borrar. La observacion se centro en el principal hueco de requisitos: SdR no dice que pasa con tareas, miembros o invitaciones vinculadas al grupo si se confirma la eliminacion.

---

## [2026-05-26 22:00] Analisis del caso de uso invitarUsuario()

**Prompt:** El usuario pidio analizar `invitarUsuario()`, creando un Markdown breve en `documentos/analisis/invitarUsuario.md` e incluyendo alternativas como usuario ya invitado, usuario ya miembro o fallo al registrar la invitacion.

**Resultado:** Se localizo el detalle de `invitarUsuario()` en la carpeta de gestion de grupos y usuarios. El PUML parte de `GRUPO_ABIERTO`, presenta un formulario de invitacion y pide introducir identificador y fecha antes de enviar; si se cancela, tambien vuelve a `GRUPO_ABIERTO`. El detalle menciona al `Administrador`, pero el diagrama de organizacion asigna el caso a `Miembro Administrador` y los diagramas de contexto permiten `invitarUsuario()` desde `GRUPO_ABIERTO` tanto para administrador como para miembro administrador. Ademas, el diagrama de objetos de invitacion confirma que la invitacion queda relacionada con un usuario emisor y un grupo al que se quiere unir el invitado.

**Decision:** El analisis se enfoco como gestion de incorporaciones al grupo, no como edicion de invitaciones ya recibidas por un miembro. Se incluyeron alternativas que SdR no detalla pero que son necesarias para que el caso sea defendible: invitacion duplicada, usuario ya miembro, identificador invalido, grupo inexistente y fallo al registrar o enviar. En observaciones se dejo abierta la duda de requisitos sobre que significa exactamente la fecha de la invitacion y que tipo de identificador usa el sistema.

---

## [2026-05-27 00:14] Analisis del caso de uso editarMiembro()

**Prompt:** El usuario pidio recopilar el caso de uso `editarMiembro()`, crear `documentos/analisis/editarMiembro.md` y cubrir errores como grupo o miembro inexistente, falta de permisos, rol invalido y fallo al guardar.

**Trabajo realizado:** Antes de escribir el analisis revise el material de SdR relacionado con gestion de grupos y miembros. El diagrama especifico de `editarMiembro()` fue la pieza central porque describe dos puntos de entrada, `GRUPO_ABIERTO` y `MIEMBRO_ABIERTO`, y diferencia el resultado segun se guarden cambios o se cancele la edicion. Tambien use los diagramas de contexto de Administrador y Miembro Administrador para confirmar que la edicion puede iniciarse desde la gestion del grupo o desde la ficha de un miembro, y el diagrama de organizacion para situar el caso dentro de la gestion de usuarios y grupos.

**Criterio aplicado:** Documente el caso como una operacion de administracion interna del grupo centrada en cambiar rol o permisos, no como una edicion generica de perfil de usuario. En los flujos alternativos se incluyeron errores que salen directamente del comportamiento esperado del caso: falta de autenticacion, grupo o miembro no disponible, permisos insuficientes, rol invalido, fallo al guardar y cancelacion. Tambien se dejo reflejada la diferencia de retorno entre cancelar desde `MIEMBRO_ABIERTO` y cancelar desde `GRUPO_ABIERTO`, porque ese matiz aparece en el diagrama de actividad y evita que el analisis quede demasiado plano.

**Resultado:** Se creo `documentos/analisis/editarMiembro.md` y se anadio el enlace correspondiente al indice de analisis. La observacion final senala una duda concreta de diseño detectada en SdR: aunque el modelo habla de roles y permisos, no define el catalogo exacto de roles ni restricciones como evitar que un grupo quede sin administrador.

---

## [2026-05-27 15:05] Analisis del caso de uso eliminarMiembro()

**Prompt:** El usuario pidio recopilar el caso de uso `eliminarMiembro()`, crear `documentos/analisis/eliminarMiembro.md` y cubrir errores como usuario no autenticado, grupo o miembro inexistente, falta de permisos, ultimo administrador y fallo al guardar.

**Trabajo realizado:** Se localizo el detalle de `eliminarMiembro()` en la carpeta de gestion de grupos y usuarios de SdR. El PUML parte de `MIEMBRO_ABIERTO`, no de la lista general de grupos, y reduce la interaccion a una confirmacion: el sistema pide confirmar o cancelar la eliminacion. Los diagramas de contexto de Administrador y Miembro Administrador muestran `eliminarMiembro()` como una transicion autorreflexiva dentro de `MIEMBRO_ABIERTO`, mientras que el diagrama de organizacion asigna el caso a `Miembro Administrador`, con herencia desde `Administrador`.

**Criterio aplicado:** El analisis se documento como retirada de pertenencia del miembro al grupo, no como eliminacion global de la cuenta de usuario. Esto encaja mejor con el modelo de dominio, donde los usuarios pueden pertenecer a varios grupos y el grupo organiza miembros para coordinar tareas. Se anadio como alternativa el bloqueo de la eliminacion del ultimo administrador porque el modelo de roles y permisos exige mantener capacidad de gestion, aunque SdR no detalla esa regla.

**Resultado:** Se creo `documentos/analisis/eliminarMiembro.md` y se enlazo en el indice. La observacion principal recoge una ambiguedad real del PUML: el comentario dice que tras eliminar se volveria a la lista del grupo, pero la salida dibujada queda en `MIEMBRO_ABIERTO`, por lo que ese destino deberia aclararse antes de implementar el caso.

---

## [2026-05-29 18:10] Normalizacion de carpetas documentales

**Prompt:** El usuario pidio corregir la duplicidad entre `documents/` y `documentos/`, subir un commit con el arreglo y leer el protocolo de sesiones con IA para poder aplicarlo en adelante.

**Resultado:** Se reviso el protocolo de sesiones con IA y se confirmo que las palabras clave `recopilacion` y `cierre` definen el inicio y final de las sesiones. Se movieron los analisis de casos de uso desde `documentos/analisis/` a `documents/analisis/`, dejando una unica carpeta documental principal. Tambien se actualizaron `README.md` y `documents/README.md` para enlazar el protocolo y el indice de analisis desde la nueva ubicacion.

**Decision:** Se mantiene `documents/` como carpeta documental del proyecto porque coincide con la plantilla de entrega original. Las menciones historicas a `documentos/analisis/` en entradas anteriores del log no se reescriben, ya que describen el estado real del repositorio en esas sesiones.

---

## [2026-05-29 18:18] Analisis del caso de uso abrirInvitaciones()

**Prompt:** Se pidio analizar `abrirInvitaciones()` usando SdR como fuente de requisitos, prestando atencion a su actor, estados de navegacion y relacion con el modelo de invitaciones.

**Resultado:** Se localizaron en SdR el detalle y PUML de `abrirInvitaciones()`, el diagrama de organizacion y grupos, el diagrama de contexto de miembro y los modelos de dominio relacionados con `Invitacion`. El PUML situa el caso como carga de una lista con identificador y estado, con opcion de filtrado y salida hacia `editarInvitacion()` o `completarGestion()`. Con esa base se creo `documents/analisis/abrirInvitaciones.md` y se actualizo el indice de analisis.

**Decision:** El caso se documento como una consulta de invitaciones propia del `Miembro`, con entrada desde `SISTEMA_DISPONIBLE` o recarga desde `INVITACIONES_ABIERTO`, lista filtrable y salida hacia `editarInvitacion()` o `completarGestion()`. Como criterio de diseño, la vista principal deberia priorizar invitaciones `Pendiente`, dejando `Aceptada`, `Rechazada`, `Cancelada` y `Caducada` para filtros o historial.

---

## [2026-05-29 18:36] Analisis del caso de uso editarInvitacion()

**Prompt:** Se pidio analizar `editarInvitacion()` usando SdR como fuente de requisitos, atendiendo a la gestion del estado de la invitacion y a su encaje con el flujo de miembro.

**Resultado:** Se localizaron en SdR el detalle y PUML de `editarInvitacion()`, el diagrama de contexto de miembro, el diagrama de organizacion y grupos y el modelo de estados de invitacion. El PUML muestra entrada desde `INVITACIONES_ABIERTO` o `INVITACION_ABIERTO`, visualizacion de datos, cambio de estado a aceptar o rechazar, guardado y cancelacion. Con esa base se creo `documents/analisis/editarInvitacion.md` y se actualizo el indice de analisis.

**Decision:** El caso se documento como una validacion de invitacion propia del `Miembro`, no como una edicion libre. Como criterio de diseño, solo las invitaciones `Pendiente` deberian admitir aceptacion o rechazo; los estados `Aceptada`, `Rechazada`, `Cancelada` y `Caducada` se tratan como finales.

---

## [2026-05-29 18:45] Pendientes de diseño e implementación

**Prompt:** Se pidio revisar los analisis existentes y los casos de uso de SdR asociados para documentar que decisiones habra que tener presentes cuando el análisis pase a diseño e implementación.

**Resultado:** Se revisaron los casos analizados de sesion, grupos, miembros e invitaciones, junto con los diagramas de contexto, organizacion, modelo de dominio y estados de invitacion. Se creo `documents/criterios-integracion.md` y se enlazo desde `documents/README.md`.

**Decision:** Se documento una capa de criterios transversales sin cambiar el planteamiento del sistema: permisos por rol, navegacion por estados, pertenencia usuario-grupo, reglas de integridad, tratamiento de invitaciones, borrados y validaciones pendientes. El objetivo es que los futuros casos de uso y la implementación encajen en un unico comportamiento coherente.

---

## [2026-05-29 19:18] Análisis de abrirTareas()

**Prompt:** El usuario pidió analizar `abrirTareas()`, atendiendo a quién consulta las tareas, qué lista queda disponible, qué ocurre si no hay grupo seleccionado o no hay tareas, y qué salidas permite el caso.

**Resultado:** Se localizaron en SdR el detalle y PUML de `abrirTareas()`, los diagramas de contexto de Administrador, Miembro Administrador y Miembro, el diagrama de gestión de tareas, el modelo de dominio y el diagrama de estados de tarea. Con esa base se creó `documents/analisis/abrirTareas.md`, se añadió al índice de análisis y se actualizó `documents/criterios-integracion.md` con criterios mínimos para la futura integración de tareas.

**Decision:** El caso se documentó como entrada a la lista de tareas y no como edición directa. El `Miembro` puede consultar y marcar tareas, mientras que crear, editar y eliminar queda reservado a perfiles administradores. Como el PUML de SdR contiene marcadores de conflicto de merge, para la futura implementación se tomará la navegación de los diagramas de contexto como referencia operativa hasta que ese artefacto quede corregido.

---

## [2026-05-31 20:34] Análisis de crearTarea()

**Prompt:** El usuario pidió analizar `crearTarea()`, atendiendo a quién puede crearla, qué datos iniciales necesita, cómo se valida el horario y qué ocurre ante cancelación, solapamiento o fallo de guardado.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `crearTarea()`, los diagramas de contexto y gestión de tareas, el modelo de dominio, el ciclo de vida de tarea y las aclaraciones de la segunda reunión. Se creó `documents/analisis/crearTarea.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** La futura implementación exigirá título, fecha, hora de inicio y hora de fin, validará que el inicio sea anterior al fin y asociará la tarea a un grupo seleccionado. Si existe solapamiento, registrará o notificará el conflicto al usuario afectado sin bloquear la creación. Queda pendiente concretar si una tarea creada con horario obligatorio parte de estado `Creada` o `Programada`. Para el conjunto del proyecto se aplicará la metodología RUP, manteniendo trazabilidad entre requisitos, casos de uso, diseño, implementación y verificación.

---

## [2026-05-31 20:43] Análisis de editarTarea()

**Prompt:** El usuario pidió analizar `editarTarea()`, atendiendo a quién puede modificar una tarea, qué datos y operaciones incluye la edición, cómo se validan los cambios y qué ocurre ante conflicto horario, cancelación o fallo de guardado.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `editarTarea()`, los diagramas de contexto y gestión de tareas, el modelo de dominio, los estados de tarea y conflicto horario y las aclaraciones de la segunda reunión. Se creó `documents/analisis/editarTarea.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `editarTarea()` se implementará como coordinador de los datos base y las operaciones relacionadas con asignación, horario, localización, recordatorios y relaciones. Aunque el PUML devuelve a edición al detectar conflicto, prevalecerá la aclaración posterior del cliente: los cambios válidos se guardarán y el conflicto del usuario se registrará para notificación y resolución independiente. Queda pendiente concretar qué modificaciones se permiten sobre tareas `Finalizada` o `Cancelada`.

---

## [2026-05-31 20:53] Análisis de relacionarTareas()

**Prompt:** El usuario pidió analizar `relacionarTareas()`, atendiendo a quién puede vincular tareas, qué tipos de relación admite el flujo y qué ocurre ante una relación inválida, tareas incompatibles, cancelación o fallo de guardado.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `relacionarTareas()`, su acceso desde `editarTarea()`, los diagramas de contexto y gestión de tareas, el modelo de dominio y las aclaraciones sobre subtareas. Se creó `documents/analisis/relacionarTareas.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `relacionarTareas()` se implementará como una operación asociada a la edición que parte y termina en `TAREA_ABIERTO`. La primera implementación registrará relaciones de precedencia `predecesora` o `sucesora` y rechazará autorrelaciones, duplicados y ciclos incoherentes. No se mezclará automáticamente con la jerarquía recursiva de subtareas: queda pendiente aclarar si el mismo flujo debe cubrir también reestructuración de subtareas y los vínculos de bloqueo o apoyo mencionados por el modelo.

---

## [2026-05-31 21:04] Análisis de eliminarTarea()

**Prompt:** El usuario pidió analizar `eliminarTarea()`, atendiendo a quién puede borrar una tarea, qué ocurre al confirmar o cancelar y cómo debe tratarse la eliminación de una tarea con subtareas.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `eliminarTarea()`, los diagramas de contexto y gestión de tareas, el modelo recursivo de subtareas, los datos auxiliares asociados y las aclaraciones de la segunda reunión. Se creó `documents/analisis/eliminarTarea.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `eliminarTarea()` se implementará como una operación irreversible que parte de `TAREA_ABIERTO`: al confirmar volverá a `TAREAS_ABIERTO` y al cancelar mantendrá el detalle abierto. Si se elimina una tarea padre, también se eliminarán recursivamente sus subtareas descendientes, pero no sus tareas hermanas. Se retirarán las referencias auxiliares que queden inválidas y se reevaluarán los conflictos como componente independiente del usuario. El estado `Cancelada` conservará el registro de la tarea y no será equivalente al borrado.

---

## [2026-06-01 18:55] Análisis de marcarCompletada()

**Prompt:** El usuario pidió analizar `marcarCompletada()`, atendiendo a quién puede finalizar una tarea, qué estado y fecha quedan registrados y qué ocurre ante falta de permisos, tarea inexistente, tarea ya completada o fallo de actualización.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `marcarCompletada()`, su acceso desde `abrirTareas()` y `editarTarea()`, los diagramas de contexto y gestión de tareas, el ciclo de vida de tarea y las aclaraciones sobre subtareas y conflictos. Se creó `documents/analisis/marcarCompletada.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `marcarCompletada()` se implementará como una operación autorreflexiva sobre `TAREAS_ABIERTO`. Permitirá pasar una tarea asignada de `En ejecución` a `Finalizada`, registrará la fecha de finalización y desactivará sus recordatorios pendientes. No cerrará subtareas en cascada ni permitirá finalizar una tarea padre con descendientes pendientes. Los conflictos permanecerán independientes del ciclo de vida de la tarea. Queda pendiente decidir si una tarea padre se finaliza automáticamente al quedar resueltas todas sus subtareas o si requiere confirmación explícita.

---

## [2026-06-01 18:58] Análisis de validarConflicto()

**Prompt:** El usuario pidió analizar `validarConflicto()`, atendiendo a quién provoca la validación, qué datos necesita y qué ocurre ante horario inválido, solapamiento detectado o fallo de comprobación.

**Resultado:** Se revisaron la inclusión de `validarConflicto()` dentro de `editarTarea()`, el diagrama de gestión de tareas, el modelo y ciclo de vida de conflicto horario y las aclaraciones de la segunda reunión. Se creó `documents/analisis/validarConflicto.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `validarConflicto()` se implementará como servicio interno reutilizable al crear una tarea o cambiar horario o asignaciones. Comparará las tareas de cada usuario aunque pertenezcan a grupos distintos y registrará o actualizará un conflicto ante cualquier intersección temporal positiva. Un horario inválido bloqueará el guardado; un solapamiento válido generará notificación, pero no impedirá guardar ni alterará el ciclo de vida de la tarea. Queda pendiente concretar la política de repetición de avisos para conflictos que sigan abiertos.

---

## [2026-06-01 19:25] Análisis de abrirPlanificacion()

**Prompt:** El usuario inició una sesión con `recopilacion` y pidió analizar `abrirPlanificacion()`, atendiendo a quién accede a la planificación, qué queda disponible al abrirla y qué ocurre ante falta de autenticación, error de carga, grupo no seleccionado o ausencia de datos planificados.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `abrirPlanificacion()`, el diagrama de planificación y detalles, los diagramas de contexto de Administrador y Miembro Administrador y el modelo de dominio. Se creó `documents/analisis/abrirPlanificacion.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `abrirPlanificacion()` se implementará como acceso desde `SISTEMA_DISPONIBLE` a `PLANIFICACION_ABIERTO` para `Miembro Administrador` y `Administrador`. La vista mantendrá disponibles las operaciones de horario, localización, recordatorios y asignación incluso cuando todavía no existan datos planificados. Queda pendiente concretar si la planificación es global para el usuario o filtrada por grupo.

---

## [2026-06-01 19:31] Análisis de establecerHorario()

**Prompt:** El usuario inició una sesión con `recopilacion` y pidió analizar `establecerHorario()`, atendiendo a quién define o modifica el horario y qué ocurre ante tarea inexistente, intervalo inválido, solapamiento o fallo al guardar.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `establecerHorario()`, el diagrama de planificación y detalles, los diagramas de contexto, el modelo de dominio y las aclaraciones de la segunda reunión. Se creó `documents/analisis/establecerHorario.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `establecerHorario()` se implementará como operación autorreflexiva sobre `PLANIFICACION_ABIERTO` para perfiles administradores. Exigirá fecha, hora de inicio y hora de fin, validará que el inicio sea anterior al fin y comprobará solapamientos antes de guardar. Un horario válido con conflicto se conservará y generará el aviso correspondiente. Queda pendiente concretar el soporte de horarios flexibles o repetitivos.

---

## [2026-06-01 19:39] Análisis de definirLocalizacion()

**Prompt:** El usuario inició una sesión con `recopilacion` y pidió analizar `definirLocalizacion()`, atendiendo a quién define o modifica la ubicación y qué ocurre ante tarea inexistente, localización inválida, falta de permisos o fallo al guardar.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `definirLocalizacion()`, el diagrama de planificación y detalles, los diagramas de contexto, el modelo de dominio y las minutas sobre ubicación. Se creó `documents/analisis/definirLocalizacion.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `definirLocalizacion()` se implementará como operación autorreflexiva sobre `PLANIFICACION_ABIERTO` para perfiles administradores. La ubicación se asociará a una tarea concreta, se validará antes de guardar y conservará el valor anterior si se cancela o falla el registro. Queda pendiente definir el formato mínimo de `Localizacion`. La optimización por proximidad geográfica, la integración con mapas y el cálculo de rutas quedan fuera del alcance del proyecto.

---

## [2026-06-01 19:46] Análisis de configurarRecordatorio()

**Prompt:** El usuario inició una sesión con `recopilacion` y pidió analizar `configurarRecordatorio()`, atendiendo a quién configura el aviso y qué ocurre ante tarea inexistente, fecha u hora inválida, duplicidad, falta de permisos o fallo al guardar.

**Resultado:** Se revisaron el prototipo de `configurarRecordatorio()`, el diagrama de planificación y detalles, los diagramas de contexto, el modelo y ciclo de vida de `Recordatorio` y las minutas sobre avisos personalizados. El PUML específico de SdR contiene por error el flujo de `definirLocalizacion()`. Se creó `documents/analisis/configurarRecordatorio.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `configurarRecordatorio()` se implementará como operación autorreflexiva sobre `PLANIFICACION_ABIERTO` para perfiles administradores. El recordatorio se asociará a una tarea concreta, incluirá como mínimo tipo de aviso y antelación, y quedará en estado `Creado` tras guardar. Se evitarán duplicados y se conservará la configuración anterior si se cancela o falla el registro. El flujo de localización incluido por error en el PUML de SdR se ignorará durante el desarrollo: los recordatorios no dependerán de localización, mapas, rutas ni proximidad geográfica. Queda pendiente corregir ese PUML y concretar los tipos de aviso admitidos.

---

## [2026-06-01 19:51] Análisis de asignarTareaAUsuario()

**Prompt:** El usuario inició una sesión con `recopilacion` y pidió analizar `asignarTareaAUsuario()`, atendiendo a quién asigna la tarea y qué ocurre ante tarea inexistente, usuario inexistente, usuario ajeno al grupo, falta de permisos o fallo al guardar.

**Resultado:** Se revisaron el detalle, PUML y prototipo de `asignarTareaAUsuario()`, el diagrama de planificación y detalles, los diagramas de contexto, su relación con `editarTarea()`, el modelo de dominio y las minutas sobre tareas individuales y compartidas. Se creó `documents/analisis/asignarTareaAUsuario.md`, se añadió al índice y se actualizaron los pendientes de diseño e implementación.

**Decision:** `asignarTareaAUsuario()` se implementará como operación autorreflexiva sobre `PLANIFICACION_ABIERTO` para perfiles administradores. Solo permitirá asignar una tarea a usuarios existentes que pertenezcan al grupo responsable, evitará duplicados y conservará las asignaciones anteriores si se cancela o falla el registro. Si cambia una asignación con horario, se reevaluarán los conflictos de los usuarios afectados sin bloquear una asignación válida. Queda pendiente concretar cómo representar tareas compartidas o disponibles para cualquiera del grupo.

---

## [2026-06-01 20:12] Revisión de coherencia previa al diseño

**Prompt:** El usuario pidió revisar todo el análisis realizado, comprobar que los casos de uso están conectados y valorar los criterios de integración antes de comenzar el diseño, corrigiendo los problemas que pudieran entorpecer la implementación.

**Resultado:** Se auditaron los 24 análisis, `QUE_HACE.md`, los criterios transversales y los artefactos de SdR sobre actores, estados, subtareas, asignaciones, recordatorios y conflictos. Se creó `documents/revision-pre-diseno.md`, se reforzó `documents/criterios-integracion.md` y se alinearon los análisis afectados por decisiones ya cerradas.

**Decision:** El diseño puede comenzar sobre un primer incremento acotado: consulta de grupos propios para cualquier miembro, identidad global y rol operativo en `MiembroGrupo`, tareas guardadas como `Programada` con inicio automático por horario, subtareas separadas de relaciones de precedencia, asignaciones múltiples o `CUALQUIERA_DEL_GRUPO`, conflictos idempotentes no bloqueantes, planificación global filtrable, localización textual y recordatorios internos. Mapas, rutas, horarios flexibles, repeticiones, canales externos y pantallas nuevas no justificadas por casos de uso quedan fuera del primer diseño.

---

## [2026-06-03 19:00] Organización visual del modelo del dominio

**Prompt:** El usuario pidió que, en partes como el modelo del dominio, se incluyeran también las imágenes para poder verlo directamente y que los artefactos quedaran en carpetas más limpias, separando MDD, diagrama de objetos y diagramas de estados.

**Resultado:** Se reorganizó `documents/RUP/00-casos-uso/00-modelo-del-dominio/` en `mdd/`, `diagrama-objetos/` y `diagrama-estados/`. Se añadieron los SVG correspondientes junto a sus PUML y se actualizaron los README para mostrar las vistas principales sin tener que abrir cada fuente manualmente.

**Decision:** El modelo del dominio queda como punto de entrada visual y navegable para el trabajo posterior de diseño, manteniendo cada tipo de diagrama en su propia carpeta para evitar mezcla de artefactos.

---

## [2026-06-04 22:08] Inicio de diseño conceptual RUP

**Prompt:** El usuario indicó que, tras cerrar el análisis, la fase actual debe centrarse en completar la carpeta de diseño siguiendo la plantilla RUP existente, sin implementar código ni fijar todavía tecnologías concretas de frontend, backend o base de datos.

**Resultado:** Se completó `documents/RUP/02-diseño/` con arquitectura conceptual, modelo de dominio de diseño, configuración conceptual, decisiones globales, trazabilidad análisis-diseño y artefactos de diseño para los 24 casos de uso. No se modificó `src`.

**Decision:** El diseño queda expresado en términos conceptuales: interfaz, coordinador de caso de uso, servicios de aplicación, servicios de dominio, repositorio conceptual, persistencia conceptual y estado de aplicación/sesión. La selección tecnológica se aplaza a la fase de implementación.

---

## [2026-06-04 22:21] Revisión integral del diseño generado en bloque

**Prompt:** El usuario pidió revisar con calma toda la fase de diseño antes de preparar el commit, ya que los artefactos se habían completado de golpe en lugar de avanzar caso por caso. También pidió dejar constancia en el log de esta revisión adicional.

**Resultado:** Se revisó la estructura completa de `documents/RUP/02-diseño/`, la cobertura de los 24 casos de uso, los README de cada caso, los `secuencia.puml`, el índice de casos, la trazabilidad análisis-diseño, los enlaces internos y la ausencia de cambios en `src`. La revisión confirmó que el diseño mantiene una plantilla homogénea y que todos los casos quedan enlazados con análisis y PlantUML.

**Criterios revisados:** Cobertura por módulo, coherencia de nombres, separación entre análisis, diseño e implementación, uso de participantes conceptuales, enlaces internos, ausencia de tecnologías concretas y mantenimiento del enfoque RUP.

**Decision:** El diseño se mantiene como documentación conceptual lista para revisión y commit. Al haberse generado en bloque, queda registrado que antes de subirlo se hizo una pasada completa para comprobar consistencia, enlaces y trazabilidad. Como relleno útil para la siguiente fase, se deja marcado que el primer trabajo posterior debería ser elegir el primer caso de uso a implementar y transformar su diseño conceptual en componentes reales.

---

## [2026-06-04 22:30] Imágenes renderizadas para los PUML de diseño

**Prompt:** El usuario planteó que cada PUML de la fase de diseño debería ir acompañado de su imagen para poder revisarlo directamente desde la documentación.

**Resultado:** Se generaron SVG para `arquitectura.puml`, `clases-diseno.puml` y los 24 `secuencia.puml` de los casos de uso. También se actualizaron los README de diseño para mostrar las imágenes junto al código PlantUML y se corrigieron los bloques de código para que se rendericen correctamente en Markdown.

**Decision:** A partir de este punto, cada diagrama de diseño mantiene dos artefactos: el `.puml` como fuente editable y el `.svg` como vista rápida. Esto hace que la carpeta `documents/RUP/02-diseño/` sea más fácil de revisar sin abrir herramientas externas.

---

## [2026-06-08 16:07] Primera implementacion vertical de sesion y navegacion

**Prompt:** El usuario pidio iniciar la fase de implementacion de BrenoTask con una primera version tecnica funcional, siguiendo RUP iterativo e incremental, limitada al modulo de Gestion de sesion y navegacion. Se indico usar React en frontend, Python/FastAPI en backend, SQLite/SQL como base de datos y no implementar todavia grupos, tareas, planificacion ni recordatorios.

**Resultado:** Se reviso la estructura del repositorio y la documentacion de analisis y diseno de `iniciarSesion()`, `cerrarSesion()` y `completarGestion()`. Como no existia una aplicacion preparada, se creo `app/` con `frontend/`, `backend/` y `database/`. Se anadieron `schema.sql`, `seed.sql`, una API FastAPI con endpoints `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` y `GET /api/health`, una app React + Vite con login, dashboard, estado autenticado, confirmacion de cierre y accion de completar gestion, ademas de README en `app/`, `app/backend/` y `app/frontend/`.

**Decision:** La sesion se implemento de forma simple para esta primera entrega: usuarios en SQLite, contrasena de prueba guardada como hash SHA-256, token de sesion en memoria del backend y almacenamiento local del token en frontend. `iniciarSesion()` pasa a `SISTEMA_DISPONIBLE`, `cerrarSesion()` vuelve a `SESION_CERRADA` y `completarGestion()` estabiliza la navegacion en el dashboard sin abrir modulos secundarios. Se verifico la base de datos, la compilacion del backend, `npm run build`, errores de login y el flujo completo en navegador. Queda pendiente abordar en la siguiente iteracion la gestion de grupos y miembros.

---

## [2026-06-08 16:25] Criterio permanente de dashboards y SVG

**Prompt:** El usuario pidio mantener los dashboards y el seguimiento añadiendo el SVG de los PUML en cada cosa que se haga, para que el avance quede claro visualmente.

**Resultado:** Se actualizo `documents/RUP/99-seguimiento/README.md` como dashboard real de avance por modulo, se enlazo el SVG visible del diagrama de seguimiento y se registro una regla explicita: cada `.puml` nuevo o modificado debe tener su `.svg` equivalente en la misma carpeta y mostrado desde el README correspondiente. Tambien se actualizo `documents/RUP/03-desarrollo/README.md` para reflejar el primer vertical implementado y el README principal para enlazar al dashboard visual.

**Decision:** A partir de este punto, todo nuevo incremento debe actualizar simultaneamente codigo, seguimiento RUP, log de conversacion y artefactos visuales cuando haya diagramas. Los PUML quedan como fuente editable y los SVG como vista de revision rapida.

---

## [2026-06-08 16:28] Cierre de seguimiento visual

**Prompt:** El usuario pidio cierre y commit tras fijar el criterio de mantener dashboards, seguimiento y SVG de cada PUML.

**Resultado:** Se verifico el estado del repositorio, se confirmo que el dashboard de seguimiento ya contiene el avance por modulo, que `03-desarrollo` refleja el primer vertical implementado y que el diagrama `documents/RUP/99-seguimiento/diagrama-contexto-admin.puml` tiene su SVG equivalente enlazado desde el README. El archivo `diagrama-contexto-admin.puml` suelto en la raiz queda fuera del cierre por no pertenecer a este cambio.

**Decision:** El cierre se limita a documentacion de seguimiento y trazabilidad visual. El siguiente incremento debera mantener esta misma regla antes de cerrar sesion: actualizar dashboard, log y SVG cuando se toque PUML.

---

## [2026-06-08 16:36] Politica de commits y push

**Prompt:** El usuario aclaro que no quiere repetir durante el proyecto que los commits deben subirse correctamente a GitHub y documentarse con su distintivo correspondiente, como `add`, `feat` o similares.

**Resultado:** Se actualizo `documents/protocolo-sesiones-ia.md` para fijar que una peticion de `commit` implica revisar estado, crear un commit con prefijo convencional y hacer `git push` a GitHub. Tambien se documentaron los prefijos esperados: `feat:`, `add:`, `fix:`, `docs:`, `refactor:`, `test:` y `chore:`.

**Decision:** A partir de este punto, salvo que el usuario pida expresamente un commit solo local, `commit` significa commit y push a remoto. Los mensajes deben contar bien el cambio y usar prefijo convencional.

---

## [2026-06-08 16:51] Implementacion de abrirGrupos()

**Prompt:** El usuario pidio continuar el desarrollo tras cerrar gestion de sesion, siguiendo con el modulo recomendado de Gestion de grupos y usuarios.

**Resultado:** Se revisaron los artefactos de analisis y diseño de `abrirGrupos()`. Se ampliaron `schema.sql` y `seed.sql` con `grupos` y `miembros_grupo`, se añadieron modelo, schema, servicio y ruta backend para `GET /api/groups`, y el frontend carga y muestra la seccion `Mis grupos` para el usuario autenticado con filtro por nombre. Se actualizaron los README de `app/`, backend, frontend, `03-desarrollo` y el dashboard de `99-seguimiento`.

**Decision:** Esta iteracion implementa solo la consulta autorizada de grupos propios. No se implementan todavia crear, editar, eliminar grupos, invitaciones ni gestion de miembros; quedan como siguientes incrementos del modulo.

---

## [2026-06-09 17:23] Implementacion de crearGrupo()

**Prompt:** El usuario pidio avanzar en la fase de implementacion RUP con el siguiente incremento conveniente del modulo de Gestion de grupos y usuarios, manteniendo el mismo criterio iterativo, incremental y trazable usado en los verticales anteriores.

**Resultado:** Se eligio `crearGrupo()` como siguiente paso natural tras `abrirGrupos()`. Se implemento `POST /api/groups` en FastAPI, con validacion de sesion, rol `Administrador`, nombre obligatorio y duplicidad relevante por usuario. La creacion registra el grupo y crea automaticamente la membresia inicial del usuario creador como `Administrador`. En React se anadio el formulario de creacion en `Mis grupos`, la llamada `createGroup`, el estado `GRUPO_ABIERTO` y la actualizacion de la lista sin recargar la app.

**Ajustes tecnicos:** Durante la verificacion se detecto que las conexiones SQLite no se cerraban al salir del contexto, por lo que `database.py` paso a exponer `get_connection()` como context manager con cierre explicito. Tambien se corrigio la fusion de cabeceras en los helpers `auth.js` y `groups.js` para no perder `Content-Type` al enviar cabeceras adicionales.

**Verificacion:** Se ejecuto compileall del backend, smoke de backend con SQLite temporal para crear, listar, duplicar y validar nombre vacio, `POST /api/groups` sin sesion con respuesta `401`, `npm run build` del frontend, creacion desde UI en navegador integrado y revision visual en desktop y viewport movil. No se crearon ni modificaron PUML en esta iteracion, por lo que no hubo SVG nuevo que regenerar.

**Decision:** El modulo de grupos queda en progreso con `abrirGrupos()` y `crearGrupo()` implementados. No se implementan aun editar/eliminar grupos, invitaciones ni gestion de miembros. El siguiente incremento recomendable es `editarGrupo()` o `eliminarGrupo()` si se quiere cerrar el CRUD basico, o `invitarUsuario()` si se prefiere avanzar hacia colaboracion real.

---

## [2026-06-09 17:43] Implementacion de editarGrupo()

**Prompt:** El usuario pidio continuar la implementacion RUP del modulo de Gestion de grupos y usuarios con el siguiente incremento conveniente, avanzando sobre la gestion basica de grupos ya iniciada.

**Resultado:** Se eligio `editarGrupo()` como siguiente vertical tras `abrirGrupos()` y `crearGrupo()`. Se implemento `PUT /api/groups/{group_id}` en FastAPI, con validacion de sesion, existencia o disponibilidad del grupo, permisos de gestion por membresia, nombre obligatorio y duplicidad relevante por usuario. En React se anadio edicion inline en cada tarjeta de grupo, con controles para editar, cancelar y guardar, actualizacion del listado sin recargar y mantenimiento del estado `GRUPO_ABIERTO`.

**Ajustes tecnicos:** Se reutilizaron las validaciones de nombre y duplicidad entre crear y editar grupo. El context manager de SQLite se reforzo con `rollback()` explicito ante excepciones para preservar los datos previos si la edicion falla.

**Verificacion:** Se ejecuto compileall del backend, smoke de backend con SQLite temporal para edicion como `Administrador` y `Miembro Administrador`, duplicado, nombre vacio, grupo inexistente y sesion ausente, `npm run build` del frontend, guardado desde UI en navegador integrado y revision responsive en desktop y viewport movil. No se crearon ni modificaron PUML en esta iteracion, por lo que no hubo SVG nuevo que regenerar.

**Decision:** El modulo de grupos queda en progreso con `abrirGrupos()`, `crearGrupo()` y `editarGrupo()` implementados. La edicion cubre solo nombre y descripcion; quedan fuera eliminar grupos, invitaciones y gestion de miembros. El siguiente incremento recomendable es `eliminarGrupo()` para cerrar el CRUD basico de grupos antes de pasar a colaboracion.

---

## [2026-06-09 17:56] Implementacion de eliminarGrupo()

**Prompt:** El usuario pidio publicar en GitHub la edicion de grupos ya implementada y avanzar con la eliminacion confirmada de grupos, respetando que solo los grupos administrados muestren la accion de borrar, que el usuario pueda cancelar antes de eliminar y que al confirmar el grupo desaparezca del listado.

**Resultado:** Se hizo commit y push de `editarGrupo()` con el mensaje `feat: editar grupos propios del usuario`. Despues se implemento `eliminarGrupo()` como cierre del CRUD basico de grupos. Se anadio `DELETE /api/groups/{group_id}` en FastAPI, con validacion de sesion, disponibilidad del grupo y rol `Administrador` dentro del grupo. En React se anadio boton `Eliminar` solo para grupos administrados, confirmacion inline, cancelacion y retirada de la tarjeta tras borrar correctamente.

**Ajustes tecnicos:** La eliminacion limpia primero las membresias directas en `miembros_grupo` y despues elimina el registro en `grupos`. Las comprobaciones sobre tareas e invitaciones quedan aplazadas porque esas tablas y casos de uso todavia no existen en la base tecnica.

**Verificacion:** Se ejecuto compileall del backend, smoke de backend con SQLite temporal para borrado valido, usuario sin permisos, grupo inexistente y sesion ausente, `npm run build` del frontend, borrado desde UI en navegador integrado con grupo temporal, cancelacion desde UI y revision visual en desktop y viewport movil. No se crearon ni modificaron PUML en esta iteracion, por lo que no hubo SVG nuevo que regenerar.

**Decision:** El modulo de grupos queda en progreso con CRUD basico implementado: abrir, crear, editar y eliminar grupos. Quedan pendientes invitaciones y gestion de miembros; el siguiente incremento recomendable es `invitarUsuario()` para empezar la colaboracion real dentro de grupos.

---

## [2026-06-09 18:12] Registro de invitaciones pendientes

**Prompt:** El usuario pidio continuar despues de publicar la eliminacion de grupos, avanzando hacia la colaboracion entre usuarios: desde una tarjeta de grupo gestionable debe poder abrirse un formulario para introducir email, rol propuesto y fecha limite, registrar una invitacion pendiente, evitar duplicados y no convertir todavia al invitado en miembro.

**Resultado:** Se implemento `invitarUsuario()` como registro de invitaciones pendientes. La base de datos incorpora una tabla `invitaciones` para guardar grupo, email invitado, rol propuesto, fecha limite, estado e invitador. El backend expone `POST /api/groups/{group_id}/invitations` y valida sesion, permisos dentro del grupo, formato del email, fecha limite, usuario ya miembro e invitacion pendiente duplicada. En el frontend aparece un boton `Invitar` en los grupos donde el usuario puede gestionar miembros, con formulario inline para email, rol y fecha limite, opcion de cancelar y mensaje de resultado. Se verifico con compilacion del backend, build del frontend, pruebas de API y revision visual en navegador.

**Decision:** La colaboracion dentro de grupos empieza guardando invitaciones en estado `Pendiente`, pero una invitacion todavia no convierte al destinatario en miembro. Esa conversion queda reservada para una iteracion posterior donde se puedan abrir, aceptar o rechazar invitaciones. No se tocaron PUML en esta iteracion, asi que no hubo SVG nuevo que regenerar.

---

## [2026-06-09 23:03] Consulta de invitaciones del usuario

**Prompt:** Se continuo con el siguiente paso natural tras registrar invitaciones: permitir que una persona autenticada abra una seccion de `Mis invitaciones`, vea las invitaciones pendientes asociadas a ella o a grupos que puede gestionar, y pueda cambiar el filtro para revisar otros estados sin aceptar ni rechazar todavia ninguna invitacion.

**Resultado:** Se implemento `abrirInvitaciones()` como consulta de invitaciones. El backend expone `GET /api/groups/invitations`, valida la sesion, acepta un filtro opcional de estado y devuelve invitaciones recibidas por el email del usuario o visibles por su rol de gestion en el grupo. El frontend carga esas invitaciones al iniciar sesion, las refresca despues de enviar una nueva invitacion y muestra la seccion `Mis invitaciones` con filtro por estado. Se actualizaron los README de app, backend, frontend, desarrollo, pruebas y seguimiento. La verificacion incluyo compilacion del backend con el entorno virtual, smoke de rutas y servicios con SQLite temporal, build del frontend, prueba contra el backend local vivo, revision visual en navegador integrado y comprobacion movil sin desbordamiento horizontal.

**Decision:** La consulta queda limitada a abrir y filtrar invitaciones, dejando aceptar, rechazar, cancelar o caducar automaticamente para incrementos posteriores. La vista prioriza `Pendiente` porque es el estado que normalmente requiere accion, pero mantiene los demas estados disponibles para historial o seguimiento. No se tocaron PUML en esta iteracion, asi que no hubo SVG nuevo que regenerar.

---

## [2026-06-09 23:41] Decision sobre invitaciones recibidas

**Prompt:** Se pidio cerrar el incremento anterior con commit y continuar con el siguiente paso funcional: permitir que el destinatario de una invitacion pendiente pueda decidir si la acepta o la rechaza desde `Mis invitaciones`, haciendo que aceptar lo incorpore al grupo con el rol propuesto y que rechazar solo deje registrada su decision.

**Resultado:** Se hizo commit de `abrirInvitaciones()` con el mensaje `feat: consultar invitaciones del usuario`. Despues se implemento `editarInvitacion()`: el backend expone `PATCH /api/groups/invitations/{invitation_id}`, valida sesion, destinatario, estado pendiente, decision permitida y fecha limite; si la decision es `Aceptada`, crea la pertenencia en `miembros_grupo`, y si es `Rechazada`, solo actualiza la invitacion. En React se añadieron botones `Aceptar` y `Rechazar` en invitaciones recibidas y pendientes, con mensaje de resultado y refresco de grupos tras aceptar. Se actualizaron los README de app, backend, frontend, desarrollo, pruebas y seguimiento. La verificacion incluyo compilacion del backend, build del frontend, smoke con SQLite temporal y prueba visual en navegador integrado con datos temporales limpiados al terminar.

**Decision:** Solo el destinatario puede aceptar o rechazar una invitacion; los gestores pueden verla, pero no decidir por otra persona. Las invitaciones finales no se reabren, y una invitacion vencida se marca como `Caducada` cuando alguien intenta gestionarla. No se tocaron PUML en esta iteracion, asi que no hubo SVG nuevo que regenerar.

---

## [2026-06-09 23:56] Cambio de rol de miembros del grupo

**Prompt:** Se pidio continuar con el siguiente caso de uso respetando la pauta de analisis y diseño. A partir de `editarMiembro()`, se implemento una forma de abrir los miembros de un grupo gestionable, revisar sus roles y cambiar el rol de un miembro sin modificar el rol global del usuario ni dejar el grupo sin alguien que pueda administrarlo.

**Resultado:** Se implemento `editarMiembro()`. El backend expone `GET /api/groups/{group_id}/members` para cargar miembros y `PATCH /api/groups/{group_id}/members/{member_id}` para cambiar su rol. La logica valida sesion, pertenencia al grupo, permisos de gestion, rol valido, existencia del miembro y que siga habiendo al menos un miembro con rol `Administrador` o `Miembro Administrador`. En React se añadio el boton `Miembros` en grupos gestionables, un panel inline con cada miembro, selector de rol y guardado por fila. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento. La verificacion incluyo compileall del backend, build del frontend, smoke con SQLite temporal, prueba contra API viva local y revision visual del panel en navegador integrado.

**Decision:** El rol editable pertenece a `MiembroGrupo`, no a `Usuario`, porque el diseño indica que los permisos dependen del grupo concreto. Se permite que `Administrador` y `Miembro Administrador` gestionen roles, pero se bloquea degradar al ultimo gestor para no dejar el grupo sin administracion. No se tocaron PUML en esta iteracion, asi que no hubo SVG nuevo que regenerar.

---

## [2026-06-10 15:44] Correccion visual del panel de miembros

**Prompt:** Se reviso el aspecto del panel `Miembros` tras abrirlo en una tarjeta de grupo y se detecto que la fila de miembros invadia la columna vecina, deformaba las tarjetas cercanas y hacia que las etiquetas de rol y numero de miembros se estirasen demasiado.

**Resultado:** Se ajusto la maquetacion de las tarjetas de grupo y del panel de miembros. La grid de grupos ya no estira todas las tarjetas a la altura de la tarjeta mas alta, el panel de miembros queda contenido dentro de su tarjeta, las filas de miembros se compactan y las etiquetas mantienen una altura normal. Tambien se corrigio el guardado desde UI para leer el rol seleccionado de la fila al pulsar `Guardar`. Se valido en navegador integrado con datos temporales: desktop, movil, panel abierto, tarjeta vecina, chips, guardado de rol, seccion de invitaciones y limpieza posterior de datos temporales.

**Decision:** El panel de miembros se mantiene inline dentro de cada tarjeta para conservar el flujo actual del dashboard, pero su layout queda limitado por la propia tarjeta. A partir de esta revision, los cambios visuales se validan midiendo overflow, solapamientos y tamaños en desktop y movil antes de darlos por terminados.

---

## [2026-06-10 17:08] Baja confirmada de miembros de un grupo

**Prompt:** Se pidio continuar con el siguiente avance conveniente del desarrollo. Tras tener implementado el panel para abrir miembros y cambiar roles, se abordo la retirada de un miembro de un grupo: el usuario con permisos debe poder pulsar `Eliminar`, confirmar la decision en la propia fila y actualizar la composicion del grupo sin borrar la cuenta del usuario.

**Resultado:** Se implemento `eliminarMiembro()`. El backend expone `DELETE /api/groups/{group_id}/members/{member_id}`, valida sesion, pertenencia al grupo, permisos de gestion, existencia del miembro y que no se elimine el ultimo `Administrador` o `Miembro Administrador`. En React se añadio la llamada `deleteGroupMember`, un boton `Eliminar` por miembro, confirmacion inline, estado de carga durante la baja y actualizacion de la lista de miembros junto con el contador del grupo. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** La operacion elimina solo la relacion `MiembroGrupo`; la entidad `Usuario` se conserva porque puede pertenecer a otros grupos o volver a ser invitada mas adelante. La confirmacion queda dentro de la fila para reducir ambiguedad sobre que persona se va a retirar. La gestion de tareas asociadas no se implementa en este incremento porque el subsistema de tareas todavia no existe en codigo.

---

## [2026-06-10 17:30] Cancelacion de invitaciones pendientes

**Prompt:** Tras cerrar la eliminacion de miembros, se pidio continuar con el siguiente avance conveniente. Como las invitaciones ya podian crearse, listarse, aceptarse y rechazarse, se completo el flujo permitiendo que un usuario con permisos de gestion sobre el grupo cancele una invitacion pendiente antes de que el destinatario la acepte o rechace.

**Resultado:** Se amplio `editarInvitacion()` para admitir el estado `Cancelada` con permisos distintos a aceptar o rechazar. El destinatario sigue siendo el unico que puede aceptar o rechazar; en cambio, `Administrador` y `Miembro Administrador` del grupo pueden cancelar invitaciones pendientes gestionables. En React se añadio el boton `Cancelar invitacion`, una confirmacion inline y la actualizacion del estado en `Mis invitaciones`. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** La cancelacion se mantiene dentro de `editarInvitacion()` porque tecnicamente cambia el estado de una invitacion existente y no crea una entidad nueva. Cancelar no elimina la invitacion ni al usuario invitado: conserva el registro como historial funcional y evita crear una membresia.

---

## [2026-06-10 17:45] Consulta inicial de tareas

**Prompt:** Despues de subir a GitHub los ultimos commits y cerrar los flujos principales de grupos, invitaciones y miembros, se inicio el modulo de tareas por su caso base: permitir que el usuario autenticado abra una lista de tareas visibles para sus grupos, consulte su titulo, descripcion, estado y grupo, y pueda filtrar la lista sin crear ni modificar tareas todavia.

**Resultado:** Se implemento `abrirTareas()`. La base SQLite incorpora la tabla `tareas` y datos iniciales; el backend expone `GET /api/tasks`, que devuelve solo tareas de grupos donde el usuario tiene membresia; y React muestra la nueva seccion `Mis tareas` con filtros por texto, grupo y estado. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** El primer incremento de tareas queda limitado a consulta y filtrado porque crear, editar, eliminar y marcar completada son casos de uso propios. La visibilidad se basa en `MiembroGrupo`, no en el rol global del usuario, para mantener coherencia con el diseño aplicado en grupos.

---

## [2026-06-10 18:02] Creacion de tareas programadas

**Prompt:** Se continuo con el siguiente avance conveniente del modulo de tareas y se decidio trabajar `crearTarea()`: añadir un formulario en `Mis tareas` para que un usuario con permisos de gestion seleccione un grupo, introduzca titulo, descripcion opcional, fecha, hora de inicio y hora de fin, y registre una tarea programada visible en la lista.

**Resultado:** Se implemento `crearTarea()`. La tabla `tareas` se amplio con fecha y horario, se añadió una migracion ligera para bases SQLite existentes y el backend expone `POST /api/tasks` con validacion de sesion, grupo accesible, permisos de gestion, titulo obligatorio, fecha valida y horario coherente. En React se incorporo el formulario de creacion dentro de `Mis tareas`, se conecto `createTask` y la tarea nueva se añade a la lista sin recargar. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** Las tareas creadas quedan en estado `Programada` porque el analisis exige horario valido al guardar. Los conflictos horarios se dejan para un incremento posterior, cuando existan asignaciones de usuarios y notificaciones; en este paso se valida solo la coherencia del intervalo de la tarea.

---

## [2026-06-10 18:16] Edicion basica de tareas programadas

**Prompt:** Se continuo con el siguiente avance conveniente del modulo de tareas y se decidio trabajar `editarTarea()`: permitir que una persona con permisos de gestion sobre el grupo pueda abrir una tarea gestionable desde `Mis tareas`, modificar titulo, descripcion, fecha, hora de inicio y hora de fin, cancelar la edicion o guardar los cambios sin salir del panel.

**Resultado:** Se implemento `editarTarea()`. El backend expone `PATCH /api/tasks/{task_id}` y reutiliza las validaciones de titulo, fecha y horario de `crearTarea()`, comprobando ademas que la tarea sea visible para el usuario, que su rol en el grupo permita gestion y que la tarea no este `Finalizada` ni `Cancelada`. En React se anadio la llamada `updateTask`, un boton `Editar` solo para tareas gestionables abiertas, un formulario inline con los datos actuales y actualizacion de la lista tras guardar. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** La edicion queda limitada a los datos base ya implementados de la tarea. No se permite mover una tarea de grupo ni modificar asignaciones, relaciones, conflictos o recordatorios porque esos comportamientos pertenecen a casos de uso posteriores. Las tareas `Finalizada` y `Cancelada` se tratan como registros cerrados hasta que exista una regla especifica para reabrirlas o corregirlas.

---

## [2026-06-10 18:29] Eliminacion confirmada de tareas

**Prompt:** Tras publicar la edicion basica de tareas, se continuo con el siguiente avance conveniente del modulo y se decidio trabajar `eliminarTarea()`: permitir que una persona con permisos de gestion sobre el grupo pueda pulsar `Eliminar` en una tarea gestionable, revisar una confirmacion inline, cancelar si se equivoca o confirmar para retirarla del listado.

**Resultado:** Se implemento `eliminarTarea()`. El backend expone `DELETE /api/tasks/{task_id}` y comprueba sesion activa, visibilidad de la tarea y permisos de gestion sobre el grupo antes de borrar la fila. En React se anadio la llamada `deleteTask`, el boton `Eliminar`, una confirmacion inline con `Cancelar` y `Confirmar`, el estado de eliminacion y la retirada de la tarea de `Mis tareas` tras una respuesta correcta. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** El borrado vuelve al estado `TAREAS_ABIERTO` y se limita a la entidad `Tarea`. No se implementa todavia limpieza de subtareas, relaciones o conflictos porque esas estructuras no existen en codigo; cuando se incorporen, `eliminarTarea()` tendra que ampliar su regla de integridad.

---

## [2026-06-11 16:32] Finalizacion basica de tareas

**Prompt:** Se continuo el modulo de tareas con un alcance mas compacto para avanzar rapido y se decidio trabajar `marcarCompletada()`: permitir que una persona autenticada marque como completada una tarea visible desde `Mis tareas`, registrando la fecha de finalizacion y dejando la tarjeta en estado cerrado.

**Resultado:** Se implemento `marcarCompletada()`. La base de datos incorpora `fecha_finalizacion` con migracion ligera, el backend expone `PATCH /api/tasks/{task_id}/complete` y valida que la tarea exista para el usuario, que no este ya `Finalizada` y que no este `Cancelada`. En React se anadio `completeTask`, el boton `Completar`, el estado de guardado, el mensaje de exito y la visualizacion de la fecha de finalizacion en la tarjeta. Se actualizaron solo los README necesarios y el seguimiento RUP.

**Decision:** La primera version permite completar cualquier tarea visible porque aun no existen asignaciones de tareas a usuarios. Cuando se implemente `asignarTareaAUsuario()`, la regla de finalizacion debera comprobar si la tarea esta asignada al usuario o si aplica a todo el grupo.

---

## [2026-06-11 16:53] Asignacion basica de responsable

**Prompt:** Se continuo con planificacion basica de tareas para avanzar mas rapido y se decidio trabajar `asignarTareaAUsuario()`: permitir que, al editar una tarea gestionable, se seleccione como responsable a un miembro del mismo grupo o se deje la tarea sin asignar.

**Resultado:** Se anadio `asignado_usuario_id` a `tareas`, se amplio `PATCH /api/tasks/{task_id}` para guardar el responsable y se valida que el usuario asignado pertenezca al grupo de la tarea. En React, al abrir la edicion de una tarea se cargan los miembros del grupo si hace falta y aparece el selector `Responsable`.

**Decision:** La asignacion queda integrada dentro de la edicion inline de tarea para ahorrar pantalla y tiempo. No se crea todavia una vista separada de planificacion.

---

## [2026-06-11 16:53] Localizacion textual de tarea

**Prompt:** Dentro del mismo bloque de planificacion basica se decidio trabajar `definirLocalizacion()`: permitir guardar una ubicacion textual opcional en una tarea gestionable y mostrarla en su tarjeta.

**Resultado:** Se anadio `localizacion` a `tareas`, se amplio la edicion de tarea para guardar el texto normalizado y se incorporo el campo `Localizacion` al formulario inline. La tarjeta muestra la localizacion cuando existe.

**Decision:** La localizacion queda como texto simple. Mapas, coordenadas, rutas y calculos por proximidad quedan fuera de esta entrega.

---

## [2026-06-11 16:53] Recordatorio simple de tarea

**Prompt:** Para completar el bloque compacto de planificacion se decidio trabajar `configurarRecordatorio()`: permitir guardar un recordatorio basico en minutos antes de la tarea, sin enviar notificaciones reales todavia.

**Resultado:** Se anadio `recordatorio_minutos` a `tareas`, se amplio `PATCH /api/tasks/{task_id}` para aceptar el valor y se valida que este entre 0 y 10080 minutos. En React se incorporo el campo `Recordatorio` y la tarjeta muestra los minutos configurados.

**Decision:** El recordatorio queda registrado como configuracion interna. El envio real de avisos se aplaza porque requiere un mecanismo de notificaciones que aun no existe en el proyecto.

---

## [2026-06-11 21:58] Horario validado en tareas

**Prompt:** Tras publicar la planificacion basica, se continuo con otro avance compacto dentro de tareas y planificacion: reforzar `establecerHorario()` para que fecha, hora de inicio y hora de fin sigan siendo el punto comun al crear o editar tareas, preparando el resultado para informar tambien de posibles solapamientos.

**Resultado:** Se mantuvieron las validaciones existentes de fecha y rango horario en el backend y se conecto el resultado con la nueva informacion de conflictos. La respuesta de tareas conserva el horario guardado y puede incluir avisos calculados sin cambiar el flujo de creacion o edicion en React. Se actualizaron README de app, backend, frontend, desarrollo, pruebas y seguimiento.

**Decision:** No se crea una pantalla nueva de planificacion porque el caso ya queda cubierto desde `Mis tareas`. Esta decision reduce tiempo de implementacion y mantiene el comportamiento visible en el lugar donde el usuario ya crea y edita tareas.

---

## [2026-06-11 21:58] Aviso de conflictos horarios

**Prompt:** En el mismo bloque se decidio trabajar `validarConflicto()`: detectar cuando una tarea asignada a un responsable se solapa con otra tarea activa del mismo responsable en el mismo dia, mostrando el problema al usuario sin bloquear el guardado.

**Resultado:** El backend calcula `conflictos_horario` al listar, crear, editar o completar tareas. El frontend muestra una pildora de conflicto y un mensaje con la tarea solapada y su tramo horario. Se ejecuto un smoke con dos tareas temporales solapadas del usuario demo, se comprobo que el conflicto aparece al guardar y al listar, y se eliminaron los datos temporales.

**Decision:** El conflicto se trata como aviso no bloqueante. La resolucion guiada, notificaciones reales y relaciones entre tareas quedan pendientes para incrementos posteriores porque requieren mas reglas de negocio y no son imprescindibles para este avance.

---

## [2026-06-11 22:08] Dependencia simple entre tareas

**Prompt:** Se avanzo el caso `relacionarTareas()` con un alcance reducido y util para la entrega: permitir que, al editar una tarea, se indique que depende de otra tarea activa del mismo grupo, sin crear todavia una pantalla separada de busqueda ni cubrir subtareas.

**Resultado:** Se creo la tabla `relaciones_tareas`, una migracion ligera para bases SQLite existentes y el campo `predecesora_tarea_id` en la edicion de tareas. El backend guarda una unica predecesora por tarea, devuelve `predecesora_titulo`, limpia relaciones al borrar tareas y valida autorrelaciones, tareas de otro grupo y ciclos. En React se anadio el selector `Depende de` y la tarjeta muestra la dependencia cuando existe. Se actualizo la trazabilidad RUP y los README principales.

**Decision:** La primera version cubre solo dependencia simple porque es suficiente para demostrar `relacionarTareas()` sin abrir demasiada complejidad. Subtareas, relaciones sucesoras explicitas, multiples dependencias y resolucion visual avanzada quedan para un incremento posterior.

---

## [2026-06-11 22:22] Agenda filtrada de planificacion

**Prompt:** Se trabajo `abrirPlanificacion()` para cerrar el acceso a la planificacion sin crear una pantalla nueva: mostrar una agenda resumida dentro de `Mis tareas`, reutilizando los filtros existentes y destacando la informacion necesaria para revisar horarios, responsables, recordatorios, dependencias y conflictos.

**Resultado:** El frontend incorpora una banda de planificacion con contadores y las proximas tareas planificadas del filtro actual. La agenda muestra fecha, tramo horario, grupo y responsable cuando existe. Se actualizaron README de app, frontend, desarrollo, pruebas y seguimiento RUP.

**Decision:** La planificacion queda integrada en `Mis tareas` porque ahi ya se crean y editan los datos que la alimentan. Se evita una ruta separada para no duplicar flujos ni ampliar el alcance mas de lo necesario.

---

## [2026-06-11 22:29] Limpieza de plantillas RUP iniciales

**Prompt:** En fase de cierre se revisaron los casos ya implementados que todavia conservaban README de plantilla en desarrollo o pruebas, especialmente sesion y apertura de grupos, para que la documentacion no contradiga el estado real de la app.

**Resultado:** Se sustituyeron las plantillas de `iniciarSesion()`, `cerrarSesion()`, `completarGestion()` y `abrirGrupos()` por descripciones breves de implementacion, decisiones y smoke manual. La busqueda posterior ya no encontro textos de plantilla en los casos de uso de desarrollo y pruebas.

**Decision:** Esta limpieza no anade funcionalidad nueva. Mejora la coherencia de entrega y evita que alguien revise RUP y piense que esos casos siguen pendientes cuando ya estan implementados.

---

## [2026-06-11 22:29] Correccion de notas RUP desactualizadas

**Prompt:** Se revisaron documentos de desarrollo y pruebas que conservaban frases antiguas sobre tareas, conflictos, relaciones o navegador pendiente, para ajustar la documentacion al estado real de la aplicacion despues de los ultimos incrementos.

**Resultado:** Se actualizaron notas de `abrirTareas()`, `crearTarea()`, `editarTarea()`, `eliminarTarea()`, `marcarCompletada()`, `eliminarMiembro()` y pruebas relacionadas. La documentacion ya no afirma que no existan tareas, relaciones simples o comprobacion visual cuando esas partes ya estan cubiertas.

**Decision:** Se mantuvieron como pendientes solo elementos que siguen fuera del alcance actual: notificaciones reales, mapas/rutas, subtareas avanzadas, resolucion guiada de conflictos y automatizacion completa de pruebas.

---

## [2026-06-13 14:31] Enfoque de recordatorios y conflictos en agenda

**Prompt:** Para hacer la aplicacion mas fiel a `QUE_HACE.md`, se reforzo la parte de "menos olvidos y solapamientos" sin crear un modulo nuevo: permitir que la agenda de planificacion destaque tareas con recordatorio y tareas con conflicto horario.

**Resultado:** La agenda filtrada incorpora accesos rapidos `Todas`, `Recordatorios` y `Conflictos`. Las filas de planificacion muestran recordatorio, dependencia y estado de conflicto, de forma que el usuario puede revisar rapidamente lo que puede provocar olvidos o solapamientos. Se actualizaron README de frontend, desarrollo y pruebas del caso `abrirPlanificacion()`.

**Decision:** Se mantiene la solucion dentro de `Mis tareas` para no duplicar pantallas. Los avisos reales externos siguen fuera; esta mejora se centra en visibilidad operativa dentro de la app.

---

## [2026-06-13 14:42] Limpieza de asignaciones al retirar miembros

**Prompt:** Para reforzar la parte de "asignen y sigan tareas compartidas" de `QUE_HACE.md`, se trabajo el caso `eliminarMiembro()` para que, al retirar a una persona de un grupo, no queden tareas del grupo asignadas a alguien que ya no pertenece a el.

**Resultado:** El backend deja en `NULL` el responsable de las tareas del grupo asignadas al usuario retirado. El frontend recarga grupos y tareas despues de confirmar la baja, de modo que las tarjetas pasan a mostrar `Sin responsable` sin esperar a otra accion. Se actualizaron README de backend, frontend, desarrollo y pruebas del caso.

**Decision:** No se reasigna automaticamente a otro miembro porque podria introducir una responsabilidad falsa. La opcion mas clara para el usuario es liberar la tarea y permitir que un gestor la asigne de nuevo.

---

## [2026-06-14 16:28] Reordenacion final del frontend

**Prompt:** Se trabajo una pasada final de interfaz para que BreñoTask dejara de verse como una lista vertical de modulos y se comportara mas como una aplicacion real: dashboard inicial, navegacion clara y pantallas separadas para sesion, grupos, invitaciones, tareas y planificacion.

**Resultado:** El frontend ahora muestra un inicio con resumen operativo, acciones frecuentes y proximas tareas. Cada modulo se abre desde una navegacion lateral y solo muestra la informacion correspondiente. Se limpiaron textos tecnicos repetidos, mensajes antiguos en pantallas donde no correspondian y problemas de overflow horizontal en la agenda.

**Decision:** La reorganizacion se hizo sin cambiar endpoints ni duplicar logica de backend. La separacion entre pantallas es de interfaz, para mejorar uso y claridad sin ampliar innecesariamente la arquitectura.

---

## [2026-06-14 16:29] Solapes visibles y recordatorio en alta

**Prompt:** Se corrigio la experiencia de planificacion para que tareas de grupos distintos tambien avisen si coinciden en fecha y hora, y se completo el flujo de recordatorios para que puedan configurarse al crear una tarea, no solo al editarla.

**Resultado:** El frontend calcula solapes visibles entre tareas activas aunque esten sin responsable o pertenezcan a grupos distintos. Al crear una tarea con horario solapado muestra un aviso con opcion de cambiar horario o crear igualmente. El backend acepta `recordatorio_minutos` en `POST /api/tasks`, lo valida y lo guarda desde el alta. Se actualizaron README de backend, frontend y RUP de `crearTarea()`, `configurarRecordatorio()` y `abrirPlanificacion()`.

**Decision:** Los solapes no bloquean el guardado porque el usuario puede decidir mantenerlos. Los recordatorios siguen siendo configuracion interna de la app; no generan notificaciones reales externas.

---

## [2026-06-14 17:05] Revision RUP de analisis y diseno

**Prompt:** Se inicio una revision documental centrada en que el analisis y el diseno de casos de uso mantengan una estructura comparable a PySigHor, que los diagramas PlantUML tengan una imagen SVG visible y que no queden archivos vacios o textos internos innecesarios para la entrega.

**Resultado:** Se comprobaron los 24 casos de uso en analisis y los 24 en diseno, sin desajustes entre fases. Se generaron los SVG que faltaban para los PUML de actores, contexto y analisis, se añadieron las imagenes de colaboracion y secuencia en cada README de analisis, y se actualizaron indices RUP para enlazar PUML y SVG. Tambien se verifico que no hubiera archivos vacios, SVG de error ni PUML sin imagen asociada.

**Decision:** Se mantiene el analisis con estructura funcional mas diagramas MVC de vista, controlador, repositorio y entidad, mientras que el diseno conserva su plantilla de responsabilidades, decisiones, validaciones, trazabilidad y secuencia. Se eliminaron referencias internas que no aportaban a la entrega para que el material quede centrado en SdR/RUP.

---

## [2026-06-14 17:22] Galerias visibles en analisis y diseno

**Prompt:** Se pidio ajustar la documentacion porque, aunque los SVG existian, desde GitHub habia que entrar en demasiadas carpetas para verlos. El objetivo era que al abrir los README principales de analisis o diseno aparecieran directamente las imagenes correspondientes, como en la estructura de referencia de PySigHor.

**Resultado:** `documents/RUP/01-analisis/README.md` ahora muestra los diagramas generales de SdR y una galeria por caso de uso con colaboracion y secuencia de analisis. `documents/RUP/02-diseño/README.md` y `documents/RUP/02-diseño/casos-uso/README.md` muestran la arquitectura, el modelo de clases y las secuencias de diseno de los 24 casos sin obligar a navegar carpeta por carpeta.

**Decision:** Se duplica de forma intencionada la visualizacion de diagramas en indices y README de caso para favorecer la lectura en GitHub. Los archivos fuente `.puml` y los README detallados siguen siendo la fuente documental de cada caso; las galerias son una capa de acceso rapido para evaluacion.

---

## [2026-06-22 20:02] Revision de trazabilidad de diseno: iniciarSesion()

**Prompt:** El usuario pidio continuar la revision de diagramas caso a caso, corrigiendo los diagramas de diseno para que sean fieles al analisis y manteniendo las entradas correspondientes en el conversation log.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `iniciarSesion()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-sesion/iniciarSesion/secuencia.puml` para eliminar ramas de validacion, entidades concretas y referencias a `Usuario`/`Sesion` que no estaban justificadas por el analisis. Se regenero `secuencia.svg` desde el PUML actualizado.

**Decision:** El diseno conserva el mismo flujo del analisis: solicitud, coordinacion del caso, consulta o modificacion conceptual del dominio, resultado, respuesta y presentacion. Las responsabilidades de diseno se mantienen en nivel conceptual mediante interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-22 20:28] Revision de trazabilidad de diseno: cerrarSesion()

**Prompt:** Tras cerrar y subir el ajuste de `iniciarSesion()`, el usuario pidio continuar con la revision caso a caso de los diagramas de diseno frente a los de analisis.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `cerrarSesion()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-sesion/cerrarSesion/secuencia.puml` para retirar validaciones alternativas, referencias concretas a `Usuario`/`Sesion` y pasos no presentes en el analisis. Se regenero `secuencia.svg` desde el PUML corregido.

**Decision:** El diseno queda alineado con el flujo lineal del analisis y solo reparte responsabilidades conceptuales entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-22 20:29] Revision de trazabilidad de diseno: completarGestion()

**Prompt:** Se continuo con el bloque de gestion de sesion y navegacion, revisando `completarGestion()` con el mismo criterio aplicado a los casos anteriores.

**Resultado:** Se contrastaron los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `completarGestion()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-sesion/completarGestion/secuencia.puml` para eliminar ramas de error, validaciones no descritas y referencias concretas a usuario o estado no trazadas como pasos del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno mantiene el flujo funcional del analisis y lo expresa solo como reparto conceptual de responsabilidades. Con este ajuste queda revisado el bloque de gestion de sesion y navegacion sin modificar `src`.

---

## [2026-06-22 20:33] Revision de trazabilidad de diseno: abrirGrupos()

**Prompt:** Se continuo la revision incremental de trazabilidad entre analisis y diseno, manteniendo el avance acotado a un unico caso de uso para facilitar la revision y validacion de cada cambio documental.

**Resultado:** Se reviso un unico caso: `abrirGrupos()`. Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` con el diagrama de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/abrirGrupos/secuencia.puml` para retirar ramas de validacion, referencias concretas a `Usuario`, `Grupo` y `MiembroGrupo`, y pasos no trazados en el analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno de `abrirGrupos()` queda como reparto conceptual de responsabilidades manteniendo el flujo lineal del analisis. Se conserva la granularidad por caso de uso para que cada correccion pueda revisarse de forma independiente. No se modifico `src`.

---

## [2026-06-22 20:37] Revision de trazabilidad de diseno: crearGrupo()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `crearGrupo()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `crearGrupo()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/crearGrupo/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Usuario`, `Grupo` y `MiembroGrupo` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno mantiene la misma secuencia funcional del analisis y solo distribuye responsabilidades conceptuales entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-22 20:46] Revision de trazabilidad de diseno: editarGrupo()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `editarGrupo()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `editarGrupo()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarGrupo/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Grupo`, `MiembroGrupo` y `Usuario` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-22 20:50] Revision de trazabilidad de diseno: eliminarGrupo()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `eliminarGrupo()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `eliminarGrupo()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/eliminarGrupo/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Grupo`, `MiembroGrupo`, `Invitacion` y `Tarea` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-22 20:57] Revision de trazabilidad de diseno: invitarUsuario()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `invitarUsuario()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `invitarUsuario()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/invitarUsuario/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Grupo`, `Invitacion`, `Usuario` y `MiembroGrupo` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-22 21:07] Revision de trazabilidad de diseno: editarMiembro()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `editarMiembro()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `editarMiembro()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarMiembro/secuencia.puml` para retirar ramas de validacion y referencias concretas a `MiembroGrupo`, `Usuario` y `Grupo` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 16:48] Revision de trazabilidad de diseno: eliminarMiembro()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `eliminarMiembro()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `eliminarMiembro()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/eliminarMiembro/secuencia.puml` para retirar ramas de validacion y referencias concretas a `MiembroGrupo`, `Grupo`, `Usuario` y `Tarea` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:02] Revision de trazabilidad de diseno: abrirInvitaciones()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `abrirInvitaciones()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `abrirInvitaciones()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/abrirInvitaciones/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Invitacion`, `Usuario`, `Grupo` y `EstadoAplicacion` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:04] Revision de trazabilidad de diseno: editarInvitacion()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de grupos y usuarios, tomando `editarInvitacion()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `editarInvitacion()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarInvitacion/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Invitacion`, `Usuario`, `Grupo` y `MiembroGrupo` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:07] Revision de trazabilidad de diseno: abrirTareas()

**Prompt:** Se inicio la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `abrirTareas()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `abrirTareas()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/abrirTareas/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `Grupo`, `MiembroGrupo`, `Usuario` y `EstadoAplicacion` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:11] Revision de trazabilidad de diseno: crearTarea()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `crearTarea()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `crearTarea()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/crearTarea/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `Grupo`, `Horario`, `Localizacion`, `Recordatorio` y `ConflictoHorario` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:14] Revision de trazabilidad de diseno: editarTarea()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `editarTarea()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `editarTarea()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/editarTarea/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `Horario`, `Localizacion`, `Recordatorio`, `ConflictoHorario` y `RelacionTareas` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:18] Revision de trazabilidad de diseno: relacionarTareas()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `relacionarTareas()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `relacionarTareas()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/relacionarTareas/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `RelacionTareas` y `Grupo` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:23] Revision de trazabilidad de diseno: eliminarTarea()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `eliminarTarea()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `eliminarTarea()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/eliminarTarea/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `RelacionTareas`, `Recordatorio` y `ConflictoHorario` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:31] Revision de trazabilidad de diseno: marcarCompletada()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `marcarCompletada()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `marcarCompletada()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/marcarCompletada/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `Usuario` y `MiembroGrupo` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.

---

## [2026-06-23 17:36] Revision de trazabilidad de diseno: validarConflicto()

**Prompt:** Se continuo la revision incremental de los diagramas de diseno del modulo de gestion de tareas, tomando `validarConflicto()` como siguiente caso individual.

**Resultado:** Se compararon los diagramas de analisis `secuencia.puml` y `colaboracion.puml` de `validarConflicto()` con su secuencia de diseno. Se corrigio `documents/RUP/02-diseño/casos-uso/gestion-tareas/validarConflicto/secuencia.puml` para retirar ramas de validacion y referencias concretas a `Tarea`, `Horario`, `ConflictoHorario` y `Usuario` que no aparecen como colaboraciones del analisis. Se regenero `secuencia.svg`.

**Decision:** El diseno conserva el flujo funcional del analisis y lo expresa como reparto conceptual de responsabilidades entre interfaz, coordinador, servicios, estado de aplicacion y persistencia conceptual. No se modifico `src`.
