# editarInvitacion > Desarrollo

## Estado

Implementado como decision sobre invitaciones pendientes recibidas.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/editarInvitacion/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarInvitacion/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `PATCH /api/groups/invitations/{invitation_id}`.
- `app/backend/services/group_service.py`: valida destinatario, estado,
  caducidad y decision; crea la membresia al aceptar.
- `app/backend/schemas/groups.py`: define entrada y respuesta de actualizacion.
- `app/frontend/src/api/groups.js`: encapsula la llamada `updateInvitation`.
- `app/frontend/src/App.jsx`: muestra acciones de aceptar o rechazar en
  invitaciones recibidas y pendientes.
- `app/frontend/src/App.css`: estilos de las acciones de invitacion.

## Decision de implementacion

Solo el usuario cuyo email coincide con la invitacion puede aceptar o rechazar.
Los usuarios con permisos de gestion pueden verla en la lista, pero no decidir
por el destinatario.

Aceptar una invitacion crea un registro en `miembros_grupo` con el rol
propuesto. Rechazar solo cambia el estado de la invitacion. Las invitaciones en
estado final no se pueden volver a modificar.

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
  "estado": "Aceptada"
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
    "estado": "Aceptada",
    "invitado_por": "Usuario Demo",
    "es_destinatario": true,
    "es_gestionable": false
  }
}
```

## Alcance no incluido

- Cancelar invitaciones enviadas por gestores.
- Editar email, rol o fecha limite de una invitacion ya creada.
- Notificaciones externas.
- Pruebas automatizadas permanentes.
