# abrirTareas() > Desarrollo

Implementado como primer incremento vertical de gestion de tareas.

## Alcance implementado

- Crear la tabla `tareas` y datos iniciales de ejemplo.
- Consultar tareas visibles para el usuario autenticado segun sus membresias de
  grupo.
- Mostrar titulo, descripcion, grupo, estado, rol del usuario en el grupo y si
  la tarea es gestionable para el usuario.
- Filtrar tareas en frontend por texto, grupo y estado.

## Backend

Archivos principales:

- `app/database/schema.sql`
- `app/database/seed.sql`
- `app/backend/routes/tasks.py`
- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`
- `app/backend/main.py`

Endpoint incorporado:

```http
GET /api/tasks
```

La consulta usa la sesion activa y solo devuelve tareas de grupos donde existe
una fila en `miembros_grupo` para el usuario. Las modificaciones se resuelven
en los casos de uso de creacion, edicion, finalizacion y eliminacion.

## Frontend

Archivos principales:

- `app/frontend/src/api/tasks.js`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

El dashboard incorpora la seccion `Mis tareas`, cargada al iniciar sesion y al
restaurarla desde `localStorage`. La lista permite filtrar por texto, grupo y
estado sin recargar la pagina.

## Decisiones

- `abrirTareas()` se limita a lectura y filtrado; las mutaciones se documentan
  en sus casos de uso especificos.
- La visibilidad depende de la pertenencia al grupo, no del rol global del
  usuario.
- Al eliminar un grupo, el backend elimina tambien sus tareas para no dejar
  registros huerfanos.

## Estado resultante

El modulo de tareas permite consultar, filtrar y revisar informacion operativa
de tareas desde el dashboard.
