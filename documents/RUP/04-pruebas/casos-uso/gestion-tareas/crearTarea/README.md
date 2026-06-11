# crearTarea() > Pruebas

## Objetivo

Verificar que solo usuarios con permisos de gestion pueden crear tareas
programadas dentro de sus grupos y que la interfaz refleja la tarea creada.

## Escenarios cubiertos

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Crear tarea valida como administrador | Tarea `Programada` con fecha y horario normalizados | Verificado |
| Crear tarea como miembro ordinario | Error `usuario_sin_permisos` | Verificado |
| Titulo vacio | Error `titulo_obligatorio` | Verificado |
| Fecha invalida | Error funcional de fecha | Verificado |
| Hora de inicio posterior o igual a fin | Error `horario_invalido` | Verificado |
| UI de creacion | Formulario visible en grupos gestionables | Verificado |
| Tarea creada visible en UI | Tarea creada por endpoint real aparece en `Mis tareas` con fecha y horario | Verificado |
| UI de validacion | Enviar formulario incompleto muestra error de campos obligatorios | Verificado |
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

Tambien se ejecuto un smoke de servicio con SQLite temporal para validar alta
correcta, permisos, titulo obligatorio y horario invalido.
En navegador integrado se verifico el formulario visible, la validacion de
campos obligatorios, la visualizacion de una tarea temporal creada contra la API
real, el layout movil y la limpieza posterior de datos temporales.

## Observaciones

Los conflictos horarios se prueban en `validarConflicto()`. Esta prueba se
limita al alta de la tarea y a la validacion del horario propio.
