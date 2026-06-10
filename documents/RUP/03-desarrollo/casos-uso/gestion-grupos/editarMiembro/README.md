# editarMiembro > Desarrollo

## Estado

Implementado como gestion de roles de miembros dentro de un grupo.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/editarMiembro/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarMiembro/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `GET /api/groups/{group_id}/members`
  y `PATCH /api/groups/{group_id}/members/{member_id}`.
- `app/backend/services/group_service.py`: valida permisos, rol de destino,
  pertenencia al grupo y conservacion de al menos un gestor.
- `app/backend/schemas/groups.py`: define respuestas de miembros y peticion de
  cambio de rol.
- `app/frontend/src/api/groups.js`: encapsula `getGroupMembers` y
  `updateGroupMember`.
- `app/frontend/src/App.jsx`: muestra el panel `Miembros` en grupos
  gestionables y permite guardar el rol de cada miembro.
- `app/frontend/src/App.css`: estilos del panel de miembros.

## Decision de implementacion

El rol se trata como atributo de la pertenencia `MiembroGrupo`, no como rol
global del usuario. Por eso un mismo usuario podria tener permisos distintos en
grupos diferentes.

Solo `Administrador` y `Miembro Administrador` dentro del grupo pueden listar y
editar miembros. El sistema permite cambiar entre `Administrador`,
`Miembro Administrador` y `Miembro`, pero bloquea cualquier cambio que deje el
grupo sin ningun miembro con permisos de gestion.

## Endpoints

```http
GET /api/groups/{group_id}/members
X-Session-Token: <token>
```

```http
PATCH /api/groups/{group_id}/members/{member_id}
X-Session-Token: <token>
Content-Type: application/json
```

```json
{
  "rol": "Miembro Administrador"
}
```

## Alcance no incluido

- Eliminar miembros del grupo.
- Editar datos personales del usuario.
- Permisos granulares distintos de los tres roles actuales.
- Pruebas automatizadas permanentes.
