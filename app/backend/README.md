# Backend BreñoTask

API REST basica para las primeras iteraciones de BreñoTask.

## Requisitos

- Python 3.10 o superior
- SQLite incluido con Python

## Instalacion y ejecucion

```powershell
cd app/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload --port 8000
```

## Endpoints

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/groups`
- `POST /api/groups`

Los endpoints `logout`, `me` y `groups` usan la cabecera `X-Session-Token` recibida en el login.

`POST /api/groups` valida nombre obligatorio, evita duplicados para el usuario
autenticado y crea la membresia inicial con rol `Administrador`.

## Usuario de prueba

- Email: `demo@brenotask.local`
- Contrasena: `breno123`

## Datos de grupos

La semilla crea dos grupos para el usuario demo:

- `Casa Breñosa`
- `Proyecto Universidad`
