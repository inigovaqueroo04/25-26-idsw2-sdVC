# Backend BreñoTask

API REST basica para la primera iteracion del modulo de gestion de sesion y navegacion.

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

Los endpoints `logout` y `me` usan la cabecera `X-Session-Token` recibida en el login.

## Usuario de prueba

- Email: `demo@brenotask.local`
- Contrasena: `breno123`

