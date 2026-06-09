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

No se han implementado todavia editar o eliminar grupos, invitaciones, tareas, planificacion ni recordatorios.

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

- Crear, editar y eliminar grupos.
- Invitaciones y gestion de miembros.
- Gestion de tareas.
- Planificacion y configuracion.
- Recordatorios.
- Seguridad de sesion mas robusta y persistente.
- Pruebas automatizadas de backend y frontend.
