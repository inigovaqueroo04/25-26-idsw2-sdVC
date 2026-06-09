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
- `PUT /api/groups/{group_id}`
- `DELETE /api/groups/{group_id}`
- `GET /api/groups/invitations`
- `POST /api/groups/{group_id}/invitations`

Los endpoints `logout`, `me` y `groups` usan la cabecera `X-Session-Token` recibida en el login.

`POST /api/groups` valida nombre obligatorio, evita duplicados para el usuario
autenticado y crea la membresia inicial con rol `Administrador`.

`PUT /api/groups/{group_id}` valida que el usuario sea `Administrador` o
`Miembro Administrador` del grupo, mantiene la identidad del grupo y actualiza
solo nombre y descripcion.

`DELETE /api/groups/{group_id}` exige rol `Administrador` dentro del grupo,
borra las membresias directas y retira el grupo de la lista.

`POST /api/groups/{group_id}/invitations` exige rol `Administrador` o
`Miembro Administrador`, valida email y fecha limite, evita miembros existentes
e invitaciones pendientes duplicadas, y registra la invitacion como `Pendiente`.

`GET /api/groups/invitations` lista invitaciones asociadas al usuario
autenticado. Incluye invitaciones dirigidas a su email y las que puede revisar
por tener rol `Administrador` o `Miembro Administrador` en el grupo. Admite el
filtro opcional `estado`.

## Usuario de prueba

- Email: `demo@brenotask.local`
- Contrasena: `breno123`

## Datos de grupos

La semilla crea dos grupos para el usuario demo:

- `Casa Breñosa`
- `Proyecto Universidad`
