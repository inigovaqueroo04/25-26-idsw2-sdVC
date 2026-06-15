# BreñoTask - Iteraciones tecnicas

Esta carpeta contiene las primeras versiones funcionales verticales de BreñoTask.

## Estructura

```text
app/
  backend/   API REST con FastAPI
  database/  Esquema SQL y datos iniciales SQLite
  frontend/  Aplicacion React + Vite
```

## Modulos implementados

### Gestion de sesion y navegacion

- `iniciarSesion()`: valida email y contrasena contra SQLite y abre una sesion simple.
- `cerrarSesion()`: invalida la sesion activa y vuelve a `SESION_CERRADA`.
- `completarGestion()`: estabiliza la navegacion y vuelve a `SISTEMA_DISPONIBLE`.

### Gestion de grupos y usuarios

- `abrirGrupos()`: consulta los grupos asociados al usuario autenticado y los muestra en el dashboard.
- `crearGrupo()`: crea un grupo nuevo y vincula al usuario creador como `Administrador`.
- `editarGrupo()`: modifica nombre y descripcion de un grupo propio con permisos de gestion.
- `eliminarGrupo()`: elimina un grupo propio con rol `Administrador` tras confirmacion.
- `invitarUsuario()`: registra una invitacion pendiente con email, rol propuesto y fecha limite.
- `abrirInvitaciones()`: muestra invitaciones recibidas o gestionables por el usuario con filtro por estado.
- `editarInvitacion()`: permite aceptar o rechazar invitaciones pendientes recibidas y cancelar invitaciones gestionables.
- `editarMiembro()`: permite consultar miembros de un grupo gestionable y cambiar su rol dentro del grupo.
- `eliminarMiembro()`: retira un miembro de un grupo gestionable tras confirmacion.

### Gestion de tareas

- `abrirTareas()`: consulta las tareas visibles para los grupos del usuario y permite filtrarlas.
- `crearTarea()`: registra una tarea programada con fecha y horario dentro de un grupo gestionable.
- `editarTarea()`: permite corregir titulo, descripcion, fecha y horario de una tarea gestionable.
- `eliminarTarea()`: elimina una tarea gestionable tras confirmacion.
- `marcarCompletada()`: finaliza una tarea visible y registra la fecha de finalizacion.
- `validarConflicto()`: detecta solapamientos de horario para el responsable asignado sin bloquear el guardado.
- `relacionarTareas()`: permite indicar que una tarea depende de otra tarea activa del mismo grupo.

### Planificacion y configuracion

- `abrirPlanificacion()`: muestra una agenda filtrada con resumen de tareas planificadas.
- `establecerHorario()`: valida fecha, hora de inicio y hora de fin como parte de crear o editar tareas.
- `asignarTareaAUsuario()`: asigna una tarea gestionable a un miembro del grupo.
- `definirLocalizacion()`: guarda una localizacion textual opcional para la tarea.
- `configurarRecordatorio()`: guarda un recordatorio simple en minutos.

El prototipo mantiene localizacion textual y recordatorios simples dentro de la
propia tarea.

## Inicializar la base de datos

```powershell
cd app/backend
python init_db.py
```

El script crea `app/database/brenotask.sqlite3` usando:

- `app/database/schema.sql`
- `app/database/seed.sql`

## Ejecutar backend

```powershell
cd app/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload --port 8000
```

La API queda disponible en `http://localhost:8000`.

## Ejecutar frontend

```powershell
cd app/frontend
npm install
npm run dev
```

El frontend queda disponible normalmente en `http://localhost:5173`.

## Usuario de prueba

- Email: `demo@brenotask.local`
- Contrasena: `breno123`
- Rol: `Administrador`

La contrasena se guarda como hash SHA-256 en la semilla SQL para evitar almacenarla en texto plano.

El usuario de prueba pertenece a:

- `Casa Breñosa` como `Administrador`.
- `Proyecto Universidad` como `Miembro Administrador`.

## Alcance del prototipo

- Sesion, grupos, invitaciones, miembros, tareas y planificacion basica.
- Persistencia SQLite con datos iniciales para demostracion.
- Quedan fuera las notificaciones externas, mapas/rutas, subtareas y seguridad
  avanzada de sesion.
