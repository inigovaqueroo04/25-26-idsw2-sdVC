# crearTarea() > Pruebas

## Objetivo

Verificar que solo usuarios con permisos de gestion pueden crear tareas
programadas dentro de sus grupos y que la interfaz refleja la tarea creada.

## Escenarios cubiertos

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Crear tarea valida como administrador | Tarea `Programada` con fecha y horario normalizados | Verificado |
| Crear tarea con recordatorio | La respuesta devuelve `recordatorio_minutos` guardado | Verificado contra API local |
| Crear tarea con solape horario | El frontend muestra aviso antes de guardar | Verificado en navegador integrado |
| Crear tarea como miembro ordinario | Error `usuario_sin_permisos` | Verificado |
| Titulo vacio | Error `titulo_obligatorio` | Verificado |
| Fecha invalida | Error funcional de fecha | Verificado |
| Hora de inicio posterior o igual a fin | Error `horario_invalido` | Verificado |
| UI de creacion | Formulario visible en grupos gestionables | Verificado |
| Tarea creada visible en UI | Tarea creada por endpoint real aparece en `Tareas` | Verificado |
| Vista movil | Formulario y lista sin overflow horizontal | Verificado |

## Verificacion ejecutada

```powershell
cd app/backend
.\.venv\Scripts\python.exe -m compileall database.py init_db.py main.py models routes schemas services
```

```powershell
cd app/frontend
npm run build
```

Tambien se probo el endpoint real con `Invoke-RestMethod`, creando una tarea
temporal con `recordatorio_minutos: 45` y eliminandola despues. En navegador
integrado se verifico el campo `Recordatorio` en el alta, el aviso de solape,
el layout sin overflow y la navegacion por modulos.
