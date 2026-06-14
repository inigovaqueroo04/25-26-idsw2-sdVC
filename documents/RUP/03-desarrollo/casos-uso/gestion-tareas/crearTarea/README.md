# crearTarea() > Desarrollo

Implementado como incremento vertical de gestion de tareas, apoyado en los
grupos gestionables del usuario autenticado.

## Alcance implementado

- Crear tareas dentro de grupos donde el usuario tiene permisos de gestion.
- Solicitar grupo, titulo, descripcion opcional, fecha, hora de inicio, hora
  de fin y recordatorio opcional en minutos.
- Validar datos obligatorios, coherencia del horario y rango del recordatorio.
- Registrar la tarea en estado `Programada`.
- Mostrar la tarea nueva en `Tareas` sin recargar la aplicacion.
- Avisar antes de guardar si el horario se solapa con otra tarea activa visible.

## Backend

Archivos principales:

- `app/backend/routes/tasks.py`
- `app/backend/services/task_service.py`
- `app/backend/schemas/tasks.py`

Endpoint:

```http
POST /api/tasks
```

La ruta valida sesion y delega en `crear_tarea()`. El servicio comprueba que el
grupo exista para el usuario, que su rol sea `Administrador` o
`Miembro Administrador`, que el titulo no este vacio, que la fecha tenga
formato `AAAA-MM-DD`, que las horas tengan formato `HH:MM`, que inicio sea
anterior a fin y que el recordatorio, si se informa, este entre 0 y 10080
minutos.

## Frontend

Archivos principales:

- `app/frontend/src/api/tasks.js`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

La pantalla `Tareas` incorpora un formulario de creacion cuando el usuario
tiene al menos un grupo gestionable. Tras guardar, se anade la tarea creada a
la lista y se muestran fecha, horario, grupo, estado, responsable y
recordatorio si existe.

## Decisiones

- La tarea creada queda `Programada`, porque el flujo exige fecha y horario al
  guardar.
- Los solapes horarios no bloquean por defecto. El frontend avisa antes de
  crear y permite cambiar el horario o crear igualmente.
- El recordatorio se guarda como dato interno; no dispara notificaciones reales.

## Estado resultante

`crearTarea()` queda implementado en backend y frontend con alta, validacion,
recordatorio opcional y aviso de solape en la interfaz.
