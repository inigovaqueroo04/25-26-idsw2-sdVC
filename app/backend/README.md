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
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/{task_id}`
- `POST /api/groups`
- `PUT /api/groups/{group_id}`
- `DELETE /api/groups/{group_id}`
- `GET /api/groups/invitations`
- `PATCH /api/groups/invitations/{invitation_id}`
- `GET /api/groups/{group_id}/members`
- `PATCH /api/groups/{group_id}/members/{member_id}`
- `DELETE /api/groups/{group_id}/members/{member_id}`
- `POST /api/groups/{group_id}/invitations`

Los endpoints `logout`, `me` y `groups` usan la cabecera `X-Session-Token` recibida en el login.

`GET /api/tasks` lista las tareas de los grupos a los que pertenece el usuario
autenticado. Devuelve grupo, titulo, descripcion, estado, rol del usuario en
ese grupo y si puede gestionar la tarea en incrementos posteriores.

`POST /api/tasks` crea una tarea `Programada` dentro de un grupo gestionable.
Valida titulo, fecha, hora de inicio, hora de fin, permisos de gestion y que
la hora de inicio sea anterior a la hora de fin.

`PATCH /api/tasks/{task_id}` actualiza titulo, descripcion, fecha y horario de
una tarea gestionable. Reutiliza las validaciones de creacion y bloquea tareas
`Finalizada` o `Cancelada`.

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

`PATCH /api/groups/invitations/{invitation_id}` permite al destinatario aceptar
o rechazar una invitacion pendiente. Si acepta, crea la membresia en el grupo
con el rol propuesto; si rechaza, solo actualiza el estado de la invitacion.
Tambien permite a un `Administrador` o `Miembro Administrador` del grupo
cancelar invitaciones pendientes.

`GET /api/groups/{group_id}/members` lista miembros de un grupo gestionable.
`PATCH /api/groups/{group_id}/members/{member_id}` cambia el rol del miembro y
evita dejar el grupo sin ningun miembro con permisos de gestion.
`DELETE /api/groups/{group_id}/members/{member_id}` retira la pertenencia del
miembro al grupo, sin borrar el usuario global, y aplica la misma proteccion
para conservar al menos un gestor.

## Usuario de prueba

- Email: `demo@brenotask.local`
- Contrasena: `breno123`

## Datos de grupos

La semilla crea dos grupos para el usuario demo:

- `Casa Breñosa`
- `Proyecto Universidad`
