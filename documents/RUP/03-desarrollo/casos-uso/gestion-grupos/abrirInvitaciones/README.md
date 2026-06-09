# abrirInvitaciones > Desarrollo

## Estado

Implementado como consulta vertical de invitaciones del usuario.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/abrirInvitaciones/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/abrirInvitaciones/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `GET /api/groups/invitations`.
- `app/backend/services/group_service.py`: consulta invitaciones recibidas o
  gestionables y valida el filtro de estado.
- `app/backend/schemas/groups.py`: define la respuesta de listado.
- `app/frontend/src/api/groups.js`: encapsula la llamada `getInvitations`.
- `app/frontend/src/App.jsx`: carga invitaciones al iniciar sesion, las
  refresca tras invitar y muestra la seccion `Mis invitaciones`.
- `app/frontend/src/App.css`: estilos de la lista y adaptacion movil.

## Decision de implementacion

La lista incluye dos tipos de invitaciones: las dirigidas al email del usuario y
las que puede revisar porque tiene rol `Administrador` o
`Miembro Administrador` en el grupo. Esto mantiene el enfoque del caso para el
`Miembro`, pero tambien permite que quien gestiona un grupo vea las
invitaciones que ha abierto.

La interfaz muestra por defecto el estado `Pendiente`, porque son las
invitaciones que requieren atencion. Los estados `Aceptada`, `Rechazada`,
`Caducada` y `Cancelada` quedan disponibles mediante filtro junto con la opcion
`Todas`.

## Endpoint

```http
GET /api/groups/invitations
X-Session-Token: <token>
```

Filtro opcional:

```http
GET /api/groups/invitations?estado=Pendiente
```

Respuesta correcta:

```json
{
  "estado": "INVITACIONES_ABIERTO",
  "mensaje": "Invitaciones cargadas correctamente.",
  "invitaciones": [
    {
      "id": 1,
      "grupo_id": 1,
      "grupo_nombre": "Casa Breñosa",
      "email": "persona@example.com",
      "rol": "Miembro",
      "fecha_limite": "2026-06-16",
      "estado": "Pendiente",
      "invitado_por": "Usuario Demo",
      "es_destinatario": true,
      "es_gestionable": false
    }
  ]
}
```

## Alcance no incluido

- Aceptar o rechazar invitaciones.
- Cancelar invitaciones enviadas.
- Marcar automaticamente como caducadas las invitaciones vencidas.
- Envio real de notificaciones.
- Pruebas automatizadas permanentes.
