# abrirTareas() > Pruebas

## Objetivo

Verificar que el usuario autenticado solo ve tareas de los grupos a los que
pertenece y que la interfaz permite consultarlas sin romper el dashboard.

## Escenarios cubiertos

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Usuario con varios grupos | Ve tareas de todos sus grupos accesibles | Verificado |
| Usuario miembro de un solo grupo | Solo ve tareas de ese grupo | Verificado |
| Rol gestor | La tarea indica `es_gestionable = true` | Verificado |
| Rol miembro ordinario | La tarea indica `es_gestionable = false` | Verificado |
| Filtro por texto | La lista se reduce a tareas coincidentes | Verificado |
| Filtro por grupo | La lista muestra solo tareas del grupo elegido | Verificado |
| Filtro por estado | La lista muestra solo tareas del estado elegido | Verificado |
| Vista movil | La lista no desborda horizontalmente | Verificado |

## Verificacion ejecutada

```powershell
cd app/backend
.\.venv\Scripts\python.exe -m compileall database.py init_db.py main.py models routes schemas services
```

```powershell
cd app/frontend
npm run build
```

Tambien se ejecuto un smoke de servicio con SQLite temporal para validar la
visibilidad de tareas por membresia de grupo y el indicador de gestion.

## Observaciones

Las acciones de crear, editar, eliminar y marcar tareas como completadas no se
prueban aqui porque pertenecen a incrementos posteriores.
