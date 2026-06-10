# crearTarea() > Desarrollo

Implementado como segundo incremento vertical de gestion de tareas, despues de
`abrirTareas()`.

## Alcance implementado

- Crear tareas dentro de grupos gestionables por el usuario autenticado.
- Solicitar grupo, titulo, descripcion opcional, fecha, hora de inicio y hora
  de fin.
- Validar datos obligatorios y coherencia del horario.
- Registrar la tarea en estado `Programada`.
- Mostrar la tarea nueva en `Mis tareas` sin recargar la aplicacion.

## Backend

Archivos principales:

- `app/database/schema.sql`
- `app/database/seed.sql`
- `app/backend/database.py`
- `app/backend/routes/tasks.py`
- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`

Endpoint incorporado:

```http
POST /api/tasks
```

La ruta valida sesion y delega en `crear_tarea()`. El servicio comprueba que el
grupo exista para el usuario, que su rol en el grupo sea `Administrador` o
`Miembro Administrador`, que el titulo no este vacio, que la fecha tenga
formato `AAAA-MM-DD`, que las horas tengan formato `HH:MM` y que inicio sea
anterior a fin.

## Frontend

Archivos principales:

- `app/frontend/src/api/tasks.js`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

La seccion `Mis tareas` incorpora un formulario de creacion cuando el usuario
tiene al menos un grupo gestionable. Tras guardar, se añade la tarea creada a
la lista y se muestran fecha, horario, grupo, rol y estado.

## Decisiones

- La tarea creada queda `Programada`, porque el analisis exige fecha y horario
  validos al guardar.
- Los conflictos horarios no bloquean este incremento porque todavia no hay
  asignaciones de usuarios ni modulo de notificaciones.
- Se añade una migracion ligera para columnas nuevas de `tareas`, evitando
  borrar la SQLite local existente durante el avance iterativo.

## Estado resultante

`crearTarea()` queda implementado en backend y frontend. La gestion de tareas
ya permite consultar y crear tareas programadas; quedan pendientes editar,
eliminar y marcar como completadas.
