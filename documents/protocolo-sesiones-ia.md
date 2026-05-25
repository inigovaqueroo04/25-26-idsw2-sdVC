# Protocolo de sesiones con IA

Este documento define como se usara la IA durante el proyecto para que el
`conversation-log.md` sea cronologico, honesto y util para la evaluacion.

## Palabras clave

### `recopilacion`

Marca el inicio de una sesion de trabajo.

Cuando el usuario escriba `recopilacion`, la IA debe:

1. Revisar el estado del repositorio.
2. Leer `QUE_HACE.md`, `README.md`, `2Think.md` y `conversation-log.md`.
3. Identificar el objetivo de la sesion y relacionarlo con el alcance definido.
4. Crear o preparar una entrada inicial en `conversation-log.md`.
5. Trabajar siempre respetando que `QUE_HACE.md` no se modifica.

### `cierre`

Marca el final de una sesion de trabajo.

Cuando el usuario escriba `cierre`, la IA debe:

1. Resumir lo realizado durante la sesion.
2. Completar `conversation-log.md` con:
   - Fecha y hora de la entrada.
   - Prompt o intencion del usuario.
   - Resultado producido.
   - Decision tomada y justificacion.
3. Ejecutar las verificaciones razonables del proyecto.
4. Revisar `git status`.
5. Proponer o realizar el commit si el usuario lo confirma o si ya lo habia pedido.

## Criterios que hay que respetar

- El sistema entregado debe coincidir con `QUE_HACE.md`.
- El sistema debe arrancar.
- El README final debe explicar el sistema a alguien que no estuvo en la sesion.
- Los commits deben contar la historia del proceso.
- El log no debe reescribirse para embellecer la historia: se completa durante el trabajo.
- Cada entrada del log debe usar el formato `AAAA-MM-DD HH:MM`.

## Alcance operativo del sistema

El alcance minimo defendible es que familias y grupos puedan coordinar, asignar
y seguir tareas compartidas, reduciendo olvidos y solapamientos.

Por tanto, las decisiones tecnicas deben priorizar:

- Grupos y miembros.
- Tareas y subtareas.
- Asignacion de tareas.
- Horarios con inicio y fin.
- Deteccion de solapamientos.
- Seguimiento del estado de las tareas.
