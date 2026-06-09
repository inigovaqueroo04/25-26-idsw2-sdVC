# eliminarGrupo > Desarrollo

## Estado

Implementado como cuarto incremento vertical del modulo de Gestion de grupos y
usuarios.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/eliminarGrupo/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/eliminarGrupo/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `DELETE /api/groups/{group_id}`.
- `app/backend/services/group_service.py`: valida disponibilidad del grupo,
  rol `Administrador` y elimina grupo y membresias directas.
- `app/backend/schemas/groups.py`: define la respuesta del caso de uso.
- `app/frontend/src/api/groups.js`: encapsula la llamada `deleteGroup`.
- `app/frontend/src/App.jsx`: muestra la confirmacion inline y retira la
  tarjeta tras borrar.
- `app/frontend/src/App.css`: estilos de boton destructivo y confirmacion.

## Decision de implementacion

La eliminacion queda reservada al usuario con rol `Administrador` dentro del
grupo. Esta decision sigue el analisis, que diferencia este caso de la edicion:
un `Miembro Administrador` puede editar datos del grupo, pero no eliminarlo.

Como la base tecnica actual solo contiene `grupos` y `miembros_grupo`, el
incremento limpia las membresias directas antes de borrar el grupo. Las tareas,
invitaciones y otros vinculos se incorporaran cuando existan sus tablas y casos
de uso implementados.

## Endpoint

```http
DELETE /api/groups/{group_id}
X-Session-Token: <token>
```

Respuesta correcta:

```json
{
  "estado": "GRUPOS_ABIERTO",
  "grupo_id": 3,
  "mensaje": "Grupo eliminado correctamente."
}
```

## Alcance no incluido

- Eliminacion condicionada por tareas reales.
- Cancelacion de invitaciones pendientes.
- Auditoria historica de grupos eliminados.
- Pruebas automatizadas.
