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

No se han implementado todavia finalizacion de tareas, planificacion avanzada ni recordatorios.

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

## Pendiente para siguientes iteraciones

- Marcar tareas como completadas.
- Planificacion y configuracion.
- Recordatorios.
- Seguridad de sesion mas robusta y persistente.
- Pruebas automatizadas de backend y frontend.
