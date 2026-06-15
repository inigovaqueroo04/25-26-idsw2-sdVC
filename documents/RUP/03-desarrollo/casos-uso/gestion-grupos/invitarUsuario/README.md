# invitarUsuario > Desarrollo

## Estado

Implementado como primer incremento vertical de invitaciones.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/invitarUsuario/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/invitarUsuario/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/database/schema.sql`: crea la tabla `invitaciones` y evita duplicados
  pendientes por grupo y email.
- `app/backend/routes/groups.py`: expone `POST /api/groups/{group_id}/invitations`.
- `app/backend/services/group_service.py`: valida permisos, email, fecha
  limite, miembro existente e invitacion pendiente duplicada.
- `app/backend/schemas/groups.py`: define entrada y respuesta del caso de uso.
- `app/frontend/src/api/groups.js`: encapsula la llamada `inviteUser`.
- `app/frontend/src/App.jsx`: muestra el formulario inline de invitacion en
  grupos gestionables.
- `app/frontend/src/App.css`: estilos del formulario de invitacion.

## Decision de implementacion

La invitacion se registra como `Pendiente` y mantiene separada la pertenencia
al grupo. Esto sigue la decision de diseno: la relacion como miembro se crea al
aceptar la invitacion.

Los usuarios con rol `Administrador` o `Miembro Administrador` dentro del grupo
pueden invitar. El email se normaliza a minusculas, la fecha limite debe ser
actual o futura y el rol propuesto queda limitado a `Miembro` o
`Miembro Administrador`.

## Endpoint

```http
POST /api/groups/{group_id}/invitations
X-Session-Token: <token>
Content-Type: application/json
```

```json
{
  "email": "persona@example.com",
  "rol": "Miembro",
  "fecha_limite": "2026-06-16"
}
```

Respuesta correcta:

```json
{
  "estado": "INVITACION_ABIERTA",
  "mensaje": "Invitacion registrada correctamente.",
  "invitacion": {
    "id": 1,
    "grupo_id": 1,
    "email": "persona@example.com",
    "rol": "Miembro",
    "fecha_limite": "2026-06-16",
    "estado": "Pendiente"
  }
}
```

## Alcance del prototipo

- Envio real de email.
- Invitacion registrada desde grupos gestionables.
- Aceptacion, rechazo, listado y administracion cubiertos en sus casos de uso
  correspondientes.
