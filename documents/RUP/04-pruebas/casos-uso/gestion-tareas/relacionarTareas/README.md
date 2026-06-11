# relacionarTareas > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Guardar una tarea con predecesora del mismo grupo | La respuesta incluye `predecesora_tarea_id` y `predecesora_titulo` | Verificado |
| Relacionar una tarea consigo misma | Error `relacion_autorreferente` | Verificado |
| Crear una dependencia circular | Error `relacion_circular` | Verificado |
| Borrar tareas temporales relacionadas | No quedan tareas ni relaciones temporales | Verificado |

## Pendiente

- Probar visualmente el selector `Depende de` en navegador.
- Automatizar el smoke cuando exista suite de pruebas.
