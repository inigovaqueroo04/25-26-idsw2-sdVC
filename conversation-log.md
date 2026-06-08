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
