# editarTarea() > Pruebas

## Objetivo

Verificar que solo usuarios con permisos de gestion pueden modificar los datos
base de una tarea visible y que la interfaz refleja los cambios sin recargar.

## Escenarios cubiertos

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Editar tarea valida como administrador | La tarea conserva grupo y estado, y actualiza titulo, descripcion, fecha y horario | Verificado |
| Editar tarea como miembro ordinario | Error `usuario_sin_permisos` | Verificado |
| Tarea inexistente o no visible | Error `tarea_no_disponible` | Verificado |
| Titulo vacio | Error `titulo_obligatorio` | Verificado |
| Hora de inicio posterior o igual a fin | Error `horario_invalido` | Verificado |
| Tarea finalizada o cancelada | Error `tarea_no_editable` | Verificado |
| UI de edicion | Boton `Editar` visible solo en tareas gestionables y abiertas | Verificado |
| UI de guardado | La tarjeta muestra el formulario inline y sustituye la tarea actualizada | Verificado |
| Vista movil | Formulario de edicion y acciones sin overflow horizontal | Verificado |

## Verificacion ejecutada

```powershell
cd app/backend
.\.venv\Scripts\python.exe -m compileall routes\tasks.py schemas\tasks.py services\task_service.py
```

```powershell
cd app/frontend
npm run build
```

Tambien se valida con smoke de servicio sobre SQLite temporal para permisos,
horario invalido y bloqueo de estados finales. En navegador integrado se
comprueba que la accion de edicion aparece donde corresponde, que el formulario
inline mantiene el layout y que una tarea actualizada por la API real aparece
con los datos nuevos tras recargar.

## Observaciones

La edicion no cubre asignaciones, relaciones, conflictos ni recordatorios.
Esos comportamientos se probaran cuando se implementen sus casos de uso
especificos.
