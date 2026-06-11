# abrirGrupos > Desarrollo

## Implementacion

El caso se implementa con `GET /api/groups`. El backend devuelve solo los
grupos donde el usuario autenticado tiene una membresia y el frontend los
muestra en `Mis grupos` con rol operativo, numero de miembros y filtro por
nombre.

Archivos principales:

- `app/backend/routes/groups.py`
- `app/backend/services/group_service.py`
- `app/backend/schemas/groups.py`
- `app/frontend/src/App.jsx`
- `app/frontend/src/api/groups.js`

## Decision

La visibilidad se basa en `miembros_grupo`, no en el rol global del usuario.
Esto permite que una misma cuenta tenga permisos distintos segun el grupo.
