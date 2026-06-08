# BreñoTask - Primera iteracion tecnica

Esta carpeta contiene la primera version funcional vertical de BreñoTask para el modulo de gestion de sesion y navegacion.

## Estructura

```text
app/
  backend/   API REST con FastAPI
  database/  Esquema SQL y datos iniciales SQLite
  frontend/  Aplicacion React + Vite
```

## Modulo implementado

Esta iteracion cubre:

- `iniciarSesion()`: valida email y contrasena contra SQLite y abre una sesion simple.
- `cerrarSesion()`: invalida la sesion activa y vuelve a `SESION_CERRADA`.
- `completarGestion()`: estabiliza la navegacion y vuelve a `SISTEMA_DISPONIBLE`.

No se han implementado todavia grupos, tareas, planificacion ni recordatorios.

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

## Pendiente para siguientes iteraciones

- Gestion de grupos y miembros.
- Gestion de tareas.
- Planificacion y configuracion.
- Recordatorios.
- Seguridad de sesion mas robusta y persistente.
- Pruebas automatizadas de backend y frontend.

