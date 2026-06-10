# eliminarTarea() > Pruebas

## Objetivo

Verificar que solo usuarios con permisos de gestion pueden eliminar una tarea
visible y que la interfaz exige confirmacion antes de retirarla del listado.

## Escenarios cubiertos

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Eliminar tarea valida como administrador | La tarea desaparece de `Mis tareas` y la API devuelve `TAREAS_ABIERTO` | Verificado |
| Cancelar confirmacion | La tarea se conserva y no se llama al borrado definitivo | Verificado |
| Eliminar tarea como miembro ordinario | Error `usuario_sin_permisos` | Verificado |
| Tarea inexistente o no visible | Error `tarea_no_disponible` | Verificado |
| UI de eliminacion | Boton `Eliminar` visible en tareas gestionables abiertas | Verificado |
| UI de confirmacion | La confirmacion inline muestra `Cancelar` y `Confirmar` | Verificado |
| Vista movil | Botones de eliminacion y confirmacion sin overflow horizontal | Verificado |

## Verificacion ejecutada

```powershell
cd app/backend
.\.venv\Scripts\python.exe -m compileall routes\tasks.py schemas\tasks.py services\task_service.py
```

```powershell
cd app/frontend
npm run build
```

Tambien se valida con smoke de servicio sobre SQLite temporal para borrado
correcto, falta de permisos y tarea inexistente. En navegador integrado se
comprueba la aparicion de la confirmacion, la cancelacion, el borrado de una
tarea temporal contra la API real, la desaparicion de la tarjeta y el layout
movil sin overflow horizontal.

## Observaciones

La prueba no cubre subtareas ni relaciones entre tareas porque todavia no
existen en la implementacion. Cuando se implementen, el borrado debera ampliar
su verificacion para confirmar la limpieza de dependencias.
