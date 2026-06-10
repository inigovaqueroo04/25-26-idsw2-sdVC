# editarInvitacion > Desarrollo

## Estado

Implementado como decision sobre invitaciones pendientes recibidas y como
cancelacion de invitaciones pendientes gestionables.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/editarInvitacion/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarInvitacion/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `PATCH /api/groups/invitations/{invitation_id}`.
- `app/backend/services/group_service.py`: valida destinatario o permisos de
  gestion, estado, caducidad y decision; crea la membresia al aceptar.
- `app/backend/schemas/groups.py`: define entrada y respuesta de actualizacion.
- `app/frontend/src/api/groups.js`: encapsula la llamada `updateInvitation`.
- `app/frontend/src/App.jsx`: muestra acciones de aceptar o rechazar en
  invitaciones recibidas y pendientes, y cancelacion confirmada en
  invitaciones gestionables.
- `app/frontend/src/App.css`: estilos de las acciones de invitacion.

## Decision de implementacion

Solo el usuario cuyo email coincide con la invitacion puede aceptar o rechazar.
Los usuarios con permisos de gestion pueden verla en la lista y cancelarla si
continua pendiente, pero no aceptar ni rechazar por el destinatario.

Aceptar una invitacion crea un registro en `miembros_grupo` con el rol
propuesto. Rechazar solo cambia el estado de la invitacion. Las invitaciones en
estado final no se pueden volver a modificar.

Cancelar una invitacion solo cambia su estado a `Cancelada`. No crea
membresias, no borra usuarios y conserva la invitacion como registro de
seguimiento.

Si la fecha limite ya ha pasado, el intento de gestion marca la invitacion como
`Caducada` y rechaza la operacion.

## Endpoint

```http
PATCH /api/groups/invitations/{invitation_id}
X-Session-Token: <token>
Content-Type: application/json
```

```json
{
  "estado": "Cancelada"
}
```

Respuesta correcta:

```json
{
  "estado": "INVITACION_ABIERTA",
  "mensaje": "Invitacion actualizada correctamente.",
  "invitacion": {
    "id": 1,
    "grupo_id": 1,
    "grupo_nombre": "Casa Breñosa",
    "email": "persona@example.com",
    "rol": "Miembro",
    "fecha_limite": "2026-06-16",
    "estado": "Cancelada",
    "invitado_por": "Usuario Demo",
    "es_destinatario": false,
    "es_gestionable": true
  }
}
```

## Alcance no incluido

- Editar email, rol o fecha limite de una invitacion ya creada.
- Notificaciones externas.
- Pruebas automatizadas permanentes.
