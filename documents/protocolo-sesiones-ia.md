# Protocolo de sesiones con IA

Este documento define cómo se usará la IA durante el proyecto para que el
`conversation-log.md` sea cronológico, honesto y útil para la evaluación.

## Palabras clave

### `recopilacion`

Marca el inicio de una sesión de trabajo.

Cuando el usuario escriba `recopilacion`, la IA debe:

1. Revisar el estado del repositorio.
2. Leer `QUE_HACE.md`, `README.md`, `2Think.md` y `conversation-log.md`.
3. Identificar el objetivo de la sesión y relacionarlo con el alcance definido.
4. Crear o preparar una entrada inicial en `conversation-log.md`.
5. Trabajar siempre respetando que `QUE_HACE.md` no se modifica.

### `cierre`

Marca el final de una sesión de trabajo.

Cuando el usuario escriba `cierre`, la IA debe:

1. Resumir lo realizado durante la sesión.
2. Completar `conversation-log.md` con:
   - Fecha y hora de la entrada.
   - Prompt o intención del usuario.
   - Resultado producido.
   - Decisión tomada y justificación.
3. Ejecutar las verificaciones razonables del proyecto.
4. Revisar `git status`.
5. Proponer o realizar el commit si el usuario lo confirma o si ya lo había pedido.

## Politica de commits y publicacion

Cuando el usuario pida `commit`, la IA debe entenderlo como cierre completo de
versionado:

1. Revisar `git status` y separar cambios propios de cambios ajenos.
2. Preparar un commit con mensaje descriptivo, en español y con prefijo
   convencional.
3. Subir el commit a GitHub con `git push` para que quede visible en remoto.
4. Informar del hash final y confirmar que `main` queda sincronizada con
   `origin/main`.

Los mensajes de commit deben escribirse en español. El prefijo convencional se
mantiene en ingles por compatibilidad con Conventional Commits, pero el resumen
despues de los dos puntos debe estar en español.

Prefijos esperados:

- `feat:` para funcionalidad nueva.
- `add:` para añadir artefactos, documentos o recursos nuevos sin cambiar una
  funcionalidad existente.
- `fix:` para correcciones.
- `docs:` para documentacion, seguimiento, dashboards o log.
- `refactor:` para reorganizacion interna sin cambio funcional.
- `test:` para pruebas.
- `chore:` para mantenimiento tecnico.

Si el usuario quiere solo un commit local, debe indicarlo de forma explicita.

## Criterios que hay que respetar

- El sistema entregado debe coincidir con `QUE_HACE.md`.
- Todo el proyecto debe mantenerse alineado con la metodología RUP: cada
  decisión de diseño o implementación debe poder justificarse desde los
  requisitos, casos de uso, diagramas o modelo de dominio analizados.
- El sistema debe arrancar.
- El README final debe explicar el sistema a alguien que no estuvo en la sesión.
- Los commits deben contar la historia del proceso.
- El log no debe reescribirse para embellecer la historia: se completa durante el trabajo.
- Cada entrada del log debe usar el formato `AAAA-MM-DD HH:MM`.

## Alcance operativo del sistema

El alcance mínimo defendible es que familias y grupos puedan coordinar, asignar
y seguir tareas compartidas, reduciendo olvidos y solapamientos.

Por tanto, las decisiones técnicas deben priorizar:

- Grupos y miembros.
- Tareas y subtareas.
- Asignación de tareas.
- Horarios con inicio y fin.
- Detección de solapamientos.
- Seguimiento del estado de las tareas.
