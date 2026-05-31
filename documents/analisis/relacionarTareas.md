# relacionarTareas()

## Objetivo

Permitir que un perfil con permisos vincule una tarea abierta con otra tarea.
El caso registra una relación lógica de precedencia para coordinar el orden en
que deben realizarse ambas tareas.

## Actor principal

`Administrador` o `Miembro Administrador`. El detalle de SdR menciona al
`Administrador`, mientras que el diagrama de gestión de tareas asigna
`relacionarTareas()` al `Miembro Administrador`, del que hereda el
administrador.

## Precondiciones

- El usuario ha iniciado sesión.
- El sistema está en `TAREA_ABIERTO`.
- Existe una tarea abierta desde la que iniciar la vinculación.
- El usuario tiene permisos de gestión sobre la tarea.

## Flujo principal

1. El usuario solicita relacionar la tarea abierta.
2. El sistema presenta un buscador de tareas vinculables.
3. El usuario busca otra tarea por identificador o título.
4. El usuario selecciona la tarea y el tipo de relación: `predecesora` o
   `sucesora`.
5. El sistema valida que la relación sea admisible.
6. El sistema registra la relación entre ambas tareas.
7. El sistema vuelve a mostrar la tarea abierta en `TAREA_ABIERTO`.

## Flujos alternativos

- Usuario no autenticado: el sistema bloquea la operación y solicita iniciar
  sesión.
- Usuario sin permisos: el sistema impide modificar las relaciones de la
  tarea.
- Tarea de origen o destino inexistente: el sistema informa del error y
  permite seleccionar otra tarea.
- Autorrelación: el sistema impide vincular una tarea consigo misma.
- Relación duplicada: el sistema evita registrar dos veces el mismo vínculo.
- Relación incompatible: el sistema rechaza dependencias que produzcan un
  ciclo incoherente entre tareas.
- Fallo al guardar: el sistema informa del error y conserva la selección para
  permitir reintentar.
- Cancelación: el sistema descarta la vinculación y mantiene `TAREA_ABIERTO`.

## Postcondiciones

La relación de precedencia queda registrada y la tarea de origen continúa
visible en `TAREA_ABIERTO`. La nueva vinculación queda disponible para
consultar o continuar editando la tarea.

## Elementos relacionados en SdR

- Caso detallado y prototipo de `relacionarTareas()`: presentan el buscador por
  identificador o título, la selección de relación `predecesora` o `sucesora`
  y las salidas por guardado o cancelación.
- Caso detallado `editarTarea()`: incluye `relacionarTareas()` entre las
  operaciones disponibles durante la edición.
- Diagramas de contexto de administrador y miembro administrador: mantienen
  `TAREA_ABIERTO` antes y después de relacionar tareas.
- Diagrama de gestión de tareas: asigna el caso a perfiles administradores y
  lo modela como extensión de `editarTarea()`.
- Modelo de dominio: diferencia la relación recursiva `subtarea de` de los
  vínculos lógicos representados mediante `RelacionTareas`.

No hay implementación directa en código; el análisis se obtiene de los
diagramas, el prototipo y la documentación del SdR.

## Observaciones

SdR no mantiene todavía una única interpretación del caso: el README de
contexto lo describe como creación de subtareas, pero el detalle solo permite
elegir `predecesora` o `sucesora` y el modelo separa subtareas de
`RelacionTareas`. Para la primera implementación se tratará como relación de
precedencia. Antes de incorporar jerarquías, bloqueos o apoyos habrá que
concretar si comparten este flujo o requieren operaciones diferenciadas.
