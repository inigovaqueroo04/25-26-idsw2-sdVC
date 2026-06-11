# establecerHorario > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Crear tarea con fecha y horario valido | Tarea `Programada` creada correctamente | Verificado en incrementos anteriores |
| Editar tarea con horario valido | Cambios guardados y respuesta actualizada | Verificado |
| Hora de inicio posterior o igual a hora fin | Error `horario_invalido` | Verificado en validaciones de tareas |

## Pendiente

- Automatizar pruebas de frontera de formato horario cuando exista suite.
