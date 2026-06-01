# Revisión de coherencia previa al diseño

## Objetivo

Comprobar que los 24 casos de uso analizados forman un sistema coherente antes
de comenzar el diseño. La revisión toma `QUE_HACE.md` como límite operativo:
coordinar, asignar y seguir tareas compartidas con menos olvidos y
solapamientos.

## Resultado

El análisis cubre todos los casos de uso catalogados en SdR y permite iniciar
el diseño. No obstante, SdR contiene contradicciones y huecos que no deben
trasladarse sin criterio a las clases, servicios o pantallas.

## Ajustes necesarios

| Área | Problema detectado | Criterio para diseño |
| --- | --- | --- |
| Grupos | El diagrama general permite a `Miembro` abrir grupos, pero los contextos lo omiten. | Todo usuario autenticado podrá consultar sus grupos. Solo perfiles gestores podrán modificarlos. |
| Roles | Un usuario puede pertenecer a varios grupos; un rol global filtraría permisos entre ellos. | El rol operativo se modelará en `MiembroGrupo`. La identidad del usuario seguirá siendo global. |
| Identidad | Login e invitaciones no fijan un identificador común. | Se utilizará email normalizado y único. |
| Tareas | La creación exige horario, aunque el ciclo de vida parte de `Creada`. | `Creada` será un estado transitorio de edición. Una tarea guardada con horario válido quedará `Programada`. |
| Inicio de tarea | SdR no define un caso de uso para iniciar una tarea. | El paso `Programada -> En ejecución` se aplicará al alcanzar la hora de inicio. |
| Subtareas | `relacionarTareas()` mezcla precedencia y jerarquía recursiva. | La jerarquía `subtarea de` y las relaciones de precedencia se representarán por separado, aunque se gestionen desde el mismo flujo. |
| Asignaciones | SdR admite uno, varios o cualquier miembro del grupo. | Se modelarán asignaciones múltiples y un modo `CUALQUIERA_DEL_GRUPO`, sin crear un usuario ficticio. |
| Conflictos | SdR aclara que no bloquean la tarea, pero algunos diagramas sí lo hacen. | Se registrarán de forma idempotente por usuario y tareas afectadas. Reprogramar o reasignar reevaluará el conflicto. |
| Avisos | Recordatorios configurables y avisos de conflicto pueden confundirse. | Se tratarán como conceptos distintos: recordatorio programado frente a notificación generada por un evento. |
| Planificación | No se concreta si la agenda es global o por grupo. | La vista será global con filtro opcional por grupo. Las mutaciones usarán el grupo de la tarea seleccionada. |
| Localización | SdR menciona mapas y rutas, fuera del alcance actual. | Se usará un texto opcional asociado a la tarea, sin servicios geográficos. |

## Alcance del primer diseño

- Gestión de sesión.
- Consulta de grupos propios y gestión administrativa de grupos y miembros.
- Invitaciones por email con fecha límite.
- Tareas y subtareas recursivas.
- Horarios cerrados con fecha, inicio y fin.
- Asignaciones múltiples o abiertas a cualquier miembro del grupo.
- Detección y reevaluación de solapamientos para usuarios asignados.
- Localización como texto opcional.
- Recordatorios internos con una o varias antelaciones.

## Fuera del primer diseño

- Mapas, cálculo de rutas y optimización por proximidad geográfica.
- Horarios flexibles o repetitivos.
- Integraciones externas de calendario, correo, móvil o asistentes de voz.
- Flujos nuevos no descritos por casos de uso, como una pantalla específica de
  resolución de conflictos o aprobaciones avanzadas.

## Pendientes no bloqueantes

- Definir reglas de longitud y formato de nombres y descripciones.
- Corregir en SdR los enlaces rotos, el conflicto de merge de `abrirTareas()` y
  el PUML incorrecto de `configurarRecordatorio()`.
- Decidir si una futura ampliación expondrá cancelación de tareas,
  reprogramación guiada o cancelación administrativa de invitaciones.
